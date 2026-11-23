// Campaign mode screens: leader select, the campaign desk (HUD, cards, decisions, figures), election night, the verdict front page, honours.
(() => {
  const C = window.CAMPAIGN_DATA, E = window.CAMPAIGN, A = window.CAMPAIGN_ACH, APP = window.APP;
  if (!C || !E || !A || !APP) return;
  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const PN = p => ({ ALP: 'Labor', LNP: 'Coalition', ONP: 'One Nation', GRN: 'Greens', IND: 'Independents', OTH: 'Others' })[p];
  const PS = p => ({ ALP: 'Labor', LNP: 'Coal.', ONP: 'ON', GRN: 'Greens', IND: 'Ind.', OTH: 'Oth.' })[p];
  const PNL = p => `<span class="lf">${PN(p)}</span><span class="ls" aria-hidden="true">${PS(p)}</span>`;
  const PC = p => ({ ALP: 'var(--alp)', LNP: 'var(--coa)', ONP: 'var(--on)', GRN: 'var(--grn)', IND: 'var(--ind)', OTH: 'var(--oth)' })[p];
  const sgn = (v, d) => { const k = d == null ? (Math.abs(v) < 10 && v % 1 ? 1 : 0) : d, r = +(+v).toFixed(k); return (r > 0 ? '+' : r < 0 ? '−' : '±') + Math.abs(r).toFixed(k); };
  const surname = n => n.split(' ').slice(-1)[0];
  const TIERSYM = { 2: '++', 1: '+', 0: '•', '-1': '−', '-2': '−−', 3: '+++', '-3': '−−−' };
  const LET = 'ABCDEF';
  // tier marks for the trading cards: stacked chevrons, up in green for help and down in red for harm, a dot when neutral
  const TMW = t => t >= 2 ? 'Strong boost' : t > 0 ? 'Boost' : t <= -2 ? 'Strong drag' : t < 0 ? 'Drag' : 'Neutral';
  const TM = t => { const n = Math.min(3, Math.abs(t)), up = t > 0; if (!n) return `<span class="tmk z" role="img" aria-label="Neutral"><svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="2"/></svg></span>`;
    const h = 12, step = 3.4, top = (h - (4 + step * (n - 1))) / 2; let d = ''; for (let k = 0; k < n; k++) { const y = top + k * step; d += up ? `M2.5 ${(y + 4).toFixed(1)}L6 ${y.toFixed(1)}L9.5 ${(y + 4).toFixed(1)}` : `M2.5 ${y.toFixed(1)}L6 ${(y + 4).toFixed(1)}L9.5 ${y.toFixed(1)}`; }
    return `<span class="tmk ${up ? 'up' : 'dn'} n${n}" role="img" aria-label="${TMW(t)}"><svg viewBox="0 0 12 12"><path d="${d}"/></svg></span>`; };
  // stat medallions (Political Power, caucus unity, momentum, caucus votes): a coloured disc with a cream glyph
  const SXG = {
    pp: '<path d="M12 6.2l1.55 3.15 3.45.5-2.5 2.45.6 3.45L12 14.1l-3.1 1.65.6-3.45L7 9.85l3.45-.5z" fill="currentColor"/><path d="M5.2 9.5c-.6 3.6 1.2 6.9 4.3 8.3M18.8 9.5c.6 3.6-1.2 6.9-4.3 8.3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5.4 12.2l-1.3-.6M6.3 14.8l-1.2.2M8 16.9l-.8.9M18.6 12.2l1.3-.6M17.7 14.8l1.2.2M16 16.9l.8.9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    unity: '<circle cx="12" cy="8.2" r="2.3" fill="currentColor"/><circle cx="6.6" cy="10" r="1.9" fill="currentColor"/><circle cx="17.4" cy="10" r="1.9" fill="currentColor"/><path d="M8.2 17.5c0-2.6 1.7-4.6 3.8-4.6s3.8 2 3.8 4.6zM3.6 17.5c0-2.2 1.3-3.8 3-3.8.6 0 1.1.2 1.6.5-.8.9-1.3 2-1.4 3.3zM20.4 17.5c0-2.2-1.3-3.8-3-3.8-.6 0-1.1.2-1.6.5.8.9 1.3 2 1.4 3.3z" fill="currentColor"/>',
    mom: '<path d="M6 7l5 5-5 5M12 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    votes: '<path d="M8.5 4.8h7v7.4h-7z" fill="currentColor"/><path d="M10 8.6l1.4 1.3 2.6-2.8" fill="none" stroke="var(--sxd)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.8 12.2h14.4v7H4.8z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.2 12.2h7.6" stroke="var(--sxd)" stroke-width="2"/>'
  };
  Object.assign(SXG, {
    poll: '<path d="M5.5 18.5h13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6.6 17.6v-4.4h2.6v4.4zM10.7 17.6V8.4h2.6v9.2zM14.8 17.6v-6.6h2.6v6.6z" fill="currentColor"/>',
    sta: '<path d="M13.4 3.8L6.6 13h4.6l-1 7.2 7.2-9.6h-4.7z" fill="currentColor"/>',
    base: '<path d="M12 4.6l7.4 6.2h-2.2v7.8h-3.6v-4.8h-3.2v4.8H6.8v-7.8H4.6z" fill="currentColor"/>',
    tgt: '<circle cx="12" cy="12" r="6.8" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>',
    prom: '<path d="M15.2 8.6c-.6-1.1-1.8-1.7-3.2-1.7-1.9 0-3.2 1-3.2 2.4 0 3.2 6.6 1.7 6.6 5 0 1.5-1.4 2.6-3.4 2.6-1.5 0-2.8-.7-3.4-1.9M12 4.8v2.1M12 17v2.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    tour: '<path d="M12 19.6s-5.4-5.3-5.4-9.3a5.4 5.4 0 0 1 10.8 0c0 4-5.4 9.3-5.4 9.3z" fill="currentColor"/><circle cx="12" cy="10.2" r="1.9" fill="var(--sxd)"/>',
    pos: '<path d="M7.2 19.4V4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M7.9 5.2h9.6l-2.2 3.4 2.2 3.4H7.9z" fill="currentColor"/>',
    pact: '<path d="M10.2 13.8a3 3 0 0 1 0-4.2l2-2a3 3 0 0 1 4.2 4.2l-1 1M13.8 10.2a3 3 0 0 1 0 4.2l-2 2a3 3 0 0 1-4.2-4.2l1-1" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'
  });
  const SXN = { pp: 'Political Power', unity: 'Caucus unity', mom: 'Momentum', votes: 'Caucus votes' };
  const SX = (k, cls) => `<span class="sx sx-${k}${cls ? ' ' + cls : ''}" aria-hidden="true"><svg viewBox="0 0 24 24">${SXG[k]}</svg></span>`;
  // put the medallion in front of each stat named in a piece of (already escaped) text
  const KW = /\b(Political Power|caucus unity|Caucus unity|unity|Unity|momentum|Momentum|caucus votes|Caucus votes)\b/g;
  const kw = h => String(h).replace(KW, m => { const l = m.toLowerCase(); const k = l === 'political power' ? 'pp' : l.includes('unity') ? 'unity' : l.includes('votes') ? 'votes' : 'mom'; return `<span class="sxw">${SX(k, 'in')}${m}</span>`; });
  let st = null, view = 'select', fb = null, open = false, lastFocus = null, achOpen = null, tourSel = [], tourHard = false, shareURL = null, counting = null, negOff = {}, negBack = null, negAsk = 1, doorT = null, codeMsg = '', achF = 'all', achL = '', ldrQ = '', ldrF = 'all';
  const PREFKEY = 'es2028_campaign_prefs_v1';
  const RM = (() => { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } })();
  const PDEF = { sound: 1, diff: 'std', mode: 'run', scen: 'std', motion: RM ? 0 : 1, timers: 1, compact: window.innerWidth < 600 ? 1 : 0, party: 'ALP' };
  const prefs = (() => { try { return Object.assign({}, PDEF, JSON.parse(localStorage.getItem(PREFKEY) || '{}')); } catch (e) { return { ...PDEF }; } })();
  const savePrefs = () => { try { localStorage.setItem(PREFKEY, JSON.stringify(prefs)); } catch (e) {} };
  // a soft paper flip (filtered noise) and a short buzz, on by default; both can be switched off in the toolbar
  let AC = null;
  // short synthesised cues: a click, a tick, a gavel, a page turn, a chime and a bell
  function tone(f, dur, type, gain, at) { const t = AC.currentTime + (at || 0), o = AC.createOscillator(), g = AC.createGain(); o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain || 0.12, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.02); return o; }
  function sfx(kind) {
    if (!prefs.sound) return;
    if (['tick', 'gavel', 'page', 'chime', 'bell'].includes(kind)) { try { AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (kind === 'tick') tone(1900, 0.04, 'square', 0.05);
      else if (kind === 'gavel') { tone(140, 0.18, 'triangle', 0.35); tone(110, 0.2, 'triangle', 0.3, 0.16); }
      else if (kind === 'chime') { tone(880, 0.5, 'sine', 0.1); tone(1320, 0.6, 'sine', 0.08, 0.09); }
      else if (kind === 'bell') { [0, 0.5].forEach(a => { tone(660, 1.1, 'sine', 0.12, a); tone(1320, 0.7, 'sine', 0.04, a); }); }
      else if (kind === 'page') { const t = AC.currentTime, len = 0.32, buf = AC.createBuffer(1, AC.sampleRate * len, AC.sampleRate), d = buf.getChannelData(0); for (let i = 0; i < d.length; i++) { const x = i / d.length; d[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * x) * 0.5; }
        const src = AC.createBufferSource(), fl = AC.createBiquadFilter(), g = AC.createGain(); src.buffer = buf; fl.type = 'highpass'; fl.frequency.setValueAtTime(1200, t); fl.frequency.linearRampToValueAtTime(4000, t + len); g.gain.value = 0.12; src.connect(fl); fl.connect(g); g.connect(AC.destination); src.start(t); }
    } catch (e) {} return; }
    try { if (navigator.vibrate) navigator.vibrate(kind === 'good' ? [8, 40, 8] : kind === 'bad' ? 24 : 8); } catch (e) {}
    try { AC = AC || new (window.AudioContext || window.webkitAudioContext)(); const t = AC.currentTime, len = 0.16, buf = AC.createBuffer(1, AC.sampleRate * len, AC.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) { const x = i / d.length; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - x, 2) * (0.6 + 0.4 * Math.sin(x * 40)); }
      const src = AC.createBufferSource(), f = AC.createBiquadFilter(), g = AC.createGain(); src.buffer = buf; f.type = 'bandpass'; f.frequency.value = kind === 'bad' ? 900 : kind === 'good' ? 2600 : 1800; f.Q.value = 0.8;
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.25, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + len);
      src.connect(f); f.connect(g); g.connect(AC.destination); src.start(t); src.stop(t + len); } catch (e) {}
  }

  // ---- shell
  const root = document.createElement('div'); root.id = 'cmp'; root.className = 'cmp'; root.hidden = true;
  root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'cmp-title');
  root.innerHTML = '<div class="cmp-in" id="cmpin"></div><div class="cmp-toasts" id="cmptoasts" aria-live="polite"></div>';
  document.body.appendChild(root);
  const bar = document.createElement('div'); bar.className = 'cmp-lockbar'; bar.id = 'cmpbar'; bar.hidden = true; document.body.appendChild(bar);
  const inn = $('cmpin');
  // the site's top bar, the same as on every other page
  if (window.SiteBar) SiteBar.mount(root);
  if (window.SiteBar) { const f = document.createElement('div'); f.className = 'cmp-foot'; root.insertBefore(f, $('cmptoasts')); SiteBar.mountFoot(f); }

  function show() { if (!open) { lastFocus = document.activeElement; open = true; } root.hidden = false; document.body.classList.add('cmp-open'); if (window.SiteBar) SiteBar.mark(); render(); focusTitle(); }
  function hide() { giveBack(); stopCount(); open = false; root.hidden = true; document.body.classList.remove('cmp-open'); if (window.SiteBar) SiteBar.mark(); lockbar(); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function lockbar() {
    const on = !!st && (st.phase === 'ENDED' || st.phase === 'ELECTION' || st.phase === 'HUNG');
    document.body.classList.toggle('cmp-lock', on); bar.hidden = !on || open;
    if (on && !open) { const L = E.ldrOf(st);
      bar.innerHTML = `<span class="lb-flag">Campaign result</span><span class="lb-txt"><b>${esc(L.name)}</b>${st.tier ? ' · ' + esc(st.tier.n) : st.phase === 'HUNG' ? ' · hung parliament, deals to do' : ''}. The sandbox is locked to your campaign.</span><button type="button" data-a="verdict">${st.phase === 'HUNG' ? 'Back to the deals' : 'Back to the verdict'}</button><button type="button" class="ghost" data-a="sandbox">Explore it in the sandbox</button><button type="button" class="ghost" data-a="exit">Exit campaign</button>`; }
  }
  bar.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.a === 'verdict') { view = viewFor(); show(); } else if (b.dataset.a === 'sandbox') toSandbox(); else exitRun(); });
  // take the finished campaign into the sandbox: the run ends, the lock lifts, and the sandbox opens on the campaign's settings
  function toSandbox() { if (window.APP) APP.govOv = null; E.release(st); st = null; fb = null; achOpen = null; view = 'select'; document.body.classList.remove('cmp-lock'); bar.hidden = true; if (open) hide();
    APP.sync(); const sb = document.getElementById('sandbox'), tab = document.getElementById('sbxtab'); if (sb && tab && sb.dataset.open !== '1') tab.click();
    setTimeout(() => { const h = document.getElementById('h-sand'); if (h) { if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } if (sb) sb.scrollIntoView({ block: 'start', behavior: prefs.motion ? 'smooth' : 'auto' }); }, 300); }
  // keyboard play: A–F or 1–6 picks an option, Enter or N moves on from a clipping; Tab stays inside the campaign while it is open
  document.addEventListener('keydown', e => {
    if (!open || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'Tab') { const f = [...root.querySelectorAll('button:not([disabled]),[href],summary,[tabindex="0"]')].filter(x => x.offsetParent !== null); if (!f.length) return;
      const a = f[0], z = f[f.length - 1]; if (e.shiftKey && (document.activeElement === a || !root.contains(document.activeElement))) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } return; }
    if (view !== 'game' || !st) return;
    const t = document.activeElement, onCtl = t && t.matches && t.matches('button,summary,a');
    if (!fb) { const k = e.key.toUpperCase(), n = /^[1-6]$/.test(k) ? +k - 1 : LET.indexOf(k); if (n >= 0 && k.length === 1) { const b = inn.querySelectorAll('.cmp-opt')[n]; if (b && !b.disabled) { e.preventDefault(); b.click(); } } }
    else if ((e.key === 'Enter' && !onCtl) || e.key === 'n' || e.key === 'N') { const b = inn.querySelector('[data-a="next"]'); if (b) { e.preventDefault(); b.click(); } } });
  const refocus = a => { const b = inn.querySelector(`[data-a="${a}"]`); if (b) b.focus(); };
  const keepFocus = (attr, v) => { const b = inn.querySelector(`[data-${attr}="${v}"]`); if (b) b.focus(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) { e.preventDefault(); if (window.CAMPAIGN_COLL && window.CAMPAIGN_COLL.state.bOpen) { window.CAMPAIGN_COLL.state.bOpen = null; const y = root.scrollTop; render(); root.scrollTop = y; } else if (achOpen) { achOpen = null; render(); } else if (view === 'ach' || view === 'binder' || view === 'compare' || view === 'hall') { view = st ? viewFor() : 'select'; render(); } else hide(); } });
  const viewFor = () => !st ? 'select' : st.phase === 'FAILED' ? 'failed' : st.phase === 'ENDED' ? 'verdict' : st.phase === 'HUNG' ? 'hung' : st.phase === 'ELECTION' ? 'night' : st.phase === 'CAMPAIGN' && st.needTour && !st.queue.length ? 'tour' : 'game';

  function toast(a) { setTimeout(() => sfx('chime'), 400); const box = $('cmptoasts'); while (box.children.length >= 2) box.firstChild.remove(); const t = document.createElement('div'); t.className = 'cmp-toast'; t.innerHTML = `<span class="medal sm">${mIcon(a, false)}</span><span><small>Honour earned</small><b>${esc(a.title)}</b></span>`;
    $('cmptoasts').appendChild(t); setTimeout(() => t.classList.add('out'), 3800); setTimeout(() => t.remove(), 4400); }

  // ---- shared pieces
  const photo = (n, cls) => { const p = APP.phOf(n); return p ? `<img class="${cls || 'ph'}" src="${esc(p)}" alt="" loading="lazy">` : `<span class="${cls || 'ph'} noph" aria-hidden="true">${esc(n[0])}</span>`; };
  // openings unlock with honours
  function scenNeed(id) { const k = (C.scenLock || {})[id]; return k ? Math.max(0, k - achCount()) : 0; }
  // a leader's progress: their own honours and leader-only answers
  function ldrProg(L) { const g = A.get(), lo = E.loGet(), hs = A.list.filter(a => a.leader === L.id), os = (C.LO || []).filter(o => o.only === L.id);
    const a = hs.filter(x => g[x.id]).length, b = os.filter(o => lo[o.lo]).length, t = hs.length + os.length; return { a, b, h: hs.length, o: os.length, f: t ? (a + b) / t : 0 }; }
  function ldrTags(L) { const t = []; if (exMP(L)) t.push('comeback'); if (L.fresh) t.push('fresh'); if ((C.byElect || {})[L.id]) t.push('byelection'); if (L.sb === 'Nationals') t.push('nationals'); const f = facOf(L.name); if (f === 'Labor Left') t.push('left'); if (f === 'Labor Right') t.push('right'); if (L.party === 'LNP' && L.sb !== 'Nationals') { if (f === 'Liberal moderate') t.push('mod'); if (f === 'National Right') t.push('natright'); if (f === 'Centre Right') t.push('centre'); } if (L.more) t.push('more'); else t.push('main'); return t.join(' '); }
  // the tier-list grade badge; Mark Latham's wears an L plate instead (a nod to the 2004 "Latham and the economy" billboards)
  function gradeTag(L, g) { if (L.id === 'mark_latham') return `<em class="lt-grade g-${g.grade} g-lplate" data-info="${esc('Tier list grade ' + g.grade + '. ' + (g.why || ''))}" aria-label="Tier list grade ${g.grade}, shown as an L plate"><svg class="lp-l" viewBox="0 0 20 20" aria-hidden="true"><path d="M5.6 3.2h3.1v10.3h5.7v3.3H5.6z"/></svg></em>`;
    return `<em class="lt-grade g-${g.grade}" data-info="${esc((g.why || '') + '\nA measure of difficulty in this scenario, not of the person.')}" aria-label="Tier list grade ${g.grade}">${g.grade}</em>`; }
  // a former MP who would need a by-election to get back in counts as a comeback, whether or not the data flags it
  const exMP = L => !!L.cb || (!L.fresh && !L.inc && !!(window.CAMPAIGN_DATA.byElect || {})[L.id]);
  // running mates: Labor deputies come from the other faction; the Coalition has a party deputy and a coalition partner
  function facOf(n) { const F = (typeof FAC !== 'undefined' && FAC[n]) || (typeof FAC_NEW !== 'undefined' && FAC_NEW[n]) || (C.FACX || {})[n]; return F === 'LL' ? 'Labor Left' : F === 'LR' ? 'Labor Right' : F === 'LM' ? 'Liberal moderate' : F === 'NR' ? 'National Right' : F === 'CR' ? 'Centre Right' : ''; }
  function mateRole(L, i, m) { if (L.party === 'ALP') { const f = facOf(m); return 'Deputy' + (f ? ' · ' + f : ''); }
    if (L.party === 'LNP') return i === 0 ? (L.sb === 'Nationals' ? 'Nationals deputy' : 'Liberal deputy' + (facOf(m) ? ' · ' + facOf(m) : '')) : (L.sb === 'Nationals' ? 'Coalition partner · Liberal leader' : 'Coalition partner · Nationals leader');
    return i === 0 ? 'Running mate' : 'With'; }
  function siteTraits(L) { const T = window.TRAITS; if (!T) return []; const ids = T.A[L.name + '|' + (L.sb || C.PARTIES[L.party].ldr)] || T.A[L.name] || [];
    return ids.map(id => T.L[id]).filter(Boolean).map(t => ({ n: t[0], tier: t[1], d: t[2], fx: traitFx(t) })); }
  // a trait's vote effects in words: national points for your party, then extras by kind of seat or by state
  function traitFx(t) { const T = window.TRAITS, f = v => (v > 0 ? '+' : '−') + Math.abs(v).toFixed(Math.abs(v) < 1 && Math.round(Math.abs(v) * 10) !== Math.abs(v) * 10 ? 2 : 1).replace(/\.0$/, ''), out = [];
    if (t[3]) out.push(`${f(t[3])} nationally`);
    (t[4] || []).forEach(([m, v]) => { if (!v) return; if (/^st:/.test(m)) out.push(`${f(v)} in ${m.slice(3)}`); else out.push(`${f(v)} in ${(T.ML || {})[m] || m}`); });
    return out.length ? out : ['No vote effect']; }
  const mIcon = (a, hid) => hid || !a.svg ? `<b class="mq">${hid ? '?' : ICON('medal')}</b>` : `<svg class="mi" viewBox="0 0 24 24" aria-hidden="true">${a.svg}</svg>`;
  const achCount = () => Object.keys(A.get()).filter(k => A.list.some(a => a.id === k)).length;
  // campaign settings and the trophy cabinet, as switches and chips in the site bar's type
  const toolbar = () => { const n = achCount(), N = A.list.length, ownN = C.leaders.filter(L => owns(L.id)).length;
    return `<div class="cmp-tools"><span class="ct-grp ct-set" role="group" aria-label="Settings"><span class="ct-k">Settings</span>`
    + `<button type="button" class="ct-tog" data-a="sound" aria-pressed="${!!prefs.sound}"><span>Sound</span><i aria-hidden="true"></i></button>`
    + `<button type="button" class="ct-tog" data-a="motion" aria-pressed="${!!prefs.motion}"><span>Motion</span><i aria-hidden="true"></i></button></span>`
    + `<span class="ct-grp ct-nav"><button type="button" class="ct-btn" data-a="board" title="Best scores by leader, difficulty, today’s challenge and Ironman">${ICON('medal', 'ct-ic')}Leaderboards</button>`
    + `<button type="button" class="ct-btn ct-bind${view === 'binder' ? ' on' : ''}" data-a="binder" title="Browse your 65-card leader album, rarity odds and personal dossiers">${ICON('diamond', 'ct-ic')}Binder <b class="num">${ownN}<small>/${C.leaders.length}</small></b></button>`
    + `<button type="button" class="ct-btn ct-cmp${view === 'compare' ? ' on' : ''}" data-a="compare" title="Compare any two leader cards side by side">${ICON('flip', 'ct-ic')}Compare</button>`
    + `<span class="ct-hallwrap"><button type="button" class="ct-btn ct-hall${view === 'hall' ? ' on' : ''}" data-a="hall" title="Your past campaigns, and moving your profile to another device">${ICON('star', 'ct-ic')}<span class="ct-full">Hall of Fame and Your Profile</span><span class="ct-short">Hall &amp; Profile</span></button>${SiteBar.ib('hall', 'the Hall of fame')}</span>`
    + `<button type="button" class="ct-btn ct-hon${view === 'ach' ? ' on' : ''}" data-a="ach" aria-label="Honours: ${n} of ${N} earned">${ICON('medal', 'ct-ic')}Honours <b class="num">${n}<small>/${N}</small></b><span class="ct-bar" aria-hidden="true"><i style="width:${(n / N * 100).toFixed(1)}%"></i></span></button></span></div>`; };
  const mast = (flag, title, dek) => `<header class="cmp-mast"><div class="cm-flag">${flag}</div><h2 id="cmp-title" tabindex="-1">${title}</h2>${dek ? `<p class="cm-dek">${dek}</p>` : ''}</header>`;
  const fig = (n, t, sub) => `<div class="cmp-fighead">${n ? `<span class="fig">Fig. ${n}</span>` : ''}<strong>${t}</strong>${sub ? `<small>${sub}</small>` : ''}</div>`;
  function medal(a, opts) { const got = A.get()[a.id], hid = a.secret && !got && !(opts && opts.run);
    return `<button type="button" class="medal-tile${got ? ' got' : ''}${opts && opts.fresh ? ' fresh' : ''}${achOpen === a.id ? ' on' : ''}" data-achv="${a.id}" aria-expanded="${achOpen === a.id}">
      <span class="medal ${A.rim().cls}">${mIcon(a, hid)}</span><span class="mt-txt"><b>${hid ? 'Secret honour' : esc(a.title)}</b><small>${[a.sub, opts && opts.fresh ? 'new' : got ? 'earned' : a.sub ? '' : 'not earned yet'].filter(Boolean).map(esc).join(' · ')}</small></span>${a.hard ? '<em class="hard">Hard</em>' : ''}</button>`; }
  function achDetail(a, why) { const got = A.get()[a.id], hid = a.secret && !got;
    return `<div class="ach-detail" role="region" aria-label="${esc(a.title)}"><span class="medal lg ${A.rim().cls}">${mIcon(a, hid)}</span><div>
      <div class="kick">${esc(a.cat)}${a.secret ? ' · secret' : ''}${a.hard ? ' <em class="hard">Hard</em>' : ''}</div><h4>${hid ? 'Secret honour' : esc(a.title)}</h4><p>${hid ? 'Keep playing to find out what this one takes.' : esc(a.d)}</p>
      ${why || (got && got.w) ? `<p class="how"><b>How you earned it:</b> ${esc(why || got.w)}</p>` : ''}
      ${got ? `<p class="when">Earned ${new Date(got.at).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}${got.by ? ' as ' + esc((C.leaders.find(l => l.id === got.by) || {}).name || '') : ''}</p>` : '<p class="when">Not earned yet.</p>'}</div>
      <button type="button" class="cmp-link close" data-achv="${a.id}" aria-label="Close">${ICON('close')}</button></div>`; }

  // ---- leader select
  // today's challenge: one leader and one opening for everyone, shown in place of the leader grid
  function dailyCard() { const L = E.dailyLeader(), S = E.dailyScen(), P = C.PARTIES[L.party], dd = E.daily()[E.today()];
    const seat = ((APP.DATA.leaders.find(x => x.name === L.name && x.party === (L.sb || P.ldr)) || {}).seat || '').replace(' (candidate)', ' (running)');
    const g = ((window.TIERLIST || {}).leaders || []).find(x => x.id === L.id), when = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
    const start = (C.byElect || {})[L.id] ? `A by-election in ${esc(C.byElect[L.id][0])} first${L.inc ? '' : ', then the leadership spill'}` : L.inc ? 'Straight to the campaign' : 'A five-question leadership spill first';
    return `<section class="cmp-daily" style="--pc:${PC(L.party)}" aria-labelledby="cd-h"><div class="cd-top"><span class="kick" id="cd-h">Today’s challenge · ${esc(when)}</span><span class="cd-note">Same for everyone · new at midnight</span></div>
      <div class="cd-cols"><div class="cd-ldr"><span class="cd-pic">${photo(L.name, 'cd-ph')}${g ? `${gradeTag(L, g)}` : ''}</span>
        <div><span class="kick">Your leader</span><h3>${esc(L.name)}</h3><p class="cd-sub">${esc(P.n)}${seat ? ' · ' + esc(seat) : ''}</p><p class="cd-perks"><span class="pk ${L.noGood ? 'bad' : 'good'}"><b>${esc(L.plus[0])}</b> ${kw(esc(L.plus[1]))}</span><span class="pk bad"><b>${esc(L.minus[0])}</b> ${kw(esc(L.minus[1]))}</span></p></div></div>
        <div class="cd-scen"><span class="kick">The opening</span><h3>${esc(S.n)}</h3><p>${esc(S.d)}</p></div></div>
      <ul class="cd-rules"><li>${start}</li><li>Standard difficulty</li><li>Same opening, cards and luck for everyone, until your choices differ</li><li>Same election-night count</li></ul>
      <div class="cd-go"><button type="button" class="cmp-go" data-lead="${L.id}">Start today’s challenge as ${esc(surname(L.name))} →</button><span class="cd-best">${dd ? `Your best today: <b class="num">${dd.score}</b> points` : 'No score yet today'}</span></div></section>`; }
  const MR_TITLES = ['Top tier reached', 'Second tier reached', 'Third tier reached', 'Played'];
  function buildTCard(L, opts) {
    opts = opts || {};
    const p = L.party, P = C.PARTIES[p], mast = opts.mast || E.mastery();
    const tr = siteTraits(L), seat = ((APP.DATA.leaders.find(x => x.name === L.name && x.party === (L.sb || P.ldr)) || {}).seat || '').replace(' (candidate)', ' (running)');
    const mk = mast[L.id], pg = ldrProg(L);
    const g = ((window.TIERLIST || {}).leaders || []).find(x => x.id === L.id), rar = g ? g.grade : 'N', no = C.leaders.indexOf(L) + 1;
    const badge = L.inc ? (P.cross && p !== 'ONP' ? (p === 'IND' ? (L.fresh ? 'Fresh face' : L.cb ? 'Comeback' : L.more ? 'Teal' : 'Convenor') : 'Leader') : 'Leader') : exMP(L) ? 'Comeback' : L.sb === 'Nationals' ? 'Nationals' : 'Challenger';
    const fac = (L.party === 'ALP' || (L.party === 'LNP' && L.sb !== 'Nationals')) && facOf(L.name) ? facOf(L.name) : '';
    const route = (C.byElect || {})[L.id] ? `By-election in ${esc(C.byElect[L.id][0])}${L.inc ? ', then the campaign' : ', then the spill'}` : L.inc ? 'Straight to the campaign' : 'Five-question spill first';
    const art = (window.CARD_ART || {})[L.name], cred = art ? art.credit : (APP.phCred ? APP.phCred(L.name) : '');
    const logo = { ALP: 'alp', LNP: 'lnp', GRN: 'grn', ONP: 'onp' }[L.party], RN = { A: 'Holo rare', B: 'Gold', C: 'Silver', D: 'Bronze', E: 'Common', F: 'Common', N: 'Common' };
    const q = esc((L.name + ' ' + seat + ' ' + C.PARTIES[L.party].n + (L.sb ? ' ' + L.sb : '') + ' ' + (((C.byElect || {})[L.id] || [])[0] || '')).toLowerCase().replace(/\((nsw|vic|qld|wa|sa|tas|act|nt)\)/g, (m, k) => m + ' ' + { nsw: 'new south wales', vic: 'victoria', qld: 'queensland', wa: 'western australia', sa: 'south australia', tas: 'tasmania', act: 'canberra', nt: 'northern territory' }[k]));
    const isOwned = owns(L.id);
    const lockedCls = !isOwned && !opts.forceUnlocked ? ' locked' : '';
    const noHoldCls = opts.inModal ? ' no-hold' : '';
    return `<div class="cmp-ltile tcard r-${rar}${lockedCls}${noHoldCls}" data-lead="${L.id}" data-tags="${ldrTags(L)}${isOwned ? ' owned' : ''}" data-q="${q}" style="--pc:${PC(L.party)}" tabindex="0" role="button" aria-label="${esc(L.name)}, ${esc(C.PARTIES[L.party].n)}. ${opts.inModal ? 'Press to flip the card.' : `Press to flip the card; press and hold for three seconds to play as ${esc(surname(L.name))}.`}">
      <div class="tc-3d"><div class="tc-flip">
      <section class="tc-face tc-front" aria-label="${esc(L.name)}, front of card">
        <header class="tc-top"><b class="lt-name">${esc(L.name)}</b>${g ? `${gradeTag(L, g)}` : ''}</header>
        <div class="tc-art lt-pic${mk != null ? ' mast m' + mk : ''}${art ? ' has-art' : ''}">${art ? `<img class="lt-ph" src="${esc(art.src)}" alt="" loading="lazy" style="object-position:${esc(art.pos || '50% 20%')}">` : (() => { const src = APP.phOf(L.name); return src && !/^data:/.test(src) ? `<img class="tc-bgph" src="${esc(src)}" alt="" aria-hidden="true" loading="lazy"><img class="lt-ph tc-fit" src="${esc(src)}" alt="" loading="lazy">` : photo(L.name, 'lt-ph'); })()}<i class="tc-holo" aria-hidden="true"></i><i class="tc-glare" aria-hidden="true"></i><span class="tc-lock" aria-hidden="true"><b>Not collected</b><small>Find this leader in a pack</small></span><em class="lt-badge ${L.inc ? 'inc' : 'ch'}">${badge}</em>${mk != null ? `<i class="lt-rib" title="${MR_TITLES[Math.min(3, mk)]}" aria-label="${MR_TITLES[Math.min(3, mk)]}">${mk <= 2 ? ['I', 'II', 'III'][mk] : '·'}</i>` : ''}</div>
        <div class="tc-type"><span>${esc(C.PARTIES[L.party].n)}${L.sb === 'Nationals' ? ' · Nationals' : ''}${fac ? ' · ' + esc(fac) : ''}</span><small>${esc(seat)}</small></div>
        <p class="tc-route">${route}</p>
        <div class="tc-moves lt-perks"><p class="pk ${L.noGood ? 'bad' : 'good'}">${TM(L.noGood ? -1 : 1)}<span><b>${esc(L.plus[0])}</b> ${kw(esc(L.plus[1]))}</span></p><p class="pk bad">${TM(-1)}<span><b>${esc(L.minus[0])}</b> ${kw(esc(L.minus[1]))}</span></p></div>
        ${tr.length ? `<p class="tc-more"><span>Character traits on back</span><span class="tc-mk" aria-hidden="true">${tr.map(t => TM(t.tier)).join('')}</span></p>` : ''}
        <footer class="tc-foot"><span class="tc-no">No. ${String(no).padStart(3, '0')}/${String(C.leaders.length).padStart(3, '0')}</span><span class="tc-rar">${RN[rar]}</span></footer>
      </section>
      <section class="tc-face tc-back" aria-label="${esc(L.name)}, back of card">
        <header class="tc-bhead">${logo ? `<img class="tc-logo" src="assets/img/logos/${logo}.png" alt="">` : `<b class="tc-plogo">${esc(C.PARTIES[L.party].n)}</b>`}<span><b>${esc(L.name)}</b><small>${esc(seat)}${fac ? ' · ' + esc(fac) : ''}</small></span></header>
        <div class="tc-bsec"><span class="tc-bk">The ticket</span><div class="lt-mates">${L.mates.map((m, i) => `<span>${photo(m, 'mt-ph')}<span class="mt-who"><i>${esc(mateRole(L, i, m))}</i>${esc(m)}</span></span>`).join('')}</div></div>
        ${tr.length ? `<div class="tc-bsec"><span class="tc-bk">Character traits</span><ul class="tc-traits">${tr.map(t => `<li class="t${t.tier}">${TM(t.tier)}<span><b>${esc(t.n)}</b>${esc(t.d)}<em class="tc-fx">${t.fx.map(esc).join(' · ')}</em></span></li>`).join('')}</ul></div>` : ''}
        <div class="tc-bsec"><span class="tc-bk">Your collection</span><div class="lt-prog" title="Honours and leader-only answers"><i class="pb"><i style="width:${Math.round(pg.f * 100)}%"></i></i><small>Honours ${pg.a}/${pg.h} · answers ${pg.b}/${pg.o}</small></div></div>
        ${cred ? `<p class="tc-cred">Photo: ${esc(cred)}</p>` : ''}
        <footer class="tc-foot"><span class="tc-no">No. ${String(no).padStart(3, '0')}/${String(C.leaders.length).padStart(3, '0')}</span>${!opts.hideCompareBtn ? `<button type="button" class="tc-cmpbtn" data-cmpfrom="${L.id}">Compare →</button>` : ''}<span class="tc-rar">${RN[rar]}</span></footer>
      </section>
      </div></div>
      ${opts.inModal ? '' : `<div class="tc-ring" aria-hidden="true"><svg viewBox="0 0 80 80"><circle class="tr-bg" cx="40" cy="40" r="34"/><circle class="tr-arc" cx="40" cy="40" r="34"/></svg><b>Play as<br>${esc(surname(L.name))}</b></div>
      <div class="tc-hint" aria-hidden="true"><i class="tc-hbar"><i></i></i><span class="h-own"><b>Tap</b> to flip · <b>hold</b> to play as ${esc(surname(L.name))}</span><span class="h-lock"><b>Tap</b> to flip · open packs to collect ${esc(surname(L.name))}</span></div>`}
    </div>`;
  }
  function collCtx() {
    return { C, E, A, APP, ICON, esc, PC, PN, SX, TM, kw, photo, gradeTag, siteTraits, facOf, mateRole, exMP, ldrProg, coll, owns, packsLeft, nextPackAt, packBtn, collBar, achCount, toolbar, mast, buildTCard };
  }
  function vSelect() {
    if (scenNeed(prefs.scen)) { prefs.scen = 'std'; savePrefs(); }
    const saved = E.load(), mastAll = E.mastery();
    const cols = Object.entries(C.PARTIES).map(([p, P]) => {
      const ls = C.leaders.filter(l => l.party === p);
      const tile = L => buildTCard(L, { mast: mastAll });
      // sitting members of parliament show straight away; anyone who would need a by-election to get in sits behind one clear toggle
      const outP = L => !!((C.byElect || {})[L.id] || L.cb || L.fresh);
      const inn0 = ls.filter(L => !outP(L)), out = ls.filter(outP);
      // within each group: the party's real current leader first, then by tier-list grade (A to F), strongest first
      const TLs = ((window.TIERLIST || {}).leaders || []), rk = L => { const i = TLs.findIndex(x => x.id === L.id); return i < 0 ? 1e4 : i; };
      const ord = g => g.slice().sort((a, b) => (b.inc && !b.more ? 1 : 0) - (a.inc && !a.more ? 1 : 0) || rk(a) - rk(b));
      const innG = [[null, ord(inn0.filter(L => L.sb !== 'Nationals'))], ['Nationals', ord(inn0.filter(L => L.sb === 'Nationals'))]].filter(g => g[1].length);
      const outG = [['Nationals', ord(out.filter(L => L.sb === 'Nationals'))], ['Comebacks', ord(out.filter(L => exMP(L) && L.sb !== 'Nationals'))], ['New candidates', ord(out.filter(L => !exMP(L) && L.sb !== 'Nationals'))]].filter(g => g[1].length);
      return `<section class="cmp-pcol" data-p="${p}" style="--pc:${PC(p)}"><h3><span>${P.n}</span><small>${p === 'ALP' ? 'Defending 94 seats' : p === 'LNP' ? 'From 2025’s low of 43' : p === 'ONP' ? 'Polling at record highs' : esc((C.TIERNOTE || {})[p] || '')}</small></h3>`
        + `<h4 class="lt-grp lt-inp">In parliament</h4>` + innG.map(([h, g]) => (h ? `<h4 class="lt-grp">${h}</h4>` : '') + g.map(tile).join('')).join('')
        + (out.length ? `<details class="lt-more lt-out"><summary><span class="lo-t">Out of parliament</span><span class="lo-n">${out.length} leader${out.length > 1 ? 's' : ''}</span><span class="lo-h">Would need a by-election to get in</span></summary><div class="lt-mg">${outG.map(([h, g]) => `<h4 class="lt-grp">${h}</h4>${g.map(tile).join('')}`).join('')}</div></details>` : '')
        + `</section>`; }).join('');
    return toolbar() + mast('Australia 2028 · The campaign', 'Choose your leader', 'Fight the 2028 federal election as Labor, the Coalition, One Nation, the Greens or the teal independents. Twenty-five turns over five weeks: every answer moves the vote and the seat count updates as you go. On election night the full simulator counts every seat.')
      + (saved ? `<div class="cmp-resume"><span class="kick">Campaign in progress</span><span><b>${esc(E.ldrOf(saved).name)}</b>, ${saved.phase === 'BYELECTION' ? 'by-election question ' + saved.turn : saved.phase === 'SPILL' ? 'spill question ' + saved.turn : saved.phase === 'ENDED' ? 'finished' : 'turn ' + saved.turn + ' of ' + saved.T}.</span><button type="button" data-a="resume">Resume</button><button type="button" class="ghost" data-a="discard">Discard</button></div>` : '')
      + (() => { const d = E.daily()[E.today()], D = E.DIFF;
          return `<div class="sel-grid"><aside class="sel-side" aria-label="Set up your run"><div class="cmp-setup"><div class="cs-grp" role="radiogroup" aria-label="Mode"><span class="kick">Mode ${SiteBar.ib('mode', 'the modes')}</span><div class="cs-segs">
            <button type="button" class="seg${prefs.mode === 'run' ? ' on' : ''}" data-mode="run" aria-pressed="${prefs.mode === 'run'}">Free campaign</button>
            <button type="button" class="seg${prefs.mode === 'daily' ? ' on' : ''}" data-mode="daily" aria-pressed="${prefs.mode === 'daily'}">Today’s challenge</button>
            <button type="button" class="seg${prefs.mode === 'iron' ? ' on' : ''}" data-mode="iron" aria-pressed="${prefs.mode === 'iron'}">Ironman</button></div></div>
            <div class="cs-grp" role="radiogroup" aria-label="Difficulty"${prefs.mode === 'daily' ? ' hidden' : ''}><span class="kick">Difficulty ${SiteBar.ib('difficulty', 'difficulty')}</span><div class="cs-segs">${Object.entries(D).map(([k, x]) => `<button type="button" class="seg${prefs.diff === k ? ' on' : ''}" data-diff="${k}" aria-pressed="${prefs.diff === k}">${x.n}</button>`).join('')}</div></div>
            <label class="cs-grp scen"${prefs.mode === 'daily' ? ' hidden' : ''}><span class="kick">Opening ${SiteBar.ib('opening', 'openings')}</span><select class="cs-sel" id="cmpscen">${C.scenarios.map(x => { const need = scenNeed(x.id); return `<option value="${x.id}"${prefs.scen === x.id ? ' selected' : ''}${need ? ' disabled' : ''}>${esc(x.n)}${need ? ` · locked: earn ${need} more honour${need > 1 ? 's' : ''}` : ''}</option>`; }).join('')}</select></label>
            ${prefs.mode === 'daily' ? '' : `<p class="cs-note scen-d"><b>${esc((E.scenOf(prefs.scen) || C.scenarios[0]).n)}.</b> ${esc((E.scenOf(prefs.scen) || C.scenarios[0]).d)}</p>`}
            ${prefs.mode === 'iron' ? '<p class="cs-note iron"><b>Ironman.</b> Rough polls only: no seat map, no pollster table, no exact numbers. No run codes, and walking away counts as a loss. Scores count half as much again.</p>' : ''}
            <p class="cs-note">${prefs.mode === 'daily' ? 'One leader and one opening, drawn at random each day: the same for everyone.'
              : prefs.diff === 'easy' ? 'Easy: rivals answer back more softly, the polls are honest and Political Power comes faster.' : prefs.diff === 'hard' ? 'Hard: rivals hit back harder, the polls can be badly wrong, and Political Power is tight. Scores count for more.' : 'Standard: the campaign as designed.'}</p></div>`; })()
      + `<details class="cmp-howd"><summary>How a campaign plays</summary><div class="cmp-how"><span><b>${SX('pp', 'in')}Political Power</b> builds each turn; spend it on campaign decisions.</span><span><b>${SX('unity', 'in')}Caucus unity</b> below 40 leaks; below 20 means revolt.</span><span><b>${SX('mom', 'in')}Momentum</b> lifts your vote and fades a point a turn. Hold 6 or more while ahead to ride a wave.</span><span><b>Rivals answer back:</b> an average answer just holds ground. Beat the typical answer to build a lead.</span><span><b>The polls lie a little.</b> Several pollsters, each with a lean, and a hidden miss you only find out about on election night.</span><span><b>Every week</b> you pick two states to tour; in the final week pre-poll is open and each day counts for less.</span></div></details>`
      + `<details class="cmp-code"><summary>Continue a campaign from another device</summary><p class="cmp-note">Paste a run code from Copy a run code (in any campaign’s side column).</p><textarea id="cmpcode" rows="3" spellcheck="false" aria-label="Run code" placeholder="ES28-…"></textarea><div class="cmp-endbtns"><button type="button" data-a="loadcode">Load the run</button><span class="code-msg" role="status">${esc(codeMsg)}</span></div></details></aside><div class="sel-main">`
      + (prefs.mode === 'daily' ? dailyCard() : `<div class="ldr-find" role="search"><div class="lf-tabs" role="tablist" aria-label="Party">${[...Object.entries(C.PARTIES).map(([k, P]) => [k, P.n]), ['all', 'All parties'], ['own', 'Unlocked']].map(([k, n]) => `<button type="button" role="tab" class="lf-tab${prefs.party === k ? ' on' : ''}" data-lp="${k}" aria-selected="${prefs.party === k}"${C.PARTIES[k] ? ` style="--pc:${PC(k)}"` : k === 'own' ? ' style="--pc:#c9962e"' : ''}>${esc(n)}<small>${k === 'all' ? C.leaders.length : k === 'own' ? C.leaders.filter(l => owns(l.id)).length : C.leaders.filter(l => l.party === k).length}</small></button>`).join('')}</div><label class="lf-q"><span class="kick">Find a leader</span><input id="ldrq" type="search" placeholder="Name, seat or party" autocomplete="off" value="${esc(ldrQ)}"></label><div class="lf-chips" role="group" aria-label="Show">${[['all', 'All'], ['owned', 'Unlocked'], ['main', 'Headliners'], ['comeback', 'Comebacks'], ['fresh', 'Fresh faces'], ['nationals', 'Nationals'], ['left', 'Labor Left'], ['right', 'Labor Right'], ['mod', 'Liberal Moderates'], ['natright', 'National Right'], ['centre', 'Centre Right']].map(([k, n]) => `<button type="button" class="seg${ldrF === k ? ' on' : ''}" data-lf="${k}" aria-pressed="${ldrF === k}">${n}</button>`).join('')}</div><div class="lf-acts"><a class="lf-tl" href="tier-list.html">Tier list: who is easiest to win with ${ICON('star')}</a><button type="button" data-a="binder" title="Open the 65-card collection album">${ICON('diamond')} Collection Binder</button><button type="button" data-a="compare" title="Compare any two leaders side by side">${ICON('flip')} Compare Leaders</button><button type="button" data-a="randlead" title="Start a campaign as a random leader from your collection">${ICON('dice')} Random Leader</button>${packBtn()}</div><p class="coll-n">${collBar()}</p><p class="lf-n cmp-note" id="lfn" role="status"></p></div>`
      + `<div class="cmp-pcols${C.PARTIES[prefs.party] && prefs.mode !== 'daily' ? ' one' : ''}">${prefs.mode === 'daily' ? '' : cols}</div><p class="cmp-note">Vote effects come from each leader’s sandbox traits (++ to −−); the perks are campaign rules. XYZ News is fictional, and none of the choices are quotes from real people. Tier-list grades (A to F) measure how hard each leader is to win with in the current scenario, not a judgement of the people themselves.</p></div></div>`);
  }

  // ---- figures
  function seatbar(seats, base) {
    const order = { ALP: ['ALP', 'GRN', 'IND', 'OTH', 'ONP', 'LNP'], LNP: ['LNP', 'ONP', 'IND', 'OTH', 'GRN', 'ALP'], ONP: ['ONP', 'LNP', 'IND', 'OTH', 'GRN', 'ALP'], GRN: ['GRN', 'ALP', 'IND', 'OTH', 'ONP', 'LNP'], IND: ['IND', 'GRN', 'ALP', 'OTH', 'ONP', 'LNP'] }[st.party];
    const seg = order.filter(p => seats[p]).map(p => `<i style="flex:${seats[p]};background:${PC(p)}" title="${PN(p)} ${seats[p]}"></i>`).join('');
    const nums = ['ALP', 'LNP', 'ONP', 'GRN', 'IND'].map(p => { const d = base ? seats[p] - base[p] : 0;
      return `<span class="sn${p === st.party ? ' me' : ''}" style="--pc:${PC(p)}"><small>${PNL(p)}</small><b class="num">${seats[p]}</b>${d ? `<em class="${(p === st.party) === (d > 0) ? 'up' : 'dn'}">${d > 0 ? '▲' : '▼'}${Math.abs(d)}</em>` : '<em>&nbsp;</em>'}</span>`; }).join('');
    return `<div class="cmp-seatnums">${nums}</div><div class="cmp-seatbar" role="img" aria-label="Projected seats: ${['ALP', 'LNP', 'ONP', 'GRN', 'IND'].map(p => PN(p) + ' ' + seats[p]).join(', ')}"><div class="sb-track">${seg}</div><span class="sb-76" aria-hidden="true"><span>76</span></span></div>`;
  }
  // the site's own AEC boundary map, built once and recoloured each turn, with city insets drawn from the same paths
  let MAPEL = null;
  function mapEl() {
    if (MAPEL) return MAPEL;
    const G = window.SIM.GEO, D = APP.D, qs = new Set(G.qseats || []);
    const paths = D.seats.map((s, i) => `<path id="cmpc${i}" class="cc" data-st="${s.st}"${qs.has(s.n) ? ' clip-path="url(#cmpqclip)"' : ''} d="${G.cells[s.n].d}"/>`).join('');
    const views = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'].filter(v => G.views[v]);
    const inset = v => { const b = G.views[v]; return `<figure class="ins"><svg viewBox="${b.join(' ')}" role="img" aria-label="${v} inset">${D.seats.map((s, i) => { const c = G.cells[s.n].c; return c && c[0] > b[0] - b[2] && c[0] < b[0] + 2 * b[2] && c[1] > b[1] - b[3] && c[1] < b[1] + 2 * b[3] ? `<use href="#cmpc${i}"/>` : ''; }).join('')}</svg><figcaption>${v}</figcaption></figure>`; };
    MAPEL = document.createElement('div'); MAPEL.className = 'cmp-geo';
    MAPEL.innerHTML = `<div class="mz-ctl" role="group" aria-label="Map zoom"><button type="button" data-z="in" aria-label="Zoom in">+</button><button type="button" data-z="out" aria-label="Zoom out">−</button><button type="button" data-z="reset">Reset</button><button type="button" data-z="big" aria-pressed="false">Bigger map</button></div><div class="mz-wrap"><svg class="cmp-map" viewBox="0 0 ${G.w} ${G.h}" role="img" aria-label="Seat map: who leads in each of the 150 seats in the latest poll">${G.qmask ? `<defs><clipPath id="cmpqclip"><path d="${G.qmask}"/></clipPath></defs>` : ''}${paths}</svg><p class="mz-hint">Scroll or double-click to zoom · drag to move · keys + − and arrows</p></div><div class="mz-cities" role="group" aria-label="Zoom to a city"><span class="kick">Zoom to</span>${views.map(v => `<button type="button" data-city="${v}">${v}</button>`).join('')}</div>`;
    mapZoom(MAPEL, G);
    // on the tour screen a tap on a seat picks its state
    MAPEL.addEventListener('click', e => { if (!inn.classList.contains('v-tour')) return; const p = e.target.closest('.cc'); if (!p) return; const b = inn.querySelector(`[data-tour="${p.dataset.st}"]`); if (b) b.click(); });
    return MAPEL;
  }
  // zoom and pan for the campaign map: buttons, drag, pinch, and ctrl/trackpad wheel
  function mapZoom(el, G) { const ZMAX = 28; const svg = el.querySelector('.cmp-map'), wrap = el.querySelector('.mz-wrap'); let z = 1, cx = G.w / 2, cy = G.h / 2; const pts = new Map(); let pinch0 = null, drag = null;
    const set = () => { z = Math.max(1, Math.min(ZMAX, z)); const w = G.w / z, h = G.h / z; cx = Math.max(w / 2, Math.min(G.w - w / 2, cx)); cy = Math.max(h / 2, Math.min(G.h - h / 2, cy));
      svg.setAttribute('viewBox', `${(cx - w / 2).toFixed(1)} ${(cy - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`); el.classList.toggle('zoomed', z > 1); };
    const zoomAt = (f, px, py) => { const r = svg.getBoundingClientRect(), w = G.w / z, h = G.h / z; if (px != null) { const mx = cx - w / 2 + (px - r.left) / r.width * w, my = cy - h / 2 + (py - r.top) / r.height * h; z *= f; const w2 = G.w / Math.max(1, Math.min(ZMAX, z)), h2 = G.h / Math.max(1, Math.min(ZMAX, z)); cx = mx - (px - r.left) / r.width * w2 + w2 / 2; cy = my - (py - r.top) / r.height * h2 + h2 / 2; } else z *= f; set(); };
    el.querySelector('.mz-ctl').addEventListener('click', e => { const b = e.target.closest('[data-z]'); if (!b) return; e.stopPropagation(); const k = b.dataset.z;
      if (k === 'in') zoomAt(1.6); else if (k === 'out') zoomAt(1 / 1.6); else if (k === 'reset') { z = 1; cx = G.w / 2; cy = G.h / 2; set(); el.querySelectorAll('[data-city]').forEach(x => x.classList.remove('on')); } else if (k === 'big') { const on = el.classList.toggle('big'); b.setAttribute('aria-pressed', on); b.textContent = on ? 'Smaller map' : 'Bigger map'; } });
    // scrolling over the map zooms it; once fully zoomed out, scrolling down passes through to the page
    svg.addEventListener('wheel', e => { if (z === 1 && e.deltaY > 0 && !e.ctrlKey) return; e.preventDefault(); zoomAt(Math.pow(1.0018, -e.deltaY * (e.deltaMode === 1 ? 30 : 1)), e.clientX, e.clientY); }, { passive: false });
    svg.addEventListener('dblclick', e => { e.preventDefault(); zoomAt(e.shiftKey ? 1 / 1.8 : 1.8, e.clientX, e.clientY); });
    const zoomTo = b => { z = Math.min(ZMAX, Math.min(G.w / b[2], G.h / b[3]) * 0.75); cx = b[0] + b[2] / 2; cy = b[1] + b[3] / 2; set(); };
    el.querySelector('.mz-cities').addEventListener('click', e => { const b = e.target.closest('[data-city]'); if (!b) return; e.stopPropagation(); zoomTo(G.views[b.dataset.city]); el.querySelectorAll('[data-city]').forEach(x => x.classList.toggle('on', x === b)); });
    wrap.tabIndex = 0; wrap.setAttribute('aria-label', 'Seat map. Plus and minus zoom, arrow keys move.');
    wrap.addEventListener('keydown', e => { const k = e.key, step = 0.12; if (k === '+' || k === '=') zoomAt(1.4); else if (k === '-' || k === '_') zoomAt(1 / 1.4); else if (k === '0') { z = 1; cx = G.w / 2; cy = G.h / 2; set(); }
      else if (k.startsWith('Arrow')) { const w = G.w / z, h = G.h / z; if (k === 'ArrowLeft') cx -= w * step; if (k === 'ArrowRight') cx += w * step; if (k === 'ArrowUp') cy -= h * step; if (k === 'ArrowDown') cy += h * step; set(); } else return; e.preventDefault(); });
    svg.addEventListener('pointerdown', e => { pts.set(e.pointerId, [e.clientX, e.clientY]); if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z }; drag = null; } else if (z > 1 && e.button === 0) { drag = { x: e.clientX, y: e.clientY, cx, cy, moved: false }; try { svg.setPointerCapture(e.pointerId); } catch (x) {} el.classList.add('dragging'); } });
    svg.addEventListener('pointermove', e => { if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (pinch0 && pts.size === 2) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); const f = pinch0.z * d / (pinch0.d || 1) / z; zoomAt(f, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); e.preventDefault(); return; }
      if (drag) { const r = svg.getBoundingClientRect(), dx = e.clientX - drag.x, dy = e.clientY - drag.y; if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true; cx = drag.cx - dx / r.width * G.w / z; cy = drag.cy - dy / r.height * G.h / z; set(); } });
    const up = e => { pts.delete(e.pointerId); if (pts.size < 2) pinch0 = null; if (!pts.size) { drag = null; el.classList.remove('dragging'); } }; svg.addEventListener('pointerup', up); svg.addEventListener('pointercancel', up);
    set(); }
  function paintMap() { const slot = $('cmpmapslot'); if (!slot || !st || !st.poll || !st.poll.central) return; const el = mapEl(); slot.appendChild(el);
    el.querySelectorAll('.rip').forEach(p => p.classList.remove('rip', 'rip-up', 'rip-dn', 'rip-x'));
    const tour = view === 'tour' && tourSel.length; el.classList.toggle('tourmode', view === 'tour'); el.querySelectorAll('.cc').forEach(p => p.classList.toggle('dimst', !!tour && !tourSel.includes(p.dataset.st)));
    if (fb && fb.rip) fb.rip.forEach(([i, d]) => { const p = el.querySelector('#cmpc' + i); if (p) p.classList.add('rip', d > 0 ? 'rip-up' : d < 0 ? 'rip-dn' : 'rip-x'); });
    const G = window.SIM.GEO;
    st.poll.central.forEach((g, i) => { const p = el.querySelector('#cmpc' + i); if (p) { const nf = `var(--${APP.P[g].k})`; if (p.style.fill && p.style.fill !== nf && prefs.motion) { const c = (G.cells[APP.D.seats[i].n] || {}).c; p.style.transitionDelay = c ? Math.round((1 - c[0] / G.w) * 700) + 'ms' : '0ms'; } else p.style.transitionDelay = '0ms'; p.style.fill = nf; const s = APP.D.seats[i];
      const sp = (st.spot || []).find(x => x.i === i); p.dataset.lab = `<b>${esc(s.n)} <small>${s.st}</small></b>${esc(APP.P[g].n)} ahead in the latest poll${sp ? ' · one of your seats to watch' : ''}${s.mem ? `<small>Held by ${esc(s.mem)} (${esc(PFULL(s.inc))})</small>` : ''}`; } }); }
  function spiritRows() {
    const tierCls = t => t <= -2 ? 'n2' : t < 0 ? 'n1' : t >= 2 ? 'p2' : t > 0 ? 'p1' : 'z', TW = t => t <= -2 ? 'Hurts you badly' : t < 0 ? 'Hurts you' : t >= 2 ? 'Helps you a lot' : t > 0 ? 'Helps you' : 'Cuts both ways';
    return `<div class="cmp-spirits">${st.spirits.map(id => { const s = E.spirit(id), t = E.tierFor(st, id), ic = (C.spiritIcon || {})[s.grp], lock = E.lever(st, id);
      return `<details class="spc ${tierCls(t)}${s.own ? ' own' : ''}"><summary><span class="sp-ic">${ic ? `<svg class="mi" viewBox="0 0 24 24" aria-hidden="true">${ic}</svg>` : ''}</span><span class="sp-t"><small class="sp-k">${esc((C.spiritIssue || {})[s.grp] || 'The mood')}${lock ? ` <i class="sp-lock">Government’s call</i>` : ''}</small><span class="sp-n">${esc(s.n)}</span></span><span class="sp-tier" title="${TW(t)}" aria-label="${TW(t)}">${TIERSYM[Math.max(-2, Math.min(2, t))]}</span></summary><p><b>${TW(t)}.</b> ${esc(s.d)}${lock ? ' Only the government can move this one; your answers on it shape your own vote, not the mood.' : ''}</p></details>`; }).join('')}</div>`;
  }
  function track() {
    if (st.phase === 'BYELECTION') return `<div class="cmp-track spill" data-tip="bytrack" tabindex="0" aria-describedby="cmptip" aria-label="By-election question ${st.turn} of 5">${[1, 2, 3, 4, 5].map(t => `<i class="${t < st.turn ? 'done' : t === st.turn ? 'now' : ''}${t === 5 ? ' mile' : ''}" title="${t === 5 ? 'Polling day' : 'Question ' + t}"></i>`).join('')}<span class="tk-l">By-election in ${esc(st.by.seat)} · count after question 5${st.inc ? '' : ', then the spill'}</span></div>`;
    if (st.phase === 'SPILL') return `<div class="cmp-track spill" data-tip="spilltrack" tabindex="0" aria-describedby="cmptip" aria-label="Spill question ${st.turn} of 5">${[1, 2, 3, 4, 5].map(t => `<i class="${t < st.turn ? 'done' : t === st.turn ? 'now' : ''}${t === 4 ? ' mile' : ''}" title="${t === 4 ? 'The ballot' : 'Question ' + t}"></i>`).join('')}<span class="tk-l">Spill · ballot after question 4</span></div>`;
    const mt = new Set(E.milestoneTurns(st.T)), wk = st.T / 5;
    let h = ''; for (let t = 1; t <= st.T; t++) h += `<i class="${t < st.turn ? 'done' : t === st.turn ? 'now' : ''}${mt.has(t) ? ' mile' : ''}${t % wk === 0 && t < st.T ? ' wk' : ''}" title="Turn ${t}${mt.has(t) ? ' · milestone' : ''}"></i>`;
    return `<div class="cmp-track" data-tip="track" tabindex="0" aria-describedby="cmptip" aria-label="Turn ${Math.min(st.turn, st.T)} of ${st.T}">${h}<span class="tk-l">Turn ${Math.min(st.turn, st.T)} of ${st.T} · ${ICON('diamond', 'ic-s')} milestones</span></div>`;
  }
  // a small line of your poll position across the campaign
  function spark(key, w, h, lab) { return sparkOf((st.hist || []).map(x => x[key]), w, h, lab); }
  function sparkOf(pts, w, h, lab) { pts = pts.filter(v => v != null); if (pts.length < 2) return '';
    const lo = Math.min(...pts), hi = Math.max(...pts), sp = hi - lo || 1, X = i => (i / (pts.length - 1) * (w - 4) + 2).toFixed(1), Y = v => (h - 3 - (v - lo) / sp * (h - 6)).toFixed(1);
    const last = pts[pts.length - 1], first = pts[0];
    return `<svg class="spark ${last >= first ? 'up' : 'dn'}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(lab)}: from ${first} to ${last}"><polyline points="${pts.map((v, i) => X(i) + ',' + Y(v)).join(' ')}"/><circle cx="${X(pts.length - 1)}" cy="${Y(last)}" r="2.4"/></svg>`; }
  function pollTable() {
    const ps = st.polls || [], cols = ['ALP', 'LNP', 'ONP', 'GRN'];
    return `<div class="pt-wrap"><table class="cmp-polls"><thead><tr><th scope="col">Poll</th>${cols.map(p => `<th scope="col" class="num" style="--c:${PC(p)}">${PN(p)}</th>`).join('')}<th scope="col" class="num">Your seats</th></tr></thead><tbody>
      ${ps.map(p => `<tr class="${p.internal ? 'int' : ''}"><th scope="row">${esc(p.n)}${p.note ? `<small>${esc(p.note)}</small>` : ''}</th>${cols.map(q => `<td class="num${q === st.party ? ' me' : ''}">${p.nat[q].toFixed(1)}</td>`).join('')}<td class="num me">${p.seats[st.party]}</td></tr>`).join('')}
      <tr class="avg"><th scope="row">Poll average<small>public polls only</small></th>${cols.map(q => `<td class="num${q === st.party ? ' me' : ''}">${st.poll.nat[q].toFixed(1)}</td>`).join('')}<td class="num me">${st.poll.seats[st.party]}</td></tr></tbody></table></div>`; }
  // ---- the election at a glance: hex grid, a two-ring chamber, vote bars with 2025 behind them, seats and change, and the two-party vote.
  // Columns are ordered by vote, biggest first, so the order changes as the campaign moves.
  const KEYS6 = ['ALP', 'LNP', 'GRN', 'ONP', 'IND', 'OTH'], ABBR = { ALP: 'ALP', LNP: 'L/NP', GRN: 'GRN', ONP: 'ON', IND: 'IND', OTH: 'OTH' };
  const LEANS = { ALP: 'Centre-left', LNP: 'Centre-right', GRN: 'Left', ONP: 'Populist right', IND: 'Independent', OTH: 'Various' };
  const ARC = ['ALP', 'GRN', 'IND', 'OTH', 'ONP', 'LNP'];   // left to right in the chamber
  let BASE25 = null;
  function base25() { if (BASE25) return BASE25; const v = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, IND: 0, OTH: 0 }, s25 = { ...v }, pr = APP.DATA.prim25 || [], la = APP.DATA.last || [];
    pr.forEach((x, g) => { v[E.keyOf(g)] += x * 100; }); la.forEach((x, g) => { s25[E.keyOf(g)] += x; });
    const est = tppEst(v); BASE25 = { v, s: s25, tpp: 55.2, off: 55.2 - est }; return BASE25; }
  // a two-party estimate from first preferences and the usual preference flows, calibrated so 2025 comes out at 55.2
  function tppEst(n) { const pf = (APP.BASE || {}).pf || {}, g = pf.grnAlp || 0.85, on = pf.onCoa || 0.7;
    const a = n.ALP + n.GRN * g + n.ONP * (1 - on) + n.IND * 0.6 + (n.OTH || 0) * 0.45, tot = n.ALP + n.LNP + n.GRN + n.ONP + n.IND + (n.OTH || 0); return a / tot * 100; }
  // the chamber as a gauge: tinted band with a solid outer stripe, quarter ticks, a needle on the majority line and the end parties named underneath
  function chamber(outer, inner, innerLab, opt) { opt = opt || {}; const W = 360, H = 222, cx = 180, cy = 182, f = v => v.toFixed(1);
    const pt = (r, a) => [cx + r * Math.cos(a), cy - r * Math.sin(a)];
    const band = (r0, r1, a0, a1) => { const p0 = pt(r1, a0), p1 = pt(r1, a1), p2 = pt(r0, a1), p3 = pt(r0, a0); return `M${f(p0[0])} ${f(p0[1])}A${r1} ${r1} 0 0 1 ${f(p1[0])} ${f(p1[1])}L${f(p2[0])} ${f(p2[1])}A${r0} ${r0} 0 0 0 ${f(p3[0])} ${f(p3[1])}Z`; };
    const totOf = x => ARC.reduce((a, p) => a + (x[p] || 0), 0) || 1, ang = (v, tot) => Math.PI * (1 - v / tot), lab = p => p === 'OTH' ? (opt.othName || 'Others') : PN(p);
    // each ring: a faded inner band for the previous result (greyed out), a solid outer stripe for this one
    const arcs = (x, r0, r1, cls, word) => { const tot = totOf(x); let a0 = Math.PI; return ARC.filter(p => x[p]).map(p => { const a1 = a0 - Math.PI * x[p] / tot;
      const g = `<path class="${cls}" style="--pc:${PC(p)}" d="${band(r0, r1, a0, a1)}"><title>${esc(lab(p))} ${x[p]}${word}</title></path>`; a0 = a1; return g; }).join(''); };
    const ring = (x, prev, r0, rs, r1) => arcs(prev || x, r0, rs, 'ch-was', prev ? ` (${opt.prevWord || 'before'})` : '') + arcs(x, rs, r1, 'ch-now', '');
    const ticks = (x, r0, r1, labels) => { const tot = totOf(x), maj = Math.floor(tot / 2) + 1; return [0, Math.round(tot / 4), maj, Math.round(tot * 3 / 4), tot].map(v => { const a = ang(v, tot), p0 = pt(r0, a), p1 = pt(r1, a), pl = pt(r1 + 12, a);
      return `<line class="ch-tk${v === maj ? ' maj' : ''}" x1="${f(p0[0])}" y1="${f(p0[1])}" x2="${f(p1[0])}" y2="${f(p1[1])}"/>${labels ? `<text class="ch-tl" x="${f(pl[0])}" y="${f(pl[1] + 3.5)}">${v}</text>` : ''}`; }).join(''); };
    const tot = totOf(outer), maj = Math.floor(tot / 2) + 1, na = ang(maj, tot), np = pt(152, na);
    const ends = ARC.filter(p => outer[p]), L = ends[0], R = ends[ends.length - 1];
    const endTxt = (p, x, anchor) => p ? `<text class="ch-end" x="${x}" y="${H - 4}" text-anchor="${anchor}" style="fill:${PC(p)}">${esc(lab(p))} ${outer[p]}</text>` : '';
    return `<svg class="gl-ch" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opt.name || 'Chamber')}: ${ARC.filter(p => outer[p]).map(p => lab(p) + ' ' + outer[p]).join(', ')}. ${maj} for a majority.">
      <path class="ch-track" d="${band(104, 150, Math.PI, 0)}"/>${ring(outer, opt.prev, 104, 130, 150)}${ticks(outer, 98, 154, true)}
      <g class="ch-needle"><line x1="${cx}" y1="${cy}" x2="${f(np[0])}" y2="${f(np[1])}"/></g>
      ${inner ? `<path class="ch-track" d="${band(46, 78, Math.PI, 0)}"/>${ring(inner, opt.prevIn, 46, 62, 78)}${ticks(inner, 42, 82, false)}` : ''}
      <circle class="ch-hub" cx="${cx}" cy="${cy}" r="7"/><text class="ch-in" x="${cx}" y="${cy + 24}">${inner ? esc(innerLab) : maj + ' to win'}</text>
      ${endTxt(L, 6, 'start')}${R !== L ? endTxt(R, W - 6, 'end') : ''}</svg>`; }
  // first preferences as a ledger: this election's bar, the 2025 vote as a striped bar under it, then the seats
  const LOGO = { ALP: 'alp', LNP: 'lnp', GRN: 'grn', ONP: 'onp' };
  function ledger(o, nat, b, cols, arw) { const top = Math.max(...cols.map(p => Math.max(nat[p] || 0, b.v[p] || 0)), 1) / 0.56;
    return `<div class="gl-ledger" role="table" aria-label="First preferences and seats by party"><div class="lg-h" role="row"><span role="columnheader">First preferences <i class="lg-k now"></i>2028 <i class="lg-k was"></i>2025</span><span role="columnheader">Seats</span></div>
      ${cols.map(p => { const v = nat[p] || 0, v0 = b.v[p] || 0, s0 = b.s[p] || 0, sn = o.seats[p] || 0, w = x => (x / top * 100).toFixed(1);
        return `<div class="lg-row${p === st.party ? ' me' : ''}" role="row" style="--pc:${PC(p)}"><span class="lg-tile${LOGO[p] ? ' logo' : ''}" role="cell">${LOGO[p] ? `<img src="assets/img/logos/${LOGO[p]}.png" alt="${esc(PN(p))}">` : ABBR[p]}</span>
          <span class="lg-track" role="cell" aria-label="${esc(PN(p))}: ${v.toFixed(1)}% (2025: ${v0.toFixed(1)}%)"><i class="now" style="width:${w(v)}%"></i><b class="lg-v num" style="left:${w(v)}%">${o.iron ? '~' + Math.round(v) : v.toFixed(1)}%<small>${arw(v - v0, 1)}</small></b><i class="was" style="width:${w(v0)}%"></i></span>
          <span class="lg-seats" role="cell">${sn >= 76 ? '<em title="Majority">Maj.</em>' : ''}<b class="num">${sn}</b><small>${arw(sn - s0, 0)}</small></span></div>`; }).join('')}</div>`; }
  function glance(o) { const b = base25(), nat = { ...o.nat }; nat.OTH = Math.max(0, 100 - KEYS6.slice(0, 5).reduce((a, p) => a + (nat[p] || 0), 0));
    const cols = KEYS6.filter(p => p !== 'OTH' || nat.OTH >= 1 || o.seats.OTH).sort((a, c) => (nat[c] || 0) - (nat[a] || 0));
    const arw = (d, k) => d > 0.05 ? `<i class="up">↗ ${Math.abs(d).toFixed(k)}</i>` : d < -0.05 ? `<i class="dn">↙ ${Math.abs(d).toFixed(k)}</i>` : '<i>=</i>';
    // on the final page the two-party figures come straight from the count, the same numbers as the sandbox's gauge
    const X = o.tpp, tpp = X ? X.ac : Math.max(0, Math.min(100, tppEst(nat) + b.off)), dt = tpp - b.tpp;
    return `<div class="glance${o.iron ? ' iron' : ''}">${o.map ? `<div class="gl-map">${o.map}</div>` : ''}
      <figure class="gl-chf">${chamber(o.seats, o.inner, o.innerLab, { name: 'The House', prev: b.s, prevIn: o.prevIn, prevWord: '2025' })}<figcaption>${esc(o.chamberCap)}</figcaption></figure>
      ${ledger(o, nat, b, cols, arw)}
      <div class="gl-tpps">${tppRow('Labor v Coalition', 'ALP', 'LNP', tpp, dt)}${X ? tppRow('Labor v One Nation', 'ALP', 'ONP', X.ao, null) + tppRow('Coalition v One Nation', 'LNP', 'ONP', X.co, null) : tppRow('Labor v One Nation', 'ALP', 'ONP', ...two(nat, b.v, ALPON)) + tppRow('Coalition v One Nation', 'LNP', 'ONP', ...two(nat, b.v, LNPON))}</div>
      <p class="cmp-note gl-note">Arrows compare with the 2025 election; the striped bar under each party is its 2025 vote. ${X ? 'Two-party figures are counted seat by seat from the result, the same way as the sandbox’s two-party gauge. Only Labor v Coalition has a 2025 figure to compare against.' : 'Two-party figures are estimates from first preferences and the usual preference flows.'}</p></div>`; }
  // the other two contests: who each party's voters would put ahead, as a share going to the first-named side
  const ALPON = { ALP: 1, GRN: 0.9, LNP: 0.3, ONP: 0, IND: 0.75, OTH: 0.5 }, LNPON = { LNP: 1, ALP: 0.85, GRN: 0.85, ONP: 0, IND: 0.8, OTH: 0.5 };
  function flow(n, F) { let a = 0, t = 0; for (const p of KEYS6) { const v = n[p] || 0; a += v * F[p]; t += v; } return t ? a / t * 100 : 50; }
  function two(n, n0, F) { const a = flow(n, F); return [a, a - flow(n0, F)]; }
  function tppRow(lab, A, B, a, d) { const arw = (x) => d == null ? '' : x > 0.05 ? `<i class="up">↗ ${Math.abs(x).toFixed(1)}</i>` : x < -0.05 ? `<i class="dn">↙ ${Math.abs(x).toFixed(1)}</i>` : '<i>=</i>';
    a = Math.max(0, Math.min(100, a));
    return `<div class="gl-tpp" role="img" aria-label="${lab}: ${PN(A)} ${a.toFixed(1)}%, ${PN(B)} ${(100 - a).toFixed(1)}%"><div class="kick">${lab}</div>
      <div class="gl-tpp-n"><span style="color:${PC(A)}"><b class="num">${a.toFixed(1)}%</b> ${arw(d)}</span><span style="color:${PC(B)}">${arw(-d)} <b class="num">${(100 - a).toFixed(1)}%</b></span></div>
      <div class="gl-tpp-bar"><i style="width:${a.toFixed(1)}%;background:${PC(A)}"></i><i style="width:${(100 - a).toFixed(1)}%;background:${PC(B)}"></i><b></b></div></div>`; }
  // seats to watch: three close seats with their own (noisy) local polls
  const PFULL = p => ({ ALP: 'Labor', LNP: 'the Coalition', ONP: 'One Nation', GRN: 'the Greens', IND: 'an independent' })[p] || p;
  function spotRow(x) { const v = x.v, s2 = v == null ? '' : `${v.toFixed(1)}–${(100 - v).toFixed(1)}`;
    const f = (x.h.find(y => y.v != null) || {}).v, d = v != null && f != null ? v - f : null;
    return `<li class="spot ${v == null ? 'out' : v >= 50 ? 'up' : 'dn'}"><span class="sp-name"><b>${esc(x.n)}</b><small>${x.st} · held by ${PFULL(x.inc)}${d != null && Math.abs(d) >= 0.1 ? ` · <span class="${d > 0 ? 'up' : 'dn'}">${sgn(d, 1)} since the start</span>` : ''}</small></span><span class="sp-v">${v == null ? '<small>Not in the top two</small>' : `<b class="num">${s2}</b><small>${v >= 50 ? 'You lead' : 'You trail'}</small>`}</span></li>`; }
  function spotFig(n) { if (!st.spot || !st.spot.length) return '';
    return `<section class="cmp-fig">${fig(n, 'Seats to watch', 'Local seat polls: your two-candidate share. Small samples, so allow five points either way.')}<ul class="cmp-spots">${st.spot.map(spotRow).join('')}</ul></section>`; }
  // ---- tips: what each part of the top bar means, on hover, focus or tap; and seat names on the map
  function tipText(k) {
    const L = E.ldrOf(st), g = E.ppGain(st), coa = st.party === 'LNP';
    const T = {
      bypoll: ['Your vote in the seat', st.by ? `Your two-candidate share in the ${st.by.seat} by-election poll. You started on ${st.by.m0.toFixed(1)}% and need more than 50% after preferences on polling day, after question 5. The reward is measured from your starting figure: every point of swing to you ${st.inc ? 'adds 3 Political Power for the campaign (up to 20)' : 'brings about 1.5 extra caucus votes to your leadership challenge (up to 12)'}. By-elections are local: they do not move your national vote.` : ''],
      pact: ['Coalition agreement', 'You lead the Coalition from the Nationals side, so the Liberal party room has to be kept on side too. City-friendly choices lift it; bush-first choices cost it (the reverse of Nationals goodwill). Under 25, Liberal MPs brief against you (unity −2 a turn) and run their own candidates in regional seats. At 75 or more, the Liberal machine adds 5 Political Power each week.'],
      bytrack: ['The by-election', 'Five questions in the seat, then the count. Lose and the run ends.'],
      role: [E.role(st), st.phase === 'BYELECTION' ? `You do not have a seat in the House. Win the ${st.by.seat} by-election first${st.inc ? ', then the campaign begins' : ', then challenge for the leadership: the bigger your swing from the seat’s starting figure, the more caucus votes you start with'}.` : st.phase === 'SPILL' && !st.spillWon ? 'You are challenging for the leadership. Five questions, then a party-room ballot after question 4: you need 50% of the caucus votes.'
        : st.party === 'ALP' ? 'Labor governs, so you act: your choices are government decisions. Your rivals can only promise.' : coa ? 'The Coalition is the Opposition: you can only promise, so government actions on shared cards read as promises.'
        : st.party === 'GRN' ? 'The Greens sit on the crossbench. You need inner-city seats, and in a hung parliament your support could decide who governs.' : st.party === 'IND' ? 'The teals are independents with no party machine. Every seat counts, and a hung parliament puts you in the room where it is decided.' : 'One Nation sits on the crossbench: you promise, and you can bargain your support.'],
      votes: ['Caucus votes', `Your share of the party room: ${Math.round(st.votes)}%. Deals with factions and the Nationals usually win the most votes, at a cost to unity. You need 50% at the ballot after question 4, or you go to the backbench. The spill does not move the polls while it runs; the change of leader reaches them once, when you win: a lift on 54% or more (bigger from 60%), a loss of votes if you scrape in on 53% or less.`],
      pp: ['Political Power', `The campaign’s currency. You earn ${g} a turn: 6 base, 1 more for every 20 points of unity, your leader’s bonus${st.unity >= 75 ? ', and 2 more for a united team' : ''}. Spend it on Campaign decisions below the card; some options cost it too. Decisions get weaker each time you reuse them.`],
      unity: ['Caucus unity', `How united your party room is, out of 100. It falls 1 a turn from campaign fatigue. At 75 or more, risky calls land more often, momentum gains get a bonus point and you earn 2 more Political Power. Under 40, leaks cost you votes and momentum every turn. Under 30, the leadership is questioned and you may face a snap vote. Under 20, the caucus revolts.`],
      mom: ['Momentum', `From −10 to +10. Each point adds (or takes) a little of your vote every turn, and momentum fades a point a turn as the news moves on. It also sets the odds on momentum checks. Hold 6 or more while gaining ground and your campaign becomes a wave; fall to −5 while losing and it goes into freefall.`],
      vote: ['Your vote in the polls', `Your first-preference vote in the public poll average: ${st.poll.nat[st.party].toFixed(1)}%, ${sgn(st.poll.nat[st.party] - st.pollNat0[st.party], 1)} since the first poll. The polls are out by a hidden amount, revealed only on election night.`],
      stamina: ['Stamina', `The leader’s energy, out of 100. It falls 3 a turn on a normal tour and 7 on a hard pace. Below 30, your leader may fluff a line on camera, costing votes and momentum. A rest day restores it.`],
      nats: ['Nationals goodwill', `Coalition only. It rises when your choices help rural seats more than the inner city, and falls the other way. Below 25, the Nationals run against the Liberals in regional seats and split your vote. Back above 45 and they make peace.`],
      base: ['Your base', 'How strong you are in the outer suburbs, the bush and the inner city. Hold 2 points of support or more in one of them for three turns running and that base offers you a bonus card.'],
      tour: ['This week’s tour', `You are touring ${(st.tour || []).join(' and ')}${st.tourHard ? ' at a hard pace' : ''}. Your state-level gains there count half again, and you build a little support each day. A hard pace adds a point of momentum a day but burns more stamina. You pick again each week.`],
      pre: ['Early voting', 'In the final week early voting is open, so each day’s news reaches fewer undecided voters: everything you do counts for less, by up to half on the last day. An early-voting drive (from turn 16) banks more of your own vote ahead of time, so later bad news hurts you less.'],
      internal: ['Internal polling', 'Your own polling, far more accurate than the public polls. It appears in Fig. 1 while it lasts.'],
      track: ['The campaign', `Turn ${Math.min(st.turn, st.T)} of ${st.T}: five weeks of five days. Diamonds are milestones, the big set pieces, and a rival answers each one. Each week ends with a weekend review and a new tour.`],
      spilltrack: ['The spill', 'Five questions. The ballot comes after question 4: you need 50% of the caucus votes to win the leadership.'],
      target: ['This week’s target', `${targetText(st.target)} Meet it by the end of the week for 10 Political Power and a point of momentum.`],
      ledger: ['The promise ledger', `Every spending promise adds to the bill: about $${Math.round(st.ledger.bn)} billion from ${st.ledger.n} promise${st.ledger.n === 1 ? '' : 's'} so far. Past $20 billion your rivals will come after your costings; past $35 billion without clean costings, the final days turn ugly.`],
      backflip: ['Backflips', `Taking the other side of an issue you have already taken a side on costs votes, momentum and unity. Your positions so far: ${Object.entries(st.stances).map(([k, v]) => (C.stanceNames[k] || k) + (v === '+' ? ' (for)' : ' (against)')).join(', ') || 'none yet'}.`]
    };
    return T[k];
  }
  const tipEl = document.createElement('div'); tipEl.className = 'cmp-tip'; tipEl.id = 'cmptip'; tipEl.setAttribute('role', 'tooltip'); tipEl.hidden = true; root.appendChild(tipEl);
  let tipFor = null;
  let tipAt = 0;
  function showTip(el, html) { tipFor = el; tipAt = Date.now(); tipEl.innerHTML = html; tipEl.hidden = false;
    const r = el.getBoundingClientRect(), w = Math.min(320, window.innerWidth - 16); tipEl.style.maxWidth = w + 'px';
    const tw = tipEl.offsetWidth, th = tipEl.offsetHeight; let x = r.left + r.width / 2 - tw / 2; x = Math.max(8, Math.min(window.innerWidth - tw - 8, x));
    let y = r.bottom + 8; if (y + th > window.innerHeight - 8) y = Math.max(8, r.top - th - 8); tipEl.style.left = x + 'px'; tipEl.style.top = y + 'px'; }
  function hideTip() { tipFor = null; tipEl.hidden = true; }
  // the election-night map is the sandbox's: label its seats with what the count has shown so far, never the final result early
  function liveLab(i) { const s = APP.D.seats[i], LK = st && st.result && st.result.likely; if (!s) return '';
    const live = APP.replay && APP.replay.active(), done = live ? APP.replay.done() : null, lead = live ? APP.replay.lead() : null; let txt = 'Not counted yet';
    if (LK && (!live || (done && done.has(i)))) { const g = LK[i], w = E.keyOf(g); txt = `<span class="lt-w" style="--pc:var(--${APP.P[g].k})">${esc(APP.P[g].n)} ${s.inc === w ? 'hold' : 'gain from ' + esc(PN(s.inc))}</span>`; }
    else if (lead && lead.has(i)) { const g = lead.get(i); txt = `${esc(APP.P[g].n)} ahead · still counting`; }
    return `<b>${esc(s.n)} <small>${s.st}</small></b>${txt}`; }
  const tipHTML = el => { if (el.classList && el.classList.contains('cell') && el.dataset.i != null) return liveLab(+el.dataset.i); const k = el.dataset.tip; if (k) { const t = st && tipText(k); return t ? `<b>${esc(t[0])}</b>${esc(t[1])}` : ''; } const p = seatOf(el); return p ? p.dataset.lab || '' : ''; };
  const seatOf = el => { if (!el) return null; if (el.classList && el.classList.contains('cc')) return el; if (el.tagName === 'use') { const id = (el.getAttribute('href') || '').slice(1); return id ? MAPEL && MAPEL.querySelector('#' + id) : null; } return null; };
  const tipTarget = t => t && t.closest ? (t.closest('[data-tip]') || (t.closest('.cmp-geo') && (t.closest('use') || t.closest('.cc'))) || (t.closest('#cmpmapslot') && t.classList && t.classList.contains('cell') ? t : null)) : null;
  root.addEventListener('pointerover', e => { if (e.pointerType === 'touch') return; const t = tipTarget(e.target); if (t && t !== tipFor) { const h = tipHTML(t); if (h) showTip(t, h); } else if (!t && tipFor) hideTip(); });
  root.addEventListener('pointerleave', hideTip);
  root.addEventListener('focusin', e => { const t = e.target.closest && e.target.closest('[data-tip]'); if (t) { const h = tipHTML(t); if (h) showTip(t, h); } else hideTip(); });
  root.addEventListener('click', e => { const t = tipTarget(e.target); if (!t) { if (tipFor && !tipEl.contains(e.target)) hideTip(); return; } if (tipFor === t && e.pointerType !== 'mouse' && Date.now() - tipAt > 400) { hideTip(); return; } const h = tipHTML(t); if (h) showTip(t, h); }, true);
  root.addEventListener('scroll', hideTip, { passive: true }); window.addEventListener('resize', hideTip);
  const targetText = t => !t ? 'No target this week.' : C.targets[t.k].replace('{v}', t.k === 'vote' ? t.v.toFixed(1) : t.v);
  // the change since the last turn, as a small arrow
  function trend(k) { const H = st.hist || []; if (H.length < 2) return ''; const a = H[H.length - 2][k], b = H[H.length - 1][k]; if (a == null || b == null || a === b) return '';
    return `<i class="trend ${b > a ? 'up' : 'dn'}" aria-label="${b > a ? 'up' : 'down'} since last turn">${b > a ? '▲' : '▼'}</i>`; }
  function hud() {
    const L = E.ldrOf(st), by = st.phase === 'BYELECTION', sp = st.phase === 'SPILL' || by, wk = st.T / 5, iron = !!st.iron;
    const when = by ? `By-election · question ${st.turn} of 5` : sp ? `Spill · question ${st.turn} of 5` : `Week ${Math.min(5, Math.ceil(st.turn / wk))} of 5`, wide = window.innerWidth > 860;
    const lab = (full, short) => `<small><span class="lf">${full}</span><span class="ls" aria-hidden="true">${short}</span></small>`;
    const mom = Math.max(-10, Math.min(10, st.mom));
    return `<div class="cmp-hud" style="--pc:${PC(st.party)}"><h2 id="cmp-title" class="sr" tabindex="-1">Campaign mode</h2>
      <div class="hud-who">${photo(L.name, 'hud-ph')}<span class="hw-t" data-tip="role" tabindex="0" aria-describedby="cmptip"><small class="kick">${E.role(st)} · ${when}</small><b>${esc(L.name)}</b></span>
        <span class="hud-btns"><button type="button" class="hb" data-a="close" aria-label="Close campaign mode (your run is saved)">${ICON('close')}</button></span></div>
      <div class="hud-stats">${by ? `<span class="hs" data-tip="bypoll" tabindex="0" aria-describedby="cmptip">${SX('votes', 'hud')}${lab('Your vote in ' + esc(st.by.seat), 'Seat')}<b class="num ${st.by.m >= 50 ? 'good' : 'warn'}">${st.by.m.toFixed(1)}%</b><i class="meter" role="meter" aria-label="Your two-candidate vote in the seat" aria-valuemin="30" aria-valuemax="70" aria-valuenow="${st.by.m}"><i style="width:${Math.max(0, Math.min(100, (st.by.m - 30) * 2.5))}%"></i><i class="tick" style="left:50%"></i></i></span>` : sp ? `<span class="hs" data-tip="votes" tabindex="0" aria-describedby="cmptip">${SX('votes', 'hud')}${lab('Caucus votes', 'Votes')}<b class="num ${st.votes >= 50 ? 'good' : 'warn'}">${Math.round(st.votes)}%</b><i class="meter" role="meter" aria-label="Caucus votes" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(st.votes)}"><i style="width:${st.votes}%"></i><i class="tick" style="left:50%"></i></i></span>`
        : `<span class="hs" data-tip="pp" tabindex="0" aria-describedby="cmptip">${SX('pp', 'hud')}${lab('Political Power', 'Power')}<b class="num">${st.pp}${trend('pp')}</b><em>+${E.ppGain(st)} a turn</em></span>`}
        <span class="hs" data-tip="unity" tabindex="0" aria-describedby="cmptip">${SX('unity', 'hud')}${lab('Caucus unity', 'Unity')}<b class="num ${st.unity < 20 ? 'crit' : st.unity < 40 ? 'warn' : st.unity >= 75 ? 'good' : ''}">${Math.round(st.unity)}${sp ? '' : trend('u')}</b><i class="meter u" role="meter" aria-label="Caucus unity" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(st.unity)}"><i style="width:${st.unity}%"></i><i class="tick" style="left:20%"></i><i class="tick" style="left:40%"></i><i class="tick" style="left:75%"></i></i></span>
        <span class="hs" data-tip="mom" tabindex="0" aria-describedby="cmptip">${SX('mom', 'hud')}${lab('Momentum', 'Mtm.')}<b class="num ${st.mom > 0 ? 'good' : st.mom < 0 ? 'warn' : ''}">${sgn(st.mom, 0)}${sp ? '' : trend('m')}</b><i class="meter mom" role="meter" aria-label="Momentum" aria-valuemin="-10" aria-valuemax="10" aria-valuenow="${mom}"><i style="left:${mom < 0 ? 50 + mom * 5 : 50}%;width:${Math.abs(mom) * 5}%" class="${mom < 0 ? 'neg' : ''}"></i><i class="tick" style="left:50%"></i></i></span>
        <span class="hs vote" data-tip="vote" tabindex="0" aria-describedby="cmptip">${SX('poll', 'hud')}${lab('Your vote', 'Vote')}${(() => { const v = st.poll.nat[st.party], H = st.hist || [], f = H.length > 1 ? H[H.length - 2].v : v;
          return iron ? `<b class="num">~${Math.round(v)}%</b><em>Ironman: rough polls only</em>` : `<b class="num"><span class="anim" data-from="${f.toFixed(1)}" data-to="${v.toFixed(1)}">${v.toFixed(1)}</span>%${trend('v')}</b><em class="${v >= st.pollNat0[st.party] ? 'up' : 'dn'}">${sgn(v - st.pollNat0[st.party], 1)} since the first poll</em>`; })()}</span></div>
      ${sp ? '' : `<details class="hud-more"${wide ? ' open' : ''}><summary>Stamina ${Math.round(st.stamina)}${st.nats != null ? ` · Nationals ${Math.round(st.nats)}` : ''}${st.pact != null ? ` · Coalition agreement ${Math.round(st.pact)}` : ''}${st.tour && st.tour.length ? ` · touring ${st.tour.join(', ')}` : ''}</summary><div class="hud-sub"><span class="hm" data-tip="stamina" tabindex="0" aria-describedby="cmptip">${SX('sta', 'sub')}<small>Stamina</small><i class="meter st" role="meter" aria-label="Stamina" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(st.stamina)}"><i style="width:${st.stamina}%" class="${st.stamina < 30 ? 'neg' : ''}"></i></i><b class="num">${Math.round(st.stamina)}</b></span>
        ${st.pact != null ? `<span class="hm" data-tip="pact" tabindex="0" aria-describedby="cmptip">${SX('pact', 'sub')}<small>Coalition agreement</small><i class="meter nt" role="meter" aria-label="Coalition agreement" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(st.pact)}"><i style="width:${st.pact}%" class="${st.pact < 25 ? 'neg' : ''}"></i><i class="tick" style="left:25%"></i></i><b class="num">${Math.round(st.pact)}</b></span>` : ''}
        ${st.nats != null ? `<span class="hm" data-tip="nats" tabindex="0" aria-describedby="cmptip">${SX('pact', 'sub')}<small>Nationals goodwill</small><i class="meter nt" role="meter" aria-label="Nationals goodwill" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(st.nats)}"><i style="width:${st.nats}%" class="${st.nats < 25 ? 'neg' : ''}"></i><i class="tick" style="left:25%"></i></i><b class="num">${Math.round(st.nats)}</b></span>` : ''}
        <span class="hm base" data-tip="base" tabindex="0" aria-describedby="cmptip">${SX('base', 'sub')}<small>Your base</small>${['OUT', 'RUR', 'IN'].map(k => { const v = (st.base || {})[k] || 0; const won = (st.flags || []).includes('BASE_' + k), n = won ? 2 : Math.max(0, Math.min(2, Math.floor(v + 1e-9))); return `<span class="bm${won ? ' won' : ''}" title="${{ OUT: 'Outer suburbs', RUR: 'Rural', IN: 'Inner city' }[k]}: ${v.toFixed(1)} of 2 points. Hold 2 for three turns to unlock a bonus"><u>${{ OUT: 'Suburbs', RUR: 'Bush', IN: 'City' }[k]}</u><span class="pips">${won ? '✓' : [0, 1].map(j => `<i class="${j < n ? 'on' : ''}"></i>`).join('')}</span></span>`; }).join('')}</span>
        ${st.tour && st.tour.length ? `<span class="hm tour" data-tip="tour" tabindex="0" aria-describedby="cmptip">${SX('tour', 'sub')}<small>Touring${st.tourHard ? ' hard' : ''}</small><b>${st.tour.join(' · ')}</b></span>` : ''}
        ${E.banked(st) ? `<span class="hm pre" data-tip="pre" tabindex="0" aria-describedby="cmptip">${SX('votes', 'sub')}<small>Pre-poll open</small><b class="num">${Math.round(E.banked(st) * 100)}% of votes cast</b></span>` : ''}${st.bank ? `<span class="hm pre" data-tip="pre" tabindex="0" aria-describedby="cmptip">${SX('votes', 'sub')}<small>Your vote banked early</small><b class="num">${Math.round(st.bank * 100)}%</b></span>` : ''}
        ${st.internal >= st.turn ? `<span class="hm" data-tip="internal" tabindex="0" aria-describedby="cmptip"><small>Internal polling</small><b>${st.internal - st.turn + 1} turn${st.internal - st.turn ? 's' : ''} left</b></span>` : ''}
        ${targetStrip()}<span class="hm ledger" data-tip="ledger" tabindex="0" aria-describedby="cmptip">${SX('prom', 'sub')}<small>Promises</small><b class="num">${st.ledger.n} · $${Math.round(st.ledger.bn)}bn</b></span>
        ${Object.keys(st.stances).length ? `<span class="hm flips" data-tip="backflip" tabindex="0" aria-describedby="cmptip">${SX('pos', 'sub')}<small>Positions taken</small><b class="num">${Object.keys(st.stances).length}${st.backflips ? ` · ${st.backflips} backflip${st.backflips > 1 ? 's' : ''}` : ''}</b></span>` : ''}</div></details>`}
      ${track()}</div>`;
  }
  // this week's target as a strip under the turn track, with how close you are
  function targetStrip() { const t = st.target; if (!t) return '';
    const cur = t.k === 'seats' ? st.poll.seats[st.party] : t.k === 'vote' ? +st.poll.nat[st.party].toFixed(1) : t.k === 'mom' ? st.mom : Math.round(st.unity);
    const span = { seats: 6, vote: 2, mom: 6, unity: 25 }[t.k], f = Math.max(0, Math.min(1, (cur - (t.v - span)) / span)), ok = cur >= t.v, fmt = v => t.k === 'vote' ? (+v).toFixed(1) + '%' : t.k === 'mom' ? sgn(v, 0) : v;
    const goal = t.k === 'seats' ? `${t.v}+ seats` : t.k === 'vote' ? `${t.v.toFixed(1)}% vote` : t.k === 'mom' ? `momentum ${sgn(t.v, 0)}` : `unity ${t.v}+`;
    return `<span class="hm tgt-pill${ok ? ' ok' : ''}" data-tip="target" tabindex="0" aria-describedby="cmptip">${SX('tgt', 'sub')}<small>Target</small><b>${goal}</b><span class="tgt-bar" role="meter" aria-label="Progress to this week's target" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(f * 100)}"><i style="width:${Math.round(f * 100)}%"></i></span><em>${ok ? 'On track ✓' : 'now ' + fmt(cur)}</em></span>`; }
  function chips(fx) {
    return fx.length ? `<ul class="cmp-fx">${fx.map(([l, v, good, k]) => `<li class="${good == null && k === 'sp' ? 'nil' : good ? 'good' : 'bad'}">${good == null && k === 'sp' ? TM(0) : TM(good ? 1 : -1)}${k === 'sp' || k === 'sh' || k === 'nb' ? kw(esc(l)) + (k === 'sh' ? ` (${v} turns)` : k === 'nb' ? ' +' + v : '') : `${kw(esc(l))} <b>${k === 'v' ? sgn(+v.toFixed(2), 2) : k === 'pf' ? sgn(v) + ' pts' : sgn(v)}</b>`}</li>`).join('')}</ul>` : '';
  }

  // ---- the campaign log: every turn, decision and its tone, with your poll seats and Political Power over time
  function campaignLog() {
    const L = (st.log || []).filter(e => e.phase === 'CAMPAIGN' || e.dec); if (!L.length) return '';
    return `<details class="cmp-log"><summary><span>Campaign log</span><small>${L.length} entries</small></summary>
      ${(() => { const H = st.hist || [], a = H[0], z = H[H.length - 1]; if (!a || !z) return ''; const ups = L.filter(e => e.tone === 'up').length, dns = L.filter(e => e.tone === 'dn').length;
        const cell = (t, x, y) => `<span><small>${t}</small><b class="num">${x} → ${y}</b><em class="${y > x ? 'up' : y < x ? 'dn' : ''}">${sgn(y - x, 0)}</em></span>`;
        return `<div class="log-stats">${st.iron ? '' : cell('Your seats in the polls', a.s, z.s)}${cell('Political Power', a.pp, st.pp)}<span><small>Good turns · bad turns</small><b class="num"><i class="up">${ups}</i> · <i class="dn">${dns}</i></b></span></div>`; })()}
      <ol class="log-list">${L.slice().reverse().map(e => `<li class="t-${e.tone || 'flat'}"><span class="lg-t">${e.dec ? 'Decision' : e.interrupt ? 'Extra' : 'Turn ' + e.turn}</span><b>${esc(e.t)}</b>${e.opt ? `<small>${esc(e.opt)}</small>` : ''}${st.iron ? '' : `<em class="num">${e.pd > 0 ? '+' + e.pd : e.pd < 0 ? '−' + Math.abs(e.pd) : '±0'}</em>`}</li>`).join('')}</ol></details>`; }
  // why the seat count moved, in parts that add up to the change
  function whyBox(w) { const rows = [['Your choice', w.choice], ['Rivals answering back', w.back], ['The rest of the day’s news', w.news], ['The polls themselves', w.polls]].filter(([, v]) => v != null);
    const n = v => v > 0 ? '+' + v : v < 0 ? '−' + Math.abs(v) : '±0';
    return `<details class="clip-why"><summary>Why did that happen?</summary><ul>${rows.map(([t, v]) => `<li class="${v > 0 ? 'up' : v < 0 ? 'dn' : ''}"><span>${t}</span><b class="num">${n(v)}</b></li>`).join('')}</ul>
      <p class="cmp-note">In seats. “The rest of the day’s news” is momentum, the national mood, your tour and anything that happened on its own. “The polls themselves” is the difference between the real shift and what this turn’s pollsters measured.</p></details>`; }
  // ---- the campaign desk
  function vGame() {
    const L = E.ldrOf(st);
    let main;
    if (fb) {
      const flips = fb.flips || [], N = APP.NATI, mine = g => C.PARTIES[st.party].g.includes(g) || (st.party === 'LNP' && g === N);
      const gain = flips.filter(f => mine(f[2])).length, loss = flips.filter(f => mine(f[1])).length;
      const wk = st.T / 5, tt = fb.turn, day = fb.phase === 'BYELECTION' ? `By-election · question ${tt} result` : fb.phase === 'SPILL' ? `Spill · question ${tt} result` : `Week ${Math.min(5, Math.ceil(tt / wk))} · day ${((tt - 1) % wk) + 1}`;
      main = `<article class="cmp-clip t-${fb.tone || 'flat'}"><div class="clip-in"><span class="tone-glyph" aria-hidden="true"><i></i><i></i><i></i></span><span class="sr">${fb.tone === 'up' ? 'A good turn.' : fb.tone === 'dn' ? 'A bad turn.' : 'A neutral turn.'}</span><div class="clip-mast"><span class="xyzlogo">XYZ News</span><span class="clip-date">${fb.dec ? 'Campaign decision' : fb.interrupt ? 'Off the clock' : day}</span>${fb.deb ? `<span class="stamp ${fb.deb.win ? 'ok' : 'no'}">${fb.deb.win ? 'Won the exchange' : 'Lost the exchange'}</span>` : fb.ok === true ? '<span class="stamp ok">It landed</span>' : fb.ok === false ? '<span class="stamp no">It backfired</span>' : ''}${fb.backflip ? '<span class="stamp no">Backflip</span>' : ''}${fb.door === 'timeout' ? '<span class="stamp no">Walked away</span>' : ''}</div>
        <h3 class="clip-hl" tabindex="-1">${esc(fb.dec ? fb.t : (fb.h || fb.t))}</h3>
        ${fb.opt ? `<p class="clip-you"><span class="kick">You chose</span> ${esc(fb.opt)}</p>` : ''}
        ${fb.deb ? `<p class="clip-deb">You ${C.debate.styleN[fb.deb.mine]}; ${esc(surname((E.incOf(fb.deb.rival) || { name: 'your rival' }).name))} ${C.debate.styleN[fb.deb.theirs]}.${fb.deb.mine === fb.deb.theirs ? ' Same approach, so it came down to debate skill.' : ''}</p>` : ''}${chips(fb.fx || [])}
        ${fb.rival ? `<p class="clip-rival"><span class="kick">Meanwhile</span> ${fb.rival.x ? `${esc(fb.rival.who)} chose: ${esc(fb.rival.x)}` : esc(fb.rival.t)} <b style="color:${PC(fb.rival.p)}">${PN(fb.rival.p)} ${sgn(fb.rival.amt, 2)}</b></p>` : ''}
        ${fb.endorse ? `<p class="clip-end"><span class="kick">Endorsed</span> ${fb.endorse.map(esc).join(' · ')}</p>` : ''}
        ${fb.promise ? `<p class="clip-dim">A spending promise: about $${fb.promise} billion. The ledger now stands at about $${Math.round(st.ledger.bn)} billion.</p>` : ''}
        ${fb.eff && fb.eff < 1 ? `<p class="clip-dim">Used before, so it works ${Math.round(fb.eff * 100)}% as well this time.</p>` : ''}
        ${fb.by && fb.by.res != null ? byTab(fb.by) : ''}
        ${fb.banked ? `<p class="clip-dim">About ${fb.banked}% of your vote was already banked at pre-poll, so the damage was smaller than it would have been.</p>` : ''}
        ${(fb.notes || []).length ? `<ul class="cmp-notes">${fb.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>` : ''}
        <div class="clip-flips">${(() => { if (fb.phase === 'BYELECTION') { const m = fb.by && fb.by.res != null ? fb.by.res : fb.bym; return m == null ? '' : `<p class="pd ${m >= 50 ? 'up' : 'dn'}"><b class="num">${m.toFixed(1)}%</b> ${fb.by && fb.by.res != null ? 'Your final two-candidate vote in ' : 'Your two-candidate vote in the latest poll of '}${esc(st.by.seat)}</p>`; }
          const d = fb.pd || 0, n = Math.abs(d), w = n === 1 ? 'seat' : 'seats';
          if (st.iron) return d > 0 ? '<p class="pd up"><b class="num">▲</b> The polls moved your way</p>' : d < 0 ? '<p class="pd dn"><b class="num">▼</b> The polls moved against you</p>' : '<p class="pd"><b class="num">–</b> No clear change in the polls</p>';
          return d > 0 ? `<p class="pd up"><b class="num">+${n}</b> You gain ${n} ${w} in the latest poll</p>` : d < 0 ? `<p class="pd dn"><b class="num">−${n}</b> ${n} ${w} swing${n === 1 ? 's' : ''} away from you in the latest poll</p>` : '<p class="pd"><b class="num">±0</b> No change in your seat count in the latest poll</p>'; })()}
          ${fb.why && !st.iron ? whyBox(fb.why) : ''}</div>
        <button type="button" class="cmp-go" data-a="next">${st.phase === 'FAILED' ? 'See what happened' : st.phase === 'ELECTION' ? 'On to election night' : fb.dec ? 'Back to the campaign' : 'Next turn'} <span class="go-ar" aria-hidden="true">→</span></button></div></article>`;
    } else {
      const c = E.cardFor(st), tag = c.tag, shown = c.opts.filter(o => !o.timeout), mt = E.milestoneTurns(st.T);
      const tom = st.phase === 'CAMPAIGN' && !c.door && !/^DEB/.test(c.id) && st.miles[st.turn + 1] ? (st.turn + 1 === mt[3] ? 'The leaders’ debate' : (E.cardFor({ ...st, cur: st.miles[st.turn + 1], queue: [] }) || {}).t) : null;
      const kick = c.k || (st.phase === 'SPILL' ? (c.ballot ? 'The ballot · you need 50%' : 'Leadership spill') : c.mile ? 'Campaign milestone' : c.req ? 'Consequences' : c.party ? C.PARTIES[c.party].n + ' only' : 'On the trail');
      main = `${tom ? `<p class="cmp-tomorrow"><span class="kick">Tomorrow</span> <b>${esc(tom)}</b> <small>a milestone day</small></p>` : ''}${(() => { evc = evKind(c, tag); return ''; })()}<article class="cmp-card ev${c.mile ? ' mile' : ''}${c.ballot ? ' ballot' : ''}${c.door ? ' door' : ''}${c.deb ? ' deb' : ''}" style="--ec:${evc.col}"><div class="ev-in"><header class="ev-hd"><span class="ev-ico" aria-hidden="true"><svg viewBox="0 0 24 24">${evc.ic}</svg></span><div class="ev-ht"><div class="kick"><span class="rolep">${esc(c.role)}</span>${kick}<span class="ev-iss">${esc(evc.n)}</span></div>
        <h3 tabindex="-1">${esc(c.t)}</h3></div></header>${c.deb && st.deb ? debStage(c.deb) : ''}<p class="q">${esc(c.q || 'Where do you stand?')}</p>${c.door && prefs.timers ? `<div class="door-timer" role="timer" aria-label="Time to answer"><span class="dt-ring"><svg viewBox="0 0 40 40" aria-hidden="true"><circle class="dt-bg" cx="20" cy="20" r="17"/><circle class="dt-arc" cx="20" cy="20" r="17"/></svg><b id="doorsec">10</b></span><span class="dt-lab">seconds to answer, or you walk away</span><button type="button" class="cmp-link" data-a="notimer">Turn off timers</button></div>` : ''}<div class="cmp-opts">${shown.map((o, k) => {
          const pr = o.rng ? E.chance(st, o.rng, o.tag || tag) : null, dis = o.cost && st.pp < o.cost;
          return `<button type="button" class="cmp-opt${o.only ? ' special' : ''}" data-opt="${o.i}" aria-keyshortcuts="${LET[k]} ${k + 1}"${dis ? ' disabled' : ''}><span class="ol">${LET[k]}</span><span class="ot">${esc(o.x)}${pr != null ? `<em class="oddsx odds ${pr >= 0.6 ? 'hi' : pr >= 0.4 ? 'mid' : 'lo'}"><span class="og" aria-hidden="true"><i style="width:${Math.round(pr * 100)}%"></i></span>${Math.round(pr * 100)}% chance it lands · on ${o.rng.k === 'd' ? 'debate skill' : o.rng.k === 'u' ? `${SX('unity', 'in')}caucus unity` : `${SX('mom', 'in')}momentum`}</em>` : ''}${o.cost ? `<em class="oddsx">Costs ${SX('pp', 'in')}${o.cost} Political Power</em>` : ''}${o.only ? `<em class="oddsx">Only ${esc(surname(L.name))} would say this</em>` : ''}</span></button>`; }).join('')}</div><footer class="ev-ft"><span>${st.phase === 'SPILL' ? `Spill · question ${st.turn} of 5` : st.phase === 'BYELECTION' ? `By-election · question ${st.turn} of 5` : `Week ${Math.min(5, Math.ceil(st.turn / (st.T / 5)))} · day ${((st.turn - 1) % (st.T / 5)) + 1}`}</span><span class="cmp-keys" aria-hidden="true">Keys <kbd>A</kbd>–<kbd>${LET[shown.length - 1]}</kbd></span><span>${st.phase === 'CAMPAIGN' ? `Turn ${String(st.turn).padStart(2, '0')}/${st.T}` : ''}</span></footer></div></article>`;
    }
    const decs = st.phase === 'CAMPAIGN' && !fb ? E.decisionsFor(st) : null;
    return `<div class="cmp-game">${hud()}
      <div class="cmp-grid"><div class="cmp-left">${main}
        ${decs ? `<details class="cmp-decs"><summary><span>Campaign decisions</span>${decs.filter(d => d.can).length ? `<b class="dec-n">${decs.filter(d => d.can).length} affordable</b>` : ''}<small>${st.pp} Political Power to spend</small></summary><div class="dec-list">${decs.map(d => `<button type="button" class="cmp-dec" data-dec="${d.id}"${d.can ? '' : ' disabled'}><span class="dc-top"><b>${esc(d.n)}</b><em class="num dc-cost">${SX('pp')}${d.cost}</em></span><span>${kw(esc(d.d))}</span><small class="dc-st">${d.left <= 0 ? 'Used up' : d.wait ? `Ready in ${d.wait} turn${d.wait > 1 ? 's' : ''}` : `${d.left} use${d.left > 1 ? 's' : ''} left`}${d.eff < 1 && d.left > 0 ? ` · ${Math.round(d.eff * 100)}% strength` : ''}</small></button>`).join('')}</div></details>` : ''}
        ${campaignLog()}
        ${runPanel(L)}
      </div><aside class="cmp-right" data-rt="${rtab()}">
        ${st.iron ? `<section class="cmp-fig">${fig(1, 'The polls, roughly', 'Ironman: no pollster table, no seat map, no exact numbers.')}${ironPoll()}</section>
        <section class="cmp-fig">${fig(2, 'The national mood', 'Signs show what each mood does for your side. Tap one for its effect.')}${spiritRows()}</section>`
        : `${st.phase === 'SPILL' ? caucusFig() : ''}<section class="cmp-fig rt-head">${fig(st.phase === 'SPILL' ? 2 : 1, 'The latest polls, as seats', 'Each pollster leans a little; the real result is counted on election night.')}${seatbar(st.poll.seats, st.poll0)}</section>
        <div class="rt-tabs" role="tablist" aria-label="Campaign data">${RTABS.map(([k, n]) => `<button type="button" role="tab" class="rt-tab${rtab() === k ? ' on' : ''}" data-rt="${k}" aria-selected="${rtab() === k}">${n}</button>`).join('')}</div>
        <section class="cmp-fig rt-p rt-glance">${glance({ seats: st.poll.seats, nat: st.poll.nat, central: st.poll.central, inner: null, innerLab: '', chamberCap: 'Solid: seats in the poll. Faded: the 2025 result.', map: '<div id="cmpmapslot"></div>' })}<p class="cmp-note rt-mapnote">Tap or hover over a seat for its name; seats that changed hands this turn flash.</p></section>
        <section class="cmp-fig rt-p rt-polls">${pollTable()}</section>
        <div class="rt-p rt-trail">${spotFig(0)}<section class="cmp-fig">${fig(0, 'The national mood', 'Signs show what each mood does for your side. Tap one for its effect.')}${spiritRows()}</section></div>`}
      </aside></div></div>`;
  }
  // event cards: each issue has its own frame colour and icon; doorstops, debates, milestones and the party room have theirs
  let evc = null;
  const EVI = { mic: '<path class="k" d="M12 4.5a2.5 2.5 0 0 1 2.5 2.5v5a2.5 2.5 0 0 1-5 0V7A2.5 2.5 0 0 1 12 4.5zM7 11.5a5 5 0 0 0 10 0M12 16.5v3M9 19.5h6"/>', warn: '<path class="k" d="M12 4.5l8 14H4zM12 10v4M12 16.4v.2"/>',
    globe: '<circle class="k" cx="12" cy="12" r="7.5"/><path class="k" d="M4.5 12h15M12 4.5c2.6 2.6 2.6 12.4 0 15M12 4.5c-2.6 2.6-2.6 12.4 0 15"/>', star: '<path class="k" d="M12 4.5l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z"/>',
    ballot: '<path class="k" d="M5 11.5h14v8H5zM8.5 11.5V5h7v6.5M10 8.3l1.3 1.2 2.4-2.6"/>', people: '<circle class="k" cx="9" cy="8.5" r="2.3"/><circle class="k" cx="15.5" cy="9" r="2"/><path class="k" d="M4.5 18.5c0-3 2-5 4.5-5s4.5 2 4.5 5M13 14c2.6-.6 5.5 1.2 5.5 4.5"/>',
    pin: '<path class="k" d="M12 20s-5.5-5.3-5.5-9.5a5.5 5.5 0 0 1 11 0C17.5 14.7 12 20 12 20z"/><circle class="k" cx="12" cy="10.5" r="2"/>', bars: '<path class="k" d="M5 19.5h14M7 17.5v-5M11 17.5v-9M15 17.5v-6M19 17.5V6"/>',
    podium: '<path class="k" d="M6 19.5h12M8 19.5v-7h8v7M10 12.5V9h4v3.5M12 9V5.5"/><circle class="k" cx="12" cy="5" r="1"/>' };
  function evKind(c, tag) { const SI = C.spiritIcon || {};
    const T = { COST_OF_LIVING: ['Cost of living', '#d0622c', SI.RBA], HOUSING: ['Housing', '#7a5aa8', SI.HOUSING], ENERGY: ['Energy', '#c08a12', SI.GRID], HEALTH: ['Health', '#1f8a7a', SI.MEDICARE], ECONOMY: ['Economy', '#2f6ea8', EVI.bars],
      TAX: ['Tax', '#5c7a2f', SI.TAX], NATIONAL_SECURITY: ['Defence', '#33456b', SI.AUKUS], MIGRATION: ['Migration', '#8a5a2f', EVI.globe], CRISIS: ['Crisis', '#b02a30', EVI.warn], PREFS: ['Preferences', '#3f8a3a', EVI.ballot], IR: ['Workplace', '#6a6458', EVI.people] };
    if (c.deb) return { n: 'The debate', col: '#2c2c2a', ic: EVI.podium }; if (c.door) return { n: 'Doorstop', col: '#b02a30', ic: EVI.mic };
    if (st.phase === 'SPILL' || c.ballot) return { n: 'Party room', col: PC(st.party), ic: EVI.ballot }; if (st.phase === 'BYELECTION') return { n: 'By-election', col: PC(st.party), ic: EVI.pin };
    const t = T[tag]; if (c.mile) return { n: t ? t[0] : 'Milestone', col: '#9a7414', ic: EVI.star };
    return t ? { n: t[0], col: t[1], ic: t[2] || EVI.pin } : { n: 'On the trail', col: PC(st.party), ic: EVI.pin }; }
  // the leaders' debate: the two of you face off, with the three exchanges as dots
  function debStage(n) { const L = E.ldrOf(st), R = E.incOf(st.deb.rival), res = (st.log || []).filter(e => e.deb).map(e => e.deb.win);
    const side = (nm, p, cls) => `<span class="ds-side ${cls}" style="--pc:${PC(p)}">${photo(nm, 'ds-ph')}<b>${esc(nm)}</b><small>${esc(PN(p))}</small></span>`;
    return `<div class="deb-stage">${side(L.name, st.party, 'me')}<span class="ds-mid"><em>vs</em><span class="ds-dots" aria-label="Exchanges won: ${res.filter(Boolean).length} of ${res.length}">${[0, 1, 2].map(i => `<i class="${i < res.length ? (res[i] ? 'w' : 'l') : i === n - 1 ? 'now' : ''}"></i>`).join('')}</span><small>Exchange ${n} of 3</small></span>${side(R ? R.name : PN(st.deb.rival), st.deb.rival, 'riv')}</div>`; }
  // during a spill: the party room as 100 seats, filled with your votes, against the 50% line
  function caucusFig() { const v = Math.round(st.votes); setTimeout(() => { lastVotes = v; }, 0); const inc = E.incOf ? E.incOf(st.party) : null, P = C.PARTIES[st.party];
    return `<section class="cmp-fig cau-fig" style="--pc:${PC(st.party)}">${fig(1, 'The party room', 'Each square is one per cent of the caucus. You need half to win the ballot.')}
      <div class="cau-head"><span><b class="num">${v}%</b><small>with you</small></span><span class="cau-need ${v >= 50 ? 'ok' : ''}">${v >= 50 ? 'Enough to win, if it holds' : `${50 - v} more to win`}</span><span><b class="num">${100 - v}%</b><small>with ${esc(inc ? inc.name.split(' ').slice(-1)[0] : 'the leader')}</small></span></div>
      <div class="cau-waffle" role="img" aria-label="${v} per cent of the ${esc(P.n)} caucus with you">${Array.from({ length: 100 }, (_, i) => `<i class="${i < v ? 'me' : ''}${i < v && i >= lastVotes ? ' new' : ''}" style="--d:${Math.max(0, i - lastVotes) * 25}ms"></i>`).join('')}</div></section>`; }
  let lastVotes = 0;
  // the right column shows one panel at a time: the map, the vote, the pollsters, or seats to watch and the mood
  const RTABS = [['map', 'Map'], ['vote', 'The vote'], ['polls', 'Pollsters'], ['trail', 'Watch and mood']];
  function rtab() { return RTABS.some(t => t[0] === prefs.rtab) ? prefs.rtab : 'map'; }
  // leader perks and the run's housekeeping, under the play area
  function runPanel(L) {
    return `<section class="cmp-run" style="--pc:${PC(st.party)}"><div class="rn-ldr">${photo(L.name, 'lc-ph')}<div><span class="kick">Your leader</span><b class="rn-name">${esc(L.name)}</b><p><b class="${L.noGood ? 'bad' : 'good'}">${L.noGood ? '−' : '+'} ${esc(L.plus[0])}</b> ${kw(esc(L.plus[1]))}</p><p><b class="bad">− ${esc(L.minus[0])}</b> ${kw(esc(L.minus[1]))}</p></div></div>
      <div class="rn-acts"><button type="button" class="rn-btn" data-a="ach">${ICON('medal')} Honours <b class="num">${achCount()}/${A.list.length}</b></button>${st.iron ? '' : `<button type="button" class="rn-btn" data-a="copycode">${ICON('check')} Copy a run code</button>`}<button type="button" class="rn-btn cmp-quit" data-a="abandon">${ICON('close')} Abandon campaign</button></div>${st.iron ? '' : `<p class="code-msg cmp-note" role="status">${esc(codeMsg)}</p>`}</section>`;
  }

  // Ironman: the poll average as a band of seats for the big parties, rounded to fives
  function ironPoll() { const s = st.poll.seats, band = v => { const lo = Math.max(0, Math.floor((v - 4) / 5) * 5); return `${lo}–${lo + 10}`; };
    return `<ul class="iron-poll">${['ALP', 'LNP', 'ONP', 'GRN', 'IND'].map(p => `<li class="${p === st.party ? 'me' : ''}" style="--pc:${PC(p)}"><span>${PN(p)}</span><b class="num">${band(s[p])}</b></li>`).join('')}</ul><p class="cmp-note">Seats in the poll average, give or take. 76 wins a majority.</p>`; }
  // ---- a hung parliament: make offers to the crossbench, or (on the crossbench) pick a side and a price
  const PNF = p => (C.blocs[p] || {}).n || PN(p) || p;
  function vHung() {
    const n = st.neg, me = st.party, L = E.ldrOf(st), riv = n.mode === 'form' ? (me === n.A ? n.B : n.A) : null, mine = me === n.A ? n.sA : n.sB;
    const leanTxt = b => { if (n.mode === 'form') { const a = b.lean[me], r = b.lean[riv]; return a >= 0.6 && a > r + 0.15 ? 'Leans to you' : r >= 0.6 && r > a + 0.15 ? 'Leans to ' + PN(riv) : a < 0.2 && r < 0.2 ? 'Wants neither' : 'Undecided'; }
      const a = b.lean[n.A], c = b.lean[n.B]; return a > c + 0.15 ? 'Leans to ' + PN(n.A) : c > a + 0.15 ? 'Leans to ' + PN(n.B) : 'Undecided'; };
    const head = `<article class="cmp-front hung"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">Hung parliament · the deals</span></div>
      <h2 id="cmp-title" class="fp-hl sm" tabindex="-1">Nobody has 76</h2>
      <p class="fp-deck">${PN(n.A)} ${n.sA} seats, ${PN(n.B)} ${n.sB}. The crossbench holds ${n.blocs.reduce((a, b) => a + b.seats, 0)} seats, and the next government needs them.</p>
      <div class="hung-bar" role="img" aria-label="${PN(n.A)} ${n.sA}, ${PN(n.B)} ${n.sB}, crossbench ${n.blocs.reduce((a, b) => a + b.seats, 0)}">${[[n.A, n.sA]].concat(n.blocs.map(b => [b.k, b.seats]), [[n.B, n.sB]]).map(([k, v]) => `<i style="flex:${v};background:${PC(['ALP', 'LNP', 'ONP', 'GRN', 'IND'].includes(k) ? k : 'OTH')}" title="${esc(PNF(k))} ${v}"></i>`).join('')}<span class="sb-76" aria-hidden="true"><span>76</span></span></div>`;
    if (n.mode === 'form') {
      const all = n.blocs.reduce((a, b) => a + ((negOff[b.k] || 0) > 0 || b.lean[me] >= 0.6 ? b.seats : 0), mine), cost = n.blocs.reduce((a, b) => a + (C.offers[negOff[b.k] || 0].u || 0), 0);
      return toolbar() + head + `<p class="fp-body">You have ${mine}. Make an offer to each bloc: the more you give, the likelier they are to back you, but every concession costs caucus unity, and ${esc(surname((E.incOf(riv) || { name: PN(riv) }).name))} is making offers too.</p>
        <div class="hung-blocs">${n.blocs.map(b => `<section class="hb-row"><div class="hb-h"><b>${esc(b.n)}</b><span class="num">${b.seats} seat${b.seats === 1 ? '' : 's'}</span><em>${leanTxt(b)}</em></div><p>${esc(b.ask)}</p>
          <div class="hb-offers" role="radiogroup" aria-label="Your offer to ${esc(b.n)}">${C.offers.map((o, k) => `<button type="button" class="seg${(negOff[b.k] || 0) === k ? ' on' : ''}" data-off="${b.k}:${k}" aria-pressed="${(negOff[b.k] || 0) === k}">${o.n}<small>${o.d}</small></button>`).join('')}</div></section>`).join('')}</div>
        <p class="cmp-note">If everyone you make an offer to, and everyone already leaning your way, says yes: <b>${all}</b> seats${all >= 76 ? ', enough to govern' : ', short of 76'}. Unity cost: ${-cost}.</p>
        <div class="cmp-endbtns"><button type="button" data-a="settle">Put it to the House →</button></div></article>`; }
    const can = k => (((C.blocs[me] || {}).lean || {})[k] || 0) >= 0.1, sides = [n.A, n.B];
    return toolbar() + head + `<p class="fp-body">${esc(C.PARTIES[me].n)} hold ${n.mine} seat${n.mine === 1 ? '' : 's'}, and both sides want them. Pick a side and a price. Ask for everything and they may say no; ask for less and they will almost certainly agree.</p>
      <div class="hung-king"><div class="cs-grp" role="radiogroup" aria-label="Who do you back?"><span class="kick">Back</span>${sides.map(k => `<button type="button" class="seg${negBack === k ? ' on' : ''}" data-back="${k}" aria-pressed="${negBack === k}"${can(k) ? '' : ' disabled'}>${PN(k)} <small>${can(k) ? (k === n.A ? n.sA : n.sB) + ' seats' : 'your members would never wear it'}</small></button>`).join('')}<button type="button" class="seg${negBack === 'none' ? ' on' : ''}" data-back="none" aria-pressed="${negBack === 'none'}">Stay on the crossbench</button></div>
        <div class="cs-grp" role="radiogroup" aria-label="Your price"${negBack && negBack !== 'none' ? '' : ' hidden'}><span class="kick">Price</span><button type="button" class="seg${negAsk === 1 ? ' on' : ''}" data-ask="1" aria-pressed="${negAsk === 1}">Modest asks</button><button type="button" class="seg${negAsk === 2 ? ' on' : ''}" data-ask="2" aria-pressed="${negAsk === 2}">Everything on your list</button></div></div>
      <div class="hung-blocs other"><div class="kick">The rest of the crossbench</div>${n.blocs.filter(b => b.k !== me).map(b => `<p><b>${esc(b.n)}</b> ${b.seats} · <em>${leanTxt(b)}</em></p>`).join('') || '<p>No one else.</p>'}</div>
      <div class="cmp-endbtns"><button type="button" data-a="settle"${negBack ? '' : ' disabled'}>Announce your decision →</button></div></article>`;
  }
  // how it was settled, for the verdict
  function hungOut() { const r = st.result, n = r.neg || st.neg; if (!n || !n.out) return ''; const o = n.out;
    const rows = n.blocs.map(b => { const v = o.backers[b.k]; return `<li><b>${esc(b.n)}</b> <span class="num">${b.seats}</span> <em class="${v ? (v === st.party ? 'up' : 'dn') : ''}">${v ? 'backed ' + PN(v) : 'sat on the crossbench'}</em></li>`; }).join('');
    return `<section class="fp-hung"><div class="kick">How the hung parliament was settled</div><p class="cmp-note">${PN(o.gov)} governs with ${o.gov === n.A ? o.tA : o.tB} votes on the floor of the House${o.floor ? ', a working majority' : ', as a minority that the rest of the crossbench lets survive'}.${n.mode === 'king' ? (o.back ? ` You backed ${PN(o.back)}${o.kingOk ? '' : ', but they would not meet your price'}.` : ' You stayed on the crossbench.') : ''}</p><ul class="hung-res">${rows}</ul></section>`; }
  // the Senate, from the same count
  // the Senate before the election, grouped the same way as the campaign's Senate result
  function senBefore() { const B = APP.senBefore, SK = APP.SK || [], o = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, OTH: 0 }; if (!B) return null;
    SK.forEach((k, i) => { const v = B[i] || 0, q = k === 'COA' ? 'LNP' : k === 'ON' ? 'ONP' : ['ALP', 'GRN'].includes(k) ? k : 'OTH'; o[q] += v; }); return o; }
  function senateOut() { const z = st.result.sen; if (!z) return ''; const t = ['ALP', 'LNP', 'GRN', 'ONP'].map(p => [p, z[p]]).concat([['OTH', z.OTH]]);
    const side = st.party === 'ALP' || st.party === 'GRN' ? 'Labor and the Greens' : st.party === 'LNP' || st.party === 'ONP' ? 'the Coalition and One Nation' : null;
    return `<section class="fp-sen">${fig('#', 'The Senate ' + SiteBar.ib('senate', 'the Senate'), 'All 76 senators after the half-Senate election. 39 controls the chamber.')}<div class="sen-grid"><figure class="gl-chf">${chamber(z, null, null, { name: 'The Senate', othName: 'Crossbench', prev: senBefore(), prevWord: 'before the election' })}</figure>
      <div class="sen-side"><ul class="sen-tiles">${t.map(([p, v]) => `<li style="--pc:${PC(p)}"><b class="num">${v}</b><span>${p === 'OTH' ? 'Crossbench' : PN(p)}</span></li>`).join('')}</ul>
      ${side ? `<p class="sen-verdict ${z.ctl ? 'up' : 'dn'}"><span class="kick">${esc(side[0].toUpperCase() + side.slice(1))}</span><b class="num">${z.side}</b> of 76 <em>${z.ctl ? 'Control the Senate' : `${39 - z.side} short of control`}</em></p>` : `<p class="sen-verdict"><span class="kick">The crossbench</span><b class="num">${z.OTH}</b> of 76</p>`}
      ${z.cross.length ? `<p class="cmp-note">Crossbench: ${z.cross.map(([n, v]) => `${esc(n)} ${v}`).join(', ')}.</p>` : ''}</div></div></section>`; }
  // the campaign in numbers
  function statsOut() { const ents = st.log.filter(e => e.phase === 'CAMPAIGN' && !e.dec), decs = st.log.filter(e => e.dec), r = st.result;
    const best = ents.filter(e => e.pd > 0).sort((a, b) => b.pd - a.pd)[0], worst = ents.filter(e => e.pd < 0).sort((a, b) => a.pd - b.pd)[0];
    const dc = {}; decs.forEach(e => { dc[e.t] = (dc[e.t] || 0) + 1; }); const topDec = Object.entries(dc).sort((a, b) => b[1] - a[1])[0];
    const spent = decs.reduce((a, e) => a + Math.abs(((e.fx || []).find(f => f[3] === 'pp' && f[1] < 0) || [0, 0])[1]), 0);
    const tg = st.targets || [], dd = st.doors || {}, np = Object.keys(st.stances).length, turns = ents.filter(e => !e.interrupt).length;
    const tiles = [['Turns', turns, `${ents.filter(e => e.tone === 'up').length} good · ${ents.filter(e => e.tone === 'dn').length} bad`],
      ['Political Power left', st.pp, `${st.ppEarned || 0} earned · ${spent} spent on decisions`],
      ['Promises', `$${Math.round(st.ledger.bn)}bn`, `${st.ledger.n} promise${st.ledger.n === 1 ? '' : 's'}`],
      ['The leaders’ debate', st.debWins == null ? '—' : `${st.debWins}/3`, st.debWins == null ? 'not reached' : 'exchanges won'],
      ['Doorstops', dd.n ? `${dd.n - dd.t}/${dd.n}` : '—', dd.n ? 'answered in time' : 'none'],
      ['Weekly targets', tg.length ? `${tg.filter(t => t.ok).length}/${tg.length}` : '—', tg.length ? 'met' : 'none'],
      ['Positions', np, `${st.backflips} backflip${st.backflips === 1 ? '' : 's'}`],
      ['Campaign decisions', decs.length, topDec ? `most used: ${esc(topDec[0])} (${topDec[1]})` : 'none taken']];
    const wide = [['Best moment', best ? esc(best.h || best.t) : '', best ? `+${best.pd}` : '', 'up'], ['Worst moment', worst ? esc(worst.h || worst.t) : 'None that cost you', worst ? `−${-worst.pd}` : '', 'dn'],
      ['Endorsements', st.endorse.length ? (C.endorsers || []).filter(x => st.endorse.includes(x.id)).map(x => esc(x.n)).join(', ') : 'None', '', ''],
      ['Closest seat', r.close ? `${esc(r.close.n)} (${r.close.st}): ${PN(r.close.w)}` : '—', r.close ? `${(r.close.m * 2).toFixed(1)} pts` : '', '']];
    if (!best) wide[0][1] = 'None that moved the polls';
    return `<section class="fp-stats">${fig('#', 'The campaign in numbers')}<div class="st-tiles">${tiles.map(([k, v, sub]) => `<div class="st-tile"><span class="kick">${kw(k)}</span><b class="num">${v}</b><small>${sub}</small></div>`).join('')}</div>
      <dl class="st-wide">${wide.map(([k, v, n, c]) => `<div><dt>${k}</dt><dd>${v}</dd>${n ? `<dd class="st-n ${c}">${n}</dd>` : ''}</div>`).join('')}</dl></section>`; }
  function byTab(b) { if (!b || !b.tab) return ''; const rows = b.tab.slice().sort((x, y) => y[1] - x[1]), NM = { ALP: 'Labor', LNP: 'Liberal', GRN: 'Greens', ONP: 'One Nation', IND: 'Independent', OTH: 'Other' };
    return `<div class="by-tab" role="table" aria-label="The count in ${esc(b.seat)}"><div class="bt-cap">The count in ${esc(b.seat)}</div><div class="bt-row bt-h" role="row"><span role="columnheader">Candidate</span><span role="columnheader">First prefs</span><span role="columnheader">Final</span></div>${rows.map(([p, pv, fv]) => `<div class="bt-row${p === st.party ? ' me' : ''}" role="row" style="--pc:${PC(p)}"><span role="cell"><i class="mq-dot" aria-hidden="true"></i>${p === st.party ? esc(E.ldrOf(st).name) : (NM[p] || esc(PN(p))) + ' candidate'}</span><span role="cell" class="num">${pv.toFixed(1)}%</span><span role="cell" class="num">${fv != null ? '<b>' + fv.toFixed(1) + '%</b>' : '–'}</span></div>`).join('')}</div>`; }
  // ---- end screens
  function failHon() { const m = A.met(st, null); return m.length ? `<section class="fp-honours"><div class="kick">Honours from this run</div><div class="medal-row">${m.map(a => medal(a, { run: true })).join('')}</div></section>` : ''; }
  function vFailed() {
    const L = E.ldrOf(st), rolled = st.failWhy === 'rolled';
    if (st.failWhy === 'by') return toolbar() + `<article class="cmp-front"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">By-election special</span></div>
      <h2 id="cmp-title" class="fp-hl" tabindex="-1">${esc(st.by.seat)} says no</h2><p class="fp-deck">${esc(L.name)} loses the ${esc(st.by.seat)} by-election, ${st.by.res.toFixed(1)}% to ${(100 - st.by.res).toFixed(1)}% after preferences. The comeback is over before the leadership is even in play.</p>
      ${byTab(st.by)}<p class="fp-body">You started on ${st.by.m0.toFixed(1)}%. Local promises and time in the seat are the safest gains; national-profile gambles and attacks can swing it either way.</p>
      ${failHon()}<div class="cmp-endbtns"><button type="button" data-a="retry">Try the by-election again</button><button type="button" class="ghost" data-a="new">Pick another leader</button></div></article>`;
    return toolbar() + `<article class="cmp-front"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">Leadership special</span></div>
      <h2 id="cmp-title" class="fp-hl" tabindex="-1">${rolled ? 'Rolled mid-campaign' : 'The spill fails'}</h2><p class="fp-deck">${rolled ? `${esc(L.name)} loses a snap party-room vote in the middle of the campaign. A new leader takes over for the run home.` : `${esc(L.name)} finished on ${Math.round(st.votes)}% in the party-room ballot and goes to the backbench. The ${esc(C.PARTIES[st.party].n)} campaign goes ahead without you.`}</p>
      <p class="fp-body">${rolled ? 'Caucus unity under 30 invites a challenge. Calling a snap vote is a gamble on unity; buying quiet with Political Power is safer.' : 'You needed 50%. Every question in the spill moves caucus votes: deals with the factions and the Nationals usually buy the most, at a cost to unity.'}</p>
      ${failHon()}<div class="cmp-endbtns"><button type="button" data-a="retry">${rolled ? 'Try again' : 'Try the spill again'}</button><button type="button" class="ghost" data-a="new">Pick another leader</button></div></article>`;
  }
  function vNight() {
    return toolbar() + `<article class="cmp-front night"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">Election night · live</span></div>
      <div class="night-clock" aria-hidden="true"><span class="nc-face"><i class="nc-h"></i><i class="nc-m"></i></span><b class="nc-t num">5:59:50<small>pm AEST</small></b></div>
      <h2 id="cmp-title" class="fp-hl" tabindex="-1">Polls have closed</h2><p class="fp-deck">Voting has ended in the eastern states. The simulator is counting every seat thousands of times, with your campaign built in.</p>
      <div class="night-count" role="status"><span class="spin" aria-hidden="true"></span><span>Counting…</span></div></article>`;
  }
  function epilogue() {
    const r = st.result, L = E.ldrOf(st), sn = surname(L.name), P = { ALP: 'Labor', LNP: 'the Coalition', ONP: 'One Nation', GRN: 'the Greens', IND: 'the teal independents' }[st.party], k = st.tier.k, me = r.seats[st.party];
    const cleared = C.startSpirits.filter(id => !st.spirits.some(s => E.spirit(s).grp === E.spirit(id).grp)).map(id => E.spirit(id).n.toLowerCase());
    const won = r.gov === st.party, best = st.log.filter(e => e.ok === true).map(e => e.t)[0];
    const lines = [];
    lines.push(k === 0 ? `Historians will file the 2028 election under “realignment”. ${L.name} led ${P} to ${me} seats, a result few had thought possible when the writs were issued.`
      : won ? `${L.name} led ${P} into government with ${me} seats${r.hung ? ', relying on the crossbench to govern' : ''}.`
      : C.PARTIES[st.party].cross && k <= 2 ? `${L.name} led ${P} to ${me} seat${me === 1 ? '' : 's'}: ${esc(st.tier.n.toLowerCase())}, with ${r.gov === 'ALP' ? 'Labor' : r.gov === 'LNP' ? 'the Coalition' : 'One Nation'} in government.`
      : `For ${P}, 2028 ended in disappointment: ${me} seat${me === 1 ? '' : 's'}, and ${r.gov === 'ALP' ? 'Labor' : r.gov === 'LNP' ? 'the Coalition' : 'One Nation'} in government.`);
    if (!st.inc) lines.push(`${sn} took the leadership in a ${st.votes <= 53 ? 'bruising' : 'decisive'} party-room spill on ${Math.round(st.votes)}%, and spent the campaign ${st.minUnity < 40 ? 'fighting leaks from a divided team' : 'with the party largely united behind them'}.`);
    else lines.push(st.minUnity < 40 ? `The campaign was dogged by leaks; caucus unity fell as low as ${Math.round(st.minUnity)}.` : `Discipline held: caucus unity never dropped below ${Math.round(st.minUnity)}.`);
    if (st.log.some(e => (e.notes || []).some(n => /caught a wave/.test(n)))) lines.push('At its height the campaign became a wave, the kind of run that rewrites electoral maps.');
    if (st.log.some(e => (e.notes || []).some(n => /freefall/.test(n)))) lines.push('There was a stretch where nothing went right and the bad news fed on itself.');
    if (best) lines.push(`The moment campaign veterans still talk about: “${best}”.`);
    if (cleared.length) lines.push(`By polling day the campaign had cleared ${cleared.slice(0, 3).join(', ')}${cleared.length > 3 ? ' and more' : ''} from the national mood.`);
    if (r.leaderSeatWon === false) lines.push(`And in a final twist, ${sn} lost ${r.leaderSeat}.`);
    return lines.join(' ');
  }
  // how wrong were the polls? the final poll average against the count, party by party
  function pollsWrong() { const r = st.result, f = st.pollFinal; if (!f || !f.seats) return '';
    const rows = ['ALP', 'LNP', 'ONP', 'GRN', 'IND'], miss = Math.max(...rows.map(p => Math.abs(r.seats[p] - f.seats[p]))), mx = Math.max(10, ...rows.flatMap(p => [r.seats[p], f.seats[p]])) * 1.08, X = v => (v / mx * 100).toFixed(1);
    return `<section class="fp-polls">${fig('#', 'How wrong were the polls?', 'Seats in the final poll average against the count. Hollow: the final poll. Solid: the result.')}
      <p class="pw-say">${miss >= 12 ? 'A big miss. The pollsters will be writing apologies for weeks.' : miss >= 6 ? 'A respectable miss: close enough to argue about.' : 'The polls were close this time.'}${st.spirits.includes('POLL_HERDING') ? ' They all agreed with each other, which turned out to mean less than it seemed.' : ''}</p>
      <div class="pw-rows">${rows.map(p => { const d = r.seats[p] - f.seats[p], a = Math.min(r.seats[p], f.seats[p]), w = Math.abs(d);
        return `<div class="pw-row${p === st.party ? ' me' : ''}" style="--pc:${PC(p)}"><span class="pw-p"><b>${PN(p)}</b><small>vote ${f.nat[p].toFixed(1)}→${r.nat[p].toFixed(1)}%</small></span>
          <span class="pw-db" aria-label="${esc(PN(p))}: final poll ${f.seats[p]} seats, result ${r.seats[p]}"><i class="ln" style="left:${X(a)}%;width:${X(w)}%"></i><i class="po" style="left:${X(f.seats[p])}%"></i><i class="rs" style="left:${X(r.seats[p])}%"></i></span>
          <span class="pw-m"><b class="${d > 0 ? 'up' : d < 0 ? 'dn' : ''}">${d ? sgn(d, 0) : '±0'}</b><small>${f.seats[p]} → ${r.seats[p]}</small></span></div>`; }).join('')}</div></section>`; }
  // the campaign in one picture: your seats in the poll average each turn, what the model really had (hidden until now), every turn's
  // tone as a dot, and the count at the end. Below it, the turning points.
  const dayOf = t => { const wk = st.T / 5; return `Week ${Math.min(5, Math.ceil(t / wk))}, day ${((t - 1) % wk) + 1}`; };
  function recap(n) {
    const H = (st.hist || []).filter(x => x.t >= 0), r = st.result; if (H.length < 3) return '';
    const W = 680, Hh = 230, L = 38, R = 74, T = 14, B = 30, me = r.seats[st.party], hasC = H.every(x => x.c != null);
    const vals = H.map(x => x.s).concat(hasC ? H.map(x => x.c) : [], [me, 76]), lo = Math.max(0, Math.min(...vals) - 6), hi = Math.min(150, Math.max(...vals) + 6);
    const X = t => L + t / (st.T + 1) * (W - L - R), Y = v => T + (hi - v) / (hi - lo) * (Hh - T - B);
    const line = k => H.map((x, j) => `${j ? 'L' : 'M'}${X(x.t).toFixed(1)} ${Y(x[k]).toFixed(1)}`).join('');
    const ents = st.log.filter(e => e.phase === 'CAMPAIGN' && !e.interrupt), at = t => (H.find(x => x.t === t) || H[H.length - 1]).s;
    const dots = ents.filter(e => !e.dec).map(e => `<circle class="rc-dot ${e.tone || 'flat'}" cx="${X(e.turn).toFixed(1)}" cy="${Y(at(e.turn)).toFixed(1)}" r="4.2"><title>${esc(dayOf(e.turn))}: ${esc(e.h || e.t)}</title></circle>`).join('');
    const decs = ents.filter(e => e.dec).map(e => `<rect class="rc-dec" x="${(X(e.turn) - 3).toFixed(1)}" y="${(Hh - B + 5).toFixed(1)}" width="6" height="6"><title>${esc(dayOf(e.turn))}: decision, ${esc(e.t)}</title></rect>`).join('');
    const mt = E.milestoneTurns(st.T).map(t => `<path class="rc-mile" d="M${X(t).toFixed(1)} ${Hh - B + 14}l4 4-4 4-4-4z"><title>Milestone, turn ${t}</title></path>`).join('');
    const ticks = [0, 5, 10, 15, 20].map(t => `<text class="rc-ax" x="${X(t).toFixed(1)}" y="${Hh - 2}" text-anchor="middle">${t ? 'T' + t : 'Start'}</text>`).join('');
    const yt = [lo, Math.round((lo + hi) / 2), hi].map(v => Math.round(v)).map(v => `<text class="rc-ax" x="${L - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${v}</text>`).join('');
    const ex = X(st.T + 1), ey = Y(me), last = H[H.length - 1];
    const pts = ents.filter(e => !e.dec), rank = e => (e.pd || 0) + (e.dn || 0) / 10, best = pts.filter(e => e.tone === 'up').sort((a, b) => rank(b) - rank(a)).slice(0, 3), worst = pts.filter(e => e.tone === 'dn').sort((a, b) => rank(a) - rank(b)).slice(0, 3);
    const tp = e => `<li class="t-${e.tone}"><span class="lg-t">${esc(dayOf(e.turn))}</span><b>${esc(e.h || e.t)}</b><em class="num">${e.pd > 0 ? '+' + e.pd : e.pd < 0 ? '−' + Math.abs(e.pd) : '±0'}</em></li>`;
    const miss = hasC ? last.c - last.s : null;
    return `<section class="fp-recap" style="--pc:${PC(st.party)}">${fig(n, 'How the campaign unfolded', 'Your seats in the poll average after each turn. Each dot is a turn: green if it gained you seats, black if it cost you, hollow if nothing moved. Squares are campaign decisions; diamonds are milestones.')}
      <div class="rc-wrap"><svg class="rc" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Your seats in the polls went from ${H[0].s} to ${last.s} over the campaign; the count gave you ${me}.">
        <line class="rc-76" x1="${L}" x2="${W - R + 30}" y1="${Y(76).toFixed(1)}" y2="${Y(76).toFixed(1)}"/><text class="rc-ax b" x="${W - R + 34}" y="${(Y(76) + 4).toFixed(1)}">76</text>
        ${hasC ? `<path class="rc-true" d="${line('c')}"/>` : ''}<path class="rc-poll" d="${line('s')}"/>${dots}${decs}${mt}${ticks}${yt}
        <line class="rc-end" x1="${X(last.t).toFixed(1)}" y1="${Y(last.s).toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"/><circle class="rc-res" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="7"/><text class="rc-lab" x="${(ex + 11).toFixed(1)}" y="${(ey + 5).toFixed(1)}">${me}</text><text class="rc-ax" x="${ex.toFixed(1)}" y="${Hh - 2}" text-anchor="middle">Count</text>
      </svg></div>
      <p class="rc-key"><span><i class="k-poll"></i>The polls</span>${hasC ? '<span><i class="k-true"></i>What the model really had (hidden during the campaign)</span>' : ''}<span><i class="k-res"></i>The count</span></p>
      ${hasC && Math.abs(miss) >= 3 ? `<p class="cmp-note">By the final week the polls had you ${Math.abs(miss)} seats too ${miss > 0 ? 'low' : 'high'}. ${miss > 0 ? 'You were doing better than anyone could see.' : 'The polls flattered you.'}</p>` : ''}
      ${best.length || worst.length ? `<div class="rc-tp">${best.length ? `<div><div class="kick">Where you won it</div><ol class="log-list">${best.map(tp).join('')}</ol></div>` : ''}${worst.length ? `<div><div class="kick">Where it hurt</div><ol class="log-list">${worst.map(tp).join('')}</ol></div>` : ''}</div>` : ''}</section>`; }
  // the campaign's key moments on your vote line
  function momentsOut(n) {
    const H = (st.hist || []).filter(x => x.v != null), r = st.result; if (H.length < 3) return '';
    const ents = st.log.filter(e => e.phase === 'CAMPAIGN'), mt = E.milestoneTurns(st.T), MN = ['The launch', 'The costings', 'The Press Club', 'The debate', 'The final pitch'], out = [], seen = new Set();
    const add = (t, txt, cls) => { if (out.length >= 10 || seen.has(txt)) return; seen.add(txt); out.push({ t, txt, cls }); };
    ents.forEach(e => { const k = mt.indexOf(e.turn); if (k >= 0 && st.miles && e.card === st.miles[e.turn]) add(e.turn, `${MN[k]}: ${e.h || e.t}`, e.tone || 'flat');
      if (e.deb && e.deb.n === 3) add(e.turn, `Debate night: you won ${st.debWins != null ? st.debWins : '?'} of 3 exchanges`, (st.debWins || 0) >= 2 ? 'up' : 'dn');
      if (e.card === 'WORLD') add(e.turn, `World news: ${e.t}`, e.tone || 'flat'); if (e.card === 'LATE') add(e.turn, 'The late scandal', 'dn'); if (e.card === 'MONEY') add(e.turn, 'The costings attack', e.tone || 'flat');
      if (e.backflip) add(e.turn, `Backflip on ${C.stanceNames[e.backflip] || e.backflip}`, 'dn'); if (e.card === 'REVOLT' || e.card === 'SPEC') add(e.turn, 'Leadership trouble', 'dn'); });
    const pts = ents.filter(e => !e.dec && !e.interrupt), rk = e => (e.pd || 0) + (e.dn || 0) / 10;
    const best = pts.slice().sort((a, b) => rk(b) - rk(a))[0], worst = pts.slice().sort((a, b) => rk(a) - rk(b))[0];
    if (best && rk(best) > 0) add(best.turn, `Best day: ${best.h || best.t}`, 'up'); if (worst && rk(worst) < 0) add(worst.turn, `Worst day: ${worst.h || worst.t}`, 'dn');
    out.sort((a, b) => a.t - b.t);
    const W = 680, Hh = 220, L = 42, R = 60, T = 16, B = 30, vs = H.map(x => x.v).concat([r.nat[st.party]]), lo = Math.floor(Math.min(...vs) - 1), hi = Math.ceil(Math.max(...vs) + 1);
    const X = t => L + t / (st.T + 1) * (W - L - R), Y = v => T + (hi - v) / (hi - lo || 1) * (Hh - T - B), vAt = t => (H.filter(x => x.t <= t).pop() || H[0]).v;
    const path = H.map((x, j) => `${j ? 'L' : 'M'}${X(x.t).toFixed(1)} ${Y(x.v).toFixed(1)}`).join(''), ex = X(st.T + 1), ey = Y(r.nat[st.party]);
    const yt = [lo, (lo + hi) / 2, hi].map(v => `<text class="rc-ax" x="${L - 6}" y="${(Y(v) + 4).toFixed(1)}" text-anchor="end">${v.toFixed(v % 1 ? 1 : 0)}%</text>`).join('');
    return `<section class="fp-recap mo" style="--pc:${PC(st.party)}">${fig(n, 'Your vote, and the moments that moved it', 'Your first-preference vote in the poll average after each turn, with the campaign’s key moments numbered. The dot at the end is the count.')}
      <div class="rc-wrap"><svg class="rc" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Your vote went from ${H[0].v.toFixed(1)}% to ${r.nat[st.party].toFixed(1)}% on the night.">${yt}
        <path class="rc-poll" d="${path}"/><line class="rc-end" x1="${X(H[H.length - 1].t).toFixed(1)}" y1="${Y(H[H.length - 1].v).toFixed(1)}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"/><circle class="rc-res" cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="6"/><text class="rc-lab" x="${(ex + 9).toFixed(1)}" y="${(ey + 5).toFixed(1)}">${r.nat[st.party].toFixed(1)}%</text>
        ${out.map((m, k) => `<g class="mo-m ${m.cls}"><line x1="${X(m.t).toFixed(1)}" x2="${X(m.t).toFixed(1)}" y1="${(Y(vAt(m.t)) + 8).toFixed(1)}" y2="${Hh - B + 4}"/><circle cx="${X(m.t).toFixed(1)}" cy="${Y(vAt(m.t)).toFixed(1)}" r="9"/><text x="${X(m.t).toFixed(1)}" y="${(Y(vAt(m.t)) + 4).toFixed(1)}" text-anchor="middle">${k + 1}</text><title>${esc(m.txt)}</title></g>`).join('')}
        ${[0, 5, 10, 15, 20].map(t => `<text class="rc-ax" x="${X(t).toFixed(1)}" y="${Hh - 6}" text-anchor="middle">${t ? 'T' + t : 'Start'}</text>`).join('')}</svg></div>
      <ol class="mo-list">${out.map(m => `<li class="${m.cls}"><span class="lg-t">${esc(dayOf(m.t))}</span>${esc(m.txt)}</li>`).join('')}</ol></section>`; }
  // the inquiry: why it went the way it did, and what to do next time
  function inquiryOut() { const r = st.result, me = st.party, won = r.gov === me || (C.PARTIES[me].cross && st.tier.k <= 1), N = C.PARTIES[me].n, F = [], tips = [];
    const H = st.hist || [], v0 = H.length ? H[0].v : st.nat0[me], v1 = r.nat[me];
    F.push([v1 >= v0 ? 'up' : 'dn', `Your first-preference vote went from ${v0.toFixed(1)}% at the start to ${v1.toFixed(1)}% on the night.`]);
    const pts = st.log.filter(e => e.phase === 'CAMPAIGN' && !e.dec && !e.interrupt), rk = e => (e.pd || 0) + (e.dn || 0) / 10;
    const b = pts.slice().sort((a, c) => rk(c) - rk(a))[0], w = pts.slice().sort((a, c) => rk(a) - rk(c))[0];
    if (b && rk(b) > 0) F.push(['up', `The best call: “${b.h || b.t}” (${dayOf(b.turn).toLowerCase()}).`]); if (w && rk(w) < 0) F.push(['dn', `The worst call: “${w.h || w.t}” (${dayOf(w.turn).toLowerCase()}).`]);
    if (st.debWins != null) { F.push([st.debWins >= 2 ? 'up' : 'dn', `You won ${st.debWins} of 3 debate exchanges.`]); if (st.debWins < 2) tips.push('Read the rival’s tell before the debate: an attack beats a one-liner, calm beats an attack, a one-liner beats calm.'); }
    F.push([st.minUnity >= 50 ? 'up' : 'dn', `Caucus unity never fell below ${Math.round(st.minUnity)}.`]); if (st.minUnity < 40) tips.push('Protect caucus unity: under 40 the leaks start, and under 30 your leadership is in play.');
    if (st.backflips) { F.push(['dn', `${st.backflips} backflip${st.backflips > 1 ? 's' : ''} cost you votes and momentum.`]); tips.push('Pick a side on each issue and stay there: every backflip costs vote, momentum and unity.'); }
    if (st.ledger && st.ledger.bn >= 20) { const ok = st.flags.includes('PASSED_PBO_CLEAN'); F.push([ok ? 'up' : 'dn', `About $${Math.round(st.ledger.bn)} billion in promises${ok ? ', with clean costings' : ' and no clean costings'}.`]); if (!ok) tips.push('Get your costings cleared before the final week, or the black-hole story will follow you.'); }
    const last = H[H.length - 1]; if (last && last.c != null) { const m = last.c - last.s; if (Math.abs(m) >= 3) F.push([m > 0 ? 'up' : 'dn', `The polls had you ${Math.abs(m)} seats too ${m > 0 ? 'low' : 'high'} by the final week.`]); }
    if (st.bank) F.push(['up', `Your early-voting drive banked ${Math.round(st.bank * 100)}% of your vote before the last days.`]);
    if (st.pp >= 50) { F.push(['dn', `You finished with ${st.pp} Political Power unspent.`]); tips.push('Spend your Political Power: decisions like blitzes and drives are worth more than a full war chest.'); }
    if (!tips.length) tips.push(won ? 'Do it again from a harder opening, or on Hard.' : 'Try a different week-one tour: the states you visit early decide where your momentum lands.');
    return `<section class="fp-inq ${won ? 'won' : 'lost'}" style="--pc:${PC(me)}"><span class="inq-stamp">${won ? 'Won' : 'Lost'}</span><div class="kick">The inquiry</div><h3>${won ? `Why ${esc(N)} won` : `Why ${esc(N)} ${C.PARTIES[me].cross ? 'fell short' : 'lost'}`}</h3>
      <ul class="inq-f">${F.map(([c, t]) => `<li class="${c}">${esc(t)}</li>`).join('')}</ul><div class="kick">Next time</div><ol class="inq-t">${tips.slice(0, 3).map(t => `<li>${esc(t)}</li>`).join('')}</ol></section>`; }
  // the count's seat-by-seat winners, if still in memory (a reloaded run only keeps the totals)
  const lastLikely = () => (st.result && st.result.likely) || null;
  // the seats to watch, settled
  function spotsOut() { const sp = st.result.spots; if (!sp || !sp.length) return '';
    return `<section class="fp-spots">${fig('#', 'The seats to watch', 'The seats you followed through the campaign, and how they fell.')}<ul class="spot-cards">${sp.map(x => `<li class="${x.mine ? 'up' : 'dn'}" style="--wc:${PC(x.win)}">
      <span class="sc-st">${x.st} · held by ${PFULL(x.inc)}</span><b class="sc-n">${esc(x.n)}</b><span class="sc-stamp">${x.mine ? 'Won' : 'Lost'}</span>
      <span class="sc-res"><i></i>${PN(x.win)} ${x.inc === x.win ? 'hold' : 'gain'}</span>
      ${x.poll != null ? `<span class="sc-poll"><span class="sc-bar"><i style="width:${Math.max(0, Math.min(100, x.poll)).toFixed(1)}%"></i><b></b></span><small>Last local poll had you ${x.poll >= 50 ? 'ahead' : 'behind'}, ${x.poll.toFixed(1)}%</small></span>` : ''}</li>`).join('')}</ul></section>`; }
  // a shareable result card, drawn on a canvas in the site's broadsheet style
  function shareText() { const r = st.result, L = E.ldrOf(st); return `Australia 2028 Election Simulator, campaign mode: ${L.name} (${C.PARTIES[st.party].n}) — ${st.tier.n}, ${r.seats[st.party]} seats. Score ${st.score}${st.daily ? ' in the daily challenge for ' + st.daily : ''}.`; }
  function shareCard() {
    const r = st.result, L = E.ldrOf(st), cv = document.createElement('canvas'), W = 1200, H = 630; cv.width = W; cv.height = H; const g = cv.getContext('2d');
    const css = v => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || '#000', pc = p => css({ ALP: '--alp', LNP: '--coa', ONP: '--on', GRN: '--grn', IND: '--ind', OTH: '--oth' }[p]);
    const INK = '#16140f', MUTED = '#5d6670';
    g.fillStyle = '#f5f1e8'; g.fillRect(0, 0, W, H); g.fillStyle = INK; g.fillRect(0, 0, W, 10); g.fillStyle = pc(st.party); g.fillRect(0, 10, W, 8);
    g.fillStyle = '#c8102e'; g.fillRect(60, 52, 210, 54); g.fillStyle = '#fff'; g.font = '900 34px Fraunces, Georgia, serif'; g.fillText('XYZ NEWS', 78, 91);
    g.fillStyle = MUTED; g.font = '600 19px "IBM Plex Mono", monospace'; g.fillText('ELECTION SPECIAL · CAMPAIGN MODE', 296, 88);
    g.fillStyle = INK; g.fillRect(60, 126, W - 120, 3); g.fillRect(60, 133, W - 120, 1);
    // left: the result
    g.fillStyle = pc(st.party); g.font = '900 72px Fraunces, Georgia, serif'; g.fillText(st.tier.n, 60, 222, 640);
    g.fillStyle = INK; g.font = 'italic 28px "Source Serif 4", Georgia, serif'; g.fillText(`${L.name} · ${C.PARTIES[st.party].n} · ${r.seats[st.party]} seats`, 60, 268, 640);
    const ps = ['ALP', 'LNP', 'ONP', 'GRN', 'IND'], cw = 128; g.fillRect(60, 300, 640, 2);
    ps.forEach((p, k) => { g.fillStyle = pc(p); g.font = '900 54px Fraunces, Georgia, serif'; g.fillText(String(r.seats[p]), 64 + k * cw, 368); g.fillStyle = INK; g.font = '600 14px "IBM Plex Mono", monospace'; g.fillText(PN(p).toUpperCase(), 66 + k * cw, 394); });
    let x = 60; ps.concat('OTH').forEach(p => { const w = 640 * r.seats[p] / 150; g.fillStyle = pc(p); g.fillRect(x, 418, w, 24); x += w; });
    g.fillStyle = INK; g.fillRect(60 + 640 * 76 / 150, 410, 3, 40);
    g.font = '600 19px "IBM Plex Mono", monospace'; g.fillText(`SCORE ${st.score}  ·  HONOURS ${(st.ach || []).length}  ·  ${st.daily ? 'DAILY ' + st.daily : E.DIFF[st.diff].n.toUpperCase()}${st.iron ? '  ·  IRONMAN' : ''}`, 60, 494, 640);
    if (r.hung) { g.fillStyle = MUTED; g.font = 'italic 21px "Source Serif 4", Georgia, serif'; g.fillText(`Hung parliament: ${PN(r.gov)} governs.`, 60, 530, 640); }
    // right: the campaign in one line, and the seats to watch
    const bx = 740, by = 160, bw = 400, bh = 380; g.strokeStyle = INK; g.lineWidth = 2; g.strokeRect(bx, by, bw, bh);
    
    const LKm = lastLikely(), HX = APP.HEX; let mapped = false;
    if (LKm && HX && HX.cells && window.Path2D) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; Object.values(HX.cells).forEach(c => { x0 = Math.min(x0, c.c[0]); y0 = Math.min(y0, c.c[1]); x1 = Math.max(x1, c.c[0]); y1 = Math.max(y1, c.c[1]); });
      const pad = 26, vw = x1 - x0 + 2 * pad, vh = y1 - y0 + 2 * pad, mw = bw - 36, mh = 215, sc = Math.min(mw / vw, mh / vh), ox = bx + 18 + (mw - vw * sc) / 2, oy = by + 44 + (mh - vh * sc) / 2;
      g.fillStyle = MUTED; g.font = '600 15px "IBM Plex Mono", monospace'; g.fillText('EVERY SEAT, BY STATE', bx + 18, by + 30);
      g.save(); g.translate(ox, oy); g.scale(sc, sc); g.translate(-(x0 - pad), -(y0 - pad));
      APP.D.seats.forEach((s2, i) => { const c = HX.cells[s2.n]; if (!c) return; g.fillStyle = css('--' + APP.P[LKm[i]].k) || '#999'; g.fill(new Path2D(c.d)); g.strokeStyle = '#f5f1e8'; g.lineWidth = 1.4 / sc; g.stroke(new Path2D(c.d)); });
      if (HX.hbord) { g.strokeStyle = INK; g.lineWidth = 1.6 / sc; g.stroke(new Path2D(HX.hbord)); } g.restore(); mapped = true; }
    const Hs = (st.hist || []).filter(h => h.s != null); if (!mapped && Hs.length > 1) { g.fillStyle = MUTED; g.font = '600 15px "IBM Plex Mono", monospace'; g.fillText('YOUR SEATS IN THE POLLS', bx + 18, by + 30);
      const big = !C.PARTIES[st.party].cross, vals = Hs.map(h => h.s).concat([r.seats[st.party]], big ? [76] : []), lo = Math.max(0, Math.min(...vals) - (big ? 5 : 2)), hi = Math.min(150, Math.max(...vals) + (big ? 5 : 2)), cx0 = bx + 22, cx1 = bx + bw - 60, cy0 = by + 48, cy1 = by + 210;
      const X = t => cx0 + t / (st.T + 1) * (cx1 - cx0), Y = v => cy0 + (hi - v) / (hi - lo || 1) * (cy1 - cy0);
      if (big) { g.setLineDash([4, 5]); g.strokeStyle = INK; g.lineWidth = 1; g.beginPath(); g.moveTo(cx0, Y(76)); g.lineTo(cx1 + 30, Y(76)); g.stroke(); g.setLineDash([]);
        g.fillStyle = INK; g.font = '600 13px "IBM Plex Mono", monospace'; g.fillText('76', cx1 + 34, Y(76) + 4); }
      else { g.fillStyle = MUTED; g.font = '600 13px "IBM Plex Mono", monospace'; g.fillText(String(hi), cx1 + 34, cy0 + 4); g.fillText(String(lo), cx1 + 34, cy1 + 4); }
      g.strokeStyle = pc(st.party); g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath(); Hs.forEach((h, j) => { const px = X(h.t), py = Y(h.s); j ? g.lineTo(px, py) : g.moveTo(px, py); }); g.stroke();
      const last = Hs[Hs.length - 1], ex = X(st.T + 1), ey = Y(r.seats[st.party]); g.setLineDash([2, 4]); g.strokeStyle = MUTED; g.lineWidth = 2; g.beginPath(); g.moveTo(X(last.t), Y(last.s)); g.lineTo(ex, ey); g.stroke(); g.setLineDash([]);
      g.fillStyle = pc(st.party); g.beginPath(); g.arc(ex, ey, 9, 0, Math.PI * 2); g.fill(); g.strokeStyle = INK; g.lineWidth = 2; g.stroke();
      g.fillStyle = MUTED; g.font = '600 12px "IBM Plex Mono", monospace'; g.fillText('START', cx0 - 4, cy1 + 22); g.fillText('COUNT', ex - 22, cy1 + 22); }
    const sp = r.spots || []; g.fillStyle = MUTED; g.font = '600 15px "IBM Plex Mono", monospace'; g.fillText('SEATS TO WATCH', bx + 18, by + 270);
    sp.slice(0, 3).forEach((z, k) => { const y = by + 302 + k * 26; g.fillStyle = z.mine ? css('--grn') : css('--alp'); g.font = '800 20px Fraunces, Georgia, serif'; g.fillText(z.mine ? '✓' : '✗', bx + 18, y);
      g.fillStyle = INK; g.font = '20px "Source Serif 4", Georgia, serif'; g.fillText(`${z.n} (${z.st}) · ${z.mine ? 'won' : 'lost'}`, bx + 44, y, bw - 60); });
    if (!sp.length) { g.fillStyle = MUTED; g.font = 'italic 18px "Source Serif 4", Georgia, serif'; g.fillText('None this campaign.', bx + 18, by + 302); }
    g.fillStyle = MUTED; g.font = 'italic 17px "Source Serif 4", Georgia, serif'; g.fillText('Fictional game result from the Australia 2028 Election Simulator. XYZ News is not a real outlet.', 60, 608);
    try { return cv.toDataURL('image/png'); } catch (e) { return null; }
  }
  // where this result sits in the record since 1949, by share of House seats
  function histLine(p, s) { const H = C.HIST || [], name = { ALP: 'Labor', LNP: 'the Coalition' }[p], sh = s / 150;
    if (p === 'GRN') return s > 4 ? `A record: the Greens’ best was 4 House seats, in 2022.` : s === 4 ? 'Equal to the Greens’ record of 4 House seats, set in 2022.' : `The Greens’ record is 4 House seats, set in 2022.`;
    if (p === 'ONP') return s > 0 ? `One Nation had never won a House seat at a general election before. Now it has ${s}.` : 'One Nation has still never won a House seat at a general election.';
    if (!name) return ''; const k = p === 'ALP' ? 2 : 3, f = x => x[k] / x[1], cap = name.charAt(0).toUpperCase() + name.slice(1);
    const hi = H.filter(x => f(x) >= sh), lo = H.filter(x => f(x) <= sh), last = H[H.length - 1][0];
    if (!hi.length) { const b = H.reduce((a, x) => f(x) > f(a) ? x : a); return `${cap}’s biggest share of the House since at least 1949, beating ${b[k]} of ${b[1]} in ${b[0]}.`; }
    if (!lo.length) { const w = H.reduce((a, x) => f(x) < f(a) ? x : a); return `${cap}’s smallest share of the House since at least 1949, below ${w[k]} of ${w[1]} in ${w[0]}.`; }
    const bh = hi[hi.length - 1], wl = lo[lo.length - 1];
    if (bh[0] !== last) return `${cap}’s best result since ${bh[0]}, when it won ${bh[k]} of ${bh[1]} seats.`;
    if (wl[0] !== last) return `${cap}’s worst result since ${wl[0]}, when it won ${wl[k]} of ${wl[1]} seats.`;
    return `Level with ${cap}’s 2025 result.`; }
  function showArticle() { const slot = $('cmpartslot'); if (!slot || !window.APP || !APP.article) return; if (APP.replay && APP.replay.active()) APP.replay.skip();
    APP.govOv = govIndex(); APP.article(); borrow('article', slot); }
  function vVerdict() { let k = 2; return vVerdict0().replace(/Fig\. #/g, () => 'Fig. ' + (k++)); }
  function vVerdict0() {
    const r = st.result, L = E.ldrOf(st), fresh = new Set((st.ach || []).map(a => a.id)), met = A.met(st, r);
    const big = ['ALP', 'LNP', 'ONP', 'GRN', 'IND', 'OTH'].filter(p => r.seats[p] || p !== 'OTH');
    const head = r.gov === st.party ? (st.tier.k === 0 ? 'in a landslide' : r.hung ? 'in a hung parliament' : 'to a majority') : '';
    const hl = st.tier.k === 0 ? st.tier.n : r.gov === st.party ? `${surname(L.name)} wins ${head.replace(/^in |^to /, m => m)}` : st.tier.n;
    const det = achOpen && met.find(a => a.id === achOpen);
    return toolbar() + `<article class="cmp-front verdict" style="--pc:${PC(st.party)}"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">Election special · final result</span></div>
      <div class="kick">${esc(C.PARTIES[st.party].n)} · ${esc(L.name)} · ${st.tier.k < 3 ? 'Tier ' + (st.tier.k + 1) : 'Defeat'}${st.scen && st.scen !== 'std' && E.scenOf(st.scen) ? ' · ' + esc(E.scenOf(st.scen).n) : ''}</div>
      <h2 id="cmp-title" class="fp-hl" tabindex="-1">${esc(st.tier.n)}<span class="v-stamp t${st.tier.k}" aria-hidden="true">${st.tier.k < 3 ? 'Tier ' + (st.tier.k + 1) : 'Defeat'}</span></h2>
      <p class="fp-deck">${esc(L.name)} ${r.gov === st.party ? 'forms government' : C.PARTIES[st.party].cross ? (st.tier.k <= 2 ? 'finishes' : 'is left') : 'falls short'} with ${r.seats[st.party]} seat${r.seats[st.party] === 1 ? '' : 's'}. ${r.hung ? `Hung parliament: ${PN(r.gov)} governs.` : PN(r.gov) + ' majority.'}</p>
      <div class="fp-odds">${big.map(p => `<span class="${p === st.party ? 'me' : ''}" style="--c:${PC(p)}"><b class="num">${r.seats[p]}</b><small>${PN(p)}</small></span>`).join('')}</div>
      ${seatbar(r.seats, st.seats0)}
      ${(() => { const h = histLine(st.party, r.seats[st.party]); return h ? `<p class="fp-hist"><span class="kick">The history books</span> ${esc(h)}</p>` : ''; })()}
      <div class="kick tier-k">How the result is graded ${SiteBar.ib('tier', 'tiers')}</div><ol class="tierrow">${C.tiers[st.party].map(([n], k) => `<li class="${k === st.tier.k ? 'on' : ''}"><small>${k < 3 ? 'Tier ' + (k + 1) : 'Defeat'}</small><b>${esc(n)}</b></li>`).join('')}</ol>
      <div class="fp-cols"><div class="fp-story"><div class="kick">The history books</div><p class="cmp-epi">${esc(epilogue())}</p></div>
        <aside class="fp-side"><div class="kick">The night in numbers</div><dl>
          <dt><span data-info="@tpp">Two-party (Labor v Coalition)</span></dt><dd class="num">${r.tpp.toFixed(1)}–${(100 - r.tpp).toFixed(1)}</dd>
          <dt>Your first preferences</dt><dd class="num">${r.nat[st.party].toFixed(1)}% <small>${sgn(r.nat[st.party] - st.nat0[st.party], 1)}</small></dd>
          ${r.leaderSeat ? `<dt>${esc(r.leaderSeat)}</dt><dd>${r.leaderSeatWon ? 'Held' : 'Lost'}</dd>` : ''}
          <dt><span data-info="@score">Score</span>${st.diff !== 'std' ? ` (${E.DIFF[st.diff].n.toLowerCase()})` : ''}${st.daily ? ' · daily' : ''}${st.iron ? ' · Ironman' : ''}</dt><dd class="num">${st.score || 0}</dd>
          <dt>${SX('unity', 'in')}<span data-info="@unity">Lowest caucus unity</span></dt><dd class="num">${Math.round(st.minUnity)}</dd><dt>${SX('pp', 'in')}<span data-info="@pp">Political Power left</span></dt><dd class="num">${st.pp}</dd></dl></aside></div>
      ${hungOut()}
      <section class="fp-glance">${fig(1, 'The result at a glance', r.sen ? 'Outer ring: the House. Inner ring: the Senate. Solid bands are this election; the faded bands behind them are the chamber before it.' : 'Solid: this election. Faded: 2025.')}${glance({ seats: r.seats, nat: r.nat, central: lastLikely(), tpp: lastLikely() && APP.tpps ? APP.tpps() : null, inner: r.sen ? { ALP: r.sen.ALP, LNP: r.sen.LNP, GRN: r.sen.GRN, ONP: r.sen.ONP, OTH: r.sen.OTH } : null, prevIn: senBefore(), innerLab: 'Senate', chamberCap: r.sen ? 'House, and the Senate inside it' : 'The House' })}</section>
      <section class="fp-report"><div id="cmpartslot"></div></section>
      ${recap('#')}
      ${momentsOut('#')}
      ${inquiryOut()}
      ${spotsOut()}
      ${senateOut()}
      ${pollsWrong()}
      ${statsOut()}
      <section class="fp-honours"><div class="kick">Honours from this run <small>${met.length ? 'tap one to see how you earned it' : ''}</small></div>
        ${met.length ? `<div class="medal-row">${met.map(a => medal(a, { fresh: fresh.has(a.id), run: true })).join('')}</div>${det ? achDetail(det, A.why(det, st, r)) : ''}` : '<p class="cmp-note">None this time. Open Honours to see what each one takes.</p>'}</section>
      ${shareURL ? `<div class="share-modal" role="dialog" aria-label="Your result card"><img src="${shareURL}" alt="Result card: ${esc(L.name)}, ${esc(st.tier.n)}, ${r.seats[st.party]} seats"><p class="cmp-note">Long-press or right-click the card to save it.</p><div class="cmp-endbtns"><button type="button" data-a="copyres">Copy the result as text</button><button type="button" class="ghost" data-a="shareclose">Close</button></div></div>` : ''}
      <div class="cmp-endbtns"><button type="button" data-a="results">See the full results</button><button type="button" class="ghost" data-a="sandbox">Explore it in the sandbox</button><button type="button" class="ghost" data-a="share">Save result as image</button><button type="button" class="ghost" data-a="new">Play again</button><button type="button" class="ghost" data-a="exit">Exit campaign</button></div>
      <p class="cmp-note">The results page now shows your campaign: the map, the XYZ News report and every seat. The sandbox stays locked until you exit, or until you take the campaign into it: that ends this run and opens the sandbox with your campaign’s settings to tweak.</p></article>`;
  }
  // the week in review (after weeks 1–4) and the tour for the coming week
  const STATES = [['NSW', 46], ['VIC', 38], ['QLD', 30], ['WA', 16], ['SA', 10], ['TAS', 5], ['ACT', 3], ['NT', 2]];
  function weekReview() {
    const wk = st.T / 5, w = st.review, ents = st.log.filter(e => e.phase === 'CAMPAIGN' && !e.dec && !e.interrupt && Math.ceil(e.turn / wk) === w);
    if (!ents.length) return '';
    const rank = e => (e.pd || 0) + (e.dn || 0) / 10, best = ents.slice().sort((a, b) => rank(b) - rank(a))[0], worst = ents.slice().sort((a, b) => rank(a) - rank(b))[0];
    const start = st.hist.find(x => x.t === (w - 1) * wk) || st.hist[0], h = st.hist.filter(x => x.t > (w - 1) * wk && x.t <= w * wk), end = h.length ? h[h.length - 1] : start;
    const s0 = start.s, s1 = end.s, d = s1 - s0, tone = d > 0 ? 'up' : d < 0 ? 'dn' : 'flat', L = E.ldrOf(st);
    // the week's seat line
    const pts = [start].concat(h), lo = Math.min(...pts.map(p => p.s)) - 2, hi = Math.max(...pts.map(p => p.s)) + 2, W = 620, H = 150, X = k => 14 + k * (W - 28) / Math.max(1, pts.length - 1), Y = v => H - 16 - (v - lo) / Math.max(1, hi - lo) * (H - 34);
    const line = pts.map((p, k) => `${k ? 'L' : 'M'}${X(k).toFixed(1)} ${Y(p.s).toFixed(1)}`).join(''), area = line + `L${X(pts.length - 1).toFixed(1)} ${H - 10}L${X(0).toFixed(1)} ${H - 10}Z`;
    const maj = 76 >= lo && 76 <= hi ? `<line class="wk-76" x1="8" x2="${W - 8}" y1="${Y(76).toFixed(1)}" y2="${Y(76).toFixed(1)}"/><text class="wk-76t" x="${W - 10}" y="${(Y(76) - 4).toFixed(1)}" text-anchor="end">76 to win</text>` : '';
    const chart = `<svg class="wk-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Your seats in the poll average each day this week, from ${s0} to ${s1}">${maj}<path class="wk-area" d="${area}"/><path class="wk-line" d="${line}" pathLength="1"/>${pts.map((p, k) => `<circle class="wk-dot${k === pts.length - 1 ? ' last' : ''}" cx="${X(k).toFixed(1)}" cy="${Y(p.s).toFixed(1)}" r="${k === pts.length - 1 ? 4.5 : 3}" style="--k:${k}"/>`).join('')}${pts.map((p, k) => `<text class="wk-day" x="${X(k).toFixed(1)}" y="${H - 1}" text-anchor="middle">${k ? 'D' + k : 'Start'}</text>`).join('')}</svg>`;
    const stat = (ic, lab, a, b, fmt) => { const dd = b - a; return `<div class="wk-stat">${SX(ic)}<span><small>${lab}</small><b class="num">${fmt(b)}</b><em class="${dd > 0.05 ? 'up' : dd < -0.05 ? 'dn' : ''}">${dd > 0.05 ? '▲' : dd < -0.05 ? '▼' : '='} ${fmt(Math.abs(dd))} this week</em></span></div>`; };
    const mom = (e, good) => `<div class="wk-mo ${good ? 'up' : 'dn'}">${TM(good ? 2 : -2)}<span><small>${good ? 'Best moment' : 'Worst moment'}</small><b>${esc(e.h || e.t)}</b>${e.pd ? `<em>${e.pd > 0 ? '+' : '−'}${Math.abs(e.pd)} seat${Math.abs(e.pd) === 1 ? '' : 's'}</em>` : ''}</span></div>`;
    const t = (st.targets || []).find(x => x.w === w);
    return `<article class="cmp-front week wk-v2 t-${tone}"><div class="wk-in"><div class="wk-mast"><span class="xyzlogo">XYZ News</span><span class="wk-ed">Weekend edition</span><span class="wk-no">Week ${w} of 5</span></div>
      <h2 id="cmp-title" class="wk-hl" tabindex="-1">${d > 0 ? 'A good week' : d < 0 ? 'A rough week' : 'A week of trench warfare'} for ${esc(surname(L.name))}</h2>
      <div class="wk-hero"><div class="wk-chartbox"><div class="kick">Your seats, day by day</div>${chart}</div>
        <div class="wk-delta"><span class="wk-med">${d > 0 ? '+' : d < 0 ? '−' : '±'}${Math.abs(d)}</span><p><b class="num">${s0} → ${s1}</b> seats in the poll average</p></div></div>
      <div class="wk-stats">${stat('poll', 'Your vote', start.v, end.v, v => (+v).toFixed(1) + '%')}${stat('unity', 'Caucus unity', start.u, end.u, v => Math.round(v))}${stat('mom', 'Momentum', start.m, end.m, v => Math.round(v))}</div>
      <div class="wk-mos">${mom(best, true)}${best !== worst ? mom(worst, false) : ''}</div>
      ${t ? `<div class="wk-tgt ${t.ok ? 'ok' : 'no'}">${SX('tgt')}<span><small>This week’s target</small><b>${esc(targetText(t))}</b>${t.ok ? '<em>+10 Political Power and a point of momentum</em>' : ''}</span><span class="wk-stamp">${t.ok ? 'Met' : 'Missed'}</span></div>` : ''}</div></article>`;
  }

  function vTour() {
    const wk = st.T / 5, nextW = Math.min(5, Math.ceil(st.turn / wk));
    const lead = {}, tot = {}, spot = {}; (st.poll.central || []).forEach((g, i) => { const k = APP.D.seats[i].st; tot[k] = (tot[k] || 0) + 1; if (C.PARTIES[st.party].g.includes(g)) lead[k] = (lead[k] || 0) + 1; }); (st.spot || []).forEach(x => { const k = APP.D.seats[x.i].st; spot[k] = (spot[k] || 0) + 1; });
    return toolbar() + `<div class="cmp-game">${hud()}</div>` + (st.review ? weekReview() : '') + `<div class="tour-grid"><section class="cmp-tour tv2" style="--ec:${PC(st.party)}"><div class="tv-in"><header class="tv-hd"><span class="ev-ico" aria-hidden="true"><svg viewBox="0 0 24 24">${EVI.pin}</svg></span><div><div class="kick"><span class="tv-wk">Week ${nextW} of 5</span>The tour</div><h3 class="tour-h" tabindex="-1">Where does the leader go this week?</h3></div></header><div class="tv-body">
      <p class="q">Pick two states. Your state-level gains there count half again, and you build a little each day you are there. A hard pace adds a point of momentum a day but burns stamina (now ${Math.round(st.stamina)}).</p>
      <div class="tour-states">${STATES.map(([k, n]) => `<button type="button" class="tst${tourSel.includes(k) ? ' on' : ''}" data-tour="${k}" aria-pressed="${tourSel.includes(k)}" style="--pc:${PC(st.party)}"><b>${k}</b><small>${n} seats</small>${st.iron ? '' : `<small class="tst-lead">Lead ${lead[k] || 0}</small>`}${spot[k] ? `<em class="tst-w" title="${spot[k]} of your seats to watch" aria-label="${spot[k]} of your seats to watch">${spot[k]}</em>` : ''}</button>`).join('')}</div>
      ${Object.keys(spot).length ? `<p class="tour-note"><em class="tst-w-k" aria-hidden="true"></em>Red badge: how many of your seats to watch are in that state.</p>` : ''}<div class="tour-pace"><button type="button" class="seg${!tourHard ? ' on' : ''}" data-pace="0" aria-pressed="${!tourHard}">Normal pace</button><button type="button" class="seg${tourHard ? ' on' : ''}" data-pace="1" aria-pressed="${tourHard}">Hard pace</button></div>
      <button type="button" class="cmp-go" data-a="tourgo"${tourSel.length === 2 ? '' : ' disabled'}>${tourSel.length === 2 ? `Tour ${tourSel.join(' and ')}` : `Pick ${2 - tourSel.length} more state${tourSel.length === 1 ? '' : 's'}`} <span class="go-ar" aria-hidden="true">→</span></button></div></div></section>${st.iron ? '' : `<section class="tour-map tv2" style="--ec:${PC(st.party)}"><div class="cmp-fighead"><strong>Pick on the map</strong><small>Tap a seat to choose its state. Coloured by who leads in the latest poll.</small></div><div id="cmpmapslot"></div></section>`}</div>`;
  }
  // election night: the sandbox's own results-night replay (clock, speed, live feed, skip), borrowed onto this page
  // borrow a sandbox element into the campaign page and put it back where it came from
  const BORROW = {};
  function borrow(id, slot) { const el = document.getElementById(id); if (!el || !slot) return; if (!BORROW[id]) BORROW[id] = { el, parent: el.parentNode, next: el.nextSibling }; slot.appendChild(el); }
  function giveBack() { Object.keys(BORROW).forEach(id => { const b = BORROW[id]; if (b.next && b.next.parentNode === b.parent) b.parent.insertBefore(b.el, b.next); else b.parent.appendChild(b.el); delete BORROW[id]; }); if (window.APP) APP.noWhatIf = 0; }
  function stopCount() { if (counting) { clearInterval(counting); counting = null; } }
  // the government after a hung parliament is settled, so the infobox and the report name the right side
  function govIndex() { const r = st && st.result; if (!r || !r.gov || !r.hung || !r.likely) return null; const P = APP.P, c = new Array(P.length).fill(0); r.likely.forEach(g => c[g]++);
    const ix = P.map((_, j) => j).filter(j => E.keyOf(j) === r.gov && j !== 4).sort((a, b) => c[b] - c[a]); return ix.length && c[ix[0]] ? ix[0] : null; }
  let countRun = null;
  function vCount() {
    return toolbar() + `<article class="cmp-front night"><div class="fp-mast"><span class="xyzlogo">XYZ News</span><span class="fp-ed">Election night · live</span></div>
      <h2 id="cmp-title" class="fp-hl sm" tabindex="-1">The count</h2><p class="fp-deck" id="cntclock">Seats are called as each state’s polls close, east to west. Change the speed or skip ahead in the results panel.</p>
      <p class="cnt-proj" id="cntproj" role="status" hidden></p><div id="cmpmapslot" class="count-map live"></div>${st.spot && st.spot.length ? `<div class="cnt-spots"><div class="kick">Seats to watch</div><ul id="cntspots" aria-live="polite">${st.spot.map(x => `<li data-i="${x.i}"><b>${esc(x.n)}</b> <small>${x.st}</small> <span>Counting…</span></li>`).join('')}</ul></div>` : ''}
      <div class="cmp-endbtns"><button type="button" data-a="verdictgo" id="cntgo" hidden>See the verdict →</button></div></article>`;
  }
  function playCount() {
    const slot = $('cmpmapslot'); if (!slot || !st.result || !st.result.likely || !APP.replay) { view = viewFor(); render(); return; }
    borrow('map', slot); APP.noWhatIf = 1; stopCount();
    if (!APP.replay.active() && countRun !== st.result) APP.replay.start();
    countRun = st.result;
    const LK = st.result.likely, key = E.keyOf, seen = new Set(); let projected = false;
    const PNm = p => ({ ALP: 'Labor', LNP: 'Coalition', ONP: 'One Nation', GRN: 'Greens', IND: 'Independent', OTH: 'Other' }[p] || p);
    const tick = () => { const live = APP.replay.active(), done = live ? APP.replay.done() : null, tally = { ALP: 0, LNP: 0, ONP: 0, GRN: 0, IND: 0, OTH: 0 };
      LK.forEach((g, i) => { if (!done || done.has(i)) tally[key(g)]++; });
      (st.spot || []).forEach(x => { if (seen.has(x.i) || (done && !done.has(x.i))) return; seen.add(x.i); const li = document.querySelector('#cntspots li[data-i="' + x.i + '"]'); if (!li) return;
        const k = key(LK[x.i]); li.className = k === st.party ? 'up' : 'dn'; li.querySelector('span').textContent = `${PN(k)} ${x.inc === k ? 'hold' : 'gain'}`; });
      if (!projected) { const top = Object.keys(tally).find(q => tally[q] >= 76); if (top) { projected = true; const pj = $('cntproj'); if (pj) { pj.hidden = false; pj.className = 'cnt-proj ' + (top === st.party ? 'up' : 'dn'); pj.innerHTML = `<span class="kick">XYZ News projects</span> <b>${PNm(top)} majority</b>${done ? ` <small>with ${150 - done.size} seats still to call</small>` : ''}`; } if (live) sfx(top === st.party ? 'good' : 'bad'); } }
      if (live) return;
      stopCount(); const c = $('cntclock'); if (c) c.textContent = 'The count is in. Every seat has been called.';
      const pj = $('cntproj'); if (pj && pj.hidden) { pj.hidden = false; pj.className = 'cnt-proj'; pj.innerHTML = '<span class="kick">XYZ News projects</span> <b>A hung parliament</b> <small>no party has 76 seats</small>'; }
      const g = $('cntgo'); if (g) g.hidden = false; sfx(st.result.gov === st.party ? 'good' : 'bad'); };
    counting = setInterval(tick, 250); tick();
  }
  function vHall() {
    const h = E.hall().filter(x => C.leaders.some(l => l.id === x.leader)), d = E.daily(), days = Object.keys(d).sort().reverse().slice(0, 7);
    return toolbar() + mast('Campaign mode · Hall of fame', 'Your past campaigns', 'Saved in this browser only. Scores: 10 a seat, a bonus for your tier and honours, scaled by difficulty.') + `<button type="button" class="cmp-link back" data-a="back">← Back</button>`
      + (() => { const by = {}; h.forEach(x => { if (x.ab) return; const o = by[x.leader] = by[x.leader] || { n: 0, k: 9, seats: 0, score: 0, gov: 0 }; o.n++; o.k = Math.min(o.k, x.k); o.seats = Math.max(o.seats, x.seats || 0); o.score = Math.max(o.score, x.score || 0); if (x.gov) o.gov++; });
          const rows = C.leaders.filter(L => by[L.id]).sort((a, b) => by[a.id].k - by[b.id].k || by[b.id].score - by[a.id].score), MR = ['I · top tier', 'II · second tier', 'III · third tier'];
          return rows.length ? `<section class="ach-cat"><div class="cmp-fighead"><strong>Leader mastery</strong><small>${rows.length} of ${C.leaders.length} leaders played</small></div><table class="cmp-hof mastery"><thead><tr><th scope="col">Leader</th><th scope="col">Best tier</th><th scope="col" class="num">Runs</th><th scope="col" class="num">Wins</th><th scope="col" class="num">Best seats</th><th scope="col" class="num">Best score</th></tr></thead><tbody>${rows.map(L => { const o = by[L.id];
            return `<tr style="--pc:${PC(L.party)}"><th scope="row"><i class="mq-dot" aria-hidden="true"></i>${esc(L.name)}</th><td><span class="lt-rib m${Math.min(3, o.k)}" aria-hidden="true">${o.k <= 2 ? ['I', 'II', 'III'][o.k] : '·'}</span> ${o.k <= 2 ? MR[o.k].split(' · ')[1] : 'played'}</td><td class="num">${o.n}</td><td class="num">${o.gov}</td><td class="num">${o.seats}</td><td class="num"><b>${o.score}</b></td></tr>`; }).join('')}</tbody></table></section>` : ''; })()
      + (days.length ? `<section class="ach-cat"><div class="cmp-fighead"><strong>Daily challenge bests</strong></div><table class="cmp-hof"><tbody>${days.map(k => `<tr><th scope="row">${k}</th><td>${esc((C.leaders.find(l => l.id === d[k].leader) || {}).name || '')}</td><td class="num">${d[k].seats} seats</td><td class="num"><b>${d[k].score}</b></td></tr>`).join('')}</tbody></table></section>` : '')
      + `<section class="ach-cat"><div class="cmp-fighead"><strong>Every campaign</strong><small>${h.length} played</small></div>${h.length ? `<table class="cmp-hof"><thead><tr><th scope="col">Date</th><th scope="col">Leader</th><th scope="col">Result</th><th scope="col" class="num">Seats</th><th scope="col" class="num">Score</th></tr></thead><tbody>${h.map(x => `<tr><th scope="row">${new Date(x.at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}${x.daily ? ' <em class="tagp">daily</em>' : ''}${x.diff && x.diff !== 'std' ? ` <em class="tagp">${E.DIFF[x.diff].n.toLowerCase()}</em>` : ''}${x.scen && x.scen !== 'std' && E.scenOf(x.scen) ? ` <em class="tagp">${esc(E.scenOf(x.scen).n.toLowerCase())}</em>` : ''}${x.iron ? ' <em class="tagp iron">ironman</em>' : ''}</th><td><i class="sw" style="background:${PC(x.party)}"></i>${esc((C.leaders.find(l => l.id === x.leader) || {}).name || '')}</td><td>${esc(x.tier)}</td><td class="num">${x.seats}</td><td class="num"><b>${x.score}</b></td></tr>`).join('')}</tbody></table>` : '<p class="cmp-note">No campaigns finished yet.</p>'}</section>` + profilePanel();
  }
  function vAch() {
    const g0 = A.get(), keep = a => (achF === 'all' || (achF === 'got' ? !!g0[a.id] : achF === 'not' ? !g0[a.id] : achF === 'hard' ? a.hard : true)) && (!achL || a.leader === achL), shown = A.list.filter(keep);
    const cats = [...new Set(shown.map(a => a.cat))];
    const ldrs = C.leaders.filter(L => A.list.some(a => a.leader === L.id));
    const filt = `<div class="ach-filter" role="group" aria-label="Filter honours">${[['all', 'All'], ['got', 'Earned'], ['not', 'Not earned'], ['hard', 'Hard']].map(([k, n]) => `<button type="button" class="seg${achF === k ? ' on' : ''}" data-af="${k}" aria-pressed="${achF === k}">${n}</button>`).join('')}
      <label class="af-l"><span class="sr">Leader</span><select class="cs-sel" id="achl"><option value="">Any leader</option>${ldrs.map(L => `<option value="${L.id}"${achL === L.id ? ' selected' : ''}>${esc(L.name)}</option>`).join('')}</select></label><small class="af-n">${shown.length} of ${A.list.length} shown</small></div>`;
    const rm = A.rim();
    return toolbar() + mast('Campaign mode · Honours', `${achCount()} of ${A.list.length} earned`, 'Saved in this browser only. Tap any honour to see what it takes, and how you earned it.') + `<button type="button" class="cmp-link back" data-a="back">← Back</button>`
      + `<div class="rim-bar"><span class="medal ${rm.cls}"><b class="mq rim-n${String(rm.pts >= 1000 ? (rm.pts / 1000).toFixed(1) + 'k' : rm.pts).length}">${rm.pts >= 1000 ? (rm.pts / 1000).toFixed(rm.pts >= 10000 ? 0 : 1) + 'k' : rm.pts}</b></span><span><b>${rm.pts} points · ${esc(rm.n)}</b><small>Honours are worth 10 points, hard ones 25. ${rm.next ? `${rm.next.at - rm.pts} more for the ${esc(rm.next.n.toLowerCase())}.` : 'Every rim unlocked.'}</small></span><i class="meter"><i style="width:${Math.min(100, rm.pts / rm.max * 100)}%"></i>${A.RIMS.slice(1).map(r => `<i class="tick" style="left:${r[0] / rm.max * 100}%"></i>`).join('')}</i></div>`
      + filt + (shown.length ? '' : '<p class="cmp-note">No honours match this filter.</p>')
      + cats.map((c, k) => { const items = shown.filter(a => a.cat === c), det = items.find(a => a.id === achOpen), part = items[0].part, prev = k ? shown.find(a => a.cat === cats[k - 1]).part : null;
        const ph = part && part !== prev ? `<h3 class="ach-part">${esc(part)}<small>${(() => { const its = shown.filter(a => a.part === part); return its.filter(a => A.get()[a.id]).length + ' of ' + its.length; })()}</small></h3>` : '';
        return ph + `<section class="ach-cat"><div class="cmp-fighead"><strong>${c}</strong><small>${items.filter(a => A.get()[a.id]).length} of ${items.length}</small></div><div class="medal-row">${items.map(a => medal(a)).join('')}</div>${det ? achDetail(det) : ''}</section>`; }).join('')
      + collection();
  }
  // every leader's signature and cursed answers: the ones you have tried, and how many are left
  function collection() { const got = E.loGet(), seen = new Set(), all = (C.LO || []).filter(o => !seen.has(o.lo) && seen.add(o.lo)), n = all.filter(o => got[o.lo]).length;
    const MILE = ['', 'the launch', 'the costings', 'the Press Club', 'the debate', 'the final pitch'], side = L => L.sb === 'Nationals' ? 'NAT' : L.party;
    const SIDES = [['ALP', 'Labor'], ['LNP', 'Coalition'], ['NAT', 'Nationals'], ['ONP', 'One Nation'], ['GRN', 'Greens'], ['IND', 'Teal independents']];
    const by = C.leaders.map(L => ({ L, os: all.filter(o => o.only === L.id).sort((a, b) => (a.cursed ? 1 : 0) - (b.cursed ? 1 : 0)) })).filter(x => x.os.length);
    const ldr = ({ L, os }) => `<div class="lo-ldr" style="--pc:${PC(L.party)}"><b>${esc(L.name)}</b><small class="lo-n">${os.filter(o => got[o.lo]).length} of ${os.length}</small><ul>${os.map(o => `<li class="${got[o.lo] ? 'got' : ''}${o.cursed ? ' cursed' : ''}"><small>${o.cursed ? 'Cursed' : 'Signature'} · ${(() => { const m = /:m(\d)$/.exec(o.lo); return m ? MILE[+m[1]] : 'one card'; })()}</small>${got[o.lo] ? esc(o.x) : '<i>Not tried yet</i>'}</li>`).join('')}</ul></div>`;
    return `<h3 class="ach-part">Leader-only answers<small>${n} of ${all.length} tried</small></h3><p class="cmp-note">Each leader has a signature answer and a cursed one (off-brand, or a big gamble), on one of the five milestone days. Grouped by side; leaders you can pick straight away come first.</p>`
      + SIDES.map(([k, name]) => { const g = by.filter(x => side(x.L) === k); if (!g.length) return ''; const os = g.flatMap(x => x.os), m = os.filter(o => got[o.lo]).length;
        return `<details class="ach-cat lo-col"${m ? ' open' : ''}><summary class="cmp-fighead"><strong>${name}</strong><small>${m} of ${os.length} tried · ${g.length} leader${g.length > 1 ? 's' : ''}</small></summary><div class="lo-grid">${g.map(ldr).join('')}</div></details>`; }).join(''); }

  function applyLF() { const q = ldrQ.trim().toLowerCase(), mine = prefs.party === 'own', act = !!q || ldrF !== 'all' || mine; let n = 0;
    inn.querySelectorAll('.cmp-ltile').forEach(b => { const ok = (!q || (b.dataset.q || '').includes(q)) && (ldrF === 'all' || (b.dataset.tags || '').split(' ').includes(ldrF)) && (!mine || (b.dataset.tags || '').split(' ').includes('owned')); b.hidden = !ok; if (ok) n++; });
    inn.querySelectorAll('.lt-more').forEach(d => { const vis = d.querySelectorAll('.cmp-ltile:not([hidden])').length; if (act) d.open = !!vis; d.hidden = act && !vis; const cnt = d.querySelector('.lo-n'); if (cnt) cnt.textContent = `${vis} leader${vis === 1 ? '' : 's'}`; d.querySelectorAll('.lt-grp').forEach(h => { let x = h.nextElementSibling, any = false; while (x && !x.classList.contains('lt-grp')) { if (!x.hidden) any = true; x = x.nextElementSibling; } h.hidden = !any; }); });
    inn.querySelectorAll('.cmp-pcol > .lt-grp').forEach(h => { let x = h.nextElementSibling, any = false; while (x && x.classList.contains('cmp-ltile')) { if (!x.hidden) any = true; x = x.nextElementSibling; } if (h.classList.contains('lt-inp') && x && x.classList.contains('lt-grp')) any = any || !![...h.parentNode.querySelectorAll(':scope > .cmp-ltile')].some(t => !t.hidden); h.hidden = !any; });
    const one = !q && !!C.PARTIES[prefs.party]; const pc = inn.querySelector('.cmp-pcols'); if (pc) pc.classList.toggle('one', one);
    inn.querySelectorAll('.cmp-pcol').forEach(c => { c.hidden = !c.querySelector('.cmp-ltile:not([hidden])') || (one && c.dataset.p !== prefs.party); });
    if (one) n = inn.querySelectorAll('.cmp-pcol:not([hidden]) .cmp-ltile:not([hidden])').length;
    inn.querySelectorAll('.lf-tab').forEach(t => t.classList.toggle('dim', !!q));
    const el = $('lfn'); if (el) el.textContent = act ? `${n} leader${n === 1 ? '' : 's'} shown${q ? ' across all parties' : ''}` : ''; }
  function render() {
    if (view !== 'select' && view !== 'ach' && view !== 'board' && view !== 'hall' && view !== 'binder' && view !== 'compare' && !st) view = 'select';
    if (MAPEL && MAPEL.parentNode) MAPEL.parentNode.removeChild(MAPEL);
    giveBack(); if (view !== 'count') stopCount();
    if (view === 'game' && !fb && viewFor() === 'tour') { view = 'tour'; if (!tourSel.length) { tourSel = (st.tour || []).slice(); tourHard = !!st.tourHard; } }
    hideTip(); const sameView = inn.classList.contains('v-' + view), prevV = sameView ? snapVals() : null, prevKey = inn.dataset.key || '';
    inn.className = 'cmp-in v-' + view;
    clearDoor();
    inn.innerHTML = view === 'select' ? vSelect() : view === 'binder' && window.CAMPAIGN_COLL ? window.CAMPAIGN_COLL.renderBinder(collCtx()) : view === 'compare' && window.CAMPAIGN_COLL ? window.CAMPAIGN_COLL.renderCompare(collCtx()) : view === 'ach' ? vAch() : view === 'hall' ? vHall() : view === 'board' ? vBoard() : view === 'failed' ? vFailed() : view === 'night' ? vNight() : view === 'count' ? vCount() : view === 'tour' ? vTour() : view === 'hung' ? vHung() : view === 'verdict' ? vVerdict() : vGame();
    if (window.SiteBar) SiteBar.infoize(inn);
    root.dataset.rim = A.rim().cls; root.classList.toggle('nomotion', !prefs.motion);
    const key = view + '|' + (view === 'game' ? (fb ? 'fb' + (st.log || []).length : 'c' + st.turn + (st.cur || '')) : '');
    inn.dataset.key = key; if (prefs.motion) { if (prevV) tweenVals(prevV); if (key !== prevKey) enter(sameView); }
    if (view === 'game') { paintMap(); startDoor(); animVote(); if (fb && prefs.motion) inn.querySelectorAll('.clip-flips .pd b.num').forEach(countUp); } if (view === 'tour') paintMap(); if (view === 'count') playCount(); if (view === 'verdict') { showArticle(); if (prefs.motion && key !== prevKey) inn.querySelectorAll('.fp-odds b.num').forEach((el, i) => setTimeout(() => countUp(el, 900), 250 + i * 60)); } if (view === 'board') fillBoard(); if (view === 'select') { applyLF(); if (key !== prevKey) deal(); }
    lockbar();
  }

  // the tour screen updates in place when you pick a state: no redraw of the top bar or the card
  function tourUpdate() { inn.querySelectorAll('.tst[data-tour]').forEach(x => { const on = tourSel.includes(x.dataset.tour); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
    const go = inn.querySelector('[data-a="tourgo"]'); if (go) { go.disabled = tourSel.length !== 2; go.innerHTML = `${tourSel.length === 2 ? `Tour ${tourSel.join(' and ')}` : `Pick ${2 - tourSel.length} more state${tourSel.length === 1 ? '' : 's'}`} <span class="go-ar" aria-hidden="true">→</span>`; }
    if (MAPEL) MAPEL.querySelectorAll('.cc').forEach(p => p.classList.toggle('dimst', !!tourSel.length && !tourSel.includes(p.dataset.st))); }
  // ---- smooth updates: bars and numbers slide from their last values instead of snapping
  const TW_W = ['.cmp-hud .meter > i:first-child', '.cmp-hud .bm > i', '.gl-ledger .lg-track i.now', '.tgt-bar > i'], TW_F = '.sb-track > i', TW_N = ['.cmp-hud .hs:not(.vote) b.num', '.cmp-seatnums b.num', '.cmp-hud .hm b.num'];
  function snapVals() { const o = { w: {}, f: {}, n: {} };
    TW_W.forEach(sel => inn.querySelectorAll(sel).forEach((el, i) => { o.w[sel + i] = [el.style.width, el.style.left]; }));
    inn.querySelectorAll(TW_F).forEach(el => { o.f[(el.title || '').replace(/ \d+$/, '')] = el.style.flexGrow || el.style.flex; });
    TW_N.forEach(sel => inn.querySelectorAll(sel).forEach((el, i) => { const t = el.firstChild && el.firstChild.nodeType === 3 ? el.firstChild.nodeValue : ''; o.n[sel + i] = t; }));
    return o; }
  function tweenVals(o) {
    const mv = []; TW_W.forEach(sel => inn.querySelectorAll(sel).forEach((el, i) => { const p = o.w[sel + i]; if (!p) return; const w = el.style.width, l = el.style.left; if (p[0] === w && p[1] === l) return; mv.push([el, w, l]); el.style.transition = 'none'; if (p[0]) el.style.width = p[0]; if (p[1]) el.style.left = p[1]; }));
    const fl = []; inn.querySelectorAll(TW_F).forEach(el => { const p = o.f[(el.title || '').replace(/ \d+$/, '')], now = el.style.flexGrow || el.style.flex; if (p == null || p === now) return; fl.push([el, now]); el.style.transition = 'none'; el.style.flex = p; });
    if (mv.length || fl.length) { void inn.offsetWidth; mv.forEach(([el, w, l]) => { el.style.transition = 'width .7s cubic-bezier(.2,.7,.2,1), left .7s cubic-bezier(.2,.7,.2,1)'; el.style.width = w; if (l) el.style.left = l; });
      fl.forEach(([el, f]) => { el.style.transition = 'flex-grow .8s cubic-bezier(.2,.7,.2,1)'; el.style.flex = f; }); }
    TW_N.forEach(sel => inn.querySelectorAll(sel).forEach((el, i) => { const p = o.n[sel + i], tn = el.firstChild; if (!p || !tn || tn.nodeType !== 3) return; const now = tn.nodeValue; if (p === now) return;
      const num = t => { const m = /^([^\d−-]*)([−-]?)([\d.]+)(.*)$/.exec(t); return m ? { pre: m[1], v: (m[2] ? -1 : 1) * parseFloat(m[3]), dp: (m[3].split('.')[1] || '').length, post: m[4], sg: m[2] } : null; };
      const a = num(p), b = num(now); if (!a || !b || a.pre !== b.pre) return; const t0 = performance.now(), d = 700;
      const f = t => { const k = Math.min(1, (t - t0) / d), v = a.v + (b.v - a.v) * (1 - Math.pow(1 - k, 3)); tn.nodeValue = k < 1 ? b.pre + (v < 0 ? '−' : '') + Math.abs(v).toFixed(b.dp) + b.post : now; if (k < 1 && tn.isConnected) requestAnimationFrame(f); };
      el.classList.add('tick'); setTimeout(() => el.classList.remove('tick'), 750); requestAnimationFrame(f); })); }
  // a number counts up from zero to its shown value (keeps any sign, prefix and suffix)
  function countUp(el, d) { const tn = el.firstChild; if (!tn || tn.nodeType !== 3) return; const t = tn.nodeValue, m = /^([^\d]*?)([\d.,]+)(.*)$/.exec(t); if (!m) return;
    const end = parseFloat(m[2].replace(/,/g, '')), dp = (m[2].split('.')[1] || '').length, t0 = performance.now(); d = d || 650; if (!end) return;
    const f = now => { const k = Math.min(1, (now - t0) / d), v = end * (1 - Math.pow(1 - k, 3)); tn.nodeValue = k < 1 ? m[1] + v.toFixed(dp) + m[3] : t; if (k < 1 && tn.isConnected) requestAnimationFrame(f); }; tn.nodeValue = m[1] + (0).toFixed(dp) + m[3]; requestAnimationFrame(f); }
  // a new card, news report or screen eases in; the top bar stays put
  function enter(sameView) { const t = sameView ? inn.querySelector('.cmp-left > :first-child, .cmp-left > .cmp-tomorrow + .cmp-card') : inn; if (!t) return; t.classList.remove('enter'); void t.offsetWidth; t.classList.add('enter'); }
  // the doorstop clock: ten seconds, then the walk-away answer
  function clearDoor() { if (doorT) { clearInterval(doorT); doorT = null; } }
  function startDoor() { if (fb || !st || st.cur !== 'DOOR' || !prefs.timers) return; const c = E.cardFor(st); if (!c || !c.door) return; const to = c.opts.find(o => o.timeout); let left = 10, t0 = Date.now();
    const arc = inn.querySelector('.dt-arc'), box = inn.querySelector('.door-timer'); if (arc) { arc.style.transition = 'none'; arc.style.strokeDashoffset = '0'; void arc.getBoundingClientRect(); arc.style.transition = 'stroke-dashoffset 10s linear'; arc.style.strokeDashoffset = '106.8'; }
    let shown = 10; doorT = setInterval(() => { left = 10 - Math.floor((Date.now() - t0) / 1000); const el = $('doorsec'); if (el) el.textContent = Math.max(0, left);
      if (left !== shown) { shown = left; if (box) box.classList.toggle('hot', left <= 3); if (left <= 3 && left > 0) sfx('tick'); } if (left <= 0) { clearDoor(); if (st && st.cur === 'DOOR' && !fb && to) after(E.choose(st, to.i)); } }, 250); }
  // the vote counts up or down to its new value after a turn
  function animVote() { const el = inn.querySelector('.hs.vote .anim'); if (!el || !fb) return; const a = +el.dataset.from, b = +el.dataset.to; if (!prefs.motion || a === b || isNaN(a)) return;
    const t0 = performance.now(), d = 700; const f = now => { const k = Math.min(1, (now - t0) / d), v = a + (b - a) * (1 - Math.pow(1 - k, 3)); el.textContent = v.toFixed(1); if (k < 1 && el.isConnected) requestAnimationFrame(f); }; requestAnimationFrame(f); }
  // ---- actions
  const focusTitle = () => { const h = inn.querySelector('.clip-hl, .cmp-card h3, .tour-h, #cmp-title'); if (h) { if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } };
  function start(id) { closePack(); lastVotes = 0; if (window.APP) APP.govOv = null; E.clear(); st = E.newRun(id, { diff: prefs.mode === 'daily' ? 'std' : prefs.diff, daily: prefs.mode === 'daily', scen: prefs.scen, iron: prefs.mode === 'iron' }); codeMsg = ''; negOff = {}; negBack = null; negAsk = 1; tourSel = []; tourHard = false; sfx(); fb = null; achOpen = null; view = 'game'; E.save(st); render(); root.scrollTop = 0; focusTitle(); }
  function after(entry) { clearDoor(); if (!entry) return; fb = entry; sfx('page'); setTimeout(() => sfx(entry.phase === 'SPILL' && st.phase !== 'SPILL' ? 'gavel' : entry.tone === 'up' ? 'good' : entry.tone === 'dn' ? 'bad' : ''), 260); (entry.ach || []).forEach(toast); render(); const c = inn.querySelector('.cmp-clip'); if (c && c.getBoundingClientRect().top < 0) c.scrollIntoView({ block: 'start' }); focusTitle(); }
  function night() { view = 'night'; render(); const t0 = Date.now(), hold = prefs.motion ? 2300 : 0; nightClock();
    E.election(st, s => { const go = () => { st = s; achOpen = null; negOff = {}; negBack = null; negAsk = 1; view = 'count'; render(); root.scrollTop = 0; focusTitle(); }; setTimeout(go, Math.max(0, hold - (Date.now() - t0))); }); }
  // the last ten seconds before 6pm, then the bell
  function nightClock() { const box = inn.querySelector('.cmp-front.night'), t = inn.querySelector('.nc-t'); if (!box || !t) return; if (!prefs.motion) { box.classList.add('closed'); t.firstChild.nodeValue = '6:00:00'; return; }
    const t0 = performance.now(), f = now => { const k = Math.min(1, (now - t0) / 1500), sec = 50 + Math.floor(k * 10); t.firstChild.nodeValue = sec >= 60 ? '6:00:00' : `5:59:${sec}`; box.style.setProperty('--sec', sec);
      if (k < 1 && t.isConnected) requestAnimationFrame(f); else { box.classList.add('closed'); sfx('bell'); } }; requestAnimationFrame(f); }
  function exitRun() { if (window.APP) APP.govOv = null; E.exit(st); st = null; fb = null; achOpen = null; view = 'select'; document.body.classList.remove('cmp-lock'); bar.hidden = true; if (open) render(); }
  // ---- leaderboards: today's challenge, Ironman, each difficulty and each leader
  let lbTab = 'daily', lbLdr = null;
  const LBT = [['daily', 'Today’s challenge'], ['iron', 'Ironman'], ['diff:easy', 'Easy'], ['diff:std', 'Standard'], ['diff:hard', 'Hard'], ['ldr', 'By leader']];
  function lbKey() { return lbTab === 'daily' ? 'daily:' + E.today() : lbTab === 'ldr' ? 'ldr:' + (lbLdr || C.leaders[0].id) : lbTab; }
  function vBoard() { lbLdr = lbLdr || C.leaders[0].id;
    return toolbar() + mast('Australia 2028 · The campaign', 'Leaderboards', 'Every finished campaign posts your best score on its boards: today’s challenge, Ironman, its difficulty and its leader.')
      + `<section class="lb"><div class="lb-tabs" role="tablist">${LBT.map(([k, n]) => `<button type="button" role="tab" class="lb-tab${lbTab === k ? ' on' : ''}" data-lb="${k}" aria-selected="${lbTab === k}">${n}</button>`).join('')}</div>
        ${lbTab === 'ldr' ? `<label class="lb-pick"><span class="kick">Leader</span><select id="lbldr" class="cs-sel">${C.leaders.map(L => `<option value="${L.id}"${L.id === lbLdr ? ' selected' : ''}>${esc(L.name)} (${esc(C.PARTIES[L.party].n)})</option>`).join('')}</select></label>` : ''}
        <p class="lb-note" id="lbnote" role="status">Loading the board…</p><ol class="lb-list" id="lblist"></ol></section>`
      + profilePanel(); }
  // the CheatMachine phrase: every honour (so every opening unlocks) and every leader-only answer marked as tried
  function unlockAll() { const KA = 'es2028_campaign_achievements_v1', KL = 'es2028_campaign_lo_v1', now = new Date().toISOString();
    try { const got = JSON.parse(localStorage.getItem(KA) || '{}') || {}; A.list.forEach(x => { if (!got[x.id]) got[x.id] = { at: now, by: 'cheat', w: 'Unlocked with CheatMachine' }; }); localStorage.setItem(KA, JSON.stringify(got)); } catch (e) {}
    try { const lo = JSON.parse(localStorage.getItem(KL) || '{}') || {}; (C.LO || []).forEach(o => { if (!lo[o.lo]) lo[o.lo] = Date.now(); }); localStorage.setItem(KL, JSON.stringify(lo)); } catch (e) {}
    const c = coll(); C.leaders.forEach(L => { if (!c.owned[L.id]) c.owned[L.id] = Date.now(); }); collSave(c); }
  // the ResetProfile phrase: clears all saved campaign progress, honours, runs, answers, unlocked cards and active run
  function resetProfile() {
    ['es2028_campaign_achievements_v1', 'es2028_campaign_hof_v1', 'es2028_campaign_daily_v1', 'es2028_campaign_lo_v1', CKEY, 'es2028_campaign_run_v2'].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
    st = null; fb = null; achOpen = null; prefs.scen = 'std'; savePrefs();
    const note = $('frnote'); if (note) note.hidden = true;
  }
  let cheatsOpen = false;
  const CHEATS = [
    ['PackRippers', 'Unlocks every leader pack so you can open all remaining packs on the Choose your leader page.'],
    ['CheatMachine', 'Unlocks everything: all honours, all leaders, every opening scenario and every leader-only answer.'],
    ['ResetProfile', 'Clears all honours, Hall of Fame runs, daily results, leader-only answers, unlocked cards and any saved run back to a fresh start.']
  ];
  function profilePanel() { const h = E.hall().filter(x => !x.ab), d = Object.keys(E.daily()).length, best = h.reduce((m, x) => Math.max(m, x.score || 0), 0);
    return `<section class="pf"><div class="cmp-fighead"><strong>Your profile</strong><small>Your honours, Hall of Fame, daily results and leader-only answers live in this browser. Save them to keep a copy or move to another device.</small></div>
      <div class="pf-card"><div class="pf-side"><span class="pf-h"><button type="button" class="pf-tick" data-a="pfcheats" aria-expanded="${cheatsOpen ? 'true' : 'false'}" aria-controls="pfcheats" aria-label="Show profile cheats">${ICON('check')}</button><b>Save your profile</b></span>
          <div class="pf-stats"><span><b class="num">${achCount()}<small>/${A.list.length}</small></b>honours</span><span><b class="num">${h.length}</b>campaigns</span><span><b class="num">${d}</b>daily challenges</span><span><b class="num">${best.toLocaleString()}</b>best score</span></div>
          <div class="pf-acts"><button type="button" data-a="pfdl">Download profile (.txt)</button><button type="button" class="ghost" data-a="pfcopy">Copy profile code</button></div>
          <p class="cmp-note">The file and the code hold the same thing. Keep either somewhere safe.</p></div>
        <span class="pf-or" aria-hidden="true"></span>
        <div class="pf-side"><span class="pf-h">${ICON('flip')}<b>Load a profile</b></span>
          <textarea id="pfcode" rows="3" spellcheck="false" placeholder="Paste a code starting ES28-PROFILE-1:" aria-label="Profile code"></textarea>
          <div class="pf-acts"><label class="pf-file">Open a .txt file<input type="file" id="pffile" accept=".txt,text/plain"></label><button type="button" data-a="pfload">Load profile</button></div>
          <p class="cmp-note">Loading adds to what this browser already has, so nothing is lost.</p></div></div>
      ${cheatsOpen ? `<div class="pf-cheats" id="pfcheats" role="region" aria-label="Profile cheats">
        <div class="pf-ch-hd"><strong>Profile cheats</strong><button type="button" class="pf-ch-x" data-a="pfcheats" aria-label="Close cheats">&times;</button></div>
        <p class="cmp-note">Paste or tap any code below to fill it into “Load a profile”, then press Load profile.</p>
        <ul class="pf-ch-list">${CHEATS.map(([code, desc]) => `<li><button type="button" class="pf-ch-code" data-cheat="${code}">${code}</button><span>${esc(desc)}</span></li>`).join('')}</ul>
      </div>` : ''}
      <p class="pf-msg" id="pfmsg" role="status"></p></section>`; }
  async function fillBoard() { const note = $('lbnote'), list = $('lblist'), B = window.CampaignBoard; if (!note || !list) return; const key = lbKey();
    if (!B) { note.textContent = 'Leaderboards aren’t available here.'; return; }
    const stt = await B.status(); let rows; try { rows = await B.rows(); } catch (e) { rows = null; }
    if (!$('lblist') || lbKey() !== key) return;
    if (!rows) { note.innerHTML = stt === 'offline' ? 'Leaderboards need you to be signed in to Claude while you play. Your own best runs are in the <button type="button" class="cmp-link" data-a="hall">Hall of fame</button>.' : 'The leaderboard couldn’t be reached just now. Try again in a moment.'; return; }
    const ent = rows.map(r => ({ id: r.id, me: r.me, b: r.boards[key] })).filter(x => x.b).sort((a, b) => b.b.s - a.b.s).slice(0, 50);
    const nm = await B.names(ent.map(x => x.id)); if (!$('lblist') || lbKey() !== key) return;
    note.innerHTML = (ent.length ? `${ent.length} player${ent.length === 1 ? '' : 's'} on this board.` : 'Nobody is on this board yet: finish a campaign to be first.') + (stt === 'readonly' ? ' <em>You can see the boards, but this account can’t post to them.</em>' : stt === 'noid' ? ' <em>Posting scores isn’t switched on for this page yet.</em>' : '');
    list.innerHTML = ent.map((x, i) => { const L = C.leaders.find(l => l.id === x.b.l) || { name: x.b.l, party: x.b.p }; return `<li class="lb-row${x.me ? ' me' : ''}${i < 3 ? ' top t' + i : ''}" style="--pc:${PC(L.party)}"><span class="lb-rk">${i + 1}</span><span class="lb-who"><b>${esc(nm[x.id] || (x.me ? 'You' : 'A player'))}${x.me ? ' <em>you</em>' : ''}</b><small>${esc(L.name)} · ${esc(x.b.t || '')} · ${x.b.seats} seats${lbTab === 'ldr' ? ' · ' + esc((E.DIFF[x.b.d] || {}).n || '') : ''}</small></span><span class="lb-sc num">${x.b.s.toLocaleString()}</span></li>`; }).join(''); }
  root.addEventListener('change', e => { if (e.target.id === 'lbldr') { lbLdr = e.target.value; fillBoard(); } if (e.target.id === 'pffile') { const f = e.target.files && e.target.files[0]; if (!f) return; f.text().then(t => { const ta = $('pfcode'); if (ta) ta.value = t; const m = $('pfmsg'); if (m) m.textContent = 'File read: press “Load profile” to add it.'; }); } });
  function notice(lbl, txt) { const box = $('cmptoasts'); if (!box) return; while (box.children.length >= 2) box.firstChild.remove(); const t = document.createElement('div'); t.className = 'cmp-toast'; t.innerHTML = `<span class="medal sm"><b class="mq">${ICON('medal')}</b></span><span><small>${esc(lbl)}</small><b>${esc(txt)}</b></span>`; box.appendChild(t); setTimeout(() => t.classList.add('out'), 3800); setTimeout(() => t.remove(), 4400); }
  window.addEventListener('cmp:posted', e => { const r = e.detail || {}; if (r.ok && !r.same) notice('Leaderboards', 'New best: score posted'); });
  // ---- the collection: one current leader per party to start with (plus anyone already played); the rest come from packs,
  // earned at honour milestones. Each pack holds three leaders, new ones first.
  const CKEY = 'es2028_campaign_cards_v1', PACKAT = [0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 54];
  const starters = () => Object.keys(C.PARTIES).map(p => C.leaders.find(l => l.party === p && l.inc && !l.more && !l.cb) || C.leaders.find(l => l.party === p)).filter(Boolean).map(l => l.id);
  function coll() { let c = null; try { c = JSON.parse(localStorage.getItem(CKEY) || 'null'); } catch (e) {} let ch = false;
    if (!c || typeof c !== 'object') { c = { owned: {}, opened: 0 }; E.hall().forEach(x => { if (x.leader) c.owned[x.leader] = c.owned[x.leader] || Date.now(); }); ch = true; }
    c.owned = c.owned || {}; starters().forEach(id => { if (!c.owned[id]) { c.owned[id] = 1; ch = true; } }); if (ch) collSave(c); return c; }
  function collSave(c) { try { localStorage.setItem(CKEY, JSON.stringify(c)); } catch (e) {} }
  const owns = id => !!coll().owned[id];
  const packsEarned = () => coll().allPacks ? PACKAT.length : PACKAT.filter(t => achCount() >= t).length;
  const packsLeft = () => { const c = coll(); return C.leaders.every(L => c.owned[L.id]) ? 0 : Math.max(0, packsEarned() - (c.opened || 0)); };
  const nextPackAt = () => { const e = packsEarned(); return C.leaders.every(L => owns(L.id)) ? null : PACKAT[e] != null ? PACKAT[e] : null; };
  function packBtn() { const n = packsLeft(), nx = nextPackAt(); return `<button type="button" data-a="pack" class="pk-btn${n ? ' has' : ''}" title="${n ? 'Open a pack of three leaders' : nx == null ? 'Your collection is complete' : 'Earn ' + (nx - achCount()) + ' more honour' + (nx - achCount() === 1 ? '' : 's') + ' for your next pack'}">${ICON('star')} Open a Pack${n ? `<b class="pk-n">${n}</b>` : ''}</button>`; }
  function collBar() { const c = coll(), n = C.leaders.filter(L => c.owned[L.id]).length, nx = nextPackAt(); return `<span class="coll-bar"><i style="width:${Math.round(n / C.leaders.length * 100)}%"></i></span><b>${n}/${C.leaders.length}</b> leaders collected${packsLeft() ? ` · <em>${packsLeft()} pack${packsLeft() === 1 ? '' : 's'} to open</em>` : nx != null ? ` · next pack at ${nx} honour${nx === 1 ? '' : 's'} (you have ${achCount()})` : ' · collection complete'}`; }
  // ---- a leader pack: tap to tear it open and pull one card. Rarer grades turn up less often.
  const PACKW = { A: 1, B: 2, C: 3, D: 3, E: 3, F: 3, N: 3 };
  function closePack() { const ov = root.querySelector('.pk-ov'); if (ov) { const torn = ov.classList.contains('torn'); ov.remove(); if (torn && (view === 'select' || view === 'binder')) { const y = root.scrollTop; render(); root.scrollTop = y; } } document.removeEventListener('keydown', packKey); }
  function packKey(e) { if (e.key === 'Escape') closePack(); }
  function openPack() { closePack(); const c0 = coll(), rarOf = id => { const g = ((window.TIERLIST || {}).leaders || []).find(x => x.id === id); return g ? g.grade : 'N'; };
    // three leaders: ones you don't have first, rarer grades less often; duplicates only once the collection is nearly full
    const pickFrom = (pool, n) => { const out = [], left = pool.slice(); while (out.length < n && left.length) { const tot = left.reduce((a, id) => a + PACKW[rarOf(id)], 0); let r = Math.random() * tot, k = 0; for (; k < left.length; k++) { r -= PACKW[rarOf(left[k])]; if (r <= 0) break; } out.push(left.splice(Math.min(k, left.length - 1), 1)[0]); } return out; };
    const fresh = C.leaders.filter(L => !c0.owned[L.id]).map(L => L.id); let ids = pickFrom(fresh, 3); if (ids.length < 3) ids = ids.concat(pickFrom(C.leaders.map(L => L.id).filter(id => !ids.includes(id)), 3 - ids.length));
    const isNew = id => !c0.owned[id], RO = 'NABCDEF', best = ids.map(rarOf).sort((a, b) => RO.indexOf(a) - RO.indexOf(b)).find(g => g !== 'N') || 'N';
    const ov = document.createElement('div'); ov.className = 'pk-ov pk3 r-' + best; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'Open a leader pack');
    ov.innerHTML = `<div class="pk-stage"><div class="pk-slot"><span class="pk-glow" aria-hidden="true"></span><span class="pk-rays" aria-hidden="true"></span>
      <div class="pk-pack" role="button" tabindex="0" aria-label="Tear open the pack"><span class="pk-light" aria-hidden="true"></span>
        <span class="pk-body"><span class="pk-foil" aria-hidden="true"></span><span class="pk-seam l"></span><span class="pk-seam r"></span><span class="pk-crimp b" aria-hidden="true"></span><span class="pk-perf" aria-hidden="true"></span>
          <span class="pk-brand"><small>Australia</small><b>2028</b><em>Series one</em></span>
          <span class="pk-emb" aria-hidden="true"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" class="e1"/><circle cx="60" cy="60" r="44" class="e2"/><path class="e3" d="M60 22l9.4 19 21 3-15.2 14.8 3.6 20.9L60 69.8 41.2 79.7l3.6-20.9L29.6 44l21-3z"/></svg></span>
          <span class="pk-title"><b>Leader Pack</b><em>Three leaders inside</em></span>
          <span class="pk-odds">New leaders first · ${C.leaders.length} to collect<br>Pack ${(c0.opened || 0) + 1} of ${PACKAT.length}</span></span>
        <span class="pk-strip" aria-hidden="true"><span class="pk-strip-in"><span class="pk-crimp t"></span><i>Tear here</i></span></span></div>
      <div class="pk-row">${ids.map((id, k) => `<div class="pk-card r-${rarOf(id)}" style="--k:${k}" data-k="${k}" role="button" tabindex="0" aria-label="Reveal card ${k + 1} of ${ids.length}">${isNew(id) ? '<span class="pk-new">New!</span>' : '<span class="pk-new dup">Duplicate</span>'}<div class="pk-flip"><div class="pk-back" aria-hidden="true"><span class="pkb-in"><b>2028</b><small>Australia</small><svg viewBox="0 0 120 120"><path d="M60 22l9.4 19 21 3-15.2 14.8 3.6 20.9L60 69.8 41.2 79.7l3.6-20.9L29.6 44l21-3z"/></svg></span></div><div class="pk-front"></div></div></div>`).join('')}</div>
      <span class="pk-sparks" aria-hidden="true">${Array.from({ length: 26 }, (_, k) => `<i style="--a:${Math.round(k * 360 / 26 + Math.random() * 12)}deg;--d:${(110 + Math.random() * 150).toFixed(0)}px;--t:${(Math.random() * .25).toFixed(2)}s"></i>`).join('')}</span></div>
      <p class="pk-msg" role="status">Swipe across the top to tear it open</p><button type="button" class="pk-skip" data-a="pkskip">Skip ${ICON('skip')}</button>
      <div class="pk-acts" hidden><button type="button" data-a="pkagain" class="ghost pk-again">${ICON('star')} Open another</button><button type="button" data-a="pkclose" class="ghost">Done</button></div></div>`;
    root.appendChild(ov); document.addEventListener('keydown', packKey); const pack = ov.querySelector('.pk-pack'), strip = ov.querySelector('.pk-strip'); pack.focus({ preventScroll: true });
    ov.addEventListener('click', e => { if (e.target === ov && ov.classList.contains('revealed')) closePack(); });
    ids.forEach((id, k) => { let card = null; const src = inn.querySelector(`.tcard[data-lead="${id}"]`); if (src) { card = src.cloneNode(true); } else { const L = C.leaders.find(x => x.id === id); if (L) { const tmp = document.createElement('div'); tmp.innerHTML = buildTCard(L, { forceUnlocked: true }); card = tmp.firstElementChild; } } if (!card) return; card.classList.remove('dealt', 'flipped', 'tilting', 'holding', 'chosen', 'locked', 'no-hold'); card.hidden = false; ov.querySelectorAll('.pk-front')[k].appendChild(card); });
    const T = ms => prefs.motion && !ov.classList.contains('instant') ? ms : 0;
    // the pack is used up the moment it is torn, so the three leaders are yours even if you close early
    const claim = () => { const c = coll(); ids.forEach(id => { if (!c.owned[id]) c.owned[id] = Date.now(); }); c.opened = (c.opened || 0) + 1; collSave(c); };
    const flipOne = k => { const pc = ov.querySelectorAll('.pk-card')[k]; if (!pc || pc.classList.contains('shown')) return; pc.classList.add('shown'); pc.removeAttribute('role'); pc.removeAttribute('tabindex'); pc.removeAttribute('aria-label'); sfx(RO.indexOf(rarOf(ids[k])) <= 2 ? 'chime' : 'good');
      const shown = ov.querySelectorAll('.pk-card.shown').length;
      if (shown === ids.length) done();
      else { const rem = ids.length - shown; ov.querySelector('.pk-msg').textContent = `${shown} of ${ids.length} revealed · tap ${rem === 1 ? 'the last card' : 'each card'} to reveal`; } };
    const done = () => { if (ov.classList.contains('revealed')) return; ov.classList.add('revealed'); try { if (navigator.vibrate) navigator.vibrate(best === 'A' ? [20, 40, 20, 40, 60] : 20); } catch (e) {}
      const nm = id => (C.leaders.find(L => L.id === id) || {}).name || id, nNew = ids.filter(isNew).length;
      ov.querySelector('.pk-msg').innerHTML = `<b>${nNew === 3 ? 'Three new leaders!' : nNew ? nNew + ' new leader' + (nNew === 1 ? '' : 's') : 'All duplicates'}</b>${ids.map(nm).map(esc).join(' · ')}<small>Tap a card to flip it · hold to play</small>`;
      const left = packsLeft(), ag = ov.querySelector('.pk-again'); if (ag) { if (left) ag.innerHTML = `${ICON('star')} Open another (${left} left)`; else ag.remove(); }
      ov.querySelector('.pk-acts').hidden = false; const sk = ov.querySelector('.pk-skip'); if (sk) sk.remove(); };
    const open = () => { if (ov.classList.contains('torn')) return; ov.classList.add('torn'); claim(); sfx('page'); ov.querySelector('.pk-msg').textContent = 'Pulling your cards…';
      const sk = ov.querySelector('.pk-skip'); if (sk) sk.remove();
      setTimeout(() => { ov.classList.add('out', 'up'); ov.querySelector('.pk-msg').textContent = 'Tap each card to reveal it'; setTimeout(() => { if (pack.isConnected) pack.classList.add('gone'); }, T(520)); }, T(520)); };
    ov._skip = () => { if (!ov.classList.contains('torn')) { ov.classList.add('torn'); claim(); } pack.classList.add('gone'); ov.classList.add('instant', 'out', 'up'); const sk = ov.querySelector('.pk-skip'); if (sk) sk.remove(); ov.querySelector('.pk-msg').textContent = 'Tap each card to reveal it'; };
    ov.querySelectorAll('.pk-card').forEach(pc => {
      pc.addEventListener('pointerdown', e => { if (ov.classList.contains('up') && !pc.classList.contains('shown')) e.stopPropagation(); }, true);
      pc.addEventListener('click', e => { if (ov.classList.contains('up') && !pc.classList.contains('shown')) { e.stopPropagation(); flipOne(+pc.dataset.k); } }, true);
      pc.addEventListener('keydown', e => { if (ov.classList.contains('up') && !pc.classList.contains('shown') && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); flipOne(+pc.dataset.k); } });
    });
    let drag = null; const w = () => pack.getBoundingClientRect().width;
    pack.addEventListener('pointerdown', e => { if (ov.classList.contains('torn')) return; drag = { x: e.clientX, f: 0 }; try { pack.setPointerCapture(e.pointerId); } catch (x) {} });
    pack.addEventListener('pointermove', e => { if (!drag) return; drag.f = Math.max(0, Math.min(1, Math.abs(e.clientX - drag.x) / (w() * 0.8))); strip.style.setProperty('--tear', drag.f); if (drag.f > 0.08) strip.classList.add('tearing'); if (drag.f >= 0.7) { drag = null; open(); } });
    pack.addEventListener('pointerup', () => { if (!drag) return; const f = drag.f; drag = null; strip.classList.remove('tearing'); strip.style.setProperty('--tear', 0); if (f < 0.08) open(); });
    pack.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    pack.addEventListener('pointermove', e => { if (drag || !prefs.motion) return; const r2 = pack.getBoundingClientRect(); pack.style.setProperty('--px', ((e.clientX - r2.left) / r2.width * 100).toFixed(1) + '%'); pack.style.setProperty('--ry', (((e.clientX - r2.left) / r2.width - 0.5) * 16).toFixed(1) + 'deg'); pack.style.setProperty('--rx', ((0.5 - (e.clientY - r2.top) / r2.height) * 10).toFixed(1) + 'deg'); });
    pack.addEventListener('pointerleave', () => { pack.style.removeProperty('--ry'); pack.style.removeProperty('--rx'); }); }
  // ---- trading cards: tap a card to flip it; it tilts toward the pointer and the foil catches the light
  function flipCard(c) { c.classList.toggle('flipped'); if (prefs.sound) sfx('page'); }
  // tap a card to flip it; hold it for a second and a half to play as that leader (Enter or Space work the same way)
  const HOLD = 1500; let hold = null;
  function holdStart(c, x, y) { holdEnd(); if (c.classList.contains('no-hold')) { hold = { c, t0: Date.now(), x, y, timer: null }; return; } if (c.classList.contains('locked')) { hold = { c, t0: Date.now(), x, y, timer: setTimeout(() => { if (!hold || hold.c !== c) return; hold = null; c.classList.remove('shake'); void c.offsetWidth; c.classList.add('shake'); notice('Collection', 'Open packs to collect ' + ((c.querySelector('.lt-name') || {}).textContent || 'this leader')); }, 500) }; return; } hold = { c, t0: Date.now(), x, y, timer: setTimeout(() => { const h = hold; hold = null; if (!h) return; c.classList.remove('holding'); c.classList.add('chosen'); sfx('chime'); try { if (navigator.vibrate) navigator.vibrate(30); } catch (e) {} setTimeout(() => start(c.dataset.lead), prefs.motion ? 420 : 0); }, HOLD) };
    setTimeout(() => { if (hold && hold.c === c) c.classList.add('holding'); }, 160); }
  function holdEnd(tap) { if (!hold) return false; const h = hold; hold = null; if (h.timer) clearTimeout(h.timer); h.c.classList.remove('holding'); const quick = Date.now() - h.t0 < 300; if (tap && quick) flipCard(h.c); return quick; }
  root.addEventListener('pointerdown', e => { const c = e.target.closest('.tcard'); if (!c || e.button > 0 || e.target.closest('button, a, [data-info], .info-b')) return; holdStart(c, e.clientX, e.clientY); });
  root.addEventListener('pointerup', e => { if (hold) holdEnd(true); });
  root.addEventListener('pointercancel', () => holdEnd());
  root.addEventListener('pointermove', e => { if (hold && Math.hypot(e.clientX - hold.x, e.clientY - hold.y) > 12) holdEnd(); });
  root.addEventListener('contextmenu', e => { if (e.target.closest('.tcard')) e.preventDefault(); });
  root.addEventListener('keydown', e => { const c = e.target.classList && e.target.classList.contains('tcard') ? e.target : null; if (!c || (e.key !== 'Enter' && e.key !== ' ')) return; e.preventDefault(); if (!e.repeat && !hold) holdStart(c); });
  root.addEventListener('keyup', e => { if (e.target.classList && e.target.classList.contains('tcard') && (e.key === 'Enter' || e.key === ' ')) holdEnd(true); });
  let tiltEl = null, tiltRaf = 0, tiltEv = null;
  const tiltReset = c => { const t = c && c.querySelector('.tc-3d'); if (t) { t.style.removeProperty('--rx'); t.style.removeProperty('--ry'); t.style.removeProperty('--mx'); t.style.removeProperty('--my'); c.classList.remove('tilting'); } };
  root.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse' || !prefs.motion) return; let c = e.target.closest('.tcard'); if (!c && tiltEl && inBox(tiltEl, e)) c = tiltEl; if (c !== tiltEl) { tiltReset(tiltEl); tiltEl = c; } if (!c) return; tiltEv = e;
    if (!tiltRaf) tiltRaf = requestAnimationFrame(() => { tiltRaf = 0; if (!tiltEl || !tiltEv) return; const t = tiltEl.querySelector('.tc-3d'), o = tiltEl.getBoundingClientRect(), x = Math.max(0, Math.min(1, (tiltEv.clientX - o.left) / o.width)), y = Math.max(0, Math.min(1, (tiltEv.clientY - o.top - t.offsetTop) / t.offsetHeight));
      tiltEl.classList.add('tilting'); t.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg'); t.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg'); t.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); t.style.setProperty('--my', (y * 100).toFixed(1) + '%'); }); });
  root.addEventListener('pointerleave', e => { if (e.target === root) { tiltReset(tiltEl); tiltEl = null; } });
  // only let go of a card once the pointer is really outside its resting outline (a tilted corner can briefly slip out from under it)
  const inBox = (c, e) => { const o = c.getBoundingClientRect(); return e.clientX >= o.left - 2 && e.clientX <= o.right + 2 && e.clientY >= o.top - 2 && e.clientY <= o.bottom + 2; };
  root.addEventListener('pointerout', e => { if (tiltEl && !tiltEl.contains(e.relatedTarget) && !inBox(tiltEl, e)) { tiltReset(tiltEl); tiltEl = null; } });
  // cards are dealt in, a few at a time, whenever the shown set changes
  function deal(scope) { if (!prefs.motion) return; let k = 0; (scope || inn).querySelectorAll('.tcard').forEach(c => { c.classList.remove('dealt'); if (c.offsetParent === null) return; c.style.setProperty('--di', Math.min(k++, 14)); void c.offsetWidth; c.classList.add('dealt'); }); }
  root.addEventListener('toggle', e => { if (e.target.classList && e.target.classList.contains('lt-more') && e.target.open) deal(e.target); }, true);
  const collApi = {
    rerender: keepY => { const y = root.scrollTop; render(); if (keepY) root.scrollTop = y; },
    setView: v => { view = v; render(); root.scrollTop = 0; focusTitle(); }
  };
  root.addEventListener('input', e => { if (e.target.id === 'ldrq') { ldrQ = e.target.value; applyLF(); return; } if (window.CAMPAIGN_COLL && window.CAMPAIGN_COLL.handleInput(e.target, inn, collCtx())) return; });
  root.addEventListener('change', e => { if (e.target.id === 'achl') { achL = e.target.value; render(); const f = $('achl'); if (f) f.focus(); return; } if (e.target.id === 'cmpscen') { prefs.scen = e.target.value; savePrefs(); render(); const f = $('cmpscen'); if (f) f.focus(); return; } if (window.CAMPAIGN_COLL && window.CAMPAIGN_COLL.handleChange(e.target, collCtx(), collApi)) return; });
  root.addEventListener('click', e => {
    if (e.target && e.target.dataset && e.target.dataset.bdclose === 'bg' && window.CAMPAIGN_COLL && window.CAMPAIGN_COLL.state.bOpen) { window.CAMPAIGN_COLL.state.bOpen = null; collApi.rerender(true); return; }
    const b = e.target.closest('button'); if (!b || b.disabled) return;
    if (window.CAMPAIGN_COLL && window.CAMPAIGN_COLL.handleClick(b, collCtx(), collApi)) return;
    if (b.hasAttribute('data-flip')) { const c = b.closest('.tcard'); if (c) flipCard(c); return; }
    if (b.dataset.lead) { if (window.CAMPAIGN_COLL) window.CAMPAIGN_COLL.state.bOpen = null; const c = b.closest('.tcard'); if (c && prefs.motion) { c.classList.add('chosen'); sfx(); setTimeout(() => start(b.dataset.lead), 380); return; } return start(b.dataset.lead); }
    if (b.dataset.opt != null) { const k = +b.dataset.opt; if (!prefs.motion) return after(E.choose(st, k)); if (inn.querySelector('.cmp-opts.picking')) return; clearDoor();
      const box = b.closest('.cmp-opts'); if (box) box.classList.add('picking'); b.classList.add('picked'); sfx(); setTimeout(() => { if (st) after(E.choose(st, k)); }, 260); return; }
    if (b.dataset.dec) { const r = E.enact(st, b.dataset.dec); if (r) after(r); return; }
    if (b.dataset.achv) { const id = b.dataset.achv; achOpen = achOpen === id ? null : id; const y = root.scrollTop; render(); root.scrollTop = y; const d = inn.querySelector('.ach-detail'); if (d) d.scrollIntoView({ block: 'nearest', behavior: prefs.motion ? 'smooth' : 'auto' }); const tile = inn.querySelector(`.medal-tile[data-achv="${id}"]`); if (tile) tile.focus({ preventScroll: true }); return; }
    if (b.dataset.lb) { lbTab = b.dataset.lb; render(); return; }
    if (b.classList.contains('rt-tab')) { prefs.rtab = b.dataset.rt; savePrefs(); const as = inn.querySelector('.cmp-right'); if (as) as.dataset.rt = prefs.rtab; inn.querySelectorAll('.rt-tab').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); }); return; }
    if (b.dataset.lp) { prefs.party = b.dataset.lp; savePrefs(); inn.querySelectorAll('[data-lp]').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); }); applyLF(); deal(); return; }
    if (b.dataset.lf) { const FP = { left: 'ALP', right: 'ALP', mod: 'LNP', natright: 'LNP', centre: 'LNP', nationals: 'LNP' }; if (FP[b.dataset.lf] && C.PARTIES[prefs.party] && prefs.party !== FP[b.dataset.lf]) { prefs.party = FP[b.dataset.lf]; savePrefs(); inn.querySelectorAll('[data-lp]').forEach(x => { const on = x.dataset.lp === prefs.party; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); }); }
      ldrF = b.dataset.lf; inn.querySelectorAll('[data-lf]').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); applyLF(); return; }
    if (b.dataset.af) { achF = b.dataset.af; const y = root.scrollTop; render(); root.scrollTop = y; keepFocus('af', achF); return; }
    if (b.dataset.mode) { prefs.mode = b.dataset.mode; savePrefs(); render(); keepFocus('mode', b.dataset.mode); return; }
    if (b.dataset.diff) { prefs.diff = b.dataset.diff; savePrefs(); render(); keepFocus('diff', b.dataset.diff); return; }
    if (b.dataset.scen) { prefs.scen = b.dataset.scen; savePrefs(); render(); const f = inn.querySelector(`[data-scen="${b.dataset.scen}"]`); if (f) f.focus(); return; }
    if (b.dataset.tour) { const k = b.dataset.tour; tourSel = tourSel.includes(k) ? tourSel.filter(x => x !== k) : tourSel.concat(k).slice(-2); tourUpdate(); return; }
    if (b.dataset.off) { const [k, v] = b.dataset.off.split(':'); negOff[k] = +v; const y = root.scrollTop; render(); root.scrollTop = y; keepFocus('off', b.dataset.off); return; }
    if (b.dataset.back) { negBack = b.dataset.back; const y = root.scrollTop; render(); root.scrollTop = y; keepFocus('back', negBack); return; }
    if (b.dataset.ask) { negAsk = +b.dataset.ask; const y = root.scrollTop; render(); root.scrollTop = y; keepFocus('ask', b.dataset.ask); return; }
    if (b.dataset.pace) { tourHard = b.dataset.pace === '1'; inn.querySelectorAll('[data-pace]').forEach(x => { const on = x.dataset.pace === (tourHard ? '1' : '0'); x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); return; }
    if (b.dataset.cheat) { const ta = $('pfcode'), m = $('pfmsg'); if (ta) { ta.value = b.dataset.cheat; ta.focus(); } if (m) m.textContent = `Entered ${b.dataset.cheat}: press “Load profile” to apply it.`; return; }
    const a = b.dataset.a;
    if (a === 'randlead') { const own = C.leaders.filter(L => owns(L.id)); const L = own[Math.floor(Math.random() * own.length)]; if (L) start(L.id); return; }
    if (a === 'pack') { if (packsLeft() > 0) openPack(); else { const n = nextPackAt(); notice('Packs', n == null ? 'You have every leader' : `Next pack at ${n} honour${n === 1 ? '' : 's'}. You have ${achCount()}.`); } return; }
    if (a === 'pkagain') { closePack(); if (packsLeft() > 0) openPack(); else render(); return; }
    if (a === 'pkclose') { closePack(); return; }
    if (a === 'pkskip') { const ov = root.querySelector('.pk-ov'); if (ov && ov._skip) ov._skip(); return; }
    if (a === 'compact') { prefs.compact = !prefs.compact; savePrefs(); const y = root.scrollTop; render(); root.scrollTop = y; keepFocus('a', 'compact'); return; }
    if (a === 'close') hide();
    else if (a === 'sound') { prefs.sound = prefs.sound ? 0 : 1; savePrefs(); render(); if (prefs.sound) sfx(); refocus('sound'); }
    else if (a === 'motion') { prefs.motion = prefs.motion ? 0 : 1; savePrefs(); render(); refocus('motion'); }
    else if (a === 'sandbox') toSandbox();
    else if (a === 'binder') { cheatsOpen = false; if (window.CAMPAIGN_COLL) window.CAMPAIGN_COLL.state.bOpen = null; view = 'binder'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'compare') { cheatsOpen = false; if (window.CAMPAIGN_COLL) window.CAMPAIGN_COLL.state.bOpen = null; view = 'compare'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'hall') { cheatsOpen = false; view = 'hall'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'board') { cheatsOpen = false; view = 'board'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'pfcheats') { cheatsOpen = !cheatsOpen; const y = root.scrollTop; render(); root.scrollTop = y; const box = $('pfcheats'); if (box) box.scrollIntoView({ block: 'nearest', behavior: prefs.motion ? 'smooth' : 'auto' }); }
    else if (a === 'pfdl') { const m = $('pfmsg'); window.CampaignBoard.download().then(() => { if (m) m.textContent = 'Profile file downloaded. Keep it somewhere safe.'; }).catch(e => { if (m) m.textContent = e && e.code === 'declined' ? 'Download cancelled.' : (e && e.message) || 'The download didn’t work: copy the code instead.'; }); }
    else if (a === 'pfcopy') { const c = window.CampaignBoard.code(), m = $('pfmsg'), ta = $('pfcode'); if (ta) { ta.value = c; ta.select(); } (navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject()).then(() => { if (m) m.textContent = 'Profile code copied. Paste it into “Load a profile” on your other device.'; }).catch(() => { if (m) m.textContent = 'Select the code in the box and copy it.'; }); }
    else if (a === 'pfload' && $('pfcode') && $('pfcode').value.trim() === 'PackRippers') { const c = coll(); c.allPacks = true; collSave(c); render(); const m2 = $('pfmsg'); if (m2) m2.textContent = `Every pack unlocked: ${packsLeft()} pack${packsLeft() === 1 ? '' : 's'} waiting on the Choose your leader page.`; }
    else if (a === 'pfload' && $('pfcode') && $('pfcode').value.trim() === 'CheatMachine') { unlockAll(); render(); const m2 = $('pfmsg'); if (m2) m2.textContent = `Everything unlocked: all ${A.list.length} honours, all ${C.leaders.length} leaders, every opening and every leader-only answer.`; }
    else if (a === 'pfload' && $('pfcode') && $('pfcode').value.trim() === 'ResetProfile') { resetProfile(); render(); const m2 = $('pfmsg'); if (m2) m2.textContent = 'Profile reset: all honours, runs, daily results, leader-only answers and unlocked cards cleared back to a fresh start.'; }
    else if (a === 'pfload') { const m = $('pfmsg'), ta = $('pfcode'); try { const r = window.CampaignBoard.merge(window.CampaignBoard.parse(ta ? ta.value : '')); render(); const m2 = $('pfmsg'); if (m2) m2.textContent = `Profile loaded: ${r.honours} honours and ${r.runs} runs now on this device.`; } catch (e) { if (m) m.textContent = e.message || 'That code didn’t work.'; } }
    else if (a === 'pfcloud') { const m = $('pfmsg'); window.CampaignBoard.cloudLoad().then(d => { if (!d || !d.code) { if (m) m.textContent = 'No profile is saved to your account yet.'; return; } const r = window.CampaignBoard.merge(window.CampaignBoard.parse(d.code)); if (m) m.textContent = `Restored from your account: ${r.honours} honours, ${r.runs} runs.`; }).catch(() => { if (m) m.textContent = 'Couldn’t reach your account.'; }); }
    else if (a === 'pfsave') { const m = $('pfmsg'); window.CampaignBoard.cloudSave().then(ok => { if (m) m.textContent = ok ? 'Saved to your account.' : 'Couldn’t save to your account from here.'; }); }
    else if (a === 'tourgo') { E.setTour(st, tourSel, tourHard); sfx(); view = 'game'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'skipcount') { if (APP.replay) APP.replay.skip(); stopCount(); view = viewFor(); render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'verdictgo') { view = viewFor(); render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'settle') { const n = st.neg; if (!n) return; const ch = n.mode === 'form' ? { offers: negOff } : { back: negBack && negBack !== 'none' ? negBack : null, ask: negAsk };
      E.settle(st, ch); (st.ach || []).forEach(toast); sfx(st.result.gov === st.party ? 'good' : 'bad'); view = 'verdict'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'notimer') { prefs.timers = 0; savePrefs(); clearDoor(); const y = root.scrollTop; render(); root.scrollTop = y; }
    else if (a === 'copycode') { codeMsg = 'Making a code…'; E.exportCode(st).then(code => { if (!code) { codeMsg = 'No code for this run.'; render(); return; }
        const done = ok => { codeMsg = ok ? 'Copied. Paste it on the leader screen on any device.' : 'Copy this code: ' + code; const y = root.scrollTop; render(); root.scrollTop = y; };
        try { navigator.clipboard.writeText(code).then(() => done(true), () => done(false)); } catch (err) { done(false); } }); }
    else if (a === 'loadcode') { const t = ($('cmpcode') || {}).value || ''; codeMsg = 'Loading…'; E.importCode(t).then(s2 => { if (!s2) { codeMsg = 'That code did not work. Check it was copied in full.'; render(); return; }
        st = s2; codeMsg = ''; fb = null; view = viewFor(); render(); root.scrollTop = 0; focusTitle(); }); }
    else if (a === 'share' && APP.shareImage && lastLikely()) { const L = E.ldrOf(st);
      // the sandbox's result card, relabelled for this run (the sandbox still holds this campaign's count)
      APP.shareImage({ campaign: { leader: L.name, party: C.PARTIES[st.party].n, col: PC(st.party), tier: st.tier.n, tierN: 'OUTCOME', tierV: st.tier.k < 3 ? 'Tier ' + (st.tier.k + 1) : 'Defeat', seats: st.result.seats[st.party], score: st.score || 0, text: shareText() } }); }
    else if (a === 'share') { shareURL = shareCard(); render(); const m = inn.querySelector('.share-modal'); if (m) m.scrollIntoView({ block: 'center' }); }
    else if (a === 'shareclose') { shareURL = null; render(); }
    else if (a === 'copyres') { const t = shareText(); try { navigator.clipboard.writeText(t).then(() => { b.textContent = 'Copied'; }, () => { b.textContent = 'Could not copy'; }); } catch (err) { b.textContent = 'Could not copy'; } }
    else if (a === 'ach') { achOpen = null; view = 'ach'; render(); root.scrollTop = 0; focusTitle(); }
    else if (a === 'back') { achOpen = null; view = viewFor(); render(); }
    else if (a === 'resume') { st = E.load(); fb = null; view = viewFor(); if (view === 'night') night(); else render(); }
    else if (a === 'discard') { E.clear(); st = null; render(); }
    else if (a === 'next') { fb = null; if (st.phase === 'FAILED') { view = 'failed'; render(); } else if (st.phase === 'ELECTION') night(); else { view = viewFor(); if (view === 'tour') { tourSel = st.tour.slice(); tourHard = st.tourHard; root.scrollTop = 0; } render(); const c = inn.querySelector('.cmp-card'); if (c && c.getBoundingClientRect().top < 0) c.scrollIntoView({ block: 'start' }); focusTitle(); } }
    else if (a === 'retry') start(st.leader);
    else if (a === 'new') { if (st && st.phase === 'ENDED') E.exit(st); st = null; E.clear(); fb = null; achOpen = null; view = 'select'; render(); root.scrollTop = 0; }
    else if (a === 'exit') { exitRun(); hide(); }
    else if (a === 'results') { hide(); const t = document.getElementById('h-odds'); if (t) t.scrollIntoView({ behavior: prefs.motion ? 'smooth' : 'auto', block: 'start' }); }
    else if (a === 'abandon') { if (confirmBox()) { E.abandon(st); st = null; fb = null; view = 'select'; render(); } }
  });
  // no browser dialogs: the abandon button asks twice instead
  let armed = 0; function confirmBox() { const b = inn.querySelector('.cmp-quit'); if (Date.now() - armed < 4000) { armed = 0; return true; } armed = Date.now(); if (b) { b.textContent = st && st.iron ? 'Tap again: it counts as a loss' : 'Tap again to abandon'; setTimeout(() => { if (b.isConnected) b.textContent = 'Abandon this campaign'; }, 4000); } return false; }

  // ---- entry points: a button in the site bar and a link in the section nav
  function openCampaign() { const s = st || E.load(); st = s;
    view = st ? viewFor() : 'select'; if (st && st.phase === 'ENDED' && !document.body.classList.contains('cmp-lock')) { st = null; E.clear(); view = 'select'; }
    show(); if (view === 'night') night(); }
  // Escape and the keyboard shortcuts should not fire while typing a run code
  document.addEventListener('keydown', e => { if (open && e.target && e.target.id === 'cmpcode') e.stopPropagation(); }, true);
  const tools = document.querySelector('.mast-tools');
  if (false && tools) { const b = document.createElement('button'); b.type = 'button'; b.id = 'cmpbtn'; b.className = 'cmp-open-btn'; b.innerHTML = ICON('play') + ' Campaign mode'; tools.prepend(b); b.addEventListener('click', openCampaign); }
  const nav = null; if (nav) { const a = document.createElement('a'); a.href = '#campaign'; a.textContent = 'Campaign mode'; a.className = 'cmp-navlink'; nav.insertBefore(a, nav.children[1] || null); a.addEventListener('click', e => { e.preventDefault(); openCampaign(); }); }
  if (location.hash === '#campaign') setTimeout(openCampaign, 300);
  window.CampaignMode = { close: () => { if (open) hide(); }, isOpen: () => open, open: openCampaign, start: id => { openCampaign(); start(id); }, state: () => st };
})();
