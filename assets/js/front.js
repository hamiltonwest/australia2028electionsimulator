// The front page: choose the sandbox or campaign mode. Shown on a plain visit (no #section in the address) and from Home.
// It also carries today's forecast and a live seat map once the model has counted, and quick starts for both modes.
(() => {
  const fr = document.getElementById('front'); if (!fr) return;
  const root = document.documentElement, $ = id => document.getElementById(id), esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const mk = () => { if (window.SiteBar) SiteBar.mark(); };
  const show = () => { fr.hidden = false; root.classList.add('fr-on'); fr.scrollTop = 0; if (painted) playMap(); paint(); mk(); const h = $('fr-h'); if (h) h.focus({ preventScroll: true }); };
  const hide = hash => { fr.hidden = true; root.classList.remove('fr-on'); try { history.replaceState(null, '', hash); } catch (e) {} mk(); };
  if (window.SiteBar) SiteBar.mount(fr); if (window.SiteBar) SiteBar.mountFoot(fr.querySelector('.fr-in'));
  const ready = () => window.CampaignMode && window.APP && window.APP.getR && window.APP.getR();
  const whenReady = (fn, btn) => { if (ready()) return fn(); if (btn) btn.classList.add('wait'); const t = setInterval(() => { if (ready()) { clearInterval(t); if (btn) btn.classList.remove('wait'); fn(); } }, 100); };

  // the dateline
  const d = $('frdate'); if (d) d.textContent = new Date().toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  // the seat map: the real (geographic) electorates, grey at first, coloured in once the model has counted
  const APP = window.APP, HX = APP && (APP.GEO || APP.HEX), hexEl = $('frhex');
  if (hexEl && HX && HX.cells) { const W = HX.w || 1000, H = HX.h || 1000, QS = HX.qseats || [];
    hexEl.classList.add('geo');
    hexEl.innerHTML = `<svg viewBox="0 0 ${W} ${H}">${HX.qmask ? `<defs><clipPath id="frqc"><path d="${HX.qmask}"/></clipPath></defs>` : ''}${APP.D.seats.map((s, i) => { const c = HX.cells[s.n]; return c ? `<path data-i="${i}" d="${c.d}"${HX.qmask && QS.includes(s.n) ? ' clip-path="url(#frqc)"' : ''} style="--dl:${(i % 30) * 18}ms"/>` : ''; }).join('')}</svg>`;
    if (!HX.w) try { const sv = hexEl.querySelector('svg'), b = sv.getBBox(), p = Math.max(b.width, b.height) * 0.03; sv.setAttribute('viewBox', `${b.x - p} ${b.y - p} ${b.width + 2 * p} ${b.height + 2 * p}`); } catch (e) {} }
  const KEY = g => { const N = APP.NATI; return g === 0 ? 'ALP' : (g === 1 || g === N) ? 'LNP' : g === 2 ? 'GRN' : g === 3 ? 'ONP' : 'IND'; };
  let painted = false;
  function paint() { if (painted || !ready()) return; const r = APP.getR(), cen = r.central || r.likely; if (!cen) return; painted = true;
    playMap();
    const n = { ALP: 0, LNP: 0, GRN: 0, ONP: 0, IND: 0 }; cen.forEach(g => { n[KEY(g)]++; });
    const pc = x => Math.round(x * 100), ov = $('frov'), NM = { ALP: 'Labor', LNP: 'Coalition', ONP: 'One Nation', GRN: 'Greens', IND: 'Others' }, CL = { ALP: 'alp', LNP: 'coa', ONP: 'on', GRN: 'grn', IND: 'ind' };
    if (ov) { ov.innerHTML = `<span class="fo-p"><b>${pc(r.pA)}%</b> <span data-info="@majority">Labor majority</span></span><span class="fo-p"><b>${pc(r.pH)}%</b> <span data-info="@hung">hung parliament</span></span><span class="fo-p"><b>${pc(r.pC)}%</b> <span data-info="@majority">Coalition majority</span></span>
      <span class="fo-bar" role="img" aria-label="Projected seats: ${Object.keys(n).map(k => NM[k] + ' ' + n[k]).join(', ')}">${Object.keys(n).filter(k => n[k]).map(k => `<i style="flex:${n[k]};background:var(--${CL[k]})" title="${NM[k]} ${n[k]}"></i>`).join('')}<u aria-hidden="true"></u></span>
      <span class="fo-seats">${Object.keys(n).filter(k => n[k]).map(k => `<span style="--c:var(--${CL[k]})"><b>${n[k]}</b> ${NM[k]}</span>`).join('')}</span>`; if (window.SiteBar) SiteBar.infoize(ov); } }
  const pt = setInterval(() => { paint(); if (painted) clearInterval(pt); }, 250);

  // the map plays out one election night: a fresh result each time, drawn from each seat's chances in the model with a
  // national lean per party (so a good night for a party shows up across the map), called east to west, safe seats first.
  // One style write per seat; the browser's own transitions do the animating, and a light timer keeps the tally.
  let mapT = null;
  function playMap() { if (!hexEl || !ready()) return; const r = APP.getR(), D = APP.D, P = APP.P, prob = r.prob; if (!prob) return;
    const paths = [...hexEl.querySelectorAll('path[data-i]')], still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
    const lean = P.map(() => gauss() * 0.45), CLOSE = { NSW: 0, VIC: 0, TAS: 0, ACT: 0, SA: 0.12, NT: 0.18, QLD: 0.06, WA: 0.42 };
    const win = D.seats.map((s0, i) => { const w = prob[i].map((p, j) => p * Math.exp(lean[j])), t = w.reduce((a, b) => a + b, 0); let x = Math.random() * t;
      for (let j = 0; j < w.length; j++) { x -= w[j]; if (x <= 0) return j; } return w.length - 1; });
    const at = D.seats.map((s0, i) => { const pm = Math.max(...prob[i]); return (CLOSE[s0.st] || 0) + (1 - pm) * 0.5 + Math.random() * 0.12; });
    const span = still ? 0 : 6500, mx = Math.max(...at), ms = at.map(v => v / mx * span), order = ms.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
    hexEl.classList.add('reset'); paths.forEach(p => { p.style.fill = ''; p.classList.remove('on'); }); void hexEl.offsetWidth; hexEl.classList.remove('reset');
    paths.forEach(p => { const i = +p.dataset.i; p.style.setProperty('--dl', Math.round(ms[i]) + 'ms'); p.style.fill = `var(--${P[win[i]].k})`; p.classList.add('on'); });
    const KEYS = ['ALP', 'LNP', 'ONP', 'GRN', 'IND'], NM = { ALP: 'Labor', LNP: 'Coalition', ONP: 'One Nation', GRN: 'Greens', IND: 'Others' }, CL = { ALP: 'alp', LNP: 'coa', ONP: 'on', GRN: 'grn', IND: 'ind' };
    const tal = $('frtally'), t0 = performance.now(); if (mapT) clearInterval(mapT);
    const tick = () => { const el = performance.now() - t0, n = { ALP: 0, LNP: 0, ONP: 0, GRN: 0, IND: 0 }; let k = 0;
      for (const [v, i] of order) { if (v > el) break; n[KEY(win[i])]++; k++; }
      if (tal) tal.innerHTML = `<span class="ft-k">${k < 150 ? `Counting · ${k} of 150` : 'This run’s result'}</span>` + KEYS.filter(x => n[x]).sort((a, b) => n[b] - n[a]).map(x => `<span style="--c:var(--${CL[x]})"><b>${n[x]}</b> ${NM[x]}</span>`).join('');
      if (k >= 150) { clearInterval(mapT); mapT = null; } };
    tick(); if (span) mapT = setInterval(tick, 180); }

  // the campaign's faces, and the quick starts
  const C = window.CAMPAIGN_DATA, PICKS = ['anthony_albanese', 'angus_taylor', 'pauline_hanson', 'david_shoebridge', 'zali_steggall'], COL = { ALP: 'alp', LNP: 'coa', ONP: 'on', GRN: 'grn', IND: 'ind' };
  const L5 = C ? PICKS.map(id => C.leaders.find(l => l.id === id)).filter(Boolean) : [], sur = n => n.split(' ').slice(-1)[0];
  const ini = n => n.split(' ').map(w => w[0]).join('').slice(0, 2), pic = L => { try { return APP && APP.phOf ? APP.phOf(L.name) : null; } catch (e) { return null; } };
  const face = (L, cls) => { const src = pic(L); return `<span class="${cls}" style="--pc:var(--${COL[L.party]})">${src ? `<img src="${esc(src)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<em>${esc(ini(L.name))}</em></span>`; };
  const faces = $('frfaces'); if (faces) faces.innerHTML = L5.map((L, k) => face(L, 'ff f' + k)).join('');
  const lead = $('frlead'); if (lead) lead.innerHTML = L5.map(L => `<button type="button" class="frq-b who" data-play="${L.id}" aria-label="Play as ${esc(L.name)}">${face(L, 'fq')}<span>${esc(sur(L.name))}</span></button>`).join('') + '<button type="button" class="frq-b rand" data-play="random"><span class="dice" aria-hidden="true">' + (window.ICON ? ICON('dice') : '') + '</span><span>Random leader</span></button>';
  const pre = $('frpre'), sp = $('preset'); if (pre && sp) pre.innerHTML = sp.innerHTML;
  const note = $('frnote'); try { const r = JSON.parse(localStorage.getItem('es2028_campaign_run_v2') || 'null'); if (note && r && !['ENDED', 'FAILED'].includes(r.phase)) note.hidden = false; } catch (e) {}

  const play = (id, btn) => whenReady(() => { const L = id === 'random' || !C.leaders.some(l => l.id === id) ? C.leaders[Math.floor(Math.random() * C.leaders.length)] : C.leaders.find(l => l.id === id); hide('#campaign'); window.CampaignMode.start(L.id); }, btn);
  const openPreset = (name, btn) => whenReady(() => { hide('#sim'); const s2 = $('preset'); if (s2 && [...s2.options].some(o => o.value === name)) { s2.value = name; s2.dispatchEvent(new Event('change', { bubbles: true })); }
    const t = $('h-sand') || document.querySelector('.mast h1'); if (t) { t.scrollIntoView({ block: 'start' }); t.focus({ preventScroll: true }); } }, btn);
  fr.addEventListener('click', e => {
    const q = e.target.closest('[data-play]'); if (q) return play(q.dataset.play, q);
    const b = e.target.closest('[data-go]'); if (!b) return;
    if (b.dataset.go === 'preset') return pre && openPreset(pre.value, b);
    if (b.dataset.go === 'sim') { hide('#sim'); window.scrollTo(0, 0); const h = document.querySelector('.mast h1'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } }
    else whenReady(() => { hide('#campaign'); window.CampaignMode.open(); }, b); });
  document.addEventListener('click', e => { const a = e.target.closest && e.target.closest('.topbar [data-nav], .sitefoot [data-nav]'); if (!a) return; e.preventDefault();
    const go = a.dataset.nav, CM = window.CampaignMode;
    if (go === 'campaign') { whenReady(() => { hide('#campaign'); CM.open(); mk(); }, a); return; }
    if (CM && CM.close) CM.close();
    if (go === 'home') { try { history.replaceState(null, '', '#home'); } catch (x) {} show(); }
    else { hide('#sim'); window.scrollTo(0, 0); } mk(); });
  const home = $('homelink'); if (home) home.addEventListener('click', e => { e.preventDefault(); try { history.replaceState(null, '', '#home'); } catch (x) {} show(); });
  window.addEventListener('hashchange', () => { if (location.hash === '#home') show(); });
  document.addEventListener('keydown', e => { if (!fr.hidden && e.key === 'Escape') hide('#sim'); });
  { const m = /^#play=(.+)$/.exec(location.hash), n = /^#sim=(.+)$/.exec(location.hash); if (m) play(decodeURIComponent(m[1])); else if (n) openPreset(decodeURIComponent(n[1])); }
  if (!fr.hidden) { const h = $('fr-h'); if (h) h.focus({ preventScroll: true }); }
})();
