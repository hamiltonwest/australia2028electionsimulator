// The campaign tier list page: draws window.TIERLIST (from the balance run) as six grade bands with a party filter.
(() => {
  const T = window.TIERLIST; if (!T) return;
  const $ = id => document.getElementById(id), esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const COL = { ALP: 'var(--alp)', LNP: 'var(--coa)', ONP: 'var(--on)', GRN: 'var(--grn)', IND: 'var(--ind)' };
  const BAND = { A: ['Strongest picks', 'Wins come easily. A good first campaign.'], B: ['Strong', 'Usually lands in the top two tiers with sensible play.'],
    C: ['Fair', 'A real contest: good decisions decide it.'], D: ['Tough', 'Random play tends to fall short; strong play still gets there.'],
    E: ['Hard', 'Little room for error, and some never reach the campaign.'], F: ['Hardest', 'For experienced players: even strong play often comes up short.'] };
  const ini = n => n.split(' ').map(w => w[0]).join('').slice(0, 2);
  const face = L => `<span class="tl-ph" style="--pc:${COL[L.party]}">${L.ph ? `<img src="${esc(L.ph)}" alt="" loading="lazy" onerror="this.remove()">` : ''}<em>${esc(ini(L.name))}</em></span>`;
  const tags = L => [L.cb ? 'Comeback' : '', L.fresh ? 'Fresh face' : '', L.by ? 'By-election first' : '', L.spill ? 'Spill first' : ''].filter(Boolean).map(t => `<span class="tl-tag">${t}</span>`).join('');
  const card = L => `<article class="tl-card" data-party="${L.party}" style="--pc:${COL[L.party]}">${face(L)}<div class="tl-body"><h3>${esc(L.name)}</h3><div class="tl-pty">${esc(L.pn)}${tags(L)}</div>
    <dl class="tl-stats"><div><dt>Typical result</dt><dd>${esc(L.typ)}</dd></div><div><dt>Optimal selections</dt><dd>${esc(L.top)}</dd></div>
    <div><dt>Wins</dt><dd class="num">${L.win}%</dd></div>${L.fail ? `<div><dt>Knocked out</dt><dd class="num">${L.fail}%</dd></div>` : ''}</dl></div>
    <button type="button" class="tl-g g-${L.grade}${L.id === 'mark_latham' ? ' g-lplate' : ''}" data-info="${esc(L.why)}" aria-label="Grade ${L.grade}: why">${L.id === 'mark_latham' ? '<svg class="lp-l" viewBox="0 0 20 20" aria-hidden="true"><path d="M5.6 3.2h3.1v10.3h5.7v3.3H5.6z"/></svg>' : L.grade}</button></article>`;
  // the five strongest overall, then every grade band
  $('tlfeat').innerHTML = T.leaders.slice(0, 5).map((L, i) => `<a class="tl-fc" href="index.html#play=${encodeURIComponent(L.id)}" style="--pc:${COL[L.party]}"><span class="tl-rank">${i + 1}</span><span class="tl-fg g-${L.grade}" data-info="${esc(L.why)}" aria-label="Grade ${L.grade}: why">${L.grade}</span>${face(L)}<b>${esc(L.name)}</b><small>${esc(L.pn)} · ${esc(L.typ)}</small><span class="tl-play">Play →</span></a>`).join('');
  $('tlbands').innerHTML = Object.keys(BAND).map(g => { const ls = T.leaders.filter(L => L.grade === g); if (!ls.length) return '';
    return `<section class="tl-band" data-g="${g}" aria-labelledby="tlb-${g}"><header class="tl-bh"><span class="tl-big g-${g}">${g}</span><div><h2 id="tlb-${g}">${BAND[g][0]} <small>${ls.length} leader${ls.length > 1 ? 's' : ''}</small></h2><p>${BAND[g][1]}</p></div></header><div class="tl-grid">${ls.map(card).join('')}</div></section>`; }).join('');
  // filter by party
  const PN = [['all', 'All'], ['ALP', 'Labor'], ['LNP', 'Coalition'], ['ONP', 'One Nation'], ['GRN', 'Greens'], ['IND', 'Teals']];
  $('tlchips').innerHTML = PN.map(([k, n]) => `<button type="button" class="tl-chip${k === 'all' ? ' on' : ''}" data-p="${k}" aria-pressed="${k === 'all'}">${n}</button>`).join('');
  $('tlchips').addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b) return; const p = b.dataset.p;
    document.querySelectorAll('.tl-chip').forEach(c => { const on = c === b; c.classList.toggle('on', on); c.setAttribute('aria-pressed', String(on)); });
    document.querySelectorAll('.tl-card').forEach(c => { c.hidden = p !== 'all' && c.dataset.party !== p; });
    document.querySelectorAll('.tl-band').forEach(s => { s.hidden = ![...s.querySelectorAll('.tl-card')].some(c => !c.hidden); }); });
  if (window.SiteBar) SiteBar.infoize();
})();
