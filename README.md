[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Mulyana01/indonesia-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Mulyana01/indonesia-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# NusaStat — Indonesia in Numbers

A national statistics site for **Indonesia**, built for the make.fun bounty
*"Make the best national statistics site"* (slug
`best-national-statistics-site-20261126-0539`).

NusaStat is an original, independent reading room for Indonesia's official
statistics. Every figure is republished from its official release — BPS,
Statistics Indonesia — with its source and year beside it. Nothing is
estimated by the site itself.

## What is inside

- **Overview** — the country at a glance: 281.6 million people (mid-2024),
  eight headline indicators, the population curve since 1971, the five
  largest provinces and the industries behind GDP.
- **Population** — censuses and estimates 1971–2024, the age balance
  (24.5% under 15, 68.6% working age, 6.9% over 65), demography facts and
  the ten largest provinces.
- **Economy** — annual growth 2015–2024 with a toggle to nominal GDP,
  GDP by industry, inflation 2015–2024, and the 2024 trade balance
  (exports US$264.7 B, imports US$233.7 B, surplus US$31.0 B).
- **Wellbeing** — poverty (8.57% in September 2024, the lowest recorded
  share), unemployment, the Human Development Index (75.02), life
  expectancy, literacy and schooling.
- **Provinces** — all 38 provinces with capitals and mid-2024 populations,
  in a table you can search, filter by island group and sort.
- **Sources & method** — every dataset named with its survey or account,
  its publisher and its year, plus how to read census, survey and national
  accounts figures.

## Running it

The site is plain static files under `app/` — no build step, no network
request. Serve it with the included development server (Node 22.18+):

```sh
node serve.ts            # then open http://localhost:8080
```

or serve `app/` with any static file server.

## Handing it in

`main.ts` (Node 22, standard library only) copies `app/` and
`screenshots/` to the output directory and writes `dossier.json` with the
vendored make.fun library in `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`screenshots/` holds four real renders of the site taken in Chromium —
overview, economy and provinces at 1280×800, and the overview at a phone
size of 390×844 (`shots.json` lists them).

## Layout

- `main.ts` — the hand-in program described above
- `serve.ts` — a tiny local static server for development
- `app/index.html` — the page shell, masthead and navigation
- `app/data.js` — every dataset, each with its source and year
- `app/charts.js` — hand-rolled SVG line, bar, horizontal-bar and donut charts
- `app/views.js` — one render function per page
- `app/main.js` — the hash router
- `app/style.css` — the whole design system
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `screenshots/` — the four screenshots

## License

MIT — see `LICENSE`.
