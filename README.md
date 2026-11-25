# Australia 2028 Election Simulator

A seat-by-seat simulator and political campaign game for the next Australian federal election, hosted at [electionsimulator2028.au](https://electionsimulator2028.au).

Play a full interactive **Campaign Mode** from late 2026 through election night 2028, or open the **Election Simulator** to adjust national and state polls, leaders, events and preference flows across all 150 House of Representatives electorates and the Senate.

The site is built with plain HTML, CSS and vanilla JavaScript — no frontend build step is required to host it.

## Features

### Election Simulator
- **150 House seats & Senate projection**: Seat-level preference counts, demographic and regional swing modelling, Coalition split toggles, and Monte Carlo probability forecasts.
- **Interactive views**: Geographic electorate map, equal-area hex cartogram, House of Representatives chamber diagram, Wikipedia-style election infobox, fictional **XYZ News** coverage, and an animated election-night live count.
- **Customisable scenarios**: Adjust national polls, preference flows, party leaders and major political events on the fly.

### Campaign Mode
- **70 playable leaders**: Play as current MPs, senators, former leaders and party figures across Labor, the Coalition, the Nationals, One Nation, the Greens, Teal Independents and Katter's Australian Party — including **5 unlockable Vault leaders** (Paul Keating, John Howard, Gough Whitlam, Robert Menzies and Bob Katter).
- **Full campaign loop**: 15 opening scenarios, 375+ policy, crisis and milestone cards, leadership spills, by-elections, leaders' debates, doorstop interviews, national spirits, political-power decisions, and hung-parliament kingmaker negotiations on election night.
- **Progression & collection**: 157 honours/achievements, difficulty modes, and a collectible leader-card binder with custom card art.

## Pages

| File | Description |
|---|---|
| `index.html` | Main Election Simulator and Campaign Mode |
| `tier-list.html` | Campaign Mode leader tier list (A to F) based on simulated runs |
| `how-it-works.html` | Methodology behind the seat model and preference engine |
| `data.html` | Published opinion polls, MRP baseline and data sources |
| `about.html` | Project background, data sources and full portrait credits |
| `balance.html` | Unlinked internal dashboard for automated campaign balance runs |
| `404.html` | Custom not-found page |

## Project Structure

### Core Simulator (`assets/js/`)
- `app.js` — Main simulator UI (controls, geographic and hex maps, chamber view, infobox, live count)
- `engine.js` — Election model (two-candidate-preferred counts, Monte Carlo simulation, Senate count)
- `sim-data.js` — 150-seat dataset, polls, events, geographic shapes, hex coordinates and portrait metadata
- `news-text.js` — Dynamic XYZ News election-night headlines, analysis and kingmaker copy
- `traits.js` — Leader traits and modifiers
- `chrome.js` / `front.js` — Shared navigation, footer, theme handling and front-page views

### Campaign Mode (`assets/js/`)
- `campaign-engine.js` — Campaign state machine, turn loop, debates, by-elections, spills, negotiations and headline generation
- `campaign-ui.js` / `campaign-board.js` — Campaign interface, briefing board and election-night flow
- `campaign-data.js` – `campaign-data4.js` — Campaign cards, leader-specific options, scenarios, spirits and milestones
- `campaign-vault.js` — Historical Vault leaders, unique cards and unlock rules
- `campaign-economy.js` — Campaign economy and balance helpers
- `campaign-achievements.js` / `campaign-collection.js` / `card-art.js` — Honours, collectible cards and leader card artwork
- `tierlist-data.js` / `tierlist.js` — Campaign tier list data and rendering

### Styling & Assets
- `assets/css/site.css` — Site-wide light and dark theme styles
- `assets/css/campaign.css` — Campaign Mode and collectible card styles
- `assets/img/` & `public/assets/` — Favicon, chamber artwork, portraits and card assets

## Run Locally

### Using Node.js (recommended)

```bash
npm install
npm start
```

This starts the lightweight Express static server (`server.js`) on `http://localhost:3000`.

### Using any static file server

Because the frontend has no build step, you can also serve the repository root directly:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

### Checks & Tests

```bash
npm run lint
node --test server.test.js assets/js/campaign-economy.test.js
```

## Publish on GitHub Pages

1. Push the repository (including `.github/workflows/pages.yml` and `.nojekyll`) to GitHub.
2. Under **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`. The GitHub Actions workflow publishes the site automatically.
4. To use a custom domain, update `CNAME` and configure it under **Settings → Pages → Custom domain**.

## Notes & Credits

- **Independent simulation**: Not affiliated with any political party, pollster, broadcaster, the Parliament of Australia or the Australian Electoral Commission. **XYZ News** and its reporters are fictional, and every result is a simulation rather than a prediction.
- **Portraits & media**: Official Member and Senator portraits are © Commonwealth of Australia (AUSPIC / Department of Parliamentary Services) under CC BY-NC-ND 4.0, alongside Wikimedia Commons and attributed editorial images. Full per-person credits are listed on `about.html`.
