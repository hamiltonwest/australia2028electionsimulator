# Duplicate Dust, Card Crafting, Foil Upgrades & Five Craft-Only Vault Legends

Turn duplicate pack pulls, campaign completions, and honours into **Card Dust** so players can directly craft missing leaders, forge **five rare craft-only Vault Legend characters** (bringing the album to 70 leaders), and upgrade favourite cards with **Platinum Brushed Chrome** and **Parliament Prism** foil finishes—all 100% static and browser-local.

> [!IMPORTANT]
> **Confirmed Decisions & Revisions**
> - **Confirmed Feature Focus**: Duplicate dust economy, direct card crafting, two-tier cosmetic foil upgrades, and a deep single-feature polish.
> - **Confirmed Five Craft-Only Vault Legends (No. 066–070)**:
>   - **No. 066 · Paul Keating** (*Labor*)
>   - **No. 067 · John Howard** (*Coalition*)
>   - **No. 068 · Gough Whitlam** (*Labor*)
>   - **No. 069 · Robert Menzies** (*Coalition*)
>   - **No. 070 · Bob Katter** (*Katter's Australian Party — own `KAP` party banner & tailored scenario, with a very difficult **Majority Government (76+ seats)** goal*)
> - **Confirmed Tier-1 Foil Finish**: **Platinum Brushed Chrome Foil** (cool satin-platinum brushed steel sheen, completely distinct from Regular Gold `B` rarity cards), stepping up to **Parliament Prism Foil** at Tier 2.
> - **Confirmed Hosting Posture**: 100% static and browser-local (`localStorage` + `ES28-PROFILE-1:` transfer codes), zero backend dependencies.

---

## 1. Overview & Core Concept

- **What It Does**: Introduces a complete card-collector economy and mythic Vault roster woven natively across Pack Opening, the Collection Binder, the Collector Dossier, Choose Your Leader, the Head-to-Head Comparator, and Campaign Mode:
  1. **Duplicate Dust & Gameplay Earnings**: Duplicate cards pulled from 3-card leader packs convert automatically into **Card Dust** scaled by rarity, paired with a flat pack-seal bonus, Campaign completion payouts, and Honour unlock rewards.
  2. **Direct Card Crafting**: Spend Dust inside any locked leader's Binder Dossier to craft missing Series One leaders directly (eliminating pure RNG frustration when chasing a full collection).
  3. **Five Craft-Only Vault Legends (No. 066–070)**: Four historic Prime Ministers (two Labor, two Coalition) plus **Bob Katter** under his own **Katter's Australian Party (`KAP`)** banner—excluded from regular pack pools and obtainable exclusively via crafting—each with custom archival editorial card art, authentic campaign mechanics, sandbox demographic traits, bespoke event cards, signature & cursed milestone answers, and dedicated Honours.
  4. **Two-Tier Foil Upgrades**: Upgrade any collected card from **Standard** → **Platinum Brushed Chrome** → **Parliament Prism**, applying unmistakable optical finishes everywhere that card appears.
- **Target Audience / Persona**: Players of the Australia 2028 Election Simulator who enjoy building a complete leader collection, experimenting with iconic historic and maverick figures, and taking on extreme replay challenges like leading KAP to a majority government.
- **Key Value**: Makes every duplicate pack pull and completed run feel rewarding, introduces five unforgettable chase leaders (including the simulator's ultimate hard-mode challenge in Bob Katter's `KAP` majority bid), and lets collectors customise their favourite cards.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Tearing a Pack & Earning Dust**:
   - Tear open a 3-card pack and tap each card to reveal it one by one (preserving the flicker-free two-half flip).
   - Opening a pack grants a **+20 Dust** seal bonus; every **Duplicate** card displays a gold-ink **`DUPLICATE · +XX DUST`** badge above the card on reveal, and the summary tallies total Dust earned with a direct shortcut to the Collection Binder.
   - Earned packs remain openable even after all 65 standard pack leaders are owned, converting cleanly into Dust packs for forging the 5 Vault Legends and Foil Upgrades.
2. **Browsing Vault Legends & Crafting in the Binder**:
   - The Collection Binder header displays the live **Card Dust balance** (in `tabular-nums` monospace beside `X/70` album completion and upgraded foil count), adds a **Vault Legends (0/5)** filter segment and a **Foils** filter segment, and features a curated **Craft-Only Vault** shelf showcasing cards `066`–`070`.
   - Clicking any locked Series One leader or Vault Legend opens its **Collector Dossier**, displaying the card preview, exact Dust cost, current balance, and a primary **`Craft for XXX Dust`** button (or exact Dust shortfall when unaffordable).
   - Crafting deducts Dust, records provenance (`Crafted · <date>`), plays a celebratory chime, unlocks the card immediately for Campaign Mode, and refreshes the Dossier to expose **Play campaign** and **Card Finish** upgrades.
3. **Upgrading Card Foils (Standard → Platinum Chrome → Parliament Prism)**:
   - Inside any owned leader's Dossier, a **Card Finish** panel lets players inspect and unlock:
     - **Platinum Brushed Chrome** (*120 Dust*): Cool machined-platinum brushed steel frame with fine diagonal anisotropic metal lines, icy-chrome tilt gleam, crisp silver-steel inner hairline trim, and an engraved `PLATINUM FOIL` footer stamp—visually polar opposite to warm Regular Gold (`B`).
     - **Parliament Prism** (*260 Dust* after Platinum, or *350 Dust* direct from Standard): Full museum-grade pearlescent refraction border, smooth tilt-reactive spectrum sheen, and an iridescent `PRISM EDITION` footer crest.
   - Foil finishes render consistently across Choose Your Leader, the Collection Binder grid & dossier, and the Head-to-Head Comparator.
4. **Playing Katter's Australian Party (`KAP`) — The Ultimate Majority Challenge**:
   - Bob Katter appears under his own **Katter's Australian Party (`KAP`)** banner tab in Choose Your Leader (and in the Binder party breakdown & Comparator) styled in KAP's signature deep outback maroon/ochre accent.
   - Starting straight into the campaign as sitting MP for **Kennedy** (holding just 1 seat in a 150-seat House), Katter launches an audacious nationwide insurgency with a bespoke **KAP event deck** (*The Bradfield Scheme*, *Supermarket Duopoly Bust*, *North Queensland Crocodile & Bush Media Blitz*, *Ethanol & Fuel Security*, *National Candidate Rollout*, *Tariffs & Manufacturing*) and KAP-specific Political Power decisions.
   - His **Tier I victory condition is Majority Government (76+ seats)**—deliberately calibrated to be **very difficult**, requiring relentless momentum, regional/outer-suburban breakouts, sharp Political Power timing, and avoiding press-gallery blowups.

### Visual Identity & Theme

- **Aesthetic Direction**: Archival Australian broadsheet & museum curatorial catalogue, preserving full Light (warm archival paper) and Dark (deep charcoal) theme parity across all new panels and controls.
- **Color Palette & Distinction**:
  - Uses existing semantic surface tokens (`--bg`, `--panel`, `--ink`, `--muted`, `--line`, `--soft`, `--accent`) plus a dedicated **`--kap`** outback maroon token (`#8b2635` light / `#d46272` dark) distinct from Labor red (`--alp`), Coalition blue (`--coa`), One Nation orange (`--on`), Greens (`--grn`), and Independents (`--ind`).
  - **Vault Legend Mythic Frame**: Archival obsidian-charcoal border inlaid with burnished antique brass double-hairline framing (`VAULT LEGEND` diamond colophon)—clearly set apart from Series One rarities.
  - **Platinum Brushed Chrome Foil**: Cool brushed liquid-platinum metallic gradient (`#cfd6de` → `#f7fafc` → `#8a95a3` → `#eef3f8` → `#646e7a`) with fine diagonal brushed-metal micro-striation and icy specular tilt reflection—zero warm yellow tones, so it never resembles Regular Gold (`B`).
  - **Parliament Prism Foil**: Controlled pearlescent holographic refraction band with smooth tilt-responsive spectrum shimmer.
- **Typography & Spatial Discipline**:
  - Preserves `Fraunces` (display), `Source Serif 4` / `Source Sans 3` (prose), and `IBM Plex Mono` (`tabular-nums` for Dust balances, costs, and accession numbers `001/070`–`070/070`).
  - Clean unboxed metadata separated by `·` (zero static pill clusters), crisp `1px` hairline dividers, and touch targets `>= 40px`.
- **Bespoke Archival Editorial Portraits**:
  - Generate five bespoke **4:3 archival editorial portraits** (warm broadsheet lithograph / studio editorial portrait style) for Keating, Howard, Whitlam, Menzies, and Katter in a single parallel batch, stored as local static assets with styled monogram fallbacks so nothing ever breaks offline or on GitHub Pages.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: The Five Craft-Only Vault Legends Roster & Balance**
  - *Chosen Approach*:
    1. **No. 066 · Paul Keating** (*Labor · Blaxland by-election + spill*) — Debate skill `3` (highest in the game), economy & tax powerhouses, high caucus-unity volatility (`"The Placido Domingo of Politics"`).
    2. **No. 067 · John Howard** (*Coalition · Bennelong by-election + spill*) — High starting caucus unity & discipline, outer-suburban & retiree battler resilience, inner-city progressive headwind (`"The Battlers' Prime Minister"`).
    3. **No. 068 · Gough Whitlam** (*Labor · Werriwa by-election + spill*) — Reform-wave momentum amplifier & strong metro/provincial surge, sharp inflation/costings & Senate-supply setback multipliers (`"It's Time Again"`).
    4. **No. 069 · Robert Menzies** (*Coalition · Kooyong by-election + spill*) — Debate skill `2`, strong caucus stability & middle-Australia resilience, youth & modern social-issue headwinds (`"The Forgotten People"`).
    5. **No. 070 · Bob Katter** (*Katter's Australian Party · `KAP` · Sitting MP for Kennedy, straight to campaign*) — Own `KAP` banner and dedicated regional-populist national campaign deck; huge Queensland & rural swing levers, extreme press-gallery & metro volatility, **Majority Government (76+ seats)** victory goal calibrated as the hardest run in the simulator (`"The Hat from Kennedy"`).
  - *Why*: Pairs two iconic Labor PMs and two iconic Coalition PMs with the ultimate cult-favourite maverick endgame challenge in Bob Katter's `KAP` majority bid.
  - *Alternatives Considered*: Keeping Katter inside the Teal Independents (`IND`) bucket was rejected because Katter's rural-populist platform and majority-government ambition clash with the inner-city teal deck and crossbench win thresholds.

- **Decision 2: Foil Upgrade Hierarchy & Visual Clarity**
  - *Chosen Approach*: **Platinum Brushed Chrome** (Tier 1, `120 Dust`) → **Parliament Prism** (Tier 2, `260 Dust` upgrade or `350 Dust` direct).
  - *Why*: Cool machined platinum-chrome contrasts immediately against both warm Regular Gold (`B`) and standard Silver (`C`, which lacks brushed-steel micro-striation, metallic tilt gleam, and the engraved `PLATINUM FOIL` finish overlay across the whole card stock).

- **Decision 3: Economy Pacing & Backward-Compatible Local Storage**
  - *Chosen Approach*: Auto-convert duplicate pack pulls (`Common +25`, `Bronze +40`, `Silver +60`, `Gold +100`, `Holo Rare +180`), `+20 Dust` pack-seal bonus, `+30/+50 Dust` per finished campaign, and `+15 Dust` per Honour (with a one-time retroactive credit for existing Honours and finished runs). Crafting costs: `Common 80`, `Bronze 120`, `Silver 180`, `Gold 280`, `Holo Rare 420`, **Vault Legend 500** (`Bob Katter` priced at **500 Dust** alongside the other Vault Legends). Persist `dust`, `foil`, `crafted`, and `dustCredited` inside the existing local card store and `ES28-PROFILE-1:` transfer codec, plus a `DustVault` cheat code (`+1,500 Dust`) alongside `PackRippers`, `CheatMachine`, and `ResetProfile`.
  - *Why*: Existing players immediately get a fair Dust starting balance without losing any saved runs, honours, or profile codes.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```text
┌───────────────────────────────────────────────────────────────────────────┐
│                  Browser Local Storage & Profile Codec                    │
│  es2028_campaign_cards_v1: { owned, opened, dust, foil, crafted, credit } │
│  + ES28-PROFILE-1: merge (max dust, max foil tier, union owned/crafted)   │
└────────────────────────────────┬──────────────────────────────────────────┘
                                 │ reads / mutates via unified economy helpers
        ┌────────────────────────┼─────────────────────────┐
        ▼                        ▼                         ▼
┌────────────────────┐  ┌───────────────────────┐  ┌────────────────────────┐
│ Vault Legends &    │  │ Pack, Run & KAP       │  │ Collection Binder &    │
│ KAP Scenario Data  │  │ Engine Integration    │  │ Dossier Workshop       │
│                    │  │                       │  │                        │
│ • 5 Craft-Only     │  │ • KAP party group     │  │ • Dust Ledger & KPIs   │
│   Legends (66-70)  │  │   wired in engine     │  │ • Craft-Only Vault     │
│ • KAP party banner,│  │   with nationwide     │  │   Shelf (066-070)      │
│   76-seat majority │  │   hard-mode run       │  │ • Vault & Foil Filters │
│   goal & event deck│  │ • Pack pool excludes  │  │ • Direct Craft Action  │
│ • Traits, Art,     │  │   craftOnly leaders   │  │ • Foil Studio:         │
│   Tier Benchmarks, │  │ • Duplicate -> Dust   │  │   Standard / Platinum  │
│   & 5 New Honours  │  │   payout + run/honour │  │   Chrome / Prism       │
└─────────┬──────────┘  └──────────┬────────────┘  └───────────┬────────────┘
          │                        │                           │
          └────────────────────────┼───────────────────────────┘
                                   ▼
┌───────────────────────────────────────────────────────────────────────────┐
│                Unified Trading Card Renderer (buildTCard)                 │
│  Renders Mythic Vault frames, Platinum Brushed Chrome & Parliament Prism  │
│  foil layers across: Choose Leader · Binder · Pack Reveal · Comparator    │
└───────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State

- **KAP Party Integration**:
  - Registers `KAP` inside `CAMPAIGN_DATA.PARTIES` with its own maroon accent, `tiers.KAP` anchored on **Majority Government (`>= 76` seats)** as Tier I, and hooks `keyOf` / `seatsBy` / `buildS` / `election` in the campaign engine to track the existing `KAP` group cleanly across all 150 seats (enabling a nationwide KAP field during Katter's campaign while preserving standard 1-seat Kennedy behaviour for every other leader).
  - Starter leader unlocking excludes `craftOnly` leaders so `KAP` stays locked until Bob Katter is crafted with Dust.
- **Collection Economy State**:
  - `owned`: `{ [leaderId]: timestamp }`
  - `crafted`: `{ [leaderId]: timestamp }`
  - `foil`: `{ [leaderId]: 1 | 2 }` (`1` = Platinum Brushed Chrome, `2` = Parliament Prism)
  - `dust`: non-negative integer balance
  - `dustCredited`: `{ retro: boolean, runs: number, achs: number }`

### Interactive Component & State Mapping

- **Pack Opening**: Excludes `craftOnly` leaders from standard pack pools, awards `+20` pack-seal Dust plus rarity-scaled Dust on every duplicate pull, renders **`DUPLICATE · +XX DUST`** on duplicate cards during reveal, and shows total Dust earned in the completion strip.
- **Binder Workshop & Dossier**:
  - Filter bar supports `All`, `Collected`, `Missing`, `Played`, `Vault Legends`, and `Foils`, plus the party breakdown (now including `Katter's Australian Party`).
  - Locked Dossier view validates `dust >= cost`, deducts Dust, records `owned` + `crafted`, plays confirmation SFX, and refreshes straight into the unlocked Dossier with Play + Foil controls.
  - Owned Dossier view renders the **Card Finish** selector (`Standard`, `Platinum Brushed Chrome`, `Parliament Prism`), deducts Dust on upgrade, updates `foil[id]`, and immediately applies the upgraded finish to the live 3D trading card and every other view.
- **Cross-View Consistency**: `buildTCard` applies `.r-V` (Vault Legend frame), `.foil-1` (Platinum Brushed Chrome), and `.foil-2` (Parliament Prism) uniformly across Choose Your Leader, Pack Reveal, Collection Binder, Collector Dossier, and the Head-to-Head Comparator.
