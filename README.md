# Australia 2028 Election Simulator

A seat-by-seat simulator of the next Australian federal election. Change the polls, leaders, events and preference flows, then watch the count come in on results night.

It is a static website: plain HTML, CSS and JavaScript, with no server and no build step needed to host it.

## Pages

| File | What it is |
|---|---|
| `index.html` | The simulator |
| `how-it-works.html` | How the model works |
| `data.html` | Opinion polls and data sources |
| `about.html` | About the project and credits |
| `404.html` | Not-found page |

## Files

- `assets/js/app.js`: the page logic (controls, map, chamber, infobox, XYZ News report, live count)
- `assets/js/engine.js`: the election engine (preference counts, Monte Carlo simulation, Senate count)
- `assets/js/sim-data.js`: seat data, polls, events, map shapes and the hex map
- `assets/css/site.css`: all styling, light and dark
- `assets/img/`: favicon and the illustrated chamber

## Publish on GitHub Pages

1. Create a new repository on GitHub and upload the contents of this folder (keep the `.github` folder and `.nojekyll`).
2. In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow in `.github/workflows/pages.yml` publishes the site, and the address appears in the Actions run and under Settings → Pages (usually `https://<your-username>.github.io/<repository-name>/`).

To use your own domain, add it under Settings → Pages → Custom domain.

## Run it locally

Any static server works, for example:

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Notes

- No photographs of real people are used: leaders and MPs are shown with placeholder portraits.
- XYZ News and its reporters are fictional. Every result is a simulation, not a prediction.
