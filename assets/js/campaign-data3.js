// Campaign mode content, round 5: two new sides (the Greens and the teal independents), stances for the backflip rule, the promise
// ledger, the leaders' debate exchanges, doorstop interviews, gaffe recovery, the costings attack, candidate disendorsement,
// endorsements, weekly targets, scenario decks and the crossbench blocs for a hung parliament.
// All game content: options describe what the player chooses to do, and nothing is presented as a quote from a real person.
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;

  // ---- the new sides. The Greens play as party group 2; the teals as the independents (group 4, with Community Strong counted in)
  C.PARTIES.GRN = { n: 'Greens', ldr: 'Greens', g: [2], c: 'grn', cross: true };
  C.PARTIES.IND = { n: 'Teal independents', ldr: 'Community Strong', setLdr: false, g: [4], c: 'ind', cross: true };
  C.leaders.push(
    { id: 'david_shoebridge', name: 'David Shoebridge', party: 'GRN', inc: true, mates: ['Larissa Waters'], deb: 1, pp: 3, unity: 74,
      plus: ['Renters’ champion', '+3 Political Power a turn; housing and renters choices land 25% harder for you.'], pos: { tag: { HOUSING: 1.25 } },
      minus: ['Senate firebrand', 'Setbacks in outer-suburban and provincial seats hit 30% harder.'], neg: { r: { OUT: 1.3, PROV: 1.3 } } },
    { id: 'zali_steggall', name: 'Zali Steggall', party: 'IND', inc: true, mates: ['Allegra Spender'], deb: 2, pp: 2, unity: 70,
      plus: ['Warringah veteran', 'Teal-seat preferences 4 points stronger; +1 on debate checks.'], pf: { ind: 4 },
      minus: ['No party machine', 'Outer-suburban and rural setbacks hit 30% harder.'], neg: { r: { OUT: 1.3, RUR: 1.3 } } },
    { id: 'allegra_spender', name: 'Allegra Spender', party: 'IND', inc: true, mates: ['Monique Ryan'], deb: 1, pp: 4, unity: 72,
      plus: ['Wentworth economist', '+4 Political Power a turn; +1 on economy and tax checks.'], debTag: { ECONOMY: 1, TAX: 1 },
      minus: ['Inner-city ceiling', 'Rural and provincial setbacks hit 35% harder.'], neg: { r: { RUR: 1.35, PROV: 1.35 } } }
  );
  // win conditions, set against where each side starts: the Greens on no House seats in the baseline projection, the teals on about eight
  C.tiers.GRN = [['Greenslide', r => r.seats.GRN >= 6], ['A real bloc', r => r.seats.GRN >= 4], ['Back in the House', r => r.seats.GRN >= 2], ['Clinging on', () => true]];   // 4–5 seats is a good night; 6+ a Greenslide
  C.tiers.IND = [['The teal tsunami', r => r.seats.IND >= 7], ['A record crossbench', r => r.seats.IND >= 6], ['Holding ground', r => r.seats.IND >= 4 || (r.hung && r.seats.IND >= 3)], ['The teal retreat', () => true]];
  C.TIERNOTE = { GRN: 'Starting from no House seats', IND: 'Success means 6–7+ crossbench seats' };

  const card = (id, party, tag, t, q, opts) => ({ id, party, tag, t, q, opts });
  C.cards.push(
    card('GRN_RENT', 'GRN', 'HOUSING', 'A national rent freeze', 'Renters are your base and the property lobby is spending big against you. How hard do you push?', [
      { x: 'Make a two-year rent freeze your price for any deal in a hung parliament.', e: { r: { IN: 1.6, OUT: 0.4 }, u: 3, m: 1 }, h: 'Greens draw a line on rents' },
      { x: 'Pitch a softer cap on rent increases, tied to inflation.', e: { r: { IN: 0.8, OUT: 0.6 } }, h: 'Greens moderate on rents' },
      { x: 'Let the rent fight go quiet and talk about climate instead.', e: { r: { IN: -0.6 }, u: -3 }, h: 'Greens go quiet on rents' }]),
    card('GRN_GAZA', 'GRN', '', 'Foreign policy in the inner city', 'A protest movement wants the Greens out front on a war overseas. Some voters love it; others are uneasy.', [
      { x: 'Lead the protest march and call for sanctions.', rng: { k: 'm', min: 1, ok: { r: { IN: 1.4 }, m: 2 }, no: { r: { IN: 0.4, OUT: -1 }, m: -2 } }, h: 'Greens lead the march' },
      { x: 'Back a ceasefire motion in parliament and leave it there.', e: { r: { IN: 0.6 } }, h: 'Greens back ceasefire motion' },
      { x: 'Keep the campaign on rents and bills.', e: { r: { OUT: 0.4, IN: -0.3 } }, h: 'Greens stick to the cost of living' }]),
    card('GRN_LABOR', 'GRN', 'PREFS', 'Labor wants your preferences', 'Labor offers a quiet deal: your preferences in its marginals, its silence in your target seats.', [
      { x: 'Take the deal and preference Labor in every seat.', e: { pf: { grn: 3 }, r: { IN: -0.4 } }, h: 'Greens and Labor do a preference deal' },
      { x: 'Run open tickets and let voters decide.', e: { r: { IN: 0.5 }, u: 2 }, h: 'Greens run open tickets' },
      { x: 'Target Labor’s inner-city ministers hardest of all.', rng: { k: 'm', min: 1, ok: { r: { IN: 1.5 }, m: 2 }, no: { r: { IN: 0.2 }, pf: { grn: -3 }, m: -1 } }, h: 'Greens go after Labor’s ministers' }]),
    card('GRN_COAL', 'GRN', 'ENERGY', 'No new coal and gas', 'A new gas project is up for approval. The Greens could make it the issue of the week.', [
      { x: 'Promise to block every new coal and gas project.', e: { r: { IN: 1.2, RUR: -1, PROV: -0.6 }, m: 1 }, st: 'fossil-', h: 'Greens vow to block new coal and gas' },
      { x: 'Focus on a fair deal for coal workers as mines close.', e: { r: { PROV: 0.6, IN: 0.3 } }, h: 'Greens pitch jobs plan for coal towns' },
      { x: 'Chain yourself to the gates for the cameras.', rng: { k: 'm', min: 2, ok: { o: 0.5, m: 3 }, no: { o: -0.5, m: -2 } }, h: 'Greens leader arrested at mine gates' }]),
    card('GRN_DENTAL', 'GRN', 'HEALTH', 'Dental into Medicare', 'Your signature policy is popular but expensive, and the costings will be attacked.', [
      { x: 'Promise dental and mental health in Medicare, funded by a tax on billionaires.', e: { o: 0.5, r: { OUT: 0.6 } }, st: 'tax+', h: 'Greens: billionaires to pay for dental' },
      { x: 'Start with dental for children and pensioners.', e: { o: 0.3 }, h: 'Greens trim dental plan' },
      { x: 'Drop the costings and run on values.', e: { o: -0.2, m: 1 }, h: 'Greens run without costings' }]),
    card('GRN_SEAT', 'GRN', '', 'The inner-city target seats', 'Your volunteers can flood a few seats or spread across many.', [
      { x: 'Flood three inner-Brisbane and Melbourne seats with volunteers.', e: { r: { IN: { GRN: 1.6 } }, s: { QLD: { GRN: 0.6 }, VIC: { GRN: 0.6 } } }, h: 'Greens bet on a handful of seats' },
      { x: 'Spread out across every inner-city seat.', e: { r: { IN: { GRN: 0.9 } } }, h: 'Greens run a broad inner-city campaign' },
      { x: 'Focus on the Senate vote instead.', e: { o: 0.2, pp: 10 }, h: 'Greens play for the Senate' }]),
    card('IND_FUNDS', 'IND', '', 'Climate 200 money', 'A big donor network will fund your candidates, but the major parties say it makes you a party in disguise.', [
      { x: 'Take the money and fund twenty new candidates.', e: { r: { IN: { IND: 1.2 }, OUT: { IND: 0.5 } }, pp: 10, u: -3 }, h: 'Teals take big money for a bigger field' },
      { x: 'Cap donations and publish every dollar.', e: { r: { IN: { IND: 0.7 } }, u: 3 }, h: 'Teals cap donations' },
      { x: 'Refuse the money and run on volunteers.', e: { r: { IN: { IND: 0.3 } }, pp: -5, m: 1 }, h: 'Teals refuse the donor network' }]),
    card('IND_INTEGRITY', 'IND', 'CRISIS', 'Truth in political advertising', 'A misleading ad campaign is running against you in five seats.', [
      { x: 'Promise truth-in-advertising laws with real fines.', e: { r: { IN: { IND: 1 } }, m: 1 }, h: 'Teals push truth-in-advertising laws' },
      { x: 'Take the advertisers to the electoral commission.', rng: { k: 'd', min: 1, ok: { r: { IN: { IND: 1.2 } } }, no: { r: { IN: { IND: -0.4 } } } }, h: 'Teals take ad fight to the AEC' },
      { x: 'Ignore it and keep knocking on doors.', e: { r: { IN: { IND: 0.2 } } }, h: 'Teals ignore attack ads' }]),
    card('IND_CLIMATE', 'IND', 'ENERGY', 'A 75% emissions target', 'Your voters want a bold climate target; the business pages say it will cost jobs.', [
      { x: 'Promise a 75% emissions cut by 2035 as your price for support.', e: { r: { IN: { IND: 1.3 }, RUR: { IND: -0.5 } } }, st: 'fossil-', h: 'Teals set a 75% climate target' },
      { x: 'Pair the target with a plan for energy prices.', e: { r: { IN: { IND: 0.8 }, OUT: { IND: 0.3 } } }, h: 'Teals pair climate with power prices' },
      { x: 'Back a gas-led transition for now.', e: { r: { IN: { IND: -0.6 }, OUT: { IND: 0.4 } } }, st: 'fossil+', h: 'Teals back gas for now' }]),
    card('IND_REGIONS', 'IND', '', 'Country independents', 'Independents in the bush want to run under your banner, but your brand is inner-city.', [
      { x: 'Back a slate of country independents with their own local platforms.', e: { r: { RUR: { IND: 1.2 }, IN: { IND: -0.2 } } }, h: 'Teals go bush' },
      { x: 'Offer advice and money, but no branding.', e: { r: { RUR: { IND: 0.6 } } }, h: 'Teals help country independents quietly' },
      { x: 'Stay in the cities.', e: { r: { IN: { IND: 0.4 } } }, h: 'Teals stay in the cities' }]),
    card('IND_BALANCE', 'IND', 'PREFS', 'Who would you back?', 'Every interview asks which side you would support in a hung parliament.', [
      { x: 'Refuse to say: you will judge them on integrity and climate.', e: { r: { IN: { IND: 0.6 } }, m: 1 }, h: 'Teals refuse to pick a side' },
      { x: 'Say you would talk to the side with the most seats first.', e: { r: { IN: { IND: 0.3 }, OUT: { IND: 0.3 } } }, h: 'Teals: most seats gets first call' },
      { x: 'Rule out the Coalition while it backs coal.', e: { r: { IN: { IND: 0.9 }, RUR: { IND: -0.6 } } }, h: 'Teals rule out the Coalition' }]),
    card('IND_LOCAL', 'IND', '', 'A local fight', 'A sitting teal is in trouble over a local development row.', [
      { x: 'Side with the residents against the developer.', e: { r: { IN: { IND: 0.8 } } }, st: 'supply-', h: 'Teal sides with residents' },
      { x: 'Back the extra homes and take the heat.', rng: { k: 'd', min: 1, ok: { r: { IN: { IND: 0.6 }, OUT: { IND: 0.6 } } }, no: { r: { IN: { IND: -0.8 } } } }, st: 'supply+', h: 'Teal backs more homes' },
      { x: 'Call for an independent planning review.', e: { r: { IN: { IND: 0.3 } } }, h: 'Teal calls for planning review' }])
  );
  C.decisions.push(
    { id: 'DEC_GRN_DOORS', n: 'Inner-city door-knock blitz', party: 'GRN', cost: 20, cd: 3, max: 3, d: 'Thousands of volunteers in your target seats: a lift in the inner city.', e: { r: { IN: { GRN: 1.6 } }, sta: -5 } },
    { id: 'DEC_GRN_YOUTH', n: 'Youth turnout drive', party: 'GRN', cost: 25, cd: 4, max: 2, d: 'Enrol and mobilise young voters: national support and momentum.', e: { o: 0.8, m: 1 } },
    { id: 'DEC_IND_LOCAL', n: 'Local campaign money', party: 'IND', cost: 20, cd: 3, max: 3, d: 'Corflutes, ads and paid organisers in the teal seats.', e: { r: { IN: { IND: 1.6 } } } },
    { id: 'DEC_IND_TOWNHALL', n: 'Community town halls', party: 'IND', cost: 25, cd: 4, max: 2, d: 'Town-hall meetings in every target seat: a lift where you stand and a united team.', e: { r: { IN: { IND: 0.9 }, OUT: { IND: 0.6 } }, u: 4 } }
  );

  // ---- stances: options that take a side on an issue. Taking the other side later in the same campaign is a backflip.
  C.stanceNames = { fossil: 'coal and gas', migration: 'migration', border: 'border protection', tax: 'tax', spending: 'spending', rba: 'the Reserve Bank', supply: 'new housing' };
  const ST = {
    'fossil+': 'CAMP_M01_LAUNCH#2 CAMP_M18_GREAT_DEBATE#1 CAMP_ENER_01#1 CAMP_LNP_01#0 CAMP_B2_06#0 CAMP_B2_08#0 CAMP_B2_18#1 CAMP_B2_25#0 CAMP_B3_04#1 CAMP_B4_37#2 CAMP_B4_39#2 CAMP_B4_72#0 CAMP_B4_78#0 CAMP_B4_28#2 CAMP_B3_26#0',
    'fossil-': 'CAMP_M18_GREAT_DEBATE#0 CAMP_ENER_01#2 CAMP_ALP_01#0 CAMP_B2_06#2 CAMP_B2_18#0 CAMP_B3_04#0 CAMP_B4_28#0 CAMP_B2_25#1 CAMP_B3_44#2 CAMP_B2_14#1',
    'migration+': 'CAMP_M01_LAUNCH#2 CAMP_M12_PRESS_CLUB#1 CAMP_HOUS_01#0 CAMP_HOUS_01#1 CAMP_B2_17#1 CAMP_B3_03#1 CAMP_B3_34#2 CAMP_B4_47#1 CAMP_B3_45#0 CAMP_B2_23#0 CAMP_B4_19#2',
    'migration-': 'CAMP_HOUS_01#2 CAMP_B2_23#2',
    'border+': 'CAMP_B3_34#0 INTL_BOATS#0', 'border-': 'CAMP_B3_34#1 INTL_BOATS#2',
    'tax+': 'CAMP_ECON_03#1 CAMP_M06_PBO_COSTINGS#1 CAMP_B2_16#1 CAMP_B3_02#1 CAMP_B2_21#0 CAMP_B3_44#1 CAMP_B3_44#2 CAMP_B3_33#1',
    'tax-': 'CAMP_ECON_03#0 CAMP_M06_PBO_COSTINGS#0 CAMP_B2_16#0 CAMP_B3_02#0 CAMP_B3_44#0 CAMP_B3_33#2',
    'spending+': 'CAMP_M01_LAUNCH#1 CAMP_B3_41#1 CAMP_B2_32#1', 'spending-': 'CAMP_M06_PBO_COSTINGS#2 CAMP_B2_16#2 CAMP_B3_01#1 CAMP_B3_41#0 CAMP_B2_32#0 CAMP_B3_48#1',
    'rba+': 'CAMP_ECON_01#0', 'rba-': 'CAMP_ECON_01#1 CAMP_B3_41#2'
  };
  Object.entries(ST).forEach(([s, refs]) => refs.split(' ').forEach(ref => { const [id, i] = ref.split('#'), c = C.cards.find(x => x.id === id); if (c && c.opts[+i] && !c.opts[+i].st) c.opts[+i].st = s; }));

  // ---- the promise ledger: a spending promise is an option that funds, subsidises, rebates or cuts a tax. Costs are rough, in billions.
  C.promiseRx = /\b(rebates?|subsid(y|ies|ise|ised)|bonus|co-?fund|co-?invest|fund(s|ed|ing)?|free|relief|tax cuts?|cut .{0,12}tax|grants?|invest|underwrite|build|guarantee|\$\d)/i;
  C.promiseNo = /\b(cut .{0,15}(spending|programs|public)|offsets?|savings|austerity|freeze|trim|reject|scrap .{0,12}subsid|end .{0,12}subsid)/i;
  C.special.MONEY = { id: 'MONEY', t: 'Where’s the money?', k: 'Costings attack', q: 'Your rivals say your promises add up to about ${bn} billion with no way to pay for them. The story is leading every bulletin.', opts: [
    { x: 'Release independent costings, line by line.', cost: 20, e: { o: 0.3, pp: -20, f: ['PASSED_PBO_CLEAN'] }, h: 'Costings released: the numbers add up' },
    { x: 'Cut back the most expensive promise and own it.', e: { o: -0.2, u: -4, ledger: -0.35 }, h: 'Campaign trims its spending' },
    { x: 'Call it a scare campaign and hit back.', rng: { k: 'd', min: 2, ok: { o: 0.2, m: 2 }, no: { o: -0.8, m: -3 } }, h: 'Costings fight turns nasty' }] };

  // ---- the leaders' debate: three exchanges before the policy question. Attack beats a one-liner, a calm answer beats an attack,
  // and a good one-liner beats a calm answer. The same style on both sides comes down to debate skill.
  C.debate = {
    topics: ['the cost of living', 'housing', 'energy prices', 'the economy', 'trust in government', 'health', 'national security', 'the leadership'],
    styles: { a: 'Go after {rival}’s record on {topic}.', d: 'Lay out your plan on {topic}, calmly and in detail.', z: 'Land a one-liner on {topic} that will run all night.' },
    styleN: { a: 'went on the attack', d: 'played it calm and detailed', z: 'went for the one-liner' },
    tell: { a: 'Word from the other camp: {rival} has been rehearsing attack lines.', d: 'Word from the other camp: {rival} will play it safe and detailed.', z: 'Word from the other camp: {rival} has a zinger ready.' },
    lean: { anthony_albanese: { a: 0.3, d: 0.5, z: 0.2 }, angus_taylor: { a: 0.4, d: 0.45, z: 0.15 }, pauline_hanson: { a: 0.35, d: 0.15, z: 0.5 }, david_shoebridge: { a: 0.55, d: 0.3, z: 0.15 }, zali_steggall: { a: 0.25, d: 0.55, z: 0.2 } }
  };

  // ---- doorstops: a microphone in your face and ten seconds to answer. Silence is the worst answer.
  const dq = (t, q, a, b, c) => ({ t, q, opts: [a, b, c] });
  C.doorstops = [
    dq('The price of a loaf of bread', 'A reporter asks, on camera, what a loaf of bread costs.', { x: 'Name the price, and what it was a year ago.', e: { o: 0.2, m: 1 }, h: 'Leader knows the price of bread' }, { x: 'Say it is too much, and talk about your plan.', e: { o: 0.05 }, h: 'Leader pivots to the plan' }, { x: 'Joke that you buy the fancy sourdough.', rng: { k: 'm', min: 1, ok: { m: 2 }, no: { o: -0.4, m: -2 } }, h: 'Sourdough joke' }),
    dq('Leaks from your own side', 'A leaked memo says your own MPs doubt the strategy. Comment?', { x: 'Back your team and the strategy, in one line.', e: { u: 2 }, h: 'Leader backs the team' }, { x: 'Say you have not read it.', e: { u: -1 }, h: 'Leader has not read the memo' }, { x: 'Promise to find the leaker.', e: { u: -3, m: 1 }, h: 'Leaker hunt begins' }),
    dq('A bad poll', 'A new poll has you going backwards. Are you worried?', { x: 'The only poll that matters is on election day.', e: { m: 0 }, h: 'Leader shrugs off the poll' }, { x: 'Admit it is tight, and ask for every vote.', e: { o: 0.15, u: 1 }, h: 'Leader: it is tight' }, { x: 'Attack the pollster.', e: { m: -1, o: -0.1 }, h: 'Leader attacks pollster' }),
    dq('Your rival’s attack', 'Your rival says you cannot be trusted with the economy. Respond?', { x: 'Point to your costings.', e: { o: 0.2 }, h: 'Leader points to costings' }, { x: 'Hit back at the rival’s record.', e: { o: 0.1, m: 1 }, h: 'Leader hits back' }, { x: 'Say voters are sick of negativity.', e: { o: 0.05 }, h: 'Leader rises above it' }),
    dq('A candidate gaffe', 'One of your candidates said something foolish on local radio. Will you sack them?', { x: 'Say it was wrong, and they have apologised.', e: { o: 0.1 }, h: 'Leader: candidate has apologised' }, { x: 'Say you will look into it.', e: { o: -0.05 }, h: 'Leader to look into candidate' }, { x: 'Defend them hard.', e: { o: -0.2, u: 2 }, h: 'Leader defends candidate' }),
    dq('Interest rates', 'Will rates go up again under you?', { x: 'Say the Reserve Bank decides, and your plan helps.', e: { o: 0.15 }, h: 'Leader respects the RBA' }, { x: 'Promise rates will come down.', rng: { k: 'd', min: 1, ok: { o: 0.3 }, no: { o: -0.5, m: -1 } }, h: 'Leader makes rates promise' }, { x: 'Blame the other side.', e: { m: 1, o: -0.05 }, h: 'Leader blames rivals on rates' }),
    dq('The preference deal', 'Have you done a secret preference deal?', { x: 'Say every deal will be public.', e: { o: 0.15 }, h: 'Leader: deals will be public' }, { x: 'Say preferences are for voters.', e: { o: 0.05 }, h: 'Leader: preferences are for voters' }, { x: 'Deny any deal, flatly.', rng: { k: 'm', min: 1, ok: { m: 1 }, no: { o: -0.4, m: -2 } }, h: 'Leader denies deal' }),
    dq('Your energy plan', 'Will power bills go down under you, by how much and when?', { x: 'Give a number and a date.', rng: { k: 'd', min: 1, ok: { o: 0.35, m: 1 }, no: { o: -0.5, m: -2 } }, h: 'Leader puts a number on bills' }, { x: 'Say bills will be lower than under the other side.', e: { o: 0.1 }, h: 'Leader: lower than the other side' }, { x: 'Say nobody can promise that.', e: { o: -0.05, u: 1 }, h: 'Leader will not promise lower bills' }),
    dq('A local issue', 'Locals want to know about the hospital car park. Will you fund it?', { x: 'Commit to it on the spot.', e: { o: 0.1, ledger: 1 }, h: 'Leader funds car park on the spot' }, { x: 'Say you will meet the community.', e: { o: 0.05 }, h: 'Leader to meet the community' }, { x: 'Say it is a state matter.', e: { o: -0.1 }, h: 'Leader: state matter' }),
    dq('The leadership', 'Will you serve a full term if you win?', { x: 'Yes, all of it.', e: { u: 2, o: 0.05 }, h: 'Leader promises a full term' }, { x: 'Say that is up to the voters.', e: { o: 0 }, h: 'Leader dodges term question' }, { x: 'Laugh it off.', e: { m: 1, u: -1 }, h: 'Leader laughs off term question' })
  ];
  C.doorTimeout = { x: 'Say nothing and walk away from the cameras.', timeout: true, e: { o: -0.45, m: -2 }, h: '{surname} walks away from the cameras' };

  // ---- after a backfire: put it right, double down, or blame the media
  C.special.RECOVER = { id: 'RECOVER', t: 'The morning after', k: 'Damage control', q: 'Yesterday went badly and the clip is everywhere. The press pack is waiting outside.', opts: [
    { x: 'Apologise, briefly, and move on.', e: { o: 0.25, u: 2 }, h: 'Leader apologises, and the story fades' },
    { x: 'Double down: you meant every word.', rng: { k: 'm', min: 1, ok: { o: 0.45, m: 2 }, no: { o: -0.5, m: -2, u: -2 } }, h: 'Leader doubles down', recover: 'double' },
    { x: 'Blame the media for a beat-up.', e: { m: 1, u: -2, o: -0.1 }, h: 'Leader blames the media' }] };

  // ---- candidate disendorsement: the ballot papers are printed, with your party’s name next to the candidate
  C.cards.push({ id: 'DISENDORSE', tag: 'CRISIS', minTurn: 8, t: 'A candidate problem in {seat}', k: 'Ballot papers are printed', q: 'Old posts from your candidate in {seat} have surfaced. The ballot papers are already printed with your party’s name next to theirs.', opts: [
    { x: 'Disendorse them anyway: your party will campaign against its own name on the ballot.', e: { o: 0.2, u: -3, seatSelf: -4, f: ['DISENDORSED'] }, h: 'Party dumps its {seat} candidate after ballots printed' },
    { x: 'Stand by them and call it a beat-up.', e: { o: -0.5, m: -2 }, h: 'Party stands by {seat} candidate' },
    { x: 'Make them apologise in front of the cameras.', rng: { k: 'm', min: 1, ok: { o: 0.1, m: 1 }, no: { o: -0.6, m: -2 } }, h: '{seat} candidate apologises' }] });

  // ---- endorsements, announced after the Press Club (milestone 3) and on election eve (milestone 5). Each group scores your
  // campaign: a base by party, plus the stances you have taken and a few flags. Two points or more and they endorse you.
  C.endorsers = [
    { id: 'unions', n: 'The peak union body', base: { ALP: 2, GRN: 1, IND: 0, LNP: -2, ONP: -1 }, st: { spending: [1, -1], tax: [1, -1] }, fx: { r: { OUT: 0.4 } } },
    { id: 'business', n: 'The big-business lobby', base: { LNP: 1, ALP: 0, IND: 0, ONP: -1, GRN: -2 }, st: { tax: [-2, 1], spending: [-1, 1] }, flags: { PASSED_PBO_CLEAN: 2 }, fx: { o: 0.2, pp: 5 } },
    { id: 'farmers', n: 'The farmers’ federation', base: { LNP: 1, ONP: 1, ALP: -1, IND: -1, GRN: -2 }, st: { fossil: [1, -1] }, nats: 60, fx: { r: { RUR: 0.5 } } },
    { id: 'welfare', n: 'The community sector', base: { ALP: 1, GRN: 2, IND: 1, LNP: -1, ONP: -2 }, st: { spending: [1, -1], border: [-1, 1] }, fx: { r: { IN: 0.2 }, o: 0.1 } },
    { id: 'green', n: 'The environment movement', base: { GRN: 3, IND: 2, ALP: 0, LNP: -2, ONP: -3 }, st: { fossil: [-3, 2] }, fx: { r: { IN: 0.5 } } },
    { id: 'papers', n: 'The Sunday papers', base: {}, lead: 2, fx: { o: 0.3, m: 1 } }
  ];

  // ---- weekly targets: one goal for each campaign week, set on the Monday and judged on the Friday
  C.targets = {
    seats: 'Finish the week on {v} or more seats in the poll average.',
    mom: 'End the week with momentum of +{v} or more.',
    unity: 'Keep caucus unity at {v} or more to the weekend.',
    vote: 'Lift your vote in the polls to {v}%.'
  };

  // ---- scenario decks: each opening deals more of its own kind of card
  const W = { ratehike: { COST_OF_LIVING: 2.5, ECONOMY: 2 }, blackout: { ENERGY: 3 }, hung: { PREFS: 2.5, CRISIS: 1.5 }, siege: { CRISIS: 2 }, surge: { MIGRATION: 2.5, PREFS: 1.5 }, teal: { ENERGY: 1.5, CRISIS: 1.5 },
    security: { NATIONAL_SECURITY: 3 }, housing: { HOUSING: 3, COST_OF_LIVING: 1.5 }, climate: { ENERGY: 2.5 }, migration: { MIGRATION: 3, HOUSING: 1.5 }, drought: { ECONOMY: 1.5, COST_OF_LIVING: 1.5 }, budget: { ECONOMY: 2.5, TAX: 2 }, scandal: { CRISIS: 3 } };
  (C.scenarios || []).forEach(s => { if (W[s.id]) s.w = W[s.id]; });

  // ---- a hung parliament: the crossbench blocs, how far each leans to each side (0 to 1), and what they want
  C.blocs = {
    GRN: { n: 'The Greens', lean: { ALP: 0.85, LNP: 0.03, ONP: 0 }, ask: 'A rent freeze, no new coal or gas, and dental in Medicare.' },
    IND: { n: 'The teals and independents', lean: { ALP: 0.55, LNP: 0.35, ONP: 0.05 }, ask: 'A stronger integrity commission, a 75% emissions cut by 2035, and truth-in-advertising laws.' },
    KAP: { n: 'Katter’s Australian Party', lean: { ALP: 0.2, LNP: 0.6, ONP: 0.6 }, ask: 'Dams in the north, a cap on fuel prices and protection for regional jobs.' },
    XEN: { n: 'Centre Alliance', lean: { ALP: 0.45, LNP: 0.45, ONP: 0.1 }, ask: 'Submarine work for Adelaide and water for the Murray.' },
    ONP: { n: 'One Nation', lean: { ALP: 0.02, LNP: 0.7 }, ask: 'A migration freeze and an end to net zero.' },
    LNP: { n: 'The Coalition', lean: { ALP: 0.1, ONP: 0.65 }, ask: 'The Treasury, the deputy prime ministership and a veto on energy policy.' },
    ALP: { n: 'Labor', lean: { LNP: 0.05, ONP: 0 }, ask: 'Labor would rather sit in opposition than prop up either side.' },
    OTH: { n: 'Other crossbenchers', lean: { ALP: 0.3, LNP: 0.35, ONP: 0.2 }, ask: 'A seat at the table on their local issues.' }
  };
  C.offers = [{ n: 'No deal', d: 'They decide on their own.' }, { n: 'Modest offer', d: '+ support, −3 unity', u: -3, b: 0.18 }, { n: 'Full deal', d: '++ support, −7 unity', u: -7, b: 0.4 }];
})();
// ---- leader-only answers for the new leaders, attached like the others (see campaign-data2.js)
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const LO = [
    { mile: 3, only: 'david_shoebridge', x: 'Turn the mid-campaign showcase into a renters’ manifesto: a freeze, a cap and a national renters’ commissioner.', tag: 'HOUSING', e: { r: { IN: { GRN: 1.6 }, OUT: { GRN: 0.5 } }, m: 1 }, h: 'Shoebridge’s renters’ manifesto' },
    { mile: 4, only: 'david_shoebridge', cursed: true, x: 'Open the debate by calling for an end to negative gearing, the tax cuts and private-school funding, all at once.', st: 'tax+', rng: { k: 'd', min: 3, ok: { o: 0.6, m: 2 }, no: { o: -0.8, r: { OUT: -1 }, m: -2 } }, h: 'Shoebridge goes for everything at once' },
    { mile: 1, only: 'zali_steggall', x: 'Launch on Manly beach with every sitting teal: a movement, not a party.', e: { r: { IN: { IND: 1.4 } }, m: 2, u: 3 }, h: 'The teals launch together on Manly beach' },
    { mile: 5, only: 'zali_steggall', cursed: true, x: 'Announce on election eve which side you would back in a hung parliament.', rng: { k: 'm', min: 2, ok: { r: { IN: { IND: 0.8 } }, m: 2 }, no: { r: { IN: { IND: -1.2 } }, m: -3 } }, h: 'Steggall picks a side on election eve' },
    { mile: 2, only: 'allegra_spender', x: 'Release a fully costed tax-reform plan: the economist’s case for change.', e: { o: 0.7, pp: 5, f: ['PASSED_PBO_CLEAN'] }, h: 'Spender’s tax plan adds up' },
    { mile: 3, only: 'allegra_spender', cursed: true, x: 'Back a broader GST as the price of income-tax relief.', tag: 'TAX', rng: { k: 'd', min: 3, ok: { o: 0.5, r: { IN: 0.8 } }, no: { o: -1, r: { OUT: -1 }, m: -2 } }, h: 'Spender backs a broader GST' }
  ];
  LO.forEach(o => { o.lo = o.only + ':m' + o.mile; });
  C.cards.forEach(c => LO.forEach(o => { if (c.mile === o.mile) { const { mile, ...opt } = o; c.opts.push({ tag: 'GENERAL', ...opt }); } }));
  // the full list, gathered from the cards so nothing is missed (Bowen’s Net Zero pivot is defined in campaign-data.js)
  const seen = {}; C.cards.forEach(c => c.opts.forEach(o => { if (o.lo && !seen[o.lo]) seen[o.lo] = o; })); C.LO = Object.values(seen);
})();
// ---- card titles in the house style: sentence case, short, no ampersands (the Part 2 cards came in title case)
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const T = {
    B2_01: 'South-east Queensland: Olympics and congestion', B2_02: 'Coal royalties, jobs and crime in the Bowen Basin', B2_03: 'Defending the WA GST deal', B2_04: 'The live sheep export ban',
    B2_05: 'Western Sydney tolls and airport rail', B2_06: 'Offshore wind versus heavy industry', B2_07: 'The Suburban Rail Loop or outer-suburban roads', B2_08: 'Bass Strait gas and Murray–Darling water',
    B2_09: 'The Osborne sub yard and Whyalla steelworks', B2_10: 'Hospital ramping in Adelaide', B2_11: 'Hobart’s stadium, salmon and ferries', B2_12: 'Marinus Link and Tasmanian power bills',
    B2_13: 'Public service caps and decentralisation', B2_14: 'Darwin: defence, Middle Arm and remote services', B2_15: 'The kitchen-table launch', B2_16: 'The mid-campaign mini-budget',
    B2_17: 'The big housing interview', B2_18: 'The people’s forum: 100 undecided voters', B2_19: 'The final 24-hour blitz', B2_20: 'Small-business insolvencies',
    B2_21: 'Bracket creep and tax indexation', B2_22: 'Childcare subsidies or family tax splitting', B2_23: 'International student caps', B2_24: 'Rezoning around train stations',
    B2_25: 'Where to put the nuclear reactors', B2_26: 'Vehicle standards and the “ute tax” scare', B2_27: 'The NDIS cost blowout', B2_28: 'Regional aged care closures',
    B2_29: 'An incident in the South China Sea', B2_30: 'Foreign ownership of farms and minerals', B2_31: 'Truth in advertising and donation caps', B2_32: 'Bond market jitters',
    B2_33: 'The Business Council revolts', B2_34: 'A nationwide cyber outage', B2_35: 'A fire ant outbreak', B2_36: 'The teals’ kingmaker demands',
    B2_37: 'Senate gridlock and a double-dissolution threat', B2_38: 'Foreign policy in the inner city', B2_39: 'The unions push a four-day week', B2_40: 'Former Labor premiers go public',
    B2_41: 'Moderate women for the teal seats', B2_42: 'The Nationals want a big-tech levy', B2_43: 'Super for housing', B2_44: 'Joyce’s recruits versus the old guard', B2_45: 'Micro-parties poach your preferences',
    B3_01: 'The heartland launch', B3_02: 'The AFR stress test', B3_03: 'The first-home buyers’ town hall', B3_04: 'The commercial network debate', B3_05: 'The election-eve address',
    B3_06: 'The under-16 social media ban', B3_07: 'AI, white-collar jobs and data centres', B3_08: 'Student debt and free TAFE', B3_09: 'Public school funding', B3_10: 'Pension deeming rates',
    B3_11: 'Youth crime and bail laws', B3_12: 'Domestic violence and emergency housing', B3_13: 'Super on parental leave', B3_14: 'ABC funding and regional newspapers', B3_15: 'Illicit tobacco and vaping taxes',
    B3_16: 'Closing the Gap', B3_17: 'A national service corps', B3_18: 'Inland Rail cost blowouts', B3_19: 'High-speed rail or highway blackspots', B3_20: 'Airline competition and regional airfares',
    B3_21: 'The diesel fuel rebate', B3_22: 'The Great Artesian Basin and carbon capture', B3_23: 'Native forest logging bans', B3_24: 'Regional bank branch closures', B3_25: 'Road-user charges for trucks',
    B3_26: 'Food or energy: solar on farmland', B3_27: 'Regional doctor shortages', B3_28: 'China trade or minerals security', B3_29: 'Pacific security and climate finance', B3_30: 'Sovereign fuel reserves',
    B3_31: 'Foreign interference in universities', B3_32: 'A sovereign space and drone industry', B3_33: 'A global minimum tax', B3_34: 'Border protection and detention', B3_35: 'The veterans’ claims backlog',
    B3_36: 'The “hidden cuts” scare', B3_37: 'The spill leak resurfaces', B3_38: 'A quarterly inflation spike', B3_39: 'A major airline collapses', B3_40: 'A hot-mic gaffe at a bakery',
    B3_42: 'An outer-suburban scramble', B3_43: 'The marginal-seat grants row', B3_44: 'The Left pushes a coal levy and wealth tax', B3_45: 'Outer-suburban MPs want action',
    B3_46: 'The Business Council rebukes you', B3_47: 'The Nationals want their own brand', B3_48: 'Tax cuts now, or debt first', B3_49: 'Hanson and Joyce fight over preferences', B3_50: 'Citizen-initiated referendums',
    B4_01: 'Bank profits and switching fees', B4_02: 'The insurance affordability crisis', B4_03: 'The minimum wage', B4_04: 'Rules for the gig economy', B4_05: 'Payroll tax and red tape',
    B4_06: 'Super at 12%, or take-home pay', B4_07: 'Buy-now-pay-later debt', B4_08: 'Builder collapses', B4_09: 'The “pub tax”', B4_10: 'Toll-road transparency',
    B4_11: 'Childcare safety and fee caps', B4_12: 'Medicine shortages', B4_13: 'Private health rebates and regional maternity', B4_14: 'Dental care in Medicare', B4_15: 'Power bill rebates or tariff reform',
    B4_16: 'Short-stay rentals in coastal towns', B4_17: 'Public housing targets or private supply', B4_18: 'The 5% deposit guarantee', B4_19: 'Modular housing and trade visas', B4_20: 'A road-user charge for electric cars',
    B4_21: 'Buses, ferries and commuter car parks', B4_22: 'Pipes before houses', B4_23: 'Vacant home taxes', B4_24: 'Heat and tree cover in the western suburbs', B4_25: 'Council rates and airport security costs',
    B4_26: 'Downsizing and the pension asset test', B4_27: 'Outer-suburban hospitals and urgent care', B4_28: 'Household battery rebates', B4_29: 'The “sun tax” row', B4_30: 'Future Made in Australia',
    B4_31: 'The Safeguard Mechanism and carbon tariffs', B4_32: 'New nature laws and a climate trigger', B4_33: 'Reef water quality and north Queensland farms', B4_34: 'Koala corridors or new housing',
    B4_35: 'Fishing access and marine parks', B4_36: 'The critical minerals price slump', B4_37: 'Payments for transmission-line neighbours', B4_38: 'Packaging rules and soft-plastics recycling',
    B4_39: 'Snowy 2.0 cost blowouts', B4_40: 'Farm emissions and soil carbon', B4_41: 'The Central Coast: rail, hospitals and the seawall', B4_42: 'Three-way battles in the bush',
    B4_43: 'Geelong fast rail and the Surf Coast', B4_44: 'Ballarat and Bendigo: trains and health', B4_45: 'The Sunshine Coast and the Bruce Highway', B4_46: 'Far north Queensland: tourism and insurance',
    B4_47: 'Outer Perth’s hospitals', B4_48: 'Bunbury, lithium and Collie', B4_49: 'A defence tech college for northern Adelaide', B4_50: 'Hobart: housing, science and the Derwent ferry',
    B4_51: 'Cross-border health and the airport curfew', B4_52: 'Tindal, beef roads and remote power', B4_53: 'Corruption commission public hearings', B4_54: 'Freedom of information and ministers’ diaries',
    B4_55: 'The High Court and immigration detention', B4_56: 'Social cohesion and campus safety', B4_57: 'Religious discrimination and faith schools', B4_59: 'Making medicines in Australia',
    B4_60: 'The Quad, ASEAN and the Indian Ocean', B4_61: 'Community sport grants and the 2032 legacy', B4_62: 'Local content quotas for streaming', B4_64: 'A huge retail data breach',
    B4_65: 'The campaign bus breaks down in the outback', B4_66: 'A former party titan goes on Sunday TV', B4_67: 'Pre-poll opens to record queues', B4_68: 'The Greens demand coal bans and rent freezes',
    B4_69: 'Bob Katter’s demands', B4_70: 'The AEC corflute colour row', B4_71: 'Premiers demand hospital money', B4_72: 'Resource MPs demand a gas guarantee', B4_73: 'The rank and file push rent caps',
    B4_74: 'Catholic and independent school funding', B4_75: 'Conservative senators target the ABC', B4_76: 'Moderate MPs demand childcare and parental leave', B4_77: 'The Nationals threaten revolt over farm access',
    B4_78: 'Joyce’s dams or Hanson’s flat tax', B4_79: 'Managing 150 grassroots candidates', B4_80: 'Rural Coalition seats or Labor’s outer suburbs?'
  };
  // and in the text of those cards: “and” for “&”, money written out
  const tidy = s => typeof s !== 'string' ? s : s.replace(/\bR&D\b/g, 'research and development').replace(/ & /g, ' and ').replace(/&/g, ' and ').replace(/\$(\d+(?:\.\d+)?)B\b/g, '$$$1 billion').replace(/\$(\d+(?:\.\d+)?)M\b/g, '$$$1 million').replace(/(\d+(?:\.\d+)?)M IDs/g, '$1 million IDs').replace(/\s{2,}/g, ' ');
  C.cards.forEach(c => { const m = c.id.match(/^CAMP_(B[234]_\d+)$/); if (!m) return; if (T[m[1]]) c.t = T[m[1]]; c.q = tidy(c.q); c.opts.forEach(o => { if (o.only) return; o.x = tidy(o.x); o.h = tidy(o.h); }); });
})();
// ---- no @ signs anywhere in card text
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;
  const fix = s => typeof s !== 'string' ? s : s.replace(/Bank@Post/g, 'post-office banking').replace(/\s*@\s*/g, ' at ');
  C.cards.concat(C.spill || [], Object.values(C.special || {})).forEach(c => { if (!c) return; c.t = fix(c.t); c.q = fix(c.q); (c.opts || []).forEach(o => { o.x = fix(o.x); o.h = fix(o.h); }); });

  // how each mood sits for each side (the spirit's own tier is the government's view): [Labor, Coalition, One Nation, Greens, teals]
  C.spiritSide = {}; Object.entries({
    RBA_485_SQUEEZE: [-2, 1, 1, 0, 0], RBA_STAGFLATION_CRISIS: [-3, 2, 2, 1, 1], RBA_RATE_RELIEF_HORIZON: [-1, 0, 0, 0, 0],
    HOUSING_SHORTFALL_400K: [-2, -1, 1, 1, 0], HOUSING_REVOLT: [-3, -2, 2, 2, 1], HOUSING_ACCORD_TRACTION: [0, -1, 0, 0, 0],
    GRID_TRANSITION_CROSSROADS: [0, 0, 0, 0, 0], GRID_RELIABILITY_SCARE: [-2, 1, 1, -1, 0], ENERGY_PRICE_STABILISATION: [1, -1, 0, 0, 0],
    FUTURE_MADE_IN_AUSTRALIA_BOOM: [2, -1, -1, 0, 0], ENERGY_ABUNDANCE_RESET: [-1, 2, 2, -1, -1],
    MEDICARE_JULY_PACKAGE: [1, -1, -1, 0, 0], MEDICARE_FORTRESS: [2, -2, -1, 0, 0], MEDICARE_GAP_STRAIN: [0, 1, 0, 0, 0],
    TAX_AND_PROPERTY_FLASHPOINT: [-1, 1, 0, 0, 0], ASPIRATION_BACKLASH: [-2, 2, 0, 0, 0], TAX_COMPROMISE_SETTLED: [0, 0, 0, 0, 0],
    THREE_WAY_RIGHT_FRACTURE: [1, -2, 2, 0, 0], RIGHT_WING_CIVIL_WAR: [1, -3, 2, 0, 0], CONSERVATIVE_TRUCE: [0, 0, 0, 0, 0], NEW_RIGHT_REALIGNMENT: [0, -2, 2, 0, 0],
    AUKUS_AND_REGIONAL_DETERRENCE: [1, -1, 0, 0, 0], INDO_PACIFIC_FLASHPOINT: [1, -1, 0, -1, 0], DEFENCE_REVIEW_DEBATE: [0, 0, 0, 0, 0],
    ANTI_ESTABLISHMENT_CYNICISM: [-1, -1, 1, 1, 2], THROW_THE_BUMS_OUT: [-3, -1, 2, 1, 2], CAUTIOUS_REENGAGEMENT: [0, 0, 0, 0, -1], THREE_CORNERED_CONTESTS: [1, -2, 1, 0, 0]
  }).forEach(([id, t]) => { C.spiritSide[id] = { ALP: t[0], LNP: t[1], ONP: t[2], GRN: t[3], IND: t[4] }; });
  // the issue each mood belongs to, shown above its name
  C.spiritIssue = { RBA: 'Cost of living', HOUSING: 'Housing', GRID: 'Energy', MEDICARE: 'Health', TAX: 'Tax and aspiration', RIGHT: 'The right', AUKUS: 'Defence', CYNIC: 'Trust in politics', WAVE: 'Your campaign', POLL: 'The polls', NATS: 'The Coalition' };
})();
