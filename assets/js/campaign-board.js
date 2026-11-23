// Campaign leaderboards and profile transfer.
// Leaderboards live in the artifact's shared database: one document per player at scores/<id>, holding that player's best run on
// each board (today's challenge, Ironman, each difficulty, each leader). Everyone who can open the page while signed in reads them;
// only people the platform lets write (the owner, invited editors, and members of the owner's organisation) can post.
// Profiles (honours, hall of fame, daily results, leader-only answers) can be moved between browsers as a code or a .txt file, and are
// backed up automatically to the player's private space in the database when they are signed in.
(() => {
  // the leaderboards and account backup only exist when the page runs inside Claude; elsewhere (your own website) they are hidden
  const mark = () => { const on = !!(window.claude && window.claude.use); document.documentElement.classList.toggle('claude-host', on); return on; };
  if (!mark()) { window.addEventListener('DOMContentLoaded', mark); window.addEventListener('load', mark); }
  const KEYS = { ach: 'es2028_campaign_achievements_v1', hof: 'es2028_campaign_hof_v1', daily: 'es2028_campaign_daily_v1', lo: 'es2028_campaign_lo_v1', cards: 'es2028_campaign_cards_v1' };
  const PREFIX = 'ES28-PROFILE-1:';
  const get = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const ready = new Promise(res => { const go = async () => { try { if (!window.claude || !window.claude.use) return res(null); const [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]); if (!db) return res(null);
    const id = user && user.id ? await user.id().catch(() => null) : null; res({ db, user, id }); } catch (e) { res(null); } }; if (window.claude && window.claude.use) go(); else window.addEventListener('load', () => setTimeout(go, 0)); setTimeout(() => res(null), 12000); });
  let canPost = null, rowsCache = null;

  // ---- profile: a code that carries everything this browser remembers about campaign mode
  function snapshot() { return { v: 1, at: Date.now(), ach: get(KEYS.ach) || {}, hof: get(KEYS.hof) || [], daily: get(KEYS.daily) || {}, lo: get(KEYS.lo) || {}, cards: get(KEYS.cards) || null }; }
  const sum = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(36); };
  function code() { const j = JSON.stringify(snapshot()), b = btoa(unescape(encodeURIComponent(j))); return PREFIX + b + '.' + sum(b); }
  function parse(txt) { const t = String(txt || '').replace(/\s+/g, ''); const i = t.indexOf(PREFIX); if (i < 0) throw new Error('That isn’t a profile code.');
    const body = t.slice(i + PREFIX.length), dot = body.lastIndexOf('.'); if (dot < 0) throw new Error('The code is incomplete.');
    const b = body.slice(0, dot), chk = body.slice(dot + 1); if (sum(b) !== chk) throw new Error('The code is damaged: check it was copied in full.');
    const p = JSON.parse(decodeURIComponent(escape(atob(b)))); if (!p || p.v !== 1) throw new Error('This profile is from a different version.'); return p; }
  // merging keeps the best of both: every honour and answer either side has, every run either side played
  function merge(p) { const ach = Object.assign({}, p.ach || {}, get(KEYS.ach) || {}); put(KEYS.ach, ach);
    const seen = new Set(), hof = [].concat(get(KEYS.hof) || [], p.hof || []).filter(r => { const k = r.at + '|' + r.leader; if (seen.has(k)) return false; seen.add(k); return true; }).sort((a, b) => b.at - a.at).slice(0, 60); put(KEYS.hof, hof);
    const daily = Object.assign({}, p.daily || {}); Object.entries(get(KEYS.daily) || {}).forEach(([d, r]) => { if (!daily[d] || ((r || {}).score || 0) >= ((daily[d] || {}).score || 0)) daily[d] = r; }); put(KEYS.daily, daily);
    put(KEYS.lo, Object.assign({}, p.lo || {}, get(KEYS.lo) || {}));
    if (p.cards) { const c = get(KEYS.cards) || { owned: {}, opened: 0 }; c.owned = Object.assign({}, p.cards.owned || {}, c.owned || {}); c.opened = Math.max(c.opened || 0, p.cards.opened || 0); if (p.cards.allPacks) c.allPacks = true; put(KEYS.cards, c); }
    return { honours: Object.keys(ach).length, runs: hof.length }; }
  async function download() { const day = new Date().toISOString().slice(0, 10), filename = `australia-2028-profile-${day}.txt`, data = 'Australia 2028 Election Simulator: campaign profile\nPaste this whole file (or the line below) into “Load a profile”.\n\n' + code() + '\n';
    const d = window.claude && window.claude.use ? await Promise.race([window.claude.use('downloads').catch(() => null), new Promise(r => setTimeout(() => r(null), 1500))]) : null;
    if (d) { await d.save({ filename, data }); return; }
    // no platform download here: an ordinary browser download, which works when the page is opened directly
    const url = URL.createObjectURL(new Blob([data], { type: 'text/plain' })), a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000); }
  // ---- account backup: the player's own private space in the database
  async function cloudSave() { const r = await ready; if (!r || !r.id) return false; try { await r.db.doc('data/users/' + r.id + '/profile').set({ code: code(), at: Date.now() }); return true; } catch (e) { return false; } }
  async function cloudLoad() { const r = await ready; if (!r || !r.id) return null; try { const s = await r.db.doc('data/users/' + r.id + '/profile').get(); return s.exists ? s.data() : null; } catch (e) { return null; } }

  // ---- leaderboards
  function boardsFor(rec) { const b = []; if (rec.daily) b.push('daily:' + rec.day); else if (rec.iron) b.push('iron'); else b.push('diff:' + (rec.diff || 'std')); b.push('ldr:' + rec.leader); return b; }
  async function submit(rec) { cloudSave(); const r = await ready; if (!r || !r.id) return { ok: false, why: 'signedout' };
    const ref = r.db.doc('scores/' + r.id); let cur = {}; try { const s = await ref.get(); if (s.exists) cur = s.data() || {}; } catch (e) {}
    const boards = Object.assign({}, cur.boards || {}); let changed = false;
    boardsFor(rec).forEach(k => { const old = boards[k]; if (!old || (rec.score || 0) > (old.s || 0)) { boards[k] = { s: rec.score || 0, l: rec.leader, p: rec.party, k: rec.k, t: rec.tier, seats: rec.seats, d: rec.diff || 'std', at: Date.now() }; changed = true; } });
    if (!changed) return { ok: true, same: true };
    // daily boards older than a fortnight are dropped from the document so it stays small
    const cut = new Date(Date.now() - 14 * 864e5).toISOString().slice(0, 10); Object.keys(boards).forEach(k => { if (k.startsWith('daily:') && k.slice(6) < cut) delete boards[k]; });
    try { await ref.set({ boards, at: Date.now() }); canPost = true; rowsCache = null; return { ok: true }; } catch (e) { canPost = false; return { ok: false, why: e && e.code || 'error' }; } }
  async function rows() { const r = await ready; if (!r) return null; if (rowsCache && Date.now() - rowsCache.t < 20000) return rowsCache.v;
    const snap = await Promise.race([r.db.collection('scores').limit(1000).get(), new Promise((_, rej) => setTimeout(() => rej({ code: 'timeout' }), 10000))]);
    const v = snap.docs.filter(d => d.exists).map(d => ({ id: d.id, me: d.id === r.id, boards: (d.data() || {}).boards || {} })); rowsCache = { t: Date.now(), v }; return v; }
  async function names(ids) { const r = await ready; if (!r || !r.user || !ids.length) return {}; try { const ps = await r.user.profiles(ids); const o = {}; ids.forEach(id => { o[id] = (ps[id] && ps[id].name) || ''; }); return o; } catch (e) { return {}; } }
  async function status() { const r = await ready; if (!r) return 'offline'; if (!r.id) return 'noid'; if (canPost === false) return 'readonly';
    try { const u = r.user && r.user.can ? await r.user.can('data.write') : null; if (u === false) return 'readonly'; } catch (e) {} return 'ok'; }

  // a finished run posts itself
  window.addEventListener('cmp:finished', e => { submit(e.detail).then(res => window.dispatchEvent(new CustomEvent('cmp:posted', { detail: res }))); });
  window.CampaignBoard = { ready, code, parse, merge, download, cloudSave, cloudLoad, submit, rows, names, status, boardsFor };
})();
