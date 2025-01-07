import { VercelRequest, VercelResponse } from '@vercel/node';
import { saveSubscription } from '../services/push-service';
import { PushSubscription } from '../types/push';

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
): Promise<void> {
    // Handle CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    if (request.method !== 'POST') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const subscription = request.body as PushSubscription;
        await saveSubscription(subscription);

        response.status(201).json({ message: 'Subscription saved' });
    } catch (error) {
        console.error('Error saving subscription:', error);
        response.status(500).json({ error: 'Failed to save subscription' });
    }
}