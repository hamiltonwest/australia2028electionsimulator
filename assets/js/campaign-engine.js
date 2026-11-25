// Campaign mode engine: run state, the card deck, effects, national spirits, polling, and the bridge to the simulator.
// Campaign effects become an ordinary sandbox state (national swings, state, seat-type and seat rules, preference flows, the chosen
// leader), so the seat projection each turn and the full count on election night use the same model as the rest of the site.
window.CAMPAIGN = (() => {
  const C = window.CAMPAIGN_DATA, A = window.CAMPAIGN_ACH;
  const RUNKEY = 'es2028_campaign_run_v2', HOFKEY = 'es2028_campaign_hof_v1', DAILYKEY = 'es2028_campaign_daily_v1';
  const GRP = { ALP: 0, LNP: 1, GRN: 2, ONP: 3, IND: 4 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  // Balance. Card and decision vote effects are scaled; spirit drifts are halved; the campaign's accumulated swings fade a little each
  // turn; and the rivals answer back: each card's average option is taken off your vote, so a choice only gains on balance if it beats
  // the typical answer. Good picks build a lead, bad picks dig a hole, and an average run lands near the starting polls.
  const TUNE = Object.assign({ v: 0.85, dv: 0.25, d: 0.5, fade: 0.025, k: 1, mom: 0.03, onp: 1.7, ind: 0.65, kap: 2.15 }, window.CAMPAIGN_TUNE || {});
  const VSCALE = TUNE.v, DSCALE = TUNE.d, FADE = TUNE.fade;
  // difficulty: how hard the rivals answer back, how far the polls can be wrong, how hard rivals respond to your milestones, Political Power
  const DIFF = { easy: { n: 'Easy', k: 0.6, pe: 0, rival: 0.5, pp: 1.3, score: 0.7 }, std: { n: 'Standard', k: 1, pe: 1, rival: 1, pp: 1, score: 1 }, hard: { n: 'Hard', k: 1.25, pe: 1.4, rival: 1.5, pp: 0.8, score: 1.35 } };
  const dOf = st => DIFF[st.diff] || DIFF.std;
  const RGW = { IN: 37 / 150, OUT: 58 / 150, PROV: 18 / 150, RUR: 37 / 150 }, STW = { NSW: 46, VIC: 38, QLD: 30, WA: 16, SA: 10, TAS: 5, ACT: 3, NT: 2 };
  // a choice's value to the player, in points of their own national vote (seat-type and state shifts weighted by seats)
  function worth(e, own) { if (!e) return 0; let v = (e.o || 0); const n = e.n || {};
    Object.entries(n).forEach(([p, x]) => { v += p === own ? x : (['ALP', 'LNP', 'ONP'].includes(p) ? -0.5 * x : 0); });
    Object.entries(e.r || {}).forEach(([k, x]) => { if (typeof x === 'number') v += x * RGW[k]; else Object.entries(x).forEach(([p, y]) => { v += (p === own ? y : ['ALP', 'LNP', 'ONP'].includes(p) ? -0.5 * y : 0) * RGW[k]; }); });
    Object.entries(e.s || {}).forEach(([k, x]) => { const w = (STW[k] || 0) / 150; if (typeof x === 'number') v += x * w; else Object.entries(x).forEach(([p, y]) => { v += (p === own ? y : -0.5 * y) * w; }); });
    Object.values(e.seat || {}).forEach(x => { v += (typeof x === 'number' ? x : 0) / 150; });
    const pf = e.pf || {}; v += 0.05 * ((own === 'ALP' ? (pf.grn || 0) : own === 'LNP' ? (pf.on || 0) : -(pf.on || 0)) + (pf.ind || 0)) + 0.05 * (e.prefDeal || 0);
    v += 0.04 * (e.m || 0) + 0.1 * (e.attack || 0);
    return v; }
  function optWorth(st, o, tag) { if (o.rng) { const p = chance(st, o.rng, tag); return p * worth(o.rng.ok, st.party) + (1 - p) * worth(o.rng.no, st.party); } return worth(o.e, st.party); }
  const clone = x => JSON.parse(JSON.stringify(x));
  const ldrOf = st => C.leaders.find(l => l.id === st.leader);
  const incOf = party => C.leaders.find(l => l.party === party && l.inc);
  const spirit = id => C.spirits[id];
  let CSA = -2, KAPG = -2, KAPC = -2;
  const csa = () => { if (CSA === -2) CSA = window.APP ? window.APP.P.findIndex(p => p.ab === 'CSA') : -1; return CSA; };
  const kapG = () => { if (KAPG === -2) KAPG = window.APP && window.APP.P ? window.APP.P.findIndex(p => p.ab === 'KAP') : -1; return KAPG; };
  const kapCol = () => { if (KAPC === -2) { const g = kapG(); KAPC = g >= 0 && window.APP && window.APP.DATA && window.APP.DATA.colG ? window.APP.DATA.colG.indexOf(g) : -1; } return KAPC; };
  const grpOf = p => p === 'KAP' ? kapG() : GRP[p];
  const keyOf = g => { const N = window.APP.NATI; return g === 0 ? 'ALP' : (g === 1 || g === N) ? 'LNP' : g === 2 ? 'GRN' : g === 3 ? 'ONP' : (g === 4 || g === csa()) ? 'IND' : (kapG() >= 0 && g === kapG()) ? 'KAP' : 'OTH'; };
  const sname = st => ldrOf(st).name.split(' ').slice(-1)[0];
  // your main opponent: Labor for the Greens, the Coalition for the teals, otherwise the biggest of the other majors
  function rivalOf(st) { if (st.party === 'GRN') return 'ALP'; if (st.party === 'IND') return 'LNP'; const s = (st.poll || st).seats || { ALP: 1, LNP: 1, ONP: 0 };
    return ['ALP', 'LNP', 'ONP'].filter(p => p !== st.party).sort((p, q) => (s[q] || 0) - (s[p] || 0))[0]; }
  const special = id => (C.special || {})[id];

  // ---- seeded randomness, so a daily challenge deals everyone the same campaign
  function rnd(st) { st.rs = (st.rs + 0x6D2B79F5) | 0; let t = st.rs; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
  const gauss = st => { let u = 0, v = 0; while (!u) u = rnd(st); while (!v) v = rnd(st); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const pick = (st, arr) => arr[Math.floor(rnd(st) * arr.length)];
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const hash = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h | 0; };

  function poolFor(party) { return C.cards.filter(c => !c.mile && (!c.party || c.party === party)); }
  function milestoneTurns(T) { return [1, Math.round(T * 0.24), Math.round(T * 0.48), Math.round(T * 0.72), T]; }

  // a by-election count: first preferences for each candidate, then the final two after preferences
  function byTable(st) { const b = st.by, me = st.party, opp = b.opp && b.opp !== me ? b.opp : (me === 'LNP' ? 'ALP' : 'LNP'), res = b.res;
    const W = { ALP: 30, LNP: 30, GRN: 12, ONP: 10, IND: 8, OTH: 6 }, others = ['ALP', 'LNP', 'GRN', 'ONP', 'IND', 'OTH'].filter(p => p !== me && p !== opp).slice(0, 4);
    const mine = clamp(res - 7 - rnd(st) * 5 - (C.PARTIES[me].cross ? 5 : 0), 15, 60), theirs = clamp(100 - res - 6 - rnd(st) * 5, 12, 58), left = Math.max(4, 100 - mine - theirs);
    const tw = others.reduce((a, p) => a + W[p], 0), rows = [[me, mine, res], [opp, theirs, 100 - res]].concat(others.map(p => [p, left * W[p] / tw, null]));
    const tot = rows.reduce((a, r) => a + r[1], 0); rows.forEach(r => { r[1] = +(r[1] * 100 / tot).toFixed(1); }); b.tab = rows; }
  function newRun(id, opt) {
    opt = opt || {}; if (opt.daily) id = dailyLeader().id; const L = C.leaders.find(l => l.id === id); if (!L) throw new Error('No leader ' + id);
    const daily = !!opt.daily, seed = daily ? hash('es2028-' + today()) : (Math.random() * 2 ** 31) | 0;
    // the daily challenge also deals everyone the same opening scenario
    const scen = daily ? C.scenarios[(seed >>> 0) % C.scenarios.length].id : (opt.scen && scenOf(opt.scen) ? opt.scen : 'std');
    const T = 25, BY = (C.byElect || {})[id], st = { v: 2, leader: id, party: L.party, inc: L.inc, phase: BY ? 'BYELECTION' : L.inc ? 'CAMPAIGN' : 'SPILL', turn: 1, T, diff: opt.diff || 'std', daily: daily ? today() : null, rs: seed, seed,
      votes: L.votes0 || 42, unity: L.inc ? L.unity : 60, minUnity: 100, mom: 0, pp: 15, spirits: C.startSpirits.slice(), flags: [], flagTurn: {},
      acc: { n: {}, r: {}, s: {}, seat: {}, pf: { grn: 0, on: 0, ind: 0 } }, used: [], cur: null, dec: {}, nextBonus: 0, shield: 0, revolt: false, queue: [],
      stamina: 100, nats: L.party === 'LNP' ? 65 : null, tour: [], tourHard: false, base: { OUT: 0, RUR: 0, IN: 0 }, baseRun: { OUT: 0, RUR: 0, IN: 0 },
      internal: 0, hist: [], log: [], spillWon: false, result: null, started: Date.now(), scen, scnFx: { n: {}, r: {} }, iron: !!opt.iron };
    if (BY) { const m0 = C.byStart(L.party, BY[2]) + (((seed >>> 0) % 1000) / 1000 - 0.5) * 2; st.by = { seat: BY[0], st: BY[1], t: BY[2], m0: +m0.toFixed(1), m: +m0.toFixed(1), res: null }; }
    ens(st);
    applyScen(st);
    const miles = {}; milestoneTurns(T).forEach((t, k) => { miles[t] = pick(st, C.cards.filter(c => c.mile === k + 1)).id; }); st.miles = miles;
    // a hidden polling miss for the whole run, capped so it cannot misstate any big party by more than about 15 seats
    st.pe = drawErr(st, dOf(st).pe); st.late = drawErr(st, 0.55);
    if (rnd(st) < 0.35) st.spirits.push('POLL_HERDING');
    if (st.phase === 'CAMPAIGN') startCampaign(st);
    st.cur = drawCard(st);
    const pr = project(st); st.seats = pr.seats; st.nat = pr.nat; st.central = pr.central; st.seats0 = pr.seats; st.nat0 = pr.nat;
    if (st.by) { const i = window.APP.D.seats.findIndex(x => x.n === st.by.seat), M = (pr.margin || [])[i];
      if (M) { const L2 = ldrOf(st), me = g => keyOf(g) === st.party, base = me(M.w) ? 50 + M.m : me(M.r) ? 50 - M.m : 46 - M.m / 2;
        const m0 = +clamp(base + (st.party === 'ALP' ? -2 : 0) + (((seed >>> 0) % 1000) / 1000 - 0.5) * 2, 42, 60).toFixed(1); st.by.m0 = m0; st.by.m = m0; st.by.held = me(M.w); st.by.opp = keyOf(me(M.w) ? M.r : M.w); } }
    st.spot = pickSpots(st, pr);
    capErr(st); runPolls(st, true); st.poll0 = st.poll.seats; st.pollNat0 = st.poll.nat; histPush(st, 0); targetDue(st);
    return st;
  }
  // ---- opening scenarios: a different starting position for replays. Vote shifts sit outside the campaign's own swings, so they do not fade
  const scenOf = id => (C.scenarios || []).find(x => x.id === id);
  // today's challenge: one leader for everyone, drawn from standard Series One leaders (excluding craft-only Vault Legends)
  function dailyLeader() { const pool = C.leaders.filter(l => !l.craftOnly); return pool[(hash('es2028-leader-' + today()) >>> 0) % pool.length]; }
  function applyScen(st) { const sc = scenOf(st.scen); if (!sc || !sc.e) return; const e = sc.e;
    (e.sp || []).forEach(([from, to]) => { const k = st.spirits.indexOf(from); if (k >= 0) { if (to) st.spirits[k] = to; else st.spirits.splice(k, 1); } else if (to && !st.spirits.includes(to)) st.spirits.push(to); });
    Object.assign(st.scnFx.n, e.n || {}); Object.entries(e.r || {}).forEach(([k, o]) => { st.scnFx.r[k] = { ...o }; });
    if (e.u != null) st.unity = clamp(e.u, 0, 100); if (e.m) st.mom = clamp(st.mom + e.m, -10, 10); if (e.pp) st.pp = Math.max(0, st.pp + e.pp); }
  // fields added in later rounds, filled in for runs saved before them
  function ens(st) { const d = { stances: {}, backflips: 0, ledger: { n: 0, bn: 0 }, debWins: null, doors: { n: 0, t: 0, used: [] }, endorse: [], targets: [], target: null, ppEarned: 0, lo: [] };
    Object.entries(d).forEach(([k, v]) => { if (st[k] === undefined) st[k] = v; }); if (st.pact === undefined) { const L = C.leaders.find(l => l.id === st.leader); st.pact = L && L.sb === 'Nationals' ? 60 : null; } return st; }
  function histPush(st, t) { st.hist.push({ t, s: st.poll.seats[st.party], v: st.poll.nat[st.party], pp: st.pp, c: st.seats[st.party], u: Math.round(st.unity), m: st.mom });
    (st.spot || []).forEach(x => { x.h.push({ t, v: x.v }); }); }
  function startCampaign(st) { st.minUnity = st.unity; const g = ppGain(st); st.pp += g; st.ppEarned = (st.ppEarned || 0) + g; st.queue.push('VENUE'); st.needTour = 1; st.needTarget = 1; }

  // ---- sandbox bridge
  function addPty(obj, p, v) { obj[p] = (obj[p] || 0) + v; }
  function buildS(st, base, shift) {
    const APP = window.APP, L = ldrOf(st), x = clone(base || APP.BASE), P = C.PARTIES[st.party];
    const leads = (st.phase !== 'SPILL' && !(st.phase === 'BYELECTION' && !st.inc)) || st.spillWon;
    if (st.party === 'KAP') x.cont = { ...(x.cont || {}), KAP: 2 };
    // a leader from another sandbox party (a Nationals leader running the Coalition campaign, a named teal) changes that party's leader
    if (L.sb) { if (leads) x.ldr[L.sb] = L.name; } else if (P.ldr && P.setLdr !== false) x.ldr[P.ldr] = leads ? L.name : incOf(st.party).name;
    if (x.ldr['Nationals'] === 'Barnaby Joyce' && x.ldr['One Nation'] === 'Barnaby Joyce') x.ldr['Nationals'] = 'Matt Canavan';
    APP.withS(x, () => APP.ldrCands());
    const a = st.acc, kc = kapCol();
    const pushDemo = (spec, p, amt) => {
      if (!amt) return;
      if (p === 'KAP') { if (kc >= 0) x.demo.push({ ...spec, col: kc, amt }); }
      else if (GRP[p] != null) x.demo.push({ ...spec, party: GRP[p], amt });
    };
    Object.entries(a.n).forEach(([p, v]) => { const g = grpOf(p); if (g != null && g >= 0) x.d[g] = +((x.d[g] || 0) + v).toFixed(3); });
    if (shift) Object.entries(shift).forEach(([p, v]) => { const g = grpOf(p); if (g != null && g >= 0) x.d[g] = +((x.d[g] || 0) + v).toFixed(3); });
    const sf = st.scnFx || { n: {}, r: {} };
    Object.entries(sf.n).forEach(([p, v]) => { const g = grpOf(p); if (g != null && g >= 0) x.d[g] = +((x.d[g] || 0) + v).toFixed(3); });
    Object.entries(sf.r).forEach(([k, o]) => Object.entries(o).forEach(([p, v]) => { pushDemo({ rg: C.RG[k] }, p, v); }));
    Object.entries(a.r).forEach(([k, o]) => Object.entries(o).forEach(([p, v]) => { if (v) pushDemo({ rg: C.RG[k] }, p, +v.toFixed(3)); }));
    Object.entries(a.s).forEach(([k, o]) => Object.entries(o).forEach(([p, v]) => { if (v) pushDemo({ st: k }, p, +v.toFixed(3)); }));
    Object.entries(a.seat || {}).forEach(([n, o]) => { const i = APP.D.seats.findIndex(s => s.n === n); if (i >= 0) Object.entries(o).forEach(([p, v]) => { const g = grpOf(p); if (v && g != null && g >= 0) x.seatAdj.push({ i, g, amt: +v.toFixed(3) }); }); });
    // preference flows: campaign shifts, spirits and the leader's perk; static spirit effects count relative to the starting set
    const pf = { ...a.pf }, sgn = (ids, w) => ids.forEach(id => { const s = spirit(id); if (s && s.pf) Object.entries(s.pf).forEach(([k, v]) => pf[k] = (pf[k] || 0) + w * v); });
    sgn(st.spirits, 1); sgn(C.startSpirits, -1);
    if (leads) [L.pf, L.pfMinus].forEach(o => o && Object.entries(o).forEach(([k, v]) => pf[k] = (pf[k] || 0) + v));
    if (pf.on) x.pf.onCoa = +clamp(x.pf.onCoa + pf.on / 100, 0.4, 0.95).toFixed(3);
    if (pf.grn) x.pf.grnAlp = +clamp(x.pf.grnAlp + pf.grn / 100, 0.5, 0.95).toFixed(3);
    if (pf.ind) { const g = P.g[0]; APP.D.seats.forEach((s, i) => { if (s.inc === 'IND') x.seatAdj.push({ i, g, amt: +(pf.ind * 0.12).toFixed(3) }); }); }
    let floor = 0; st.spirits.forEach(id => { const s = spirit(id); if (s && s.floor) floor += s.floor; }); C.startSpirits.forEach(id => { const s = spirit(id); if (s && s.floor) floor -= s.floor; });
    if (floor) x.d[4] = +(x.d[4] + floor * 0.5).toFixed(3);
    if (st.spirits.includes('THREE_CORNERED_CONTESTS')) x.split = 1;   // Liberals and Nationals both stand in Coalition-held regional seats
    x.preset = 'Campaign mode'; x.campaign = { leader: st.leader, party: st.party };
    return x;
  }
  function seatsBy(central) { const c = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, IND: 0, KAP: 0, OTH: 0 }; central.forEach(w => { c[keyOf(w)]++; }); return c; }
  function natBy(nat) { const N = window.APP.NATI, k = csa(), kg = kapG(); return { ALP: nat[0], LNP: nat[1] + (N >= 0 ? nat[N] : 0), GRN: nat[2], ONP: nat[3], IND: nat[4] + (k >= 0 ? nat[k] : 0), KAP: kg >= 0 ? (nat[kg] || 0) : 0 }; }
  function project(st, shift) { const r = window.APP.project(buildS(st, null, shift)); return { central: r.central, seats: seatsBy(r.central), nat: natBy(r.nat), margin: r.margin }; }
  // ---- seats to watch: three close seats for your party, one you hold, one you are chasing and the next closest, each with its own local poll
  const mineG = (st, g) => keyOf(g) === st.party;
  function pickSpots(st, pr) {
    const D = window.APP.D, M = pr.margin || [], c = D.seats.map((s, i) => ({ i, m: M[i] ? M[i].m : 99, w: M[i] && mineG(st, M[i].w), r: M[i] && mineG(st, M[i].r) })).filter(x => x.w || x.r).sort((a, b) => a.m - b.m);
    const out = [], add = x => { if (x && !out.includes(x)) out.push(x); };
    add(c.find(x => x.w)); add(c.find(x => x.r)); c.forEach(x => { if (out.length < 3) add(x); });
    return out.slice(0, 3).map(x => { const s = D.seats[x.i]; return { i: x.i, n: s.n, st: s.st, inc: s.inc, mem: s.mem, h: [], v: null, noise: 0 }; }); }
  // a local poll: your two-candidate share in the seat, from the poll average plus small-sample noise; null when you are not in the top two
  function seatPolls(st, fresh) { const pr = st.poll; if (!st.spot || !pr || !pr.margin) return;
    st.spot.forEach(x => { if (fresh) x.noise = +(gauss(st) * 1.8).toFixed(2); const M = pr.margin[x.i]; if (!M) { x.v = null; return; }
      x.lead = M.w; x.v = mineG(st, M.w) ? +clamp(50 + M.m + x.noise, 50.1, 80).toFixed(1) : mineG(st, M.r) ? +clamp(50 - M.m + x.noise, 20, 49.9).toFixed(1) : null; }); }

  // ---- polling: what the campaign sees is never the truth. A hidden systematic miss for the run, a house lean for each pollster,
  // and sampling noise. Herding shrinks the leans and noise, so the polls agree, and are all wrong together.
  const PERR = { ALP: 1.8, LNP: 1.8, ONP: 2.4, GRN: 1, IND: 1, KAP: 2.0 };
  function drawErr(st, sd) { const o = {}; Object.entries(PERR).forEach(([p, s]) => { o[p] = +(gauss(st) * s * sd).toFixed(2); }); return o; }
  function capErr(st) { for (let k = 0; k < 6; k++) { const p = project(st, st.pe), bad = ['ALP', 'LNP', 'ONP'].some(q => Math.abs(p.seats[q] - st.seats[q]) > 15); if (!bad) return; Object.keys(st.pe).forEach(q => { st.pe[q] = +(st.pe[q] * 0.7).toFixed(2); }); } }
  function runPolls(st, fresh) {
    const herd = st.spirits.includes('POLL_HERDING'), before = st.poll ? st.poll.seats[st.party] : null;
    const pkeys = st.party === 'KAP' ? ['ALP', 'LNP', 'ONP', 'GRN', 'KAP'] : ['ALP', 'LNP', 'ONP', 'GRN'];
    if (fresh || !st.pubs) { const ps = C.pollsters.slice(); for (let i = ps.length - 1; i > 0; i--) { const j = Math.floor(rnd(st) * (i + 1)); [ps[i], ps[j]] = [ps[j], ps[i]]; }
      st.pubs = ps.slice(0, 2 + (rnd(st) < 0.5 ? 1 : 0)).map(p => { const sh = {}; pkeys.forEach(q => { sh[q] = +((p.lean[q] || 0) * (herd ? 0.3 : 1) + gauss(st) * p.moe * (herd ? 0.35 : 1) * 0.5).toFixed(2); }); return { n: p.n, note: p.note, sh }; });
      st.inSh = {}; pkeys.forEach(q => { st.inSh[q] = +(gauss(st) * 0.25).toFixed(2); }); }
    const tot = q => (st.pe[q] || 0);
    st.polls = st.pubs.map(p => { const sh = {}; Object.keys(p.sh).forEach(q => { sh[q] = tot(q) + p.sh[q]; }); const r = project(st, sh); return { n: p.n, note: p.note, seats: r.seats, nat: r.nat }; });
    if (st.internal >= st.turn) { const sh = {}; Object.keys(st.inSh).forEach(q => { sh[q] = tot(q) * 0.3 + st.inSh[q]; }); const r = project(st, sh); st.polls.push({ n: 'Your internal polling', internal: true, seats: r.seats, nat: r.nat }); }
    const avg = {}; pkeys.forEach(q => { avg[q] = tot(q) + st.pubs.reduce((a, p) => a + (p.sh[q] || 0), 0) / st.pubs.length; });
    st.poll = project(st, avg); seatPolls(st, fresh);
    return before == null ? 0 : st.poll.seats[st.party] - before;
  }

  // ---- deck
  function spillCard(st) {
    const own = C.spill.filter(c => c.party === st.party && c.turn === st.turn);
    return (own.find(c => c.cands && c.cands.includes(st.leader)) || own.find(c => !c.cands)).id;
  }
  // the same issue should not come round again too soon, or too often: each topic has a cap per campaign and a gap in turns
  const TOPIC = {}; Object.entries(C.topics || {}).forEach(([k, o]) => o.ids.forEach(id => { TOPIC[id] = k; }));
  function topicOK(c, st) { const k = TOPIC[c.id]; if (!k || c.req) return true; const o = C.topics[k], u = (st.topics || {})[k];
    return !u || (u.n < o.cap && st.turn - u.last >= o.cd); }
  function eligible(c, st) {
    const L = ldrOf(st);
    return topicOK(c, st) && !c.mile && (!c.minTurn || st.turn >= c.minTurn) && (!c.party || c.party === st.party) && (!c.notParty || !c.notParty.includes(st.party)) && (!c.only || c.only === L.id) && !st.used.includes(c.id) && (!c.mate || (L.mates && L.mates.length))
      && (!c.req || c.req.every(f => st.flags.includes(f) && st.turn >= (st.flagTurn[f] || 0) + (c.after || 0))) && (!c.not || !c.not.some(f => st.flags.includes(f)));
  }
  function drawCard(st) {
    if (st.phase === 'BYELECTION') return 'BY' + st.turn;
    if (st.phase === 'SPILL') return spillCard(st);
    if (st.queue.length) return st.queue[0];
    if (st.revolt) return 'REVOLT';
    if (st.miles[st.turn]) return st.miles[st.turn];
    // consequences come first when they are due
    const pool = C.cards.filter(c => eligible(c, st)), due = pool.filter(c => c.req && c.after);
    if (due.length && rnd(st) < 0.7) return pick(st, due).id;
    // a leader's own card comes round once the campaign is under way
    const own = pool.filter(c => c.only); if (own.length && st.turn >= 6 && rnd(st) < 0.3) return pick(st, own).id;
    // and not two cards on the same broad issue back to back, if there is any choice
    const prev = st.lastTag, fresh = prev ? pool.filter(c => c.tag !== prev) : pool;
    const from = fresh.length >= 5 ? fresh : pool;
    if (!from.length) return 'QUIET';
    // each opening scenario deals more of its own kind of card
    const w = (scenOf(st.scen) || {}).w; let c;
    if (w) { const ws = from.map(x => w[x.tag] || 1), tot = ws.reduce((a, b) => a + b, 0); let r = rnd(st) * tot; c = from[from.length - 1]; for (let i = 0; i < from.length; i++) { r -= ws[i]; if (r <= 0) { c = from[i]; break; } } }
    else c = pick(st, from);
    if (c.id === 'DISENDORSE' && !st.disSeat) st.disSeat = disSeat(st);
    return c.id;
  }
  // a seat your party holds or is chasing closely, for the disendorsement card
  function disSeat(st) { const D = window.APP.D, M = (st.poll && st.poll.margin) || [], spots = new Set((st.spot || []).map(x => x.i));
    const c = D.seats.map((s, i) => ({ i, m: M[i] ? M[i].m : 99, w: M[i] && mineG(st, M[i].w), r: M[i] && mineG(st, M[i].r) })).filter(x => !spots.has(x.i) && (x.w || x.r)).sort((a, b) => a.m - b.m);
    const x = c.find(y => y.w && y.m > 3) || c[0]; return x ? D.seats[x.i].n : (D.seats[Math.floor(rnd(st) * D.seats.length)] || {}).n; }
  const REVOLT = { id: 'REVOLT', t: 'Caucus revolt', k: 'Emergency', q: 'Caucus unity has collapsed. Backbenchers are counting numbers for a spill motion and the leaks are daily. You have to act now.', opts: [
    { x: 'Spend 50 Political Power on a peace deal: promotions, seats and promises.', cost: 50, e: { u: 22, pp: -50 }, h: 'Peace deal quells backbench revolt' },
    { x: 'Ride it out and hope the story moves on.', e: { o: -3, u: 12, m: -2 }, h: 'Revolt leaves campaign reeling' }] };
  const QUIET = { id: 'QUIET', t: 'A quiet day on the trail', q: 'No crisis today. How do you use it?', opts: [
    { x: 'Door-knock in the marginals.', e: { r: { OUT: 0.3 } }, h: 'Leader hits the doors' },
    { x: 'Rest the team.', e: { u: 4, sta: 10 }, h: 'Campaign takes a breather' },
    { x: 'Work the donor phones.', e: { pp: 10 }, h: 'Fundraising day' }] };
  const INTERRUPT = new Set(['REVOLT', 'VENUE', 'PREP', 'SPEC', 'DEB1', 'DEB2', 'DEB3', 'DOOR', 'RECOVER', 'MONEY', 'WORLD', 'LATE']);
  // the leaders' debate: three exchanges, built for this run when the debate comes round
  function debCard(st, n) { const d = st.deb, D = C.debate, top = d.topics[n - 1], tell = d.tell[n - 1];
    return { id: 'DEB' + n, k: 'The leaders’ debate · exchange ' + n + ' of 3', t: top.charAt(0).toUpperCase() + top.slice(1), deb: n,
      q: `The moderator turns to ${top}. ${D.tell[tell]}`, opts: ['a', 'd', 'z'].map(k => ({ x: D.styles[k].replace('{topic}', top), deb: k, tag: 'GENERAL' })) }; }
  function doorCard(st) { const q = C.doorstops[st.doors.cur || 0]; return { id: 'DOOR', k: 'Doorstop · ten seconds to answer', t: q.t, q: q.q, door: true, opts: q.opts.concat([C.doorTimeout]) }; }
  function cardById(id, st) { if (st && id === 'WORLD' && C.world) { const w = C.world[st.worldI || 0], g = st.party === 'ALP'; return { id, k: 'World news · ' + (g ? 'the government responds' : 'you respond'), t: w.t, q: w.q, tag: w.tag, opts: g ? w.gov : w.opp }; }
    if (st && /^BY[1-5]$/.test(id) && st.by) { const b = C.byCards[+id[2] - 1]; return { id, k: 'By-election · ' + st.by.seat + ' · question ' + id[2] + ' of 5', t: b.t, q: b.q || (st.by.t === 'h' ? b.qh : b.qc), opts: b.opts, by: true }; }
    if (st && /^DEB[123]$/.test(id) && st.deb) return debCard(st, +id[3]); if (st && id === 'DOOR') return doorCard(st);
    return id === 'REVOLT' ? REVOLT : id === 'QUIET' ? QUIET : special(id) || C.cards.find(c => c.id === id) || C.spill.find(c => c.id === id); }
  // your job: Labor governs; the Coalition is the Opposition; One Nation sits on the crossbench
  function role(st) { return st.phase === 'BYELECTION' ? 'Candidate' : st.phase === 'SPILL' && !st.spillWon ? 'Challenger' : st.party === 'ALP' ? 'Prime Minister' : st.party === 'LNP' ? 'Opposition Leader' : st.party === 'KAP' ? 'KAP leader' : 'Crossbench leader'; }
  // out of government you can only promise: shared cards' government actions read as promises for the Opposition and crossbench
  const ACTS = new Set(['commit', 'fund', 'guarantee', 'enforce', 'expand', 'ban', 'freeze', 'cut', 'halt', 'repeal', 'restore', 'abolish', 'lift', 'build', 'inject', 'open', 'underwrite', 'introduce', 'mandate', 'extend', 'co-fund', 'co-invest', 'phase', 'scrap', 'exempt', 'tie', 'allow', 'deny', 'double', 'triple', 'reinstate', 'proceed', 'protect', 'uphold', 'lower', 'complete', 'redirect', 'block', 'raise', 'halve', 'wipe', 'boost', 'establish', 'accelerate', 'fast-track', 'cap', 'impose', 'lock', 'enshrine', 'legislate', 'tighten', 'curb', 'offer', 'pair', 'convert', 'subsidise', 'audit', 'match', 'maintain', 'focus', 'prioritise', 'emphasise', 'invest', 'regulate', 'create', 'deliver', 'provide', 'require', 'launch', 'set', 'strengthen', 'write', 'streamline', 'replace', 'remove', 'enact', 'support', 'roll', 'order', 'bring', 'shelve', 'ease', 'crack', 'link', 'include', 'defer', 'suspend', 'refocus', 'balance', 'partner', 'carve', 'grant', 'move', 'press', 'trim', 'rationalise', 'underground', 'offset', 'close', 'appoint', 'empower']);
  function promiseFor(party, x, c, o) { if (party === 'ALP' || c.party || !/^CAMP_/.test(c.id) || c.mile === 1 || c.mile === 5 || (o && (o.only || o.noPromise)) || /\b(promise|pitch|speech|rallies|rallying)\b/i.test(x)) return x; const w = x.split(' '), v = w[0].toLowerCase();
    return ACTS.has(v) ? 'Promise to ' + v + ' ' + w.slice(1).join(' ') : x; }
  const promiseText = (st, x, c, o) => promiseFor(st.party, x, c, o);
  function cardFor(st) { const c = cardById(st.cur, st); if (!c) return null;
    const L = ldrOf(st), mate = (L.mates || [])[0] || 'Your deputy', riv = incOf(rivalOf(st)), rn = riv ? riv.name.split(' ').slice(-1)[0] : 'your rival';
    const fill = s => typeof s === 'string' ? s.replace(/\{mate\}/g, mate).replace(/\{leader\}/g, L.name).replace(/\{seat\}/g, st.disSeat || 'a marginal seat').replace(/\{bn\}/g, Math.round((st.ledger || {}).bn || 0)).replace(/\{rival\}/g, rn).replace(/\{surname\}/g, sname(st)).replace(/\{byseat\}/g, (st.by || {}).seat || 'the seat').replace(/\{again\}/g, L.again ? ' again' : '') : s;
    return { ...c, role: role(st), t: fill(c.t), q: fill(c.q), opts: c.opts.map((o, i) => ({ ...o, x: promiseText(st, fill(o.x), c, o), h: fill(o.h), i })).filter(o => !o.only || o.only === L.id) }; }

  // ---- checks
  function debate(st, tag) { const L = ldrOf(st); let d = L.deb + ((L.debTag || {})[tag] || 0) + (st.unity >= 75 ? 1 : 0) - (st.stamina < 30 ? 1 : 0);
    st.spirits.forEach(id => (spirit(id).deb || []).forEach(([who, b, t]) => { if (t && t !== tag) return; if (who === st.party || (who === 'INC' && C.PARTIES[st.party].gov)) d += b; }));
    return d; }
  function chance(st, rng, tag) {
    let p = rng.k === 'u' ? 0.55 + (st.unity - rng.min) / 50 : 0.55 + 0.13 * ((rng.k === 'd' ? debate(st, tag) : st.mom) + (st.nextBonus || 0) - rng.min);
    if (st.unity < 40) p -= 0.15; else if (st.unity >= 75) p += 0.05;   // a divided team fumbles; a united one lands the risky calls
    return clamp(p, 0.1, 0.92); }

  // ---- effects
  function multFor(st, ctx, party, amt, rg, sta) {
    let m = 1;
    if (ctx.tag) st.spirits.forEach(id => { const s = spirit(id); if (s.mult && s.mult[ctx.tag]) m *= s.mult[ctx.tag]; });
    if (amt < 0 && party === st.party) {
      const L = ldrOf(st), n = L.neg || {}, leads = (st.phase !== 'SPILL' && !(st.phase === 'BYELECTION' && !st.inc)) || st.spillWon;
      if (leads) { if (ctx.tag && n.tag && n.tag[ctx.tag]) m *= n.tag[ctx.tag]; if (rg && n.r && n.r[rg]) m *= n.r[rg]; if (sta && n.st && n.st[sta]) m *= n.st[sta];
        if (ctx.tag && rg && n.tagR && n.tagR[ctx.tag] && n.tagR[ctx.tag][rg]) m *= n.tagR[ctx.tag][rg]; }
      if (ctx.gaffe || ctx.tag === 'CRISIS') { st.spirits.forEach(id => { const s = spirit(id); if (s.gaffe) m *= s.gaffe; }); if (st.shield > st.turn) m *= 0.3; }
    }
    if (amt > 0 && party === st.party) { const p = ldrOf(st).pos || {}; if (ctx.tag && p.tag && p.tag[ctx.tag]) m *= p.tag[ctx.tag]; }
    if (sta && party === st.party && st.tour.includes(sta) && st.phase === 'CAMPAIGN') m *= 1.5;   // you are touring there this week
    return m;
  }
  // final week: pre-poll is open, so each day's news reaches fewer undecided voters
  function banked(st) { return st.phase === 'CAMPAIGN' && st.turn > st.T - 5 ? Math.min(0.5, (st.turn - (st.T - 5)) * 0.1) : 0; }
  function mutate(st, act, id, target) {
    const k = st.spirits.indexOf(id), cur = spirit(id);
    if (act === 'ADD') { if (k < 0 && cur) st.spirits.push(id); return k < 0; }
    if (k < 0 || !cur) return false;
    if (act === 'REMOVE') { if (!cur.removable) return false; st.spirits.splice(k, 1); return true; }
    if (act === 'FORCE') { st.spirits.splice(k, 1); return true; }
    if (act === 'EXPAND') { if (!cur.expandTo) return false; st.spirits[k] = cur.expandTo; return true; }
    if (act === 'REDUCE') { if (cur.reduceTo) { st.spirits[k] = cur.reduceTo; return true; } if (cur.removable) { st.spirits.splice(k, 1); return true; } return false; }
    if (act === 'TRANSFORM') { if (!target || !spirit(target)) return false; st.spirits[k] = target; return true; }
    return false;
  }
  function setFlag(st, f) { if (!st.flags.includes(f)) { st.flags.push(f); st.flagTurn[f] = st.turn; } }
  // apply an effect; returns a list of [label, value, good?, kind] for the clipping
  function apply(st, e, ctx) {
    ctx = ctx || {}; const out = [], own = st.party, a = st.acc, bk = 1 - banked(st), dim = ctx.dim || 1;
    const scale = () => (ctx.decision ? TUNE.dv * dim : VSCALE) * bk;
    const vote = (scope, key, p, v) => { const rg = scope === 'r' ? key : null, sa = scope === 's' ? key : null;
      const amt = v * scale() * (p === 'ONP' && own === 'ONP' ? TUNE.onp : p === 'IND' && own === 'IND' ? TUNE.ind : p === 'KAP' && own === 'KAP' ? TUNE.kap : 1) * (p === own ? (ldrOf(st).damp || 1) : 1) * (p === own && v < 0 && st.bank ? Math.max(0.3, 1 - banked(st) - st.bank) / Math.max(0.3, 1 - banked(st)) : 1) * multFor(st, ctx, p, v, rg, sa);   // insurgents swing harder, both ways; teal seats are elastic, so less
      if (scope === 'n') addPty(a.n, p, amt); else { const o = a[scope][key] = a[scope][key] || {}; addPty(o, p, amt); }
      out.push([(scope === 'n' ? 'National' : scope === 'r' ? RGL[key] : scope === 'seat' ? key : key) + ' · ' + C.PARTIES_N(p), amt, p === own ? amt > 0 : amt < 0, 'v']); };
    if (e.o) vote('n', null, own, e.o);
    if (e.seatSelf && st.disSeat) vote('seat', st.disSeat, own, e.seatSelf);
    if (e.ledger) { const L = st.ledger; if (e.ledger > 0) { L.n++; L.bn += e.ledger; out.push(['Promises', e.ledger, false, 'lg']); } else { const cut = Math.round(L.bn * -e.ledger); L.bn -= cut; out.push(['Promises', -cut, true, 'lg']); } }
    if (e.n) Object.entries(e.n).forEach(([p, v]) => vote('n', null, p, v));
    ['r', 's', 'seat'].forEach(sc => e[sc] && Object.entries(e[sc]).forEach(([k, v]) => { if (typeof v === 'number') vote(sc, k, own, v); else Object.entries(v).forEach(([p, w]) => vote(sc, k, p, w)); }));
    if (own === 'LNP' && st.nats != null && e.r) { const g = x => typeof x === 'number' ? x : (x && x.LNP) || 0; const dn = 4 * (g(e.r.RUR) - g(e.r.IN)); if (Math.abs(dn) >= 1) { st.nats = clamp(st.nats + dn, 0, 100); out.push(['Nationals goodwill', Math.round(dn), dn > 0, 'nt']); }
      if (st.pact != null) { const dp = -0.8 * dn; if (Math.abs(dp) >= 1) { st.pact = clamp(st.pact + dp, 0, 100); out.push(['Coalition agreement', Math.round(dp), dp > 0, 'nt']); } } }
    if (e.pf) Object.entries(e.pf).forEach(([k, v]) => { a.pf[k] = (a.pf[k] || 0) + v; out.push([PFL[k], v, pfGood(k, own, v), 'pf']); });
    if (e.prefDeal) { const k = own === 'ALP' ? 'grn' : 'on'; a.pf[k] += e.prefDeal; out.push([PFL[k], e.prefDeal, pfGood(k, own, e.prefDeal), 'pf']);
      if (ctx.decision && e.prefDeal > 0 && own === 'LNP') ['THREE_WAY_RIGHT_FRACTURE', 'RIGHT_WING_CIVIL_WAR', 'CONSERVATIVE_TRUCE'].forEach(id => { if (mutate(st, 'FORCE', id)) out.push(['Ended: ' + spirit(id).n, 0, true, 'sp']); }); }
    if (e.attack) { const riv = ['ALP', 'LNP', 'ONP'].filter(p => p !== own).sort((p, q) => (st.seats || {})[q] - (st.seats || {})[p])[0];
      addPty(a.n, riv, -e.attack * scale()); out.push(['National · ' + C.PARTIES_N(riv), -e.attack * scale(), true, 'v']); if (st.unity < 50) { st.unity -= 5; out.push(['Caucus unity', -5, false, 'u']); } }
    if (e.u) { st.unity = clamp(st.unity + e.u, 0, 100); out.push(['Caucus unity', e.u, e.u > 0, 'u']); }
    if (e.m) { const m = e.m + (e.m > 0 && st.unity >= 75 ? 1 : 0); st.mom = clamp(st.mom + m, -10, 10); out.push(['Momentum', m, m > 0, 'm']); }
    if (e.pp) { st.pp = Math.max(0, st.pp + e.pp); out.push(['Political Power', e.pp, e.pp > 0, 'pp']); }
    if (e.v) { st.votes = clamp(st.votes + e.v, 0, 100); out.push(['Caucus votes', e.v, e.v > 0, 'cv']); }
    if (e.bank) { const b0 = st.bank || 0; st.bank = Math.min(0.24, b0 + e.bank); out.push(['Your vote banked early', Math.round((st.bank - b0) * 100), true, 'pf']); }
    if (e.pact && st.pact != null) { st.pact = clamp(st.pact + e.pact, 0, 100); out.push(['Coalition agreement', e.pact, e.pact > 0, 'nt']); }
    if (e.nats && st.nats != null) { st.nats = clamp(st.nats + e.nats, 0, 100); out.push(['Nationals goodwill', e.nats, e.nats > 0, 'nt']); }
    if (e.sta) { st.stamina = clamp(st.stamina + e.sta, 0, 100); out.push(['Stamina', e.sta, e.sta > 0, 'sta']); }
    if (e.internal) { st.internal = st.turn + e.internal; out.push(['Internal polling', e.internal, true, 'ip']); }
    if (e.f) e.f.forEach(f => setFlag(st, f));
    if (e.shield) { st.shield = st.turn + e.shield; out.push(['Scandal shield', e.shield, true, 'sh']); }
    if (e.nextBonus) { st.nextBonus = (st.nextBonus || 0) + e.nextBonus; out.push(['Next check', e.nextBonus, true, 'nb']); }
    if (e.sp) e.sp.forEach(([act, id, tgt, only]) => { if (only && only !== own) return; if (st.spirits.includes(id) && !canMove(st, act, id, tgt)) { out.push(['Out of your hands: ' + spirit(id).n, 0, null, 'sp']); return; } const before = st.spirits.slice(); if (mutate(st, act, id, tgt)) {
      const now = st.spirits.find(s => !before.includes(s)); out.push([now ? spirit(id).n + ' → ' + spirit(now).n : 'Cleared: ' + spirit(id).n, 0, spGood(st, id, now), 'sp']); } });
    return out;
  }
  const RGL = { IN: 'Inner metro', OUT: 'Outer metro', PROV: 'Provincial', RUR: 'Rural' };
  const PFL = { grn: 'Greens preferences to Labor', on: 'One Nation preferences to the Coalition', ind: 'Teal-seat preferences to you' };
  C.PARTIES_N = p => ({ ALP: 'Labor', LNP: 'Coalition', ONP: 'One Nation', GRN: 'Greens', IND: 'Independents', KAP: "Katter's Australian Party" })[p] || p;
  const pfGood = (k, own, v) => k === 'ind' ? v > 0 : k === 'grn' ? (own === 'ALP' ? v > 0 : v < 0) : (own === 'LNP' ? v > 0 : v < 0);
  function spGood(st, from, to) { const a = tierFor(st, from), b = to ? tierFor(st, to) : 0; return to ? b >= a : a < 0; }
  // how a spirit sits for the side you are playing: the national mood helps one side and hurts another
  function tierFor(st, id) { const s = spirit(id); if (!s) return 0; if (s.own) return s.tier; const t = (C.spiritSide || {})[id]; return t && t[st.party] != null ? t[st.party] : s.tier; }
  // only the government can move the policy outcomes: the cash rate, the grid, Medicare and defence, and fixing the housing shortfall.
  // Oppositions and the crossbench can still stoke the mood: housing anger, tax, the right's split and cynicism, and win the energy argument.
  const LEVER = ['RBA', 'GRID', 'MEDICARE', 'AUKUS'];
  function canMove(st, act, id, tgt) { const s = spirit(id); if (!s || s.own || C.PARTIES[st.party].gov) return true;
    if (s.grp === 'GRID' && act === 'TRANSFORM' && tgt === 'ENERGY_ABUNDANCE_RESET') return true;
    if (LEVER.includes(s.grp)) return false;
    if (s.grp === 'HOUSING') return act === 'EXPAND' && id !== 'HOUSING_ACCORD_TRACTION';
    return true; }
  function lever(st, id) { const s = spirit(id); return !!s && !s.own && !C.PARTIES[st.party].gov && LEVER.includes(s.grp); }

  // ---- turn flow
  // Political Power is deliberately scarce: about 8–12 a turn
  function ppGain(st) { const L = ldrOf(st); let g = 6 + Math.floor(st.unity / 20) + Math.ceil((L.pp || 0) / 2) + (st.unity >= 75 ? 2 : 0);
    Object.entries(L.ppSpirit || {}).forEach(([id, v]) => { if (st.spirits.includes(id)) g += Math.ceil(v / 2); }); return Math.round(g * dOf(st).pp); }
  function drift(st) {
    const out = [], a = st.acc, gov = 'ALP', own = st.party;
    const fade = o => Object.keys(o).forEach(p => { o[p] *= 1 - FADE; });
    fade(a.n); Object.values(a.r).forEach(fade); Object.values(a.s).forEach(fade); Object.values(a.seat).forEach(fade);
    st.spirits.forEach(id => (spirit(id).drift || []).forEach(([who, v, rg]) => {
      const ps = who === 'INC' ? [gov] : who === 'MAJ' ? ['ALP', 'LNP'] : who === 'ME' ? [own] : [who];
      ps.forEach(p => { if (rg) { const o = a.r[rg] = a.r[rg] || {}; addPty(o, p, v * DSCALE); } else addPty(a.n, p, v * DSCALE); }); }));
    if (st.mom) { addPty(a.n, own, TUNE.mom * st.mom); st.mom -= Math.sign(st.mom); }   // the news cycle moves on: momentum fades a point a turn
    const L = ldrOf(st); st.unity = clamp(st.unity - 1 + (L.unityDrift || 0), 0, 100);   // campaign fatigue
    if (st.unity < 40 && st.unity >= 20) { addPty(a.n, own, -0.4 * VSCALE); st.mom = clamp(st.mom - 1, -10, 10); out.push('Frontbench leaks to the press gallery cost you votes and a point of momentum.'); }
    // the tour: touring states get a daily lift; a hard tour builds momentum and burns stamina
    st.tour.forEach(s => { const o = a.s[s] = a.s[s] || {}; addPty(o, own, st.tourHard ? 0.15 : 0.1); });
    if (st.tourHard) st.mom = clamp(st.mom + 1, -10, 10);
    st.stamina = clamp(st.stamina - (st.tourHard ? 7 : 3), 0, 100);
    if (st.stamina < 30 && rnd(st) < 0.3) { addPty(a.n, own, -0.4 * VSCALE); st.mom = clamp(st.mom - 1, -10, 10); out.push('A tired leader fluffs a line on live television (stamina is low).'); }
    // the Greens and teals move on their own
    if (rnd(st) < 0.22) { const sg = pick(st, C.surges); Object.entries(sg.e.r || {}).forEach(([k, o]) => Object.entries(o).forEach(([p, v]) => { const x = a.r[k] = a.r[k] || {}; addPty(x, p, v * VSCALE); }));
      Object.entries(sg.e.n || {}).forEach(([p, v]) => addPty(a.n, p, v * VSCALE)); out.push(sg.t + '.'); }
    // the Nationals
    if (st.nats != null) { if (st.nats < 25 && !st.spirits.includes('THREE_CORNERED_CONTESTS')) { st.spirits.push('THREE_CORNERED_CONTESTS'); out.push('The Nationals have had enough: they will run against Liberals in regional seats.'); }
      else if (st.nats >= 45 && (st.pact == null || st.pact >= 45) && mutate(st, 'FORCE', 'THREE_CORNERED_CONTESTS')) out.push('Peace in the Coalition: one candidate per seat again.'); }
    // a Nationals-led Coalition: the Liberal party room has its own patience
    if (st.pact != null) { if (st.pact < 25) { st.unity = clamp(st.unity - 2, 0, 100); out.push('The Coalition agreement is fraying: Liberal MPs brief against you (unity −2).');
        if (!st.spirits.includes('THREE_CORNERED_CONTESTS')) { st.spirits.push('THREE_CORNERED_CONTESTS'); out.push('The Liberals will run their own candidates against Nationals in regional seats.'); } }
      else if (st.pact >= 75 && st.turn % 5 === 0) { st.pp += 5; out.push('The Liberal machine is all in: +5 Political Power.'); } }
    if (st.turn === st.T - 1 && (st.ledger || {}).bn >= 35 && !st.flags.includes('PASSED_PBO_CLEAN')) { addPty(a.n, own, -0.4 * VSCALE); out.push('Stories about a costings black hole dog the final days.'); }
    // a late swing the polls will not see
    if (st.turn === st.T - 2 && st.late && !st.lateDone) { Object.entries(st.late).forEach(([p, v]) => { addPty(a.n, p, v); st.pe[p] = +((st.pe[p] || 0) - v).toFixed(2); }); st.lateDone = true; }
    // your base: hold a strong position in a seat type for three turns and it delivers
    Object.keys(st.base).forEach(k => { const v = ((a.r[k] || {})[own] || 0) + 0.5 * (a.n[own] || 0); st.base[k] = +v.toFixed(2);
      st.baseRun[k] = v >= 2 ? st.baseRun[k] + 1 : 0; if (st.baseRun[k] >= 3 && !st.flags.includes('BASE_' + k)) { setFlag(st, 'BASE_' + k); out.push(`Your ${RGL[k].toLowerCase()} base is rock solid: it has something to offer.`); } });
    return out;
  }
  function autoSpirits(st, pr) {
    const out = [], has = id => st.spirits.includes(id), fl = f => st.flags.includes(f), mt = milestoneTurns(st.T);
    const rm = (ids, why) => ids.forEach(id => { if (has(id) && mutate(st, 'FORCE', id)) out.push(why + ': ' + spirit(id).n + ' cleared.'); });
    if (st.turn === mt[2] && fl('PASSED_PBO_CLEAN') && st.unity >= 65) rm(['RBA_485_SQUEEZE', 'RBA_RATE_RELIEF_HORIZON'], 'Clean costings and a united team');
    if (fl('PRESS_CLUB_HOUSING') && fl('MORTGAGE_BLITZ')) rm(['HOUSING_SHORTFALL_400K', 'HOUSING_ACCORD_TRACTION', 'HOUSING_REVOLT'], 'Housing compact plus the suburbs blitz');
    if (st.party !== 'ALP' && fl('PASSED_PBO_CLEAN') && st.turn >= mt[1] && !fl('MEDICARE_AUDITED')) { setFlag(st, 'MEDICARE_AUDITED'); rm(['MEDICARE_JULY_PACKAGE', 'MEDICARE_GAP_STRAIN'], 'Your costings audit of Labor’s spending'); }
    const gain = pr && st.nat0 ? (pr.nat[st.party] - st.nat0[st.party]) : 0;
    if (!has('CAMPAIGN_WAVE') && st.mom >= 6 && gain >= 1.5) { mutate(st, 'FORCE', 'CAMPAIGN_FREEFALL'); st.spirits.push('CAMPAIGN_WAVE'); out.push('Your campaign has caught a wave: sustained momentum now adds to your vote every turn.'); }
    else if (has('CAMPAIGN_WAVE') && st.mom <= 2) { mutate(st, 'FORCE', 'CAMPAIGN_WAVE'); out.push('The wave has broken: momentum has stalled.'); }
    if (!has('CAMPAIGN_FREEFALL') && st.mom <= -5 && gain <= -1.5) { mutate(st, 'FORCE', 'CAMPAIGN_WAVE'); st.spirits.push('CAMPAIGN_FREEFALL'); out.push('Your campaign is in freefall: bad news now costs you votes every turn.'); }
    else if (has('CAMPAIGN_FREEFALL') && st.mom >= -1) { mutate(st, 'FORCE', 'CAMPAIGN_FREEFALL'); out.push('The freefall has stopped.'); }
    if (has('ANTI_ESTABLISHMENT_CYNICISM') && st.unity < 35) { mutate(st, 'EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM'); out.push('A divided team feeds the mood: Canberra cynicism becomes “throw the bums out”.'); }
    if (st.turn === mt[3] && fl('M12_WIN') && fl('M18_WIN') && st.unity >= 60) rm(['ANTI_ESTABLISHMENT_CYNICISM', 'CAUTIOUS_REENGAGEMENT'], 'Two big wins with a united team');
    if (pr && pr.nat.ONP > pr.nat.LNP + 3 && pr.seats.ONP > pr.seats.LNP && !has('NEW_RIGHT_REALIGNMENT')) {
      const k = st.spirits.findIndex(id => spirit(id).grp === 'RIGHT'); if (k >= 0) { st.spirits[k] = 'NEW_RIGHT_REALIGNMENT'; out.push('One Nation has overtaken the Coalition: the right realigns.'); } }
    return out;
  }
  // a headline for cards that came without one: the leader's surname and the option, turned into a news verb
  const HL_IRR = { have: 'has', do: 'does', go: 'goes', be: 'is' };
  const HL_VERBS = new Set([...ACTS, 'back', 'keep', 'hold', 'put', 'scale', 'promise', 'target', 'take', 'warn', 'deflect', 'defend', 'attack', 'champion', 'deploy', 'avoid', 'reject', 'oppose', 'ignore', 'let', 'run', 'rule', 'signal', 'urge', 'threaten', 'brush', 'pivot', 'blame', 'accuse', 'wear', 'soften', 'convene', 'reassure', 'stand', 'insist', 'embrace', 'split', 'blitz', 'restrict', 'pull', 'replace', 'buy', 'charter', 'thank', 'fire', 'adopt', 'surge', 'stay', 'lead', 'crack', 'front', 'claim', 'point', 'dismiss', 'tailor', 'counter-attack', 'demand', 'seek', 'send', 'wait', 'make', 'release', 'turn', 'process', 'have', 'do', 'go', 'shout', 'talk', 'skip', 'cook', 'bring', 'play', 'hang', 'complain', 'correct', 'laugh', 'accept', 'decline', 'agree', 'refuse', 'give', 'drop', 'find', 'name', 'say', 'concede', 'tell', 'unveil', 'announce', 'deliver', 'spend', 'pour', 'call', 'end', 'start', 'pass', 'stop', 'join', 'water', 'rely', 'stick', 'rein', 'broker', 'crush', 'pause', 'reward', 'publish', 'use', 'pitch', 'win', 'issue', 'invite', 'denounce', 'propose', 'pursue', 'argue', 'direct', 'negotiate', 'delay', 'reserve', 'relocate', 'train', 'apologise', 'privatise', 'slash', 'tax', 'deport', 'seal', 'upgrade', 'speed', 'ring-fence', 'fix']);
  const HL_CONJ = v => { const lc = v.toLowerCase(); if (HL_IRR[lc]) return HL_IRR[lc]; return /(s|sh|ch|x|z|o)$/.test(lc) ? lc + 'es' : /[^aeiou]y$/.test(lc) ? lc.slice(0, -1) + 'ies' : lc + 's'; };
  const HL_KEEP_CAP = /^(ACCC|AFP|AI|AUKUS|ABC|SBS|ACT|ADF|APS|CPI|DVA|EPA|EV|FBT|FOI|GDP|GP|GST|HECS|ID|IR|KAP|LNP|M1|NACC|NDIS|NSW|NT|ONP|PALM|PBO|PBS|QLD|RBA|SA|TAFE|TAS|WA|Australian|Indo-Pacific|Torrens|Canberra|Geelong|Darwin|Brisbane|Adelaide|Perth|Hobart|Sydney|Melbourne|Medicare|CopperString|Snowy|Marinus|Whyalla|Collie|Kemerton|Derwent|Bruce|Princes|Western|Far|Northern|South-West|Great|Pacific|Asia|Labor|Coalition|Nationals|Greens|Teals|Joyce|Hanson|Future|National|People’s|Your|Fee-Free)\b/;
  const HL_NOUNY = new Set(['support', 'water', 'fire', 'lower', 'lead', 'use', 'point', 'claim', 'demand', 'signal', 'pitch', 'pass', 'cut', 'cap', 'tax', 'fund', 'grant', 'boost', 'lift', 'lock', 'link', 'match', 'stand', 'turn', 'call', 'scale', 'offset', 'trim', 'drop', 'rule', 'blame', 'play', 'name', 'run', 'focus', 'open', 'close', 'press', 'pause', 'set', 'stay', 'end', 'start', 'stop', 'back', 'build', 'put', 'roll', 'rein', 'wait', 'talk', 'hang', 'give', 'find', 'say']);
  function headline(st, x) {
    const sn = ldrOf(st).name.split(' ').slice(-1)[0];
    const clean = x.replace(/\.$/, '').trim();
    const w = clean.split(' '), v = w[0], lc = v.toLowerCase();
    if (/^[A-Z][a-z'’-]+$/.test(v) && HL_VERBS.has(lc)) {
      let rest = w.slice(1).join(' ').replace(/\byour\b/g, 'their');
      // conjugate clear second/third imperative verbs after " and " or ", " (skipping hyphenated modifiers and noun-phrase tails)
      if (lc !== 'promise') {
        const conjClause = (m, lead, sep, v2, next) => {
          if (!HL_VERBS.has(v2)) return m;
          const phrasal = (v2 === 'focus' && next === 'on') || (v2 === 'lock' && next === 'in') || (v2 === 'rule' && next === 'out') || (v2 === 'crack' && next === 'down') || (v2 === 'roll' && next === 'out') || (v2 === 'press' && next === 'ahead') || (v2 === 'fire' && next === 'back') || (v2 === 'brush' && next === 'off') || (v2 === 'back' && next === 'down') || (v2 === 'stand' && /^(with|by|firm)$/.test(next)) || (v2 === 'run' && /^(a|an|open|targeted)$/.test(next)) || (v2 === 'open' && /^(up|routes|the|a|\d)/.test(next)) || (v2 === 'close' && /^(offshore|family|the|a)/.test(next));
          if (v2 === 'fund') {
            if (/^(and|or|for|of|in|to|on|with|from|by|at|as)$/i.test(next)) return m;
            return lead + sep + HL_CONJ(v2);
          }
          if (!phrasal && HL_NOUNY.has(v2) && /^(and|or|for|of|in|to|on|with|from|by|at|as|into|without|while|until|over|under|through|across|before|after|interest|rates|cuts|caps|grants|funds|rules|laws|reform|relief|offsets|credits|incentives|levies|taxes|charges|prices|bills|hubs|plans|deals|targets|schemes|programs|standards|mandates|settings|permits|approvals|upgrades|projects|services|jobs|homes|places|training|measures|powers|checks|audits|reviews|inquiries|subsidies|rebates|reserves|corridors|estates|zones|stations|lines|plants|networks|systems|markets|sectors|exports|imports|stocks|works|sites|centres|clinics|beds|wards|schools|loans|fees|fines|penalties|tests|checks|caps|limits|quotas|targets|bonuses|payments|packages|programs|initiatives|reforms|strategies|agreements|compacts|accords|pacts|policies|legislation|bills|acts|laws|rules|codes|guidelines|benchmarks|targets|thresholds|exemptions|carve-outs|safeguards|protections|guarantees|commitments|promises|pledges|proposals|measures|steps|actions|efforts|drives|pushes|campaigns|blitzes|tours|rallies|events|forums|summits|roundtables|panels|committees|commissions|inquiries|audits|reviews|reports|studies|trials|pilots|tests|checks)$/i.test(next)) return m;
          return lead + sep + HL_CONJ(v2);
        };
        rest = rest.replace(/(^| )(and )([a-z-]+)(?= ([A-Za-z0-9$“‘][A-Za-z0-9’'-]*))/g, conjClause);
        rest = rest.replace(/(, )([a-z-]+) (?=[^,]*and )/g, (m, sep, v2) => {
          if (!HL_VERBS.has(v2) || (HL_NOUNY.has(v2) && !/^(boost|speed|apologise)$/.test(v2))) return m;
          return sep + HL_CONJ(v2) + ' ';
        });
      }
      return `${sn} ${HL_CONJ(v)} ${rest}`.replace(/\s+/g, ' ').trim();
    }
    const body = HL_KEEP_CAP.test(clean) ? clean : clean.charAt(0).toLowerCase() + clean.slice(1);
    return `${sn} backs ${body}`;
  }

  // the clipping's colour follows the seat change it reports; only when the seats do not move does it judge the pick against the card's typical answer
  const tone = (pd, net) => pd > 0 ? 'up' : pd < 0 ? 'dn' : net > 0.15 ? 'up' : net < -0.15 ? 'dn' : 'flat';
  // choose an option on the current card
  function choose(st, i) {
    ens(st);
    const c = cardFor(st), o = c && c.opts.find(x => x.i === i); if (!o) return null;
    if (o.cost && st.pp < o.cost) return null;
    const ctx = { tag: o.tag || c.tag, gaffe: c.gaffe }, u0 = st.unity, interrupt = INTERRUPT.has(c.id), camp = st.phase === 'CAMPAIGN', s0 = (st.seats || {})[st.party] || 0, extra = {};
    let ok = null, e = o.e || {};
    if (o.rng) { const p = chance(st, o.rng, ctx.tag); ok = rnd(st) < p; e = ok ? o.rng.ok : o.rng.no; st.nextBonus = 0; }
    else if (o.deb) {   // a debate exchange: attack beats a one-liner, calm beats attack, a one-liner beats calm; a mirror comes down to skill
      const n = c.deb, theirs = st.deb.styles[n - 1], beats = { a: 'z', d: 'a', z: 'd' };
      ok = o.deb === theirs ? rnd(st) < chance(st, { k: 'd', min: 1 }, 'GENERAL') : beats[o.deb] === theirs;
      e = ok ? { o: 0.35, m: 1 } : { o: -0.3, m: -1 }; st.deb.wins += ok ? 1 : 0; extra.deb = { n, mine: o.deb, theirs, win: ok, rival: st.deb.rival };
      if (n === 3) { st.debWins = st.deb.wins; st.nextBonus = 0; } }
    let fx;
    // a by-election is local: only the seat, unity and Political Power move (momentum here counts as half a point in the seat)
    if (st.phase === 'BYELECTION') { const { u, m, pp } = e, b = (e.b || 0) + (m || 0) * 0.5; fx = apply(st, { u, pp }, ctx);
      if (b) { st.by.m = +(st.by.m + b).toFixed(1); fx.unshift(['Your vote in ' + st.by.seat, b, b > 0, 'pf']); } extra.bym = st.by.m; }
    // a leadership spill moves caucus votes, unity and Power only; its effect on the polls comes once, when it ends
    else if (st.phase === 'SPILL') { const { v, u, pp, f, nats, pact } = e; fx = apply(st, { v, u, pp, f, nats, pact }, ctx); }
    else fx = apply(st, e, ctx);
    setFlag(st, c.id + '#' + i);
    // leader-only answers go into the collection
    if (o.lo) { if (!st.lo.includes(o.lo)) st.lo.push(o.lo); loAdd(o.lo); }
    // a backflip: taking the other side of an issue you have already taken a side on
    if (o.st && camp) { const [iss, sg] = [o.st.slice(0, -1), o.st.slice(-1)], prev = st.stances[iss];
      if (prev && prev !== sg) { st.backflips++; extra.backflip = iss; fx.push(['Backflip on ' + (C.stanceNames[iss] || iss), 0, false, 'sp'], ...apply(st, { o: -0.35, m: -2, u: -3 }, { gaffe: true })); }
      st.stances[iss] = sg; }
    // the promise ledger
    if (camp && !interrupt && C.promiseRx && C.promiseRx.test(o.x) && !C.promiseNo.test(o.x) && o.st !== 'spending-') {
      const bn = 2 + ((hash(o.x) >>> 0) % 5); st.ledger.n++; st.ledger.bn += bn; extra.promise = bn; }
    if (c.id === 'LATE' && (banked(st) + (st.bank || 0)) > 0) extra.banked = Math.round((banked(st) + (st.bank || 0)) * 100);
    if (c.id === 'DOOR') { st.doors.n++; if (o.timeout) st.doors.t++; extra.door = o.timeout ? 'timeout' : 'answered'; }
    if (c.id === 'RECOVER' && o.recover === 'double' && ok) setFlag(st, 'DOUBLED_DOWN');
    const p1 = camp ? project(st).seats[st.party] : null; let p2 = p1;
    if (st.phase === 'CAMPAIGN' && !interrupt && c.id !== 'QUIET') {
      const ws = c.opts.filter(x => !x.cost || st.pp >= x.cost).map(x => optWorth(st, x, x.tag || c.tag)), mean = ws.reduce((a, b) => a + b, 0) / ws.length;
      const back = -TUNE.k * dOf(st).k * mean * VSCALE * (1 - banked(st)) * (st.party === 'ONP' ? TUNE.onp : st.party === 'KAP' ? 1.15 : 1); if (back) { addPty(st.acc.n, st.party, back); if (Math.abs(back) >= 0.02) fx.push(['Rivals answer back', back, back > 0, 'v']); }
      p2 = project(st).seats[st.party]; }
    if (!interrupt && c.id !== 'QUIET') { st.used.push(c.id); st.lastTag = c.tag || null; const k = TOPIC[c.id];
      if (k) { st.topics = st.topics || {}; const u = st.topics[k] = st.topics[k] || { n: 0, last: -99 }; u.n++; u.last = st.turn; } }
    if (st.leader === 'tim_wilson' && /PBO|B2_16|B3_02/.test(c.id) && c.mile === 2 && i === 0) { st.mom = clamp(st.mom + 2, -10, 10); fx.push(['Momentum', 2, true, 'm']); }
    const notes = [], entry = { phase: st.phase, turn: st.turn, card: c.id, t: c.t, opt: o.x, h: o.h || (c.id.startsWith('CAMP_') || c.id.startsWith('SEAT_') ? headline(st, o.x) : c.t), ok, fx, interrupt, ...extra };
    if (extra.backflip) notes.push(`XYZ News: ${sname(st)} backflips on ${C.stanceNames[extra.backflip] || extra.backflip}.`);
    if (extra.deb && extra.deb.n === 3) notes.push(`The worm: you won ${st.deb.wins} of 3 exchanges.`);
    if (extra.promise && st.ledger.bn >= 20 && st.turn >= 8 && !st.flags.includes('MONEY_DONE')) { setFlag(st, 'MONEY_DONE'); st.queue.push('MONEY'); notes.push(`Your rivals are adding up your promises: about $${Math.round(st.ledger.bn)} billion.`); }
    if (st.phase === 'BYELECTION') {
      if (st.turn >= 5) { const L = ldrOf(st), res = +clamp(st.by.m + gauss(st) * 1.2, 30, 75).toFixed(1), sw = +(res - st.by.m0).toFixed(1); st.by.res = res; st.by.sw = sw;
        byTable(st);
        if (res < 50) { st.phase = 'FAILED'; st.failWhy = 'by'; entry.notes = [`You lose the ${st.by.seat} by-election, ${res.toFixed(1)}% to ${(100 - res).toFixed(1)}%. The comeback is over before it starts.`]; entry.by = st.by; entry.ach = A.check(st, null); st.log.push(entry); save(st); return entry; }
        notes.push(`You win ${st.by.seat}: ${res.toFixed(1)}% to ${(100 - res).toFixed(1)}% after preferences.`); entry.by = st.by;
        const swl = `a swing of ${sw >= 0 ? '+' : '−'}${Math.abs(sw).toFixed(1)} points ${sw >= 0 ? 'to' : 'against'} you from a start of ${st.by.m0.toFixed(1)}%`;
        // the reward is measured from where the seat started, not from 50%
        if (st.inc) { const pb = clamp(Math.round(sw * 3), 0, 20); st.pp += pb;
          notes.push(`${swl[0].toUpperCase() + swl.slice(1)}: ${pb ? `+${pb} Political Power for the campaign` : 'no bonus'}.`); st.phase = 'CAMPAIGN'; st.turn = 1; startCampaign(st); notes.push('The general election campaign begins.'); }
        else { const vb = clamp(Math.round(sw * 1.5), 0, 12); st.by.vb = vb; st.votes = clamp(st.votes + vb, 0, 100);
          notes.push(vb ? `${swl[0].toUpperCase() + swl.slice(1)}: +${vb} caucus votes for your challenge.` : `${swl[0].toUpperCase() + swl.slice(1)}: nobody in the party room is impressed, so no extra caucus votes.`);
          st.phase = 'SPILL'; st.turn = 1; notes.push('Now for the leadership.'); }
      } else st.turn++;
    } else if (st.phase === 'SPILL') {
      if (c.ballot && st.votes < 50) { st.phase = 'FAILED'; st.failWhy = 'spill'; entry.notes = ['The spill motion fails. You are banished to the backbench.']; entry.ach = A.check(st, null); st.log.push(entry); save(st); return entry; }
      if (st.turn >= 5) { st.spillWon = true; const L = ldrOf(st);
        // the change of leader reaches the polls once, now: a decisive win brings a lift, a bloodied one costs votes
        const shift = st.votes >= 60 ? 0.6 : st.votes > 53 ? 0.3 : -0.5; addPty(st.acc.n, st.party, shift * VSCALE); entry.shift = shift;
        if (st.votes <= 53) { st.unity -= 10; notes.push(`A bloodied win on ${Math.round(st.votes)}%: unity −10, and the change of leader costs you votes.`); }
        else notes.push(`A ${st.votes >= 60 ? 'decisive' : 'clear'} win on ${Math.round(st.votes)}%: the change of leader gives you a ${st.votes >= 60 ? 'strong' : 'small'} lift in the polls.`);
        let adj = L.unityAdj || 0; if (L.schism && st.flags.includes('SPILL_HANSON_BLESSING')) adj += L.schism; st.unity = clamp(st.unity + adj, 0, 100);
        if (adj) notes.push(`${L.minus[0]}: unity ${adj > 0 ? '+' : ''}${adj}.`);
        st.phase = 'CAMPAIGN'; st.turn = 1; startCampaign(st); notes.push(`You are the new ${C.PARTIES[st.party].n} leader. The campaign begins.`);
      } else st.turn++;
    } else if (interrupt) {
      st.queue = st.queue.filter(q => q !== c.id);
      if (c.id === 'REVOLT') { st.revolt = false; notes.push('The revolt is dealt with, for now.'); }
      if (c.id === 'SPEC' && e.spec === 'lost') { st.phase = 'FAILED'; st.failWhy = 'rolled'; entry.notes = ['You lose the party-room vote. Your party changes leader in the middle of the campaign.']; entry.ach = A.check(st, null); st.log.push(entry); save(st); return entry; }
      if (c.id === 'SPEC' && ok) notes.push('You win the snap vote. The speculation is over.');
    } else {
      notes.push(...drift(st));
      const L = ldrOf(st), wk = st.T / 5, mt = milestoneTurns(st.T);
      if (L.clash && st.turn % wk === 0 && rnd(st) < L.clash) { addPty(st.acc.n, st.party, -0.4 * VSCALE); st.mom = clamp(st.mom - 1, -10, 10); notes.push('Off-message clash on the trail: the two big names contradict each other on camera.'); entry.clash = true; }
      // after each milestone a rival answers, visibly
      if (c.mile) { const riv = rivalOf(st), base = cardById(c.id), wf = x => x.rng ? 0.55 * worth(x.rng.ok, riv) + 0.45 * worth(x.rng.no, riv) : worth(x.e, riv);
        // your rival plays the same milestone, picking what suits them best (with a little noise)
        const best = base.opts.filter(x => !x.only && !x.cost).map(x => [x, wf(x) + gauss(st) * 0.15]).sort((a, b) => b[1] - a[1])[0];
        const amt = +clamp(Math.max(0.05, wf(best[0])) * 0.55 * VSCALE * dOf(st).rival, 0.05, 0.8).toFixed(2); addPty(st.acc.n, riv, amt);
        const R = incOf(riv); entry.rival = { p: riv, who: R ? R.name : C.PARTIES_N(riv), x: promiseFor(riv, best[0].x, base, best[0]), amt, t: pick(st, C.rival[riv] || ['']) };
        if (c.mile === 3 || c.mile === 5) { const ex = { fx: [], notes: [], endorse: [] }; endorse(st, ex); if (ex.endorse.length) { entry.endorse = ex.endorse; fx.push(...ex.fx); notes.push(...ex.notes); } } }
      const pr = project(st); notes.push(...autoSpirits(st, pr));
      st.minUnity = Math.min(st.minUnity, st.unity);
      if (st.unity < 20) { st.revolt = true; notes.push('Unity has fallen below 20: a caucus revolt is coming.'); }
      else if (st.unity < 30 && !st.flags.includes('SPEC_DONE')) { setFlag(st, 'SPEC_DONE'); st.queue.push('SPEC'); notes.push('Your colleagues are talking about the leadership.'); }
      if (st.turn % wk === 0 && st.turn < st.T) { st.review = st.turn / wk; st.needTour = 1; }
      // after a backfire, a gaffe or a clash, the morning-after card
      if ((ok === false || entry.clash || notes.some(n => /fluffs a line/.test(n))) && rnd(st) < 0.6 && st.turn - (st.lastRecover || -9) >= 3 && !st.queue.includes('RECOVER')) { st.queue.push('RECOVER'); st.lastRecover = st.turn; }
      st.turn++;
      if (st.worldT == null && C.world) { st.worldT = 11 + Math.floor(rnd(st) * 9); st.worldI = Math.floor(rnd(st) * C.world.length); }
      if (st.turn === st.worldT && !st.flags.includes('WORLD_DONE') && st.turn !== mt[3]) { setFlag(st, 'WORLD_DONE'); st.queue.push('WORLD'); }
      if (st.turn === st.T - 1 && C.special.LATE && !st.flags.includes('LATE_DONE') && rnd(st) < 0.6) { setFlag(st, 'LATE_DONE'); st.queue.push('LATE'); }
      if (st.turn === mt[3]) { st.queue.push('PREP', 'DEB1', 'DEB2', 'DEB3'); setDebate(st); }
      // a doorstop: up to three a campaign, never on a milestone day
      else if (st.turn >= 3 && st.turn < st.T && !st.miles[st.turn] && st.doors.n < 3 && !st.queue.includes('DOOR') && rnd(st) < 0.16) {
        const left = C.doorstops.map((_, k) => k).filter(k => !st.doors.used.includes(k)); if (left.length) { st.doors.cur = pick(st, left); st.doors.used.push(st.doors.cur); st.queue.push('DOOR'); } }
      if (st.turn > st.T) st.phase = 'ELECTION';
      else { const g = ppGain(st); st.pp += g; st.ppEarned = (st.ppEarned || 0) + g; }
    }
    entry.notes = (entry.notes || []).concat(notes);
    const pr = project(st); entry.seatsBefore = st.seats; st.seats = pr.seats; st.nat = pr.nat; st.central = pr.central; entry.seats = pr.seats;
    const prevC = st.poll && st.poll.central ? st.poll.central.slice() : null;
    // the polls do not move during a by-election or a spill; they catch up when the campaign begins
    entry.pd = st.phase === 'SPILL' || st.phase === 'BYELECTION' ? 0 : runPolls(st, !interrupt);
    whyOf(st, entry, s0, p1, p2, pr.seats[st.party], camp && !interrupt); rippleOf(st, entry, prevC);
    if (camp && !interrupt && entry.turn % (st.T / 5) === 0) checkTarget(st, entry.notes);
    targetDue(st);
    if (!interrupt && st.phase !== 'SPILL' && entry.phase !== 'BYELECTION' && entry.phase !== 'SPILL') histPush(st, entry.turn);
    // the clipping's tone: did this pick beat the card's typical answer?
    { const sc = x => ((x.e || {}).v || 0) + ((x.e || {}).u || 0) / 3 + ((x.e || {}).o || 0) * 2;
      let net;
      if (entry.phase === 'BYELECTION') { const bb = x => x.rng ? 0.5 * ((x.rng.ok.b || 0) + (x.rng.no.b || 0)) : ((x.e || {}).b || 0), all = c.opts.map(bb), m = all.reduce((a, b) => a + b, 0) / all.length; net = ((e.b || 0) - m) / 2; }
      else if (entry.phase === 'SPILL') { const all = c.opts.map(sc), m = all.reduce((a, b) => a + b, 0) / all.length; net = (sc(o) - m) / 3; }
      else { const all = c.opts.map(x => optWorth(st, x, x.tag || c.tag)), m = all.reduce((a, b) => a + b, 0) / all.length; net = worth(e, st.party) - m + (st.unity - u0) / 60; }
      entry.dn = net; entry.tone = tone(entry.phase === 'SPILL' || entry.phase === 'BYELECTION' ? 0 : entry.pd, net); }
    if (st.phase === 'CAMPAIGN' || st.phase === 'SPILL' || st.phase === 'BYELECTION') st.cur = drawCard(st);
    entry.ach = A.check(st, null);
    st.log.push(entry); save(st); return entry;
  }
  // the weekly tour: two states, normal or hard pace
  function setTour(st, states, hard) { st.tour = states.slice(0, 2); st.tourHard = !!hard; st.needTour = 0; st.review = 0; st.needTarget = 1; targetDue(st); st.cur = drawCard(st); save(st); }
  // ---- the pieces around a pick
  // why the seat count moved: your choice, the rivals answering back, the rest of the day's news, and the polls themselves
  function whyOf(st, entry, s0, p1, p2, p3, full) { if (entry.phase === 'SPILL' || entry.phase === 'BYELECTION') return;
    entry.why = full ? { choice: p1 - s0, back: p2 - p1, news: p3 - p2, polls: entry.pd - (p3 - s0) } : { choice: p3 - s0, polls: entry.pd - (p3 - s0) }; }
  // the seats whose poll leader changed, so the map can flash them (gained for you, lost by you, or changed between others)
  function rippleOf(st, entry, prevC) { if (!prevC || !st.poll || !st.poll.central) return; const out = [];
    st.poll.central.forEach((g, i) => { const f = prevC[i]; if (f === g) return; out.push([i, mineG(st, g) ? 1 : mineG(st, f) ? -1 : 0]); }); entry.rip = out.slice(0, 40); }
  // the debate is set the day it comes round: the rival, three topics, how the rival will play each exchange, and a tip that is usually right
  function setDebate(st) { const riv = rivalOf(st), R = incOf(riv), D = C.debate, lean = (R && D.lean[R.id]) || { a: 0.4, d: 0.35, z: 0.25 };
    const topics = D.topics.slice(); for (let i = topics.length - 1; i > 0; i--) { const j = Math.floor(rnd(st) * (i + 1)); [topics[i], topics[j]] = [topics[j], topics[i]]; }
    const style = () => { let r = rnd(st); for (const k of ['a', 'd', 'z']) { r -= lean[k]; if (r <= 0) return k; } return 'z'; };
    const styles = [style(), style(), style()], tell = styles.map(x => rnd(st) < 0.7 ? x : pick(st, ['a', 'd', 'z'].filter(y => y !== x)));
    st.deb = { rival: riv, topics: topics.slice(0, 3), styles, tell, wins: 0 }; }
  // endorsements: each group scores your campaign; two points or more and they endorse you
  function endorse(st, out) { const got = st.endorse;
    (C.endorsers || []).forEach(x => { if (got.includes(x.id)) return; let sc = (x.base || {})[st.party] || 0;
      Object.entries(x.st || {}).forEach(([iss, [pl, mi]]) => { const v = st.stances[iss]; if (v === '+') sc += pl; else if (v === '-') sc += mi; });
      Object.entries(x.flags || {}).forEach(([f, v]) => { if (st.flags.includes(f)) sc += v; });
      if (x.nats && st.nats != null && st.nats >= x.nats) sc += 1;
      if (x.lead) { const sp = (st.poll || st).seats, top = ['ALP', 'LNP', 'ONP', 'GRN', 'IND', 'KAP'].sort((a, b) => (sp[b] || 0) - (sp[a] || 0))[0]; if (top === st.party) sc += x.lead + (st.mom > 0 ? 1 : 0); }
      if (sc >= 2) { got.push(x.id); out.fx.push(...apply(st, x.fx, {})); out.notes.push(`${x.n} endorses you.`); out.endorse.push(x.n); } }); }
  // weekly targets: one goal a week, judged on the Friday; meeting it is worth Political Power and a point of momentum
  function targetDue(st) { if (!st.needTarget || st.phase !== 'CAMPAIGN' || !st.poll) return; st.needTarget = 0;
    const big = ['ALP', 'LNP', 'ONP'].includes(st.party), ks = ['seats', 'vote']; if (st.mom < 3) ks.push('mom'); if (st.unity < 75) ks.push('unity');
    const k = pick(st, ks), w = Math.min(5, Math.ceil(st.turn / (st.T / 5)));
    const v = k === 'seats' ? (st.poll.seats[st.party] || 0) + (big ? 3 : st.party === 'KAP' ? 2 : 1) : k === 'vote' ? +((st.poll.nat[st.party] || 0) + 0.5).toFixed(1) : k === 'mom' ? 3 : Math.max(50, Math.round(st.unity) - 5);
    st.target = { w, k, v }; }
  function checkTarget(st, notes) { const t = st.target; if (!t) return;
    const cur = t.k === 'seats' ? st.poll.seats[st.party] : t.k === 'vote' ? +st.poll.nat[st.party].toFixed(1) : t.k === 'mom' ? st.mom : Math.round(st.unity), ok = cur >= t.v;
    st.targets.push({ ...t, ok, got: cur }); st.target = null;
    if (ok) { st.pp += 10; st.mom = clamp(st.mom + 1, -10, 10); notes.push('Weekly target met: +10 Political Power and a point of momentum.'); } else notes.push('Weekly target missed.'); }
  function decisionsFor(st) {
    const L = ldrOf(st);
    return C.decisions.filter(d => (!d.party || d.party === st.party) && (!d.rally || L.rally || (L.id === 'barnaby_joyce' && st.flags.includes('SPILL_HANSON_BLESSING')))).map(d => {
      const u = st.dec[d.id] || { n: 0, last: -99 }; let cost = st.party === 'ONP' && d.costONP ? d.costONP : d.cost; if (L.disc && L.disc[d.id]) cost = Math.round(cost * L.disc[d.id]);
      const wait = Math.max(0, u.last + d.cd - st.turn, (d.from || 0) - st.turn), left = d.max - u.n, eff = Math.pow(0.7, u.n);
      return { ...d, cost, wait, left, eff, can: st.phase === 'CAMPAIGN' && !st.revolt && !st.queue.length && st.pp >= cost && !wait && left > 0 }; });
  }
  function enact(st, id) {
    const d = decisionsFor(st).find(x => x.id === id); if (!d || !d.can) return null;
    ens(st); const nat0 = st.nat[st.party], u0 = st.unity, s0 = st.seats[st.party]; st.pp -= d.cost; const u = st.dec[id] = st.dec[id] || { n: 0, last: -99 }; u.n++; u.last = st.turn;
    const fx = apply(st, d.e, { decision: true, dim: d.eff }); fx.unshift(['Political Power', -d.cost, false, 'pp']);
    const pr = project(st), notes = autoSpirits(st, pr), entry = { phase: st.phase, turn: st.turn, dec: id, t: d.n, fx, notes, seatsBefore: st.seats, seats: pr.seats, eff: d.eff };
    st.seats = pr.seats; st.nat = pr.nat; st.central = pr.central; const prevC = st.poll && st.poll.central ? st.poll.central.slice() : null; entry.pd = runPolls(st, false);
    whyOf(st, entry, s0, null, null, pr.seats[st.party], false); rippleOf(st, entry, prevC);
    entry.dn = pr.nat[st.party] - nat0 + (st.unity - u0) / 40 + (d.e.sta || d.e.internal ? 0.1 : 0); entry.tone = tone(entry.pd, entry.dn);
    entry.ach = A.check(st, null); st.log.push(entry); save(st); return entry;
  }

  // ---- election night: the full count with the campaign's sandbox state
  function election(st, done) {
    const APP = window.APP; if (!st.saved) st.saved = clone(APP.getS());
    st.pollFinal = st.poll ? { seats: st.poll.seats, nat: st.poll.nat } : null;
    const x = buildS(st, APP.BASE); APP.setS(x); if (APP.setSeed) APP.setSeed(st.seed); APP.sync();
    APP._after = () => { st.result = resultOf(st);
      if (st.result.hung) { negSetup(st); if (st.neg.mode === 'watch') { negotiate(st, {}); finalize(st); } else { st.phase = 'HUNG'; save(st); } } else finalize(st);
      done && done(st); };
    APP.go();
  }
  function finalize(st) { st.phase = 'ENDED'; st.tier = tierOf(st); st.ach = A.check(st, st.result); st.score = scoreOf(st); hallAdd(st); save(st);
    // tell the leaderboards (campaign-board.js) about the finished run
    try { window.dispatchEvent(new CustomEvent('cmp:finished', { detail: { leader: st.leader, party: st.party, tier: st.tier.n, k: st.tier.k, seats: st.result.seats[st.party], score: st.score || 0, diff: st.diff, daily: !!st.daily, iron: !!st.iron, day: today() } })); } catch (e) {} }
  // ---- a hung parliament. The two biggest of Labor, the Coalition and One Nation contend; everyone else is a bloc that can back either.
  // If you contend, you make offers; if you hold crossbench seats, you pick a side and a price; otherwise you watch.
  function blocKey(g) { const k = keyOf(g); if (k !== 'OTH') return k; const ab = window.APP.P[g].ab; return ab === 'KAP' || ab === 'XEN' ? ab : 'OTH'; }
  function negSetup(st) { const r = st.result, cnt = {}; (r.likely || []).forEach(g => { const k = blocKey(g); cnt[k] = (cnt[k] || 0) + 1; });
    const [A, B] = ['ALP', 'LNP', 'ONP', 'KAP'].sort((p, q) => (cnt[q] || 0) - (cnt[p] || 0));
    const blocs = Object.keys(cnt).filter(k => k !== A && k !== B && cnt[k] > 0).map(k => { const b = C.blocs[k] || C.blocs.OTH, lean = { ...b.lean };
      if (k === 'IND' && (A === 'LNP' || B === 'LNP')) { const L = st.party === 'LNP' ? st.leader : 'angus_taylor'; lean.LNP = (lean.LNP || 0) + (['josh_frydenberg', 'tim_wilson'].includes(L) ? 0.2 : L === 'andrew_hastie' ? -0.15 : 0); }
      return { k, n: b.n, seats: cnt[k], lean: { [A]: lean[A] || 0, [B]: lean[B] || 0 }, ask: b.ask }; }).sort((a, b) => b.seats - a.seats);
    const me = st.party, mode = me === A || me === B ? 'form' : (cnt[me] || 0) > 0 ? 'king' : 'watch';
    st.neg = { mode, A, B, me, sA: cnt[A] || 0, sB: cnt[B] || 0, mine: cnt[me] || 0, blocs }; }
  // settle it. form: offers {bloc: 0|1|2}; king: {back: A|B|null, ask: 1|2}
  function negotiate(st, ch) { const n = st.neg, r = st.result, me = n.me, offers = ch.offers || {}, rival = n.mode === 'form' ? (me === n.A ? n.B : n.A) : null;
    const backers = {}; let uCost = 0, kingOk = null;
    n.blocs.forEach(b => { if (n.mode === 'king' && b.k === me) return;
      const eff = { ...b.lean };
      if (n.mode === 'form') { const of = C.offers[offers[b.k] || 0]; if (of.b) { eff[me] += of.b * (b.lean[me] >= 0.2 ? 1 : 0.4); uCost += of.u; }
        if (b.lean[rival] >= 0.3) eff[rival] += 0.08 + rnd(st) * 0.17; }
      const vA = eff[n.A] + gauss(st) * 0.08, vB = eff[n.B] + gauss(st) * 0.08, top = vA >= vB ? n.A : n.B, tv = Math.max(vA, vB);
      backers[b.k] = tv >= 0.45 ? top : null; });
    if (n.mode === 'king' && ch.back) { const need = 76 - (ch.back === n.A ? n.sA : n.sB), pivotal = n.mine >= need - 4;
      kingOk = rnd(st) < (ch.ask === 2 ? 0.55 + (pivotal ? 0.3 : 0) : 0.92); backers[me] = kingOk ? ch.back : null; }
    if (uCost) st.unity = clamp(st.unity + Math.max(-20, uCost), 0, 100);
    const seatsOf = k => (n.blocs.find(b => b.k === k) || {}).seats || (k === me ? n.mine : 0);
    const tot = side => (side === n.A ? n.sA : n.sB) + Object.entries(backers).filter(([, v]) => v === side).reduce((a, [k]) => a + seatsOf(k), 0);
    const tA = tot(n.A), tB = tot(n.B);
    const gov = tA >= 76 && tA >= tB ? n.A : tB >= 76 ? n.B : tA > tB ? n.A : tB > tA ? n.B : (n.A === 'ALP' || n.B === 'ALP' ? 'ALP' : n.A);
    n.out = { backers, tA, tB, gov, offers, back: ch.back || null, ask: ch.ask || 0, kingOk, floor: (gov === n.A ? tA : tB) >= 76, full: Object.values(offers).filter(v => v === 2).length };
    r.gov = gov; save(st); return n.out; }
  function settle(st, ch) { if (st.phase !== 'HUNG') return null; const out = negotiate(st, ch); finalize(st); return out; }
  function resultOf(st) {
    const APP = window.APP, R = APP.getR(), D = APP.D, key = keyOf;
    const seats = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, IND: 0, KAP: 0, OTH: 0 }, stt = {}, rg = {};
    Object.values(C.RG).forEach(k => rg[k] = { total: 0 });
    R.likely.forEach((g, i) => { const k = key(g), s = D.seats[i]; seats[k]++; (stt[s.st] = stt[s.st] || {})[k] = (stt[s.st][k] || 0) + 1; rg[s.rg].total++; rg[s.rg][k] = (rg[s.rg][k] || 0) + 1; });
    const L = ldrOf(st), seat = (APP.DATA.leaders.find(l => l.name === L.name && l.party === (L.sb || C.PARTIES[st.party].ldr)) || {}).seat || '';
    const sn = st.by ? st.by.seat : seat.replace(/ \(.*$/, ''), si = D.seats.findIndex(s => s.n === sn);
    const leaderSeatWon = si < 0 ? null : key(R.likely[si]) === st.party;
    const hung = Object.keys(seats).every(k => seats[k] < 76);
    let gov = Object.keys(seats).find(k => seats[k] >= 76) || null;
    if (!gov) { const left = seats.ALP + seats.GRN, right = seats.LNP + seats.ONP; gov = right > left ? (seats.ONP > seats.LNP ? 'ONP' : 'LNP') : 'ALP'; }
    const tealLNP = C.TEAL.filter(n => { const i = D.seats.findIndex(s => s.n === n); return i >= 0 && key(R.likely[i]) === 'LNP'; }).length;
    const nat = project(st).nat;
    const spots = (st.spot || []).map(x => ({ n: x.n, st: x.st, inc: x.inc, poll: x.v, win: key(R.likely[x.i]), mine: key(R.likely[x.i]) === st.party }));
    // the Senate, from the same full count: Labor and the Greens on the left, the Coalition and One Nation on the right; 39 controls it
    let sen = null; try { const tot = R.senCentral.tot, SK = APP.SK || [], nm = APP.senNames || [], o = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, OTH: 0 }, cross = [];
      SK.forEach((k, i) => { const v = tot[i] || 0; if (!v) return; const q = k === 'COA' ? 'LNP' : k === 'ON' ? 'ONP' : ['ALP', 'GRN'].includes(k) ? k : 'OTH'; o[q] += v; if (q === 'OTH') cross.push([nm[i] || k, v]); });
      const side = st.party === 'ALP' || st.party === 'GRN' ? o.ALP + o.GRN : st.party === 'LNP' || st.party === 'ONP' ? o.LNP + o.ONP : null; sen = { ...o, cross, side, ctl: side != null && side >= 39 }; } catch (e) { sen = null; }
    let close = null; try { (R.margin || []).forEach((m, i) => { if (m && (!close || m.m < close.m)) close = { m: m.m, n: D.seats[i].n, st: D.seats[i].st, w: key(m.w) }; }); } catch (e) {}
    const dis = st.disSeat && st.flags.includes('DISENDORSED') ? (() => { const i = D.seats.findIndex(s => s.n === st.disSeat); return i < 0 ? null : { n: st.disSeat, won: key(R.likely[i]) === st.party }; })() : null;
    return { seats, st: stt, rg, hung, gov, spots, sen, close, dis, tpp: +(APP.tpp() * 100).toFixed(1), nat, leaderSeat: si < 0 ? null : sn, leaderSeatWon, tealLNP, pA: R.pA, pC: R.pC, pH: R.pH, likely: R.likely.slice() };
  }
  function tierOf(st) { const t = C.tiers[st.party], k = t.findIndex(([, f]) => f(st.result)); return { k, n: t[k][0] }; }
  function scoreOf(st) { return Math.round((st.result.seats[st.party] * 10 + [400, 250, 100, 0][st.tier.k] + (st.ach || []).reduce((a, x) => a + (x.hard ? 25 : 10), 0)) * dOf(st).score * ((scenOf(st.scen) || {}).sc || 1) * (st.iron ? 1.5 : 1)); }
  // hand the finished campaign to the sandbox: the run ends, but the sandbox keeps the campaign's settings to explore
  function release(st) { const APP = window.APP, x = APP.getS(); if (x) { x.preset = 'From your campaign'; delete x.campaign; } clear(); }
  // Ironman: walking away is recorded as a loss
  function abandon(st) { if (st && st.iron && st.phase !== 'ENDED') { try { const h = hall(); h.unshift({ at: Date.now(), leader: st.leader, party: st.party, tier: 'Abandoned', k: 3, seats: 0, score: 0, diff: st.diff, scen: st.scen, iron: true, ab: true }); localStorage.setItem(HOFKEY, JSON.stringify(h.slice(0, 60))); } catch (e) {} } clear(); }
  function exit(st) { const APP = window.APP; const s = st && st.saved ? st.saved : clone(APP.BASE); APP.setS(s); if (APP.setSeed) APP.setSeed(1); APP.sync(); APP.go(); clear(); }

  // ---- hall of fame and daily bests (this browser only)
  function hall() { try { return JSON.parse(localStorage.getItem(HOFKEY) || '[]') || []; } catch (e) { return []; } }
  function hallAdd(st) { try { const h = hall(); h.unshift({ at: Date.now(), leader: st.leader, party: st.party, tier: st.tier.n, k: st.tier.k, seats: st.result.seats[st.party], score: st.score, diff: st.diff, daily: st.daily, scen: st.scen, iron: !!st.iron, gov: st.result.gov === st.party });
    localStorage.setItem(HOFKEY, JSON.stringify(h.slice(0, 60)));
    if (st.daily) { const d = daily(); if (!d[st.daily] || d[st.daily].score < st.score) { d[st.daily] = { score: st.score, leader: st.leader, seats: st.result.seats[st.party] }; localStorage.setItem(DAILYKEY, JSON.stringify(d)); } } } catch (e) {} }
  // leader mastery: each leader's best tier across finished campaigns (0 is the top tier)
  function mastery() { const m = {}; hall().forEach(x => { if (x.ab) return; if (m[x.leader] == null || x.k < m[x.leader]) m[x.leader] = x.k; }); return m; }
  // the leader-only answers you have tried, across every campaign
  const LOKEY = 'es2028_campaign_lo_v1';
  function loGet() { try { return JSON.parse(localStorage.getItem(LOKEY) || '{}') || {}; } catch (e) { return {}; } }
  function loAdd(id) { try { const g = loGet(); if (!g[id]) { g[id] = Date.now(); localStorage.setItem(LOKEY, JSON.stringify(g)); } } catch (e) {} }
  function daily() { try { return JSON.parse(localStorage.getItem(DAILYKEY) || '{}') || {}; } catch (e) { return {}; } }

  // ---- persistence
  function saveForm(st) { const x = { ...st }; delete x.central; if (x.poll) x.poll = { seats: x.poll.seats, nat: x.poll.nat }; if (x.result) { x.result = { ...x.result }; delete x.result.likely; } return x; }
  function save(st) { try { localStorage.setItem(RUNKEY, JSON.stringify(saveForm(st))); } catch (e) {} }
  // run codes: a campaign in progress, compressed into text you can paste on another device (not for Ironman runs)
  const b64u = u8 => { let s = ''; for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000)); return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
  const unb64u = t => { const s = atob(t.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((t.length + 3) % 4)); const u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i); return u; };
  async function exportCode(st) { if (!st || st.iron) return null; const json = JSON.stringify(saveForm(st));
    try { const buf = await new Response(new Blob([json]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer(); return 'ES28-' + b64u(new Uint8Array(buf)); }
    catch (e) { return 'ES28U-' + b64u(new TextEncoder().encode(json)); } }
  async function importCode(code) { const m = String(code || '').replace(/\s+/g, '').match(/^ES28(U?)-([A-Za-z0-9_-]+)$/); if (!m) return null;
    try { const bytes = unb64u(m[2]); const json = m[1] ? new TextDecoder().decode(bytes) : await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
      const s = JSON.parse(json); if (!s || s.v !== 2 || !ldrOf(s) || s.iron || ['ENDED', 'FAILED'].includes(s.phase)) return null; localStorage.setItem(RUNKEY, JSON.stringify(s)); return load(); } catch (e) { return null; } }
  function load() { try { const s = JSON.parse(localStorage.getItem(RUNKEY) || 'null'); if (!s || s.v !== 2 || !ldrOf(s)) return null; ens(s);
    if (s.phase === 'CAMPAIGN' || s.phase === 'SPILL' || s.phase === 'BYELECTION' || s.phase === 'ELECTION') { const pr = project(s); s.central = pr.central; runPolls(s, false); } return s; } catch (e) { return null; } }
  function clear() { try { localStorage.removeItem(RUNKEY); } catch (e) {} }

  return { tierFor, lever, newRun, role, cardFor, choose, chance, debate, decisionsFor, enact, setTour, election, exit, load, clear, save, project, buildS, ldrOf, ppGain, milestoneTurns, spirit, banked, hall, daily, today, DIFF, dOf, release, scenOf,
    settle, abandon, mastery, loGet, exportCode, importCode, rivalOf, incOf, keyOf, dailyScen: () => C.scenarios[(hash('es2028-' + today()) >>> 0) % C.scenarios.length], dailyLeader };
})();
