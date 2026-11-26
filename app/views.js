// views.js — HTML for every page of the site, built from data.js and charts.js.
// Every value is escaped before it goes into the page.

import {
  META, HEADLINE, POPULATION_SERIES, AGE_STRUCTURE, DEMOGRAPHY,
  GDP_SERIES, GDP_SECTORS, ECONOMY_FACTS, INFLATION_SERIES,
  UNEMPLOYMENT_SERIES, POVERTY_SERIES, EMPLOYMENT_FACTS,
  HEALTH_FACTS, EDUCATION_FACTS, ENROLMENT_SERIES, PROVINCES, SOURCES,
} from "./data.js";
import { lineChart, barChart, dualLine, hbarChart, RED, TEAL, GOLD } from "./charts.js";

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export const NAV = [
  { route: "#/", label: "Overview" },
  { route: "#/population", label: "Population" },
  { route: "#/economy", label: "Economy" },
  { route: "#/employment", label: "Employment" },
  { route: "#/health", label: "Health" },
  { route: "#/education", label: "Education" },
  { route: "#/provinces", label: "Provinces" },
  { route: "#/sources", label: "Sources" },
];

function factCards(facts) {
  return `<div class="cards">${facts.map((f) => `<article class="card">
    <h3>${escape(f.label)}</h3>
    <p class="big">${escape(f.value)}${f.unit ? ` <span class="unit">${escape(f.unit)}</span>` : ""}</p>
    <p class="src">${escape(f.source)}</p>
    <p class="note">${escape(f.note)}</p>
  </article>`).join("")}</div>`;
}

function sourceLine(text) {
  return `<p class="sourceline">Source: ${escape(text)}</p>`;
}

function sectionHead(kicker, title, intro) {
  return `<p class="kicker">${escape(kicker)}</p><h1>${escape(title)}</h1><p class="lede">${escape(intro)}</p>`;
}

export function overview() {
  const kpis = HEADLINE.map((h) => `<article class="card kpi">
    <h3>${escape(h.label)}</h3>
    <p class="big">${escape(h.value)}</p>
    <p class="src">${escape(h.detail)}</p>
    <p class="note">${escape(h.change)}</p>
  </article>`).join("");
  return `${sectionHead("Indonesia in figures · Updated November 2026",
    "Indonesia, by the numbers",
    "The world's fourth most populous country and Southeast Asia's largest economy — 284.4 million people across 17,508 islands and 38 provinces. Every figure below comes from BPS (Statistics Indonesia) or the World Bank, with its source and year shown beside it.")}
<div class="cards">${kpis}</div>
<div class="grid2">
  <section class="panel"><h2>Population keeps growing — slowly</h2>
    ${lineChart(POPULATION_SERIES.map((p) => ({ x: String(p.year).slice(2), y: p.pop })), { label: "Population 2015–2025, millions", suffix: "m" })}
    ${sourceLine("BPS mid-year projections; 2020 is the census count. Population, millions.")}
    <p>Indonesia added about 29 million people in a decade, but growth has eased to about 1.0% a year. <a href="#/population">Population in detail &rarr;</a></p>
  </section>
  <section class="panel"><h2>Growth near 5% every year</h2>
    ${barChart(GDP_SERIES.map((g) => ({ x: String(g.year).slice(2), y: g.growth, color: g.growth < 0 ? GOLD : TEAL })), { label: "Real GDP growth 2018–2025, percent", suffix: "%", color: TEAL })}
    ${sourceLine("BPS, real GDP growth year on year. The 2020 contraction is the COVID-19 year.")}
    <p>Only the pandemic year broke a run of growth above 5%. <a href="#/economy">Economy in detail &rarr;</a></p>
  </section>
</div>
<div class="grid2">
  <section class="panel"><h2>At a glance</h2>
    <dl class="facts">
      <dt>Capital</dt><dd>${escape(META.capital)}</dd>
      <dt>Provinces</dt><dd>38, from Aceh to South Papua</dd>
      <dt>Land area</dt><dd>1,904,569 km² — the world's largest archipelago state</dd>
      <dt>Currency</dt><dd>Indonesian rupiah (IDR)</dd>
      <dt>Largest province</dt><dd>West Java — 50.35 million people (mid-2024)</dd>
      <dt>Language</dt><dd>Indonesian (Bahasa Indonesia); over 700 local languages</dd>
    </dl>
    <p><a href="#/provinces">See all provinces &rarr;</a></p>
  </section>
  <section class="panel"><h2>Three things to know</h2>
    <ol class="takeaways">
      <li><strong>Poverty is at a record low.</strong> 8.07% in March 2026 (BPS) — down from 10.19% in 2020 — though the poverty line is only about Rp22,300 a day.</li>
      <li><strong>Most work is informal.</strong> 57.8% of workers have no written contract or social protection (BPS, Aug 2025), even as open unemployment fell to 4.76%.</li>
      <li><strong>Health capacity is thin.</strong> 1.4 hospital beds per 1,000 people (WHO, 2023) — far below Malaysia's 2.0 — while life expectancy reached 71.3 years.</li>
    </ol>
    <p><a href="#/sources">How every figure is sourced &rarr;</a></p>
  </section>
</div>`;
}

export function populationPage(chartMode) {
  const series = POPULATION_SERIES.map((p) => ({ x: String(p.year), y: p.pop }));
  const chart = chartMode === "bars"
    ? barChart(series.map((s) => ({ ...s, x: s.x.slice(2) })), { label: "Population 2015–2025, millions", suffix: "m" })
    : lineChart(series.map((s) => ({ ...s, x: s.x.slice(2) })), { label: "Population 2015–2025, millions", suffix: "m" });
  const rows = POPULATION_SERIES.map((p) => `<tr><td>${p.year}</td><td>${p.pop.toFixed(1)}</td><td>${p.year === 2015 ? "—" : "+" + (p.pop - POPULATION_SERIES[POPULATION_SERIES.findIndex((q) => q.year === p.year) - 1].pop).toFixed(1)}</td></tr>`).join("");
  return `${sectionHead("People · BPS mid-year projections",
    "Population: 284.4 million and still growing",
    "Indonesia is the world's fourth most populous country, after India, China and the United States. Growth has slowed from 1.3% a year a decade ago to about 1.0% — the country is still adding roughly 2.8 million people a year.")}
<div class="toolbar" role="group" aria-label="Chart type">
  <span>Chart:</span>
  <a class="btn${chartMode !== "bars" ? " active" : ""}" href="#/population">Line</a>
  <a class="btn${chartMode === "bars" ? " active" : ""}" href="#/population/bars">Bars</a>
</div>
<section class="panel"><h2>Population, 2015–2025 (millions)</h2>${chart}
${sourceLine("BPS mid-year projections; 2020 is the 2020 census count (270.2 million). The UN's 2025 estimate is slightly higher, 285.7 million — methods differ, so this site uses BPS throughout.")}
</section>
<div class="grid2">
  <section class="panel"><h2>Who lives here</h2>
    ${hbarChart(AGE_STRUCTURE.map((a) => ({ label: a.group, value: a.share, text: a.share + "%" })), { label: "Age structure, 2024", labelWidth: 110 })}
    ${sourceLine("World Bank WDI, 2024. Shares of total population.")}
    <p>Two in three Indonesians are of working age — the demographic dividend that powers the economy, and that will fade as the population ages.</p>
  </section>
  <section class="panel"><h2>The numbers behind it</h2>
    <table class="data"><thead><tr><th>Year</th><th>Population (m)</th><th>Change (m)</th></tr></thead><tbody>${rows}</tbody></table>
    ${sourceLine("BPS mid-year projections and the 2020 census.")}
  </section>
</div>
${factCards(DEMOGRAPHY)}
<p class="sourceline">Fertility, dependency ratio and infant mortality: BPS SUPAS 2025. Urban share and density: World Bank WDI. Median age: UN World Population Prospects 2024.</p>`;
}

export function economyPage() {
  return `${sectionHead("Economy · BPS and World Bank",
    "Economy: US$1.40 trillion, growing near 5%",
    "Indonesia is the world's 16th-largest economy at market rates and 7th-largest in purchasing-power terms. Manufacturing is the biggest single sector, but services and trade together employ most people.")}
<div class="grid2">
  <section class="panel"><h2>GDP, 2018–2025 (US$ billion)</h2>
    ${barChart(GDP_SERIES.map((g) => ({ x: String(g.year).slice(2), y: g.gdpUsd })), { label: "Nominal GDP in US dollars", color: RED })}
    ${sourceLine("World Bank WDI, GDP in current US$. 2025: US$1.45 trillion.")}
  </section>
  <section class="panel"><h2>Real growth, 2018–2025 (%)</h2>
    ${barChart(GDP_SERIES.map((g) => ({ x: String(g.year).slice(2), y: g.growth, color: g.growth < 0 ? GOLD : TEAL })), { label: "Real GDP growth, percent", suffix: "%", color: TEAL })}
    ${sourceLine("BPS, real GDP growth year on year. The −2.07% in 2020 is the COVID-19 contraction.")}
  </section>
</div>
<div class="grid2">
  <section class="panel"><h2>Inflation (CPI), 2018–2025 (%)</h2>
    ${lineChart(INFLATION_SERIES.map((i) => ({ x: String(i.year).slice(2), y: i.cpi })), { label: "Consumer price inflation, annual average", suffix: "%", color: GOLD })}
    ${sourceLine("BPS CPI, annual average. The 2022 spike (5.51%) followed the fuel-subsidy cut; 2024 fell to 1.57%.")}
  </section>
  <section class="panel"><h2>What the economy is made of</h2>
    ${hbarChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share, text: s.share + "%" })), { label: "Share of GDP by sector", labelWidth: 190, color: TEAL })}
    ${sourceLine("BPS, shares of GDP at current prices, 2024 (approximate; 'other' includes trade, transport, finance, health and education).")}
  </section>
</div>
${factCards(ECONOMY_FACTS)}`;
}

export function employmentPage() {
  return `${sectionHead("Work · BPS Sakernas labour force survey",
    "Employment: low unemployment, fragile jobs",
    "Open unemployment is at its lowest since 1997 — 4.76% in February 2025 — but the headline flatters the picture: most Indonesians work informally, and one in twelve workers is underemployed.")}
<section class="panel"><h2>Unemployment vs poverty, 2019–2025 (%)</h2>
  ${dualLine(
    UNEMPLOYMENT_SERIES.map((u) => ({ x: String(u.year).slice(2), y: u.rate })),
    POVERTY_SERIES.map((p) => ({ x: String(p.year).slice(2), y: p.rate })),
    { labelA: "Open unemployment (BPS Sakernas)", labelB: "Poverty rate (BPS)", label: "Unemployment and poverty rates" },
  )}
  ${sourceLine("BPS. Unemployment: open unemployment rate, % of labour force. Poverty: % of population below the BPS poverty line (September figure each year; 2025 is September). Both spiked in the pandemic year, 2020, and have fallen every year since.")}
</section>
<div class="grid2">
  <section class="panel"><h2>Poverty, 2019–2025 (%)</h2>
    ${barChart(POVERTY_SERIES.map((p) => ({ x: String(p.year).slice(2), y: p.rate })), { label: "Poverty rate", suffix: "%" })}
    ${sourceLine("BPS. March 2026: 8.07%, or 22.93 million people — the lowest in the BPS series.")}
  </section>
  <section class="panel"><h2>Unemployment, 2019–2025 (%)</h2>
    ${barChart(UNEMPLOYMENT_SERIES.map((u) => ({ x: String(u.year).slice(2), y: u.rate })), { label: "Open unemployment rate", suffix: "%", color: TEAL })}
    ${sourceLine("BPS Sakernas. February 2025: 4.76%; August 2025: 4.85%. The ILO's modelled estimate for 2025 is lower, 3.2%, because definitions differ.")}
  </section>
</div>
${factCards(EMPLOYMENT_FACTS)}
<p class="sourceline">A note on reading these numbers: BPS counts anyone who worked even one hour in the survey week as employed — so unemployment looks low while informal work and underemployment stay high. The World Bank's poverty line for upper-middle-income countries (US$6.85 a day) would put about 60% of Indonesians below it; BPS uses a national line based on the cost of basic needs.</p>`;
}

export function healthPage() {
  return `${sectionHead("Health · World Bank, WHO and the Ministry of Health",
    "Health: living longer, on thin capacity",
    "Life expectancy reached 71.3 years in 2024 and infant deaths keep falling — but Indonesia spends only 2.7% of GDP on health and has 1.4 hospital beds per 1,000 people, one of the lowest ratios in the region.")}
${factCards(HEALTH_FACTS)}
<section class="panel"><h2>How Indonesia compares on capacity</h2>
  ${hbarChart([
    { label: "Indonesia", value: 1.4, text: "1.4" },
    { label: "Malaysia", value: 2.0, text: "2.0" },
    { label: "Thailand", value: 2.5, text: "2.5" },
    { label: "United Kingdom", value: 2.4, text: "2.4" },
    { label: "Germany", value: 7.7, text: "7.7" },
  ], { label: "Hospital beds per 1,000 people, 2023", labelWidth: 110, color: TEAL })}
  ${sourceLine("WHO Global Health Observatory, 2023 (Germany and UK: WHO / World Bank, 2022–2023). Beds per 1,000 people.")}
  <p>Capacity is not the whole story — strong primary care (over 10,000 puskesmas community health centres) carries much of the load — but when beds run out, emergency rooms crowd and waiting times grow.</p>
</section>
<p class="sourceline">Life expectancy, infant and under-5 mortality: World Bank WDI 2024. Maternal mortality: World Bank modelled estimate 2023. Beds and physicians: WHO Global Health Observatory 2023. Health spending: World Bank 2023. Stunting: Ministry of Health SSGI 2024.</p>`;
}

export function educationPage() {
  return `${sectionHead("Education · World Bank and BPS",
    "Education: nearly everyone reads; half reach university",
    "Primary schooling is effectively universal and adult literacy is 96%. The gap opens later: fewer than half of young adults enrol in tertiary education, and the average adult has only 9 years of schooling.")}
${factCards(EDUCATION_FACTS)}
<section class="panel"><h2>Enrolment falls away after secondary school</h2>
  ${hbarChart(ENROLMENT_SERIES.map((e) => ({ label: e.level, value: e.rate, text: e.rate + "%" })), { label: "Gross enrolment ratio by level", labelWidth: 160, color: TEAL })}
  ${sourceLine("World Bank WDI: primary 2024, secondary 2024, tertiary 2023. Senior secondary 91.5% is the BPS gross enrolment figure for 2024.")}
  <p>Gross enrolment can exceed 100% where older students are still enrolled; the pattern here is the point — near-universal at the bottom, under half at the top.</p>
</section>
<p class="sourceline">Literacy, enrolment and education spending: World Bank WDI (literacy 2020; spending 2023). Years of schooling: BPS 2024. School count: Ministry of Education, 2024.</p>`;
}

export function provincesPage(query, sortKey) {
  const q = (query || "").trim().toLowerCase();
  let rows = PROVINCES.filter((p) => !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.island.toLowerCase().includes(q));
  const sorted = [...rows].sort((a, b) => (sortKey === "density" ? b.density - a.density : sortKey === "name" ? a.name.localeCompare(b.name) : b.pop - a.pop));
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 10);
  const tableRows = sorted.map((p, i) => `<tr><td>${i + 1}</td><td><strong>${escape(p.name)}</strong><br><span class="muted">${escape(p.id)}</span></td><td>${escape(p.capital)}</td><td>${escape(p.island)}</td><td class="num">${p.pop.toFixed(2)}</td><td class="num">${p.density.toLocaleString("en-US")}</td></tr>`).join("");
  return `${sectionHead("Provinces · BPS mid-2024 estimates",
    "Provinces: Java holds more than half the country",
    "Indonesia has 38 provinces. The three Javanese giants — West, East and Central Java — hold 130 million people, about 46% of the nation, on less than 7% of its land. Search the table or sort it by population, density or name.")}
<section class="panel"><h2>The ten largest provinces (millions)</h2>
  ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop, text: p.pop.toFixed(1) + "m" })), { label: "Population of the ten largest provinces", labelWidth: 140 })}
  ${sourceLine("BPS provincial mid-2024 estimates. West Java alone (50.35m) has more people than Spain.")}
</section>
<section class="panel"><h2>All twenty largest provinces</h2>
  <form class="toolbar" id="provFilter" action="#/provinces" method="get">
    <label>Search <input type="search" id="provQuery" name="q" value="${escape(query || "")}" placeholder="Province, capital or island…" aria-label="Search provinces"></label>
    <label>Sort by
      <select id="provSort" name="sort">
        <option value="pop"${sortKey !== "density" && sortKey !== "name" ? " selected" : ""}>Population (largest first)</option>
        <option value="density"${sortKey === "density" ? " selected" : ""}>Density (highest first)</option>
        <option value="name"${sortKey === "name" ? " selected" : ""}>Name (A–Z)</option>
      </select>
    </label>
    <button class="btn" type="submit">Apply</button>
    <a class="btn" href="#/provinces">Reset</a>
  </form>
  <p class="resultline" id="provCount">${sorted.length} province${sorted.length === 1 ? "" : "s"} shown${q ? ` matching “${escape(query)}”` : ""}.</p>
  <div class="tablewrap"><table class="data"><thead><tr><th>#</th><th>Province</th><th>Capital</th><th>Island</th><th class="num">Population (m)</th><th class="num">Density /km²</th></tr></thead><tbody>${tableRows || `<tr><td colspan="6">No province matches that search. <a href="#/provinces">Show all provinces</a>.</td></tr>`}</tbody></table></div>
  ${sourceLine("BPS provincial mid-2024 estimates. The remaining 18 provinces (including all of Papua and Maluku) hold about 24 million people combined; the smallest, South Papua, has about 0.54 million.")}
</section>`;
}

export function sourcesPage() {
  const rows = SOURCES.map((s) => `<article class="card">
    <h3>${escape(s.name)}</h3>
    <p class="note">${escape(s.what)}</p>
    <p class="src">${escape(s.url)}</p>
    <p class="note">${escape(s.note)}</p>
  </article>`).join("");
  return `${sectionHead("Sources & method",
    "Where every number comes from",
    "Nothing on this site is estimated by its author. Each figure is taken from a published release, and the source and year travel with the figure wherever it appears. Where sources disagree, this site says so and uses BPS.")}
<div class="cards">${rows}</div>
<section class="panel"><h2>How to read the figures</h2>
  <ul>
    <li><strong>Population:</strong> BPS mid-year projections, not a headcount. The 2020 census counted 270.2 million; Dukcapil's civil-registry count for end-2025 is higher (288.3 million) because it counts registered residents differently. This site uses BPS.</li>
    <li><strong>GDP in US$:</strong> World Bank figures at market exchange rates; BPS publishes GDP in rupiah (Rp22,139 trillion in 2024). PPP figures adjust for price differences and are much larger.</li>
    <li><strong>Unemployment:</strong> BPS's open unemployment rate counts people with no work at all. Anyone who worked one hour in the survey week counts as employed — read it with the informal-work and underemployment figures.</li>
    <li><strong>Poverty:</strong> the BPS national line is the cost of basic food and non-food needs (Rp669,235 per person per month in March 2026). The World Bank's line for upper-middle-income countries is higher, so its poverty count is higher too.</li>
    <li><strong>Years:</strong> each figure carries its reference year. The newest published figure is used; where 2025 data was not yet released, 2024 is shown and labelled.</li>
  </ul>
</section>
<section class="panel"><h2>About this site</h2>
  <p><strong>Nusantara Numbers</strong> is an independent reference site, not affiliated with BPS, the World Bank or the Government of Indonesia. It runs entirely from its own files with no network requests, so it works offline. Figures were checked against published releases in November 2026.</p>
  <p><button class="btn" id="printBtn" type="button">Print this page</button> — prints the page you are on, for classroom or offline use.</p>
</section>`;
}

export function missing() {
  return `<h1>Page not found</h1><p>There is no page at this address. <a href="#/">Back to the overview</a>.</p>`;
}
