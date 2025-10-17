import countries from '../data/countries.json';

// Helper to add CORS headers
function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

// Helper to create JSON response with CORS
function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data, null, 2), {
        status,
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(),
        },
    });
}

export default {
    async fetch(request, env) {
        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders() });
        }

        if (env.DISABLED === 'true') {
            return new Response('API temporarily disabled', { status: 503 });
        }

        const url = new URL(request.url);
        const path = url.pathname.split('/').filter(Boolean);

        // Root endpoint - HTML documentation
        if (path.length === 0) {
            const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Countries API - Free REST API for Country Data</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            overflow: hidden;
        }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        h1 { font-size: 2.5em; margin-bottom: 10px; }
        .subtitle { font-size: 1.2em; opacity: 0.95; }
        .content { padding: 40px; }
        h2 { color: #667eea; margin: 30px 0 20px 0; font-size: 1.8em; }
        .endpoint {
            background: #f7f9fc;
            border-left: 4px solid #667eea;
            padding: 15px 20px;
            margin: 15px 0;
            border-radius: 4px;
        }
        .endpoint-title {
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #667eea;
            font-size: 1.1em;
        }
        .endpoint-desc { color: #666; margin-top: 5px; }
        .try-link {
            display: inline-block;
            margin-top: 8px;
            color: #667eea;
            text-decoration: none;
            font-size: 0.9em;
        }
        .try-link:hover { text-decoration: underline; }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .feature {
            background: #f7f9fc;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .feature-icon { font-size: 2em; margin-bottom: 10px; }
        .feature-title { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background: #f7f9fc;
            color: #666;
            border-top: 1px solid #e0e0e0;
        }
        .examples {
            background: #2d3748;
            color: #e2e8f0;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }
        .examples div { margin: 8px 0; }
        .comment { color: #68d391; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🌍 Countries API</h1>
            <p class="subtitle">Free REST API for country data - perfect for testing, demos & learning</p>
        </header>

        <div class="content">
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🌐</div>
                    <div class="feature-title">195 Countries</div>
                    <div>Complete global dataset</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">No Auth Required</div>
                    <div>Open API, start immediately</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎨</div>
                    <div class="feature-title">Rich Data</div>
                    <div>Flags, populations, currencies & more</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🚀</div>
                    <div class="feature-title">CORS Enabled</div>
                    <div>Use from any frontend</div>
                </div>
            </div>

            <h2>Quick Examples</h2>
            <div class="examples">
<div><span class="comment"># Get all countries</span></div>
<div>curl ${url.origin}/countries</div>
<div></div>
<div><span class="comment"># Get a specific country</span></div>
<div>curl ${url.origin}/countries/US</div>
<div></div>
<div><span class="comment"># Get a random country</span></div>
<div>curl ${url.origin}/countries/random</div>
<div></div>
<div><span class="comment"># Filter by region</span></div>
<div>curl ${url.origin}/countries?region=Europe</div>
<div></div>
<div><span class="comment"># Search countries</span></div>
<div>curl ${url.origin}/search?q=island</div>
            </div>

            <h2>Popular Endpoints</h2>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries</div>
                <div class="endpoint-desc">Get all countries with complete data</div>
                <a href="/countries" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries/{code}</div>
                <div class="endpoint-desc">Get specific country by code (e.g., US, FR, JPN)</div>
                <a href="/countries/US" class="try-link">Try /countries/US →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries/random</div>
                <div class="endpoint-desc">Get a random country - perfect for testing!</div>
                <a href="/countries/random" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries?region={region}</div>
                <div class="endpoint-desc">Filter by region: Africa, Americas, Asia, Europe, Oceania</div>
                <a href="/countries?region=Europe" class="try-link">Try /countries?region=Europe →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries?currency={currency}</div>
                <div class="endpoint-desc">Filter by currency code</div>
                <a href="/countries?currency=EUR" class="try-link">Try /countries?currency=EUR →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries?language={language}</div>
                <div class="endpoint-desc">Filter by language</div>
                <a href="/countries?language=Spanish" class="try-link">Try /countries?language=Spanish →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /search?q={query}</div>
                <div class="endpoint-desc">Search countries by name or capital</div>
                <a href="/search?q=united" class="try-link">Try /search?q=united →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /stats</div>
                <div class="endpoint-desc">Global statistics and analytics</div>
                <a href="/stats" class="try-link">Try it →</a>
            </div>

            <h2>More Endpoints</h2>
            <div class="endpoint">
                <div class="endpoint-title">GET /regions</div>
                <div class="endpoint-desc">Get all unique regions</div>
                <a href="/regions" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /subregions</div>
                <div class="endpoint-desc">Get all unique subregions</div>
                <a href="/subregions" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /currencies</div>
                <div class="endpoint-desc">Get all unique currencies</div>
                <a href="/currencies" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /languages</div>
                <div class="endpoint-desc">Get all unique languages</div>
                <a href="/languages" class="try-link">Try it →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries/{code}/flag</div>
                <div class="endpoint-desc">Get just the flag emoji</div>
                <a href="/countries/US/flag" class="try-link">Try /countries/US/flag →</a>
            </div>

            <div class="endpoint">
                <div class="endpoint-title">GET /countries/{code}/neighbors</div>
                <div class="endpoint-desc">Get neighboring countries by subregion</div>
                <a href="/countries/FR/neighbors" class="try-link">Try /countries/FR/neighbors →</a>
            </div>

            <h2>Data Fields</h2>
            <p>Each country includes: <code>name</code>, <code>code</code>, <code>alpha3Code</code>, <code>capital</code>, <code>region</code>, <code>subregion</code>, <code>population</code>, <code>languages</code>, <code>currency</code>, <code>flag</code>, <code>callingCode</code></p>

            <h2>Use Cases</h2>
            <p>Perfect for learning, testing, prototypes, quiz apps, data visualization, country pickers, tutorials, and more!</p>
        </div>

        <div class="footer">
            <p>Built with ❤️ • Powered by Cloudflare Workers • No authentication required</p>
            <p style="margin-top: 10px;">Open source and free to use</p>
        </div>
    </div>
</body>
</html>`;
            return new Response(html, {
                headers: {
                    'Content-Type': 'text/html',
                    ...corsHeaders(),
                },
            });
        }

        // GET /countries
        if (path[0] === 'countries') {
            // GET /countries/random
            if (path[1] === 'random') {
                const randomCountry = countries[Math.floor(Math.random() * countries.length)];
                return jsonResponse(randomCountry);
            }

            // GET /countries/{code}
            if (path[1]) {
                const code = path[1].toUpperCase();
                const country = countries.find(
                    c => c.code.toUpperCase() === code || c.alpha3Code.toUpperCase() === code
                );

                if (!country) {
                    return jsonResponse({ error: 'Country not found' }, 404);
                }

                // GET /countries/{code}/flag
                if (path[2] === 'flag') {
                    return new Response(country.flag, {
                        headers: {
                            'Content-Type': 'text/plain; charset=utf-8',
                            ...corsHeaders()
                        },
                    });
                }

                // GET /countries/{code}/neighbors
                if (path[2] === 'neighbors') {
                    const neighbors = countries.filter(
                        c => c.subregion === country.subregion && c.code !== country.code
                    );
                    return jsonResponse({
                        country: country.name,
                        subregion: country.subregion,
                        neighbors: neighbors.map(c => ({ name: c.name, code: c.code, flag: c.flag })),
                    });
                }

                return jsonResponse(country);
            }

            // GET /countries with filters
            let result = [...countries];

            // Filter by region
            const region = url.searchParams.get('region');
            if (region) {
                result = result.filter(c => c.region.toLowerCase() === region.toLowerCase());
            }

            // Filter by subregion
            const subregion = url.searchParams.get('subregion');
            if (subregion) {
                result = result.filter(c => c.subregion.toLowerCase().includes(subregion.toLowerCase()));
            }

            // Filter by currency
            const currency = url.searchParams.get('currency');
            if (currency) {
                result = result.filter(c => c.currency.toUpperCase() === currency.toUpperCase());
            }

            // Filter by language
            const language = url.searchParams.get('language');
            if (language) {
                result = result.filter(c =>
                    c.languages.some(lang => lang.toLowerCase().includes(language.toLowerCase()))
                );
            }

            // Limit results
            const limit = url.searchParams.get('limit');
            if (limit) {
                const limitNum = parseInt(limit, 10);
                if (!isNaN(limitNum) && limitNum > 0) {
                    result = result.slice(0, limitNum);
                }
            }

            return jsonResponse(result);
        }

        // GET /regions
        if (path[0] === 'regions') {
            const regions = [...new Set(countries.map(c => c.region))].sort();
            return jsonResponse(regions);
        }

        // GET /subregions
        if (path[0] === 'subregions') {
            const subregions = [...new Set(countries.map(c => c.subregion))].sort();
            return jsonResponse(subregions);
        }

        // GET /currencies
        if (path[0] === 'currencies') {
            const currencies = [...new Set(countries.map(c => c.currency))].sort();
            return jsonResponse(currencies);
        }

        // GET /languages
        if (path[0] === 'languages') {
            const languages = [...new Set(countries.flatMap(c => c.languages))].sort();
            return jsonResponse(languages);
        }

        // GET /search?q=query
        if (path[0] === 'search') {
            const query = url.searchParams.get('q');
            if (!query) {
                return jsonResponse({ error: 'Query parameter "q" is required' }, 400);
            }

            const results = countries.filter(c =>
                c.name.toLowerCase().includes(query.toLowerCase()) ||
                c.capital.toLowerCase().includes(query.toLowerCase())
            );

            return jsonResponse({
                query,
                count: results.length,
                results,
            });
        }

        // GET /stats
        if (path[0] === 'stats') {
            const totalPopulation = countries.reduce((sum, c) => sum + c.population, 0);
            const regionCounts = countries.reduce((acc, c) => {
                acc[c.region] = (acc[c.region] || 0) + 1;
                return acc;
            }, {});

            const stats = {
                totalCountries: countries.length,
                totalPopulation,
                regions: Object.keys(regionCounts).length,
                subregions: new Set(countries.map(c => c.subregion)).size,
                currencies: new Set(countries.map(c => c.currency)).size,
                languages: new Set(countries.flatMap(c => c.languages)).size,
                countriesByRegion: regionCounts,
                mostPopulousCountry: countries.reduce((max, c) => c.population > max.population ? c : max),
                leastPopulousCountry: countries.reduce((min, c) => c.population < min.population ? c : min),
            };

            return jsonResponse(stats);
        }

        // 404 - Not found
        return jsonResponse({ error: 'Endpoint not found', message: 'Try GET / for API documentation' }, 404);
    },
};
