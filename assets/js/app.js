const DATA = window.SIM.DATA;
const FAC_NEW={'Stephen Conroy':'LR','Kristina Keneally':'LR','Daniel Andrews':'LL','Bill Shorten':'LR','Stephen Smith':'LR','Kevin Rudd':'LR','Annastacia Palaszczuk':'LR','Mark McGowan':'LR',
  'Scott Morrison':'CR','Tony Abbott':'NR','Dominic Perrottet':'NR','Julie Bishop':'LM','Gladys Berejiklian':'LM','Christopher Pyne':'LM','Steven Marshall':'LM','Sussan Ley':'LM',
  'Warren Truss':'N_QLD','John Barilaro':'N_NSW'};
// comeback and outsider leaders (catalogue v15): vote effect comes from their traits (traits.js); h = enters at a pre-election by-election in a seat their party holds, c = contests a seat held by someone else, j = Joyce rejoins the Nationals
const NEWL={"Stephen Conroy": {"p": "Labor", "t": "h", "s": "Gellibrand", "st": "Vic", "inc": "Tim Watts"}, "Kristina Keneally": {"p": "Labor", "t": "h", "s": "Barton", "st": "NSW", "inc": "Ash Ambihaipahar"}, "Daniel Andrews": {"p": "Labor", "t": "h", "s": "Bruce", "st": "Vic", "inc": "Julian Hill"}, "Bill Shorten": {"p": "Labor", "t": "h", "s": "Maribyrnong", "st": "Vic", "inc": "Jo Briskey"}, "Stephen Smith": {"p": "Labor", "t": "h", "s": "Perth", "st": "WA", "inc": "Patrick Gorman"}, "Kevin Rudd": {"p": "Labor", "t": "h", "s": "Griffith", "st": "Qld", "inc": "Renee Coffey"}, "Annastacia Palaszczuk": {"p": "Labor", "t": "h", "s": "Oxley", "st": "Qld", "inc": "Milton Dick"}, "Mark McGowan": {"p": "Labor", "t": "h", "s": "Brand", "st": "WA", "inc": "Madeleine King"}, "Scott Morrison": {"p": "Coalition", "t": "h", "s": "Cook", "st": "NSW", "inc": "Simon Kennedy"}, "Tony Abbott": {"p": "Coalition", "t": "c", "s": "Warringah", "st": "NSW", "inc": ""}, "Dominic Perrottet": {"p": "Coalition", "t": "c", "s": "Bradfield", "st": "NSW", "inc": ""}, "Julie Bishop": {"p": "Coalition", "t": "c", "s": "Curtin", "st": "WA", "inc": ""}, "Gladys Berejiklian": {"p": "Coalition", "t": "c", "s": "Bennelong", "st": "NSW", "inc": ""}, "Christopher Pyne": {"p": "Coalition", "t": "c", "s": "Sturt", "st": "SA", "inc": ""}, "Steven Marshall": {"p": "Coalition", "t": "c", "s": "Boothby", "st": "SA", "inc": ""}, "Campbell Newman": {"p": "Coalition", "t": "c", "s": "Brisbane", "st": "Qld", "inc": ""}, "Warren Truss": {"p": "Nationals", "t": "h", "s": "Wide Bay", "st": "Qld", "inc": "Llew O'Brien"}, "John Barilaro": {"p": "Nationals", "t": "c", "s": "Eden-Monaro", "st": "NSW", "inc": ""}, "Barnaby Joyce": {"p": "Nationals", "t": "x", "s": "New England", "st": "NSW", "inc": ""}, "Cory Bernardi": {"p": "One Nation", "t": "c", "s": "Barker", "st": "SA", "inc": ""}, "Mark Latham": {"p": "One Nation", "t": "c", "s": "Hunter", "st": "NSW", "inc": ""}, "Bob Brown": {"p": "Greens", "t": "c", "s": "Franklin", "st": "Tas", "inc": ""}, "Adam Bandt": {"p": "Greens", "t": "c", "s": "Melbourne", "st": "Vic", "inc": ""}, "Cathy McGowan": {"p": "Community Strong", "t": "h", "s": "Indi", "st": "Vic", "inc": "Helen Haines"}, "Kerryn Phelps": {"p": "Community Strong", "t": "h", "s": "Wentworth", "st": "NSW", "inc": "Allegra Spender"}, "Simon Holmes à Court": {"p": "Community Strong", "t": "h", "s": "Kooyong", "st": "Vic", "inc": "Monique Ryan"}, "Sussan Ley": {"p": "Coalition", "t": "c", "s": "Farrer", "st": "NSW", "inc": ""}};
DATA.leaders.forEach(l=>{if(l.name==='Matt Canavan')l.seat='Capricornia (Qld)';if(l.name==='Barnaby Joyce')l.seat='Senate candidate (NSW)';});
DATA.leaders.push(...[{"party": "Labor", "name": "Stephen Conroy", "seat": "Gellibrand (Vic)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 60}, {"party": "Labor", "name": "Kristina Keneally", "seat": "Barton (NSW)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 61}, {"party": "Labor", "name": "Daniel Andrews", "seat": "Bruce (Vic)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 62}, {"party": "Labor", "name": "Bill Shorten", "seat": "Maribyrnong (Vic)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 63}, {"party": "Labor", "name": "Stephen Smith", "seat": "Perth (WA)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 64}, {"party": "Labor", "name": "Kevin Rudd", "seat": "Griffith (Qld)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 65}, {"party": "Labor", "name": "Annastacia Palaszczuk", "seat": "Oxley (Qld)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 66}, {"party": "Labor", "name": "Mark McGowan", "seat": "Brand (WA)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 67}, {"party": "Coalition", "name": "Scott Morrison", "seat": "Cook (NSW)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 68}, {"party": "Coalition", "name": "Tony Abbott", "seat": "Warringah (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 69}, {"party": "Coalition", "name": "Dominic Perrottet", "seat": "Bradfield (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 70}, {"party": "Coalition", "name": "Julie Bishop", "seat": "Curtin (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 71}, {"party": "Coalition", "name": "Gladys Berejiklian", "seat": "Bennelong (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 72}, {"party": "Coalition", "name": "Christopher Pyne", "seat": "Sturt (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 73}, {"party": "Coalition", "name": "Steven Marshall", "seat": "Boothby (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 74}, {"party": "Coalition", "name": "Campbell Newman", "seat": "Brisbane (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 75}, {"party": "Nationals", "name": "Warren Truss", "seat": "Wide Bay (Qld)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 77}, {"party": "Nationals", "name": "John Barilaro", "seat": "Eden-Monaro (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 78}, {"party": "Nationals", "name": "Barnaby Joyce", "seat": "Senate candidate (NSW)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 80}, {"party": "One Nation", "name": "Cory Bernardi", "seat": "Barker (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 82}, {"party": "One Nation", "name": "Mark Latham", "seat": "Hunter (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 83}, {"party": "Greens", "name": "Bob Brown", "seat": "Franklin (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 84}, {"party": "Greens", "name": "Adam Bandt", "seat": "Melbourne (candidate)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 86}, {"party": "Community Strong", "name": "Cathy McGowan", "seat": "Indi (Vic)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 87}, {"party": "Community Strong", "name": "Kerryn Phelps", "seat": "Wentworth (NSW)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 88}, {"party": "Community Strong", "name": "Simon Holmes à Court", "seat": "Kooyong (Vic)", "d": [0, 0, 0, 0, 0], "sel": false, "rk": 89}]);
const D = ENGINE.prepare(DATA); ENGINE.calibrate(D);
const P = DATA.groups;              // every party that stood in 2025: 0 ALP 1 COA 2 GRN 3 ON 4 IND, then minor parties
const NG = P.length, CG = DATA.colG;
const NATI = P.findIndex(g=>g.ab==='NAT');
const MINOR = P.map((_,j)=>j).filter(j=>j>=5&&j!==NATI).sort((a,b)=>DATA.prim25[b]-DATA.prim25[a]);
const ORD = [0,1,NATI,3,4,...MINOR,2];
const the = g => g===4?'an independent':g===1?(SPLIT?'the Liberals':'the Coalition'):g===NATI?'the Nationals':g===2?'the Greens':P[g].n;
// ---- Coalition split: Liberals (group 1) and Nationals (NATI) become separate parties everywhere
let SPLIT=false, CIND_ON=false;
const P1=Object.assign({},P[1]), PRIM25=DATA.prim25.slice(), LAST0=DATA.last.slice(), CUR0=DATA.current.slice();
const CGS=DATA.colG.slice(), CGQ=DATA.colG.slice(); CGS[2]=NATI; CGQ[1]=NATI; CGQ[2]=NATI;
const cgFor=s=>!SPLIT?DATA.colG:(s.nr&&s.st==='QLD'?CGQ:CGS);
const CSAI=P.findIndex(g=>g.ab==='CSA');
function applyCind(on){CIND_ON=!!on;const k=P.findIndex(g=>g.ab==='CSA'),n=Object.keys(CINDS).length;DATA.current[k]=CUR0[k]+(on?n:0);DATA.current[4]=CUR0[4]-(on?n:0);}
function applyName(k){const n=CNAMES[k]||CNAMES[0];P[CSAI].n=n[0];P[CSAI].full=n[1];const sg=S2.groups.find(g=>g.k==='CSA');if(sg)sg.n=n[0];
  const sl=document.querySelector('label[for="s'+CSAI+'"] span');if(sl&&sl.firstChild)sl.firstChild.textContent=n[0]+' ';}
function applySplit(on){
  SPLIT=!!on;
  P[1].n=on?'Liberal':P1.n; P[1].full=on?'Liberal Party of Australia':P1.full;
  {const sg=S2.groups.find(g=>g.k==='COA');if(sg)sg.n=on?'Liberal':'Coalition';}
  DATA.last=LAST0.slice(); DATA.current=CUR0.slice(); DATA.prim25=PRIM25.slice();
  if(on){DATA.last[1]=DATA.split.last[0];DATA.last[NATI]=DATA.split.last[1];DATA.current[1]=DATA.split.cur[0];DATA.current[NATI]=DATA.split.cur[1];
    let l=0,n=0;D.seats.forEach(s=>{const g=cgFor(s);s.b.forEach((v,j)=>{if(g[j]===1)l+=v*s.fv;else if(g[j]===NATI)n+=v*s.fv;});});
    DATA.prim25[NATI]=PRIM25[1]*n/(l+n); DATA.prim25[1]=PRIM25[1]*l/(l+n);}
  {const l1=document.querySelector('label[for="s1"] span');if(l1)l1.firstChild.textContent=on?'Liberal':'Coalition';
   const d1=$('s1')&&$('s1').closest('.ctl').querySelector('.desc');if(d1)d1.textContent=on?'Moves the Liberal vote only (Liberal and LNP members in the Liberal party room). The Nationals have their own slider while the Coalition is split.':DESC.s1;
   const sn=$('s'+NATI);if(sn){sn.closest('.ctl').hidden=!on;}}
  const ol=document.querySelector('.odd.coa .l'); if(ol) ol.textContent=on?'Liberal + National majority':'Coalition majority';
}
// changes since the 2025 election (seat holders)
const HELD={'New England':'ON','Farrer':'ON','Wentworth':'CSA','Warringah':'CSA'}, HELDBY={'New England':'Barnaby Joyce','Farrer':'David Farley'};
const CHANGES=[['27 November 2025','New England','Barnaby Joyce resigns from the Nationals and later joins One Nation.','ON'],
  ['13 February 2026','—','Angus Taylor replaces Sussan Ley as Liberal leader and Leader of the Opposition.',null],
  ['10 March 2026','Maranoa','David Littleproud resigns as Nationals leader (stays MP for Maranoa).',null],
  ['9 May 2026','Farrer','One Nation\'s David Farley wins the by-election after Sussan Ley resigns: the party\'s first House seat won at an election.','ON'],
  ['25 June 2026','Warringah, Wentworth','Zali Steggall and Allegra Spender launch Community Strong Australia.','CSA'],
  ['30 September 2026','—','David Shoebridge replaces Larissa Waters as Greens leader.',null],
  ['2 June 2025','Senate (WA)','Senator Dorinda Cox leaves the Greens for Labor.','ALP'],
  ['13 May 2025','Senate (Vic)','Ralph Babet (United Australia) announces he will not recontest in 2028.',null],
  ['18 October 2025','Senate (Tas)','Peter Whish-Wilson (Greens) announces his retirement.',null],
  ['2026','Capricornia','Michelle Landry (LNP) will not recontest; Matt Canavan (Nationals) is the candidate.',null],
  ['2026','New England','Barnaby Joyce will not recontest New England; he runs for the Senate in New South Wales for One Nation.',null],
  ['2026','Grayndler','Hannah Ferguson announces she will run as an independent.',null],
  ['2026','Senate (SA)','Barbara Pocock (Greens) will retire; Isaac Astill heads the Greens ticket. Penny Wong and Don Farrell recontest for Labor.',null],
  ['2026','Senate (Tas)','Jonathon Duniam (Liberal) will retire; Sarah Courtney takes his place on the ticket.',null],
  ['2026','—','Trumpet of Patriots becomes the Australian Federation Party.',null]];
CHANGES.sort((a,b)=>new Date(/^\d{4}$/.test(a[0])?a[0]+'-12-31':a[0])-new Date(/^\d{4}$/.test(b[0])?b[0]+'-12-31':b[0]));
const gOf = s => {if(CIND_ON&&CINDS[s.n])return P.findIndex(g=>g.ab==='CSA');const g=HELD[s.n]?P.findIndex(g=>g.ab===HELD[s.n]) : s.inc==='IND'&&s.lc!==8 ? CG[s.lc] : INC[s.inc]; return g===1&&SPLIT&&s.nr?NATI:g;};
const col = i => getComputedStyle(document.documentElement).getPropertyValue('--'+P[i].k).trim();
const INC = {ALP:0,LNP:1,GRN:2,ON:3,IND:4};
const SL = P.map((g,j)=>[g.ab,g.n,j]).filter(r=>r[2]!==NG-1||DATA.prim25[NG-1]>0);
const EV = window.SIM.EVENTS;
EV.forEach(e=>{e.opts[0]='Default';});   // the starting value of every event is the baseline (no change)
const LP = ['Labor','Coalition','Nationals','One Nation','Greens','Community Strong',"Katter's Australian"];
// minor-party leaders (Wikipedia infoboxes, 2026); role shown when the party has no formal leader
const LEAD = {IND:{n:'N/A',na:1}, AFP:{n:'N/A',na:1}, FFP:{n:'Lyle Shelton',r:'National director'}, HMP:{n:'Michael Balderstone',r:'President'},
  XEN:{n:'No leader',na:1}, CSA:{n:'No leader',na:1}, KAP:{n:'Robbie Katter'}, LTP:{n:'Anthony Bull',r:'President'}, GRPF:{n:'Gerard Rennick',s:'None (former senator)'},
  AJP:{n:'Bruce Poon',r:'President'}, AUC:{n:'Maryka Groenewald'}, ASP:{n:'Robert Borsak',r:'NSW leader',s:'NSW Legislative Council'}, SAL:{n:'Collective leadership'},
  VNS:{n:'Collective leadership'}, CEC:{n:'Craig Isherwood',r:'National leader'}, SOPA:{n:'Drew Wolfendale',r:'President'}, IAP:{n:'Owen Whyman',r:'Convenor'},
  IMO:{n:"Michael O'Neill"}, NAT:{n:'Matt Canavan',s:'Senator for Queensland'}, AUD:{n:'Leonie Green',r:'President'}, GAP:{n:'Rod Culleton'}, NAFD:{n:'—'}, OTH:{n:'—'}};
// Malcolm Turnbull as Community Strong leader stands in Wentworth (his seat 2004–2018) in place of the sitting member, with a local lift
const TB=()=>S.ldr&&S.ldr['Community Strong']==='Malcolm Turnbull';
function TBW(){const a=(S.seatAdj||[]).slice();
  // sitting MP retires: the party loses the member's personal vote (about 2.5 points)
  Object.keys(S.retire||{}).forEach(n=>{const i=D.seats.findIndex(s=>s.n===n);if(i>=0)a.push({i,g:gOf(D.seats[i]),amt:-2.5});});
  // candidate quality: star candidate +3, strong local +1.5, scandal -4 for the chosen party
  Object.entries(S.cand||{}).forEach(([n,v])=>{const i=D.seats.findIndex(s=>s.n===n);if(i>=0&&v)a.push({i,g:v.g,amt:{star:3,local:1.5,scandal:-4}[v.q]||0});});if(TB()){const i=D.seats.findIndex(s=>s.n==='Wentworth');if(i>=0)a.push({i,g:P.findIndex(g=>g.ab==='CSA'),amt:4});}return a;}
const HELDBY0={...HELDBY},HELD0={...HELD};
function tbMember(){Object.keys(HELDBY).forEach(k=>delete HELDBY[k]);Object.assign(HELDBY,HELDBY0);Object.keys(HELD).forEach(k=>delete HELD[k]);Object.assign(HELD,HELD0);
  Object.keys(S.spec||{}).forEach(n=>{if(!S.spec[n])return;const r=NEWL[n];if(r&&r.t==='h')HELDBY[r.s]=n;else if(n==='Malcolm Turnbull')HELDBY['Wentworth']=n;});
  Object.entries(S.ldr||{}).forEach(([p,n])=>{const r=NEWL[n];if(!r||r.p!==p)return;if(r.t==='h')HELDBY[r.s]=n;if(r.t==='j')delete HELD[r.s];});
  if(TB())HELDBY['Wentworth']='Malcolm Turnbull';}
// a challenger leader stands as a named candidate in their seat (no vote effect); an earlier one is removed
// speculative candidates: off by default, toggled in the sandbox; one tied to a leader is switched on when that leader is picked
const SPG={Labor:0,Coalition:1,Nationals:1,'One Nation':3,Greens:2};
const SPEC=(()=>{const out=[{s:'Kooyong',g:1,n:'Josh Frydenberg',pty:'Liberal',p:'Coalition',k:'c',note:'Former Treasurer; lost Kooyong in 2022.'}];
  Object.entries(NEWL).forEach(([n,r])=>{if(r.t!=='h'&&r.t!=='c')return;const g=r.p==='Community Strong'?'CSA':SPG[r.p];if(g==null)return;
    out.push({s:r.s,g,n,p:r.p,k:r.t,pty:r.p==='Coalition'?'Liberal':r.p,note:r.t==='h'?`Replaces ${r.inc} as the ${r.p} candidate.`:`Runs for ${r.s} (${r.st}).`});});
  out.push({s:'Wentworth',g:'CSA',n:'Malcolm Turnbull',p:'Community Strong',k:'h',pty:'Community Strong',note:'Replaces Allegra Spender as the Community Strong candidate.'});
  const ord=['Labor','Coalition','Nationals','One Nation','Greens','Community Strong'];return out.sort((a,b)=>ord.indexOf(a.p)-ord.indexOf(b.p));})();
const spG=x=>x.g==='CSA'?GI('CSA'):x.g;
function specOn(x){if(x.k==='h')return !!((S.spec||{})[x.n]||(S.ldr&&S.ldr[x.p]===x.n));const v=(S.cand||{})[x.s];return !!(v&&v.n===x.n);}
function specSet(x,on){S.cand={...(S.cand||{})};S.spec={...(S.spec||{})};
  if(x.k==='h'){if(on){SPEC.forEach(y=>{if(y!==x&&y.k==='h'&&y.s===x.s)delete S.spec[y.n];});S.spec[x.n]=1;}else delete S.spec[x.n];}
  else if(on)S.cand[x.s]={g:spG(x),q:'',n:x.n,top:1};else if(S.cand[x.s]&&S.cand[x.s].n===x.n)delete S.cand[x.s];}
function ldrCands(){S.cand={...(S.cand||{})};Object.keys(S.cand).forEach(k=>{if(S.cand[k]&&S.cand[k].auto)delete S.cand[k];});
  SPEC.forEach(x=>{if(x.k==='c'&&S.ldr&&S.ldr[x.p]===x.n&&!S.cand[x.s])S.cand[x.s]={g:spG(x),q:'',n:x.n,top:1,auto:1};});
}
const GEO0 = window.SIM.GEO; let GEO = GEO0; const HEXR = window.SIM.HEX;
// hex cartogram: every seat the same size, grouped by state (geographic map kept as GEO0)
const HEXGEO=(()=>{const r=HEXR.r,cells={},key=(x,y)=>Math.round(x/4)+','+Math.round(y/4),at={},stOf={};DATA.seats.forEach(s=>stOf[s.n]=s.st);
  const V=(x,y,k)=>{const a=Math.PI/180*(60*k-30);return [x+r*Math.cos(a),y+r*Math.sin(a)];};
  for(const [n,[x,y]] of Object.entries(HEXR.pos)){let d='';for(let k=0;k<6;k++){const [vx,vy]=V(x,y,k);d+=(k?'L':'M')+vx.toFixed(1)+','+vy.toFixed(1);}cells[n]={d:d+'Z',c:[x,y],w:r*1.73};at[key(x,y)]=n;}
  // state outlines: an edge is drawn wherever the neighbour across it is missing or in another state
  let bord='';const sq=Math.sqrt(3)*r;
  for(const [n,[x,y]] of Object.entries(HEXR.pos))for(let k=0;k<6;k++){const th=Math.PI/180*(60*k);const nb=at[key(x+sq*Math.cos(th),y+sq*Math.sin(th))];
    if(!nb||stOf[nb]!==stOf[n]){const [ax,ay]=V(x,y,k),[bx,by]=V(x,y,(k+1)%6);bord+=`M${ax.toFixed(1)},${ay.toFixed(1)}L${bx.toFixed(1)},${by.toFixed(1)}`;}}
  const views={};for(const [v,b] of Object.entries(GEO0.views)){const ns=Object.keys(cells).filter(n=>{const c=GEO0.cells[n]&&GEO0.cells[n].c;return c&&c[0]>=b[0]&&c[0]<=b[0]+b[2]&&c[1]>=b[1]&&c[1]<=b[1]+b[3];});
    if(!ns.length)continue;let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;ns.forEach(n=>{const [x,y]=HEXR.pos[n];x0=Math.min(x0,x);y0=Math.min(y0,y);x1=Math.max(x1,x);y1=Math.max(y1,y);});views[v]=[x0-2*r,y0-2*r,x1-x0+4*r,y1-y0+4*r];}
  return {w:GEO0.w,h:GEO0.h,cells,views,real:true,hex:true,hbord:bord,lab:{WA:[200,250],NT:[375,148],SA:[405,305],QLD:[480,82],NSW:[772,305],ACT:[778,542],VIC:[330,575],TAS:[462,748]}};})();
let MAPLAY='geo';
// factional affiliations of sitting Labor and Coalition parliamentarians (Wikipedia faction pages, checked 16 Nov 2026). The Nationals have no formal factions, so they are grouped by state branch
const FAC={"Katy Gallagher":"LL","Jenny McAllister":"LL","Tim Ayres":"LL","Malarndirri McCarthy":"LL","Nita Green":"LL","Murray Watt":"LL","Penny Wong":"LL","Sue Lines":"LL","Carol Brown":"LL","Charlotte Walker":"LL","Karen Grogan":"LL","Jess Walsh":"LL","Lisa Darmanin":"LL","Ellie Whiteaker":"LL","Anthony Albanese":"LL","Pat Conroy":"LL","Sharon Claydon":"LL","Susan Templeman":"LL","Tanya Plibersek":"LL","Julie Collins":"LL","Mark Butler":"LL","Catherine King":"LL","Andrew Giles":"LL","Ged Kearney":"LL","Kate Thwaites":"LL","Julian Hill":"LL","Anne Aly":"LL","Patrick Gorman":"LL","Josh Wilson":"LL","Anne Stanley":"LL","Ash Ambihaipahar":"LL","Carol Berry":"LL","Fiona Phillips":"LL","Jerome Laxale":"LL","Zhi Soon":"LL","Marion Scrymgour":"LL","Ali France":"LL","Julie-Ann Campbell":"LL","Kara Cook":"LL","Madonna Jarrett":"LL","Matt Smith":"LL","Rowan Holzberger":"LL","Renee Coffey":"LL","Jess Teesdale":"LL","Anne Urquhart":"LL","Rebecca White":"LL","Tony Zappia":"LL","Louise Miller-Frost":"LL","Basem Abdo":"LL","Carina Garland":"LL","Jo Briskey":"LL","Joanne Ryan":"LR","Jodie Belyea":"LL","Libby Coker":"LL","Lisa Chesters":"LL","Mary Doyle":"LL","Sarah Witty":"LL","Gabriel Ng":"LL","Tom French":"LL","Zaneta Mascarenhas":"LL","Trish Cook":"LL","Richard Marles":"LR","Jim Chalmers":"LR","Tony Burke":"LR","Chris Bowen":"LR","Amanda Rishworth":"LR","Jason Clare":"LR","Michelle Rowland":"LR","Madeleine King":"LR","Ed Husic":"LR","Clare O'Neil":"LR","Matt Keogh":"LR","Anika Wells":"LR","Kristy McBain":"LR","Justine Elliot":"LR","Matt Thistlethwaite":"LR","Emma McBride":"LR","Tim Watts":"LR","Mark Dreyfus":"LR","Steve Georganas":"LR","Shayne Neumann":"LR","Alison Byrnes":"LR","Rob Mitchell":"LR","Peter Khalil":"LR","Milton Dick":"LR","Matt Burnell":"LR","Meryl Swanson":"LR","Luke Gosling":"LR","David Smith":"LR","Daniel Mulino":"LR","Josh Burns":"LR","Mike Freelander":"LR","Cassandra Fernando":"LR","Sam Rae":"LR","Andrew Charlton":"LR","Sally Sitou":"LR","Dan Repacholi":"LR","Tania Lawrence":"LR","Sam Lim":"LR","Gordon Reid":"LR","David Moncrieff":"LR","Emma Comer":"LR","Claire Clutterham":"LR","Matt Gregg":"LR","Alice Jordan-Baird":"LR","Don Farrell":"LR","Anthony Chisholm":"LR","Glenn Sterle":"LR","Deborah O'Neill":"LR","Helen Polley":"LR","Marielle Smith":"LR","Tony Sheldon":"LR","Jana Stewart":"LR","Varun Ghosh":"LR","Raff Ciccone":"LR","Richard Dowling":"LR","Corinne Mulholland":"LR","Michelle Ananda-Rajah":"LR","Andrew Leigh":"LU","Ted O'Brien":"LM","Angie Bell":"LM","Tim Wilson":"LM","Mary Aldred":"LM","Melissa Price":"LM","Julian Leeser":"LM","Maria Kovacic":"LM","Anne Ruston":"LM","Jane Hume":"LM","Richard Colbeck":"LM","Andrew Bragg":"LM","Paul Scarr":"LM","James McGrath":"LM","Dave Sharma":"LM","Kerrynne Liddle":"LM","Angus Taylor":"NR","Andrew Hastie":"NR","Garth Hamilton":"NR","Phillip Thompson":"NR","Tony Pasin":"NR","Rick Wilson":"NR","Henry Pike":"NR","Ben Small":"NR","Dan Tehan":"NR","Aaron Violi":"NR","Simon Kennedy":"NR","Tom Venning":"NR","Terry Young":"NR","Cameron Caldwell":"NR","Michaelia Cash":"NR","Alex Antic":"NR","James Paterson":"NR","Slade Brockman":"NR","Matt O'Sullivan":"NR","Jonathon Duniam":"NR","Claire Chandler":"NR","Jacinta Nampijinpa Price":"NR","Leah Blyth":"NR","Jessica Collins":"NR","Sarah Henderson":"NR","Alex Hawke":"CR","Melissa McIntosh":"CR","Scott Buchholz":"CR","Andrew McLachlan":"CR","Pat Conaghan":"N_NSW","Kevin Hogan":"N_NSW","Alison Penfold":"N_NSW","Michael McCormack":"N_NSW","Jamie Chaffey":"N_NSW","Sam Birrell":"N_VIC","Darren Chester":"N_VIC","Anne Webster":"N_VIC","Llew O'Brien":"N_QLD","David Batt":"N_QLD","Colin Boyce":"N_QLD","Michelle Landry":"N_QLD","Andrew Willcox":"N_QLD","David Littleproud":"N_QLD","Ross Cadell":"N_NSW","Bridget McKenzie":"N_VIC","Matt Canavan":"N_QLD","Susan McDonald":"N_QLD","Luke John Gosling":"LR","Anne Maree Stanley":"LL","Jacinta Price":"NR","Tracey Roberts":"LR","Alicia Payne":"LU","Josh Dolega":"LL","Dorinda Cox":"LL","Jason Wood":"LBU","Zoe McKenzie":"LBU","Leon Rebello":"LBU","Andrew Wallace":"LBU","Dean Smith":"LBU","Chris Gatenby":"LM","Josh Frydenberg":"LM"};
const FACORD={"LL":["Anthony Albanese","Penny Wong","Tanya Plibersek","Mark Butler","Katy Gallagher","Murray Watt","Catherine King","Julie Collins","Pat Conroy","Andrew Giles","Ged Kearney","Malarndirri McCarthy","Jenny McAllister","Tim Ayres","Sharon Claydon","Patrick Gorman","Nita Green","Sue Lines","Carol Brown","Charlotte Walker","Karen Grogan","Jess Walsh","Lisa Darmanin","Ellie Whiteaker","Susan Templeman","Kate Thwaites","Julian Hill","Anne Aly","Josh Wilson","Anne Stanley","Ash Ambihaipahar","Carol Berry","Fiona Phillips","Jerome Laxale","Zhi Soon","Marion Scrymgour","Ali France","Julie-Ann Campbell","Kara Cook","Madonna Jarrett","Matt Smith","Rowan Holzberger","Renee Coffey","Jess Teesdale","Anne Urquhart","Rebecca White","Tony Zappia","Louise Miller-Frost","Basem Abdo","Carina Garland","Jo Briskey","Jodie Belyea","Libby Coker","Lisa Chesters","Mary Doyle","Sarah Witty","Gabriel Ng","Tom French","Zaneta Mascarenhas","Trish Cook","Josh Dolega","Dorinda Cox"],"LR":["Richard Marles","Jim Chalmers","Tony Burke","Chris Bowen","Don Farrell","Jason Clare","Amanda Rishworth","Michelle Rowland","Madeleine King","Ed Husic","Clare O'Neil","Mark Dreyfus","Matt Keogh","Anika Wells","Kristy McBain","Justine Elliot","Matt Thistlethwaite","Emma McBride","Tim Watts","Steve Georganas","Shayne Neumann","Alison Byrnes","Rob Mitchell","Peter Khalil","Milton Dick","Matt Burnell","Meryl Swanson","Luke Gosling","David Smith","Daniel Mulino","Josh Burns","Mike Freelander","Cassandra Fernando","Sam Rae","Andrew Charlton","Sally Sitou","Dan Repacholi","Tania Lawrence","Sam Lim","Gordon Reid","David Moncrieff","Emma Comer","Claire Clutterham","Matt Gregg","Alice Jordan-Baird","Anthony Chisholm","Glenn Sterle","Deborah O'Neill","Helen Polley","Marielle Smith","Tony Sheldon","Jana Stewart","Varun Ghosh","Raff Ciccone","Richard Dowling","Corinne Mulholland","Michelle Ananda-Rajah","Tracey Roberts","Joanne Ryan"],"LM":["Josh Frydenberg","Ted O'Brien","Anne Ruston","Jane Hume","Tim Wilson","Julian Leeser","Andrew Bragg","Angie Bell","Melissa Price","Richard Colbeck","Paul Scarr","James McGrath","Mary Aldred","Maria Kovacic","Dave Sharma","Kerrynne Liddle","Chris Gatenby"],"NR":["Angus Taylor","Andrew Hastie","Michaelia Cash","James Paterson","Dan Tehan","Jonathon Duniam","Tony Pasin","Sarah Henderson","Jacinta Nampijinpa Price","Alex Antic","Garth Hamilton","Phillip Thompson","Rick Wilson","Henry Pike","Ben Small","Aaron Violi","Simon Kennedy","Tom Venning","Terry Young","Cameron Caldwell","Slade Brockman","Matt O'Sullivan","Claire Chandler","Leah Blyth","Jessica Collins"],"CR":["Alex Hawke","Melissa McIntosh","Scott Buchholz","Andrew McLachlan"],"N_NSW":["Kevin Hogan","Michael McCormack","Pat Conaghan","Alison Penfold","Jamie Chaffey","Ross Cadell"],"N_VIC":["Bridget McKenzie","Darren Chester","Anne Webster","Sam Birrell"],"N_QLD":["David Littleproud","Matt Canavan","Michelle Landry","Llew O'Brien","Colin Boyce","David Batt","Andrew Willcox","Susan McDonald"],"LU":["Alicia Payne"],"LBU":["Jason Wood","Zoe McKenzie","Leon Rebello","Andrew Wallace","Dean Smith"]};
const FACN={LL:['Labor Left','#b3202a'],LR:['Labor Right','#ef7d84'],LU:['Unaligned','#c9a3a6'],LBU:['Unaligned','#a9bcd8'],LM:['Moderates','#6a9be0'],NR:['National Right','#14336a'],CR:['Centre Right','#3a72c0'],N_NSW:['NSW Nationals','#2f8a55'],N_VIC:['Victorian Nationals','#7cbf86'],N_QLD:['Queensland LNP (Nationals)','#145c3a'],NONE:['No reported faction','#a2a9b1'],NEW:['New members','#d9d3c4']};
const facOf=n=>FAC[n]||null, facTag=n=>{const k=FAC[n];return k?`<span class="factag" style="--fc:${FACN[k][1]}">${FACN[k][0]}</span>`:'';};
const SINCE={"Basem Abdo":2025,"Anthony Albanese":1996,"Mary Aldred":2025,"Anne Aly":2016,"Ash Ambihaipahar":2025,"David Batt":2025,"Angie Bell":2019,"Jodie Belyea":2024,"Carol Berry":2025,"Sam Birrell":2022,"Nicolette Boele":2025,"Chris Bowen":2004,"Colin Boyce":2022,"Jo Briskey":2025,"Scott Buchholz":2010,"Tony Burke":2004,"Matt Burnell":2022,"Josh Burns":2019,"Mark Butler":2007,"Alison Byrnes":2022,"Cameron Caldwell":2023,"Julie-Ann Campbell":2025,"Jamie Chaffey":2025,"Jim Chalmers":2013,"Kate Chaney":2022,"Andrew Charlton":2022,"Darren Chester":2008,"Lisa Chesters":2013,"Jason Clare":2007,"Sharon Claydon":2013,"Claire Clutterham":2025,"Renee Coffey":2025,"Libby Coker":2019,"Julie Collins":2007,"Emma Comer":2025,"Pat Conaghan":2019,"Pat Conroy":2013,"Kara Cook":2025,"Trish Cook":2025,"Milton Dick":2016,"Mary Doyle":2023,"Mark Dreyfus":2007,"Justine Elliot":2004,"David Farley":2026,"Cassandra Fernando":2022,"Ali France":2025,"Mike Freelander":2016,"Tom French":2025,"Carina Garland":2022,"Andrew Gee":2016,"Steve Georganas":2004,"Andrew Giles":2013,"Patrick Gorman":2018,"Luke Gosling":2016,"Matt Gregg":2025,"Helen Haines":2019,"Garth Hamilton":2020,"Andrew Hastie":2015,"Alex Hawke":2007,"Julian Hill":2016,"Kevin Hogan":2013,"Rowan Holzberger":2025,"Ed Husic":2010,"Madonna Jarrett":2025,"Alice Jordan-Baird":2025,"Barnaby Joyce":2013,"Bob Katter":1993,"Ged Kearney":2018,"Simon Kennedy":2024,"Matt Keogh":2016,"Peter Khalil":2016,"Catherine King":2001,"Madeleine King":2016,"Michelle Landry":2013,"Tania Lawrence":2022,"Jerome Laxale":2022,"Dai Le":2022,"Julian Leeser":2016,"Andrew Leigh":2010,"Sussan Ley":2001,"Sam Lim":2022,"David Littleproud":2016,"Richard Marles":2007,"Zaneta Mascarenhas":2022,"Kristy McBain":2020,"Emma McBride":2016,"Michael McCormack":2010,"Melissa McIntosh":2019,"Zoe McKenzie":2022,"Louise Miller-Frost":2022,"Rob Mitchell":2010,"David Moncrieff":2025,"Daniel Mulino":2019,"Shayne Neumann":2007,"Gabriel Ng":2025,"Llew O'Brien":2016,"Ted O'Brien":2016,"Clare O'Neil":2013,"Tony Pasin":2013,"Alicia Payne":2019,"Alison Penfold":2025,"Fiona Phillips":2019,"Henry Pike":2022,"Tanya Plibersek":1998,"Melissa Price":2013,"Sam Rae":2022,"Leon Rebello":2025,"Gordon Reid":2022,"Dan Repacholi":2022,"Amanda Rishworth":2007,"Tracey Roberts":2022,"Michelle Rowland":2010,"Joanne Ryan":2013,"Monique Ryan":2022,"Sophie Scamps":2022,"Marion Scrymgour":2022,"Rebekha Sharkie":2016,"Sally Sitou":2022,"Ben Small":2025,"David Smith":2019,"Matt Smith":2025,"Zhi Soon":2025,"Allegra Spender":2022,"Anne Stanley":2016,"Zali Steggall":2019,"Meryl Swanson":2016,"Angus Taylor":2013,"Jess Teesdale":2025,"Dan Tehan":2010,"Susan Templeman":2016,"Matt Thistlethwaite":2013,"Phillip Thompson":2019,"Kate Thwaites":2019,"Anne Urquhart":2025,"Tom Venning":2025,"Aaron Violi":2022,"Andrew Wallace":2016,"Elizabeth Watson-Brown":2022,"Tim Watts":2013,"Anne Webster":2019,"Anika Wells":2019,"Rebecca White":2025,"Andrew Willcox":2022,"Andrew Wilkie":2010,"Josh Wilson":2016,"Rick Wilson":2013,"Tim Wilson":2016,"Sarah Witty":2025,"Jason Wood":2004,"Terry Young":2019,"Tony Zappia":2007,"Penny Allman-Payne":2022,"Michelle Ananda-Rajah":2025,"Alex Antic":2019,"Wendy Askew":2019,"Tim Ayres":2019,"Ralph Babet":2022,"Sean Bell":2025,"Vanessa Bleyer":2026,"Leah Blyth":2025,"Andrew Bragg":2019,"Slade Brockman":2017,"Carol Brown":2005,"Ross Cadell":2022,"Matt Canavan":2014,"Michaelia Cash":2008,"Claire Chandler":2019,"Anthony Chisholm":2016,"Raff Ciccone":2019,"Richard Colbeck":2002,"Jessica Collins":2025,"Dorinda Cox":2021,"Lisa Darmanin":2024,"Josh Dolega":2025,"Richard Dowling":2025,"Jonathon Duniam":2016,"Don Farrell":2008,"Mehreen Faruqi":2018,"Katy Gallagher":2015,"Chris Gatenby":2026,"Varun Ghosh":2024,"Nita Green":2019,"Karen Grogan":2021,"Pauline Hanson":2016,"Sarah Hanson-Young":2008,"Sarah Henderson":2019,"Steph Hodgins-May":2024,"Jane Hume":2016,"Maria Kovacic":2023,"Jacqui Lambie":2014,"Kerrynne Liddle":2022,"Sue Lines":2013,"Jenny McAllister":2015,"Malarndirri McCarthy":2016,"Susan McDonald":2019,"James McGrath":2014,"Bridget McKenzie":2011,"Nick McKim":2015,"Andrew McLachlan":2020,"Corinne Mulholland":2025,"Deborah O'Neill":2013,"Matt O'Sullivan":2019,"James Paterson":2016,"Fatima Payman":2022,"Barbara Pocock":2022,"David Pocock":2022,"Helen Polley":2005,"Jacinta Nampijinpa Price":2022,"Malcolm Roberts":2016,"Anne Ruston":2012,"Paul Scarr":2019,"Dave Sharma":2023,"Tony Sheldon":2019,"David Shoebridge":2022,"Dean Smith":2012,"Marielle Smith":2019,"Warwick Stacey":2025,"Jordon Steele-John":2017,"Glenn Sterle":2005,"Jana Stewart":2022,"Lidia Thorpe":2020,"Tammy Tyrrell":2022,"Charlotte Walker":2025,"Jess Walsh":2019,"Larissa Waters":2011,"Murray Watt":2016,"Peter Whish-Wilson":2012,"Ellie Whiteaker":2025,"Tyron Whitten":2025,"Penny Wong":2002,"Jacinta Price":2022,"Luke John Gosling":2016,"Anne Maree Stanley":2016,"Matthew Canavan":2014,"Josh Frydenberg":2010};
const NOWY=2026, heldTxt=n=>{const y=SINCE[n];if(!y)return '';const k=NOWY-y;return `since ${y}${k>0?` · ${k} year${k>1?'s':''}`:''}`;};
const PHOTO = window.SIM.PHOTOS;
Object.entries(window.SIM.PHALIAS).forEach(([a,b])=>{if(PHOTO[b]&&!PHOTO[a])PHOTO[a]=PHOTO[b];});
// leader photos that change with the result (name|good, name|bad): switched off while the official portraits are used; set to true to bring them back
const MOODPICS=false;
// photo credits (official AUSPIC portraits): shown as a small label when hovering over any credited photo
const PHCREDIT = window.SIM.PHCREDIT;
Object.entries(window.SIM.PHALIAS).forEach(([a,b])=>{if(PHCREDIT[b]&&!PHCREDIT[a])PHCREDIT[a]=PHCREDIT[b];});
const PHSRC=new Map();Object.entries(PHCREDIT).forEach(([n,c])=>{if(PHOTO[n])PHSRC.set(PHOTO[n],c);});
(()=>{let lab=null,cur=null;const hide=()=>{if(lab)lab.hidden=true;cur=null;};
  document.addEventListener('mouseover',e=>{const t=e.target;if(!t||t.tagName!=='IMG'||t.closest('.tcard'))return;const c=PHSRC.get(t.getAttribute('src'));if(!c)return;
    if(!lab){lab=document.createElement('div');lab.className='phcred';lab.setAttribute('role','note');document.body.appendChild(lab);}
    cur=t;lab.textContent=(/ logo /.test(c)?'':'Photo: ')+c;lab.hidden=false;
    const r=t.getBoundingClientRect(),w=Math.min(300,innerWidth-16);lab.style.maxWidth=w+'px';
    const x=Math.max(8,Math.min(r.left,innerWidth-w-8));lab.style.left=x+'px';const h=lab.offsetHeight;lab.style.top=(r.height>h+20?r.bottom-h-3:Math.min(innerHeight-h-4,r.bottom+4))+'px';},true);
  document.addEventListener('mouseout',e=>{if(e.target===cur)hide();},true);addEventListener('scroll',hide,{passive:true,capture:true});})();
// generic placeholder portraits for leaders without a supplied photo
const PH_M='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%2242%2060%20216%20288%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22d%22%20width%3D%227%22%20height%3D%227%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%223.5%22%20cy%3D%223.5%22%20r%3D%221.1%22%20fill%3D%22%23cfc3a6%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22h%22%20width%3D%224.5%22%20height%3D%224.5%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%2845%29%22%3E%3Crect%20width%3D%224.5%22%20height%3D%224.5%22%20fill%3D%22%23e2d8c2%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224.5%22%20stroke%3D%22%238a7d66%22%20stroke-width%3D%22.8%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22b%22%20width%3D%224%22%20height%3D%224%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%28-35%29%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%238f8470%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224%22%20stroke%3D%22%232b2620%22%20stroke-width%3D%221.3%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22k%22%20width%3D%224%22%20height%3D%224%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%28-45%29%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%233a342b%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%222%22/%3E%3C/pattern%3E%3CradialGradient%20id%3D%22v%22%20cx%3D%22.5%22%20cy%3D%22.42%22%20r%3D%22.7%22%3E%3Cstop%20offset%3D%22.55%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235a4a2a%22%20stop-opacity%3D%22.22%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22%23efe8d8%22/%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22url%28%23d%29%22/%3E%3Cpath%20d%3D%22M38%20400c6-78%2046-118%20112-118s106%2040%20112%20118z%22%20fill%3D%22url%28%23b%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M126%20282l24%2036%2024-36z%22%20fill%3D%22%23efe8d8%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M145%20300h10l7%2066-12%2015-12-15z%22%20fill%3D%22url%28%23k%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Crect%20x%3D%22128%22%20y%3D%22236%22%20width%3D%2244%22%20height%3D%2252%22%20rx%3D%2214%22%20fill%3D%22url%28%23h%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cellipse%20cx%3D%22150%22%20cy%3D%22178%22%20rx%3D%2256%22%20ry%3D%2268%22%20fill%3D%22url%28%23h%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M94%20172c-2-50%2022-82%2058-82s58%2030%2056%2080c-8-26-22-40-56-44-36%204-50%2020-58%2046z%22%20fill%3D%22url%28%23k%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22url%28%23v%29%22/%3E%3Crect%20x%3D%2248%22%20y%3D%2266%22%20width%3D%22204%22%20height%3D%22276%22%20fill%3D%22none%22%20stroke%3D%22%232b2620%22%20stroke-width%3D%221%22%20opacity%3D%22.55%22/%3E%3C/svg%3E', PH_F='data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%2242%2060%20216%20288%22%3E%3Cdefs%3E%3Cpattern%20id%3D%22d%22%20width%3D%227%22%20height%3D%227%22%20patternUnits%3D%22userSpaceOnUse%22%3E%3Ccircle%20cx%3D%223.5%22%20cy%3D%223.5%22%20r%3D%221.1%22%20fill%3D%22%23cfc3a6%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22h%22%20width%3D%224.5%22%20height%3D%224.5%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%2845%29%22%3E%3Crect%20width%3D%224.5%22%20height%3D%224.5%22%20fill%3D%22%23e2d8c2%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224.5%22%20stroke%3D%22%238a7d66%22%20stroke-width%3D%22.8%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22b%22%20width%3D%224%22%20height%3D%224%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%28-35%29%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%238f8470%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224%22%20stroke%3D%22%232b2620%22%20stroke-width%3D%221.3%22/%3E%3C/pattern%3E%3Cpattern%20id%3D%22k%22%20width%3D%224%22%20height%3D%224%22%20patternUnits%3D%22userSpaceOnUse%22%20patternTransform%3D%22rotate%28-45%29%22%3E%3Crect%20width%3D%224%22%20height%3D%224%22%20fill%3D%22%233a342b%22/%3E%3Cline%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%224%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%222%22/%3E%3C/pattern%3E%3CradialGradient%20id%3D%22v%22%20cx%3D%22.5%22%20cy%3D%22.42%22%20r%3D%22.7%22%3E%3Cstop%20offset%3D%22.55%22%20stop-color%3D%22%23000%22%20stop-opacity%3D%220%22/%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235a4a2a%22%20stop-opacity%3D%22.22%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22%23efe8d8%22/%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22url%28%23d%29%22/%3E%3Cpath%20d%3D%22M98%20140c-26%2060-22%20140-8%20180h120c14-40%2018-120-8-180z%22%20fill%3D%22url%28%23k%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M42%20400c6-74%2044-112%20108-112s102%2038%20108%20112z%22%20fill%3D%22url%28%23b%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M120%20290l30%2042%2030-42z%22%20fill%3D%22url%28%23h%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Crect%20x%3D%22130%22%20y%3D%22238%22%20width%3D%2240%22%20height%3D%2252%22%20rx%3D%2214%22%20fill%3D%22url%28%23h%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cellipse%20cx%3D%22150%22%20cy%3D%22180%22%20rx%3D%2252%22%20ry%3D%2264%22%20fill%3D%22url%28%23h%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Cpath%20d%3D%22M96%20196c-10-66%2014-106%2056-106s66%2036%2054%20104c-6-30-18-52-46-62-14%2018-38%2030-64%2034z%22%20fill%3D%22url%28%23k%29%22%20stroke%3D%22%231a1712%22%20stroke-width%3D%221.6%22%20stroke-linejoin%3D%22round%22/%3E%3Crect%20x%3D%2242%22%20y%3D%2260%22%20width%3D%22216%22%20height%3D%22288%22%20fill%3D%22url%28%23v%29%22/%3E%3Crect%20x%3D%2248%22%20y%3D%2266%22%20width%3D%22204%22%20height%3D%22276%22%20fill%3D%22none%22%20stroke%3D%22%232b2620%22%20stroke-width%3D%221%22%20opacity%3D%22.55%22/%3E%3C/svg%3E';
const FEM=new Set(['Tanya Plibersek','Pauline Hanson','Larissa Waters','Sarah Hanson-Young','Mehreen Faruqi','Sussan Ley',"Clare O'Neil",'Bridget McKenzie','Zali Steggall','Allegra Spender','Maryka Groenewald','Leonie Green','Jacqui Lambie','Julie Bishop','Gladys Berejiklian','Kristina Keneally','Annastacia Palaszczuk','Cathy McGowan','Kerryn Phelps','Anika Wells','Madeleine King','Penny Allman-Payne','Elizabeth Watson-Brown','Kate Chaney','Helen Haines','Monique Ryan','Sophie Scamps']);
const FFN=new Set('Ali Alice Alicia Alison Allegra Amanda Angie Anika Anne Bridget Carina Carol Cassandra Catherine Claire Clare Dai Elizabeth Emma Fiona Helen Jacqui Jess Jo Joanne Jodie Julie Julie-Ann Justine Kara Kate Kristy Larissa Leonie Libby Lisa Louise Madeleine Madonna Marion Mary Maryka Mehreen Melissa Meryl Michelle Monique Nicolette Pauline Rebecca Rebekha Renee Sally Sarah Sharon Sophie Susan Sussan Tania Tanya Tracey Trish Zali Zaneta Zoe'.split(' '));
const isFem=n=>FEM.has(n)||FFN.has((n||'').split(' ')[0]);
const phOf=n=>PHOTO[n]||(n&&n!=='—'&&!/^(No |Collective|N\/A)/.test(n)?(isFem(n)?PH_F:PH_M):null);   // supplied by the site owner: leader photos by name, party images by abbreviation
const CF = DATA.census.f.map(f=>f.replace(/ \(.*$/,'').replace(' - ESTIMATE',''));
const DP = {'None':[], 'Graduates swing to the Greens and Labor':[{f:7,party:2,amt:1.2},{f:7,party:0,amt:0.8}], 'Mortgage-belt revolt':[{f:2,party:3,amt:2},{f:2,party:0,amt:-1.5}],
  'Older voters return to the Coalition':[{f:10,party:1,amt:1.5},{f:10,party:3,amt:-1}], 'Multicultural seats swing away from Labor':[{f:13,party:0,amt:-2},{f:13,party:4,amt:1.2}],
  'Farm seats swing to One Nation':[{f:15,party:3,amt:2},{f:15,party:1,amt:-1.5}], 'Renters swing to the Greens':[{f:5,party:2,amt:1.5},{f:5,party:0,amt:-0.7}],
  'Muslim communities protest against Labor':[{f:17,party:0,amt:-2},{f:17,party:4,amt:1.5}], 'Tradies swing to One Nation':[{f:23,party:3,amt:1.8},{f:23,party:0,amt:-1}],
  'Mining seats back One Nation':[{f:26,party:3,amt:2},{f:26,party:0,amt:-1}], 'Chinese-Australian voters return to the Liberals':[{f:20,party:1,amt:1.5},{f:20,party:0,amt:-1}],
  'Apartment renters go Green':[{f:30,party:2,amt:1.5},{f:30,party:0,amt:-0.8}], 'Custom':null};
// minor parties that stood in only a few seats in 2025 can be set to contest more: [share of the independent vote they take, extra starting share]
const TEALS=['Goldstein','Wannon','Cowper','Monash','Flinders','Groom','Farrer','Forrest',"O'Donoghue",'Fisher','McPherson','Fairfax','Berowra','Casey','Moncrieff','Bean','Fremantle','Franklin'];
const CONT={CSA:{opts:['Current: 2 seats','Teal-style seats (20)','Every seat (150)'],seed:(lv,s)=>{if(s.inc==='IND'&&!['Wentworth','Warringah'].includes(s.n))return null;if(['Wentworth','Warringah'].includes(s.n))return null;
      if(lv>=1&&TEALS.includes(s.n))return [0.7,2.5];if(lv>=2)return [0.5,1.2+(s.rg==='Inner Metro'?1.8:s.rg==='Outer Metro'?0.6:0)];return null;}},
  XEN:{opts:['Current: Mayo only','All South Australian seats','Every seat (150)'],seed:(lv,s)=>{if(s.n==='Mayo')return null;if(s.st==='SA')return [0,3];if(lv>=2)return [0,0.8];return null;}},
  IND:{opts:['Current: where they stood in 2025','Community independents in about 40 more city seats','A community independent in every seat'],seed:(lv,s)=>{if((s.b[8]||0)>3)return null;
      if(s.rg==='Inner Metro'||s.rg==='Outer Metro')return [0,lv>=2?6:5];if(lv>=2)return [0,3.5];return null;}},
  KAP:{opts:['Current: Kennedy only','Regional Queensland seats','Every seat (150)'],seed:(lv,s)=>{if(s.n==='Kennedy')return null;if(s.st==='QLD'&&(s.rg==='Rural'||s.rg==='Provincial'))return [0,4];if(lv>=2)return [0,0.8];return null;}}};
const CNAMES=[['Community Strong','Community Strong Australia','Community Strong'],['Teal Party','The Teal Party','the Teal Party'],['Community Independents','Community Independents Australia','Community Independents'],['Australian Voices','Australian Voices Party','the Australian Voices Party'],['New Centre','New Centre Party','the New Centre Party']];
// sitting community independents who can join the party
const CINDS={'Kooyong':'Monique Ryan','Mackellar':'Sophie Scamps','Curtin':'Kate Chaney','Indi':'Helen Haines','Bradfield':'Nicolette Boele'};
function lcOvFor(S){if(!S.cind)return null;const col=DATA.colG.indexOf(P.findIndex(g=>g.ab==='CSA')),o={};Object.keys(CINDS).forEach(n=>o[n]=col);return o;}
function seedsFor(S){const out=[];
  if(S.cind){const col=DATA.colG.indexOf(P.findIndex(g=>g.ab==='CSA'));out.push({c:col,f:D.seats.map(s=>CINDS[s.n]?1:0),a:D.seats.map(()=>0)});}Object.entries(CONT).forEach(([ab,c])=>{let lv=(S.cont||{})[ab]||0;if(ab==='CSA'&&S.ldr['Community Strong']==='Malcolm Turnbull')lv=Math.max(lv,1);if(!lv)return;
  const col=DATA.colG.indexOf(P.findIndex(g=>g.ab===ab));if(col<0)return;const f=[],a=[];D.seats.forEach((s,i)=>{const r=c.seed(lv,s);f.push(r?r[0]:0);a.push(r?r[1]:0);});out.push({c:col,f,a});});return out;}
const BASE = {spec:{}, pErr:{on:1,grn:1,ind:1}, retire:{Capricornia:1,'New England':1}, cand:{Capricornia:{g:1,q:'star',n:'Matt Canavan',top:1},Grayndler:{g:4,q:'',n:'Hannah Ferguson',top:1}}, form:{pm:-1,arr:'minority',part:-1}, regf:1, cont:{CSA:0,XEN:0,KAP:0}, cname:0, cind:0, called:{}, senD:{}, dd:0, d:new Array(NG).fill(0), coaON:D.coaON, trials:2000, ev:Object.fromEntries(EV.map(e=>[e.name,e.opts[0]])), mrpW:+DATA.mix.toFixed(2), split:0, err:1, big:0.1,
  demo:[{f:7,party:2,amt:0},{f:2,party:3,amt:0}], dpre:'None', dfac:DATA.dfac.map(()=>0), preset:'Current polls (baseline)', seatAdj:(()=>{const i=DATA.seats.findIndex(x=>x.n==='Capricornia');return i>=0?[{i,g:1,amt:8}]:[];})()  /* Matt Canavan's personal vote, on top of his star-candidate +3: tuned so he is a slight favourite (about 57%) in Capricornia */,
  pf:{onCoa:+(D.MC[3][1]/(D.MC[3][0]+D.MC[3][1])).toFixed(2), grnAlp:+(D.MC[2][0]/(D.MC[2][0]+D.MC[2][1]+D.MC[2][3])).toFixed(2), lg:0, minorOn:1}, ldr:Object.fromEntries(LP.map(p=>[p,(DATA.leaders.find(l=>l.party===p&&l.sel)||DATA.leaders.find(l=>l.party===p)).name]))};
let S = JSON.parse(JSON.stringify(BASE)), R = null, sel = null, sortKey = 'pf', sortDir = 1;
const $ = id => document.getElementById(id);
// Australian style: press abbreviations for states, AEC demographic classes, en-AU numbers
const STN={NSW:'NSW',VIC:'Vic',QLD:'Qld',WA:'WA',SA:'SA',TAS:'Tas',ACT:'ACT',NT:'NT'}, stN=s=>STN[s]||s;
const RGN={'Inner Metro':'Inner metropolitan','Outer Metro':'Outer metropolitan','Provincial':'Provincial','Rural':'Rural'}, rgN=r=>RGN[r]||r;
const nf=v=>(+v).toLocaleString('en-AU');
DATA.leaders.forEach(l=>{if(l.seat)l.seat=l.seat.replace(/\((NSW|VIC|QLD|WA|SA|TAS|ACT|NT)\)/,(m,s)=>'('+stN(s)+')');});
const bandOf=m=>m<6?'Marginal':m<10?'Fairly safe':'Safe';
// ---- controls
{const mj=document.createElement('div');mj.className='stack';const mn=document.createElement('details');mn.className='sub';mn.innerHTML=`<summary>Minor parties (${MINOR.filter(j=>DATA.prim25[j]>0).length}) <em class="chg" data-g="minor"></em></summary><div class="stack"></div>`;
 $('sliders').append(mj,mn);
 [0,1,NATI,2,3,4,...MINOR.filter(j=>DATA.prim25[j]>0)].forEach(i=>{const big=i<5||i===NATI, v25=DATA.prim25[i]*100, lo=big?-20:-Math.max(0.1,Math.round(v25*2)/2), hi=big?20:20;
  const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label for="s${i}"><span>${P[i].n}${big?'':` <span class="v25">${v25<0.01?'<0.01':v25.toFixed(v25<1?2:1)}% in 2025</span>`}</span> <output id="s${i}o"></output></label><input id="s${i}" type="range" min="${lo}" max="${hi}" step="${big?0.5:0.1}">`;
  (big?mj:mn.querySelector('.stack')).appendChild(d);
  d.querySelector('input').addEventListener('input',e=>{S.d[i]=+e.target.value;sync();schedule();});
  if(CONT[P[i].ab]){const c=CONT[P[i].ab],x=document.createElement('div');x.className='contest';
    x.innerHTML=`<label for="ct_${P[i].ab}">${P[i].ab==='IND'?'Community independents':P[i].ab} seats contested</label><select id="ct_${P[i].ab}">${c.opts.map((o,k)=>`<option value="${k}">${o}</option>`).join('')}</select>`;d.appendChild(x);
    x.querySelector('select').addEventListener('change',e=>{S.cont[P[i].ab]=+e.target.value;sync();schedule();});}});}
EV.forEach((e,i)=>{const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label for="e${i}">${e.name}</label><select id="e${i}">${e.opts.map(o=>`<option>${o}</option>`).join('')}</select>`;$({'Economy':'ev-eco','Outside shock':'ev-eco','Preference climate':'ev-pref','Polling environment':'ev-unc','Election timing':'ev-time'}[e.name]||'ev-pol').appendChild(d);
  d.querySelector('select').addEventListener('change',ev=>{S.ev[e.name]=ev.target.value;sync();schedule();});});
$('coa').addEventListener('input',e=>{S.coaON=+e.target.value;sync();schedule();});
[['pfOn','onCoa'],['pfGrn','grnAlp'],['pfLg','lg'],['pfMin','minorOn']].forEach(([id,k])=>$(id).addEventListener('input',e=>{S.pf[k]=+e.target.value;sync();schedule();}));
const GI=ab=>P.findIndex(g=>g.ab===ab);
const SEV=(s,opt)=>{const e=EV.find(x=>x.opts.includes(opt));if(e)s.ev[e.name]=opt;};
const DFS=(s,k,v)=>{const i=DATA.dfac.findIndex(f=>f.k===k);if(i>=0)s.dfac[i]=v;};
// the small extra shift (k) corrects for how efficiently each party's vote falls across today's seats, so the seat totals match the real result
const HIST=(s,t,k)=>{const gv=j=>DATA.nat.reduce((a,v,c)=>a+(DATA.colG[c]===j?v:0),0)*100;Object.entries(t).forEach(([j,v])=>{s.d[+j]=+(v-gv(+j)+((k||[])[+j]||0)).toFixed(1);});s.mrpW=0;};
const PRESETS={'Current polls (baseline)':s=>{},
  // past elections replayed on today's seats: national first preferences set to that election's result, seats swing uniformly from 2025
  'Recreate 2019: the Coalition\'s surprise win':s=>{HIST(s,{0:33.34,1:41.44,2:10.40,3:3.08,4:3.37},[-2.5,2.5,0,0,0]);s.seatAdj=[];},
  'Recreate 2022: Labor returns, the teals arrive':s=>{HIST(s,{0:32.58,1:35.70,2:12.25,3:4.96,4:5.29},[-4.5,1,2,0,2]);},
  'Recreate 2025: Labor\'s landslide':s=>{HIST(s,{0:34.56,1:31.82,2:12.20,3:6.40,4:7.27});},
  'Cost-of-living election':s=>{SEV(s,'Cost-of-living crisis deepens');SEV(s,'Housing crisis worsens');DFS(s,'mort',2);DFS(s,'bluec',1);s.d[0]-=2;s.d[3]+=1.5;},
  'Recession hits':s=>{SEV(s,'Recession');DFS(s,'mort',1.5);DFS(s,'hard',1.5);s.d[0]-=3.5;s.d[1]+=1.5;s.d[3]+=2;},
  'Labor landslide':s=>{SEV(s,'Labor wins the campaign');SEV(s,'Hits a ceiling (soft vote drifts home)');s.d[0]+=4;s.d[3]-=4;s.d[1]-=1;},
  'Hung parliament':s=>{s.d[0]-=3;s.d[1]+=1;s.d[4]+=1.5;s.d[3]+=0.5;SEV(s,'Teal / community independent wave');},
  'Tradie revolt':s=>{DFS(s,'tradie',2);DFS(s,'bluec',1.5);DFS(s,'mining',1);s.d[3]+=2.5;s.d[0]-=2.5;},
  'Multicultural backlash against Labor':s=>{DFS(s,'muslim',-2);DFS(s,'sasia',-1.5);DFS(s,'chinese',-1);DFS(s,'multi',-1);s.d[0]-=2;s.d[4]+=1.5;s.d[1]+=0.5;},
  'Bush revolt':s=>{DFS(s,'rural',1.5);DFS(s,'mining',1.5);DFS(s,'first',0.5);s.d[3]+=2;s.d[1]-=1;},
  'Liberal moderates fight back':s=>{DFS(s,'edu',-1);DFS(s,'chinese',-1);DFS(s,'rich',-1);SEV(s,'Moves to the centre');s.d[1]+=2;s.d[4]-=1.5;s.d[3]-=1;},
  'One Nation implodes':s=>{SEV(s,'Candidate scandals');SEV(s,'Strong anti-One Nation preferencing');s.d[3]-=7;s.d[1]+=4;s.d[0]+=2;},

  'Coalition recovers':s=>{s.d[1]+=4;s.d[3]-=4;DFS(s,'chinese',-1);DFS(s,'age',1);},
  "Turnbull's teal revolt":s=>{DFS(s,'edu',1.5);DFS(s,'rich',1);s.cind=1;[-6.5,-4,0,-11.5].forEach((v,j)=>s.d[j]+=v);s.d[GI('CSA')]+=12.9;s.ev['Coalition']=EV.find(e=>e.name==='Coalition').opts.find(o=>o.startsWith('Coalition splits'));s.ldr['Community Strong']='Malcolm Turnbull';},
  'One Nation surge':s=>{s.d[3]+=5;s.d[1]-=3;s.d[0]-=2;DFS(s,'tradie',1.5);DFS(s,'mining',1.5);DFS(s,'bluec',1);},
  'Labor slumps':s=>{s.d[0]-=5;s.d[2]+=2;s.d[3]+=2;s.d[1]+=1;DFS(s,'bluec',1);DFS(s,'muslim',-1.5);DFS(s,'mort',1);},
  'Greens breakthrough':s=>{SEV(s,'Greens surge');s.d[2]+=6;s.d[0]-=3.5;DFS(s,'flats',2);DFS(s,'rent',1.5);DFS(s,'edu',1);},
  'Teal wave 2.0':s=>{s.d[4]+=4;s.d[1]-=3;s.d[0]-=1;DFS(s,'edu',1);DFS(s,'rich',1);},
  'Coalition splits':s=>{s.split=1;s.d[1]-=1.5;s.d[3]+=1.5;},
  'One Nation and Coalition swap preferences':s=>{s.coaON=Math.min(0.9,s.coaON+0.1);s.pf.onCoa=Math.min(0.95,s.pf.onCoa+0.08);},
  'Polls badly wrong (wider uncertainty)':s=>{s.err=1.5;s.big=0.3;},
  'Labor leadership spill mid-2027':s=>{s.ldr['Labor']='Jim Chalmers';s.ev['Government']='Long-term government fatigue';s.d[0]-=1.5;s.d[3]+=1;},
  'Coalition reunites under Hastie':s=>{DFS(s,'tradie',1);DFS(s,'mining',1);s.ldr['Coalition']='Andrew Hastie';s.ev['Coalition']='Unites behind a strong campaign';s.d[1]+=2;s.d[3]-=3;s.pf.onCoa=Math.min(0.95,s.pf.onCoa+0.05);},
  'Greens–teal alliance':s=>{DFS(s,'flats',1);DFS(s,'edu',1);s.d[2]+=2.5;s.d[4]+=2;s.d[GI('CSA')]+=1;s.d[0]-=3;s.d[1]-=1.5;s.ev['Greens and independents']='Teal / community independent wave';s.pf.grnAlp=Math.max(0.5,s.pf.grnAlp-0.12);},
  'Minor party chaos':s=>{DFS(s,'bluec',1);DFS(s,'muslim',-1.5);[['AFP',6],['FFP',4],['HMP',4],['LTP',3],['GRPF',4],['KAP',5],['XEN',3],['AJP',1.5],['CSA',4],['SAL',1],['VNS',1.5]].forEach(([a,v])=>{const k=GI(a);if(k>=0)s.d[k]+=v;});s.d[4]+=7;s.d[0]-=9;s.d[1]-=8;s.d[3]-=7;s.d[2]-=2;s.cont={CSA:1,XEN:1,KAP:1};
    // minor parties break through where they are already strongest: their best few seats get a local surge
    [['AFP',4,22],['FFP',3,22],['HMP',3,14],['LTP',2,20],['GRPF',3,22],['AJP',1,18],['SAL',1,16],['VNS',1,20]].forEach(([ab,n,amt])=>{const g=GI(ab);if(g<0)return;
      D.seats.map((x,i)=>[x.p.reduce((t,v,j)=>t+(DATA.colG[j]===g?v:0),0),i]).sort((a,b)=>b[0]-a[0]).slice(0,n).forEach(([v,i])=>{if(v>0)s.seatAdj.push({i,g,amt});});});s.cont={...s.cont,CSA:1,XEN:1,KAP:1};s.ev['Greens and independents']='Minor-party fragmentation';s.ev['Preference climate']='Preferences scatter (less predictable)';},
  'Comeback election: every former leader runs':s=>{const keep=S;S=s;SPEC.forEach(x=>specSet(x,true));S=keep;},
  'Early double dissolution':s=>{s.dd=1;s.ev['Election timing']='Early election (October 2027)';s.ev['Government']='Broken election promise';s.d[0]-=1;}};
$('preset').innerHTML=['Current polls (baseline)'].concat(Object.keys(PRESETS).filter(k=>k!=='Current polls (baseline)').sort((a,b)=>a.replace(/^[^A-Za-z]+/,'').localeCompare(b.replace(/^[^A-Za-z]+/,''),'en'))).map(k=>`<option>${k}</option>`).join('');
$('preset').addEventListener('change',e=>{const k=e.target.value;S=JSON.parse(JSON.stringify(BASE));PRESETS[k](S);S.preset=k;sync();schedule();});
// scenario codes: only what differs from the baseline, as base64 JSON
const enc=()=>{const o={};Object.keys(S).forEach(k=>{if(JSON.stringify(S[k])!==JSON.stringify(BASE[k]))o[k]=S[k];});return btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');};
const dec=c=>{const o=JSON.parse(decodeURIComponent(escape(atob(c.trim().replace(/^.*#s=/,'').replace(/-/g,'+').replace(/_/g,'/')))));const s=JSON.parse(JSON.stringify(BASE));Object.keys(o).forEach(k=>{if(k in s)s[k]=o[k];});if(s.d.length===NG-1)s.d.splice(NATI,0,0);if(s.d.length!==NG)s.d=BASE.d.slice();EV.forEach(e=>{if(!e.opts.includes(s.ev[e.name]))s.ev[e.name]=e.opts[0];});if(!s.dfac||s.dfac.length!==DATA.dfac.length)s.dfac=BASE.dfac.slice();if(!s.senD)s.senD={};if(!s.called)s.called={};return s;};
$('copy').addEventListener('click',()=>{const c=enc();$('code').value=c;let link='';try{link=location.href.split('#')[0]+'#s='+c;history.replaceState(null,'','#s='+c);}catch(e){}
  const done=m=>{$('shareMsg').textContent=m;};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(c).then(()=>done('Code copied. Paste it into Load on any copy of this page.'),()=>{$('code').select();done('Select and copy the code above.');});else{$('code').select();done('Select and copy the code above.');}});
$('load').addEventListener('click',()=>{try{S=dec($('code').value);sync();go();$('shareMsg').textContent='Scenario loaded.';}catch(e){$('shareMsg').textContent='That code could not be read.';}});
try{if(location.hash.startsWith('#s=')){S=dec(location.hash.slice(3));}}catch(e){}
const ldrChg=l=>{if(l.sel)return '(current)';const N=['Labor','Coalition','Greens','One Nation','others'],own=l.party==='Nationals'?1:Math.max(0,N.indexOf(l.party));
  if(l.dg){const e=Object.entries(l.dg).map(([ab,v])=>`${P[GI(ab)].n} ${v>0?'+':'−'}${Math.abs(v).toFixed(2)}`);if(l.sen)Object.entries(l.sen).forEach(([st,v])=>e.push(`${stN(st)} Senate ${Math.round(v*100)}%`));l.d.forEach((v,k)=>{if(Math.abs(v)>=0.05)e.push(`${N[k]} ${v>0?'+':'−'}${Math.abs(v).toFixed(1)}`);});return '('+e.join(', ')+')';}
  const ch=l.d.map((v,k)=>[v,k]).filter(x=>Math.abs(x[0])>=0.05).sort((a,b)=>(b[1]===own)-(a[1]===own)||Math.abs(b[0])-Math.abs(a[0])).slice(0,2);
  return ch.length?'('+ch.map(([v,k])=>`${N[k]} ${v>0?'+':'−'}${Math.abs(v).toFixed(1)}`).join(', ')+')':'(no change)';};
{const d=document.createElement('div');d.className='ctl';d.innerHTML=`<label for="cname">Community Strong: party name</label><select id="cname">${CNAMES.map((n,k)=>`<option value="${k}">${n[1]}${k?'':' (current)'}</option>`).join('')}</select>`;
  const d2=document.createElement('div');d2.className='ctl';d2.innerHTML=`<label for="cind">Community independents</label><select id="cind"><option value="0">Stay independent (current)</option><option value="1">Join Community Strong: Ryan, Scamps, Chaney, Haines, Boele</option></select>`;
  setTimeout(()=>{const box=document.createElement('details');box.className='sub csaopts';box.innerHTML='<summary>Party name and community independents</summary>';box.appendChild(d);box.appendChild(d2);
    const li=LP.indexOf('Community Strong'),anchor=$('l'+li)&&$('l'+li).closest('.ctl');if(anchor){const dd=anchor.querySelector('details.ldd');if(dd)dd.appendChild(box);else anchor.after(box);}else $('leaders').appendChild(box);sync();});d.querySelector('select').addEventListener('change',e=>{S.cname=+e.target.value;sync();schedule();});
  d2.querySelector('select').addEventListener('change',e=>{S.cind=+e.target.value;if(!S.cind&&CINDL.includes(S.ldr['Community Strong']))S.ldr['Community Strong']='No formal leader';sync();schedule();});}
// Scamps, Ryan, Chaney and Haines can only lead Community Strong once they have joined it
const CINDL=['Monique Ryan'];
function csaLdrOpts(){const sel=$('l'+LP.indexOf('Community Strong'));if(!sel)return;[...sel.options].forEach(o=>{const hide=CINDL.includes(o.value)&&!S.cind;o.hidden=hide;o.disabled=hide;});}
Object.entries(FAC_NEW).forEach(([n,k])=>{if(!FAC[n])FAC[n]=k;});
const LDCOL={'Labor':'var(--alp)','Coalition':'var(--coa)','Greens':'var(--grn)','One Nation':'var(--on)','Nationals':'var(--nat,#2f8a55)','Community Strong':'var(--csa,#16a39a)',"Katter's Australian":'var(--kap)'};
const ldOut=l=>/\(candidate\)|state seat/.test(l.seat||'')||(NEWL[l.name]&&NEWL[l.name].p===l.party&&NEWL[l.name].t!=='j')||l.name==='Malcolm Turnbull';
const ldEsc=t=>String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const ldSur=(n,all)=>{if(/^No /.test(n))return 'No leader';const w=n.split(' '),i=w.findIndex((x,k)=>k>0&&/^(à|de|van|von)$/.test(x)),sn=i>0?w.slice(i-1).join(' '):w[w.length-1];
  return all.filter(m=>m!==n&&ldSur0(m)===sn).length?`${w[0][0]}. ${sn}`:sn;};
const ldSur0=n=>{const w=n.split(' '),i=w.findIndex((x,k)=>k>0&&/^(à|de|van|von)$/.test(x));return i>0?w.slice(i-1).join(' '):w[w.length-1];};
// ---- trait cards
const TRT=window.TRAITS||{L:{},A:{},M:{},ML:{}};
const trFx=(t,p)=>{const out=[],pn=p==='Coalition'?'the Coalition':p==='Nationals'?'the Nationals':p==='Greens'?'the Greens':p,f=v=>(v>0?'+':'−')+Math.abs(v).toFixed(1);
  if(t[3])out.push(`<span class="${t[3]>0?'up':'dn'}">${f(p==='Nationals'?t[3]*0.35:t[3])}</span> ${pn} nationally`);
  t[4].forEach(([m,v])=>out.push(`<span class="${v>0?'up':'dn'}">${f(v)}</span> in ${TRT.ML[m]||m}`));
  return out.length?out.join('<br>'):'<span class="nil">No effect on the vote</span>';};
const TIER={2:['▲▲','t2'],1:['▲','t1'],0:['●','t0'],'-1':['▼','tm1'],'-2':['▼▼','tm2']};
let ldPinned=false,ldPopTimer=null;
function ldPop(b,pin){clearTimeout(ldPopTimer);let el=$('ldpop');if(!el){el=document.createElement('div');el.id='ldpop';el.className='ldpop';el.setAttribute('role','dialog');el.setAttribute('aria-live','polite');document.body.appendChild(el);
    el.addEventListener('mouseenter',()=>clearTimeout(ldPopTimer));el.addEventListener('mouseleave',()=>ldPopHide(false));}
  if(pin)ldPinned=true;else if(ldPinned&&el.dataset.n!==b.dataset.n&&!el.hidden)return;
  const n=b.dataset.n,p=b.dataset.p,l=DATA.leaders.find(x=>x.name===n&&x.party===p)||{},fk=FAC[n],ids=(TRT.A[n+'|'+p]||TRT.A[n]||[]).slice().sort((x,y)=>(TRT.L[y]?TRT.L[y][1]:0)-(TRT.L[x]?TRT.L[x][1]:0)),pic=/^No /.test(n)?null:phOf(n);
  const cur=DATA.leaders.find(x=>x.party===p&&x.sel);
  el.dataset.n=n;
  el.innerHTML=`<button type="button" class="lpx" aria-label="Close">×</button><div class="lph">${pic?`<img src="${pic}" alt="">`:'<i></i>'}<div><b>${ldEsc(n)}</b><small>${ldEsc(p)}${fk&&FACN[fk]?` · <span style="color:${FACN[fk][1]}">${FACN[fk][0]}</span>`:''}</small><small>${ldOut(l)?'Extra-Parliamentary':'Parliamentary'}${l.sel?' · current leader':''}</small></div></div>
    <ul class="lptr">${ids.map(id=>{const t=TRT.L[id];if(!t)return '';const ti=TIER[t[1]]||TIER[0];return `<li class="${ti[1]}"><span class="lpi" aria-hidden="true">${ti[0]}</span><div><b>${ldEsc(t[0])}</b><em>${ldEsc(t[2])}</em><span class="lpfx">${trFx(t,p)}</span></div></li>`;}).join('')}</ul>
    <p class="lpn">${l.sel?'Choosing another leader removes these traits and adds theirs.':cur?`Replaces ${ldEsc(cur.name)}'s traits.`:''} Seat effects are points per standard deviation from the average seat.</p>`;
  el.hidden=false;el.classList.toggle('pinned',ldPinned);
  el.querySelector('.lpx').onclick=()=>ldPopHide(true);
  ldAnchor=b;ldPos();}
let ldAnchor=null;
function ldPos(){const el=$('ldpop'),b=ldAnchor;if(!el||el.hidden||!b)return;
  if(matchMedia('(max-width:700px)').matches){el.style.left='';el.style.top='';el.classList.add('sheet');return;}
  el.classList.remove('sheet');const r=b.getBoundingClientRect(),w=el.offsetWidth,h=el.offsetHeight,vw=innerWidth,vh=innerHeight;
  if(r.bottom<0||r.top>vh){ldPopHide(true);return;}
  let x=r.right+10;if(x+w>vw-8)x=r.left-w-10;if(x<8)x=Math.max(8,Math.min(vw-w-8,r.left));
  let y=Math.max(8,Math.min(vh-h-8,r.top-20));el.style.left=x+'px';el.style.top=y+'px';}
function ldPopHide(force){const el=$('ldpop');if(!el)return;if(force){ldPinned=false;el.hidden=true;return;}if(ldPinned)return;clearTimeout(ldPopTimer);ldPopTimer=setTimeout(()=>{el.hidden=true;},180);}
document.addEventListener('click',e=>{const el=$('ldpop');if(el&&!el.hidden&&!e.target.closest('#ldpop')&&!e.target.closest('.ldt'))ldPopHide(true);});
document.addEventListener('keydown',e=>{if(e.key==='Escape')ldPopHide(true);});
addEventListener('scroll',ldPos,{passive:true});addEventListener('resize',ldPos);
function ldTiles(){document.querySelectorAll('.ldtiles').forEach(tw=>{const sel=$(tw.dataset.sel);if(!sel)return;
  tw.querySelectorAll('.ldt').forEach(b=>{const o=[...sel.options].find(o=>o.value===b.dataset.n),on=sel.value===b.dataset.n;b.hidden=!!(o&&o.hidden);const pp=b.dataset.p,oth=pp==='Nationals'?'One Nation':pp==='One Nation'?'Nationals':null,lock=!on&&b.dataset.n==='Barnaby Joyce'&&oth&&S.ldr[oth]==='Barnaby Joyce';b.classList.toggle('lock',!!lock);b.setAttribute('aria-disabled',lock?'true':'false');b.title=lock?'Leading '+oth+'. Pick someone else there first.':'';b.setAttribute('aria-checked',on?'true':'false');b.tabIndex=on?0:-1;});
  tw.querySelectorAll('.ldgrp').forEach(g=>{g.hidden=![...g.querySelectorAll('.ldt')].some(b=>!b.hidden);});
  const lc=$(tw.dataset.sel.replace('l','lc'));if(lc){const n=sel.value,pic=/^No /.test(n)?null:phOf(n),cur=DATA.leaders.find(l=>l.name===n&&l.party===tw.closest('.ldctl').dataset.p);
    lc.innerHTML=`${pic?`<img src="${pic}" alt="">`:''}<span>${ldEsc(n)}</span>${cur&&cur.sel?'<em>current</em>':'<em class="chg1">changed</em>'}`;}});}
LP.forEach((p,i)=>{const d=document.createElement('div');d.className='ctl ldctl';d.dataset.p=p;const ls=DATA.leaders.filter(l=>l.party===p),names=ls.map(l=>l.name);
  const tile=l=>{const fk=FAC[l.name],c=fk&&FACN[fk]?FACN[fk][1]:(LDCOL[p]||'var(--ink)'),pic=/^No /.test(l.name)?null:phOf(l.name),eff=ldrChg(l);
    return `<button type="button" class="ldt" role="radio" aria-checked="false" data-n="${ldEsc(l.name)}" data-p="${ldEsc(p)}" aria-label="${ldEsc(l.name)}${fk&&FACN[fk]?', '+FACN[fk][0]:''}"><span class="ldpic">${pic?`<img src="${pic}" alt="" loading="lazy" decoding="async">`:'<b aria-hidden="true">—</b>'}</span><i class="ldfac" style="background:${c}"></i><span class="ldn">${ldEsc(ldSur(l.name,names))}</span></button>`;};
  const grp=(t,arr)=>arr.length?`<div class="ldgrp"><div class="ldgh">${t}</div><div class="ldrow">${arr.map(tile).join('')}</div></div>`:'';
  d.innerHTML=`<details class="ldd"><summary><span class="ldparty" id="lh${i}">${p}</span><span class="ldcur" id="lc${i}"></span></summary><select id="l${i}" hidden aria-hidden="true" tabindex="-1">${ls.map(l=>`<option value="${ldEsc(l.name)}">${l.name} ${ldrChg(l)}</option>`).join('')}</select>
    <div class="ldtiles" role="radiogroup" aria-labelledby="lh${i}" data-sel="l${i}">${grp('Parliamentary',ls.filter(l=>!ldOut(l)))}${grp('Extra-Parliamentary',ls.filter(ldOut))}</div></details>`;
  $('leaders').appendChild(d);
  const sel=d.querySelector('select'),tw=d.querySelector('.ldtiles');
  tw.addEventListener('click',e=>{const b=e.target.closest('.ldt');if(!b)return;ldPop(b,true);if(b.getAttribute('aria-checked')==='true'||b.classList.contains('lock'))return;sel.value=b.dataset.n;sel.dispatchEvent(new Event('change'));});
  tw.addEventListener('mouseover',e=>{const b=e.target.closest('.ldt');if(b&&matchMedia('(hover:hover)').matches)ldPop(b,false);});
  tw.addEventListener('mouseleave',()=>ldPopHide(false));
  tw.addEventListener('focusin',e=>{const b=e.target.closest('.ldt');if(b&&b.matches(':focus-visible'))ldPop(b,false);});
  tw.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp'].includes(e.key))return;const bs=[...tw.querySelectorAll('.ldt')].filter(b=>!b.hidden),k=bs.indexOf(document.activeElement);if(k<0)return;e.preventDefault();
    const nb=bs[(k+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:bs.length-1))%bs.length];nb.focus();nb.click();});
  d.querySelector('select').addEventListener('change',e=>{S.ldr[p]=e.target.value;
    if(e.target.value==='Barnaby Joyce'){const other=p==='Nationals'?'One Nation':p==='One Nation'?'Nationals':null;if(other&&S.ldr[other]==='Barnaby Joyce')S.ldr[other]=other==='One Nation'?'Pauline Hanson':'Matt Canavan';}
    ldrCands();sync();schedule();});});
ldTiles();
{const box=$('speccands');if(box){let lastP='';box.innerHTML=SPEC.map((x,k)=>{const h=x.p!==lastP?`<p class="sublbl">${x.p}</p>`:'';lastP=x.p;const pic=phOf(x.n);return h+`<label class="ctl spec"><input type="checkbox" id="spec${k}">${pic?`<img src="${pic}" alt="" loading="lazy">`:''}<span><b>${x.n}</b> <small>${x.pty}, ${x.s}</small><em>${x.note}</em></span></label>`;}).join('');
  SPEC.forEach((x,k)=>$('spec'+k).addEventListener('change',e=>{specSet(x,e.target.checked);
    if(!e.target.checked){if(S.ldr[x.p]===x.n){const cur=DATA.leaders.find(l=>l.party===x.p&&l.sel);S.ldr[x.p]=cur?cur.name:BASE.ldr[x.p];const i=LP.indexOf(x.p);if(i>=0)$('l'+i).value=S.ldr[x.p];}}
    ldrCands();sync();schedule();}));}}
const DFD={muslim:['Seats with large Muslim communities move further towards Labor.','Muslim communities turn away from Labor, towards independents and the Greens.'],
  chinese:['Seats with large Chinese-Australian communities move further to Labor and the Greens.','Chinese-Australian voters drift back to the Liberals.'],
  sasia:['South Asian communities move further to Labor.','South Asian communities swing to the Coalition and independents.'],
  first:['Seats with large First Nations populations follow their 2025 pattern more strongly.','First Nations seats swing towards Labor and the Greens.'],
  tradie:['Tradie-heavy seats move further to One Nation and the Coalition.','Tradies drift back to Labor and the Greens.'],
  mining:['Mining seats move further to One Nation and the Coalition.','Mining seats swing back to Labor.'],
  bluec:['Blue-collar seats move further to One Nation.','Blue-collar workers return to Labor.'],
  pubserv:['Public-service seats move further to Labor.','Public servants turn on Labor.'],
  flats:['Apartment-heavy seats move further to the Greens and Labor.','Apartment dwellers drift to the Coalition and One Nation.'],
  edu:['Graduate seats move further to the Greens and Labor; low-degree seats to One Nation and the Coalition.','The education gap narrows.'],
  age:['Young seats move further to Labor and the Greens; older seats to the Coalition and independents.','The age gap narrows.'],
  rent:['Renter-heavy seats move further to Labor and the Greens; owner-occupier seats to the Coalition.','The renter–owner gap narrows.'],
  mort:['Mortgage-belt seats (high repayments, families with mortgages) swing against Labor, mostly to One Nation. Only seats above average are affected.','Mortgage-belt seats swing to Labor.'],
  multi:['Multicultural seats move further to Labor; less diverse seats to the Coalition and One Nation.','Multicultural seats swing away from Labor (as in some 2025 western Sydney and Melbourne seats).'],
  rural:['Rural and farm seats move further to the Coalition, One Nation and country independents; cities to Labor.','The city–country gap narrows.'],
  rich:['Higher-income seats move further to Labor, the Greens and teals; lower-income seats to One Nation and the Coalition.','Lower-income seats swing back to Labor; wealthier seats to the right.'],
  sec:['More religious seats (often multicultural suburbs) move further to Labor; secular seats to the Greens, Coalition and independents.','Religious seats swing away from Labor.'],
  hard:['Seats with high unemployment and rental stress move further to Labor; comfortable seats to the Coalition.','Struggling seats swing away from Labor, mainly to One Nation and the Coalition.'],
  fam:['Family-heavy suburbs (couples with children) move further to Labor; seats with fewer families to the Coalition, independents and One Nation.','Family suburbs swing away from Labor.']};
DATA.dfac.forEach((f,k)=>{const d=document.createElement('div');d.className='ctl';
  d.innerHTML=`<label for="df_${k}"><span>${f.n}</span> <output id="df_${k}o"></output></label><input id="df_${k}" type="range" min="-5" max="5" step="0.5"><p class="desc"><b>+</b> ${DFD[f.k][0]} <b>−</b> ${DFD[f.k][1]}</p><p class="desc dfx" id="df_${k}x"></p>`;
  $('dfacs').appendChild(d);d.querySelector('input').addEventListener('input',e=>{S.dfac[k]=+e.target.value;sync();schedule();dfPreview();});});
const S2=DATA.sen2, SK=S2.groups.map(g=>g.k);
const SCOL={JLN:'#c2185b',POC:'var(--ind)',AV:'#5c6bc0',SPP:'#2e7d32',INDO:'var(--ind)',UAP:'#f2c200'};
const scol=g=>S2.groups[g].h>=0?col(S2.groups[g].h):(SCOL[S2.groups[g].k]||'var(--empty)');
const SSL=['ALP','COA','GRN','ON','JLN','POC','HMP','AFP','FFP','AV'];
SSL.forEach(k=>{const g=SK.indexOf(k),d=document.createElement('div');d.className='ctl';const st=k==='POC'?' (ACT)':k==='JLN'?' (strongest in Tas)':'';
  d.innerHTML=`<label for="ss_${k}"><span>${S2.groups[g].n}${st}</span> <output id="ss_${k}o"></output></label><input id="ss_${k}" type="range" min="-10" max="10" step="0.5">`;
  $('sensliders').appendChild(d);d.querySelector('input').addEventListener('input',e=>{const v=+e.target.value;if(v)S.senD[g]=v;else delete S.senD[g];sync();schedule();});});
$('dd').addEventListener('change',e=>{S.dd=+e.target.value;sync();schedule();});
$('dpre').innerHTML=Object.keys(DP).map(k=>`<option>${k}</option>`).join('');
[0,1].forEach(i=>{const d=document.createElement('div');d.className='ctl';
  d.innerHTML=`<label for="df${i}">Rule ${i+1}: where this is higher… <output id="da${i}o"></output></label><div class="demo"><select id="df${i}">${CF.map((f,j)=>`<option value="${j}">${f}</option>`).join('')}</select><select id="dp${i}">${P.slice(0,5).map((p,j)=>`<option value="${j}">${p.n}</option>`).join('')}</select></div><input id="da${i}" type="range" min="-3" max="3" step="0.25" aria-label="Points per standard deviation">`;
  $('demos').appendChild(d);
  const up=()=>{S.demo[i]={f:+$('df'+i).value,party:+$('dp'+i).value,amt:+$('da'+i).value};S.dpre='Custom';sync();schedule();dfPreview();};
  ['df','dp'].forEach(k=>$(k+i).addEventListener('change',up)); $('da'+i).addEventListener('input',up);});
$('dpre').addEventListener('change',e=>{S.dpre=e.target.value;const r=DP[S.dpre];if(r){S.demo=[0,1].map(i=>r[i]?{...r[i]}:{f:S.demo[i].f,party:S.demo[i].party,amt:0});}sync();schedule();dfPreview();});
$('mrp').addEventListener('input',e=>{S.mrpW=+e.target.value;sync();schedule();});
$('split').addEventListener('change',e=>{S.split=+e.target.value;sync();schedule();});
$('err').addEventListener('input',e=>{S.err=+e.target.value;sync();schedule();});
[['peOn','on'],['peGrn','grn'],['peInd','ind']].forEach(([id,k])=>$(id).addEventListener('input',e=>{S.pErr={...S.pErr,[k]:+e.target.value};sync();schedule();}));
$('big').addEventListener('input',e=>{S.big=+e.target.value;sync();schedule();});
$('trials').addEventListener('input',e=>{S.trials=+e.target.value;sync();schedule();});
$('run').addEventListener('click',()=>{if(!PENDING)seed++;go();});
try{$('skiplive').checked=localStorage.getItem('skiplive')==='1';}catch(e){}
$('skiplive').addEventListener('change',e=>{try{localStorage.setItem('skiplive',e.target.checked?'1':'0');}catch(x){}if(e.target.checked&&REPLAY)replaySkip();});
$('reset').addEventListener('click',()=>{S=JSON.parse(JSON.stringify(BASE));seed=1;sync();go();});
// randomise: each ticked part of the sandbox gets a plausible random setting
$('randbtn').addEventListener('click',()=>{const on=k=>$('g-rand').querySelector(`[data-r="${k}"]`).checked,rn=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);},
    pick=a=>a[Math.floor(Math.random()*a.length)],r1=v=>Math.round(v*2)/2;
  const X=on('chaos')?1:0,M=X?2.6:1;S=JSON.parse(JSON.stringify(BASE));S.preset=X?'Randomised (chaos)':'Randomised';
  if(on('prim')||X){const sd=[3.5,3.5,2,4,2];for(let j=0;j<5;j++)S.d[j]=r1(rn()*sd[j]*M);if(X)MINOR.forEach(j=>{if(Math.random()<0.25)S.d[j]=r1(Math.random()*6);});const m=(S.d[0]+S.d[1]+S.d[2]+S.d[3]+S.d[4])/2;S.d[0]=r1(S.d[0]-m);S.d[1]=r1(S.d[1]-m);}
  if(on('ldr')||X)LP.forEach(p=>{const L=DATA.leaders.filter(l=>l.party===p);if(L.length>1&&Math.random()<(X?0.85:0.45))S.ldr[p]=pick(L).name;});
  if(on('ev')||X)EV.forEach(e=>{if(Math.random()<(X?0.75:0.35))S.ev[e.name]=pick(e.opts.slice(1));});
  if(on('demo')||X){S.dfac=S.dfac.map(()=>Math.random()<(X?0.6:0.3)?Math.max(-5,Math.min(5,r1(rn()*2*M))):0);}
  if(on('pref')||X){S.pf.onCoa=+Math.min(0.9,Math.max(0.4,S.pf.onCoa+rn()*0.08)).toFixed(2);S.pf.grnAlp=+Math.min(0.92,Math.max(0.6,S.pf.grnAlp+rn()*0.05)).toFixed(2);S.coaON=+Math.min(0.9,Math.max(0.4,S.coaON+rn()*0.08)).toFixed(2);}
  if(on('unc')||X){S.err=X?+(1.4+Math.random()*0.8).toFixed(1):+(0.7+Math.random()*0.9).toFixed(1);S.big=+(Math.random()*0.25).toFixed(2);}
  if(on('cont')||X)Object.keys(CONT).forEach(ab=>{if(Math.random()<(X?0.7:0.3))S.cont[ab]=1+(Math.random()<0.3?1:0);});
  sync();go();});
$('q').addEventListener('input',table);
document.querySelectorAll('th[data-s]').forEach(th=>th.addEventListener('click',()=>{const k=th.dataset.s;sortDir=sortKey===k?-sortDir:1;sortKey=k;table();}));
function sync(){
  P.forEach((_,i)=>{if(!$('s'+i))return;$('s'+i).value=S.d[i];$('s'+i+'o').textContent=(S.d[i]>0?'+':'')+S.d[i].toFixed(i<5?1:1);});
  EV.forEach((e,i)=>{$('e'+i).value=S.ev[e.name];});
  $('coa').value=S.coaON;$('coaO').textContent=Math.round(S.coaON*100)+'%';
  $('preset').value=S.preset in PRESETS?S.preset:'Current polls (baseline)';
  $('pfOn').value=S.pf.onCoa;$('pfOnO').textContent=Math.round(S.pf.onCoa*100)+'%';$('pfGrn').value=S.pf.grnAlp;$('pfGrnO').textContent=Math.round(S.pf.grnAlp*100)+'%';
  const lg0=D.MC[0][1]/(D.MC[0][1]+D.MC[0][3]);$('pfLg').value=S.pf.lg;$('pfLgO').textContent=Math.round((lg0+S.pf.lg)*100)+'%';$('pfMin').value=S.pf.minorOn;$('pfMinO').textContent='x'+S.pf.minorOn.toFixed(2);
  LP.forEach((p,i)=>{$('l'+i).value=S.ldr[p];});
  Object.keys(CONT).forEach(ab=>{if($('ct_'+ab))$('ct_'+ab).value=(S.cont||{})[ab]||0;});if($('cname'))$('cname').value=S.cname||0;csaLdrOpts();ldTiles();if($('regf'))$('regf').value=S.regf===0?0:1;if($('cind')){$('cind').value=S.cind||0;$('cind').options[1].textContent=`Join ${P[CSAI].n}: Ryan, Scamps, Chaney, Haines, Boele`;}
  DATA.dfac.forEach((f,k)=>{$('df_'+k).value=S.dfac[k];$('df_'+k+'o').textContent=(S.dfac[k]>0?'+':'')+S.dfac[k].toFixed(1);});
  $('dpre').value=S.dpre;[0,1].forEach(i=>{$('df'+i).value=S.demo[i].f;$('dp'+i).value=S.demo[i].party;$('da'+i).value=S.demo[i].amt;$('da'+i+'o').textContent=(S.demo[i].amt>0?'+':'')+S.demo[i].amt.toFixed(2)+' pts';});
  $('mrp').value=S.mrpW;$('mrpO').textContent=Math.round(S.mrpW*100)+'%';$('split').value=S.split;
  $('err').value=S.err;$('errO').textContent='x'+S.err.toFixed(1);[['peOn','on'],['peGrn','grn'],['peInd','ind']].forEach(([id,k])=>{const v=(S.pErr||{})[k];$(id).value=v;$(id+'O').textContent='x'+v.toFixed(1);});$('big').value=S.big;$('bigO').textContent=Math.round(S.big*100)+'%';
  $('trials').value=S.trials;$('trialsO').textContent=nf(S.trials);
  const mark=(id,on)=>{const e=$(id);if(e)e.closest('.ctl').classList.toggle('changed',!!on);};
  const cnt={prim:0,minor:0,ldr:0,ev:0,demo:0,pref:0,unc:0,mod:0,sen:0,cand:0};
  SPEC.forEach((x,k)=>{const e=$('spec'+k);if(!e)return;const on=specOn(x),lk=!!(x.p&&S.ldr[x.p]===x.n);e.checked=on;e.closest('.spec').classList.toggle('changed',on);e.closest('.spec').title=lk?'On because '+x.n+' leads the party. Turning it off restores the current leader.':'';cnt.cand+=on;});
  SSL.forEach(k=>{const g=SK.indexOf(k),v=S.senD[g]||0;$('ss_'+k).value=v;$('ss_'+k+'o').textContent=(v>0?'+':'')+v.toFixed(1);mark('ss_'+k,v);cnt.sen+=!!v;});
  $('dd').value=S.dd;mark('dd',S.dd);cnt.sen+=!!S.dd;
  P.forEach((_,i)=>{if(!$('s'+i))return;const c=S.d[i]!==0;mark('s'+i,c);cnt.prim+=c;if(i>=5)cnt.minor+=c;});
  LP.forEach((p,i)=>{const c=S.ldr[p]!==BASE.ldr[p];mark('l'+i,c);cnt.ldr+=c;});
  const evg={'Economy':'ev','Outside shock':'ev','Preference climate':'pref','Polling environment':'unc','Election timing':'mod'};
  EV.forEach((e,i)=>{const c=S.ev[e.name]!==e.opts[0];mark('e'+i,c);cnt[evg[e.name]||'ev']+=c;});
  DATA.dfac.forEach((f,k)=>{const c=S.dfac[k]!==0;mark('df_'+k,c);cnt.demo+=c;});
  const dc=S.demo.some(r=>r.amt);mark('dpre',dc);[0,1].forEach(i=>mark('da'+i,S.demo[i].amt));cnt.demo+=dc;
  [['pfOn',S.pf.onCoa!==BASE.pf.onCoa,'pref'],['pfGrn',S.pf.grnAlp!==BASE.pf.grnAlp,'pref'],['pfLg',S.pf.lg!==BASE.pf.lg,'pref'],['pfMin',S.pf.minorOn!==BASE.pf.minorOn,'pref'],['coa',S.coaON!==BASE.coaON,'pref'],['split',S.split!==BASE.split,'pref'],['err',S.err!==BASE.err,'unc'],['big',S.big!==BASE.big,'unc'],['mrp',S.mrpW!==BASE.mrpW,'mod'],['trials',S.trials!==BASE.trials,'mod']].forEach(([id,c,g])=>{mark(id,c);cnt[g]+=c;});
  document.querySelectorAll('.chg').forEach(e=>{const n=cnt[e.dataset.g];e.textContent=n?n+' changed':'';});
  {const tot=Object.entries(cnt).reduce((t,[k,v])=>t+(k==='minor'?0:v),0),bd=$('sbxbadge');if(bd){bd.textContent=tot;bd.hidden=!tot;bd.title=tot+' setting'+(tot===1?'':'s')+' changed';}}
}
let seed=1, timer=null, LS=null, RUNNO=0; const BYSALT=(Math.random()*4294967296)>>>0;   // byline rotation: different reporters each visit and each run
// sandbox changes wait for "Run again": nothing re-simulates until the reader asks
let PENDING=false;
function schedule(){PENDING=true;$('run').classList.add('pending');$('run').textContent='Run with changes';$('pendmsg').hidden=false;}
function settings(){
  const d={g:S.d.slice(),oth:0}; const add5=(v,f)=>{v.forEach((x,i)=>{if(i<4)d.g[i]+=x*f;else d.oth+=x*f;});}; let coa=S.coaON, err=S.err, bigP=S.big, bigX=2, days=DATA.days, flow=1, split=S.split;
  EV.forEach(e=>{const o=e.eff[S.ev[e.name]]; if(!o) return;
    if(o.d) add5(o.d,1); if(o.coa) coa+=o.coa; if(o.err) err*=o.err; if(o.bigP!=null) bigP=o.bigP; if(o.bigX) bigX=o.bigX; if(o.days!=null) days=o.days; if(o.flow) flow*=o.flow;});
  if(S.ev['Coalition']&&S.ev['Coalition'].startsWith('Coalition splits')) split=1;
  let libD=0,natD=0; d.g[NATI]=0; if(split){libD=S.d[1];natD=S.d[NATI];d.g[1]-=libD;}
  const fade=Math.pow(0.5,Math.max(0,days)/180);
  const senBoost={};
  // leader traits: the new leader's traits count, and the current leader's are taken away (the polls already reflect them)
  const TR=window.TRAITS||{L:{},A:{},M:{}},TCOL={Nationals:2,"Katter's Australian":11,'Community Strong':26},TPTY={Labor:0,Coalition:1,Greens:2,'One Nation':3},TGRP={Labor:0,Coalition:1,Greens:2,'One Nation':3,"Katter's Australian":GI('KAP'),'Community Strong':GI('CSA')},trRules=[];
  const trApply=(p,name,sg)=>{(TR.A[name+'|'+p]||TR.A[name]||[]).forEach(id=>{const t=TR.L[id];if(!t)return;const nat=t[3],rules=t[4];
    if(nat){if(p==='Nationals')d.g[1]+=nat*0.35*sg;else if(TGRP[p]!=null&&TGRP[p]>=0)d.g[TGRP[p]]+=nat*sg;}
    rules.forEach(([m,v])=>{const r={amt:v*sg};if(m.startsWith('st:'))r.st=m.slice(3);else r.f=TR.M[m];if(TCOL[p]!=null)r.col=TCOL[p];else if(TPTY[p]!=null)r.party=TPTY[p];else return;trRules.push(r);});});};
  LP.forEach(p=>{const l=DATA.leaders.find(x=>x.name===S.ldr[p]&&x.party===p); if(!l||l.sel) return; const f=1;   // traits are lasting, so they do not fade with time to the election
    const cur=DATA.leaders.find(x=>x.party===p&&x.sel); trApply(p,l.name,f); if(cur) trApply(p,cur.name,-f); if(l.sen) Object.entries(l.sen).forEach(([st,v])=>{const k=S2.states.indexOf(st);if(k>=0)(senBoost[k]=senBoost[k]||[]).push([SK.indexOf(l.party==='Community Strong'?'CSA':l.party),v]);});});
  return {pErr:S.pErr, d, coaON:Math.min(0.95,Math.max(0.05,coa)), errScale:err, flowScale:flow, bigP, bigX, days, trials:S.trials, seed, onBias:0, mrpW:S.mrpW, regFlows:S.regf!==0, split:!!split, demo:S.demo.filter(r=>r.amt).concat(trRules), pf:S.pf, seatAdj:TBW(), senD:S.senD, dd:!!S.dd, called:S.called, libD, natD, senBoost, seeds:seedsFor(S), lcOv:lcOvFor(S), dfac:DATA.dfac.map((f,k)=>({i:k,v:S.dfac[k],load:f.load,one:f.one})).filter(f=>f.v)};
}
function go(){tbMember();PENDING=false;$('run').classList.remove('pending');$('run').textContent='Run again';$('pendmsg').hidden=true;if(REPLAY){cancelAnimationFrame(REPLAY.raf);REPLAY=null;$("replay").hidden=true;$("replaybtn").innerHTML=ICON("play")+" Replay results night";}
  $('status').textContent='Simulating '+nf(S.trials)+' elections...';
  requestAnimationFrame(()=>setTimeout(()=>{const t=performance.now();LS=settings();applySplit(LS.split);applyCind(S.cind);applyName(S.cname||0);R=ENGINE.simulate(D,LS);RUNNO++;
    $('status').textContent=nf(S.trials)+' simulations in '+((performance.now()-t)/1000).toFixed(1)+' s'+(JSON.stringify(S)!==JSON.stringify(BASE)?' · sandbox changes active':' · baseline');
    render();if(mapBuilt&&!window.NOLIVE&&!$('skiplive').checked)replayStart(true);if(window.APP&&APP._after){const f=APP._after;APP._after=null;try{f();}catch(e){console.error(e);}}},20));
}
const pct = v => v>=0.995?'>99%':v<0.005?'<1%':Math.round(v*100)+'%';
// figure numbers follow the order figures appear on the page
function renumberFigs(){[...document.querySelectorAll('span.fig')].filter(e=>/^Fig\./.test(e.textContent)&&!e.closest('#cmp')).forEach((e,k)=>{e.textContent='Fig. '+(k+1);});}
function render(){
  tickTo($('pA'),pct(R.pA));tickTo($('pC'),pct(R.pC));tickTo($('pH'),pct(R.pH));
  const cb=coaBreak(), cbTxt=g=>{const parts=Object.entries(cb[g]||{}).filter(([,v])=>v).sort((a,b)=>b[1]-a[1]);return parts.length>1?` <small class="cbk">(${parts.map(([k,v])=>`${COASUB[k][0].replace(/ \(.*\)/,'')} ${v}`).join(' · ')})</small>`:'';};
  $('legend').innerHTML=ORD.filter(j=>j<5||R.likeCount[j]>0).map(j=>`<span><i class="sw" style="background:${col(j)}"></i>${P[j].n}<b class="num">${R.likeCount[j]}</b>${j===1||j===NATI?cbTxt(j):''}</span>`).join('');
  if(REPLAY){drawMap();liveRender();}else{chamber(); drawMap(); article();} dataTab();setTimeout(renumberFigs,0);
  // distributions
  $('dists').innerHTML=[0,1,3,4,...MINOR].filter(j=>j<5||R.dist[j].p95>0).map(j=>{const d=R.dist[j], h=new Array(151).fill(0); d.hist.forEach(v=>h[v]++);
    const mx=Math.max(...h), lo=Math.max(0,Math.min(...d.hist)-3), hi=Math.min(150,Math.max(...d.hist)+3), span=Math.max(10,hi-lo), w=420, ht=140;
    let bars=''; for(let v=lo;v<=hi;v++){const bh=h[v]/mx*(ht-18); bars+=`<rect x="${((v-lo)/span*(w-10)+5).toFixed(1)}" y="${(ht-14-bh).toFixed(1)}" width="${Math.max(1,(w-10)/span-0.6).toFixed(1)}" height="${bh.toFixed(1)}" fill="${col(j)}" opacity="${v>=76?1:0.75}"/>`;}
    const mk=(76>=lo&&76<=hi)?`<line x1="${((76-lo)/span*(w-10)+5).toFixed(1)}" x2="${((76-lo)/span*(w-10)+5).toFixed(1)}" y1="2" y2="${ht-14}" stroke="currentColor" stroke-dasharray="3 3"/><text x="${((76-lo)/span*(w-10)+8).toFixed(1)}" y="12" font-size="12" fill="currentColor">76 for majority</text>`:'';
    return `<div class="dist" style="--dc:${col(j)}"><div class="cap dtop"><span class="dpn">${P[j].n}</span><span>middle <b class="num">${d.med}</b></span></div><svg viewBox="0 0 ${w} ${ht}" role="img" aria-label="${P[j].n} seats: 90% between ${d.p5} and ${d.p95}">${bars}${mk}<text x="5" y="${ht-1}" font-size="12" fill="currentColor">${lo} seats</text><text x="${w-5}" y="${ht-1}" font-size="12" text-anchor="end" fill="currentColor">${hi}</text></svg><div class="cap num"><span>90% range: ${d.p5}–${d.p95}</span><span>${pct(d.hist.filter(v=>v>=76).length/d.hist.length)} reach a majority</span></div></div>`;}).join('');
  const G=R.gov, gl=[['Labor majority',G.la,0],['Labor with the Greens',G.lg,2],['Independents and others decide',G.xd,4],['Coalition with One Nation',G.co,3],['Coalition majority',G.ca,1]];
  $('gov').innerHTML=gl.map(r=>`<div class="bar" style="grid-template-columns:190px minmax(0,1fr) 46px"><span>${r[0]}</span><span class="tr"><i style="width:${r[1]*100}%;background:${col(r[2])}"></i></span><span class="num">${pct(r[1])}</span></div>`).join('');
  $('opp').textContent='One Nation wins more seats than the Coalition (and would lead the opposition) in '+pct(G.onOpp)+' of simulations.';
  senate();
  {const c=R.likeCount,top=P.map((_,j)=>[c[j],j]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]);const s=`Updated forecast. ${top.slice(0,4).map(([v,j])=>P[j].n+' '+v+' seats').join(', ')}. ${P[0].n} majority in ${pct(R.pA)} of simulations, hung parliament ${pct(R.pH)}, Coalition majority ${pct(R.pC)}.`;if($('srsum').textContent!==s){clearTimeout(window._srt);window._srt=setTimeout(()=>{$('srsum').textContent=s;},800);}}
  seat(); table(); watch(); pathTo(); dfEffects(); dfPreview(); night(); formUI(); cabinet(); senCountTrace(); pendulum(); swingometer(); states(); figs();
  [['dsub-watch','watchcap'],['dsub-path','pathsum'],['dsub-gov','govcap'],['dsub-dist','distcap']].forEach(([d,c])=>{const e=$(c);if(e&&$(d)){const s=e.textContent.replace(/^Fig\. \d+\s*/,'').split(/(?<=\.)\s/)[0];if(s)$(d).textContent=s;}});
}
// how the count went: the central (most likely) preference count for a seat, exclusion by exclusion
function elDate(){const d=new Date(2028,4,20);d.setDate(d.getDate()+((typeof LS!=='undefined'&&LS&&LS.days!=null?LS.days:DATA.days)-DATA.days));return d;}
const elYear=()=>elDate().getFullYear();
function countHTML(i){if(!R||!R.cargs||!R.cargs[i])return '';const s=D.seats[i],b=R.base[i],tr=[],a=R.cargs[i];
  let c;try{c=ENGINE.count(b,s.lead,s.k,a[0],a[1],a[2],a[3],tr);}catch(e){return '';}
  const cg=cgFor(s),lc=a[3],mm=tr[0]?tr[0].mm:-1;
  const grpOf=j=>j===0?0:j===1?(cg[b[2]>b[1]?2:1]):j===2?2:j===3?3:j===4?cg[lc]:(mm>=0?cg[mm]:4);
  const nm=j=>{const g=grpOf(j);return j===4&&g===4?'Independent':mapName(s,g,b);}, cl=j=>mapCol(s,grpOf(j),b);
  const bar=t=>{const al=t.map((v,j)=>[v,j]).filter(x=>x[0]>0.05).sort((x,y)=>y[0]-x[0]);return `<div class="ccbar">${al.map(([v,j])=>`<i style="width:${v.toFixed(2)}%;background:${cl(j)}" title="${nm(j)} ${v.toFixed(1)}"></i>`).join('')}<em></em></div>
    <div class="cclab">${al.map(([v,j])=>`<span><i style="background:${cl(j)}"></i>${nm(j)} <b>${v.toFixed(1)}</b></span>`).join('')}</div>`;};
  // preference flows (Sankey): one column per count, bands showing votes that stay and votes that move when a candidate is excluded
  const sank=(()=>{if(tr.length<2)return '';const VW=660,VH=330,top=8,usable=VH-top-8,BW=14,GAP=5,L0=150,R0=VW-150,ncol=tr.length,cx=k=>L0+(R0-L0-BW)*(ncol===1?0:k/(ncol-1));
    const order=tr[0].t.map((v,j)=>[v,j]).sort((a,b)=>b[0]-a[0]).map(z=>z[1]),pres=k=>order.filter(j=>tr[k].t[j]>0.05);
    const pos=tr.map((x,k)=>{const ps=pres(k),tot=ps.reduce((a,j)=>a+x.t[j],0),sc=(usable-GAP*(ps.length-1))/tot;let y=top;const o={};ps.forEach(j=>{o[j]={y,h:x.t[j]*sc};y+=x.t[j]*sc+GAP;});o.sc=sc;return o;});
    const band=(x1,y1,h1,x2,y2,h2,c)=>{const m=(x1+x2)/2;return `<path d="M${x1},${y1}C${m},${y1} ${m},${y2} ${x2},${y2}L${x2},${y2+h2}C${m},${y2+h2} ${m},${y1+h1} ${x1},${y1+h1}Z" fill="${c}" fill-opacity=".42"/>`;};
    let svg='';
    for(let k=0;k<ncol-1;k++){const A=pos[k],B=pos[k+1],nx=tr[k+1],ex=nx.ex,used={};
      pres(k+1).forEach(j=>{if(!A[j])return;const h1=tr[k].t[j]*A.sc,h2=tr[k].t[j]*B.sc;svg+=band(cx(k)+BW,A[j].y,h1,cx(k+1),B[j].y,h2,cl(j));used[j]=h2;});
      if(ex>=0&&A[ex]){let sy=A[ex].y;order.forEach(j=>{const g=nx.gain[j]||0;if(g<=0.05||!B[j])return;const h1=g*A.sc,h2=g*B.sc,ty=B[j].y+(used[j]||0);svg+=band(cx(k)+BW,sy,h1,cx(k+1),ty,h2,cl(ex));used[j]=(used[j]||0)+h2;sy+=h1;});}}
    pos.forEach((o,k)=>pres(k).forEach(j=>{svg+=`<rect x="${cx(k)}" y="${o[j].y}" width="${BW}" height="${Math.max(1,o[j].h)}" fill="${cl(j)}"><title>${nm(j)} ${tr[k].t[j].toFixed(1)}</title></rect>`;}));
    // labels: first count on the left, the final two on the right (winner ticked)
    pres(0).forEach(j=>{const o=pos[0][j];if(o.h<9)return;svg+=`<text x="${L0-8}" y="${o.y+o.h/2+4}" text-anchor="end" class="sk-l"><tspan font-weight="700" fill="${cl(j)}">${nm(j)}</tspan> ${tr[0].t[j].toFixed(1)}</text>`;});
    const last=ncol-1,fin=pres(last).sort((a,b)=>tr[last].t[b]-tr[last].t[a]);
    fin.forEach((j,r)=>{const o=pos[last][j];svg+=`<text x="${R0+8}" y="${o.y+o.h/2+4}" class="sk-l"><tspan font-weight="700" fill="${cl(j)}">${nm(j)}</tspan> ${tr[last].t[j].toFixed(1)}${r===0?' ✓':''}</text>`;});
    const hd=tr.map((x,k)=>`<text x="${cx(k)+BW/2}" y="${VH+14}" text-anchor="middle" class="sk-h">${k===0?'1st':k===last?'Final':k+1}</text>`).join('');
    return `<div class="sankey"><svg viewBox="0 0 ${VW} ${VH+20}" role="img" aria-label="Preference flows in ${s.n}">${svg}${hd}</svg></div>`;})();
  let h=`<div class="bars ccount"><strong>How the count went</strong>${sank}<details class="ccsteps"><summary>Step by step</summary><ol>`;
  tr.forEach((x,k)=>{if(x.ex<0){h+=`<li><div class="cchd"><span class="ccn">1</span>First preferences<small>the smallest candidates' votes already spread to the main contenders</small></div>${bar(x.t)}</li>`;return;}
    const g=x.gain.map((v,j)=>[v,j]).filter(y=>y[0]>0.05).sort((p,q)=>q[0]-p[0]);
    h+=`<li><div class="cchd"><span class="ccn">${k+1}</span><span><b style="color:${cl(x.ex)}">${nm(x.ex)}</b> excluded (${x.pile.toFixed(1)})</span><small>${g.map(([v,j])=>`${nm(j)} +${v.toFixed(1)}`).join(' · ')}</small></div>${bar(x.t)}</li>`;});
  const M=R.margin[i],fin=c.share,adj=M&&Math.abs(Math.abs(fin-0.5)*100-M.m)>0.2;
  h+=`</ol></details>${M?`<p class="ccfin">Final two: <b style="color:${mapCol(s,M.w,b)}">${mapName(s,M.w,b)} ${(50+M.m).toFixed(1)}</b> v <b style="color:${mapCol(s,M.r,b)}">${mapName(s,M.r,b)} ${(50-M.m).toFixed(1)}</b>${adj?'<br><small>Includes a small seat-level adjustment calibrated to the 2025 result.</small>':''}</p>`:''}
    <span class="status">The most likely count, using this run's central vote estimate. Individual simulations vary around it.</span></div>`;
  return h;}
let CMP=-1;
function cmpHTML(a,b){const S_=[a,b].map(i=>{const s=D.seats[i],M=seatMargin(i),g=grpV(R.base[i],s),w=R.likely[i];return {i,s,M,g,w,mem:HELDBY[s.n]||s.mem||'—'};});
  const cell=f=>S_.map(x=>`<td>${f(x)}</td>`).join('');
  const parties=[0,1,2,3,4,...MINOR].filter(j=>S_.some(x=>x.g[j]>=3));
  const pc=v=>v.toFixed(1)+'%',cen=[[0,'Median age',v=>v.toFixed(0)],[1,'Weekly household income',v=>'$'+nf(Math.round(v))],[5,'Renting',pc],[30,'Apartments',pc],[7,'Bachelor degree+',pc],[23,'Tradies',pc],[26,'Mining',pc],[12,'Born overseas',pc],[13,'Other language at home',pc],[14,'No religion',pc],[16,'Christian',pc],[19,'First Nations',pc]];
  return `<div class="tablewrap"><table class="cmpt"><thead><tr><th></th>${S_.map(x=>`<th>${x.s.n}<small>${stN(x.s.st)} · ${rgN(x.s.rg)}</small></th>`).join('')}</tr></thead><tbody>
  <tr><th>Member</th>${cell(x=>x.mem)}</tr>
  <tr><th>Forecast</th>${cell(x=>`<b style="color:${mapCol(x.s,x.w,R.base[x.i])}">${mapName(x.s,x.w,R.base[x.i])}</b> ${pct(R.prob[x.i][x.w])}`)}</tr>
  <tr><th>Two-candidate</th>${cell(x=>x.M?`${mapName(x.s,x.M.w,R.base[x.i])} ${(50+x.M.m).toFixed(1)} v ${mapName(x.s,x.M.r,R.base[x.i])}`:'')}</tr>
  <tr><th>2025 2PP</th>${cell(x=>`Labor ${(x.s.b2*100).toFixed(1)}`)}</tr>
  ${parties.map(j=>`<tr><th><i class="sw" style="background:${col(j)}"></i>${P[j].n}</th>${cell(x=>`${x.g[j].toFixed(1)}%`)}</tr>`).join('')}
  ${cen.map(([k,l,f])=>`<tr><th>${l}</th>${cell(x=>f(x.s.cr[k]))}</tr>`).join('')}
  </tbody></table></div>`;}
function seat(){
  const c=$('seatcard'); if(sel===null){c.innerHTML='<h2 id="h-seat">Select a seat</h2><p class="sub">Choose a seat on the map, in Seats to watch or in the full list to see that seat\'s odds and first-preference estimate.</p>';return;}
  const s=D.seats[sel], pr=R.prob[sel], base=R.base[sel];
  const gv=new Array(NG).fill(0), cg=cgFor(s); base.forEach((v,j)=>gv[cg[j]]+=v);
  const g25=grpV(s.b,s), prim=gv.map((v,j)=>[j===4&&s.lc!==8?'Independents (other)':P[j].n,v,j]).filter(r=>r[1]>0.05).sort((a,b)=>b[1]-a[1]);
  const memName=HELDBY[s.n]||s.mem||'', memPic=phOf(memName), memIni=memName.replace(/'/g,'').split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2);
  c.innerHTML=`<div class="seathead"><div class="mpic" style="border-bottom-color:${mapCol(s,gOf(s))}">${memPic?`<img src="${memPic}" alt="${memName}">`:`<svg viewBox="0 0 120 160" aria-hidden="true"><rect width="120" height="160" fill="#c8ccd1"/><circle cx="60" cy="60" r="26" fill="#a2a9b1"/><path d="M14 160c4-38 24-56 46-56s42 18 46 56z" fill="#a2a9b1"/></svg><span>${memIni}</span>`}</div><div><div class="kicker">${stN(s.st)} · ${rgN(s.rg)}</div><h2 id="h-seat">${s.n}</h2><p class="sub">Member: ${HELDBY[s.n]?HELDBY[s.n]+' ('+P[gOf(s)].n+')':(s.mem||'—')}${facTag(HELDBY[s.n]||s.mem)} · ${s.n==='Farrer'?'Won by One Nation at the May 2026 by-election':HELD[s.n]?'Changed party since 2025':'Won by '+the(gOf(s))+' in 2025'}</p></div></div>
   ${(()=>{const sm=seatMargin(sel),hd=gOf(s),w=sm.w,verdict=w===hd?`${P[w].n} retain`:`${P[w].n} gain from ${P[hd].n==='Independents'?'independent':P[hd].n}`;
     const pos=Math.min(25,sm.m)/25*100;
     return `<div class="smg"><div class="smv"><span class="fig">Forecast</span><b style="color:${col(w)}">${verdict}</b> <span class="status">${pct(pr[w])} chance</span></div>
     <div class="smh"><span>Margin after preferences: <b>${P[w].n} ${sm.m.toFixed(2)}%</b> over ${P[sm.r].n}</span><span class="smb">${bandOf(sm.m)}</span></div>
     <div class="smbar" aria-hidden="true"><span class="b1"></span><span class="b2"></span><span class="b3"></span><i style="left:${pos.toFixed(1)}%;background:${col(w)}"></i></div>
     <div class="smax" aria-hidden="true"><span>0</span><span style="left:24%">6</span><span style="left:40%">10</span><span style="left:100%">25%+</span></div></div>`;})()}
   <div class="bars"><strong>Chance of winning</strong>${ORD.filter(j=>pr[j]>0.004||j<2).map(j=>`<div class="bar"><span>${P[j].n}</span><span class="tr"><i style="width:${pr[j]*100}%;background:${col(j)}"></i></span><span class="num">${pct(pr[j])}</span></div>`).join('')}</div>
   <div class="bars"><strong>Primary vote: now v 2025</strong>${prim.map(r=>{const was=g25[r[2]]||0,dv=r[1]-was;return `<div class="bar pv"><span>${r[0]}</span><span class="tr pvt"><i style="width:${Math.min(100,r[1]*2)}%;background:${col(r[2])}"></i><i class="was" style="width:${Math.min(100,was*2)}%"></i></span><span class="num">${r[1].toFixed(1)}% <small class="${dv>=0?'up':'dn'}">${dv>=0?'+':'−'}${Math.abs(dv).toFixed(1)}</small></span></div>`;}).join('')}<span class="status">Thin grey bar = 2025 result. Figures are the central estimate.</span></div>
   ${countHTML(sel)}
   <div id="candslot"></div>
   ${(()=>{// who lives here: the seat's 2021 Census profile, grouped, each bar showing how far it sits from the average seat
     const fmt=j=>{const v=s.cr[j];return j===1?'$'+nf(Math.round(v)):j===0?v.toFixed(0):v.toFixed(1)+'%';};
     const row=j=>{const z=Math.max(-3,Math.min(3,s.cz[j]));return `<span>${CF[j].replace(/ \(.*$/,'')}</span><span class="z" title="vs average seat"><i style="${z>=0?'left:50%':'right:50%'};width:${Math.abs(z)/3*50}%"></i></span><span class="num">${fmt(j)}</span>`;};
     const G=[['People',[0,9,10,6,19]],['Money and housing',[1,33,32,5,2,3,30,31]],['Work and education',[7,34,25,23,24,27,26,28,29,8]],['Background and belief',[12,13,20,21,22,14,16,17,18]]];
     // the most similar seats across every Census measure
     const sim=D.seats.map((x,k)=>{if(k===sel)return null;let d=0;for(let j=0;j<s.cz.length;j++){const a=Math.max(-3,Math.min(3,s.cz[j])),b=Math.max(-3,Math.min(3,x.cz[j]));d+=(a-b)*(a-b);}return [k,d];}).filter(Boolean).sort((a,b)=>a[1]-b[1]).slice(0,5);
     return `<div class="bars"><strong>Who lives here (2021 Census)</strong>${G.map(([h,js],gi)=>`<details class="cengrp"${gi<2?' open':''}><summary>${h}</summary><div class="cen">${js.filter(j=>s.cr[j]!=null).map(row).join('')}</div></details>`).join('')}
       <span class="status">Bar = how far above or below the average seat (centre line).</span>
       <div class="simseats"><b>Most similar seats</b> ${sim.map(([k])=>`<button type="button" class="simbtn" data-k="${k}">${D.seats[k].n}</button>`).join('')}<span class="status">Closest match across all ${s.cz.length} Census measures. Select one to compare.</span></div></div>`;})()}`;
  const held=gOf(s), mine=S.seatAdj.filter(a=>a.i===sel), opts=[0,1,2,3,4,...MINOR].filter(j=>j<5||gv[j]>0.3);
  const cq=(S.cand||{})[s.n]||{g:opts[0],q:''}, ret=!!(S.retire||{})[s.n], QN={star:'Star candidate +3',local:'Strong local profile +1.5',scandal:'Scandal −4'};
  const pn=g=>g===1?(coaSub(s,1,null)==='NAT'?'National':s.st==='QLD'?'LNP':s.st==='NT'?'CLP':'Liberal'):P[g].n;
  // candidates, retirements, candidate quality and local swings, together in one place
  const named=Object.entries(S.cand||{}).filter(([k,v])=>k===s.n&&v.n).map(([k,v])=>v);
  const candHTML=`<div class="bars seatcands"><strong>Candidates</strong>
    <div class="candlist">
${named.filter(v=>v.top).map(v=>`<div class="candrow"><i style="background:${mapCol(s,v.g)}"></i><div><b>${v.n}</b>${facTag(v.n)}<small>${pn(v.g)} · candidate${v.q?` · ${QN[v.q]}`:''}</small></div><span></span></div>`).join('')}
      <div class="candrow"><i style="background:${mapCol(s,held)}"></i><div><b>${memName||'Sitting member'}</b>${facTag(memName)}<small>${pn(held)} · sitting member${SINCE[memName]?' '+heldTxt(memName):''}${ret?' · <em>retiring</em>':''}</small></div>
        <label class="candret"><input type="checkbox" id="retChk"${ret?' checked':''}> Retires</label></div>
      ${named.filter(v=>!v.top).map(v=>`<div class="candrow"><i style="background:${mapCol(s,v.g)}"></i><div><b>${v.n}</b>${facTag(v.n)}<small>${pn(v.g)} · candidate${v.q?` · ${QN[v.q]}`:''}</small></div><span></span></div>`).join('')}
    </div>
    <span class="status">${named.length?'Other parties':'Parties'} have not finished preselecting candidates for the next election.</span>
    <div class="adjbox"><div class="adjh">Adjust this seat</div>
      <div class="adjrow"><span class="adjl">Candidate</span><select id="cqP" aria-label="Party">${opts.map(j=>`<option value="${j}"${j===cq.g?' selected':''}>${P[j].n}</option>`).join('')}</select>
        <select id="cqQ" aria-label="Candidate quality"><option value="">Ordinary candidate</option><option value="star"${cq.q==='star'?' selected':''}>Star candidate (+3)</option><option value="local"${cq.q==='local'?' selected':''}>Strong local profile (+1.5)</option><option value="scandal"${cq.q==='scandal'?' selected':''}>Scandal (−4)</option></select><button id="cqGo" type="button" class="ghost">Apply</button></div>
      <div class="adjrow"><span class="adjl">Local swing</span><select id="ovP" aria-label="Party">${opts.map(j=>`<option value="${j}">${P[j].n}</option>`).join('')}</select><span class="adjsl"><input id="ovA" type="range" min="-15" max="15" step="0.5" value="3" aria-label="Points"><output id="ovO">+3.0</output></span><button id="ovAdd" type="button" class="ghost">Apply</button></div>
      ${mine.length?`<div class="ovlist">${mine.map(a=>`<button type="button" data-g="${a.g}" title="Remove">${P[a.g].n} ${a.amt>0?'+':''}${a.amt.toFixed(1)} ${ICON('close')}</button>`).join('')}</div>`:''}
      <span class="status">A retiring member costs their party about 2.5 points of personal vote. A local swing adds points to one party in this seat only.</span></div></div>`;
  const slot=c.querySelector('#candslot');if(slot)slot.outerHTML=candHTML;else c.insertAdjacentHTML('beforeend',candHTML);
  $('retChk').addEventListener('change',e=>{S.retire={...(S.retire||{})};if(e.target.checked)S.retire[s.n]=1;else delete S.retire[s.n];sync();go();});
  $('cqGo').addEventListener('click',()=>{S.cand={...(S.cand||{})};const q=$('cqQ').value,g=+$('cqP').value,o=S.cand[s.n],nm=o&&o.n&&o.g===g?o.n:null;if(q||nm)S.cand[s.n]={g,q,...(nm?{n:nm,prev:o.prev,top:o.top}:{})};else delete S.cand[s.n];sync();go();});
  $('ovA').addEventListener('input',e=>{const v=+e.target.value;$('ovO').textContent=(v>0?'+':'')+v.toFixed(1);});
  $('ovAdd').addEventListener('click',()=>{const g=+$('ovP').value,amt=+$('ovA').value;S.seatAdj=S.seatAdj.filter(a=>!(a.i===sel&&a.g===g));if(amt)S.seatAdj.push({i:sel,g,amt});sync();go();});
  c.querySelectorAll('.ovlist button').forEach(b=>b.addEventListener('click',()=>{const g=+b.dataset.g;S.seatAdj=S.seatAdj.filter(a=>!(a.i===sel&&a.g===g));sync();go();}));
  // compare with another seat
  c.insertAdjacentHTML('beforeend',`<div class="bars"><strong>Compare with another seat</strong><div class="ovr"><select id="cmpSel" aria-label="Seat to compare"><option value="-1">Choose a seat…</option>${D.seats.map((x,k)=>k===sel?'':`<option value="${k}"${k===CMP?' selected':''}>${x.n} (${stN(x.st)})</option>`).join('')}</select></div><div id="cmpOut">${CMP>=0&&CMP!==sel?cmpHTML(sel,CMP):''}</div></div>`);
  $('cmpSel').addEventListener('change',e=>{CMP=+e.target.value;$('cmpOut').innerHTML=CMP>=0?cmpHTML(sel,CMP):'';});
  c.querySelectorAll('.simbtn').forEach(b=>b.addEventListener('click',()=>{CMP=+b.dataset.k;$('cmpSel').value=CMP;$('cmpOut').innerHTML=cmpHTML(sel,CMP);$('cmpSel').scrollIntoView({behavior:'smooth',block:'nearest'});}));
}
function table(){
  const q=$('q').value.trim().toLowerCase();
  const rows=D.seats.map((s,i)=>({i,n:s.n,st:s.st,inc:gOf(s),fav:R.likely[i],pf:R.prob[i][R.likely[i]]})).filter(r=>!q||r.n.toLowerCase().includes(q)||r.st.toLowerCase().includes(q)||stN(r.st).toLowerCase().includes(q));
  rows.sort((a,b)=>{const k=sortKey;const va=a[k],vb=b[k];return (va<vb?-1:va>vb?1:0)*sortDir;});
  $('tbody').innerHTML=rows.map(r=>{const pr=R.prob[r.i];return `<tr data-i="${r.i}" style="cursor:pointer"><td><strong>${r.n}</strong></td><td>${stN(r.st)}</td><td><span class="pill" style="background:${col(r.inc)}">${P[r.inc].n}</span></td><td><span class="pill" style="background:${col(r.fav)}">${P[r.fav].n}</span></td><td class="num">${pct(r.pf)}</td><td class="p"><div class="minibar">${ORD.map(j=>`<i style="width:${pr[j]*100}%;background:${col(j)}"></i>`).join('')}</div></td></tr>`;}).join('');
  $('tbody').querySelectorAll('tr').forEach(tr=>tr.addEventListener('click',()=>{sel=+tr.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));
}
// government formation: the reader's choice only applies in a hung parliament (no party on 76 in the central forecast)
function formOK(){return null;const f=S.form,c=R&&R.likeCount;if(!f||f.pm==null||f.pm<0||!c)return null;if(Math.max(...c)>=76||!(c[f.pm]>0))return null;
  const part=f.arr!=='minority'&&f.part>=0&&f.part!==f.pm&&c[f.part]>0?f.part:-1;return {pm:f.pm,arr:part<0?'minority':f.arr,part,n:c[f.pm]+(part>=0?c[part]:0)};}
function govSides(){const c=R.likeCount;const F=formOK();
  {const OV=window.APP&&APP.govOv;if(OV!=null&&c[OV]>0&&!REPLAY){const opp=P.map((_,j)=>j).filter(j=>j!==OV&&j!==4).sort((a,b)=>c[b]-c[a])[0];return {gov:OV,opp,cross:P.map((_,j)=>j).filter(j=>j!==OV&&j!==opp)};}}
  if(F){const rk=P.map((_,j)=>j).filter(j=>j!==F.pm&&!(F.arr==='coalition'&&j===F.part)&&j!==4).sort((a,b)=>c[b]-c[a]);const opp=rk[0];return {gov:F.pm,opp,cross:P.map((_,j)=>j).filter(j=>j!==F.pm&&j!==opp),F};}
  const rk=P.map((_,j)=>j).sort((a,b)=>c[b]-c[a]||[0,1,3,2].indexOf(b)-[0,1,3,2].indexOf(a));const gov=rk[0],opp=rk[1];return {gov,opp,cross:P.map((_,j)=>j).filter(j=>j!==gov&&j!==opp)};}
const ANIM=!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
function tickTo(el,txt){if(!el)return;const m=/^(<?)(\d+)(%)$/.exec(txt),o=/^(<?)(\d+)(%)$/.exec(el.textContent);
  if(!ANIM||!m||!o||m[1]||o[1]){el.textContent=txt;return;}const a=+o[2],b=+m[2];if(a===b){el.textContent=txt;return;}
  const t0=performance.now(),run=now=>{const k=Math.min(1,(now-t0)/600),e=1-Math.pow(1-k,3);el.textContent=Math.round(a+(b-a)*e)+'%';if(k<1)requestAnimationFrame(run);else el.textContent=txt;};requestAnimationFrame(run);}
function chamber(){
  // fixed chamber of 150 places: the Speaker plus 149 seats laid along one path (government bench left to right,
  // round the curve, opposition bench right to left). Government fills from its start, opposition from its end,
  // crossbench in between, so the government can roll round the curve and the places never move.
  const {gov,opp,cross}=govSides(), c=R.likeCount.slice(), sz=11, st=14.5, gap=26, rows=5, cols=8, ARC=[8,11,14,17,19];
  const govN=c[gov]-1, oppN=c[opp], crossSeats=[]; cross.forEach(j=>{for(let k=0;k<c[j];k++) crossSeats.push(j);});
  const x0=58, benchEnd=x0+cols*st+Math.floor((cols-1)/4)*5, cx=benchEnd+4, cy=gap+rows*st+30;
  const colX=k=>x0+k*st+Math.floor(k/4)*5;
  const path=[];
  for(let k=0;k<cols;k++)for(let r=0;r<rows;r++)path.push([colX(k),cy+gap+r*st]);
  const arc=[];ARC.forEach((n,r)=>{const rad=gap+sz/2+r*st;for(let i=0;i<n;i++){const t=(i+0.5)/n*Math.PI;arc.push([cx+rad*Math.sin(t)-sz/2,cy+rad*Math.cos(t)-sz/2,t,r]);}});
  arc.sort((a,b)=>a[2]-b[2]||a[3]-b[3]).forEach(p=>path.push(p));
  for(let k=cols-1;k>=0;k--)for(let r=0;r<rows;r++)path.push([colX(k),cy-gap-sz-r*st]);
  const sq=[], fills=[]; const put=(p,j)=>{sq.push(`<rect class="chs" x="${p[0].toFixed(1)}" y="${p[1].toFixed(1)}" width="${sz}" height="${sz}" rx="2"/>`);fills.push(j<0?(REPLAY?'url(#chhatch)':'var(--empty)'):col(j));};
  put([18,cy-sz/2],c[gov]>0?gov:-1);   // the Speaker comes from the governing side
  const fill=new Array(path.length).fill(-1);
  for(let k=0;k<govN&&k<path.length;k++)fill[k]=gov;
  for(let k=0;k<oppN;k++){const q=path.length-1-k;if(q>=0&&fill[q]<0)fill[q]=opp;}
  {const F=formOK(),pt=F?F.part:-2;crossSeats.sort((a,b)=>(b===pt)-(a===pt)||ORD.indexOf(a)-ORD.indexOf(b));}
  let q=govN; crossSeats.forEach(j=>{while(q<path.length&&fill[q]>=0)q++; if(q<path.length)fill[q++]=j;});
  path.forEach((p,k)=>put(p,fill[k]));
  // who sits where: frontbenchers along the front row nearest the Speaker and the table (leaders first), backbenchers behind by state
  const seatAt=new Array(path.length+1).fill(-1);
  {const NB=40,PL=path.length,STO=['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];
   const posPri=(q,j)=>{if(q<NB)return (q%5)*100+Math.floor(q/5);if(q>=PL-NB){const o=q-(PL-NB);return (o%5)*100+(cols-1-Math.floor(o/5));}return 1000+(j===opp?PL-q:q);};
   const LDRS=new Set(Object.values(S.ldr||{}));
   // who leads in the House when the party leader is not there (a senator, or lost their seat): deputies and the party's senior MP
   const HDEP=new Set(['Richard Marles','Andrew Hastie','Barnaby Joyce','Darren Chester','Allegra Spender','Bob Katter','Rebekha Sharkie','Elizabeth Watson-Brown']);
   const rankOf=i=>{const s=D.seats[i],mn=HELDBY[s.n]||s.mem||'',holds=R.likely[i]===gOf(s);
     if(holds){if(LDRS.has(mn))return -1;if(HDEP.has(mn))return -0.5;let k=CABINET.findIndex(r=>r[0]===mn);if(k>=0)return k;k=SHADOW.findIndex(r=>r[0]===mn);if(k>=0)return k;}
     return 100+STO.indexOf(s.st)*200+(holds?0:100);};
   const done=i=>!REPLAY||REPLAY.done.has(i);
   const mine=j=>D.seats.map((_,i)=>i).filter(i=>R.likely[i]===j&&done(i)).sort((a,b)=>rankOf(a)-rankOf(b)||D.seats[a].n.localeCompare(D.seats[b].n));
   const groups=[...new Set(fill.filter(j=>j>=0))];
   groups.forEach(j=>{let ss=mine(j);
     if(j===gov&&ss.length){let sp=ss.findIndex(i=>D.seats[i].n==='Oxley');if(sp<0)sp=ss.length-1;seatAt[0]=ss[sp];ss.splice(sp,1);}
     const qs=fill.map((f,q)=>f===j?q:-1).filter(q=>q>=0).sort((a,b)=>posPri(a,j)-posPri(b,j));
     qs.forEach((q,k)=>{seatAt[q+1]=ss[k]!=null?ss[k]:-1;});});}
  const rowsA=ARC.length;
  const W=cx+gap+rowsA*st+10, H=cy*2;
  const lbl=(t,x,y,a)=>`<text x="${x}" y="${y}" font-size="11" fill="currentColor" font-family="var(--body)"${a?` text-anchor="${a}"`:''}>${t}</text>`;
  $('chamber').setAttribute('viewBox',`0 0 ${Math.max(W,300).toFixed(0)} ${H.toFixed(0)}`);
  const ch=$('chamber');
  if(!ch.querySelector('#chseats')){ch.innerHTML=`<defs><pattern id="chhatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="4" height="4" style="fill:var(--empty)"/><line x1="0" y1="0" x2="0" y2="4" style="stroke:var(--muted);stroke-width:1.6;stroke-opacity:.45"/></pattern></defs><g id="chseats">${sq.join('')}</g><g id="chlab"></g>`;}
  const rects=ch.querySelectorAll('#chseats rect'), prev=ch._fills||[];
  rects.forEach((el,k)=>{el.dataset.i=seatAt[k];});
  if(!ch._wired){ch._wired=1;const hide=()=>{$('chtip').hidden=true;};
    ch.addEventListener('pointermove',e=>{const el=e.target,i=el.dataset?+el.dataset.i:-1;if(el.tagName==='rect'&&i>=0)showTip(i,e.clientX,e.clientY,'chtip','chwrap');else hide();});
    ch.addEventListener('pointerleave',hide);
    ch.addEventListener('click',e=>{const el=e.target,i=el.dataset?+el.dataset.i:-1;if(el.tagName==='rect'&&i>=0){sel=i;render();if(e.pointerType!=='mouse'){showTip(i,e.clientX,e.clientY,'chtip','chwrap');clearTimeout(window._ct);window._ct=setTimeout(hide,2500);}}});}
  rects.forEach((el,k)=>{const f=fills[k];if(prev[k]!==f){el.style.transitionDelay=(ANIM&&prev.length?Math.min(k*4,500):0)+'ms';el.style.fill=f;}});
  ch._fills=fills;
  ch.querySelector('#chlab').innerHTML=lbl('Speaker',23,cy+22,'middle')
    +lbl(c[gov]>0?'Government: '+P[gov].n+' '+c[gov]:'Government',x0,cy+gap+rows*st+14)+lbl(c[opp]>0?'Opposition: '+P[opp].n+' '+c[opp]:'Opposition',x0,cy-gap-rows*st-6)
    +lbl('Crossbench '+crossSeats.length,cx+gap+rowsA*st+6,cy+4,'start');
  $('chamber').setAttribute('viewBox',`0 0 ${(cx+gap+rowsA*st+86).toFixed(0)} ${H.toFixed(0)}`);
  $('chamber').setAttribute('aria-label',`House of Representatives seating chart: ${P.map((_,j)=>[c[j],j]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).map(([v,j])=>P[j].n+' '+v).join(', ')}. Government: ${P[gov].n}; Opposition: ${P[opp].n}.`);
  if(REPLAY){const n=c.reduce((x,y)=>x+y,0);$('chamcap').textContent=`Live count: ${n} of 150 seats called`;$('lede').textContent=n===0?'Polls have closed. The count begins':c[gov]>=76?`${P[gov].n} wins: ${c[gov]} seats and counting`:`${P[gov].n} leads: ${c[gov]} of ${n} seats called`;return;}
  $('chamcap').textContent=(c[gov]>=76?P[gov].n+' majority':'No party reaches 76')+' in the central forecast';
  {const n=P[gov].n, s=c[gov], o=P[opp].n, so=c[opp];
   $('lede').textContent = s>=100 ? `${n} landslide: ${s} of 150 seats`
     : s>=76 ? (gov===0 ? `Labor returned with ${s} seats` : `${n} sweeps to power with ${s} seats`)
     : s>=70 ? `Hung parliament: ${n} ${76-s} short of a majority on ${s}`
     : `Hung parliament: ${n} largest on ${s}, ${o} ${so}, crossbench holds the balance`;}
}
function hexPts(x,y,r){let p='';for(let i=0;i<6;i++){const a=Math.PI/180*(60*i-30);p+=(x+r*Math.cos(a)).toFixed(1)+','+(y+r*Math.sin(a)).toFixed(1)+' ';}return p;}
let VB=null, mapBuilt=false;
function showTip(i,x,y,tid,bid){const tip=$(tid||'maptip'),s=D.seats[i],w=R.likely[i],box=$(bid||'map').getBoundingClientRect();
  const extra=MM==='win'?'':MM==='tswing'?`<br>Two-party swing: <b>${(()=>{const v=mapVal(i);return (v>=0?'+':'−')+Math.abs(v).toFixed(1)+' to '+(v>=0?'Labor':'the Coalition');})()}</b> (2025: Labor ${(s.b2*100).toFixed(1)})`:MM==='chance'?`<br>${P[MP].n}: ${pct(R.prob[i][MP])} chance`:MM==='share'?`<br>${P[MP].n}: ${mapVal(i).toFixed(1)}% first preferences`:`<br>${P[MP].n}: ${(mapVal(i)>0?'+':'')+mapVal(i).toFixed(1)} pts since 2025`;
  const mn=HELDBY[s.n]||s.mem||'', mp=phOf(mn);
  const tv=TPPS?TPPS[i]*100:null, tn=g=>g===1&&SPLIT?'Liberal–National':P[g].n;
  const M=seatMargin(i), wv=M?50+M.m:null, b=R.base[i];
  const tpl=!M?'':`<div class="ttpp"><div class="ttl">Forecast two-candidate preferred</div><div class="tbar"><span style="width:${wv.toFixed(1)}%;background:${mapCol(s,M.w,b)}"></span><span style="width:${(100-wv).toFixed(1)}%;background:${mapCol(s,M.r,b)}"></span></div><div class="tnum"><span><b style="color:${mapCol(s,M.w,b)}">${wv.toFixed(1)}</b> ${mapName(s,M.w,b)}</span><span>${mapName(s,M.r,b)} <b style="color:${mapCol(s,M.r,b)}">${(100-wv).toFixed(1)}</b></span></div></div>`;
  const ini=mn.replace(/'/g,'').split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2);
  // a named candidate (e.g. a former leader running here): shown under the sitting member, with a badge if they win
  const nc=(S.cand||{})[s.n],ncH=nc&&nc.n?(()=>{const pic=phOf(nc.n),won=w===nc.g||(nc.g===1&&(w===1||w===NATI)),pty=nc.g===1?(coaSub(s,1,null)==='NAT'?'National':s.st==='QLD'?'LNP':s.st==='NT'?'CLP':'Liberal'):P[nc.g].n;
    return `<div class="tiphead tcand"><div class="tpic" style="border-bottom-color:${mapCol(s,nc.g)}">${pic?`<img src="${pic}" alt="">`:''}</div><div>${won?'<span class="wonb">WON SEAT</span>':'<span class="status" style="margin:0">Candidate</span>'}<div>${nc.n}${FAC[nc.n]?' ('+FACN[FAC[nc.n]][0]+')':''} · <span style="color:${mapCol(s,nc.g)};font-weight:700">${pty}</span></div></div></div>`;})():'';
  tip.innerHTML=`<div class="tiphead"><div class="tpic" style="border-bottom-color:${mapCol(s,gOf(s))}">${mp?`<img src="${mp}" alt="">`:`<span>${ini||'?'}</span>`}</div><div><b>${s.n}</b><span class="status" style="margin:0">${stN(s.st)} · ${rgN(s.rg)}</span><div>${mn?mn+(FAC[mn]?' ('+FACN[FAC[mn]][0]+')':'')+' · ':''}<span style="color:${mapCol(s,gOf(s))};font-weight:700">${mapName(s,gOf(s))}</span>${SINCE[mn]?`<span class="status tsince">Member ${heldTxt(mn)}</span>`:''}</div></div></div>${ncH}<div class="tfc"><i style="background:${mapCol(s,w,R.base[i])}"></i>Forecast: <b style="display:inline">${mapName(s,w,R.base[i])}</b> ${pct(R.prob[i][w])}${MM==='tpp'?'':extra}</div>${tpl}`;
  tip.hidden=false;const tw=tip.offsetWidth,th=tip.offsetHeight;let lx=x-box.left+14,ly=y-box.top+14;if(lx+tw>box.width-4)lx=x-box.left-tw-14;if(ly+th>box.height-4)ly=y-box.top-th-14;tip.style.left=Math.max(4,lx)+'px';tip.style.top=Math.max(4,ly)+'px';}
function buildMap(){
  const svg=$('mapsvg'); const ns='http://www.w3.org/2000/svg';
  let h='';
  if(GEO.real){ // AEC boundaries: each seat drawn with its own border
    h+=GEO.qmask?`<defs><clipPath id="qclip"><path d="${GEO.qmask}"/></clipPath></defs>`:'';
    const qc=n=>(GEO.qseats||[]).includes(n)?' clip-path="url(#qclip)"':'';
    h+='<g id="cellsg">'+D.seats.map((s,i)=>`<path class="cell rcell" data-i="${i}"${qc(s.n)} d="${GEO.cells[s.n].d}"><title>${s.n}</title></path>`).join('')+'<g id="selg"></g></g>';
  } else {
    const landD=GEO.land.join(' ');
    h+=`<defs><clipPath id="landclip"><path d="${landD}"/></clipPath></defs><path class="land" d="${landD}"/>`;
    h+='<g clip-path="url(#landclip)">'+D.seats.map((s,i)=>`<path class="cell" data-i="${i}" d="${GEO.cells[s.n].d}"><title>${s.n}</title></path>`).join('');
    h+=`<path class="bord" d="${GEO.borders||''}"/><g id="selg"></g></g>`;
    h+=(GEO.water||[]).map(d=>`<path class="water" d="${d}"/>`).join('');
    h+=`<path class="coast" d="${landD}"/>`;
  }
  if(GEO.hex){h=h.replace('<g id="selg"></g></g>',`<path class="hbord" d="${GEO.hbord}"/><g id="selg"></g></g>`);
    h+='<g id="hexst" aria-hidden="true">'+Object.entries(GEO.lab).map(([k,[x,y]])=>`<text class="hstate" x="${x}" y="${y}">${k}</text>`).join('')+'</g>';}
  h+='<g id="maplabs">'+D.seats.map((s,i)=>{const c=GEO.cells[s.n];return `<text class="mlab" data-i="${i}" x="${c.c[0]}" y="${c.c[1]}">${s.n}</text>`;}).join('')+'</g>';
  svg.innerHTML=h; svg.classList.toggle('hexmode',!!GEO.hex); VB=[0,0,GEO.w,GEO.h]; setVB(); mapBuilt=true;
  if(buildMap.wired){buildChips();return;} buildMap.wired=true;
  // pan and zoom
  const pts=new Map(); let moved=0, start=null;
  const scale=()=>svg.clientWidth/VB[2];
  const toSvg=(cx,cy)=>{const r=svg.getBoundingClientRect();return [VB[0]+(cx-r.left)/scale(),VB[1]+(cy-r.top)/scale()];};
  const zoomAt=(f,cx,cy)=>{const [x,y]=toSvg(cx,cy);const nw=Math.min(GEO.w*1.05,Math.max(GEO.w/60,VB[2]/f));const k=nw/VB[2];VB=[x-(x-VB[0])*k,y-(y-VB[1])*k,nw,VB[3]*k];setVB();};
  svg.addEventListener('wheel',e=>{e.preventDefault();zoomAt(e.deltaY<0?1.25:0.8,e.clientX,e.clientY);},{passive:false});
  svg.addEventListener('pointerdown',e=>{svg.setPointerCapture(e.pointerId);pts.set(e.pointerId,[e.clientX,e.clientY]);moved=0;start=[e.clientX,e.clientY];});
  svg.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;const prev=pts.get(e.pointerId);
    if(pts.size===1){const dx=e.clientX-prev[0],dy=e.clientY-prev[1];moved+=Math.abs(dx)+Math.abs(dy);VB[0]-=dx/scale();VB[1]-=dy/scale();setVB();}
    else if(pts.size===2){const [o]=[...pts.entries()].filter(([k])=>k!==e.pointerId);const d0=Math.hypot(prev[0]-o[1][0],prev[1]-o[1][1]),d1=Math.hypot(e.clientX-o[1][0],e.clientY-o[1][1]);
      if(d0>0) zoomAt(d1/d0,(e.clientX+o[1][0])/2,(e.clientY+o[1][1])/2); moved+=10;}
    pts.set(e.pointerId,[e.clientX,e.clientY]);});
  const end=e=>{if(pts.has(e.pointerId)&&pts.size===1&&moved<6){const el=document.elementFromPoint(e.clientX,e.clientY);const i=el&&el.dataset?el.dataset.i:null;if(REPLAY&&!(window.APP&&APP.noWhatIf)&&i!=null&&el.classList.contains('cell')){whatIf(+i,e.clientX,e.clientY);pts.delete(e.pointerId);return;}if(i!=null&&i!==undefined&&el.classList.contains('cell')&&sel===+i){sel=null;$('maptip').hidden=true;render();}else if(i!=null&&i!==undefined&&el.classList.contains('cell')){sel=+i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});if(e.pointerType!=='mouse'){showTip(sel,e.clientX,e.clientY);clearTimeout(window._tt);window._tt=setTimeout(()=>$('maptip').hidden=true,2500);}}}pts.delete(e.pointerId);};
  svg.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||pts.size)return;const el=e.target;if(el.classList&&el.classList.contains('cell'))showTip(+el.dataset.i,e.clientX,e.clientY);else $('maptip').hidden=true;});
  svg.addEventListener('pointerleave',()=>{$('maptip').hidden=true;});
  $('mparty').innerHTML=[0,1,2,3,4,...MINOR].filter(j=>DATA.prim25[j]>0).map(j=>`<option value="${j}">${P[j].n}</option>`).join('');$('mparty').value=MP;
  $('mmode').addEventListener('change',e=>{MM=e.target.value;drawMap();});$('mparty').addEventListener('change',e=>{MP=+e.target.value;drawMap();});
  svg.addEventListener('pointerup',end); svg.addEventListener('pointercancel',e=>pts.delete(e.pointerId));
  svg.addEventListener('dblclick',e=>zoomAt(2,e.clientX,e.clientY));
  $('zin').addEventListener('click',()=>{const r=svg.getBoundingClientRect();zoomAt(1.6,r.left+r.width/2,r.top+r.height/2);});
  $('zout').addEventListener('click',()=>{const r=svg.getBoundingClientRect();zoomAt(1/1.6,r.left+r.width/2,r.top+r.height/2);});
  buildChips();
}
function buildChips(){const svg=$('mapsvg');
  $('mapviews').innerHTML=['Australia',...Object.keys(GEO.views)].map(v=>`<button type="button" class="chip" data-v="${v}">${v}</button>`).join('');
  $('mapviews').querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{const v=b.dataset.v;VB=v==='Australia'?[0,0,GEO.w,GEO.h]:GEO.views[v].slice();
    const asp=svg.clientHeight/svg.clientWidth||GEO.h/GEO.w; const cxv=VB[0]+VB[2]/2, cyv=VB[1]+VB[3]/2; if(VB[3]/VB[2]<asp){VB[3]=VB[2]*asp;}else{VB[2]=VB[3]/asp;} VB[0]=cxv-VB[2]/2; VB[1]=cyv-VB[3]/2; setVB();}));
  // regional quick links: the box around a group of seats, padded and fitted to the map's shape
  const fit=box=>{const asp=svg.clientHeight/svg.clientWidth||GEO.h/GEO.w;let [x0,y0,w,h]=box;const pad=0.08;x0-=w*pad;y0-=h*pad;w*=1+2*pad;h*=1+2*pad;
    const cxv=x0+w/2,cyv=y0+h/2;if(h/w<asp)h=w*asp;else w=h/asp;VB=[cxv-w/2,cyv-h/2,w,h];setVB();};
  const boxOf=names=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;names.forEach(n=>{const i=D.seats.findIndex(s=>s.n===n);if(i<0)return;const b=svg.querySelector(`.cell[data-i="${i}"]`).getBBox();x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);});return [x0,y0,x1-x0,y1-y0];};
  const regs=Object.entries(REGIONS).filter(([,ns])=>ns.some(n=>GEO.cells[n]));
  $('mapregions').innerHTML='<span class="fig">Regions</span>'+regs.map(([r])=>`<button type="button" class="chip" data-r="${r}">${r}</button>`).join('');
  $('mapregions').querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>fit(boxOf(REGIONS[b.dataset.r]))));
  MAPZOOM=(name)=>{let [x,y,w,h]=boxOf([name]);const m=Math.max(w,h,GEO.w*(GEO.hex?0.3:0.05));fit([x+w/2-m/2,y+h/2-m/2,m,m]);};
  // atlas-style inset maps of the four biggest cities (they mirror the main map's colours)
  const INS=['Sydney','Melbourne','Brisbane','Perth'].filter(c=>GEO.views[c]);
  $('insets').innerHTML=INS.map(c=>{const v=GEO.views[c];return `<button type="button" class="inset" data-v="${c}" aria-label="Zoom the map to ${c}"><svg viewBox="${v.map(n=>n.toFixed(2)).join(' ')}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><use href="#cellsg"/></svg><span>${c}</span></button>`;}).join('');
  $('insets').querySelectorAll('.inset').forEach(b=>b.addEventListener('click',()=>{const v=GEO.views[b.dataset.v];fit([v[0]+v[2]*0.08,v[1]+v[3]*0.08,v[2]*0.84,v[3]*0.84]);$('h-map').scrollIntoView({behavior:'smooth',block:'start'});}));
}
let MAPZOOM=null;
const REGIONS={'Western Sydney':['Blaxland','Chifley','Fowler','Greenway','Lindsay','Macarthur','McMahon','Parramatta','Werriwa','Mitchell'],
  'Central Coast and Hunter':['Robertson','Dobell','Shortland','Newcastle','Paterson','Hunter'],
  'Outer Melbourne':['Hawke','Lalor','Gorton','Fraser','Calwell','Scullin','McEwen','Holt','Bruce','La Trobe','Casey','Dunkley','Aston'],
  'Geelong and the Surf Coast':['Corio','Corangamite'],
  'South-east Queensland':['Brisbane','Griffith','Ryan','Lilley','Dickson','Petrie','Longman','Fisher','Fairfax','Bonner','Bowman','Forde','Rankin','Oxley','Moreton','Blair','Fadden','Moncrieff','McPherson','Wright'],
  'Perth outer suburbs':['Hasluck','Bullwinkel','Canning','Pearce','Burt'],
  'Tasmania':['Bass','Braddon','Clark','Franklin','Lyons']};
function setVB(){
  const svg=$('mapsvg'); svg.setAttribute('viewBox',VB.map(v=>v.toFixed(2)).join(' '));
  const sc=(svg.clientWidth||800)/VB[2];
  svg.style.setProperty('--fs',(11/sc).toFixed(3)+'px'); svg.style.setProperty('--sw',(1/sc).toFixed(3)+'px');
  svg.querySelectorAll('.mlab').forEach(t=>{const n=D.seats[+t.dataset.i].n,c=GEO.cells[n];
    if(GEO.hex){const full=c.w*sc>n.length*6.2*Math.min(1.6,Math.max(1,sc*0.9));const ab=n.replace(/^(Mc|Mac)/,'$1').slice(0,3);t.textContent=full?n:ab;t.style.display=c.w*sc>22?'':'none';}
    else t.style.display=c.w*sc>Math.max(30,n.length*6.2)?'':'none';});
  svg.classList.toggle('zoomed',VB[2]<GEO.w*0.98);
}
const grpV=(v,s)=>{const g=new Array(NG).fill(0),cg=s?cgFor(s):DATA.colG;v.forEach((x,j)=>g[cg[j]]+=x);return g;};
let MM='win', MP=3, TSW=null;
function mapVal(i){const s=D.seats[i];
  if(MM==='tpp')return seatMargin(i).m;
  if(MM==='tswing'){if(!TSW)TSW=tppSeats(0,1);return TSW[i]*100-s.b2*100;}
  if(MM==='chance')return R.prob[i][MP];
  if(MM==='share')return grpV(R.base[i],s)[MP];
  if(MM==='swing')return grpV(R.base[i],s)[MP]-grpV(s.b,s)[MP];
  return null;}
// diagonal hatching for seats still counting (party colour = who leads) or not yet reporting (grey)
function hatch(c,blank){const svg=$('mapsvg');let d=svg.querySelector('#hatchdefs');if(!d){d=document.createElementNS('http://www.w3.org/2000/svg','defs');d.id='hatchdefs';svg.prepend(d);}
  const id='hp'+[...(c+(blank?'b':''))].reduce((a,ch)=>(a*31+ch.charCodeAt(0))>>>0,7).toString(36),sz=(6*VB[2]/GEO.w).toFixed(3);
  let pt=d.querySelector('#'+id);if(!pt){pt=document.createElementNS('http://www.w3.org/2000/svg','pattern');pt.id=id;pt.setAttribute('patternUnits','userSpaceOnUse');pt.setAttribute('patternTransform','rotate(45)');
    pt.innerHTML=`<rect width="10" height="10" style="fill:${blank?'var(--empty)':c};fill-opacity:${blank?1:0.28}"/><line x1="0" y1="0" x2="0" y2="10" style="stroke:${c};stroke-opacity:${blank?0.35:1}"/>`;d.appendChild(pt);}
  if(pt.getAttribute('width')!==sz){pt.setAttribute('width',sz);pt.setAttribute('height',sz);const r=pt.querySelector('rect');r.setAttribute('width',sz);r.setAttribute('height',sz);const l=pt.querySelector('line');l.setAttribute('y2',sz);l.style.strokeWidth=(sz*0.45).toFixed(3);}
  return `url(#${id})`;}
function drawMap(){
  if(!mapBuilt) buildMap();
  TPPT=tppTeams(); TPPS=tppSeats(TPPT[0],TPPT[1]); TSW=null;
  const vals=D.seats.map((_,i)=>mapVal(i)), mx=MM==='win'?1:Math.max(1e-9,...vals.map(v=>Math.abs(v)));
  $('mapsvg').querySelectorAll('.cell').forEach(e=>{const i=+e.dataset.i;
    if(REPLAY&&!REPLAY.done.has(i)){const l=REPLAY.lead.get(i);e.style.fill=hatch(l==null?'var(--muted)':mapCol(D.seats[i],l,R.base[i]),l==null);e.style.fillOpacity='1';}
    else if(MM==='win'||REPLAY){const w=R.likely[i],p=R.prob[i][w];e.style.fill=mapCol(D.seats[i],w,R.base[i]);e.style.fillOpacity=REPLAY?'1':(0.3+0.7*p).toFixed(2);}
    else if(MM==='tswing'){const v=vals[i];e.style.fill=v>=0?col(0):col(1);e.style.fillOpacity=(0.08+0.92*Math.min(1,Math.abs(v)/15)).toFixed(2);}
    else if(MM==='tpp'){const M=seatMargin(i),v=vals[i];e.style.fill=M?mapCol(D.seats[i],M.w,R.base[i]):'var(--empty)';e.style.fillOpacity=(0.12+0.88*Math.min(1,v/15)).toFixed(2);}
    else{const v=vals[i],k=MM==='chance'?v:Math.abs(v)/mx;e.style.fill=MM==='swing'&&v<0?'var(--muted)':col(MP);e.style.fillOpacity=(0.06+0.94*k).toFixed(2);}
    e.classList.toggle('sel',sel===i);});
  $('mparty').hidden=MM==='win'||MM==='tpp'||MM==='tswing';
  const tn=g=>g===1&&SPLIT?'Liberal–National':P[g].n;
  const ckey=' <span class="ckey">'+['LIB','NAT','LNP','CLP'].map(k=>`<span><i style="background:${COASUB[k][1]}"></i>${COASUB[k][0]}</span>`).join('')+'</span>';
  $('mapkey').innerHTML=MM==='tswing'?`Swing in the Labor v Coalition two-party vote since 2025, seat by seat. Red = towards Labor, blue = towards the Coalition; solid = 15+ points. National swing: ${(()=>{let v=0,W=0;D.seats.forEach((s,i)=>{v+=(mapVal(i))*s.fv;W+=s.fv;});v/=W;return (v>=0?'+':'−')+Math.abs(v).toFixed(1)+' to '+(v>=0?'Labor':'the Coalition');})()}.`:MM==='tpp'?`Forecast two-candidate preferred in each seat: the likely winner against the likely runner-up. Colour = who leads; solid = 15+ points clear, pale = close to 50–50.${ckey}`:MM==='win'?'Colour = most likely winner; paler = less certain. The Coalition is shown by state party:'+ckey:MM==='chance'?`Darker = higher chance ${P[MP].n} wins the seat (pale = near 0%, solid = 100%).`
    :MM==='share'?`Darker = higher ${P[MP].n} first-preference vote (solid = ${mx.toFixed(1)}%, the highest seat).`
    :`Coloured = ${P[MP].n} up since 2025, grey = down; darker = bigger change (solid = ${mx.toFixed(1)} points).`;
  {const g=$('selg'); if(g) g.innerHTML=sel!=null&&sel>=0?`<path class="selo"${(GEO.qseats||[]).includes(D.seats[sel].n)?' clip-path="url(#qclip)"':''} d="${GEO.cells[D.seats[sel].n].d}"/>`:'';}
}
const fmt1=v=>(v*100).toFixed(1);
function natCentral(){const t=new Array(NG).fill(0);let W=0;D.seats.forEach((s,i)=>{const b=R.base[i],cg=cgFor(s);W+=s.fv;b.forEach((v,j)=>t[cg[j]]+=v*s.fv);});return t.map(v=>v/W/100);}
// did Matt Canavan win Capricornia? (he runs there for the Nationals/LNP)
function canCap(){const i=D.seats.findIndex(x=>x.n==='Capricornia');if(i<0)return true;const w=R.likely[i];return w===1||w===NATI;}
function article(){
  const nat=natCentral(), c=R.likeCount, order=ORD.slice().filter(j=>j<5||R.dist[j].p95>0||c[j]>0).sort((a,b)=>REPLAY?(c[b]-c[a]||DATA.current[b]-DATA.current[a]):(R.dist[b].med-R.dist[a].med||c[b]-c[a]||b-a));
  const ord2=order.filter(j=>j!==4).concat([4]); const top=ord2.slice(0,3), rest=ord2.slice(3), rows3=[];for(let k=0;k<rest.length;k+=3)rows3.push(rest.slice(k,k+3));
  const ld=j=>({0:S.ldr['Labor'],1:S.ldr['Coalition'],2:S.ldr['Greens'],3:S.ldr['One Nation'],[NATI]:S.ldr['Nationals'],[GI('CSA')]:S.ldr['Community Strong']!=='No formal leader'?S.ldr['Community Strong']:null,[GI('KAP')]:S.ldr["Katter's Australian"]}[j]||(LEAD[P[j].ab]||{n:'—'}).n);
  const noL=j=>j>=4&&LEAD[P[j].ab]&&LEAD[P[j].ab].na&&!(P[j].ab==='CSA'&&S.ldr['Community Strong']&&S.ldr['Community Strong']!=='No formal leader');
  const lseat=j=>{if(noL(j))return '<i>N/A</i>';const l=DATA.leaders.find(x=>x.name===ld(j));if(l)return l.seat;const m=LEAD[P[j].ab];return m&&m.s?m.s:'—';};
  const ini=n=>(n==='—'||n.startsWith('Collective'))?'':n.replace(/'/g,'').split(' ').map(w=>w[0]).join('').slice(0,2);
  const sg=v=>v>0?`<span class="up">▲ ${v}</span>`:v<0?`<span class="dn">▼ ${-v}</span>`:'0';
  const sw=v=>v>0?`<span class="up">▲ ${(v*100).toFixed(1)} pp</span>`:`<span class="dn">▼ ${(-v*100).toFixed(1)} pp</span>`;
  // ---- Wikipedia-style infobox (mirrors "Next Australian federal election")
  const SINCE={'Anthony Albanese':'30 May 2019','Angus Taylor':'13 February 2026','Pauline Hanson':'18 November 2014','David Shoebridge':'30 September 2026','Robbie Katter':'3 February 2020','Matt Canavan':'11 March 2026'};
  const STN={NSW:'New South Wales',Vic:'Victoria',VIC:'Victoria',Qld:'Queensland',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',Tas:'Tasmania',TAS:'Tasmania',ACT:'Australian Capital Territory',NT:'Northern Territory'};
  const CONTEST=['ALP','COA','NAT','GRN','ON','AFP','FFP','CSA'];
  const lk=(s,ti)=>wl(s,ti), na='<i>N/A</i>';
  const wSeat=j=>{if(noL(j))return na;
    if(ld(j)==='Malcolm Turnbull'){const wi=D.seats.findIndex(s=>s.n==='Wentworth'),won=wi>=0&&R.likely[wi]===j&&(!REPLAY||REPLAY.done.has(wi));const dec=!REPLAY||REPLAY.done.has(wi);
      return `${lk('Wentworth')} (NSW)<span class="ibnote" tabindex="0" aria-label="Note a">[a]<span class="ibtip" role="tooltip">Not the incumbent but stood for this seat${dec?` and ${won?'won':'lost'}`:''}.</span></span>${dec&&!won?'<br><i>(lost election)</i>':''}`;}
    const l=DATA.leaders.find(x=>x.name===ld(j));
    const LOST='<br><i>(lost re-election)</i>';
    if(l&&l.seat){const m=l.seat.match(/^Senator for (.+)$/);if(m){const sn=SENBY[l.name],F=sn?senFate(sn):null;return `${lk(STN[m[1]]||m[1])} (${lk('Senate')})${F&&!F.cont&&!F.hold?LOST:''}`;}
      const sname=l.seat.replace(/ \([^)]*\)$/,''),i=D.seats.findIndex(x=>x.n===sname),s=D.seats[i];
      return `${lk(sname)}${s?' ('+stN(s.st)+')':l.seat!==sname?l.seat.slice(sname.length):''}${s&&R.likely[i]!==j&&(!REPLAY||REPLAY.done.has(i))?(/\(candidate\)/.test(l.seat)?'<br><i>(not elected)</i>':LOST):''}`;}
    const mm=LEAD[P[j].ab];return mm&&mm.s&&!/state seat|former/.test(mm.s)?mm.s:'<i>None</i>';};
  const TODAY=new Date().toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'});
  const wSince=j=>{if(noL(j))return na;const v=ld(j);if(DATA.leaders.some(l=>l.name===v&&!l.sel))return `${TODAY}`;if(SINCE[v])return ['Anthony Albanese','Angus Taylor','David Shoebridge'].includes(v)?lk(SINCE[v],WIKI[SINCE[v]]?SINCE[v]:v):SINCE[v];
    return j<4&&DATA.leaders.some(l=>l.name===v)?`${TODAY}`:'—';};
  const wLeader=j=>{if(noL(j))return `<i>${ld(j)}</i>`;const v=ld(j);return v==='—'||v.startsWith('Collective')?`<i>${v}</i>`:lk(v);};
  const wNeed=j=>{const cur=DATA.current[j];if(!CONTEST.includes(P[j].ab))return na;return cur>=76?'<span class="need0">–</span>':`<span class="up">▲ ${76-cur}</span>`;};
  const wLast=j=>P[j].ab==='CSA'?'<i>Did not exist</i>':DATA.last[j]+(DATA.last[j]===1?' seat':' seats');
  // Albanese's photo follows Labor's projected seats (85+ cheerful, under 60 grim; same for Marles); Hanson's switches when One Nation out-polls the Coalition in seats
  // Labor: happy at 85+ seats, normal at 76–84, sad without a majority. One Nation and the Liberals/Coalition: happy in government, normal in Opposition, sad otherwise
  const photoOf=j=>{const n=ld(j),GS=govSides(),pick=k=>k&&PHOTO[n+k]?PHOTO[n+k]:null;
    if(MOODPICS&&j===0&&(n==='Anthony Albanese'||n==='Richard Marles')){const r=pick(c[0]>=85?'|good':c[0]<76?'|bad':'');if(r)return r;}
    if(MOODPICS&&((j===1&&n==='Angus Taylor')||(j===3&&n==='Pauline Hanson'))){const r=pick(GS.gov===j?'|good':GS.opp===j?'':'|bad');if(r)return r;}
    return PHOTO[n]||PHOTO[P[j].ab]||(noL(j)?null:phOf(n));};
  const pic=j=>j===4?`<div class="portrait ind" aria-hidden="true"><span class="indtxt">IND</span></div>`
    :photoOf(j)?`<div class="portrait"><img src="${photoOf(j)}" alt="${noL(j)?P[j].full:ld(j)}"></div>`
    :`<div class="portrait ind" aria-hidden="true" style="background:color-mix(in srgb,${col(j)} 18%,#f4f4f2)"><span class="indtxt" style="color:${col(j)}">${P[j].ab.replace('XEN','CA')}</span></div>`;
  const ROWS=[['Leader',wLeader],['Party',j=>lk(P[j].n)],['Leader since',wSince],["Leader's seat",wSeat],['Last election',wLast],['Current seats',j=>DATA.current[j]],
    ['Seats won',j=>`<b>${c[j]}</b>`,'proj'],REPLAY?['Leading',j=>{let n=0;REPLAY.lead.forEach(v=>{if(v===j)n++;});return n||'–';}]:['Seat change',j=>sg(c[j]-DATA.current[j])],['Projected vote',j=>fmt1(nat[j])+'%'],['Swing',j=>sw(nat[j]-DATA.prim25[j])]];
  const block=cols0=>{const cols=cols0.concat(new Array(3-cols0.length).fill(-1));const cell=(j,f)=>j<0?'<td class="ibpad"></td>':f(j);return `<tr><td colspan="2" class="ibwrap"><div class="ibscroll"><table class="ibblk"><tbody>
    <tr class="ibpic"><th class="rl"></th>${cols.map(j=>cell(j,j=>`<td>${pic(j)}</td>`)).join('')}</tr>
    <tr class="ibbar"><th class="rl"></th>${cols.map(j=>cell(j,j=>`<td><i style="background:${j===4?'#a2a9b1':col(j)}"></i></td>`)).join('')}</tr>
    ${ROWS.map(([lab,f,cls])=>`<tr${cls?` class="${cls}"`:''}><th class="rl">${lab}</th>${cols.map(j=>cell(j,j=>`<td title="${lab}">${f(j)}</td>`)).join('')}</tr>`).join('')}
    </tbody></table></div></td></tr>`;};
  // columns follow the projection: most projected seats first (ties: projected vote), any party winning a seat or
  // holding one now is shown, independents always last
  const shown=P.map((_,j)=>j).filter(j=>j!==4&&(j<4||c[j]>0||DATA.current[j]>0));
  shown.sort((a,b)=>c[b]-c[a]||nat[b]-nat[a]);
  const wcols=[...shown,4], groups3=[];for(let k=0;k<wcols.length;k+=3)groups3.push(wcols.slice(k,k+3));
  const flag=`<svg class="flag" viewBox="0 0 60 30" aria-label="Flag of Australia"><rect width="60" height="30" fill="#012169"/><path d="M0,0 30,15M30,0 0,15" stroke="#fff" stroke-width="3"/><path d="M0,0 30,15M30,0 0,15" stroke="#C8102E" stroke-width="1.2"/><path d="M15,0V15M0,7.5H30" stroke="#fff" stroke-width="5"/><path d="M15,0V15M0,7.5H30" stroke="#C8102E" stroke-width="3"/>
    ${[[15,23,3.2],[45,24.5,1.7],[39,14,1.7],[45,5.5,1.7],[50.5,12,1.7],[48,17.5,0.9]].map(([x,y,r])=>{let p='';for(let k=0;k<14;k++){const a=Math.PI/7*k-Math.PI/2,rr=k%2?r*0.45:r;p+=(k?'L':'M')+(x+rr*Math.cos(a)).toFixed(2)+','+(y+rr*Math.sin(a)).toFixed(2);}return `<path d="${p}Z" fill="#fff"/>`;}).join('')}</svg>`;
  const govL=R.gov.la+R.gov.lg>=R.gov.ca+R.gov.co, rkP=P.map((_,j)=>j).sort((x,y)=>c[y]-c[x]), govP=formOK()?formOK().pm:[0,1,3].includes(rkP[0])||c[rkP[0]]<1?(govL?0:(c[3]>c[1]?3:1)):rkP[0];
  const box=`<div class="qf">
   <table class="infobox"><tbody>
    <tr><th colspan="2" class="ibtitle">${elYear()} Australian Federal Election</th></tr>
    <tr><td colspan="2">${flag}</td></tr>
    <tr class="ib-sec"><td colspan="2"><div class="ibnav">${wl('← 2025','2025 Australian federal election')}<b>${(LS&&LS.days!=null&&LS.days!==DATA.days)?`${elDate().toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})}<br>(${S.dd?'Full House and Senate: double dissolution':'House and half-Senate'})`:'On or before 20 May 2028<br>(House and half-Senate)<br>On or before 23 September 2028<br>(House)'}</b><span></span></div></td></tr>
    <tr class="ib-sec"><td colspan="2" style="text-align:left;padding-left:12px">${wl('← outgoing members','Members of the Australian House of Representatives, 2025–2028')}</td></tr>
    <tr class="ib-sec"><td colspan="2">All 150 seats in the ${lk('House of Representatives')}<br>76 seats needed for a majority<br>40 of 76 seats in the ${lk('Senate')}</td></tr>
    <tr class="ib-sec"><td colspan="2"><a href="#data" class="pollink" title="Go to the Polls and data tab">Opinion polls</a></td></tr>
    ${groups3.map(block).join('')}
    ${REPLAY?`<tr class="ib-sec"><th colspan="2" class="ibsen">Senate</th></tr><tr><td colspan="2" style="padding:10px 8px;color:#54595d"><i>The Senate count begins once the House results are in.</i></td></tr>`:(()=>{const T=R.senCentral.tot, ddm=!!S.dd, rows=S2.groups.map((_,g)=>g).filter(g=>T[g]>0||S2.before[g]>0).sort((a,b)=>T[b]-T[a]||S2.before[b]-S2.before[a]);
      return `<tr class="ib-sec ibsenrow"><th colspan="2" class="ibsen">${elYear()} Australian Senate Election</th></tr>
      <tr class="ibsenrow"><td colspan="2">${ddm?'All 76 seats':'40 of the 76 seats'} in the ${wl('Australian Senate','Australian Senate')}${ddm?' (double dissolution)':''}<br>39 seats needed for a majority</td></tr>
      <tr><td colspan="2" style="padding:10px 14px 8px"><svg class="ibsenhemi" viewBox="0 6 520 286" style="width:88%;height:auto;display:block;margin:0 auto">${senHemi(T,ddm?null:S2.cont,520,280,9.2,true)}</svg></td></tr>
      <tr><td colspan="2" style="padding:0"><table class="ibsent ibsent2"><thead><tr><th colspan="3" class="ibpty">Party</th><th>Seats<br>before</th><th>Seats<br>after</th><th>Seat<br>change</th></tr></thead><tbody>${(()=>{
        // the Coalition broken into its parties, as in the House results
        const gC=SK.indexOf('COA'),subS=x=>x.st==='QLD'?'LNP':x.st==='NT'?'CLP':x.room==='N'?'NAT':'LIB',sb={},sa={};['LIB','LNP','NAT','CLP'].forEach(k=>{sb[k]=0;sa[k]=0;});
        SENATE.filter(x=>x.k==='COA').forEach(x=>{sb[subS(x)]++;const F=senFate(x);if(F.cont||F.hold)sa[subS(x)]++;});
        S2.states.forEach((st,k)=>{const w=R.senCentral.st[k].won[gC]||0,held=SENATE.filter(x=>x.st===st&&x.k==='COA'&&!senFate(x).cont&&senFate(x).hold).length;for(let i=held;i<w;i++)sa[st==='QLD'?'LNP':st==='NT'?'CLP':'LIB']++;});
        const subs=['LIB','LNP','NAT','CLP'].filter(k=>sb[k]||sa[k]);
        return rows.map(g=>{const isC=g===gC&&subs.length>1;
          return `<tr><td class="ibsw" style="background:${scol(g)}"${isC?` rowspan="${subs.length+1}"`:''}></td><td colspan="2">${lk(S2.groups[g].n)}</td><td>${S2.before[g]}</td><td><b>${T[g]}</b></td><td>${sg(T[g]-S2.before[g])}</td></tr>`
            +(isC?subs.map(k=>`<tr class="ibsub"><td class="ibsw" style="background:${COASUB[k][1]}"></td><td>${lk(COASUB[k][0].replace(/ \(.*\)/,''))}</td><td>${sb[k]}</td><td>${sa[k]}</td><td>${sg(sa[k]-sb[k])}</td></tr>`).join(''):'');}).join('');})()}</tbody></table></td></tr>`;})()}
    <tr class="ib-sec"><td class="pm"><b>Incumbent Prime Minister</b><br>${lk('Anthony Albanese')}<br>${lk('Labor')}</td><td class="pm"><b>Projected Prime Minister</b><br>${[0,1,3].includes(govP)?lk(ld(govP)):(noL(govP)||ld(govP)==='—'||ld(govP).startsWith('Collective')?'<i>To be determined</i>':lk(ld(govP)))}<br>${lk(P[govP].n)} ${c[govP]>=76?'':`<span class="pmp">(largest party)</span>`}</td></tr>
   </tbody></table>
   </div>`;
  const lead=`<p>The <b>2028 Australian federal election</b> is expected to elect all 150 members of the House of Representatives and 40 of the 76 senators. This page simulates it ${nf(S.trials)} times from current polling. In the central forecast ${P[order[0]].n} wins ${c[order[0]]} seats, ${P[order[1]].n} ${c[order[1]]} and ${P[order[2]].n} ${c[order[2]]}. ${P[0].n} forms a majority government in ${pct(R.pA)} of simulations; ${pct(R.pH)} end in a hung parliament.</p>
   <p>One Nation's rise to about ${fmt1(nat[3])}% of the first-preference vote, from ${fmt1(DATA.prim25[3])}% in 2025, is the main source of change. It wins more seats than the Coalition in ${pct(R.gov.onOpp)} of simulations, which would make it the official opposition.</p>`;
  // ---- election-night summary (The Campaign Trail style): chosen by result, leaders and the crossbench
  const story0=REPLAY?'':(()=>{
    const GI=ab=>P.findIndex(g=>g.ab===ab), iCSA=GI('CSA'), iKAP=GI('KAP'), iXEN=GI('XEN');
    const L=ld(0), C=ld(1), O=ld(3), G=ld(2);
    // a leader who has lost their own seat is spoken of as "whoever replaces them"
    const lostE=(n,j)=>{const l=DATA.leaders.find(x=>x.name===n);if(!l||!l.seat||/Senat|Not in|state seat/.test(l.seat))return null;const sn=l.seat.replace(/ \(.*\)$/,''),i=D.seats.findIndex(x=>x.n===sn);return i>=0&&R.likely[i]!==j?sn:null;};
    const lN=(n,j)=>{const s=lostE(n,j);return s?`whoever replaces ${n} (who lost ${s}) as ${j===0?'Labor':'Liberal'} leader`:n;};
    const SHE={includes:isFem}; // pronouns follow the full FEM list + female first names
    // ---- XYZ News text (news-text.js): deterministic variant picker and token filler
    const XT=window.XYZT||{};
    const hsh=salt=>{let h=2166136261>>>0;const s0=c.join(',')+'|'+(S.preset||'')+'|'+salt;for(let i=0;i<s0.length;i++){h^=s0.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h;};
    const pk=(p,salt)=>Array.isArray(p)?(p.length?p[hsh(salt)%p.length]:''):p;
    const fillT=(t,v)=>{if(t==null)return '';v=v||{};
      const res=s1=>{let out='',i=0;while(i<s1.length){const ch=s1[i];
        if(ch==='{'&&(s1[i+1]==='?'||s1[i+1]==='#')){let d=0,j=i;for(;j<s1.length;j++){if(s1[j]==='{')d++;else if(s1[j]==='}'){d--;if(!d)break;}}
          const body=s1.slice(i+2,j),ci=body.indexOf(':'),key=body.slice(0,ci),rest=body.slice(ci+1),parts=[];let dd=0,st=0;
          for(let k=0;k<rest.length;k++){if(rest[k]==='{')dd++;else if(rest[k]==='}')dd--;else if(rest[k]==='|'&&!dd){parts.push(rest.slice(st,k));st=k+1;}}parts.push(rest.slice(st));
          const cv=v[key];out+=res(s1[i+1]==='?'?(cv?parts[0]:(parts[1]||'')):(parts[Math.max(0,Math.min(parts.length-1,cv|0))]||''));i=j+1;continue;}
        out+=ch;i++;}return out;};
      let o=res(t).replace(/\{76−(\w+)\}/g,(m,k)=>v[k]!=null?76-(+v[k]||0):m);
      o=o.replace(/\{([^{}]+)\}/g,(m,k)=>{if(k in v&&v[k]!=null)return String(v[k]);try{console.warn('XYZ News: unfilled token',k);}catch(e){}return '';});
      o=o.replace(/\b(\d+|one|One|a|A|single) ([A-Za-z-]+)\(s\)/g,(m,n0,w)=>`${n0} ${(n0==='1'||/^(one|a|single)$/i.test(n0))?w:w+'s'}`).replace(/\(s\)/g,'s');
      o=o.replace(/\b1 (seat|MP|member|senator|recount|contest)s\b/g,'1 $1');
      return o.replace(/ +([,.;:])/g,'$1').replace(/ {2,}/g,' ').replace(/\.\./g,'.').trim();};
    const pv=n=>({Leader:n,leader:n,Surname:sur(n||''),surname:sur(n||''),'his/her':his(n),'he/she':he(n),'him/her':isFem(n)?'her':'him','His/Her':cap(his(n)),'He/She':cap(he(n))});
    const he=n=>SHE.includes(n)?'she':'he', his=n=>SHE.includes(n)?'her':'his', cap=s=>s[0].toUpperCase()+s.slice(1);
    const sur=n=>n.split(' ').slice(-1)[0];
    const a=c[0], co=c[1], on=c[3], gr=c[2], csa=c[iCSA], ind=c[4];
    const nums=n=>['no','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'][n]||String(n);
    const isCoaG=g=>g===1||g===NATI;
    const on2cp=D.seats.reduce((t,_,i)=>{const M=seatMargin(i);return t+(M&&(M.w===3||M.r===3)&&!((M.w===0&&isCoaG(M.r))||(M.r===0&&isCoaG(M.w)))?1:0);},0);
    const V0=()=>({a,co,on,gr,csa,ind,nt:c[NATI]||0,'Labor leader':L,'Coalition leader':C,'ON leader':O,'Greens leader':G,'Labor surname':sur(L),'Coalition surname':sur(C),'ON name':onName,wipe:(typeof fallTxt!=='undefined'?fallTxt:'').trim(),'crossbench list':xb.length?list(xb):'the crossbench'});
    // Labor's worst state against 2025
    const STF={NSW:'New South Wales',VIC:'Victoria',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',ACT:'the ACT',NT:'the Northern Territory'};
    const loss={};D.seats.forEach((s,i)=>{const was=gOf(s)===0,now=R.likely[i]===0;loss[s.st]=(loss[s.st]||0)+(was&&!now?1:0)-(!was&&now?1:0);});
    const worst=Object.entries(loss).sort((x,y)=>y[1]-x[1])[0];
    // leader framing
    const labLead=L==='Anthony Albanese'?'Anthony Albanese':`${L}, in ${his(L)} first election since replacing Anthony Albanese,`;
    const labShort=sur(L);
    const coaNew=C!=='Angus Taylor', onNew=O!=='Pauline Hanson';
    const onName=onNew?`One Nation, without Pauline Hanson at the helm for the first time,`:`Pauline Hanson's One Nation`;
    // crossbench described by name
    const xb=[];
    if(gr>0)xb.push(gr===1?'the Greens\' lone member':`the Greens (${gr})`);
    if(csa>0)xb.push(csa===1?'Community Strong\'s sole MP':`Community Strong's ${nums(csa)} members`);
    if(ind>0)xb.push(ind===1?'one independent':`${nums(ind)} independents`);
    if(c[iKAP]>0)xb.push('Katter\'s Australian Party');
    if(c[iXEN]>0)xb.push('Centre Alliance');
    P.forEach((g,j)=>{if(j>=5&&![iCSA,iKAP,iXEN].includes(j)&&c[j]>0)xb.push(`${g.n} (${c[j]})`);});
    const list=x=>x.length<2?x.join(''):x.slice(0,-1).join(', ')+' and '+x[x.length-1];
    const falls=[];
    if(gr===0&&DATA.current[2]>0)falls.push('the Greens are wiped out of the House');
    if(csa===0&&DATA.current[iCSA]>0)falls.push('Community Strong loses both its seats in its first election');
    else if(csa===1&&DATA.current[iCSA]===2)falls.push('Community Strong is cut to a single seat');
    const fallTxt=falls.length?` ${cap(list(falls))}.`:'';
    const RIGHTL=['KAP','AFP','FFP','LTP','GRPF','AUC','ASP','CEC','IMO','GAP'];
    const nonRight=a+gr+csa+ind+c[iXEN]+P.reduce((s,g,j)=>s+(j>=5&&![iCSA,iKAP,iXEN,NATI].includes(j)&&!RIGHTL.includes(g.ab)?c[j]:0),0);
    const rightMin=P.reduce((s,g,j)=>s+(RIGHTL.includes(g.ab)?c[j]:0),0), ntS=SPLIT?(c[NATI]||0):0, rightTot=co+ntS+on+rightMin;
    const hung=c.every(v=>v<76), leftOK=nonRight>=76, rightOK=rightTot>=76, leftNeedX=76-a-gr, leftShaky=leftOK&&leftNeedX>8;
    const P1=(cond,txt)=>cond?txt:'';
    let head, body;
    const sN=n=>n+(n===1?' seat':' seats');
    const rk=P.map((_,j)=>j).sort((x,y)=>c[y]-c[x]), top=rk[0], sec=rk[1], tn=c[top], maj=tn>=76;
    const PN=j=>j===4?'the independents':j===1?'the Coalition':j===2?'the Greens':P[j].n;
    if(top===3&&maj){
      head='One Nation wins government';
      body=`The unthinkable has happened. ${onName} wins majority government in its own right with ${sN(on)}, a feat no minor party has achieved since Federation. ${(XT.ST.onGov||{})[O]||`${O} will be sworn in as Prime Minister, leading the party the major parties spent a generation trying to contain.`} ${a===0&&co===0?`Labor and the Coalition, which between them have governed Australia since 1910, are both wiped out of the House.`:a===0?`Labor is wiped out of the House altogether, and ${C}'s Coalition is reduced to ${sN(co)}.`:co===0?`The Coalition is wiped out of the House altogether, and Labor is reduced to ${sN(a)}.`:`Labor is reduced to ${sN(a)} and ${C}'s Coalition to ${sN(co)}.`}${fallTxt} Canberra, and the region, will be watching closely.`;
    } else if(top===2){
      head=maj?'The Greens win government':'The Greens top the count';
      body=maj?`The impossible has happened. The Greens, who for most of their history held a single lower-house seat, sweep to majority government with ${sN(gr)}. ${(XT.ST.grGov||{})[G]||`${G} will become the first Greens Prime Minister in Australian history, at the head of a party room full of first-time MPs.`} ${a===0&&co===0?'Labor and the Coalition are both wiped out of the House':a===0?`Labor is wiped out of the House and the Coalition reduced to a rump of ${sN(co)}`:co===0?`The Coalition is wiped out of the House and Labor reduced to a rump of ${sN(a)}`:`Labor (${a}) and the Coalition (${co}) are reduced to rumps`}, and every assumption about Australian politics goes with them.${fallTxt}`
        :`In the most extraordinary result in a generation, the Greens are the largest party in the House with ${sN(gr)}, ${76-gr} short of a majority. ${G} now has a claim on The Lodge that no Greens leader has ever had, and Labor's ${sN(a)} make it the natural partner, if the old rivals can bury the hatchet.${fallTxt}`;
    } else if(top===4||P[top].ab==='CSA'){
      const csaT=P[top].ab==='CSA';
      head=csaT?(maj?'Community Strong wins government':'Community Strong tops the count'):(maj?'Independents win a majority':'Independents top the count');
      const CL0=S.ldr['Community Strong']||'No formal leader';
      body=csaT?`Two years after Zali Steggall and Allegra Spender launched it, Community Strong Australia ${maj?'wins majority government':'becomes the largest party in the House'} with ${sN(csa)}, the first new party to ${maj?'win government':'top a federal count'} since the Liberals in 1949. `+(CL0==='No formal leader'?`A party that promised not to choose a leader until it had ten MPs now has ${tn}, and must choose a Prime Minister${maj?'':' and find partners'} by the end of the week.`
          :CL0==='Malcolm Turnbull'?`Malcolm Turnbull, dumped by his own party room in 2018, ${maj?'returns as Prime Minister':'has the first claim on The Lodge'} at the head of a party built largely from the Liberals' former heartland.`
          :`${CL0} ${maj?'will be sworn in as Prime Minister':`has the first claim on The Lodge, and the hardest negotiation of ${his(CL0)} career`}.`)+fallTxt
        :`For the first time, independents outnumber every party in the House: ${sN(ind)} won by candidates with no party, no national leader and no shared platform. ${maj?'Together they hold a majority, but no one yet knows who will lead them, or whether they can agree to.':'The Governor-General faces a question no Australian vice-regal has faced: who, if anyone, can command the confidence of the House.'}${fallTxt}`;
    } else if(top===NATI&&SPLIT){
      const NLt=S.ldr['Nationals']||'Matt Canavan',ntt=c[NATI],inSt=/Senat/.test((DATA.leaders.find(l=>l.name===NLt&&l.party==='Nationals')||{}).seat||'');
      head=maj?'Nationals win government':'Nationals top the count';
      body=`A party founded more than a century ago to represent the bush has just rewritten Australian political history. Running separately from the Liberals after tearing up the Coalition agreement, the Nationals ${maj?'win majority government in their own right':'emerge as the largest party in the House'} with ${sN(ntt)}, sweeping regional Australia and picking off outer-suburban seats left behind by the Liberals. ${NLt} ${maj?'becomes the first Nationals Prime Minister since John McEwen in 1967–68, and the first ever elected to the office in their own right':'now has a claim to The Lodge no Nationals leader has held since John McEwen in 1967, if the Liberals and crossbench can be brought to the table'}.${inSt?` There is one catch: ${sur(NLt)} sits in the Senate and will need a House seat quickly.`:''}${fallTxt}`;
    } else if(top>=5){
      head=maj?`${P[top].n} wins government`:`${P[top].n} tops the count`;
      const ld0=ld(top), led=ld0&&ld0!=='—'&&!noL(top)&&!ld0.startsWith('Collective');
      body=`Few would have believed it. ${P[top].full||P[top].n}, which won ${fmt1(DATA.prim25[top])}% of the vote in 2025, ${maj?'wins majority government':'is now the largest party in the House'} with ${sN(tn)}.${led?` ${ld0}${maj?' will be sworn in as Prime Minister':' has a genuine claim on The Lodge'}.`:''} ${PN(sec)==='the Coalition'||PN(sec)==='Labor'?cap(PN(sec)):cap(PN(sec))} ${sec===4||sec===1||sec===2?'are':'is'} next on ${sN(c[sec])}${maj?'':', and the negotiations will be like nothing Canberra has seen'}.${fallTxt}`;
    } else if(on>a&&on>co){
      head='One Nation tops the count';
      body=`${fillT(pk(XT.ST.onTop.open,'ontop'),V0())} With no party near 76, the question is no longer whether One Nation matters, but whether anyone can govern without it. A deal with ${C}'s Coalition (${co} seats) would break decades of convention; refusing one may hand ${labShort} minority government on Labor's ${a}.${fallTxt} Australia's political centre has shifted, and it will not shift back quickly.`;
    } else if(co>=76){
      const tier=co>=86?'coaLand':co>=79?'coaRet':'coaScr';
      head=co>=86?'A Coalition landslide':co>=79?'The Coalition returns':'Coalition scrapes home';
      const lab0=a===0?`For Labor it is not a defeat but an annihilation: a government that once looked unassailable leaves the House with no members at all.`:a<20?`For Labor the defeat ends a government that once looked unassailable: reduced to ${sN(a)}, it faces the long, bitter work of rebuilding from almost nothing.`:`For Labor the defeat ends a government that once looked unassailable: its ${a} seats are its lowest tally in years, and the post-mortem will be long and bitter.`;
      const end0={coaLand:`${sur(C)} arrives at The Lodge with a party room big enough to govern without looking over ${his(C)} shoulder.`,coaRet:`${sur(C)} arrives at The Lodge promising stability after one of the most volatile terms in modern memory.`,coaScr:`${sur(C)} will govern without a crossbench deal, but every absence in the House will be felt.`}[tier];
      body=`${fillT(pk(XT.ST[tier].open,tier),{...V0(),...pv(C),coaNew})} ${lab0}${fallTxt} ${end0}`;
    } else if(a>=90){
      head='A Labor landslide';
      body=`${fillT(pk(XT.ST.labLand.open,'labland'),{...V0(),...pv(L),albo:L==='Anthony Albanese'})} ${co===0?'':`For the Coalition it is a night of reckoning. Reduced to ${co} seats, ${C}'s party room faces questions about whether the Coalition can survive another term in its current form. `}${on>co?'':on===0?`${onName} is shut out of the House entirely, proof that a big poll lead can still collapse in the final week.`:`${onName} stalls at ${sN(on)}, proof that a big poll lead can still collapse in the final week.`}${fallTxt} ${labShort} returns to Canberra with a mandate few leaders have held, and the hardest job in politics: keeping it.`;
    } else if(a>=76){
      const comfy=a>=85;
      const razor=a<=77, slim=a<=80;
      head=comfy?'Labor wins comfortably':razor?'Labor scrapes home':slim?'Labor holds on':'Labor returned';
      body=`${comfy?`${labLead} wins clearly.`:razor?'It was closer than it should have been.':slim?'It was tighter than Labor hoped.':`${labLead} is returned, though not without a fight.`} Labor ${comfy?'secures':razor?'clings to':slim?'holds':'keeps'} majority government with ${a} seats${worst&&worst[1]>0?`, losing ${worst[1]} seat${worst[1]>1?'s':''} in ${STF[worst[0]]}`:''} but holding ${comfy?'firm in':slim?'just enough of':'most of'} its marginal outer-suburban seats.${comfy?'':slim?' The result is a warning as much as a win.':' The margin is workable, but the warning signs are there.'} ${fillT(pk(XT.ST.labMid,'labmid'),{x:fmt1(nat[3]),thin:comfy||!slim})}${fallTxt} ${fillT(pk(XT.ST.labEnd,'labend'),{'Labor surname':labShort}).replace(/\.$/,'')}${comfy?', with room to spare.':slim?', but every vote in the House will count.':', with a few seats to spare.'}`;
    } else if(a<60&&(co>a||on>a)){
      head='Labor routed';
      body=`${fillT(pk(XT.ST.labRout.open,'labrout'),V0())} Senior ministers lose their seats on live television${L==='Anthony Albanese'?', and the leadership will change hands within days':`, and ${L}'s gamble on a new leader has failed`}.${fallTxt} Who governs now depends on whether ${C}'s ${co} Coalition seats and ${O}'s ${on} One Nation members can find common ground: a partnership that would remake the Australian right.`;
    } else if(a>=co&&a>=on){
      const need=76-a, canXb=nonRight>=76;
      head='A hung parliament';
      body=`${fillT(pk(XT.ST.hungL.open,'hungl'),{...V0(),canXb,'crossbench list':xb.length?list(xb):'a handful of minor-party MPs'})}${fallTxt} ${canXb?`Each has a price, and integrity, climate and housing will dominate the negotiations.`:`${labShort} will need either One Nation or the Coalition to abstain to survive a confidence vote.`} ${co+on>=76?`On the other side, ${C}'s Coalition (${co}) and ${O}'s One Nation (${on}) together have the numbers for an alternative government, if they can stomach a deal.`:`The Coalition's ${co} seats leave it unable to form an alternative, while ${onNew?'One Nation':'Pauline Hanson'}'s ${on} members arrive in Canberra as the loudest opposition voice in a generation.`} The next fortnight of negotiations will decide who governs.`;
    } else {
      head='A hung parliament, the Coalition ahead';
      body=`${fillT(pk(XT.ST.hungC.open,'hungc'),V0())}${fallTxt} Whoever governs will do so with the narrowest of footholds.`;
    }
    // ---- hung parliaments where the usual arithmetic breaks down
    {const coN=SPLIT?'the Liberals and Nationals':'the Coalition', rxb=rightMin?`, plus ${nums(rightMin)} conservative crossbencher${rightMin>1?'s':''},`:'';
     const lxb=xb.filter(s=>!/Katter|Federation|Family First|Libertarian|People First|Christians|Shooters|Citizens|HEART|Great Australian/.test(s)), leftList=lxb.length?list(lxb):'the crossbench';
     if(hung&&[0,1,3].includes(top)&&!rightOK&&(!leftOK||leftShaky)){
       const grand=a+co+ntS>=76, labOn=a+on>=76, coOnX=rightTot+gr+csa+ind+c[iXEN]>=76;
       head=grand?'Deadlock: grand coalition talk':'Deadlock: no path to 76';
       body=`There is no obvious government. `+(leftOK?`Labor has ${a} seats and could reach 76 only by holding together ${gr?'the Greens and ':''}${nums(leftNeedX)} ${gr?'other ':''}crossbenchers from across the spectrum (${leftList}) on every confidence vote, a government few in Canberra think could last a year. `:`Labor has ${a} seats and even with every progressive crossbencher reaches only ${nonRight}. `)+`${cap(coN)} (${co+ntS}) and One Nation (${on})${rxb} manage just ${rightTot}. ${leftOK?'Neither side has a stable path to 76.':'Neither side can count to 76.'}`
         +(grand?' '+fillT(pk(XT.ST.grand,'grand'),{right:coN,n:a+co+ntS,'Labor leader':cap(lN(L,0)),'Coalition leader':lN(C,1)}):'')
         +(labOn&&!grand?` The only two-party combination that reaches 76 is Labor (${a}) and One Nation (${on}), a partnership neither base would forgive.`:'')
         +' '+fillT(pk(XT.ST.deadClose,'deadclose'),{wipe:fallTxt.trim(),albSur:L==='Anthony Albanese'?'Albanese':labShort});
     } else if(hung&&top===0&&!leftOK&&rightOK){
       const onLead=on>co+ntS;
       head='Labor largest, but the right has the numbers';
       body=`Labor has won the most seats and may still lose government. On ${a}, it is ${76-a} short of a majority, and even every progressive crossbencher takes it only to ${nonRight}. ${cap(coN)} (${co+ntS}) and One Nation (${on})${rxb} together hold ${rightTot}, enough to govern if they can agree who leads.`
         +(onLead?` The awkward arithmetic: One Nation is the bigger partner, so the price of a deal could be ${O} as Prime Minister, a prospect no Liberal leader has ever had to weigh.`:` ${C} would be Prime Minister, but only with One Nation at the cabinet table or a confidence-and-supply deal that hands ${O} extraordinary leverage.`)
         +`${fallTxt} Convention gives ${labShort} the first chance to test the numbers on the floor of the House. The numbers, for now, are not there.`;
     } else if(hung&&top===1&&!rightOK&&leftOK){
       head='Coalition largest, but Labor can govern';
       body=`${cap(coN)} won the most seats, ${co+ntS}, but cannot form government: even with One Nation's ${on}${rxb} the conservative side reaches only ${rightTot}. Labor, on ${a}, can get to 76 with ${leftList}, and will spend the coming days doing exactly that.${fallTxt} ${C} will claim a moral victory. ${labShort} may claim the Lodge.`;
     } else if(hung&&top===3&&!rightOK&&leftOK){
       head='One Nation largest, but locked out';
       body=`${onName} is the largest party in the House with ${sN(on)}, and may still finish in Opposition. Together with ${coN} (${co+ntS})${rxb}, the right reaches only ${rightTot}, short of 76. Labor, on ${a}, can get there with ${leftList}.${fallTxt} ${O} will argue the biggest party deserves to govern; the Constitution only cares who can command the House.`;
     }}
    // personal lines: one per leader, chosen by how their party fared
    const PERS={
      'Anthony Albanese':{mid:['Albanese has been here before: as Leader of the House he kept the Gillard minority government alive in 2010. Now he must negotiate one of his own.','Few in Canberra know the crossbench better. Albanese spent the Gillard years counting votes as Leader of the House; now every one of those skills will be tested in his own name.','The Prime Minister who promised stability now has to buy it, one crossbench vote at a time.'],good:'The kid from the Camperdown council flats has done it again. Labor\'s longest-serving member for Grayndler joins Hawke in the small club of Labor leaders who kept on winning, and the question in the corridors is no longer <i>if</i> he will be remembered, but <i>how</i>.',
        bad:'More than thirty years after first walking into Parliament, Albanese concedes in the same quiet, stubborn tone he always had. History will judge him kindly on policy. Tonight it judged him on the mood of the suburbs.'},
      'Jim Chalmers':{mid:'The Treasurer\'s spreadsheets now have a new column: the price of every crossbench vote.',good:'Wayne Swan\'s old chief of staff now holds the job his mentor never could. The Treasurer who spent years explaining inflation charts will now be judged on whether the numbers finally move.',
        bad:'The leader-in-waiting waited, then won the leadership, then lost the country. Logan stays loyal; Australia does not.'},
      'Tanya Plibersek':{mid:'Plibersek sat in Julia Gillard\'s minority cabinet. She knows exactly how hard the next three years could be.',good:'Three decades after first winning Sydney, Tanya Plibersek becomes the second woman to hold the nation\'s highest office. She will want this one to end very differently from the first.',
        bad:'Plibersek finally got her shot. It came at the worst possible moment, and the party will now debate for years whether it came too late.'},
      'Richard Marles':{mid:'Marles must now sell AUKUS to a crossbench that never much liked it.',good:'For the first time, Geelong sends a Prime Minister to Canberra. The Defence Minister who staked his career on AUKUS now commands the government that must pay for it.',
        bad:'Submarines, it turns out, do not win suburban marginals. Marles returns to Corio with his reputation intact and his ambitions in pieces.'},
      'Tony Burke':{mid:'If anyone can count to 76 on the floor of the House, it is Tony Burke. He is about to find out how many favours he is owed.',good:'Labor\'s master of the House floor proves he can work a crowd as well as a chamber. Watson\'s long-serving member walks into The Lodge with the confidence of someone who has seen every trick in the book.',
        bad:'No procedural manoeuvre could save this one. Burke, the government\'s great fixer, finds there is no standing order for a landslide.'},
      'Chris Bowen':{mid:'Bowen\'s net-zero agenda may survive after all: the crossbench is the one place it is popular.',good:'Nine years after the franking-credits campaign that haunted him, Chris Bowen gets his redemption, and a mandate for net zero he intends to use.',
        bad:'2019 all over again. For Bowen, the ghost of the "retiree tax" campaign has found a new costume, and it is wearing hi-vis.'},
      'Angus Taylor':{oppUp:'Taylor will not be Prime Minister, but he has stopped the bleeding: the Coalition gains seats, and the leader who rolled Ley has earned a second campaign.',oppDown:'Taylor promised to win back the voters drifting to One Nation. They kept drifting, and the Coalition goes backwards on his watch.',mid:'Taylor has stopped the bleeding, but not the haemorrhage. The road to The Lodge now runs through One Nation\'s party room, a door the Liberals swore they would never knock on.',good:'After rolling Sussan Ley in February 2026, the Rhodes Scholar and member for Hume pulls off the comeback nobody priced in. The Liberals have their first prime minister since Morrison, and their first reason for optimism in years.',
        bad:['Taylor took the leadership promising to stop the bleeding. Instead the patient flatlined. By morning, the knives are already being counted.',
          'Taylor rolled Sussan Ley to win back the voters drifting to One Nation. They kept drifting. The party room that installed him in February is already sounding out who comes next.',
          'The Rhodes Scholar who promised to out-argue Labor on the economy ends election night out-polled on the right. His leadership is not expected to survive the week.'],
        rump:'Taylor took the leadership promising to stop the bleeding. There is almost nothing left to bleed. With {co} seats the Coalition is a rump, and nobody is counting knives tonight: there is no leadership worth fighting over, only the long, quiet question of whether the Liberal Party has a future at all.'},
      "Clare O'Neil":{mid:'O\'Neil spent the last term as Housing Minister promising more homes. Now she has to build a majority out of crossbenchers, one brick at a time.',good:'The member for Hotham, who once wrote a book about how Australia could be a fairer, bolder country, gets to test the theory from The Lodge. Labor\'s generational change has arrived, and it has a mandate.',
        bad:'Labor gambled on a fresh face from the party\'s next generation. The suburbs had already made up their minds, and the housing crisis O\'Neil was meant to fix got there first.'},
      'Jason Clare':{good:'Jason Clare, the education minister who made a career of explaining hard things simply, turns his first campaign as leader into a majority. Western Sydney has a Prime Minister of its own.',
        mid:'Clare inherits the job of finding a crossbench majority. The man the caucus trusted to sell its policies now has to sell its survival.',
        bad:'Clare was installed because he could talk to the suburbs. Tonight the suburbs did the talking.'},
      'Anika Wells':{good:'Anika Wells, from the Brisbane seat of Lilley, wins a majority and becomes one of the youngest Prime Ministers in the nation\'s history. Queensland finally has a Labor leader to call its own.',
        mid:'Wells gets the generational change she promised and a hung parliament she did not. Her first big test is a negotiation, not a budget.',
        bad:'Labor gambled on youth and Queensland. Wells delivered neither the youth vote nor Queensland.'},
      'Mark Butler':{good:'Mark Butler, the South Australian powerbroker of the Left who rebuilt bulk-billing, takes Labor to a majority. The health minister has diagnosed the electorate correctly.',
        mid:'Butler, a creature of caucus deals, now needs deals outside it. Few in Labor are better at counting numbers; few have had so few to count.',
        bad:'The steady hand from Adelaide steadied nothing. Butler\'s Labor slides, and the Left\'s turn at the top may be brief.'},
      'Madeleine King':{good:'Madeleine King, the resources minister from Brand, delivers Labor a majority built on Western Australia. Perth has decided an election, and the West has the Prime Minister.',
        mid:'King\'s Western Australian strength gets Labor close, but not over the line. The negotiations ahead will be run on Perth time.',
        bad:'King was meant to hold the West and the regions. Labor lost both.'},
      'Ed Husic':{good:'Ed Husic, the first Muslim elected to federal Parliament, becomes the first Muslim Prime Minister. The former industry minister from Chifley wins a majority on a promise of more jobs and fewer slogans.',
        mid:'Husic, blunt and unscripted, now has to charm a crossbench. It is not the part of politics he has ever enjoyed.',
        bad:'Husic\'s plain-speaking pitch could not hold back the tide. Labor returns him to the backbench it once sent him to.'},
      'Josh Frydenberg':{good:'Josh Frydenberg, the Treasurer who lost Kooyong in 2022, wins it back and wins government in the same night. Few comebacks in Australian politics have been this complete.',
        mid:'Frydenberg is back in Kooyong and back at the centre of power. Whether he can build a majority from the crossbench is the question that will define his return.',
        bad:'The comeback could not bring the Coalition back with it. Frydenberg\'s return ends with the Liberals further from office than when he started.',
        oppUp:'Frydenberg does not win, but he wins back ground. The former Treasurer leads a bigger Coalition into opposition and, for the first time in years, a credible path back to office.',
        oppDown:'Frydenberg\'s return was meant to rescue the Liberals in the cities. The cities stayed away, and the party room is already asking whether nostalgia was a strategy.'},
      'Julian Leeser':{good:'Julian Leeser, who quit the frontbench over the Voice and came back to lead the party, wins government. The lawyer from Berowra has made principle look like good politics.',
        mid:'Leeser\'s calm, lawyerly pitch gets the Coalition into the contest. Closing the deal with the crossbench will need more than a good brief.',
        bad:'Leeser was the Liberals\' bet on decency over aggression. The voters took the decency and voted elsewhere.',
        oppUp:'Leeser does not win, but the Coalition gains seats under the most moderate leader it has had in years, and the party\'s right is quieter for it.',
        oppDown:'Leeser\'s Coalition goes backwards, and the party room that chose him for his principles will now ask about his polling.'},
      'James Paterson':{good:'James Paterson becomes the first senator to lead his party to government since John Gorton. The Victorian\'s sharp national-security pitch has carried the Coalition, and now he needs a seat in the House.',
        mid:'Paterson has the numbers to talk but no seat in the House to talk from. A by-election is the first deal he must do.',
        bad:'Leading from the Senate was always a gamble. Paterson\'s Coalition loses ground, and the party is reminded why leaders usually sit in the House.',
        oppUp:'Paterson leads a bigger Coalition into opposition from the Senate, and now the hunt begins for a safe House seat to put him in.',
        oppDown:'A Senate leader of a shrinking party: Paterson\'s experiment is unlikely to survive the summer.'},
      'Dan Tehan':{good:'Dan Tehan, the former diplomat from Wannon, wins government with a campaign built on the regions and the cost of living. The quiet Victorian has proved quiet can win.',
        mid:'Tehan gets the Coalition within reach. His diplomatic training will matter now more than it has in any portfolio he has held.',
        bad:'Tehan\'s steady-as-she-goes pitch could not hold the line. The Coalition goes backwards again.',
        oppUp:'Tehan narrows the gap. The Coalition gains seats, and the man often described as a safe pair of hands has earned another go.',
        oppDown:'Tehan was chosen to stop the slide. The slide continued, and the party room is looking around again.'},
      'Elizabeth Watson-Brown':{good:'Elizabeth Watson-Brown, the architect who took Ryan from the Liberals in 2022, becomes the first Greens leader to sit in the House. She builds the party\'s best lower-house result on the Brisbane template.',
        bad:'Watson-Brown was meant to show the Greens could win suburbs, not just inner cities. The suburbs had other ideas.'},
      'Penny Allman-Payne':{good:'Penny Allman-Payne, the Queensland senator and former teacher, takes the Greens to a record House haul. Her pitch on housing and schools reached well beyond the inner city.',
        bad:'Allman-Payne\'s focus on the regions did not stop the losses in the cities. The Greens go backwards again.'},
      'Sussan Ley':{oppUp:['Sussan Ley will not be Prime Minister, but she has done what few thought possible after the turmoil of 2026: the Coalition gains ground. A leader twice written off now has a party room with more members than she started with, and a fair claim to stay.',
          'For Sussan Ley, a loss that feels like progress. The Coalition claws back seats it was expected to lose, and the leader who was rolled and then restored has earned herself a second campaign.'],
        oppDown:['Sussan Ley was restored to the leadership to steady the ship. It took on water anyway. With the Coalition shedding seats again, the party room that brought her back must decide whether a third Liberal leader in one term is a solution or another symptom.',
          'Another election, another retreat. Sussan Ley leads a smaller Coalition back into opposition, and the questions about whether the Liberals have a path back to government are getting louder.'],
        mid:'Ley, dumped for Taylor in February 2026 and then restored, has steadied the ship enough to be in the conversation. Whether the party room lets her steer it into a deal with One Nation is another question.',good:'Rolled once, written off twice, Sussan Ley becomes the first woman to lead the Liberals into government. The member for Farrer, a former crop-duster pilot, has landed the hardest approach in Australian politics.',
        bad:'Bringing Ley back was meant to calm the moderates and stop the bleeding. It did neither. The Liberals have now lost under three different leaders in a single term.',
        rump:'Bringing Ley back was meant to stop the bleeding. Instead she leads the smallest Coalition party room in living memory: {co} seats, barely enough to staff a shadow cabinet. Three leaders in one term, and the party has run out of people to blame.'},
      "Ted O'Brien":{oppUp:'O\'Brien\'s Coalition gains seats despite the nuclear fight. Losing better is not winning, but it is a start.',oppDown:'O\'Brien leads the Coalition backwards, and the nuclear policy he championed is now the first thing on the chopping block.',mid:'O\'Brien\'s nuclear-and-cost-of-living pitch found an audience, but not quite a majority. The Sunshine Coast\'s favourite son now has to sell reactors to a crossbench.',good:'The architect of the Coalition\'s nuclear plan becomes Prime Minister on the strength of it. Ted O\'Brien, member for Fairfax, turned the policy his own colleagues called a liability into a winning argument.',
        bad:'O\'Brien made the election a referendum on nuclear power. Australia voted, and the meltdown was political.',
        rump:'O\'Brien made the election a referendum on nuclear power, and the fallout has left the Coalition with {co} seats. The party that governed for most of the past eight decades now has to decide whether it is still a party of government, or just a memory of one.'},
      'Andrew Hastie':{oppUp:'Hastie loses, but the Coalition gains ground and wins back voters from One Nation. The former SAS captain looks like a leader with a future.',oppDown:'Hastie\'s hard-edged pitch was meant to stop the drift to One Nation. The Coalition lost ground anyway.',mid:'Hastie has the numbers to try, and a One Nation party room that speaks his language more than it ever spoke any Liberal leader\'s.',good:'The former SAS captain storms to victory on a platform as uncompromising as he is. His opponents called it a gamble; tonight it looks like a strategy.',
        bad:'Hastie went hard right to stop the drift to One Nation. The voters drifted anyway, and took the moderates with them.',
        rump:'Hastie promised to rebuild the Coalition from the ground up. The ground is all that is left: {co} seats, a remnant of the party Menzies built. The question tonight is not who leads it next, but whether there is anything left to lead.'},
      'Tim Wilson':{oppUp:'Wilson wins back seats in the cities, if not the election. The Goldstein MP\'s bet on the teal heartland is starting to pay.',oppDown:'Wilson\'s city strategy lost the regions without winning the suburbs. The Coalition goes backwards.',mid:'Wilson won back the suburbs but not the country, and the price of power may be a deal with the very party his wing of the Liberals can least abide.',good:'The man the teals once beat in Goldstein now leads the party back to power. Tim Wilson\'s comeback is complete: from defeated MP to Prime Minister in six years.',
        bad:'Wilson bet the house on the city. The regions sent the bill, and it arrived in orange.',
        rump:'Wilson bet the house on the city and lost the lot. The regions went orange, the suburbs went elsewhere, and the broad church is down to {co} pews.'},
      'Pauline Hanson':{mid:'Hanson falls short of overtaking the Coalition, but with {on} seats she may hold the keys to The Lodge. For a party once dismissed as a protest vote, kingmaker is not a bad consolation prize.',good:['More than thirty years after her maiden speech shocked the nation, Pauline Hanson leads a genuine parliamentary force into Canberra. Whatever you think of her, she has rewritten Australian politics, and tonight there is no pretending otherwise.','For three decades the major parties treated One Nation as a protest to be waited out. Tonight Pauline Hanson arrives in Canberra with a party room big enough to change the way the House works.','The woman once disendorsed by the Liberals now leads one of the largest blocs in the House. Hanson spent the night quietly thanking volunteers in Ipswich; her party room will be anything but quiet.'],
        bad:'Another surge, another stall. Hanson has spent three decades proving the establishment wrong about her staying power, and right about her ceiling.'},
      'Barnaby Joyce':{mid:'Joyce spent a career negotiating with Liberals from inside the Coalition. Now he gets to do it from outside, holding most of the cards.',good:'Barnaby Joyce has led the Nationals twice, served as Deputy Prime Minister and finally walked out. Tonight he leads the insurgency that broke his old party\'s grip on the bush.',
        bad:'The great defection fizzles. Joyce holds New England, and very little else.'},
      'Malcolm Roberts':{mid:'Roberts proves One Nation can survive without Hanson on the ballot, if not yet thrive.',good:'Long cast as Hanson\'s lieutenant, Malcolm Roberts steps out of her shadow and into the history books.',
        bad:'Without the Hanson brand on the ballot, the movement proves less a party than a personality, and the personality is missing.'},
      'David Shoebridge':{good:'Barely a campaign into the job, David Shoebridge has turned a leadership transition into a breakthrough. The Greens no longer just hold the balance in the Senate; they are knocking on the door of the House.',
        bad:'A new leader, a new campaign, the same old wall. The Greens\' 2022 high tide has fully gone out.'},
      'Larissa Waters':{good:'Larissa Waters, Queensland\'s first Greens senator, leads the party to its best House result in history. Not bad for someone once forced from the Senate over dual citizenship.',
        bad:'For Waters, the night is a cruel bookend. She was there for the Greens\' rise, and she is there for its retreat.'},
      'Sarah Hanson-Young':{good:'Once the Senate\'s youngest member, Sarah Hanson-Young is now the face of the Greens\' lower-house breakthrough. Twenty years of being underestimated end tonight.',
        bad:'Hanson-Young has survived everything the Senate could throw at her. The House, it turns out, is a different beast.'},
      'Mehreen Faruqi':{good:'An engineer by training and a trailblazer by history, Mehreen Faruqi engineers the Greens\' best night ever in the lower house.',
        bad:'Faruqi fires up the base like no one else. Tonight, the base was all there was.'}};
    const CL=S.ldr['Community Strong']||'No formal leader', csaCur=DATA.current[iCSA];
    const tbIn=(()=>{const wi=D.seats.findIndex(s=>s.n==='Wentworth');return CL==='Malcolm Turnbull'&&wi>=0&&R.likely[wi]===iCSA;})();
    const CSAL={'No formal leader':{maj:n=>`Community Strong promised to do politics differently. Now it has to do government differently too: a party that refused to name a leader until it had ten MPs has ${nums(n)} of them, a majority, and no prime minister. The new party room meets on Monday with a whiteboard, a facilitator and a great many first-time MPs.`,
        min:n=>`The party that would not name a leader must now name a prime minister. Its ${nums(n)} MPs have days, not months, to decide whether one of the founders steps up, and whether the crossbench will trust a government chosen by committee.`,
        opp:n=>`Community Strong's first decision as the Opposition is an awkward one: who sits in the Opposition Leader's chair, since the party has never had a leader. Its ${nums(n)} MPs will choose one this week, many of them before they have even found their offices.`,
        good:n=>`Community Strong grows from ${nums(csaCur)} seats to ${nums(n)}. Not bad for a party that began as two independents, a shared volunteer list and a teal logo.`,
        bad:n=>`Community Strong's experiment in leaderless politics ends with ${sN(n)}. Working out who takes the blame is harder when nobody was in charge.`,
        km:n=>`Community Strong, barely two years old, has ${n===1?'a single MP':`${nums(n)} MPs`} with the government's fate in their hands. With no leader, every negotiation will be run by committee, which may be exactly how its members like it. Integrity and climate will be the price.`},
      'Monique Ryan':{maj:n=>`Monique Ryan, the paediatric neurologist who unseated Treasurer Josh Frydenberg, will be sworn in as Prime Minister, leading ${nums(n)} Community Strong MPs from Kooyong to The Lodge.`,
        min:n=>`Ryan leads the biggest party but not a majority. The Kooyong MP's first job as leader is to find ${76-n} more votes.`,
        opp:n=>`Ryan becomes Leader of the Opposition, a remarkable rise for a community independent who first won Kooyong in 2022.`,
        good:n=>`Under Ryan, Community Strong grows to ${sN(n)}. The movement that won Kooyong has gone national.`,
        bad:n=>`Ryan's Community Strong goes backwards to ${sN(n)}. Turning a local campaign into a national party is harder than it looked from Kooyong.`,
        km:n=>`Ryan, who won Kooyong as an independent, now leads a crossbench bloc of ${n===1?'one':nums(n)} that decides who governs.`},
      'Zali Steggall':{maj:n=>`Zali Steggall, the Olympic skier who ended Tony Abbott's career in Warringah in 2019, will be sworn in as Prime Minister. From slalom gates to The Lodge in under a decade.`,
        min:n=>`Steggall has the most seats but not the numbers. The barrister who beat a former prime minister now has to out-negotiate two major parties that never quite took her seriously.`,
        opp:n=>`Steggall becomes Leader of the Opposition, taking the chair once held by the man she unseated in Warringah. The independent who promised to hold governments to account now has a shadow cabinet to do it with.`,
        good:n=>`Steggall's gamble on turning a movement into a party pays off: ${sN(n)}, and a Warringah margin that now looks unassailable.`,
        bad:n=>`Steggall staked her reputation on proving independents could work as a team. Tonight the team got smaller.`,
        km:n=>`Steggall, who spent years telling the major parties what Warringah wanted, now gets to tell them what a government will cost. Her ${n===1?'vote':nums(n)+' votes'} could decide who governs.`},
      'Allegra Spender':{maj:n=>`Allegra Spender, whose grandfather Sir Percy Spender sat in Menzies' cabinet, will become Prime Minister at the head of a party built to win back exactly his kind of voter.`,
        min:n=>`Spender, a Liberal by inheritance and an independent by choice, holds the most seats and one of the weaker hands in the chamber. The economist will need every spreadsheet she owns.`,
        opp:n=>`Spender becomes Leader of the Opposition, three generations after her grandfather sat on the government benches under Menzies. The Liberals, once the family party, will be sitting behind her.`,
        good:n=>`Spender's pitch, economically dry and green at heart, finds more takers than anyone expected: ${sN(n)}.`,
        bad:n=>`Spender's business-friendly brand of independence could not travel beyond the harbour.`,
        km:n=>`Spender, the economist of the crossbench, will price every vote. Expect a tax reform package on the table before any confidence motion.`},
      'Malcolm Turnbull':{maj:n=>`It is the comeback of the century. Malcolm Turnbull, rolled by his own party room in August 2018, returns to The Lodge at the head of a party made largely of the Liberals' lost heartland. ${tbIn?'He wins back Wentworth too, the eastern-suburbs seat he held from 2004 until he quit Parliament in 2018.':'There is just one problem: he lost his own bid for Wentworth, and will need a by-election before he can sit in the House.'}`,
        min:n=>`Turnbull has the most seats and, characteristically, the most opinions about what to do with them. The man who lost the prime ministership in a party-room vote must now win it back on the floor of the House.`,
        opp:n=>`Malcolm Turnbull returns from political exile to lead the Opposition. Ten years after his own party room tore him down, he will sit across from the government at the head of ${nums(n)} MPs, while the party that removed him is reduced to ${sN(co)} and a place behind him on the crossbench. ${tbIn?'Back in Wentworth, the seat he quit in 2018, he will face the Prime Minister across the dispatch box himself.':'Having lost his own bid for Wentworth, he will lead from outside Parliament, leaving a deputy to face the Prime Minister across the dispatch box until a seat can be found.'}`,
        good:n=>`Turnbull's star power turns Community Strong from a ${csaCur}-seat curiosity into ${/^(8|11|18)$/.test(String(n))?'an':'a'} ${n}-seat force, much of it carved out of the Liberal heartland that once called him its own. ${tbIn?'He wins back Wentworth too.':'His own bid to win back Wentworth, ironically, falls short.'} Revenge, it turns out, tastes faintly of harbour water.`,
        bad:n=>`Turnbull filled the town halls but not the ballot boxes. The former prime minister's comeback tour ends with Community Strong on ${sN(n)}.`,
        km:n=>`From the crossbench, the former prime minister now holds the keys to The Lodge. Community Strong's ${nums(n)} MPs answer to a man who spent his prime ministership bargaining with the crossbench for every vote; he knows exactly what a vote is worth. Turnbull has never been known to wait quietly to be asked.`}};
    {const csaF=t=>n=>fillT(t,{...pv(CL),n:nums(n),before:nums(csaCur),co});
      const TBS={maj:tbIn?' He wins back Wentworth too, the eastern-suburbs seat he held from 2004 until he quit Parliament in 2018.':' There is just one problem: he lost his own bid for Wentworth, and will need a by-election before he can sit in the House.',
        opp:tbIn?' Back in Wentworth, the seat he quit in 2018, he will face the Prime Minister across the dispatch box himself.':' Having lost his own bid for Wentworth, he will lead from outside Parliament, leaving a deputy to face the Prime Minister across the dispatch box until a seat can be found.',
        good:(tbIn?' He wins back Wentworth too.':' His own bid to win back Wentworth, ironically, falls short.')+' Revenge, it turns out, tastes faintly of harbour water.'};
      Object.entries(XT.CSA||{}).forEach(([nm,d])=>{const tg=CSAL[nm]||(CSAL[nm]={});Object.entries(d).forEach(([k,t])=>{tg[k]=nm==='Malcolm Turnbull'&&TBS[k]?(n=>csaF(t)(n)+TBS[k]):csaF(t);});});}
    const csaL=CSAL[CL]||CSAL._;
    const csaV=top===iCSA?(maj?'maj':'min'):maj&&sec===iCSA?'opp':csa>=csaCur+3&&csa>=4?'good':csa<csaCur&&csa>0?'bad':null;
    // a rump (15 seats or fewer) gets a bleaker line than an ordinary loss; leaders without their own get a generic one
    const RUMP={L:n=>`${sur(n)} leads what is left of Labor out of the tally room: just {a} seats, a rump that could hold its caucus meeting around a single table. There will be no leadership challenge tonight, because there is barely anyone left to mount one.`,
      C:n=>`With {co} seats, the Coalition is no longer a government-in-waiting but a rump. ${sur(n)} faces no challenge tonight, only the far grimmer question of whether the Liberal Party can survive as a national force at all.`};
    const sideOf=n=>{const l=DATA.leaders.find(x=>x.name===n);const p=l?l.party:'';return p==='Labor'?'L':p==='Coalition'?'C':p==='One Nation'?'O':p==='Greens'?'G':null;};
    const XTAB={L:XT.LAB,C:XT.COA,O:XT.ON,G:XT.GRN};
    const ALBO_OK=(i)=>!((i===1&&a<=94)||((i===2||i===3)&&a>=86));   // Albanese majority variants that only fit some sizes
    const pl=(n,ok,side)=>{const k=ok===true?'good':ok===false?'bad':ok,sd=side||sideOf(n),tb=XTAB[sd]||{};
      let t=tb[n]&&tb[n][k];
      if(!t&&(k==='goodN'||k==='goodB'))t=(tb[n]&&(tb[n].goodN||tb[n].goodB))||(PERS[n]&&PERS[n].good);
      if(!t)t=PERS[n]&&PERS[n][k==='narrow'?'bad':k];
      if(!t&&k==='rump')t=sd==='C'?(tb[n]&&tb[n].bad?null:XT.COA_RUMP):null;
      if(!t)t=(tb._&&(tb._[k]||(k==='narrow'?tb._.bad:null)||(k==='goodN'||k==='goodB'?tb._.goodN:null)))||(k==='rump'&&RUMP[sd]?RUMP[sd](n):null);
      if(Array.isArray(t)){let pool=t;if(n==='Anthony Albanese'&&k==='good'){const f=t.filter((_,i)=>ALBO_OK(i));if(f.length)pool=f;}t=pk(pool,n+'|'+k);}
      return t?'¶'+fillT(t,{...V0(),...pv(n),before:DATA.current[3],government:a>=76?'Labor':co>=76?'the Coalition':'the next government'}):'';};
    // good = majority (or One Nation out-polling the Coalition); bad = clear losses; hung-parliament leaders get no verdict yet
    // mid = short of a majority but in the contest (largest party, or kingmaker)
    const isCoaJ=g=>g===1||g===NATI;
    const jf=(()=>{const v=(S.cand||{}).Kooyong;if(!v||v.n!=='Josh Frydenberg')return '';const i=D.seats.findIndex(x=>x.n==='Kooyong'),w=R.likely[i],M=seatMargin(i),hold=HELDBY0.Kooyong||D.seats[i].mem;
      if(C==='Josh Frydenberg')return isCoaJ(w)?`¶Frydenberg also wins back Kooyong${M?` by ${M.m.toFixed(1)} points`:''}, so the Liberal leader at least has a seat in the House again.`:`¶Worse for the Liberals, their leader loses his own contest: Frydenberg falls short in Kooyong${M?` by ${M.m.toFixed(1)} points`:''}, leaving the party led from outside the House.`;
      return isCoaJ(w)?`¶Josh Frydenberg is back. The former Treasurer, who lost Kooyong to ${hold} in 2022, wins it back for the Liberals${M?` by ${M.m.toFixed(1)} points`:''}, and walks straight into the conversation about who leads the party next.`
        :!M||M.m>0.9?'':`¶Josh Frydenberg's comeback falls short. The former Treasurer, who lost Kooyong to ${hold} in 2022, fails to win it back${M?`, finishing ${M.m.toFixed(1)} points behind`:''}, and with him goes the moderates' best hope of a quick revival.`;})();
    let extra=a===0?'':a>=76?pl(L,true):a<=15?pl(L,'rump','L'):((a<60&&top!==0)||(co>a)||(on>a))?pl(L,a>=60?'narrow':false):pl(L,'mid');
    extra+=jf;
    // comeback candidates: who made it back and who did not (own section)
    let cbx='';
    {const on=SPEC.filter(specOn);if(on.length>=4){
      const res=on.map(x=>{const i=D.seats.findIndex(z=>z.n===x.s);if(i<0)return null;const w=R.likely[i],g=spG(x),M=seatMargin(i),won=w===g||(g===1&&w===NATI);
        return {...x,i,won,m:M?M.m:null,by:won?null:mapName(D.seats[i],w,R.base[i]),lead:S.ldr[x.p]===x.n};}).filter(Boolean);
      const W=res.filter(r=>r.won).sort((a,b)=>(b.m||0)-(a.m||0)),Lz=res.filter(r=>!r.won).sort((a,b)=>(a.m||0)-(b.m||0));
      const pts=m=>m==null?'':` by ${m.toFixed(1)} point${m.toFixed(1)==='1.0'?'':'s'}`;
      const isCB=/^Comeback election/.test(S.preset||'');
      const open=isCB?pk([`It was sold as the election of the second act. ${cap(nums(res.length))} former prime ministers, premiers, party leaders and ministers put their names back on the ballot, and by the end of the count ${nums(W.length)} of them had a seat in the 49th Parliament.`,
          `Australian politics has rarely seen a homecoming like it: ${nums(res.length)} familiar names from parliaments past stood again, and voters let ${nums(W.length)} of them back in.`,
          `The comeback election delivered a split verdict. Of the ${nums(res.length)} former leaders, premiers and ministers who tried to return, ${nums(W.length)} won and ${nums(Lz.length)} did not.`],'cbopen')
        :`${cap(nums(res.length))} comeback candidates were on the ballot; ${nums(W.length)} won their seats and ${nums(Lz.length)} did not.`;
      cbx+='¶'+open;
      if(W.length)cbx+='¶'+`<b>Back in Parliament:</b> ${W.map(r=>`${r.n} (${r.s}, ${r.pty}${pts(r.m)})`).join('; ')}.`;
      if(Lz.length)cbx+='¶'+`<b>Not this time:</b> ${Lz.map(r=>`${r.n} (${r.s}, ${r.by?'lost to '+(r.by==='Independent'?'an independent':r.by):'lost'}${pts(r.m)})`).join('; ')}.`;
      // the story inside the numbers: which party's old guard did best and worst, and the closest result
      const byP={};res.forEach(r=>{(byP[r.p]=byP[r.p]||{w:0,n:0});byP[r.p].n++;if(r.won)byP[r.p].w++;});
      const ps=Object.entries(byP).filter(([p,v])=>v.n>=2).map(([p,v])=>[p,v.w/v.n,v]).sort((a,b)=>b[1]-a[1]);
      const PNM={Coalition:'the Liberals',Labor:'Labor',Nationals:'the Nationals','One Nation':'One Nation',Greens:'the Greens','Community Strong':'Community Strong'};
      let tail='';
      if(ps.length>=2){const [bp,br,bv]=ps[0],[wp,wr,wv]=ps[ps.length-1];
        if(br>wr)tail+=`${cap(PNM[bp]||bp)} had the best night, returning ${nums(bv.w)} of ${nums(bv.n)}${br===1?', a clean sweep':''}; ${PNM[wp]||wp} fared worst, with ${wv.w?nums(wv.w)+' of '+nums(wv.n):'none of '+nums(wv.n)} getting back in.`;}
      const close=res.filter(r=>r.m!=null&&r.m<2).sort((a,b)=>a.m-b.m)[0];
      if(close)tail+=` The tightest contest was ${close.n}'s in ${close.s}, ${close.won?'won':'lost'} by just ${close.m.toFixed(1)} points.`;
      const lead=res.filter(r=>r.lead);lead.forEach(r=>{tail+=` ${r.n}, who led ${PNM[r.p]||r.p} into the campaign, ${r.won?'is among those back in the House':'is not, leaving the party led from outside Parliament'}.`;});
      if(tail.trim())cbx+='¶'+tail.trim();}}
    const seatShort=[];
    {const SI=n=>{const i=D.seats.findIndex(x=>x.n===n);return i<0?null:{i,w:R.likely[i],M:seatMargin(i),was:gOf(D.seats[i])};},mm=M=>M?M.m.toFixed(1):'a few';
     // Farrer: One Nation's by-election seat
     {const f=SI('Farrer');if(f){const isCo=w=>w===1||w===NATI,leyIn=C==='Sussan Ley'&&((S.cand||{}).Farrer||{}).n==='Sussan Ley';
       if(leyIn){extra+='¶'+fillT(isCo(f.w)?XT.SEAT.farrerLeyWin:XT.SEAT.farrerLeyLose,{m:mm(f.M)});seatShort.push(isCo(f.w)?XT.SEAT.farrerShortWin:XT.SEAT.farrerShortLose);}
       else if(isCo(f.w))extra+='¶'+fillT(XT.SEAT.farrerLib,{m:mm(f.M)});
       else if(f.w===4||f.w===iCSA)extra+='¶'+fillT(XT.SEAT.farrerInd,{m:mm(f.M)});
       else if(f.w===3&&f.M&&f.M.m<5)extra+='¶'+fillT(XT.SEAT.farrerON,{m:mm(f.M)});}}
     // Dickson: Peter Dutton's old seat
     {const f=SI('Dickson');if(f){if((f.w===1||f.w===NATI)&&f.was===0)extra+='¶'+fillT(XT.SEAT.dicksonLIB,{m:mm(f.M)});else if(f.w===0&&f.M&&f.M.m<3&&f.M.r===1)extra+='¶'+XT.SEAT.dicksonALP;}}
     // flagship teal seats
     {const FL=['Warringah','Goldstein','Mackellar','Curtin','Indi'],back=FL.map(SI).filter(f=>f&&(f.was===4||f.was===iCSA)&&(f.w===1||f.w===NATI)).map(f=>D.seats[f.i].n);
      if(back.length>=2)extra+='¶'+fillT(XT.SEAT.tealLib,{seat_list:list(back)});
      const CLs=(DATA.leaders.find(l=>l.name===CL&&l.party==='Community Strong')||{}).seat;
      if(CLs&&csa>=4){const sn=CLs.replace(/ \(.*\)$/,''),f=SI(sn);if(f&&f.w!==iCSA)extra+='¶'+fillT(XT.SEAT.tealLeader,{leader:CL,seat:sn,n:nums(csa)});}}
     // comeback and outsider leaders: by-election handovers and challengers
     {const PJ={Labor:[0],Coalition:[1,NATI],Nationals:[1,NATI],'One Nation':[3],Greens:[2],'Community Strong':[iCSA,4]};
      Object.entries(S.ldr||{}).forEach(([p,n])=>{const r=NEWL[n];if(!r||r.p!==p||r.t==='j'||n==='Sussan Ley')return;const f=SI(r.s);if(!f)return;const won=(PJ[p]||[]).includes(f.w),m=mm(f.M),T=XT.SEAT,v={...pv(n),seat:r.s,m,incumbent:r.inc};
        let t='';
        if(r.t==='h')t=won?T.handoverWin:T.handoverLose;
        else if(n==='Julie Bishop')t=won?T.bishopWin:T.bishopLose;
        else if(n==='Adam Bandt')t=won?T.bandtWin:T.bandtLose;
        else if(n==='Mark Latham')t=won?T.latham:'';
        else if(n==='Tony Abbott'||n==='Dominic Perrottet')t=won?T.abbPerWin.replace("Sydney's northern beaches / North Shore",(r.s==='Mackellar'||r.s==='Warringah')?"Sydney's northern beaches":"Sydney's North Shore"):'';
        else if(n==='Gladys Berejiklian')t=won?T.gladysWin:T.gladysLose;
        else if(n==='Christopher Pyne'||n==='Steven Marshall')t=won?T.sawin:'';
        else if(n==='Campbell Newman')t=won?T.newman:'';
        if(t&&r.t==='h'&&won&&f.M&&f.M.m<3)t=t.replace('easily holds','narrowly holds');
        if(t)extra+='¶'+fillT(t,v);});}
     // inner-city Greens seats
     {const GS=['Melbourne','Griffith','Brisbane','Ryan'].map(SI).filter(f=>f&&f.was===2&&f.w!==2).map(f=>D.seats[f.i].n);if(GS.length>=2)extra+='¶'+fillT(XT.SEAT.grnSeats,{lost_seats:list(GS)});}
    }
    // the Nationals running alone and finishing first: a Country Party prime minister for the first time since John McEwen
    if(SPLIT&&top===NATI&&false){const NLx=S.ldr['Nationals']||'Matt Canavan',nn=c[NATI],sn=sur(NLx),inS=/Senat/.test((DATA.leaders.find(l=>l.name===NLx)||{}).seat||'');
      extra+='¶'+(nn>=76?`For the first time in its history, the Nationals will govern in their own right. ${NLx} becomes the first Nationals Prime Minister since John McEwen held the job for three weeks in 1967–68, and the first ever to win the office at an election. ${inS?`There is one problem: ${sn} sits in the Senate, and will need a House seat quickly.`:`The party of the bush now has to govern the cities too.`}`
        :`The Nationals, running on their own for the first time, finish as the largest party in the House with ${nn} seats. ${NLx} now has a claim to The Lodge no Nationals leader has had since John McEwen in 1967, if the Liberals and the crossbench can be brought along. ${inS?`Leading from the Senate, ${sn} will need a House seat before facing a confidence vote.`:''}`);}
    else if(SPLIT&&govSides().gov===NATI&&!(c[NATI]>=76)){const NLx=S.ldr['Nationals']||'Matt Canavan';
      extra+='¶'+`Against every expectation, the path to government runs through the Nationals. ${NLx} is the most likely Prime Minister, at the head of a minority arrangement with the Liberals and the crossbench, the first Nationals-led government since 1968.`;}
    // the Nationals leader in a winning Coalition becomes Deputy Prime Minister
    if(co>=76){const NLd=S.ldr['Nationals']||'Matt Canavan',nn=D.seats.filter((x,i)=>(R.likely[i]===1||R.likely[i]===NATI)&&coaSub(x,R.likely[i],R.base[i])==='NAT').length,sn=sur(NLd);
      const ND=XT.NATDPM[NLd]||XT.NATDPM._,NG=fillT((NLd==='Matt Canavan'&&!canCap()&&ND.dpmLost)||ND.dpm,{...pv(NLd),n:nums(nn)});
      extra+=pl(C,co>=86?'goodB':'goodN')+'¶'+NG;}
    else if(co===0&&!SPLIT){} else if(co<=15) extra+=pl(C,'rump','C'); else if(co<on||co<35) extra+=pl(C,false); else if(co+on>=76||co>=a) extra+=pl(C,'mid'); else extra+=pl(C,co>(DATA.current[1]||0)?'oppUp':'oppDown');
    if(!SPLIT&&co>15&&co<76&&govSides().gov!==1){const NLo=S.ldr['Nationals']||'Matt Canavan',NO=XT.NATDPM[NLo]||XT.NATDPM._;extra+='¶'+fillT((NLo==='Matt Canavan'&&!canCap()&&NO.oppLost)||NO.opp,pv(NLo));}
    if(on>co&&sec!==3&&!(top===3)) extra+='¶'+`${sur(O)==='Hanson'?'Hanson':O} has finally overtaken the Coalition, ${on} seats to ${co}, only to watch ${PN(sec)} take the Opposition benches One Nation had spent the campaign eyeing. It is a record night for the party, and somehow still a frustrating one.`; else if(on>co) extra+=pl(O,true); else if(on<10) extra+=pl(O,false); else if(co<76&&a<76&&(co+on>=76||nonRight<76)) extra+=pl(O,'mid');   // only when One Nation's seats decide who governs
    else {const govN=a>=76?'Labor':co>=76?'the Coalition':'the next government',cur=DATA.current[3],hn=sur(O)==='Hanson'?'Hanson':O,
      third=fillT(pk(XT.ON_THIRD[O]||XT.ON._.third,'onthird'),{...V0(),...pv(O),before:cur,government:govN});
      if(on>=10&&!(top===3||sec===3))extra+='¶'+(maj?third:`One Nation finishes with ${on} seats, up from ${cur}, its best result ever. In a hung parliament those votes will matter: on legislation, if not on who governs, ${sur(O)==='Hanson'?'Hanson':O} will expect to be consulted.`);}
    if(!maj&&!formOK()){const grandH=head==='Deadlock: grand coalition talk';
      extra+='¶'+fillT(pk(XT.CARETAKER,'caretaker'),{'Labor leader':L,notLost:!lostE(L,0)});
      if(grandH)extra+='¶'+`Inside both party rooms, the grand coalition idea is already dividing MPs. Labor's left faction sees it as a betrayal of everything the party stands for; Coalition conservatives warn it would hand One Nation the Opposition benches and a decade of growth. Supporters on both sides argue it is the only way to give the country a stable government, and point to Germany, where grand coalitions have governed for years. The price would be a shared cabinet and a program both sides could sign.`;
      else if(co+on+(c[NATI]||0)>=76&&a<76)extra+='¶'+fillT(pk(XT.ST.coaON,'co_on'),{...V0(),'Coalition leader':lN(C,1)});}
    const senGr=R.senCentral?R.senCentral.tot[SK.indexOf('GRN')]:null;
    if(top===2) extra+='¶'+fillT(XT.GRN_LARGEST,{...pv(G),tenure:(XT.GRN_TENURE[G]||XT.GRN_TENURE._),n:senGr!=null?senGr:'an uncertain number of'});
    else if(gr>=5) extra+=pl(G,true);
    else if(gr>=2) extra+='¶'+fillT(XT.GRN_MID,{...pv(G),gr:nums(gr),n:senGr!=null?senGr:'its'});
    else if(gr===0&&DATA.current[2]>0) {}   // the Greens wipeout paragraph covers this
    else if(gr===1||gr<DATA.current[2]) extra+=pl(G,false);
    const kapK=iKAP>=0?c[iKAP]:0,kenI=D.seats.findIndex(x=>x.n==='Kennedy'),kenHeld=kenI>=0&&R.likely[kenI]===iKAP,kapShow=iKAP>=0&&(!kenHeld||kapK>=2);
    if(!kapShow){}
    else if(kapK===1){const ln=(S.ldr["Katter's Australian"]||'Robbie Katter')==='Bob Katter'?'Bob Katter':'Robbie Katter';const ks=D.seats[R.likely.findIndex(w=>w===iKAP)];extra+='¶'+`Kennedy falls after more than three decades in Katter hands, but ${ln}'s party survives in Canberra by winning ${ks?ks.n:'another seat'} instead. The family seat is gone; the party is not.`;}
    else if(S.ldr["Katter's Australian"]==='Bob Katter'){const k=kapK;extra+='¶'+(k>=2?`Bob Katter, back in charge of the party he founded, turns a one-man band into a ${nums(k)}-member bloc. North Queensland has been telling Canberra it exists for decades; tonight it said it louder.`
      :k===1?`Bob Katter holds Kennedy, as he has since 1993, and takes the party leadership back from his son without growing it. The Katter brand is still a family business.`
      :`Kennedy falls, and with it the last Katter seat in Canberra. The party Bob Katter founded will go on in the Queensland parliament, but the federal chapter of the family saga has closed.`);}
    else if((S.ldr["Katter's Australian"]||'Robbie Katter')==='Robbie Katter'){const k=kapK;extra+='¶'+fillT(XT.KAT_ROBBIE[k>=2?'2':k===1?'1':'0'],{n:nums(k)});}
    let kmx='', csaKM=false;
    // kingmakers: in a hung parliament, any crossbench group whose seats decide whether a side reaches 76
    if(c.every(v=>v<76)){
      const RIGHT=['KAP','AFP','FFP','LTP','GRPF','AUC','ASP','CEC','IMO','GAP'];
      const bloc=P.map((g,j)=>j).filter(j=>![0,1,3].includes(j)&&c[j]>0);
      const leftTot=a+bloc.filter(j=>!RIGHT.includes(P[j].ab)).reduce((s,j)=>s+c[j],0);
      const rightTot=co+on+bloc.filter(j=>RIGHT.includes(P[j].ab)).reduce((s,j)=>s+c[j],0);
      const pl2=n=>n===1?'':'s';
      const KM={GRN:n=>`With ${n} seat${pl2(n)}, the Greens hold real power in the House for the first time since Adam Bandt's lone vote helped keep Julia Gillard in office in 2010, and they will not hand it over cheaply.`,
        CSA:n=>{csaKM=true;return csaL.km(n);},
        IND:n=>`The ${n===1?'lone independent becomes':nums(n)+' independents, from the teal suburbs to the bush, become'} the most courted ${n===1?'MP':'MPs'} in the country.`,
        KAP:n=>S.ldr["Katter's Australian"]==='Bob Katter'?`Bob Katter, in Parliament since 1993 and now leading his own party again, has seen this movie before: in 2010 he gave a forty-minute speech before choosing a side. Expect a longer one, a list of dams, and a price measured in north Queensland railway lines.`:`Katter's Australian Party, which drove a hard bargain in the 2010 hung parliament, is back at the table, and north Queensland will want its due.`,
        AFP:n=>`The Australian Federation Party has ${n===1?'a seat':nums(n)+' seats'} in the House and, for the first time, real leverage over who governs.`,
        XEN:n=>`Centre Alliance's single vote from Mayo could decide who governs: in a hung parliament, every seat is a kingdom.`};
      const gen=(j,n)=>`Few expected ${P[j].n} to win a seat at all. Now ${n===1?'its only MP':`its ${nums(n)} MPs`} may decide who governs.`;
      // a group is a kingmaker if some combination of the other groups on its side falls short without it but reaches 76 with it
      const swing=(base,grp)=>{if(base>=76)return [];const d=76-base,out=[];
        grp.forEach(j=>{const others=grp.filter(k=>k!==j).map(k=>c[k]);let sums=[0];others.forEach(v=>{sums=sums.concat(sums.map(s=>s+v));});
          if(sums.some(s=>s<d&&s+c[j]>=d))out.push(j);});return out;};
      const left=bloc.filter(j=>!RIGHT.includes(P[j].ab)), rightG=bloc.filter(j=>RIGHT.includes(P[j].ab));
      const km=new Set([...(leftTot>=76?swing(a,left):[]),...(rightTot>=76?swing(co+on,rightG):[])]);
      if(!kapShow)[...km].forEach(j=>{if(P[j].ab==='KAP')km.delete(j);});
      if(gr>=5){const gi=[...km].find(j=>P[j].ab==='GRN');if(gi!=null){km.delete(gi);extra+='¶'+fillT(XT.GRN_KMTAG,{...pv(G),gr:nums(gr)});}}
      [...km].sort((x,y)=>c[y]-c[x]).slice(0,3).forEach(j=>{const ab=P[j].ab;kmx+='¶'+(KM[ab]?KM[ab](c[j]):gen(j,c[j]));});
    }
    if(maj){const MP=P.map((_,j)=>j).filter(j=>j>=5&&j!==NATI&&j!==iCSA&&j!==iKAP&&j!==top&&c[j]>0);
      if(MP.length)extra+='¶'+fillT(XT.MINOR.intro,{winner:PN(top)})+' '+MP.map(j=>fillT(XT.MINOR[P[j].ab]||XT.MINOR._,{n:nums(c[j]),Party:P[j].full||P[j].n})).join(' ');}
    if(csaV&&!csaKM&&csaV!=='maj') extra+='¶'+csaL[csaV](csa); else if(csaV==='maj') extra+='¶'+csaL.maj(csa);
    // One Nation as opposition, when the government is Labor
    if(maj&&top===0&&sec===3) body+=` And the political order has been overturned: for the first time since the 1940s the official Opposition will be led by neither the Liberals nor Labor. One Nation's ${on} seats outnumber the Coalition's ${co}, and ${O} will face the Prime Minister across the dispatch box.`;
    else if(maj&&sec===iCSA) body+=` But the real story of the night is who sits opposite. For the first time since Federation the official Opposition will belong to neither Labor nor the conservative parties: Community Strong's ${csa} seats put it ahead of One Nation (${on}) and the ${SPLIT?'Liberals':'Coalition'} (${co}).`;
    else if(maj&&top===1&&sec===3) body+=` One Nation's ${on} seats make it the official Opposition, the first time in more than a century that Labor will not be the Opposition to a conservative government.`;
    const senPara=(()=>{const T=R.senCentral.tot, ix=k=>SK.indexOf(k), sA=T[ix('ALP')], sG=T[ix('GRN')], sC=T[ix('COA')]+(ix('NAT')>=0?T[ix('NAT')]:0), sO=T[ix('ON')], lgS=sA+sG, coS=sC+sO, onS=sO, onB=S2.before[ix('ON')];
      const xs=S2.groups.map((_,g)=>g).filter(g=>!['ALP','GRN','COA','ON'].includes(SK[g])&&T[g]>0).map(g=>`${S2.groups[g].n} (${T[g]})`);
      const lead=S.dd?'In the double-dissolution Senate count, with all 76 seats up for grabs,':'In the Senate,';
      const onLine=onS>onB?` One Nation's Senate team grows to ${onS}, up from ${onB}.`:onS<onB?` One Nation's Senate team shrinks to ${onS}, from ${onB}.`:` One Nation holds ${onS} Senate seats.`;
      const govL=top===0, govR=top===1||top===3, govName=top===0?'Labor':top===1?'the Coalition':top===3?'One Nation':PN(top);
      const govSen=top===0?lgS:top===1||top===3?coS:T[ix(P[top].ab)]||0;
      const pivot=xs.length?list(xs):'a handful of crossbenchers';
      let s;const SV={lead,lg:lgS,rt:coS,crossbench:pivot,'Labor surname':labShort,'Coalition leader':C,'ON leader':O,coaGov:top===1,PM:govName==='the Coalition'?C:O,government:govName};
      if(govL) s=fillT(pk(lgS>=39?XT.SEN.labLG:coS>=39?XT.SEN.labRT:XT.SEN.labNO,'sen_lab'),SV);
      else if(govR) s=fillT(pk(coS>=39?XT.SEN.rtRT:lgS>=39?XT.SEN.rtLG:XT.SEN.rtNO,'sen_rt'),SV);
      else {
        s=`${lead} ${govSen>0?`${govName} ${top===4||top===2?'have':'has'} ${govSen} of 76 seats`:`${govName} ${top===4||top===2?'have':'has'} no organised presence`}. Labor and the Greens hold ${lgS} and the Coalition and One Nation ${coS}, so ${lgS>=39?'Labor and the Greens':coS>=39?'the Coalition and One Nation':pivot} will decide which of the new government's bills pass.`;
      }
      if(c.every(v=>v<76)) s=fillT(pk(XT.SEN.hung,'sen_hung'),{...SV,bloc:lgS>=39?0:coS>=39?1:2,none:!(lgS>=39||coS>=39)});
      return s+onLine;})();
    const senP=SPLIT?senPara.replace(/the Coalition and One Nation/g,'the Liberals, Nationals and One Nation').replace(/the Coalition/g,'the Liberals and Nationals').replace(/Coalition/g,'Liberal–National'):senPara;
    // election-night scenes (no quotes): where each leader spends the night
    const CAP={NSW:'Sydney',VIC:'Melbourne',Vic:'Melbourne',QLD:'Brisbane',Qld:'Brisbane',WA:'Perth',SA:'Adelaide',TAS:'Hobart',Tas:'Hobart',ACT:'Canberra',NT:'Darwin'};
    const where=j=>{const n=ld(j),l=DATA.leaders.find(x=>x.name===n);if(!l||!l.seat)return 'with party faithful';const m=l.seat.match(/^Senator for (.+)$/);if(m)return 'in '+(CAP[m[1]]||m[1]);const s=D.seats.find(x=>x.n===l.seat);if(!s){const st=(l.seat.match(/\b(NSW|Vic|Qld|WA|SA|Tas|ACT|NT)\b/)||[])[1];return st?'in '+(CAP[st]||st):'with party faithful';}return `in ${l.seat}${/Metro/.test(s.rg)?' ('+CAP[s.st]+')':''}`;};
    const lead1=[0,1,3,2].includes(top)?top:null, run1=maj&&top!==0?0:sec!==4&&sec!==top?sec:[0,1,3].filter(j=>j!==top).sort((x,y)=>c[y]-c[x])[0];
    const runUp=c[run1]>(DATA.current[run1]||0)&&![0,1].includes(run1), runNm=noL(run1)?`${cap(PN(run1))}'s new MPs`:ld(run1);
    const stage=maj&&lead1!=null?`${ld(lead1)} claims victory before cheering supporters ${where(lead1)}, while ${runUp?`${runNm} ${noL(run1)?'celebrate':'celebrates'} becoming the Opposition ${where(run1)}`:`${runNm} concedes defeat ${where(run1)}`} shortly before midnight.`
      :lead1!=null?`No leader claims victory. ${ld(lead1)} tells supporters ${where(lead1)} that the result will take days to settle; across the country, ${ld(run1)} declines to concede ${where(run1)}.`
      :`At a crowded party ${where(top)!=='with party faithful'?where(top):'in a function room'}, ${PN(top)} ${top===4||top===2?'celebrate':'celebrates'} a result few saw coming, while ${ld(0)} and ${ld(1)} address subdued crowds ${where(0)} and ${where(1)}.`;
    // side stories from this run
    const decided=D.seats.map((s,i)=>({s,i,...seatMargin(i)})).sort((x,y)=>x.m-y.m).slice(0,5);
    const flips={},fseats={},net=new Array(NG).fill(0);D.seats.forEach((s,i)=>{const was=gOf(s),now=R.likely[i];if(was!==now){const k=was+'>'+now;flips[k]=(flips[k]||0)+1;(fseats[k]=fseats[k]||[]).push(i);net[was]--;net[now]++;}});
    const flipL=Object.entries(flips).sort((x,y)=>y[1]-x[1]).slice(0,6), fmax=flipL.length?flipL[0][1]:1, nflip=Object.values(flips).reduce((a,b)=>a+b,0);
    const pp=j=>`<span class="pp" style="--c:${col(j)}">${j===4?'Independent':P[j].n}</span>`;
    const netL=net.map((v,j)=>[v,j]).filter(x=>x[0]).sort((a,b)=>b[0]-a[0]);
    const flipCard=`<div class="mcard flipcard"><div class="mkick">Seats changing hands</div><div class="mh">${nflip?`${nflip} seat${nflip>1?'s':''} change hands`:'No seats change hands'}</div>
      ${netL.length?`<div class="fnet">${netL.map(([v,j])=>`<span class="fchip ${v>0?'up':'dn'}" style="--c:${col(j)}"><b>${v>0?'+':'−'}${Math.abs(v)}</b> ${P[j].n}</span>`).join('')}</div>`:''}
      <div class="fgrid">${flipL.map(([k,v])=>{const [a,b]=k.split('>').map(Number),ss=fseats[k].slice().sort((x,y)=>seatMargin(y).m-seatMargin(x).m);
        return `<div class="fflow" style="--a:${col(a)};--b:${col(b)}"><div class="ffh"><span class="ffn">${v}</span><span class="ffwho">${pp(a)}<svg class="farr" viewBox="0 0 24 12" aria-hidden="true"><path d="M1 6h19M15 1l6 5-6 5" fill="none" stroke="currentColor" stroke-width="2"/></svg>${pp(b)}</span></div>
          <div class="ffseats">${ss.slice(0,10).map(i=>{const x=D.seats[i],M=seatMargin(i);return `<span class="fseat" style="border-color:${mapCol(x,b,R.base[i])}" title="${x.n} (${stN(x.s||x.st)}): ${mapName(x,b,R.base[i])} by ${M?M.m.toFixed(1):''} points">${x.n}<small>${M?(M.m<1?M.m.toFixed(1):Math.round(M.m)):''}</small></span>`;}).join('')}${ss.length>10?`<span class="fmore2">+${ss.length-10} more</span>`:''}</div></div>`;}).join('')}</div>
      ${Object.keys(flips).length>6?`<div class="fmore">Plus ${(n=>n+(n===1?' seat':' seats'))(Object.values(flips).sort((x,y)=>y-x).slice(6).reduce((x,y)=>x+y,0))} in ${Object.keys(flips).length-6} smaller movement${Object.keys(flips).length-6>1?'s':''}</div>`:''}</div>`;
    // one standout swing per party (to and against), so a single surging party doesn't fill the list
    const sw2=D.seats.map((s,i)=>{const nv=grpV(R.base[i],s),ov=grpV(s.b,s);return {s,i,d:nv.map((v,j)=>v-ov[j])};});
    // the Coalition is always shown as Liberals and Nationals; independents always last
    const natSeat=s=>coaSub(s,1,null)==='NAT'||(s.st==='QLD'&&(s.nr||(FAC[HELDBY[s.n]||s.mem]||'')==='N_QLD'));
    const SWE=[3,0,'LIB','NAT',2,P.findIndex(g=>g.ab==='CSA'),4].filter(j=>j!==-1).map(j=>{
      if(j==='LIB'||j==='NAT'){const nat=j==='NAT',ix=SPLIT?(nat?NATI:1):1;return {id:j,name:nat?'Nationals':'Liberals',c:COASUB[j][1],
        ok:o=>SPLIT||natSeat(o.s)===nat,ix};}
      return {id:j,name:j===4?'Independents':P[j].n,c:col(j),ok:()=>true,ix:j};});
    const stood=(o,e)=>{const j=e.ix,nv=grpV(R.base[o.i],o.s)[j],ov=grpV(o.s.b,o.s)[j];return e.ok(o)&&(nv>0.05||ov>0.05)&&!((j===4||(P[j]&&P[j].ab==='CSA'))&&S.cind&&CINDS[o.s.n]);};
    const swings=SWE.map(e=>{const pool=sw2.filter(o=>stood(o,e));if(!pool.length)return null;const j=e.ix,up=pool.slice().sort((x,y)=>y.d[j]-x.d[j])[0],dn=pool.slice().sort((x,y)=>x.d[j]-y.d[j])[0];return {e,j,up,dn};}).filter(o=>o&&(o.up.d[o.j]>0.5||o.dn.d[o.j]<-0.5));
    const swMax=Math.max(1,...swings.map(o=>Math.max(Math.abs(o.up.d[o.j]),Math.abs(o.dn.d[o.j]))));
    const sgn=v=>(v>0?'+':v<0?'−':'')+Math.abs(v).toFixed(1);
    const swingCard=swings.length?`<div class="more" style="margin:4px 0 16px"><div class="mcard swcard"><div class="mkick">Swings of the night</div><div class="mh">Where each party gained and lost the most</div>
      <div class="swkey"><span>← Biggest fall</span><span>Biggest rise →</span></div>
      ${swings.map(o=>{const j=o.j,u=o.up.d[j],dn=o.dn.d[j],w=v=>(Math.abs(v)/swMax*50).toFixed(1);
        return `<div class="swrow"><div class="swname"><span class="pp" style="--c:${o.e.c}">${o.e.name}</span></div>
        <div class="swbar"><span class="swmid"></span>${dn<0?`<i class="swdn" style="width:${w(dn)}%;background:${o.e.c}"></i>`:''}${u>0?`<i class="swup" style="width:${w(u)}%;background:${o.e.c}"></i>`:''}</div>
        <div class="swlab"><span class="swl">${dn<0?`<b>${sgn(dn)}</b> ${o.dn.s.n}`:`<span class="status">No falls</span>`}</span><span class="swr">${u>0?`<b>${sgn(u)}</b> ${o.up.s.n}`:`<span class="status">No rises</span>`}</span></div></div>`;}).join('')}
      <p class="fmore">Change in first-preference vote since 2025, in percentage points, among seats where the party stood (the Coalition's vote is counted for the Liberals or the Nationals by who holds or contests each seat)${S.cind?' (seats where sitting independents joined Community Strong are left out)':''}.</p>${on2cp>=10?`<p class="fmore">${fillT(XT.NOTE2CP,{n:on2cp})}</p>`:''}</div></div>`:'';
    // ---- how the factions fared: Labor caucus, Liberal and Nationals party rooms (House and Senate together), before and after the count
    const FACM=(()=>{const RET=S.retire||{},isCoa=g=>g===1||g===NATI,memb=[];
      const roomOf=(s,n)=>FAC[n]&&FAC[n].startsWith('N_')?'NAT':coaSub(s,1,null)==='NAT'&&s.st!=='QLD'?'NAT':'LIB';
      D.seats.forEach((s,i)=>{const n=HELDBY[s.n]||s.mem,g=gOf(s);if(!n||!(g===0||isCoa(g)))return;const ret=!!RET[s.n],w=R.likely[i],keep=!ret&&(g===0?w===0:isCoa(w));
        const pk=g===0?'ALP':roomOf(s,n);memb.push({n,pk,ret,keep,where:s.n,k:FAC[n]||(pk==='NAT'?'N_'+s.st:'NONE')});});
      SENATE.forEach(x=>{if(x.k!=='ALP'&&x.k!=='COA')return;const f=senFate(x),pk=x.k==='ALP'?'ALP':(x.room==='N'||(FAC[x.n]||'').startsWith('N_'))?'NAT':'LIB';
        memb.push({n:x.n,pk,ret:false,keep:!!(f.cont||f.hold),where:'Senate',k:FAC[x.n]||(pk==='NAT'?'N_'+x.st:'NONE')});});
      Object.entries(S.cand||{}).forEach(([sn,v])=>{if(!v.n)return;const i=D.seats.findIndex(x=>x.n===sn);if(i<0)return;const w=R.likely[i];if(!(w===v.g||(v.g===1&&isCoa(w))))return;
        const pk=v.g===0?'ALP':coaSub(D.seats[i],w,R.base[i])==='NAT'?'NAT':'LIB';memb.push({n:v.n,pk,ret:false,keep:true,where:sn,k:FAC[v.n]||'NONE',cand:true});});
      const nw={ALP:0,LIB:0,NAT:0},pkW=(s,w,i)=>w===0?'ALP':isCoa(w)?(coaSub(s,w,R.base[i])==='NAT'?'NAT':'LIB'):null;
      D.seats.forEach((s,i)=>{const pk=pkW(s,R.likely[i],i);if(!pk)return;const was=memb.find(m=>m.where===s.n&&m.keep);if(!was)nw[pk]++;});
      S2.states.forEach((st,k)=>{const W=R.senCentral.st[k].won;[['ALP',['ALP'],x=>x.k==='ALP'],['LIB',['COA'],x=>x.k==='COA'&&x.room!=='N'],['NAT',['NAT'],x=>x.k==='COA'&&x.room==='N']].forEach(([pk,ks,f])=>{
        const won=ks.map(x=>SK.indexOf(x)).filter(g=>g>=0).reduce((a,g)=>a+(W[g]||0),0),held=SENATE.filter(x=>x.st===st&&f(x)&&(S.dd||x.term===2028)&&senFate(x).hold).length;nw[pk]+=Math.max(0,won-held);});});
      // the faction rule for leadership: the largest faction left standing, then its most senior figure
      // the new leader: a surviving frontbencher first, with the largest faction favoured but not certain; if the frontbench is gone, a more open field
      const pick=(pk,cur)=>{const alive=memb.filter(m=>m.pk===pk&&m.keep&&m.n!==cur);if(!alive.length)return null;
        // leaders come from the House unless the party has been reduced to a handful of MPs there
        const house=alive.filter(m=>m.where!=='Senate'),pool=house.length>=5?house:alive;
        const cnt={};alive.forEach(m=>{if(FACORD[m.k])cnt[m.k]=(cnt[m.k]||0)+1;});const big=Object.keys(cnt).sort((x,y)=>cnt[y]-cnt[x])[0]||null,share=k=>(cnt[k]||0)/(cnt[big]||1);
        // the same result always gives the same winner, so the report does not change each time it is redrawn
        let h=2166136261;for(const ch of pk+'|'+cur+'|'+R.likely.join(''))h=Math.imul(h^ch.charCodeAt(0),16777619);
        const rnd=()=>{h=Math.imul(h^(h>>>15),2246822507);h=Math.imul(h^(h>>>13),3266489909);h^=h>>>16;return (h>>>0)/4294967296;};
        const draw=(arr,wf)=>{const ws=arr.map(wf),t=ws.reduce((a,b)=>a+b,0);let r=rnd()*t;for(let k=0;k<arr.length;k++){r-=ws[k];if(r<=0)return arr[k];}return arr[arr.length-1];};
        const senior=m=>{const o=FACORD[m.k]||[],x=o.indexOf(m.n);return x>=0&&x<6?1.5:1;};
        const FRONT=new Set((pk==='ALP'?CABINET:SHADOW).map(x=>x[0])),front=pool.filter(m=>FRONT.has(m.n));
        const m=front.length?draw(front,m=>(m.k===big?4:1+2*share(m.k))*senior(m)):draw(pool,m=>1+share(m.k));
        return {n:m.n,k:FACORD[m.k]?m.k:null,big,front:front.length>0,size:cnt[m.k]||0};};
      return {memb,nw,pick};})();
    const facCard=(()=>{const memb=FACM.memb,nw=FACM.nw;
      const nm=k=>FACN[k][0];
      const sec=(pk,title,keys)=>{const M=memb.filter(m=>m.pk===pk);if(!M.length)return '';
        const bef=keys.map(k=>M.filter(m=>m.k===k&&!m.cand).length),aft=keys.map(k=>M.filter(m=>m.k===k&&m.keep).length),T0=M.filter(m=>!m.cand).length,T1=aft.reduce((a,b)=>a+b,0)+nw[pk];
        const bar=(arr,ex)=>{const tot=Math.max(1,arr.reduce((a,b)=>a+b,0)+ex);return `<div class="facbar">${arr.map((v,x)=>v?`<i style="width:${(v/tot*100).toFixed(2)}%;background:${FACN[keys[x]][1]}" title="${nm(keys[x])}: ${v}"></i>`:'').join('')}${ex?`<i style="width:${(ex/tot*100).toFixed(2)}%;background:${FACN.NEW[1]}" title="New members: ${ex}"></i>`:''}</div>`;};
        const rows=keys.map((k,x)=>{if(!bef[x])return '';const d=aft[x]-bef[x],gone=M.filter(m=>m.k===k&&!m.keep),lost=gone.filter(m=>!m.ret),ret=gone.filter(m=>m.ret);
          let now=null,was=null;if(FACORD[k]){const alive=new Set(M.filter(m=>m.k===k&&m.keep).map(m=>m.n));was=FACORD[k].find(n=>M.some(m=>m.n===n));now=FACORD[k].find(n=>alive.has(n))||[...alive][0]||null;}
          // unaligned members have no leading figure: the party logo stands in
          const una=k==='LU'||k==='LBU';if(una){now=null;was=null;}
          const wm=was&&M.find(m=>m.n===was),pic=una?PHOTO[k==='LU'?'_logo_ALP':'_logo_LIB']:now?phOf(now):null;
          const lead=una?'':FACORD[k]?(now?`<div class="fclead">${now}<small>${was&&was!==now?`Leading figure since ${sur(was)} ${wm.ret?'retired':'lost '+(wm.where==='Senate'?'a Senate seat':wm.where)}`:'Leading figure'}</small></div>`:`<div class="fclead">No one left in Parliament</div>`):'';
          const lostTxt=lost.length?`<div class="fcgone">Lost: ${lost.slice(0,4).map(m=>`${m.n} <span>(${m.where})</span>`).join(', ')}${lost.length>4?` and ${lost.length-4} more`:''}</div>`:'';
          const retTxt=ret.length?`<div class="fcgone">Retired: ${ret.slice(0,3).map(m=>m.n).join(', ')}${ret.length>3?` and ${ret.length-3} more`:''}</div>`:'';
          const ini=(now||FACN[k][0]).replace(/'/g,'').split(' ').filter(Boolean).map(w=>w[0]).join('').slice(0,2);
          return `<div class="fcrow" style="--fc:${FACN[k][1]}"><div class="fcpic${una?' fclogo':''}">${pic?`<img src="${pic}" alt="">`:`<span>${FACORD[k]?ini:'–'}</span>`}</div>
            <div class="fcmain"><div class="fcn">${FACN[k][0]}</div>${lead}${lostTxt}${retTxt}</div>
            <div class="fcnum"><b>${aft[x]}</b><span>was ${bef[x]}</span>${d?`<em class="${d>0?'up':'dn'}">${d>0?'+':'−'}${Math.abs(d)}</em>`:`<em class="eq">±0</em>`}</div></div>`;}).join('');
        return `<div class="facparty"><div class="facph"><span>${title}</span><small>${T0} before · ${T1} after</small></div>
          <div class="facbars"><span>Before</span>${bar(bef,0)}<span>After</span>${bar(aft,nw[pk])}</div>${rows}
          ${nw[pk]?`<div class="fcrow fcnew" style="--fc:${FACN.NEW[1]}"><div class="fcpic"><span>+</span></div><div class="fcmain"><div class="fcn">New members</div><div class="fcgone">Factions to be decided once the new ${pk==='ALP'?'caucus':'party room'} meets</div></div><div class="fcnum"><b>${nw[pk]}</b><span>new</span></div></div>`:''}</div>`;};
      const A=k=>memb.filter(m=>m.k===k&&m.keep).length,B=k=>memb.filter(m=>m.k===k).length;
      const hd=(()=>{const l=A('LL'),r=A('LR'),m=A('LM'),n=A('NR');
        const lab=l===r?`Labor's Left and Right finish level on ${l}`:`Labor's ${l>r?'Left':'Right'} ${(B('LL')>B('LR'))===(l>r)?'keeps':'takes'} the upper hand, ${Math.max(l,r)} to ${Math.min(l,r)}`;
        const lib=m===n?`, and the Liberal moderates and National Right are level`:m>n?`, while the Liberal moderates now outnumber the National Right`:`, while the National Right ${B('NR')>B('LM')?'still dominates':'now dominates'} the Liberal party room`;
        return lab+lib;})();
      const facNarr=(()=>{const l=A('LL'),r=A('LR'),m=A('LM'),n=A('NR'),F=XT.FACT||{};
        const s1=a<=15?F.labRump:l>r+4?F.labL:r>l+4?F.labR:F.labBal;
        const s2=co<=15?F.libRump:n>m+4?(co>=76?F.libNRwin:F.libNRloss):m>=n?F.libMod:'';
        const s3=SPLIT&&(c[NATI]||0)>co?F.natTag:'';
        return [s1,s2,s3].filter(Boolean).join(' ');})();
      return `<div class="mcard flipcard faccard"><div class="mkick">How the factions fared</div><div class="mh">${hd}</div>
        ${sec('ALP','Labor caucus',['LL','LR','LU','NONE'])}${sec('LIB','Liberal party room',['LM','NR','CR','LBU','NONE'])}${sec('NAT','Nationals party room',['N_NSW','N_VIC','N_QLD','NONE'])}
        ${facNarr?`<p class="facnarr"><b>What the result means for the factions.</b> ${facNarr}</p>`:''}
        <p class="fmore">Members of both houses, by the faction they are reported to belong to. The Nationals have no formal factions, so they are grouped by state branch; Queensland's LNP members who sit with the Nationals are counted there. Leading figure: the most senior member still in Parliament. New members' factions are not yet known.</p></div>`;})();
    const more=`<div class="more"><h4>More from XYZ News</h4>

      ${facCard}</div>`;
    // ---- presented as a next-morning news article (fictional outlet and reporters)
    let h=(Math.imul(seed,2654435761)^Math.imul(RUNNO+1,40503)^BYSALT)>>>0||1; const rnd=n=>{h=(h^(h<<13))>>>0;h=(h^(h>>>17))>>>0;h=(h^(h<<5))>>>0;return h%n;}; for(let k=0;k<4;k++)rnd(2);
    const FN=['Harriet','Sam','Priya','Tom','Mei','Jack','Olivia','Lachlan','Ruby','Daniel','Grace','Aaron','Isla','Nikhil','Chloe','Hamish','Aisha','Ben','Sienna','Matilda','Josh','Anika','Liam','Zara','Declan','Hannah','Callum','Leila','Oscar','Bridget','Tariq','Ella','Fergus','Yasmin','Ned','Georgia','Kai','Imogen','Dominic','Mia','Rhys','Talia','Hugo','Sophie','Arjun','Lucy','Finn','Nadia'];
    const LN=['Lowe','Okafor','Natarajan','Whitaker','Chau','Fennessy','Brandt','Murray','Castellano','Ngata','Pemberton','Kowalski','McTavish','Rao','Nguyen','Papadopoulos','Gallagher','Singh','Bellamy','Tran','Hollis','Mahmoud','Doyle','Fitzgerald','Kaur','Sorensen','Barlow','Haddad','Quinlan','Mendoza','Ashby','Petrovic','Chen','Donnelly','Ward','Ibrahim','Larkin','Moretti','Hughes','Tanaka','O\'Brien','Vella','Kerr','Abboud','Sutherland','Lim','Costa','Reid'];
    const NAMES=null;
    const ROLES=['political reporter','chief political correspondent','national affairs editor','elections analyst','political editor'];
    const n1=FN[rnd(FN.length)]+' '+LN[rnd(LN.length)]; let n2=FN[rnd(FN.length)]+' '+LN[rnd(LN.length)]; if(n2.split(' ')[0]===n1.split(' ')[0]) n2=FN[(FN.indexOf(n1.split(' ')[0])+7)%FN.length]+' '+n2.split(' ')[1];
    const r1=ROLES[rnd(ROLES.length)], r2=ROLES.filter(r=>r!==r1)[rnd(ROLES.length-1)];
    // election day: the default date moved by any election-timing event; the article runs the next morning
    const eday=new Date(2028,4,20); eday.setDate(eday.getDate()+((LS&&LS.days!=null?LS.days:DATA.days)-DATA.days));
    const next=new Date(eday); next.setDate(next.getDate()+1);
    const dfmt=d=>d.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'}).replace(',','');
    const tm=(hh,mm)=>`${hh%12||12}:${String(mm).padStart(2,'0')}${hh<12?'am':'pm'}`;
    const posted=tm(rnd(2),rnd(60)), updated=tm(7+rnd(4),rnd(60));
    // news headline
    // headlines in the style of ABC election-night copy: sentence case, the leader's name, the result, then the twist
    const lostSeat=(n,j)=>{if(j===GI('CSA')&&NEWL[n]&&NEWL[n].p==='Community Strong'){const i=D.seats.findIndex(x=>x.n===NEWL[n].s);if(i>=0&&(R.likely[i]===j||R.likely[i]===4))return null;}const l=DATA.leaders.find(x=>x.name===n);if(!l||!l.seat||/Senat|Not in/.test(l.seat))return null;const sn=l.seat.replace(/ \(.*\)$/,''),i=D.seats.findIndex(x=>x.n===sn);return i>=0&&R.likely[i]!==j?sn:null;};
    const cLost=lostSeat(C,1),lLost=lostSeat(L,0),isAlbo=L==='Anthony Albanese';
    const tail=cLost?` as ${C} loses seat of ${cLost}`:on>co&&sec!==3?' as One Nation overtakes Coalition':on>=20&&!(top===3||sec===3)?` as One Nation surges to ${on} seats`:'';
    const labHL=()=>a>=90?(isAlbo?`Anthony Albanese wins third term in landslide`:`Labor wins landslide third term under ${L}`)
      :a>=85?`Labor re-elected with comfortable ${a}-seat majority`:a>=81?(isAlbo?`Albanese secures third term with ${a}-seat majority`:`Labor wins ${a}-seat majority, ${L} returned as prime minister`)
      :a>=78?`Labor holds on to slim ${a}-seat majority`:`Labor clings to power with ${a} seats`;
    const HL0={'One Nation tops the count':`One Nation emerges as largest party in election shock${maj?`, ${O} to become prime minister`:`, ${76-on} seats short of majority`}`,
      'The Coalition returns':`Coalition wins election, ${C} to become prime minister${lLost?` as ${L} loses seat of ${lLost}`:''}`,
      'A Coalition landslide':`Coalition sweeps back to power in landslide, ${C} to become prime minister${lLost?` as ${L} loses seat of ${lLost}`:''}`,
      'Coalition scrapes home':`Coalition edges into power with slim ${co}-seat majority under ${C}${lLost?` as ${L} loses seat of ${lLost}`:''}`,
      'A Labor landslide':labHL()+tail,
      'Labor wins comfortably':labHL()+tail,
      'Labor scrapes home':labHL()+tail,
      'Labor holds on':labHL()+tail,
      'Labor returned':labHL()+tail,
      'Labor routed':maj?`Labor routed as ${co>=on?`${C}'s Coalition`:'One Nation'} surges${lLost?`, ${L} loses seat of ${lLost}`:`, ${L} concedes defeat`}`:`Labor routed as ${co>=on?'Coalition':'One Nation'} surges to ${Math.max(co,on)} seats, but no party reaches 76`,
      'A hung parliament':(()=>{const n=76-a,sh=`${n} seat${n===1?'':'s'} short`,xb=c.reduce((t,v,j)=>t+(j!==0&&j!==1&&j!==3&&j!==NATI?v:0),0),cur0=DATA.current[0];
        // several hung-parliament headlines, chosen by what stands out in this result
        if(gr>=6)return `Greens win record ${gr} seats as Labor falls ${sh} of majority`;
        const opts=[];if(on>=30)opts.push(`One Nation's ${on} seats leave Labor ${sh} in hung parliament`);
        if(xb>=10)opts.push(`Crossbench holds balance of power as Labor falls ${sh} of majority`);
        if(gr>=3&&xb>=8)opts.push(`Greens and independents hold the keys as Labor falls ${sh}`);
        if(cur0-a>=20)opts.push(`Labor loses majority as ${isAlbo?'Albanese':L} faces minority government talks`);
        if(co>=35&&co>=on)opts.push(`Coalition comeback forces hung parliament, Labor ${sh}`);
        opts.push(`Hung parliament looms as Labor falls ${sh} of majority`);
        return opts[(a*7+on*3+co)%opts.length];})(),
      'A hung parliament, the Coalition ahead':(()=>{const H=XT.HL_COA||[],xbc=c.reduce((t,v,j)=>t+(j!==0&&j!==1&&j!==3&&j!==NATI?v:0),0),o=[];
        if(on>=30&&H[0])o.push(H[0]);if(xbc>=10&&H[1])o.push(H[1]);if(gr>=3&&xbc>=8&&H[2])o.push(H[2]);if(co-(DATA.current[1]||0)>=25&&H[3])o.push(H[3]);if(a>=60&&H[4])o.push(H[4]);o.push(H[5]||'Hung parliament looms as Coalition wins most seats but falls short of majority');
        return fillT(pk(o,'hlc'),{on,n:76-co,leader:C});})(),
      'Deadlock: grand coalition talk':`No clear winner as neither side can reach 76, grand coalition floated`,
      'Deadlock: no path to 76':`Election deadlock: no party or bloc can form government as fresh poll looms`,
      'Labor largest, but the right has the numbers':`Labor wins most seats, but ${on>co+(c[NATI]||0)?O:C} could take power in Coalition–One Nation deal`,
      'Coalition largest, but Labor can govern':`Coalition wins most seats, but ${labShort} on track to keep power with crossbench support`,
      'One Nation largest, but locked out':`One Nation wins most seats but faces being locked out of power`};
    if(top===NATI){const nl0=S.ldr['Nationals']||'Matt Canavan';HL0[head]=maj?`Nationals win government in historic upset, ${sur(nl0)} to become Prime Minister`:`Nationals finish as largest party for the first time, ${sur(nl0)} eyes The Lodge`;}
    const HL=new Proxy(HL0,{get:(o,k)=>o[k]||(head.includes('wins government')||head.includes('win a majority')?`${head} with ${sN(tn)} in historic upset`:head.includes('tops the count')?`${head}: ${PN(top)==='the Greens'?'Greens':cap(PN(top))} largest party on ${sN(tn)}`:k)});
    const oppNew=maj&&[0,1].includes(top)&&![0,1].includes(sec)&&sec!==4;
    const short=[];
    short.push(!maj&&![0,1,3].includes(top)?`No party has won a majority. ${cap(PN(top))} ${top===4||top===2?'are':'is'} the largest group with ${sN(tn)}.`:maj&&![0,1].includes(top)?`${cap(PN(top))} ${top===4||top===2?'have':'has'} won majority government with ${sN(tn)}.`:co>=76?`The Coalition has won majority government with ${co} seats.`:a>=76?`Labor has been returned with ${a} seats, ${a-75} more than it needs for a majority.`:`No party has won a majority. Labor has ${a} seats, the Coalition ${co} and One Nation ${on}.`);
    short.push(maj&&![0,1,3].includes(sec)&&[0,1].includes(top)?`${cap(PN(sec))} (${sN(c[sec])}) will form the official Opposition, ahead of ${[0,1,3].filter(j=>j!==top).sort((x,y)=>c[y]-c[x]).map(j=>`${PN(j)} (${c[j]})`).join(' and ')}.`:![0,1,3].includes(top)?`${cap(PN(sec))} ${sec===4||sec===2?'are':'is'} second with ${sN(c[sec])}${[0,1,3].filter(j=>j!==sec&&j!==top).map(j=>`; ${j===0?'Labor has':j===1?'the Coalition has':'One Nation has'} ${sN(c[j])}`).join('')}.`:on>co?`One Nation (${sN(on)}) has won more seats than the Coalition (${co}) for the first time.`:(on>DATA.current[3]?`One Nation has won ${sN(on)}, up from ${DATA.current[3]} before the election.`:on<DATA.current[3]?(on===0?`One Nation has been wiped out of the House, losing both the seats it held before the election.`:`One Nation falls to ${sN(on)}, down from ${DATA.current[3]} before the election.`):`One Nation holds its ${sN(on)}.`));
    short.push(![0,1,3].includes(top)?(maj?`${cap(PN(sec))} will lead the Opposition; ${150-tn-c[sec]} MPs sit on the crossbench.`:`To govern, ${PN(top)} will need ${76-tn} more seats from ${PN(sec)} or the crossbench.`):c.every(v=>v<76)?(xb.length?`The crossbench, including ${list(xb)}, will decide who governs.`:'The crossbench will decide who governs.'):(falls.length?cap(list(falls))+'.':`The crossbench will have ${150-tn-c[sec]} members.`));
    {const cb=coaBreak()[1];if(cb&&!SPLIT&&co>0){const parts=Object.entries(cb).filter(([,v])=>v).sort((x,y)=>y[1]-x[1]).map(([k,v])=>`${COASUB[k][0].replace(/ \(.*\)/,'')} ${v}`);if(parts.length>1)short.push(`Within the Coalition's ${co} seats: ${list(parts)}.`);}}
    const special=['Labor largest, but the right has the numbers','Coalition largest, but Labor can govern','One Nation largest, but locked out'].includes(head)||head.startsWith('Deadlock');
    if(special){const k=short.findIndex(s=>s.startsWith('The crossbench, including')||s==='The crossbench will decide who governs.');if(k>=0)short.splice(k,1);}
    if(head.startsWith('Deadlock'))short.push(`${leftOK?`Labor could govern only with ${nums(leftNeedX)} crossbenchers`:`Neither bloc can reach 76: Labor and its allies have ${nonRight}`}; the Coalition and One Nation have ${rightTot}.${a+co+ntS>=76?` Only a Labor–Coalition grand coalition (${a+co+ntS}) has a clear majority.`:''}`);
    else if(head==='Labor largest, but the right has the numbers')short.push(`A Coalition–One Nation deal (${rightTot} seats) would have the numbers to govern; Labor and its allies have ${nonRight}.`);
    else if(head==='Coalition largest, but Labor can govern'||head==='One Nation largest, but locked out')short.push(`Labor and the crossbench (${nonRight}) have the numbers to govern; the right has ${rightTot}.`);
    const nGen=short.length;
    short.push(...seatShort);
    const nt=c[NATI]||0, NL=S.ldr['Nationals']||'Matt Canavan', lib=c[1], N0=DATA.split.cur[1], vN=nt>=N0?'good':nt>=Math.ceil(N0*0.55)?'mid':'bad';
    const capS=canCap()?' Canavan himself makes the jump to the lower house, winning Capricornia.':' Worse, Canavan loses Capricornia and is left without a seat in Parliament.';
    const NATL={'Matt Canavan':{good:`Canavan's bet that the Nationals could out-fight One Nation in the bush on their own terms pays off: the party holds ${sN(nt)}, ${nt>N0?'up from':'matching'} the ${N0} it took into the election.${capS}`,
        mid:`Canavan's go-it-alone strategy delivers a mixed night: ${sN(nt)}, down from ${N0}, as One Nation bites into the party's heartland.${capS}`,
        bad:`The split proves disastrous for the Nationals. Reduced to ${sN(nt)} from ${N0}, Canavan's party is swamped by One Nation across regional Queensland and New South Wales, and its future as a separate force is in doubt.${capS}`},
      'Darren Chester':{good:`Chester's steady, local-member style holds the Nationals together on their own: ${sN(nt)}, ${nt>N0?'up from':'matching'} ${N0}.`,
        mid:`Chester keeps the Nationals alive as an independent force, but at a price: ${sN(nt)}, down from ${N0}.`,
        bad:`Chester's moderate pitch finds few takers in a bush turning to One Nation. The Nationals fall to ${sN(nt)} from ${N0}.`},
      'Kevin Hogan':{good:`Kevin Hogan, the former deputy leader from Page, leads the Nationals to ${sN(nt)} in their own right, ${nt>N0?'up from':'matching'} ${N0}. The north coast's quiet operator has had a loud night.`,
        mid:`Hogan holds the Nationals together after the split, on ${sN(nt)} from ${N0}: bruised, but standing.`,
        bad:`Hogan's first election as leader is a hard one: the Nationals fall to ${sN(nt)} from ${N0}, squeezed between the Liberals and One Nation.`},
      'Michael McCormack':{good:`Michael McCormack, back in the leadership Barnaby Joyce once took from him, leads the Nationals to ${sN(nt)}, ${nt>N0?'up from':'matching'} ${N0}. A quiet vindication.`,
        mid:`McCormack's return brings stability but not growth: the Nationals finish on ${sN(nt)}, down from ${N0}.`,
        bad:`McCormack's second stint ends badly, with the Nationals cut to ${sN(nt)} from ${N0}.`},
      'Bridget McKenzie':{good:`McKenzie's combative campaign pays off: the Nationals hold ${sN(nt)} running in their own right, ${nt>N0?'up from':'matching'} ${N0}.`,
        mid:`McKenzie leads the Nationals through their first campaign alone and comes out bruised, on ${sN(nt)} from ${N0}.`,
        bad:`McKenzie's Nationals are routed in their first election outside the Coalition, cut to ${sN(nt)} from ${N0}.`},
      'David Littleproud':{good:`Back in the leadership, Littleproud steers the Nationals through the split with ${sN(nt)}, ${nt>N0?'up from':'matching'} ${N0}.`,
        mid:`Littleproud's return steadies the Nationals but cannot stop the bleeding: ${sN(nt)}, down from ${N0}.`,
        bad:`Littleproud's second stint ends in heavy losses: the Nationals are reduced to ${sN(nt)} from ${N0}.`}};
    const nl=fillT(((XT.NATL||{})[NL]||(XT.NATL||{})._||{})[vN]||(NATL[NL]||{})[vN]||'',{nt:sN(nt).replace(/ seats?$/,''),N0,upm:nt>N0?'up from':'matching',Leader:NL});
    const bloc=c.some(v=>v>=76)?(a>=76?` With Labor governing in its own right, ${lib===0||nt===0?`${lib===0?'the Liberals, wiped out of the House, and the Nationals':'the Nationals, wiped out of the House, and the Liberals'} must decide whether there is anything left to rebuild: the old §COA§ partners hold just ${sN(lib+nt)} between them.`:`the Liberals (${lib}) and Nationals (${nt}) must decide whether to face three years in opposition apart or rebuild the §COA§: together they hold ${sN(lib+nt)}.`}`:'')
      :lib+nt>=76?` Together the Liberals (${lib}) and Nationals (${nt}) hold ${lib+nt} seats, enough to govern if they can stitch the §COA§ back together, and both leaders will face intense pressure to do it within days.`
      :lib+nt+on>=76?` The Liberals (${lib}), Nationals (${nt}) and One Nation (${on}) together reach ${lib+nt+on}: a three-way deal is the right's only path to government.`
      :` Even together, the Liberals (${lib}) and Nationals (${nt}) are well short of a majority.`;
    const natSenR=/Senat/.test((DATA.leaders.find(l=>l.name===NL&&l.party==='Nationals')||{}).seat||'');
    const natGov=(lib+nt>=76||(govSides&&lib+nt>0&&lib>=a))?' '+(natSenR?fillT(XT.NAT_REUNITE_SEN,{...pv(NL),leader:NL}):`If the two parties do reunite in government, ${NL} is the Liberals' obvious Deputy Prime Minister.`):'';
    const natBeat=SPLIT&&nt>=N0&&co<(DATA.split.cur[0]||0)?' '+fillT(XT.COA_NATBEAT,{surname:sur(C),nt}):'';
    const natPara=`This was the first election since the Liberals and Nationals tore up their §COA§ agreement and ran candidates against each other in the regions. ${nl}${bloc}${natGov}${natBeat}`;
    // wipeouts: a major party left with no House seats at all
    if(S.cind){const k=P.findIndex(g=>g.ab==='CSA'),n=c[k];short.push(`Community Strong, which absorbed five sitting community independents before the campaign, finishes with ${sN(n)} (it went in with ${DATA.current[k]}).`);}
    let tbPara='';
    if(TB()){const wi=D.seats.findIndex(s=>s.n==='Wentworth'),won=wi>=0&&R.likely[wi]===iCSA,wv=wi>=0?R.prob[wi][iCSA]:0;
      tbPara=won?`And ten years after he walked out of Parliament, Malcolm Turnbull is coming back. Standing in Wentworth, the harbourside seat he held from 2004 to 2018, in place of sitting member Allegra Spender, the former prime minister wins it again for Community Strong.`
        :`Malcolm Turnbull's comeback falls short in his own backyard. The former prime minister stood for Community Strong in Wentworth, the seat he held from 2004 to 2018, and drew crowds, cameras and plenty of Liberal anxiety, but not enough votes.`;
      short.push(won?'Former prime minister Malcolm Turnbull wins back Wentworth for Community Strong.':'Malcolm Turnbull fails in his bid to win back Wentworth for Community Strong.');}
    const wipe=[], seatOf=n=>{const l=DATA.leaders.find(x=>x.name===n);return l&&l.seat?l.seat.replace(/ \(.*\)$/,''):'';}, inHouse=n=>{const s=seatOf(n);return s&&!/Senator/.test(s);};
    const WP=k=>{const p=(XT.WIPE||{})[k]||[];return p.length?p[hsh('wipe_'+k)%p.length]:['',''];};
    const FE={'Anthony Albanese':1996,'Jim Chalmers':2013,'Tanya Plibersek':1998,'Richard Marles':2007,'Tony Burke':2004,'Chris Bowen':2004,"Clare O'Neil":2013,'Jason Clare':2007,'Anika Wells':2019,'Mark Butler':2007,'Madeleine King':2016,'Ed Husic':2010};
    const noSeat=t=>t.replace(/\s*\((?:who lost|losing|having lost) \{seat\}(?: in the process)?\)/,'').replace(/^Having lost \{seat\} in the rout, /,'');
    if(a===0){const ls=seatOf(L),[m0,t0]=WP('lab');wipe.push(fillT(m0,V0()));
      if(inHouse(L)&&t0){const y=FE[L]?eday.getFullYear()-FE[L]:0;wipe.push(fillT(y<=1?t0.replace('{his/her} home for {years} years','{his/her} home seat'):t0,{...pv(L),seat:ls,years:y}));}
      else wipe.push(`${L} went down with the rest of the party, and conceded to a near-empty function room. History will not be gentle: ${he(L)} will be remembered as the leader who took the party of Curtin, Chifley, Whitlam and Hawke from the government benches to nothing in a single night.`);
      short.push('Labor is wiped out of the House of Representatives for the first time in its history.');}
    if(!SPLIT&&co===0){const [m0,t0]=WP('coa');wipe.push(fillT(m0,V0()));if(t0)wipe.push(fillT(inHouse(C)?t0:noSeat(t0),{...pv(C),seat:seatOf(C)}));
      short.push('The Liberal and National parties are wiped out of the House: not one seat.');}
    if(SPLIT&&lib===0){const [m0,t0]=WP('lib');wipe.push(fillT(m0,V0()));if(t0)wipe.push(fillT(inHouse(C)?t0:noSeat(t0),{...pv(C),seat:seatOf(C)}));
      short.push('The Liberal Party fails to win a single House seat.');}
    if(SPLIT&&nt===0){const [m0,t0]=WP('nat');wipe.push(fillT(m0,V0()));if(t0)wipe.push(fillT(t0,{...pv(NL),seat:seatOf(NL),inH:inHouse(NL)}));
      short.push('The Nationals are wiped out of the House, losing every seat.');}
    if(on===0&&DATA.current[3]>0){wipe.push(fillT(WP('on')[0],{...V0(),...pv(O)}));
      short.push('One Nation loses every House seat it held.');}
    if(gr===0&&DATA.current[2]>0){wipe.push(fillT(WP('grn')[0],{...V0(),...pv(G)}));}
    if(csa===0&&DATA.current[iCSA]>0){const CC=XT.WIPE_CSACLOSE||{},cs0=(DATA.leaders.find(l=>l.name===CL&&l.party==='Community Strong')||{}).seat||'';
      const close=CC[CL]||(CL!=='No formal leader'?fillT(CC['Scamps / Ryan / Chaney / Haines']||'',{...pv(CL),seat:cs0.replace(/ \(.*\)$/,'')}):'');
      wipe.push(fillT(WP('csa')[0],{cind:!!S.cind,before:nums(DATA.current[iCSA])})+(close?' '+close:''));}
    if(ind===0&&DATA.current[4]>0){wipe.push(fillT(WP('ind')[0],V0()));}
    if(SPLIT&&nt>0) short.push(`The Nationals, running separately from the Liberals for the first time, win ${sN(nt)} (${N0} before the election); the Liberals win ${sN(lib)}.`);
    const sents=body.split(/(?<=\.)\s+(?=[A-Z])/), paras=sents.length<=3?[sents.join(' ')]:[sents.slice(0,2).join(' '),...(sents.length>6?[sents.slice(2,5).join(' '),sents.slice(5).join(' ')]:[sents.slice(2).join(' ')])];
    const pparas=extra.split('¶').map(s=>s.trim()).filter(Boolean), kparas=kmx.split('¶').map(s=>s.trim()).filter(Boolean);
    // section openers so the report reads as one piece rather than stacked paragraphs
    const topFlip=flipL[0]?flipL[0][0].split('>').map(Number):null;
    // close seats are not declared on the night: a pseudo-random day (2 to 14 days later) and time, the tightest last; recounts when the lead is tiny
    const DECL=x=>{let hsh=0;for(const ch of x.s.n)hsh=(hsh*31+ch.charCodeAt(0))%9973;const r1=(hsh%997)/997,r2=((hsh*37+x.s.n.length*131)%211)/211,lead=Math.round(2*x.m/100*x.s.fv*0.92);
      const rc=lead<100?`Full recount · lead ${lead} votes`:lead<400?`Recount requested · lead ${lead} votes`:'';
      const days=Math.min(14,Math.max(2,Math.round(2+(1-Math.min(1,x.m/0.6))*7+r1*4+(rc?3:0)))),d=new Date(eday);d.setDate(d.getDate()+days);
      const mins=10*60+Math.round(r2*8.5*60),tm=`${((Math.floor(mins/60)+11)%12)+1}:${String(mins%60).padStart(2,'0')}${mins>=720?'pm':'am'}`;
      return {when:`${d.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'})}, ${tm}`,rc,lead,days};};
    const CP=callPlan().sort((x,y)=>x.at-y.at),cnt76=new Array(NG).fill(0);let callAt=null,callW=null;for(const p of CP){const w=R.likely[p.i];cnt76[w]++;if(cnt76[w]>=76&&callAt==null){callAt=p.at;callW=w;}}
    const lastP=CP[CP.length-1],lastM=seatMargin(lastP.i),lastS=D.seats[lastP.i];
    const stageX=maj&&lead1!=null?fillT(pk(XT.EN_MAJ,'en_maj'),{W:ld(lead1),PW:where(lead1),R:runNm,PR:where(run1),runUp,time:callAt!=null?clock12(callAt):'midnight'})
      :lead1!=null?fillT(pk(XT.EN_NOMAJ,'en_nomaj'),{L1:ld(lead1),PL1:where(lead1),L2:ld(run1),PL2:where(run1)}):stage;
    const stageY=stageX.replace(/^At in /,'In ').replace(/^At with party faithful, /,'With party faithful, ').replace(/^Addressing supporters with party faithful/,'Addressing party faithful');
    const nightP=`${stageY} `+(callAt!=null?fillT(pk(XT.EN_CALL,'en_call'),{party:callW===0||callW===3?P[callW].n:PN(callW),time:clock12(callAt),early:callAt<1200})+' ':fillT(pk(XT.EN_CALLX,'en_callx'),{time:clock12(lastP.at)})+' ')
      +`The last seat projected was ${lastS.n} in ${STF[lastS.st]}, at ${clock12(lastP.at)}${lastM?`, where ${mapName(lastS,lastM.w,R.base[lastP.i])} led ${mapName(lastS,lastM.r,R.base[lastP.i])} by ${lastM.m<0.5?'just ':''}${lastM.m.toFixed(2)} points`:''}. ${(()=>{const dd=decided.map(DECL),nr=dd.filter(z=>z.rc).length,mx=Math.max(...dd.map(z=>z.days));return fillT(pk(XT.EN_DECL,'decl'),{quick:mx<10,rc:nr>0,n:nums(nr)}).replace(/\bone (formal )?(recount|seat|contest)s\b/,'one $1$2');})()}`;
    const SUB=t=>`<h4 class="news-sub">${t}</h4>`;
    // leadership changes after the election: a leader who loses their seat, or whose party loses badly, is replaced by one of the alternatives
    const SPILLS=(()=>{const out=[],FK={},succ=(pty,j,cur)=>{
        // parties with factions: a surviving frontbencher, the largest faction favoured (see FACM.pick)
        const pk=pty==='Labor'?'ALP':pty==='Coalition'?'LIB':pty==='Nationals'?'NAT':null;
        if(pk){const r=FACM.pick(pk,cur);if(r){FK[pty]=r;return r.n;}}
        // everyone else: the most senior figure from the party's leadership pool still in Parliament, then its longest-listed MP or senator
        const ok=DATA.leaders.filter(l=>l.party===pty&&l.name!==cur&&!/^No /.test(l.name)&&(/Senat/.test(l.seat||'')||!lostSeat(l.name,j))).sort((x,y)=>(x.rk??99)-(y.rk??99));const okH=ok.filter(l=>!/Senat/.test(l.seat||''));if((c[j]||0)>=5&&okH.length)return okH[0].name;if(ok.length)return ok[0].name;
        const g=j===NATI?NATI:j,mps=D.seats.map((s,i)=>[s,i]).filter(([s,i])=>gOf(s)===g&&R.likely[i]===g&&(HELDBY[s.n]||s.mem)).map(([s])=>HELDBY[s.n]||s.mem);
        const sk=pty==='Labor'?'ALP':pty==='Greens'?'GRN':pty==='One Nation'?'ON':'COA',room=pty==='Nationals'?'N':pty==='Coalition'?'L':null;
        const sens=SENATE.filter(s=>s.k===sk&&(!room||s.room===room)&&s.n!==cur).filter(s=>{const F=senFate(s);return F.cont||F.hold;}).map(s=>s.n);
        const pool=mps.concat(sens).filter(n=>n!==cur);return pool.length?pool[0]:null;};
      const gv=govSides().gov,nt=c[NATI]||0,senLost=n=>{const sn=SENBY[n];if(!sn)return null;const F=senFate(sn);if(F.retire)return null;return !F.cont&&!F.hold?'their Senate seat':null;};
      const chk=(pty,j,n,room,big,day)=>{if(!n||n==='—')return;const lost=lostSeat(n,j)||senLost(n);if(!lost&&!big)return;const nx=succ(pty,j,n),fr=FK[pty]||null,fk=fr?fr.k:null,gone=DATA.leaders.filter(l=>l.party===pty&&l.name!==n&&!/^No /.test(l.name)).map(l=>sur(l.name));out.push({pty,n,next:nx,room,lost,day,gone,fk,fr});};
      chk('Labor',0,L,'Labor caucus',gv!==0&&(maj||a<55),6);
      chk('Coalition',1,C,'Liberal party room',gv!==1&&(co<DATA.current[1]-5||co<35),5);
      if(SPLIT)chk('Nationals',NATI,ld(NATI),'Nationals party room',nt<DATA.split.cur[1]-4,5);
      chk('One Nation',3,O,'One Nation',on<DATA.current[3],7);
      chk('Greens',2,G,'Greens party room',gr===0&&DATA.current[2]>0,8);
      return out;})();
    // how the report describes a new leader: frontbench or backbench, and their faction against the largest one
    const whoOf=x=>{const r=x.fr,F=r.k?FACN[r.k][0]:null,B=r.big&&FACN[r.big]?FACN[r.big][0]:null;
      if(r.front)return F?(r.k===r.big?`a frontbencher from the largest faction, the ${F}`:`a frontbencher from the ${F}, who wins the room despite the ${B} having the numbers`):'a senior frontbencher';
      return F?`a ${F} backbencher, with the frontbench gone`:'a backbencher, with the frontbench gone';};
    // what happens next: a dated timeline from election night to the first sitting
    const tl=(()=>{const add=n=>{const d=new Date(eday);d.setDate(d.getDate()+n);return d.toLocaleDateString('en-AU',{weekday:'short',day:'numeric',month:'short'});};
      const govP=govSides().gov,spG=SPILLS.find(x=>x.next&&(x.pty==='Labor'?0:x.pty==='Coalition'?1:x.pty==='One Nation'?3:x.pty==='Greens'?2:NATI)===govP),pmN=spG?spG.next:ld(govP),hasPM=pmN&&pmN!=='—'&&!noL(govP),it=[];
      const isGrand=head==='Deadlock: grand coalition talk',isDead=head.startsWith('Deadlock'),careN=lostE(L,0)?'Labor':`${L}`;
      it.push([0,`${hasPM?pmN:cap(PN(govP))} claims ${maj?'victory':'the first chance to form government'}; ${maj?`${ld(sec)&&!noL(sec)?ld(sec):cap(PN(sec))} concedes`:'the crossbench is courted'}`]);
      if(!maj&&!formOK()){it.push([2,`Caretaker government: ${careN==='Labor'?'Labor':careN} ${careN==='Labor'?'stays in office':'remains Prime Minister'} while the talks continue`]);
        it.push([3,isGrand?'Labor and Coalition negotiating teams hold first talks on a possible grand coalition':'Formal talks with the crossbench begin in Canberra']);
        it.push([10,'Party leaders tell the Governor-General who can win a confidence vote']);
        if(isDead)it.push([60,'If no one can survive a confidence vote, a fresh election becomes likely within months']);}
      else if(!maj)it.push([3,'Formal talks with the crossbench begin in Canberra']);
      SPILLS.forEach((x,xi)=>it.push([x.day,x.next&&x.fr&&xi===0?fillT(pk(XT.SPILL1,'spill_report'),{'Party room':x.room,successor:`<b>${x.next}</b>`,who:whoOf(x),surname:sur(x.n),lost:!!x.lost,lostWhat:x.lost||''}):x.next?`${x.room} meets: <b>${x.next}</b>${x.fr?`, ${whoOf(x)},`:''} is elected leader, replacing ${sur(x.n)}${x.lost?`, who lost ${x.lost}`:''}`:`${x.room} meets to replace ${sur(x.n)}${x.lost?`, who lost ${x.lost}`:''}, but with ${list(x.gone)} all gone too, there is no obvious successor`]));
      if(maj||formOK())it.push([maj?9:16,`${hasPM?pmN:'The new Prime Minister'} and the ministry are sworn in at Government House, Yarralumla`]);
      else it.push([17,`Earliest likely date for a ${isGrand?'grand coalition':'minority'} ministry to be sworn in, as in 2010, when it took 17 days`]);
      it.push([19,'The AEC declares the last seats; recounts in the closest contests']);
      it.push([40,maj||formOK()?'The 49th Parliament opens: MPs sworn in, the Speaker elected, the first Question Time':'The 49th Parliament opens: the vote for Speaker and the first confidence motion test the numbers']);
      {let dj=Math.round((new Date(2028,6,1)-eday)/864e5);if(dj<=0)dj=Math.round((new Date(2029,6,1)-eday)/864e5);it.push([S.dd?40:dj,S.dd?'All 76 senators take their seats':'The new senators take their seats on 1 July']);}
      return it.sort((x,y)=>x[0]-y[0]).map(([n,txt])=>`<li><b>${n===0?'Election night':add(n)}</b><span>${txt}</span></li>`).join('');})();
    // reader-chosen government (hung parliaments only)
    const FM=formOK();let formP='',formShort='';
    if(FM){const pm=FM.pm,pt=FM.part,L0=ld(pm),hasL=L0&&L0!=='—'&&!noL(pm)&&!L0.startsWith('Collective'),who=hasL?L0:`The ${P[pm].n} leader`,pn=cap(PN(pm)),ptn=pt>=0?PN(pt):'',
       Lp=pt>=0?ld(pt):null,hasLp=pt>=0&&Lp&&Lp!=='—'&&!noL(pt)&&!Lp.startsWith('Collective'),days=[9,12,16,17,19][(c[pm]+(pt>=0?c[pt]:0))%5],
       larger=P.map((_,j)=>j).filter(j=>j!==4&&c[j]>c[pm]).sort((x,y)=>c[y]-c[x])[0],oppG=govSides().opp;
     const lead=`After ${days} days of negotiations, ${who} has been sworn in as Prime Minister by the Governor-General at Government House in Yarralumla.`
       +(larger!=null?` It is a remarkable outcome: ${PN(larger)} won more seats (${c[larger]}) than ${PN(pm)} (${c[pm]}), but could not show it commanded the House.`:'');
     const deal=FM.arr==='coalition'?` ${pn} and ${ptn} have signed a formal coalition agreement, with cabinet posts shared between them${hasLp?` and ${Lp} sworn in as Deputy Prime Minister`:''}. Together they hold ${sN(FM.n)}.`
       :FM.arr==='cs'?` ${pn} governs alone, but with a written confidence-and-supply agreement: ${ptn}${/s$/.test(ptn)?"'":"'s"} ${nums(c[pt])} MP${c[pt]>1?'s':''} will back the budget and vote down any no-confidence motion${hasLp?`, a deal ${Lp} says came with a long list of conditions`:''}, in exchange for policy wins and a seat at the table on legislation. On paper the arrangement commands ${sN(FM.n)}.`
       :` ${pn} will govern as a minority government with no formal partner, ${76-c[pm]} seats short of a majority, surviving each vote by persuading crossbenchers one bill at a time.`;
     const tail=FM.n>=76?` That is enough to govern, though a single defection would test it.`
       :` That is still short of 76. The other ${150-FM.n} MPs outnumber the government, so it survives only as long as ${oppG!=null?PN(oppG):'the Opposition'} and the rest of the crossbench cannot agree on an alternative. The first no-confidence motion will be the real test.`;
     formP=lead+deal+tail;
     formShort=(`${hasL?L0:pn} forms a ${FM.arr==='coalition'?`${PN(pm).replace(/^the /,'')}–${ptn.replace(/^the /,'')} coalition`:FM.arr==='cs'?`minority government backed by ${ptn} on confidence and supply`:`${PN(pm).replace(/^the /,'')} minority government`} (${sN(FM.n)}).`);}
    const leadSub=pparas.length?(maj?'What it means for the leaders':'The leaders, and what comes next'):'';
    const kmSub=kparas.length?'The crossbench holds the keys':'';
    const kmIntro=kparas.length?`<p class="news-p">${fillT(pk(XT.XBINTRO,'xb_intro'),{many:kparas.length>1,Number:cap(nums(kparas.length))})}</p>`:'';
    // ABC-style "In short" box: two or three plain sentences, then "What's next?"
    const hon=n=>(SHE.includes(n)?'Ms ':'Mr ')+sur(n), poss=n=>n+(n.endsWith('s')?"'":"'s");
    const gw=govSides().gov,gwL=ld(gw),gwHas=gwL&&gwL!=='—'&&!noL(gw)&&!gwL.startsWith('Collective');
    const sLead=FM?`${gwHas?gwL:cap(PN(gw))} will form government after ${PN(gw)} ${FM.arr==='coalition'?`struck a coalition deal with ${PN(FM.part)}`:FM.arr==='cs'?`secured a confidence-and-supply agreement with ${PN(FM.part)}`:'chose to govern in minority'}, with no party winning the 76 seats needed for a majority.`
      :maj&&top===0?fillT(pk(XT.IS.labMaj,'is_lab'),{Leader:L,a,albo:isAlbo})
      :maj&&top===1?fillT(pk(XT.IS.coaMaj,'is_coa'),{leader:C,co})
      :maj?`${cap(PN(top))} ${top===4||top===2?'have':'has'} won majority government with ${sN(tn)}${gwHas?`, and ${gwL} is set to become prime minister`:''}.`
      :fillT(pk(XT.IS.noMaj,'in_short_lead'),{party:PN(top),n:tn});
    const MS=XT.MILESTONE||{},leyLost=C==='Sussan Ley'&&((S.cand||{}).Farrer||{}).n==='Sussan Ley'&&(()=>{const i=D.seats.findIndex(x=>x.n==='Farrer');return i>=0&&!(R.likely[i]===1||R.likely[i]===NATI);})();
    const natSen=SPLIT&&top===NATI&&maj&&/Senat/.test((DATA.leaders.find(l=>l.name===(S.ldr['Nationals']||'Matt Canavan')&&l.party==='Nationals')||{}).seat||'');
    const mile=co>=76&&C==='Sussan Ley'?MS[leyLost?'Sussan Ley majority, lost Farrer':'Sussan Ley majority']:a>=76&&L==='Ed Husic'?MS['Ed Husic majority']
      :(co>=76&&C==='James Paterson')||natSen?fillT(MS['James Paterson or Senate Nationals leader majority'],{Leader:co>=76?C:(S.ldr['Nationals']||'Matt Canavan')})
      :a>=76&&L==='Anika Wells'?MS['Anika Wells majority']:top===2&&maj&&G==='Elizabeth Watson-Brown'?MS['Elizabeth Watson-Brown majority']
      :top===3&&maj&&O==='Pauline Hanson'?MS['Pauline Hanson majority']:top===iCSA&&maj&&CL==='No formal leader'?MS['Community Strong majority, no formal leader']:'';
    const winIn=(n,j)=>{const s0=lostSeat(n,j);if(!s0)return '';const i=D.seats.findIndex(x=>x.n===s0);return mapName(D.seats[i],R.likely[i],R.base[i]);};
    const twist=cLost&&(co>=76||gw===1)?`${C} has lost ${his(C)} ${NEWL[C]&&NEWL[C].t==='c'?'own bid for':'own seat of'} ${cLost} to ${(w=>w==='Independent'?'an independent':w)(winIn(C,1))}, and will lead the government from outside the House until a by-election can be found.`
      :cLost?`Opposition Leader ${C} has lost ${his(C)} ${(NEWL[C]&&NEWL[C].t==='c')||/candidate/.test((DATA.leaders.find(l=>l.name===C)||{}).seat||'')?'bid for':'own seat of'} ${cLost} to ${(w=>w==='Independent'?'an independent':w)(winIn(C,1))}, the second Opposition leader in a row to lose their own seat after Peter Dutton in 2025.`
      :lLost?`${isAlbo?'Prime Minister':'Labor leader'} ${L} has lost ${SHE.includes(L)?'her':'his'} own seat of ${lLost}.`
      :sec===3&&maj?`One Nation has won more seats than the Coalition, putting ${O} in line to lead the official Opposition.`
      :on>=15&&top!==3?`One Nation has surged to ${on} seats, up from ${DATA.current[3]} before the election.`:'';
    // ---- the campaign: what shaped this result, written from the sandbox settings (events, presets, leaders, rules)
    // ---- who swung: for the parties that moved most, the Census measure their seat-by-seat swing tracks most closely
    const demoP=(()=>{const PH={0:['the oldest electorates','the youngest electorates'],1:['the wealthiest seats','the poorest seats'],5:['seats full of renters','seats dominated by home owners'],
        7:['seats with the most university graduates','seats with the fewest university graduates'],12:['seats with the most overseas-born voters','seats where most voters were born in Australia'],
        14:['the most secular seats','the most religious seats'],15:['farming communities','the big cities'],17:['seats with large Muslim communities',null],19:['seats with large First Nations populations',null],
        20:['Chinese-Australian communities',null],21:['South Asian communities',null],23:['seats with the most tradies','seats with the fewest tradies'],26:['mining communities',null],
        28:['public-service seats',null],30:['apartment-heavy inner suburbs','detached-house suburbs'],32:['low-income seats','high-income seats']};
      const ks=Object.keys(PH).map(Number).filter(k=>D.seats[0].cz.length>k),corr=(xs,ys)=>{const n=xs.length,mx=xs.reduce((a,b)=>a+b,0)/n,my=ys.reduce((a,b)=>a+b,0)/n;let sxy=0,sxx=0,syy=0;for(let i=0;i<n;i++){sxy+=(xs[i]-mx)*(ys[i]-my);sxx+=(xs[i]-mx)**2;syy+=(ys[i]-my)**2;}return sxx&&syy?sxy/Math.sqrt(sxx*syy):0;};
      const out=[],usedK=new Set();[[3,'One Nation'],[0,'Labor'],[1,'the Coalition'],[2,'the Greens']].forEach(([j,nm])=>{if(out.length>=2)return;
        const idx=D.seats.map((s,i)=>i).filter(i=>{const o=grpV(D.seats[i].b,D.seats[i])[j],n=grpV(R.base[i],D.seats[i])[j];return o>2||n>2;});if(idx.length<40)return;
        const sw=idx.map(i=>grpV(R.base[i],D.seats[i])[j]-grpV(D.seats[i].b,D.seats[i])[j]),avg=sw.reduce((a,b)=>a+b,0)/sw.length;if(Math.abs(avg)<2)return;
        const r=ks.map(k=>[k,corr(idx.map(i=>D.seats[i].cz[k]),sw)]).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]));
        // phrase for where the swing was biggest in the party's direction
        const pick=r.map(([k,c])=>{const hi=(c>0)===(avg>0);const t=hi?PH[k][0]:PH[k][1];return t&&Math.abs(c)>0.3&&!usedK.has(k)?[k,t,Math.abs(c)]:null;}).filter(Boolean);if(!pick.length)return;
        const a1=pick[0],a2=pick.find(x=>x[0]!==a1[0]&&!(([7,23].includes(x[0])&&[7,23].includes(a1[0]))));
        usedK.add(a1[0]);if(a2)usedK.add(a2[0]);
        const top=idx.map((i,x)=>[i,sw[x]]).sort((a,b)=>avg>0?b[1]-a[1]:a[1]-b[1])[0],tp=top[1];
        {let k0=0,t=pk(XT.SWUNG,'who_swung|'+nm).replace(/\{group\}/g,()=>'{g'+(++k0)+'}');
         if(!a2)t=t.replace('From {g1} to {g2}','Across {g1}').replace('{g1} and {g2}','{g1}');
         out.push(cap(fillT(t,{Party:nm,g1:a1[1],g2:a2?a2[1]:'',seat:D.seats[top[0]].n,n:Math.abs(tp).toFixed(1),up:avg>0})));}});
      return out;})();
    const campP=(()=>{const E=S.ev||{},ps=[],ev=(k)=>E[k]&&E[k]!=='Default'?E[k]:null,g0=(v,d)=>v>=0?d[0]:d[1];
      const EVT={
        'Recession':`The economy did the government no favours. A recession arrived in the final months of the term, and every quarterly figure became a Coalition attack ad.`,
        'Cost-of-living crisis deepens':`Grocery bills, power prices and rents dominated every street-corner conversation, and the mood in the outer suburbs soured week by week.`,
        'Interest-rate cuts lift the mood':`A run of interest-rate cuts lifted the mood in mortgage-belt seats, and Labor spent the campaign reminding voters who had been in charge when relief arrived.`,
        'Housing crisis worsens':`Housing was the issue that would not go away. Rents climbed again, first-home buyers gave up, and both major parties were punished for a decade of promises.`,
        'Mining / resources boom':`A fresh resources boom filled the budget and Western Australia's coffers, giving the government room to spend in the campaign's final weeks.`,
        'Major ministerial scandal':`A ministerial scandal broke mid-campaign and dominated a full week of coverage, knocking the government off its message just as early voting opened.`,
        'Popular budget':`The pre-election budget landed well, with cost-of-living relief that polled strongly and left the Opposition arguing about details.`,
        'Unpopular budget':`An unpopular budget set the tone early. Its cuts were still being litigated on talkback radio on polling day.`,
        'Long-term government fatigue':`After two terms, the "time for a change" mood was hard to shake. Voters struggled to name what a third Labor term was for.`,
        'Broken election promise':`A broken promise from the last campaign returned to haunt the government, replayed in attack ads in every marginal seat.`,
        'Coalition splits (Libs and Nats run against each other)':`The Coalition fought this election as two parties, the Liberals and Nationals running candidates against each other in seats they once shared.`,
        'Leadership spill and infighting':`The Liberals spent much of the term fighting each other, and voters noticed. Leaks, spills and backgrounding followed the party into the campaign.`,
        'Unites behind a strong campaign':`The Coalition, for once, ran a disciplined campaign: one message, no leaks, and a leader who stayed on script for six weeks.`,
        'Drops net zero':`The Coalition's decision to drop net zero won back some regional voters and lost others in the cities, a trade it may now be counting the cost of.`,
        'Moves to the centre':`The Liberals' lurch back to the centre was aimed squarely at the teal seats, and the party spent the campaign in the leafy suburbs it had lost.`,
        'Candidate scandals':`One Nation was dogged by candidate scandals, with several disendorsed after nominations closed but still on the ballot paper.`,
        'Strong ground campaign':`One Nation built a genuine ground campaign this time, with volunteers on every booth in regional Queensland and the outer suburbs.`,
        'Pauline Hanson retires':`Pauline Hanson's retirement left One Nation without the face that had defined it for three decades.`,
        'Preference deal with the Coalition':`The Coalition and One Nation swapped preferences, a deal that changed the arithmetic in dozens of regional seats.`,
        'Hits a ceiling (soft vote drifts home)':`One Nation's soft support drifted home in the final fortnight, as voters who had flirted with a protest vote returned to the major parties.`,
        'Teal / community independent wave':`Community independents ran in more seats than ever, with well-funded campaigns and volunteer armies in the suburbs.`,
        'Greens surge':`The Greens' message on housing and climate cut through with younger voters, especially renters in the inner cities.`,
        'Greens slump':`The Greens struggled to be heard, squeezed between Labor and the independents in their best seats.`,
        'Independents fade':`The independent wave of 2022 and 2025 receded, as voters returned to the major parties in seats once seen as safe for the crossbench.`,
        'Minor-party fragmentation':`The ballot papers were longer than ever. Minor parties stood in nearly every seat, and the major parties' combined vote fell to a record low.`,
        'Labor wins the campaign':`Labor won the campaign itself: a sharper message, fewer mistakes and a leader who looked comfortable on the trail.`,
        'Coalition wins the campaign':`The Coalition won the campaign. Its message was simpler, its leader more disciplined, and it set the agenda for most of the six weeks.`,
        'One Nation breakthrough':`One Nation broke through mid-campaign, with a debate appearance and a viral advertising blitz that took the party into the national conversation.`,
        'Major-party squeeze in the final week':`In the final week, undecided voters broke for the major parties, squeezing the minor-party vote that had looked so strong in the polls.`,
        'Gaffe-ridden Labor campaign':`Labor's campaign was plagued by gaffes, from costings errors to a leader who could not name the cash rate.`,
        'Security crisis (rally to government)':`A regional security crisis mid-campaign saw voters rally to the government, as they so often do when the world turns dangerous.`,
        'Global downturn':`A global downturn cast a shadow over the campaign, with markets falling and job ads drying up.`,
        'Disaster response praised':`The government's response to a natural disaster was widely praised, and the Prime Minister's visits to evacuation centres led every bulletin.`,
        'Disaster response criticised':`The government's slow response to a natural disaster drew fury in the affected communities, and the images followed it into the campaign.`,
        'Migration surge debate':`Migration numbers became a campaign flashpoint, an argument that helped One Nation and the Coalition and left Labor on the defensive.`,
        'Strong anti-One Nation preferencing':`Voters followed how-to-vote cards that put One Nation last in record numbers, a wall of preferences that cost the party seat after seat.`,
        'One Nation-Coalition preference swap':`One Nation and Coalition voters traded preferences more tightly than ever, turning three-cornered contests into two-horse races.`,
        'Preferences scatter (less predictable)':`Fewer voters followed how-to-vote cards, and preferences scattered in every direction, leaving several counts genuinely unpredictable until late.`,
        'Calm, accurate polls':`The polls were steady throughout and, as it turns out, close to the mark.`,
        'Volatile electorate':`It was the most volatile campaign in memory, with polls swinging week to week and a record number of voters undecided in the final days.`,
        'Polls overstate One Nation':`The polls overstated One Nation, whose vote on the day fell short of what the surveys had promised.`,
        'Polls understate One Nation':`The polls understated One Nation, whose vote on the day exceeded even its own campaign's expectations.`,
        'A 2019-style miss is coming':`The polls missed again, in the manner of 2019, and the pundits who trusted them spent election night revising their predictions.`,
        'Snap election (March 2027)':`The Prime Minister went to the polls early, in March 2027, a gamble that left the Opposition scrambling for candidates and policies.`,
        'Early election (October 2027)':`The election came early, in October 2027, a decision the government defended as giving voters certainty before a difficult budget.`,
        'Latest possible (September 2028)':`The government held on until the last possible date, September 2028, a delay its critics called a government running out of reasons to exist.`};
      const evs=Object.keys(E).map(ev).filter(x=>x&&EVT[x]).map(x=>EVT[x]);
      // presets that are stories in their own right
      const pre=S.preset||'';
      {const PRE=XT.PRESET||{},pkey=Object.keys(PRE).filter(k=>pre===k||pre.startsWith(k+':')||pre.startsWith(k+' (')||pre===k.replace('Recreate ','Recreate '))[0];
       if(pkey&&!(S.dd&&pkey==='Early double dissolution')){const mp=P.map((_,j)=>j).filter(j=>j>4&&j!==NATI&&c[j]>0).sort((x,y)=>c[y]-c[x]),mj=a+co+(c[NATI]||0);
         const v={...V0(),...pv(L),maj2:mj,rest:150-mj-on,ind:c[4]?sN(c[4]).replace(/ seats?$/,''):'no',Parties:mp.length?cap(list(mp.map(j=>`${P[j].n} (${c[j]})`))):'Several minor parties',
           both:c[2]+c[4]+c[iCSA],tn:c[4]+c[iCSA],short:a<76,notAlbo:L!=='Anthony Albanese',hastie:C==='Andrew Hastie'};
         let t=fillT(PRE[pkey],v);if(pkey==='Minor party chaos'&&!c[4])t=t.replace(/ Independents won no seats\./,'');
         t.split(/\s+—\s+/).forEach(x=>{if(x.trim())ps.push(x.trim());});}}
      if(S.dd&&(pre||'').startsWith('Early double dissolution'))ps.push(fillT(XT.PRESET['Early double dissolution'],V0()));
      if(S.dd){ps.push(`This was a double dissolution election, the first since 2016. ${PN(gw)==='Labor'?'The government':'Labor'} sought the dissolution after the Senate twice blocked its legislation, and every one of the 76 Senate seats was up for grabs, with a quota of just 7.7 per cent in each state. That lower bar is good news for minor parties, and the new Senate will reflect it.`);}
      Object.entries(S.ldr||{}).forEach(([p,n])=>{const r=NEWL[n];if(r&&r.p===p&&r.t==='h')ps.push(fillT(XT.SEAT.handoverCamp,{...pv(n),incumbent:r.inc,year:2027,seat:r.s}));});
      if(S.cind&&pre!=="Turnbull's teal revolt"){ps.push(`The decision by five sitting community independents to join Community Strong before the campaign gave the young party a ready-made base of incumbents, and a platform no new party has had since the Australian Democrats in the 1970s.`);}
      if(evs.length){ps.push(evs.slice(0,3).join(' '));if(evs.length>3)ps.push(evs.slice(3,6).join(' '));}
      // a default campaign paragraph when the sandbox changed nothing that tells its own story
      if(!ps.length){const swing=natCentral(),dl=(swing[0]-DATA.prim25[0])*100,don=(swing[3]-DATA.prim25[3])*100,
        big=P.map((_,j)=>[(swing[j]-DATA.prim25[j])*100,j]).filter(x=>x[1]!==3&&x[1]!==0&&x[1]!==1).sort((x,y)=>y[0]-x[0])[0];
        if(big&&big[0]>8&&big[0]>don)ps.push(`The surprise of the campaign was ${PN(big[1])==='the independents'?'the independents':PN(big[1])}, whose vote climbed ${big[0].toFixed(0)} points as voters tired of the major parties looked elsewhere. Rallies drew crowds no one had predicted, and the major parties spent the final fortnight trying to work out how to respond.`);
        ps.push(fillT(pk(XT.DEF,'default_campaign'),{'Coalition leader':C,labBad:dl<-3})+' '+fillT(don>8?XT.DEF_ON:XT.DEF_ONX,{leader:O,dbl:don>15}));}
      return ps;})();
    const specials=short.slice(nGen).filter(x=>!/^Within the Coalition/.test(x));
    const inShort=[sLead,twist||short[1],formShort||mile||specials[0]].filter(Boolean).filter((x,k,arr)=>arr.indexOf(x)===k).slice(0,3);
    const lsr=SPILLS.filter(x=>x.next).slice(0,2).map(x=>`${x.room.replace(/^Liberal/,'the Liberal').replace(/^Nationals/,'the Nationals').replace(/^Greens/,'the Greens')} is expected to choose ${x.next} to replace ${hon(x.n)}`);
    const whatsNext=maj||FM?fillT(pk(XT.IS.nextMaj,'whatsnext_maj'),{PMhon:gwHas?hon(gwL):'The new prime minister',majW:maj})
      :fillT(pk(XT.IS.nextHung,'whatsnext_hung'),{LabHon:hon(L)});
    const ico={user:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3.5"/><path d="M5.5 19c1.6-2.7 3.8-4 6.5-4s4.9 1.3 6.5 4"/></svg>',
      search:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21" stroke-linecap="round"/></svg>',
      menu:'<svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'};
    return `<article class="news"><div class="nbar"><span class="nmark" aria-hidden="true"><svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.6"><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(45 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(-45 16 16)"/></g><circle cx="16" cy="16" r="2.6" fill="currentColor"/></svg><b>XYZ</b></span><span class="ntab ntab-n">NEWS</span><span class="ntab ntab-w">watch</span><span class="ntab ntab-l">listen</span><span class="nuser" aria-hidden="true">${ico.user}</span></div>
      <div class="nbar2"><span class="nbrand"><svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true"><g fill="none" stroke="#fff" stroke-width="2.6"><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(45 16 16)"/><ellipse cx="16" cy="16" rx="13" ry="5.2" transform="rotate(-45 16 16)"/></g><circle cx="16" cy="16" r="2.6" fill="#fff"/></svg><span>XYZ NEWS</span></span><span class="nnav" aria-hidden="true"><span>Just In</span><span>For You</span><span class="on">Politics</span><span>World</span><span>Business</span><span>Analysis</span><span>Sport</span></span><span class="nbtn" aria-hidden="true">${ico.search}</span><span class="nbtn" aria-hidden="true">${ico.menu}</span></div>
      <div class="news-in">
      <h3 class="news-h">${oppNew&&sec!==3?`${top===0?labHL():`Coalition wins election, ${C} to become prime minister`} as ${PN(sec)==='the Coalition'?'Coalition':PN(sec)==='the independents'?'independents':PN(sec).replace(/^the /,'')} replace${PN(sec)==='the independents'||sec===NATI||/s$/.test(PN(sec))?'':'s'} ${top===0?'Coalition':'Labor'} as Opposition`:(HL[head]||head)}</h3>
      <p class="news-by">By ${r1} <b>${n1}</b> and ${r2} <b>${n2}</b></p>
      <span class="news-tag">Federal Election 2028</span>
      <p class="news-time">Posted <b>${dfmt(next)} at ${posted} AEST</b>, updated <b>${dfmt(next)} at ${updated} AEST</b></p>
      <figure class="news-fig"><img src="${PHOTO._hero}" alt="The House of Representatives chamber at Parliament House, Canberra"><figcaption>The new Parliament will sit in the House of Representatives chamber at Parliament House, Canberra. <i>(Photo: Wikimedia Commons)</i></figcaption></figure>
      <div class="news-short"><p class="ns-h">In short:</p>${inShort.map(s=>`<p>${s}</p>`).join('')}<p class="ns-h">What's next?</p><p>${whatsNext}</p></div>
      ${paras.map(p=>`<p class="news-p">${p}</p>`).join('')}
      ${wipe.map(p=>`<p class="news-p">${p}</p>`).join('')}
      ${SUB('How the night unfolded')}<p class="news-p">${nightP}</p>
      <div class="mcard closecard" data-x=""><div class="mkick">Photo finishes</div><div class="mh">The five closest seats</div>${decided.map((x,k)=>{const b=R.base[x.i],wc=mapCol(x.s,x.w,b),rc=mapCol(x.s,x.r,b),wv=50+x.m,dc=DECL(x);
        return `<div class="crow"><span class="crk">${k+1}</span><div class="cmain"><div class="ctop"><span class="cnm"><b>${x.s.n}</b><span class="cst">${stN(x.s.st)}</span></span><span class="cmar">${x.m.toFixed(2)}<small> pts</small></span></div>
        <div class="cbar"><i style="width:${wv.toFixed(2)}%;background:${wc}"></i><i style="width:${(100-wv).toFixed(2)}%;background:${rc}"></i><em style="left:50%"></em></div>
        <div class="cnames"><span style="color:${wc}">${mapName(x.s,x.w,b)} ${wv.toFixed(2)}</span><span style="color:${rc}">${(100-wv).toFixed(2)} ${mapName(x.s,x.r,b)}</span></div>
        <div class="cmeta">Declared ${dc.when}${dc.rc?` <span class="crc">${dc.rc.replace(' · ',', ')}</span>`:''}</div></div></div>`;}).join('')}</div>
      ${campP.length?SUB('How the campaign was won'.replace('won',maj?'won':'fought'))+campP.map(p=>`<p class="news-p">${p}</p>`).join(''):''}
      ${demoP.length?SUB('Who swung')+demoP.map(p=>`<p class="news-p">${p}</p>`).join(''):''}
      ${leadSub?SUB(leadSub):''}${pparas.map(p=>`<p class="news-p">${p}</p>`).join('')}${cbx?SUB(/^Comeback election/.test(S.preset||'')?'The comeback class':'The comeback candidates')+cbx.split('¶').map(x=>x.trim()).filter(Boolean).map(p=>`<p class="news-p">${p}</p>`).join(''):''}
      <div class="mcard tlcard"><div class="mkick">The days ahead</div><div class="mh">What happens next</div><ol class="tl">${tl}</ol></div>
      ${kmSub?SUB(kmSub)+kmIntro:''}${kparas.map(p=>`<p class="news-p">${p}</p>`).join('')}
      ${formP?SUB('Forming a government')+`<p class="news-p">${formP}</p>`:''}
      ${SPLIT?SUB('Going it alone')+`<p class="news-p">${natPara}</p>`:''}
      ${tbPara?`<p class="news-p">${tbPara}</p>`:""}${swingCard}${SUB('The Senate')}<p class="news-p">${senP.replace(/Coalition/g,"§COA§")}</p>
      <p class="news-note">${on2cp>=10?`Non-traditional 2CP contests: ${on2cp} of 150 seats. `:''}Central forecast: Labor ${a} · ${SPLIT?`Liberal ${co} · Nationals ${c[NATI]}`:`Coalition ${co}`} · One Nation ${on}${gr?` · Greens ${gr}`:''}${csa?` · Community Strong ${csa}`:''}${ind?` · Independents ${ind}`:''}. A simulated report; XYZ News and its reporters are fictional.</p>${more}<div class="btns news-save" style="margin-top:12px"><button type="button" class="ghost" onclick="shareImage()">Save result as image</button></div></div></article>`;
  })();
  // Coalition split: the Liberal Party stands where the Coalition used to (phrases about the old Coalition itself are kept)
  const libText=h=>h.replace(/inside the Coalition|Liberal–National Coalition|Coalition splits?|Coalition agreement/g,m=>m.replace('Coalition','§COA§'))
    .replace(/the Coalition's/g,"the Liberal Party's").replace(/the Coalition/g,'the Liberal Party').replace(/The Coalition/g,'The Liberal Party').replace(/Coalition/g,'Liberal Party');
  let story=REPLAY?`<div class="newsload" role="status"><span class="spin" aria-hidden="true"></span><b>XYZ News</b><span>The full report will be published once every seat has been called.</span><small>${REPLAY.done.size} of 150 seats called</small></div>`:(SPLIT?libText(story0):story0).replace(/§COA§/g,'Coalition');
  if(S.cname){const nm=CNAMES[S.cname]||CNAMES[0];
    story=story.replace(/(^|[.!?]\s+|>\s*)?(Community Strong Australia|Community Strong)/g,(m,pre,w)=>{let r=w==='Community Strong Australia'?nm[1]:nm[2];r=pre!=null?r.replace(/^the /,'The '):r.replace(/^The /,'the ');return (pre||'')+r;});}
  $('article').innerHTML=`<div class="sechead"><div class="kicker">The result · as it would be reported</div><h2 class="art" id="h-art">The morning after</h2><p class="figcap">The encyclopedia entry and the XYZ News report, both written from this run of the simulation.</p></div>${box}${story}
   <h3 class="art">Projected results</h3><div style="overflow-x:auto"><table class="dtable rtab"><thead><tr><th class="l" colspan="3">Party</th><th>Votes</th><th>First pref.</th><th>Swing</th><th>Seats (middle)</th><th>Range (90%)</th><th>Most likely</th><th>Change</th></tr></thead><tbody>
   ${(()=>{const sw2=v=>v>0?`<span class="up">▲ ${(v*100).toFixed(2)} pp</span>`:v<0?`<span class="dn">▼ ${(-v*100).toFixed(2)} pp</span>`:'0.00 pp';
     // the Coalition broken into its parties: first preferences by which party's candidate stood, seats by which party won them
     const subOf=(st,comp)=>st.st==='QLD'?'LNP':st.st==='NT'?'CLP':comp===2?'NAT':'LIB',SUBK=['LIB','LNP','NAT','CLP'],sv={},sv0={},sc={},sl={};SUBK.forEach(k=>{sv[k]=0;sv0[k]=0;sc[k]=0;sl[k]=0;});let Wt=0;
     D.seats.forEach((st,i)=>{Wt+=st.fv;[1,2].forEach(comp=>{const k=subOf(st,comp);sv[k]+=(R.base[i][comp]||0)*st.fv;sv0[k]+=(st.b[comp]||0)*st.fv;});
       const w=R.likely[i];if(w===1||w===NATI)sc[coaSub(st,w,R.base[i])]++;if(st.inc==='LNP')sl[coaSub(st,1,null)]++;});
     const nSub=SUBK.filter(k=>sv[k]>0||sc[k]>0).length;
     const row=j=>`<tr><td class="stp" style="background:${j===4?'#a2a9b1':col(j)}"${!SPLIT&&j===1?` rowspan="${nSub+1}"`:''}></td><td class="l" colspan="2">${!SPLIT&&j===1?'Liberal–National Coalition':P[j].n}</td><td>${nf(Math.round(nat[j]*Wt))}</td><td>${(nat[j]*100).toFixed(2)}%</td><td>${sw2(nat[j]-DATA.prim25[j])}</td><td><b>${R.dist[j].med}</b></td><td>${R.dist[j].p5}–${R.dist[j].p95}</td><td>${c[j]}</td><td>${sg(c[j]-DATA.last[j])}</td></tr>`;
     const subs=()=>SUBK.filter(k=>sv[k]>0||sc[k]>0).map(k=>`<tr class="subrow"><td class="stp" style="background:${rv0(COASUB[k][1])}"></td><td class="l">${COASUB[k][0]}</td><td>${nf(Math.round(sv[k]/100))}</td><td>${(sv[k]/Wt).toFixed(2)}%</td><td>${sw2((sv[k]-sv0[k])/Wt/100)}</td><td></td><td></td><td>${sc[k]}</td><td>${sg(sc[k]-sl[k])}</td></tr>`).join('');
     return P.map((g,j)=>j).filter(j=>DATA.prim25[j]>0||c[j]>0).sort((a,b)=>c[b]-c[a]||nat[b]-nat[a]).map(j=>row(j)+(!SPLIT&&j===1?subs():'')).join('');})()}
   <tr class="tot"><td class="l" colspan="3">Total</td><td>${nf(Math.round(D.seats.reduce((a,s)=>a+s.fv,0)))}</td><td>100%</td><td></td><td></td><td></td><td>150</td><td></td></tr></tbody></table></div>`;
  {const h3=[...$('article').querySelectorAll('h3.art')].find(h=>h.textContent==='Projected results');if(h3&&$('restab')){const tb=h3.nextElementSibling;h3.remove();$('restab').replaceChildren(tb);}}
  newsHover();
}
// ---- hover cards in the news report: politicians show their seat, parties show their result
function newsHover(){const root=document.querySelector('#article .news-in');if(!root||REPLAY)return;
  const ppl={};D.seats.forEach((s,i)=>{const m=HELDBY[s.n]||s.mem;if(m)ppl[m]={t:'mp',i};});
  DATA.leaders.forEach(l=>{if(ppl[l.name])return;const sn=(l.seat||'').replace(/ \(.*\)$/,'');const i=D.seats.findIndex(s=>s.n===sn);if(i>=0)ppl[l.name]={t:'mp',i,cand:true};});
  Object.entries(S.cand||{}).forEach(([sn,v])=>{const i=D.seats.findIndex(x=>x.n===sn);if(v.n&&i>=0&&!ppl[v.n])ppl[v.n]={t:'mp',i,cand:true};});
  SENATE.forEach(s=>{if(!ppl[s.n])ppl[s.n]={t:'sen',s};});
  DATA.leaders.forEach(l=>{if(!ppl[l.name]&&!/^No /.test(l.name))ppl[l.name]={t:'ldr',l};});
  const pty={'Labor':0,'Coalition':1,'Liberal Party':1,'Liberals':1,'One Nation':3,'Greens':2,'Community Strong':GI('CSA'),"Katter's Australian Party":GI('KAP'),'Centre Alliance':GI('XEN'),'independents':4};
  if(SPLIT){pty['Nationals']=NATI;pty['National']=NATI;pty['Liberals']=1;}else{pty['Nationals']=1;pty['National']=1;}
  Object.assign(pty,{'Liberal':1,'LNP (Qld)':1,'LNP':1,'Liberal National':1,'Liberal–National':1,'CLP (NT)':1,'CLP':1,'Independent':4,'Independents':4,"Katter's Australian":GI('KAP'),'Labor Party':0});
  CNAMES.forEach(n=>n.slice(0,2).forEach(x=>{pty[x]=GI('CSA');}));
  P.forEach((g,j)=>{if(j>4&&j!==NATI&&(R.likeCount[j]>0||natCentral()[j]>0.004)){if(pty[g.n]==null)pty[g.n]=j;if(g.full&&pty[g.full]==null)pty[g.full]=j;}});
  // Coalition member parties get their own card
  var SUBK={'Liberal':'LIB','Liberals':'LIB','Liberal Party':'LIB','National':'NAT','Nationals':'NAT','LNP (Qld)':'LNP','LNP':'LNP','Liberal National':'LNP','CLP (NT)':'CLP','CLP':'CLP'};
  // seats: every electorate name opens its seat card
  const seatsN={};D.seats.forEach((s,i)=>{seatsN[s.n]=i;});
  // phrases that contain a party or seat name but mean something else: matched whole and left as plain text
  const STOPW=['National Right','Barton headquarters'];
  // seats named after people (prime ministers, founders): only linked when the sentence is clearly about the electorate
  const CITY=new Set(['Sydney','Melbourne','Canberra','Brisbane','Adelaide','Perth','Newcastle','Fremantle','Ballarat','Bendigo']);
  const HIST=new Set(['Sydney','Melbourne','Canberra','Brisbane','Adelaide','Perth','Newcastle','Fremantle','Ballarat','Bendigo','Cunningham','Gippsland','Riverina','New England','Northern Territory','Curtin','Chifley','Menzies','Hawke','Whitlam','Fraser','Holt','Deakin','Barton','Lyons','Scullin','Calwell','Gorton','McEwen','Fadden','Page','Forde','Hughes','Bruce','Cook','Watson','Fisher','Reid','Parkes','Lalor','Kingsford Smith','Swan','Hume','Chisholm','Paterson','Spence','Wills','Kennedy','Dunkley','Bradfield','Banks','Mitchell',"O'Donoghue",'Wright','Herbert','Leichhardt','Dickson','Ryan','Griffith','Hasluck','Tangney','Bean','Moore','Cowan','Sturt','Kingston','Hindmarsh','Flinders','Isaacs','Hotham','Higgins','Casey','Aston','Monash','Goldstein','Wentworth']);
  const SEATCTX=/(?:\bseats? of|\b(?:in|won|wins?|winning|holds?|held|holding|loses?|losing|lost|retains?|retained|takes?|took|gains?|gained|from|member for|Member for|recount in|count in|candidate in|contest in))\s+$/;
  const seatOK=(s,i,len,el,prevSeat)=>{if(el&&el.closest('.closecard,.fcgone,.cab,.flipcard:not(.faccard)'))return true;const pre=s.slice(Math.max(0,i-32),i),post=s.slice(i+len,i+len+40);
    if(/^\s*\(/.test(post)||/\(\s*$/.test(pre)||/^['’]s (?:long-serving |new |sitting )?member/.test(post))return true;
    if(CITY.has(s.slice(i,i+len)))return /(?:\bseats? of|[Mm]ember for|\b(?:won|wins?|winning|holds?|held|retains?|retained|loses?|lost|takes?|took|gains?|gained|recount in|count in))\s+$/.test(pre);
    if(SEATCTX.test(pre))return true;return prevSeat&&/^(?:,\s*|\s+and\s+|,\s+and\s+)$/.test(s.slice(prevSeat,i));};
  const keys=[...new Set(Object.keys(ppl).concat(Object.keys(pty),Object.keys(seatsN),STOPW))].filter(k=>k.length>2).sort((a,b)=>b.length-a.length);
  const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),re=new RegExp('(?<![\\w’\'-])('+keys.map(esc).join('|')+')(?![\\w’-])','g');
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.nh,h3,button,svg,.news-by,.news-time,.news-tag,a')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
  nodes.forEach(n=>{const s=n.nodeValue;re.lastIndex=0;if(!re.test(s))return;re.lastIndex=0;const f=document.createDocumentFragment();let last=0,m;
    let prevSeat=0;
    while((m=re.exec(s))){const k=m[1],seatOnly=!ppl[k]&&pty[k]==null;
      if(STOPW.includes(k)||(seatOnly&&HIST.has(k)&&!seatOK(s,m.index,k.length,n.parentElement,prevSeat))){continue;}
      f.append(s.slice(last,m.index));const sp=document.createElement('span');sp.className='nh '+(ppl[k]?'nhp':pty[k]!=null?'nhy':'nhs');sp.dataset.k=k;sp.tabIndex=0;sp.textContent=k;f.append(sp);last=m.index+k.length;prevSeat=seatOnly?last:0;}
    f.append(s.slice(last));n.replaceWith(f);});
  if(root._nh)return;root._nh=1;
  const tip=$('ntip'),show=(el,x,y)=>{const k=el.dataset.k,p=ppl[k];
    if(!p&&pty[k]==null&&seatsN[k]!=null){showTip(seatsN[k],x,y,'ntip','ntipwrap');return;}
    if(p&&p.t==='mp'){showTip(p.i,x,y,'ntip','ntipwrap');if(p.cand&&!tip.querySelector('.tcand'))tip.querySelector('.tiphead')?.insertAdjacentHTML('afterend',`<div class="status" style="margin:4px 0">${k} is a candidate here.</div>`);return;}
    let h='';
    if(p&&p.t==='sen'){h=senTipHTML(p.s);}
    else if(p&&p.t==='ldr'){const pic=phOf(k);h=`<div class="tiphead"><div class="tpic">${pic?`<img src="${pic}" alt="">`:''}</div><div><b>${k}</b><span class="status" style="margin:0">${p.l.party} leadership option</span><div>${p.l.seat||'Not in Parliament'}</div></div></div>`;}
    else if(SUBK[k]&&!(SPLIT&&SUBK[k]==='NAT')){const sk=SUBK[k],nm=COASUB[sk][0],cl=COASUB[sk][1];
      // a Coalition member party on its own: seats won and held before, and the Coalition vote where it stands
      let won=0,before=0,v=0,v0=0,W=0;D.seats.forEach((s,i)=>{const w=R.likely[i];if((w===1||w===NATI)&&coaSub(s,w,R.base[i])===sk)won++;const g=gOf(s);if((g===1||g===NATI)&&coaSub(s,g,null)===sk)before++;
        const inArea=sk==='LNP'?s.st==='QLD':sk==='CLP'?s.st==='NT':s.st!=='QLD'&&s.st!=='NT'&&(sk==='NAT'?(s.b[2]>s.b[1]||s.nr):(s.b[1]>=s.b[2]&&!s.nr));
        if(inArea){const gv=grpV(R.base[i],s),g0=grpV(s.b,s);v+=(gv[1]+(gv[NATI]||0))*s.fv;v0+=(g0[1]+(g0[NATI]||0))*s.fv;W+=s.fv;}});
      v=W?v/W:0;v0=W?v0/W:0;const sw=v-v0,co=R.likeCount[1]+(SPLIT?R.likeCount[NATI]:0);
      h=`<div class="tiphead" style="align-items:center"><span class="nhsw" style="background:${cl}"></span><div><b>${{LIB:'Liberal Party of Australia',NAT:'National Party of Australia',LNP:'Liberal National Party of Queensland',CLP:'Country Liberal Party (NT)'}[sk]}</b><span class="status" style="margin:0">Coalition member · ${sk==='LNP'?'Queensland':sk==='CLP'?'Northern Territory':'other states'}</span></div></div>
        <div class="nhgrid"><span>House seats</span><b>${won} <small class="${won-before>=0?'up':'dn'}">${won-before>=0?'▲':'▼'} ${Math.abs(won-before)}</small></b>
        <span>Coalition vote ${sk==='LNP'?'in Qld':sk==='CLP'?'in the NT':`in ${sk==='NAT'?'National':'Liberal'} seats`}</span><b>${v.toFixed(1)}% <small class="${sw>=0?'up':'dn'}">${sw>=0?'+':'−'}${Math.abs(sw).toFixed(1)}</small></b>
        <span>Coalition overall</span><b>${co} seats</b></div>`;}
    else{const j=pty[k];if(j==null)return;const c=R.likeCount,nat=natCentral(),cur=DATA.current[j],v=nat[j]*100,sw=v-DATA.prim25[j]*100,sen=R.senCentral?R.senCentral.tot:null;
      const sk=j===0?'ALP':j===1?'COA':j===2?'GRN':j===3?'ON':j===NATI?'NAT':P[j].ab,sg2=SK.indexOf(sk);
      h=`<div class="tiphead" style="align-items:center"><span class="nhsw" style="background:${col(j)}"></span><div><b>${j===4?'Independents':P[j].full||P[j].n}</b><span class="status" style="margin:0">Election result, central forecast</span></div></div>
        <div class="nhgrid"><span>House seats</span><b>${c[j]} <small class="${c[j]-cur>=0?'up':'dn'}">${c[j]-cur>=0?'▲':'▼'} ${Math.abs(c[j]-cur)}</small></b>
        <span>First preferences</span><b>${v.toFixed(1)}% <small class="${sw>=0?'up':'dn'}">${sw>=0?'+':'−'}${Math.abs(sw).toFixed(1)}</small></b>
        ${sg2>=0&&sen?`<span>Senate seats</span><b>${sen[sg2]} <small>of 76</small></b>`:''}
        <span>Majority chance</span><b>${pct(j===0?R.pA:j===1?R.pC:0)}</b></div>`;}
    tip.innerHTML=h;tip.hidden=false;const tw=tip.offsetWidth,th=tip.offsetHeight;let lx=x+14,ly=y+14;if(lx+tw>innerWidth-6)lx=x-tw-14;if(ly+th>innerHeight-6)ly=y-th-14;tip.style.left=Math.max(4,lx)+'px';tip.style.top=Math.max(4,ly)+'px';};
  const hide=()=>{tip.hidden=true;};
  $('article').addEventListener('mouseover',e=>{const el=e.target.closest&&e.target.closest('.nh');if(el)show(el,e.clientX,e.clientY);});
  $('article').addEventListener('mousemove',e=>{const el=e.target.closest&&e.target.closest('.nh');if(el){const tw=tip.offsetWidth,th=tip.offsetHeight;let lx=e.clientX+14,ly=e.clientY+14;if(lx+tw>innerWidth-6)lx=e.clientX-tw-14;if(ly+th>innerHeight-6)ly=e.clientY-th-14;tip.style.left=Math.max(4,lx)+'px';tip.style.top=Math.max(4,ly)+'px';}});
  $('article').addEventListener('mouseout',e=>{if(e.target.closest&&e.target.closest('.nh'))hide();});
  $('article').addEventListener('focusin',e=>{const el=e.target.closest&&e.target.closest('.nh');if(el){const r=el.getBoundingClientRect();show(el,r.left,r.bottom);}});
  $('article').addEventListener('focusout',hide);window.addEventListener('scroll',hide,{passive:true});}
// ---- Senate
function senHemi(tot,cont,w,h,sz,noLab){
  // 76 places on 5 concentric arcs, filled left to right by party position (left-wing on the left)
  const rows=5, r0=h*0.36, dr=(h*0.9-r0)/(rows-1), rs=[...Array(rows)].map((_,i)=>r0+i*dr), rsum=rs.reduce((a,b)=>a+b,0);
  let n=rs.map(r=>Math.round(76*r/rsum)); n[rows-1]+=76-n.reduce((a,b)=>a+b,0);
  const pts=[];rs.forEach((r,i)=>{for(let k=0;k<n[i];k++){const a=Math.PI*(1-(k+0.5)/n[i]);pts.push([w/2+r*Math.cos(a),h-6-r*Math.sin(a),a]);}});
  pts.sort((p,q)=>q[2]-p[2]);
  const order=S2.groups.map((_,g)=>g).filter(g=>tot[g]>0).sort((a,b)=>S2.groups[a].pos-S2.groups[b].pos);
  const seats=[];order.forEach(g=>{for(let k=0;k<tot[g];k++)seats.push([g,k<tot[g]-(cont?cont[g]:0)?1:0]);});
  // continuing senators sit on the outer side of each block: list new first then continuing within a party, as above
  let RO=null;try{RO=senRoster();}catch(e){}const used={};
  const occ=g=>{if(!RO||!RO[g])return '';const L=[...RO[g].el,...RO[g].co],k=used[g]=(used[g]||0)+1,o=L[k-1];return o?(o.n&&!o.nw?` data-sn="${o.n.replace(/"/g,'&quot;')}"`:` data-snew="${g}|${o.st}${o.n?'|'+o.n.replace(/"/g,'&quot;'):''}"`):'';};
  return pts.slice(0,seats.length).map((p,i)=>`<circle class="sdot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${sz}" fill="${scol(seats[i][0])}"${seats[i][1]?'':' fill-opacity=".45"'}${occ(seats[i][0])}/>`).join('')
    +(noLab?'':`<text x="${w/2}" y="${h-10}" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor">76</text><text x="${w/2}" y="${h+10}" text-anchor="middle" font-size="11" fill="currentColor" opacity=".75">39 to pass a bill</text>`);
}
const SBLOCS=[['Labor + Greens',['ALP','GRN']],['Labor + Greens + Pocock',['ALP','GRN','POC']],['Labor + Greens + Lambie',['ALP','GRN','JLN']],['Coalition + One Nation',['COA','ON']],['Coalition + One Nation + Lambie',['COA','ON','JLN']],['Labor + Coalition',['ALP','COA']]];
function senate(){
  const dd=!!S.dd, C=R.senCentral, tot=C.tot, cont=dd?S2.groups.map(()=>0):S2.cont;
  $('senmode').textContent=dd?'Double dissolution: all 76 seats contested (12 per state, 2 per territory)':'Half-Senate election: 40 seats contested; 36 senators elected in 2025 continue';
  $('senchamber').innerHTML=senHemi(tot,cont,520,280,7.2);
  const shown=S2.groups.map((_,g)=>g).filter(g=>tot[g]>0||S2.before[g]>0).sort((a,b)=>tot[b]-tot[a]||S2.before[b]-S2.before[a]);
  $('senlegend').innerHTML=shown.filter(g=>tot[g]>0).map(g=>`<span><i class="sw" style="background:${scol(g)}"></i>${S2.groups[g].n}<b class="num">${tot[g]}</b></span>`).join('')+(dd?'':'<span class="status">Pale = continuing senators (not up for election)</span>');
  const sg=v=>v>0?`<span class="up">▲ ${v}</span>`:v<0?`<span class="dn">▼ ${-v}</span>`:'0';
  $('senbody').innerHTML=shown.filter(g=>tot[g]>0||S2.before[g]>0||R.sen[g].p95>0).map(g=>`<tr><td><i class="sw" style="background:${scol(g)}"></i>${S2.groups[g].n}</td><td class="num">${S2.before[g]}</td><td class="num">${cont[g]}</td><td class="num"><strong>${tot[g]}</strong></td><td class="num">${sg(tot[g]-S2.before[g])}</td><td class="num">${R.sen[g].p5}–${R.sen[g].p95}</td></tr>`).join('');
  const ix=k=>SK.indexOf(k), N=R.senTot.length;
  $('senbloc').innerHTML=SBLOCS.map(([lab,ks])=>{const p=R.senTot.filter(r=>ks.reduce((s,k)=>s+r[ix(k)],0)>=39).length/N, c=ks.reduce((s,k)=>s+tot[ix(k)],0);
    return `<div class="bar sbloc"><span>${lab} <small class="status">(${c} in forecast)</small></span><span class="tr"><i style="width:${p*100}%;background:${scol(ix(ks[0]))}"></i></span><span class="num">${pct(p)}</span></div>`;}).join('');
  const lg=tot[ix('ALP')]+tot[ix('GRN')], co=tot[ix('COA')]+tot[ix('ON')];
  const xb=S2.groups.map((_,g)=>g).filter(g=>!['ALP','GRN','COA','ON'].includes(SK[g])&&tot[g]>0);
  $('senpass').textContent=lg>=39?`In the central forecast Labor and the Greens hold ${lg} seats, enough to pass legislation without the Coalition.`:co>=39?`In the central forecast the Coalition and One Nation hold ${co} seats, enough to block or pass legislation together.`
    :`In the central forecast neither Labor and the Greens (${lg}) nor the Coalition and One Nation (${co}) reach 39: ${xb.map(g=>S2.groups[g].n+' ('+tot[g]+')').join(', ')||'the crossbench'} would hold the balance of power.`;
  const NATC=natCentral();
  $('sencards').innerHTML=S2.states.map((st,k)=>{const r=C.st[k], n=dd?(k<6?12:2):S2.seats[k], q=100/(n+1), ss=R.senState[k];
    const chips=S2.groups.map((_,g)=>g).filter(g=>r.won[g]>0).sort((a,b)=>S2.groups[a].pos-S2.groups[b].pos).flatMap(g=>Array(r.won[g]).fill(g));
    const lastL=ss.last.map((v,g)=>[v,g]).filter(x=>x[0]>=0.03).sort((a,b)=>b[0]-a[0]).slice(0,4);
    return `<div class="sencard"><div class="sch"><b>${stN(st)}</b><span class="status">${n} seats · quota ${q.toFixed(1)}% = 1 Q</span></div>
      <div class="schips">${chips.map(g=>`<i style="background:${scol(g)}" title="${S2.groups[g].n}"></i>`).join('')}</div>
      ${(()=>{// every senator for the state after the election: continuing, re-elected, newly elected and defeated
        const L=[];SENATE.filter(x=>x.st===st).forEach(x=>{const g=SK.indexOf(x.k),F=senFate(x);L.push({n:x.n,g,tag:F.cont?'Continuing':F.retire?'Retiring':F.hold?'Re-elected':'Defeated',cls:F.cont?'co':F.hold?'re':'out'});});
        S2.groups.forEach((_,g)=>{const held=SENATE.filter(x=>x.st===st&&SK.indexOf(x.k)===g&&!senFate(x).cont&&senFate(x).hold).length;for(let i=held;i<(r.won[g]||0);i++){const nm=senNew(st,g,i-held);L.push({n:nm,nw:1,g,tag:'New',cls:'nw'});}});
        const ord={re:0,nw:1,co:2,out:3};L.sort((a,b)=>ord[a.cls]-ord[b.cls]||S2.groups[a.g].pos-S2.groups[b.g].pos);
        return `<div class="sroster">${L.map(o=>{const pic=o.n?phOf(o.n):null;return `<div class="srow ${o.cls}" ${o.n&&!o.nw?`data-sn="${o.n.replace(/"/g,'&quot;')}"`:`data-snew="${o.g}|${st}${o.n?'|'+o.n.replace(/"/g,'&quot;'):''}"`}><span class="spic" style="border-bottom-color:${scol(o.g)}">${pic?`<img src="${pic}" alt="">`:''}</span><span class="snm">${o.n||`New ${S2.groups[o.g].n} senator`}<small>${S2.groups[o.g].n}${o.n&&SINCE[o.n]?` · since ${SINCE[o.n]}`:''}</small></span><em>${o.tag}</em></div>`;}).join('')}</div>`;})()}
      <div class="status">${chips.length?S2.groups.map((_,g)=>g).filter(g=>r.won[g]>0).sort((a,b)=>r.won[b]-r.won[a]).map(g=>`${S2.groups[g].n} ${r.won[g]}`).join(' · '):''}</div>
      <div class="squota"><span>First preferences in quotas</span>${(()=>{const sh=ENGINE.senShares(D,LS,NATC,k,null,0);return sh.map((v,g)=>[v,g]).filter(x=>x[0]>0).sort((a,b)=>b[0]-a[0]).slice(0,5).map(([v,g])=>`<span><i style="background:${scol(g)}"></i>${S2.groups[g].n} ${(v/(q/100)).toFixed(2)} Q</span>`).join('');})()}</div>
      <div class="slast"><span>Last seat</span>${lastL.map(([v,g])=>`<span class="lp"><i style="background:${scol(g)}"></i>${S2.groups[g].n} ${Math.round(v*100)}%</span>`).join('')}</div></div>`;}).join('');
}
// ---- election night mode
{ $('seatlist').innerHTML=D.seats.map(s=>`<option value="${s.n}">`).join('');
  $('callp').innerHTML=[0,1,3,2,4,...MINOR].map(j=>`<option value="${j}">${P[j].n}</option>`).join('');
  $('callq').addEventListener('change',()=>{const i=D.seats.findIndex(s=>s.n.toLowerCase()===$('callq').value.trim().toLowerCase());if(i>=0&&R)$('callp').value=R.likely[i];});
  $('callbtn').addEventListener('click',()=>{const i=D.seats.findIndex(s=>s.n.toLowerCase()===$('callq').value.trim().toLowerCase());if(i<0){$('nightsum').textContent='Seat not found';return;}
    S.called[i]=+$('callp').value;$('callq').value='';sync();go();});
  $('callclear').addEventListener('click',()=>{S.called={};sync();go();}); }
function night(){
  const ks=Object.keys(S.called);
  const by=new Array(NG).fill(0);ks.forEach(i=>by[S.called[i]]++);
  $('nightsum').textContent=ks.length?`${ks.length} of 150 called · `+by.map((v,j)=>[v,j]).filter(x=>x[0]).sort((a,b)=>b[0]-a[0]).map(([v,j])=>P[j].n+' '+v).join(', '):'No seats called';
  $('calls').innerHTML=ks.map(i=>`<button type="button" data-i="${i}" title="Remove call" style="border-color:${col(S.called[i])}">${D.seats[i].n}: ${P[S.called[i]].n} ${ICON('close')}</button>`).join('');
  $('calls').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{delete S.called[b.dataset.i];sync();go();}));
}
// seat margin consistent with the most likely winner: the central count's margin when it agrees, otherwise the lead implied by the simulations
function seatMargin(i){const w=R.likely[i],M=R.margin[i];if(M.w===w)return {w,r:M.r,m:M.m};
  const o=R.prob[i].map((v,j)=>[v,j]).sort((a,b)=>b[0]-a[0]),r=o[1][1],p=o[0][0]/Math.max(1e-9,o[0][0]+o[1][0]);
  const z=p=>{const q=Math.min(0.995,Math.max(0.5,p));const t=Math.sqrt(-2*Math.log(1-q));return t-(2.515517+0.802853*t+0.010328*t*t)/(1+1.432788*t+0.189269*t*t+0.001308*t*t*t);};
  return {w,r,m:Math.min(25,4.5*z(p))};}
// ---- Mackerras-style pendulum: government seats left, everyone else right, by central margin
function formUI(){const c=R.likeCount,hung=Math.max(...c)<76,f=S.form,tn=j=>j===4?'Independents':j===1&&SPLIT?'Liberals':P[j].n;
  const ps=P.map((_,j)=>j).filter(j=>j!==4&&c[j]>0).sort((a,b)=>c[b]-c[a]);
  $('fpm').innerHTML='<option value="-1">Let the numbers decide</option>'+ps.map(j=>`<option value="${j}">${tn(j)} (${c[j]})</option>`).join('');
  $('fpm').value=ps.includes(f.pm)?f.pm:-1;$('farr').value=f.arr;
  const pp=P.map((_,j)=>j).filter(j=>j!==f.pm&&c[j]>0).sort((a,b)=>c[b]-c[a]);
  $('fpart').innerHTML='<option value="-1">No partner</option>'+pp.map(j=>`<option value="${j}">${tn(j)} (${c[j]})</option>`).join('');$('fpart').value=pp.includes(f.part)?f.part:-1;
  $('fpart').disabled=$('farr').disabled=f.pm<0;$('formbox').classList.toggle('off',!hung);
  const F=formOK();
  $('fnum').innerHTML=!hung?'Someone has a majority in the central forecast, so these choices are ignored.':!F?'The largest party is treated as the government.':
    `${tn(F.pm)} ${F.part>=0?`+ ${tn(F.part)} `:''}= <b>${F.n}</b> seats ${F.n>=76?ICON('check')+' enough to govern':`· ${76-F.n} short, so the government would rely on other crossbenchers or abstentions`}.`;}
// ---- results-night replay: seats called in the order polls close (AEST), safe seats first, the closest left in doubt
let REPLAY=null;
// live count: runs automatically after every simulation. Night 1 runs from 6pm to 12:30am AEST; seats still in doubt wait for
// "Continue counting" (later days). The news report stays blank until every seat is called; the infobox fills in as seats fall.
const NIGHT_MS=95000, POST_MS=26000, FEED_MS=1600;
function liveR(){const R0=REPLAY.R0,cnt=new Array(NG).fill(0);REPLAY.done.forEach(i=>cnt[R0.likely[i]]++);const RR=Object.create(R0);RR.likeCount=cnt;return RR;}
function liveRender(){if(!REPLAY)return;const R0=REPLAY.R0;R=liveR();try{chamber();article();renumberFigs();swingometer();
    {// odds tiles move from the pre-election chance towards the result as seats are called; a party past 76 is certain
     const c=R.likeCount,f=Math.pow(REPLAY.done.size/150,1.6),cw=c[0]>=76?'A':(c[1]+(SPLIT?c[NATI]:0))>=76?'C':null,fin=R0.likeCount,out=fin[0]>=76?'A':(fin[1]+(SPLIT?fin[NATI]:0))>=76?'C':'H',
       pv=k=>cw?(cw===k?1:0):R0['p'+k]*(1-f)+(out===k?1:0)*f;tickTo($('pA'),pct(pv('A')));tickTo($('pH'),pct(pv('H')));tickTo($('pC'),pct(pv('C')));}
    $('legend').innerHTML=ORD.filter(j=>j<5||R.likeCount[j]>0).map(j=>`<span><i class="sw" style="background:${col(j)}"></i>${P[j].n}<b class="num">${R.likeCount[j]}</b></span>`).join('');}finally{R=R0;}}
// when each seat is called on the night (minutes after midnight AEST): polls close by state, safe seats first, the closest last
function callPlan(){const CL={NSW:1080,VIC:1080,QLD:1080,TAS:1080,ACT:1080,SA:1110,NT:1110,WA:1200},h=s=>{let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))%997;return x/997;},T1=1470;
  return D.seats.map((s,i)=>{const M=seatMargin(i),m=M?M.m:0,hh=h(s.n),h2=h(s.n+'x');
    const at=m<0.6?Math.min(T1-5,T1-95+(1-m/0.6)*80+8*hh):CL[s.st]+28+175*Math.exp(-m/4)+25*hh;
    return {i,at,start:CL[s.st]+10+30*h2,w:M?M.w:R.likely[i],r:M?M.r:R.likely[i],m,amp:4+7*h2+(m<3?3:0),ph1:hh*40,ph2:h2*40};});}
const clock12=tm=>{const mins=tm%1440,hh=Math.floor(mins/60),mm=Math.floor(mins%60);return `${((hh+11)%12)+1}:${String(mm).padStart(2,'0')}${hh>=12?'pm':'am'}`;};
function replayStart(auto){if(REPLAY){replaySkip();return;}
  const CL={NSW:1080,VIC:1080,QLD:1080,TAS:1080,ACT:1080,SA:1110,NT:1110,WA:1200}, h=s=>{let x=0;for(const ch of s)x=(x*31+ch.charCodeAt(0))%997;return x/997;};
  const T0=1080,T1=1470;
  const plan=callPlan();
  const lastAt=Math.max(...plan.map(p=>p.at));
  let sp=1;try{sp=+localStorage.getItem('livespeed')||1;}catch(e){}
  REPLAY={speed:sp,R0:R,done:new Set(),plan,raf:0,last:-1,lead:new Map(),sig:'',feed:[],queue:[],feedT:0,stage:'night',lastAt,tm:T0,t0:performance.now(),seg0:T0,seg1:T1,segMs:(ANIM?NIGHT_MS:4000)/sp};markSpeed();
  $('rfeed').innerHTML='';$('replay').hidden=false;$('rcont').hidden=true;$('replaybtn').innerHTML=ICON('skip')+' Skip to results';
  $('rprog').style.width='0%';$('rtally').textContent='Waiting for the first results';$('rsub').textContent='Polls are closing';
  if(!auto)$('h-map').scrollIntoView({behavior:ANIM?'smooth':'auto',block:'start'});
  liveRender();drawMap();REPLAY.raf=requestAnimationFrame(replayStep);}
const cap0=s=>s[0].toUpperCase()+s.slice(1),SHE0=['Tanya Plibersek','Pauline Hanson','Larissa Waters','Sarah Hanson-Young','Mehreen Faruqi','Sussan Ley',"Clare O'Neil",'Bridget McKenzie','Zali Steggall','Allegra Spender'];
function clockTxt(tm){const day=Math.floor(tm/1440),mins=tm%1440,hh=Math.floor(mins/60),mm=Math.floor(mins%60),ap=hh>=12?'pm':'am',h12=((hh+11)%12)+1;
  const t=`${h12}:${String(mm).padStart(2,'0')}${ap}`;
  // once Western Australia's polls have closed (6pm there, 8pm in the east), show its local time too
  const wa=mins>=1200?` · ${((hh-2+11)%12)+1}:${String(mm).padStart(2,'0')}${hh-2>=12?'pm':'am'} AWST`:'';
  return day===0?t+' AEST'+wa:`${['','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'][day]||'Day '+(day+1)} ${t}`;}
function replayStep(now){const RP=REPLAY;if(!RP)return;const R0=RP.R0;
  const k=Math.min(1,(now-RP.t0)/RP.segMs),tm=RP.seg0+(RP.seg1-RP.seg0)*k;RP.tm=tm;
  const flips=[],calls=[];
  RP.plan.forEach(p=>{if(p.at<=tm&&!RP.done.has(p.i)){RP.done.add(p.i);calls.push(p);}
    if(RP.done.has(p.i)||tm<p.start){RP.lead.delete(p.i);return;}
    const q=Math.min(1,(tm-p.start)/Math.max(10,p.at-p.start)),
      nz=(Math.sin(tm/9+p.ph1)*0.65+Math.sin(tm/23+p.ph2)*0.35)*p.amp*Math.pow(1-q,0.8),ldr=p.m+nz>=0?p.w:p.r,prev=RP.lead.get(p.i);
    if(prev!=null&&prev!==ldr&&q>0.05)flips.push([p,ldr]);RP.lead.set(p.i,ldr);});
  $('rclock').innerHTML=clockTxt(tm).replace(/ · (.*)$/,'<small class="rc-wa">$1</small>');
  if(!RP.proj)$('rsub').textContent=tm<1090?'Polls closed in the eastern states':tm<1110?'First results are coming in':tm<1200?'Polls closed in SA and the NT':tm<1380?'Polls closed everywhere, WA counting':'The last close seats are being decided';
  const nm=(p,j)=>mapName(D.seats[p.i],j,R0.base[p.i]),cl=(p,j)=>mapCol(D.seats[p.i],j,R0.base[p.i]);
  // the feed shows one item at a time, so it reads at a steady pace however fast seats fall
  flips.forEach(([p,j])=>{if(RP.queue.length<5)RP.queue.push(`${D.seats[p.i].n}: <span style="color:${cl(p,j)}">${nm(p,j)}</span> moves ahead`);});
  calls.forEach(p=>RP.queue.push(`<span class="rcall">CALLED</span> ${D.seats[p.i].n}: <span style="color:${cl(p,R0.likely[p.i])}">${nm(p,R0.likely[p.i])}</span>`));
  // XYZ News studio commentary (fictional analysts) at milestones in the count
  {const said=RP.said=RP.said||{},cnt=new Array(NG).fill(0);RP.done.forEach(i=>cnt[R0.likely[i]]++);const n=RP.done.size,Q=(who,txt)=>RP.queue.unshift(`<span class="rq">${who}</span> “${txt}”`);
   const PN2=j=>j===1?'the Coalition':j===4?'the independents':P[j].n;
   if(n>=1&&!said.first){said.first=1;Q('Dana Whitlock, XYZ election analyst','First seat in. Don\'t read too much into it yet, but watch the outer suburbs.');}
   if(n>=50&&!said.swing){said.swing=1;try{const v=twoPP().a*100-TPP25;Q('Marcus Teo, chief political correspondent',`On these numbers we're looking at a ${Math.abs(v).toFixed(1)}-point two-party swing to ${v>=0?'Labor':'the Coalition'}.`);}catch(e){}}
   cnt.forEach((v,j)=>{if(j!==4&&v>=50&&!said['h'+j]){said['h'+j]=1;const fin=R0.likeCount[j];Q('Marcus Teo, chief political correspondent',`${cap0(PN2(j))} through 50 seats. The path to 76 is starting to look ${fin>=76?'clear':'very narrow'}.`);}});
   const coa=cnt[1]+(SPLIT?cnt[NATI]:0);if(cnt[3]>coa&&cnt[3]>=10&&!said.on){said.on=1;Q('Dana Whitlock, XYZ election analyst','One Nation has now won more seats than the Coalition. Read that sentence again.');}
   Object.entries(S.ldr||{}).forEach(([pty,nm0])=>{const l=DATA.leaders.find(x=>x.name===nm0);if(!l||!l.seat||/Senat|Not in|state seat/.test(l.seat))return;const sn=l.seat.replace(/ \(.*\)$/,''),i=D.seats.findIndex(x=>x.n===sn);if(i<0||!RP.done.has(i)||said['l'+nm0])return;
     const own=gOf(D.seats[i]);if(R0.likely[i]!==own&&(l.sel||own===R0.likely[i]||true)){const g=R0.likely[i];if(pty==='Labor'&&g===0)return;if((pty==='Coalition'||pty==='Nationals')&&(g===1||g===NATI))return;said['l'+nm0]=1;Q('Priya Nair, XYZ political reporter',`Big news out of ${sn}: ${nm0} has lost ${SHE0.includes(nm0)?'her':'his'} own seat to ${mapName(D.seats[i],g,R0.base[i])}.`);}});
   if(n>=140&&Math.max(...cnt)<76&&Math.max(...R0.likeCount)<76&&!said.hung){said.hung=1;Q('Marcus Teo, chief political correspondent','Nobody is getting to 76 tonight. The crossbench are about to become the most important people in the country.');}
   if(n===150&&!said.end){said.end=1;Q('Dana Whitlock, XYZ election analyst','That\'s every seat called. What a night.');}}
  if(RP.queue.length>6){const qs=RP.queue.filter(x=>x.includes('class="rq"')),rest=RP.queue.filter(x=>!x.includes('class="rq"'));RP.queue=qs.concat(rest.slice(-Math.max(2,6-qs.length)));}
  if(RP.queue.length&&now-RP.feedT>Math.max(350,FEED_MS/RP.speed)){RP.feedT=now;RP.feed.unshift(`<li><b>${clockTxt(tm).replace(/ AEST.*$/,'')}</b> ${RP.queue.shift()}</li>`);RP.feed=RP.feed.slice(0,4);$('rfeed').innerHTML=RP.feed.join('');}
  const sig=RP.done.size+'|'+[...RP.lead.entries()].map(e=>e.join(':')).join(',');
  if(sig!==RP.sig){RP.sig=sig;drawMap();}
  if((RP.done.size!==RP.last&&now-(RP.lastR||0)>400)||k>=1){RP.last=RP.done.size;RP.lastR=now;const cnt=liveR().likeCount;liveRender();
    $('rprog').style.width=(RP.done.size/150*100).toFixed(1)+'%';
    const top=cnt.map((v,j)=>[v,j]).filter(x=>x[0]).sort((a,b)=>b[0]-a[0]).slice(0,4);
    $('rtally').innerHTML=`<b>${RP.done.size}</b> called · <b>${RP.lead.size}</b> counting`+(top.length?' · ':'')+top.map(([v,j])=>`<span style="color:${col(j)}">${P[j].n} ${v}</span>`).join(' · ');
    const win=cnt.findIndex(v=>v>=76);if(win>=0&&!RP.proj){RP.proj=1;$('rsub').textContent=`XYZ News projects: ${P[win].n} will form majority government`;$('replaylive').textContent=`${clockTxt(tm)}: ${P[win].n} reaches 76 seats.`;}
    else if(tm-(RP.say||0)>=60){RP.say=tm;$('replaylive').textContent=`${clockTxt(tm)}: ${RP.done.size} seats called.`;}}
  if(k<1){RP.raf=requestAnimationFrame(replayStep);return;}
  RP.raf=0;
  if(false){RP.stage='paused';RP.last=-1;liveRender();const left=150-RP.done.size;
    $('rsub').textContent=`Counting stops for the night with ${left} seat${left>1?'s':''} too close to call.`;$('replaylive').textContent=$('rsub').textContent;
    $('rcont').hidden=false;$('rcont').innerHTML=`Continue counting (${left} left) ${ICON('next')}`;return;}
  replayFinish();}
function markSpeed(){const s=REPLAY?REPLAY.speed:1;document.querySelectorAll('.rspeed button').forEach(b=>{const on=+b.dataset.sp===s;b.classList.toggle('on',on);b.setAttribute('aria-pressed',String(on));});}
function setSpeed(s){const RP=REPLAY;if(!RP)return;try{localStorage.setItem('livespeed',s);}catch(e){}
  // rebase so the clock carries on from where it is, at the new pace
  const now=performance.now(),k=Math.min(1,(now-RP.t0)/RP.segMs),tm=RP.seg0+(RP.seg1-RP.seg0)*k,full=RP.stage==='post'?POST_MS:NIGHT_MS,span=RP.seg1-RP.seg0;
  const totalSpan=RP.stage==='post'?span:(RP.seg1-1080);RP.seg0=tm;RP.t0=now;RP.speed=s;RP.segMs=Math.max(1,(ANIM?full:4000)*((RP.seg1-tm)/Math.max(1,totalSpan))/s);markSpeed();}
// what if: during the live count, call any seat for a different party and watch the result change
function whatIf(i,x,y){const RP=REPLAY;if(!RP)return;const R0=RP.R0,s=D.seats[i],b=R0.base[i];
  const opts=R0.prob[i].map((v,j)=>[v,j]).filter(z=>z[0]>0.005||z[1]===R0.likely[i]).sort((p,q)=>q[0]-p[0]).slice(0,4);
  const box=$('whatif'),mb=$('map').getBoundingClientRect();
  box.innerHTML=`<b>${s.n}</b><small>Call this seat for…</small>${opts.map(([v,j])=>`<button type="button" data-g="${j}" style="border-left:5px solid ${mapCol(s,j,b)}">${mapName(s,j,b)} <span>${pct(v)}</span></button>`).join('')}<button type="button" data-g="-1" class="wx">Cancel</button>`;
  box.hidden=false;box.style.left=Math.min(mb.width-200,Math.max(4,x-mb.left+10))+'px';box.style.top=Math.min(mb.height-200,Math.max(4,y-mb.top+10))+'px';
  box.querySelectorAll('button').forEach(bt=>bt.addEventListener('click',()=>{box.hidden=true;const g=+bt.dataset.g;if(g<0||!REPLAY)return;
    const old=R0.likely[i];R0.likely[i]=g;R0.likeCount=new Array(NG).fill(0);R0.likely.forEach(w=>R0.likeCount[w]++);
    if(R0.margin[i]&&g!==R0.margin[i].w){const M=R0.margin[i];R0.margin[i]={...M,w:g,r:M.w===g?M.r:M.w,m:Math.max(0.05,M.m*0.3)};}
    RP.done.add(i);RP.lead.delete(i);RP.sig='';RP.last=-1;RP.whatif=(RP.whatif||0)+1;
    RP.queue.unshift(`<span class="rcall">WHAT IF</span> ${s.n}: <span style="color:${mapCol(s,g,b)}">${mapName(s,g,b)}</span>${old!==g?` instead of ${mapName(s,old,b)}`:''}`);drawMap();liveRender();}));}
function replayContinue(){const RP=REPLAY;if(!RP||RP.stage!=='paused')return;RP.stage='post';$('rcont').hidden=true;RP.proj=RP.proj||0;
  RP.seg0=RP.tm;RP.seg1=RP.lastAt+5;RP.segMs=ANIM?POST_MS:2500;RP.t0=performance.now();RP.raf=requestAnimationFrame(replayStep);}
function replayFinish(){const RP=REPLAY;if(!RP)return;$('whatif').hidden=true;cancelAnimationFrame(RP.raf);REPLAY=null;
  $('replay').hidden=true;$('replaybtn').innerHTML=ICON('play')+' Replay results night';R=RP.R0;render();if(window.APP&&APP.onReplayEnd){try{APP.onReplayEnd();}catch(e){console.error(e);}}}
function replaySkip(){replayFinish();}
function replayStop(){replayFinish();}

// ---- cabinet, shadow cabinet and House crossbench: who keeps their seat
// Cabinet: second Albanese ministry (sworn in 13 May 2025). Shadow cabinet: Taylor shadow ministry after the 16 March 2026 reshuffle.
const CABINET=[['Anthony Albanese','Prime Minister','Grayndler'],['Richard Marles','Deputy Prime Minister; Defence','Corio'],['Penny Wong','Foreign Affairs','S:SA'],['Jim Chalmers','Treasurer','Rankin'],
  ['Katy Gallagher','Finance; Public Service; Women','S:ACT'],['Don Farrell','Trade and Tourism; Special Minister of State','S:SA'],['Tony Burke','Home Affairs; Immigration; Arts; Leader of the House','Watson'],
  ['Mark Butler','Health and Ageing; NDIS','Hindmarsh'],['Chris Bowen','Climate Change and Energy','McMahon'],['Catherine King','Infrastructure, Transport and Regional Development','Ballarat'],
  ['Amanda Rishworth','Employment and Workplace Relations','Kingston'],['Jason Clare','Education','Blaxland'],['Michelle Rowland','Attorney-General','Greenway'],['Tanya Plibersek','Social Services','Sydney'],
  ['Julie Collins','Agriculture, Fisheries and Forestry','Franklin'],["Clare O'Neil",'Housing; Homelessness; Cities','Hotham'],['Madeleine King','Resources; Northern Australia','Brand'],
  ['Murray Watt','Environment and Water','S:QLD'],['Malarndirri McCarthy','Indigenous Australians','S:NT'],['Anika Wells','Communications; Sport','Lilley'],['Pat Conroy','Defence Industry; Pacific Island Affairs','Shortland'],
  ['Anne Aly','Small Business; International Development; Multicultural Affairs','Cowan'],['Tim Ayres','Industry and Innovation; Science','S:NSW']];
const SHADOW=[['Angus Taylor','Leader of the Opposition','Hume'],['Matt Canavan','Nationals leader; Trade, Investment and Tourism','S:QLD'],['Jane Hume','Deputy Leader; Employment and Workplace Relations','S:VIC'],
  ['Michaelia Cash','Opposition Senate leader; Attorney-General','S:WA'],['Anne Ruston','Health and Aged Care','S:SA'],['Tim Wilson','Treasurer','Goldstein'],['Andrew Hastie','Industry and Sovereign Capability','Canning'],
  ['Jonathon Duniam','Home Affairs and Immigration','S:TAS'],['James Paterson','Defence','S:VIC'],['Claire Chandler','Finance; Public Service','S:TAS'],["Ted O'Brien",'Foreign Affairs','Fairfax'],
  ['Bridget McKenzie','Infrastructure, Transport and Regional Development','S:VIC'],['Julian Leeser','Education; Indigenous Australians','Berowra'],['Melissa McIntosh','Families and Social Services; Women; NDIS','Lindsay'],
  ['Sarah Henderson','Communications','S:VIC'],['Andrew Bragg','Environment; Housing','S:NSW'],['Jacinta Nampijinpa Price','Skills and Training; Small Business','S:NT'],['Dan Tehan','Energy and Emissions Reduction','Wannon'],
  ['Darren Chester','Nationals deputy leader; Agriculture','Gippsland'],['Michael McCormack',"Water; Veterans' Affairs",'Riverina'],['Kevin Hogan','Assistant Treasurer; Financial Services','Page'],
  ['Susan McDonald','Resources and Northern Australia','S:QLD'],['Phillip Thompson','Defence Industry; Defence Personnel','Herbert']];
// All 76 senators (48th Parliament, 2026). term: year the term ends; k: Senate group; r: assumed 2028 ticket position within the group
// (2022 order of election, with casual replacements taking the place of the senator they replaced); room: Liberal or National party room.
const SENATE=[
 ['NSW',2028,'ALP',1,"Deborah O'Neill"],['NSW',2028,'ALP',2,'Jenny McAllister'],['NSW',2028,'COA',1,'Dave Sharma','L'],['NSW',2028,'COA',2,'Ross Cadell','N'],['NSW',2028,'COA',3,'Maria Kovacic','L'],['NSW',2028,'GRN',1,'David Shoebridge'],
 ['NSW',2031,'ALP',1,'Tim Ayres'],['NSW',2031,'ALP',2,'Tony Sheldon'],['NSW',2031,'COA',1,'Andrew Bragg','L'],['NSW',2031,'COA',2,'Jessica Collins','L'],['NSW',2031,'GRN',1,'Mehreen Faruqi'],['NSW',2031,'ON',1,'Sean Bell'],
 ['VIC',2028,'ALP',1,'Lisa Darmanin'],['VIC',2028,'ALP',2,'Jana Stewart'],['VIC',2028,'COA',1,'Sarah Henderson','L'],['VIC',2028,'COA',2,'Bridget McKenzie','N'],['VIC',2028,'UAP',1,'Ralph Babet'],['VIC',2028,'THO',1,'Lidia Thorpe'],
 ['VIC',2031,'ALP',1,'Jess Walsh'],['VIC',2031,'ALP',2,'Raff Ciccone'],['VIC',2031,'ALP',3,'Michelle Ananda-Rajah'],['VIC',2031,'COA',1,'James Paterson','L'],['VIC',2031,'COA',2,'Jane Hume','L'],['VIC',2031,'GRN',1,'Steph Hodgins-May'],
 ['QLD',2028,'ALP',1,'Murray Watt'],['QLD',2028,'ALP',2,'Anthony Chisholm'],['QLD',2028,'COA',1,'James McGrath','L'],['QLD',2028,'COA',2,'Matt Canavan','N'],['QLD',2028,'GRN',1,'Penny Allman-Payne'],['QLD',2028,'ON',1,'Pauline Hanson'],
 ['QLD',2031,'ALP',1,'Nita Green'],['QLD',2031,'ALP',2,'Corinne Mulholland'],['QLD',2031,'COA',1,'Paul Scarr','L'],['QLD',2031,'COA',2,'Susan McDonald','N'],['QLD',2031,'GRN',1,'Larissa Waters'],['QLD',2031,'ON',1,'Malcolm Roberts'],
 ['WA',2028,'ALP',1,'Glenn Sterle'],['WA',2028,'ALP',2,'Sue Lines'],['WA',2028,'ALP',3,'Dorinda Cox'],['WA',2028,'COA',1,'Michaelia Cash','L'],['WA',2028,'COA',2,'Dean Smith','L'],['WA',2028,'AV',1,'Fatima Payman'],
 ['WA',2031,'ALP',1,'Varun Ghosh'],['WA',2031,'ALP',2,'Ellie Whiteaker'],['WA',2031,'COA',1,'Slade Brockman','L'],['WA',2031,'COA',2,"Matt O'Sullivan",'L'],['WA',2031,'GRN',1,'Jordon Steele-John'],['WA',2031,'ON',1,'Tyron Whitten'],
 ['SA',2028,'ALP',1,'Penny Wong'],['SA',2028,'ALP',2,'Don Farrell'],['SA',2028,'COA',1,'Leah Blyth','L'],['SA',2028,'COA',2,'Andrew McLachlan','L'],['SA',2028,'COA',3,'Kerrynne Liddle','L'],['SA',2028,'GRN',1,'Barbara Pocock'],
 ['SA',2031,'ALP',1,'Karen Grogan'],['SA',2031,'ALP',2,'Marielle Smith'],['SA',2031,'ALP',3,'Charlotte Walker'],['SA',2031,'COA',1,'Anne Ruston','L'],['SA',2031,'COA',2,'Alex Antic','L'],['SA',2031,'GRN',1,'Sarah Hanson-Young'],
 ['TAS',2028,'ALP',1,'Josh Dolega'],['TAS',2028,'ALP',2,'Helen Polley'],['TAS',2028,'COA',1,'Jonathon Duniam','L'],['TAS',2028,'COA',2,'Chris Gatenby','L'],['TAS',2028,'GRN',1,'Vanessa Bleyer'],['TAS',2028,'TYR',1,'Tammy Tyrrell'],
 ['TAS',2031,'ALP',1,'Carol Brown'],['TAS',2031,'ALP',2,'Richard Dowling'],['TAS',2031,'COA',1,'Richard Colbeck','L'],['TAS',2031,'COA',2,'Claire Chandler','L'],['TAS',2031,'GRN',1,'Nick McKim'],['TAS',2031,'JLN',1,'Jacqui Lambie'],
 ['ACT',2028,'ALP',1,'Katy Gallagher'],['ACT',2028,'POC',1,'David Pocock'],['NT',2028,'ALP',1,'Malarndirri McCarthy'],['NT',2028,'COA',1,'Jacinta Nampijinpa Price','L']].map(([st,term,k,r,n,room])=>({st,term,k,r,n,room}));
// not recontesting in 2028: their ticket place goes to a new candidate (named below where announced)
SENATE.forEach(x=>{if(['Ralph Babet','Barbara Pocock','Jonathon Duniam','Matt Canavan'].includes(x.n))x.ret=1;});
const SENCAND={'NSW|ON':['Barnaby Joyce'],'SA|GRN':['Isaac Astill'],'TAS|COA':['Sarah Courtney']};
const senNew=(st,g,k)=>{const key=S2.groups[g]?S2.groups[g].k:'';return ((SENCAND[st+'|'+key]||[])[k])||null;};
const SENBY=Object.fromEntries(SENATE.map(s=>[s.n,s]));
// a senator's 2028 fate: elected if their ticket position is within the seats their group wins in that state
function senTipHTML(x){const k=x.n,F=senFate(x),g=SK.indexOf(x.k),pn=x.k==='COA'?(x.room==='N'?'National':x.st==='QLD'?'LNP':x.st==='NT'?'CLP':'Liberal'):S2.groups[g].n,pic=phOf(k);
  const term=F.cont?`term to ${x.term}`:F.retire?`retiring 30 June ${x.term}`:F.hold?`re-elected, new term to ${S.dd?'2031 or 2034':'2034'}`:`term ends 30 June ${x.term}`;
  return `<div class="tiphead"><div class="tpic" style="border-bottom-color:${scol(g)}">${pic?`<img src="${pic}" alt="">`:''}</div><div><b>${k}</b>${FAC[k]?` <span class="status" style="margin:0;display:inline">(${FACN[FAC[k]][0]})</span>`:''}<span class="status" style="margin:0">Senator for ${stN(x.st)}${SINCE[k]?' · '+heldTxt(k):''}</span><div>${pn} · ${term}</div></div></div>
    <div class="tfc">${F.cont?'Not up for election in 2028.':F.retire?'Not recontesting in 2028.':`2028: No. ${F.rank} on the ${pn} ticket; party wins ${F.won}. <b style="display:inline">${F.hold?'Re-elected':'Loses seat'}</b>`}</div>`;}
function senNewTipHTML(g,st,nm){const pic=nm?phOf(nm):null;return `<div class="tiphead"><div class="tpic" style="border-bottom-color:${scol(g)}">${pic?`<img src="${pic}" alt="">`:''}</div><div><b>${nm?nm+' · ':''}New ${S2.groups[g].n} senator</b><span class="status" style="margin:0">Senator-elect for ${stN(st)}</span><div>Elected 2028 · term to ${S.dd?'2031 or 2034':'2034'}</div></div></div><div class="tfc">A seat gained in 2028: the party's next candidate on the ticket takes it.</div>`;}
// who sits in the Senate after the election, grouped by party: elected this time first, then continuing senators
function senRoster(){const by={},add=(g,o)=>{(by[g]=by[g]||{el:[],co:[]})[o.cont?'co':'el'].push(o);};
  SENATE.forEach(x=>{const g=SK.indexOf(x.k);if(g<0)return;const F=senFate(x);if(F.cont)add(g,{n:x.n,x,cont:1});else if(F.hold)add(g,{n:x.n,x});});
  S2.states.forEach((st,k)=>{const W=R.senCentral.st[k].won;W.forEach((w,g)=>{const held=SENATE.filter(x=>x.st===st&&SK.indexOf(x.k)===g&&!senFate(x).cont&&senFate(x).hold).length;for(let i=held;i<w;i++)add(g,{n:senNew(st,g,i-held),nw:1,st,g});});});
  return by;}
(()=>{const T=()=>$('ntip');let cur=null;
  const hide=()=>{T().hidden=true;cur=null;};
  document.addEventListener('mouseover',e=>{const t=e.target;if(!t||!t.closest||!R)return;
    const sd=t.closest('#watch [data-i],#path [data-i],#pend [data-i],#states .scell,#cab [data-i]'),sn=t.closest('[data-sn]'),snw=t.closest('[data-snew]'),sth=t.closest('.sth[data-st]');
    const el=sd||sn||snw||sth;if(!el){if(cur)hide();return;}if(el===cur)return;cur=el;const r=el.getBoundingClientRect(),x=e.clientX,y=e.clientY;
    if(sd){showTip(+sd.dataset.i,x,y,'ntip','ntipwrap');return;}
    let h='';if(sn){const o=SENATE.find(z=>z.n===sn.dataset.sn);if(o)h=senTipHTML(o);}else if(snw){const [g,st,nm]=snw.dataset.snew.split('|');h=senNewTipHTML(+g,st,nm);}else if(sth)h=stateTipHTML(sth.dataset.st);
    if(!h){hide();return;}const tip=T();tip.innerHTML=h;tip.hidden=false;const w=tip.offsetWidth,hh=tip.offsetHeight;tip.style.left=Math.max(8,Math.min(innerWidth-w-8,x+14))+'px';tip.style.top=Math.max(8,Math.min(innerHeight-hh-8,y+14))+'px';},true);
  addEventListener('scroll',()=>{if(cur)hide();},{passive:true});})();
function stateTipHTML(st){const sg=v=>v>0?`<span class="up">▲ ${v}</span>`:v<0?`<span class="dn">▼ ${-v}</span>`:'–',t=new Array(NG).fill(0),t0=new Array(NG).fill(0);let n=0;D.seats.forEach((s,i)=>{if(s.st!==st)return;n++;t[R.likely[i]]++;t0[gOf(s)]++;});
  const rows=ORD.filter(j=>t[j]||t0[j]).sort((a,b)=>t[b]-t[a]);
  return `<div class="tiphead"><div><b>${stN(st)}</b><span class="status" style="margin:0">${n} House seat${n>1?'s':''}</span></div></div><table class="sttip">${rows.map(j=>`<tr><td><i class="sw" style="background:${col(j)}"></i>${P[j].n}</td><td><b>${t[j]}</b></td><td>${sg(t[j]-t0[j])}</td></tr>`).join('')}</table>`;}
function senFate(s){const dd=!!S.dd;if(s.term===2031&&!dd)return {cont:true};
  const k=S2.states.indexOf(s.st),st=R.senCentral.st[k];let key=s.k,rank=s.r;
  if(s.k==='COA'&&SPLIT&&s.room){const same=SENATE.filter(x=>x.st===s.st&&x.k==='COA'&&x.room===s.room&&(dd||x.term===2028)).sort((a,b)=>a.term-b.term||a.r-b.r);rank=same.indexOf(s)+1;if(s.room==='N')key='NAT';}
  else if(dd){const same=SENATE.filter(x=>x.st===s.st&&x.k===s.k).sort((a,b)=>a.term-b.term||a.r-b.r);rank=same.indexOf(s)+1;}
  const g=SK.indexOf(key),won=g>=0?st.won[g]:0,avg=g>=0&&R.senState[k]?R.senState[k].mean[g]:null;
  if(s.ret)return {won,rank,g,hold:false,retire:true,avg,lastSeat:false};
  return {won,rank,g,hold:rank<=won,avg,lastSeat:rank===won&&st.last===g};}
// Wikipedia links for the infobox: known article titles, otherwise a Wikipedia search for the text
const WIKI={'Labor':'Australian Labor Party','Coalition':'Coalition (Australia)','Liberal':'Liberal Party of Australia','Liberals':'Liberal Party of Australia','Nationals':'National Party of Australia','National':'National Party of Australia',
  'One Nation':"Pauline Hanson's One Nation",'Greens':'Australian Greens','Independents':'Independent politician','Independent':'Independent politician',"Katter's Australian":"Katter's Australian Party",'Centre Alliance':'Centre Alliance',
  'Australian Federation Party':'Australian Federation Party','Family First':'Family First Party (2021)','Legalise Cannabis':'Legalise Cannabis Australia','Libertarians':'Libertarian Party (Australia)','People First':'Gerard Rennick People First',
  'Animal Justice':'Animal Justice Party','Australian Christians':'Australian Christians','Shooters, Fishers & Farmers':'Shooters, Fishers and Farmers Party','Socialist Alliance':'Socialist Alliance (Australia)','Victorian Socialists':'Victorian Socialists',
  'Citizens Party':'Australian Citizens Party','Fusion':'Fusion Party (Australia)','HEART':'Health Environment Accountability Rights Transparency','Australian Democrats':'Australian Democrats','Lambie Network':'Jacqui Lambie Network',
  'United Australia':'United Australia Party (2013)',"Australia's Voice":"Australia's Voice",'Liberal National':'Liberal National Party of Queensland','LNP':'Liberal National Party of Queensland','CLP':'Country Liberal Party',
  'Senate':'Australian Senate','House of Representatives':'Australian House of Representatives',
  'Angus Taylor':'Angus Taylor (politician)','Tim Wilson':'Tim Wilson (politician)',"Ted O'Brien":"Ted O'Brien (politician)",'Malcolm Roberts':'Malcolm Roberts (politician)','Tony Burke':'Tony Burke',
  'Robbie Katter':'Robbie Katter','Bob Katter':'Bob Katter','David Shoebridge':'David Shoebridge','Michael Balderstone':'Michael Balderstone','Lyle Shelton':'Lyle Shelton','Craig Isherwood':'Craig Isherwood',
  'Tim Ayres':'Tim Ayres','Darren Chester':'Darren Chester','Matt Canavan':'Matt Canavan',
  '30 May 2019':'2019 Australian Labor Party leadership election','Traeger (Qld state seat)':'Electoral district of Traeger','David Pocock':'David Pocock','Lidia Thorpe':'Lidia Thorpe','Tammy Tyrrell':'Tammy Tyrrell'};
WIKI['Community Strong']=WIKI['Community Strong Australia']='Community Strong Australia';CNAMES.forEach(n=>n.slice(0,2).forEach(x=>{WIKI[x]='Community Strong Australia';}));
const WSTATE=new Set(['New South Wales','Victoria','Queensland','Western Australia','South Australia','Tasmania','Australian Capital Territory','Northern Territory']);
const wikiURL=ti=>'https://en.wikipedia.org/wiki/'+encodeURIComponent(ti.replace(/ /g,'_')).replace(/%2F/g,'/');
function wl(s,ti){const txt=String(s),key=ti||txt.replace(/<[^>]+>/g,'').trim();let url;
  if(WIKI[key])url=wikiURL(WIKI[key]);else if(/^Members of /.test(key)||WSTATE.has(key)||DATA.leaders.some(l=>l.name===key)||/^(Division of|20\d\d )/.test(key))url=wikiURL(key);
  else if(D.seats.some(x=>x.n===key))url=wikiURL('Division of '+key);
  else url='https://en.wikipedia.org/w/index.php?search='+encodeURIComponent(key);
  return `<a class="lk" href="${url}" target="_blank" rel="noopener">${txt}</a>`;}
let CABV='cab';
// scoreboard in the dropdown header: losses in each group, always shown, click a tile to open that list
function cabTiles(){const el=$('dsub-cab');if(!el)return;const hseat=n=>D.seats.findIndex(s=>s.n===n);
  const grp=(rows,mode)=>{let n=0,lost=[],risk=0;rows.forEach(([nm,,seat])=>{if(seat.startsWith('S:')){const sn=SENBY[nm];if(!sn||mode!=='all')return;const F=senFate(sn);if(F.cont||F.retire)return;n++;if(!F.hold)lost.push(nm);else if(F.lastSeat)risk++;return;}
      const i=hseat(seat);if(i<0)return;n++;const g=gOf(D.seats[i]);if(R.likely[i]!==g)lost.push(nm);else if(R.prob[i][g]<0.65)risk++;});return {n,lost,risk};};
  const xbRows=D.seats.filter(s=>{const g=gOf(s);return g!==0&&g!==1&&g!==NATI;}).map(s=>[HELDBY[s.n]||s.mem,'',s.n]);
  const sen=(()=>{let n=0,lost=[],risk=0;SENATE.forEach(s=>{const F=senFate(s);if(F.cont||F.retire)return;n++;if(!F.hold)lost.push(s.n);else if(F.lastSeat)risk++;});return {n,lost,risk};})();
  const T=[['cab','Cabinet',grp(CABINET,'all')],['shad','Shadow cabinet',grp(SHADOW,'all')],['xb','House crossbench',grp(xbRows,'house')],['sen','Senators up in 2028',sen]];
  const sn=n=>n.split(' ').slice(-1)[0];
  el.innerHTML=`<span class="cabtiles">${T.map(([k,l,s])=>{const f=s.n?s.lost.length/s.n:0;return `<button type="button" class="ctile${s.lost.length?' hurt':''}" data-c="${k}"><span class="ctlab">${l}</span><span class="ctn"><b>${s.lost.length}</b> of ${s.n} lose their seat${s.n===1?'':'s'}</span><span class="ctb"><i style="width:${(f*100).toFixed(1)}%"></i><i class="rk" style="width:${(s.n?s.risk/s.n*100:0).toFixed(1)}%"></i></span><span class="ctw">${s.lost.length?s.lost.slice(0,3).map(sn).join(', ')+(s.lost.length>3?` +${s.lost.length-3}`:''):s.risk?`${s.risk} at risk`:'All safe'}</span></button>`;}).join('')}</span>`;
  el.querySelectorAll('.ctile').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const d=b.closest('details');d.open=true;const ch=document.querySelector(`.cabsw .chip[data-c="${b.dataset.c}"]`);if(ch)ch.click();}));}
function senRow(sn,who){const ST={NSW:'New South Wales',VIC:'Victoria',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',ACT:'the ACT',NT:'the Northern Territory'};
  const F=senFate(sn),gn=g=>S2.groups[g]?S2.groups[g].n:'';
  if(F.cont)return `<tr class="sen"><td>${who}</td><td>Senator for ${ST[sn.st]}</td><td colspan="4" class="status">Term runs to 2031, so not up in 2028</td><td><span class="cabtag sen">Continues</span></td></tr>`;
  if(F.retire)return `<tr class="sen"><td>${who}</td><td>Senator for ${ST[sn.st]}</td><td colspan="4" class="status">Not recontesting in 2028</td><td><span class="cabtag sen">Retiring</span></td></tr>`;
  sUp++;if(!F.hold)sLose++;else if(F.lastSeat)sRisk++;
  const sz=sn.st==='ACT'||sn.st==='NT'?2:S.dd?12:6;
  return `<tr class="${F.hold?'':'lostrow'}"><td>${who}</td><td>Senator for ${ST[sn.st]} <span class="status">· up in 2028</span></td><td class="r status">—</td><td class="r num">${F.avg!=null?F.avg.toFixed(1):''}<br><small>avg ${gn(F.g)} seats</small></td><td><small>No. ${F.rank} on the ${gn(F.g)} ticket; ${gn(F.g)} wins <b>${F.won}</b> of ${sz} seats</small></td><td class="r status">—</td><td>${F.hold?(F.lastSeat?`<span class="cabtag risk">Wins final seat</span>`:`<span class="cabtag ok">Re-elected</span>`):`<span class="cabtag lost" style="border-color:${scol(F.g)}">Loses seat</span>`}</td></tr>`;}
let lose=0,house=0,risk=0,sUp=0,sLose=0,sRisk=0;
function cabinet(){
  const ST={NSW:'New South Wales',VIC:'Victoria',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',ACT:'the ACT',NT:'the Northern Territory'};
  let rows=CABV==='cab'?CABINET:CABV==='shad'?SHADOW:D.seats.map(s=>[HELDBY[s.n]||s.mem,HELD[s.n]?P[GI(HELD[s.n])].n:mapName(s,gOf(s)),s.n]).filter(r=>{const s=D.seats.find(x=>x.n===r[2]);const g=gOf(s);return g!==0&&g!==1&&g!==NATI;});
  const tn=(s,g,b)=>mapName(s,g,b), sw=v=>`<span class="${v>=0?'up':'dn'}">${v>=0?'+':'−'}${Math.abs(v).toFixed(1)}</span>`;
  lose=0;house=0;risk=0;sUp=0;sLose=0;sRisk=0;
  $('cabhead').innerHTML=CABV==='sen'?`<tr><th>Senator</th><th>State</th><th class="r"></th><th class="r">Party seats<br><small>average across simulations</small></th><th>2028 Senate count</th><th class="r"></th><th>Result</th></tr>`
    :`<tr><th>Member</th><th>Seat</th><th class="r">2025 2PP<br><small>Labor v Coalition</small></th><th class="r">Primary vote<br><small>forecast (change)</small></th><th>Forecast two-candidate<br><small>or Senate count</small></th><th class="r">Chance<br><small>of holding</small></th><th>Result</th></tr>`;
  if(CABV==='sen'){const ord=['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];let h='';
    ord.forEach(st=>{h+=`<tr class="cabst"><td colspan="7">${({NSW:'New South Wales',VIC:'Victoria',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',ACT:'Australian Capital Territory',NT:'Northern Territory'})[st]}</td></tr>`;
      SENATE.filter(s=>s.st===st).sort((a,b)=>a.term-b.term||SK.indexOf(a.k)-SK.indexOf(b.k)||a.r-b.r).forEach(s=>{const pic=phOf(s.n),pn=s.k==='COA'?(s.room==='N'?'National':s.st==='QLD'?'LNP':s.st==='NT'?'CLP':'Liberal'):S2.groups[SK.indexOf(s.k)].n;
        h+=senRow(s,`<div class="cabwho">${pic?`<img src="${pic}" alt="">`:''}<div><b>${s.n}</b><small>${pn}${FAC[s.n]?' · '+FACN[FAC[s.n]][0]:''}</small></div></div>`);});});
    $('cabbody').innerHTML=h;const up=SENATE.filter(s=>S.dd||s.term===2028).length;
    $('cabsum').innerHTML=`<b>${sLose} of the ${sUp}</b> senators ${S.dd?'facing a double dissolution':'up for election in 2028'} lose their seats in the central Senate count${sRisk?`; ${sRisk} more win only the final seat in their state`:''}.`;
    $('cabcap').textContent='Senators as of 2026, including casual replacements. 2028 ticket positions are assumed to follow the 2022 order; parties have not preselected yet. Liberal and National senators on a joint Coalition ticket keep their 2022 order; if the Coalition splits, each runs on its own ticket.';return;}
  const html=rows.map(([nm,role,seat])=>{const pic=phOf(nm);
    const who=`<div class="cabwho">${pic?`<img src="${pic}" alt="">`:''}<div><b>${nm}</b>${role?`<small>${role}${FAC[nm]?' · '+FACN[FAC[nm]][0]:''}</small>`:''}</div></div>`;
    if(seat.startsWith('S:')){const sn=SENBY[nm];if(!sn)return `<tr class="sen"><td>${who}</td><td>Senator for ${ST[seat.slice(2)]}</td><td colspan="5"></td></tr>`;return senRow(sn,who);}
    const i=D.seats.findIndex(s=>s.n===seat);if(i<0)return '';const s=D.seats[i],g=gOf(s),b=R.base[i],w=R.likely[i];house++;
    const own=grpV(b,s)[g],own0=grpV(s.b,s)[g],ph=R.prob[i][g],M=seatMargin(i),hold=w===g;if(!hold)lose++;else if(ph<0.65)risk++;
    const tpp=s.b2*100,tw=tpp>=50?'Labor':'Coalition',tv=Math.max(tpp,100-tpp);
    const two=M?`<span class="cabbar"><i style="width:${(50+M.m).toFixed(1)}%;background:${mapCol(s,M.w,b)}"></i><i style="width:${(50-M.m).toFixed(1)}%;background:${mapCol(s,M.r,b)}"></i></span><small>${tn(s,M.w,b)} ${(50+M.m).toFixed(1)} v ${tn(s,M.r,b)} ${(50-M.m).toFixed(1)}</small>`:'';
    const tag=hold?(ph<0.65?`<span class="cabtag risk">At risk</span>`:`<span class="cabtag ok">Holds</span>`):`<span class="cabtag lost" style="border-color:${mapCol(s,w,b)}">Loses to ${tn(s,w,b)}</span>`;
    return `<tr class="${hold?'':'lostrow'}" data-i="${i}"><td>${who}</td><td>${seat} <span class="status">${stN(s.st)}</span></td><td class="r num">${tw} ${tv.toFixed(1)}</td><td class="r num">${own.toFixed(1)}% ${sw(own-own0)}</td><td>${two}</td><td class="r num">${pct(ph)}</td><td>${tag}</td></tr>`;}).join('');
  $('cabbody').innerHTML=html;
  $('cabbody').querySelectorAll('tr[data-i]').forEach(r=>r.addEventListener('click',()=>{sel=+r.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));
  const grp=CABV==='cab'?'cabinet ministers':CABV==='shad'?'shadow cabinet members':'crossbench MPs', inH=CABV==='xb'?'':' in the House';
  const hp=lose?`<b>${lose} of the ${house}</b> ${grp}${inH} lose${lose===1?'s':''} their seat${lose===1?'':'s'}`:`<b>None of the ${house}</b> ${grp}${inH} lose their seats`;
  const sp=sUp?` In the Senate, ${sLose?`<b>${sLose} of the ${sUp}</b> up in 2028 lose${sLose===1?'s':''} their seat${sLose===1?'':'s'}`:`all ${sUp} up in 2028 are re-elected`}${sRisk?` (${sRisk} only just, on the final seat in their state)`:''}.`:'';
  cabTiles();
  $('cabsum').innerHTML=`${hp} in the central forecast${risk?`; ${risk} more hold${risk===1?'s':''} on with less than a 65% chance`:''}.${sp}`;
  $('cabcap').textContent=CABV==='cab'?'Cabinet: second Albanese ministry as sworn in on 13 May 2025. Leader changes in the sandbox do not reshuffle it.':CABV==='shad'?'Shadow cabinet: Taylor shadow ministry after the 16 March 2026 reshuffle.':'Crossbench: every House member not from Labor or the Coalition, as of 2026 (including One Nation\'s Barnaby Joyce and David Farley).';
}
// Senate count trace: quotas, elections and exclusions in the central count for one state
let SENST='NSW';
function senCountTrace(){const el=$('sencount');if(!el||!R.senCentral)return;const k=S2.states.indexOf(SENST),st=R.senCentral.st[k];if(!st||!st.trace){el.innerHTML='';return;}
  $('sencsw').innerHTML=S2.states.map(s=>`<button type="button" class="chip${s===SENST?' on':''}" data-s="${s}" aria-pressed="${s===SENST}">${s}</button>`).join('');
  $('sencsw').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{SENST=b.dataset.s;senCountTrace();}));
  const tr=st.trace,q=tr[0].q,nm=g=>S2.groups[g].n,cl=g=>scol(g),Q=v=>(v/q).toFixed(2)+' q';
  let h=`<p class="status">Quota: ${(q*100).toFixed(2)}% of the vote (${S.dd?'double dissolution':'half-Senate'} contest, ${tr.filter(x=>x.t==='el'||x.t==='fill').length} seats). Shown in quotas (q).</p><ol>`,n=0;
  const top=tr[0].v.map((v,g)=>[v,g]).filter(x=>x[0]>0.004).sort((a,b)=>b[0]-a[0]);
  h+=`<li><div class="cchd"><span class="ccn">${++n}</span>First preferences</div><div class="cclab">${top.slice(0,10).map(([v,g])=>`<span><i style="background:${cl(g)}"></i>${nm(g)} <b>${Q(v)}</b></span>`).join('')}${top.length>10?`<span>+${top.length-10} more</span>`:''}</div></li>`;
  let exBuf=[];const flush=()=>{if(!exBuf.length)return;h+=`<li><div class="cchd"><span class="ccn">${++n}</span><span>${exBuf.length} small group${exBuf.length>1?'s':''} excluded</span><small>${exBuf.map(x=>nm(x.e)).join(', ')}</small></div></li>`;exBuf=[];};
  tr.slice(1).forEach(x=>{
    const hasSeat=x.t==='ex'&&tr.some(y=>(y.t==='el'||y.t==='fill')&&y.g===x.e&&tr.indexOf(y)<tr.indexOf(x));
    if(x.t==='ex'&&x.raw<q*0.15&&!hasSeat){exBuf.push(x);return;}flush();
    if(hasSeat){const g=x.gain.map((v,j)=>[v,j]).filter(y=>y[0]>q*0.01).sort((a,b)=>b[0]-a[0]).slice(0,3);h+=`<li><div class="cchd"><span class="ccn">${++n}</span><span><b style="color:${cl(x.e)}">${nm(x.e)}</b>'s leftover votes passed on (${Q(x.raw)})</span><small>${g.map(([v,j])=>`${nm(j)} +${(v/q).toFixed(2)}`).join(' · ')||'mostly exhausted'}</small></div></li>`;return;}
    if(x.t==='el'||x.t==='fill')h+=`<li><div class="cchd"><span class="ccn">${++n}</span><span><b style="color:${cl(x.g)}">${nm(x.g)}</b> wins seat ${x.n===1?'':'no. '+x.n+' '}${x.t==='fill'?'(highest remaining, without a full quota)':'(quota reached)'}</span><small>${Q(x.v)}</small></div></li>`;
    else if(x.t==='ex'){const g=x.gain.map((v,j)=>[v,j]).filter(y=>y[0]>q*0.01).sort((a,b)=>b[0]-a[0]).slice(0,4);
      h+=`<li><div class="cchd"><span class="ccn">${++n}</span><span><b style="color:${cl(x.e)}">${nm(x.e)}</b> excluded (${Q(x.raw)})</span><small>${g.map(([v,j])=>`${nm(j)} +${(v/q).toFixed(2)}`).join(' · ')}${x.raw-x.pile>0.0005?` · ${((1-x.pile/x.raw)*100).toFixed(0)}% exhaust`:''}</small></div></li>`;}
    else if(x.t==='runner')h+=`<li><div class="cchd"><span class="ccn">${++n}</span><span><b style="color:${cl(x.g)}">${nm(x.g)}</b> misses out on the final seat</span><small>finishes on ${Q(x.v)}</small></div></li>`;});
  flush();el.innerHTML=h+'</ol>';}
let PGROUP='party';
function pendulum(){
  const c=R.likeCount, gov=govSides().gov;
  const rows=D.seats.map((s,i)=>({i,s,...seatMargin(i)}));
  const L=rows.filter(x=>x.w===gov).sort((a,b)=>a.m-b.m);
  const big=P.map((_,j)=>j).filter(j=>j!==gov&&j!==4&&c[j]>=5), indCol=false, rest=rows.filter(x=>x.w!==gov&&!big.includes(x.w)&&!(indCol&&x.w===4)).sort((a,b)=>a.m-b.m);
  const band=m=>m<6?'Marginal (under 6%)':m<10?'Fairly safe (6–10%)':'Safe (10%+)';
  const lose=L.length>=76?L[L.length-76]:null;
  $('pendsum').innerHTML=lose?`${P[gov].n} holds ${L.length} seats in the central forecast. A uniform swing of <b>${lose.m.toFixed(2)}%</b> against it, enough to lose ${lose.s.n} and everything closer, would cost its majority.`
    :`No party has a majority in the central forecast. ${P[gov].n}, the largest party, holds ${L.length} seats; its closest seats are listed first.`;
  const col1=(arr,isGov)=>{let last='',h='';arr.forEach((x,k)=>{const b=band(x.m);if(b!==last){const nb=arr.filter(y=>band(y.m)===b).length;h+=`<div class="pband"><span>${b}</span><span>${nb}</span></div>`;last=b;}
      h+=`<div class="prow" data-i="${x.i}" title="${(P[x.w]||{}).n||''} v ${(P[x.r]||{}).n||'others'}"><i style="background:${col(x.w)}"></i><span>${x.s.n} <span class="status">${stN(x.s.st)}</span></span><b>${x.m.toFixed(2)}</b></div>`;
      if(isGov&&lose&&x===lose)h+=`<div class="pline">Majority lost if every seat above this line falls</div>`;});return h;};
  // columns: every party with 5+ seats by size (largest first), then all smaller parties and independents together
  if(PGROUP==='contest'){const tn=j=>j===1&&SPLIT?'Liberal–National':P[j].n, ks={};
    rows.forEach(x=>{if(x.r==null||x.w==null)return;const a=Math.min(x.w,x.r),b=Math.max(x.w,x.r),k=a+'-'+b;(ks[k]=ks[k]||{a,b,arr:[]}).arr.push(x);});
    let cs=Object.values(ks).sort((p,q)=>q.arr.length-p.arr.length);const main=cs.filter(c=>c.arr.length>=3).slice(0,6),other=cs.filter(c=>!main.includes(c)).flatMap(c=>c.arr);
    const ord=c=>{const o=[c.a,c.b];if(o[1]===gov||(o[0]!==gov&&c.arr.filter(x=>x.w===o[1]).length>c.arr.filter(x=>x.w===o[0]).length))o.reverse();return o;};
    const cc=c=>{const [p1,p2]=ord(c),n1=c.arr.filter(x=>x.w===p1).length;c.arr.sort((u,v)=>u.m-v.m);
      return `<div class="pcol"><h4>${tn(p1)} v ${tn(p2)} (${c.arr.length})</h4><div class="ptally"><span style="color:${col(p1)}">${tn(p1)} ${n1}</span><span style="color:${col(p2)}">${tn(p2)} ${c.arr.length-n1}</span></div>${col1(c.arr,false)}</div>`;};
    $('pendsum').innerHTML=`Seats grouped by the two candidates expected to finish first and second. ${main.length} main contests${other.length?`, plus ${other.length} seats in rarer match-ups`:''}. The dot shows who leads; the figure is their margin over 50%.`;
    $('pend').innerHTML=main.map(cc).join('')+(other.length?`<div class="pcol"><h4>Other contests (${other.length})</h4>${col1(other.sort((u,v)=>u.m-v.m),false)}</div>`:'');
    $('pend').querySelectorAll('.prow').forEach(r=>r.addEventListener('click',()=>{sel=+r.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));return;}
  const colOf=j=>{const arr=j===gov?L:rows.filter(x=>x.w===j).sort((a,b)=>a.m-b.m);return `<div class="pcol"><h4>${P[j].n} (${arr.length})</h4>${col1(arr,j===gov)}</div>`;};
  const order=[gov,...big].filter(j=>j!==4).sort((a,b)=>c[b]-c[a]||(a===gov?-1:1));
  $('pend').innerHTML=order.map(colOf).join('')+(rest.length?`<div class="pcol"><h4>All others (${rest.length})</h4>${col1(rest,false)}</div>`:'')+(gov===4?'':'');   // independents sit with all others
  $('pend').querySelectorAll('.prow').forEach(r=>r.addEventListener('click',()=>{sel=+r.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));
}
// ---- shareable result card (1080 x 1350 PNG drawn on a canvas)
let LASTHEAD='';
async function shareImage(o){
  // campaign mode passes its run (leader, party, tier, score) and gets the same card, relabelled for the campaign
  const CM=o&&o.campaign||null;
  // landscape result card: headline and summary over a seat map with city insets; an infobox-style panel with leaders, numbers, the House and the odds
  const W=1600,H=1900,cv=document.createElement('canvas');cv.width=W;cv.height=H;const x=cv.getContext('2d');
  const root=getComputedStyle(document.documentElement),css=v=>root.getPropertyValue(v).trim(),rv=v=>{v=String(v||'');return v.startsWith('var(')?css(v.slice(4,-1).split(',')[0]):v;};
  const colr=j=>rv(col(j));
  try{await document.fonts.ready;}catch(e){}
  const BG=css('--bg')||'#f4efe4',INK=css('--ink')||'#1a1814',MUT=css('--muted')||'#5f584a',LINE=css('--line')||'#cfc4ab',ACC=css('--accent')||'#0f6b5c',CARD=css('--card')||css('--panel')||'#fbf8f1';
  const SER='Fraunces, Georgia, serif',MONO='"IBM Plex Mono", Menlo, monospace',BODY='"Source Serif 4", Georgia, serif',SANS='"Source Sans 3", Arial, sans-serif';
  const img=src=>new Promise(res=>{if(!src)return res(null);const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=src;});
  const svgImg=async(el,noText)=>{if(!el)return null;const c=el.cloneNode(true);
    const so=el.querySelectorAll('*'),sc=c.querySelectorAll('*');so.forEach((n,i)=>{const cs=getComputedStyle(n),t=sc[i];if(!t)return;['fill','stroke','stroke-width','opacity','font-size','font-weight','font-family'].forEach(k=>{const v=cs.getPropertyValue(k);if(v)t.setAttribute(k,v);});if(cs.display==='none'||cs.visibility==='hidden'||(noText&&t.tagName.toLowerCase()==='text'))t.setAttribute('display','none');});
    let vb=(el.getAttribute('viewBox')||`0 0 ${el.clientWidth} ${el.clientHeight}`);
    if(noText){let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;el.querySelectorAll('rect,circle,path,use').forEach(n=>{const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden')return;try{const b=n.getBBox();if(!b.width&&!b.height)return;x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);}catch(e){}});
      if(x1>x0)vb=`${(x0-4).toFixed(1)} ${(y0-4).toFixed(1)} ${(x1-x0+8).toFixed(1)} ${(y1-y0+8).toFixed(1)}`;}
    c.setAttribute('viewBox',vb);c.setAttribute('xmlns','http://www.w3.org/2000/svg');const [,,vw,vh]=vb.split(/[ ,]+/).map(Number);c.setAttribute('width',vw);c.setAttribute('height',vh);c.removeAttribute('style');
    return img('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(c).replace(/var\((--[\w-]+)\)/g,(m,v)=>css(v)||'#999')));};
  const wrap=(txt,font,maxW,lh,x0,y0,maxLines)=>{x.font=font;const ws=txt.split(' ');let line='',n=0,y=y0;for(let i=0;i<ws.length;i++){const w=ws[i],tl=line?line+' '+w:w;if(x.measureText(tl).width>maxW&&line){if(maxLines&&n===maxLines-1){let l2=line;while(x.measureText(l2+'…').width>maxW)l2=l2.slice(0,-1);x.fillText(l2.trimEnd()+'…',x0,y);return y+lh;}x.fillText(line,x0,y);y+=lh;n++;line=w;}else line=tl;}if(line){x.fillText(line,x0,y);y+=lh;}return y;};
  const ctr=(t,cx,yy)=>{x.textAlign='center';x.fillText(t,cx,yy);x.textAlign='left';};
  x.fillStyle=BG;x.fillRect(0,0,W,H);
  // masthead with the site address
  x.fillStyle=INK;x.font=`900 46px ${SER}`;x.fillText('Australia 2028 Election Simulator',48,76);
  x.textAlign='right';x.fillStyle=ACC;x.font=`600 20px ${MONO}`;x.fillText('electionsimulator2028.au',W-48,58);x.fillStyle=MUT;x.font=`500 15px ${MONO}`;x.fillText(CM?'XYZ NEWS · CAMPAIGN MODE':'XYZ NEWS · SIMULATED RESULT',W-48,84);x.textAlign='left';
  x.fillStyle=INK;x.fillRect(48,104,W-96,3);x.fillRect(48,111,W-96,1.2);
  // left: headline, the two "In short" points
  const LX=48,LW=960;let y=176;
  const head=(document.querySelector('#article h3')||{}).textContent||'';
  const win=R.likeCount.indexOf(Math.max(...R.likeCount)),wc=colr(win),maj=Math.max(...R.likeCount)>=76;
  // kicker tag and label, then a headline with a rule in the winner's colour
  x.font=`700 15px ${MONO}`;const tag=CM?CM.tier.toUpperCase():maj?'RESULT':'HUNG PARLIAMENT',tw=x.measureText(tag).width+22;x.fillStyle=CM?rv(CM.col):wc;x.fillRect(LX,y-40,tw,28);x.fillStyle='#fff';x.fillText(tag,LX+11,y-20);
  x.fillStyle=ACC;x.fillText(CM?`CAMPAIGN MODE · ${CM.leader.toUpperCase()} · ${CM.party.toUpperCase()}`:`FEDERAL ELECTION ${elYear()} · XYZ NEWS`,LX+tw+14,y-20);
  const hy0=y+30;x.fillStyle=INK;let hy=wrap(head,`800 48px ${SER}`,LW-26,56,LX+24,hy0,3);x.fillStyle=wc;x.fillRect(LX,hy0-40,6,hy-hy0+22);y=hy;
  const shorts=[...document.querySelectorAll('#article .news-short p')].map(p=>p.textContent.trim()).filter(t=>t&&!/^In short|^What's next/.test(t)).slice(0,2);
  y+=8;shorts.forEach((t,k)=>{x.fillStyle=k?MUT:wc;x.fillRect(LX+24,y+6,9,9);x.fillStyle=k?MUT:INK;y=wrap(t,`${k?400:600} 20px ${SANS}`,LW-48,27,LX+44,y+16,2);});
  // the seat map in the style of the encyclopedia results maps: each seat shaded by its two-candidate margin, numbered, with city insets
  const shade=(hex,f)=>{hex=rv(hex);let m=hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);if(!m){const t=hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(!t)return hex;m=[0,...t.slice(1).map(v=>(+v).toString(16).padStart(2,'0'))];}
    const c3=m.slice(1,4).map(h=>parseInt(h,16)).map(v=>Math.round(f>=0?v+(255-v)*f:v*(1+f)));return `rgb(${c3.join(',')})`;};
  const BANDS=[[3,0.55],[6,0.4],[10,0.25],[15,0.1],[20,0],[25,-0.18],[999,-0.32]],bandF=m=>BANDS.find(b=>m<b[0])[1];
  const ORDER=['WA','NT','SA','QLD','NSW','ACT','VIC','TAS'],num=D.seats.map((st,i)=>i).sort((p,q)=>ORDER.indexOf(D.seats[p].st)-ORDER.indexOf(D.seats[q].st)||D.seats[p].n.localeCompare(D.seats[q].n)),NUM={};num.forEach((i,k)=>NUM[i]=k+1);
  const fillOf=i=>{const st=D.seats[i],M=seatMargin(i),w=R.likely[i];return shade(mapCol(st,w,R.base[i]),M?bandF(M.m):0);};
  const QS=GEO0.qseats||[],cellsSvg=(GEO0.qmask?`<defs><clipPath id="qc"><path d="${GEO0.qmask}"/></clipPath></defs>`:'')+D.seats.map((st,i)=>{const g=GEO0.cells[st.n];return g?`<path d="${g.d}" fill="${fillOf(i)}" stroke="#ffffff" stroke-width="SW" stroke-linejoin="round"${GEO0.qmask&&QS.includes(st.n)?' clip-path="url(#qc)"':''}/>`:'';}).join('');
  const mapImg=(vx,vy,vw,vh,sw)=>img('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vx} ${vy} ${vw} ${vh}" width="${vw*8}" height="${vh*8}">${cellsSvg.replace(/SW/g,sw)}</svg>`));
  const nums=(vx,vy,vw,vh,px,py,pw,phh,minW)=>{const sc=pw/vw;x.font=`600 ${Math.max(10,Math.min(14,sc*1.1))}px ${SANS}`;x.textAlign='center';
    D.seats.forEach((st,i)=>{const g=GEO0.cells[st.n];if(!g)return;const [cx0,cy0]=g.c;if(cx0<vx||cx0>vx+vw||cy0<vy||cy0>vy+vh||g.w*sc<minW)return;const X=px+(cx0-vx)*sc,Y=py+(cy0-vy)*sc+4;
      x.lineWidth=3;x.strokeStyle='rgba(255,255,255,.75)';x.strokeText(NUM[i],X,Y);x.fillStyle='#222';x.fillText(NUM[i],X,Y);});x.textAlign='left';};
  const top=y+22,IW=176,gapX=14,mwMax=LW-2*(IW+gapX),mapBot=1180,mh=mapBot-top;
  const mi=await mapImg(0,0,GEO0.w,GEO0.h,0.5),mr=Math.min(mwMax/GEO0.w,mh/GEO0.h),mw=GEO0.w*mr,mH=GEO0.h*mr,mx=LX+(LW-mw)/2,my=top+(mh-mH)/2;
  if(mi){x.drawImage(mi,mx,my,mw,mH);nums(0,0,GEO0.w,GEO0.h,mx,my,mw,mH,26);}
  const ins=[['Darwin','L','Darwin'],['Perth','L','Perth'],['Adelaide','L','Adelaide'],['Hobart','L','Hobart'],['Brisbane','R','Greater Brisbane'],['Sydney','R','Greater Sydney'],['Canberra','R','Canberra'],['Melbourne','R','Greater Melbourne']],WATER='#e3ecf0';
  for(const side of ['L','R']){const list=ins.filter(z=>z[1]===side),IH=(mh-list.length*26-(list.length-1)*14)/list.length;let iy=top;
    for(const [nm,,lab] of list){const v=GEO0.views[nm];if(!v)continue;const ix=side==='L'?LX:LX+LW-IW,ar=v[2]/v[3];let vw=v[2],vh=v[3];if(ar<IW/IH){vw=v[3]*IW/IH;}else{vh=v[2]*IH/IW;}
      const vx=v[0]+v[2]/2-vw/2,vy=v[1]+v[3]/2-vh/2,im=await mapImg(vx,vy,vw,vh,0.08);x.fillStyle=INK;x.font=`600 17px ${SANS}`;x.fillText(lab,ix,iy+18);
      const by=iy+26;x.fillStyle=WATER;x.fillRect(ix,by,IW,IH);if(im){x.save();x.beginPath();x.rect(ix,by,IW,IH);x.clip();x.drawImage(im,ix,by,IW,IH);nums(vx,vy,vw,vh,ix,by,IW,IH,14);x.restore();}
      x.strokeStyle=INK;x.lineWidth=1;x.strokeRect(ix,by,IW,IH);iy+=IH+26+14;}}
  // margin key: every party that won seats, its seat count and its shading scale
  {const items=P.map((_,j)=>j).filter(j=>R.likeCount[j]>0).sort((a,b)=>R.likeCount[b]-R.likeCount[a]),ky=mapBot+34;
    x.fillStyle=MUT;x.font=`600 13px ${MONO}`;x.fillText('TWO-CANDIDATE-PREFERRED MARGIN',LX,ky);const labs=['0%','3%','6%','10%','15%','20%','25%+'];
    const ncol=Math.ceil(items.length/2),cw2=LW/ncol,sw2=Math.min(26,(cw2-16)/7-2);items.forEach((j,k)=>{const col2=Math.floor(k/2),row=k%2,kx=LX+col2*cw2,yy=ky+24+row*48;
      x.fillStyle=INK;x.font=`600 15px ${SANS}`;x.fillText(`${j===4?'Independents':P[j].n} ${R.likeCount[j]}`,kx,yy+4);
      BANDS.forEach((b,bi)=>{x.fillStyle=shade(col(j),b[1]);x.fillRect(kx+bi*(sw2+2),yy+10,sw2,12);});});
    x.fillStyle=MUT;x.font=`400 11px ${SANS}`;labs.forEach((l,bi)=>x.fillText(l,LX+bi*(sw2+2),ky+24+2*48+4));}
  // right: infobox-style panel
  const RX=1040,RW=W-48-RX,RY=132,RH=1340-RY;x.fillStyle=CARD;x.fillRect(RX,RY,RW,RH);x.strokeStyle=LINE;x.lineWidth=1.5;x.strokeRect(RX,RY,RW,RH);
  const cxR=RX+RW/2;x.fillStyle=INK;x.font=`700 24px ${SANS}`;ctr(`${elYear()} Australian Federal Election`,cxR,RY+40);
  x.fillStyle=LINE;x.fillRect(RX+14,RY+56,RW-28,1.5);
  {const fl=await img('data:image/svg+xml;charset=utf-8,'+encodeURIComponent((document.querySelector('#infobox svg.flag, svg.flag')||{outerHTML:''}).outerHTML.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="120" height="60" ')));if(fl)x.drawImage(fl,cxR-48,RY+70,96,48);}
  x.fillStyle=MUT;x.font=`400 16px ${SANS}`;ctr(`All 150 House seats · 76 for a majority · ${elDate().toLocaleDateString('en-AU',{day:'numeric',month:'long'})}`,cxR,RY+148);
  x.fillStyle=LINE;x.fillRect(RX+14,RY+162,RW-28,1.5);
  const c=R.likeCount,nat=natCentral(),t3=P.map((_,j)=>j).filter(j=>j!==4).sort((a,b)=>c[b]-c[a]).slice(0,3),ldn=j=>({0:S.ldr['Labor'],1:S.ldr['Coalition'],2:S.ldr['Greens'],3:S.ldr['One Nation']}[j]||(typeof LEAD!=='undefined'&&LEAD[P[j].ab]?LEAD[P[j].ab].n:''));
  const LCW=118,colW=(RW-24-LCW)/3,c0=RX+12+LCW,pw=colW-14,ph=Math.round(pw*1.3),py=RY+178;
  for(let k=0;k<3;k++){const j=t3[k],px=c0+k*colW+7,nm=ldn(j),src=PHOTO[nm]||PHOTO[P[j].ab]||(nm&&!/^No |N\/A/.test(nm)?phOf(nm):null),im=await img(src);
    x.fillStyle=LINE;x.fillRect(px,py,pw,ph);if(im){const r=Math.max(pw/im.width,ph/im.height),iw=im.width*r,ih=im.height*r;x.save();x.beginPath();x.rect(px,py,pw,ph);x.clip();x.drawImage(im,px+(pw-iw)/2,py+(ph-ih)*0.2,iw,ih);x.restore();}
    x.fillStyle=colr(j);x.fillRect(px,py+ph,pw,7);}
  // rows like the encyclopedia infobox: label on the left, one value per party
  const rows=[['Leader',j=>ldn(j)||'—','600 15px',true],['Party',j=>P[j].n,'400 15px'],['Seats won',j=>String(c[j]),'800 26px'],['Seat change',j=>{const d=c[j]-(DATA.current[j]||0);return d?`${d>0?'▲':'▼'} ${Math.abs(d)}`:'0';},'600 16px'],
    ['Primary vote',j=>(nat[j]*100).toFixed(1)+'%','400 16px'],['Swing',j=>{const d=(nat[j]-(DATA.prim25[j]||0))*100;return `${d>=0?'+':'−'}${Math.abs(d).toFixed(1)} pp`;},'400 16px']];
  let ry=py+ph+30;
  rows.forEach(([lab,f,font,two],ri)=>{const rh=two?46:lab==='Seats won'?40:30;x.fillStyle=INK;x.font=`700 15px ${SANS}`;x.fillText(lab,RX+18,ry+(rh>30?6:0));
    for(let k=0;k<3;k++){const j=t3[k],v=f(j);if(two){const ps=v.split(' '),l1=ps.length>1?ps.slice(0,-1).join(' '):v,l2=ps.length>1?ps[ps.length-1]:'';x.fillStyle=INK;x.font=`${font} ${SANS}`;ctr(l1,c0+k*colW+colW/2,ry-6);ctr(l2,c0+k*colW+colW/2,ry+13);continue;}x.font=`${font} ${lab==='Seats won'?SER:SANS}`;
      x.fillStyle=lab==='Seat change'||lab==='Swing'?(/▲|\+/.test(v)?'#1a7f4b':/▼|−/.test(v)?'#b3202a':MUT):INK;
      let tv=v;while(x.measureText(tv).width>colW-10&&tv.length>3)tv=tv.slice(0,-2)+'…';ctr(tv,c0+k*colW+colW/2,ry+(rh>30?6:0));}
    x.fillStyle=LINE;x.fillRect(RX+14,ry+rh-20,RW-28,1);ry+=rh;});
  // the House chart and the odds
  const oy=RY+RH-92,senY=oy-38;
  // national two-party-preferred bars (Labor v Coalition and Labor v One Nation)
  {let tp=null;try{tp=twoPP();}catch(e){}if(tp){const bx=RX+20,bw=RW-40;let by=ry+18;x.fillStyle=MUT;x.font=`600 13px ${MONO}`;ctr('NATIONAL TWO-PARTY-PREFERRED VOTE',cxR,by);by+=12;
    [[tp.a,colr(1),'Coalition'],[tp.b,colr(3),'One Nation']].forEach(([v,c2,nm2])=>{const L1=v*100;x.fillStyle=colr(0);x.fillRect(bx,by,bw*v,22);x.fillStyle=c2;x.fillRect(bx+bw*v,by,bw*(1-v),22);
      x.fillStyle='#fff';x.font=`700 14px ${SANS}`;x.fillText(`Labor ${L1.toFixed(1)}%`,bx+8,by+16);x.textAlign='right';x.fillText(`${nm2} ${(100-L1).toFixed(1)}%`,bx+bw-8,by+16);x.textAlign='left';by+=30;});
    x.fillStyle=INK;x.fillRect(bx+bw/2-1,ry+28,2,64);ry=by+4;}}
  const ch=await svgImg($('chamber'),true);const chTop=ry+10,chH=senY-44-chTop;if(ch){// trim to the drawn seats so the diagram centres on what is visible
    const oc=document.createElement('canvas');oc.width=ch.width;oc.height=ch.height;const ox=oc.getContext('2d');ox.drawImage(ch,0,0);let d0;try{d0=ox.getImageData(0,0,oc.width,oc.height).data;}catch(e){d0=null;}
    let sx=0,sy=0,sw=ch.width,sh=ch.height;if(d0){let x0=1e9,y0=1e9,x1=-1,y1=-1;for(let yy=0;yy<oc.height;yy++)for(let xx=0;xx<oc.width;xx++)if(d0[(yy*oc.width+xx)*4+3]>20){if(xx<x0)x0=xx;if(xx>x1)x1=xx;if(yy<y0)y0=yy;if(yy>y1)y1=yy;}if(x1>x0){sx=x0;sy=y0;sw=x1-x0+1;sh=y1-y0+1;}}
    const cTop=ry+4,cBot=senY-40,r=Math.min((RW-40)/sw,(cBot-cTop-16)/sh),iw=sw*r,ih=sh*r;x.drawImage(oc,sx,sy,sw,sh,RX+(RW-iw)/2,cTop+(cBot-cTop-ih)/2,iw,ih);}
  {const T=R.senCentral.tot,ix=k=>SK.indexOf(k),g=k=>ix(k)>=0?T[ix(k)]:0,coaS=g('COA')+g('NAT'),oth=76-g('ALP')-coaS-g('ON')-g('GRN');x.fillStyle=INK;x.font=`600 15px ${SANS}`;
    x.fillStyle=MUT;x.font=`600 13px ${MONO}`;ctr('SENATE · ALL 76 SEATS AFTER THE ELECTION',cxR,senY-22);x.fillStyle=INK;x.font=`600 16px ${SANS}`;ctr(`Labor ${g('ALP')} · Coalition ${coaS} · One Nation ${g('ON')} · Greens ${g('GRN')} · Others ${oth}`,cxR,senY);}
  const ow=(RW-28)/3;x.fillStyle=LINE;x.fillRect(RX+14,oy-16,RW-28,1.5);
  (CM?[['YOUR SEATS',String(CM.seats),rv(CM.col)],[CM.tierN,CM.tierV,INK],['SCORE',String(CM.score),ACC]]:[['LABOR MAJORITY',pct(R.pA),colr(0)],['HUNG',pct(R.pH),INK],['COALITION MAJORITY',pct(R.pC),colr(1)]]).forEach((o,k)=>{const ocx=RX+14+k*ow+ow/2;x.fillStyle=MUT;x.font=`600 13px ${MONO}`;ctr(o[0],ocx,oy+8);x.fillStyle=o[2];x.font=`900 44px ${SER}`;ctr(o[1],ocx,oy+58);});
  // numbered list of every seat with the winner's two-candidate share, as on the encyclopedia maps
  {const LY=1386;x.fillStyle=INK;x.fillRect(48,LY-20,W-96,3);const cols=8,perCol=Math.ceil(150/cols),cwL=(W-96)/cols,rhL=19.6;
    num.forEach((i,k)=>{const c2=Math.floor(k/perCol),r2=k%perCol,lx=48+c2*cwL,ly=LY+8+r2*rhL,st=D.seats[i],M=seatMargin(i),w=R.likely[i],cc=rv(mapCol(st,w,R.base[i]));
      x.font=`400 12px ${SANS}`;x.fillStyle=MUT;x.textAlign='right';x.fillText(NUM[i]+'.',lx+24,ly);x.textAlign='left';
      x.fillStyle=cc;x.font=`700 12.5px ${SANS}`;let nm=st.n;while(x.measureText(nm).width>cwL-90)nm=nm.slice(0,-1);x.fillText(nm,lx+29,ly);
      const nw=x.measureText(nm).width;x.fillStyle=LINE;for(let dx=lx+33+nw;dx<lx+cwL-60;dx+=4)x.fillRect(dx,ly-2,1.5,1.5);
      x.fillStyle=cc;x.font=`600 12.5px ${SANS}`;x.textAlign='right';x.fillText(M?(50+M.m).toFixed(2)+'%':'',lx+cwL-12,ly);x.textAlign='left';});}
  // disclaimers
  {const dy=H-74;x.fillStyle=LINE;x.fillRect(48,dy-26,W-96,1.5);x.fillStyle=MUT;x.font=`italic 400 15px ${BODY}`;
    ctr(CM?`A campaign-mode result: ${CM.leader}'s campaign for ${CM.party}, counted with the same model as the sandbox. Percentages are each winner's simulated two-candidate-preferred share.`:`A simulation, not a prediction: the central forecast across ${nf(S.trials)} simulated elections with this page's settings. Percentages are each winner's simulated two-candidate-preferred share.`,W/2,dy);
    ctr(`XYZ News and its reporters are fictional, and the story contains no real quotes. Not affiliated with or endorsed by the Parliament of Australia, the AEC or any party.`,W/2,dy+22);
    ctr(`Boundaries: AEC. Census: ABS 2021. Official portraits: AUSPIC / DPS, © Commonwealth of Australia, CC BY-NC-ND 4.0. Other photos: Wikimedia Commons. electionsimulator2028.au`,W/2,dy+44);}
  const url=cv.toDataURL('image/png');
  const ov=document.createElement('div');ov.className='shareimg';ov.innerHTML=`<img src="${url}" alt="Result card"><p>Long-press (phone) or right-click (computer) the image to save it.</p><div class="btns"><button type="button" id="shsave" class="ghost" style="border-color:#fff;color:#fff" hidden>Save image</button>${CM&&CM.text?'<button type="button" id="shcopy" class="ghost" style="border-color:#fff;color:#fff">Copy the result as text</button>':''}<button type="button" id="shclose">Close</button></div>`;
  if(CM)ov.style.zIndex='400';
  document.body.appendChild(ov);
  if(CM&&CM.text)ov.querySelector('#shcopy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(CM.text);ov.querySelector('p').textContent='Result copied.';}catch(e){ov.querySelector('p').textContent=CM.text;}});
  // saving goes through the viewer's download prompt when the page is allowed to offer files
  try{const dl=window.claude&&claude.use?await claude.use('downloads'):null;const btn=ov.querySelector('#shsave');
    if(!dl){btn.hidden=false;btn.addEventListener('click',()=>{const l=document.createElement('a');l.href=url;l.download=CM?'campaign-result.png':'election-result.png';document.body.appendChild(l);l.click();l.remove();});}
    if(dl){btn.hidden=false;btn.addEventListener('click',async()=>{const blob=await new Promise(r=>cv.toBlob(r,'image/png'));try{await dl.save({filename:CM?'campaign-result.png':'election-result.png',data:blob});ov.querySelector('p').textContent='Saved.';}catch(e){ov.querySelector('p').textContent=e&&e.code==='declined'?'Not saved.':'Saving is not available here: long-press or right-click the image instead.';}});}}catch(e){}ov.addEventListener('click',e=>{if(e.target===ov||e.target.id==='shclose')ov.remove();});
}
function pollChart(){
  const ps=DATA.polls.filter(p=>p.ts).slice().sort((a,b)=>a.ts-b.ts); if(ps.length<3)return '';
  const ser=[[0,p=>p.v[0]],[1,p=>(p.v[1]||0)+(p.v[2]||0)||null],[3,p=>p.v[4]],[2,p=>p.v[3]]];
  const W=640,H=250,L=34,Rr=12,T=10,B=26,x0=ps[0].ts,x1=ps[ps.length-1].ts,ymax=40;
  const X=ts=>L+(ts-x0)/Math.max(1,x1-x0)*(W-L-Rr), Y=v=>T+(1-v/ymax)*(H-T-B);
  let g='';for(let v=0;v<=ymax;v+=10)g+=`<line x1="${L}" x2="${W-Rr}" y1="${Y(v)}" y2="${Y(v)}" stroke="currentColor" opacity=".12"/><text x="${L-6}" y="${Y(v)+4}" font-size="11" text-anchor="end" fill="currentColor" opacity=".7">${v}</text>`;
  const months=[];{const d=new Date(x0*1000);d.setDate(1);d.setMonth(d.getMonth()+1);while(d.getTime()/1000<=x1){months.push(d.getTime()/1000);d.setMonth(d.getMonth()+1);}}
  months.forEach(m=>{g+=`<text x="${X(m)}" y="${H-8}" font-size="11" text-anchor="middle" fill="currentColor" opacity=".7">${new Date(m*1000).toLocaleDateString('en-AU',{month:'short',year:'2-digit'})}</text>`;});
  ser.forEach(([j,f])=>{const pts=ps.map(p=>[p.ts,f(p)]).filter(q=>q[1]!=null&&!isNaN(q[1]));
    pts.forEach(q=>g+=`<circle cx="${X(q[0]).toFixed(1)}" cy="${Y(q[1]).toFixed(1)}" r="2.2" fill="${col(j)}" opacity=".35"/>`);
    // smoothed average: Gaussian-weighted over about three weeks
    const steps=60,line=[];for(let k=0;k<=steps;k++){const t=x0+(x1-x0)*k/steps;let sw=0,sv=0;pts.forEach(q=>{const w=Math.exp(-Math.pow((q[0]-t)/(86400*14),2));sw+=w;sv+=w*q[1];});if(sw>0.05)line.push([t,sv/sw]);}
    g+=`<path d="${line.map((q,k)=>(k?'L':'M')+X(q[0]).toFixed(1)+','+Y(q[1]).toFixed(1)).join('')}" fill="none" stroke="${col(j)}" stroke-width="2.5" stroke-linejoin="round"/>`;});
  return `<svg class="ptrack" viewBox="0 0 ${W} ${H}" role="img" aria-label="First-preference poll trends since the 2025 election">${g}</svg><div class="pleg">${ser.map(([j])=>`<span><i style="background:${col(j)}"></i>${P[j].n}</span>`).join('')}<span class="status">Dots are individual polls; lines are a smoothed average.</span></div>`;
}
function dataTab(){
  const ST=['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];
  const byState=ST.map(st=>{const t=new Array(NG).fill(0);D.seats.forEach((s,i)=>{if(s.st===st)t[R.likely[i]]++;});return t;});
  const nat=natCentral(), SC2=ORD.filter(j=>j<5||R.likeCount[j]>0);
  $('data').innerHTML=`<h2 class="art" id="h-data">Data</h2>
   <h3 class="art">First-preference vote</h3><div style="overflow-x:auto"><table class="dtable"><thead><tr><th class="l">Party</th><th>2025 result</th><th>Now (your settings)</th><th>Change</th></tr></thead><tbody>
   ${P.map((g,j)=>j).filter(j=>DATA.prim25[j]>0).sort((a,b)=>DATA.prim25[b]-DATA.prim25[a]).map(j=>`<tr><td class="l"><span class="ps" style="background:${col(j)}"></span>${P[j].full||P[j].n}</td><td>${(DATA.prim25[j]*100).toFixed(2)}%</td><td>${(nat[j]*100).toFixed(2)}%</td><td>${((nat[j]-DATA.prim25[j])*100>0?'+':'')+((nat[j]-DATA.prim25[j])*100).toFixed(1)}</td></tr>`).join('')}</tbody></table></div>
   <h3 class="art">Seats by state (most likely winner)</h3><div style="overflow-x:auto"><table class="dtable"><thead><tr><th class="l">State</th>${SC2.map(j=>`<th><span class="ps" style="background:${col(j)}"></span>${P[j].n}</th>`).join('')}<th>Total</th></tr></thead><tbody>
   ${ST.map((st,k)=>`<tr><td class="l">${stN(st)}</td>${SC2.map(j=>`<td>${byState[k][j]}</td>`).join('')}<td><b>${byState[k].reduce((a,b)=>a+b,0)}</b></td></tr>`).join('')}</tbody></table></div>
   <h3 class="art">Poll tracker</h3>${(()=>{const q=DATA.polls[0];if(!q)return "";const v=q.v,co=(v[1]||0)+(v[2]||0);return `<p class="figcap"><span class="fig">Fig. 12</span>Latest poll: ${q.p}, ${q.d.replace(/^0/,"")}. Labor ${(+v[0]).toFixed(1)}, Coalition ${co.toFixed(1)}, One Nation ${(+v[4]).toFixed(1)}, Greens ${(+v[3]).toFixed(1)}.</p>`;})()}${pollChart()}
   <h3 class="art">Changes since the 2025 election</h3><div style="overflow-x:auto"><table class="dtable"><thead><tr><th class="l">Date</th><th class="l">Seat</th><th class="l">Change</th></tr></thead><tbody>
   ${CHANGES.map(c=>`<tr><td class="l" style="white-space:nowrap">${c[0]}</td><td class="l">${c[3]?`<span class="ps" style="background:${col(P.findIndex(g=>g.ab===c[3]))}"></span>`:''}${c[1]}</td><td class="l">${c[2]}</td></tr>`).join('')}</tbody></table></div>
   <h3 class="art" id="polls">Opinion polls (first preferences, %)</h3><div style="overflow-x:auto"><table class="dtable"><thead><tr><th class="l">Date</th><th class="l">Pollster</th><th>Sample</th><th>ALP</th><th>L/NP</th><th>GRN</th><th>ON</th><th>OTH</th></tr></thead><tbody>
   ${DATA.polls.map(p=>{const v=p.v;const coa=(v[1]||0)+(v[2]||0);const cell=(x,j)=>`<td${x===Math.max(v[0]||0,coa,v[4]||0)?` style="color:${col(j)};font-weight:700"`:''}>${x==null?'–':(+x).toFixed(1)}</td>`;
     return `<tr><td class="l">${p.d.replace(/^0/,'')}</td><td class="l">${p.p}</td><td>${p.n?nf(p.n):'–'}</td>${cell(v[0],0)}${cell(coa,1)}${cell(v[3],2)}${cell(v[4],3)}${cell(v[5],4)}</tr>`;}).join('')}</tbody></table></div>`;
}
function tppSeats(x,y){   // each seat's two-party share for x against y, using each party's preference row
  const X=ENGINE.adjustFlows(D,LS.pf), dI=g=>g===NATI?1:g<4?g:4, dx=dI(x), dy=dI(y);
  const rowOf=(j,k)=>X.colRow&&X.colRow[j]?X.colRow[j][k]:X.MMR[k*5+DATA.colT[j]];
  const gOfCol=j=>{const g=DATA.colG[j];return g===NATI?1:g;}, xs=x===NATI?1:x, ys=y===NATI?1:y;
  return D.seats.map((st,i)=>{const p=R.base[i];let tx=0,tot=0;
    p.forEach((v,j)=>{if(!v)return;tot+=v;const g=gOfCol(j);if(g===xs){tx+=v;return;}if(g===ys)return;
      const r=j<5?X.MC[[0,1,1,2,3][j]]:rowOf(j,st.k), a=r[dx]||0,b=r[dy]||0;tx+=v*(a+b>0?a/(a+b):0.5);});
    return tot>0?tx/tot:0.5;});
}
function tppPair(x,y){const s=tppSeats(x,y);let v=0,W=0;D.seats.forEach((st,i)=>{v+=s[i]*st.fv;W+=st.fv;});return v/W;}
// the contest the two-party figures describe: projected government v Opposition (Liberals and Nationals together)
function tppTeams(){const lc=R.likeCount, cnt=g=>g===1?lc[1]+(SPLIT?lc[NATI]:0):lc[g];
  const rk=P.map((_,g)=>g).filter(g=>g!==4&&g!==NATI).sort((p,q)=>cnt(q)-cnt(p));return [rk[0],rk[1]];}
let TPPS=null, TPPT=null;
// Coalition seats by state party (Liberal, National, LNP, CLP), from each seat's most likely winner
function coaBreak(){const o={};D.seats.forEach((s,i)=>{const w=R.likely[i];const k=coaSub(s,w,R.base[i]);if(!k)return;(o[w]=o[w]||{})[k]=(o[w][k]||0)+1;});return o;}
// the map splits the Coalition into its state parties: Liberal, National, LNP (Queensland), CLP (Northern Territory)
const rv0=v=>{v=String(v);return v.startsWith('var(')?getComputedStyle(document.documentElement).getPropertyValue(v.slice(4,-1)).trim()||v:v;};
const COASUB={LIB:['Liberal','var(--coa)'],NAT:['National','var(--nat)'],LNP:['LNP (Qld)','#2E8FD9'],CLP:['CLP (NT)','#B8732E']};
function coaSub(s,g,p){if(g!==1&&g!==NATI)return null;if(s.st==='QLD')return 'LNP';if(s.st==='NT')return 'CLP';
  if(g===NATI)return 'NAT';const q=p||s.b;return (q[2]>q[1]||(!p&&s.nr))?'NAT':'LIB';}
const mapCol=(s,g,p)=>{const k=coaSub(s,g,p);return k?COASUB[k][1]:col(g);}, mapName=(s,g,p)=>{const k=coaSub(s,g,p);return k?COASUB[k][0]:g===4?'Independent':P[g].n;};
function twoPP(){
  const X=ENGINE.adjustFlows(D,LS.pf), c=LS.coaON; let a=0,b=0,W=0;
  const rowOf=(j,k)=>X.colRow&&X.colRow[j]?X.colRow[j][k]:X.MMR[k*5+DATA.colT[j]];
  D.seats.forEach((s,i)=>{const p=R.base[i],k=s.k;let ac=p[0],ao=p[0],tot=0;p.forEach(v=>tot+=v);
    ac+=p[3]*X.MC[2][0]/(X.MC[2][0]+X.MC[2][1])+p[4]*X.MC[3][0]/(X.MC[3][0]+X.MC[3][1]);
    ao+=(p[1]+p[2])*(1-c)+p[3]*X.MC[2][0]/(X.MC[2][0]+X.MC[2][3]);
    for(let j=5;j<p.length;j++){if(!p[j])continue;const r=rowOf(j,k);ac+=p[j]*r[0]/(r[0]+r[1]);ao+=p[j]*r[0]/(r[0]+r[3]);}
    a+=ac/tot*s.fv;b+=ao/tot*s.fv;W+=s.fv;});
  return {a:a/W,b:b/W};
}
// ---- seat search on the map, and dropdown sections opened from the section links
function findSeat(){const q=($('mapq').value||'').trim().toLowerCase();if(!q)return;
  let i=D.seats.findIndex(s=>s.n.toLowerCase()===q);if(i<0)i=D.seats.findIndex(s=>s.n.toLowerCase().startsWith(q));if(i<0)i=D.seats.findIndex(s=>s.n.toLowerCase().includes(q));
  if(i<0){$('mapqmsg').textContent='No seat matches “'+$('mapq').value+'”.';return;}
  $('mapqmsg').textContent='';$('mapq').value=D.seats[i].n;sel=i;render();if(MAPZOOM)MAPZOOM(D.seats[i].n);$('h-map').scrollIntoView({behavior:'smooth',block:'start'});}
$('mapgo').addEventListener('click',findSeat);
$('replaybtn').addEventListener('click',()=>replayStart(false));document.querySelectorAll('.rspeed button').forEach(b=>b.addEventListener('click',()=>setSpeed(+b.dataset.sp)));$('rskip').addEventListener('click',replaySkip);$('rcont').addEventListener('click',replayContinue);
document.querySelectorAll('.cabsw .chip').forEach(b=>b.addEventListener('click',()=>{CABV=b.dataset.c;document.querySelectorAll('.cabsw .chip').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on));});cabinet();}));
document.querySelectorAll('.pgrp .chip').forEach(b=>b.addEventListener('click',()=>{PGROUP=b.dataset.g;document.querySelectorAll('.pgrp .chip').forEach(x=>{const on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',String(on));});pendulum();}));
['fpm','farr','fpart'].forEach(id=>$(id).addEventListener('change',()=>{const f={pm:+$('fpm').value,arr:$('farr').value,part:+$('fpart').value};if(f.pm<0)f.part=-1;if(f.part===f.pm)f.part=-1;S.form=f;render();}));
$('mlayout').addEventListener('change',e=>{MAPLAY=e.target.value;GEO=MAPLAY==='hex'?HEXGEO:GEO0;mapBuilt=false;drawMap();
  $('insets').style.display=MAPLAY==='hex'?'none':'';$('mapkeylay').textContent=MAPLAY==='hex'?' Hex layout: every seat is one equal-sized hexagon, grouped by state, so city seats are as visible as the bush.':'';});
$('mapq').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();findSeat();}});
$('mapq').addEventListener('change',()=>{if(D.seats.some(s=>s.n===$('mapq').value))findSeat();});
const openDrop=id=>{const el=document.getElementById(id);const d=el&&el.closest('details');if(d)d.open=true;};
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a.pollink');if(a&&window.showTab&&window.showTab('h-data')){e.preventDefault();}});
document.querySelectorAll('a[href^="#h-"],a[href="#about"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href').slice(1);if(id==='about'){$('aboutdrop').open=true;return;}if(window.showTab&&window.showTab(id)){e.preventDefault();return;}openDrop(id);}));
if(location.hash)openDrop(location.hash.slice(1));
// ---- swingometer: national two-party preferred, Labor against the main opponent
const TPP25=55.22;
function swingometer(){
  const {a}=twoPP(), lc=(REPLAY?REPLAY.R0:R).likeCount, cnt=g=>g===1?lc[1]+(SPLIT?lc[NATI]:0):lc[g];
  const rk=P.map((_,g)=>g).filter(g=>g!==4&&g!==NATI).sort((p,q)=>cnt(q)-cnt(p)), gv=rk[0], op=rk[1];
  const isAC=(gv===0&&op===1)||(gv===1&&op===0);
  const v0=(isAC?(gv===0?a:1-a):tppPair(gv,op))*100, opp=op;
  // during the live count the needle starts at 50 and settles on the estimate as seats are counted
  const v=REPLAY?50+(v0-50)*Math.min(1,(REPLAY.done.size+REPLAY.lead.size*0.5)/150*1.15):v0;
  const nm=g=>g===1&&SPLIT?'Liberal–National':P[g].n;
  const cx=170,cy=178,r=140,lo=35,hi=65,ang=x=>Math.PI*(1-(Math.min(hi,Math.max(lo,x))-lo)/(hi-lo));
  const pt=(x,rr)=>[cx+rr*Math.cos(ang(x)),cy-rr*Math.sin(ang(x))];
  const arc=(x0,x1,rr)=>{const p0=pt(x0,rr),p1=pt(x1,rr);return `M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${rr},${rr} 0 0 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}`;};
  let g=`<path d="${arc(lo,50,r-14)}" fill="none" stroke="${col(opp)}" stroke-width="20" opacity=".28"/><path d="${arc(50,hi,r-14)}" fill="none" stroke="${col(gv)}" stroke-width="20" opacity=".28"/>`;
  for(let x=lo;x<=hi;x+=5){const p0=pt(x,r-26),p1=pt(x,r-2),pl=pt(x,r+10);g+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" stroke="currentColor" stroke-width="${x===50?2:1}" opacity="${x===50?.9:.45}"/><text x="${pl[0].toFixed(1)}" y="${(pl[1]+3).toFixed(1)}" font-size="10" text-anchor="middle" fill="currentColor" opacity=".7" font-family="IBM Plex Mono, monospace">${x}</text>`;}
  const T25=gv===0?TPP25:100-TPP25;
  if(isAC){const p0=pt(T25,r-30),p1=pt(T25,r+2),pl=pt(T25,r-40);g+=`<line x1="${p0[0].toFixed(1)}" y1="${p0[1].toFixed(1)}" x2="${p1[0].toFixed(1)}" y2="${p1[1].toFixed(1)}" stroke="currentColor" stroke-width="2" stroke-dasharray="3 2"/><text x="${pl[0].toFixed(1)}" y="${(pl[1]+3).toFixed(1)}" font-size="10" text-anchor="middle" fill="currentColor" font-family="IBM Plex Mono, monospace">2025</text>`;}
  const deg=90-ang(v)*180/Math.PI;   // 0 = pointing straight up at 50
  g+=`<text x="6" y="196" font-size="15" fill="${col(opp)}" font-weight="700" font-family="Fraunces, Georgia, serif">${nm(opp)} ${(100-v).toFixed(1)}</text><text x="334" y="196" font-size="15" text-anchor="end" fill="${col(gv)}" font-weight="700" font-family="Fraunces, Georgia, serif">${nm(gv)} ${v.toFixed(1)}</text>`;
  const sv=$('swingsvg');if(!sv.querySelector('#swbg'))sv.innerHTML=`<g id="swbg"></g><g id="swneedle" style="transform-origin:${cx}px ${cy}px;transform:rotate(0deg)"><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-r+8}" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="7" fill="currentColor"/></g>`;
  sv.querySelector('#swbg').innerHTML=g; sv.querySelector('#swneedle').style.transform=`rotate(${deg.toFixed(2)}deg)`; $('swingsvg').setAttribute('aria-label',`Two-party preferred: ${nm(gv)} ${v.toFixed(1)}, ${nm(opp)} ${(100-v).toFixed(1)}`);
  const d=v-T25, gw=cnt(gv)>=76?'government and Opposition':'two largest parties';
  $('swingcap').innerHTML=`Two-party preferred estimate between the projected ${gw}, ${nm(gv)} v ${nm(opp)}. `+(!isAC?`There is no national 2025 figure for this contest to compare against.`
    :Math.abs(d)<0.05?`No swing since 2025 (Labor 55.2).`:`A swing of <b>${Math.abs(d).toFixed(1)} points</b> to ${(gv===0)===(d>0)?'Labor':'the Coalition'} since 2025, when Labor won 55.2.`);
  // explainer: Labor ahead on seats while behind the Coalition on the two-party vote
  const labTop=lc[0]>=Math.max(...lc.filter((_,j)=>j!==0)), ac=a*100;
  const showNote=isAC&&gv===0&&labTop&&ac<50;
  $('swinginfo').hidden=!showNote;$('swinginfo').setAttribute('aria-label','Why the seat count and two-party vote disagree');
  if(showNote){const lm=lc[0]>=76;
    $('swingnote').innerHTML=`<b>Why can Labor ${lm?'win a majority':'win the most seats'} while trailing the Coalition ${ac.toFixed(1)}–${(100-ac).toFixed(1)}?</b> The national two-party figure imagines every seat as a Labor v Coalition contest. With One Nation on ${(natCentral()[3]*100).toFixed(0)}% of the vote, many seats are really Labor v One Nation or One Nation v Coalition, and the anti-Labor vote is split between two parties competing for the same seats. Labor only needs to finish ahead of whichever one makes the final two, and its vote is spread more efficiently across marginal city seats. It has happened before: Labor won in 1990 and the Coalition in 1998 with under 50% of the two-party vote.`;}
}
// ---- state small multiples: each state's seats, coloured by most likely winner
let statesBuilt=false;
const STORD=['NSW','VIC','QLD','WA','SA','TAS','ACT','NT'];
function states(){
  const stVis=$('states').offsetParent!==null;
  if(!statesBuilt&&!stVis)return;
  if(!statesBuilt){
    $('states').innerHTML=STORD.map(st=>`<div class="stc"><div class="sth" data-st="${st}"><b>${stN(st)}</b><span class="status" id="stsum_${st}"></span></div><svg id="stmap_${st}" role="img" aria-label="${stN(st)} seats">${D.seats.map((s,i)=>s.st!==st?'':`<path class="scell" data-i="${i}"${(GEO.qseats||[]).includes(s.n)?' clip-path="url(#qclip)"':''} d="${GEO.cells[s.n].d}"></path>`).join('')}</svg><div class="stl" id="stl_${st}"></div></div>`).join('');
    STORD.forEach(st=>{const svg=$('stmap_'+st);try{const b=svg.getBBox();const pad=Math.max(b.width,b.height)*0.04;svg.setAttribute('viewBox',`${(b.x-pad).toFixed(2)} ${(b.y-pad).toFixed(2)} ${(b.width+2*pad).toFixed(2)} ${(b.height+2*pad).toFixed(2)}`);
      svg.style.setProperty('--ssw',(Math.max(b.width,b.height)/260).toFixed(3)+'px');}catch(e){}});
    $('states').addEventListener('click',e=>{const el=e.target.closest('.scell');if(!el)return;sel=+el.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});});
    statesBuilt=true;
  }
  const chg={};
  STORD.forEach(st=>{const t=new Array(NG).fill(0);let n=0,c=0;
    $('stmap_'+st).querySelectorAll('.scell').forEach(e=>{const i=+e.dataset.i,w=R.likely[i],ch=w!==gOf(D.seats[i]);e.style.fill=mapCol(D.seats[i],w,R.base[i]);e.style.fillOpacity=(0.35+0.65*R.prob[i][w]).toFixed(2);e.classList.toggle('chg',ch);e.classList.toggle('sel',sel===i);t[w]++;n++;c+=ch;});
    chg[st]=c;
    $('stsum_'+st).textContent=`${n} seat${n>1?'s':''} · ${c?c+' change hands':'no change'}`;
    const cs={};D.seats.forEach((ss,i)=>{if(ss.st!==st)return;const w=R.likely[i];if(w===1||w===NATI){const k=coaSub(ss,w,R.base[i]);cs[k]=(cs[k]||0)+1;}});
    $('stl_'+st).innerHTML=ORD.filter(j=>t[j]).map(j=>(j===1||j===NATI)?(j===1?Object.entries(cs).map(([k,v])=>`<span><i class="sw" style="background:${COASUB[k][1]}"></i>${COASUB[k][0]} <b>${v}</b></span>`).join(''):''):`<span><i class="sw" style="background:${col(j)}"></i>${P[j].n} <b>${t[j]}</b></span>`).join('');});
  const tot=Object.values(chg).reduce((a,b)=>a+b,0), top=STORD.slice().sort((a,b)=>chg[b]-chg[a])[0];
  $('statecap').innerHTML=`<span class="fig">Fig. 8</span>`+(tot?`${tot} seat${tot>1?'s':''} change hands from their current members; the most movement is in ${stN(top)} (${chg[top]}).`:'Every seat stays with its current member in the central forecast.');
  setTimeout(renumberFigs,0);
}
// ---- figure captions: one-line takeaways written from the result
function figs(){
  const ch=D.seats.map((s,i)=>[i,R.likely[i],gOf(s)]).filter(x=>x[1]!==x[2]);
  const gains=new Array(NG).fill(0);ch.forEach(x=>gains[x[1]]++);const gj=gains.indexOf(Math.max(...gains));
  $('mapcap').innerHTML=`<span class="fig">Fig. 3</span>`+(ch.length?`${ch.length} seat${ch.length>1?'s':''} change hands; ${P[gj].n} picks up the most (${gains[gj]}). Click a city box to zoom the map.`:'No seat changes hands in the central forecast.');
  const ds=[0,1,2,3,4].map(j=>[j,R.dist[j].p95-R.dist[j].p5]).sort((a,b)=>b[1]-a[1])[0], dj=ds[0];
  const maj=[0,1].map(j=>[j,R.dist[j].hist.filter(v=>v>=76).length/R.dist[j].hist.length]).sort((a,b)=>b[1]-a[1])[0];
  $('distcap').innerHTML=`<span class="fig">Fig. 7</span>${P[dj].n} has the widest range of any party (${R.dist[dj].p5}–${R.dist[dj].p95} seats). ${P[maj[0]].n} reaches 76 in ${pct(maj[1])} of simulations.`;
  const rows=D.seats.map((s,i)=>({i,s,...seatMargin(i)})).sort((a,b)=>a.m-b.m), m0=rows[0], nm=rows.filter(x=>x.m<6).length;
  $('pendcap').innerHTML=`<span class="fig">Fig. 9</span>${nm} seats are marginal (under 6%). The closest is ${m0.s.n} (${stN(m0.s.st)}): ${P[m0.w].n} by ${m0.m.toFixed(2)}% over ${P[m0.r].n}.`;
  const T=R.senCentral.tot,ix=k=>SK.indexOf(k),lg=T[ix('ALP')]+T[ix('GRN')],co=T[ix('COA')]+(T[ix('NAT')]||0)+T[ix('ON')];
  // seats to watch
  {const rs=D.seats.map((s,i)=>{const o=R.prob[i].map((v,j)=>[v,j]).sort((a,b)=>b[0]-a[0]);return {i,s,o,m:o[0][0]-o[1][0]};}).filter(r=>r.o[1][0]>0.02).sort((a,b)=>a.m-b.m).slice(0,20);
   const fav=new Array(NG).fill(0);rs.forEach(r=>fav[r.o[0][1]]++);const fl=fav.map((v,j)=>[v,j]).filter(x=>x[0]).sort((a,b)=>b[0]-a[0]).map(([v,j])=>`${P[j].n} ${v}`).join(', ');const c0=rs[0];
   $('watchcap').innerHTML=c0?`<span class="fig">Fig. 4</span>The closest is ${c0.s.n} (${stN(c0.s.st)}), ${Math.round(c0.o[0][0]*100)}–${Math.round(c0.o[1][0]*100)} between ${P[c0.o[0][1]].n} and ${P[c0.o[1][1]].n}. Favourites among the 20: ${fl}.`:'';}
  // who forms government
  {const G=R.gov,gl=[['a Labor majority',G.la],['Labor with the Greens',G.lg],['the crossbench deciding',G.xd],['the Coalition with One Nation',G.co],['a Coalition majority',G.ca]].sort((a,b)=>b[1]-a[1]);
   $('govcap').innerHTML=`<span class="fig">Fig. 6</span>The likeliest outcome is ${gl[0][0]} (${pct(gl[0][1])}), then ${gl[1][0]} (${pct(gl[1][1])}).`;}
  // Senate: the most contested last seat
  {const best=S2.states.map((st,k)=>{const l=R.senState[k].last.map((v,g)=>[v,g]).sort((a,b)=>b[0]-a[0]);return {st,k,a:l[0],b:l[1]};}).sort((x,y)=>(x.a[0]-x.b[0])-(y.a[0]-y.b[0]))[0];
   $('sencardcap').innerHTML=`<span class="fig">Fig. 11</span>The tightest race for a final Senate seat is in ${stN(best.st)}: ${S2.groups[best.a[1]].n} takes it in ${pct(best.a[0])} of simulations, ${S2.groups[best.b[1]].n} in ${pct(best.b[0])}.`;}
  $('sencap').innerHTML=`<span class="fig">Fig. 10</span>Labor and the Greens hold ${lg} of 76; the Coalition and One Nation ${co}. 39 votes pass a bill.`;
}
// seat effect of each demographic slider: central forecast with the slider v without it
function dfEffects(){
  const full=ENGINE.simulate(D,{...LS,centralOnly:true}).cenCount;
  DATA.dfac.forEach((f,k)=>{const el=$('df_'+k+'x');if(!el)return;if(!S.dfac[k]){el.textContent='';return;}
    const off=ENGINE.simulate(D,{...LS,centralOnly:true,dfac:LS.dfac.filter(x=>x.i!==k)}).cenCount;
    const ch=full.map((v,j)=>[v-off[j],j]).filter(x=>x[0]).sort((a,b)=>Math.abs(b[0])-Math.abs(a[0]));
    el.innerHTML=ch.length?'Seat effect at this setting: '+ch.map(([d,j])=>`<span style="color:${col(j)};font-weight:700">${P[j].n} ${d>0?'+':'−'}${Math.abs(d)}</span>`).join(', '):'Seat effect at this setting: no seats change hands.';});
}
// live preview while the sliders move (before "Run with changes"): central forecast with v without each demographic setting
let DFPT=0;function dfPreview(){clearTimeout(DFPT);DFPT=setTimeout(()=>{if(!R||REPLAY)return;try{
  const ls=settings(),cen=x=>ENGINE.simulate(D,{...ls,centralOnly:true,...x}).cenCount,full=cen({});
  const fmt=(off,lab)=>{const ch=full.map((v,j)=>[v-off[j],j]).filter(x=>x[0]).sort((a,b)=>Math.abs(b[0])-Math.abs(a[0]));
    return `${lab}: `+(ch.length?ch.map(([d,j])=>`<span style="color:${col(j)};font-weight:700">${P[j].n} ${d>0?'+':'−'}${Math.abs(d)}</span>`).join(', '):'no seats change hands.');};
  DATA.dfac.forEach((f,k)=>{const el=$('df_'+k+'x');if(!el)return;if(!S.dfac[k]){el.textContent='';return;}el.innerHTML=fmt(cen({dfac:ls.dfac.filter(x=>x.i!==k)}),'Seat effect at this setting');});
  const any=ls.dfac.length>0;$('dfall').innerHTML=any&&ls.dfac.length>1?fmt(cen({dfac:[]}),'All demographic sliders together'):'';
  $('demox').innerHTML=ls.demo&&ls.demo.length?fmt(cen({demo:[]}),'Seat effect of these rules'):'';}catch(e){}},250);}
let PP=0;
function pathTo(){
  const sel0=$('pathp'); if(!sel0.options.length){sel0.innerHTML=[0,1,3,2].map(j=>`<option value="${j}">${P[j].n}</option>`).join('');sel0.addEventListener('change',e=>{PP=+e.target.value;pathTo();});}
  const r=D.seats.map((s,i)=>({i,s,p:R.prob[i][PP]})).sort((a,b)=>b.p-a.p);
  const k76=r[75], safe=r.filter(x=>x.p>=0.9).length, likely=r.filter(x=>x.p>=0.5).length;
  $('pathsum').innerHTML=`<span class="fig">Fig. 5</span>${P[PP].n} is favoured in <b>${likely}</b> seats and safe (90%+) in <b>${safe}</b>. Ranked by ${P[PP].n}'s chance, its 76th-best seat is <b>${k76.s.n}</b> at <b>${pct(k76.p)}</b>: a majority needs every seat at least that winnable.`;
  const win=r.slice(66,86);
  $('path').innerHTML=win.map((x,k)=>{const rank=67+k, h=gOf(x.s);return `<button type="button" data-i="${x.i}"${rank===76?' class="t76"':''}><span><strong>${rank}. ${x.s.n}</strong> <small>${stN(x.s.st)} · held by ${the(h)}</small></span><span class="num">${pct(x.p)}</span><span><span class="duo"><i style="width:${x.p*100}%;background:${col(PP)}"></i></span>${rank===76?'<small><b>Seat 76: the majority line</b></small>':''}</span></button>`;}).join('');
  $('path').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{sel=+b.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));
}
function watch(){
  const rows=D.seats.map((s,i)=>{const pr=R.prob[i],o=pr.map((v,j)=>[v,j]).filter(x=>x[0]>0.005).sort((x,y)=>y[0]-x[0]);return {i,s,o,m:o[0][0]-(o[1]?o[1][0]:0)};}).filter(r=>r.o.length>1&&r.o[1][0]>0.02).sort((x,y)=>x.m-y.m).slice(0,20);
  $('watch').innerHTML=rows.map(r=>`<button type="button" data-i="${r.i}"><span><strong>${r.s.n}</strong> <small>${stN(r.s.st)} · held by ${the(gOf(r.s))}</small></span><span class="num">${Math.round(r.o[0][0]*100)}%</span><span><span class="duo">${r.o.map(([v,j])=>`<i style="width:${v*100}%;background:${col(j)}" title="${P[j].n} ${pct(v)}"></i>`).join('')}</span><small>${r.o.filter(x=>x[0]>=0.02).slice(0,4).map(([v,j])=>`${P[j].n} ${Math.round(v*100)}%`).join(' · ')}</small></span></button>`).join('');
  $('watch').querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{sel=+b.dataset.i;render();$('seatcard').scrollIntoView({behavior:'smooth',block:'nearest'});}));
}
function how(){
  $('how').innerHTML=`<h2 class="art" id="h-how">How this works</h2>
  <p>The simulator plays out the next federal election thousands of times, seat by seat, and adds up the winners. How often each result comes up tells you how likely it is.</p>
  <h3 class="art">Each simulated election</h3>
  <ol><li><b>Starting point.</b> Every seat starts from its 2025 result, blended with the DemosAU seat-by-seat poll (August–September 2026) and moved to match the current average of national polls.</li>
  <li><b>Your changes.</b> Anything you set in the sandbox (vote shifts, leaders, events, demographic swings, local factors) is added on top. Demographic swings use each seat's 2021 Census profile (${DATA.census.f.length} measures, from age and income to religion, ancestry and jobs) and move each party in line with how its 2025 vote varied across those communities.</li>
  <li><b>Random error.</b> Polls miss, and they miss in patterns, so each run adds a national error plus state, regional and seat-level errors.</li>
  <li><b>The count.</b> Each seat is counted the way the AEC does it: the lowest candidates drop out and their preferences flow on, based on 2025 flows, until someone has a majority.</li></ol>
  <h3 class="art">Reading the results</h3>
  <ul><li><b>Chances</b>: the share of runs ending in a Labor majority, a Coalition majority or a hung parliament (76 seats wins a majority).</li>
  <li><b>Map and central forecast</b>: each seat goes to the party that wins it most often.</li>
  <li><b>Ranges</b>: the middle 90% of runs.</li></ul>
  <h3 class="art">The Senate</h3>
  <p>Each state's Senate seats are filled with a party-level quota count using estimated preference flows. Sitting senators are assumed to keep their 2022 ticket order.</p>
  <h3 class="art">Results night and the news story</h3>
  <p>The live count replays the central result seat by seat in the order seats would be called. XYZ News, its reporters and its studio guests are fictional, and the story is written automatically from each run. It contains no real quotes.</p>
  <h3 class="art">Factions and new leaders</h3>
  <p>Labor and Liberal MPs and senators are tagged with the faction they are reported to belong to; the Nationals have no formal factions, so they are grouped by state branch. If a leader loses their seat or their party loses badly, the party room picks a new leader from its surviving frontbench (the cabinet for Labor, the shadow cabinet for the Coalition), most often from the largest faction but not always. If the whole frontbench is gone, the field opens up to the backbench. Parties without factions turn to their most senior figure left.</p>
  <h3 class="art">Limits</h3>
  <p>It can't know about candidates who haven't been chosen, local campaigns or future boundary changes, and the effects of leaders and events are judgement calls. Treat it as a guide to what could happen, not a prediction.</p>`;
}
// one-line descriptions under each control
const DESC={s0:"Moves Labor's national first-preference vote; each seat moves in proportion to Labor's existing vote there.",
  s1:"Moves the combined Liberal and National vote.", ["s"+NATI]:"Moves the Nationals vote only (including Queensland LNP members who sit with the Nationals).", s2:"Moves the Greens vote; gains are biggest where the Greens are already strong.",
  s3:"Moves One Nation's vote; part of any change comes from or goes to the Coalition and Labor.", s4:"Moves the vote of independents not in a party (Community Strong Australia has its own slider).",
  coa:'Share of Coalition voters who number One Nation above Labor when their own candidate is excluded. Decides many Labor v One Nation seats.',
  pfOn:'Share of One Nation voters who number the Coalition above Labor. 2025 result: about 73%.',
  pfGrn:'Share of Greens voters who number Labor above the Coalition and One Nation. 2025 result: about 80% v the Coalition.',
  pfLg:'Decides Coalition v One Nation seats. Higher helps the Coalition.',
  pfMin:'Scales how much minor-party preference flows go to One Nation (1 = as in 2025).',
  split:'Three-cornered contests split the Coalition vote and leak preferences.',
  err:'Scales every random polling error. 1 = errors the size of recent elections.',
  big:'Chance a simulation has doubled errors, like the 2019 polling failure.',
  mrp:"How much each seat's starting point leans on the DemosAU seat poll rather than the 2025 result plus national swing.",
  trials:'More simulations give steadier numbers but take longer.',
  dpre:'Ready-made demographic scenarios. Pick Custom to set the two rules below yourself.',
  preset:'Loads a complete scenario. You can keep adjusting it afterwards.'};
const EVD={'Government':"Events that change Labor's standing as the government.", 'Coalition':"The state of the Liberal–National Coalition.", 'One Nation':"One Nation's campaign and organisation.",
  'Greens and independents':'Moves the Greens and the teal and community independents.', 'Campaign':'How the six-week campaign plays out.',
  'Economy':'Economic conditions by election day.', 'Outside shock':'Events outside politics that move voters.', 'Preference climate':'How tightly voters follow how-to-vote cards.',
  'Polling environment':'How accurate the polls turn out to be.', 'Election timing':'Earlier elections leave less time for polls to drift, so the ranges narrow.'};
EV.forEach((e,i)=>DESC['e'+i]=EVD[e.name]||'');
LP.forEach((p,i)=>DESC['l'+i]='Each alternative leader carries an estimated effect on the vote; for Labor and the Coalition it fades as the election gets further away.');
[0,1].forEach(i=>DESC['da'+i]='Points added per standard deviation above the average seat (negative = the party does worse there).');
Object.entries(DESC).forEach(([id,txt])=>{const el=$(id);if(!el||!txt)return;const c=el.closest('.ctl');if(!c||c.querySelector('.desc'))return;c.insertAdjacentHTML('beforeend',`<p class="desc">${txt}</p>`);});
{const mn=document.querySelector('details.sub .stack');if(mn)mn.insertAdjacentHTML('afterbegin','<p class="hint" style="margin:0">A minor party can only gain in seats where it stood in 2025, in proportion to its vote there.</p>');}
// light / dark / follow the device: the switch lives in the site bar (chrome.js); redraw so canvas and SVG colours follow
window.addEventListener('themechange',()=>{if(R)render();});
how();
// ---- methods: known weaknesses and a live check against the 2025 result
function check2025(){
  const sR=R, sS=S; let r;
  try{S=JSON.parse(JSON.stringify(BASE));S.mrpW=0;S.trials=600;
    for(let it=0;it<3;it++){r=ENGINE.simulate(D,settings());R=r;const nc=natCentral();P.forEach((_,j)=>{S.d[j]+=(DATA.prim25[j]-nc[j])*100;});}
    r=ENGINE.simulate(D,settings());}
  finally{R=sR;S=sS;}
  const csa=GI('CSA'), act=s=>{let g=s.inc==='IND'?DATA.colG[s.lc]:INC[s.inc];return g===csa?4:g;};
  const miss=D.seats.map((s,i)=>{let w=r.likely[i];if(w===csa)w=4;return {s,w,a:act(s),p:r.prob[i][w]};}).filter(x=>x.w!==x.a);
  return {ok:150-miss.length,miss};}
$('how').insertAdjacentHTML('beforeend',`<h3 class="art">Checked against 2025</h3>
  <p>A forecast is only as good as its counting. This test feeds the model the actual 2025 national first preferences (and nothing from the 2026 seat poll), runs it, and compares each seat's most likely winner with who actually won in 2025. It checks the preference flows and the seat-by-seat count, not the polls.</p>
  <div class="btns"><button type="button" id="chk25">Run the 2025 check</button></div><div id="chk25out" class="status" aria-live="polite"></div>
  <h3 class="art">Known weaknesses</h3>
  <ul>
  <li><b>Polls move together.</b> Each run shares a national polling error across seats, but real polling misses can be bigger and more lopsided than any one run allows (2019 is the reminder).</li>
  <li><b>Preference flows are estimates.</b> They are fitted to 2025 and vary by seat type, but a party's voters can behave very differently when it becomes a contender, as One Nation now is.</li>
  <li><b>New parties have no history.</b> Community Strong and any party standing in new seats start from judgement-based figures, not results.</li>
  <li><b>Candidates matter and are not modelled.</b> Retirements, scandals and star recruits can move a seat by many points.</li>
  <li><b>The Coalition is one vote.</b> Liberal, National, LNP and CLP seats are shown separately, but the model treats the Coalition vote as a single bloc unless you split it.</li>
  <li><b>The Senate is simpler than the real count.</b> It counts parties, not individual candidates, and uses estimated flows. It reproduces all 40 seats won in 2025, but only after a one-point calibration in New South Wales; Lidia Thorpe's and Tammy Tyrrell's starting votes are judgement, as neither was on the 2025 ballot.</li>
  </ul>`);
$('regf').addEventListener('change',e=>{S.regf=+e.target.value;sync();schedule();});
$('chk25').addEventListener('click',()=>{$('chk25out').textContent='Running…';setTimeout(()=>{const c=check2025();
  $('chk25out').innerHTML=`<b>${c.ok} of 150 seats</b> called correctly from the actual 2025 first preferences.`+(c.miss.length?` Missed: `+c.miss.map(x=>`${x.s.n} (model ${P[x.w].n}, actual ${P[x.a].n})`).join(', ')+'.':'');},30);});
// ---- layout: secondary panels live in one tabbed "More from this run" section, about/how in a dropdown
{const TABS=[['Results','h-res'],['Seats to watch','h-watch'],['Path to 76','h-path'],['Who governs','h-gov'],['Seat ranges','h-dist'],['States','h-states'],['Pendulum','h-pend'],['Senate','h-sen'],['Every seat','h-list'],['Polls and data','h-data']];
 const bar=$('deeptabs'), panes=$('deeppanes');
 TABS.forEach(([lab,hid],k)=>{const h=document.getElementById(hid);const box=hid==='h-data'?$('data'):h&&(h.closest('details.drop')||h.closest('section'));if(!box)return;
   const pane=document.createElement('div');pane.className='tabpane';pane.id='pane-'+hid;pane.setAttribute('role','tabpanel');pane.hidden=k>0;
   if(box.tagName==='DETAILS'){box.open=true;box.classList.add('intab');}
   box.classList.add('intabbox');pane.appendChild(box);panes.appendChild(pane);
   const b=document.createElement('button');b.type='button';b.className='tab';b.setAttribute('role','tab');b.textContent=lab;b.dataset.pane=pane.id;b.setAttribute('aria-selected',k===0);bar.appendChild(b);});
 const show=id=>{bar.querySelectorAll('.tab').forEach(b=>{const on=b.dataset.pane===id;b.setAttribute('aria-selected',on);});panes.querySelectorAll('.tabpane').forEach(p=>p.hidden=p.id!==id);
   if(id==='pane-h-states'&&R){statesBuilt=false;states();}};
 bar.addEventListener('click',e=>{const b=e.target.closest('.tab');if(b)show(b.dataset.pane);});
 window.showTab=hid=>{const p=document.getElementById('pane-'+hid);if(p){show(p.id);$('deep').scrollIntoView({behavior:'smooth',block:'start'});return true;}return false;};
 ['how','about'].forEach(id=>{const el=$(id);if(el)$('aboutin').appendChild(el);});
 ['g-ev'].forEach(id=>{const d=$(id);if(d)d.open=false;});}
sync(); go();
// ---- sandbox drawer: open and close, docked beside the page on wide screens
{const sb=$('sandbox'),tab=$('sbxtab'),scrim=$('sbxscrim'),inn=$('sbxin'),mq=matchMedia('(min-width:1500px)');
 if(sb&&tab){
  const set=(o,save)=>{sb.dataset.open=o?'1':'0';tab.setAttribute('aria-expanded',o?'true':'false');tab.querySelector('.sbx-tablabel').textContent=o?'Close':'Sandbox';
    tab.setAttribute('aria-label',o?'Close the sandbox':'Open the sandbox');inn.inert=!o;scrim.hidden=!o||mq.matches;document.body.classList.toggle('sbx-docked',o&&mq.matches);
    if(save)try{localStorage.setItem('sbxOpen',o?'1':'0');}catch(e){}};
  let init=null;try{init=localStorage.getItem('sbxOpen');}catch(e){}
  set(init==null?mq.matches:init==='1',false);
  tab.addEventListener('click',()=>set(sb.dataset.open!=='1',true));
  scrim.addEventListener('click',()=>set(false,true));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sb.dataset.open==='1'&&!mq.matches){set(false,true);tab.focus();}});
  mq.addEventListener('change',()=>set(sb.dataset.open==='1',false));
  document.querySelectorAll('a[href="#h-sand"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();set(true,true);setTimeout(()=>{const h=$('h-sand');if(h)h.focus({preventScroll:true});},300);}));}}

// ---- hooks for campaign mode (assets/js/campaign-*.js): read and swap the sandbox state, project seats quickly, run the full count
window.APP={BASE,D,P,NATI,LP,DATA,phOf,phCred:n=>PHCREDIT[n]||'',col,mapCol,SK,senNames:S2.groups.map(g=>g.n),HEX:HEXGEO,GEO:GEO0,
  getS:()=>S, setS:x=>{S=x;}, getR:()=>R,
  // campaign mode fixes the count's seed, so a daily challenge's election night is the same for everyone
  setSeed:v=>{seed=(v>>>0)||1;},
  // the results-night replay and the news report, borrowed by campaign mode for its own count and final page
  replay:{start(){if(!REPLAY&&R)replayStart(true);},skip(){if(REPLAY)replaySkip();},active:()=>!!REPLAY,done:()=>REPLAY?REPLAY.done:null,lead:()=>REPLAY?REPLAY.lead:null},
  article(){if(REPLAY||!R)return;article();},
  withS(x,fn){const k=S;S=x;try{return fn();}finally{S=k;}},
  ldrCands, sync, go, settings, tpp:()=>tppPair(0,1),
  // the three two-party contests as the sandbox counts them (Labor v Coalition is the swingometer's figure)
  senBefore:S2.before, shareImage:o=>shareImage(o),
  tpps(){if(!R)return null;return {ac:twoPP().a*100,ao:tppPair(0,3)*100,co:tppPair(1,3)*100};},
  // the central (no polling error) result for a sandbox state: winner of each seat, seats by party, national first preferences
  project(x){return this.withS(x,()=>{const ls=settings();const r=ENGINE.simulate(D,{...ls,centralOnly:true});const nat=new Array(NG).fill(0);let W=0;
    D.seats.forEach((s,i)=>{const b=r.base[i];W+=s.fv;b.forEach((v,j)=>nat[DATA.colG[j]]+=v*s.fv);});return {central:r.central,count:r.cenCount,nat:nat.map(v=>v/W),margin:r.margin};});}};
