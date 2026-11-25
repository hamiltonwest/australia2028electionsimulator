// Campaign mode achievements: 71 here, plus one for each leader added in campaign-data4.js, saved in this browser only (localStorage).
// Checks get the campaign state (st) and, on election night, the result (r); mid-run r is null.
window.CAMPAIGN_ACH = (() => {
  const KEY = 'es2028_campaign_achievements_v1';
  const sp = (st, ...ids) => ids.some(id => st.spirits.includes(id));
  const S = (r, p) => (r && r.seats[p]) || 0;
  const won = (st, r) => !!r && r.gov === st.party;
  const L = [
    // landslides and historic wins
    ['CENTURY_CLUB', 'The Century Club', 'Landslides', '', 'As Labor, win 100 House seats. No party has ever reached triple figures; the record is 94.', 0, (st, r) => st.party === 'ALP' && S(r, 'ALP') >= 100],
    ['MENZIES_REBORN', 'Surpassing Howard', 'Landslides', '', 'As the Coalition, win 95 or more seats, beating the 94 John Howard won in 1996.', 0, (st, r) => st.party === 'LNP' && S(r, 'LNP') >= 95],
    ['FRASER_PROPORTION', 'The Fraser Landslide', 'Landslides', '', 'Win 108 seats: Malcolm Fraser’s 1975 share of the House (91 of 127), scaled to today’s 150.', 0, (st, r) => S(r, st.party) >= 108],
    ['FIFTY_SEVEN_PERCENT_2PP', 'Record Two-Party Vote', 'Landslides', '', 'Win 57% of the Labor v Coalition two-party vote, above Harold Holt’s 1966 high of about 56.9%.', 0, (st, r) => !!r && ((st.party === 'ALP' && r.tpp >= 57) || (st.party === 'LNP' && 100 - r.tpp >= 57))],
    ['MIRACLE_ON_MACQUARIE', 'From the Rubble', 'Landslides', '', 'Take the Coalition from 2025’s 43 seats to a 76-seat majority in a single term.', 0, (st, r) => st.party === 'LNP' && S(r, 'LNP') >= 76],
    ['ONE_NATION_OFFICIAL_OPPOSITION', 'His Majesty’s Opposition', 'Landslides', '', 'As One Nation, win 25+ seats and beat the Coalition on seats and first preferences.', 0, (st, r) => st.party === 'ONP' && !!r && S(r, 'ONP') >= 25 && S(r, 'ONP') > S(r, 'LNP') && r.nat.ONP > r.nat.LNP],
    ['ONE_NATION_MAJORITY', 'Please Explain This Landslide', 'Landslides', '', 'Win an outright majority as One Nation, three decades after “please explain”.', 0, (st, r) => st.party === 'ONP' && S(r, 'ONP') >= 76],
    ['SEVENTY_SIX_AND_A_PRAYER', '76 and a Prayer', 'Landslides', '', 'Win a majority with exactly 76 seats, as Malcolm Turnbull did in 2016.', 0, (st, r) => !!r && S(r, st.party) === 76],
    // wipeouts and heartbreak
    ['WHITLAMS_GHOST', 'Whitlam’s Ghost', 'Wipeouts', '', 'As Labor, collapse to 45 seats or fewer, echoing 1975 when Whitlam’s Labor fell to 36.', 0, (st, r) => !!r && st.party === 'ALP' && S(r, 'ALP') <= 45],
    ['RUMP_PARLIAMENT', 'Half the Party Room', 'Wipeouts', '', 'As the Coalition, lose half of the 43 seats you won in 2025: finish on 22 or fewer.', 0, (st, r) => !!r && st.party === 'LNP' && S(r, 'LNP') <= 22],
    ['CANADIAN_1993', 'Overtaken on the Right', 'Wipeouts', '', 'As the Coalition, finish behind One Nation on seats and first preferences.', 0, (st, r) => !!r && st.party === 'LNP' && S(r, 'LNP') < S(r, 'ONP') && r.nat.LNP < r.nat.ONP],
    ['FLASH_IN_THE_PAN', '1998 All Over Again', 'Wipeouts', '', 'As One Nation, win no House seats, as in 1998 when 8.4% of the vote won the party none.', 0, (st, r) => !!r && st.party === 'ONP' && S(r, 'ONP') === 0],
    ['PORTILLO_MOMENT', 'The Bennelong Special', 'Wipeouts', '', 'Lose your own seat on election night, as John Howard lost Bennelong in 2007.', 0, (st, r) => !!r && r.leaderSeatWon === false],
    ['PYRRHIC_VICTORY', 'PM Without a Seat', 'Wipeouts', '', 'Win government but lose your own seat. It has never happened federally.', 1, (st, r) => won(st, r) && r.leaderSeatWon === false],
    ['SO_CLOSE_YET_SO_FAR', 'Beazley’s Curse', 'Wipeouts', '', 'Win 50.5% or more of the two-party vote and still lose, as Kim Beazley did in 1998.', 0, (st, r) => !!r && !won(st, r) && S(r, st.party) >= 60 && ((st.party === 'ALP' && r.tpp >= 50.5) || (st.party === 'LNP' && 100 - r.tpp >= 50.5))],
    // leader runs
    ['ALBO_THREE_PEAT', 'The Three-Peat', 'Leaders', '', 'As Anthony Albanese, win a third straight term with 90+ seats. Labor last won three in a row under Bob Hawke.', 0, (st, r) => st.leader === 'anthony_albanese' && S(r, 'ALP') >= 90],
    ['TREASURERS_TRIUMPH', 'Doing a Keating', 'Leaders', '', 'As Jim Chalmers, go from Treasury to The Lodge by spill, clear the 4.85% squeeze and win a majority.', 0, (st, r) => st.leader === 'jim_chalmers' && S(r, 'ALP') >= 76 && !sp(st, 'RBA_485_SQUEEZE', 'RBA_STAGFLATION_CRISIS')],
    ['GREEN_LABOR_COALITION', 'The New Accord', 'Leaders', '', 'As Tanya Plibersek, sign an accord with the Greens and still win an outright majority.', 0, (st, r) => st.leader === 'tanya_plibersek' && S(r, 'ALP') >= 76 && st.flags.includes('GREENS_DEAL_SIGNED')],
    ['ROAD_TO_DAMASCUS', 'Road to Damascus', 'Leaders', '', 'As Chris Bowen, the climate minister, scrap Net Zero and still win a Labor majority.', 0, (st, r) => st.leader === 'chris_bowen' && st.flags.includes('SCRAPPED_NET_ZERO') && S(r, 'ALP') >= 76],
    ['COP31_MANDATE', 'Superpower Mandate', 'Leaders', '', 'As Chris Bowen, win a majority with the clean-energy boom running: a mandate for the renewable-energy superpower.', 0, (st, r) => st.leader === 'chris_bowen' && S(r, 'ALP') >= 76 && sp(st, 'FUTURE_MADE_IN_AUSTRALIA_BOOM')],
    ['TEAL_REVIVAL_ANGUS', 'Teal Reclaimer', 'Leaders', '', 'As Angus Taylor, win back four of the six inner-city seats the Liberals lost to teals since 2019.', 0, (st, r) => st.leader === 'angus_taylor' && !!r && r.tealLNP >= 4],
    ['IRON_AND_STEEL', 'Iron and Steel', 'Leaders', '', 'As Andrew Hastie, win a Coalition majority while holding One Nation under 5 seats.', 0, (st, r) => st.leader === 'andrew_hastie' && S(r, 'LNP') >= 76 && !!r && S(r, 'ONP') < 5],
    ['BLUE_RIBBON_REVIVAL', 'Menzies’ Heartland', 'Leaders', '', 'As Josh Frydenberg, win a Coalition majority with 22+ Victorian seats. Kooyong was Menzies’ seat.', 0, (st, r) => st.leader === 'josh_frydenberg' && S(r, 'LNP') >= 76 && ((r.st.VIC || {}).LNP || 0) >= 22],
    ['GOLDSTEIN_COUP', 'The Goldstein Coup', 'Leaders', '', 'As Tim Wilson, take the leadership in a spill and form government.', 0, (st, r) => st.leader === 'tim_wilson' && !!r && r.gov === 'LNP'],
    ['TEAL_EXTINCTION', 'Teal Extinction', 'Leaders', '', 'As Tim Wilson, win all six inner-city teal seats for the Liberals.', 0, (st, r) => st.leader === 'tim_wilson' && !!r && r.tealLNP >= 6],
    ['HANSON_JOYCE_JUGGERNAUT', 'Thirty Years in the Making', 'Leaders', '', 'As Pauline Hanson, win 35+ House seats, three decades after founding One Nation in 1997.', 0, (st, r) => st.leader === 'pauline_hanson' && S(r, 'ONP') >= 35],
    ['ET_TU_BARNABY', 'Et Tu, Barnaby?', 'Leaders', '', 'As Barnaby Joyce, win the One Nation spill and 20+ seats. He has won a party-room spill before, in 2021.', 0, (st, r) => st.leader === 'barnaby_joyce' && S(r, 'ONP') >= 20],
    ['EMPIRICAL_PROOF', 'Empirical Proof', 'Leaders', '', 'As Malcolm Roberts, win the spill, pass the costings cleanly and win 20+ seats. Show the evidence.', 0, (st, r) => st.leader === 'malcolm_roberts' && st.flags.includes('PASSED_PBO_CLEAN') && S(r, 'ONP') >= 20],
    // geography
    ['QUEENSLANDER', 'Sunshine State Sweep', 'Geography', '', 'Win 26 of Queensland’s 30 seats.', 0, (st, r) => !!r && ((r.st.QLD || {})[st.party] || 0) >= 26],
    ['FORTRESS_VICTORIA', 'Fortress Victoria', 'Geography', '', 'Win 30 of Victoria’s 38 seats.', 0, (st, r) => !!r && ((r.st.VIC || {})[st.party] || 0) >= 30],
    ['KING_OF_THE_BUSH', 'King of the Bush', 'Geography', '', 'Win 85% of the rural seats, the Nationals’ heartland.', 0, (st, r) => !!r && (r.rg.Rural[st.party] || 0) / r.rg.Rural.total >= 0.85],
    ['DONUT_GOVERNMENT', 'The Donut Majority', 'Geography', '', 'Win a majority without a single inner-metropolitan seat.', 1, (st, r) => S(r, st.party) >= 76 && (r.rg['Inner Metro'][st.party] || 0) === 0],
    ['KINGMAKER_OF_CANBERRA', 'Kingmakers of Canberra', 'Geography', '', 'As One Nation, force a hung parliament with 6+ seats, as the 2010 crossbench did.', 0, (st, r) => st.party === 'ONP' && !!r && r.hung && S(r, 'ONP') >= 6],
    ['MINORITY_TIGHTROPE', 'Gillard’s Tightrope', 'Geography', '', 'Form a minority government on 65 to 75 seats, as Julia Gillard did on 72 in 2010.', 0, (st, r) => !!r && r.hung && r.gov === st.party && S(r, st.party) >= 65 && S(r, st.party) <= 75],
    // intrigue, unity, spirits
    ['SKIN_OF_YOUR_TEETH', 'By a Single Vote', 'Intrigue', '', 'Win a leadership spill on 50% or 51%, as Tony Abbott beat Malcolm Turnbull 42–41 in 2009.', 0, st => !st.inc && st.spillWon && st.votes >= 50 && st.votes <= 51],
    ['THIRTY_NEWSPOLLS', '30 Newspolls in a Row', 'Intrigue', '', 'Get rolled by your own party room in the middle of the campaign. Malcolm Turnbull cited Tony Abbott’s 30 straight Newspoll losses when he challenged him in 2015.', 0, st => st.phase === 'FAILED' && st.failWhy === 'rolled'],
    ['GOOD_GOVERNMENT', 'Good Government Starts Today', 'Intrigue', '', 'Face down a mid-campaign leadership challenge by winning the snap party-room vote, as Tony Abbott did against a spill motion in February 2015.', 0, st => st.flags.includes('SPEC_SURVIVED')],
    ['IRON_CAUCUS', 'Iron Discipline', 'Intrigue', '', 'Finish a campaign without caucus unity ever falling below 80.', 0, (st, r) => !!r && st.minUnity >= 80],
    ['BRINK_OF_REVOLT', 'Survived the Backbench', 'Intrigue', '', 'Let caucus unity fall below 20 and still win government.', 1, (st, r) => won(st, r) && st.minUnity < 20],
    ['PP_HOARDER', 'War Chest Unspent', 'Intrigue', '', 'Win government with 150 or more Political Power unspent.', 0, (st, r) => won(st, r) && st.pp >= 150],
    ['INFLATION_SLAYER', 'Inflation Slayer', 'Policy', '', 'Clear the 4.85% cash-rate spirit entirely by polling day.', 0, (st, r) => !!r && !sp(st, 'RBA_485_SQUEEZE', 'RBA_STAGFLATION_CRISIS', 'RBA_RATE_RELIEF_HORIZON')],
    ['YIMBY_IN_CHIEF', '1.2 Million Homes', 'Policy', '', 'Clear the housing-shortfall spirit entirely: the National Housing Accord target, delivered.', 0, (st, r) => !!r && !sp(st, 'HOUSING_SHORTFALL_400K', 'HOUSING_REVOLT', 'HOUSING_ACCORD_TRACTION')],
    ['RESTORED_TRUST', 'Death of Cynicism', 'Policy', '', 'Clear the Canberra-cynicism spirit entirely by polling day.', 0, (st, r) => !!r && !sp(st, 'ANTI_ESTABLISHMENT_CYNICISM', 'THROW_THE_BUMS_OUT', 'CAUTIOUS_REENGAGEMENT')],
    ['CLEAN_SWEEP_SPIRITS', 'The Light on the Hill', 'Policy', '', 'Finish with no negative national spirits left, in the spirit of Ben Chifley’s 1949 speech.', 1, (st, r) => !!r && st.spirits.every(id => (window.CAMPAIGN_DATA.spirits[id] || {}).tier >= 0)],
    // ---- round 5: hung parliaments, the Senate, the debate, doorstops, backflips, promises, endorsements, targets, the new sides
    ['SEVENTEEN_DAYS', 'Seventeen Days', 'Hung parliament', '', 'As a crossbench party, decide which side governs a hung parliament. In 2010 the independents took 17 days to choose.', 0, (st, r) => !!r && !!r.neg && r.neg.mode === 'king' && r.neg.out && r.neg.out.kingOk && r.neg.out.back === r.gov],
    ['CONFIDENCE_AND_SUPPLY', 'Confidence and Supply', 'Hung parliament', '', 'Reach 76 on the floor of the House with written crossbench agreements, and govern.', 0, (st, r) => !!r && !!r.neg && r.neg.mode === 'form' && r.gov === st.party && r.neg.out && r.neg.out.floor],
    ['NO_DEALS', 'No Deals', 'Hung parliament', '', 'Form government in a hung parliament without offering anyone a full deal.', 0, (st, r) => !!r && !!r.neg && r.neg.mode === 'form' && r.gov === st.party && r.neg.out && !r.neg.out.full],
    ['PRICE_OF_POWER', 'The Price of Power', 'Hung parliament', '', 'Offer full deals to three or more crossbench groups to stay in power.', 0, (st, r) => !!r && !!r.neg && r.neg.out && r.neg.out.full >= 3],
    ['LEFT_AT_THE_ALTAR', 'Left at the Altar', 'Hung parliament', '', 'Win more seats than your rival in a hung parliament, and still lose government.', 0, (st, r) => !!r && !!r.neg && r.neg.mode === 'form' && r.gov !== st.party && (st.party === r.neg.A ? r.neg.sA > r.neg.sB : r.neg.sB > r.neg.sA)],
    ['BALANCE_OF_POWER', 'Balance of Power', 'Hung parliament', '', 'As the Greens or the teals, hold seats in a hung parliament where your support decides who governs.', 0, (st, r) => !!r && !!r.neg && r.neg.mode === 'king' && ['GRN', 'IND'].includes(st.party)],
    ['BOTH_HOUSES', 'Control of Both Houses', 'The Senate', '', 'Win a House majority while your side wins 41 or more of the 76 Senate seats, a firmer grip than the Howard government’s after the 2004 election.', 0, (st, r) => !!r && S(r, st.party) >= 76 && !!r.sen && r.sen.side >= 41],
    ['GREEN_SENATE', 'The Senate Is Green', 'The Senate', '', 'As the Greens, win 13 or more Senate seats.', 0, (st, r) => st.party === 'GRN' && !!r && !!r.sen && r.sen.GRN >= 13],
    ['GREENSLIDE', 'Greenslide', 'New sides', '', 'As the Greens, win six or more House seats. Brisbane voters coined “Greenslide” in 2022, when the party won three seats there.', 0, (st, r) => st.party === 'GRN' && S(r, 'GRN') >= 6],
    ['TEAL_TSUNAMI', 'The Teal Tsunami', 'New sides', '', 'As the teals, win 7 or more seats.', 0, (st, r) => st.party === 'IND' && S(r, 'IND') >= 7],
    ['FEEDING_THE_WORM', 'Feeding the Worm', 'Campaign craft', '', 'Win all three exchanges in the leaders’ debate. For years Nine’s audience “worm” tracked every line live.', 0, st => st.debWins === 3],
    ['THE_LONG_SILENCE', 'The Long Silence', 'Campaign craft', '', 'Let the clock run out on a doorstop. Tony Abbott’s silent nodding through a 2011 television interview became one of the most replayed clips in Australian politics.', 1, st => (st.doors || {}).t >= 1],
    ['QUICK_ON_YOUR_FEET', 'Quick on Your Feet', 'Campaign craft', '', 'Answer three doorstops in one campaign, every one in time.', 0, st => (st.doors || {}).n >= 3 && !(st.doors || {}).t],
    ['BACKFLIP_WITH_PIKE', 'Backflip with Pike', 'Campaign craft', '', 'Change your position three times in one campaign.', 1, st => (st.backflips || 0) >= 3],
    ['CONVICTION', 'Conviction Politician', 'Campaign craft', '', 'Take a side on four or more issues, never backflip, and win government.', 0, (st, r) => won(st, r) && Object.keys(st.stances || {}).length >= 4 && !st.backflips],
    ['CORE_PROMISES', 'Core and Non-Core Promises', 'Campaign craft', '', 'Make $30 billion of promises and still pass the costings test. John Howard split his 1996 promises into “core” and “non-core”.', 0, st => ((st.ledger || {}).bn || 0) >= 30 && st.flags.includes('PASSED_PBO_CLEAN')],
    ['DOUBLING_DOWN', 'Doubling Down', 'Campaign craft', '', 'Double down the morning after a backfire, and make it land.', 0, st => st.flags.includes('DOUBLED_DOWN')],
    ['BROAD_CHURCH', 'A Broad Church', 'Campaign craft', '', 'Win four endorsements in one campaign. John Howard liked to call the Liberal Party a broad church.', 0, st => (st.endorse || []).length >= 4],
    ['OXLEY_1996', 'Oxley, 1996', 'Campaign craft', '', 'Disendorse a candidate after the ballot papers are printed, and win the seat anyway. Pauline Hanson won Oxley in 1996 after the Liberals disendorsed her.', 0, (st, r) => !!r && !!r.dis && r.dis.won],
    ['TICKING_EVERY_BOX', 'Ticking Every Box', 'Campaign craft', '', 'Meet all five weekly targets.', 0, st => (st.targets || []).length >= 5 && st.targets.every(t => t.ok)],
    ['WATCHED_AND_WON', 'Watched and Won', 'Campaign craft', '', 'Win all three of your seats to watch.', 0, (st, r) => !!r && !!r.spots && r.spots.length >= 3 && r.spots.every(x => x.mine)],
    ['OUT_OF_THE_HUNG', 'Out of the Hung Parliament', 'Campaign craft', '', 'Start from hung-parliament polling and win a majority.', 0, (st, r) => st.scen === 'hung' && S(r, st.party) >= 76],
    ['NO_SECOND_CHANCES', 'No Second Chances', 'Campaign craft', '', 'Win government in an Ironman campaign.', 0, (st, r) => !!st.iron && won(st, r)],
    ['CURSED_AND_CROWNED', 'Cursed and Crowned', 'Campaign craft', '', 'Take your leader’s cursed answer and still win government.', 0, (st, r) => won(st, r) && (st.lo || []).some(id => ((window.CAMPAIGN_DATA.LO || []).find(o => o.lo === id) || {}).cursed)],
    ['ONLY_YOU', 'Only You', 'Campaign craft', '', 'Try 15 different leader-only answers, across all your campaigns.', 0, () => !!window.CAMPAIGN && Object.keys(window.CAMPAIGN.loGet()).length >= 15],
    ['LEADERSHIP_MATERIAL', 'Leadership Material', 'Campaign craft', '', 'Reach your side’s top two tiers with five different leaders.', 0, (st, r) => { if (!r || !window.CAMPAIGN) return false; const m = window.CAMPAIGN.mastery(); if (st.tier) m[st.leader] = Math.min(m[st.leader] == null ? 9 : m[st.leader], st.tier.k); return Object.values(m).filter(k => k <= 1).length >= 5; }],
    ['OUT_THOUGHT', 'Out-Thought', 'Campaign craft', '', 'Win a debate exchange after ignoring a tip-off that turned out to be wrong.', 1, st => (st.log || []).some(e => e.deb && e.deb.win && st.deb && st.deb.tell[e.deb.n - 1] !== e.deb.theirs && e.deb.mine !== st.deb.tell[e.deb.n - 1])]
  ];
  // how a run earned each one, in a sentence (shown when an achievement is opened on the verdict screen)
  const PN = { ALP: 'Labor', LNP: 'the Coalition', ONP: 'One Nation', GRN: 'the Greens', IND: 'the teals', KAP: 'Katter’s Australian Party' };
  const seats = (st, r) => `${PN[st.party] || st.party} won ${S(r, st.party)} seats`;
  const W = {
    FIFTY_SEVEN_PERCENT_2PP: (st, r) => `Labor v Coalition two-party: ${r.tpp.toFixed(1)}–${(100 - r.tpp).toFixed(1)}.`,
    ONE_NATION_OFFICIAL_OPPOSITION: (st, r) => `One Nation ${S(r, 'ONP')} seats to the Coalition’s ${S(r, 'LNP')}; first preferences ${r.nat.ONP.toFixed(1)}% to ${r.nat.LNP.toFixed(1)}%.`,
    CANADIAN_1993: (st, r) => `The Coalition ${S(r, 'LNP')} seats to One Nation’s ${S(r, 'ONP')}; first preferences ${r.nat.LNP.toFixed(1)}% to ${r.nat.ONP.toFixed(1)}%.`,
    FLASH_IN_THE_PAN: () => 'One Nation finished with no House seats.',
    PORTILLO_MOMENT: (st, r) => `You lost ${r.leaderSeat}.`, PYRRHIC_VICTORY: (st, r) => `You won government but lost ${r.leaderSeat}.`,
    SO_CLOSE_YET_SO_FAR: (st, r) => `Two-party ${(st.party === 'ALP' ? r.tpp : 100 - r.tpp).toFixed(1)}% to you, and still ${seats(st, r)}.`,
    TREASURERS_TRIUMPH: (st, r) => `${seats(st, r)} with the cash-rate squeeze gone.`, GREEN_LABOR_COALITION: (st, r) => `${seats(st, r)} after signing the Greens’ accord.`,
    ROAD_TO_DAMASCUS: (st, r) => `You scrapped Net Zero, and Labor still won ${S(r, 'ALP')} seats.`, COP31_MANDATE: (st, r) => `${seats(st, r)} with the clean-energy boom running.`,
    TEAL_REVIVAL_ANGUS: (st, r) => `The Coalition won ${r.tealLNP} of the six inner-city teal seats.`, TEAL_EXTINCTION: (st, r) => `The Coalition won ${r.tealLNP} of the six inner-city teal seats.`,
    IRON_AND_STEEL: (st, r) => `${seats(st, r)}; One Nation held to ${S(r, 'ONP')}.`, BLUE_RIBBON_REVIVAL: (st, r) => `${seats(st, r)}, ${(r.st.VIC || {}).LNP || 0} of them in Victoria.`,
    GOLDSTEIN_COUP: (st, r) => `You took the leadership on ${Math.round(st.votes)}% and formed government with ${S(r, 'LNP')} seats.`,
    ET_TU_BARNABY: (st, r) => `You took the leadership on ${Math.round(st.votes)}%; ${seats(st, r)}.`, EMPIRICAL_PROOF: (st, r) => `Clean costings, and ${seats(st, r)}.`,
    QUEENSLANDER: (st, r) => `${((r.st.QLD || {})[st.party]) || 0} of Queensland’s 30 seats.`, FORTRESS_VICTORIA: (st, r) => `${((r.st.VIC || {})[st.party]) || 0} of Victoria’s 38 seats.`,
    KING_OF_THE_BUSH: (st, r) => `${r.rg.Rural[st.party] || 0} of ${r.rg.Rural.total} rural seats.`, DONUT_GOVERNMENT: (st, r) => `${seats(st, r)}, none of them inner-metro.`,
    KINGMAKER_OF_CANBERRA: (st, r) => `Hung parliament, with One Nation on ${S(r, 'ONP')} seats.`, MINORITY_TIGHTROPE: (st, r) => `A minority government on ${S(r, st.party)} seats.`,
    SKIN_OF_YOUR_TEETH: st => `You won the party-room ballot on ${Math.round(st.votes)}%.`, IRON_CAUCUS: st => `Caucus unity never fell below ${Math.round(st.minUnity)}.`,
    THIRTY_NEWSPOLLS: st => `Caucus unity fell to ${Math.round(st.minUnity)} and you lost the snap vote in week ${Math.min(5, Math.ceil(st.turn / (st.T / 5)))}.`,
    GOOD_GOVERNMENT: st => `Caucus unity was down to ${Math.round(st.minUnity)} when you called the vote, and you won it.`,
    BRINK_OF_REVOLT: st => `Unity fell to ${Math.round(st.minUnity)}, and you still won.`, PP_HOARDER: st => `You won with ${st.pp} Political Power unspent.`,
    INFLATION_SLAYER: () => 'The cash-rate spirit was gone by polling day.', YIMBY_IN_CHIEF: () => 'The housing-shortfall spirit was gone by polling day.',
    RESTORED_TRUST: () => 'Canberra cynicism was gone by polling day.', CLEAN_SWEEP_SPIRITS: () => 'No negative national spirits were left on polling day.',
    SEVENTEEN_DAYS: (st, r) => `You backed ${PN[r.gov] || r.gov}, and they formed government.`, CONFIDENCE_AND_SUPPLY: (st, r) => `${r.neg.out[st.party === r.neg.A ? 'tA' : 'tB']} votes on the floor of the House.`,
    NO_DEALS: (st, r) => `Government with ${S(r, st.party)} seats and no full deals.`, PRICE_OF_POWER: (st, r) => `${r.neg.out.full} full deals.`,
    LEFT_AT_THE_ALTAR: (st, r) => `${S(r, st.party)} seats, and ${PN[r.gov] || r.gov} still formed government.`, BALANCE_OF_POWER: (st, r) => `${S(r, st.party)} seats in a hung parliament.`,
    BOTH_HOUSES: (st, r) => `${S(r, st.party)} House seats; your side won ${r.sen.side} Senate seats.`, GREEN_SENATE: (st, r) => `${r.sen.GRN} Greens senators.`,
    FEEDING_THE_WORM: () => 'Three exchanges, three wins.', QUICK_ON_YOUR_FEET: st => `${st.doors.n} doorstops, every one answered in time.`, THE_LONG_SILENCE: () => 'The clock ran out on a doorstop.',
    BACKFLIP_WITH_PIKE: st => `${st.backflips} backflips in one campaign.`, CONVICTION: st => `${Object.keys(st.stances).length} issues, no backflips.`,
    CORE_PROMISES: st => `About $${Math.round(st.ledger.bn)} billion promised, with clean costings.`, BROAD_CHURCH: st => `${st.endorse.length} endorsements.`,
    OXLEY_1996: (st, r) => `You dumped your ${r.dis.n} candidate and won the seat anyway.`, TICKING_EVERY_BOX: () => 'Five weeks, five targets met.',
    WATCHED_AND_WON: (st, r) => `${r.spots.map(x => x.n).join(', ')}: all won.`, NO_SECOND_CHANCES: (st, r) => `${seats(st, r)}, in Ironman.`,
    ONLY_YOU: () => `${Object.keys(window.CAMPAIGN.loGet()).length} leader-only answers tried.`
  };
  function why(a, st, r) { try { return (W[a.id] || ((s, x) => x ? seats(s, x) + '.' : 'Earned during the campaign.'))(st, r); } catch (e) { return ''; } }
  // every achievement this run satisfied, new or not
  function met(st, r) { return list.filter(a => { try { return !!a.check(st, r); } catch (e) { return false; } }); }
  // the really hard ones carry a Hard label
  const HARD = new Set(["NO_DEALS", "BOTH_HOUSES", "GREENSLIDE", "TEAL_TSUNAMI", "FEEDING_THE_WORM", "TICKING_EVERY_BOX", "NO_SECOND_CHANCES", "LEADERSHIP_MATERIAL", "CENTURY_CLUB", "MENZIES_REBORN", "FRASER_PROPORTION", "FIFTY_SEVEN_PERCENT_2PP", "ONE_NATION_MAJORITY", "FLASH_IN_THE_PAN", "PYRRHIC_VICTORY", "IRON_AND_STEEL", "ROAD_TO_DAMASCUS", "BLUE_RIBBON_REVIVAL", "TEAL_EXTINCTION", "QUEENSLANDER", "FORTRESS_VICTORIA", "KING_OF_THE_BUSH", "IRON_CAUCUS", "BRINK_OF_REVOLT", "CLEAN_SWEEP_SPIRITS"]);
  // engraved line icons, one per honour (24×24, drawn for the gold medals)
    const ICON={
  CENTURY_CLUB:'<path class="k" d="M5 6.5h14v11H5zM5 9.5h14"/><text class="tx" x="12" y="16" text-anchor="middle" style="font-size:7px">100</text><path class="k" d="M8 4.5v2M16 4.5v2"/>',
  MENZIES_REBORN:'<path class="k" d="M4 19.5h16M6.5 19.5v-8h4v8M13.5 19.5V7h4v12.5M4.5 11.5h7"/><path class="k" d="M15.5 4.5v-1M14 5.5l1.5-2 1.5 2" style="stroke-width:1.4"/>',
  FRASER_PROPORTION:'<path class="k" d="M3.5 19.5h17M4 19.5L10 7l3.5 6 2-3 4.5 9.5"/><circle class="k" cx="17.5" cy="15.5" r="1.1"/><circle class="k" cx="19.5" cy="18" r=".8"/><circle class="k" cx="15.3" cy="17.8" r=".8"/>',
  FIFTY_SEVEN_PERCENT_2PP:'<path class="k" d="M4 16a8 8 0 0 1 16 0M12 16l5.5-3M18.3 10.5l1.2-.8"/><circle class="f" cx="12" cy="16" r="1.3"/><text class="tx" x="12" y="20.8" text-anchor="middle" style="font-size:5.5px">57</text>',
  MIRACLE_ON_MACQUARIE:'<path class="k" d="M4 19.5h16M5 19.5l1.5-2.5h3l1 2.5M13 19.5l1-2h3.5l1.5 2M12 17V9M12 12c-2.5 0-3.5-1.5-3.5-3.5 2.5 0 3.5 1.5 3.5 3.5zM12 10.5c2.5 0 3.5-1.5 3.5-3.5-2.5 0-3.5 1.5-3.5 3.5z"/>',
  ONE_NATION_OFFICIAL_OPPOSITION:'<path class="k" d="M7.5 9.5l-1-4 3 2L12 4.5l2.5 3 3-2-1 4zM4.5 15.5h15v2h-15zM6 17.5v2.5M18 17.5v2.5M5 15.5c0-2 1-3 3-3h8c2 0 3 1 3 3"/>',
  ONE_NATION_MAJORITY:'<path class="k" d="M4.5 5.5h15v10H11l-4 3.5v-3.5H4.5z"/><path class="k" d="M10.2 8.6a1.8 1.8 0 1 1 2.6 1.6c-.6.3-.8.7-.8 1.3"/><circle class="f" cx="12" cy="13.3" r=".8"/>',
  SEVENTY_SIX_AND_A_PRAYER:'<ellipse class="k" cx="12" cy="5.5" rx="4.5" ry="1.4"/><text class="tx" x="12" y="16.5" text-anchor="middle" style="font-size:10px">76</text><path class="k" d="M6 19.5h12"/>',
  WHITLAMS_GHOST:'<path class="k" d="M7 19.5V11a5 5 0 0 1 10 0v8.5l-1.7-1.5-1.6 1.5-1.7-1.5-1.7 1.5-1.6-1.5z"/><circle class="f" cx="10.2" cy="11.5" r=".9"/><circle class="f" cx="13.8" cy="11.5" r=".9"/><path class="k" d="M10.8 14.8h2.4" style="stroke-width:1.3"/>',
  RUMP_PARLIAMENT:'<path class="k" d="M4 7.5h16v12H4zM12 7.5v12"/><path class="f" d="M5.5 10h5v3.5h-5zM5.5 15h5v3h-5z"/><path class="k" d="M13.5 10h5v3.5h-5zM13.5 15h5v3h-5z" style="stroke-dasharray:1.5 1.5;stroke-width:1.2"/>',
  CANADIAN_1993:'<path class="k" d="M8 20V4M16 20V4M12 5v2M12 10v2M12 15v2"/><path class="k" d="M10 18.5v-6M8.6 13.8l1.4-1.6 1.4 1.6M14 15.5V7M12.6 8.6L14 7l1.4 1.6"/>',
  FLASH_IN_THE_PAN:'<path class="k" d="M18.5 9A7 7 0 1 0 19 13.5M19 5v4h-4"/><text class="tx" x="12" y="14.3" text-anchor="middle" style="font-size:7px">98</text>',
  PORTILLO_MOMENT:'<path class="k" d="M6 20V5h8v15M14 20H5M10.5 12.5h.1M16 12.5h4.5M18.5 10.5l2 2-2 2"/>',
  PYRRHIC_VICTORY:'<path class="k" d="M8 4.5v15M8 12h8v7.5M8 15.5h8M16 12V9"/><path class="k" d="M18.5 4.5l-3.5 3.5M15 4.5l3.5 3.5" style="stroke-width:1.4"/>',
  SO_CLOSE_YET_SO_FAR:'<path class="k" d="M12 5v14M8.5 19h7M4.5 6.5l15 3.5M4.5 6.5L2.5 11.5h4zM19.5 10l-2 5h4z"/><circle class="f" cx="4.5" cy="10.4" r="1.4"/>',
  ALBO_THREE_PEAT:'<path class="k" d="M7.5 4.5h9v4a4.5 4.5 0 0 1-9 0zM7.5 6H5a2.5 2.5 0 0 0 2.6 3.2M16.5 6H19a2.5 2.5 0 0 1-2.6 3.2M12 13v3M8.5 19.5h7l-1-3h-5z"/><path class="k" d="M10.4 6.2v3M12 6.2v3M13.6 6.2v3" style="stroke-width:1.2"/>',
  TREASURERS_TRIUMPH:'<path class="k" d="M3.5 12.5h8v6.5h-8zM6 12.5v-1.5h3v1.5M13 15.5h2.5M14 13.5l2 2-2 2M17.5 19.5v-6l2.5-2 2.5 2v6z" transform="translate(-1 0)"/><path class="k" d="M12 9V5M10.5 6.5L12 5l1.5 1.5" style="stroke-width:1.3"/>',
  GREEN_LABOR_COALITION:'<path class="k" d="M6 4.5h9l3 3v12H6zM15 4.5v3h3M8.5 10h7M8.5 12.5h7M8.5 15h3"/><path class="k" d="M12.5 17.5c1-1.5 1.8 1 2.8-.5s1.5.6 2.2-.3"/>',
  ROAD_TO_DAMASCUS:'<path class="k" d="M9 20l2-9M15 20l-2-9M12 18v-1.5M12 14.5v-1.2M12 3.5v2.5M6.5 6l1.5 1.5M17.5 6L16 7.5M5 10h2M17 10h2"/>',
  COP31_MANDATE:'<path class="k" d="M4 14l2.5-7h11L20 14zM5.5 10.5h13M9.5 7l-1 7M14.5 7l1 7M10 17.5h4M12 14v3.5"/><path class="k" d="M13 2.8L11 5.3h2l-1 2" style="stroke-width:1.3"/>',
  TEAL_REVIVAL_ANGUS:'<path class="k" d="M3.5 19.5c3-4 6-5.5 8.5-5.5s5.5 1.5 8.5 5.5M12 14V4.5M12 4.5l5.5 2-5.5 2.2"/>',
  IRON_AND_STEEL:'<path class="k" d="M5 5.5h14M5 10.5h14M12 5.5v5M6 14.5h12l-2 2.5v2.5H8V17z"/><path class="k" d="M4.5 14.5H6M18 14.5h1.5"/>',
  BLUE_RIBBON_REVIVAL:'<path class="k" d="M12 19.5l-6-6a3.5 3.5 0 0 1 5-5l1 1 1-1a3.5 3.5 0 0 1 5 5z"/><path class="k" d="M12 9.8a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM12 13v2.5"/>',
  GOLDSTEIN_COUP:'<path class="k" d="M7 19.5h10M8 19.5l1-3h6l1 3M9.5 16.5c0-2.5-2-3-2-6 0-3 2.5-5.5 6-5.5l1 1.5c2 .5 2.5 2 2.5 3.5l-3 .5-1.5 1.5c1 1.5 1.5 3 1.5 4.5"/><circle class="f" cx="13" cy="8" r=".7"/>',
  TEAL_EXTINCTION:'<path class="k" d="M7 9.5a2 2 0 1 1 2.5-2l5 5a2 2 0 1 1 2 2.5 2 2 0 1 1-2.5 2l-5-5a2 2 0 1 1-2-2.5z"/>',
  HANSON_JOYCE_JUGGERNAUT:'<path class="k" d="M5 13.5h14v6H5zM5 16.5c2 1 3-1 5 0s3-1 4 0 3-1 5 0M9.5 13.5v-3M14.5 13.5v-3"/><path class="k" d="M9.5 8.5c-.8-.8-.3-1.8 0-2.3.3.5.8 1.5 0 2.3zM14.5 8.5c-.8-.8-.3-1.8 0-2.3.3.5.8 1.5 0 2.3z" style="stroke-width:1.2"/><text class="tx" x="12" y="12.3" text-anchor="middle" style="font-size:5px">30</text>',
  ET_TU_BARNABY:'<path class="k" d="M18.5 5.5L9.5 14.5l-1-1L17.5 4.5zM7 12l5 5M8.5 15.5L5 19M6 18l1 1"/>',
  EMPIRICAL_PROOF:'<path class="k" d="M9.5 4.5h5M10.5 4.5v5L5.5 18a1 1 0 0 0 .9 1.5h11.2a1 1 0 0 0 .9-1.5l-5-8.5v-5M7.5 15h9"/><circle class="f" cx="11" cy="17" r=".7"/><circle class="f" cx="13.8" cy="16.6" r=".6"/>',
  QUEENSLANDER:'<circle class="k" cx="9" cy="8.5" r="2.8"/><path class="k" d="M9 3.5v1M9 12.5v1M4 8.5h1M13 8.5h1M5.5 5l.7.7M11.8 11.3l.7.7M5.5 12l.7-.7M11.8 5.7l.7-.7M19.5 9.5l-5.5 7.5M12 15.5l4 3-1.5 1.5-3.5-1z"/>',
  FORTRESS_VICTORIA:'<path class="k" d="M5.5 20V9h2.5v2h2V9h4v2h2V9h2.5v11zM10.5 20v-3.5a1.5 1.5 0 0 1 3 0V20M12 9V4.5l3 1.3-3 1.3"/>',
  KING_OF_THE_BUSH:'<path class="k" d="M8 8.5l-.8-3.5 2.5 1.6L12 4l2.3 2.6 2.5-1.6L16 8.5zM12 20v-8M12 14c-3 0-5-1.5-5.5-3.5 3 0 5 1.5 5.5 3.5zM12 16.5c3 0 5-1.5 5.5-3.5-3 0-5 1.5-5.5 3.5z"/>',
  DONUT_GOVERNMENT:'<circle class="k" cx="12" cy="12" r="7.5"/><circle class="k" cx="12" cy="12" r="2.5"/><path class="k" d="M8.5 8.5l.6.4M15.2 8.2l-.4.7M16.4 14.5l-.7-.2M9 16l.5-.6M12 6.5v.8" style="stroke-width:1.4"/>',
  KINGMAKER_OF_CANBERRA:'<path class="k" d="M7 11l-.8-4 3 2L12 5.5l2.8 3.5 3-2-.8 4zM4.5 15c2-1.5 3.5-1.5 5.5 0h5.5a1.2 1.2 0 0 1 0 2.4H11M4.5 19.5l3-2h8l4-4"/>',
  MINORITY_TIGHTROPE:'<path class="k" d="M3 17.5c6 1.5 12 1.5 18 0M12 17.8V13M12 13l-1.5 4.5M12 13l1.5 4.5M12 13V9.5M5.5 9.5h13"/><circle class="k" cx="12" cy="7.3" r="1.5"/>',
  SKIN_OF_YOUR_TEETH:'<path class="k" d="M5 11h14v8.5H5zM8 11V5h8v6M9.5 15h5"/><text class="tx" x="12" y="9.8" text-anchor="middle" style="font-size:6.5px">1</text>',
  IRON_CAUCUS:'<path class="k" d="M12 4l7 2.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5z"/><circle class="f" cx="9" cy="8.5" r=".7"/><circle class="f" cx="15" cy="8.5" r=".7"/><circle class="f" cx="12" cy="16.5" r=".7"/><path class="k" d="M8.5 12h7"/>',
  BRINK_OF_REVOLT:'<path class="k" d="M4 12.5h16M5.5 12.5V9.5h13v3M6 12.5v5M18 12.5v5M4.5 15.5h15"/><path class="k" d="M11 9.5l1-2-1.2-1.5L12 4" style="stroke-width:1.3"/>',
  PP_HOARDER:'<path class="k" d="M4.5 11h15v8.5h-15zM4.5 11a7.5 4.5 0 0 1 15 0M10.5 11v3h3v-3M4.5 14.5h6M13.5 14.5h6"/>',
  INFLATION_SLAYER:'<path class="k" d="M19.5 4.5L9 15M17 4.5h2.5V7M7.5 13.5l3 3M8.5 15.5l-3.5 3.5"/><text class="tx" x="15" y="18.5" text-anchor="middle" style="font-size:7px">%</text>',
  YIMBY_IN_CHIEF:'<path class="k" d="M4.5 11L12 5l7.5 6M6.5 9.5v10h11v-10M10.5 19.5v-4h3v4M19 4.5v4M17 6.5h4"/>',
  RESTORED_TRUST:'<path class="k" d="M7 20V10a5 5 0 0 1 10 0v10M5 20h14M10 12.5h4M12 10.5v5"/>',
  THIRTY_NEWSPOLLS:'<path class="k" d="M4.5 5.5h12v14h-10a2 2 0 0 1-2-2zM16.5 9.5h3v8a2 2 0 0 1-4 0M7 8.5h7M7 16.5h7"/><text class="tx" x="10.5" y="14.6" text-anchor="middle" style="font-size:6px">30</text>',
  GOOD_GOVERNMENT:'<path class="k" d="M5 11.5h14v8H5zM8 11.5V8.5h8v3M9.5 15.5h5"/><path class="k" d="M9 5.5l2 2 4-4" style="stroke-width:1.6"/>',
  SEVENTEEN_DAYS:'<path class="k" d="M5 5.5h14v14H5zM5 9.5h14M9 3.5v4M15 3.5v4"/><text class="tx" x="12" y="17.6" text-anchor="middle" style="font-size:6.5px">17</text>',
  CONFIDENCE_AND_SUPPLY:'<path class="k" d="M6.5 3.5h9l3 3v14h-12zM9 9.5h7M9 12.5h7M9 15.5h4"/><path class="k" d="M13.5 18.5l1.5 1.5 3-3"/>',
  NO_DEALS:'<circle class="k" cx="12" cy="12" r="7.5"/><path class="k" d="M6.7 6.7l10.6 10.6M9 12.5h6"/>',
  PRICE_OF_POWER:'<path class="k" d="M4.5 12.5l8-8h6v6l-8 8zM9 13l3 3"/><circle class="k" cx="15.5" cy="7.5" r="1.2"/>',
  LEFT_AT_THE_ALTAR:'<path class="k" d="M12 20.5c-2-3-6-5-6-9a3.5 3.5 0 0 1 6-2.5 3.5 3.5 0 0 1 6 2.5c0 4-4 6-6 9M12 9l-1.5 3 3 2-1.5 3"/>',
  BALANCE_OF_POWER:'<path class="k" d="M12 4v16M8 20.5h8M5 8.5h14M5 8.5l-2.5 6h5zM19 8.5l-2.5 6h5z"/><circle class="f" cx="12" cy="4.5" r="1.3"/>',
  BOTH_HOUSES:'<path class="k" d="M3.5 19.5h17M5 19.5v-6h6v6M13 19.5v-6h6v6M4 13.5L8 10l4 3.5 4-3.5 4 3.5M8 10V6.5M16 10V6.5"/>',
  GREEN_SENATE:'<path class="k" d="M4 18.5a8 8 0 0 1 16 0zM12 18.5v-8M12 10.5c-2-2-4-1.5-4.5 0M12 10.5c2-2 4-1.5 4.5 0"/>',
  GREENSLIDE:'<path class="k" d="M3.5 19.5c4-1 7-4 9-9 1-2.5 3.5-5 8-5.5-.5 4.5-3 7-5.5 8-5 2-8 5-9 9M8 14.5l3 3"/>',
  TEAL_TSUNAMI:'<path class="k" d="M3 15.5c2.5 0 3-2 5.5-2s3 2 5.5 2 3-2 5.5-2M3 19.5c2.5 0 3-2 5.5-2s3 2 5.5 2 3-2 5.5-2M7 11c0-3.5 3-6.5 7-6.5 2 0 3.5 1 4 2.5-2.5-.5-4.5 1-4.5 4"/>',
  FEEDING_THE_WORM:'<path class="k" d="M3.5 17.5c2-4 3.5-4 5-1s3 3 4.5 0 3-6 4.5-6 2 2 3 2M3.5 20.5h17"/><circle class="f" cx="20.5" cy="12.5" r="1.1"/>',
  THE_LONG_SILENCE:'<rect class="k" x="9" y="3.5" width="6" height="10" rx="3"/><path class="k" d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3M4 4l16 16"/>',
  QUICK_ON_YOUR_FEET:'<rect class="k" x="9" y="3.5" width="6" height="10" rx="3"/><path class="k" d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3M9 20.5h6M17.5 4l2 1.5M19 8h2.5"/>',
  BACKFLIP_WITH_PIKE:'<path class="k" d="M6 16a7 7 0 1 1 7 4.5M6 16l-1.5-3.5M6 16l3.5-1"/><circle class="k" cx="12.5" cy="11" r="1.5"/>',
  CONVICTION:'<circle class="k" cx="12" cy="12" r="8"/><path class="k" d="M12 5v2M12 17v2M5 12h2M17 12h2M9.5 14.5l1.5-4 4-1.5-1.5 4z"/>',
  CORE_PROMISES:'<path class="k" d="M6.5 3.5h11v17l-2-1.5-1.8 1.5-1.7-1.5-1.7 1.5-1.8-1.5-2 1.5zM9 8.5h6M9 11.5h6M9 14.5h3"/>',
  DOUBLING_DOWN:'<rect class="k" x="3.5" y="9.5" width="8" height="8" rx="1.5"/><rect class="k" x="11" y="5" width="8" height="8" rx="1.5" transform="rotate(12 15 9)"/><circle class="f" cx="7.5" cy="13.5" r="1"/><circle class="f" cx="15" cy="9" r="1"/>',
  BROAD_CHURCH:'<path class="k" d="M4.5 20.5v-8L12 6l7.5 6.5v8zM12 6V2.5M10.5 4h3M10 20.5v-4.5h4v4.5"/>',
  OXLEY_1996:'<path class="k" d="M5 9.5h14l-1.5 11h-11zM9.5 9.5V5.5h5v4M8 13.5h8"/><text class="tx" x="12" y="18.6" text-anchor="middle" style="font-size:4.6px">1996</text>',
  TICKING_EVERY_BOX:'<path class="k" d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6zM6 7.5l1.5 1.5 2.5-3M15 7.5l1.5 1.5 2.5-3M6 16.5l1.5 1.5 2.5-3M15 16.5l1.5 1.5 2.5-3"/>',
  WATCHED_AND_WON:'<path class="k" d="M4 14.5l9-5 2 3.5-9 5zM13 9.5l3.5-2 2 3.5-3.5 2M8.5 16l-2 4.5M10.5 15l2 5.5"/><circle class="f" cx="19.5" cy="5" r="1.2"/>',
  OUT_OF_THE_HUNG:'<path class="k" d="M4 20.5l6-14 4 7 2-3 4 10zM15 4.5v4M15 4.5h3.5l-1 1.5 1 1.5H15"/>',
  NO_SECOND_CHANCES:'<rect class="k" x="5.5" y="10.5" width="13" height="10" rx="1.5"/><path class="k" d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5M12 14v3"/>',
  CURSED_AND_CROWNED:'<path class="k" d="M4 17.5l1.5-9 4 4L12 6l2.5 6.5 4-4 1.5 9zM4 20.5h16M10 14.5l1 1 1-1 1 1 1-1"/>',
  ONLY_YOU:'<circle class="k" cx="8" cy="12" r="4"/><path class="k" d="M12 12h8.5M17.5 12v3M20 12v2.5"/>',
  LEADERSHIP_MATERIAL:'<path class="k" d="M8 3.5l4 6 4-6M12 9.5v1"/><circle class="k" cx="12" cy="15.5" r="5"/><path class="k" d="M12 12.5l.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z"/>',
  OUT_THOUGHT:'<path class="k" d="M8 20.5h8M9 20.5c0-2 .5-4 1.5-5.5-1.5-.5-2.5-2-2.5-3.5C8 9 10 7.5 12 6c2 1.5 4 3 4 5.5 0 1.5-1 3-2.5 3.5 1 1.5 1.5 3.5 1.5 5.5M12 3.5v2.5"/>',
  CLEAN_SWEEP_SPIRITS:'<path class="k" d="M3 19.5c3-5 6-7 9-7s6 2 9 7M12 12.5V9M10.5 9h3v-2.5h-3zM8 5l1.5 1.5M16 5l-1.5 1.5M12 3v1.5"/>'
  };
  const list = L.map(([id, title, cat, icon, d, secret, check]) => ({ id, title, cat, icon, d, secret: !!secret, hard: HARD.has(id), svg: ICON[id] || '', check }));
  // honours for the leaders added in campaign-data4.js
  ((window.CAMPAIGN_DATA || {}).extraAch || []).forEach(a => { list.push({ id: a.id, title: a.title, cat: a.cat, part: a.part, leader: a.leader, icon: '', d: a.d, secret: !!a.secret, hard: !!a.hard, svg: a.svg, check: a.check }); if (a.why) W[a.id] = a.why; });
  // the honours page, reorganised: three parts (the result, the campaign, the leaders), each in a few sections, in a fixed order;
  // leader honours sit with their party, in the order the leaders are listed on the select screen
  (() => { const D = window.CAMPAIGN_DATA || {}, LEAD = { ALBO_THREE_PEAT: 'anthony_albanese', TREASURERS_TRIUMPH: 'jim_chalmers', GREEN_LABOR_COALITION: 'tanya_plibersek', ROAD_TO_DAMASCUS: 'chris_bowen', COP31_MANDATE: 'chris_bowen',
      TEAL_REVIVAL_ANGUS: 'angus_taylor', IRON_AND_STEEL: 'andrew_hastie', BLUE_RIBBON_REVIVAL: 'josh_frydenberg', GOLDSTEIN_COUP: 'tim_wilson', TEAL_EXTINCTION: 'tim_wilson',
      HANSON_JOYCE_JUGGERNAUT: 'pauline_hanson', ET_TU_BARNABY: 'barnaby_joyce', EMPIRICAL_PROOF: 'malcolm_roberts' };
    const SEC = [
      ['The result', 'Landslides and breakthroughs', ['CENTURY_CLUB', 'MENZIES_REBORN', 'FRASER_PROPORTION', 'FIFTY_SEVEN_PERCENT_2PP', 'MIRACLE_ON_MACQUARIE', 'SEVENTY_SIX_AND_A_PRAYER', 'ONE_NATION_OFFICIAL_OPPOSITION', 'ONE_NATION_MAJORITY', 'GREENSLIDE', 'TEAL_TSUNAMI']],
      ['The result', 'Wipeouts and heartbreak', ['WHITLAMS_GHOST', 'RUMP_PARLIAMENT', 'CANADIAN_1993', 'FLASH_IN_THE_PAN', 'PORTILLO_MOMENT', 'PYRRHIC_VICTORY', 'SO_CLOSE_YET_SO_FAR']],
      ['The result', 'The map', ['QUEENSLANDER', 'FORTRESS_VICTORIA', 'KING_OF_THE_BUSH', 'DONUT_GOVERNMENT', 'WATCHED_AND_WON']],
      ['The result', 'Hung parliament and the Senate', ['KINGMAKER_OF_CANBERRA', 'MINORITY_TIGHTROPE', 'SEVENTEEN_DAYS', 'CONFIDENCE_AND_SUPPLY', 'NO_DEALS', 'PRICE_OF_POWER', 'LEFT_AT_THE_ALTAR', 'BALANCE_OF_POWER', 'OUT_OF_THE_HUNG', 'BOTH_HOUSES', 'GREEN_SENATE']],
      ['The campaign', 'The party room', ['SKIN_OF_YOUR_TEETH', 'IRON_CAUCUS', 'BRINK_OF_REVOLT', 'GOOD_GOVERNMENT', 'THIRTY_NEWSPOLLS']],
      ['The campaign', 'By-elections and comebacks', ['BY_ELECTION_LANDSLIDE', 'EVERY_VOTE_COUNTS', 'REJECTED_AT_HOME', 'THE_COMEBACK_TRAIL', 'CLASS_REUNION']],
      ['The campaign', 'Debates and doorstops', ['FEEDING_THE_WORM', 'OUT_THOUGHT', 'QUICK_ON_YOUR_FEET', 'THE_LONG_SILENCE', 'DOUBLING_DOWN']],
      ['The campaign', 'Promises and positions', ['CONVICTION', 'BACKFLIP_WITH_PIKE', 'CORE_PROMISES', 'BROAD_CHURCH', 'OXLEY_1996', 'PP_HOARDER', 'TICKING_EVERY_BOX']],
      ['The campaign', 'The national mood', ['INFLATION_SLAYER', 'YIMBY_IN_CHIEF', 'RESTORED_TRUST', 'CLEAN_SWEEP_SPIRITS']],
      ['The campaign', 'Collections and challenges', ['NO_SECOND_CHANCES', 'CURSED_AND_CROWNED', 'ONLY_YOU', 'THE_GRAND_TOUR', 'LEADERSHIP_MATERIAL', 'THE_FULL_BENCH', 'EVERY_FACE']]
    ];
    const PARTY = [['ALP', 'Labor leaders'], ['LNP', 'Coalition leaders'], ['NAT', 'Nationals leaders'], ['ONP', 'One Nation leaders'], ['GRN', 'Greens leaders'], ['IND', 'Teal leaders'], ['KAP', "Katter's Australian Party"]];
    const ls = D.leaders || [], li = id => { const k = ls.findIndex(l => l.id === id); return k < 0 ? 999 : (ls[k].more ? 100 : 0) + k; }, side = L => L.sb === 'Nationals' ? 'NAT' : L.party;
    const order = new Map(); let n = 0;
    SEC.forEach(([part, cat, ids]) => ids.forEach(id => { const a = list.find(x => x.id === id); if (a) { a.part = part; a.cat = cat; order.set(a, n++); } }));
    list.filter(a => !order.has(a) && a.part === 'The campaign').forEach(a => order.set(a, n++));
    list.forEach(a => { if (LEAD[a.id]) a.leader = LEAD[a.id]; if (a.id === 'COUNTRY_PARTY_PM') a.side = 'NAT'; if (a.id === 'GREEN_COUP') a.side = 'GRN'; });
    PARTY.forEach(([p, cat]) => { list.filter(a => !order.has(a) && ((a.leader && (() => { const L = ls.find(l => l.id === a.leader); return L && side(L) === p; })()) || a.side === p))
      .sort((x, y) => li(x.leader) - li(y.leader)).forEach(a => { a.part = 'The leaders'; a.cat = cat; const L = ls.find(l => l.id === a.leader); a.sub = L ? L.name : 'Any leader'; order.set(a, n++); }); });
    list.forEach(a => { if (!order.has(a)) { a.part = a.part || 'The campaign'; order.set(a, n++); } });
    list.sort((x, y) => order.get(x) - order.get(y)); })();
  // no hidden honours: every one is listed with what it takes
  list.forEach(a => { a.secret = false; });
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } };
  function check(st, r) {
    const got = get(), fresh = [];
    list.forEach(a => { if (got[a.id]) return; let ok = false; try { ok = !!a.check(st, r); } catch (e) { ok = false; }
      if (ok) { got[a.id] = { at: new Date().toISOString(), by: st.leader, w: why(a, st, r) }; fresh.push(a); } });
    if (fresh.length) try { localStorage.setItem(KEY, JSON.stringify(got)); } catch (e) {}
    return fresh;
  }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }
  // honours points: 10 each, 25 for the hard ones, 5 more for a secret; totals unlock medal rims
  const pts = a => (a.hard ? 25 : 10) + (a.secret ? 5 : 0);
  function points() { const g = get(); return list.filter(a => g[a.id]).reduce((t, a) => t + pts(a), 0); }
  const RIMS = [[0, 'Plain', 'plain'], [150, 'Bronze rim', 'bronze'], [400, 'Silver rim', 'silver'], [800, 'Gold rim', 'gold'], [1300, 'Enamel rim', 'enamel']];
  function rim() { const p = points(); let r = RIMS[0]; RIMS.forEach(x => { if (p >= x[0]) r = x; }); const nx = RIMS.find(x => x[0] > p); return { pts: p, n: r[1], cls: r[2], next: nx ? { at: nx[0], n: nx[1] } : null, max: list.reduce((t, a) => t + pts(a), 0) }; }
  return { list, get, check, reset, why, met, pts, points, rim, RIMS };
})();
