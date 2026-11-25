// Collection Binder & Head-to-Head Leader Card Comparator for Campaign Mode.
// 100% static and browser-local: reads live simulator data (CAMPAIGN_DATA, TIERLIST, TRAITS, CARD_ART, CAMPAIGN_ACH)
// and browser localStorage profile records without any external requests.
window.CAMPAIGN_COLL = (() => {
  const PACKW = { A: 1, B: 2, C: 3, D: 3, E: 3, F: 3, N: 3 };
  const RAR_GROUPS = [
    { key: 'A', label: 'Holo Rare', grades: ['A'], cls: 'r-A' },
    { key: 'B', label: 'Gold', grades: ['B'], cls: 'r-B' },
    { key: 'C', label: 'Silver', grades: ['C'], cls: 'r-C' },
    { key: 'D', label: 'Bronze', grades: ['D'], cls: 'r-D' },
    { key: 'EF', label: 'Common', grades: ['E', 'F', 'N'], cls: 'r-E' }
  ];
  const RAR_NAME = { A: 'Holo Rare', B: 'Gold', C: 'Silver', D: 'Bronze', E: 'Common', F: 'Common', N: 'Common', V: 'Vault Legend' };
  const RAR_ORDER = { V: -1, A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, N: 6 };
  const FOIL_LABEL = ['Standard', 'Platinum Foil', 'Prism Edition'];
  const GRADE_DESC = { A: 'Strongest pick', B: 'Strong', C: 'Fair', D: 'Tough', E: 'Hard', F: 'Hardest', N: 'Unrated' };
  const MR_LABEL = ['Tier I reached', 'Tier II reached', 'Tier III reached', 'Played'];
  const TAG_LABELS = {
    ECONOMY: 'Economy',
    COST_OF_LIVING: 'Cost of living',
    HOUSING: 'Housing',
    ENERGY: 'Energy',
    NATIONAL_SECURITY: 'National security',
    TAX: 'Tax',
    MIGRATION: 'Migration',
    CRISIS: 'Scandals & crises',
    HEALTH: 'Health'
  };

  const state = {
    bStatus: 'all', // all | owned | missing | mastered | vault | foils
    bParty: 'all',  // all | ALP | LNP | ONP | GRN | IND | KAP
    bRar: 'all',    // all | A | B | C | D | EF | V
    bSort: 'no',    // no | grade | party | mastery | recent
    bQ: '',
    bOpen: null,    // leader id shown in Binder dossier modal
    cmpA: null,
    cmpB: null,
    cmpCardsOpen: false // mobile toggle for full 3D trading cards in Comparator
  };

  const fmtSign = (v, dp) => {
    const n = +v || 0;
    const d = dp != null ? dp : (Math.abs(n) < 10 && Math.round(n * 10) !== n * 10 ? 2 : 1);
    const s = Math.abs(n).toFixed(d).replace(/\.0$/, '');
    return n > 0 ? `+${s}` : n < 0 ? `−${s}` : '0';
  };
  const fmtDate = ts => {
    if (!ts || ts <= 1) return 'Starter leader';
    try {
      return new Date(ts).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return 'Collected';
    }
  };
  const rarBucketOf = g => (g === 'E' || g === 'F' || g === 'N' || !g) ? 'EF' : g;
  const tagName = k => TAG_LABELS[k] || k.toLowerCase().replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());

  // Build Hall of Fame aggregate map once per render
  function hofMap(ctx) {
    const map = {};
    (ctx.E.hall() || []).forEach(x => {
      if (!x || x.ab || !x.leader) return;
      const o = map[x.leader] || (map[x.leader] = { runs: 0, wins: 0, bestK: 9, bestTier: '', bestSeats: 0, bestScore: 0, lastAt: 0 });
      o.runs++;
      if (x.gov) o.wins++;
      if (x.k < o.bestK) { o.bestK = x.k; o.bestTier = x.tier || ''; }
      if ((x.seats || 0) > o.bestSeats) o.bestSeats = x.seats || 0;
      if ((x.score || 0) > o.bestScore) o.bestScore = x.score || 0;
      if ((x.at || 0) > o.lastAt) o.lastAt = x.at || 0;
    });
    return map;
  }

  // Raw sandbox traits with exact numeric national and demographic/state vectors
  function rawTraits(L, ctx) {
    const T = window.TRAITS;
    if (!T) return [];
    const P = ctx.C.PARTIES[L.party];
    const ids = T.A[L.name + '|' + (L.sb || P.ldr)] || T.A[L.name] || [];
    return ids.map(id => T.L[id]).filter(Boolean).map(t => ({
      n: t[0],
      tier: t[1],
      d: t[2],
      nat: +t[3] || 0,
      mods: (t[4] || []).map(([k, v]) => ({
        key: k,
        val: +v || 0,
        isState: /^st:/.test(k),
        label: /^st:/.test(k) ? ((T.ML || {})[k] || k.slice(3)) : ((T.ML || {})[k] || k)
      }))
    }));
  }

  function buildProfile(L, ctx, hMap, mast, cData) {
    const C = ctx.C, P = C.PARTIES[L.party], EC = ctx.EC;
    const no = ctx.cardNo ? ctx.cardNo(L) : (C.leaders.indexOf(L) + 1);
    const tl = ((window.TIERLIST || {}).leaders || []).find(x => x.id === L.id) || null;
    const rar = tl ? tl.grade : 'N';
    const isVault = !!L.craftOnly;
    const rarBucket = isVault ? 'V' : rarBucketOf(rar);
    const rarLabel = isVault ? 'Vault Legend' : RAR_NAME[rar];
    const ownedAt = (cData.owned || {})[L.id] || 0;
    const owned = !!ownedAt;
    const craftedAt = (cData.crafted || {})[L.id] || 0;
    const foilTier = EC ? EC.foilTierOf(cData, L.id) : 0;
    const craftCost = EC ? EC.craftCost(L, rar) : (isVault ? 500 : 80);
    const seat = ((ctx.APP.DATA.leaders.find(x => x.name === L.name && x.party === (L.sb || P.ldr)) || {}).seat || '').replace(' (candidate)', ' (running)');
    const fac = (L.party === 'ALP' || (L.party === 'LNP' && L.sb !== 'Nationals')) && ctx.facOf(L.name) ? ctx.facOf(L.name) : '';
    const byInfo = (C.byElect || {})[L.id] || null;
    const routeShort = byInfo
      ? (L.inc ? `By-election (${byInfo[0]})` : `By-election (${byInfo[0]}) + spill`)
      : L.inc ? 'Straight to campaign' : '5-question spill first';
    const routeSteps = byInfo ? (L.inc ? 1 : 2) : L.inc ? 0 : 1;
    const art = (window.CARD_ART || {})[L.name] || null;
    const ph = art ? art.src : ctx.APP.phOf(L.name);
    const traits = rawTraits(L, ctx);
    const netNat = +traits.reduce((s, t) => s + t.nat, 0).toFixed(2);
    const demMap = {};
    traits.forEach(t => t.mods.forEach(m => {
      if (!m.val) return;
      if (!demMap[m.key]) demMap[m.key] = { key: m.key, label: m.label, isState: m.isState, val: 0 };
      demMap[m.key].val = +(demMap[m.key].val + m.val).toFixed(2);
    }));
    const hof = hMap[L.id] || { runs: 0, wins: 0, bestK: 9, bestTier: '', bestSeats: 0, bestScore: 0, lastAt: 0 };
    const prog = ctx.ldrProg(L);
    const mk = mast[L.id];
    const searchQ = (L.name + ' ' + seat + ' ' + P.n + (L.sb ? ' ' + L.sb : '') + ' ' + fac + ' ' + (byInfo ? byInfo[0] : '') + ' ' + rarLabel + ' ' + RAR_NAME[rar] + (isVault ? ' vault legend craft' : '') + (foilTier === 1 ? ' platinum chrome foil' : foilTier === 2 ? ' prism foil edition' : '') + ' no.' + String(no).padStart(3, '0')).toLowerCase();
    return {
      L, id: L.id, name: L.name, party: L.party, partyName: P.n, no, tl, rar, isVault, rarBucket, rarLabel,
      owned, ownedAt, craftedAt, foilTier, craftCost, seat, fac, byInfo, routeShort, routeSteps, art, ph,
      traits, netNat, demMap, hof, prog, mk, searchQ
    };
  }

  function allProfiles(ctx) {
    const hMap = hofMap(ctx), mast = ctx.E.mastery(), cData = ctx.coll();
    return ctx.C.leaders.map(L => buildProfile(L, ctx, hMap, mast, cData));
  }

  // Exact remaining pack pull odds based on PACKW and uncollected pack-eligible leaders (excludes craft-only Vault Legends)
  function calcPackOdds(profs) {
    const packPool = profs.filter(p => !p.isVault);
    const fresh = packPool.filter(p => !p.owned);
    const pool = fresh.length ? fresh : packPool;
    const totalW = pool.reduce((a, p) => a + (PACKW[p.rar] || 3), 0);
    return RAR_GROUPS.map(g => {
      const items = pool.filter(p => g.grades.includes(p.rar));
      const w = items.reduce((a, p) => a + (PACKW[p.rar] || 3), 0);
      const single = totalW ? w / totalW : 0;
      let pNone = 1;
      if (pool.length <= 3) {
        pNone = items.length ? 0 : 1;
      } else if (items.length === 0) {
        pNone = 1;
      } else {
        let remTot = totalW, remOther = totalW - w;
        const avgOtherW = (pool.length - items.length) > 0 ? remOther / (pool.length - items.length) : 0;
        for (let k = 0; k < 3; k++) {
          if (remTot <= 0 || remOther <= 0) { pNone = 0; break; }
          pNone *= Math.max(0, remOther / remTot);
          remOther -= avgOtherW;
          remTot -= avgOtherW;
        }
      }
      const inPack = Math.max(0, Math.min(1, 1 - pNone));
      return {
        ...g,
        remaining: fresh.filter(p => g.grades.includes(p.rar)).length,
        owned: packPool.filter(p => p.owned && g.grades.includes(p.rar)).length,
        total: packPool.filter(p => g.grades.includes(p.rar)).length,
        singlePct: single * 100,
        packPct: inPack * 100
      };
    });
  }

  function filteredBinderProfiles(profs) {
    const q = state.bQ.trim().toLowerCase();
    let list = profs.filter(p => {
      if (state.bStatus === 'owned' && !p.owned) return false;
      if (state.bStatus === 'missing' && p.owned) return false;
      if (state.bStatus === 'mastered' && p.mk == null) return false;
      if (state.bStatus === 'vault' && !p.isVault) return false;
      if (state.bStatus === 'foils' && !(p.owned && p.foilTier > 0)) return false;
      if (state.bParty !== 'all' && p.party !== state.bParty) return false;
      if (state.bRar !== 'all' && p.rarBucket !== state.bRar) return false;
      if (q && !p.searchQ.includes(q)) return false;
      return true;
    });
    const partyOrd = ['ALP', 'LNP', 'ONP', 'GRN', 'IND', 'KAP'];
    list = list.slice().sort((a, b) => {
      if (state.bSort === 'grade') {
        const ra = a.isVault ? 'V' : a.rar, rb = b.isVault ? 'V' : b.rar;
        const gd = (RAR_ORDER[ra] ?? 9) - (RAR_ORDER[rb] ?? 9);
        return gd || ((b.tl ? b.tl.score : -9) - (a.tl ? a.tl.score : -9)) || a.no - b.no;
      }
      if (state.bSort === 'party') {
        return partyOrd.indexOf(a.party) - partyOrd.indexOf(b.party) || (RAR_ORDER[a.rar] ?? 9) - (RAR_ORDER[b.rar] ?? 9) || a.no - b.no;
      }
      if (state.bSort === 'mastery') {
        const am = a.mk == null ? 99 : a.mk, bm = b.mk == null ? 99 : b.mk;
        return am - bm || (b.hof.bestScore - a.hof.bestScore) || (b.owned ? 1 : 0) - (a.owned ? 1 : 0) || a.no - b.no;
      }
      if (state.bSort === 'recent') {
        return (b.ownedAt || 0) - (a.ownedAt || 0) || a.no - b.no;
      }
      return a.no - b.no;
    });
    return list;
  }

  // ---- COLLECTION BINDER RENDERER
  function renderBinder(ctx) {
    const esc = ctx.esc, C = ctx.C, EC = ctx.EC, profs = allProfiles(ctx), cData = ctx.coll();
    const total = profs.length;
    const totalPad = String(total).padStart(3, '0');
    const ownedCount = profs.filter(p => p.owned).length;
    const masteredCount = profs.filter(p => p.mk != null).length;
    const foilCount = profs.filter(p => p.owned && p.foilTier > 0).length;
    const vaultProfs = profs.filter(p => p.isVault).sort((a, b) => a.no - b.no);
    const vaultRange = vaultProfs.length
      ? `${String(vaultProfs[0].no).padStart(3, '0')}–${String(vaultProfs[vaultProfs.length - 1].no).padStart(3, '0')}`
      : `001–005`;
    const vaultOwned = vaultProfs.filter(p => p.owned).length;
    const packPoolCount = total - vaultProfs.length;
    const packOwnedCount = profs.filter(p => !p.isVault && p.owned).length;
    const dust = cData.dust || 0;
    const pct = Math.round(ownedCount / total * 100);
    const leftPacks = ctx.packsLeft(), nextAt = ctx.nextPackAt();
    const rarOdds = calcPackOdds(profs);
    const filtered = filteredBinderProfiles(profs);

    const partyStats = Object.entries(C.PARTIES).map(([k, P]) => {
      const items = profs.filter(p => p.party === k);
      const got = items.filter(p => p.owned).length;
      return { key: k, name: P.n, got, total: items.length, pct: items.length ? Math.round(got / items.length * 100) : 0 };
    });

    const binderSlot = p => {
      const noStr = String(p.no).padStart(3, '0');
      const inits = nm => String(nm || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?';
      const img = p.ph && !/^data:/.test(p.ph)
        ? `<img src="${esc(p.ph)}" alt="" loading="lazy"${p.art && p.art.pos ? ` style="object-position:${esc(p.art.pos)}"` : ''}>`
        : `<span class="bds-init" aria-hidden="true">${esc(inits(p.name))}</span>`;
      const rib = p.mk != null ? `<i class="bds-rib m${Math.min(3, p.mk)}" title="${MR_LABEL[Math.min(3, p.mk)]}">${p.mk <= 2 ? ['I', 'II', 'III'][p.mk] : '·'}</i>` : '';
      const active = state.bOpen === p.id ? ' on' : '';
      const rarCls = p.isVault ? 'r-V is-vault' : `r-${p.rar}`;
      const foilCls = p.owned && p.foilTier ? ` foil-${p.foilTier}` : '';
      const finishLbl = p.owned && p.foilTier ? FOIL_LABEL[p.foilTier] : '';
      const footTxt = p.owned
        ? (finishLbl
          ? `${finishLbl} · ${p.hof.runs ? `${p.hof.bestSeats} seats` : `${p.prog.a}/${p.prog.h} hon.`}`
          : (p.hof.runs ? `${p.hof.bestSeats} best seats · ${p.prog.a}/${p.prog.h} hon.` : `Collected · ${p.prog.a}/${p.prog.h} hon.`))
        : `${p.isVault ? 'Vault' : 'Craft'} · ${p.craftCost} Dust`;
      const pc = ctx.cardPC ? ctx.cardPC(p.L) : ctx.PC(p.party);
      return `<button type="button" class="bd-slot ${rarCls}${foilCls}${p.owned ? ' owned' : ' missing'}${active}" data-bopen="${p.id}" data-bq="${esc(p.searchQ)}" style="--pc:${pc}" aria-label="No. ${noStr} ${esc(p.name)}, ${esc(p.L.sb === 'Nationals' ? 'Nationals' : p.partyName)}, ${esc(p.rarLabel)}, ${p.owned ? (finishLbl || 'Collected') : `Craft for ${p.craftCost} Dust`}">
        <span class="bds-in">
          <span class="bds-top"><span class="bds-no num">#${noStr}</span><span class="bds-g g-${p.rar}">${p.id === 'mark_latham' ? 'L' : p.rar}</span></span>
          <span class="bds-art">${img}${!p.owned ? `<span class="bds-veil${p.isVault ? ' vlt' : ''}" aria-hidden="true"><span>${p.isVault ? 'Vault · ' + p.craftCost : 'Locked'}</span></span>` : ''}${rib}</span>
          <span class="bds-meta"><b>${esc(p.name)}</b><small>${esc(p.L.sb === 'Nationals' ? 'Nationals' : p.partyName)} · ${esc(p.rarLabel)}</small></span>
          <span class="bds-foot num${p.owned && p.foilTier ? ' f' + p.foilTier : ''}">${esc(footTxt)}</span>
        </span>
      </button>`;
    };

    const vaultCard = p => {
      const noStr = String(p.no).padStart(3, '0');
      const img = p.ph && !/^data:/.test(p.ph)
        ? `<img src="${esc(p.ph)}" alt="" loading="lazy"${p.art && p.art.pos ? ` style="object-position:${esc(p.art.pos)}"` : ''}>`
        : `<span class="bdv-init">${esc(String(p.name || '').trim().split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || '?')}</span>`;
      const canCraft = !p.owned && dust >= p.craftCost;
      const statusText = p.owned
        ? (p.foilTier ? FOIL_LABEL[p.foilTier] : 'Collected')
        : (canCraft ? `Ready · ${p.craftCost} Dust` : `Craft · ${p.craftCost} Dust`);
      const roleShort = p.party === 'KAP' ? 'KAP · Majority Run' : `${p.partyName} · By-election + Spill`;
      const pc = ctx.cardPC ? ctx.cardPC(p.L) : ctx.PC(p.party);
      return `<button type="button" class="bdv-card${p.owned ? ' owned' : ' locked'}${canCraft ? ' ready' : ''}${p.owned && p.foilTier ? ' foil-' + p.foilTier : ''}" data-bopen="${p.id}" style="--pc:${pc}">
        <span class="bdv-art">${img}<span class="bdv-no num">#${noStr}</span></span>
        <span class="bdv-info">
          <b>${esc(p.name)}</b>
          <small>${esc(roleShort)}</small>
          <em class="bdv-tag num${p.owned && p.foilTier ? ' f' + p.foilTier : ''}">${esc(statusText)}</em>
        </span>
      </button>`;
    };

    const rarFilterName = state.bRar === 'V'
      ? 'Vault Legend'
      : ((RAR_GROUPS.find(x => x.key === state.bRar) || {}).label || '');

    const dossierHtml = state.bOpen ? renderDossier(profs, filtered, ctx) : '';

    return ctx.toolbar()
      + ctx.mast('Campaign mode · Series one', 'Collection Binder', `Every leader trading card from No. 001 to No. ${totalPad}. Earn Card Dust from duplicate packs, campaigns and honours to craft missing leaders, unlock the five Vault Legends, or upgrade finishes to Platinum and Prism foil.`)
      + `<div class="bd-topnav"><button type="button" class="cmp-link back" data-a="back">← Back to leaders</button><div class="bd-topacts"><button type="button" class="ghost" data-a="compare">Compare two leaders →</button>${ctx.packBtn()}</div></div>`
      + `<section class="bd-summary" aria-label="Collection overview">
          <div class="bd-sum-main">
            <div class="bd-sum-head">
              <div><span class="kick">Album completion</span><h3 class="bd-big num">${ownedCount}<span>/${total}</span> <small>${pct}% collected</small></h3></div>
              <div class="bd-sum-kpis num">
                <span class="kpi-dust"><b>${dust.toLocaleString()}</b><small>Card Dust</small></span>
                <span><b>${foilCount}</b><small>Foils</small></span>
                <span><b>${masteredCount}</b><small>Played</small></span>
                <span><b>${total - ownedCount}</b><small>Missing</small></span>
                <span><b>${leftPacks}</b><small>Packs ready</small></span>
              </div>
            </div>
            <div class="bd-meter" role="progressbar" aria-valuenow="${ownedCount}" aria-valuemin="0" aria-valuemax="${total}" aria-label="${ownedCount} of ${total} leaders collected"><i style="width:${pct}%"></i></div>
            <p class="bd-packnote">${leftPacks > 0
              ? (packOwnedCount >= packPoolCount
                ? `You have <b>${leftPacks} pack${leftPacks === 1 ? '' : 's'}</b> ready — every pack-pool leader is collected, so opening packs now converts all 3 cards straight into <b>Card Dust</b> (+20 pack-seal bonus).`
                : (cData.opened || 0) === 0
                  ? `You have <b>${leftPacks} leader pack${leftPacks === 1 ? '' : 's'}</b> ready (3 cards per pack — your first pack is all new leaders; subsequent packs include at least 1 duplicate that converts into Card Dust).`
                  : `You have <b>${leftPacks} leader pack${leftPacks === 1 ? '' : 's'}</b> ready (3 cards per pack · at least 1 duplicate per pack converting into Card Dust, plus +20 pack-seal bonus).`)
              : nextAt != null
                ? `Earn a new pack for every honour unlocked — next pack at <b>${nextAt} honour${nextAt === 1 ? '' : 's'}</b> (you currently have ${ctx.achCount()}). You also earn Card Dust from completed campaigns (+30/+50) and honours (+15).`
                : 'Every honour pack has been earned. Continue earning Card Dust from completed campaigns to finish crafting and foil upgrades.'}</p>
          </div>
          <div class="bd-breakdowns">
            <div class="bd-bk">
              <div class="bd-bkh"><strong>By party</strong><small>Select a party to filter</small></div>
              <div class="bd-bklist">${partyStats.map(s => `<button type="button" class="bd-bkrow${state.bParty === s.key ? ' on' : ''}" data-bparty="${state.bParty === s.key ? 'all' : s.key}" style="--pc:${ctx.PC(s.key)}" aria-pressed="${state.bParty === s.key}">
                <span class="bd-bkl"><i class="sw" style="background:${ctx.PC(s.key)}"></i>${esc(s.name)}</span>
                <span class="bd-bkbar"><i style="width:${s.pct}%;background:${ctx.PC(s.key)}"></i></span>
                <span class="bd-bkn num">${s.got}/${s.total}</span>
              </button>`).join('')}</div>
            </div>
            <div class="bd-bk">
              <div class="bd-bkh"><strong>By rarity &amp; next-pack odds</strong><small>${packOwnedCount < packPoolCount ? 'Chance in your next 3-card pack' : 'Pack pool complete · Dust packs active'}</small></div>
              <div class="bd-bklist">${rarOdds.map(r => `<button type="button" class="bd-bkrow bd-rrow ${r.cls}${state.bRar === r.key ? ' on' : ''}" data-brar="${state.bRar === r.key ? 'all' : r.key}" aria-pressed="${state.bRar === r.key}">
                <span class="bd-bkl"><i class="bd-rdiam ${r.cls}" aria-hidden="true"></i>${esc(r.label)}</span>
                <span class="bd-bkbar"><i style="width:${r.total ? Math.round(r.owned / r.total * 100) : 0}%"></i></span>
                <span class="bd-bkn num">${r.owned}/${r.total}${packOwnedCount < packPoolCount ? ` <em>${r.remaining ? Math.round(r.packPct) + '%' : 'Done'}</em>` : ' <em>Dust</em>'}</span>
              </button>`).join('')}<button type="button" class="bd-bkrow bd-rrow r-V${state.bRar === 'V' ? ' on' : ''}" data-brar="${state.bRar === 'V' ? 'all' : 'V'}" aria-pressed="${state.bRar === 'V'}">
                <span class="bd-bkl"><i class="bd-rdiam r-V" aria-hidden="true"></i>Vault Legend</span>
                <span class="bd-bkbar"><i style="width:${vaultProfs.length ? Math.round(vaultOwned / vaultProfs.length * 100) : 0}%"></i></span>
                <span class="bd-bkn num">${vaultOwned}/${vaultProfs.length} <em>Craft-only</em></span>
              </button></div>
            </div>
          </div>
        </section>`
      + (vaultProfs.length ? `<section class="bd-vault" aria-label="Craft-only Vault Legends">
          <div class="bdv-head">
            <div><span class="kick">Archive edition · No. ${vaultRange}</span><h4>Craft-Only Vault Legends</h4></div>
            <p>Never dropped in regular leader packs. Craft each iconic leader directly for <b>500 Card Dust</b> from their dossier.</p>
          </div>
          <div class="bdv-row">${vaultProfs.map(vaultCard).join('')}</div>
        </section>` : '')
      + `<section class="bd-controls" aria-label="Filter and sort binder">
          <div class="bd-segs" role="group" aria-label="Collection status">
            ${[['all', `All (${total})`], ['owned', `Collected (${ownedCount})`], ['missing', `Missing (${total - ownedCount})`], ['vault', `Vault Legends (${vaultOwned}/${vaultProfs.length})`], ['foils', `Foils (${foilCount})`], ['mastered', `Played (${masteredCount})`]].map(([k, lbl]) =>
              `<button type="button" class="seg${state.bStatus === k ? ' on' : ''}" data-bstatus="${k}" aria-pressed="${state.bStatus === k}">${lbl}</button>`
            ).join('')}
          </div>
          <div class="bd-tools">
            <label class="bd-search"><span class="sr">Search binder</span><input id="bdq" type="search" placeholder="Search name, seat, party, foil or #070…" autocomplete="off" value="${esc(state.bQ)}"></label>
            <label class="bd-sort"><span class="kick">Sort</span><select id="bdsort" class="cs-sel">
              <option value="no"${state.bSort === 'no' ? ' selected' : ''}>Card number (001–${totalPad})</option>
              <option value="grade"${state.bSort === 'grade' ? ' selected' : ''}>Rarity &amp; tier grade</option>
              <option value="party"${state.bSort === 'party' ? ' selected' : ''}>Party</option>
              <option value="mastery"${state.bSort === 'mastery' ? ' selected' : ''}>Mastery &amp; best score</option>
              <option value="recent"${state.bSort === 'recent' ? ' selected' : ''}>Recently collected</option>
            </select></label>
            ${(state.bStatus !== 'all' || state.bParty !== 'all' || state.bRar !== 'all' || state.bQ)
              ? `<button type="button" class="cmp-link bd-clear" data-a="bclear">Clear filters</button>` : ''}
          </div>
          <p class="bd-count cmp-note" id="bdcount" role="status">Showing <b class="num">${filtered.length}</b> of ${total} cards${state.bParty !== 'all' ? ' · ' + esc(C.PARTIES[state.bParty].n) : ''}${state.bRar !== 'all' ? ' · ' + esc(rarFilterName) : ''}</p>
        </section>`
      + (filtered.length
        ? `<div class="bd-grid" id="bdgrid">${filtered.map(binderSlot).join('')}</div>`
        : `<div class="bd-empty"><p>No leader cards match your current filters.</p><button type="button" class="ghost" data-a="bclear">Show all ${total} cards</button></div>`)
      + dossierHtml;
  }

  function renderDossier(profs, filtered, ctx) {
    const esc = ctx.esc, EC = ctx.EC, cData = ctx.coll(), dust = cData.dust || 0;
    const p = profs.find(x => x.id === state.bOpen);
    if (!p) return '';
    const navPool = filtered.some(x => x.id === p.id) ? filtered : profs;
    const idx = navPool.findIndex(x => x.id === p.id);
    const prev = idx > 0 ? navPool[idx - 1] : navPool[navPool.length - 1];
    const next = idx >= 0 && idx < navPool.length - 1 ? navPool[idx + 1] : navPool[0];
    const noStr = String(p.no).padStart(3, '0');
    const L = p.L;
    const tl = p.tl;
    const cardHtml = ctx.buildTCard(L, { inModal: true, hideCompareBtn: true });

    const acqText = p.owned
      ? (p.craftedAt ? `Crafted · ${fmtDate(p.craftedAt)}` : fmtDate(p.ownedAt))
      : (p.isVault ? 'Craft-only Vault Legend (not in packs)' : `Leader packs or direct craft (${p.craftCost} Dust)`);

    const craftShortfall = Math.max(0, p.craftCost - dust);
    const cost1 = EC ? EC.foilUpgradeCost(p.foilTier, 1) : 120;
    const cost2 = EC ? EC.foilUpgradeCost(p.foilTier, 2) : (p.foilTier === 1 ? 260 : 350);

    const workshopHtml = !p.owned
      ? `<div class="bd-dsec bd-craft">
          <div class="bd-whead"><span class="kick">Direct Craft Workshop</span><span class="bd-dbal num">Balance: <b>${dust.toLocaleString()}</b> Dust</span></div>
          <p class="bd-wcopy">${p.isVault
            ? `Vault Legend No. ${noStr} never drops in regular packs. Craft ${esc(p.name)} directly with Card Dust to unlock their full 2028 campaign.`
            : `Skip the pack odds and craft ${esc(p.name)} directly for <b>${p.craftCost} Card Dust</b>.`}</p>
          <button type="button" class="bd-craft-btn${craftShortfall ? ' locked' : ''}" data-craft="${p.id}"${craftShortfall ? ' disabled' : ''}>${craftShortfall
            ? `Need ${craftShortfall.toLocaleString()} more Dust (${p.craftCost} required)`
            : `Craft ${esc(p.name)} for ${p.craftCost} Dust`}</button>
        </div>`
      : `<div class="bd-dsec bd-foil-studio">
          <div class="bd-whead"><span class="kick">Card Finish Studio</span><span class="bd-dbal num">Balance: <b>${dust.toLocaleString()}</b> Dust</span></div>
          <div class="bd-foil-grid">
            <div class="bd-fopt${p.foilTier === 0 ? ' active' : ' done'}">
              <span class="bd-fsw std" aria-hidden="true"></span>
              <span class="bd-fmeta"><b>Standard</b><small>Archival print</small></span>
              <span class="bd-fstat num">${p.foilTier === 0 ? 'Active' : 'Base'}</span>
            </div>
            <div class="bd-fopt f1${p.foilTier === 1 ? ' active' : p.foilTier > 1 ? ' done' : ''}">
              <span class="bd-fsw plat" aria-hidden="true"></span>
              <span class="bd-fmeta"><b>Platinum Brushed Chrome</b><small>Machined steel sheen &amp; chrome trim</small></span>
              ${p.foilTier >= 1
                ? `<span class="bd-fstat num">${p.foilTier === 1 ? 'Active' : 'Unlocked'}</span>`
                : `<button type="button" class="bd-fbtn" data-foil="${p.id}:1"${dust < cost1 ? ' disabled' : ''}>${dust < cost1 ? `Need ${cost1 - dust}` : `${cost1} Dust`}</button>`}
            </div>
            <div class="bd-fopt f2${p.foilTier === 2 ? ' active' : ''}">
              <span class="bd-fsw prism" aria-hidden="true"></span>
              <span class="bd-fmeta"><b>Parliament Prism</b><small>Pearlescent spectrum refraction</small></span>
              ${p.foilTier >= 2
                ? `<span class="bd-fstat num">Active</span>`
                : `<button type="button" class="bd-fbtn" data-foil="${p.id}:2"${dust < cost2 ? ' disabled' : ''}>${dust < cost2 ? `Need ${cost2 - dust}` : `${cost2} Dust`}</button>`}
            </div>
          </div>
        </div>`;

    return `<div class="bd-modal" role="dialog" aria-modal="true" aria-labelledby="bdd-title" data-bdclose="bg">
      <div class="bd-sheet" style="--pc:${ctx.cardPC ? ctx.cardPC(p.L) : ctx.PC(p.party)}">
        <div class="bd-sh-top">
          <div class="bd-sh-id">
            <span class="kick">Card No. ${noStr}/${String(profs.length).padStart(3, '0')} · ${esc(p.rarLabel)}${p.owned && p.foilTier ? ' · ' + esc(FOIL_LABEL[p.foilTier]) : ''}</span>
            <h3 id="bdd-title">${esc(p.name)}</h3>
            <p class="bd-sh-sub">${esc(p.partyName)}${p.fac ? ' · ' + esc(p.fac) : ''}${p.seat ? ' · ' + esc(p.seat) : ''}</p>
          </div>
          <div class="bd-sh-nav">
            <button type="button" class="ghost bd-navbtn" data-bopen="${prev.id}" aria-label="Previous card: ${esc(prev.name)}">← Prev</button>
            <button type="button" class="ghost bd-navbtn" data-bopen="${next.id}" aria-label="Next card: ${esc(next.name)}">Next →</button>
            <button type="button" class="bd-x" data-a="bclose" aria-label="Close card dossier">&times;</button>
          </div>
        </div>
        <div class="bd-sh-body">
          <div class="bd-sh-card">${cardHtml}<p class="bd-flipcap">Tap card to flip front &amp; back</p></div>
          <div class="bd-sh-info">
            <div class="bd-dsec">
              <span class="kick">Collection status</span>
              <dl class="bd-dl num">
                <div><dt>Status</dt><dd>${p.owned ? `Collected · ${esc(FOIL_LABEL[p.foilTier])}` : (p.isVault ? 'Locked · Vault Legend' : 'Not yet collected')}</dd></div>
                <div><dt>Acquired</dt><dd>${esc(acqText)}</dd></div>
                <div><dt>Honours</dt><dd>${p.prog.a}/${p.prog.h}</dd></div>
                <div><dt>Leader-only answers</dt><dd>${p.prog.b}/${p.prog.o}</dd></div>
              </dl>
            </div>
            ${workshopHtml}
            ${tl ? `<div class="bd-dsec">
              <span class="kick">Campaign benchmark (Tier ${tl.grade})</span>
              <dl class="bd-dl num">
                <div><dt>Difficulty</dt><dd>Grade ${tl.grade} · ${GRADE_DESC[tl.grade] || ''}</dd></div>
                <div><dt>Win rate</dt><dd>${tl.win}%${tl.fail ? ` · ${tl.fail}% pre-campaign exit` : ''}</dd></div>
                <div><dt>Typical seats</dt><dd>${tl.seatsR} (${esc(tl.typ)})</dd></div>
                <div><dt>Optimal ceiling</dt><dd>${tl.seatsB} (${esc(tl.top)})</dd></div>
              </dl>
            </div>` : ''}
            <div class="bd-dsec">
              <span class="kick">Your campaign record</span>
              ${p.hof.runs ? `<dl class="bd-dl num">
                <div><dt>Campaigns finished</dt><dd>${p.hof.runs} (${p.hof.wins} gov. win${p.hof.wins === 1 ? '' : 's'})</dd></div>
                <div><dt>Best result</dt><dd>${esc(p.hof.bestTier || 'Played')}</dd></div>
                <div><dt>Best seats</dt><dd>${p.hof.bestSeats}</dd></div>
                <div><dt>Best score</dt><dd><b>${p.hof.bestScore.toLocaleString()}</b></dd></div>
              </dl>` : `<p class="bd-empty-rec">No completed campaigns as ${esc(p.name)} yet.</p>`}
            </div>
            <div class="bd-sh-acts">
              ${p.owned
                ? `<button type="button" class="bd-play" data-lead="${p.id}">Play campaign as ${esc(p.name.split(' ').slice(-1)[0])} →</button>`
                : `<button type="button" class="bd-play locked" disabled>${p.isVault ? 'Craft with Dust to play' : 'Collect or craft to play'}</button>`}
              <button type="button" class="ghost" data-cmpfrom="${p.id}">Compare head-to-head</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  // ---- HEAD-TO-HEAD LEADER COMPARATOR RENDERER
  function defaultPair(profs) {
    if (!state.cmpA || !profs.some(p => p.id === state.cmpA)) {
      state.cmpA = (profs.find(p => p.id === 'anthony_albanese') || profs[0]).id;
    }
    if (!state.cmpB || !profs.some(p => p.id === state.cmpB) || state.cmpB === state.cmpA) {
      const alt = profs.find(p => p.id === 'angus_taylor' && p.id !== state.cmpA)
        || profs.find(p => p.party !== (profs.find(x => x.id === state.cmpA) || {}).party)
        || profs.find(p => p.id !== state.cmpA);
      state.cmpB = alt ? alt.id : state.cmpA;
    }
  }

  function pickSmartRival(idA, profs, currentB) {
    const a = profs.find(p => p.id === idA);
    if (!a) return profs[0].id;
    const sameParty = profs
      .filter(p => p.party === a.party && p.id !== idA)
      .sort((x, y) => ((y.tl ? y.tl.score : -9) - (x.tl ? x.tl.score : -9)));
    if (sameParty.length) {
      const curIdx = sameParty.findIndex(p => p.id === currentB);
      return sameParty[(curIdx + 1) % sameParty.length].id;
    }
    const other = profs.find(p => p.id !== idA && p.id !== currentB) || profs[0];
    return other.id;
  }

  function leaderSelectOptions(profs, selectedId, ctx) {
    const esc = ctx.esc;
    return Object.entries(ctx.C.PARTIES).map(([pk, P]) => {
      const ls = profs.filter(p => p.party === pk).sort((a, b) => a.no - b.no);
      return `<optgroup label="${esc(P.n)}">${ls.map(p => {
        const tag = p.isVault ? 'Vault' : p.rar;
        const suffix = p.owned
          ? (p.foilTier === 2 ? ' · Prism' : p.foilTier === 1 ? ' · Platinum' : '')
          : ' · locked';
        return `<option value="${p.id}"${p.id === selectedId ? ' selected' : ''}>#${String(p.no).padStart(3, '0')} ${esc(p.name)} (${tag}${suffix})</option>`;
      }).join('')}</optgroup>`;
    }).join('');
  }

  function formatMechanics(p) {
    const L = p.L;
    const ppPerTurn = L.pp || 0;
    const debBase = L.deb != null ? L.deb : 0;
    const debTags = Object.entries(L.debTag || {}).map(([k, v]) => `${fmtSign(v, 0)} ${tagName(k)}`);
    const startUnity = L.inc && L.unity ? `${L.unity}` : `60${L.unityAdj ? ` (${fmtSign(L.unityAdj, 0)} adj.)` : ''}`;
    const unityExtra = [];
    if (L.unityDrift) unityExtra.push(`${fmtSign(L.unityDrift, 0)}/turn drift`);
    if (L.schism) unityExtra.push(`−${L.schism} if schism`);
    const pfList = [];
    const addPf = (o) => Object.entries(o || {}).forEach(([k, v]) => {
      const lbl = k === 'grn' ? 'Greens→ALP' : k === 'on' ? 'ON→Coal.' : 'Teal prefs';
      pfList.push(`${fmtSign(v, 0)}pt ${lbl}`);
    });
    addPf(L.pf);
    addPf(L.pfMinus);
    const negNotes = [];
    if (L.neg) {
      Object.entries(L.neg.tag || {}).forEach(([k, m]) => negNotes.push(`${tagName(k)} ×${m}`));
      Object.entries(L.neg.r || {}).forEach(([k, m]) => negNotes.push(`${({ IN: 'Inner', OUT: 'Outer', PROV: 'Provincial', RUR: 'Rural' })[k] || k} ×${m}`));
      Object.entries(L.neg.st || {}).forEach(([k, m]) => negNotes.push(`${k} ×${m}`));
      Object.entries(L.neg.tagR || {}).forEach(([k, o]) => Object.entries(o).forEach(([rk, m]) => negNotes.push(`${tagName(k)} (${rk}) ×${m}`)));
    }
    return {
      ppPerTurn,
      ppBonusNote: L.ppSpirit ? ' + spirit bonus' : '',
      debBase,
      debTags,
      startUnityVal: L.inc && L.unity ? L.unity : 60 + (L.unityAdj || 0),
      startUnityText: startUnity + (unityExtra.length ? ' · ' + unityExtra.join(', ') : ''),
      pfText: pfList.length ? pfList.join(', ') : 'Baseline flows',
      negText: negNotes.length ? negNotes.join(', ') : 'No extra setback multipliers'
    };
  }

  function renderCompare(ctx) {
    const esc = ctx.esc, profs = allProfiles(ctx);
    defaultPair(profs);
    const A = profs.find(p => p.id === state.cmpA) || profs[0];
    const B = profs.find(p => p.id === state.cmpB) || profs[1] || profs[0];
    const mA = formatMechanics(A), mB = formatMechanics(B);

    const metricRow = (label, valA, valB, numA, numB, opts) => {
      opts = opts || {};
      const lowerBetter = !!opts.lowerBetter;
      const maxVal = opts.max != null ? opts.max : Math.max(Math.abs(numA || 0), Math.abs(numB || 0), 1);
      const wA = opts.bar ? Math.min(100, Math.max(0, Math.round((Math.max(0, numA || 0) / maxVal) * 100))) : 0;
      const wB = opts.bar ? Math.min(100, Math.max(0, Math.round((Math.max(0, numB || 0) / maxVal) * 100))) : 0;
      const winA = numA != null && numB != null && numA !== numB && (lowerBetter ? numA < numB : numA > numB);
      const winB = numA != null && numB != null && numA !== numB && (lowerBetter ? numB < numA : numB > numA);
      const pcA = ctx.cardPC ? ctx.cardPC(A.L) : ctx.PC(A.party);
      const pcB = ctx.cardPC ? ctx.cardPC(B.L) : ctx.PC(B.party);
      return `<div class="cp-row">
        <div class="cp-cell left${winA ? ' win' : ''}" style="--pc:${pcA}">
          <div class="cp-val num">${valA}${winA ? ' <em class="cp-edge" aria-label="Advantage">Edge</em>' : ''}</div>
          ${opts.bar ? `<span class="cp-bar left"><i style="width:${wA}%"></i></span>` : ''}
        </div>
        <div class="cp-lbl">${esc(label)}${opts.sub ? `<small>${esc(opts.sub)}</small>` : ''}</div>
        <div class="cp-cell right${winB ? ' win' : ''}" style="--pc:${pcB}">
          <div class="cp-val num">${winB ? '<em class="cp-edge" aria-label="Advantage">Edge</em> ' : ''}${valB}</div>
          ${opts.bar ? `<span class="cp-bar right"><i style="width:${wB}%"></i></span>` : ''}
        </div>
      </div>`;
    };

    const allDemKeys = [...new Set([...Object.keys(A.demMap), ...Object.keys(B.demMap)])];
    allDemKeys.sort((k1, k2) => {
      const s1 = /^st:/.test(k1) ? 0 : 1, s2 = /^st:/.test(k2) ? 0 : 1;
      if (s1 !== s2) return s1 - s2;
      const m1 = Math.max(Math.abs((A.demMap[k1] || {}).val || 0), Math.abs((B.demMap[k1] || {}).val || 0));
      const m2 = Math.max(Math.abs((A.demMap[k2] || {}).val || 0), Math.abs((B.demMap[k2] || {}).val || 0));
      return m2 - m1;
    });

    const pcOf = p => (ctx.cardPC ? ctx.cardPC(p.L) : ctx.PC(p.party));
    const miniHead = (p, side) => {
      const init = p.name.split(/\s+/).filter(Boolean);
      const two = init.length > 1 ? init[0][0] + init[init.length - 1][0] : p.name.slice(0, 2);
      const ph = p.ph && !/^data:/.test(p.ph)
        ? `<img class="cp-mph" src="${esc(p.ph)}" alt=""${p.art && p.art.pos ? ` style="object-position:${esc(p.art.pos)}"` : ''}>`
        : `<span class="cp-mph cp-minit">${esc(two.toUpperCase())}</span>`;
      return `<div class="cp-mhead ${side}" style="--pc:${pcOf(p)}">
        ${ph}
        <div class="cp-mtxt">
          <span class="cp-mkick">#${String(p.no).padStart(3, '0')} · ${esc(p.L.sb === 'Nationals' ? 'Nationals' : p.partyName)}</span>
          <b>${esc(p.name)}</b>
          <small>Grade ${p.rar} · ${esc(p.rarLabel)}${p.owned ? (p.foilTier ? ' · ' + esc(FOIL_LABEL[p.foilTier]) : '') : ' · Locked'}</small>
        </div>
      </div>`;
    };

    const perkBlock = p => `<div class="cp-perks" style="--pc:${pcOf(p)}">
      <p class="pk ${p.L.noGood ? 'bad' : 'good'}">${ctx.TM(p.L.noGood ? -1 : 1)}<span><b>${esc(p.L.plus[0])}</b> ${ctx.kw(esc(p.L.plus[1]))}</span></p>
      <p class="pk bad">${ctx.TM(-1)}<span><b>${esc(p.L.minus[0])}</b> ${ctx.kw(esc(p.L.minus[1]))}</span></p>
    </div>`;

    const matesBlock = p => `<div class="cp-mates" style="--pc:${pcOf(p)}">${p.L.mates.map((m, i) =>
      `<span class="cp-mate">${ctx.photo(m, 'mt-ph')}<span><i>${esc(ctx.mateRole(p.L, i, m))}</i><b>${esc(m)}</b></span></span>`
    ).join('')}</div>`;

    const traitsList = p => p.traits.length
      ? `<ul class="cp-tlist">${p.traits.map(t => `<li class="t${t.tier}">${ctx.TM(t.tier)}<span><b>${esc(t.n)}</b><small>${esc(t.d)}</small></span></li>`).join('')}</ul>`
      : `<p class="cmp-note">No sandbox character traits.</p>`;

    const statusLine = p => p.owned
      ? `Collected · ${FOIL_LABEL[p.foilTier]} (${p.craftedAt ? 'Crafted ' + fmtDate(p.craftedAt) : fmtDate(p.ownedAt)})`
      : (p.isVault ? `Vault Legend · Craft for ${p.craftCost} Dust` : `Locked · Packs or ${p.craftCost} Dust`);

    return ctx.toolbar()
      + ctx.mast('Campaign mode · Head-to-head', 'Compare Leaders', `Line up any two of the ${profs.length} leaders side by side across tier-list benchmarks, campaign mechanics, demographic vote reach, running mates and your personal record.`)
      + `<div class="bd-topnav"><button type="button" class="cmp-link back" data-a="back">← Back to leaders</button><div class="bd-topacts"><button type="button" class="ghost" data-a="binder">Open Collection Binder →</button></div></div>`
      + `<section class="cp-picker" aria-label="Choose two leaders to compare">
          <div class="cp-pgrid">
            <label class="cp-selbox" style="--pc:${pcOf(A)}">
              <span class="kick">Leader A</span>
              <select id="cmpA" class="cs-sel" aria-label="Leader A">${leaderSelectOptions(profs, A.id, ctx)}</select>
            </label>
            <button type="button" class="cp-swap" data-a="cmpswap" title="Swap Leader A and Leader B" aria-label="Swap leaders">${ctx.ICON('flip')}<span>Swap</span></button>
            <label class="cp-selbox" style="--pc:${pcOf(B)}">
              <span class="kick">Leader B</span>
              <select id="cmpB" class="cs-sel" aria-label="Leader B">${leaderSelectOptions(profs, B.id, ctx)}</select>
            </label>
          </div>
          <div class="cp-quick">
            <button type="button" class="ghost" data-a="cmprival">Same-party rival for ${esc(A.name.split(' ').slice(-1)[0])}</button>
            <button type="button" class="ghost" data-a="cmprand">${ctx.ICON('dice')} Random matchup</button>
            <button type="button" class="ghost cp-mcardtog" data-a="cmpcards" aria-expanded="${state.cmpCardsOpen ? 'true' : 'false'}">${state.cmpCardsOpen ? 'Hide full trading cards' : 'Show full trading cards'}</button>
          </div>
        </section>`
      + `<div class="cp-mstrip" aria-hidden="true">${miniHead(A, 'left')}<span class="cp-vs">VS</span>${miniHead(B, 'right')}</div>`
      + `<section class="cp-stage${state.cmpCardsOpen ? ' m-open' : ''}" aria-label="Trading card comparison">
          <div class="cp-slot">
            ${ctx.buildTCard(A.L, { inModal: true, hideCompareBtn: true })}
            <div class="cp-slot-act">
              ${A.owned
                ? `<button type="button" class="bd-play" data-lead="${A.id}">Play as ${esc(A.name.split(' ').slice(-1)[0])} →</button>`
                : `<button type="button" class="ghost" data-bjump="${A.id}">Craft in Binder (${A.craftCost} Dust) →</button>`}
            </div>
          </div>
          <div class="cp-vs-col" aria-hidden="true"><span>VS</span></div>
          <div class="cp-slot">
            ${ctx.buildTCard(B.L, { inModal: true, hideCompareBtn: true })}
            <div class="cp-slot-act">
              ${B.owned
                ? `<button type="button" class="bd-play" data-lead="${B.id}">Play as ${esc(B.name.split(' ').slice(-1)[0])} →</button>`
                : `<button type="button" class="ghost" data-bjump="${B.id}">Craft in Binder (${B.craftCost} Dust) →</button>`}
            </div>
          </div>
        </section>`
      + `<section class="cp-section" aria-labelledby="cp-h-bench">
          <div class="cmp-fighead"><span class="fig">Fig. 1</span><strong id="cp-h-bench">Tier-list difficulty &amp; campaign benchmarks</strong><small>Measured across 1,200 simulated campaigns in the current 2028 scenario.</small></div>
          <div class="cp-colhead">
            <span style="--pc:${pcOf(A)}"><i class="sw" style="background:${pcOf(A)}"></i>${esc(A.name)}</span>
            <span class="cp-chm">Metric</span>
            <span style="--pc:${pcOf(B)}">${esc(B.name)}<i class="sw" style="background:${pcOf(B)}"></i></span>
          </div>
          <div class="cp-table">
            ${metricRow('Tier grade', `<b>${A.rar}</b> · ${GRADE_DESC[A.rar]}`, `<b>${B.rar}</b> · ${GRADE_DESC[B.rar]}`, A.tl ? A.tl.score : -9, B.tl ? B.tl.score : -9)}
            ${metricRow('Benchmark score', A.tl ? A.tl.score.toFixed(2) : '—', B.tl ? B.tl.score.toFixed(2) : '—', A.tl ? A.tl.score : 0, B.tl ? B.tl.score : 0, { bar: true, max: 2.5 })}
            ${metricRow('Success rate', A.tl ? `${A.tl.win}%` : '—', B.tl ? `${B.tl.win}%` : '—', A.tl ? A.tl.win : 0, B.tl ? B.tl.win : 0, { bar: true, max: 100, sub: 'Sub-optimal runs meeting party goal' })}
            ${metricRow('Pre-campaign exit risk', A.tl ? `${A.tl.fail}%` : '—', B.tl ? `${B.tl.fail}%` : '—', A.tl ? A.tl.fail : 0, B.tl ? B.tl.fail : 0, { lowerBetter: true, bar: true, max: 100, sub: 'Spill or by-election loss rate' })}
            ${metricRow('Typical seats', A.tl ? `${A.tl.seatsR} <small>${esc(A.tl.typ)}</small>` : '—', B.tl ? `${B.tl.seatsR} <small>${esc(B.tl.typ)}</small>` : '—', A.tl ? A.tl.seatsR : 0, B.tl ? B.tl.seatsR : 0, { bar: true, max: 115 })}
            ${metricRow('Optimal ceiling', A.tl ? `${A.tl.seatsB} <small>${esc(A.tl.top)}</small>` : '—', B.tl ? `${B.tl.seatsB} <small>${esc(B.tl.top)}</small>` : '—', A.tl ? A.tl.seatsB : 0, B.tl ? B.tl.seatsB : 0, { bar: true, max: 115 })}
          </div>
        </section>`
      + `<section class="cp-section" aria-labelledby="cp-h-mech">
          <div class="cmp-fighead"><span class="fig">Fig. 2</span><strong id="cp-h-mech">Campaign route &amp; starting mechanics</strong><small>How each leader enters the race and what tools they start with.</small></div>
          <div class="cp-table">
            ${metricRow('Route to campaign', esc(A.routeShort), esc(B.routeShort), A.routeSteps, B.routeSteps, { lowerBetter: true })}
            ${metricRow('Political Power / turn', `+${mA.ppPerTurn}${esc(mA.ppBonusNote)}`, `+${mB.ppPerTurn}${esc(mB.ppBonusNote)}`, mA.ppPerTurn, mB.ppPerTurn, { bar: true, max: 6 })}
            ${metricRow('Debate skill', `${mA.debBase}${mA.debTags.length ? ` <small>${esc(mA.debTags.join(', '))}</small>` : ''}`, `${mB.debBase}${mB.debTags.length ? ` <small>${esc(mB.debTags.join(', '))}</small>` : ''}`, mA.debBase, mB.debBase, { bar: true, max: 3 })}
            ${metricRow('Starting caucus unity', esc(mA.startUnityText), esc(mB.startUnityText), mA.startUnityVal, mB.startUnityVal, { bar: true, max: 100 })}
            ${metricRow('Preference flows', esc(mA.pfText), esc(mB.pfText), null, null)}
            ${metricRow('Setback exposure', esc(mA.negText), esc(mB.negText), null, null)}
          </div>
        </section>`
      + `<section class="cp-section" aria-labelledby="cp-h-perks">
          <div class="cmp-fighead"><span class="fig">Fig. 3</span><strong id="cp-h-perks">Signature perks &amp; weaknesses</strong><small>Campaign-specific rules on each leader’s card.</small></div>
          <div class="cp-split">
            <div class="cp-box"><h4 style="--pc:${pcOf(A)}">${esc(A.name)}</h4>${perkBlock(A)}</div>
            <div class="cp-box"><h4 style="--pc:${pcOf(B)}">${esc(B.name)}</h4>${perkBlock(B)}</div>
          </div>
        </section>`
      + `<section class="cp-section" aria-labelledby="cp-h-reach">
          <div class="cmp-fighead"><span class="fig">Fig. 4</span><strong id="cp-h-reach">Sandbox vote reach &amp; character traits</strong><small>Net national vote swing plus every state and Census demographic modifier (points per SD).</small></div>
          <div class="cp-table">
            ${metricRow('Net national vote effect', `<b>${fmtSign(A.netNat, 2)} pts</b>`, `<b>${fmtSign(B.netNat, 2)} pts</b>`, A.netNat, B.netNat)}
            ${allDemKeys.map(k => {
              const dA = A.demMap[k], dB = B.demMap[k];
              const lbl = (dA || dB).label, isSt = (dA || dB).isState;
              const vA = dA ? dA.val : 0, vB = dB ? dB.val : 0;
              const tA = dA ? `<b class="${vA > 0 ? 'up' : 'dn'}">${fmtSign(vA)}</b>` : '<span class="cp-z">0</span>';
              const tB = dB ? `<b class="${vB > 0 ? 'up' : 'dn'}">${fmtSign(vB)}</b>` : '<span class="cp-z">0</span>';
              return metricRow(lbl, tA, tB, vA, vB, { sub: isSt ? 'State swing (pts)' : 'Demographic (pts/SD)' });
            }).join('')}
          </div>
          <div class="cp-split cp-traits-split">
            <div class="cp-box"><h4 style="--pc:${pcOf(A)}">${esc(A.name)}’s traits</h4>${traitsList(A)}</div>
            <div class="cp-box"><h4 style="--pc:${pcOf(B)}">${esc(B.name)}’s traits</h4>${traitsList(B)}</div>
          </div>
        </section>`
      + `<section class="cp-section" aria-labelledby="cp-h-ticket">
          <div class="cmp-fighead"><span class="fig">Fig. 5</span><strong id="cp-h-ticket">The ticket &amp; your personal record</strong><small>Running mates and your own saved Hall of Fame history in this browser.</small></div>
          <div class="cp-split">
            <div class="cp-box"><h4 style="--pc:${pcOf(A)}">${esc(A.name)}’s ticket</h4>${matesBlock(A)}</div>
            <div class="cp-box"><h4 style="--pc:${pcOf(B)}">${esc(B.name)}’s ticket</h4>${matesBlock(B)}</div>
          </div>
          <div class="cp-table cp-rec-table">
            ${metricRow('Collection status', esc(statusLine(A)), esc(statusLine(B)), null, null)}
            ${metricRow('Your runs & wins', `${A.hof.runs} run${A.hof.runs === 1 ? '' : 's'} · ${A.hof.wins} win${A.hof.wins === 1 ? '' : 's'}`, `${B.hof.runs} run${B.hof.runs === 1 ? '' : 's'} · ${B.hof.wins} win${B.hof.wins === 1 ? '' : 's'}`, A.hof.wins, B.hof.wins)}
            ${metricRow('Your best seats', A.hof.runs ? `${A.hof.bestSeats}` : '—', B.hof.runs ? `${B.hof.bestSeats}` : '—', A.hof.bestSeats, B.hof.bestSeats)}
            ${metricRow('Your best score', A.hof.runs ? `<b>${A.hof.bestScore.toLocaleString()}</b>` : '—', B.hof.runs ? `<b>${B.hof.bestScore.toLocaleString()}</b>` : '—', A.hof.bestScore, B.hof.bestScore)}
            ${metricRow('Honours & answers', `${A.prog.a}/${A.prog.h} hon. · ${A.prog.b}/${A.prog.o} ans.`, `${B.prog.a}/${B.prog.h} hon. · ${B.prog.b}/${B.prog.o} ans.`, A.prog.a + A.prog.b, B.prog.a + B.prog.b)}
          </div>
          <div class="cp-foot-acts">
            ${A.owned ? `<button type="button" class="bd-play" data-lead="${A.id}">Start campaign as ${esc(A.name)} →</button>` : `<button type="button" class="ghost" data-bjump="${A.id}">Craft ${esc(A.name)} in Binder (${A.craftCost} Dust)</button>`}
            ${B.owned ? `<button type="button" class="bd-play" data-lead="${B.id}">Start campaign as ${esc(B.name)} →</button>` : `<button type="button" class="ghost" data-bjump="${B.id}">Craft ${esc(B.name)} in Binder (${B.craftCost} Dust)</button>`}
          </div>
        </section>`;
  }

  // Fast in-place search filter in Binder so typing never loses input focus
  function applyBinderSearch(inn, total) {
    const q = state.bQ.trim().toLowerCase();
    let shown = 0;
    inn.querySelectorAll('.bd-slot').forEach(el => {
      const ok = !q || (el.dataset.bq || '').includes(q);
      el.hidden = !ok;
      if (ok) shown++;
    });
    const cnt = document.getElementById('bdcount');
    if (cnt) cnt.innerHTML = `Showing <b class="num">${shown}</b> of ${total} cards${q ? ' matching “' + q.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]) + '”' : ''}`;
  }

  function handleClick(b, ctx, api) {
    if (b.dataset.bstatus) { state.bStatus = b.dataset.bstatus; api.rerender(true); return true; }
    if (b.dataset.bparty) { state.bParty = b.dataset.bparty; api.rerender(true); return true; }
    if (b.dataset.brar) { state.bRar = b.dataset.brar; api.rerender(true); return true; }
    if (b.dataset.bopen) { state.bOpen = b.dataset.bopen; api.rerender(true); return true; }
    if (b.dataset.craft && ctx.craftLeader) {
      const res = ctx.craftLeader(b.dataset.craft);
      if (res && res.ok) api.rerender(true);
      return true;
    }
    if (b.dataset.foil && ctx.upgradeFoil) {
      const parts = b.dataset.foil.split(':');
      const res = ctx.upgradeFoil(parts[0], +parts[1]);
      if (res && res.ok) api.rerender(true);
      return true;
    }
    if (b.dataset.bjump) {
      state.bStatus = 'all'; state.bParty = 'all'; state.bRar = 'all'; state.bQ = '';
      state.bOpen = b.dataset.bjump;
      api.setView('binder');
      return true;
    }
    if (b.dataset.cmpfrom) {
      const profs = allProfiles(ctx);
      state.bOpen = null;
      state.cmpA = b.dataset.cmpfrom;
      state.cmpB = pickSmartRival(state.cmpA, profs, state.cmpB);
      api.setView('compare');
      return true;
    }
    const a = b.dataset.a;
    if (a === 'bclose') { state.bOpen = null; api.rerender(true); return true; }
    if (a === 'bclear') { state.bStatus = 'all'; state.bParty = 'all'; state.bRar = 'all'; state.bQ = ''; api.rerender(true); return true; }
    if (a === 'cmpswap') { const t = state.cmpA; state.cmpA = state.cmpB; state.cmpB = t; api.rerender(true); return true; }
    if (a === 'cmprival') {
      const profs = allProfiles(ctx);
      defaultPair(profs);
      state.cmpB = pickSmartRival(state.cmpA, profs, state.cmpB);
      api.rerender(true);
      return true;
    }
    if (a === 'cmprand') {
      const ids = ctx.C.leaders.map(l => l.id);
      const i = Math.floor(Math.random() * ids.length);
      let j = Math.floor(Math.random() * (ids.length - 1));
      if (j >= i) j++;
      state.cmpA = ids[i]; state.cmpB = ids[j];
      api.rerender(true);
      return true;
    }
    if (a === 'cmpcards') { state.cmpCardsOpen = !state.cmpCardsOpen; api.rerender(true); return true; }
    return false;
  }

  function handleChange(el, ctx, api) {
    if (el.id === 'bdsort') { state.bSort = el.value; api.rerender(true); return true; }
    if (el.id === 'cmpA') {
      if (el.value === state.cmpB) state.cmpB = state.cmpA;
      state.cmpA = el.value;
      api.rerender(true);
      return true;
    }
    if (el.id === 'cmpB') {
      if (el.value === state.cmpA) state.cmpA = state.cmpB;
      state.cmpB = el.value;
      api.rerender(true);
      return true;
    }
    return false;
  }

  function handleInput(el, inn, ctx) {
    if (el.id === 'bdq') {
      state.bQ = el.value;
      applyBinderSearch(inn, ctx.C.leaders.length);
      return true;
    }
    return false;
  }

  return {
    state,
    renderBinder,
    renderCompare,
    handleClick,
    handleChange,
    handleInput,
    applyBinderSearch
  };
})();
