// Site chrome shared by every page: the colour theme (applied in <head>, before the page paints) and one top bar.
// The bar is the same everywhere: Home, the two modes (Sandbox, Campaign), the reference pages and the light/dark switch.
// On the simulator page the front page and campaign mode are overlays, so each carries its own copy of the bar.
(() => {
  const root = document.documentElement, MODES = ['auto', 'light', 'dark'], LAB = { auto: 'Auto', light: 'Light', dark: 'Dark' }, LIC = { auto: 'auto', light: 'sun', dark: 'moon' };
  let m = 'auto'; try { m = localStorage.getItem('theme') || 'auto'; } catch (e) {}
  if (!MODES.includes(m)) m = 'auto';
  const applyTheme = () => { if (m === 'auto') delete root.dataset.theme; else root.dataset.theme = m;
    document.querySelectorAll('.tb-theme').forEach(b => { b.innerHTML = (window.ICON ? ICON(LIC[m]) : '') + `<span>${LAB[m]}</span>`; b.setAttribute('aria-label', `Colour theme: ${m === 'auto' ? 'follows your device' : m}. Change`); }); };

  // ---- one set of line icons (24-unit grid, drawn in the text colour) used in place of emoji across the site
  const IC = {
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="8.5" cy="8.5" r="1.3" class="f"/><circle cx="15.5" cy="8.5" r="1.3" class="f"/><circle cx="12" cy="12" r="1.3" class="f"/><circle cx="8.5" cy="15.5" r="1.3" class="f"/><circle cx="15.5" cy="15.5" r="1.3" class="f"/>',
    storm: '<path d="M3.5 6h17M5.5 10h13M8 14h9M10 18h5M12 21.5v-1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
    auto: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v17A8.5 8.5 0 0 0 12 3.5z" class="f"/>',
    star: '<path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8z"/>',
    medal: '<circle cx="12" cy="14.5" r="5.5"/><path d="M8.5 3.5l2.5 6M15.5 3.5l-2.5 6M10.5 14.5l1.5-1.5v4"/>',
    diamond: '<path d="M12 3.5l6.5 8.5-6.5 8.5L5.5 12z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    cross: '<path d="M6 6l12 12M18 6L6 18"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 10.5v6.5"/><circle cx="12" cy="7.3" r="1.2" class="f"/>',
    skip: '<path d="M4.5 6.5l7 5.5-7 5.5zM11.5 6.5l7 5.5-7 5.5z" class="f"/><path d="M19.5 6v12"/>',
    play: '<path d="M7.5 5.5l11 6.5-11 6.5z" class="f"/>',
    next: '<path d="M8.5 6l6 6-6 6"/>',
    flip: '<path d="M4.5 10a7.5 7.5 0 0 1 13.3-3.8L19.5 8"/><path d="M19.5 4v4h-4"/><path d="M19.5 14a7.5 7.5 0 0 1-13.3 3.8L4.5 16"/><path d="M4.5 20v-4h4"/>'
  };
  const ICON = (n, cls) => `<svg class="ic ic-${n}${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${IC[n] || ''}</svg>`;
  window.ICON = ICON;
  applyTheme();
  // the colour-blind palette is switched off for now
  try { localStorage.removeItem('cb'); } catch (e) {} delete root.dataset.cb;

  const html = () => `<nav class="topbar" aria-label="Site"><a class="tb-mark" href="index.html#home" data-nav="home">Australia <b>2028</b></a>`
    + `<span class="tb-modes" role="group" aria-label="Mode"><a class="tb-mode" href="index.html#sim" data-nav="sandbox">Sandbox</a><a class="tb-mode" href="index.html#campaign" data-nav="campaign">Campaign</a></span>`
    + `<span class="tb-links"><a href="tier-list.html" data-pg="tiers">Tier list</a><a href="how-it-works.html" data-pg="how">How it works</a><a href="data.html" data-pg="data">Polls &amp; data</a><a href="about.html" data-pg="about">About</a></span>`
    + `<button type="button" class="tb-theme"></button></nav>`;
  const foot = () => `<footer class="sitefoot"><div class="sf-top"><a class="tb-mark" href="index.html#home" data-nav="home">Australia <b>2028</b></a>`
    + `<nav class="sf-nav" aria-label="Site"><a href="index.html#sim" data-nav="sandbox">Sandbox</a><a href="index.html#campaign" data-nav="campaign">Campaign</a><a href="tier-list.html">Tier list</a><a href="how-it-works.html">How it works</a><a href="data.html">Polls &amp; data</a><a href="about.html">About</a></nav></div>`
    + `<p><b>Australia 2028 Election Simulator</b> is an independent, non-commercial hobby project. It is not affiliated with or endorsed by the Parliament of Australia, the Australian Electoral Commission, any party or any media organisation. XYZ News and its reporters are fictional, and every result shown is a simulation, not a prediction.</p>`
    + `<p class="credit">Official portraits of Members and Senators: &copy; Commonwealth of Australia, AUSPIC / Department of Parliamentary Services, from the <a href="https://www.aph.gov.au/Senators_and_Members/Members/Members_Photos">Parliament of Australia website</a>, used under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" rel="license">CC BY-NC-ND 4.0</a> and shown without changes. Other photos: Wikimedia Commons. <a href="about.html#photo-credits">Full photo credits</a>.</p></footer>`;
  // the footer, the same everywhere: in place of <div data-footer>, or at the end of an overlay
  function mountFoot(el, where) { if (!el) return null; const t = document.createElement('div'); t.innerHTML = foot(); const f = t.firstElementChild;
    if (where === 'replace') el.replaceWith(f); else el.appendChild(f); return f; }

  // ---- information on hover, focus or tap. Two forms: an (i) button beside a heading or label ([data-ih] gets one added,
  // or markup includes SiteBar.ib(key)), and a dotted-underlined term ([data-info]). The text is a glossary key (@key) or literal.
  const G = {
    forecast: 'The simulator plays the election out thousands of times, seat by seat, with polling error built in. Each figure is the share of those runs that end that way.',
    majority: '76 of the 150 House seats. A party with 76 or more can govern in its own right.',
    hung: 'No party reaches 76 seats. Whoever can win a confidence vote on the floor of the House, usually with crossbench support, forms government.',
    tpp: 'Two-party preferred: each side’s share after every preference has been distributed, in a contest between two parties (usually Labor and the Coalition).',
    tcp: 'Two-candidate preferred: in a single seat, the share for each of the final two candidates after preferences, whichever parties they are.',
    fp: 'First preferences: the number 1 votes each party receives, before any preferences are distributed.',
    prefs: 'When a candidate is eliminated, their ballots pass to each voter’s next choice. The model uses the flows from the 2025 election, adjusted by your settings.',
    swing: 'The change in a party’s vote since the 2025 election, in percentage points.',
    mrp: 'MRP (multilevel regression and post-stratification): a large poll modelled down to each seat using its census profile. The model blends in DemosAU’s August–September 2026 seat estimates.',
    quota: 'In a half-Senate election each state elects 6 senators, so a candidate needs one-seventh of the formal vote plus one (about 14.3%) to be elected outright.',
    crossbench: 'Members and senators outside the government and the main Opposition: minor parties and independents.',
    seatmap: 'Each electorate is coloured by its most likely winner. Paler shades mean the model is less sure. Select a seat for its detail, or replay results night to watch the count.',
    watch: 'The 20 seats closest to a coin toss across all the simulations: where the election is most likely to be won and lost.',
    path76: 'For each party, its seats ordered from safest to most marginal: how far down the list it has to win to reach 76.',
    gov: 'How often each kind of government comes up across the simulations: a majority for one side, or a hung parliament.',
    dist: 'The spread of each party’s seat total across all the simulations: the middle of the bar is the typical result, the ends are the unlikely ones.',
    results: 'Each party’s vote and seats in the central forecast: the single most likely result in every seat added together.',
    states: 'Each state’s seats, coloured by their most likely winner, with the state totals.',
    pendulum: 'Every seat ranked by how much the winner leads by after preferences. A uniform swing knocks over every seat below that margin.',
    senate: '40 of the 76 senators are elected in 2028 (6 per state, 2 per territory); the rest continue. 39 seats control the chamber.',
    leaders: 'Changing a party’s leader changes its vote: each leader carries an estimated effect, strongest in their home state.',
    pp: 'Political Power: earned each turn and spent on campaign decisions such as blitzes and drives.',
    unity: 'Caucus unity\nBelow 40: the leaks start.\nBelow 30: your leadership is under threat.',
    tier: 'Result tiers\nEach party has three tiers of success and a defeat, set by its seats and whether it governs.\nTier 1 is the best result your side could hope for.',
    score: 'Ten points a seat, a bonus for your tier and the honours you earned, scaled by difficulty.',
    hall: 'Your past campaigns, saved in this browser: best tier and score for each leader you have played, your recent runs and your daily challenges.',
    honours: 'Achievements for particular results and ways of playing. Earned ones stay in this browser.',
    mode: 'Three ways to play\nFree campaign: any leader, any unlocked opening.\nToday’s challenge: one leader and one opening, drawn at random each day and the same for everyone.\nIronman: no exact polls, and leaving counts as a loss.',
    difficulty: 'Difficulty\nEasy: softens bad news and rival attacks.\nHard: sharpens them.\nScores are scaled to match.',
    opening: 'Where the campaign starts\nToday’s polls, or a different set of circumstances to fight from.\nMore openings unlock as you earn honours; the easy Honeymoon start is unlocked last.',
    playas: 'Start a campaign straight away as one of these leaders. Every other leader is in campaign mode.',
    scenario: 'Open the sandbox already set to one of the prepared scenarios. You can change anything from there.',
    simnight: 'A single simulated election night: each seat’s winner is drawn from its chances in the model, so the result is different on every visit.'
  };
  const ib = (key, lab) => `<button type="button" class="info-b" data-info="@${key}" aria-label="${lab ? 'About ' + lab : 'What is this?'}">${ICON('info')}</button>`;
  const textOf = v => v && v[0] === '@' ? G[v.slice(1)] || '' : v || '';
  let pop = null, popFor = null, popAt = 0;
  function popEl() { if (pop) return pop; pop = document.createElement('div'); pop.className = 'info-pop'; pop.id = 'infopop'; pop.setAttribute('role', 'tooltip'); pop.hidden = true; document.body.appendChild(pop); return pop; }
  // Multi-line text: first line is the heading, each further line its own row; a short "Label:" opening a row is set in bold.
  function fillPop(p, t) {
    p.textContent = ''; const lines = String(t).split('\n').map(x => x.trim()).filter(Boolean);
    if (lines.length < 2) { p.textContent = lines[0] || ''; return; }
    const h = document.createElement('b'); h.className = 'ip-h'; h.textContent = lines[0]; p.appendChild(h);
    lines.slice(1).forEach(l => { const r = document.createElement('span'); r.className = 'ip-l'; const m = l.match(/^([^:]{2,26}):\s+(.*)$/);
      if (m) { const k = document.createElement('b'); k.textContent = m[1] + ': '; r.appendChild(k); r.appendChild(document.createTextNode(m[2])); } else r.textContent = l; p.appendChild(r); });
  }
  function showInfo(el) { const t = textOf(el.dataset.info); if (!t) return; const p = popEl(); popFor = el; popAt = Date.now(); fillPop(p, t); p.hidden = false; el.setAttribute('aria-describedby', 'infopop');
    const r = el.getBoundingClientRect(), w = Math.min(320, innerWidth - 16); p.style.maxWidth = w + 'px';
    const pw = p.offsetWidth, ph = p.offsetHeight; let x = r.left + r.width / 2 - pw / 2; x = Math.max(8, Math.min(innerWidth - pw - 8, x));
    let y = r.bottom + 8; if (y + ph > innerHeight - 8) y = Math.max(8, r.top - ph - 8); p.style.left = x + 'px'; p.style.top = y + 'px'; }
  function hideInfo() { if (pop) pop.hidden = true; if (popFor) popFor.removeAttribute('aria-describedby'); popFor = null; }
  const infoAt = t => t && t.closest ? t.closest('[data-info]') : null;
  document.addEventListener('pointerover', e => { if (e.pointerType !== 'mouse') return; const el = infoAt(e.target); if (el && el !== popFor) showInfo(el); else if (!el && popFor && !(pop && pop.contains(e.target))) hideInfo(); });
  document.addEventListener('click', e => { const el = infoAt(e.target); if (!el) { if (popFor && !(pop && pop.contains(e.target))) hideInfo(); return; }
    e.preventDefault(); e.stopPropagation(); if (popFor === el && Date.now() - popAt > 350) hideInfo(); else showInfo(el); }, true);
  document.addEventListener('focusin', e => { const el = infoAt(e.target); if (el) showInfo(el); else if (popFor) hideInfo(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && popFor) hideInfo(); });
  window.addEventListener('scroll', () => { if (popFor) hideInfo(); }, true); window.addEventListener('resize', () => { if (popFor) hideInfo(); });
  // headings and labels marked data-ih="key" get an (i) button; terms marked data-info become focusable
  function infoize(rootEl) { (rootEl || document).querySelectorAll('[data-ih]').forEach(h => { if (h.querySelector(':scope > .info-b')) return; h.insertAdjacentHTML('beforeend', ' ' + ib(h.dataset.ih, h.textContent.trim())); });
    (rootEl || document).querySelectorAll('[data-info]:not(.info-b):not([tabindex])').forEach(t => { t.setAttribute('tabindex', '0'); t.classList.add('info-t'); }); }
  // on the reference pages, the first mention of each key term gets its explanation
  const TERMS = [['two-party preferred', 'tpp'], ['two-candidate', 'tcp'], ['first preference', 'fp'], ['preference flows', 'prefs'], ['MRP', 'mrp'], ['hung parliament', 'hung'], ['quota', 'quota'], ['crossbench', 'crossbench'], ['swing', 'swing']];
  function glossPage() { const main = document.querySelector('main.page'); if (!main) return; const done = new Set();
    const walk = document.createTreeWalker(main, NodeFilter.SHOW_TEXT, { acceptNode: n => n.parentElement.closest('a,button,h1,h3,th,[data-info],script,style') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const nodes = []; while (walk.nextNode()) nodes.push(walk.currentNode);
    for (const n of nodes) for (const [term, key] of TERMS) { if (done.has(key)) continue; const re = new RegExp(`\\b${term.replace(/[-]/g, '[- ]')}\\b`, term === 'MRP' ? '' : 'i'), m = re.exec(n.nodeValue); if (!m) continue;
      done.add(key); const after = n.splitText(m.index), rest = after.splitText(m[0].length), span = document.createElement('span'); span.dataset.info = '@' + key; span.textContent = after.nodeValue; after.replaceWith(span); break; }
    infoize(main); }
  // which item is current: the page itself, or on the simulator page, whichever view is showing
  function mark() { let cur = (document.body && document.body.dataset.page) || ''; const fr = document.getElementById('front');
    if (fr) cur = !fr.hidden ? 'home' : document.body.classList.contains('cmp-open') ? 'campaign' : 'sandbox';
    document.querySelectorAll('.topbar [data-nav], .topbar [data-pg]').forEach(a => { const on = (a.dataset.nav || a.dataset.pg) === cur && cur !== '';
      a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); }); }
  // put a bar in place of every <div data-topbar> (pages) or at the top of an overlay
  // every bar sits in a slot that reserves its height; the bar itself is pinned to the screen (or the overlay), not to the
  // content column, so it is in exactly the same place on every view
  function mount(el, where) { if (!el) return null; const slot = document.createElement('div'); slot.className = 'tb-slot'; slot.innerHTML = html(); const bar = slot.firstElementChild;
    if (where === 'replace') el.replaceWith(slot); else el.insertBefore(slot, el.firstChild); applyTheme(); mark(); watch(bar); return bar; }
  const RO = window.ResizeObserver ? new ResizeObserver(() => size()) : null;
  function size() { const h = Math.max(0, ...[...document.querySelectorAll('.topbar')].map(b => b.offsetHeight)); if (h) root.style.setProperty('--tbh', h + 'px'); }
  function watch(bar) { if (RO) RO.observe(bar); size(); }
  document.addEventListener('click', e => { const t = e.target.closest && e.target.closest('.tb-theme'); if (!t) return;
    m = MODES[(MODES.indexOf(m) + 1) % 3]; try { localStorage.setItem('theme', m); } catch (x) {} applyTheme(); window.dispatchEvent(new Event('themechange')); });
  window.addEventListener('resize', () => size());
  const init = () => { glossPage(); infoize(); document.querySelectorAll('[data-topbar]').forEach(el => mount(el, 'replace')); document.querySelectorAll('[data-footer]').forEach(el => mountFoot(el, 'replace')); mark(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.SiteBar = { html, mark, mount, foot, mountFoot, ib, infoize, gloss: G };
})();
