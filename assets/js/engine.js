// Election engine: preference count + Monte Carlo (shared by the page and the node calibration script)
(function (root) {
  const REG = r => (r === 'Inner Metro' ? 0 : r === 'Outer Metro' ? 1 : 2);
  const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
  const TYPES = ['Inner Metro', 'Outer Metro', 'Provincial', 'Rural'];
  // seeded RNG (mulberry32) + normal draws
  function rng(seed) {
    let a = seed >>> 0;
    const u = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    let spare = null;
    const n = () => { if (spare !== null) { const s = spare; spare = null; return s; } let x, y, s; do { x = u() * 2 - 1; y = u() * 2 - 1; s = x * x + y * y; } while (s === 0 || s >= 1); const m = Math.sqrt(-2 * Math.log(s) / s); spare = y * m; return x * m; };
    return { u, n };
  }
  // one count. p = primaries by column (0 ALP 1 LIB 2 NAT 3 GRN 4 ON 5 TOP 6 FFP 7 HMP 8 IND 9 OTH, 10+ other parties), in points
  // contenders: 0 ALP, 1 COA, 2 GRN, 3 ON, 4 the seat's lead crossbencher (column lc), 5 the strongest other minor candidate (column mm)
  const MINOR_IN = [0.06, 0.12, 0.06, 0.15, 0.12];
  function count(p, lead, k, D, fl, split, lc, tr) {
    lc = lc == null ? 8 : lc;
    const MN = split ? D.leakSplit * D.splitShare * (p[1] + p[2]) : D.leak * Math.min(p[1], p[2]);
    const t = [p[0] + 0.45 * MN, p[1] + p[2] - MN, p[3], p[4] + 0.55 * MN, lead * p[lc], 0];
    const NC = p.length, CT = D.colT;
    const minors = new Array(NC).fill(0);
    for (let j = 5; j < NC; j++) minors[j] = j === lc ? (1 - lead) * p[j] : p[j];
    let mm = -1, mv = 0; for (let j = 5; j < NC; j++) if (minors[j] > mv && !(j === 8 && lc === 8)) { mv = minors[j]; mm = j; }
    if (mm < 0 && minors[8] > 0) { mm = 8; mv = minors[8]; }
    if (mm >= 0) { t[5] = mv; minors[mm] = 0; }
    const present = t.map(v => v > 0);
    const add = [0, 0, 0, 0, 0];
    for (let m = 5; m < NC; m++) {
      if (minors[m] <= 0) continue;
      const row = D.colRow && D.colRow[m] ? D.colRow[m][k] : D.MMR[k * 5 + CT[m]];
      let den = 0; for (let j = 0; j < 5; j++) if (present[j]) den += row[j];
      if (den <= 0) continue;
      for (let j = 0; j < 5; j++) if (present[j]) add[j] += minors[m] * row[j] / den;
    }
    for (let j = 0; j < 5; j++) t[j] += add[j];
    const mrow = mm >= 0 && D.colRow && D.colRow[mm] ? D.colRow[mm][k] : D.MMR[k * 5 + (mm >= 0 ? CT[mm] : 4)];
    const alive = [true, true, true, true, true, true]; if (tr) tr.push({ ex: -1, t: t.slice(), mm });
    for (let round = 0; round < 4; round++) {
      let e = -1, lo = Infinity;
      for (let j = 0; j < 6; j++) if (alive[j] && t[j] < lo) { lo = t[j]; e = j; }
      alive[e] = false;
      const pile = t[e]; t[e] = -1; const before = tr ? t.slice() : null;
      if (pile <= 0) continue;
      const w = [0, 0, 0, 0, 0, 0]; let den = 0;
      for (let j = 0; j < 6; j++) if (alive[j]) {
        w[j] = e === 5 ? (j < 5 ? mrow[j] : 0) : (j === 5 ? MINOR_IN[e] : flow(e, j, k, D, fl));
        den += w[j];
      }
      if (den <= 0) continue;
      for (let j = 0; j < 6; j++) if (alive[j]) t[j] += pile * w[j] / den;
      if (tr) tr.push({ ex: e, pile, gain: t.map((v, j) => alive[j] ? v - before[j] : 0), t: t.slice() });
    }
    const rem = []; for (let j = 0; j < 6; j++) if (alive[j]) rem.push(j);
    const a = rem[0], b = rem[1];
    const sh = t[b] / Math.max(1e-9, t[a] + t[b]);
    return { lo: a, hi: b, key: (a + 1) * 10 + (b + 1), share: sh, t, mm };
  }
  // flow from e to j for region k, with per-trial shocks fl = {coaON, lg}
  function flow(e, j, k, D, fl) {
    let v = D.MC[e][j];
    if (e === 1 && (j === 0 || j === 3)) {
      const c = Math.min(0.97, Math.max(0.03, fl.coaON + D.offCoa[k] + fl.dCoa));
      v = 0.494 * (j === 3 ? c : 1 - c);
      return v;
    }
    if ((e === 0 || e === 2) && (j === 1 || j === 3)) {
      const tot = D.MC[e][1] * D.RegF[k][e * 5 + 1] + D.MC[e][3] * D.RegF[k][e * 5 + 3];
      const f = Math.min(0.99, Math.max(0.01, D.MC[e][1] * D.RegF[k][e * 5 + 1] / Math.max(1e-9, tot) + fl.dLG));
      return tot * (j === 1 ? f : 1 - f);
    }
    // One Nation voters rarely put a teal-style independent ahead of the Liberals: damp that flow (onXb, default 0.5)
    if (e === 3 && j === 4) return v * D.RegF[k][e * 5 + j] * (fl.onXb != null ? fl.onXb : 0.5);
    return v * D.RegF[k][e * 5 + j];
  }
  // national shifts (pts) -> seat primaries using the fitted swing style
  // d = {g: points per group (0 ALP 1 COA 2 GRN 3 ON, 4+ crossbench groups), oth: points spread over every minor column}
  function shiftSeat(p, d, nat, D) {
    if (Array.isArray(d)) d = { g: [d[0], d[1], d[2], d[3]], oth: d[4] || 0 };
    const g = d.g || [], G = D.colG;
    const q = p.slice();
    const r = (i, dd) => (nat[i] > 0 ? Math.max(0, (nat[i] + dd) / nat[i]) : 1);
    q[0] *= r(0, g[0] || 0);
    const coaNat = nat[1] + nat[2], rC = coaNat > 0 ? Math.max(0, (coaNat + (g[1] || 0)) / coaNat) : 1;
    q[1] *= rC; q[2] *= rC;
    if (q[3] > 0 || (g[2] || 0) > 0) q[3] = Math.max(0, q[3] + (g[2] || 0));
    const rO = r(4, g[3] || 0);
    q[4] = Math.max(0, 0.3 * q[4] * rO + 0.7 * (q[4] + (g[3] || 0)));
    let othNat = 0; for (let i = 5; i < q.length; i++) othNat += nat[i];
    const rX = othNat > 0 ? Math.max(0, (othNat + (d.oth || 0)) / othNat) : 1;
    const gn = D.gNat;
    // crossbench groups: a national gain is shared out as points in the seats the group contests, not multiplied on its best seats,
    // so a small party's surge can't turn a 25% seat into an implausible 80% primary
    const gs = {}; for (let i = 5; i < q.length; i++) gs[G[i]] = (gs[G[i]] || 0) + q[i];
    for (let i = 5; i < q.length; i++) { const gi = G[i], dg = g[gi] || 0; const rg = dg && gn[gi] > 0 ? Math.max(0, (gn[gi] + dg) / gn[gi]) : 1;
      const gc = D.gCont && D.gCont[gi];
      if (dg > 0 && gc > 0 && q[i] > 0) {
        // gains: equal points per contested seat (as if it stood in at least a quarter of the country), with diminishing returns near 100%
        const add = dg / Math.max(gc, 0.25) * q[i] / gs[gi], room = Math.max(1, 100 - q[i]);
        q[i] = (100 - room * Math.exp(-add / room)) * rX; }
      else q[i] *= rX * rg; }
    const s = q.reduce((a, b) => a + b, 0);
    return q.map(v => v * 100 / s);
  }
  // demographic rules: {f: factor index, party: 0 ALP 1 COA 2 GRN 3 ON 4 IND, amt: points per standard deviation}
  // also: {rg: AEC seat type, amt} adds a flat amount in seats of that type (used by campaign mode)
  // also: {st: state, amt} adds a flat amount in that state's seats; {col: vote column} targets one column (only where that party stands)
  function demo(p, cz, rules, st, rg) {
    if (!rules.length || !cz) return p;
    const q = p.slice();
    rules.forEach(r => {
      if (!r.amt) return;
      let add;
      if (r.rg) { if (r.rg !== rg) return; add = r.amt; }
      else if (r.st) { if (r.st !== st) return; add = r.amt; }
      else { if (r.f == null || r.f < 0) return; const z = Math.max(-3, Math.min(3, cz[r.f] || 0)); add = r.amt * z; }
      if (r.col != null) { if (q[r.col] > 0) q[r.col] = Math.max(0, q[r.col] + add); }
      else if (r.party === 1) { const c = q[1] + q[2]; if (c > 0) { q[1] = Math.max(0, q[1] + add * q[1] / c); q[2] = Math.max(0, q[2] + add * q[2] / c); } }
      else { const j = [0, -1, 3, 4, 8][r.party]; if (q[j] > 0 || add > 0) q[j] = Math.max(0, q[j] + add); }
    });
    const t = q.reduce((a, b) => a + b, 0); return q.map(v => v * 100 / t);
  }
  // demographic divide sliders: facs = [{v: slider value, load: [ALP, COA, GRN, ON, IND] points per SD per step}], fz = seat factor scores
  function demoF(p, s, facs, D) {
    if (!facs || !facs.length || !s.fz) return p;
    const q = p.slice(); const add = [0, 0, 0, 0, 0];
    facs.forEach((f, k) => { if (!f.v) return; const z = f.one ? Math.max(0, s.fz[f.i]) : s.fz[f.i]; for (let g = 0; g < 5; g++) add[g] += f.v * f.load[g] * z; });
    q[0] = Math.max(0, q[0] + add[0]);
    const c = q[1] + q[2]; if (c > 0) { q[1] = Math.max(0, q[1] + add[1] * q[1] / c); q[2] = Math.max(0, q[2] + add[1] * q[2] / c); }
    if (q[3] > 0 || add[2] > 0) q[3] = Math.max(0, q[3] + add[2]);
    q[4] = Math.max(0, q[4] + add[3]);
    const ic = D.colG[s.lc] === 4 ? s.lc : 8; if (q[ic] > 0) q[ic] = Math.max(0, q[ic] + add[4]);
    const t = q.reduce((a, b) => a + b, 0); return q.map(v => v * 100 / t);
  }
  function prepare(D) {
    D.offCoa = [-0.11, 0, 0.07];
    D.nat100 = D.nat.map(v => v * 100);
    D.leakSplit = 0.25; D.splitShare = 0.35;
    D.seats.forEach((s, i) => {
      s.k = REG(s.rg); s.si = STATES.indexOf(s.st); s.ti = TYPES.indexOf(s.rg); s.i = i;
      const m = D.mix || 0; s.ex = s.p.map((v, j) => Math.max(0, m < 0.999 ? (v - m * s.ct[j]) / (1 - m) : v));
      s.splitOK = s.inc === 'LNP' && (s.rg === 'Provincial' || s.rg === 'Rural') && s.st !== 'QLD' && s.st !== 'NT' && Math.min(s.p[1], s.p[2]) === 0;
    });
    const n5 = [D.nat[0], D.nat[1] + D.nat[2], D.nat[3], D.nat[4], D.nat.slice(5).reduce((a, b) => a + b, 0)];
    D.nat5 = n5;
    D.NG = D.groups.length; D.gNat = new Array(D.NG).fill(0); D.nat100.forEach((v, j) => { D.gNat[D.colG[j]] += v; });
    return D;
  }
  function calibrate(D) {
    let mism = 0;
    const fl0 = { coaON: D.coaON, dCoa: 0, dLG: 0 };
    D.seats.forEach(s => {
      const c = count(s.p, s.lead, s.k, D, fl0, false, s.lc);
      const target = s.xb ? s.xs : 1 - (s.b2 + s.adj + D.meanQ);
      if (!s.xb) s.key = 12;
      if (c.key === s.key) s.off = target - c.share;
      else {
        // the model's final two differ from the spreadsheet's: keep the model's pair, but set the margin so the
        // spreadsheet's win chances for those two parties carry over
        mism++; s.miss = s.key;
        const wb = (s.wb || []).concat([0]); const pa = wb[c.lo] || 0, pb = wb[c.hi] || 0;
        if (pa + pb > 0) { const p = Math.min(0.98, Math.max(0.02, pb / (pa + pb))); s.key = c.key; s.off = 0.5 + 0.06 * Math.log(p / (1 - p)) / 1.702 - c.share; }
        else s.off = 0;
      }
    });
    return mism;
  }
  // preference settings pf = {onCoa: share of One Nation preferences to the Coalition (v Labor), grnAlp: share of Greens preferences to Labor,
  // lg: shift in Labor/Greens voters ranking the Coalition above One Nation, minorOn: multiplier on minor-party flows to One Nation}
  function adjustFlows(D, pf) {
    if (!pf) return D;
    const X = Object.create(D);
    X.MC = D.MC.map(r => r.slice());
    if (pf.onCoa != null) { const r = X.MC[3], s = r[0] + r[1]; r[1] = s * pf.onCoa; r[0] = s * (1 - pf.onCoa); }
    if (pf.grnAlp != null) { const o = D.MC[2], r = X.MC[2], s = o[0] + o[1] + o[3], ot = o[1] + o[3]; r[0] = s * pf.grnAlp; r[1] = s * (1 - pf.grnAlp) * (ot > 0 ? o[1] / ot : 0.5); r[3] = s * (1 - pf.grnAlp) * (ot > 0 ? o[3] / ot : 0.5); }
    const m = pf.minorOn == null ? 1 : pf.minorOn;
    if (m !== 1) {
      const sc = r => { const q = r.slice(); const t0 = q.reduce((a, b) => a + b, 0); q[3] *= m; const t1 = q.reduce((a, b) => a + b, 0); return q.map(v => v * t0 / t1); };
      X.MMR = D.MMR.map(sc);
      if (D.colRow) X.colRow = D.colRow.map(rr => rr ? rr.map(sc) : rr);
    }
    X.lgShift = pf.lg || 0;
    return X;
  }
  // move one party's vote in one seat by amt points (taken proportionally from everyone else)
  function seatShift(p, s, g, amt, D) {
    const q = p.slice(), G = D.colG; let cols = []; for (let j = 0; j < q.length; j++) if (G[j] === g) cols.push(j);
    if (!cols.length) return q;
    const own = cols.reduce((a, j) => a + q[j], 0);
    if (own <= 0) cols = [g === 4 && G[s.lc] === 4 ? s.lc : cols[0]];
    const add = Math.max(-own, amt), tot = q.reduce((a, b) => a + b, 0), rest = tot - own;
    const o2 = cols.reduce((a, j) => a + q[j], 0);
    cols.forEach(j => { q[j] += o2 > 0 ? add * q[j] / o2 : add / cols.length; });
    if (rest > 0) for (let j = 0; j < q.length; j++) if (!cols.includes(j)) q[j] = Math.max(0, q[j] - add * q[j] / rest);
    const t = q.reduce((a, b) => a + b, 0); return q.map(v => v * 100 / t);
  }
  // settings: {d:[5 pts], coaON, errScale, bigP, bigX, days, trials, seed, onBias}
  function simulate(D0, S) {
    const D = adjustFlows(D0, S.pf);
    const R = rng(S.seed || 1);
    // preference flows vary by seat type (judgement, in the direction of 2025's two-candidate flows): One Nation and Coalition
    // voters swap preferences more tightly in the regions, Greens voters favour Labor more strongly in the inner cities
    const RG = S.regFlows === false ? {} : { 'Inner Metro': [-0.06, 0.03, -0.06], 'Outer Metro': [-0.02, 0, -0.02], 'Provincial': [0.02, -0.02, 0.03], 'Rural': [0.05, -0.05, 0.06] };
    const cl = v => Math.min(0.97, Math.max(0.03, v)), on0 = D.MC[3][1] / (D.MC[3][0] + D.MC[3][1]), g0 = D.MC[2][0] / (D.MC[2][0] + D.MC[2][1] + D.MC[2][3]);
    const DV = {}; Object.entries(RG).forEach(([k, a]) => { DV[k] = adjustFlows(D, { onCoa: cl(on0 + a[0]), grnAlp: cl(g0 + a[1]), lg: D.lgShift || 0 }); });
    const Dof = s => DV[s.rg] || D, dON = s => (RG[s.rg] ? RG[s.rg][2] : 0);
    const tf = Math.min(1.5, Math.max(0.6, Math.sqrt((Math.max(0, S.days) + 90) / 455)));
    const N = D.seats.length, NG = D.NG, G = D.colG, wins = new Array(N).fill(0).map(() => new Array(NG).fill(0));
    const NATG = D.groups ? D.groups.findIndex(g => g.ab === 'NAT') : -1, SPL = !!S.split && NATG >= 0;
    // with the Coalition split, a Coalition win goes to whichever of the Liberals and Nationals leads in the seat
    const lcOf = s => (S.lcOv && S.lcOv[s.n] != null) ? S.lcOv[s.n] : s.lc;   // lead crossbencher, e.g. an independent who has joined a party
    const grp = (s, c, w, p) => { const g = w < 4 ? w : w === 4 ? G[lcOf(s)] : G[c.mm]; if (g !== 1 || !SPL || !p) return g;
      if (p[1] > 0 && p[2] > 0) return p[2] > p[1] ? NATG : 1; return p[2] > 0 || s.nr ? NATG : 1; };
    const tally = []; const cen = []; let majA = 0, majC = 0;
    const w = S.mrpW == null ? (D.mix || 0) : S.mrpW;
    const start = D.seats.map(s => { const q = s.ex.map((v, j) => w * s.ct[j] + (1 - w) * v); const t = q.reduce((a, b) => a + b, 0); return q.map(v => v * 100 / t); });
    // a minor party standing in seats it did not contest in 2025: seed its vote there (part of the independent vote moves across,
    // plus a starting share taken from the others, a little more from the Coalition), and lift its national base to match
    let DS = D;
    if (S.seeds && S.seeds.length) {
      const add = new Array(D.nat100.length).fill(0); let W = 0;
      start.forEach((p, i) => { const s = D.seats[i]; W += s.fv; const p0 = p.slice();
        S.seeds.forEach(sd => { const f = sd.f[i] || 0, a = sd.a[i] || 0; if (!f && !a) return;
          const mv = p[8] * f; p[8] -= mv; p[sd.c] += mv;
          const w = p.map((v, j) => j === sd.c ? 0 : v * (j === 1 || j === 2 ? 1.6 : 1)), z = w.reduce((x, y) => x + y, 0) || 1;
          for (let j = 0; j < p.length; j++) if (j !== sd.c) p[j] = Math.max(0, p[j] - a * w[j] / z);
          p[sd.c] += a; });
        p.forEach((v, j) => { add[j] += (v - p0[j]) * s.fv; }); });
      const nat100 = D.nat100.map((v, j) => Math.max(0.01, v + add[j] / W)), gNat = new Array(D.gNat.length).fill(0);
      nat100.forEach((v, j) => { gNat[D.colG[j]] += v; });
      DS = Object.create(D); DS.nat100 = nat100; DS.gNat = gNat;
    }
    { const gc = new Array(D.NG).fill(0); let Wt = 0;
      start.forEach((p, i) => { const fv = D.seats[i].fv; Wt += fv; const seen = {}; p.forEach((v, j) => { const g = D.colG[j]; if (j >= 5 && v > 0.05 && !seen[g]) { seen[g] = 1; gc[g] += fv; } }); });
      DS = Object.create(DS); DS.gCont = gc.map(v => v / Wt); }
    const base = start.map((p, i) => demo(shiftSeat(p, S.d, DS.nat100, DS), D.seats[i].cz, S.demo || [], D.seats[i].st, D.seats[i].rg));
    if (S.dfac && S.dfac.length) for (let i = 0; i < base.length; i++) base[i] = demoF(base[i], D.seats[i], S.dfac, D);
    // Coalition split: separate Liberal and National primary-vote changes (points of the national vote), applied to each party's own columns
    if (S.split && (S.libD || S.natD)) {
      const natCols = s => (s.nr && s.st === 'QLD') ? [1, 2] : [2], libCols = s => (s.nr && s.st === 'QLD') ? [] : [1];
      let L = 0, Nn = 0, W = 0;
      D.seats.forEach((s, i) => { W += s.fv; libCols(s).forEach(j => L += base[i][j] * s.fv); natCols(s).forEach(j => Nn += base[i][j] * s.fv); });
      L /= W; Nn /= W;
      // scale each party's columns, renormalise each seat, and repeat so the national shares land on the target after renormalising
      const tL = Math.max(0, L + (S.libD || 0)), tN = Math.max(0, Nn + (S.natD || 0)), b0 = base.map(q => q.slice());
      let rL = L > 0 ? tL / L : 1, rN = Nn > 0 ? tN / Nn : 1;
      for (let it = 0; it < 6; it++) {
        let aL = 0, aN = 0;
        for (let i = 0; i < base.length; i++) { const s = D.seats[i], q = b0[i].slice();
          libCols(s).forEach(j => q[j] *= rL); natCols(s).forEach(j => q[j] *= rN);
          const t = q.reduce((a, b) => a + b, 0) || 1; base[i] = q.map(v => v * 100 / t);
          libCols(s).forEach(j => aL += base[i][j] * s.fv / W); natCols(s).forEach(j => aN += base[i][j] * s.fv / W); }
        if (aL > 0) rL *= tL / aL; if (aN > 0) rN *= tN / aN;
      }
    }
    (S.seatAdj || []).forEach(a => { if (base[a.i] && a.amt) base[a.i] = seatShift(base[a.i], D.seats[a.i], a.g, a.amt, D); });
    const split = D.seats.map(s => !!(S.split && s.splitOK));
    const fvT = D.seats.reduce((a, s) => a + s.fv, 0);
    const S2 = D.sen2, senTot = [], NS = S2 ? S2.groups.length : 0;
    const senSt = S2 ? S2.states.map(() => ({ mean: new Array(NS).fill(0), last: new Array(NS).fill(0), runner: new Array(NS).fill(0) })) : null;
    const SEN = null, gov = { la: 0, ca: 0, lg: 0, co: 0, xd: 0, onOpp: 0 };
    const fl0 = { coaON: S.coaON, dCoa: 0, dLG: D.lgShift || 0 };
    const margin = [];
    const cargs = [];
    const central = D.seats.map((s, i) => { cargs[i] = [Dof(s), { ...fl0, coaON: cl(fl0.coaON + dON(s)) }, split[i], lcOf(s)]; const c = count(base[i], s.lead, s.k, ...cargs[i]); const sh = c.key === s.key ? c.share + s.off : c.share; const cw = S.called && S.called[i] != null ? S.called[i] : null; margin[i] = { m: Math.abs(sh - 0.5) * 100, w: grp(s, c, sh > 0.5 ? c.hi : c.lo, base[i]), r: grp(s, c, sh > 0.5 ? c.lo : c.hi, base[i]) }; return cw != null ? cw : grp(s, c, sh > 0.5 ? c.hi : c.lo, base[i]); });
    if (S.centralOnly) { const cc = new Array(NG).fill(0); central.forEach(w => cc[w]++); return { central, cenCount: cc, base, margin }; }
    for (let t = 0; t < S.trials; t++) {
      const big = R.u() < S.bigP ? S.bigX : 1;
      const m = tf * big * S.errScale;
      const nat2 = R.n() * 0.018 * m;
      const bloc = R.n();
      const st2 = STATES.map(() => (Math.sqrt(0.4) * bloc + Math.sqrt(0.6) * R.n()) * 0.022 * m);
      const ty2 = TYPES.map(() => R.n() * 0.012 * m);
      const onN = R.n();
      const pe = S.pErr || {}, eO = pe.on != null ? pe.on : 1, eG = pe.grn != null ? pe.grn : 1, eI = pe.ind != null ? pe.ind : 1;
      const onS = STATES.map(() => (Math.sqrt(0.75) * onN + Math.sqrt(0.25) * R.n()) * 0.12 * m * eO);
      const onT = TYPES.map(() => R.n() * 0.12 * 0.5 * m * eO);
      const grn = R.n() * 0.08 * m * eG, ind = R.n() * 0.10 * m * eI;
      const fl = { coaON: S.coaON, dCoa: R.n() * 0.08 * S.flowScale, dLG: (D.lgShift || 0) + R.n() * 0.06 * S.flowScale };
      const seats = new Array(NG).fill(0); const natT = [0, 0, 0, 0, 0]; const natG = new Array(NG).fill(0);
      for (let i = 0; i < N; i++) {
        const s = D.seats[i], p = base[i].slice();
        const sw = (nat2 + st2[s.si] + (s.ti >= 0 ? ty2[s.ti] : 0)) * 100;
        p[0] += 0.6 * sw; p[1] -= 0.5 * sw * (p[1] / Math.max(1e-9, p[1] + p[2])); p[2] -= 0.5 * sw * (p[2] / Math.max(1e-9, p[1] + p[2]));
        const onRel = S.onBias + onS[s.si] + (s.ti >= 0 ? onT[s.ti] : 0);
        const dOn = p[4] * onRel; p[4] += dOn; p[1] -= 0.4 * dOn * (p[1] / Math.max(1e-9, p[1] + p[2])); p[2] -= 0.4 * dOn * (p[2] / Math.max(1e-9, p[1] + p[2])); p[0] -= 0.35 * dOn; p[9] -= 0.25 * dOn * 0;
        p[3] *= 1 + grn; p[8] *= 1 + ind; if (lcOf(s) !== 8) p[lcOf(s)] *= 1 + ind;
        for (let j = 0; j < p.length; j++) { p[j] = Math.max(0, p[j] * (1 + R.n() * 0.06 * m)); }
        const c = count(p, s.lead, s.k, Dof(s), { ...fl, coaON: cl(fl.coaON + dON(s)) }, split[i], lcOf(s));
        const ps = p.reduce((a, b) => a + b, 0) || 1, wv = s.fv / fvT / ps;
        natT[0] += p[0] * wv; natT[1] += (p[1] + p[2]) * wv; natT[2] += p[3] * wv; natT[3] += p[4] * wv; for (let j = 5; j < p.length; j++) natT[4] += p[j] * wv;
        for (let j = 0; j < p.length; j++) natG[G[j]] += p[j] * wv;
        let sh = c.key === s.key ? c.share + s.off : c.share;
        sh += R.n() * 0.028 * m * (c.key === 12 ? 1 : 0.6);
        const w = S.called && S.called[i] != null ? S.called[i] : grp(s, c, sh > 0.5 ? c.hi : c.lo, p);   // seats called on election night are fixed
        wins[i][w]++; seats[w]++;
      }
      tally.push(seats);
      const coa = seats[1] + (SPL ? seats[NATG] : 0);   // split: Liberals and Nationals counted together for a Coalition government
      if (seats[0] >= 76) { majA++; gov.la++; } else if (coa >= 76) { majC++; gov.ca++; }
      else if (seats[0] + seats[2] >= 76) gov.lg++; else if (coa + seats[3] >= 76) gov.co++; else gov.xd++;
      if (seats[3] > (SPL ? Math.max(seats[1], seats[NATG]) : seats[1])) gov.onOpp++;
      if (S2) {
        const tot = senTrial(D, S, natG, R.n, m, null);
        senTot.push(tot.tot); tot.st.forEach((r, k) => { r.won.forEach((w, g) => senSt[k].mean[g] += w); senSt[k].last[r.last]++; if (r.runner >= 0) senSt[k].runner[r.runner]++; });
      }
    }
    const prob = wins.map(w => w.map(v => v / S.trials));
    const cenCount = new Array(NG).fill(0); central.forEach(w => cenCount[w]++);
    const likely = prob.map(p => p.indexOf(Math.max(...p)));
    const likeCount = new Array(NG).fill(0); likely.forEach(w => likeCount[w]++);
    const pct = (arr, q) => { const a = arr.slice().sort((x, y) => x - y); return a[Math.min(a.length - 1, Math.floor(q * a.length))]; };
    const dist = Array.from({ length: NG }, (_, j) => j).map(j => { const col = tally.map(r => r[j]); return { p5: pct(col, 0.05), med: pct(col, 0.5), p95: pct(col, 0.95), mean: col.reduce((a, b) => a + b, 0) / col.length, hist: col }; });
    let sen = null, senPass = null, senState = null, senCentral = null;
    if (S2) {
      sen = S2.groups.map((_, g) => { const col = senTot.map(r => r[g]); return { p5: pct(col, 0.05), med: pct(col, 0.5), p95: pct(col, 0.95), mean: col.reduce((a, b) => a + b, 0) / col.length }; });
      senState = senSt.map(r => ({ mean: r.mean.map(v => v / S.trials), last: r.last.map(v => v / S.trials), runner: r.runner.map(v => v / S.trials) }));
      // central Senate: House central national vote, no random error
      const natC = new Array(NG).fill(0); let W = 0; D.seats.forEach((s, i) => { const p = base[i], ps = p.reduce((a, b) => a + b, 0) || 1; W += s.fv; p.forEach((v, j) => natC[G[j]] += v / ps * s.fv); });
      senCentral = senTrial(D, S, natC.map(v => v / W), null, 0, true);
      const iA = 0, iC = 1, iG = 2, iO = 3; senPass = { lg: senTot.filter(r => r[iA] + r[iG] >= 39).length / senTot.length, co: senTot.filter(r => r[iC] + r[iO] >= 39).length / senTot.length };
    }
    Object.keys(gov).forEach(k => gov[k] /= S.trials);
    return { cargs, margin, prob, likely, likeCount, central, cenCount, dist, pA: majA / S.trials, pC: majC / S.trials, pH: 1 - (majA + majC) / S.trials, tf, base, sen, senPass, senState, senCentral, senTot, gov };
  }
  // ---- Senate: each state's 2025 Senate vote moved by the House vote change for the matching party, plus Senate-only shifts
  function senShares(D, S, natG, st, rn, m) {
    const S2 = D.sen2, b = S2.base[st], NSg = b.length, out = new Array(NSg);
    const sd = S.senD || {};
    for (let g = 0; g < NSg; g++) {
      const h = S2.groups[g].h; let v = b[g];
      if (h >= 0 && v > 0) { const p25 = D.prim25[h]; let r = p25 > 0 ? natG[h] / p25 : 1; r = h < 4 ? Math.max(0.05, Math.min(8, r)) : Math.max(0.3, Math.min(3, Math.pow(r, 0.7))); v *= r; }
      if (sd[g]) { const nb = S2.nat[g]; v += sd[g] / 100 * (nb > 0 ? (b[g] / nb) : 0); }
      if (rn && v > 0) v *= Math.exp(rn() * 0.10 * m);
      out[g] = Math.max(0, v);
    }
    // Coalition split: the Nationals run their own Senate tickets (share of the 2025 joint Coalition vote, judgement by state)
    if (S.split) { const ic = S2.groups.findIndex(g => g.k === 'COA'), inn = S2.groups.findIndex(g => g.k === 'NAT');
      if (ic >= 0 && inn >= 0) { const f = [0.3, 0.25, 0.35, 0.15, 0.05, 0.05, 0, 0][st] || 0; out[inn] += out[ic] * f; out[ic] *= 1 - f; } }
    if (S.senBoost && S.senBoost[st]) S.senBoost[st].forEach(([g, v]) => { if (g >= 0 && g < NSg) out[g] += v * (rn ? Math.exp(rn() * 0.15 * m) : 1); });   // a new Senate ticket with no 2025 vote (e.g. a high-profile candidate)
    const z = out.reduce((a, c) => a + c, 0) || 1; return out.map(v => v / z);
  }
  function senTrial(D, S, natG, rn, m, central) {
    const S2 = D.sen2, dd = !!S.dd, tot = dd ? new Array(S2.groups.length).fill(0) : S2.cont.slice(), st = [];
    for (let k = 0; k < S2.states.length; k++) {
      const n = dd ? (k < 6 ? 12 : 2) : S2.seats[k];
      const tr = central ? [] : null, r = senCount(senShares(D, S, natG, k, rn, m), n, S2, tr); if (tr) r.trace = tr;
      r.won.forEach((w, g) => tot[g] += w); st.push(r);
    }
    return { tot, st };
  }
  // party-level count: Droop quota, surpluses stay with the party ticket, lowest excluded and transferred by flows (with exhaustion)
  function senCount(share, n, S2, tr) {
    const G2 = share.length, v = share.slice(), won = new Array(G2).fill(0), alive = v.map(x => x > 0), q = 1 / (n + 1), F = S2.flows;
    let left = n, last = -1, runner = -1, guard = 0;
    if (tr) tr.push({ t: 'start', v: v.slice(), q });
    while (left > 0 && guard++ < 80) {
      let any = false;
      for (let g = 0; g < G2; g++) while (alive[g] && v[g] >= q && left > 0) { if (tr) tr.push({ t: 'el', g, v: v[g], n: won[g] + 1 }); won[g]++; v[g] -= q; left--; last = g; any = true; }
      if (left === 0) break;
      const cand = []; for (let g = 0; g < G2; g++) if (alive[g]) cand.push(g);
      if (cand.length <= left) { cand.sort((a, b) => v[b] - v[a]); for (let i = 0; left > 0 && cand.length; i++) { const g = cand[i % cand.length]; if (tr) tr.push({ t: 'fill', g, v: v[g], n: won[g] + 1 }); won[g]++; left--; last = g; } break; }
      if (cand.length === left + 1 && !any) { cand.sort((a, b) => v[b] - v[a]); for (let i = 0; i < left; i++) { if (tr) tr.push({ t: 'fill', g: cand[i], v: v[cand[i]], n: won[cand[i]] + 1 }); won[cand[i]]++; last = cand[i]; } runner = cand[left]; if (tr) tr.push({ t: 'runner', g: runner, v: v[runner] }); left = 0; break; }
      if (any) continue;
      let e = -1, lo = Infinity; for (const g of cand) if (v[g] < lo) { lo = v[g]; e = g; }
      alive[e] = false; const pile = v[e] * (1 - S2.groups[e].ex), raw = v[e]; v[e] = 0;
      let den = 0; for (let g = 0; g < G2; g++) if (alive[g]) den += F[e][g];
      const b4 = tr ? v.slice() : null;
      if (den > 0) for (let g = 0; g < G2; g++) if (alive[g]) v[g] += pile * F[e][g] / den;
      if (tr) tr.push({ t: 'ex', e, raw, pile, gain: v.map((x, g) => alive[g] ? x - b4[g] : 0) });
    }
    return { won, last, runner };
  }
  function senateCount(share, n, F) {
    const v = share.slice(); const won = new Array(10).fill(0); const alive = v.map((x, i) => x > 0);
    let left = n; const q = 1 / (n + 1); let guard = 0;
    while (left > 0 && guard++ < 40) {
      let any = false;
      for (let g = 0; g < 8; g++) while (alive[g] && v[g] >= q && left > 0) { won[g]++; v[g] -= q; left--; any = true; }
      if (left === 0) break;
      const cand = []; for (let g = 0; g < 8; g++) if (alive[g]) cand.push(g);
      if (cand.length <= left) { cand.sort((a, b) => v[b] - v[a]); let i = 0; while (left > 0 && cand.length) { won[cand[i % cand.length]]++; left--; i++; } break; }
      if (any) continue;
      // exclude: unwinnable groups first, then the lowest
      let e = -1;
      for (let g = 8; g < 10; g++) if (alive[g]) { e = g; break; }
      if (e < 0) { let lo = Infinity; for (const g of cand) if (v[g] < lo) { lo = v[g]; e = g; } }
      alive[e] = false; const pile = v[e]; v[e] = 0;
      const row = F[e]; let den = 0; for (let g = 0; g < 8; g++) if (alive[g]) den += row[g];
      const keep = 1 - row[8];
      if (den > 0) for (let g = 0; g < 8; g++) if (alive[g]) v[g] += pile * keep * row[g] / den;
    }
    return won;
  }
  const API = { senShares, senCount, demoF, adjustFlows, seatShift, senateCount, demo, count, simulate, prepare, calibrate, shiftSeat, STATES, TYPES };
  if (typeof module !== 'undefined') module.exports = API; else root.ENGINE = API;
})(this);
