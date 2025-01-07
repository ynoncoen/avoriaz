// api/src/restaurants/restaurants.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import restaurantData from '../data/restaurant-data.json';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
): Promise<void> {
    // Handle CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    try {
        // Set cache control headers to cache the response for 1 hour
        response.setHeader('Cache-Control', 's-maxage=3600');
        response.status(200).json(restaurantData);
    } catch (error) {
        console.error('Error serving restaurant data:', error);
        response.status(500).json({ error: 'Failed to fetch restaurant data' });
    }
}