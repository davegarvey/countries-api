import countries from '../data/countries.json';

export default {
    async fetch(request, env) {
        if (env.DISABLED === 'true') {
            return new Response('API temporarily disabled', { status: 503 });
        }

        const url = new URL(request.url);
        const path = url.pathname.split('/').filter(Boolean);

        if (path[0] === 'countries') {
            const code = path[1];
            if (code) {
                const country = countries.find(c => c.code.toUpperCase() === code.toUpperCase());
                return country
                    ? Response.json(country)
                    : new Response('Not found', { status: 404 });
            }

            const region = url.searchParams.get('region');
            const result = region
                ? countries.filter(c => c.region.toLowerCase() === region.toLowerCase())
                : countries;

            return Response.json(result);
        }

        return new Response(
            'Welcome to the Countries API!\nTry /countries or /countries/FR',
            { headers: { 'Content-Type': 'text/plain' } }
        );
    },
};
