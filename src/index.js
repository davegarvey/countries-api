import { handleHome, handleDocs, handleCountries, handleOpenAPI } from './handlers.js';
import { homepageHTML, docsHTML } from './html/templates.js';
import openapi from '../openapi.json' assert { type: "json" };

function corsHeaders() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
    };
}

const elaborateHomepageHTML = `<!DOCTYPE html>
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

const redocHTML = `<!DOCTYPE html>
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
    <script src="https://cdn.jsdelivr.net/npm/redoc@latest/bundles/redoc.standalone.js"></script>
</body>
</html>`;

export default {
    async fetch(request, env) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders() });
        }

        if (env.DISABLED === 'true') {
            return new Response('API temporarily disabled', { status: 503 });
        }

        const url = new URL(request.url);

        if (url.pathname === '/') {
            return new Response(elaborateHomepageHTML, {
                headers: { 'Content-Type': 'text/html', ...corsHeaders() }
            });
        }

        if (url.pathname === '/docs') {
            return new Response(redocHTML, {
                headers: { 'Content-Type': 'text/html', ...corsHeaders() }
            });
        }

        if (url.pathname === '/openapi.json') {
            return new Response(JSON.stringify(openapi), {
                headers: { 'Content-Type': 'application/json', ...corsHeaders() }
            });
        }

        if (url.pathname === '/countries') {
            const response = handleCountries(url.searchParams);
            return new Response(
                typeof response.body === 'string' ? response.body : JSON.stringify(response.body),
                { headers: { ...response.headers, ...corsHeaders() } }
            );
        }

        return new Response('Not Found', { status: 404 });
    }
};
