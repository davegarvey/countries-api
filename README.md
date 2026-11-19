# 🌍 Countries API

A free REST API for country data - perfect for testing, demos, prototypes, and learning.

Get information for 197 countries, including names, capitals, populations, currencies, languages, flags, and more. No authentication required, CORS enabled, and powered by [Cloudflare Workers](https://developers.cloudflare.com/workers/) for blazing-fast global performance.

## 🚀 Quick Start

**Live API:** [https://countries-api.davegarvey.workers.dev](https://countries-api.davegarvey.workers.dev)

```bash
# Get all countries
curl https://countries-api.davegarvey.workers.dev/countries

# Get a specific country
curl https://countries-api.davegarvey.workers.dev/countries/US

# Get a random country (great for testing!)
curl https://countries-api.davegarvey.workers.dev/countries/random

# Filter by region
curl https://countries-api.davegarvey.workers.dev/countries?region=Europe

# Search for countries
curl https://countries-api.davegarvey.workers.dev/search?q=island
```

## 📋 Features

- **197 Countries** - Complete global dataset
- **Rich Data** - Names, capitals, populations, currencies, languages, flags, calling codes
- **Flexible Filtering** - By region, subregion, currency, language
- **No Auth Required** - Open API, no API keys needed
- **CORS Enabled** - Use directly from frontend applications
- **Fast & Reliable** - Powered by Cloudflare's global network
- **Pretty JSON** - Human-readable formatted responses

## 🔗 Common Endpoints

### Get All Countries
```http
GET /countries
```
Returns all 197 countries.

### Get Specific Country
```http
GET /countries/{code}
```
Get country by 2-letter (US, FR) or 3-letter (USA, FRA) ISO code.

**Example Response:**
```json
{
  "name": "United States",
  "code": "US",
  "alpha3Code": "USA",
  "capital": "Washington, D.C.",
  "region": "Americas",
  "subregion": "Northern America",
  "population": 341784857,
  "languages": ["English"],
  "currency": "USD",
  "flag": "🇺🇸",
  "callingCode": "+1"
}
```

### Get Random Country
```http
GET /countries/random
```
Returns a random country - perfect for quiz apps, testing, or learning!

### Filter by Region
```http
GET /countries?region={region}
```
Available regions: `Africa`, `Americas`, `Asia`, `Europe`, `Oceania`

**Example:**
```bash
GET /countries?region=Europe
```

### Filter by Currency
```http
GET /countries?currency={currency}
```
**Example:**
```bash
GET /countries?currency=EUR  # All countries using Euro
```

### Filter by Language
```http
GET /countries?language={language}
```
**Example:**
```bash
GET /countries?language=Spanish
```

### Search Countries
```http
GET /search?q={query}
```
Search by country name or capital.

**Example:**
```bash
GET /search?q=united
```

### Get Statistics
```http
GET /stats
```
Returns global statistics including total population, most/least populous countries, and country counts by region.

### Get Country Flag
```http
GET /countries/{code}/flag
```
Returns just the flag emoji.

## 🎯 Use Cases

- **Learning & Education** - Build geography quiz apps
- **Testing & Development** - Populate dropdowns and forms with real data
- **Prototypes & Demos** - Quick country data for MVPs
- **Data Visualization** - Create maps and charts
- **Mobile Apps** - Country pickers with flags
- **Tutorials** - Teach API consumption and async programming

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Deploy to Cloudflare
npm run deploy
```

## 📊 Data Fields

Each country includes:
- `name` - Country name
- `code` - 2-letter ISO code
- `alpha3Code` - 3-letter ISO code
- `capital` - Capital city
- `region` - Geographic region
- `subregion` - Geographic subregion
- `population` - Estimated total population
- `languages` - Official languages, with principal or recorded-use languages where no national official-language list is available
- `currency` - Currency code
- `flag` - Flag emoji
- `callingCode` - International dialing prefix; Vatican City uses Italy’s `+39` plan

### Population data

Population figures are estimates, not live counts. The 195 records with World Bank coverage use the latest available `Population, total` series (2025 midyear estimates, updated 11 November 2026). Taiwan uses its latest household registration figure (about 23,204,000 at the end of October 2026). Vatican City uses the UK Permanent Committee on Geographical Names' 2025 estimate (750). Figures use different reference dates and methods, so small differences from national counts are expected.

Sources and attribution:

- World Bank Group, [World Development Indicators, `Population, total` (SP.POP.TOTL)](https://data.worldbank.org/indicator/SP.POP.TOTL), 2025 data, retrieved 19 November 2026; and the World Bank country record for Kosovo’s `XKX` alpha-3 code. Data is provided under [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses). This dataset adapts it by selecting country records, combining it with the Taiwan and Vatican City figures below, and using the Kosovo code from the [World Bank country API](https://api.worldbank.org/v2/country/XK?format=json).
- Department of Household Registration, Ministry of the Interior (Taiwan), “Household registration statistics data analysis in Oct 2026” (2026), [source](https://www.ris.gov.tw/info-liferay/app/channel/newsEnglish/1?view=top), [reuse terms](https://www.ris.gov.tw/app/en/133), [Open Government Data License v1.0](https://data.gov.tw/license). The Taiwan value is rounded to the approximate figure reported by the source.
- UK Permanent Committee on Geographical Names, *Toponymic Factfile: European Microstates* (January 2026), [source](https://assets.publishing.service.gov.uk/media/6968cbde6958e5645144b08d/European_Microstates_Toponymic_Factfile.pdf). The population figure is 750 (2025 data), Crown copyright, reusable under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

### Country metadata and attribution

- Country names, capitals, language statements, country-to-currency mappings, most calling codes, and most ISO codes use a snapshot of [Wikidata](https://www.wikidata.org/) structured data retrieved 19 November 2026. Wikidata releases structured data under [CC0](https://creativecommons.org/publicdomain/zero/1.0/). Values are selected from current statements; display names are normalized for common use. Wikidata recommends crediting it as the data source.
- Geographic regions and subregions use the `REGION_UN` and `SUBREGION` fields from Natural Earth’s [*Admin 0 – Countries* 1:10m dataset](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/), version 5.1.1, retrieved 19 November 2026. The dataset is [public domain](https://www.naturalearthdata.com/about/). Kosovo is matched to Natural Earth’s `KOS` record.
- Kosovo’s `alpha3Code` (`XKX`) uses the World Bank country record for Kosovo; other country codes use Wikidata. The World Bank’s data is provided under [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses).
- Equatorial Guinea’s capital, Ciudad de la Paz, follows [Decree-Law No. 1/2026](https://www.guineaecuatorialpress.com/noticias/decreto_ley_por_el_que_se_declara_la_ciudad_de_la_paz_djibloho_capital_de_la_republica_de_guinea_ecuatorial). English is listed for the United States under [Executive Order 14224](https://www.whitehouse.gov/presidential-actions/2025/03/designating-english-as-the-official-language-of-the-united-states/). Uruguay’s language list uses Wikidata’s recorded-use statements because it has no national official-language statement there.
- Vatican City’s calling prefix is `+39`, its current Italian-plan prefix; the Vatican’s separate `+379` code is assigned but not currently used ([Vatican Telephone Service](https://www.vaticanstate.va/it/le-direzioni/direzione-delle-telecomunicazioni-e-dei-sistemi-informatici/servizio-reti-e-telefonia.html), [Vatican general information](https://www.vatican.va/roman_curia/secretariat_state/documents/informazione_generale/sp_ss_scv_info-generale_en.html)).
- Currency code values are checked against the current ISO 4217 list maintained by [SIX](https://www.six-group.com/en/products-services/financial-information/market-reference-data/data-standards.html); the country-to-currency mappings come from Wikidata.
- Flag emoji are generated from the country’s two-letter code; no flag artwork is copied.

The dataset combines these sources and retains their applicable reuse terms. World Bank data is attributed above and licensed CC BY 4.0; Taiwan’s population figure follows Taiwan’s Open Government Data License v1.0; the UK PCGN figure follows the Open Government Licence v3.0; Wikidata data is CC0; Natural Earth data is public domain. The repository’s MIT license applies to API software, not to the country dataset.

## 📖 Full Documentation

Visit the API root endpoint for complete documentation:
```bash
GET /
```

## 📝 License

The API software is MIT licensed. Country data has source-specific terms; see [Country metadata and attribution](#country-metadata-and-attribution) and [Population data](#population-data).
