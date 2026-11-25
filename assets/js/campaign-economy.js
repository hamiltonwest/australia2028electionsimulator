// Pure, deterministic Card Dust, Direct Crafting, and Two-Tier Foil Upgrade economy module.
// Loaded in the browser as window.CAMPAIGN_ECON and importable in Node.js for unit testing.
(function (root) {
  const DUP_DUST = Object.freeze({ A: 180, B: 100, C: 60, D: 40, E: 25, F: 25, N: 25 });
  const PACK_SEAL_DUST = 20;
  const PACK_DUP_THRESHOLD = 1 / 3;
  const PACK_DUP_MIN = 0.20;
  const PACK_DUP_MAX = 0.30;
  const CRAFT_COST = Object.freeze({ A: 420, B: 280, C: 180, D: 120, E: 80, F: 80, N: 80, V: 500 });
  const FOIL_COST = Object.freeze({ 1: 120, 2: 260, direct2: 350 });
  const FOIL_NAME = Object.freeze({
    0: 'Standard',
    1: 'Platinum Brushed Chrome',
    2: 'Parliament Prism'
  });
  const FOIL_SHORT = Object.freeze({
    0: 'Standard',
    1: 'Platinum Foil',
    2: 'Prism Edition'
  });
  const RUN_DUST = Object.freeze({ win: 50, finish: 30 });
  const HONOUR_DUST = 15;
  const CHEAT_DUST_VAULT = 1500;
  const CHEAT_MACHINE_DUST = 5000;
  const CARD_RARITY_ORDER = Object.freeze({ V: 0, A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, N: 7 });

  // Assigns card numbers 1..N from rarest card type (Vault Legends -> Holo Rare -> Gold ->
  // Silver -> Bronze -> Common E -> Common F -> unrated) down to most common.
  function cardNumberMap(leaders, tierlistLeaders) {
    const tlById = {};
    (tierlistLeaders || []).forEach(x => { if (x && x.id) tlById[x.id] = x; });
    const ranked = (leaders || []).filter(l => l && l.id).map((l, idx) => {
      const tl = tlById[l.id] || null;
      const rarKey = l.craftOnly ? 'V' : String((tl && tl.grade) || 'N').toUpperCase();
      const rank = CARD_RARITY_ORDER[rarKey] != null ? CARD_RARITY_ORDER[rarKey] : CARD_RARITY_ORDER.N;
      const score = tl && typeof tl.score === 'number' ? tl.score : -999;
      return { id: l.id, name: String(l.name || l.id), rank, score, idx };
    });
    ranked.sort((a, b) =>
      a.rank - b.rank ||
      b.score - a.score ||
      a.name.localeCompare(b.name) ||
      a.idx - b.idx
    );
    const map = {};
    ranked.forEach((r, i) => { map[r.id] = i + 1; });
    return map;
  }

  function rarityKeyForCraft(leader, grade) {
    if (leader && leader.craftOnly) return 'V';
    const g = String(grade || 'N').toUpperCase();
    return CRAFT_COST[g] != null ? g : 'N';
  }

  function craftCost(leader, grade) {
    return CRAFT_COST[rarityKeyForCraft(leader, grade)];
  }

  function dupDustFor(grade) {
    const g = String(grade || 'N').toUpperCase();
    return DUP_DUST[g] != null ? DUP_DUST[g] : DUP_DUST.N;
  }

  function foilTierOf(state, id) {
    const t = Number((state && state.foil && state.foil[id]) || 0);
    return t === 2 ? 2 : t === 1 ? 1 : 0;
  }

  function foilUpgradeCost(currentTier, targetTier) {
    const cur = Number(currentTier) || 0;
    const tgt = Number(targetTier) || 0;
    if (tgt !== 1 && tgt !== 2) return null;
    if (tgt <= cur) return null;
    if (cur === 0 && tgt === 1) return FOIL_COST[1];
    if (cur === 1 && tgt === 2) return FOIL_COST[2];
    if (cur === 0 && tgt === 2) return FOIL_COST.direct2;
    return null;
  }

  // Ensures a browser-local card profile has valid economy fields and grants a one-time
  // retroactive Dust credit for pre-existing Honours and completed Hall of Fame campaigns.
  function ensureCardState(raw, starterIds, hofRuns, honourCount) {
    const c = raw && typeof raw === 'object' ? { ...raw } : { owned: {}, opened: 0 };
    let changed = !raw || typeof raw !== 'object';

    c.owned = c.owned && typeof c.owned === 'object' ? { ...c.owned } : {};
    c.opened = Math.max(0, Number(c.opened) || 0);

    if (typeof c.dust !== 'number' || !Number.isFinite(c.dust) || c.dust < 0) {
      c.dust = 0;
      changed = true;
    }
    if (!c.foil || typeof c.foil !== 'object') {
      c.foil = {};
      changed = true;
    } else {
      c.foil = { ...c.foil };
    }
    if (!c.crafted || typeof c.crafted !== 'object') {
      c.crafted = {};
      changed = true;
    } else {
      c.crafted = { ...c.crafted };
    }

    const runs = Array.isArray(hofRuns) ? hofRuns : [];
    if (!raw) {
      runs.forEach(x => {
        if (x && x.leader && !c.owned[x.leader]) c.owned[x.leader] = x.at || Date.now();
      });
    }

    (starterIds || []).forEach(id => {
      if (!c.owned[id]) {
        c.owned[id] = 1;
        changed = true;
      }
    });

    let retroDust = 0;
    if (!c.dustCredited) {
      const validRuns = runs.filter(x => x && !x.ab);
      const runCredits = validRuns.reduce((sum, r) => sum + ((r.gov || r.k === 0) ? RUN_DUST.win : RUN_DUST.finish), 0);
      const honCredits = Math.max(0, Number(honourCount) || 0) * HONOUR_DUST;
      retroDust = runCredits + honCredits;
      if (retroDust > 0) c.dust += retroDust;
      c.dustCredited = 1;
      changed = true;
    }

    return { state: c, changed, retroDust };
  }

  // Standard leader packs exclude craft-only Vault Legends.
  function packEligibleLeaders(leaders) {
    return (leaders || []).filter(l => l && !l.craftOnly);
  }

  // Per-card duplicate probability for non-guaranteed slots in standard packs:
  // 0% on the very first pack opened (openedCount === 0); after the first opened pack,
  // scales from 20% up to 30% as the set fills; 100% once every pack-eligible leader is owned.
  function packDupChance(ownedPackCount, totalPackCount, openedCount) {
    const total = Math.max(0, Number(totalPackCount) || 0);
    if (!total) return 0;
    const owned = Math.max(0, Math.min(total, Number(ownedPackCount) || 0));
    if (owned >= total) return 1;
    if (openedCount != null && Number(openedCount) <= 0) return 0;
    if (owned <= 0) return 0;
    const ratio = owned / total;
    return +(PACK_DUP_MIN + (PACK_DUP_MAX - PACK_DUP_MIN) * ratio).toFixed(4);
  }

  // Draws `count` distinct leaders for a pack using rarity-weighted `pickWeighted`.
  // Pack #1 (`openedCount === 0`): all new leaders (no dupes while fresh leaders exist).
  // Pack #2+ (`openedCount >= 1`): guarantees at least 1 duplicate per pack (when owned dupes exist),
  // plus `dupChance` on remaining slots, then shuffles slot order.
  function drawPackLeaders(packPool, ownedMap, pickWeighted, rng, count, openedCount) {
    const n = Math.max(1, Number(count) || 3);
    const opened = Math.max(0, Number(openedCount) || 0);
    const owned = ownedMap || {};
    const rand = typeof rng === 'function' ? rng : Math.random;
    const poolIds = (packPool || []).map(x => (typeof x === 'string' ? x : x && x.id)).filter(Boolean);
    const fresh = poolIds.filter(id => !owned[id]);
    const dupes = poolIds.filter(id => !!owned[id]);
    const dupChance = packDupChance(dupes.length, poolIds.length, opened);
    const out = [];
    const pick = typeof pickWeighted === 'function'
      ? (list => pickWeighted(list, 1)[0])
      : (list => list[Math.min(list.length - 1, Math.floor(rand() * list.length))]);
    const takeFrom = src => {
      const id = pick(src);
      if (!id) return null;
      out.push(id);
      const idx = src.indexOf(id);
      if (idx >= 0) src.splice(idx, 1);
      return id;
    };

    const guaranteedDup = opened >= 1 && dupes.length > 0;
    if (guaranteedDup) takeFrom(dupes);

    while (out.length < n && (fresh.length || dupes.length)) {
      const wantDup = !fresh.length || (opened >= 1 && dupes.length > 0 && dupChance > 0 && rand() < dupChance);
      const src = wantDup ? dupes : fresh;
      if (!takeFrom(src)) break;
    }

    // Shuffle slot positions so the guaranteed duplicate does not always sit in slot 1.
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return { ids: out, dupChance, guaranteedDup: guaranteedDup ? 1 : 0 };
  }

  // Computes exact Dust payout for opening a 3-card pack: +20 seal bonus + rarity-scaled duplicate dust.
  function computePackDust(pulledIds, ownedBefore, rarOf) {
    const owned = ownedBefore || {};
    const perCard = (pulledIds || []).map(id => {
      const isDup = !!owned[id];
      const rar = typeof rarOf === 'function' ? rarOf(id) : 'N';
      const dust = isDup ? dupDustFor(rar) : 0;
      return { id, rar, isDup, dust };
    });
    const dupDust = perCard.reduce((s, x) => s + x.dust, 0);
    return {
      sealDust: PACK_SEAL_DUST,
      dupDust,
      totalDust: PACK_SEAL_DUST + dupDust,
      perCard
    };
  }

  function canCraft(state, leader, grade) {
    if (!state || !leader || !leader.id) return { ok: false, reason: 'invalid', cost: 0, shortfall: 0 };
    const cost = craftCost(leader, grade);
    if (state.owned && state.owned[leader.id]) {
      return { ok: false, reason: 'owned', cost, shortfall: 0 };
    }
    const have = Math.max(0, Number(state.dust) || 0);
    if (have < cost) {
      return { ok: false, reason: 'insufficient', cost, shortfall: cost - have };
    }
    return { ok: true, reason: 'ok', cost, shortfall: 0 };
  }

  function applyCraft(state, leader, grade, nowTs) {
    const chk = canCraft(state, leader, grade);
    if (!chk.ok) return { ok: false, reason: chk.reason, cost: chk.cost, shortfall: chk.shortfall, state };
    const ts = nowTs != null ? nowTs : Date.now();
    const next = {
      ...state,
      dust: (Number(state.dust) || 0) - chk.cost,
      owned: { ...(state.owned || {}), [leader.id]: ts },
      crafted: { ...(state.crafted || {}), [leader.id]: ts },
      foil: { ...(state.foil || {}) }
    };
    return { ok: true, reason: 'crafted', cost: chk.cost, shortfall: 0, state: next };
  }

  function canUpgradeFoil(state, id, targetTier) {
    if (!state || !id) return { ok: false, reason: 'invalid', cost: 0, shortfall: 0, currentTier: 0 };
    const currentTier = foilTierOf(state, id);
    if (!state.owned || !state.owned[id]) {
      return { ok: false, reason: 'locked', cost: 0, shortfall: 0, currentTier };
    }
    const cost = foilUpgradeCost(currentTier, targetTier);
    if (cost == null) {
      return { ok: false, reason: 'already', cost: 0, shortfall: 0, currentTier };
    }
    const have = Math.max(0, Number(state.dust) || 0);
    if (have < cost) {
      return { ok: false, reason: 'insufficient', cost, shortfall: cost - have, currentTier };
    }
    return { ok: true, reason: 'ok', cost, shortfall: 0, currentTier };
  }

  function applyFoilUpgrade(state, id, targetTier) {
    const chk = canUpgradeFoil(state, id, targetTier);
    if (!chk.ok) return { ok: false, reason: chk.reason, cost: chk.cost, shortfall: chk.shortfall, state };
    const next = {
      ...state,
      dust: (Number(state.dust) || 0) - chk.cost,
      owned: { ...(state.owned || {}) },
      crafted: { ...(state.crafted || {}) },
      foil: { ...(state.foil || {}), [id]: Number(targetTier) }
    };
    return { ok: true, reason: 'upgraded', cost: chk.cost, shortfall: 0, tier: Number(targetTier), state: next };
  }

  function awardRunDust(state, wonOrTier1) {
    const gain = wonOrTier1 ? RUN_DUST.win : RUN_DUST.finish;
    const next = { ...state, dust: (Number(state && state.dust) || 0) + gain };
    return { gain, state: next };
  }

  function awardHonourDust(state, newlyEarnedCount) {
    const n = Math.max(0, Number(newlyEarnedCount) || 0);
    const gain = n * HONOUR_DUST;
    const next = { ...state, dust: (Number(state && state.dust) || 0) + gain };
    return { gain, state: next };
  }

  // Merges two card profile objects (used by ES28-PROFILE-1 import/export) without losing progress.
  function mergeCardProfiles(localCards, incomingCards) {
    const loc = localCards && typeof localCards === 'object' ? localCards : { owned: {}, opened: 0, dust: 0, foil: {}, crafted: {} };
    const inc = incomingCards && typeof incomingCards === 'object' ? incomingCards : {};
    const owned = Object.assign({}, inc.owned || {}, loc.owned || {});
    const crafted = Object.assign({}, inc.crafted || {}, loc.crafted || {});
    const foil = {};
    const allFoilKeys = new Set([...Object.keys(inc.foil || {}), ...Object.keys(loc.foil || {})]);
    allFoilKeys.forEach(k => {
      const tier = Math.max(Number((loc.foil || {})[k]) || 0, Number((inc.foil || {})[k]) || 0);
      if (tier > 0) foil[k] = Math.min(2, tier);
    });
    const out = {
      owned,
      opened: Math.max(Number(loc.opened) || 0, Number(inc.opened) || 0),
      dust: Math.max(Number(loc.dust) || 0, Number(inc.dust) || 0),
      foil,
      crafted,
      dustCredited: Math.max(Number(loc.dustCredited) || 0, Number(inc.dustCredited) || 0)
    };
    if (loc.allPacks || inc.allPacks) out.allPacks = true;
    return out;
  }

  const API = {
    DUP_DUST,
    PACK_SEAL_DUST,
    PACK_DUP_THRESHOLD,
    PACK_DUP_MIN,
    PACK_DUP_MAX,
    CRAFT_COST,
    FOIL_COST,
    FOIL_NAME,
    FOIL_SHORT,
    RUN_DUST,
    HONOUR_DUST,
    CHEAT_DUST_VAULT,
    CHEAT_MACHINE_DUST,
    CARD_RARITY_ORDER,
    cardNumberMap,
    rarityKeyForCraft,
    craftCost,
    dupDustFor,
    foilTierOf,
    foilUpgradeCost,
    ensureCardState,
    packEligibleLeaders,
    packDupChance,
    drawPackLeaders,
    computePackDust,
    canCraft,
    applyCraft,
    canUpgradeFoil,
    applyFoilUpgrade,
    awardRunDust,
    awardHonourDust,
    mergeCardProfiles
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = API;
  if (root) root.CAMPAIGN_ECON = API;
})(typeof window !== 'undefined' ? window : globalThis);
