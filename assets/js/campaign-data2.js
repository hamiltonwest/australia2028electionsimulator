// Campaign mode, second content pack: pollsters, interrupt cards (launch venue, debate prep, leadership speculation),
// follow-up chains, famous marginals, state spillover, international shocks, personality moments, preference deals,
// running-mate events, base bonus cards, autonomous Greens and teal surges, rival responses, spirit icons,
// and the prompts for every Part 2 card. All fictional game content; no quotes from real people.
(() => {
  const C = window.CAMPAIGN_DATA; if (!C) return;

  // ---- fictional pollsters: a house lean (points, by party) and a sampling error (points, one SD)
  C.pollsters = [
    { n: 'Newsfield', lean: { ALP: 0.6, LNP: -0.3, ONP: -0.5, GRN: 0.2 }, moe: 0.9, note: 'online panel, leans Labor' },
    { n: 'Southern Cross Research', lean: { ALP: -0.5, LNP: 0.6, ONP: 0.1, GRN: -0.3 }, moe: 1.1, note: 'phone and online, leans Coalition' },
    { n: 'Quokka Analytics', lean: { ALP: -0.1, LNP: -0.3, ONP: 0.8, GRN: 0 }, moe: 1.5, note: 'robopoll, finds One Nation high' },
    { n: 'Redgum Polling', lean: { ALP: 0.2, LNP: 0.1, ONP: -0.2, GRN: 0.4 }, moe: 1.2, note: 'small samples, swings about' }
  ];
  const S = (id, n, tier, d, x) => ({ id, n, tier, d, ...x });
  [
    S('POLL_HERDING', 'Pollsters herding', 0, 'Every poll says much the same thing. That does not mean they are right.', { removable: false, grp: 'POLL' }),
    S('THREE_CORNERED_CONTESTS', 'Three-cornered contests', -2, 'The Nationals are running against the Liberals in regional seats, splitting the Coalition vote.', { removable: false, grp: 'NATS' })
  ].forEach(x => { C.spirits[x.id] = x; });

  C.decisions.push(
    { id: 'DEC_INTERNAL_POLL', n: 'Commission internal polling', cost: 25, cd: 4, max: 3, d: 'A private poll with a far smaller error, for 3 turns.', e: { internal: 3 } },
    { id: 'DEC_REST_DAY', n: 'Rest day for the leader', cost: 10, cd: 3, max: 4, d: '+30 stamina; −1 momentum.', e: { sta: 30, m: -1 } },
    { id: 'DEC_NATS_PEACE', party: 'LNP', n: 'Joint Coalition party-room peace deal', cost: 30, cd: 4, max: 2, d: '+20 Nationals goodwill; +4 unity.', e: { nats: 20, u: 4 } }
  );

  // ---- interrupt cards (do not use up a turn)
  const venue = (st, n, h, x) => ({ x: `Launch in ${n}.`, e: x, h: `Campaign launched in ${h}` });
  C.special = {
    VENUE: { id: 'VENUE', t: 'Where do you launch?', k: 'Before the launch', q: 'The campaign launch is the biggest set piece of the race. The venue says who you are fighting for.', opts: [
      { x: 'Western Sydney: a club auditorium in the mortgage belt.', e: { s: { NSW: 0.6 }, r: { OUT: 0.5 } }, h: 'Launch heads to the mortgage belt' },
      { x: 'Brisbane: a riverside hall, aimed at Queensland’s 30 seats.', e: { s: { QLD: 0.8 } }, h: 'Queensland gets the launch' },
      { x: 'Melbourne’s outer east: a community centre in a marginal.', e: { s: { VIC: 0.6 }, r: { OUT: 0.3 } }, h: 'Melbourne’s suburbs host the launch' },
      { x: 'Perth: the west, where elections are often settled late on the night.', e: { s: { WA: 1.0 } }, h: 'Launch goes west' },
      { x: 'Adelaide: a shipyard, with defence jobs as the backdrop.', e: { s: { SA: 1.0 }, r: { PROV: 0.2 } }, h: 'Shipyard launch in Adelaide' },
      { x: 'A regional city: Townsville, Bendigo or Wagga, to say the bush matters.', e: { r: { RUR: 0.6, PROV: 0.5 } }, h: 'Launch goes regional' }] },
    PREP: { id: 'PREP', t: 'Debate prep', k: 'Before the debate', q: 'The leaders’ debate is next. How do you spend the last day before it?', opts: [
      { x: 'Full mock debates with a staffer playing your rival.', e: { nextBonus: 2, sta: -10 }, h: 'Leader locked away for debate prep' },
      { x: 'Study the briefing books and costings line by line.', e: { nextBonus: 1, pp: 5 }, h: 'Leader cramming the numbers' },
      { x: 'Rest, a walk and an early night.', e: { sta: 20, u: 3 }, h: 'Leader takes a quiet day before the debate' }] },
    SPEC: { id: 'SPEC', t: 'Leadership speculation', k: 'Emergency', q: 'Your caucus is leaking about the leadership. Columnists are counting numbers for a mid-campaign change of leader.', opts: [
      { x: 'Call a snap party-room vote to end it now.', rng: { k: 'u', min: 35, ok: { u: 25, m: 1, f: ['SPEC_SURVIVED'] }, no: { spec: 'lost' } }, h: 'Leader calls snap party-room vote' },
      { x: 'Spend 30 Political Power on promotions and promises to buy quiet.', cost: 30, e: { u: 18, pp: -30 }, h: 'Peace bought in the party room' },
      { x: 'Ignore it and campaign harder.', e: { u: -6, m: 1, o: -0.4 }, h: 'Leader brushes off leadership talk' }] },
    REVOLT: null, QUIET: null
  };

  // ---- extra deck cards
  const cards = [];
  const add = (x) => cards.push(x);
  // follow-up chains: req = flags (a chosen option sets "<CARD>#<n>"), after = turns to wait
  [
    ['FU_BIG_SPEND', ['PROMISED_BIG_SPENDING'], 4, 'Treasury finds a hole in your relief package', 'Treasury’s pre-election update says your relief package is several billion dollars short.', [
      ['Trim the package and own the correction.', { o: -0.3, u: 4, sp: [['REDUCE', 'RBA_485_SQUEEZE']] }, 'Relief package trimmed after costings hole'],
      ['Fund the gap with more borrowing.', { r: { OUT: 0.6 }, sp: [['EXPAND', 'RBA_485_SQUEEZE']] }, 'Borrowing to cover relief package'],
      ['Accuse Treasury of political modelling.', { rng: { k: 'm', min: 2, ok: { o: 0.4, m: 1 }, no: { o: -0.9, m: -2 } } }, 'Campaign turns on Treasury']]],
    ['FU_POPULIST', ['PITCH_HARDLINE_POPULIST'], 5, 'Community leaders push back', 'Multicultural community leaders in the outer suburbs say your launch pitch made them feel unwelcome.', [
      ['Meet them, listen and soften the language.', { r: { OUT: 0.6, RUR: -0.3 }, u: 2 }, 'Leader meets community leaders'],
      ['Stand firm: the pitch was about numbers, not people.', { r: { RUR: 0.6, OUT: -0.5 }, m: 1 }, 'Leader stands by launch pitch'],
      ['Say nothing and change the subject to power bills.', { o: -0.2 }, 'Campaign changes the subject']]],
    ['FU_DISCIPLINE', ['PITCH_ECONOMIC_DISCIPLINE'], 6, '“Small target, no vision”', 'The commentariat has decided your disciplined campaign is boring.', [
      ['Unveil one big nation-building idea.', { o: 0.5, pp: -10, m: 2 }, 'Big idea breaks the campaign’s calm'],
      ['Embrace it: boring is safe, safe is good.', { u: 4, o: 0.2 }, 'Leader embraces the boring label'],
      ['Go negative on your rivals instead.', { attack: 0.6, u: -2 }, 'Campaign turns negative']]],
    ['FU_IOU', ['FACTIONAL_IOU'], 3, 'The faction calls in its IOU', 'The bloc that delivered your numbers wants its reward now: a seat preselection for a favourite son.', [
      ['Pay up: parachute their candidate into a safe seat.', { u: 6, o: -0.3 }, 'Factional favourite parachuted in'],
      ['Stall until after the election.', { u: -6 }, 'Faction told to wait'],
      ['Refuse publicly to show who is boss.', { u: -12, o: 0.4, m: 1 }, 'Leader defies faction']]],
    ['FU_CLIMATE_PLEDGE', ['CLIMATE_PURIST_PLEDGE'], 4, 'The Left wants a coal date', 'The climate charter you signed to win the spill has no coal phase-out date. The Left wants one, now.', [
      ['Name a date.', { r: { IN: 0.8, RUR: -0.8, PROV: -0.4 }, pf: { grn: 2 }, u: 5 }, 'Coal phase-out date named'],
      ['Promise a date after an independent review.', { u: -3 }, 'Coal date sent to review'],
      ['Tear up the charter.', { u: -14, r: { PROV: 0.5 } }, 'Climate charter torn up']]],
    ['FU_NATS_PACT', ['NATS_COALITION_PACT'], 5, 'The Nationals want it in writing', 'The Nationals want the gas guarantee you promised them signed before polling day.', [
      ['Sign it.', { r: { RUR: 0.7, IN: -0.6 }, nats: 15, u: 3 }, 'Gas guarantee signed'],
      ['Promise to sign after the election.', { nats: -12 }, 'Nationals told to wait'],
      ['Renegotiate in public.', { nats: -20, r: { IN: 0.6 } }, 'Coalition agreement row goes public']]],
    ['FU_PATRON', ['SPILL_HANSON_BLESSING'], 6, 'The patron goes off-script', 'One Nation’s founder, now campaign patron, gives a fiery speech that contradicts your policy.', [
      ['Back her: the base loves it.', { r: { RUR: 0.8, OUT: 0.3, IN: -0.7 }, m: 1 }, 'Leader backs patron’s speech'],
      ['Gently correct the record.', { u: -4, o: 0.2 }, 'Leader corrects the record'],
      ['Joint press conference to show a united front.', { u: 6, o: 0.3, pp: -5 }, 'United front on display']]],
    ['FU_PBO_GOOD', ['PASSED_PBO_CLEAN'], 8, 'Economists back your costings', 'A group of leading economists says your costings are the most credible on offer.', [
      ['Put them in your ads.', { o: 0.6, pp: -10 }, 'Economists star in campaign ads'],
      ['Use it in the debate.', { nextBonus: 1, o: 0.2 }, 'Costings praise heads into the debate'],
      ['Stay humble and keep moving.', { u: 3, o: 0.2 }, 'Campaign stays humble']]],
    ['FU_GREENS_UNIONS', ['GREENS_DEAL_SIGNED'], 3, 'Mining unions revolt over the Greens accord', 'Mining and energy unions say the Greens accord sells out their members.', [
      ['Guarantee no forced closures.', { s: { QLD: 0.5, WA: 0.4 }, pf: { grn: -1 } }, 'No forced closures, unions told'],
      ['Stand by the accord.', { r: { IN: 0.5 }, s: { QLD: -0.7, WA: -0.5 }, u: -4 }, 'Accord stays despite union anger'],
      ['Fund a transition jobs package.', { pp: -15, r: { PROV: 0.5 } }, 'Transition jobs package unveiled']]],
    ['FU_NET_ZERO', ['SCRAPPED_NET_ZERO'], 2, 'An open letter from the scientists', 'Hundreds of climate scientists sign an open letter condemning your Net Zero reversal.', [
      ['Double down: affordability first.', { r: { RUR: 0.6, IN: -0.8 }, m: 1 }, 'Leader doubles down on baseload'],
      ['Promise a new, “realistic” emissions target.', { r: { IN: 0.4 }, u: -3 }, 'New emissions target promised'],
      ['Ignore it.', { r: { IN: -0.4 } }, 'Campaign ignores open letter']]],
    ['FU_COUNCILS', ['PRESS_CLUB_HOUSING'], 5, 'Councils push back', 'Local councils say your housing compact overrides their planning powers.', [
      ['Offer councils infrastructure money to sign up.', { pp: -15, r: { OUT: 0.6 } }, 'Councils offered cash to build'],
      ['Override them: homes come first.', { r: { IN: 0.5, OUT: -0.3 }, sp: [['REDUCE', 'HOUSING_SHORTFALL_400K']] }, 'Councils overridden on housing'],
      ['Soften the targets.', { sp: [['EXPAND', 'HOUSING_ACCORD_TRACTION']], u: 3 }, 'Housing targets softened']]],
    ['FU_FACTORY', ['PITCH_HEARTLAND_INDUSTRY'], 6, 'A factory closes', 'A regional manufacturer announces it will close, testing your manufacturing pitch.', [
      ['Promise a rescue package on the spot.', { r: { PROV: 0.9 }, pp: -15, m: 1 }, 'Leader promises factory rescue'],
      ['Promise retraining and a new industry hub.', { r: { PROV: 0.5, IN: 0.2 } }, 'Retraining hub for closed factory'],
      ['Blame energy prices and your rivals.', { r: { RUR: 0.4 }, attack: 0.3 }, 'Factory closure blamed on power prices']]],
    ['FU_RBA_ATTACK', ['CAMP_ECON_01#1'], 4, 'Former Treasury chiefs warn you', 'Former Treasury secretaries publicly warn that attacking the Reserve Bank risks its independence.', [
      ['Clarify: the bank is independent, the pain is real.', { o: 0.2, u: 2 }, 'Leader clarifies RBA attack'],
      ['Keep attacking.', { r: { OUT: 0.6, IN: -0.6 }, m: 1 }, 'RBA attacks continue'],
      ['Promise a review of the bank’s mandate.', { r: { OUT: 0.3 }, sp: [['EXPAND', 'RBA_485_SQUEEZE']] }, 'Review of RBA mandate promised']]],
    ['FU_SECOND_POSTS', ['CAMP_CRIS_02#1'], 3, 'A second batch of posts', 'More posts by the candidate you defended surface, and they are worse.', [
      ['Disendorse now.', { o: -0.3, u: 2 }, 'Candidate finally dumped'],
      ['Keep defending.', { r: { RUR: 0.3, IN: -1, OUT: -0.8 }, sp: [['EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM']] }, 'Leader digs in over candidate'],
      ['Say the party will review all candidates.', { o: -0.4, shield: 3 }, 'Candidate vetting review ordered']], { gaffe: true, tag: 'CRISIS' }],
    ['FU_FLOOD_MAYORS', ['CAMP_CRIS_01#2'], 2, 'Flood-zone mayors boycott your visit', 'Mayors in the flood zone refuse to meet you after your attack ads kept running through the disaster.', [
      ['Apologise publicly and pledge recovery money.', { s: { QLD: 0.4, NSW: 0.2 }, pp: -10 }, 'Leader apologises to flood mayors'],
      ['Visit anyway.', { s: { QLD: -0.5 }, m: -1 }, 'Awkward visit to flood zone'],
      ['Send a senior colleague instead.', { o: -0.1 }, 'Deputy sent to the flood zone']], { tag: 'CRISIS' }],
    ['FU_VISA_WORKERS', ['CAMP_HOUS_01#1'], 4, 'Who will pick the fruit?', 'Farm and aged-care groups warn your visa freeze will leave them without workers.', [
      ['Exempt farm and care workers.', { r: { RUR: 0.6 }, u: -2 }, 'Visa freeze softened for farms and care'],
      ['Hold the line.', { r: { OUT: 0.4, RUR: -0.6 } }, 'Visa freeze stays'],
      ['Promise local-worker incentives instead.', { pp: -10, r: { RUR: 0.3, OUT: 0.2 } }, 'Local-worker incentives promised']]],
    ['FU_HEATWAVE2', ['CAMP_ENER_01#1'], 5, 'A second heatwave, and the grid holds', 'Another heatwave hits, and this time the grid holds up fine. Your coal-closure warnings look shaky.', [
      ['Say you were right to warn.', { r: { RUR: 0.3, IN: -0.5 } }, 'Leader stands by grid warnings'],
      ['Pivot to bills, not blackouts.', { r: { OUT: 0.4 } }, 'Campaign pivots to power bills'],
      ['Credit the workers who kept the lights on.', { o: 0.2, u: 2 }, 'Leader thanks grid workers']], { tag: 'ENERGY' }],
    ['FU_APS', ['CAMP_IR_01#2'], 3, 'Public servants hit back', 'The public-sector union launches an ad blitz in Canberra and Queanbeyan against your return-to-office mandate.', [
      ['Exempt carers and parents.', { s: { ACT: 0.8 }, u: -2 }, 'Office mandate softened'],
      ['Hold firm.', { s: { ACT: -0.8 }, r: { RUR: 0.3 } }, 'Office mandate stays'],
      ['Take the fight to the union.', { s: { ACT: -1 }, r: { RUR: 0.5, OUT: 0.2 }, m: 1 }, 'Leader takes on public-sector union']]],
    ['FU_PREF_PARTNER', ['CAMP_PREF_01#0'], 4, 'Your preference partner’s scandal', 'A candidate from a party you swapped preferences with is caught in a scandal of their own.', [
      ['Cancel the deal in that seat.', { prefDeal: -1, u: 2 }, 'Preference deal cancelled'],
      ['Say preferences are not endorsements.', { o: -0.3 }, 'Preferences are not endorsements, leader says'],
      ['Cancel every deal.', { prefDeal: -3, o: 0.3, u: 3 }, 'All preference deals scrapped']], { gaffe: true, tag: 'CRISIS' }],
    ['FU_AUKUS_REVIEW', ['CAMP_SEC_01#1'], 3, 'Washington signals concern', 'Officials in Washington let it be known they are uneasy about your AUKUS review.', [
      ['Reassure allies: the review is about cost, not commitment.', { o: 0.2, u: 2 }, 'AUKUS commitment reaffirmed'],
      ['Stand firm on sovereignty.', { n: { ONP: -0.2, IND: 0.2 }, r: { IN: 0.4, OUT: -0.3 } }, 'Sovereignty first on AUKUS'],
      ['Drop the review.', { u: -3, s: { SA: 0.4, WA: 0.3 } }, 'AUKUS review dropped']], { tag: 'NATIONAL_SECURITY' }],
    ['FU_MODERATES', ['CAMP_LNP_02#0'], 3, 'Moderate Liberals break ranks', 'Three moderate Liberal candidates say they will put One Nation last on their own how-to-vote cards.', [
      ['Let them.', { r: { IN: 0.6 }, pf: { on: -1 }, u: -4 }, 'Moderates allowed to go their own way'],
      ['Enforce the party line.', { r: { IN: -0.6 }, u: 2, nats: 5 }, 'Party line enforced on preferences'],
      ['Find a compromise: open tickets in those seats.', { r: { IN: 0.3 } }, 'Compromise on preferences']], { party: 'LNP' }],
    ['FU_EMPLOYERS', ['CAMP_ALP_02#0'], 3, 'Employer groups launch attack ads', 'Business groups launch ads accusing Labor of handing the unions the keys.', [
      ['Hit back: wages need to grow.', { r: { PROV: 0.4, IN: 0.2, OUT: -0.2 } }, 'Labor hits back at business ads'],
      ['Reassure business with a small-business package.', { r: { OUT: 0.5 }, u: -3 }, 'Small-business package to calm employers'],
      ['Ignore them.', { o: -0.2 }, 'Labor ignores business ads']], { party: 'ALP' }],
    ['FU_BUSH_COSTS', ['CAMP_ONP_01#0'], 4, 'Who pays for the bush package?', 'Economists say your bush infrastructure package does not add up without new taxes.', [
      ['Publish your own costings.', { o: 0.3, pp: -10 }, 'One Nation publishes its costings'],
      ['Call the economists city elites.', { r: { RUR: 0.5, IN: -0.6 } }, 'Economists dismissed as elites'],
      ['Scale the package back.', { u: -4, o: 0.1 }, 'Bush package scaled back']], { party: 'ONP' }],
    ['FU_SUPERMARKETS', ['CAMP_ECON_02#0'], 3, 'Supermarkets threaten an investment freeze', 'The big supermarkets say divestiture powers will freeze new stores and jobs.', [
      ['Call their bluff.', { r: { RUR: 0.5, OUT: 0.4 }, m: 1 }, 'Leader calls supermarkets’ bluff'],
      ['Add safeguards for jobs.', { o: 0.2, u: 2 }, 'Job safeguards added to grocery code'],
      ['Shelve divestiture.', { r: { OUT: -0.3 }, u: 3 }, 'Divestiture powers shelved']], { tag: 'COST_OF_LIVING' }],
    ['FU_REACTOR_SITES', ['CAMP_B2_25#0'], 3, 'Reactor towns push back', 'Residents near the retired coal sites you named for nuclear plants hold angry public meetings.', [
      ['Promise a local referendum before any build.', { r: { RUR: 0.4 }, u: 2 }, 'Reactor towns promised a vote'],
      ['Promise cheaper power for host towns.', { pp: -10, r: { PROV: 0.5 } }, 'Power discounts for reactor towns'],
      ['Stay the course.', { r: { RUR: -0.5, OUT: 0.2 } }, 'Nuclear sites stay on the list']], { tag: 'ENERGY' }]
  ].forEach(([id, req, after, t, q, os, x]) => add({ id, req, after, t, q, k: 'Consequences', ...(x || {}), opts: os.map(([tx, e, h]) => e.rng ? { x: tx, rng: e.rng, h } : { x: tx, e, h }) }));

  // famous marginals: seat-level effects (points in that seat only)
  [
    ['Bennelong', 'NSW', 'John Howard’s old seat, won by Labor in 2022 and held in 2025. Chinese- and Korean-Australian voters are decisive here.'],
    ['Dickson', 'QLD', 'Labor took this seat from the sitting Opposition Leader in 2025. It is now one of the most watched seats in Brisbane’s north.'],
    ['Gilmore', 'NSW', 'The South Coast seat that came down to a few hundred votes in 2022. Every street counts.'],
    ['Kooyong', 'VIC', 'Robert Menzies’ old seat, held by a teal independent since 2022. The Liberals want it back.'],
    ['Bradfield', 'NSW', 'Won by a teal independent in 2025 by a margin of just a few dozen votes after a recount.'],
    ['Farrer', 'NSW', 'Once a Liberal leader’s seat in the Riverina, now held by One Nation.'],
    ['New England', 'NSW', 'Barnaby Joyce’s seat, which he took with him to One Nation.'],
    ['Aston', 'VIC', 'In 2023 Labor won it at a by-election, the first time a government had taken a seat from the Opposition at a by-election in a century.']
  ].forEach(([n, st, blurb], k) => add({ id: 'SEAT_' + n.replace(/\W/g, '').toUpperCase(), t: `The battle for ${n}`, k: `Famous marginal · ${st}`, seatCard: n, q: blurb + ' How much do you throw at it?', opts: [
    { x: `Send the leader to ${n} for a full day of street walks and a town hall.`, e: { seat: { [n]: 2.4 }, sta: -8, m: 1 }, h: `Leader spends a day in ${n}` },
    { x: `A local infrastructure promise tailored to ${n}.`, e: { seat: { [n]: 1.8 }, pp: -10 }, h: `${n} gets its own promise` },
    { x: `Write ${n} off and move the money to seats you can win.`, e: { seat: { [n]: -1.5 }, pp: 12 }, h: `${n} quietly written off` }] }));

  // state spillover
  [
    ['NSW', 'A state hospital pay strike in New South Wales', 'Nurses and doctors walk off the job in a pay fight with the state government. Voters are not drawing fine lines between state and federal.'],
    ['VIC', 'A state debt warning in Victoria', 'The credit agencies warn about Victoria’s state debt, and your rivals are tying it to you.'],
    ['QLD', 'Queensland’s crime laws hit the federal campaign', 'A row over Queensland’s state youth-crime laws spills into the federal campaign.'],
    ['WA', 'The west picks a fight with Canberra', 'Western Australia’s government picks a fight with Canberra over GST and mining approvals.'],
    ['SA', 'A shipbuilding row in South Australia', 'The South Australian government warns that federal delays put shipyard jobs at risk.']
  ].forEach(([st, t, q]) => add({ id: 'STATE_' + st, t, k: `State spillover · ${st}`, q, opts: [
    { x: 'Stand with the state government and share the problem.', e: { s: { [st]: 0.5 }, u: 2 }, h: `Federal campaign backs ${st} government` },
    { x: 'Distance yourself: this is a state matter.', e: { s: { [st]: -0.3 }, o: 0.2 }, h: `“A matter for the state,” says leader` },
    { x: 'Promise a federal fix and take the credit.', e: { s: { [st]: 0.9 }, pp: -15 }, h: `Federal fix promised for ${st}` }] }));

  // international shocks: no good answers, only trade-offs
  [
    ['INTL_TRADE', 'Trade sanctions return', 'Beijing reimposes tariffs on Australian wine, barley and lobster.', [['Seek talks immediately.', { r: { RUR: 0.3, IN: 0.3 }, n: { ONP: 0.2 } }], ['Hold firm and find new markets.', { r: { RUR: -0.3 }, o: 0.3 }], ['Compensate exporters.', { r: { RUR: 0.6 }, pp: -15 }]]],
    ['INTL_PACIFIC', 'A crisis in the Pacific', 'Unrest in a Pacific island neighbour threatens Australian citizens and regional security.', [['Send police and aid at once.', { o: 0.4, pp: -10 }], ['Wait for a formal request.', { o: -0.2, u: 2 }], ['Make it a test of your rivals’ judgement.', { attack: 0.4, u: -3 }]]],
    ['INTL_OIL', 'Oil price spike', 'Attacks on Gulf shipping send petrol prices soaring.', [['Halve fuel excise for six months.', { r: { OUT: 0.6, RUR: 0.6 }, sp: [['EXPAND', 'RBA_485_SQUEEZE']] }], ['Release the fuel reserves and hold excise.', { o: 0.2 }], ['Promise an EV and transport switch.', { r: { IN: 0.5, RUR: -0.5 } }]]],
    ['INTL_MARKETS', 'Global markets slide', 'A global sharemarket fall hits super balances in the final weeks.', [['Steady hands: no panic, no new spending.', { o: 0.3, u: 2 }], ['Guarantee retirees’ pensions are safe.', { r: { PROV: 0.5, OUT: 0.3 }, pp: -10 }], ['Blame the government’s economic record.', { attack: 0.5 }]]],
    ['INTL_BIRDFLU', 'Bird flu reaches Australian farms', 'A dangerous strain of bird flu is found on Australian poultry farms.', [['A national biosecurity emergency response.', { r: { RUR: 0.6 }, pp: -15 }], ['Leave it to the states.', { r: { RUR: -0.4 } }], ['Close borders to imported poultry products.', { r: { RUR: 0.4 }, n: { ONP: 0.2 } }]]],
    ['INTL_BOATS', 'Boat arrivals', 'Several boats carrying asylum seekers reach the north-west in one week.', [['Turn back the boats where safe.', { r: { OUT: 0.5, RUR: 0.5, IN: -0.6 } }], ['Process them offshore under existing policy.', { o: 0.2 }], ['Process them onshore, humanely and fast.', { r: { IN: 0.6, OUT: -0.6 }, pf: { grn: 2 } }]]]
  ].forEach(([id, t, q, os]) => add({ id, t, q, k: 'The world intrudes', tag: 'NATIONAL_SECURITY', opts: os.map(([x, e]) => ({ x, e })) }));

  // personality moments (light relief)
  [
    ['PERS_SIZZLE', 'The democracy sausage', 'You are handed a sausage in bread at a school fete. Every camera is watching how you eat it.', [['Onions underneath, sauce on top, eat it in three bites.', { m: 2, o: 0.2 }], ['Politely decline: you have eaten.', { m: -1 }], ['Turn the barbecue yourself for half an hour.', { m: 1, u: 2, sta: -4 }]]],
    ['PERS_PUB', 'The pub test', 'Regulars at a country pub dare you to have a schooner with them and answer anything.', [['Have the schooner and take every question.', { r: { RUR: 0.4 }, m: 1, sta: -4 }], ['Lemon squash and a chat.', { o: 0.1 }], ['Shout the bar.', { r: { RUR: 0.3 }, pp: -5, m: 1 }]]],
    ['PERS_BUNNINGS', 'The hardware store walk', 'A Saturday walk through a hardware store car park, sausage sizzle and all.', [['Buy a power drill and talk tradie tax breaks.', { r: { OUT: 0.4 }, m: 1 }], ['Talk to the staff about wages.', { r: { OUT: 0.2, PROV: 0.2 } }], ['Skip it: too staged.', { sta: 6 }]]],
    ['PERS_FOOTY', 'Grand final week', 'It is footy finals season and the cameras want to know who you are going for.', [['Back your team loudly, as you always have.', { m: 1, o: 0.1 }], ['Back the local team wherever you are that day.', { m: -1, sp: [['EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM']] }], ['Say you love all codes equally.', { o: 0 }]]],
    ['PERS_COOKING', 'Breakfast TV cooking segment', 'A breakfast show wants you to cook your favourite family recipe live.', [['Cook it with gusto.', { m: 1, o: 0.2, sta: -3 }], ['Bring a staffer’s recipe and hope.', { rng: { k: 'm', min: 1, ok: { m: 1 }, no: { m: -2, o: -0.2 } } }], ['Decline: policy, not pancakes.', { u: 1 }]]],
    ['PERS_RADIO', 'The radio prank', 'A youth radio station prank-calls you, pretending to be a rival leader.', [['Play along and laugh.', { r: { IN: 0.3 }, m: 2 }], ['Hang up.', { o: 0 }], ['Complain to the station.', { m: -2 }]]]
  ].forEach(([id, t, q, os]) => add({ id, t, q, k: 'On the trail', opts: os.map(([x, e]) => e.rng ? { x, rng: e.rng } : { x, e }) }));

  // preference deals with minor parties
  [
    ['PREF_FFP', 'Family First wants a deal', 'Family First offers its preferences in outer-suburban seats with large faith communities.', 'Family First'],
    ['PREF_HMP', 'Legalise Cannabis wants a deal', 'Legalise Cannabis offers its preferences in regional seats where its vote is surprisingly strong.', 'Legalise Cannabis'],
    ['PREF_LTP', 'The Libertarians want a deal', 'The Libertarians offer preferences in small-business-heavy seats in exchange for a red-tape pledge.', 'Libertarians']
  ].forEach(([id, t, q, n]) => add({ id, t, q, k: 'Preference deal', tag: 'PREFS', opts: [
    { x: `Sign a full deal with ${n}.`, e: id === 'PREF_FFP' ? { r: { OUT: 0.6, IN: -0.3 }, u: -2 } : id === 'PREF_HMP' ? { r: { RUR: 0.5, PROV: 0.3 }, u: -3 } : { r: { OUT: 0.4, PROV: 0.3 }, u: -2 }, h: `Preference deal done with ${n}` },
    { x: `Swap preferences in a handful of seats only.`, e: { r: { OUT: 0.2, RUR: 0.2 } }, h: `Limited preference swap with ${n}` },
    { x: `Refuse: you do not trade on values.`, e: { u: 3, r: { IN: 0.2 } }, h: `${n} deal refused` }] }));

  // running-mate events ({mate} is filled in with the leader's first running mate)
  [
    ['MATE_OFFSCRIPT', '{mate} goes off-script', '{mate} contradicts your tax policy in a morning interview.', [['Back {mate}: it was a fair point.', { u: 2, o: -0.3 }], ['Correct the record, firmly.', { u: -4, o: 0.2 }], ['Laugh it off together on camera.', { rng: { k: 'm', min: 1, ok: { m: 1, u: 2 }, no: { o: -0.4 } } }]]],
    ['MATE_STAR', '{mate} has a star turn', '{mate} lands a crushing line on your rivals in a regional debate.', [['Put {mate} on every bulletin this week.', { o: 0.4, m: 1 }], ['Keep the spotlight on yourself.', { u: -3, o: 0.2 }], ['Send {mate} to the marginals.', { r: { OUT: 0.4, PROV: 0.3 }, sta: 6 }]]],
    ['MATE_AMBITION', '{mate} wants more', 'Reports say {mate} wants a promise of a senior portfolio after the election.', [['Promise it.', { u: 4, pp: -5 }], ['Refuse: no deals before the votes are counted.', { u: -5 }], ['Deny the reports outright.', { rng: { k: 'u', min: 55, ok: { u: 2 }, no: { u: -8, o: -0.3 } } }]]],
    ['MATE_OLDCOMMENTS', '{mate}’s old comments', 'A decade-old speech by {mate} resurfaces, sharply at odds with your policy.', [['Say people change, and so do policies.', { o: -0.2, u: 2 }], ['Have {mate} apologise.', { u: -3, o: 0.1 }], ['Say nothing.', { o: -0.3 }]], { gaffe: true }],
    ['MATE_DEBATE', '{mate} offers to help', '{mate} offers to play your rival in debate prep and front the Sunday shows.', [['Accept both.', { nextBonus: 1, sta: 10 }], ['Accept the debate prep only.', { nextBonus: 1 }], ['Thanks, but you’ve got it.', { sta: -4, u: -1 }]]]
  ].forEach(([id, t, q, os, x]) => add({ id, t, q, mate: true, k: 'Your running mate', ...(x || {}), opts: os.map(([tx, e]) => e.rng ? { x: tx, rng: e.rng } : { x: tx, e }) }));

  // base bonus cards: unlocked by holding a strong base in a seat type for three turns
  [
    ['BASE_OUT_CARD', 'BASE_OUT', 'The suburbs are with you', 'Your outer-suburban base is solid. A mortgage-belt rally is on offer.', [['Hold the rally.', { r: { OUT: 0.8 }, m: 2 }], ['Turn your volunteers into a door-knocking army.', { r: { OUT: 0.5, PROV: 0.3 }, sta: -5 }], ['Bank it and redeploy to the regions.', { r: { RUR: 0.5 } }]]],
    ['BASE_RUR_CARD', 'BASE_RUR', 'The bush is with you', 'Farmers organise a tractor convoy in your honour.', [['Lead the convoy.', { r: { RUR: 0.8 }, m: 2 }], ['Turn it into a fundraiser.', { pp: 20 }], ['Bank it and redeploy to the suburbs.', { r: { OUT: 0.5 } }]]],
    ['BASE_IN_CARD', 'BASE_IN', 'The inner city is with you', 'Thousands of inner-city volunteers sign up in a week.', [['Send them to the marginals.', { r: { OUT: 0.5, IN: 0.3 }, m: 1 }], ['Run a huge get-out-the-vote operation.', { r: { IN: 0.7 } }], ['Ask them for money instead.', { pp: 20 }]]]
  ].forEach(([id, f, t, q, os]) => add({ id, req: [f], t, q, k: 'Your base delivers', opts: os.map(([x, e]) => ({ x, e })) }));

  // Nationals friction for the Coalition (moves the Nationals goodwill meter)
  [
    ['NATS_SEATS', 'The Nationals want more seats', 'The Nationals want to run candidates in two Liberal-held regional seats.', [['Agree: three-cornered contests are democracy.', { nats: 12, r: { RUR: 0.3 } }], ['Refuse: one Coalition candidate per seat.', { nats: -15, u: 2 }], ['Offer a Senate spot instead.', { nats: 6, pp: -10 }]]],
    ['NATS_CLIMATE', 'The Nationals reject your climate line', 'Nationals MPs say they will not campaign on the Coalition’s emissions policy.', [['Give them a regional exemption.', { nats: 10, r: { IN: -0.3 } }], ['Insist on one policy.', { nats: -14, r: { IN: 0.4 } }], ['Drop the policy altogether.', { nats: 18, r: { IN: -0.8, RUR: 0.4 } }]]]
  ].forEach(([id, t, q, os]) => add({ id, t, q, party: 'LNP', k: 'Coalition partners', opts: os.map(([x, e]) => ({ x, e })) }));

  // role cards: being the government, the Opposition or the crossbench is a different job
  [
    ['ROLE_CARETAKER', 'ALP', 'Caretaker conventions', 'You are a caretaker government now. A department wants to sign a big contract before polling day.', [['Hold off and consult the Opposition, as the conventions say.', { u: 3, o: 0.2, sp: [['REDUCE', 'ANTI_ESTABLISHMENT_CYNICISM']] }], ['Sign it: the country cannot wait.', { r: { PROV: 0.4 }, sp: [['EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM']] }], ['Defer it and make it an election promise.', { o: 0.1 }]]],
    ['ROLE_MINISTER', 'ALP', 'A minister under fire', 'A cabinet minister is accused of steering grants to a marginal seat. As Prime Minister, it is your call.', [['Stand the minister aside pending a review.', { o: -0.2, u: -3, sp: [['REDUCE', 'ANTI_ESTABLISHMENT_CYNICISM']] }], ['Back the minister in.', { u: 3, o: -0.4, sp: [['EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM']] }], ['Refer it to the anti-corruption commission.', { o: 0.1 }]], { gaffe: true, tag: 'CRISIS' }],
    ['ROLE_RECORD', 'ALP', 'Defending the record', 'Your rivals say three years of Labor have left families worse off. You have to defend the record, not just make promises.', [['Run on the record: wages, Medicare, jobs.', { r: { OUT: 0.4, PROV: 0.4 }, sp: [['REDUCE', 'MEDICARE_GAP_STRAIN']] }], ['Concede the pain and promise to do better.', { o: 0.2, u: -3 }], ['Turn it around: what would they cut?', { attack: 0.5 }]]],
    ['ROLE_ALT_GOV', 'LNP', 'Ready to govern?', 'Voters are not sure the Coalition is ready to govern after 2025. The question is everywhere.', [['Release a full shadow-cabinet line-up and costings timetable.', { o: 0.4, pp: -10 }], ['Make it about the government’s failures instead.', { attack: 0.5, u: -2 }], ['Promise a first-100-days plan.', { o: 0.3, m: 1 }]]],
    ['ROLE_SHADOW_LEAK', 'LNP', 'Shadow-cabinet leak', 'Somebody has leaked a shadow-cabinet discussion about cutting a popular program.', [['Rule the cut out, absolutely.', { o: 0.1, u: -3 }], ['Find and sack the leaker.', { u: 4, m: -1 }], ['Say everything is on the table in tough times.', { r: { IN: 0.3, OUT: -0.5 } }]], { gaffe: true, tag: 'CRISIS' }],
    ['ROLE_BALANCE', 'ONP', 'The price of your support', 'The press wants to know what One Nation would demand from a minority government, from the crossbench.', [['Name your price: a migration cap and an end to Net Zero.', { r: { RUR: 0.5, OUT: 0.3, IN: -0.4 }, m: 1 }], ['Refuse to deal with either major party.', { o: 0.4, pf: { on: -2 } }], ['Say you would back whoever delivers for the bush.', { r: { RUR: 0.4 }, pf: { on: 1 } }]]],
    ['ROLE_SENATE', 'ONP', 'Senate leverage', 'One Nation already holds Senate votes. Do you use them as a campaign weapon?', [['Promise to block any new tax in the Senate.', { r: { OUT: 0.4, RUR: 0.3 } }], ['Promise to be a constructive crossbench.', { r: { IN: 0.2, OUT: 0.2 }, u: -2 }], ['Threaten to block supply.', { rng: { k: 'm', min: 2, ok: { o: 0.5, m: 2 }, no: { o: -0.6, sp: [['EXPAND', 'ANTI_ESTABLISHMENT_CYNICISM']] } } }]]]
  ].forEach(([id, party, t, q, os, x]) => cards.push({ id, party, t, q, k: party === 'ALP' ? 'In government' : party === 'LNP' ? 'In opposition' : 'On the crossbench', ...(x || {}), opts: os.map(([tx, e]) => e.rng ? { x: tx, rng: e.rng } : { x: tx, e }) }));
  cards.forEach(c => C.cards.push(c));

  // ---- things that happen without your say: Greens and teal surges, rival responses, week-review captions
  C.surges = [
    { p: 'GRN', t: 'A Greens surge among renters', e: { r: { IN: { GRN: 0.45 } } } },
    { p: 'GRN', t: 'Greens volunteers flood the inner-city booths', e: { r: { IN: { GRN: 0.35 } }, n: { GRN: 0.1 } } },
    { p: 'IND', t: 'A new community independent launches in a blue-ribbon seat', e: { r: { IN: { IND: 0.5 } } } },
    { p: 'IND', t: 'Teal campaigns pour money into doorknocking', e: { r: { IN: { IND: 0.35 }, OUT: { IND: 0.15 } } } },
    { p: 'GRN', t: 'Young voters enrol in record numbers', e: { r: { IN: { GRN: 0.3 } }, n: { GRN: 0.1 } } },
    { p: 'IND', t: 'A regional independent catches fire', e: { r: { RUR: { IND: 0.4 } } } }
  ];
  C.rival = {
    ALP: ['Labor answers with a new Medicare promise', 'Labor rolls out a cost-of-living package', 'Labor’s Treasurer attacks your costings'],
    LNP: ['The Coalition answers with a fuel-excise cut', 'The Coalition launches a scare campaign on your tax plans', 'The Coalition promises a home-ownership boost'],
    ONP: ['One Nation answers with a migration crackdown pledge', 'One Nation stages a giant regional rally', 'One Nation promises to scrap Net Zero spending']
  };
  C.captions = ['A leader tries to ride two horses at once', 'A sausage, a hard hat and a hi-vis vest walk into a factory', 'The polls, wearing a blindfold', 'A campaign bus, lost somewhere west of the Divide',
    'A pollster reads tea leaves; a strategist reads the pollster', 'The press gallery counts numbers on an abacus', 'A swinging voter, swinging', 'The cost of living, sitting on a beach towel labelled “inflation”',
    'Two leaders arm-wrestle over a power bill', 'A how-to-vote card the size of a tablecloth', 'A backbencher whispers into a reporter’s ear', 'A preference deal written on a napkin'];

  // engraved icons for the national spirits, by family (24×24, same style as the honours)
  C.spiritIcon = {
    RBA: '<path class="k" d="M6 18L18 6"/><circle class="k" cx="7.5" cy="7.5" r="2.3"/><circle class="k" cx="16.5" cy="16.5" r="2.3"/>',
    HOUSING: '<path class="k" d="M4.5 11L12 5l7.5 6M6.5 9.5v10h11v-10M12 9.5l-1 3 2 2-1 5"/>',
    GRID: '<path class="k" d="M12 3.5l-4 16.5M12 3.5l4 16.5M6 8h12M7.2 13h9.6M9 8l6 5M15 8l-6 5"/>',
    MEDICARE: '<path class="k" d="M12 4l7 2.5v5c0 4.5-3 7.5-7 8.5-4-1-7-4-7-8.5v-5zM12 8.5v6M9 11.5h6"/>',
    TAX: '<path class="k" d="M4.5 11L12 5l7.5 6M6.5 9.5v10h11v-10"/><path class="k" d="M13.5 12.3c-.4-.7-3-.9-3 .5s3 .8 3 2.3-2.6 1.2-3 .5M12 11v.8M12 16.5v.8" style="stroke-width:1.3"/>',
    RIGHT: '<path class="k" d="M12 20v-7M12 13L7 7M12 13l5-6M5 9V5h4M19 9V5h-4"/>',
    AUKUS: '<path class="k" d="M3.5 14.5c2-2.5 5-3.5 9-3.5h5l3 3.5-3 3h-9c-2.5 0-4-1-5-3zM10 11V8h3v3M11.5 8V5.5"/>',
    CYNIC: '<path class="k" d="M3.5 12s3-5.5 8.5-5.5 8.5 5.5 8.5 5.5-3 5.5-8.5 5.5S3.5 12 3.5 12zM5 5l14 14"/><circle class="k" cx="12" cy="12" r="2.2"/>',
    WAVE: '<path class="k" d="M3.5 14c2-3 4-3 6 0s4 3 6 0 3-2.5 5-1.5M3.5 18c2-2 4-2 6 0s4 2 6 0 3-1.5 5-.8M14 6.5l3 3M17 6.5l-3 3"/>',
    POLL: '<path class="k" d="M4.5 19.5h15M6.5 19.5v-6M10.5 19.5v-9M14.5 19.5v-4M18.5 19.5V8M5.5 9l4-3 4 3 5-4"/>',
    NATS: '<path class="k" d="M12 20V9M12 12c-2-.5-3-2-3-4 2 .5 3 2 3 4zM12 12c2-.5 3-2 3-4-2 .5-3 2-3 4zM6 4.5l12 15"/>'
  };

  // ---- prompts for the Part 2 cards (the bank supplied titles and options only)
  const Q = {
    B2_01: 'South-east Queensland is choking on traffic ahead of the 2032 Olympics, and every mayor wants a road.', B2_02: 'Bowen Basin towns want the coal royalties to flow back to them, and they want something done about crime.',
    B2_03: 'Western Australia wants iron-clad protection for its GST deal and faster mine approvals.', B2_04: 'Wheatbelt farmers are furious about the end of live sheep exports by sea.',
    B2_05: 'Western Sydney commuters are paying hundreds a week in tolls, and the new airport still has no train.', B2_06: 'Offshore wind zones off the Hunter and Illawarra are splitting coastal towns and heavy-industry workers.',
    B2_07: 'Melbourne’s Suburban Rail Loop is costing billions while the outer suburbs ask for roads and police.', B2_08: 'Victorian farmers want water buybacks stopped, and manufacturers want more gas.',
    B2_09: 'Adelaide’s submarine yard and the Whyalla steelworks are both looking to Canberra.', B2_10: 'Adelaide’s ambulances are ramped and families are squeezed.',
    B2_11: 'Tasmania is arguing about a stadium, salmon farms and its Bass Strait ferries all at once.', B2_12: 'Tasmanians want cheap Hydro power for themselves before any of it goes to the mainland.',
    B2_13: 'Canberra wants its public-service jobs protected; the regions want some of them moved out.', B2_14: 'Darwin’s defence build-up, the Middle Arm precinct and remote services are all on the table.',
    B2_20: 'Small businesses are folding at the fastest rate in a decade.', B2_21: 'Inflation is pushing workers into higher tax brackets without a real pay rise.',
    B2_22: 'Childcare is the second mortgage for young families, and single-income families feel left out.', B2_23: 'Universities say student caps will gut them; renters say students are filling the rentals.',
    B2_24: 'State planners want apartments around suburban train stations, and the locals are not happy.', B2_25: 'You are asked, again, exactly where the nuclear reactors would go.',
    B2_26: 'Vehicle-efficiency rules have tradies and farmers worried about the price of a ute.', B2_27: 'The NDIS is growing faster than the budget can bear.',
    B2_28: 'Country aged-care homes are closing because they cannot find nurses.', B2_29: 'A close encounter between warships in the South China Sea puts defence spending on the front page.',
    B2_30: 'Foreign buyers are snapping up farmland and critical-mineral deposits.', B2_31: 'Gambling ads, donation caps and lies in political ads: integrity is suddenly a campaign issue.',
    B2_32: 'Bond markets are jittery about your spending promises.', B2_33: 'The Business Council says your hardline pitch would wreck the economy.',
    B2_34: 'A nationwide telecom and banking outage leaves millions unable to pay or call.', B2_35: 'Fire ants and a biosecurity scare are spreading along the east coast.',
    B2_36: 'The teal crossbench says it will decide who governs if the result is close.', B2_37: 'The Senate is blocking everything, and the talk is of a double dissolution.',
    B2_38: 'Inner-city voters and outer-suburban voters want very different things on foreign policy and social cohesion.', B2_39: 'The ACTU wants a four-day week and protected penalty rates.',
    B2_40: 'Two former Labor premiers say the government has lost its reform ambition.', B2_41: 'Moderate women candidates in teal seats want to run their own campaigns.',
    B2_42: 'The Nationals want a levy on big tech to pay for regional mobile coverage.', B2_43: 'Super funds are running ads against your super-for-housing plan.',
    B2_44: 'Barnaby Joyce’s professional recruits are clashing with One Nation’s old-guard branches.', B2_45: 'Right-wing micro-parties are poaching One Nation voters and preferences.',
    B3_06: 'Parents back the under-16 social media ban; plenty of adults hate the age checks.', B3_07: 'AI is coming for office jobs and the data centres want the power grid.',
    B3_08: 'Graduates are drowning in student debt and tradies want more TAFE places.', B3_09: 'Teachers are leaving and classroom behaviour is the talk of the staffroom.',
    B3_10: 'Pensioners say the deeming rates are eating their savings.', B3_11: 'Youth crime and bail laws dominate talkback.',
    B3_12: 'Domestic violence services are turning women away for lack of beds.', B3_13: 'Young couples say they cannot afford children.',
    B3_14: 'The ABC wants secure funding, and regional newspapers keep closing.', B3_15: 'Gangs are firebombing tobacconists, and the excise is fuelling the black market.',
    B3_16: 'Closing the Gap targets are slipping in remote communities.', B3_17: 'A national service corps is floated for disasters and defence.',
    B3_18: 'Inland Rail’s cost keeps climbing and it still does not reach Brisbane.', B3_19: 'High-speed rail or fixing the highways: you cannot afford both.',
    B3_20: 'Regional airfares are sky-high and Sydney Airport slots are hoarded.', B3_21: 'Miners and farmers want their diesel rebate; the budget wants the money.',
    B3_22: 'Farmers fear carbon capture projects will poison the Great Artesian Basin.', B3_23: 'Timber towns are reeling from native forest logging bans.',
    B3_24: 'Another country town has lost its last bank branch.', B3_25: 'Truckies say road-user charges are crushing freight costs.',
    B3_26: 'Solar and wind farms are going up on prime cropping land.', B3_27: 'Country towns cannot find a GP who bulk-bills.',
    B3_28: 'Trade with China is back on track, but critical minerals are a security question.', B3_29: 'The Pacific wants climate finance, security help and more work visas.',
    B3_30: 'Australia holds only weeks of fuel, and its last refineries are struggling.', B3_31: 'Security agencies warn about foreign interference in university research.',
    B3_32: 'A local space, satellite and drone industry wants a sovereign capability fund.', B3_33: 'Multinationals and tech giants pay little tax here, and voters know it.',
    B3_34: 'Border protection and detention are back in the headlines.', B3_35: 'Veterans are still waiting months for claims to be processed.',
    B3_36: 'Your rivals say your clean costings hide secret cuts.', B3_37: 'The leak from the leadership spill is back in the news.',
    B3_38: 'The quarterly inflation figure has come in hot.', B3_39: 'A major domestic airline has collapsed into administration.',
    B3_40: 'A hot microphone caught your unguarded comment at a suburban bakery.', B3_41: 'A group of leading economists says the campaign handouts will keep rates high.',
    B3_42: 'Minor parties and independents are scrambling for outer-suburban preferences.', B3_43: 'Your marginal-seat grants are being called a rort.',
    B3_44: 'Left backbenchers want a coal levy and a wealth tax.', B3_45: 'Outer-suburban Labor MPs want action on migration and bills.',
    B3_46: 'The Business Council has publicly rebuked the Coalition.', B3_47: 'The Nationals want to campaign under their own banner in the bush.',
    B3_48: 'Your party room is split: tax cuts now, or pay down debt first.', B3_49: 'Hanson and Joyce disagree in public about preferencing the Coalition.',
    B3_50: 'The base wants citizen-initiated referenda and stronger property rights.',
    B4_01: 'The big four banks have posted record profits while mortgage holders struggle.', B4_02: 'Home and strata insurance bills have doubled in flood- and fire-prone suburbs.',
    B4_03: 'The minimum wage decision is due, and small businesses are nervous.', B4_04: 'Rideshare and delivery riders want minimum pay and insurance.',
    B4_05: 'Payroll tax and paperwork are smothering small employers.', B4_06: 'Some workers would rather have the super guarantee as cash in hand.',
    B4_07: 'Buy-now-pay-later debt is piling up among young Australians.', B4_08: 'Builders are collapsing and leaving families with half-built homes.',
    B4_09: 'The twice-yearly beer and spirits excise rise has pubs up in arms.', B4_10: 'Commuters want to know who really profits from the toll roads.',
    B4_11: 'A childcare safety scandal has parents demanding audits and fee caps.', B4_12: 'Pharmacies are running out of common medicines.',
    B4_13: 'Private health premiums keep rising, and country maternity wards keep closing.', B4_14: 'Dental care is the one big gap in Medicare.',
    B4_15: 'Power-bill relief is ending, and network charges are the real problem.', B4_16: 'Holiday rentals are hollowing out coastal towns.',
    B4_17: 'Social housing waitlists are years long.', B4_18: 'First-home buyers want help with the deposit.',
    B4_19: 'Factory-built homes and trade visas are pitched as the way to build faster.', B4_20: 'Electric cars pay no fuel excise, and the roads still need fixing.',
    B4_21: 'Outer suburbs want buses, ferries and car parks at the station.', B4_22: 'Land is ready for 100,000 homes, but the pipes and power are not.',
    B4_23: 'Thousands of homes sit empty while people sleep in cars.', B4_24: 'Western suburbs swelter several degrees hotter than the coast.',
    B4_25: 'Regional councils are hiking rates to pay for airport security and roads.', B4_26: 'Older Australians would downsize if the pension rules let them.',
    B4_27: 'Outer-suburban emergency departments are overflowing.', B4_28: 'Household batteries could cut bills, if anyone could afford one.',
    B4_29: 'Solar owners are furious about being charged to export power.', B4_30: 'Green hydrogen and solar factories need public money to get going.',
    B4_31: 'Heavy industry wants protection from cheap, high-emissions imports.', B4_32: 'New nature laws could include a climate trigger.',
    B4_33: 'Farm runoff is still reaching the Great Barrier Reef.', B4_34: 'Koala habitat and new housing estates want the same land.',
    B4_35: 'Recreational fishers fear being locked out of new marine parks.', B4_36: 'Lithium and nickel prices have crashed and mines are closing.',
    B4_37: 'Farmers want paying for the transmission lines across their land.', B4_38: 'Soft-plastic recycling has collapsed and packaging rules are a mess.',
    B4_39: 'Snowy 2.0 is years late and billions over budget.', B4_40: 'Farmers fear methane rules for livestock.',
    B4_41: 'The Central Coast wants rail, hospitals and protection from coastal erosion.', B4_42: 'Labor, the Coalition and One Nation are fighting a three-way battle across the Riverina, Farrer and New England.',
    B4_43: 'Geelong is booming and wants fast rail and an airport.', B4_44: 'Ballarat and Bendigo want better trains and health services.',
    B4_45: 'The Bruce Highway is still a killer, and the Sunshine Coast wants rail.', B4_46: 'Far North Queensland wants tourism support and cheaper insurance.',
    B4_47: 'Perth’s outer suburbs need hospitals and roads.', B4_48: 'Collie’s coal workers and Bunbury’s lithium plants are both looking to Canberra.',
    B4_49: 'Northern Adelaide wants the jobs from the defence build-up.', B4_50: 'Hobart needs housing, and wants its Antarctic science and ferries.',
    B4_51: 'Canberra and Queanbeyan want cross-border health funding and a quieter airport.', B4_52: 'The Northern Territory wants RAAF Tindal contracts, beef roads and reliable power.',
    B4_53: 'The anti-corruption commission holds most of its hearings in private.', B4_54: 'Freedom-of-information requests take months and cost a fortune.',
    B4_55: 'A High Court ruling has freed detainees, and voters are alarmed.', B4_56: 'Hate symbols, doxxing and campus intimidation are on the rise.',
    B4_57: 'Religious schools and equality campaigners are both demanding laws.', B4_58: 'Scammers stole $2.7 billion from Australians last year.',
    B4_59: 'The pandemic showed Australia cannot make its own medicines.', B4_60: 'Regional diplomacy is shifting fast across the Indian Ocean and South-East Asia.',
    B4_61: 'Junior sport is booming ahead of the Brisbane Olympics, but the clubs are broke.', B4_62: 'Australian drama is vanishing from streaming services.',
    B4_63: 'An iron ore and coal price slump has blown an $8 billion hole in the budget.', B4_64: 'A retail data breach has exposed six million identity documents.',
    B4_65: 'Your campaign bus has broken down in the outback, with the press pack on board.', B4_66: 'A former party heavyweight attacks your strategy on Sunday television.',
    B4_67: 'Pre-poll centres are swamped on day one.', B4_68: 'The Greens say they want coal bans and rent freezes in return for support.',
    B4_69: 'Bob Katter says North Queensland’s support comes at a price.', B4_70: 'Your corflutes use your rivals’ colours, and the electoral commission is looking at it.',
    B4_71: 'State premiers want an emergency hospital top-up.', B4_72: 'WA and Queensland Labor MPs want a long-term gas guarantee.',
    B4_73: 'Labor members want caps on rent increases.', B4_74: 'Catholic and independent schools want their funding locked in.',
    B4_75: 'Conservative senators want a crackdown on the ABC and diversity programs.', B4_76: 'Suburban moderates want childcare and paid parental leave at the centre of the campaign.',
    B4_77: 'Nationals threaten revolt over compulsory access to farmland for power lines.', B4_78: 'Joyce wants dams; Hanson wants a flat tax. You cannot fund both.',
    B4_79: 'One Nation has 150 candidates, and the media is checking every one.', B4_80: 'Do you go after the Coalition in the bush or Labor in the outer suburbs?'
  };
  const T = { B4_58: 'Fighting the $2.7 billion scam epidemic', B4_63: 'Iron ore and coal slump blows an $8 billion hole', B4_70: 'AEC colour-scheme corflute row' };
  C.cards.forEach(c => { const k = c.id.replace('CAMP_', ''); if (Q[k]) c.q = Q[k]; if (T[k]) c.t = T[k]; });
  // topic groups: cards that ask about the same issue. At most `cap` per campaign, at least `cd` turns apart. Follow-ups are never limited.
  C.topics = {
    rates: { cap: 2, cd: 6, ids: ["CAMP_ECON_01", "CAMP_B3_38", "CAMP_B4_01"] },
    migration: { cap: 2, cd: 6, ids: ["CAMP_HOUS_01", "CAMP_B2_23", "CAMP_B3_34", "INTL_BOATS", "CAMP_B3_45", "CAMP_B4_19"] },
    renters: { cap: 1, cd: 0, ids: ["CAMP_HOUS_02", "CAMP_B4_73", "CAMP_B4_16"] },
    supply: { cap: 2, cd: 6, ids: ["CAMP_B2_24", "CAMP_B4_17", "CAMP_B4_18", "CAMP_B4_22", "CAMP_B4_23", "CAMP_B4_08", "CAMP_B4_50"] },
    gas: { cap: 1, cd: 0, ids: ["CAMP_ENER_02", "CAMP_B4_72", "CAMP_B2_08"] },
    bills: { cap: 2, cd: 6, ids: ["CAMP_ENER_01", "CAMP_B4_15", "CAMP_B2_12", "CAMP_B4_28", "CAMP_B4_29", "CAMP_B4_37"] },
    renewables: { cap: 2, cd: 6, ids: ["CAMP_B2_06", "CAMP_B4_30", "CAMP_B4_31", "CAMP_B3_26", "CAMP_B4_39", "CAMP_B4_40", "CAMP_B3_22"] },
    nuclear: { cap: 1, cd: 0, ids: ["CAMP_LNP_01", "CAMP_B2_25"] },
    health: { cap: 2, cd: 6, ids: ["CAMP_HLTH_01", "CAMP_B3_27", "CAMP_B2_10", "CAMP_B4_71", "CAMP_B4_27", "CAMP_B4_12", "CAMP_B4_14", "CAMP_B4_44", "CAMP_B4_41", "CAMP_B4_51", "CAMP_B4_13", "CAMP_B2_28"] },
    china: { cap: 2, cd: 6, ids: ["CAMP_SEC_01", "CAMP_B2_29", "INTL_TRADE", "CAMP_B3_28", "CAMP_B4_60"] },
    candidates: { cap: 1, cd: 0, ids: ["CAMP_CRIS_02", "CAMP_ONP_02", "CAMP_B4_79"] },
    prefs: { cap: 2, cd: 6, ids: ["CAMP_PREF_01", "CAMP_LNP_02", "CAMP_B2_45", "PREF_FFP", "PREF_HMP", "PREF_LTP", "CAMP_B3_42", "CAMP_B4_69"] },
    greens: { cap: 1, cd: 0, ids: ["CAMP_ALP_03", "CAMP_B4_68", "CAMP_B3_44"] },
    crossbench: { cap: 1, cd: 0, ids: ["CAMP_B2_36", "CAMP_B2_37"] },
    nats: { cap: 2, cd: 6, ids: ["CAMP_B2_42", "CAMP_B3_47", "CAMP_B4_77", "NATS_SEATS", "NATS_CLIMATE"] },
    alphas: { cap: 2, cd: 6, ids: ["CAMP_ONP_01", "CAMP_B4_78", "CAMP_B3_49", "CAMP_B2_44"] },
    childcare: { cap: 1, cd: 0, ids: ["CAMP_B2_22", "CAMP_B4_11", "CAMP_B4_76", "CAMP_B3_13"] },
    fuel: { cap: 2, cd: 6, ids: ["CAMP_B2_26", "CAMP_B4_20", "CAMP_B3_25", "CAMP_B3_21", "INTL_OIL"] },
    transport: { cap: 2, cd: 6, ids: ["CAMP_B2_05", "CAMP_B4_10", "CAMP_B4_21", "CAMP_B3_19", "CAMP_B2_07", "CAMP_B2_01", "CAMP_B3_18"] },
    mining: { cap: 2, cd: 6, ids: ["CAMP_B4_36", "CAMP_B4_63", "CAMP_B2_02", "CAMP_B4_48", "INTL_MARKETS"] },
    cyber: { cap: 1, cd: 0, ids: ["CAMP_B2_34", "CAMP_B4_64"] },
    critics: { cap: 1, cd: 0, ids: ["CAMP_B3_41", "CAMP_B4_66", "CAMP_B2_40"] },
    airlines: { cap: 1, cd: 0, ids: ["CAMP_B3_39", "CAMP_B3_20"] },
    disaster: { cap: 2, cd: 8, ids: ["CAMP_CRIS_01", "CAMP_B2_35", "INTL_BIRDFLU"] },
    tax: { cap: 2, cd: 6, ids: ["CAMP_ECON_03", "CAMP_B2_21", "CAMP_B3_48", "CAMP_B4_06", "CAMP_B4_05", "CAMP_B3_33"] },
    education: { cap: 2, cd: 6, ids: ["CAMP_B3_08", "CAMP_B3_09", "CAMP_B4_74"] },
    integrity: { cap: 2, cd: 6, ids: ["CAMP_B4_53", "CAMP_B4_54", "CAMP_B2_31", "CAMP_B3_43"] },
    seats: { cap: 3, cd: 3, ids: ["SEAT_BENNELONG", "SEAT_DICKSON", "SEAT_GILMORE", "SEAT_KOOYONG", "SEAT_BRADFIELD", "SEAT_FARRER", "SEAT_NEWENGLAND", "SEAT_ASTON", "CAMP_B4_42"] },
    personal: { cap: 3, cd: 4, ids: ["PERS_SIZZLE", "PERS_PUB", "PERS_BUNNINGS", "PERS_FOOTY", "PERS_COOKING", "PERS_RADIO"] },
    mates: { cap: 2, cd: 6, ids: ["MATE_OFFSCRIPT", "MATE_STAR", "MATE_AMBITION", "MATE_OLDCOMMENTS", "MATE_DEBATE"] },
    states: { cap: 2, cd: 5, ids: ["STATE_NSW", "STATE_VIC", "STATE_QLD", "STATE_WA", "STATE_SA", "CAMP_B2_03"] },
    security: { cap: 2, cd: 6, ids: ["CAMP_B3_29", "CAMP_B3_30", "CAMP_B3_31", "CAMP_B3_32", "CAMP_B4_49", "CAMP_B4_55", "CAMP_B2_14", "INTL_PACIFIC"] },
    costofliving: { cap: 2, cd: 5, ids: ["CAMP_ECON_02", "CAMP_B4_09", "CAMP_B4_02", "CAMP_B4_03", "CAMP_B4_07", "CAMP_B4_58", "CAMP_B3_24", "CAMP_B3_10"] },
    environment: { cap: 2, cd: 6, ids: ["CAMP_B4_32", "CAMP_B4_33", "CAMP_B4_34", "CAMP_B4_35", "CAMP_B3_23", "CAMP_B4_38", "CAMP_B4_24"] },
    regions: { cap: 2, cd: 5, ids: ["CAMP_B4_43", "CAMP_B4_45", "CAMP_B4_46", "CAMP_B4_47", "CAMP_B4_52", "CAMP_B2_04", "CAMP_B2_09", "CAMP_B2_11", "CAMP_B2_13"] },
    social: { cap: 2, cd: 6, ids: ["CAMP_B4_56", "CAMP_B4_57", "CAMP_B3_06", "CAMP_B3_11", "CAMP_B3_12", "CAMP_B2_38"] },
    workplace: { cap: 2, cd: 6, ids: ["CAMP_IR_01", "CAMP_ALP_02", "CAMP_B2_39", "CAMP_B4_04"] },
  };
  // opening scenarios for replays. e.n: national first-preference shifts (points); e.r: seat-type shifts; e.sp: [from, to] spirit swaps;
  // e.u: starting caucus unity; e.m: momentum; e.pp: extra Political Power. sc scales the score (harder starts score more).
  C.scenarios = [
    { id: 'std', n: 'As it stands', d: 'Today’s polls and today’s national mood. The campaign as designed.' },
    { id: 'ratehike', n: 'Rate hike in week one', d: 'The Reserve Bank lifts the cash rate the day the writs are issued. Stagflation sets the mood, and the government starts on the back foot.', sc: 1.1,
      e: { sp: [['RBA_485_SQUEEZE', 'RBA_STAGFLATION_CRISIS']], n: { ALP: -1, LNP: 0.5, ONP: 0.5 } } },
    { id: 'hung', n: 'Hung-parliament polling', d: 'Both major parties are bleeding to the crossbench, and every poll points to a hung parliament.', sc: 1.05,
      e: { n: { ALP: -2.2, LNP: -0.8, IND: 1.4, GRN: 0.8, ONP: 0.6 } } },
    { id: 'siege', n: 'Leader under siege', d: 'The press gallery smells blood before a vote is cast. Your caucus unity starts at 34 and your momentum is negative.', sc: 1.15,
      e: { u: 34, m: -2 } },
    { id: 'honeymoon', n: 'Honeymoon start', d: 'A clean start and a clear message: unity 85, three points of momentum and 15 extra Political Power. The easy way in.', sc: 0.85,
      e: { u: 85, m: 3, pp: 15 } },
    { id: 'surge', n: 'One Nation surge', d: 'One Nation opens the campaign ahead of the Coalition in Queensland polling, and the right is at war with itself.', sc: 1.05,
      e: { sp: [['THREE_WAY_RIGHT_FRACTURE', 'RIGHT_WING_CIVIL_WAR']], n: { ONP: 3, LNP: -2.2, ALP: -0.8 } } },
    { id: 'blackout', n: 'Winter blackout', d: 'A cold snap trips the eastern grid in the first week. Energy dominates the campaign, and the government owns the blame.', sc: 1.05,
      e: { sp: [['GRID_TRANSITION_CROSSROADS', 'GRID_RELIABILITY_SCARE']] } },
    { id: 'teal', n: 'Teal summer', d: 'Community independents are polling at record highs in the leafy suburbs and the regions.', sc: 1.05,
      e: { r: { IN: { IND: 2.5 }, RUR: { IND: 1 } }, n: { IND: 0.4 } } },
    // added openings (all unlocked with honours)
    { id: 'security', n: 'Stand-off in the region', d: 'A naval stand-off in the region dominates the first week. Voters rally to steady hands, and defence and foreign policy lead every bulletin.', sc: 1.0,
      e: { n: { ALP: 0.4, LNP: 0.4, GRN: -0.6, ONP: -0.2 } } },
    { id: 'housing', n: 'Rent shock', d: 'Rents jump again in the outer suburbs as the campaign opens. Housing is the issue in every marginal seat, and the government wears it.', sc: 1.05,
      e: { n: { ALP: -0.8, GRN: 0.5, ONP: 0.3 }, r: { OUT: { ALP: -0.8, ONP: 0.5 } } } },
    { id: 'climate', n: 'Climate summer', d: 'Fires in the south and floods in the north before the writs are issued. Climate is back, and the Greens and teals are surging.', sc: 1.05,
      e: { n: { GRN: 1.4, IND: 0.4, ALP: -0.5, LNP: -0.8 }, r: { IN: { GRN: 1 } } } },
    { id: 'migration', n: 'Migration flashpoint', d: 'Record arrivals figures land in week one. Migration and housing collide, and One Nation sets the terms of debate.', sc: 1.05,
      e: { n: { ONP: 1.5, LNP: 0.2, ALP: -1.0, GRN: -0.3 } } },
    { id: 'drought', n: 'Drought in the bush', d: 'A failed season across the eastern states. Farmers feel forgotten, and the regions are up for grabs.', sc: 1.05,
      e: { r: { RUR: { LNP: -1.2, ONP: 1.0, IND: 0.5 }, PROV: { LNP: -0.5, ONP: 0.5 } } } },
    { id: 'budget', n: 'Budget blowout', d: 'Treasury revises the deficit up by billions on day one. Every promise is costed twice, and Political Power starts tight.', sc: 1.1,
      e: { n: { ALP: -0.6, LNP: 0.3 }, pp: -8 } },
    { id: 'scandal', n: 'Scandal on day one', d: 'A frontbencher’s expenses story breaks the morning the writs are issued. Your caucus is rattled before the first doorstop.', sc: 1.15,
      e: { u: 52, m: -2 } }
  ];
  // policy tags, corrected: the tag decides which national-mood multipliers, leader weaknesses and debate bonuses apply to a card.
  // CRISIS means a scandal or gaffe (scandal multipliers apply); a disaster or outage is not one. An empty tag means none applies.
  const RETAG = {"CAMP_CRIS_01": "", "CAMP_B2_01": "ECONOMY", "CAMP_B2_03": "ECONOMY", "CAMP_B2_07": "ECONOMY", "CAMP_B2_09": "NATIONAL_SECURITY", "CAMP_B2_10": "HEALTH", "CAMP_B2_13": "ECONOMY", "CAMP_B2_22": "COST_OF_LIVING", "CAMP_B2_27": "HEALTH", "CAMP_B2_32": "ECONOMY", "CAMP_B2_34": "NATIONAL_SECURITY", "CAMP_B2_35": "", "CAMP_B2_39": "IR", "CAMP_B2_45": "PREFS", "CAMP_B3_07": "ECONOMY", "CAMP_B3_08": "COST_OF_LIVING", "CAMP_B3_13": "COST_OF_LIVING", "CAMP_B3_15": "TAX", "CAMP_B3_16": "", "CAMP_B3_18": "ECONOMY", "CAMP_B3_19": "ECONOMY", "CAMP_B3_21": "TAX", "CAMP_B3_27": "HEALTH", "CAMP_B3_34": "MIGRATION", "CAMP_B3_36": "ECONOMY", "CAMP_B3_37": "CRISIS", "CAMP_B3_38": "COST_OF_LIVING", "CAMP_B3_39": "ECONOMY", "CAMP_B3_41": "ECONOMY", "CAMP_B3_43": "CRISIS", "CAMP_B3_44": "TAX", "CAMP_B3_45": "MIGRATION", "CAMP_B3_46": "ECONOMY", "CAMP_B3_49": "PREFS", "CAMP_B4_01": "COST_OF_LIVING", "CAMP_B4_02": "COST_OF_LIVING", "CAMP_B4_03": "IR", "CAMP_B4_04": "IR", "CAMP_B4_06": "COST_OF_LIVING", "CAMP_B4_07": "COST_OF_LIVING", "CAMP_B4_09": "TAX", "CAMP_B4_10": "COST_OF_LIVING", "CAMP_B4_12": "HEALTH", "CAMP_B4_13": "HEALTH", "CAMP_B4_14": "HEALTH", "CAMP_B4_20": "TAX", "CAMP_B4_21": "COST_OF_LIVING", "CAMP_B4_25": "COST_OF_LIVING", "CAMP_B4_27": "HEALTH", "CAMP_B4_34": "HOUSING", "CAMP_B4_36": "ECONOMY", "CAMP_B4_47": "HEALTH", "CAMP_B4_52": "", "CAMP_B4_53": "CRISIS", "CAMP_B4_55": "MIGRATION", "CAMP_B4_59": "HEALTH", "CAMP_B4_63": "ECONOMY", "CAMP_B4_64": "NATIONAL_SECURITY", "CAMP_B4_67": "", "CAMP_B4_70": "CRISIS", "CAMP_B4_77": "ENERGY", "CAMP_B4_79": "CRISIS", "CAMP_B4_80": "", "FU_BIG_SPEND": "ECONOMY", "FU_PBO_GOOD": "ECONOMY", "FU_RBA_ATTACK": "ECONOMY", "FU_FACTORY": "ECONOMY", "FU_VISA_WORKERS": "MIGRATION", "FU_CLIMATE_PLEDGE": "ENERGY", "FU_NET_ZERO": "ENERGY", "FU_GREENS_UNIONS": "ENERGY", "FU_EMPLOYERS": "IR", "FU_FLOOD_MAYORS": "", "INTL_OIL": "COST_OF_LIVING", "INTL_MARKETS": "ECONOMY", "INTL_BIRDFLU": "", "INTL_BOATS": "MIGRATION", "MATE_OLDCOMMENTS": "CRISIS", "STATE_NSW": "HEALTH", "STATE_VIC": "ECONOMY", "STATE_SA": "NATIONAL_SECURITY"};
  C.cards.forEach(c => { if (c.id in RETAG) { if (RETAG[c.id]) c.tag = RETAG[c.id]; else delete c.tag; } });
  // leader-only answers: a signature move for each leader, and a cursed one (off-brand, or a big gamble). Attached to every version of a
  // milestone (mile: n) or to one card (card: id). Only the named leader sees them.
  const LO = [
    // Labor
    { mile: 1, only: 'anthony_albanese', x: 'Launch back home in Marrickville: the boy from public housing asks for a third term.', e: { o: 0.9, r: { OUT: 0.6 }, u: 5, m: 1 }, h: 'Albanese goes home to Marrickville for the launch' },
    { mile: 3, only: 'anthony_albanese', x: 'Announce a second referendum on an Indigenous Voice to Parliament.', rng: { k: 'd', min: 3, ok: { o: 0.3, r: { IN: 1.5 }, m: 1 }, no: { o: -1.1, r: { OUT: -0.8, RUR: -1 }, m: -2, u: -4 } }, h: 'Albanese revives the Voice, and the campaign stops' },
    { mile: 5, only: 'anthony_albanese', tag: 'HEALTH', x: 'Close on Medicare: bulk billing in every suburb and every town.', e: { o: 0.7, r: { OUT: 0.7, PROV: 0.7 } }, h: 'Albanese bets the house on Medicare' },
    { mile: 2, only: 'jim_chalmers', x: 'Turn the costings into a Treasurer’s lock-up: every chart, every number, live on the news.', e: { o: 1, pp: 6, m: 1, f: ['PASSED_PBO_CLEAN'] }, h: 'Chalmers turns the costings into a budget night' },
    { mile: 4, only: 'jim_chalmers', x: 'Open the debate with a long essay-style case for “values-based capitalism”.', rng: { k: 'd', min: 3, ok: { o: 0.6, r: { IN: 1 } }, no: { o: -1.2, m: -3 } }, h: 'Chalmers lectures, and the audience drifts' },
    { mile: 3, only: 'tanya_plibersek', x: 'Make it Labor’s green heart: an inner-city address on housing, nature and schools.', e: { r: { IN: { ALP: 2, GRN: -1.4 }, RUR: -0.8 }, pf: { grn: 3 } }, h: 'Plibersek wins back the inner city' },
    { mile: 2, only: 'tanya_plibersek', tag: 'ENERGY', x: 'Promise to block every new coal and gas approval under stronger nature laws.', e: { u: -8, r: { IN: { ALP: 2.5, GRN: -2 }, RUR: -2, PROV: -1.5 } }, h: 'Plibersek’s approvals freeze rocks the resource states' },
    { mile: 1, only: 'chris_bowen', tag: 'ENERGY', x: 'Launch at a wind-turbine factory in the Hunter: Australia, the renewable-energy superpower.', e: { r: { PROV: 1.2, IN: 1, RUR: -0.8 }, m: 1, sp: [['TRANSFORM', 'GRID_TRANSITION_CROSSROADS', 'FUTURE_MADE_IN_AUSTRALIA_BOOM']] }, h: 'Bowen bets the launch on clean-energy jobs' },
    { mile: 5, only: 'chris_bowen', x: 'Spend the final day abroad at a climate summit, beamed back to the rally on a big screen.', rng: { k: 'd', min: 3, ok: { o: 0.5, r: { IN: 1 } }, no: { o: -1, r: { OUT: -0.8, RUR: -1 }, m: -2 } }, h: 'Bowen is overseas on the last day of the campaign' },
    // Coalition
    { mile: 2, only: 'angus_taylor', x: 'Release your own audit of every Labor program, line by line, the Rhodes Scholar way.', e: { o: 1, pp: 6, m: 1, r: { OUT: 0.6 } }, h: 'Taylor’s line-by-line audit lands' },
    { mile: 3, only: 'angus_taylor', tag: 'ENERGY', x: 'Promise to keep named coal-fired power stations open, whatever it costs.', rng: { k: 'm', min: 2, ok: { r: { RUR: 2, PROV: 1 }, m: 2 }, no: { r: { IN: -2.5, OUT: -1 }, m: -3, pf: { ind: -3 } } }, h: 'Taylor backs coal by name' },
    { mile: 5, only: 'angus_taylor', tag: 'COST_OF_LIVING', x: 'End with a tax-cut calculator: every household, their number.', e: { o: 0.4, r: { OUT: 1.2 } }, h: 'Taylor ends with your tax cut, to the dollar' },
    { mile: 4, only: 'andrew_hastie', tag: 'NATIONAL_SECURITY', x: 'Make the debate about defence: a nation that can look after itself.', e: { o: 0.8, r: { RUR: 0.8, OUT: 0.6, IN: -0.8 }, m: 1 }, h: 'The former soldier owns debate night' },
    { mile: 1, only: 'andrew_hastie', x: 'Launch with a vow to slash immigration and take on “the woke elites”.', rng: { k: 'm', min: 3, ok: { r: { OUT: 1.2, RUR: 1.5 }, n: { ONP: -1 } }, no: { r: { IN: -3, OUT: -0.8 }, pf: { ind: -4 }, u: -6, m: -3 } }, h: 'Hastie’s culture-war launch splits the room' },
    { mile: 1, only: 'josh_frydenberg', x: 'Launch in Kooyong: the Liberal Party of Menzies is back, and so am I.', e: { r: { IN: { LNP: 2.2, IND: -1.8 } }, pf: { ind: 3 }, u: -3 }, h: 'Frydenberg’s comeback starts at home' },
    { mile: 5, only: 'josh_frydenberg', x: 'Close by reminding voters you were the pandemic Treasurer who spent big to save jobs.', rng: { k: 'd', min: 3, ok: { o: 0.6 }, no: { o: -1.2, m: -2, r: { OUT: -0.6 } } }, h: 'Frydenberg relitigates the pandemic' },
    { mile: 3, only: 'tim_wilson', x: 'Give the liberal case for the teal seats: smaller government, freer markets, cleaner energy.', e: { r: { IN: { LNP: 2, IND: -1.5 }, RUR: -1 } }, h: 'Wilson speaks to the teal belt' },
    { mile: 2, only: 'tim_wilson', tag: 'TAX', x: 'Reopen the franking-credits fight: promise to block every Labor “retiree tax”, forever.', rng: { k: 'd', min: 2, ok: { o: 0.4, r: { OUT: 0.8, PROV: 0.8 }, m: 1 }, no: { o: -1, r: { IN: -1 }, m: -2, u: -4 } }, h: 'Wilson goes back to 2019' },
    // One Nation
    { mile: 1, only: 'pauline_hanson', x: 'Launch in Ipswich, where it all began in 1996: thirty years of “please explain”.', e: { r: { OUT: 1.2, PROV: 1 }, m: 2, u: 3 }, h: 'Hanson goes back to Ipswich' },
    { mile: 4, only: 'pauline_hanson', x: 'Pull a Senate-style stunt on live television to make your point.', rng: { k: 'm', min: 3, ok: { o: 0.6, m: 3 }, no: { o: -1.3, m: -3, r: { OUT: -0.8 } } }, h: 'Hanson stunt takes over debate night' },
    { mile: 1, only: 'barnaby_joyce', x: 'Launch from a ute tray in Tamworth: dams, coal and the bush.', e: { r: { RUR: 1.8, PROV: 0.6, IN: -1 }, m: 2 }, h: 'Joyce launches from the back of a ute' },
    { mile: 3, only: 'barnaby_joyce', x: 'Go off-script with a long, colourful riff on everything from Net Zero to the price of beef.', rng: { k: 'd', min: 3, ok: { m: 3, r: { RUR: 1 } }, no: { o: -1.2, m: -3, u: -5 } }, h: 'Joyce riff goes viral' },
    { mile: 2, only: 'malcolm_roberts', x: 'Release “the empirical evidence”: a 400-page costings audit.', rng: { k: 'd', min: 2, ok: { o: 0.8, m: 1, f: ['PASSED_PBO_CLEAN'] }, no: { o: -1, m: -2 } }, h: 'Roberts tables the evidence' },
    { mile: 4, only: 'malcolm_roberts', tag: 'ENERGY', x: 'Ask the moderator, live, for the empirical evidence that the climate is changing.', rng: { k: 'd', min: 4, ok: { r: { RUR: 1.5 }, m: 2 }, no: { o: -1.5, r: { IN: -1.5, OUT: -1 }, m: -3 } }, h: 'Roberts demands evidence on live television' }
  ];
  // the cursed ones, and an id for each answer so the collection can track it
  const CURSED = ['anthony_albanese:m3', 'jim_chalmers:m4', 'tanya_plibersek:m2', 'chris_bowen:m5', 'angus_taylor:m3', 'andrew_hastie:m1', 'josh_frydenberg:m5', 'tim_wilson:m2', 'pauline_hanson:m4', 'barnaby_joyce:m3', 'malcolm_roberts:m4'];
  const STANCE = { 'tanya_plibersek:m2': 'fossil-', 'chris_bowen:m1': 'fossil-', 'angus_taylor:m3': 'fossil+', 'andrew_hastie:m1': 'migration+', 'tim_wilson:m2': 'tax-' };
  LO.forEach(o => { o.lo = o.only + ':' + (o.mile ? 'm' + o.mile : o.card); if (CURSED.includes(o.lo)) o.cursed = true; if (STANCE[o.lo]) o.st = STANCE[o.lo]; });
  C.LO = LO;
  if (!(window.CAMPAIGN_TUNE || {}).noLO) C.cards.forEach(c => LO.forEach(o => { if ((o.mile && c.mile === o.mile) || (o.card && c.id === o.card)) { const { mile, card, ...opt } = o; c.opts.push({ tag: 'GENERAL', ...opt }); } }));
})();
