// data.js — every figure on this site, with its source and reference year.
// Primary sources: BPS — Statistics Indonesia (bps.go.id) and the World Bank
// World Development Indicators (data.worldbank.org). Where two sources differ
// (for example population), the BPS figure is used and the difference is noted
// on the Sources page. Figures were checked against published releases in
// November 2026; nothing here is estimated by this site.

export const META = {
  country: "Indonesia",
  countryId: "IDN",
  updated: "November 2026",
  currency: "Indonesian rupiah (IDR)",
  capital: "Jakarta (national capital; Nusantara is the new capital under construction)",
  provinces: 38,
  islands: "17,508 islands (BPS)",
  landAreaKm2: 1904569,
  density2024: 148,
};

export const HEADLINE = [
  { key: "population", label: "Population", value: "284.4 million", detail: "BPS mid-year projection, 2025", change: "+1.0% on 2024" },
  { key: "gdp", label: "GDP (nominal)", value: "US$1.40 trillion", detail: "World Bank, 2024", change: "Rp22,139 trillion (BPS)" },
  { key: "gdpPc", label: "GDP per capita", value: "US$4,925", detail: "World Bank, 2024", change: "Rp78.62 million (BPS)" },
  { key: "growth", label: "Real GDP growth", value: "5.03%", detail: "BPS, 2024", change: "5.11% in 2025" },
  { key: "inflation", label: "Inflation (CPI)", value: "1.57%", detail: "BPS, 2024 average", change: "2.92% in 2025" },
  { key: "unemployment", label: "Open unemployment", value: "4.76%", detail: "BPS Sakernas, Feb 2025", change: "4.85% in Aug 2025" },
  { key: "poverty", label: "Poverty rate", value: "8.47%", detail: "BPS, March 2025", change: "8.25% in Sep 2025" },
  { key: "life", label: "Life expectancy", value: "71.3 years", detail: "World Bank, 2024", change: "69.2 male · 73.4 female" },
];

// Population, millions. BPS mid-year projections; 2020 is the census count.
export const POPULATION_SERIES = [
  { year: 2015, pop: 255.6 }, { year: 2016, pop: 258.7 }, { year: 2017, pop: 261.9 },
  { year: 2018, pop: 265.0 }, { year: 2019, pop: 268.1 }, { year: 2020, pop: 270.2 },
  { year: 2021, pop: 272.7 }, { year: 2022, pop: 275.8 }, { year: 2023, pop: 278.7 },
  { year: 2024, pop: 281.6 }, { year: 2025, pop: 284.4 },
];

export const AGE_STRUCTURE = [
  { group: "0–14 years", share: 24.6, note: "about 70 million children" },
  { group: "15–64 years", share: 68.1, note: "working-age majority" },
  { group: "65+ years", share: 7.3, note: "ageing slowly" },
];

export const DEMOGRAPHY = [
  { label: "Total fertility rate", value: "2.13", unit: "births per woman", source: "BPS SUPAS 2025", note: "Close to the 2.1 replacement level." },
  { label: "Population growth", value: "1.0%", unit: "per year", source: "BPS, 2024–2025", note: "Growth has eased from 1.3% a decade ago." },
  { label: "Urban population", value: "59.2%", unit: "of total", source: "World Bank WDI, 2024", note: "About 168 million people live in towns and cities." },
  { label: "Population density", value: "148", unit: "people per km²", source: "World Bank, 2023", note: "Java averages over 1,100 per km²; Papua under 15." },
  { label: "Dependency ratio", value: "45.0", unit: "per 100 working-age", source: "BPS SUPAS 2025", note: "45 dependants for every 100 people of working age." },
  { label: "Median age", value: "30.1", unit: "years", source: "UN World Population Prospects 2024", note: "A young country, still in its demographic dividend." },
];

// GDP nominal, US$ billion (World Bank WDI); growth % (BPS, real, year on year).
export const GDP_SERIES = [
  { year: 2018, gdpUsd: 1042, growth: 5.17 },
  { year: 2019, gdpUsd: 1119, growth: 5.02 },
  { year: 2020, gdpUsd: 1059, growth: -2.07 },
  { year: 2021, gdpUsd: 1187, growth: 3.70 },
  { year: 2022, gdpUsd: 1319, growth: 5.31 },
  { year: 2023, gdpUsd: 1371, growth: 5.05 },
  { year: 2024, gdpUsd: 1396, growth: 5.03 },
  { year: 2025, gdpUsd: 1446, growth: 5.11 },
];

export const GDP_SECTORS = [
  { sector: "Manufacturing", share: 18.7 },
  { sector: "Agriculture, forestry & fishing", share: 12.5 },
  { sector: "Wholesale & retail trade", share: 12.9 },
  { sector: "Mining & quarrying", share: 9.9 },
  { sector: "Construction", share: 10.3 },
  { sector: "Other services & government", share: 35.7 },
];

export const ECONOMY_FACTS = [
  { label: "GDP, current prices", value: "Rp22,139 trillion", source: "BPS, 2024", note: "About US$1.40 trillion at market rates." },
  { label: "GDP per capita", value: "Rp78.62 million", source: "BPS, 2024", note: "US$4,960 at market rates; US$16,472 in PPP terms (World Bank)." },
  { label: "GDP (PPP)", value: "US$4.68 trillion", source: "World Bank, 2024", note: "The world's 7th-largest economy in PPP terms." },
  { label: "Inflation, 2024", value: "1.57%", source: "BPS CPI, 2024", note: "Inside Bank Indonesia's 1.5–3.5% target band; 5.51% in 2022." },
  { label: "Inflation, 2025", value: "2.92%", source: "BPS CPI, 2025", note: "Annual average; October 2025 was 2.86% year on year." },
  { label: "Exports of goods", value: "US$264.7 billion", source: "BPS, 2024", note: "Coal, palm oil, nickel products and electronics lead." },
  { label: "Labour force", value: "152.1 million", source: "BPS Sakernas, Aug 2025", note: "Participation rate 71.1% of people aged 15+." },
  { label: "Government debt", value: "≈39% of GDP", source: "Ministry of Finance, 2024", note: "Well under the 60% legal ceiling." },
];

export const INFLATION_SERIES = [
  { year: 2018, cpi: 3.13 }, { year: 2019, cpi: 2.72 }, { year: 2020, cpi: 1.68 },
  { year: 2021, cpi: 1.87 }, { year: 2022, cpi: 5.51 }, { year: 2023, cpi: 2.61 },
  { year: 2024, cpi: 1.57 }, { year: 2025, cpi: 2.92 },
];

// Open unemployment rate (BPS Sakernas, % of labour force). Annual figure shown.
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, rate: 5.28 }, { year: 2020, rate: 7.07 }, { year: 2021, rate: 6.49 },
  { year: 2022, rate: 5.86 }, { year: 2023, rate: 5.32 }, { year: 2024, rate: 4.86 },
  { year: 2025, rate: 4.81 },
];

// Poverty rate, % of population (BPS; September figure each year, March 2025 noted).
export const POVERTY_SERIES = [
  { year: 2019, rate: 9.22 }, { year: 2020, rate: 10.19 }, { year: 2021, rate: 9.71 },
  { year: 2022, rate: 9.57 }, { year: 2023, rate: 9.36 }, { year: 2024, rate: 8.57 },
  { year: 2025, rate: 8.25 },
];

export const EMPLOYMENT_FACTS = [
  { label: "Unemployed people", value: "7.46 million", source: "BPS Sakernas, Aug 2025", note: "Open unemployment 4.85% in August 2025; 4.76% in February 2025." },
  { label: "Informal workers", value: "57.8%", source: "BPS Sakernas, Aug 2025", note: "84.6 million workers have no written contract or social protection." },
  { label: "Underemployed", value: "7.91%", source: "BPS Sakernas, Aug 2025", note: "11.6 million people work under 35 hours a week and want more." },
  { label: "Average employee wage", value: "Rp3.33 million", source: "BPS Sakernas, Aug 2025", note: "Per month, net, for employees." },
  { label: "Youth unemployment (15–24)", value: "≈16%", source: "BPS Sakernas, 2024", note: "Roughly three times the national rate — the hardest group to place." },
  { label: "Poverty line", value: "Rp669,235", source: "BPS, March 2026", note: "Per person per month; about Rp22,300 a day." },
  { label: "People in poverty", value: "22.93 million", source: "BPS, March 2026", note: "8.07% of the population — the lowest in the BPS series." },
  { label: "Extreme poverty", value: "0.78%", source: "BPS, Sep 2025", note: "Down from 1.26% in March 2024." },
];

export const HEALTH_FACTS = [
  { label: "Life expectancy at birth", value: "71.3 years", source: "World Bank WDI, 2024", note: "69.2 years for men, 73.4 for women." },
  { label: "Infant mortality", value: "15.2", unit: "per 1,000 live births", source: "World Bank WDI, 2024", note: "BPS SUPAS 2025 puts it at 14.1." },
  { label: "Under-5 mortality", value: "17.7", unit: "per 1,000 live births", source: "World Bank WDI, 2024", note: "Down from 27 in 2015." },
  { label: "Maternal mortality", value: "140", unit: "per 100,000 live births", source: "World Bank, 2023", note: "Modelled estimate; still among the highest in East Asia." },
  { label: "Hospital beds", value: "1.4", unit: "per 1,000 people", source: "WHO Global Health Observatory, 2023", note: "14 beds per 10,000 people." },
  { label: "Physicians", value: "0.52", unit: "per 1,000 people", source: "World Bank / WHO, 2023", note: "About one doctor for every 1,900 people." },
  { label: "Health spending", value: "2.7% of GDP", source: "World Bank, 2023", note: "About US$132 per person per year." },
  { label: "Stunting (under-5)", value: "≈21%", source: "Ministry of Health SSGI, 2024", note: "Share of children under five shorter than expected for their age." },
];

export const EDUCATION_FACTS = [
  { label: "Adult literacy (15+)", value: "96.0%", source: "World Bank WDI, 2020", note: "Youth literacy (15–24) is higher, at 99%+ in recent BPS figures." },
  { label: "Primary enrolment", value: "100.0%", source: "World Bank WDI, 2024", note: "Gross enrolment ratio; near-universal primary schooling." },
  { label: "Secondary enrolment", value: "98.8%", source: "World Bank WDI, 2024", note: "Gross enrolment ratio." },
  { label: "Tertiary enrolment", value: "44.9%", source: "World Bank WDI, 2023", note: "Gross enrolment ratio — under half of young adults reach university." },
  { label: "Mean years of schooling", value: "9.0 years", source: "BPS, 2024", note: "Average for people aged 25 and over." },
  { label: "Expected years of schooling", value: "14.1 years", source: "BPS / UNDP, 2024", note: "What a child entering school today can expect." },
  { label: "Education spending", value: "1.3% of GDP", source: "World Bank, 2023", note: "Government spending on education; the constitution mandates 20% of the state budget." },
  { label: "Schools", value: "≈395,000", source: "Ministry of Education, 2024", note: "Primary, junior and senior secondary schools, public and private." },
];

export const ENROLMENT_SERIES = [
  { level: "Primary", rate: 100.0 },
  { level: "Junior secondary", rate: 98.8 },
  { level: "Senior secondary", rate: 91.5 },
  { level: "Tertiary", rate: 44.9 },
];

// Provinces, mid-2024 population in millions (BPS provincial estimates, as
// tabulated from BPS releases). 38 provinces in total; the twenty largest
// are listed here.
export const PROVINCES = [
  { name: "West Java", id: "Jawa Barat", capital: "Bandung", island: "Java", pop: 50.35, density: 1359 },
  { name: "East Java", id: "Jawa Timur", capital: "Surabaya", island: "Java", pop: 41.81, density: 873 },
  { name: "Central Java", id: "Jawa Tengah", capital: "Semarang", island: "Java", pop: 37.89, density: 1104 },
  { name: "North Sumatra", id: "Sumatera Utara", capital: "Medan", island: "Sumatra", pop: 15.59, density: 215 },
  { name: "Banten", id: "Banten", capital: "Serang", island: "Java", pop: 12.64, density: 1311 },
  { name: "Jakarta", id: "DKI Jakarta", capital: "Jakarta", island: "Java", pop: 10.68, density: 16165 },
  { name: "South Sulawesi", id: "Sulawesi Selatan", capital: "Makassar", island: "Sulawesi", pop: 9.46, density: 203 },
  { name: "Lampung", id: "Lampung", capital: "Bandar Lampung", island: "Sumatra", pop: 9.42, density: 281 },
  { name: "South Sumatra", id: "Sumatera Selatan", capital: "Palembang", island: "Sumatra", pop: 8.84, density: 102 },
  { name: "Riau", id: "Riau", capital: "Pekanbaru", island: "Sumatra", pop: 6.73, density: 75 },
  { name: "West Nusa Tenggara", id: "Nusa Tenggara Barat", capital: "Mataram", island: "Nusa Tenggara", pop: 5.66, density: 305 },
  { name: "East Nusa Tenggara", id: "Nusa Tenggara Timur", capital: "Kupang", island: "Nusa Tenggara", pop: 5.66, density: 117 },
  { name: "West Sumatra", id: "Sumatera Barat", capital: "Padang", island: "Sumatra", pop: 5.84, density: 139 },
  { name: "Aceh", id: "Aceh", capital: "Banda Aceh", island: "Sumatra", pop: 5.55, density: 98 },
  { name: "West Kalimantan", id: "Kalimantan Barat", capital: "Pontianak", island: "Kalimantan", pop: 5.45, density: 37 },
  { name: "East Kalimantan", id: "Kalimantan Timur", capital: "Samarinda", island: "Kalimantan", pop: 4.47, density: 35 },
  { name: "Bali", id: "Bali", capital: "Denpasar", island: "Bali", pop: 4.36, density: 755 },
  { name: "South Kalimantan", id: "Kalimantan Selatan", capital: "Banjarmasin", island: "Kalimantan", pop: 4.29, density: 110 },
  { name: "Central Sulawesi", id: "Sulawesi Tengah", capital: "Palu", island: "Sulawesi", pop: 3.10, density: 50 },
  { name: "North Sulawesi", id: "Sulawesi Utara", capital: "Manado", island: "Sulawesi", pop: 2.71, density: 196 },
];

export const SOURCES = [
  { name: "BPS — Statistics Indonesia", what: "Population projections and census, GDP, CPI inflation, Sakernas labour force survey, poverty releases", url: "bps.go.id", note: "The national statistics office; used first wherever its figures exist." },
  { name: "World Bank — World Development Indicators", what: "GDP and GDP per capita in US$, life expectancy, mortality, enrolment, health spending", url: "data.worldbank.org", note: "Cross-country comparable series; population and GDP in US$ are quoted from WDI." },
  { name: "WHO Global Health Observatory", what: "Hospital beds per 10,000 people, physicians", url: "who.int/data/gho", note: "Health-system capacity figures, 2023." },
  { name: "BPS SUPAS 2025 (Intercensal Population Survey)", what: "Fertility rate, dependency ratio, infant mortality", url: "bps.go.id", note: "Released May 2026; survey-based official release." },
  { name: "Ministry of Finance, Republic of Indonesia", what: "Government debt ratio", url: "kemenkeu.go.id", note: "2024 fiscal figures." },
  { name: "Ministry of Health — SSGI 2024", what: "Stunting prevalence among children under five", url: "kemkes.go.id", note: "Indonesian Nutrition Status Survey." },
  { name: "UN World Population Prospects 2024", what: "Median age; cross-checks on population totals", url: "population.un.org/wpp", note: "UN estimates differ slightly from BPS (285.7m for 2025 vs BPS 284.4m) because methods differ; this site uses BPS." },
];
