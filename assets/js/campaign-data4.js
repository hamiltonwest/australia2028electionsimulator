// Campaign mode content, round 6: every other leader from the sandbox becomes playable. Each gets campaign perks, a signature answer and a
// cursed one at a milestone, a card of their own, and an honour. New spill decks cover comebacks from outside parliament, Nationals leaders
// taking the Coalition leadership, and a Greens party-room challenge.
// All game content: options describe what the player chooses to do, and nothing is presented as a quote from a real person.
// Headlines are from XYZ News, a fictional outlet. Vote effects still come from each leader's sandbox traits (traits.js).
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const E = (x, h, e, st) => ({ x, h, e, ...(st ? { st } : {}) });
  const G = (x, h, k, min, ok, no, st) => ({ x, h, rng: { k, min, ok, no }, ...(st ? { st } : {}) });
  const NEW = [], LO = [], ACH = [];
  // one leader: perks, a signature and a cursed milestone answer, one card of their own, and an honour
  function LD(L, sig, cur, card, ach) {
    L.mates = L.mates || []; L.more = true; NEW.push(L);
    const [m1, x1, h1, e1, t1, s1] = sig, [m2, x2, h2, r2, t2, s2] = cur;
    LO.push({ mile: m1, only: L.id, x: x1, h: h1, e: e1, ...(t1 ? { tag: t1 } : {}), ...(s1 ? { st: s1 } : {}) });
    LO.push({ mile: m2, only: L.id, cursed: true, x: x2, h: h2, rng: { k: r2[0], min: r2[1], ok: r2[2], no: r2[3] }, ...(t2 ? { tag: t2 } : {}), ...(s2 ? { st: s2 } : {}) });
    const [t, q, tag, opts] = card;
    C.cards.push({ id: 'LDR_' + L.id.toUpperCase(), party: L.party, only: L.id, minTurn: 4, ...(tag ? { tag } : {}), t, q, opts });
    const [aid, title, d, chk, icon, why] = ach;
    ACH.push({ id: aid, title, cat: CAT[L.sb === 'Nationals' ? 'NAT' : L.party], leader: L.id, d, icon, why, check: (st, r) => st.leader === L.id && !!chk(st, r) });
  }
  const CAT = { ALP: 'Labor leaders', LNP: 'Coalition leaders', NAT: 'Nationals leaders', ONP: 'One Nation leaders', GRN: 'Greens leaders', IND: 'Teal leaders' };
  const S = (r, p) => (r && r.seats[p]) || 0, won = (st, r) => !!r && r.gov === st.party, maj = (st, r) => S(r, st.party) >= 76;
  const ST = (r, s, p) => (r && r.st[s] && r.st[s][p]) || 0, RG = (r, k, p) => (r && r.rg[k] && r.rg[k][p]) || 0;
  const lo = (st, id) => (st.lo || []).includes(id);

  // ================= Labor =================
  LD({ id: 'richard_marles', name: 'Richard Marles', party: 'ALP', inc: false, mates: ['Pat Conroy'], deb: 1, pp: 0, unityAdj: -4,
      plus: ['Defence minister', '+1 on security checks; security choices land 25% harder for you.'], debTag: { NATIONAL_SECURITY: 1 }, pos: { tag: { NATIONAL_SECURITY: 1.25 } },
      minus: ['The submarine bill', 'Economy and tax setbacks hit 25% harder; starts with 4 less unity.'], neg: { tag: { ECONOMY: 1.25, TAX: 1.25 } } },
    [4, 'Make the debate about the Pacific: a steady hand in a dangerous region.', 'Marles makes the debate about security', { o: 0.6, r: { OUT: 0.5 }, m: 1 }, 'NATIONAL_SECURITY'],
    [2, 'Defend the full submarine price tag at the costings launch, line by line.', 'Marles defends the submarine bill', ['d', 3, { o: 0.4, pp: 5 }, { o: -1, m: -2, u: -3 }], 'NATIONAL_SECURITY'],
    ['The acting prime minister', 'The press gallery jokes that you have been acting prime minister more than anyone. Your opponents say you are the understudy, never the star.', '', [
      G('Lean in: release a photo diary of a week running the country.', 'Marles leans in to the acting-PM jokes', 'm', 2, { o: 0.5, m: 2 }, { o: -0.4, m: -1 }),
      E('Hold a Geelong town hall on manufacturing jobs.', 'Marles takes the campaign to Geelong', { r: { PROV: 0.8, OUT: 0.3 } }),
      E('Ignore the jokes and keep briefing on defence.', 'Marles sticks to defence briefings', { o: 0.2, u: 2 })]],
    ['FULL_STEAM_AHEAD', 'Full Steam Ahead', 'As Richard Marles, defend the submarine bill at the costings and still win a Labor majority.', (st, r) => lo(st, 'richard_marles:m2') && maj(st, r), 'sub']);

  LD({ id: 'tony_burke', name: 'Tony Burke', party: 'ALP', inc: false, mates: ['Tanya Plibersek'], deb: 2, pp: 0, unityAdj: -6,
      plus: ['The counter-puncher', 'Debate skill 2, the best in the Labor ranks.'], minus: ['Canberra bubble', 'Scandal setbacks hit 30% harder; starts with 6 less unity.'], neg: { tag: { CRISIS: 1.3 } } },
    [3, 'Give the Press Club a Western Sydney speech: Lakemba, Punchbowl and the price of everything.', 'Burke takes the Press Club to Western Sydney', { r: { OUT: 1.2 }, m: 1 }],
    [4, 'Treat the debate like Question Time, standing orders and all.', 'Burke plays the debate like Question Time', ['d', 3, { m: 2, o: 0.3 }, { o: -0.9, m: -2 }]],
    ['Workplace laws', 'Business groups say the government’s workplace changes went too far. The unions want more.', 'IR', [
      E('Promise a pause: no new workplace laws next term.', 'Burke promises an industrial-relations pause', { r: { IN: 0.3, OUT: 0.3 }, u: -3 }),
      E('Promise same-job, same-pay protections for gig workers.', 'Burke extends same-job, same-pay', { r: { OUT: 0.9 }, u: 3 }),
      E('Promise a national jobs summit after the election.', 'Burke calls a jobs summit', { o: 0.3, pp: 5 })]],
    ['LEADER_OF_THE_HOUSE', 'Leader of the House', 'As Tony Burke, win at least two of the three debate exchanges and form government.', (st, r) => (st.debWins || 0) >= 2 && won(st, r), 'mic']);

  LD({ id: 'mark_butler', name: 'Mark Butler', party: 'ALP', inc: false, mates: ['Don Farrell'], deb: 1, pp: 0, unityAdj: -2,
      plus: ['Medicare defender', '+1 on health checks; health choices land 30% harder for you.'], debTag: { HEALTH: 1 }, pos: { tag: { HEALTH: 1.3 } },
      minus: ['Charisma deficit', 'Media blitzes cost 25% more Political Power.'], disc: { DEC_MEDIA_BLITZ: 1.25 } },
    [5, 'Close in a hospital car park in Adelaide: a Medicare card for every promise.', 'Butler closes on Medicare', { o: 0.6, s: { SA: 1 } }, 'HEALTH'],
    [3, 'Promise free GP visits for everyone, paid for by a higher Medicare levy.', 'Butler promises free GP visits, and a higher levy', ['d', 3, { o: 0.6, r: { OUT: 0.6 } }, { o: -1, m: -2 }], 'HEALTH', 'tax+'],
    ['The aged-care queue', 'Families are waiting months for home-care packages, and a damning report lands mid-campaign.', 'HEALTH', [
      E('Fund 100,000 new home-care packages this term.', 'Butler funds 100,000 home-care packages', { o: 0.5, r: { PROV: 0.4 } }),
      E('Promise an independent review of the waiting list.', 'Butler orders a review of the queue', { o: 0.1 }),
      G('Blame the providers and promise a crackdown.', 'Butler turns on aged-care providers', 'm', 1, { o: 0.4, m: 1 }, { o: -0.3 })]],
    ['BULK_BILLING_NATION', 'Bulk-Billing Nation', 'As Mark Butler, win a Labor majority with Medicare as a strength on polling day.', (st, r) => maj(st, r) && (st.spirits || []).some(s => /MEDICARE_(FORTRESS|JULY)/.test(s)), 'cross']);

  LD({ id: 'jason_clare', name: 'Jason Clare', party: 'ALP', inc: false, mates: ['Catherine King'], deb: 2, pp: 3, unityAdj: -6,
      plus: ['Born campaigner', 'Debate skill 2 and +3 Political Power a turn.'], minus: ['The continuity candidate', 'Starts with 6 less caucus unity.'] },
    [1, 'Launch at your old public school in Western Sydney: education as the way up.', 'Clare launches at his old school', { r: { OUT: 1 }, m: 1, u: 2 }],
    [5, 'Spend the last day on a positive-only bus tour, without one word about the opposition.', 'Clare’s positive-only final day', ['m', 2, { m: 2, o: 0.4 }, { o: -0.6, m: -2 }]],
    ['Free TAFE for life', 'The unions want free TAFE made permanent; the universities want their share.', 'ECONOMY', [
      E('Make TAFE free for every course, permanently.', 'Clare makes TAFE free for good', { r: { OUT: 0.7, PROV: 0.5 } }),
      E('Cap university fees for teaching and nursing degrees.', 'Clare caps fees for teachers and nurses', { r: { IN: 0.6 } }),
      G('Wipe a fifth of every student debt.', 'Clare wipes a fifth of student debt', 'd', 2, { o: 0.6, r: { IN: 0.5 } }, { o: -0.5 }, 'spending+')]],
    ['EDUCATION_PM', 'The Education Prime Minister', 'As Jason Clare, win the spill and 85 or more seats.', (st, r) => S(r, 'ALP') >= 85, 'book']);

  LD({ id: 'clare_oneil', name: "Clare O'Neil", party: 'ALP', inc: false, mates: ['Julian Hill'], deb: 1, pp: 2, unityAdj: -2,
      plus: ['Renters’ champion', 'Housing choices land 30% harder for you; +2 Political Power a turn.'], pos: { tag: { HOUSING: 1.3 } },
      minus: ['Housing lightning rod', 'Housing setbacks hit 40% harder.'], neg: { tag: { HOUSING: 1.4 } } },
    [3, 'Unveil a 1.2 million homes plan with a public builder at its heart.', 'O’Neil unveils a public builder', { r: { OUT: 0.9, IN: 0.6 }, m: 1 }, 'HOUSING', 'supply+'],
    [2, 'Put a wind-back of negative gearing on existing homes in the costings.', 'O’Neil takes on negative gearing', ['d', 3, { r: { IN: 1, OUT: 0.4 } }, { o: -1.1, r: { OUT: -1 }, m: -2 }], 'TAX', 'tax+'],
    ['Build-to-rent towers', 'A developer wants approval for 5,000 rental homes. The local councils are fighting it.', 'HOUSING', [
      E('Override the councils with federal powers.', 'O’Neil overrides the councils', { r: { OUT: 0.6, IN: -0.3 } }, 'supply+'),
      E('Pay councils that hit their housing targets.', 'O’Neil pays councils to build', { r: { OUT: 0.4 } }),
      E('Side with the councils.', 'O’Neil sides with the councils', { r: { IN: 0.4, OUT: -0.4 } }, 'supply-')]],
    ['KEYS_TO_THE_KINGDOM', 'Keys to the Kingdom', 'As Clare O’Neil, clear the housing crisis from the national mood and win a Labor majority.', (st, r) => maj(st, r) && !(st.spirits || []).some(s => /HOUSING_(SHORTFALL|REVOLT)/.test(s)), 'key']);

  LD({ id: 'anika_wells', name: 'Anika Wells', party: 'ALP', inc: false, mates: ['Murray Watt'], deb: 0, pp: 2, unityAdj: -4,
      plus: ['Youth whisperer', 'Greens preferences 2 points stronger to Labor; +2 Political Power a turn.'], pf: { grn: 2 },
      minus: ['Untested', 'Debate skill 0; scandal setbacks hit 25% harder.'], neg: { tag: { CRISIS: 1.25 } } },
    [1, 'Launch at a Brisbane TAFE with first-home buyers and young renters.', 'Wells launches with young Queenslanders', { r: { OUT: 0.9 }, n: { GRN: -0.4 }, m: 2 }],
    [4, 'Run your half of the debate like a live stream, with viewers’ comments on screen.', 'Wells live-streams the debate', ['m', 3, { o: 0.6, m: 3, n: { GRN: -0.5 } }, { o: -0.9, m: -3 }]],
    ['The social media ban', 'Parents love the under-16 social media ban. Young voters and the tech companies do not.', '', [
      E('Extend the ban to chat in online games.', 'Wells extends the ban to gaming', { r: { OUT: 0.5, IN: -0.4 } }),
      E('Keep the ban as it is and fund enforcement.', 'Wells funds the social media ban', { o: 0.2 }),
      E('Pause it for a review.', 'Wells pauses the ban', { r: { IN: 0.4 }, n: { GRN: -0.3 }, u: -2 })]],
    ['SUNSHINE_COAST_TO_LODGE', 'Lilley to the Lodge', 'As Anika Wells, win a Labor majority with 15 or more Queensland seats.', (st, r) => maj(st, r) && ST(r, 'QLD', 'ALP') >= 15, 'sun']);

  LD({ id: 'madeleine_king', name: 'Madeleine King', party: 'ALP', inc: false, mates: ['Patrick Gorman'], deb: 1, pp: 3, unityAdj: -4,
      plus: ['Mates with the miners', 'Energy setbacks hit 25% softer; +3 Political Power a turn.'], minus: ['Eastern-seaboard blind spot', 'Setbacks in NSW and Victoria hit 25% harder.'],
      neg: { tag: { ENERGY: 0.75 }, st: { NSW: 1.25, VIC: 1.25 } } },
    [1, 'Launch in the Pilbara with a critical-minerals jobs plan.', 'King launches in the Pilbara', { s: { WA: 1.4 }, r: { PROV: 0.6, RUR: 0.4 } }, 'ENERGY'],
    [3, 'Tell the Press Club that gas will be needed until 2050 and beyond.', 'King backs gas to 2050', ['d', 3, { r: { PROV: 0.8, RUR: 0.8 } }, { r: { IN: -1.4 }, n: { GRN: 0.8 }, m: -2 }], 'ENERGY', 'fossil+'],
    ['The gas reservation fight', 'East-coast manufacturers want gas kept for local use. The exporters threaten to walk away.', 'ENERGY', [
      E('Reserve a quarter of all new gas for Australian users.', 'King reserves gas for local users', { r: { OUT: 0.6, PROV: 0.4 } }),
      E('Strike a voluntary deal with the exporters.', 'King does a deal with gas exporters', { s: { WA: 0.6 }, pp: 5 }),
      E('Leave it to the market.', 'King leaves gas to the market', { r: { OUT: -0.4 }, s: { WA: 0.4 } })]],
    ['GO_WEST', 'Go West', 'As Madeleine King, win 12 of Western Australia’s 16 seats and form government.', (st, r) => ST(r, 'WA', 'ALP') >= 12 && won(st, r), 'pin']);

  LD({ id: 'ed_husic', name: 'Ed Husic', party: 'ALP', inc: false, mates: ['Julie Collins'], deb: 1, pp: 2, unityAdj: -4, unityDrift: -1,
      plus: ['Straight talker', '+1 on economy checks; +2 Political Power a turn.'], debTag: { ECONOMY: 1 },
      minus: ['Off message', 'Starts with 4 less unity, and unity drifts down 1 a turn.'] },
    [2, 'Release the costings with a sovereign tech fund: chips, quantum and AI made here.', 'Husic’s tech fund adds up', { o: 0.6, r: { OUT: 0.5 }, pp: 5 }],
    [3, 'Use the Press Club to criticise your own government’s foreign policy.', 'Husic breaks ranks at the Press Club', ['d', 3, { r: { OUT: 1.2 }, m: 2 }, { u: -10, o: -0.6, m: -2 }]],
    ['The Western Sydney revolt', 'Community independents are running in Labor heartland seats across Western Sydney.', '', [
      E('Campaign street by street with local community leaders.', 'Husic works the streets of Western Sydney', { r: { OUT: 1 } }),
      E('Promise a Western Sydney jobs fund.', 'Husic promises a jobs fund for the west', { r: { OUT: 0.6 }, pp: -5 }),
      E('Leave it to the local members.', 'Labor leaves the west to its MPs', { r: { OUT: -0.4 } })]],
    ['BACK_FROM_THE_BACKBENCH', 'Back from the Backbench', 'As Ed Husic, dropped from the ministry in 2025, take the leadership and form government.', (st, r) => won(st, r), 'chair']);

  LD({ id: 'stephen_conroy', name: 'Stephen Conroy', party: 'ALP', inc: false, cb: true, votes0: 25, mates: ['Penny Wong'], deb: 1, pp: 2, unityAdj: 4, unityDrift: 0.5,
      plus: ['Iron discipline', 'Campaign fatigue wears unity down at half the usual rate; +4 unity on taking the job.'], minus: ['Yesterday’s news', 'Starts the spill on 25%: the caucus has moved on.'] },
    [2, 'Promise fibre to every premises in the costings, fully paid for.', 'Conroy’s fibre plan adds up', { o: 0.6, r: { OUT: 0.5, PROV: 0.5 }, pp: 5 }],
    [4, 'Bring back a national internet filter in the debate, as a child-safety measure.', 'Conroy revives the internet filter', ['d', 3, { o: 0.3 }, { o: -0.9, r: { IN: -0.8 }, m: -2 }]],
    ['The factional numbers', 'The Right wants its people on the frontbench before it campaigns hard for you.', '', [
      E('Give them the frontbench seats.', 'Conroy pays the Right', { u: 8, pp: -5 }),
      E('Make them earn it on the doors.', 'Conroy makes the factions earn it', { u: -3, r: { OUT: 0.4 } }),
      G('Do the deal in private and deny it in public.', 'A quiet factional deal', 'm', 1, { u: 6 }, { u: -6, m: -1 })]],
    ['THE_NUMBERS_MAN', 'The Numbers Man', 'As Stephen Conroy, come back from outside parliament, win the spill on 60% or more, and form government.', (st, r) => st.votes >= 60 && won(st, r), 'abacus']);

  LD({ id: 'kristina_keneally', name: 'Kristina Keneally', party: 'ALP', inc: false, cb: true, votes0: 40, mates: ['Carmel Tebbutt'], deb: 2, pp: 0, unityAdj: -4,
      plus: ['Born campaigner', 'Debate skill 2.'], minus: ['Parachute candidate', 'Setbacks in NSW hit 25% harder; starts the spill on 40%.'], neg: { st: { NSW: 1.25 } } },
    [1, 'Launch in Barton after a month of knocking on every door in the seat.', 'Keneally’s door-knock launch', { r: { OUT: 0.8 }, s: { NSW: 0.6 }, m: 1 }],
    [3, 'Use the Press Club to argue for lower migration, against your party’s line.', 'Keneally breaks with Labor on migration', ['d', 3, { r: { OUT: 1 }, n: { ONP: -0.6 } }, { u: -8, r: { IN: -1 }, m: -2 }], 'MIGRATION', 'migration-'],
    ['The NSW Labor ghosts', 'Your opponents are dredging up old scandals from your time in state politics.', 'CRISIS', [
      G('Front it: a long press conference on what you changed.', 'Keneally fronts the past', 'd', 2, { m: 2, o: 0.3 }, { o: -0.5, m: -1 }),
      E('Promise more powers for the national anti-corruption commission.', 'Keneally promises a stronger anti-corruption body', { r: { IN: 0.6 }, m: 1 }),
      E('Refuse to engage.', 'Keneally refuses to talk about the past', { o: -0.2 })]],
    ['THE_SECOND_ACT', 'The Second Act', 'As Kristina Keneally, win a Labor majority with 25 or more New South Wales seats.', (st, r) => maj(st, r) && ST(r, 'NSW', 'ALP') >= 25, 'curtain']);

  LD({ id: 'daniel_andrews', name: 'Daniel Andrews', party: 'ALP', inc: false, cb: true, votes0: 44, mates: ['Jacinta Allan'], deb: 1, pp: 4, unityAdj: -4,
      plus: ['Spring Street machine', '+4 Political Power a turn; starts the spill on 44%.'], minus: ['Lockdown legacy', 'Setbacks in Victoria and scandal setbacks hit 30% harder.'], neg: { st: { VIC: 1.3 }, tag: { CRISIS: 1.3 } } },
    [1, 'Launch with a level-crossing removal program for every capital city.', 'Andrews takes the Big Build national', { r: { OUT: 1.1 }, s: { VIC: 0.8 }, m: 1 }],
    [5, 'Hold a long press conference every day of the final week.', 'Andrews holds daily press conferences again', ['m', 3, { m: 3, o: 0.5 }, { o: -1, m: -3 }]],
    ['The Big Build goes national', 'You want a national infrastructure pipeline: rail loops, hospitals and level crossings.', 'ECONOMY', [
      E('Commit $50 billion to a national Big Build.', 'Andrews commits $50 billion to building', { r: { OUT: 0.9 }, s: { VIC: 0.5 } }, 'spending+'),
      E('Pick three flagship projects only.', 'Andrews picks three flagship projects', { o: 0.3 }),
      E('Set up a national infrastructure authority to choose.', 'Andrews hands projects to an authority', { o: 0.2, pp: 5 })]],
    ['GET_ON_WITH_IT', 'Get On With It', 'As Daniel Andrews, win 28 of Victoria’s 38 seats.', (st, r) => ST(r, 'VIC', 'ALP') >= 28, 'crane']);

  LD({ id: 'bill_shorten', name: 'Bill Shorten', party: 'ALP', inc: false, cb: true, votes0: 42, mates: ['Tanya Plibersek'], deb: 2, pp: 0, unityAdj: -2,
      plus: ['Blue-collar hero', 'Debate skill 2; +1 on workplace checks.'], debTag: { IR: 1 }, minus: ['The ghost of 2019', 'Tax-scare setbacks hit twice as hard.'], neg: { tag: { TAX: 2 } } },
    [3, 'Make the Press Club about the NDIS: the scheme you started, fixed.', 'Shorten’s Press Club is all about the NDIS', { o: 0.7, r: { OUT: 0.5 } }, 'HEALTH'],
    [2, 'Bring back changes to franking credits in the costings.', 'Shorten revives the franking-credits fight', ['d', 4, { o: 0.4, pp: 8 }, { o: -1.4, r: { PROV: -0.8, OUT: -0.6 }, m: -3 }], 'TAX', 'tax+'],
    ['The one-liner', 'Your team has written a one-liner for tonight’s interview. It is either brilliant or terrible.', '', [
      G('Use it.', 'Shorten’s one-liner lands, or does it?', 'm', 2, { m: 3, o: 0.3 }, { m: -2, o: -0.3 }),
      E('Save it for the debate.', 'Shorten keeps his powder dry', { pp: 5 }),
      E('Bin it and talk policy.', 'Shorten sticks to policy', { o: 0.2, u: 2 })]],
    ['SAME_POLICY_DIFFERENT_RESULT', 'Same Policy, Different Result', 'As Bill Shorten, take franking credits to the election again and win a Labor majority this time.', (st, r) => lo(st, 'bill_shorten:m2') && maj(st, r), 'redo']);

  LD({ id: 'stephen_smith', name: 'Stephen Smith', party: 'ALP', inc: false, cb: true, votes0: 25, mates: ['Anne Aly'], deb: 1, pp: 2, unityAdj: 6,
      plus: ['Elder statesman', 'Scandal setbacks hit 30% softer; +1 on security checks; +6 unity on taking the job.'], debTag: { NATIONAL_SECURITY: 1 }, neg: { tag: { CRISIS: 0.7 } },
      minus: ['Long gone', 'Starts the spill on 25%: the caucus barely knows him.'] },
    [4, 'Run the debate like a diplomat: calm, detailed, no attacks.', 'Smith brings diplomacy to the debate', { o: 0.5, u: 3 }, 'NATIONAL_SECURITY'],
    [1, 'Launch with a long speech on Britain and AUKUS from your years abroad.', 'Smith launches on foreign policy', ['d', 3, { o: 0.3 }, { o: -0.8, m: -2 }], 'NATIONAL_SECURITY'],
    ['The AUKUS review', 'Washington is reviewing the submarine deal, and the price keeps rising.', 'NATIONAL_SECURITY', [
      E('Commit to the full submarine plan.', 'Smith commits to AUKUS', { r: { OUT: 0.4 }, n: { GRN: 0.3 } }),
      E('Order an independent review.', 'Smith orders a submarine review', { r: { IN: 0.5 } }),
      G('Fly to Washington and seek a better price.', 'Smith goes to Washington', 'd', 2, { o: 0.5 }, { o: -0.4 })]],
    ['THE_STEADY_HAND', 'The Steady Hand', 'As Stephen Smith, form government without caucus unity ever falling below 50.', (st, r) => won(st, r) && st.minUnity >= 50, 'hand']);

  LD({ id: 'kevin_rudd', name: 'Kevin Rudd', party: 'ALP', inc: false, cb: true, votes0: 52, mates: ['Julia Gillard'], deb: 1, pp: 2, unityAdj: -4, unityDrift: -1,
      plus: ['The comeback kid', 'Starts the spill on 52%; +1 on security checks.'], debTag: { NATIONAL_SECURITY: 1 },
      minus: ['Micromanager', 'Starts with 4 less unity, and unity drifts down 1 a turn.'] },
    [1, 'Launch in Brisbane with a Queensland jobs plan and a message to the region in Mandarin.', 'Rudd launches in Brisbane', { s: { QLD: 1.2 }, m: 2 }],
    [3, 'Deliver a 70-minute Press Club address with 40 slides.', 'Rudd’s 70-minute Press Club', ['d', 3, { o: 0.5, r: { IN: 0.6 } }, { o: -1, m: -3 }]],
    ['The ghosts of 2010', 'The party remembers the last spills. Some MPs refuse to campaign with you.', '', [
      E('Call every one of them and make peace.', 'Rudd makes peace with caucus', { u: 8, pp: -5 }),
      E('Campaign without them.', 'Rudd goes it alone', { u: -4, m: 1 }),
      G('Go straight to the voters with a national town-hall tour.', 'Rudd goes over the party’s head', 'm', 2, { o: 0.6, m: 2 }, { o: -0.3, u: -3 })]],
    ['RUDD_28', 'Kevin ’28', 'As Kevin Rudd, win a Labor majority with 18 or more Queensland seats.', (st, r) => maj(st, r) && ST(r, 'QLD', 'ALP') >= 18, 'redo']);

  LD({ id: 'annastacia_palaszczuk', name: 'Annastacia Palaszczuk', party: 'ALP', inc: false, cb: true, votes0: 42, mates: ['Steven Miles'], deb: 0, pp: 2, unityAdj: 0,
      plus: ['Queensland’s own', 'Setbacks in Queensland hit 30% softer; +2 Political Power a turn.'], neg: { st: { QLD: 0.7 } }, minus: ['Federal novice', 'Debate skill 0.'] },
    [1, 'Launch in Ipswich with an Olympic jobs pledge for south-east Queensland.', 'Palaszczuk launches in Ipswich', { s: { QLD: 1.3 }, m: 1 }],
    [4, 'Promise in the debate to move a federal department to Brisbane.', 'Palaszczuk promises to move a department north', ['d', 3, { s: { QLD: 1 }, m: 1 }, { o: -0.7, s: { NSW: -0.8, VIC: -0.8 } }]],
    ['The 2032 Games', 'Brisbane’s Olympic venues are over budget, and the state wants Canberra to pay.', 'ECONOMY', [
      E('Fund a new Brisbane stadium.', 'Palaszczuk funds a new stadium', { s: { QLD: 0.8 }, r: { OUT: -0.2 } }),
      E('Fund transport for the Games instead.', 'Palaszczuk funds Games transport', { s: { QLD: 0.5 }, r: { OUT: 0.3 } }),
      E('Say the states should pay for their own venues.', 'Palaszczuk tells the states to pay', { s: { QLD: -0.5 }, o: 0.2 })]],
    ['QUEENSLAND_RISING', 'Queensland Rising', 'As Annastacia Palaszczuk, win 20 of Queensland’s 30 seats.', (st, r) => ST(r, 'QLD', 'ALP') >= 20, 'sun']);

  LD({ id: 'mark_mcgowan', name: 'Mark McGowan', party: 'ALP', inc: false, cb: true, votes0: 44, mates: ['Roger Cook'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Pride of the West', 'Setbacks in WA hit half as hard; +3 Political Power a turn.'], minus: ['Unknown over east', 'Setbacks in NSW, Victoria and Queensland hit 20% harder.'],
      neg: { st: { WA: 0.5, NSW: 1.2, VIC: 1.2, QLD: 1.2 } } },
    [1, 'Launch in Perth with a guarantee on the West’s share of the GST.', 'McGowan launches with a GST guarantee', { s: { WA: 1.6, NSW: -0.2 } }, 'TAX'],
    [3, 'Tell the Press Club you would close the state borders again in a pandemic.', 'McGowan would shut the borders again', ['d', 3, { s: { WA: 1 } }, { o: -1, s: { VIC: -0.8, NSW: -0.6 }, m: -2 }]],
    ['The GST deal', 'The eastern states want Western Australia’s GST deal scrapped.', 'TAX', [
      E('Guarantee the WA deal for good.', 'McGowan locks in the GST deal', { s: { WA: 1, NSW: -0.4, VIC: -0.4 } }),
      E('Top up the other states so nobody loses.', 'McGowan tops up the states', { o: 0.3, pp: -5 }, 'spending+'),
      E('Review it after the election.', 'McGowan puts the GST deal under review', { s: { WA: -0.8 }, o: 0.2 })]],
    ['THE_WESTERN_FORTRESS', 'The Western Fortress', 'As Mark McGowan, win 14 of Western Australia’s 16 seats.', (st, r) => ST(r, 'WA', 'ALP') >= 14, 'pin']);

  // ================= Coalition: Liberals =================
  LD({ id: 'sussan_ley', name: 'Sussan Ley', party: 'LNP', inc: false, mates: ["Ted O'Brien", 'Matt Canavan'], deb: 1, pp: 2, unityAdj: -10,
      plus: ['Teal whisperer', 'Teal-seat preferences 3 points stronger; +2 Political Power a turn.'], pf: { ind: 3 }, minus: ['The revolving door', 'Starts with 10 less caucus unity.'] },
    [1, 'Fly yourself to the launch in a light plane and make it about the regions.', 'Ley flies in for the launch', { r: { RUR: 1, PROV: 0.6 }, m: 2 }],
    [3, 'Promise the Press Club the Liberals will go back to Net Zero.', 'Ley takes the Liberals back to Net Zero', ['d', 3, { r: { IN: 1.4 }, pf: { ind: 2 } }, { u: -10, r: { RUR: -1 }, m: -2 }], 'ENERGY', 'fossil-'],
    ['Women in the party room', 'Only a handful of Liberal MPs are women, and preselections are under fire.', '', [
      E('Set a target of half women by 2030.', 'Ley sets a target for women MPs', { r: { IN: 0.8 }, u: -4 }),
      E('Fund a mentoring program for candidates.', 'Ley funds a mentoring program', { r: { IN: 0.3 } }),
      E('Say merit decides, and leave it there.', 'Ley says merit decides', { r: { IN: -0.5 }, u: 3 })]],
    ['SECOND_TIME_LUCKY', 'Second Time Lucky', 'As Sussan Ley, win back the leadership in a spill and take the Coalition to 70 or more seats.', (st, r) => S(r, 'LNP') >= 70, 'plane']);

  LD({ id: 'ted_obrien', name: "Ted O'Brien", party: 'LNP', inc: false, mates: ['Sussan Ley', 'Matt Canavan'], deb: 1, pp: 0, unityAdj: -4,
      plus: ['The cheap-power promise', '+1 on energy checks; energy choices land 30% harder for you.'], debTag: { ENERGY: 1 }, pos: { tag: { ENERGY: 1.3 } },
      minus: ['Nuclear liability', 'Energy setbacks in inner-metro seats hit 40% harder.'], neg: { tagR: { ENERGY: { IN: 1.4 } } } },
    [3, 'Give the Press Club a costed plan for small modular reactors, site by site.', 'O’Brien costs his reactors', { r: { OUT: 0.6, PROV: 0.6 }, m: 1 }, 'ENERGY'],
    [5, 'End the campaign at the gates of a proposed nuclear site.', 'O’Brien ends at a nuclear site', ['m', 3, { r: { PROV: 1, RUR: 0.8 }, m: 2 }, { r: { IN: -1.4, OUT: -0.6 }, m: -3 }], 'ENERGY'],
    ['Where would the reactors go?', 'Every interview asks the same thing: which towns get a reactor?', 'ENERGY', [
      E('Name all seven sites again.', 'O’Brien names the sites', { r: { RUR: -0.5, OUT: 0.5 } }),
      E('Promise every town a local veto.', 'O’Brien gives towns a veto', { r: { RUR: 0.6 }, u: -3 }),
      E('Pivot to gas for the next decade.', 'O’Brien pivots to gas', { r: { OUT: 0.4, IN: -0.3 } }, 'fossil+')]],
    ['SPLITTING_THE_ATOM', 'Splitting the Atom', 'As Ted O’Brien, end the campaign at a nuclear site and win a Coalition majority.', (st, r) => lo(st, 'ted_obrien:m5') && maj(st, r), 'atom']);

  LD({ id: 'julian_leeser', name: 'Julian Leeser', party: 'LNP', inc: false, mates: ['Tim Wilson', 'Matt Canavan'], deb: 0, pp: 0, unityAdj: 5,
      plus: ['A principled stand', 'Teal-seat preferences 4 points stronger; +5 unity on taking the job.'], pf: { ind: 4 },
      minus: ['Soft on the fight', 'Debate skill 0; One Nation preferences 3 points weaker.'], pfMinus: { on: -3 } },
    [3, 'Use the Press Club to set out a plan for constitutional recognition the country could agree on.', 'Leeser’s recognition plan', { r: { IN: 1 }, pf: { ind: 2 } }],
    [4, 'Spend your debate time praising your opponent’s best idea.', 'Leeser praises his opponent', ['d', 3, { o: 0.5, r: { IN: 0.8 } }, { o: -0.8, m: -2, u: -3 }]],
    ['Religious freedom', 'Faith schools want protection in law; equality groups want the opposite.', '', [
      E('Legislate protections for faith schools.', 'Leeser protects faith schools', { r: { OUT: 0.5, IN: -0.4 } }),
      E('Seek a cross-party compromise.', 'Leeser seeks a compromise', { r: { IN: 0.4 } }),
      E('Leave it alone.', 'Leeser leaves it alone', { u: -2 })]],
    ['A_MAN_OF_PRINCIPLE', 'A Man of Principle', 'As Julian Leeser, win back four or more of the inner-city teal seats.', (st, r) => !!r && r.tealLNP >= 4, 'scale']);

  LD({ id: 'james_paterson', name: 'James Paterson', party: 'LNP', inc: false, votes0: 38, mates: ['Andrew Hastie', 'Matt Canavan'], deb: 1, pp: 0, unityAdj: 0,
      plus: ['Security hawk', '+1 on security and economy checks.'], debTag: { NATIONAL_SECURITY: 1, ECONOMY: 1 }, minus: ['Leading from the Senate', 'No House seat: starts the spill on 38%.'] },
    [4, 'Make the debate about foreign interference and cyber security.', 'Paterson makes the debate about security', { o: 0.6, r: { OUT: 0.4 }, m: 1 }, 'NATIONAL_SECURITY'],
    [1, 'Launch from the Senate courtyard, with no House seat to run in.', 'Paterson launches from the Senate', ['m', 2, { m: 2 }, { o: -0.7, m: -2 }]],
    ['Foreign donations', 'A foreign-donations story is running, and you have spent years on it.', 'NATIONAL_SECURITY', [
      E('Ban every foreign donation, including through third parties.', 'Paterson bans foreign donations', { o: 0.3, r: { OUT: 0.3 } }),
      E('Launch an inquiry into foreign-owned apps.', 'Paterson takes on foreign-owned apps', { r: { OUT: 0.3, IN: -0.2 }, m: 1 }),
      E('Park it and talk about the cost of living.', 'Paterson pivots to prices', { r: { OUT: 0.4 } })]],
    ['FROM_THE_RED_CHAMBER', 'From the Red Chamber', 'As James Paterson, become prime minister from the Senate. John Gorton is the only senator to have done it, and he moved to the House.', (st, r) => won(st, r), 'chair']);

  LD({ id: 'dan_tehan', name: 'Dan Tehan', party: 'LNP', inc: false, mates: ['Sarah Henderson', 'Matt Canavan'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Safe pair of hands', 'Scandal setbacks hit 30% softer; +3 Political Power a turn.'], neg: { tag: { CRISIS: 0.7 } },
      minus: ['Grey suit', 'Media blitzes and attack ads cost 30% more.'], disc: { DEC_MEDIA_BLITZ: 1.3, DEC_ATTACK_SATURATION: 1.3 } },
    [2, 'Release the costings with a promise of no new spending at all.', 'Tehan promises no new spending', { o: 0.6, pp: 6, f: ['PASSED_PBO_CLEAN'] }, '', 'spending-'],
    [5, 'Spend the final day on a slow train through western Victoria, with no announcements.', 'Tehan’s slow train', ['m', 2, { r: { RUR: 0.8 }, u: 3 }, { o: -0.7, m: -2 }]],
    ['Trade with China', 'Exporters want stable trade with China. The security hawks want distance.', 'ECONOMY', [
      E('Promise a trade mission to Beijing.', 'Tehan plans a Beijing trade mission', { r: { RUR: 0.6 } }),
      E('Diversify to India and the Gulf.', 'Tehan looks to India', { o: 0.3 }),
      E('Get tougher on Chinese investment.', 'Tehan gets tough on investment', { r: { OUT: 0.4, RUR: -0.3 } })]],
    ['STEADY_AS_SHE_GOES', 'Steady as She Goes', 'As Dan Tehan, form government with clean costings and no backflips.', (st, r) => won(st, r) && st.flags.includes('PASSED_PBO_CLEAN') && !st.backflips, 'hand']);

  LD({ id: 'scott_morrison', name: 'Scott Morrison', party: 'LNP', inc: false, cb: true, votes0: 22, mates: ['Josh Frydenberg', 'Matt Canavan'], deb: 1, pp: 1, unityAdj: -16,
      plus: ['The 2019 upset', '+1 on economy checks.'], debTag: { ECONOMY: 1 },
      minus: ['Trust deficit', 'Starts the spill on 22%; 16 less unity; scandal setbacks hit 60% harder; teal-seat preferences 4 points weaker.'], neg: { tag: { CRISIS: 1.6 } }, pfMinus: { ind: -4 } },
    [5, 'Spend the last day in hi-vis on a Sydney building site, then at a suburban barbecue.', 'Morrison’s hi-vis final day', { r: { OUT: 1.2 }, m: 2 }],
    [3, 'Tell the Press Club you would take on extra ministries yourself to get things done.', 'Morrison would run extra ministries', ['d', 4, { o: 0.3 }, { o: -1.3, r: { IN: -1.2 }, m: -3, u: -5 }]],
    ['The weekend away', 'A bushfire breaks out while you are on a long-planned family weekend away.', 'CRISIS', [
      E('Fly back at once and go to the fire ground.', 'Morrison flies back to the fires', { o: 0.4, m: 1 }),
      G('Send your deputy and stay.', 'Morrison stays away', 'm', 3, { o: 0 }, { o: -1.2, m: -3 }),
      E('Cut it short but stay away from the cameras.', 'Morrison cuts his weekend short', { o: 0.1 })]],
    ['THE_QUIET_SUBURBS', 'The Quiet Suburbs', 'As Scott Morrison, win a Coalition majority with 25 or more outer-suburban seats.', (st, r) => maj(st, r) && RG(r, 'Outer Metro', 'LNP') >= 25, 'house']);

  LD({ id: 'tony_abbott', name: 'Tony Abbott', party: 'LNP', inc: false, cb: true, votes0: 42, mates: ['Julie Bishop', 'Matt Canavan'], deb: 2, pp: 0, unityAdj: -4,
      plus: ['Born campaigner', 'Debate skill 2; One Nation preferences 4 points stronger.'], pf: { on: 4 },
      minus: ['Polarising figure', 'Inner-metro setbacks hit 50% harder; teal-seat preferences 4 points weaker.'], neg: { r: { IN: 1.5 } }, pfMinus: { ind: -4 } },
    [1, 'Launch with a three-word slogan on every banner and every ad.', 'Abbott’s three-word launch', { o: 0.6, r: { OUT: 0.8 }, m: 2 }],
    [4, 'Bring back knighthoods in the debate.', 'Abbott revives knighthoods', ['d', 4, { u: 5 }, { o: -1.3, m: -3, r: { IN: -1 } }]],
    ['Warringah again', 'You are running to win back your old seat from Zali Steggall.', '', [
      G('Throw everything at Warringah.', 'Abbott goes all in on Warringah', 'm', 2, { s: { NSW: 0.5 }, r: { IN: 0.6 } }, { r: { IN: -0.6 } }),
      E('Run on a national message.', 'Abbott runs a national campaign', { r: { OUT: 0.6 } }),
      E('Bring your volunteer fire brigade to campaign with you.', 'Abbott campaigns with the firies', { r: { IN: 0.3, OUT: 0.3 }, u: 2 })]],
    ['TURN_BACK_THE_TEALS', 'Turn Back the Teals', 'As Tony Abbott, win back three or more of the inner-city teal seats and form government.', (st, r) => !!r && r.tealLNP >= 3 && won(st, r), 'wave']);

  LD({ id: 'dominic_perrottet', name: 'Dominic Perrottet', party: 'LNP', inc: false, cb: true, votes0: 38, mates: ['Matt Kean', 'Matt Canavan'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Economic credibility', '+1 on economy and tax checks; +3 Political Power a turn.'], debTag: { ECONOMY: 1, TAX: 1 }, minus: ['Federal novice', 'Starts the spill on 38%.'] },
    [2, 'Release a plan to swap stamp duty for land tax, with federal money to help the states switch.', 'Perrottet’s stamp-duty swap', { r: { OUT: 0.8, IN: 0.6 }, pp: 5 }, 'TAX'],
    [3, 'Promise the Press Club you will sell a major federal asset to pay for tax cuts.', 'Perrottet would sell assets for tax cuts', ['d', 3, { o: 0.4, r: { IN: 0.6 } }, { o: -1, r: { OUT: -0.8 }, m: -2 }], 'TAX'],
    ['The Bradfield fight', 'You are contesting Bradfield against the teal who won it in 2025.', '', [
      E('Match the teals with a 2035 emissions target.', 'Perrottet matches the teals on climate', { r: { IN: 0.9 }, u: -4 }, 'fossil-'),
      E('Campaign on housing for young families.', 'Perrottet campaigns on housing', { r: { IN: 0.5, OUT: 0.4 } }),
      G('Go after the teal’s donors.', 'Perrottet targets teal donors', 'm', 2, { r: { IN: 0.6 } }, { r: { IN: -0.6 } })]],
    ['MACQUARIE_TO_CANBERRA', 'Macquarie Street to Canberra', 'As Dominic Perrottet, win 22 or more New South Wales seats and form government.', (st, r) => ST(r, 'NSW', 'LNP') >= 22 && won(st, r), 'pin']);

  LD({ id: 'julie_bishop', name: 'Julie Bishop', party: 'LNP', inc: false, cb: true, votes0: 42, mates: ['Ben Morton', 'Matt Canavan'], deb: 1, pp: 0, unityAdj: -10,
      plus: ['Teal whisperer', 'Teal-seat preferences 5 points stronger; +1 on security checks.'], pf: { ind: 5 }, debTag: { NATIONAL_SECURITY: 1 },
      minus: ['Party-room grudges', 'Starts with 10 less unity; One Nation preferences 3 points weaker.'], pfMinus: { on: -3 } },
    [4, 'Meet every interruption in the debate with a long, cold silence.', 'Bishop stares down the debate', { m: 2, o: 0.4 }],
    [3, 'Tell the Press Club the party room got it wrong in 2018.', 'Bishop reopens 2018', ['d', 3, { r: { IN: 1.2 } }, { u: -12, m: -2 }]],
    ['Curtin', 'You are contesting your old seat, now held by the teal Kate Chaney.', '', [
      E('Run a positive local campaign.', 'Bishop runs a local campaign', { s: { WA: 0.6 }, r: { IN: 0.4 } }),
      G('Hit the teal on climate and donors.', 'Bishop goes after the teal', 'd', 2, { r: { IN: 0.7 } }, { r: { IN: -0.5 } }),
      E('Promise WA a bigger say in cabinet.', 'Bishop promises WA more cabinet seats', { s: { WA: 0.9 }, u: -3 })]],
    ['BACK_TO_CURTIN', 'Back to Curtin', 'As Julie Bishop, win Curtin back and form government.', (st, r) => won(st, r) && r.leaderSeatWon === true, 'shoe']);

  LD({ id: 'gladys_berejiklian', name: 'Gladys Berejiklian', party: 'LNP', inc: false, cb: true, votes0: 42, mates: ['Dominic Perrottet', 'Matt Canavan'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['The Gladys effect', '+3 Political Power a turn; teal-seat preferences 2 points stronger.'], pf: { ind: 2 },
      minus: ['Integrity questions', 'Scandal setbacks hit 60% harder.'], neg: { tag: { CRISIS: 1.6 } } },
    [1, 'Launch in Bennelong with a plain daily press conference, on time, every day.', 'Berejiklian brings back the daily briefing', { m: 2, s: { NSW: 0.8 } }],
    [3, 'Answer every question about the past at the Press Club, for as long as it takes.', 'Berejiklian takes every question', ['d', 3, { m: 2, o: 0.4 }, { o: -1.2, m: -3 }]],
    ['Bennelong', 'Bennelong has big Korean- and Chinese-Australian communities, and Labor holds it.', '', [
      E('Campaign in Korean and Mandarin with local leaders.', 'Berejiklian campaigns in community languages', { s: { NSW: 0.5 }, r: { OUT: 0.4 } }),
      E('Promise a new metro line.', 'Berejiklian promises a metro line', { s: { NSW: 0.6 }, pp: -5 }),
      E('Run a national campaign and trust your name.', 'Berejiklian runs on her name', { o: 0.3 })]],
    ['GLADYS_OF_BENNELONG', 'Gladys of Bennelong', 'As Gladys Berejiklian, win Bennelong and take the Coalition to 70 or more seats.', (st, r) => !!r && r.leaderSeatWon === true && S(r, 'LNP') >= 70, 'house']);

  LD({ id: 'christopher_pyne', name: 'Christopher Pyne', party: 'LNP', inc: false, cb: true, votes0: 40, mates: ['Simon Birmingham', 'Matt Canavan'], deb: 2, pp: 0, unityAdj: 0,
      plus: ['Adelaide’s favourite', 'Setbacks in South Australia hit half as hard; debate skill 2.'], neg: { st: { SA: 0.5 } },
      minus: ['The ultimate insider', 'Teal and One Nation preferences both 2 points weaker.'], pfMinus: { ind: -2, on: -2 } },
    [4, 'Turn the debate into a comedy show at your opponent’s expense.', 'Pyne plays the debate for laughs', { m: 3, o: 0.3 }],
    [2, 'Put every navy ship built in Adelaide into the costings.', 'Pyne promises Adelaide every ship', ['d', 3, { s: { SA: 1.4 } }, { o: -1, m: -2, s: { SA: 0.3 } }], 'NATIONAL_SECURITY'],
    ['The shipyards', 'Defence wants to buy some ships overseas. Adelaide wants them all built at home.', 'NATIONAL_SECURITY', [
      E('Guarantee every submarine is built in Adelaide.', 'Pyne guarantees Adelaide the subs', { s: { SA: 1.2, WA: -0.4 } }),
      E('Split the work with Western Australia.', 'Pyne splits the work', { s: { SA: 0.5, WA: 0.5 } }),
      E('Buy off the shelf to save money.', 'Pyne would buy off the shelf', { s: { SA: -1 }, o: 0.3 })]],
    ['THE_FIXER', 'The Fixer', 'As Christopher Pyne, win six of South Australia’s ten seats.', (st, r) => ST(r, 'SA', 'LNP') >= 6, 'wrench']);

  LD({ id: 'steven_marshall', name: 'Steven Marshall', party: 'LNP', inc: false, cb: true, votes0: 36, mates: ['Nicolle Flint', 'Matt Canavan'], deb: 1, pp: 2, unityAdj: 2,
      plus: ['Adelaide’s favourite', 'Setbacks in South Australia hit 40% softer; teal-seat preferences 3 points stronger.'], neg: { st: { SA: 0.6 } }, pf: { ind: 3 },
      minus: ['Lost South Australia', 'Starts the spill on 36%.'] },
    [1, 'Launch at Adelaide’s space-industry precinct with a high-tech jobs plan.', 'Marshall launches with a space-industry plan', { s: { SA: 1 }, r: { IN: 0.5 } }],
    [3, 'Promise the Press Club a national nuclear-waste store in South Australia.', 'Marshall puts nuclear waste in SA', ['d', 4, { o: 0.3 }, { s: { SA: -1.5 }, m: -2 }]],
    ['The Adelaide hospital', 'Ambulances are ramping outside Adelaide’s hospitals again.', 'HEALTH', [
      E('Fund a new hospital for Adelaide’s north.', 'Marshall funds a hospital', { s: { SA: 0.8 }, pp: -5 }),
      E('Pay for more paramedics and beds.', 'Marshall funds paramedics', { s: { SA: 0.5 } }),
      E('Blame the state Labor government.', 'Marshall blames the state', { s: { SA: -0.3 }, m: 1 })]],
    ['BOOTHBY_REGAINED', 'Boothby Regained', 'As Steven Marshall, win Boothby and four or more South Australian seats.', (st, r) => !!r && r.leaderSeatWon === true && ST(r, 'SA', 'LNP') >= 4, 'pin']);

  LD({ id: 'campbell_newman', name: 'Campbell Newman', party: 'LNP', inc: false, cb: true, votes0: 38, mates: ['Tim Nicholls', 'Matt Canavan'], deb: 1, pp: 4, unityAdj: -2, unityDrift: -2,
      plus: ['Can-do', '+4 Political Power a turn.'], minus: ['Abrasive', 'Unity drifts down 2 a turn; starts the spill on 38%.'] },
    [2, 'Release costings that cut 20,000 public-service jobs.', 'Newman’s 20,000 job cuts', { o: 0.5, pp: 8, r: { IN: -0.4 } }, 'ECONOMY', 'spending-'],
    [4, 'Promise in the debate to sell the electricity network.', 'Newman would sell the power network', ['d', 4, { o: 0.3, pp: 5 }, { s: { QLD: -1.2 }, o: -0.8, m: -2 }], 'ENERGY'],
    ['Brisbane', 'You are running for the seat of Brisbane against Labor and the Greens.', '', [
      E('Promise Olympic transport projects.', 'Newman promises Games transport', { s: { QLD: 0.6 } }),
      E('Campaign on law and order.', 'Newman runs on crime', { r: { OUT: 0.6, IN: -0.4 } }),
      E('Run on lower taxes.', 'Newman runs on tax', { o: 0.3 })]],
    ['CAN_DO_CANBERRA', 'Can-Do Canberra', 'As Campbell Newman, win 18 or more Queensland seats and form government.', (st, r) => ST(r, 'QLD', 'LNP') >= 18 && won(st, r), 'crane']);

  // ================= Coalition: Nationals leaders, leading the Coalition campaign from the Nationals side =================
  const N = { party: 'LNP', sb: 'Nationals', inc: false };
  LD({ ...N, id: 'matt_canavan', name: 'Matt Canavan', mates: ['Bridget McKenzie', 'Angus Taylor'], deb: 1, pp: 3, unityAdj: -6,
      plus: ['Mates with the miners', 'Rural and provincial setbacks hit 30% softer; One Nation preferences 4 points stronger.'], pf: { on: 4 },
      minus: ['Climate sceptic', 'Inner-metro setbacks hit 50% harder; teal-seat preferences 4 points weaker.'], neg: { r: { RUR: 0.7, PROV: 0.7, IN: 1.5 } }, pfMinus: { ind: -4 } },
    [1, 'Launch in Rockhampton: coal, beef and dams.', 'Canavan launches in Rockhampton', { r: { RUR: 1.4, PROV: 0.8 }, s: { QLD: 0.6 }, m: 1 }],
    [3, 'Tell the Press Club the Coalition would leave the Paris Agreement.', 'Canavan would quit Paris', ['d', 3, { r: { RUR: 1.2 }, n: { ONP: -1 } }, { r: { IN: -2, OUT: -0.8 }, pf: { ind: -3 }, m: -3 }], 'ENERGY', 'fossil+'],
    ['Dams for the north', 'Northern Queensland wants water. Economists say the big schemes do not add up.', '', [
      E('Promise a scheme to turn the northern rivers inland.', 'Canavan promises to turn the rivers', { s: { QLD: 0.7 }, r: { RUR: 0.6 }, pp: -5 }),
      E('Fund three smaller dams.', 'Canavan funds three dams', { r: { RUR: 0.5 } }),
      E('Commission a feasibility study.', 'Canavan orders a dam study', { o: 0.1 })]],
    ['COAL_TRAIN', 'Coal Train to Canberra', 'As Matt Canavan, take the Coalition to government with 18 or more Queensland seats.', (st, r) => won(st, r) && ST(r, 'QLD', 'LNP') >= 18, 'wheat']);

  LD({ ...N, id: 'darren_chester', name: 'Darren Chester', votes0: 34, mates: ['Anne Webster', 'Angus Taylor'], deb: 1, pp: 2, unityAdj: -4,
      plus: ['Electable moderate', 'Teal-seat preferences 4 points stronger; inner-metro setbacks hit 20% softer.'], pf: { ind: 4 }, neg: { r: { IN: 0.8 } },
      minus: ['Party-room outcast', 'Starts the spill on 34%.'] },
    [1, 'Launch in Gippsland with a bushfire-recovery and veterans’ plan.', 'Chester launches in Gippsland', { r: { RUR: 0.8, PROV: 0.6 }, s: { VIC: 0.5 } }],
    [3, 'Tell the Press Club you back a 2035 emissions target.', 'Chester backs a 2035 target', ['d', 3, { r: { IN: 1.2 }, pf: { ind: 2 } }, { u: -12, r: { RUR: -0.8 }, m: -2 }], 'ENERGY', 'fossil-'],
    ['Veterans', 'A royal commission into veterans’ suicide has reported, and families want action.', '', [
      E('Fund every recommendation in the first budget.', 'Chester funds the veterans’ report in full', { o: 0.5, pp: -5 }),
      E('Appoint a veterans’ commissioner.', 'Chester appoints a commissioner', { o: 0.2 }),
      E('Promise to respond after the election.', 'Chester delays the veterans’ response', { o: -0.3 })]],
    ['THE_MODERATE_MAJORITY', 'The Moderate Majority', 'As Darren Chester, form government and win back two or more inner-city teal seats.', (st, r) => won(st, r) && r.tealLNP >= 2, 'scale']);

  LD({ ...N, id: 'kevin_hogan', name: 'Kevin Hogan', mates: ['Pat Conaghan', 'Angus Taylor'], deb: 0, pp: 2, unityAdj: 2,
      plus: ['North Coast favourite', 'Setbacks in New South Wales hit 25% softer; +2 Political Power a turn.'], neg: { st: { NSW: 0.75 } },
      minus: ['Low wattage', 'Debate skill 0; media blitzes cost 30% more.'], disc: { DEC_MEDIA_BLITZ: 1.3 } },
    [1, 'Launch in Lismore on flood recovery.', 'Hogan launches in Lismore', { s: { NSW: 0.8 }, r: { PROV: 0.8 } }],
    [4, 'Spend the debate refusing to criticise anyone at all.', 'Hogan refuses to attack', ['d', 3, { o: 0.4, u: 3 }, { o: -0.8, m: -2, u: -4 }]],
    ['Flood buybacks', 'Hundreds of flooded homes on the North Coast are waiting for buybacks.', '', [
      E('Fund every buyback this year.', 'Hogan funds the flood buybacks', { s: { NSW: 0.5 }, r: { PROV: 0.6 }, pp: -5 }),
      E('Raise the homes instead of buying them.', 'Hogan would raise flooded homes', { r: { PROV: 0.4 } }),
      E('Leave it to the state.', 'Hogan leaves floods to the state', { r: { PROV: -0.4 } })]],
    ['RISING_FROM_THE_FLOOD', 'Rising from the Flood', 'As Kevin Hogan, form government with caucus unity at 60 or more on polling day.', (st, r) => won(st, r) && st.unity >= 60, 'wave']);

  LD({ ...N, id: 'david_littleproud', name: 'David Littleproud', mates: ['Kevin Hogan', 'Angus Taylor'], deb: 1, pp: 3, unityAdj: -10,
      plus: ['Champion of the bush', 'Rural setbacks hit 30% softer; +3 Political Power a turn.'], neg: { r: { RUR: 0.7 } },
      minus: ['Split the Coalition', 'Starts with 10 less unity; One Nation preferences 3 points weaker.'], pfMinus: { on: -3 } },
    [1, 'Launch in Warwick with a drought-proofing fund.', 'Littleproud launches in Warwick', { r: { RUR: 1.2 }, s: { QLD: 0.5 }, m: 1 }],
    [3, 'Tell the Press Club the Nationals may walk out of the Coalition again.', 'Littleproud threatens another split', ['d', 3, { r: { RUR: 1.4 }, m: 1 }, { u: -14, r: { IN: -0.8, OUT: -0.6 }, m: -3 }]],
    ['The Coalition agreement', 'The Liberals want the Coalition agreement signed before polling day.', '', [
      E('Sign a new agreement with guaranteed cabinet seats.', 'The Coalition signs a new deal', { u: 8 }),
      E('Demand a veto over energy policy.', 'Littleproud wants an energy veto', { r: { RUR: 0.6 }, u: -5 }),
      G('Run separate campaigns and reunite after the count.', 'The Coalition runs apart', 'm', 2, { r: { RUR: 1 } }, { u: -8, o: -0.4 })]],
    ['BACK_TOGETHER', 'Back Together', 'As David Littleproud, form government without caucus unity ever falling below 45.', (st, r) => won(st, r) && st.minUnity >= 45, 'link']);

  LD({ ...N, id: 'michael_mccormack', name: 'Michael McCormack', votes0: 36, mates: ['Michelle Landry', 'Angus Taylor'], deb: 0, pp: 2, unityAdj: 2,
      plus: ['Safe pair of hands', 'Scandal setbacks hit 30% softer; +2 Political Power a turn.'], neg: { tag: { CRISIS: 0.7 } },
      minus: ['Charisma deficit', 'Debate skill 0; media blitzes cost 25% more; starts the spill on 36%.'], disc: { DEC_MEDIA_BLITZ: 1.25 } },
    [1, 'Launch in Wagga Wagga with a finish date for the inland rail.', 'McCormack launches in Wagga', { r: { RUR: 0.8, PROV: 0.6 } }],
    [4, 'Promise the debate audience the inland rail will reach Brisbane by 2030.', 'McCormack’s inland-rail promise', ['d', 3, { s: { QLD: 0.6 }, r: { RUR: 0.6 } }, { o: -0.8, m: -2 }]],
    ['The inland rail', 'The inland rail is billions over budget and years late.', 'ECONOMY', [
      E('Fund it all the way to Brisbane.', 'McCormack funds the whole line', { r: { RUR: 0.6 }, pp: -5 }, 'spending+'),
      E('Finish the southern half first.', 'McCormack finishes the south first', { r: { RUR: 0.3 } }),
      E('Hand it to a private operator.', 'McCormack privatises the rail', { o: 0.2, r: { RUR: -0.3 } })]],
    ['RIVERINA_RISING', 'Riverina Rising', 'As Michael McCormack, form government with two or more endorsements.', (st, r) => won(st, r) && (st.endorse || []).length >= 2, 'train']);

  LD({ ...N, id: 'bridget_mckenzie', name: 'Bridget McKenzie', votes0: 38, mates: ['Matt Canavan', 'Angus Taylor'], deb: 2, pp: 0, unityAdj: 0,
      plus: ['Champion of the bush', 'Debate skill 2; rural setbacks hit 25% softer.'], minus: ['The sports-grants saga', 'Scandal setbacks hit 60% harder; starts the spill on 38%.'],
      neg: { r: { RUR: 0.75 }, tag: { CRISIS: 1.6 } } },
    [4, 'Take the debate to regional services: phones, roads and doctors.', 'McKenzie fights for the regions', { r: { RUR: 1, PROV: 0.6 }, m: 1 }],
    [2, 'Put a community sports fund in the costings, seat by seat.', 'McKenzie’s sports fund, seat by seat', ['d', 4, { r: { PROV: 0.6 } }, { o: -1.2, m: -3, u: -5 }]],
    ['Regional health', 'Country hospitals are closing birthing units for lack of staff.', 'HEALTH', [
      E('Pay doctors and midwives a bonus to move to the bush.', 'McKenzie pays doctors to go bush', { r: { RUR: 0.8 }, pp: -5 }),
      E('Fund telehealth for every town.', 'McKenzie funds telehealth', { r: { RUR: 0.4 } }),
      E('Blame the states.', 'McKenzie blames the states', { r: { RUR: -0.3 }, m: 1 })]],
    ['FAIR_GAME', 'Fair Game', 'As Bridget McKenzie, put the sports fund in the costings and still form government.', (st, r) => lo(st, 'bridget_mckenzie:m2') && won(st, r), 'ball']);

  LD({ ...N, id: 'warren_truss', name: 'Warren Truss', cb: true, votes0: 34, mates: ["Llew O'Brien", 'Angus Taylor'], deb: 0, pp: 2, unityAdj: 4, unityDrift: 1,
      plus: ['Safe pair of hands', 'Unity does not wear down with campaign fatigue; scandal setbacks hit 25% softer.'], neg: { tag: { CRISIS: 0.75 } },
      minus: ['Long gone', 'Starts the spill on 34%; debate skill 0.'] },
    [1, 'Launch in Kingaroy with a roads and trucking package.', 'Truss launches in Kingaroy', { r: { RUR: 1 }, s: { QLD: 0.6 } }],
    [4, 'Spend the debate explaining freight logistics in exhaustive detail.', 'Truss explains freight', ['d', 3, { r: { RUR: 0.6 } }, { o: -0.8, m: -2 }]],
    ['The truckies', 'Truck drivers are blockading a highway over fuel prices.', 'COST_OF_LIVING', [
      E('Cut the fuel excise for a year.', 'Truss cuts the fuel excise', { o: 0.5, pp: -5 }),
      E('Meet the drivers on the highway.', 'Truss meets the truckies', { r: { RUR: 0.5 }, m: 1 }),
      E('Call in the police to clear the road.', 'Truss clears the blockade', { r: { OUT: 0.3, RUR: -0.5 } })]],
    ['OLD_HANDS', 'Old Hands', 'As Warren Truss, form government with caucus unity at 70 or more on polling day.', (st, r) => won(st, r) && st.unity >= 70, 'hand']);

  LD({ ...N, id: 'john_barilaro', name: 'John Barilaro', cb: true, votes0: 38, mates: ['Michael McCormack', 'Angus Taylor'], deb: 2, pp: 3, unityAdj: -4, unityDrift: -1,
      plus: ['Bare-knuckle brawler', 'Debate skill 2; +3 Political Power a turn.'], minus: ['Integrity questions', 'Scandal setbacks hit 60% harder; unity drifts down 1 a turn.'], neg: { tag: { CRISIS: 1.6 } } },
    [1, 'Launch in Queanbeyan with a new dam for every regional city.', 'Barilaro launches with a dam for every city', { r: { RUR: 0.8, PROV: 0.8 }, s: { NSW: 0.4 }, m: 2 }],
    [3, 'Threaten at the Press Club to blow up the Coalition if the Liberals block your plan.', 'Barilaro threatens the Coalition', ['d', 3, { r: { RUR: 1.2 }, m: 2 }, { u: -12, o: -0.6, m: -2 }]],
    ['Eden-Monaro again', 'You are running for Eden-Monaro, the seat you almost contested in 2020.', '', [
      E('Make it about bushfire rebuilding.', 'Barilaro runs on bushfire recovery', { s: { NSW: 0.4 }, r: { RUR: 0.5 } }),
      E('Promise a new hospital in Queanbeyan.', 'Barilaro promises a hospital', { s: { NSW: 0.5 }, pp: -5 }),
      G('Pick a fight with the Liberal candidate.', 'Barilaro picks a fight', 'm', 2, { r: { RUR: 0.8 } }, { u: -6 })]],
    ['EDEN_MONARO_AT_LAST', 'Eden-Monaro, At Last', 'As John Barilaro, win Eden-Monaro and form government.', (st, r) => won(st, r) && r.leaderSeatWon === true, 'glove']);

  // ================= One Nation =================
  LD({ id: 'cory_bernardi', name: 'Cory Bernardi', party: 'ONP', inc: false, cb: true, votes0: 36, mates: ['Malcolm Roberts'], deb: 1, pp: 3, unityAdj: -2, unityDrift: -1,
      plus: ['Culture warrior', '+1 on migration checks; +3 Political Power a turn.'], debTag: { MIGRATION: 1 },
      minus: ['A failed party founder', 'Starts the spill on 36%; unity drifts down 1 a turn.'] },
    [1, 'Launch in Adelaide with a conservative manifesto.', 'Bernardi’s conservative manifesto', { s: { SA: 1 }, r: { OUT: 0.6 }, m: 1 }],
    [3, 'Announce at the Press Club that you are starting yet another new party.', 'Bernardi starts a new party, again', ['d', 4, { m: 3, o: 0.4 }, { u: -15, o: -1, m: -3 }]],
    ['Conservatives unite?', 'Small conservative parties want a joint ticket with One Nation.', 'PREFS', [
      E('Merge the tickets.', 'The right unites behind One Nation', { o: 0.5, u: -4 }),
      E('Swap preferences only.', 'One Nation swaps preferences', { pf: { on: 2 } }),
      E('Go it alone.', 'One Nation goes it alone', { u: 3 })]],
    ['THIRD_TIME_LUCKY', 'Third Time Lucky', 'As Cory Bernardi, win three or more South Australian seats for One Nation.', (st, r) => ST(r, 'SA', 'ONP') >= 3, 'redo']);

  LD({ id: 'mark_latham', name: 'Mark Latham', party: 'ONP', inc: false, cb: true, noGood: true, votes0: 12, mates: ['Pauline Hanson'], deb: 0, pp: 0, unityAdj: -20, schism: 14, unityDrift: -3, clash: 0.85,
      plus: ['L plates', 'Debate skill 0; no Political Power bonus.'], minus: ['Off message', 'Starts the spill on 20%; 14 less unity (10 back with Hanson’s blessing); unity drifts down 2 a turn; a 60% chance of an off-message clash each week.'] },
    [1, 'Launch in the Hunter with a coal-and-steel workers’ manifesto.', 'Latham launches in the Hunter', { r: { PROV: 1.2, OUT: 0.6 }, s: { NSW: 0.5 }, m: 1 }],
    [4, 'Go after the moderator in the debate.', 'Latham takes on the moderator', ['d', 4, { m: 3 }, { o: -1.2, m: -3, u: -5 }]],
    ['Labor’s heartland', 'Former Labor voters in the Hunter and Western Sydney are listening to you.', '', [
      E('Promise to protect every coal and steel job.', 'Latham promises coal and steel jobs', { r: { PROV: 0.8 } }, 'fossil+'),
      E('Run on schools and discipline.', 'Latham runs on schools', { r: { OUT: 0.6 } }),
      E('Attack Labor’s inner-city wing.', 'Latham attacks inner-city Labor', { n: { ALP: -0.4 }, r: { IN: -0.3 } })]],
    ['HUNTER_GATHERER', 'Hunter Gatherer', 'As Mark Latham on Hard, win the Hunter and 35 or more seats for One Nation.', (st, r) => !!r && st.diff === 'hard' && r.leaderSeatWon === true && S(r, 'ONP') >= 35, 'wrench']);

  // ================= Greens =================
  LD({ id: 'larissa_waters', name: 'Larissa Waters', party: 'GRN', inc: false, votes0: 40, mates: ['David Shoebridge'], deb: 1, pp: 0, unityAdj: 0,
      plus: ['Climate crusader', '+1 on energy checks; energy choices land 30% harder for you.'], debTag: { ENERGY: 1 }, pos: { tag: { ENERGY: 1.3 } },
      minus: ['No House seat', 'Starts the spill on 40%.'] },
    [1, 'Launch on the Great Barrier Reef: protect it or lose it.', 'Waters launches on the reef', { s: { QLD: 0.8 }, r: { IN: 0.8 }, m: 1 }, 'ENERGY'],
    [3, 'Call for a royal commission into the fossil-fuel lobby.', 'Waters wants a royal commission into fossil fuels', ['d', 3, { r: { IN: 1 }, m: 1 }, { r: { OUT: -0.8, PROV: -0.8 }, m: -2 }], 'ENERGY', 'fossil-'],
    ['The reef', 'Another mass bleaching event is hitting the reef in the middle of the campaign.', 'ENERGY', [
      E('Make it the issue of the week with divers and scientists.', 'Waters dives the reef', { r: { IN: 0.8 }, m: 1 }),
      E('Promise a reef jobs fund for tourism towns.', 'Waters funds reef jobs', { s: { QLD: 0.6 }, r: { PROV: 0.3 } }),
      E('Blame coal by name.', 'Waters blames coal', { r: { IN: 0.5, PROV: -0.5 } })]],
    ['REEF_KEEPER', 'Reef Keeper', 'As Larissa Waters, win two or more Queensland House seats for the Greens.', (st, r) => ST(r, 'QLD', 'GRN') >= 2, 'leaf']);

  LD({ id: 'sarah_hanson_young', name: 'Sarah Hanson-Young', party: 'GRN', inc: false, votes0: 42, mates: ['Mehreen Faruqi'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Youth whisperer', 'The youth turnout drive costs 30% less; +3 Political Power a turn.'], disc: { DEC_GRN_YOUTH: 0.7 },
      minus: ['Regional wipeout', 'Rural and provincial setbacks hit 40% harder.'], neg: { r: { RUR: 1.4, PROV: 1.4 } } },
    [1, 'Launch in Adelaide with a plan for free childcare.', 'Hanson-Young launches with free childcare', { o: 0.5, s: { SA: 0.6 } }],
    [4, 'Promise in the debate to end live animal exports at once.', 'Hanson-Young would end live exports now', ['d', 3, { r: { IN: 1 } }, { r: { RUR: -1.4, PROV: -0.8 }, m: -2 }]],
    ['The River Murray', 'The Murray mouth is drying out, and South Australia wants water bought back upstream.', '', [
      E('Promise to buy back the full amount of water.', 'Hanson-Young buys back the Murray', { s: { SA: 0.8 }, r: { RUR: -0.6 } }),
      E('Fund water-saving works for irrigators.', 'Hanson-Young funds irrigators', { r: { RUR: 0.3 } }),
      E('Call a royal commission into the river.', 'Hanson-Young calls a royal commission', { s: { SA: 0.4 } })]],
    ['MOUTH_OF_THE_MURRAY', 'Mouth of the Murray', 'As Sarah Hanson-Young, win three or more House seats and 12 or more Greens senators.', (st, r) => S(r, 'GRN') >= 3 && !!r.sen && r.sen.GRN >= 12, 'wave']);

  LD({ id: 'mehreen_faruqi', name: 'Mehreen Faruqi', party: 'GRN', inc: false, votes0: 42, mates: ['David Shoebridge'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Inner-city darling', 'Housing choices land 20% harder for you; +3 Political Power a turn.'], pos: { tag: { HOUSING: 1.2 } },
      minus: ['Radical reputation', 'Outer-suburban setbacks hit 40% harder.'], neg: { r: { OUT: 1.4 } } },
    [3, 'Give a Press Club speech on free university and TAFE.', 'Faruqi’s free-education speech', { r: { IN: 1.2 }, m: 1 }],
    [4, 'Spend the debate attacking Labor harder than the Coalition.', 'Faruqi goes after Labor', ['d', 3, { r: { IN: 1.2 } }, { pf: { grn: -3 }, o: -0.6, m: -2 }]],
    ['Free education', 'Student debt is rising faster than wages.', '', [
      E('Promise to wipe all student debt.', 'Faruqi wipes student debt', { r: { IN: 1 }, pp: -5 }, 'spending+'),
      E('Freeze indexation on student debt.', 'Faruqi freezes student debt', { r: { IN: 0.5 } }),
      E('Make TAFE free and leave uni fees alone.', 'Faruqi backs free TAFE', { r: { OUT: 0.4 } })]],
    ['FOUR_IN_THE_HOUSE', 'Four in the House', 'As Mehreen Faruqi, win four or more House seats for the Greens.', (st, r) => S(r, 'GRN') >= 4, 'book']);

  LD({ id: 'penny_allman_payne', name: 'Penny Allman-Payne', party: 'GRN', inc: false, votes0: 40, mates: ['Larissa Waters'], deb: 1, pp: 2, unityAdj: 6,
      plus: ['Teacher’s pet', '+6 unity on taking the job; +2 Political Power a turn.'],
      minus: ['The miners’ enemy', 'Setbacks in Queensland and rural seats hit 35% harder.'], neg: { st: { QLD: 1.35 }, r: { RUR: 1.35 } } },
    [1, 'Launch at a public school in Gladstone with a fully funded schools plan.', 'Allman-Payne launches at a public school', { s: { QLD: 0.6 }, r: { PROV: 0.6 } }],
    [3, 'Tell the Press Club coal mining in Queensland should end by 2030.', 'Allman-Payne sets a 2030 end for coal', ['d', 4, { r: { IN: 1 } }, { s: { QLD: -1.4 }, r: { RUR: -1 }, m: -2 }], 'ENERGY', 'fossil-'],
    ['Public schools', 'Public schools are still short of the funding standard.', '', [
      E('Fund every public school to the full standard this term.', 'Allman-Payne fully funds public schools', { o: 0.5, pp: -5 }),
      E('Cut funding to the richest private schools.', 'Allman-Payne cuts elite private schools', { r: { OUT: 0.4, IN: -0.2 } }),
      E('Pay teachers more.', 'Allman-Payne lifts teacher pay', { o: 0.3 })]],
    ['TOP_OF_THE_CLASS', 'Top of the Class', 'As Penny Allman-Payne, win three or more House seats for the Greens.', (st, r) => S(r, 'GRN') >= 3, 'book']);

  LD({ id: 'elizabeth_watson_brown', name: 'Elizabeth Watson-Brown', party: 'GRN', inc: false, votes0: 40, mates: ['Max Chandler-Mather'], deb: 1, pp: 2, unityAdj: 0,
      plus: ['Teal whisperer', 'Teal-seat preferences 3 points stronger; +2 Political Power a turn.'], pf: { ind: 3 },
      minus: ['Hard ceiling', 'Outer-suburban and provincial setbacks hit 35% harder.'], neg: { r: { OUT: 1.35, PROV: 1.35 } } },
    [1, 'Launch in Ryan with an architect’s plan for green, affordable homes.', 'Watson-Brown’s green homes plan', { s: { QLD: 0.6 }, r: { IN: 1 } }, 'HOUSING'],
    [3, 'Propose a ban on new car parks in inner-city developments.', 'Watson-Brown would ban new car parks', ['d', 3, { r: { IN: 1 } }, { r: { OUT: -1 }, m: -2 }], 'HOUSING'],
    ['The Brisbane seats', 'You held Ryan; now Labor and the Liberals are both after it.', '', [
      E('Flood Ryan with volunteers.', 'Greens flood Ryan', { s: { QLD: 0.5 } }),
      E('Spread across the three Brisbane seats.', 'Greens spread across Brisbane', { s: { QLD: 0.3 }, r: { IN: 0.3 } }),
      E('Promise a Brisbane river-flood plan.', 'Watson-Brown promises a flood plan', { s: { QLD: 0.4 }, o: 0.1 })]],
    ['THE_BRISBANE_GREENSLIDE', 'The Brisbane Greenslide', 'As Elizabeth Watson-Brown, win three Queensland House seats for the Greens.', (st, r) => ST(r, 'QLD', 'GRN') >= 3, 'leaf']);

  LD({ id: 'bob_brown', name: 'Bob Brown', party: 'GRN', inc: false, cb: true, votes0: 46, mates: ['Christine Milne'], deb: 1, pp: 0, unityAdj: 10, damp: 0.7,
      plus: ['The founder', 'Starts the spill on 46%; +10 unity on taking the job.'],
      minus: ['The old campaigner', 'Your choices move your own vote 30% less, for better or worse; rural and provincial setbacks hit 50% harder.'], neg: { r: { RUR: 1.5, PROV: 1.5 } } },
    [1, 'Launch on the Franklin River, where the movement began.', 'Brown launches on the Franklin', { r: { IN: 1 }, s: { TAS: 1 }, m: 2 }, 'ENERGY'],
    [4, 'Give the whole debate to one issue: ending native-forest logging.', 'Brown makes the debate about forests', ['d', 3, { s: { TAS: 0.8 }, r: { IN: 0.6 } }, { r: { RUR: -1.2, OUT: -0.6 }, m: -2 }]],
    ['The old forests', 'Loggers are moving into old-growth forest in Tasmania during the campaign.', '', [
      E('Go to the forest and stand in front of the machines.', 'Brown blocks the loggers', { s: { TAS: 0.6 }, m: 2, r: { RUR: -0.4 } }),
      E('Promise a buyout for forestry workers.', 'Brown funds forestry workers', { s: { TAS: 0.5 } }),
      E('Take it to court.', 'Brown goes to court over forests', { o: 0.1 })]],
    ['NO_DAMS', 'Where It Began', 'As Bob Brown, win four or more House seats for the Greens.', (st, r) => S(r, 'GRN') >= 4, 'leaf']);

  LD({ id: 'adam_bandt', name: 'Adam Bandt', party: 'GRN', inc: false, cb: true, votes0: 44, mates: ['Max Chandler-Mather'], deb: 1, pp: 3, unityAdj: 0,
      plus: ['Inner-city darling', 'Housing choices land 25% harder for you; +3 Political Power a turn.'], pos: { tag: { HOUSING: 1.25 } },
      minus: ['Lost his own seat', 'Outer-suburban setbacks hit 30% harder.'], neg: { r: { OUT: 1.3 } } },
    [1, 'Launch in Melbourne with the Greens’ biggest-ever housing plan.', 'Bandt launches in Melbourne', { s: { VIC: 0.6 }, r: { IN: 1.2 }, m: 1 }, 'HOUSING'],
    [3, 'Use the Press Club to call for a four-day week.', 'Bandt wants a four-day week', ['d', 3, { r: { IN: 1 }, m: 2 }, { r: { OUT: -1 }, o: -0.4, m: -2 }], 'IR'],
    ['Melbourne', 'You lost Melbourne in 2025, and you want it back.', '', [
      E('Door-knock every street in Melbourne yourself.', 'Bandt knocks on every door', { s: { VIC: 0.5 } }),
      E('Run on renters’ rights.', 'Bandt runs on renting', { r: { IN: 0.6 } }),
      E('Run a national campaign and let Melbourne follow.', 'Bandt runs nationally', { o: 0.3 })]],
    ['MELBOURNE_REGAINED', 'Melbourne Regained', 'As Adam Bandt, win Melbourne back and three or more House seats for the Greens.', (st, r) => !!r && r.leaderSeatWon === true && S(r, 'GRN') >= 3, 'house']);

  // ================= Teal independents: each new face fronts the movement (no spill) =================
  const T = { party: 'IND', inc: true, unity: 70 };   // like the other teals, their sandbox traits are shown but the movement keeps no formal leader in the count
  LD({ ...T, id: 'monique_ryan', name: 'Monique Ryan', mates: ['Zoe Daniel'], deb: 1, pp: 2, unityDrift: -1,
      plus: ['Doctor in the House', '+1 on health checks; health choices land 30% harder for you.'], debTag: { HEALTH: 1 }, pos: { tag: { HEALTH: 1.3 } },
      minus: ['Abrasive', 'Unity drifts down 1 a turn.'] },
    [3, 'Give the Press Club a doctor’s case for climate action.', 'Ryan makes the medical case on climate', { r: { IN: 1.2 } }, 'HEALTH'],
    [4, 'Debate the moderator on the questions themselves.', 'Ryan argues with the moderator', ['d', 3, { m: 2 }, { o: -0.6, m: -2 }]],
    ['Kooyong', 'Josh Frydenberg’s old seat is the Liberals’ number-one target.', '', [
      E('Run on climate and integrity.', 'Ryan runs on climate', { r: { IN: 0.6 } }),
      E('Run on childcare and health.', 'Ryan runs on health', { r: { IN: 0.5 } }),
      G('Take on the Liberal candidate in a televised debate.', 'Ryan debates for Kooyong', 'd', 2, { r: { IN: 0.8 } }, { r: { IN: -0.4 } })]],
    ['HOLDING_KOOYONG', 'Holding Kooyong', 'As Monique Ryan, hold Kooyong and win ten or more seats for the teals.', (st, r) => !!r && r.leaderSeatWon === true && S(r, 'IND') >= 10, 'house']);

  LD({ ...T, cb: true, id: 'malcolm_turnbull', name: 'Malcolm Turnbull', mates: ['Kerryn Phelps'], deb: 2, pp: 5, unityDrift: -1,
      plus: ['Household name', 'Debate skill 2; +5 Political Power a turn.'], minus: ['Knifed before', 'Unity drifts down 1 a turn.'] },
    [3, 'Give the Press Club a speech on innovation and the republic.', 'Turnbull’s innovation speech', { r: { IN: 1.4 }, m: 1 }],
    [1, 'Launch with a harbourside reception at your own home.', 'Turnbull launches at home', ['m', 3, { r: { IN: 0.6 } }, { r: { OUT: -1, PROV: -0.8 }, m: -2 }]],
    ['The republic', 'A republic group wants the teals to make a new referendum their price for support.', '', [
      E('Make a republic referendum your price.', 'Turnbull demands a republic vote', { r: { IN: 0.6 }, u: -3 }),
      E('Back a plebiscite first.', 'Turnbull backs a plebiscite', { r: { IN: 0.3 } }),
      E('Keep it off the table this time.', 'Turnbull parks the republic', { u: 3 })]],
    ['THE_WENTWORTH_RETURN', 'The Wentworth Return', 'As Malcolm Turnbull, win 12 or more teal seats in a hung parliament.', (st, r) => !!r && r.hung && S(r, 'IND') >= 12, 'crown']);

  LD({ ...T, id: 'cathy_mcgowan', name: 'Cathy McGowan', cb: true, mates: ['Helen Haines'], deb: 0, pp: 2, unity: 74,
      plus: ['Grassroots army', 'Local campaigns cost 30% less; rural setbacks hit 30% softer.'], disc: { DEC_IND_LOCAL: 0.7 }, neg: { r: { RUR: 0.7 } },
      minus: ['Long gone', 'Debate skill 0.'] },
    [1, 'Launch at a kitchen table in Wodonga with community groups from across the country.', 'McGowan’s kitchen-table launch', { r: { RUR: 1, PROV: 0.6 }, u: 4 }],
    [3, 'Tell the Press Club independents should never back any government.', 'McGowan rules out backing anyone', ['d', 3, { r: { RUR: 0.8 } }, { o: -0.6, m: -2 }]],
    ['Kitchen-table conversations', 'Hundreds of groups want to run listening sessions in their towns.', '', [
      E('Run a thousand kitchen-table meetings.', 'A thousand kitchen tables', { r: { RUR: 0.6, PROV: 0.4 }, pp: -5 }),
      E('Publish what you heard as a platform.', 'The teals publish a people’s platform', { o: 0.3 }),
      E('Keep it local and low-key.', 'McGowan keeps it low-key', { u: 3 })]],
    ['KITCHEN_TABLE', 'Kitchen-Table Politics', 'As Cathy McGowan, win ten or more seats for the teals.', (st, r) => S(r, 'IND') >= 10, 'table']);

  LD({ ...T, id: 'kerryn_phelps', name: 'Kerryn Phelps', cb: true, mates: ['Allegra Spender'], deb: 1, pp: 2,
      plus: ['Doctor in the House', 'Health choices land 30% harder for you; +2 Political Power a turn.'], pos: { tag: { HEALTH: 1.3 } },
      minus: ['Yesterday’s news', 'Setbacks outside New South Wales hit 20% harder.'], neg: { st: { VIC: 1.2, QLD: 1.2, WA: 1.2, SA: 1.2 } } },
    [1, 'Launch in Wentworth with a medical-research pledge.', 'Phelps launches in Wentworth', { r: { IN: 1 }, s: { NSW: 0.5 } }, 'HEALTH'],
    [3, 'Promise a national pill-testing program at the Press Club.', 'Phelps backs pill testing', ['d', 3, { r: { IN: 1 } }, { r: { OUT: -0.8 }, o: -0.5, m: -2 }], 'HEALTH'],
    ['The by-election spirit', 'You won Wentworth at a by-election once. The teals want that energy again.', '', [
      E('Run a short, sharp by-election-style blitz in three seats.', 'Phelps runs a blitz', { s: { NSW: 0.6 } }),
      E('Recruit doctors as candidates.', 'Phelps recruits doctors', { r: { IN: 0.5 } }),
      E('Back the sitting teals first.', 'Phelps backs the sitting members', { u: 3 })]],
    ['THE_BY_ELECTION_SPIRIT', 'The By-Election Spirit', 'As Kerryn Phelps, win seven or more New South Wales seats for the teals.', (st, r) => ST(r, 'NSW', 'IND') >= 7, 'cross']);

  LD({ ...T, fresh: true, id: 'simon_holmes_a_court', name: 'Simon Holmes à Court', mates: ['Zali Steggall'], deb: 0, pp: 6, unityDrift: -1,
      plus: ['Climate 200 money', '+6 Political Power a turn.'], minus: ['Backroom bankroller', 'Debate skill 0; unity drifts down 1 a turn.'] },
    [2, 'Pay for an independent audit of every teal promise and publish it with the costings.', 'The teals audit their own promises', { o: 0.4, pp: 10, f: ['PASSED_PBO_CLEAN'] }],
    [4, 'Turn up to the debate as the money man and talk about donations.', 'Holmes à Court talks money', ['d', 3, { m: 1 }, { o: -0.8, m: -2 }]],
    ['Running in Kooyong?', 'Supporters want you to stand for a seat yourself.', '', [
      E('Stay off the ballot and fund others.', 'Holmes à Court stays backstage', { pp: 10 }),
      G('Run for a seat yourself.', 'Holmes à Court runs', 'm', 2, { r: { IN: 0.6 }, m: 1 }, { r: { IN: -0.4 }, m: -1 }),
      E('Publish every donor, every dollar.', 'Climate 200 publishes its donors', { r: { IN: 0.5 }, u: 2 })]],
    ['THE_KINGMAKERS_BANK', 'The Kingmaker’s Bank', 'As Simon Holmes à Court, win twelve or more seats for the teals.', (st, r) => S(r, 'IND') >= 12, 'coin']);

  // leaders who have held the job before: Rudd as prime minister, Morrison and Abbott as Liberal leader
  NEW.forEach(l => { if (['kevin_rudd', 'scott_morrison', 'tony_abbott'].includes(l.id)) l.again = true; });
  C.leaders.push(...NEW);
  // ---- leader-only answers: attach to every version of the milestone, like the others
  LO.forEach(o => { o.lo = o.only + ':m' + o.mile; });
  if (!(window.CAMPAIGN_TUNE || {}).noLO) C.cards.forEach(c => LO.forEach(o => { if (c.mile === o.mile) { const { mile, ...opt } = o; c.opts.push({ tag: 'GENERAL', ...opt }); } }));
  const seen = {}; C.cards.forEach(c => c.opts.forEach(o => { if (o.lo && !seen[o.lo]) seen[o.lo] = o; })); C.LO = Object.values(seen);

  // ---- spill decks. Comebacks come from outside parliament; Nationals leaders take on the Liberal leader in the joint party room;
  // Greens challengers face their own party room.
  const ids = f => NEW.filter(f).map(l => l.id);
  const ALPCB = ids(l => l.party === 'ALP' && l.cb), LIBCB = ids(l => l.party === 'LNP' && l.cb && l.sb !== 'Nationals'), NATS = ids(l => l.sb === 'Nationals');
  const sp = (id, party, cands, turn, t, q, opts, ballot) => ({ id, party, ...(cands ? { cands } : {}), turn, ...(ballot ? { ballot: true } : {}), t, q, opts });
  C.spill.push(
    sp('ALP_CB_SPILL_1', 'ALP', ALPCB, 1, 'Back in the House', 'You won {byseat}. The MPs who asked you back are waiting to hear how you will take the leadership.', [
      E('Use your first speech in the House to make the case for change.', 'Comeback MP makes the case in a first speech', { v: 6, m: 1, o: 0.2 }),
      E('Spend your first week in the members’ dining room, one MP at a time.', 'Comeback MP works the dining room', { v: 8, u: 2 }),
      E('Announce on breakfast television that you will challenge.', 'Comeback MP declares on breakfast TV', { v: 4, u: -6, m: 3, o: 0.4 })]),
    sp('ALP_CB_SPILL_2', 'ALP', ALPCB, 2, 'The unions', 'The big unions will decide many caucus votes. They want to know where you stand.', [
      E('Promise the union movement a seat at the cabinet table on wages.', 'Comeback courts the unions', { v: 9, u: 3, f: ['FACTIONAL_IOU'] }),
      E('Promise the unions nothing and back yourself.', 'Comeback snubs the unions', { v: 3, m: 2, o: 0.3 }),
      E('Meet them privately and let them leak it.', 'Comeback meets union bosses', { v: 7, u: -2 })]),
    sp('ALP_CB_SPILL_3', 'ALP', ALPCB, 3, 'Why go back?', 'The press asks the obvious question: why should Labor turn to someone from its past?', [
      E('Say the times call for experience.', 'Comeback makes the case for experience', { v: 7, o: 0.3 }),
      E('Say you have changed and learned from the past.', 'Comeback says lessons learned', { v: 6, u: 4 }),
      E('Say the polls speak for themselves.', 'Comeback points to the polls', { v: 8, u: -4, m: 1 })]),
    sp('ALP_CB_SPILL_4', 'ALP', ALPCB, 4, 'The caucus ballot', 'The ballot is called. One last pitch. You need 50%.', [
      E('Promise to keep the current leader in a senior role.', 'Comeback offers a unity ticket', { v: 6, u: 8 }),
      E('Promise a clean break and a new frontbench.', 'Comeback promises a clean break', { v: 7, u: -4, pp: 10 }),
      E('Promise a campaign built around you, and only you.', 'Comeback promises a presidential campaign', { v: 6, m: 2, o: 0.4 })], true),
    sp('ALP_CB_SPILL_5', 'ALP', ALPCB, 5, 'Back in the Lodge', 'The caucus has spoken, and you will be sworn in as prime minister{again} tomorrow. Who goes where?', [
      E('Keep the Treasurer and the Defence minister for continuity.', 'Continuity cabinet for the comeback PM', { u: 14, o: 0.4 }),
      E('Bring in your own people.', 'Comeback PM brings in loyalists', { u: -10, pp: 18 }),
      E('Announce a cost-of-living package on day one.', 'Day-one relief from the comeback PM', { r: { OUT: 0.8 }, u: 4, m: 2 })]),
    sp('LIB_CB_SPILL_1', 'LNP', LIBCB, 1, 'Back in the party room', 'You won {byseat}, and your first party-room meeting is tomorrow. The Liberals are stuck, and some of them want you to lead.', [
      E('Tell the party room it needs a winner, and that you just proved you are one.', 'Comeback Liberal claims the by-election as proof', { v: 7, m: 2 }),
      E('Sound out every MP one by one before you move.', 'Comeback Liberal sounds out the party room', { v: 8, u: 3 }),
      E('Say you will only move if the party room asks.', 'Comeback Liberal waits to be asked', { v: 5, u: 5 })]),
    sp('LIB_CB_SPILL_2', 'LNP', LIBCB, 2, 'The Nationals', 'The Nationals want guarantees before they back a returning leader.', [
      E('Sign a new Coalition agreement on the spot.', 'Comeback Liberal signs with the Nationals', { v: 10, u: 5, f: ['NATS_COALITION_PACT'] }),
      E('Promise them the usual ministries and nothing more.', 'Comeback Liberal offers the usual deal', { v: 6, u: 2 }),
      E('Tell them the Liberals come first.', 'Comeback Liberal snubs the Nationals', { v: 3, u: -10, r: { IN: 0.8 } })]),
    sp('LIB_CB_SPILL_3', 'LNP', LIBCB, 3, 'The old wounds', 'Your old rivals in the party room have long memories.', [
      E('Promise every faction a seat at the table.', 'Comeback Liberal promises every faction', { v: 8, u: 4 }),
      E('Settle old scores.', 'Comeback Liberal settles scores', { v: 5, u: -8, pp: 10 }),
      E('Go on talkback and win over the base.', 'Comeback Liberal takes to talkback', { v: 6, m: 2, o: 0.4 })]),
    sp('LIB_CB_SPILL_4', 'LNP', LIBCB, 4, 'The party-room ballot', 'The ballot is called. One last pitch. You need 50%.', [
      E('Promise to keep the current leader as your deputy.', 'Comeback Liberal offers a unity ticket', { v: 6, u: 8 }),
      E('Promise a clean break with the 2025 defeat.', 'Comeback Liberal promises a fresh start', { v: 7, r: { IN: 0.5 } }),
      E('Promise to win back the outer suburbs.', 'Comeback Liberal targets the suburbs', { v: 6, r: { OUT: 0.6 } })], true),
    sp('LIB_CB_SPILL_5', 'LNP', LIBCB, 5, 'The shadow cabinet', 'You are Liberal leader{again}, and the campaign is weeks away. Shape the team.', [
      E('A broad-church frontbench with every wing.', 'Broad-church frontbench', { u: 15, o: 0.5 }),
      E('Loyalists in the top jobs.', 'Loyalist frontbench', { u: -12, pp: 20 }),
      E('Launch a power-bill plan on day one.', 'Day-one power-bill plan', { o: 1, m: 2, u: 4 })]),
    sp('NAT_SPILL_1', 'LNP', NATS, 1, 'The junior partner', 'The Liberal leader is wounded, and some in the joint party room want a Nationals leader at the top of the Coalition for the first time since the Country Party days.', [
      E('Argue the bush is where the Coalition still wins seats.', 'Nationals pitch to lead the Coalition', { v: 7, r: { RUR: 0.6 }, m: 1 }),
      E('Argue only a Nationals leader can hold off One Nation.', 'Nationals say they can stop One Nation', { v: 8, n: { ONP: -0.5 }, u: -2 }),
      E('Offer the Liberals the Treasury in return.', 'Nationals offer the Liberals Treasury', { v: 6, u: 4, pp: 5 })]),
    sp('NAT_SPILL_2', 'LNP', NATS, 2, 'The Liberal moderates', 'City Liberals fear a Nationals leader will cost them every teal seat.', [
      E('Promise the moderates a climate target they can sell.', 'Nationals offer moderates a climate target', { v: 9, u: -4, r: { IN: 0.6 } }),
      E('Promise them a free hand in the cities.', 'Nationals promise a free hand in the cities', { v: 7, u: 2 }),
      E('Tell them the cities are lost anyway.', 'Nationals write off the cities', { v: 3, u: -8, r: { RUR: 0.6 } })]),
    sp('NAT_SPILL_3', 'LNP', NATS, 3, 'Talkback and the base', 'Country talkback loves the idea. The city papers are horrified.', [
      E('Do a week of country radio.', 'Nationals hit country radio', { v: 6, r: { RUR: 0.8 }, m: 1 }),
      E('Do a city press club and reassure business.', 'Nationals reassure business', { v: 7, o: 0.3 }),
      E('Work the phones with wavering Liberals.', 'Nationals work the phones', { v: 8, u: 3 })]),
    sp('NAT_SPILL_4', 'LNP', NATS, 4, 'The joint party room', 'The joint party room votes. You need 50%.', [
      E('Promise a Liberal deputy prime minister.', 'Nationals offer a Liberal deputy', { v: 7, u: 6 }),
      E('Promise a regional infrastructure blitz.', 'Nationals promise a regional blitz', { v: 6, r: { RUR: 0.6, PROV: 0.4 } }),
      E('Promise to win back One Nation voters.', 'Nationals promise to win back One Nation voters', { v: 6, n: { ONP: -0.5 } })], true),
    sp('NAT_SPILL_5', 'LNP', NATS, 5, 'A country leader', 'You lead the Coalition from the Nationals side. Shape the team.', [
      E('Give the Liberals the Treasury and Defence.', 'Liberals get the big portfolios', { u: 16, o: 0.4 }),
      E('Put Nationals in the economic jobs.', 'Nationals take the economy', { u: -12, pp: 18, r: { RUR: 0.6 } }),
      E('Launch a bush jobs and dams plan on day one.', 'Day-one plan for the bush', { r: { RUR: 1.2, PROV: 0.6 }, u: 2, m: 2 })]),
    sp('GRN_SPILL_1', 'GRN', null, 1, 'The party room stirs', 'The Greens are polling well, but some MPs and senators think a new leader would win more House seats.', [
      E('Argue the Greens must win House seats, not just Senate votes.', 'Greens challenger wants House seats', { v: 7, m: 1 }),
      E('Argue the party has gone too far from its roots.', 'Greens challenger calls for a return to roots', { v: 6, u: -3, r: { IN: 0.4 } }),
      E('Argue for a bigger tent: renters, workers and young families.', 'Greens challenger wants a bigger tent', { v: 6, r: { OUT: 0.4 } })]),
    sp('GRN_SPILL_2', 'GRN', null, 2, 'The members', 'Greens members get a say in the party’s direction, and they are restless.', [
      E('Promise members a vote on any deal in a hung parliament.', 'Greens challenger promises members a vote', { v: 9, u: 3 }),
      E('Promise a members’ policy summit after the election.', 'Greens challenger promises a summit', { v: 6, u: 2 }),
      E('Go straight to the members by video.', 'Greens challenger goes to the members', { v: 7, u: -3, m: 2 })]),
    sp('GRN_SPILL_3', 'GRN', null, 3, 'Labor wants to know', 'Labor’s strategists want to know whether you would deal with them in a hung parliament.', [
      E('Say you would deal, on rents and climate.', 'Greens challenger open to a deal', { v: 7, pf: { grn: 2 } }),
      E('Say you would sit on the crossbench and judge each bill.', 'Greens challenger stays independent', { v: 6, u: 3 }),
      E('Say Labor has to earn every vote.', 'Greens challenger warns Labor', { v: 7, r: { IN: 0.5 }, pf: { grn: -1 } })]),
    sp('GRN_SPILL_4', 'GRN', null, 4, 'The party-room ballot', 'The Greens party room votes. You need 50%.', [
      E('Promise the outgoing leader a senior portfolio.', 'Greens challenger offers a unity ticket', { v: 6, u: 8 }),
      E('Promise a campaign about rents and power bills.', 'Greens challenger promises a bread-and-butter campaign', { v: 6, r: { OUT: 0.4 } }),
      E('Promise a campaign about climate and nothing else.', 'Greens challenger promises a climate campaign', { v: 6, r: { IN: 0.5 } })], true),
    sp('GRN_SPILL_5', 'GRN', null, 5, 'Leading the Greens', 'You lead the Greens. Set the tone.', [
      E('Bring every senator into the campaign team.', 'Greens unite behind the new leader', { u: 14, o: 0.3 }),
      E('Pick a small team of target-seat organisers.', 'Greens build a target-seat team', { u: -6, r: { IN: 0.8 } }),
      E('Launch a rent-freeze petition on day one.', 'Day-one rent-freeze petition', { r: { IN: 0.6, OUT: 0.3 }, m: 2 })])
  );

  // ---- honours: one per new leader, and a few across the whole bench
  const isCB = id => (C.leaders.find(l => l.id === id) || {}).cb;
  const played = () => Object.keys((window.CAMPAIGN && window.CAMPAIGN.mastery && window.CAMPAIGN.mastery()) || {});
  ACH.push(
    { id: 'THE_COMEBACK_TRAIL', title: 'The Comeback Trail', cat: 'The whole bench', icon: 'redo', d: 'Form government with any leader coming back from outside parliament.', check: (st, r) => isCB(st.leader) && won(st, r) },
    { id: 'CLASS_REUNION', title: 'Class Reunion', cat: 'The whole bench', icon: 'people', d: 'Finish campaigns with five different comeback leaders.', check: (st, r) => !!r && new Set(played().concat(st.leader).filter(isCB)).size >= 5 },
    { id: 'COUNTRY_PARTY_PM', title: 'A Country Party Prime Minister', cat: 'The whole bench', icon: 'wheat', d: 'Win a Coalition majority with a Nationals leader. The last Country Party prime minister was John McEwen, in 1967–68.', check: (st, r) => (C.leaders.find(l => l.id === st.leader) || {}).sb === 'Nationals' && S(r, 'LNP') >= 76, hard: true },
    { id: 'GREEN_COUP', title: 'Green Coup', cat: 'The whole bench', icon: 'leaf', d: 'Win a Greens leadership spill and then three or more House seats.', check: (st, r) => st.party === 'GRN' && !st.inc && S(r, 'GRN') >= 3 },
    { id: 'THE_FULL_BENCH', title: 'The Full Bench', cat: 'The whole bench', icon: 'people', d: 'Finish a campaign with every leader of one side.', check: (st, r) => { if (!r) return false; const p = new Set(played().concat(st.leader)); return Object.keys(C.PARTIES).some(k => C.leaders.filter(l => l.party === k).every(l => p.has(l.id))); }, hard: true },
    { id: 'EVERY_FACE', title: 'Every Face in the Room', cat: 'The whole bench', icon: 'people', d: 'Finish campaigns with 50 different leaders.', check: (st, r) => !!r && new Set(played().concat(st.leader)).size >= 50, hard: true },
    { id: 'THE_GRAND_TOUR', title: 'The Grand Tour', cat: 'The whole bench', icon: 'pin', d: 'Try 40 different leader-only answers.', check: () => !!window.CAMPAIGN && Object.keys(window.CAMPAIGN.loGet()).length >= 40 }
  );
  // why lines and icons for the new honours
  const why = { CLASS_REUNION: () => 'Five comeback leaders played.', EVERY_FACE: () => '50 leaders played.', THE_GRAND_TOUR: () => '40 leader-only answers tried.' };
  const ICON = {
    sub: '<path class="k" d="M3.5 14c0-2.5 3-4 8.5-4s8.5 1.5 8.5 4-3 4-8.5 4-8.5-1.5-8.5-4zM10 10V7.5h3.5V10M12 7.5V5.5M20.5 14l1.5-2v4z"/>',
    mic: '<path class="k" d="M9.5 4.5h5v8a2.5 2.5 0 0 1-5 0zM7 11.5a5 5 0 0 0 10 0M12 16.5v3M8.5 19.5h7"/>',
    cross: '<path class="k" d="M9.5 4.5h5v5h5v5h-5v5h-5v-5h-5v-5h5z"/>',
    book: '<path class="k" d="M4 6c3-1 6-1 8 1 2-2 5-2 8-1v12c-3-1-6-1-8 1-2-2-5-2-8-1zM12 7v12"/>',
    key: '<circle class="k" cx="8" cy="12" r="3.5"/><path class="k" d="M11.5 12h9M17.5 12v3M20 12v2.5"/>',
    sun: '<circle class="k" cx="12" cy="12" r="3.5"/><path class="k" d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6L18 18M6 18l1.4-1.4M16.6 7.4L18 6"/>',
    pin: '<path class="k" d="M12 20.5s-6-6-6-10a6 6 0 0 1 12 0c0 4-6 10-6 10z"/><circle class="k" cx="12" cy="10.5" r="2.2"/>',
    chair: '<path class="k" d="M7.5 4.5h9v7h-9zM6 11.5h12v3H6zM7.5 14.5v5M16.5 14.5v5"/>',
    abacus: '<path class="k" d="M4.5 4.5h15v15h-15zM4.5 9h15M4.5 14h15"/><circle class="f" cx="8" cy="9" r="1.2"/><circle class="f" cx="11" cy="9" r="1.2"/><circle class="f" cx="15" cy="14" r="1.2"/><circle class="f" cx="9" cy="14" r="1.2"/>',
    curtain: '<path class="k" d="M4 4.5h16M5 4.5c0 6 2 10 5 15M19 4.5c0 6-2 10-5 15M10 19.5h4"/>',
    crane: '<path class="k" d="M6 20V5h1.5v15M4 20h6M7.5 6l12 0M7.5 6l3-2.5M18 6v6M16.5 12h3v2h-3z"/>',
    redo: '<path class="k" d="M18.5 9A7 7 0 1 0 19 13.5M19 5v4h-4"/>',
    hand: '<path class="k" d="M8 12V6.5a1.3 1.3 0 0 1 2.6 0V11M10.6 10.5V5a1.3 1.3 0 0 1 2.6 0v5.5M13.2 10.5V6a1.3 1.3 0 0 1 2.6 0v6M15.8 12V9a1.3 1.3 0 0 1 2.6 0v4.5c0 4-2.5 6.5-6 6.5-3 0-4.5-2-6-4.5l-1.3-2.4a1.3 1.3 0 0 1 2.2-1.3L8 13"/>',
    plane: '<path class="k" d="M3.5 13l7-1 4-7h2l-1.5 7 5.5 1-1 2-5-.5-2.5 5h-2l1-5.5-6.5-.5z"/>',
    atom: '<ellipse class="k" cx="12" cy="12" rx="8.5" ry="3.3"/><ellipse class="k" cx="12" cy="12" rx="8.5" ry="3.3" transform="rotate(60 12 12)"/><ellipse class="k" cx="12" cy="12" rx="8.5" ry="3.3" transform="rotate(-60 12 12)"/><circle class="f" cx="12" cy="12" r="1.3"/>',
    scale: '<path class="k" d="M12 4.5v15M8 19.5h8M5 7.5h14M5 7.5l-2.5 6h5zM19 7.5l-2.5 6h5z"/>',
    house: '<path class="k" d="M4.5 11L12 4.5l7.5 6.5M6.5 9.5v10h11v-10M10 19.5v-5h4v5"/>',
    wave: '<path class="k" d="M3 14c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2M3 18c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2M7 10a5 5 0 0 1 10 0"/>',
    shoe: '<path class="k" d="M4 16.5h6l3-4 5 2.5c1.5.8 2 1.5 2 2.5v1H4zM13 12.5l-1-5h-2.5M7 16.5v3M18 17v2.5"/>',
    wrench: '<path class="k" d="M14.5 4.5a4.5 4.5 0 0 0-4.2 6.1L4.5 16.4l3.1 3.1 5.8-5.8a4.5 4.5 0 0 0 6.1-4.2l-2.6 2.6-2.8-.7-.7-2.8z"/>',
    wheat: '<path class="k" d="M12 20.5V6M12 8.5c-2 0-3-1.5-3-3.5 2 0 3 1.5 3 3.5zM12 8.5c2 0 3-1.5 3-3.5-2 0-3 1.5-3 3.5zM12 12.5c-2 0-3-1.5-3-3.5 2 0 3 1.5 3 3.5zM12 12.5c2 0 3-1.5 3-3.5-2 0-3 1.5-3 3.5zM12 16.5c-2 0-3-1.5-3-3.5 2 0 3 1.5 3 3.5zM12 16.5c2 0 3-1.5 3-3.5-2 0-3 1.5-3 3.5z"/>',
    link: '<path class="k" d="M10 14l4-4M9 11.5l-2.5 2.5a3 3 0 0 0 4.2 4.2L13 16M15 12.5l2.5-2.5a3 3 0 0 0-4.2-4.2L11 8"/>',
    train: '<path class="k" d="M7 4.5h10a1.5 1.5 0 0 1 1.5 1.5v9.5H5.5V6A1.5 1.5 0 0 1 7 4.5zM5.5 10.5h13M8.5 18l-2 2.5M15.5 18l2 2.5M6 15.5l2 2.5h8l2-2.5"/><circle class="f" cx="8.5" cy="13" r=".9"/><circle class="f" cx="15.5" cy="13" r=".9"/>',
    ball: '<circle class="k" cx="12" cy="12" r="7.5"/><path class="k" d="M12 4.5c-2.5 2.5-2.5 12.5 0 15M12 4.5c2.5 2.5 2.5 12.5 0 15M4.5 12h15"/>',
    glove: '<path class="k" d="M7 11V7.5a2.5 2.5 0 0 1 5 0V9h1a4 4 0 0 1 4 4v2.5a4 4 0 0 1-4 4H10a3 3 0 0 1-3-3zM7 11h5M8 19.5v1.5h6v-1.5"/>',
    tree: '<path class="k" d="M12 20.5v-4M12 3.5l-5 7h3l-4 6h12l-4-6h3z"/>',
    spark: '<path class="k" d="M13 3.5l-6 9h4.5l-1.5 8 7-10h-5z"/>',
    leaf: '<path class="k" d="M5 19c0-8 5-13.5 14.5-14-.5 9.5-6 14.5-14 14zM5 19l7-7"/>',
    crown: '<path class="k" d="M4 17.5l1.5-9 4 4L12 6l2.5 6.5 4-4 1.5 9zM4 20.5h16"/>',
    table: '<path class="k" d="M3.5 11h17M5.5 11v8M18.5 11v8M8 11V8.5a1.5 1.5 0 0 1 3 0V11M13 11V8.5a1.5 1.5 0 0 1 3 0V11"/>',
    coin: '<ellipse class="k" cx="12" cy="7" rx="6" ry="2.5"/><path class="k" d="M6 7v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7M6 12v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5"/>',
    people: '<circle class="k" cx="8" cy="8.5" r="2.5"/><circle class="k" cx="16" cy="8.5" r="2.5"/><path class="k" d="M3.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5M11.5 19c0-3 2-5 4.5-5s4.5 2 4.5 5"/>'
  };
  C.extraAch = ACH.map(a => ({ ...a, svg: ICON[a.icon] || ICON.people, why: why[a.id] }));
  C.CB = NEW.filter(l => l.cb).map(l => l.id);
  // factions for historical deputies who are not in the site's faction list (app.js FAC)
  C.FACX = { 'Julia Gillard': 'LL', 'Carmel Tebbutt': 'LL', 'Jacinta Allan': 'LL', 'Steven Miles': 'LL', 'Roger Cook': 'LL', 'Wayne Swan': 'LR' };
})();
// ---- by-elections: leaders who start without a seat in the House win one first, over five questions. The bigger the win, the more
// caucus votes they bring to the leadership challenge (or, for a teal, the more momentum and Political Power they start with).
// Seats follow the sandbox: h = a seat the party holds, its member standing aside; c = a seat held by someone else.
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  C.byElect = {
    stephen_conroy: ['Gellibrand', 'VIC', 'h'], kristina_keneally: ['Barton', 'NSW', 'h'], daniel_andrews: ['Bruce', 'VIC', 'h'], bill_shorten: ['Maribyrnong', 'VIC', 'h'],
    stephen_smith: ['Perth', 'WA', 'h'], kevin_rudd: ['Griffith', 'QLD', 'h'], annastacia_palaszczuk: ['Oxley', 'QLD', 'h'], mark_mcgowan: ['Brand', 'WA', 'h'],
    scott_morrison: ['Cook', 'NSW', 'h'], tony_abbott: ['Warringah', 'NSW', 'c'], dominic_perrottet: ['Bradfield', 'NSW', 'c'], julie_bishop: ['Curtin', 'WA', 'c'],
    gladys_berejiklian: ['Bennelong', 'NSW', 'c'], christopher_pyne: ['Sturt', 'SA', 'c'], steven_marshall: ['Boothby', 'SA', 'c'], campbell_newman: ['Brisbane', 'QLD', 'c'],
    sussan_ley: ['Farrer', 'NSW', 'c'], josh_frydenberg: ['Kooyong', 'VIC', 'c'],
    warren_truss: ['Wide Bay', 'QLD', 'h'], john_barilaro: ['Eden-Monaro', 'NSW', 'c'],
    cory_bernardi: ['Barker', 'SA', 'c'], mark_latham: ['Hunter', 'NSW', 'c'],
    bob_brown: ['Franklin', 'TAS', 'c'], adam_bandt: ['Melbourne', 'VIC', 'c'],
    cathy_mcgowan: ['Indi', 'VIC', 'h'], kerryn_phelps: ['Wentworth', 'NSW', 'h'], simon_holmes_a_court: ['Kooyong', 'VIC', 'h'], malcolm_turnbull: ['Wentworth', 'NSW', 'h']
  };
  // where each race starts, two-candidate preferred for you: a seat your side holds starts ahead, Labor carries a government's by-election swing
  C.byStart = (party, t) => t === 'h' ? (party === 'ALP' ? 53 : 55) : 49;
  // b: points on your two-candidate vote in the seat
  const O = (x, h, e) => ({ x, h, e }), R = (x, h, k, min, ok, no) => ({ x, h, rng: { k, min, ok, no } });
  C.byCards = [
    { t: 'The by-election in {byseat}', qh: 'The sitting member in {byseat} stands aside so you can come back. Locals are wary of being used as a stepping stone.', qc: 'A by-election is called in {byseat}, a seat your side does not hold. You are the candidate, and the comeback starts here.', opts: [
      O('Move into the electorate and knock on doors for a week before the launch.', 'Comeback candidate moves in', { b: 2, u: 1 }),
      R('Launch with the party’s biggest names beside you.', 'Big names turn out for the launch', 'm', 1, { b: 3, m: 1 }, { b: -1 }),
      R('Run on your national profile: make it a vote on the comeback.', 'Candidate makes it a vote on the comeback', 'd', 2, { b: 3 }, { b: -2 })] },
    { t: 'The local issue', q: 'People in {byseat} care most about the local hospital, the roads and their bills, and your opponents got there first.', opts: [
      O('Promise a fully funded upgrade for the local hospital.', 'Candidate promises a hospital upgrade', { b: 2, pp: -5 }),
      O('Hold a town-hall meeting and listen.', 'Candidate holds a town hall', { b: 1, u: 2 }),
      O('Talk about the national leadership instead.', 'Candidate talks about Canberra', { b: -1, m: 1 })] },
    { t: 'The parachute attack', q: 'Your opponents say you do not really live in {byseat} and only want the seat as a stepping stone to the top job.', opts: [
      O('Buy a house in the electorate.', 'Candidate buys a house locally', { b: 1.5, pp: -5 }),
      R('Laugh it off on local radio.', 'Candidate laughs off the attack', 'd', 2, { b: 2, m: 1 }, { b: -1.5 }),
      R('Hit back at your opponent’s record.', 'Candidate hits back', 'm', 2, { b: 2 }, { b: -2, u: -2 })] },
    { t: 'The candidates’ forum', q: 'A packed community hall in {byseat}, the local paper moderating and every candidate on stage.', opts: [
      O('Stick to local promises.', 'Candidate sticks to local promises', { b: 1 }),
      R('Take on your main opponent directly.', 'Candidate takes on the field', 'd', 2, { b: 3 }, { b: -2 }),
      O('Skip it and keep door-knocking.', 'Candidate skips the forum', { b: -1, u: 1 })] },
    { t: 'Polling day in {byseat}', q: 'The booths open at eight. How do you spend the last day?', opts: [
      O('Visit every booth in the electorate.', 'Candidate visits every booth', { b: 1.5 }),
      O('Put every volunteer on the busiest booths.', 'Volunteers flood the big booths', { b: 1 }),
      R('Do late preference deals with the minor candidates.', 'Late preference deals', 'm', 1, { b: 2 }, { b: 0, u: -2 })] }
  ];
  // honours for the by-election
  const ICON = (C.extraAch || []).find(a => a.id === 'THE_COMEBACK_TRAIL'), ic = s => s;
  const add = (id, title, d, check, svg, secret) => C.extraAch.push({ id, title, cat: 'The whole bench', d, check, svg, secret: !!secret, why: st => `You won ${st.by.res.toFixed(1)}% of the two-candidate vote in ${st.by.seat}.` });
  add('BY_ELECTION_LANDSLIDE', 'By-Election Landslide', 'Win your by-election with 60% or more of the two-candidate vote.', st => !!st.by && st.by.res >= 60,
    '<path class="k" d="M4.5 19.5h15M7 19.5v-6h3v6M11 19.5V9h3v10.5M15 19.5V5h3v14.5"/>');
  add('EVERY_VOTE_COUNTS', 'Every Vote Counts', 'Win your by-election with less than 51% of the two-candidate vote.', st => !!st.by && st.by.res >= 50 && st.by.res < 51,
    '<path class="k" d="M6 4.5h12v15H6zM9 9.5l2 2 4-4M9 15h6"/>');
  add('REJECTED_AT_HOME', 'Rejected at Home', 'Lose your by-election, and with it the comeback.', st => !!st.by && st.by.res != null && st.by.res < 50,
    '<path class="k" d="M4.5 11L12 4.5l7.5 6.5M6.5 9.5v10h11v-10M9.5 13l5 5M14.5 13l-5 5"/>', true);
})();
// ---- round 7: comeback baggage, the Coalition agreement for Nationals-led runs, honours, scenario locks and the history books
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const O = (x, h, e) => ({ x, h, e }), R = (x, h, k, min, ok, no) => ({ x, h, rng: { k, min, ok, no } });
  // each comeback leader's past comes back once, mid-campaign. Records are described plainly; options are what you choose to do about them.
  const BAG = [
    ['stephen_conroy', 'ALP', 'The broadband bill', 'Your opponents dig up the cost blowouts on the national broadband network from your time as minister.', [
      O('Defend it: fibre was the right call and the country knows it now.', 'Conroy stands by fibre', { r: { OUT: 0.4 }, m: 1 }), O('Admit the rollout went over budget and say you learned from it.', 'Conroy owns the blowout', { o: 0.2, u: 2 }), O('Change the subject to power bills.', 'Conroy changes the subject', { o: -0.1 })]],
    ['kristina_keneally', 'ALP', 'The state government years', 'An ad campaign replays the last days of the NSW Labor government you led in 2011.', [
      R('Front a long interview about what went wrong.', 'Keneally faces the 2011 ghosts', 'd', 2, { o: 0.4, m: 1 }, { o: -0.5 }), O('Say the party has been cleaned up since.', 'Keneally points to reform', { o: 0.1 }), O('Ignore it.', 'Keneally ignores the ads', { s: { NSW: -0.4 } })]],
    ['daniel_andrews', 'ALP', 'The lockdown files', 'A documentary on Melbourne’s pandemic lockdowns airs in the middle of the campaign.', [
      O('Defend every decision: you kept people alive.', 'Andrews defends the lockdowns', { s: { VIC: -0.5 }, r: { IN: 0.4 }, m: 1 }), O('Say you would do some things differently.', 'Andrews would do it differently', { s: { VIC: 0.3 }, u: -2 }), O('Refuse to relitigate the pandemic.', 'Andrews will not relitigate', { o: -0.2 })]],
    ['bill_shorten', 'ALP', 'The 2019 tapes', 'Commentators replay your 2019 campaign, and the big-target policies that lost it.', [
      O('Say this time the policies are smaller and fully costed.', 'Shorten promises a smaller target', { o: 0.3, u: 2 }), R('Say you were right then and you are right now.', 'Shorten stands by 2019', 'm', 2, { o: 0.4, m: 2 }, { o: -0.6, m: -1 }), O('Make a joke about it.', 'Shorten jokes about 2019', { m: 1 })]],
    ['stephen_smith', 'ALP', 'Where have you been?', 'Voters under thirty have no idea who you are. A street poll goes viral.', [
      O('Do a week of youth radio and podcasts.', 'Smith hits the podcasts', { r: { IN: 0.4 }, pp: -5 }), O('Lean in: the grown-up in the room.', 'Smith is the grown-up', { o: 0.2 }), O('Ignore it.', 'Smith shrugs it off', { m: -1 })]],
    ['kevin_rudd', 'ALP', 'The leadership wars', 'A new book on the Rudd–Gillard years is serialised in the papers during the campaign.', [
      O('Say it is history and the party is united now.', 'Rudd says the wars are over', { u: 3 }), R('Give your own version in a long television interview.', 'Rudd gives his side', 'd', 3, { o: 0.4 }, { o: -0.6, u: -5 }), O('Campaign alongside your old rivals for the cameras.', 'Rudd campaigns with old rivals', { u: 5, o: 0.2, pp: -5 })]],
    ['annastacia_palaszczuk', 'ALP', 'The state record', 'Your opponents attack Queensland’s hospital waits and youth-crime record under your government.', [
      O('Defend your record seat by seat.', 'Palaszczuk defends her record', { s: { QLD: 0.3 } }), O('Admit the hospitals needed more and promise federal money.', 'Palaszczuk promises hospital money', { s: { QLD: 0.5 }, pp: -5 }), O('Blame the federal Coalition years.', 'Palaszczuk blames Canberra', { s: { QLD: -0.2 }, m: 1 })]],
    ['mark_mcgowan', 'ALP', 'The hard border', 'The eastern states remember the WA border closures, and the ads say so.', [
      O('Say you kept the West safe and would do it again.', 'McGowan would close the border again', { s: { WA: 0.6, VIC: -0.4, NSW: -0.4 } }), O('Acknowledge the families kept apart.', 'McGowan acknowledges the cost', { s: { NSW: 0.3, VIC: 0.3, WA: -0.2 } }), O('Talk about the WA economy instead.', 'McGowan talks about the economy', { o: 0.1 })]],
    ['scott_morrison', 'LNP', 'The extra ministries', 'The story of the ministries you were sworn into without telling cabinet comes back as an attack ad.', [
      O('Apologise again, plainly.', 'Morrison apologises again', { o: 0.3, u: 2 }), R('Explain why you did it.', 'Morrison explains himself', 'd', 3, { o: 0.2 }, { o: -0.8, r: { IN: -0.6 } }), O('Refuse to discuss it.', 'Morrison refuses to discuss it', { o: -0.4, m: -1 })]],
    ['tony_abbott', 'LNP', 'The 2014 budget', 'Labor’s ads replay the 2014 budget cuts to health and schools.', [
      O('Say the budget repair was needed and you would do it again.', 'Abbott stands by 2014', { r: { OUT: -0.4 }, u: 3 }), O('Promise no cuts to health or schools this time.', 'Abbott rules out cuts', { o: 0.4 }), O('Attack Labor’s spending instead.', 'Abbott attacks Labor spending', { m: 1, r: { OUT: 0.2 } })]],
    ['dominic_perrottet', 'LNP', 'Losing New South Wales', 'Your opponents point out you lost the 2023 state election.', [
      O('Say you learned how to win from losing.', 'Perrottet learned from losing', { o: 0.2 }), O('Point to the state budget you balanced.', 'Perrottet points to his budgets', { r: { OUT: 0.3 } }), O('Blame the national mood at the time.', 'Perrottet blames the mood', { s: { NSW: -0.3 } })]],
    ['julie_bishop', 'LNP', 'The 2018 spill', 'Old colleagues brief the press about how few votes you won in the 2018 leadership ballot.', [
      O('Laugh it off: this time the voters decide.', 'Bishop laughs off 2018', { m: 1 }), O('Make peace with the conservatives in public.', 'Bishop makes peace', { u: 5, r: { IN: -0.2 } }), R('Name the people who briefed against you.', 'Bishop names names', 'd', 3, { r: { IN: 0.6 }, m: 2 }, { u: -8 })]],
    ['gladys_berejiklian', 'LNP', 'The corruption commission findings', 'Your opponents replay the NSW anti-corruption commission’s 2023 findings about your conduct as premier.', [
      O('Say you respect the commission and have moved on.', 'Berejiklian says she has moved on', { o: 0.1 }), R('Give a long interview about what happened.', 'Berejiklian gives her account', 'd', 3, { o: 0.4, m: 1 }, { o: -0.8 }), O('Promise a stronger federal integrity regime.', 'Berejiklian promises integrity reform', { r: { IN: 0.4 } })]],
    ['christopher_pyne', 'LNP', 'The insider', 'Reporters dig into your consulting work for defence companies since you left parliament.', [
      O('Publish every client.', 'Pyne publishes his clients', { r: { IN: 0.4 }, pp: -5 }), O('Say it is why you know how to build ships.', 'Pyne defends his consulting', { s: { SA: 0.3 } }), O('Refuse to comment.', 'Pyne refuses to comment', { o: -0.3 })]],
    ['steven_marshall', 'LNP', 'Losing South Australia', 'Labor reminds voters you lost the 2022 state election heavily.', [
      O('Say the state result was about the pandemic.', 'Marshall blames the pandemic', { s: { SA: -0.2 } }), O('Point to the jobs your government brought to Adelaide.', 'Marshall points to jobs', { s: { SA: 0.5 } }), O('Campaign everywhere except Adelaide.', 'Marshall avoids Adelaide', { s: { SA: -0.4 }, r: { RUR: 0.3 } })]],
    ['campbell_newman', 'LNP', 'The 2015 rout', 'Queensland remembers your government losing after one term, and its public-service cuts.', [
      O('Say you were too fast, and you have learned.', 'Newman says he has learned', { s: { QLD: 0.4 } }), O('Stand by every cut.', 'Newman stands by the cuts', { s: { QLD: -0.4 }, u: 3 }), O('Change the subject to crime.', 'Newman talks about crime', { r: { OUT: 0.3 } })]],
    ['warren_truss', 'LNP', 'Yesterday’s man', 'The papers ask why the Coalition has gone back to a leader who retired in 2016.', [
      O('Say experience is what the bush needs.', 'Truss runs on experience', { r: { RUR: 0.4 } }), O('Promise to hand over within two years.', 'Truss promises a handover', { u: 4, o: -0.2 }), O('Ignore it.', 'Truss ignores the question', { m: -1 })]],
    ['john_barilaro', 'LNP', 'The New York job', 'An old inquiry into your appointment as a trade commissioner in New York is back in the news.', [
      O('Say you withdrew from the job and did nothing wrong.', 'Barilaro defends himself', { o: 0.1 }), R('Go on the attack against the media.', 'Barilaro attacks the press', 'm', 2, { r: { RUR: 0.5 }, m: 1 }, { o: -0.6 }), O('Promise a public register of all appointments.', 'Barilaro promises an appointments register', { r: { IN: 0.3 } })]],
    ['cory_bernardi', 'ONP', 'The party you left', 'The Liberals remind voters you quit them to start a party that folded.', [
      O('Say the Liberals left you.', 'Bernardi says the Liberals left him', { n: { LNP: -0.3 }, u: 2 }), O('Say this time you are joining, not founding.', 'Bernardi joins, not founds', { u: 4 }), O('Ignore it.', 'Bernardi ignores it', { m: -1 })]],
    ['mark_latham', 'ONP', 'The old posts', 'Your opponents compile your most inflammatory social-media posts into an ad.', [
      O('Apologise for the worst of them.', 'Latham apologises', { o: 0.3, u: -3 }), R('Double down on all of them.', 'Latham doubles down', 'm', 3, { r: { OUT: 0.6 }, m: 2 }, { o: -0.8, r: { IN: -0.6 } }), O('Delete your accounts for the campaign.', 'Latham logs off', { m: -1, o: 0.2 })]],
    ['bob_brown', 'GRN', 'The arrests', 'Footage of your old forest-protest arrests is everywhere, used by both supporters and opponents.', [
      O('Wear it with pride.', 'Brown wears it with pride', { r: { IN: 0.5, RUR: -0.4 } }), O('Say you would do it again, peacefully.', 'Brown would do it again', { r: { IN: 0.3 } }), O('Talk about rents instead.', 'Brown talks about rents', { r: { OUT: 0.2 } })]],
    ['adam_bandt', 'GRN', 'Losing Melbourne', 'Labor reminds voters you lost your own seat in 2025.', [
      O('Say you listened and learned.', 'Bandt says he listened', { s: { VIC: 0.3 } }), O('Blame the boundaries and the preference deals.', 'Bandt blames the boundaries', { u: 2, o: -0.1 }), O('Promise to door-knock every street yourself.', 'Bandt hits every door', { s: { VIC: 0.5 }, pp: -5 })]],
    ['cathy_mcgowan', 'IND', 'Why come back?', 'You retired in 2019 and handed Indi on. Locals ask why you are back.', [
      O('Say the movement asked you to.', 'McGowan answers the call', { u: 3 }), O('Say this is your last campaign.', 'McGowan’s last campaign', { m: 1 }), O('Let Helen Haines answer for you.', 'Haines answers for McGowan', { r: { RUR: 0.3 } })]],
    ['kerryn_phelps', 'IND', 'One term and out', 'You won Wentworth at a by-election and lost it seven months later. The papers say voters tried you once.', [
      O('Say you did more in seven months than most do in seven years.', 'Phelps defends her term', { r: { IN: 0.4 } }), O('Say the movement is bigger now.', 'Phelps points to the movement', { m: 1 }), O('Ignore it.', 'Phelps ignores it', { m: -1 })]],
    ['simon_holmes_a_court', 'IND', 'The money man', 'Your opponents call you the billionaire’s son buying seats, and want every Climate 200 donor named.', [
      O('Publish every donor and every dollar.', 'Holmes à Court opens the books', { r: { IN: 0.5 }, pp: -5 }), O('Say grassroots donors outnumber the big ones.', 'Holmes à Court points to small donors', { o: 0.1 }), R('Turn it on the major parties’ own donors.', 'Holmes à Court hits back on donations', 'm', 2, { m: 2, r: { IN: 0.4 } }, { o: -0.5 })]],
    ['malcolm_turnbull', 'IND', 'The man who was knifed', 'The Liberals’ old wounds from 2018 reopen as you campaign against your former party.', [
      O('Say you are fighting for the values the party left behind.', 'Turnbull fights for old values', { r: { IN: 0.6 }, u: -2 }), O('Refuse to talk about 2018.', 'Turnbull will not talk about 2018', { o: -0.1 }), R('Name the people who brought you down.', 'Turnbull names names', 'd', 3, { m: 2, r: { IN: 0.5 } }, { o: -0.6, u: -5 })]]
  ];
  BAG.forEach(([id, party, t, q, opts]) => C.cards.push({ id: 'BAG_' + id.toUpperCase(), party, only: id, minTurn: 8, tag: 'CRISIS', t, q, opts }));
  // the Coalition agreement: in a Nationals-led run the Liberal party room has to be kept on side as well
  const nat = C.spill.filter(c => /^NAT_SPILL_[25]$/.test(c.id));
  nat.forEach(c => { if (c.id === 'NAT_SPILL_2') { c.opts[0].e.pact = 10; c.opts[1].e.pact = 6; c.opts[2].e.pact = -15; } else { c.opts[0].e.pact = 12; c.opts[1].e.pact = -12; } });
  // a by-election winner who holds the seat at the general election
  C.extraAch.push({ id: 'HOLD_THE_LINE', title: 'Hold the Line', cat: 'By-elections and comebacks', d: 'Win your by-election, then hold the seat at the general election.', check: (st, r) => !!st.by && st.by.res >= 50 && !!r && r.leaderSeatWon === true,
    svg: '<path class="k" d="M4.5 11L12 4.5l7.5 6.5M6.5 9.5v10h11v-10M9.5 14.5l2 2 3.5-4"/>', why: st => `You won ${st.by.seat} twice: at the by-election with ${st.by.res.toFixed(1)}%, and again on election night.` });
  // openings unlock with honours (the standard start and the easy one are always open)
  C.scenLock = { teal: 3, security: 5, ratehike: 7, housing: 9, blackout: 11, climate: 13, migration: 15, surge: 18, drought: 21, budget: 24, hung: 27, scandal: 30, siege: 34, honeymoon: 40 };
  C.scenarios.sort((a, b) => (C.scenLock[a.id] || 0) - (C.scenLock[b.id] || 0));
  // the history books: House seats won at each federal election since 1949 (two-party results; seat totals for the House at the time)
  C.HIST = [[1949, 121, 47, 74], [1951, 121, 52, 69], [1954, 121, 57, 64], [1955, 122, 47, 75], [1958, 122, 45, 77], [1961, 122, 60, 62], [1963, 122, 50, 72], [1966, 124, 41, 82],
    [1969, 125, 59, 66], [1972, 125, 67, 58], [1974, 127, 66, 61], [1975, 127, 36, 91], [1977, 124, 38, 86], [1980, 125, 51, 74], [1983, 125, 75, 50], [1984, 148, 82, 66], [1987, 148, 86, 62],
    [1990, 148, 78, 69], [1993, 147, 80, 65], [1996, 148, 49, 94], [1998, 148, 67, 80], [2001, 150, 65, 82], [2004, 150, 60, 87], [2007, 150, 83, 65], [2010, 150, 72, 72], [2013, 150, 55, 90],
    [2016, 150, 69, 76], [2019, 151, 68, 77], [2022, 151, 77, 58], [2025, 150, 94, 43]];
})();
// ---- round 8: early voting, a world event, a late scandal, mastery and opening honours
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const R = (x, h, k, min, ok, no) => ({ x, h, rng: { k, min, ok, no } }), O = (x, h, e) => ({ x, h, e });
  // early voting: bank your supporters' votes before anything can go wrong in the last days
  C.decisions.push({ id: 'DEC_EARLY_VOTE', n: 'Early-voting drive', from: 16, cost: 20, cd: 3, max: 2,
    d: 'Volunteers get your supporters to the pre-poll centres. Each drive banks another 12% of your vote, which later bad news can no longer touch (up to 24%).', e: { bank: 0.12 } });
  // something happens overseas in week 3 or 4. The government acts; everyone else responds.
  const gov = (tag) => [
    R('Suspend the campaign for a day and lead the national response.', 'Prime Minister suspends the campaign to lead the response', 'd', 2, { o: 0.7, m: 2 }, { o: -0.3 }),
    O('Keep campaigning and send ministers to handle it.', 'Ministers handle the crisis as the campaign rolls on', { o: 0.1 }),
    R('Say the crisis shows why experience matters.', 'Government says the crisis proves experience counts', 'm', 2, { o: 0.4, m: 1 }, { o: -0.6, m: -1 })];
  const opp = (tag) => [
    O('Offer the government bipartisan support and pause your attacks.', 'Bipartisan support offered as the crisis unfolds', { o: 0.3, u: 2 }),
    R('Set out calmly what you would do differently.', 'An alternative response, set out calmly', 'd', 2, { o: 0.5, m: 1 }, { o: -0.4 }),
    R('Attack the government’s handling of it.', 'Attacks on the government’s handling', 'm', 3, { o: 0.5, m: 2 }, { o: -0.9, m: -2 })];
  C.world = [
    { t: 'A tsunami in the Pacific', tag: 'NATIONAL_SECURITY', q: 'A tsunami has hit three Pacific neighbours. Australian aid flights are leaving tonight, and the campaign stops to watch.' },
    { t: 'Tariffs from Washington', tag: 'ECONOMY', q: 'The United States slaps steep tariffs on Australian beef, aluminium and wine. Exporters want to know what happens next.' },
    { t: 'A stand-off at sea', tag: 'NATIONAL_SECURITY', q: 'Warships face off in the South China Sea, and an Australian frigate is nearby. The region is on edge.' },
    { t: 'A crash on Wall Street', tag: 'ECONOMY', q: 'Global markets fall sharply overnight. Super balances are down and the dollar is sliding.' }
  ].map(w => ({ ...w, gov: gov(w.tag), opp: opp(w.tag) }));
  // a late scandal in the final days: early votes already banked are safe from it
  C.special.LATE = { id: 'LATE', t: 'The late scandal', k: 'Three days out', tag: 'CRISIS', q: 'A story breaks about one of your candidates, three days before polling day. Plenty of your voters have already voted.', opts: [
    O('Disendorse the candidate at once.', 'Candidate dumped three days out', { o: -0.3, u: -3 }),
    R('Stand by them until the facts are known.', 'Leader stands by candidate', 'm', 2, { o: 0 }, { o: -1.2, m: -2 }),
    O('Bury it with a big announcement.', 'A big announcement to change the story', { o: -0.6, pp: -10, m: 1 })] };
  // mastery across a whole side
  const side = L => L.sb === 'Nationals' ? 'NAT' : L.party, M = window.CAMPAIGN_DATA;
  const masters = [['ALP', 'LIGHT_ON_THE_HILL', 'The Light on the Hill', 'Labor'], ['LNP', 'FORGOTTEN_PEOPLE', 'The Forgotten People, Remembered', 'Liberal'], ['NAT', 'COUNTRY_FIRST', 'Country First', 'Nationals'],
    ['ONP', 'THE_WHOLE_INSURGENCY', 'The Whole Insurgency', 'One Nation'], ['GRN', 'THE_WHOLE_GREEN_TEAM', 'The Whole Green Team', 'Greens'], ['IND', 'EVERY_VOICE', 'Every Voice', 'teal']];
  masters.forEach(([sd, id, title, nm]) => C.extraAch.push({ id, title, part: 'The campaign', cat: 'Collections and challenges', hard: true,
    d: `Reach the top tier with every ${nm} leader.`, svg: '<path class="k" d="M12 3.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9l-4.8 2.5.9-5.4-3.9-3.8 5.4-.8z"/><path class="k" d="M7 21h10"/>',
    check: (st, r) => { if (!r || !window.CAMPAIGN) return false; const m = window.CAMPAIGN.mastery(); if (st.tier) m[st.leader] = Math.min(m[st.leader] == null ? 9 : m[st.leader], st.tier.k);
      const ls = M.leaders.filter(L => side(L) === sd); return ls.length > 0 && ls.every(L => m[L.id] === 0); },
    why: () => `Top tier with all ${M.leaders.filter(L => side(L) === sd).length} ${nm} leaders.` }));
  // winning from each opening
  const wonIt = (st, r) => !!r && (r.gov === st.party || (C.PARTIES[st.party].cross && !!st.tier && st.tier.k <= 1));
  [['ratehike', 'RATES_UP_VOTE_UP', 'Rates Up, Vote Up'], ['blackout', 'LIGHTS_BACK_ON', 'Lights Back On'], ['surge', 'WEATHERING_THE_SURGE', 'Weathering the Surge'],
   ['hung', 'OUT_OF_THE_FOG', 'Out of the Fog'], ['siege', 'OVER_THE_WALLS', 'Over the Walls'], ['teal', 'AFTER_THE_TEAL_SUMMER', 'After the Teal Summer'],
   ['security', 'STEADY_HANDS', 'Steady Hands'], ['housing', 'RENT_RELIEF', 'Rent Relief'], ['climate', 'AFTER_THE_FIRES', 'After the Fires'], ['migration', 'TURNING_THE_TIDE', 'Turning the Tide'],
   ['drought', 'RAIN_ON_THE_PLAINS', 'Rain on the Plains'], ['budget', 'BALANCING_THE_BOOKS', 'Balancing the Books'], ['scandal', 'SURVIVED_DAY_ONE', 'Survived Day One']].forEach(([sc, id, title]) => {
    const S = (C.scenarios || []).find(x => x.id === sc) || { n: sc };
    C.extraAch.push({ id, title, part: 'The campaign', cat: 'Openings', d: `Start from “${S.n}” and win: form government, or reach your side’s top two tiers on the crossbench.`,
      svg: '<path class="k" d="M4 19.5h16M6 19.5V9l6-4.5L18 9v10.5M10 19.5v-5h4v5"/><path class="k" d="M12 4.5V2.5M12 2.5l3 1.2-3 1"/>', check: (st, r) => st.scen === sc && wonIt(st, r), why: (st, r) => `You won from “${S.n}”.` }); });
})();
// ---- tighter card wording for the longest perks (same effects, fewer words, so every trading card fits)
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const T = {
    'Chris Bowen': [['COP31 statesman', '+1 on energy and security checks; +4 Political Power a turn during the clean-energy boom.'], ['Power-bill lightning rod', 'Energy setbacks 35% harder in provincial and rural seats; tax scares twice as hard.']],
    'Malcolm Roberts': [null, ['Unvetted ticket', 'Candidate scandals hit 2.5× as hard; preferences 4 points weaker to the Coalition; spill starts on 36%; −10 unity without Hanson’s blessing.']],
    'Mark Latham': [['L plates', 'Debate skill 0; no Political Power bonus.'], ['Off message', 'Spill starts on 12%; −20 unity (−6 with Hanson’s blessing); unity drifts down 3 a turn; 85% chance of an off-message clash each week.']],
    'Barnaby Joyce': [['New England kingmaker', '+4 Political Power a turn from rural donors; spill starts on 45%.'], ['Founder schism', '−14 unity unless the founder blesses you after the spill.']],
    'Matt Canavan': [['Mates with the miners', 'Rural and provincial setbacks 30% softer; One Nation preferences 4 points stronger.'], ['Climate sceptic', 'Inner-metro setbacks 50% harder; teal-seat preferences 4 points weaker.']],
    'Pauline Hanson': [null, ['Two alphas', 'Unity drifts down 1 a turn; a 20% chance each week of an off-message clash.']],
    'Bob Brown': [null, ['The old campaigner', 'Your choices move your vote 30% less, for better or worse; rural and provincial setbacks 50% harder.']]
  };
  C.leaders.forEach(L => { const t = T[L.name]; if (!t) return; if (t[0]) L.plus = t[0]; if (t[1]) L.minus = t[1]; });
})();
