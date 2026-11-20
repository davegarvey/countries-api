# Countries API

A free, read-only REST API for country data, intended for testing, demos, prototypes and teaching.

It serves 197 records: the 193 UN member states, the two UN observer states (Palestine and Vatican City), Kosovo and Taiwan. Each record includes names, ISO codes, capital, region, population, languages, currency, flag emoji and calling code. No authentication is required, CORS is enabled for all origins, and responses are indented JSON. The API runs on [Cloudflare Workers](https://developers.cloudflare.com/workers/).

**Live API:** [https://countries-api.davegarvey.workers.dev](https://countries-api.davegarvey.workers.dev) · **Interactive docs:** [/docs](https://countries-api.davegarvey.workers.dev/docs) · **OpenAPI spec:** [/openapi.json](https://countries-api.davegarvey.workers.dev/openapi.json)

## Quick start

```bash
# All countries
curl https://countries-api.davegarvey.workers.dev/countries

# One country by ISO code
curl https://countries-api.davegarvey.workers.dev/countries/US

# A random country
curl https://countries-api.davegarvey.workers.dev/countries/random

# Countries in Europe
curl "https://countries-api.davegarvey.workers.dev/countries?region=Europe"

# Countries whose name or capital contains "island"
curl "https://countries-api.davegarvey.workers.dev/search?q=island"
```

Example response from `GET /countries/US`:

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

## Endpoints

All endpoints accept `GET` only.

| Endpoint | Returns |
| --- | --- |
| `/countries` | All countries, optionally filtered (see below) |
| `/countries/{code}` | One country by two-letter (`US`) or three-letter (`USA`) ISO code, case-insensitive; `404` if not found |
| `/countries/{code}/flag` | The flag emoji as plain text |
| `/countries/{code}/neighbors` | Other countries in the same subregion. These are not necessarily countries that share a border |
| `/countries/random` | One country chosen at random |
| `/search?q={query}` | Countries whose name or capital contains `query`, as `{ query, count, results }`; `400` if `q` is missing |
| `/regions`, `/subregions`, `/currencies`, `/languages` | Sorted lists of the distinct values in the dataset |
| `/stats` | Totals for countries, population, regions, subregions, currencies and languages; country counts by region; the most and least populous countries |
| `/docs` | Interactive documentation |
| `/openapi.json` | OpenAPI 3.0 specification |

### Filters on `/countries`

Filters are case-insensitive and can be combined, for example `/countries?region=Africa&language=French&limit=5`.

| Parameter | Matching | Example |
| --- | --- | --- |
| `region` | Exact: `Africa`, `Americas`, `Asia`, `Europe` or `Oceania` | `region=Europe` |
| `subregion` | Contains | `subregion=Western` |
| `currency` | Exact ISO 4217 code | `currency=EUR` |
| `language` | Contains | `language=Spanish` |
| `limit` | Positive integer; returns the first *n* results | `limit=10` |

## Data fields

| Field | Description |
| --- | --- |
| `name` | Common English name |
| `code` | ISO 3166-1 alpha-2 code. Kosovo, which has no ISO code, uses the widely adopted `XK` |
| `alpha3Code` | ISO 3166-1 alpha-3 code. Kosovo uses the World Bank's `XKX` |
| `capital` | Capital city |
| `region` | Geographic region |
| `subregion` | Geographic subregion |
| `population` | Estimated total population; see [Population data](#population-data) |
| `languages` | Official languages; where no national official-language list exists, principal or recorded-use languages |
| `currency` | ISO 4217 code of the main currency. Each country has one value, so secondary currencies are omitted |
| `flag` | Flag emoji generated from `code` |
| `callingCode` | International dialling prefix |

## Sources

### Population data

Population figures are estimates, not live counts. Sources use different reference dates and methods, so small differences from national figures are expected.

- **195 records:** World Bank Group, [World Development Indicators, `Population, total` (SP.POP.TOTL)](https://data.worldbank.org/indicator/SP.POP.TOTL), 2025 midyear estimates (series updated 11 November 2026, retrieved 19 November 2026). Licensed under [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses). This dataset adapts it by selecting country records and combining them with the two figures below.
- **Taiwan:** Department of Household Registration, Ministry of the Interior, “Household registration statistics data analysis in Oct 2026” (2026), [source](https://www.ris.gov.tw/info-liferay/app/channel/newsEnglish/1?view=top). Household registration figure for the end of October 2026, rounded to the approximate value the source reports (about 23,204,000). Licensed under the [Open Government Data License v1.0](https://data.gov.tw/license) ([provider's reuse terms](https://www.ris.gov.tw/app/en/133)).
- **Vatican City:** UK Permanent Committee on Geographical Names (PCGN), *Toponymic Factfile: European Microstates* (January 2026), [source](https://assets.publishing.service.gov.uk/media/6968cbde6958e5645144b08d/European_Microstates_Toponymic_Factfile.pdf). 2025 estimate of 750. © Crown copyright 2026, licensed under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/).

### Other fields

- **Names, capitals, languages, currencies, calling codes and ISO codes:** a snapshot of [Wikidata](https://www.wikidata.org/) taken on 19 November 2026, using current statements. Display names are normalised for common use. Wikidata's structured data is released under [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
- **Kosovo's `alpha3Code`:** the World Bank's [country record](https://api.worldbank.org/v2/country/XK?format=json), licensed under [CC BY 4.0](https://datacatalog.worldbank.org/public-licenses).
- **Regions and subregions:** the `REGION_UN` and `SUBREGION` fields of Natural Earth's [*Admin 0 – Countries* 1:10m dataset](https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/), version 5.1.1, retrieved 19 November 2026. Kosovo is matched to Natural Earth's `KOS` record. Natural Earth data is in the [public domain](https://www.naturalearthdata.com/about/).
- **Currency codes:** checked against the current ISO 4217 list maintained by [SIX](https://www.six-group.com/en/products-services/financial-information/market-reference-data/data-standards.html).
- **Flags:** emoji generated from each country's two-letter code. No flag artwork is copied.

### Data notes

Some values depart from a plain reading of the sources or need explaining:

- **Equatorial Guinea:** the capital is Ciudad de la Paz, following [Decree-Law No. 1/2026](https://www.guineaecuatorialpress.com/noticias/decreto_ley_por_el_que_se_declara_la_ciudad_de_la_paz_djibloho_capital_de_la_republica_de_guinea_ecuatorial).
- **United States:** English is listed as the official language under [Executive Order 14224](https://www.whitehouse.gov/presidential-actions/2025/03/designating-english-as-the-official-language-of-the-united-states/).
- **Uruguay:** Wikidata has no national official-language statement, so its recorded-use statements are used.
- **Vatican City:** the calling code is `+39`, from the Italian numbering plan. The Vatican's own `+379` code is assigned but not in use ([Vatican Telephone Service](https://www.vaticanstate.va/it/le-direzioni/direzione-delle-telecomunicazioni-e-dei-sistemi-informatici/servizio-reti-e-telefonia.html), [Vatican general information](https://www.vatican.va/roman_curia/secretariat_state/documents/informazione_generale/sp_ss_scv_info-generale_en.html)).

## Licences

**Software:** the API code is released under the [MIT License](LICENSE). The MIT License does not cover the country data.

**Data:** each source keeps its own terms.

- Wikidata data (CC0) and Natural Earth data (public domain) can be reused without conditions. They are credited above as a courtesy, and Wikidata asks to be credited.
- The `population` field and Kosovo's `alpha3Code` come from sources that require attribution. If you redistribute them, include the following credits and say whether you changed the data:
  - World Bank: *Source: World Bank, World Development Indicators, Population, total (SP.POP.TOTL), licensed under CC BY 4.0.*
  - Taiwan: *Department of Household Registration, Ministry of the Interior, 2026, Household registration statistics data analysis in Oct 2026. The Open Data is made available to the public under the Open Government Data License; users may use it subject to the licence's terms. Open Government Data License: https://data.gov.tw/license*
  - UK PCGN: *Contains public sector information licensed under the Open Government Licence v3.0.*

The Taiwan statement follows the attribution format set out in the licence's annex. Its second sentence is translated from the licence's Chinese text.

## Development

```bash
npm install      # install dependencies
npm run dev      # run locally with Wrangler
npm run deploy   # deploy to Cloudflare Workers
```
