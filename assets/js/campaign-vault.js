// Vault Legends & Katter's Australian Party (KAP): five rare craft-only leaders (No. 001–005),
// bespoke event decks, KAP Political Power decisions, sandbox traits, archival card art, and Honours.
// All game content: options describe what the player chooses to do; nothing is presented as a quote from a real person.
(() => {
  const C = window.CAMPAIGN_DATA;
  if (!C) return;

  const E = (x, h, e, st) => ({ x, h, e, ...(st ? { st } : {}) });
  const G = (x, h, k, min, ok, no, st) => ({ x, h, rng: { k, min, ok, no }, ...(st ? { st } : {}) });
  const S = (r, p) => (r && r.seats[p]) || 0;
  const won = (st, r) => !!r && r.gov === st.party;
  const maj = (st, r) => S(r, st.party) >= 76;
  const ST = (r, s, p) => (r && r.st[s] && r.st[s][p]) || 0;

  // ---- Katter's Australian Party (KAP) as a full playable party banner
  const kapG = window.APP && window.APP.P ? window.APP.P.findIndex(p => p.ab === 'KAP') : 9;
  C.PARTIES.KAP = {
    n: "Katter's Australian Party",
    short: 'KAP',
    ldr: "Katter's Australian",
    setLdr: true,
    g: [kapG >= 0 ? kapG : 9],
    c: 'kap'
  };
  C.tiers.KAP = [
    ['Majority government', r => S(r, 'KAP') >= 76],
    ['Kingmaker surge', r => S(r, 'KAP') >= 25 || (r.hung && S(r, 'KAP') >= 12)],
    ['Regional force', r => S(r, 'KAP') >= 5],
    ['Still just Kennedy', () => true]
  ];
  C.TIERNOTE = C.TIERNOTE || {};
  C.TIERNOTE.KAP = 'Starting from 1 seat (Kennedy) · Majority goal (76+)';

  C.blocs = C.blocs || {};
  if (!C.blocs.KAP) {
    C.blocs.KAP = {
      n: "Katter's Australian Party",
      lean: { ALP: 0.45, LNP: 0.45, ONP: 0.5 },
      ask: 'Dams, ethanol mandates, supermarket divestiture and north Queensland rail.'
    };
  }
  C.rival = C.rival || {};
  C.rival.KAP = [
    'Bob Katter holds a fiery press conference in Charters Towers.',
    'Katter’s Australian Party rolls out another convoy of regional candidates.'
  ];

  // ---- Sandbox traits for the five Vault Legends (used in Campaign Mode & Comparator)
  const T = window.TRAITS;
  if (T && T.L && T.A) {
    Object.assign(T.L, {
      vault_orator: ['Parliamentary Orator', 2, 'Commands the dispatch box and owns the evening news grab.', 0.7, [['prof', 0.5], ['deg', 0.4]]],
      vault_reformer: ['Economic Architect', 2, 'Floated the dollar, built super, and still dominates the economic argument.', 0.5, [['hiinc', 0.4], ['mort', 0.5]]],
      vault_arrogant: ['Acid Tongue', -1, 'Brilliantly quotable, occasionally alienates undecided suburban voters.', -0.3, [['farm', -0.5], ['old', -0.3]]],
      vault_battlers: ['Howard’s Battlers', 2, 'Speaks directly to outer-suburban mortgage belts and retirees.', 0.7, [['mort', 1.1], ['old', 0.7], ['fam', 0.5]]],
      vault_discipline: ['Iron Cabinet Discipline', 2, 'Eleven years in the Lodge taught him how to hold a coalition together.', 0.5, [['chr', 0.5]]],
      vault_workchoices: ['Ghost of WorkChoices', -2, 'Unions and younger voters still remember the workplace laws.', -0.5, [['young', -0.8], ['deg', -0.6], ['lab', -0.4]]],
      vault_crash_through: ['Crash Through or Crash', 2, 'Sweeping vision that rallies Medicare defenders, renters and students.', 0.8, [['care', 0.9], ['young', 0.7], ['rent', 0.6]]],
      vault_medibank: ['Father of Medicare', 2, 'Universal healthcare and free education are written into his name.', 0.5, [['care', 0.8], ['lowinc', 0.6]]],
      vault_supply: ['Loans Affair Shadows', -2, 'Opponents hammer economic management, inflation and budget discipline.', -0.7, [['hiinc', -0.7], ['mort', -0.6], ['mstress', -0.6]]],
      vault_forgotten: ['The Forgotten People', 2, 'Rallies middle-Australia homeowners and small business.', 0.8, [['old', 0.7], ['hiinc', 0.6], ['mort', 0.6]]],
      vault_founder_lib: ['Founder of the Liberals', 2, 'Unites every Liberal wing from leafy inner seats to the suburbs.', 0.5, [['deg', 0.5], ['prof', 0.5]]],
      vault_timewarp: ['Man of Another Era', -2, 'Under-40s struggle to connect with 1950s rhetoric.', -0.6, [['young', -0.9], ['rent', -0.6], ['norel', -0.4]]],
      vault_pig_iron: ['Pig Iron Bob', -1, 'Unions and port seats still throw the 1938 Dalfram dispute at him.', -0.3, [['lab', -0.9], ['tradie', -0.7], ['mine', -0.4]]],
      vault_kennedy: ['King of Kennedy', 2, 'Unmatched folk-hero authority across regional Queensland and farming seats.', 0.8, [['st:QLD', 3.4], ['farm', 1.8], ['mine', 1.4]]],
      vault_nationalist: ['Economic Nationalist', 2, 'Tariffs, dams and busting supermarket duopolies resonate in working-class towns.', 0.6, [['lab', 1.1], ['tradie', 1.0], ['lowinc', 0.7]]],
      vault_maverick: ['Wildcard Maverick', -2, 'Every press conference can veer off-script; inner-city voters recoil.', -0.8, [['apt', -1.2], ['deg', -1.0], ['hiinc', -0.7]]]
    });
    T.A['Paul Keating|Labor'] = ['vault_orator', 'vault_reformer', 'nsw_roots', 'vault_arrogant', 'old_news'];
    T.A['John Howard|Coalition'] = ['vault_battlers', 'vault_discipline', 'security_hawk', 'city_cold', 'vault_workchoices'];
    T.A['Gough Whitlam|Labor'] = ['vault_crash_through', 'vault_medibank', 'wsyd', 'old_news', 'vault_supply'];
    T.A['Robert Menzies|Coalition'] = ['vault_forgotten', 'vault_founder_lib', 'vic_roots', 'vault_pig_iron', 'vault_timewarp'];
    T.A["Bob Katter|Katter's Australian"] = ['vault_kennedy', 'vault_nationalist', 'bush_champ', 'vault_maverick'];
    T.A['Bob Katter'] = T.A["Bob Katter|Katter's Australian"];
  }

  // ---- Register historic PMs in APP.DATA.leaders for seat labels & sandbox compatibility
  if (window.APP && window.APP.DATA && Array.isArray(window.APP.DATA.leaders)) {
    const addSandboxLdr = entry => {
      if (!window.APP.DATA.leaders.some(x => x.name === entry.name && x.party === entry.party)) {
        window.APP.DATA.leaders.push(entry);
      }
    };
    addSandboxLdr({ party: 'Labor', name: 'Paul Keating', d: [0.4, -0.2, 0, -0.1, -0.1], sel: false, seat: 'Blaxland (NSW)', rk: 21 });
    addSandboxLdr({ party: 'Coalition', name: 'John Howard', d: [-0.2, 0.5, 0, -0.2, -0.1], sel: false, seat: 'Bennelong (NSW)', rk: 21 });
    addSandboxLdr({ party: 'Labor', name: 'Gough Whitlam', d: [0.5, -0.2, -0.2, -0.1, 0], sel: false, seat: 'Werriwa (NSW)', rk: 22 });
    addSandboxLdr({ party: 'Coalition', name: 'Robert Menzies', d: [-0.3, 0.5, 0, -0.1, -0.1], sel: false, seat: 'Kooyong (Vic)', rk: 22 });
  }

  // Vault Legends intentionally use archival monogram placeholders until official/sourced portraits are supplied.

  // ---- Five Craft-Only Vault Legends (No. 001–005)
  const VAULT_LEADERS = [];
  const VAULT_LO = [];
  const VAULT_ACH = [];

  function addVault(L, sig, cur, card, bag, ach) {
    L.mates = L.mates || [];
    L.more = true;
    L.craftOnly = true;
    L.vault = true;
    VAULT_LEADERS.push(L);

    const [m1, x1, h1, e1, t1, s1] = sig;
    const [m2, x2, h2, r2, t2, s2] = cur;
    VAULT_LO.push({ mile: m1, only: L.id, x: x1, h: h1, e: e1, ...(t1 ? { tag: t1 } : {}), ...(s1 ? { st: s1 } : {}) });
    VAULT_LO.push({ mile: m2, only: L.id, cursed: true, x: x2, h: h2, rng: { k: r2[0], min: r2[1], ok: r2[2], no: r2[3] }, ...(t2 ? { tag: t2 } : {}), ...(s2 ? { st: s2 } : {}) });

    if (card) {
      const [t, q, tag, opts] = card;
      C.cards.push({ id: 'LDR_' + L.id.toUpperCase(), party: L.party, only: L.id, minTurn: 4, ...(tag ? { tag } : {}), t, q, opts });
    }
    if (bag) {
      const [bt, bq, bopts] = bag;
      C.cards.push({ id: 'BAG_' + L.id.toUpperCase(), party: L.party, only: L.id, minTurn: 8, tag: 'CRISIS', t: bt, q: bq, opts: bopts });
    }
    if (ach) {
      const [aid, title, d, chk, svg, why, hard] = ach;
      VAULT_ACH.push({
        id: aid,
        title,
        cat: L.party === 'KAP' ? "Katter's Australian Party" : L.party === 'ALP' ? 'Labor leaders' : 'Coalition leaders',
        leader: L.id,
        d,
        svg,
        why,
        hard: !!hard,
        check: (st, r) => st.leader === L.id && !!chk(st, r)
      });
    }
  }

  // No. 001 — Paul Keating (ALP · Vault Legend)
  addVault(
    {
      id: 'paul_keating', name: 'Paul Keating', party: 'ALP', inc: false, cb: true, again: true, votes0: 36,
      mates: ['Jim Chalmers'], deb: 3, pp: 2, unityAdj: -8, unityDrift: -1,
      debTag: { ECONOMY: 1, TAX: 1 }, pos: { tag: { ECONOMY: 1.3, TAX: 1.25 } },
      neg: { tag: { COST_OF_LIVING: 1.25 }, r: { RUR: 1.3 } },
      plus: ['Placido Domingo', 'Debate skill 3; economy & tax +25–30%; +2 Political Power a turn.'],
      minus: ['High-wire temper', 'Starts with 8 less unity (−1/turn); cost-of-living & rural hits hurt.']
    },
    [4, 'Turn the debate into a masterclass on productivity, superannuation and Australia’s place in Asia.', 'Keating turns the debate into an economic clinic', { o: 0.9, r: { IN: 0.7, OUT: 0.4 }, m: 2 }, 'ECONOMY'],
    [3, 'Tell the Press Club that a tough slowdown is the recession Australia had to have.', 'Keating revives his most infamous line', ['d', 4, { o: 0.7, m: 3 }, { o: -1.3, r: { OUT: -1.1 }, m: -3 }], 'ECONOMY'],
    ['The big picture', 'Business leaders want tax reform; the caucus wants a small target that protects marginals.', 'ECONOMY', [
      E('Unveil a bold productivity and super reform package.', 'Keating pitches the big picture', { o: 0.7, r: { IN: 0.6 }, u: -4, m: 2 }, 'tax+'),
      G('Challenge the opposition leader to a one-on-one economic debate.', 'Keating dares rivals to debate economics', 'd', 2, { o: 0.8, m: 2 }, { o: -0.5, u: -3 }),
      E('Keep the caucus happy and stick to cost-of-living relief.', 'Keating plays a smaller target', { r: { OUT: 0.5 }, u: 4 })
    ]],
    ['The 1996 ghosts', 'Opposition attack ads replay interest-rate headlines from the early nineties and call you yesterday’s arrogance.', [
      G('Mock the ads on live television and rattle off thirty years of super growth.', 'Keating demolishes the attack ads live', 'd', 2, { o: 0.6, m: 2 }, { o: -0.6, r: { OUT: -0.5 } }),
      E('Own the reforms and pivot to wages and housing.', 'Keating owns his record and pivots', { o: 0.3, u: 2 }),
      E('Let the Treasurer front the cameras for two days.', 'Keating hands the mic to Treasury', { u: 4, m: -1 })
    ]],
    [
      'SWEETEST_VICTORY', 'The Sweetest Victory of All',
      'As Paul Keating, win all three debate exchanges and lead Labor to a majority.',
      (st, r) => (st.debWins || 0) >= 3 && maj(st, r),
      '<path class="k" d="M5 19.5h14M7 19.5V11l5-6.5 5 6.5v8.5M10 19.5v-4.5h4v4.5M12 4.5v-2"/>',
      (st, r) => `Three debate wins and ${S(r, 'ALP')} seats for Labor.`, true
    ]
  );

  // No. 002 — John Howard (LNP · Vault Legend)
  addVault(
    {
      id: 'john_howard', name: 'John Howard', party: 'LNP', inc: false, cb: true, again: true, votes0: 40,
      mates: ['Angus Taylor', 'David Littleproud'], deb: 2, pp: 3, unityAdj: 6, unityDrift: 0.5,
      debTag: { ECONOMY: 1, NATIONAL_SECURITY: 1 }, pos: { tag: { ECONOMY: 1.25, NATIONAL_SECURITY: 1.25 } },
      pf: { on: 3 }, pfMinus: { ind: -3 }, neg: { r: { IN: 1.45 } },
      plus: ['Broad-church discipline', 'Debate 2; +3 PP/turn; +6 unity; ONP prefs +3; economy & security +25%.'],
      minus: ['Inner-city headwind', 'Inner-metro setbacks hit 45% harder; teal-seat prefs 3 pts weaker.']
    },
    [1, 'Launch in outer-suburban Sydney with a promise of lower interest rates, strong borders and family tax relief.', 'Howard rallies the outer-suburban battlers', { r: { OUT: 1.3, PROV: 0.5 }, m: 2 }, 'COST_OF_LIVING'],
    [2, 'Dust off a sweeping workplace deregulation overhaul in the middle of the costings launch.', 'Howard revives workplace deregulation', ['d', 3, { o: 0.6, r: { OUT: 0.5 } }, { o: -1.2, r: { OUT: -1.1 }, m: -3 }], 'IR'],
    ['The broad church', 'Conservatives want a tougher line on energy and migration; urban moderates warn the inner cities are slipping away.', 'ECONOMY', [
      E('Unite both wings behind an interest-rate and small-business crusade.', 'Howard unites the broad church on rates', { r: { OUT: 0.9 }, u: 6, m: 1 }),
      E('Court outer-suburban families with a home-buyer grant.', 'Howard targets mortgage-belt families', { r: { OUT: 1.1, IN: -0.4 } }),
      G('Hold an unscripted morning walk and radio blitz across Sydney and Melbourne.', 'Howard’s tracksuit walk dominates talkback', 'm', 1, { o: 0.5, m: 2 }, { o: -0.4 })
    ]],
    ['Bennelong 2007', 'Reporters remind voters that you lost your own seat in 2007 and ask whether the country has moved on.', [
      E('Walk the streets of Bennelong and make the campaign about household budgets.', 'Howard takes Bennelong street by street', { s: { NSW: 0.5 }, r: { OUT: 0.4 } }),
      G('Remind voters who left the nation debt-free and paid off Labor’s deficits.', 'Howard campaigns on debt-free surpluses', 'd', 2, { o: 0.6, m: 1 }, { o: -0.5, r: { IN: -0.5 } }),
      E('Keep the focus squarely on the team and the future.', 'Howard puts the team forward', { u: 5, o: 0.2 })
    ]],
    [
      'LAZARUS_WITH_A_TRIPLE_BYPASS', 'Lazarus With a Triple Bypass',
      'As John Howard, win Bennelong, take the leadership, and deliver a Coalition majority.',
      (st, r) => !!st.by && st.by.res >= 50 && maj(st, r),
      '<path class="k" d="M4.5 12h4l2-5 3 10 2-5h4M12 4a8 8 0 1 1 0 16"/>',
      (st, r) => `Won ${st.by ? st.by.seat : 'Bennelong'} and delivered ${S(r, 'LNP')} Coalition seats.`, true
    ]
  );

  // No. 003 — Gough Whitlam (ALP · Vault Legend)
  addVault(
    {
      id: 'gough_whitlam', name: 'Gough Whitlam', party: 'ALP', inc: false, cb: true, again: true, votes0: 34,
      mates: ['Tanya Plibersek'], deb: 2, pp: 3, unityAdj: -6,
      debTag: { HEALTH: 1, HOUSING: 1 }, pos: { tag: { HEALTH: 1.3, HOUSING: 1.3 } },
      neg: { tag: { ECONOMY: 1.4, TAX: 1.35, COST_OF_LIVING: 1.3 } },
      plus: ['It’s Time wave', 'Debate skill 2; +3 PP/turn; health & housing choices land 30% harder.'],
      minus: ['Supply & inflation', 'Economy (×1.4), tax (×1.35) & living-cost (×1.3) hits sting; −6 unity.']
    },
    [1, 'Pack Blacktown Civic Centre and unveil a sweeping nation-building program for cities, health and universities.', 'Whitlam’s Blacktown rally electrifies the suburbs', { r: { OUT: 1.2, IN: 0.8 }, m: 3 }, 'HOUSING', 'spending+'],
    [2, 'Dismiss the Treasury costings warnings and promise to crash through with bold borrowing.', 'Whitlam vows to crash through on spending', ['m', 3, { o: 0.8, m: 3 }, { o: -1.4, m: -3, u: -6 }], 'ECONOMY', 'spending+'],
    ['Crash through or crash', 'Treasury warns your reform agenda will widen the deficit. Your base wants Medicare, dental and public housing all at once.', 'HEALTH', [
      E('Fund universal dental, free TAFE and a public housing blitz together.', 'Whitlam launches a sweeping social package', { r: { OUT: 0.9, IN: 0.7 }, m: 2, ledger: 12 }, 'spending+'),
      E('Stage the reforms over two terms to reassure the bond markets.', 'Whitlam stages his reform program', { o: 0.4, u: 3 }),
      G('Take on the Senate crossbench directly and threaten a double dissolution.', 'Whitlam dares the Senate to block supply', 'd', 2, { o: 0.7, m: 2 }, { o: -0.7, u: -5 })
    ]],
    ['The Dismissal shadow', 'Opponents warn a Whitlam comeback means runaway spending, constitutional chaos and a Senate supply standoff.', [
      G('Turn the attack into a thunderous rally speech on democracy and Medicare.', 'Whitlam turns 1975 into a rallying cry', 'd', 2, { o: 0.6, m: 2, r: { IN: 0.5 } }, { o: -0.6, r: { OUT: -0.5 } }),
      E('Publish an independent fiscal charter to calm middle Australia.', 'Whitlam releases a fiscal charter', { o: 0.3, r: { OUT: 0.4 }, pp: -5 }),
      E('Point to the hospitals, universities and suburbs your program built.', 'Whitlam points to lasting reforms', { o: 0.3, u: 2 })
    ]],
    [
      'MAINTAIN_YOUR_RAGE', 'It’s Time, Again',
      'As Gough Whitlam, win a Labor majority while finishing with Medicare as a national strength.',
      (st, r) => maj(st, r) && (st.spirits || []).some(s => /MEDICARE_(FORTRESS|JULY)/.test(s)),
      '<path class="k" d="M12 3.5l2.5 5 5.5.8-4 3.9.9 5.5L12 16l-4.9 2.7.9-5.5-4-3.9 5.5-.8z"/>',
      (st, r) => `Labor won ${S(r, 'ALP')} seats with Medicare strong on polling day.`, true
    ]
  );

  // No. 004 — Robert Menzies (LNP · Vault Legend)
  addVault(
    {
      id: 'robert_menzies', name: 'Robert Menzies', party: 'LNP', inc: false, cb: true, again: true, votes0: 38,
      mates: ['Josh Frydenberg', 'David Littleproud'], deb: 2, pp: 2, unityAdj: 8, unityDrift: 0.5,
      debTag: { ECONOMY: 1, NATIONAL_SECURITY: 1 }, pf: { ind: 3 },
      neg: { tag: { HOUSING: 1.3, ENERGY: 1.3 } },
      plus: ['The Forgotten People', 'Debate 2; +8 unity (+0.5 drift); teal-seat prefs +3; +2 PP/turn.'],
      minus: ['Modern headwinds', 'Housing & energy setbacks hit 30% harder with younger voters.']
    },
    [3, 'Deliver a National Press Club address for the Forgotten People: homeowners, savers and small enterprises.', 'Menzies invokes the Forgotten People', { r: { IN: 0.8, OUT: 0.9 }, u: 5, m: 2 }, 'ECONOMY'],
    [4, 'Treat a rowdy televised debate like a town-hall heckler and lecture the moderator on constitutional propriety.', 'Menzies spars with the debate moderator', ['d', 3, { o: 0.7, m: 2 }, { o: -1.1, r: { IN: -0.8 }, m: -2 }]],
    ['Rebuilding the Liberal tent', 'Teals hold Kooyong and Goldstein while One Nation bites at regional flanks. You founded this party to unite the non-Labor side.', 'ECONOMY', [
      E('Pitch home ownership, university excellence and enterprise to reclaim the teal belt.', 'Menzies rebuilds the blue-ribbon heartland', { r: { IN: 1.1, OUT: 0.4 }, pf: { ind: 2 } }),
      E('Lock in a joint Liberal-Nationals stability charter for regional infrastructure.', 'Menzies cements Coalition stability', { r: { RUR: 0.8, PROV: 0.5 }, u: 6 }),
      G('Take to regional radio and suburban halls to rebuild middle-Australia trust.', 'Menzies tours middle Australia', 'd', 2, { o: 0.6, m: 2 }, { o: -0.4 })
    ]],
    ['A relic of the fifties?', 'Younger voters and podcasters poke fun at a leader from another century trying to navigate 2028 politics.', [
      G('Turn the wit back on the press gallery in a sharp, self-deprecating interview.', 'Menzies disarms critics with dry wit', 'd', 2, { o: 0.6, m: 2 }, { o: -0.5, r: { IN: -0.4 } }),
      E('Let younger Liberal MPs front the housing and technology announcements.', 'Menzies showcases the next generation', { r: { OUT: 0.5 }, u: 4 }),
      E('Stand on timeless principles of thrift, defence and home ownership.', 'Menzies stands on timeless principles', { o: 0.2, u: 3 })
    ]],
    [
      'FORGOTTEN_PEOPLE_TRIUMPH', 'The Forgotten People Restored',
      'As Robert Menzies, reclaim Kooyong, win a Coalition majority and take 20+ Victorian seats.',
      (st, r) => !!st.by && st.by.res >= 50 && maj(st, r) && ST(r, 'VIC', 'LNP') >= 20,
      '<path class="k" d="M4.5 19.5h15M6.5 19.5V9.5h11v10M4.5 9.5L12 4.5l7.5 5M9.5 19.5v-5h5v5"/>',
      (st, r) => `Kooyong won and ${S(r, 'LNP')} Coalition seats (${ST(r, 'VIC', 'LNP')} in Victoria).`, true
    ]
  );

  // No. 005 — Bob Katter (KAP · Own Banner · Vault Legend · Majority Government Challenge)
  addVault(
    {
      id: 'bob_katter', name: 'Bob Katter', party: 'KAP', inc: true,
      mates: ['Robbie Katter'], deb: 1, pp: 4, unity: 76, unityDrift: -1,
      debTag: { ENERGY: 1, COST_OF_LIVING: 1 }, pos: { tag: { ENERGY: 1.3, COST_OF_LIVING: 1.25 } },
      neg: { tag: { CRISIS: 1.5 }, r: { IN: 1.4 } },
      plus: ['Akubra juggernaut', '150-seat KAP field; +4 PP/turn; energy & cost-of-living +25–30%.'],
      minus: ['1 seat to 76+', 'Majority goal (76+) from Kennedy; metro (×1.4) & crisis (×1.5) sting.']
    },
    [1, 'Launch in Mount Isa under an Akubra banner: unveil a 150-seat Katter’s Australian Party crusade to take Canberra.', 'Katter launches 150-seat crusade from Mount Isa', { o: 2.2, s: { QLD: 3.5 }, r: { RUR: 2.2, PROV: 1.6 }, m: 3 }, 'ECONOMY'],
    [4, 'Spend half your leaders’ debate time pivoting from tax brackets straight to crocodile attacks in North Queensland.', 'Katter pivots the national debate to crocodiles', ['m', 3, { o: 2.4, m: 3, s: { QLD: 2.5 } }, { o: -1.6, r: { IN: -1.8 }, m: -3 }]],
    ['The crocodile clip', 'A fiery doorstop rant goes viral worldwide overnight. City commentators call it unhinged; regional talkback lights up.', 'CRISIS', [
      G('Double down in the Akubra and pivot straight to supermarket prices and fuel.', 'Katter turns viral rant into cost-of-living gold', 'm', 2, { o: 2.0, r: { OUT: 1.4, RUR: 1.8 }, m: 2 }, { o: -1.1, r: { IN: -1.2 }, m: -2 }),
      E('Keep the cameras rolling on local farmers and regional mechanics.', 'Katter puts farmers on camera', { r: { RUR: 1.8, PROV: 1.2 }, s: { QLD: 1.5 } }),
      E('Hand the next two interviews to Robbie Katter to calm the headlines.', 'Robbie Katter steadies the ship', { u: 6, r: { OUT: 0.6 } })
    ]],
    null,
    [
      'KATTER_MAJORITY', 'A Thousand Blossoms',
      'As Bob Katter, take Katter’s Australian Party from 1 seat (Kennedy) all the way to a 76-seat Majority Government.',
      (st, r) => S(r, 'KAP') >= 76,
      '<path class="k" d="M3.5 15.5c3.5-1.5 13.5-1.5 17 0M6.5 14.5l1.5-6.5c2-1 6-1 8 0l1.5 6.5M8 10.5h8M12 4.5v2"/>',
      (st, r) => `Katter’s Australian Party stunned Australia with ${S(r, 'KAP')} seats and Majority Government.`, true
    ]
  );

  // ---- Bespoke KAP Campaign Deck (6 events exclusively for Bob Katter's majority run)
  const kapCard = (id, tag, t, q, opts) => ({ id, party: 'KAP', tag, t, q, opts });
  C.cards.push(
    kapCard('KAP_BRADFIELD', 'ECONOMY', 'The Revised Bradfield Scheme', 'Your flagship nation-building dream: turn the northern rivers inland to irrigate drought-proof farmland and build hydro power.', [
      E('Commit $30 billion to build Bradfield, rail lines and northern hydro — no half measures.', 'Katter pledges full Bradfield Scheme build', { o: 1.8, s: { QLD: 2.8, NSW: 1.0 }, r: { RUR: 2.2, PROV: 1.6 }, m: 2, ledger: 14 }, 'spending+'),
      G('Pitch Bradfield as a national food-security & cost-of-living breakthrough to suburban voters.', 'Katter sells Bradfield to the suburbs', 'd', 2, { o: 2.4, r: { OUT: 1.8, PROV: 1.2 }, m: 2 }, { o: -0.8, m: -1 }),
      E('Start with a $5 billion Stage One irrigation corridor to keep costings tighter.', 'Katter scales Bradfield to Stage One', { o: 0.9, s: { QLD: 1.5 }, u: 3 })
    ]),
    kapCard('KAP_SUPERMARKETS', 'COST_OF_LIVING', 'Busting the Supermarket Duopoly', 'Farmers are paid pennies while families in the suburbs pay record grocery bills. Both majors hesitate to force divestiture.', [
      E('Promise forced divestiture powers and a 20% market-share cap on supermarket chains.', 'Katter vows to smash supermarket duopoly', { o: 2.2, r: { OUT: 2.0, PROV: 1.6, RUR: 1.5 }, m: 2 }),
      G('Stage a live checkout price protest outside Parliament House with farmers and suburban families.', 'Katter’s trolley protest dominates evening news', 'm', 2, { o: 2.6, r: { OUT: 2.2, IN: 0.8 }, m: 3 }, { o: -0.9, m: -2 }),
      E('Propose a mandatory farm-gate pricing code enforced by the ACCC.', 'Katter backs farm-gate pricing code', { o: 1.1, r: { RUR: 1.4 }, u: 3 })
    ]),
    kapCard('KAP_ETHANOL', 'ENERGY', 'Fuel Security & Ethanol Mandate', 'Petrol spikes past $2.30 a litre and refineries are scarce. You have fought for Australian-made ethanol and local refining for thirty years.', [
      E('Mandate E10 Australian biofuels and underwrite two sovereign fuel refineries.', 'Katter backs sovereign refineries and ethanol', { o: 1.9, r: { OUT: 1.6, RUR: 2.0, PROV: 1.4 }, m: 1 }, 'fossil+'),
      E('Slash fuel excise in half and cap wholesale electricity for manufacturers.', 'Katter promises half-price fuel excise', { o: 2.1, r: { OUT: 1.8, RUR: 1.5 }, ledger: 10 }),
      E('Focus on coal and hydro baseload power to drive power bills down.', 'Katter pushes coal and hydro baseload', { o: 1.5, r: { RUR: 1.6, PROV: 1.2, IN: -0.7 } }, 'fossil+')
    ]),
    kapCard('KAP_CANDIDATES', 'PREFS', 'Fielding 150 Candidates Nationwide', 'Going from one Queensland seat to a 76-seat majority requires credible local candidates in suburban Sydney, Melbourne, Perth and Adelaide.', [
      G('Recruit independent mayors, nurses, mechanics and ex-soldiers across all 150 seats.', 'KAP unveils grassroots 150-seat ticket', 'u', 65, { o: 2.6, r: { OUT: 2.0, PROV: 1.6, IN: 1.0 }, m: 2, pp: -10 }, { o: -0.9, u: -8, m: -2 }),
      E('Focus your best candidates on regional Australia and the outer mortgage belts.', 'KAP targets the bush and outer suburbs', { o: 1.8, r: { RUR: 2.0, OUT: 1.6, PROV: 1.4 } }),
      E('Strike preference swaps with disaffected independents and One Nation branches.', 'KAP brokers populist preference pact', { o: 1.4, n: { LNP: -1.0, ONP: -0.8 }, u: -4 })
    ]),
    kapCard('KAP_TARIFFS', 'ECONOMY', 'Make It Here Again', 'Australian manufacturing is at historic lows. Economists warn tariffs raise prices; blue-collar towns cheer the fightback.', [
      E('Bring back strategic tariffs and a Commonwealth Development Bank for Australian factories.', 'Katter backs tariffs and a national development bank', { o: 2.0, r: { OUT: 1.8, PROV: 2.0, RUR: 1.4, IN: -0.5 }, m: 2 }),
      E('Mandate 75% Australian content on every federal rail, road and defence contract.', 'Katter demands 75% Australian-made contracts', { o: 1.7, r: { OUT: 1.5, PROV: 1.5 }, u: 4 }),
      E('Offer tax holidays to manufacturers relocating to regional hubs.', 'Katter pitches regional factory zones', { o: 1.2, r: { PROV: 1.4, RUR: 1.2 } })
    ]),
    kapCard('KAP_NORTHQLD', 'COST_OF_LIVING', 'The Canberra Establishment Hits Back', 'Both Labor and the Coalition run coordinated ads warning a Katter government would spark economic chaos and wreck interest rates.', [
      G('Go on national prime-time and brand both majors “two heads of the same Canberra beast”.', 'Katter’s prime-time blitz shakes both majors', 'd', 2, { o: 2.5, n: { ALP: -1.2, LNP: -1.2 }, m: 3 }, { o: -1.2, m: -2 }),
      E('Release a full Commonwealth Bank and resource-royalty funding sheet.', 'KAP answers critics with royalty costings', { o: 1.6, r: { OUT: 1.2, IN: 0.6 }, u: 4 }),
      E('Rally 10,000 supporters in Townsville and broadcast it nationwide.', 'Townsville mega-rally broadcasts nationwide', { s: { QLD: 3.0 }, o: 1.3, m: 2 })
    ])
  );

  // ---- Bespoke KAP Political Power Decisions (essential levers for the hard 76-seat Majority quest)
  C.decisions.push(
    {
      id: 'DEC_KAP_NATIONAL_FIELD', n: '150-seat grassroots blitz', party: 'KAP', cost: 25, cd: 3, max: 4,
      d: 'Flood outer suburbs and provincial towns with KAP volunteers and local candidates: big national & suburban lift.',
      e: { o: 2.4, r: { OUT: 1.8, PROV: 1.6 }, m: 1, sta: -6 }
    },
    {
      id: 'DEC_KAP_BRADFIELD', n: 'Nation-building media tour', party: 'KAP', cost: 30, cd: 4, max: 3,
      d: 'Tour the Bradfield Scheme, supermarket divestiture and Australian manufacturing pitch on national talkback.',
      e: { o: 2.8, r: { RUR: 2.0, OUT: 1.4 }, s: { QLD: 2.0, NSW: 1.2, VIC: 1.0 }, m: 2 }
    },
    {
      id: 'DEC_KAP_BUSH_BLITZ', n: 'Akubra convoy & preference drive', party: 'KAP', cost: 20, cd: 3, max: 3,
      d: 'Rally regional halls from Kennedy to Tasmania, stealing disaffected voters straight off the Coalition and One Nation.',
      e: { o: 1.8, n: { LNP: -1.2, ONP: -1.4 }, r: { RUR: 2.2 }, u: 4 }
    }
  );

  // ---- By-election seats for the 4 historic PM Vault Legends (Bob Katter is sitting MP for Kennedy!)
  C.byElect = C.byElect || {};
  Object.assign(C.byElect, {
    paul_keating: ['Blaxland', 'NSW', 'h'],
    john_howard: ['Bennelong', 'NSW', 'c'],
    gough_whitlam: ['Werriwa', 'NSW', 'h'],
    robert_menzies: ['Kooyong', 'VIC', 'c']
  });

  // ---- Attach Vault Leaders, Milestone LO answers, Comeback Spill cands, and Honours
  C.leaders.push(...VAULT_LEADERS);

  VAULT_LO.forEach(o => { o.lo = o.only + ':m' + o.mile; });
  if (!(window.CAMPAIGN_TUNE || {}).noLO) {
    C.cards.forEach(c => {
      VAULT_LO.forEach(o => {
        if (c.mile === o.mile) {
          const { mile, ...opt } = o;
          c.opts.push({ tag: 'GENERAL', ...opt });
        }
      });
    });
  }
  const seenLO = {};
  (C.LO || []).forEach(o => { if (o.lo) seenLO[o.lo] = o; });
  VAULT_LO.forEach(o => { if (o.lo && !seenLO[o.lo]) seenLO[o.lo] = o; });
  C.LO = Object.values(seenLO);

  // Register historic PMs into ALP / LIB comeback spill decks
  (C.spill || []).forEach(sp => {
    if (/^ALP_CB_SPILL_/.test(sp.id) && Array.isArray(sp.cands)) {
      ['paul_keating', 'gough_whitlam'].forEach(id => { if (!sp.cands.includes(id)) sp.cands.push(id); });
    }
    if (/^LIB_CB_SPILL_/.test(sp.id) && Array.isArray(sp.cands)) {
      ['john_howard', 'robert_menzies'].forEach(id => { if (!sp.cands.includes(id)) sp.cands.push(id); });
    }
  });

  // Push the 5 Vault Honours so campaign-achievements.js includes them automatically
  C.extraAch = C.extraAch || [];
  C.extraAch.push(...VAULT_ACH);

  // ---- Tier-list benchmark entries for the 5 Vault Legends (used in Comparator & Dossier)
  if (window.TIERLIST && Array.isArray(window.TIERLIST.leaders)) {
    const addTL = entry => {
      if (!window.TIERLIST.leaders.some(x => x.id === entry.id)) window.TIERLIST.leaders.push(entry);
    };
    addTL({
      id: 'paul_keating', name: 'Paul Keating', party: 'ALP', pn: 'Labor', cb: true, fresh: false, by: true, spill: true,
      ph: '', score: 2.04, grade: 'A', typ: 'Majority government', top: 'Landslide re-election',
      win: 62, fail: 12, seatsR: 78, seatsB: 103, rand: 1.55, best: 3, seatsBc: 103, seatsRc: 80,
      why: 'Vault Legend · Craft-only (500 Dust)\nSuccess means a majority, 76+ seats.\nMaster debater (skill 3) with volatile caucus unity.'
    });
    addTL({
      id: 'john_howard', name: 'John Howard', party: 'LNP', pn: 'Coalition', cb: true, fresh: false, by: true, spill: true,
      ph: '', score: 1.82, grade: 'B', typ: 'Minority Coalition', top: 'Blue-ribbon wave',
      win: 42, fail: 16, seatsR: 66, seatsB: 96, rand: 1.24, best: 3, seatsBc: 96, seatsRc: 70,
      why: 'Vault Legend · Craft-only (500 Dust)\nSuccess means a majority, 76+ seats.\nDisciplined outer-suburban powerhouse with inner-city headwinds.'
    });
    addTL({
      id: 'gough_whitlam', name: 'Gough Whitlam', party: 'ALP', pn: 'Labor', cb: true, fresh: false, by: true, spill: true,
      ph: '', score: 1.76, grade: 'B', typ: 'Majority government', top: 'Landslide re-election',
      win: 48, fail: 18, seatsR: 74, seatsB: 104, rand: 1.28, best: 3, seatsBc: 104, seatsRc: 77,
      why: 'Vault Legend · Craft-only (500 Dust)\nSuccess means a majority, 76+ seats.\nHigh-ceiling social reformer exposed to inflation and costings attacks.'
    });
    addTL({
      id: 'robert_menzies', name: 'Robert Menzies', party: 'LNP', pn: 'Coalition', cb: true, fresh: false, by: true, spill: true,
      ph: '', score: 1.72, grade: 'B', typ: 'Coalition recovery', top: 'Blue-ribbon wave',
      win: 38, fail: 18, seatsR: 64, seatsB: 94, rand: 1.18, best: 3, seatsBc: 94, seatsRc: 68,
      why: 'Vault Legend · Craft-only (500 Dust)\nSuccess means a majority, 76+ seats.\nUnrivalled caucus unity and teal-belt reach, tested by modern housing and energy battles.'
    });
    addTL({
      id: 'bob_katter', name: 'Bob Katter', party: 'KAP', pn: "Katter's Australian Party", cb: false, fresh: false, by: false, spill: false,
      ph: 'assets/img/members/bob-katter.jpg', score: 0.42, grade: 'F', typ: 'Regional force', top: 'Majority government',
      win: 4, fail: 0, seatsR: 6, seatsB: 82, rand: 0.35, best: 2.67, seatsBc: 82, seatsRc: 6,
      why: 'Vault Legend · Craft-only (500 Dust)\nExtreme challenge: form a 76-seat Majority Government starting from Kennedy alone.\nRequires disciplined use of KAP national field decisions, Bradfield momentum and debate wins.'
    });
  }
})();
