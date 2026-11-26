[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun · best-national-statistics-site-20261126-0539 · Khamami13/best-national-statistics-site · rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Khamami13/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![make.fun · best-national-statistics-site-20261126-0539 · Khamami13/best-national-statistics-site · reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Khamami13/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Nusantara Numbers — Indonesia in Figures

A national statistics site for **Indonesia**, built for the make.fun bounty
“Make the best national statistics site”. It runs entirely from its own static
files — no build step, no network requests, no external fonts or libraries —
so it works offline in desktop Chrome and on a phone.

## What it covers

Eight sections, each reached from the navigation bar (hash routes):

- **Overview** — eight headline indicators (population, GDP, GDP per capita,
  growth, inflation, unemployment, poverty, life expectancy) plus a population
  trend chart, a GDP-growth chart, key facts and three takeaways.
- **Population** — population 2015–2025 (line or bar chart, switchable),
  age structure, fertility, urban share, density, dependency ratio and a
  year-by-year table.
- **Economy** — nominal GDP and real growth 2018–2025, inflation 2018–2025,
  GDP by sector, GDP per capita and PPP, exports, government debt.
- **Employment** — unemployment vs poverty on one dual-line chart, separate
  poverty and unemployment charts, informal work, underemployment, wages,
  youth unemployment and the poverty line.
- **Health** — life expectancy, infant and under-5 mortality, maternal
  mortality, hospital beds, physicians, health spending, stunting, and a
  hospital-bed comparison with Malaysia, Thailand, the UK and Germany.
- **Education** — literacy, enrolment by level (with a chart showing the
  drop-off after secondary school), years of schooling, education spending.
- **Provinces** — the ten largest provinces as a bar chart and a searchable,
  sortable table of the twenty largest (by population, density or name).
- **Sources** — every source, plus notes on how to read the figures
  (why BPS and the UN differ on population, what “employed” means, and
  which poverty line is used).

Charts are hand-drawn inline SVG from the site's own code (`app/charts.js`);
there are no chart libraries and nothing is fetched from the network.

## Data sources

Every figure carries its source and reference year on the page. The primary
sources are **BPS — Statistics Indonesia** (bps.go.id: population, GDP, CPI
inflation, Sakernas labour-force survey, poverty) and the **World Bank World
Development Indicators** (data.worldbank.org: GDP in US$, life expectancy,
mortality, enrolment, health spending), with the WHO Global Health Observatory
(hospital beds, physicians), BPS SUPAS 2025, the Ministry of Finance, the
Ministry of Health (SSGI 2024) and UN World Population Prospects 2024 for the
rest. Where sources disagree, the site uses BPS and says so — see the
Sources page. Figures were checked against published releases in November 2026.

Headline figures: population 284.4 million (BPS mid-year projection, 2025);
GDP US$1.40 trillion, US$4,925 per capita (World Bank, 2024); real growth
5.03% (BPS, 2024); inflation 1.57% (BPS, 2024); open unemployment 4.76%
(BPS Sakernas, Feb 2025); poverty 8.47% (BPS, March 2025); life expectancy
71.3 years (World Bank, 2024).

## How to run it

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or serve `app/` with any static file server and open `index.html`.
No installation and no network access are needed.

## Layout

- `app/index.html` — page shell, header, navigation, footer
- `app/style.css` — all styling (system fonts only)
- `app/data.js` — every figure, with source and year
- `app/charts.js` — hand-rolled SVG line, bar and horizontal-bar charts
- `app/views.js` — HTML for each of the eight pages
- `app/main.js` — hash router, live province filter, print button
- `screenshots/` — four real renders of the site (desktop overview,
  desktop economy, desktop employment, phone overview)
- `main.ts` — copies `app/` and `screenshots/` to `/output` and writes
  `dossier.json` with the vendored make.fun library

## License

MIT — see `LICENSE`.
