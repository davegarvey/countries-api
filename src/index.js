import countries from '../data/countries.json';
import openapi from '../openapi.json';

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

// Homepage HTML
const homepageHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Countries API - Free REST API for Country Data</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
        }
        .hero h1 { font-size: 2.5em; margin-bottom: 10px; }
        .hero p { font-size: 1.2em; opacity: 0.95; margin-bottom: 30px; }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            max-width: 1000px;
            margin: 30px auto;
            padding: 0 20px;
        }
        .feature {
            background: rgba(102, 126, 234, 0.1);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .feature-icon { font-size: 2em; margin-bottom: 10px; }
        .feature-title { font-weight: bold; color: #667eea; margin-bottom: 5px; }
        .section-title {
            max-width: 1000px;
            margin: 40px auto 20px;
            padding: 0 20px;
            font-size: 1.8em;
            color: #667eea;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            margin-bottom: 30px;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }
        .quick-links {
            max-width: 1000px;
            margin: 30px auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        .quick-link {
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            text-decoration: none;
            color: #667eea;
            font-weight: 500;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .quick-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .footer {
            text-align: center;
            padding: 30px 20px;
            background: #f7f9fc;
            color: #666;
            border-top: 1px solid #e0e0e0;
            margin-top: 60px;
        }
        .footer a {
            color: #667eea;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="hero">
        <h1>🌍 Countries API</h1>
        <p>Free REST API for country data - perfect for testing, demos & learning</p>
        <a href="/docs" class="cta-button">View Interactive Docs →</a>
    </div>

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

    <h2 class="section-title">Quick Start</h2>
    
    <div class="quick-links">
        <a href="/countries" class="quick-link">📋 All Countries</a>
        <a href="/countries/US" class="quick-link">🇺🇸 Get US Data</a>
        <a href="/countries/random" class="quick-link">🎲 Random Country</a>
        <a href="/countries?region=Europe" class="quick-link">🌍 Europe Only</a>
        <a href="/search?q=island" class="quick-link">🔍 Search Islands</a>
        <a href="/stats" class="quick-link">📊 Statistics</a>
    </div>

    <div class="footer">
        <p>Built with ❤️ 🤖 🐱 • <a href="https://github.com/davegarvey/countries-api" target="_blank">View source on GitHub</a> • Powered by Cloudflare Workers</p>
        <p style="margin-top: 10px; font-size: 0.9em;">Open source and free to use • No authentication required</p>
    </div>
</body>
</html>`;

// Docs HTML
const docsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Countries API - Documentation</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌍</text></svg>">
    <style>
        body { margin: 0; padding: 0; font-family: sans-serif; }
        redoc { display: block; }
    </style>
</head>
<body>
    <redoc spec-url="/openapi.json"></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"><\/script>
</body>
</html>`;

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

        // GET / - Homepage
        if (path.length === 0) {
            return new Response(homepageHTML, {
                headers: {
                    'Content-Type': 'text/html',
                    ...corsHeaders(),
                },
            });
        }

        // GET /docs - Interactive API documentation
        if (path[0] === 'docs') {
            return new Response(docsHTML, {
                headers: {
                    'Content-Type': 'text/html',
                    ...corsHeaders(),
                },
            });
        }

        // GET /openapi.json - Serve OpenAPI spec
        if (path[0] === 'openapi.json') {
            return jsonResponse(openapi);
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
        return jsonResponse({ error: 'Endpoint not found', message: 'Try GET / for homepage or /docs for API documentation' }, 404);
    },
};