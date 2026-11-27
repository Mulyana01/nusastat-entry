// NusaStat views: one render function per page, each returning the page's
// HTML, plus a mount function that draws its charts and wires its controls
// after the HTML is in the document. Pages are reached from the top
// navigation by hash links, so every section of the site is one click away.

import {
  HEADLINE, KPI_CARDS, POPULATION_SERIES, AGE_STRUCTURE, DEMOGRAPHY_FACTS,
  GROWTH_SERIES, GDP_SERIES, GDP_SECTORS, TRADE, INFLATION_SERIES,
  POVERTY_SERIES, UNEMPLOYMENT_SERIES, WELLBEING_FACTS, PROVINCES, SOURCE_NOTES,
} from './data.js';
import { lineChart, barChart, hBarChart, donutChart, legend } from './charts.js';

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function kpiCards() {
  return `<div class="kpi-grid">${KPI_CARDS.map((k) => `
    <article class="kpi-card">
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-note">${k.note}</p>
      <p class="kpi-source">${k.source}</p>
    </article>`).join('')}
  </div>`;
}

function factList(facts) {
  return `<dl class="fact-list">${facts.map((f) => `
    <div class="fact"><dt>${f.label}</dt><dd>${f.value}</dd><p>${f.source}</p></div>`).join('')}
  </dl>`;
}

const pct1 = (v) => `${v.toFixed(1)}%`;
const pct2 = (v) => `${v.toFixed(2)}%`;
const millions = (v) => `${v.toFixed(1)}`;
const rpT = (v) => `${(v / 1000).toFixed(1)}k`;

function overviewView() {
  return {
    title: 'Overview',
    html: `
    <section class="hero">
      <p class="hero-kicker">The Republic of Indonesia · National statistics</p>
      <h1>Indonesia in numbers</h1>
      <p class="hero-lede">One country of <strong>17,001 islands</strong> and <strong>38 provinces</strong>,
      told through its official statistics: how many people live here, how the economy is doing,
      and how lives are changing — every figure with its source and year.</p>
      <div class="hero-figure">
        <span class="hero-number">281.6 million</span>
        <span class="hero-caption">people called Indonesia home at mid-2024 — the world’s fourth-largest population. Source: BPS — Statistics Indonesia, 2024.</span>
      </div>
    </section>
    ${kpiCards()}
    <section class="card">
      <div class="card-head"><h2>A population that keeps growing</h2><a class="more" href="#/population">Population in full →</a></div>
      <div id="ov-pop"></div>
      ${sourceLine('BPS population censuses 1971–2020 and mid-year estimates')}
    </section>
    <section class="two-col">
      <article class="card">
        <div class="card-head"><h2>Biggest provinces</h2><a class="more" href="#/provinces">All 38 →</a></div>
        <div id="ov-prov"></div>
        ${sourceLine('BPS mid-2024 estimates, million people')}
      </article>
      <article class="card">
        <div class="card-head"><h2>What the economy runs on</h2><a class="more" href="#/economy">Economy in full →</a></div>
        <div class="donut-wrap"><div id="ov-donut"></div><div id="ov-donut-legend"></div></div>
        ${sourceLine('BPS, share of GDP, 2024')}
      </article>
    </section>
    <section class="card links-card">
      <h2>Explore the numbers</h2>
      <div class="link-tiles">
        <a href="#/population"><strong>Population</strong><span>281.6 million people, where they live, and how the age balance is shifting.</span></a>
        <a href="#/economy"><strong>Economy</strong><span>Growth of 5.03%, the industries behind GDP, prices and trade.</span></a>
        <a href="#/wellbeing"><strong>Wellbeing</strong><span>Poverty down to 8.57%, jobs, health and education.</span></a>
        <a href="#/provinces"><strong>Provinces</strong><span>All 38 provinces with capitals and populations — search and sort the table.</span></a>
      </div>
    </section>`,
    mount() {
      document.getElementById('ov-pop').innerHTML =
        lineChart(POPULATION_SERIES.points, { format: millions, unit: ' M people' });
      const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 5)
        .map((p) => ({ label: p.name, value: p.population }));
      document.getElementById('ov-prov').innerHTML =
        hBarChart(top, { format: millions, unit: ' M' });
      document.getElementById('ov-donut').innerHTML =
        donutChart(GDP_SECTORS.parts, { centerTop: 'GDP', centerBottom: 'by industry' });
      document.getElementById('ov-donut-legend').innerHTML = legend(GDP_SECTORS.parts.slice(0, 5));
    },
  };
}

function populationView() {
  return {
    title: 'Population',
    html: `
    <section class="page-head">
      <h1>Population</h1>
      <p>Indonesia counted 119 million people in 1971 and 281.6 million in 2024. Growth has slowed
      to 0.82% a year, the median age has reached about 30, and nearly seven in ten Indonesians are
      of working age — the “demographic bonus” the country is living through now.</p>
    </section>
    <section class="card">
      <div class="card-head"><h2>Population, 1971–2024</h2></div>
      <div id="pop-line"></div>
      ${sourceLine('BPS population censuses 1971–2020 and mid-year estimates, million people')}
    </section>
    <section class="two-col">
      <article class="card">
        <div class="card-head"><h2>Who is how old?</h2></div>
        <div class="donut-wrap"><div id="pop-donut"></div><div id="pop-donut-legend"></div></div>
        ${sourceLine('BPS, share of population by age group, 2024')}
      </article>
      <article class="card">
        <div class="card-head"><h2>The ten largest provinces</h2></div>
        <div id="pop-top10"></div>
        ${sourceLine('BPS mid-2024 estimates, million people')}
      </article>
    </section>
    <section class="card">
      <div class="card-head"><h2>Demography at a glance</h2><a class="more" href="#/provinces">Province table →</a></div>
      ${factList(DEMOGRAPHY_FACTS)}
      <p class="note">Java holds about 56% of the population on 7% of the land: West Java alone,
      at 49.9 million, has more people than Spain. The four Papuan provinces together hold fewer
      people than the city of Bandung’s wider metro area — which is why this site always shows
      provinces beside the national totals.</p>
    </section>`,
    mount() {
      document.getElementById('pop-line').innerHTML =
        lineChart(POPULATION_SERIES.points, { format: millions, unit: ' M people' });
      document.getElementById('pop-donut').innerHTML =
        donutChart(AGE_STRUCTURE.parts, { centerTop: '281.6 M', centerBottom: 'people, 2024' });
      document.getElementById('pop-donut-legend').innerHTML = legend(AGE_STRUCTURE.parts);
      const top = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 10)
        .map((p) => ({ label: p.name, value: p.population }));
      document.getElementById('pop-top10').innerHTML =
        hBarChart(top, { format: millions, unit: ' M', color: '#0e7c6b' });
    },
  };
}

let economyMode = 'growth';

function economyView() {
  return {
    title: 'Economy',
    html: `
    <section class="page-head">
      <h1>Economy</h1>
      <p>South-East Asia’s largest economy grew 5.03% in 2024, its third straight year above 5%
      after the pandemic contraction of 2020. Inflation, at 1.57% in December 2024, is the lowest
      in the ten-year window below — and exports still earn more than imports cost.</p>
    </section>
    <section class="card">
      <div class="card-head">
        <h2 id="eco-chart-title">Annual growth, 2015–2024</h2>
        <div class="toggle" role="group" aria-label="Choose chart">
          <button type="button" id="eco-btn-growth" class="toggle-btn active">Growth %</button>
          <button type="button" id="eco-btn-gdp" class="toggle-btn">GDP size</button>
        </div>
      </div>
      <div id="eco-chart"></div>
      <p class="source" id="eco-source">Source: BPS, national accounts, percent year on year</p>
    </section>
    <section class="two-col">
      <article class="card">
        <div class="card-head"><h2>Where GDP comes from</h2></div>
        <div class="donut-wrap"><div id="eco-donut"></div><div id="eco-donut-legend"></div></div>
        ${sourceLine('BPS, share of GDP by industry, 2024')}
      </article>
      <article class="card">
        <div class="card-head"><h2>Prices and trade</h2></div>
        <div id="eco-infl"></div>
        ${sourceLine('BPS, consumer price inflation, December year on year')}
        <div class="trade-grid">
          <div><p class="trade-num">US$264.7 B</p><p class="trade-label">Exports, 2024</p></div>
          <div><p class="trade-num">US$233.7 B</p><p class="trade-label">Imports, 2024</p></div>
          <div><p class="trade-num">+US$31.0 B</p><p class="trade-label">Trade surplus, 2024</p></div>
        </div>
        <p class="note">Biggest export earners: ${TRADE.topExports.join(', ').toLowerCase()}.</p>
      </article>
    </section>`,
    mount() {
      const draw = () => {
        const chartEl = document.getElementById('eco-chart');
        const titleEl = document.getElementById('eco-chart-title');
        const srcEl = document.getElementById('eco-source');
        document.getElementById('eco-btn-growth').classList.toggle('active', economyMode === 'growth');
        document.getElementById('eco-btn-gdp').classList.toggle('active', economyMode === 'gdp');
        if (economyMode === 'growth') {
          chartEl.innerHTML = barChart(GROWTH_SERIES.points, { format: pct2, unit: '%' });
          titleEl.textContent = 'Annual growth, 2015–2024';
          srcEl.textContent = 'Source: BPS, national accounts, percent year on year';
        } else {
          chartEl.innerHTML = barChart(GDP_SERIES.points, { format: rpT, unit: ' trillion rupiah', color: '#b3271e' });
          titleEl.textContent = 'Nominal GDP, 2015–2024 (trillion rupiah)';
          srcEl.textContent = 'Source: BPS, national accounts, current market prices';
        }
      };
      document.getElementById('eco-btn-growth').addEventListener('click', () => { economyMode = 'growth'; draw(); });
      document.getElementById('eco-btn-gdp').addEventListener('click', () => { economyMode = 'gdp'; draw(); });
      draw();
      document.getElementById('eco-donut').innerHTML =
        donutChart(GDP_SECTORS.parts, { centerTop: 'Rp 22,139 T', centerBottom: 'GDP, 2024' });
      document.getElementById('eco-donut-legend').innerHTML = legend(GDP_SECTORS.parts);
      document.getElementById('eco-infl').innerHTML =
        lineChart(INFLATION_SERIES.points, { format: pct2, unit: '%', color: '#d97706' });
    },
  };
}

function wellbeingView() {
  return {
    title: 'Wellbeing',
    html: `
    <section class="page-head">
      <h1>Wellbeing</h1>
      <p>The long trend is kind: poverty has fallen almost every year for a decade, unemployment is
      back below its pre-pandemic level, and the Human Development Index — health, schooling and
      living standards in one number — reached 75.02 in 2024, its highest ever.</p>
    </section>
    <section class="card">
      <div class="card-head"><h2>Poverty rate, 2015–2024</h2></div>
      <div id="well-poverty"></div>
      ${sourceLine('BPS, National Socioeconomic Survey (Susenas), September rounds, percent of population')}
      <p class="note">The pandemic pushed the rate back up to 10.19% in 2020; by September 2024 it
      had fallen to 8.57% — 24.06 million people, the lowest share in the country’s recorded history.</p>
    </section>
    <section class="card">
      <div class="card-head"><h2>Open unemployment, 2015–2024</h2></div>
      <div id="well-jobs"></div>
      ${sourceLine('BPS, National Labour Force Survey (Sakernas), August rounds, percent of the labour force')}
    </section>
    <section class="card">
      <div class="card-head"><h2>Health, schooling and work at a glance</h2></div>
      ${factList(WELLBEING_FACTS)}
    </section>`,
    mount() {
      document.getElementById('well-poverty').innerHTML =
        lineChart(POVERTY_SERIES.points, { format: pct2, unit: '%', color: '#0e7c6b' });
      document.getElementById('well-jobs').innerHTML =
        lineChart(UNEMPLOYMENT_SERIES.points, { format: pct2, unit: '%', color: '#6b5ca5' });
    },
  };
}

const provinceState = { query: '', region: 'All regions', sortKey: 'population', sortDir: -1 };

function provinceRows() {
  const total = HEADLINE.populationMillions;
  const rows = PROVINCES
    .filter((p) => (provinceState.region === 'All regions' || p.region === provinceState.region) &&
      (p.name.toLowerCase().includes(provinceState.query) || p.capital.toLowerCase().includes(provinceState.query)))
    .sort((a, b) => {
      const k = provinceState.sortKey;
      const cmp = k === 'population' ? a.population - b.population : String(a[k]).localeCompare(String(b[k]));
      return cmp * provinceState.sortDir;
    });
  return rows.map((p, i) => `<tr>
      <td class="num">${i + 1}</td><td><strong>${p.name}</strong></td><td>${p.capital}</td>
      <td>${p.region}</td><td class="num">${p.population.toFixed(2)}</td>
      <td class="num">${((p.population / total) * 100).toFixed(1)}%</td></tr>`).join('') ||
    `<tr><td colspan="6" class="empty">No province matches that search.</td></tr>`;
}

function provincesView() {
  const regions = ['All regions', ...new Set(PROVINCES.map((p) => p.region))];
  return {
    title: 'Provinces',
    html: `
    <section class="page-head">
      <h1>38 provinces</h1>
      <p>Every province of Indonesia with its capital and mid-2024 population. Search by province
      or capital, filter by island group, or sort by any column — the three most populous provinces
      are all on Java, and together hold more people than the other 35 combined.</p>
    </section>
    <section class="card">
      <div class="controls">
        <label>Search <input type="search" id="prov-search" placeholder="e.g. Java, Makassar, Papua"></label>
        <label>Island group
          <select id="prov-region">${regions.map((r) => `<option>${r}</option>`).join('')}</select>
        </label>
        <div class="toggle" role="group" aria-label="Sort table">
          <button type="button" id="sort-pop" class="toggle-btn active">Sort: population</button>
          <button type="button" id="sort-name" class="toggle-btn">Sort: name</button>
        </div>
      </div>
      <div class="table-wrap">
        <table class="prov-table">
          <thead><tr><th>#</th><th>Province</th><th>Capital</th><th>Island group</th>
          <th class="num">Population (M)</th><th class="num">Share</th></tr></thead>
          <tbody id="prov-body"></tbody>
        </table>
      </div>
      <p class="source">Source: BPS — Statistics Indonesia, mid-2024 provincial estimates.
      Shares are of the national total of 281.6 million; rounded components may not sum exactly.</p>
      <p class="note" id="prov-count"></p>
    </section>`,
    mount() {
      const body = document.getElementById('prov-body');
      const count = document.getElementById('prov-count');
      const draw = () => {
        body.innerHTML = provinceRows();
        const shown = body.querySelectorAll('tr').length;
        const sum = PROVINCES.filter((p) =>
          (provinceState.region === 'All regions' || p.region === provinceState.region) &&
          (p.name.toLowerCase().includes(provinceState.query) || p.capital.toLowerCase().includes(provinceState.query)))
          .reduce((s, p) => s + p.population, 0);
        count.textContent = provinceState.query || provinceState.region !== 'All regions'
          ? `Showing ${shown} provinces, together ${sum.toFixed(1)} million people.`
          : `All 38 provinces shown, together about 281.6 million people.`;
        document.getElementById('sort-pop').classList.toggle('active', provinceState.sortKey === 'population');
        document.getElementById('sort-name').classList.toggle('active', provinceState.sortKey === 'name');
      };
      document.getElementById('prov-search').addEventListener('input', (e) => {
        provinceState.query = e.target.value.trim().toLowerCase(); draw();
      });
      document.getElementById('prov-region').addEventListener('change', (e) => {
        provinceState.region = e.target.value; draw();
      });
      document.getElementById('sort-pop').addEventListener('click', () => {
        if (provinceState.sortKey === 'population') provinceState.sortDir *= -1;
        else { provinceState.sortKey = 'population'; provinceState.sortDir = -1; }
        draw();
      });
      document.getElementById('sort-name').addEventListener('click', () => {
        if (provinceState.sortKey === 'name') provinceState.sortDir *= -1;
        else { provinceState.sortKey = 'name'; provinceState.sortDir = 1; }
        draw();
      });
      draw();
    },
  };
}

function sourcesView() {
  return {
    title: 'Sources & method',
    html: `
    <section class="page-head">
      <h1>Sources &amp; method</h1>
      <p>NusaStat republishes headline figures from Indonesia’s official statistics. Nothing here is
      estimated by this site: every number is the figure its publisher released, with the survey or
      account it came from and the year it describes.</p>
    </section>
    <section class="card">
      <p class="source">Data: BPS — Statistics Indonesia, mid-2024 release — every dataset below is the latest round its publisher had issued when this site was compiled.</p>
      <div class="source-list">${SOURCE_NOTES.map((s) => `
        <article class="source-item">
          <h3>${s.topic}</h3>
          <p>${s.detail}</p>
          <p class="source">${s.publisher}</p>
        </article>`).join('')}
      </div>
    </section>
    <section class="card">
      <h2>How to read these numbers</h2>
      <p class="note">A census counts everyone once a decade (the last was 2020); between censuses,
      BPS projects the count forward from births, deaths and migration, which is why the 2024 total
      is an estimate. Survey rates — poverty, unemployment, literacy — describe the month of the
      survey round named beside them, and small differences between rounds are within survey error.
      GDP at current prices grows with both output and prices; the growth rate strips prices out.
      When a figure is revised by its publisher, the revised release is the one this site shows.</p>
      <h2>About NusaStat</h2>
      <p class="note">NusaStat is an independent reading room for Indonesian statistics: an original
      design and text, built as plain static files that run entirely in your browser. It is not
      affiliated with BPS or any government body; it exists so the numbers those bodies publish are
      easy to find, read and compare.</p>
    </section>`,
    mount() {},
  };
}

export const VIEWS = {
  '': overviewView,
  population: populationView,
  economy: economyView,
  wellbeing: wellbeingView,
  provinces: provincesView,
  sources: sourcesView,
};
