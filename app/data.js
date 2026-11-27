// NusaStat data: every figure published by BPS — Statistics Indonesia (the
// national statistics office), with the reference year kept beside it so the
// site never shows a number without saying where it comes from and when it
// was measured. Values are the headline official releases, rounded the way
// BPS reports them.

export const SOURCES = {
  bps: 'BPS — Statistics Indonesia',
};

export const HEADLINE = {
  populationMillions: 281.6,
  populationYear: 2024,
  provinces: 38,
  landAreaKm2: 1904569,
  islands: 17001,
};

export const KPI_CARDS = [
  { label: 'Population', value: '281.6 M', note: 'mid-2024 estimate', source: 'BPS, 2024' },
  { label: 'GDP (current prices)', value: 'Rp 22,139 T', note: 'nominal GDP', source: 'BPS, 2024' },
  { label: 'Economic growth', value: '5.03%', note: 'year on year', source: 'BPS, 2024' },
  { label: 'GDP per capita', value: 'Rp 78.6 M', note: 'about US$4,981', source: 'BPS, 2024' },
  { label: 'Inflation', value: '1.57%', note: 'December, year on year', source: 'BPS, 2024' },
  { label: 'Unemployment', value: '4.91%', note: 'open unemployment, August', source: 'BPS, 2024' },
  { label: 'Poverty rate', value: '8.57%', note: 'September; 24.06 M people', source: 'BPS, 2024' },
  { label: 'Human Development Index', value: '75.02', note: 'on a 0–100 scale', source: 'BPS, 2024' },
];

// Census counts and official intercensal estimates, million people.
export const POPULATION_SERIES = {
  source: 'BPS population censuses 1971–2020 and mid-year estimates',
  points: [
    { year: 1971, value: 119.2 },
    { year: 1980, value: 147.5 },
    { year: 1990, value: 179.4 },
    { year: 2000, value: 206.3 },
    { year: 2010, value: 237.6 },
    { year: 2015, value: 255.5 },
    { year: 2020, value: 270.2 },
    { year: 2024, value: 281.6 },
  ],
};

export const AGE_STRUCTURE = {
  source: 'BPS, 2024',
  parts: [
    { label: 'Age 0–14', value: 24.5, color: '#d97706' },
    { label: 'Age 15–64', value: 68.6, color: '#0e7c6b' },
    { label: 'Age 65+', value: 6.9, color: '#b3271e' },
  ],
};

export const DEMOGRAPHY_FACTS = [
  { label: 'Population growth', value: '0.82% a year', source: 'BPS, 2024' },
  { label: 'Median age', value: 'about 30 years', source: 'BPS, 2024' },
  { label: 'Living in urban areas', value: '58.6%', source: 'BPS, 2024' },
  { label: 'Population density', value: '148 people / km²', source: 'BPS, 2024' },
  { label: 'Fertility rate', value: '2.18 children per woman', source: 'BPS, 2020 census long form' },
  { label: 'Life expectancy', value: '72.4 years', source: 'BPS, 2024' },
];

// Annual real GDP growth, percent year on year.
export const GROWTH_SERIES = {
  source: 'BPS, national accounts',
  points: [
    { year: 2015, value: 4.88 },
    { year: 2016, value: 5.03 },
    { year: 2017, value: 5.07 },
    { year: 2018, value: 5.17 },
    { year: 2019, value: 5.02 },
    { year: 2020, value: -2.07 },
    { year: 2021, value: 3.70 },
    { year: 2022, value: 5.31 },
    { year: 2023, value: 5.05 },
    { year: 2024, value: 5.03 },
  ],
};

// Nominal GDP at current market prices, trillion rupiah.
export const GDP_SERIES = {
  source: 'BPS, national accounts',
  points: [
    { year: 2015, value: 11526 },
    { year: 2016, value: 12407 },
    { year: 2017, value: 13589 },
    { year: 2018, value: 14838 },
    { year: 2019, value: 15833 },
    { year: 2020, value: 15438 },
    { year: 2021, value: 16977 },
    { year: 2022, value: 19588 },
    { year: 2023, value: 20892 },
    { year: 2024, value: 22139 },
  ],
};

// Share of GDP by industry, percent, 2024.
export const GDP_SECTORS = {
  source: 'BPS, 2024',
  parts: [
    { label: 'Manufacturing', value: 19.0, color: '#b3271e' },
    { label: 'Wholesale & retail trade', value: 13.1, color: '#0e7c6b' },
    { label: 'Agriculture & fisheries', value: 12.6, color: '#5b8c3e' },
    { label: 'Construction', value: 10.4, color: '#d97706' },
    { label: 'Mining & quarrying', value: 9.2, color: '#6b5ca5' },
    { label: 'Transport & storage', value: 6.1, color: '#2f6db3' },
    { label: 'Information & communication', value: 4.3, color: '#c2571b' },
    { label: 'Financial services', value: 4.1, color: '#4a4e57' },
    { label: 'Public administration', value: 3.1, color: '#8a6d3b' },
    { label: 'All other industries', value: 18.1, color: '#cbbfa5' },
  ],
};

export const TRADE = {
  source: 'BPS, 2024',
  exportsBillionUsd: 264.7,
  importsBillionUsd: 233.7,
  balanceBillionUsd: 31.0,
  topExports: ['Coal and mineral fuels', 'Palm oil and vegetable fats', 'Iron and steel', 'Electrical machinery', 'Vehicles and parts'],
};

// Consumer price inflation, December, percent year on year.
export const INFLATION_SERIES = {
  source: 'BPS, consumer price index',
  points: [
    { year: 2015, value: 3.35 },
    { year: 2016, value: 3.02 },
    { year: 2017, value: 3.61 },
    { year: 2018, value: 3.13 },
    { year: 2019, value: 2.72 },
    { year: 2020, value: 1.68 },
    { year: 2021, value: 1.87 },
    { year: 2022, value: 5.51 },
    { year: 2023, value: 2.61 },
    { year: 2024, value: 1.57 },
  ],
};

// Share of the population below the national poverty line, September, percent.
export const POVERTY_SERIES = {
  source: 'BPS, National Socioeconomic Survey (Susenas), September rounds',
  points: [
    { year: 2015, value: 11.13 },
    { year: 2016, value: 10.70 },
    { year: 2017, value: 10.12 },
    { year: 2018, value: 9.66 },
    { year: 2019, value: 9.22 },
    { year: 2020, value: 10.19 },
    { year: 2021, value: 9.71 },
    { year: 2022, value: 9.57 },
    { year: 2023, value: 9.36 },
    { year: 2024, value: 8.57 },
  ],
};

// Open unemployment rate, August labour force survey, percent.
export const UNEMPLOYMENT_SERIES = {
  source: 'BPS, National Labour Force Survey (Sakernas), August rounds',
  points: [
    { year: 2015, value: 6.18 },
    { year: 2016, value: 5.61 },
    { year: 2017, value: 5.50 },
    { year: 2018, value: 5.30 },
    { year: 2019, value: 5.23 },
    { year: 2020, value: 7.07 },
    { year: 2021, value: 6.49 },
    { year: 2022, value: 5.86 },
    { year: 2023, value: 5.32 },
    { year: 2024, value: 4.91 },
  ],
};

export const WELLBEING_FACTS = [
  { label: 'Human Development Index', value: '75.02', note: 'High human development band', source: 'BPS, 2024' },
  { label: 'Life expectancy at birth', value: '72.4 years', note: 'Up from 71.5 in 2020', source: 'BPS, 2024' },
  { label: 'Literacy, age 15+', value: '97.9%', note: 'Can read and write', source: 'BPS, 2024' },
  { label: 'People in poverty', value: '24.06 million', note: '8.57% of the population', source: 'BPS, September 2024' },
  { label: 'Labour force', value: '152.1 million', note: 'August survey round', source: 'BPS, 2024' },
  { label: 'Mean years of schooling', value: '8.9 years', note: 'Population age 25+', source: 'BPS, 2024' },
];

// All 38 provinces: capital, island region and mid-2024 population estimate
// in millions (BPS provincial projections). Components are rounded and may
// not sum exactly to the national total.
export const PROVINCES = [
  { name: 'Aceh', capital: 'Banda Aceh', region: 'Sumatra', population: 5.55 },
  { name: 'North Sumatra', capital: 'Medan', region: 'Sumatra', population: 15.59 },
  { name: 'West Sumatra', capital: 'Padang', region: 'Sumatra', population: 5.84 },
  { name: 'Riau', capital: 'Pekanbaru', region: 'Sumatra', population: 6.73 },
  { name: 'Jambi', capital: 'Jambi', region: 'Sumatra', population: 3.72 },
  { name: 'South Sumatra', capital: 'Palembang', region: 'Sumatra', population: 8.84 },
  { name: 'Bengkulu', capital: 'Bengkulu', region: 'Sumatra', population: 2.11 },
  { name: 'Lampung', capital: 'Bandar Lampung', region: 'Sumatra', population: 9.42 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', region: 'Sumatra', population: 1.53 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', region: 'Sumatra', population: 2.18 },
  { name: 'Jakarta', capital: 'Jakarta', region: 'Java', population: 10.56 },
  { name: 'West Java', capital: 'Bandung', region: 'Java', population: 49.94 },
  { name: 'Central Java', capital: 'Semarang', region: 'Java', population: 38.28 },
  { name: 'Yogyakarta', capital: 'Yogyakarta', region: 'Java', population: 3.76 },
  { name: 'East Java', capital: 'Surabaya', region: 'Java', population: 41.81 },
  { name: 'Banten', capital: 'Serang', region: 'Java', population: 12.43 },
  { name: 'Bali', capital: 'Denpasar', region: 'Bali & Nusa Tenggara', population: 4.29 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', region: 'Bali & Nusa Tenggara', population: 5.65 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', region: 'Bali & Nusa Tenggara', population: 5.66 },
  { name: 'West Kalimantan', capital: 'Pontianak', region: 'Kalimantan', population: 5.87 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', region: 'Kalimantan', population: 2.81 },
  { name: 'South Kalimantan', capital: 'Banjarmasin', region: 'Kalimantan', population: 4.27 },
  { name: 'East Kalimantan', capital: 'Samarinda', region: 'Kalimantan', population: 3.96 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', region: 'Kalimantan', population: 0.73 },
  { name: 'North Sulawesi', capital: 'Manado', region: 'Sulawesi', population: 2.70 },
  { name: 'Central Sulawesi', capital: 'Palu', region: 'Sulawesi', population: 3.12 },
  { name: 'South Sulawesi', capital: 'Makassar', region: 'Sulawesi', population: 9.46 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', region: 'Sulawesi', population: 2.79 },
  { name: 'Gorontalo', capital: 'Gorontalo', region: 'Sulawesi', population: 1.23 },
  { name: 'West Sulawesi', capital: 'Mamuju', region: 'Sulawesi', population: 1.53 },
  { name: 'Maluku', capital: 'Ambon', region: 'Maluku', population: 1.95 },
  { name: 'North Maluku', capital: 'Sofifi', region: 'Maluku', population: 1.37 },
  { name: 'West Papua', capital: 'Manokwari', region: 'Papua', population: 0.56 },
  { name: 'Southwest Papua', capital: 'Sorong', region: 'Papua', population: 0.61 },
  { name: 'Papua', capital: 'Jayapura', region: 'Papua', population: 1.09 },
  { name: 'South Papua', capital: 'Merauke', region: 'Papua', population: 0.54 },
  { name: 'Central Papua', capital: 'Nabire', region: 'Papua', population: 1.37 },
  { name: 'Highland Papua', capital: 'Wamena', region: 'Papua', population: 1.47 },
];

export const SOURCE_NOTES = [
  { topic: 'Population totals and growth', detail: 'Population censuses 1971–2020 and official mid-year estimates; 281.6 million at mid-2024.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Provincial populations', detail: 'Mid-2024 provincial estimates from the official population projection; figures are rounded to two decimals of a million.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'GDP, growth and industry shares', detail: 'National accounts at current and constant 2010 prices; growth of 5.03% and nominal GDP of Rp 22,139 trillion in 2024.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Inflation', detail: 'Consumer price index, December year-on-year change for 90 cities.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Poverty', detail: 'National Socioeconomic Survey (Susenas); September 2024 rate 8.57%, or 24.06 million people.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Employment', detail: 'National Labour Force Survey (Sakernas), August 2024; open unemployment 4.91%.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Human development', detail: 'Human Development Index 75.02 in 2024, built from life expectancy, schooling and adjusted per-capita spending.', publisher: 'BPS — Statistics Indonesia, 2024' },
  { topic: 'Foreign trade', detail: 'Exports of US$264.7 billion against imports of US$233.7 billion in 2024, a surplus of US$31.0 billion.', publisher: 'BPS — Statistics Indonesia, 2024' },
];
