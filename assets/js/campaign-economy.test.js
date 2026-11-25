const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('./campaign-economy.js');

test('duplicate dust scales by rarity and includes +20 pack-seal bonus', () => {
  const owned = { a1: 1, b1: 1, c1: 1, d1: 1, e1: 1 };
  const grades = { a1: 'A', b1: 'B', c1: 'C', d1: 'D', e1: 'E', fresh1: 'A' };
  const rarOf = id => grades[id] || 'N';

  const res = E.computePackDust(['a1', 'b1', 'fresh1'], owned, rarOf);
  assert.equal(res.sealDust, 20);
  assert.equal(res.dupDust, 180 + 100);
  assert.equal(res.totalDust, 300);
  assert.equal(res.perCard[0].isDup, true);
  assert.equal(res.perCard[0].dust, 180);
  assert.equal(res.perCard[2].isDup, false);
  assert.equal(res.perCard[2].dust, 0);

  const allCommonDup = E.computePackDust(['c1', 'd1', 'e1'], owned, rarOf);
  assert.equal(allCommonDup.dupDust, 60 + 40 + 25);
  assert.equal(allCommonDup.totalDust, 145);
});

test('packEligibleLeaders excludes craft-only Vault Legends', () => {
  const leaders = [
    { id: 'anthony_albanese', party: 'ALP' },
    { id: 'paul_keating', party: 'ALP', craftOnly: true, vault: true },
    { id: 'bob_katter', party: 'KAP', craftOnly: true, vault: true }
  ];
  const eligible = E.packEligibleLeaders(leaders);
  assert.deepEqual(eligible.map(x => x.id), ['anthony_albanese']);
});

test('craftCost covers Series One grades and 500 Dust for Vault Legends', () => {
  assert.equal(E.craftCost({ id: 'x' }, 'A'), 420);
  assert.equal(E.craftCost({ id: 'x' }, 'B'), 280);
  assert.equal(E.craftCost({ id: 'x' }, 'C'), 180);
  assert.equal(E.craftCost({ id: 'x' }, 'D'), 120);
  assert.equal(E.craftCost({ id: 'x' }, 'E'), 80);
  assert.equal(E.craftCost({ id: 'x' }, 'F'), 80);
  assert.equal(E.craftCost({ id: 'x' }, 'N'), 80);
  assert.equal(E.craftCost({ id: 'bob_katter', craftOnly: true }, 'F'), 500);
  assert.equal(E.craftCost({ id: 'paul_keating', craftOnly: true }, 'A'), 500);
});

test('direct card crafting deducts Dust, records provenance, and guards insufficient Dust', () => {
  const katter = { id: 'bob_katter', craftOnly: true };
  const s0 = { owned: { anthony_albanese: 1 }, dust: 420, foil: {}, crafted: {} };

  const fail = E.applyCraft(s0, katter, 'F', 1000);
  assert.equal(fail.ok, false);
  assert.equal(fail.reason, 'insufficient');
  assert.equal(fail.shortfall, 80);
  assert.equal(fail.state.dust, 420);
  assert.equal(fail.state.owned.bob_katter, undefined);

  const s1 = { ...s0, dust: 650 };
  const ok = E.applyCraft(s1, katter, 'F', 2000);
  assert.equal(ok.ok, true);
  assert.equal(ok.cost, 500);
  assert.equal(ok.state.dust, 150);
  assert.equal(ok.state.owned.bob_katter, 2000);
  assert.equal(ok.state.crafted.bob_katter, 2000);

  const dupCraft = E.applyCraft(ok.state, katter, 'F', 3000);
  assert.equal(dupCraft.ok, false);
  assert.equal(dupCraft.reason, 'owned');
});

test('two-tier foil upgrades work step-by-step (0->1->2) and direct (0->2)', () => {
  const s0 = { owned: { bob_katter: 100, paul_keating: 100 }, dust: 800, foil: {}, crafted: {} };

  // Locked leader cannot be upgraded
  const locked = E.applyFoilUpgrade(s0, 'john_howard', 1);
  assert.equal(locked.ok, false);
  assert.equal(locked.reason, 'locked');

  // Step 0 -> 1 (Platinum Brushed Chrome: 120 Dust)
  const t1 = E.applyFoilUpgrade(s0, 'bob_katter', 1);
  assert.equal(t1.ok, true);
  assert.equal(t1.cost, 120);
  assert.equal(t1.state.dust, 680);
  assert.equal(E.foilTierOf(t1.state, 'bob_katter'), 1);

  // Step 1 -> 2 (Parliament Prism from Platinum: 260 Dust)
  const t2 = E.applyFoilUpgrade(t1.state, 'bob_katter', 2);
  assert.equal(t2.ok, true);
  assert.equal(t2.cost, 260);
  assert.equal(t2.state.dust, 420);
  assert.equal(E.foilTierOf(t2.state, 'bob_katter'), 2);

  // Already at max tier
  const again = E.applyFoilUpgrade(t2.state, 'bob_katter', 2);
  assert.equal(again.ok, false);
  assert.equal(again.reason, 'already');

  // Direct 0 -> 2 (Parliament Prism direct: 350 Dust)
  const direct = E.applyFoilUpgrade(t2.state, 'paul_keating', 2);
  assert.equal(direct.ok, true);
  assert.equal(direct.cost, 350);
  assert.equal(direct.state.dust, 70);
  assert.equal(E.foilTierOf(direct.state, 'paul_keating'), 2);
});

test('ensureCardState grants one-time retroactive Dust credit and stays idempotent', () => {
  const hof = [
    { leader: 'anthony_albanese', gov: true, k: 0, ab: false },
    { leader: 'angus_taylor', gov: false, k: 2, ab: false },
    { leader: 'bob_brown', gov: false, k: 3, ab: true }
  ];
  const first = E.ensureCardState(null, ['anthony_albanese', 'angus_taylor'], hof, 4);
  // 1 win (50) + 1 non-win finish (30) + 4 honours (60) = 140
  assert.equal(first.retroDust, 140);
  assert.equal(first.state.dust, 140);
  assert.equal(first.state.dustCredited, 1);

  const second = E.ensureCardState(first.state, ['anthony_albanese', 'angus_taylor'], hof, 4);
  assert.equal(second.retroDust, 0);
  assert.equal(second.state.dust, 140);
  assert.equal(second.changed, false);
});

test('awardRunDust and awardHonourDust grant exact gameplay rewards', () => {
  const base = { owned: {}, dust: 100 };
  const rWin = E.awardRunDust(base, true);
  assert.equal(rWin.gain, 50);
  assert.equal(rWin.state.dust, 150);

  const rFin = E.awardRunDust(rWin.state, false);
  assert.equal(rFin.gain, 30);
  assert.equal(rFin.state.dust, 180);

  const rHon = E.awardHonourDust(rFin.state, 3);
  assert.equal(rHon.gain, 45);
  assert.equal(rHon.state.dust, 225);
});

test('mergeCardProfiles preserves max dust, max foil tier per leader, and union of crafted/owned', () => {
  const local = {
    owned: { anthony_albanese: 1, bob_katter: 100 },
    opened: 4,
    dust: 320,
    foil: { anthony_albanese: 2, bob_katter: 1 },
    crafted: { bob_katter: 100 },
    dustCredited: 1
  };
  const incoming = {
    owned: { anthony_albanese: 1, paul_keating: 200 },
    opened: 7,
    dust: 540,
    foil: { anthony_albanese: 1, bob_katter: 2, paul_keating: 1 },
    crafted: { paul_keating: 200 },
    allPacks: true
  };
  const merged = E.mergeCardProfiles(local, incoming);
  assert.equal(merged.dust, 540);
  assert.equal(merged.opened, 7);
  assert.equal(merged.allPacks, true);
  assert.equal(merged.foil.anthony_albanese, 2);
  assert.equal(merged.foil.bob_katter, 2);
  assert.equal(merged.foil.paul_keating, 1);
  assert.ok(merged.owned.bob_katter);
  assert.ok(merged.owned.paul_keating);
  assert.ok(merged.crafted.bob_katter);
  assert.ok(merged.crafted.paul_keating);
});

test('packDupChance is 0% below 33% owned, ramps 20%-30% from 33% upward, and 100% when full', () => {
  assert.equal(E.packDupChance(5, 65), 0);
  assert.equal(E.packDupChance(21, 65), 0); // 32.3% < 33.3%
  assert.equal(E.packDupChance(22, 65), 0.2008); // 33.8% -> ~20%
  assert.equal(E.packDupChance(1, 3), 0.2); // exact 33.3% -> 20%
  const mid = E.packDupChance(43, 65); // 66.2% -> ~25%
  assert.ok(mid >= 0.24 && mid <= 0.26, `expected ~0.25, got ${mid}`);
  const nearFull = E.packDupChance(64, 65); // 98.5% -> ~30%
  assert.ok(nearFull >= 0.29 && nearFull <= 0.30, `expected ~0.30, got ${nearFull}`);
  assert.equal(E.packDupChance(65, 65), 1);
});

test('drawPackLeaders draws 3 distinct cards with dupes only once >=33% owned', () => {
  const pool = Array.from({ length: 65 }, (_, i) => ({ id: `L${i}` }));
  const pickFirst = (list, n) => list.slice(0, n);

  // Below 33% (20 owned): even rng=0 produces 0 duplicates
  const owned20 = Object.fromEntries(pool.slice(0, 20).map(x => [x.id, 1]));
  const below = E.drawPackLeaders(pool, owned20, pickFirst, () => 0, 3);
  assert.equal(below.dupChance, 0);
  assert.equal(below.ids.length, 3);
  assert.equal(new Set(below.ids).size, 3);
  assert.ok(below.ids.every(id => !owned20[id]));

  // At >=33% (22 owned): rng below dupChance draws owned duplicate, rng above draws fresh
  const owned22 = Object.fromEntries(pool.slice(0, 22).map(x => [x.id, 1]));
  const seq = [0.05, 0.90, 0.15];
  let idx = 0;
  const mixed = E.drawPackLeaders(pool, owned22, pickFirst, () => seq[idx++], 3);
  assert.ok(mixed.dupChance >= 0.20 && mixed.dupChance <= 0.21);
  assert.equal(mixed.ids.length, 3);
  assert.equal(new Set(mixed.ids).size, 3);
  assert.equal(mixed.ids.filter(id => !!owned22[id]).length, 2);
  assert.equal(mixed.ids.filter(id => !owned22[id]).length, 1);

  // At 100% (65 owned): draws 3 distinct owned duplicates (Dust Pack)
  const ownedAll = Object.fromEntries(pool.map(x => [x.id, 1]));
  const full = E.drawPackLeaders(pool, ownedAll, pickFirst, () => 0.99, 3);
  assert.equal(full.dupChance, 1);
  assert.equal(full.ids.length, 3);
  assert.equal(new Set(full.ids).size, 3);
  assert.ok(full.ids.every(id => !!ownedAll[id]));
});

test('cardNumberMap assigns No. 1 to rarest card type (Vault Legends) down to most common', () => {
  const leaders = [
    { id: 'common_f', name: 'Mark Latham' },
    { id: 'silver_c', name: 'Jim Chalmers' },
    { id: 'holo_a', name: 'Tanya Plibersek' },
    { id: 'vault_hi', name: 'Paul Keating', craftOnly: true },
    { id: 'gold_b', name: 'Clare O\'Neil' },
    { id: 'bronze_d', name: 'Angus Taylor' },
    { id: 'common_e', name: 'Tim Wilson' },
    { id: 'vault_lo', name: 'Bob Katter', craftOnly: true }
  ];
  const tl = [
    { id: 'common_f', grade: 'F', score: -0.6 },
    { id: 'silver_c', grade: 'C', score: 1.47 },
    { id: 'holo_a', grade: 'A', score: 2.23 },
    { id: 'vault_hi', grade: 'A', score: 2.04 },
    { id: 'gold_b', grade: 'B', score: 2.02 },
    { id: 'bronze_d', grade: 'D', score: 1.27 },
    { id: 'common_e', grade: 'E', score: 0.84 },
    { id: 'vault_lo', grade: 'F', score: 0.42 }
  ];
  const map = E.cardNumberMap(leaders, tl);
  assert.equal(map.vault_hi, 1);
  assert.equal(map.vault_lo, 2);
  assert.equal(map.holo_a, 3);
  assert.equal(map.gold_b, 4);
  assert.equal(map.silver_c, 5);
  assert.equal(map.bronze_d, 6);
  assert.equal(map.common_e, 7);
  assert.equal(map.common_f, 8);
});


