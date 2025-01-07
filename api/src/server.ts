import express from 'express';
import cors from 'cors';
import handler from './weather/weather';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://ynoncoen.github.io',
    ],
    methods: ['GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
}));

// Convert Express request/response to Vercel-compatible format
app.get('/api/weather', async (req, res) => {
    try {
        // Create a minimal VercelRequest-like object
        const vercelReq = {
            query: req.query,
            cookies: req.cookies,
            headers: req.headers,
            body: req.body,
            method: req.method,
        };

        // Create a minimal VercelResponse-like object
        const vercelRes = {
            status: (statusCode: number) => ({
                json: (data: any) => res.status(statusCode).json(data),
                end: () => res.status(statusCode).end(),
            }),
            setHeader: (name: string, value: string) => res.setHeader(name, value),
        };

        // Call the Vercel handler with our adapted request/response objects
        await handler(vercelReq as any, vercelRes as any);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Handle preflight requests
app.options('/api/weather', (req, res) => {
    res.status(200).end();
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Weather API endpoint: http://localhost:${port}/api/weather`);
});