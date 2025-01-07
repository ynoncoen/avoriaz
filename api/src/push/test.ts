import { VercelRequest, VercelResponse } from '@vercel/node';
import { broadcastNotification } from '../services/push-service';

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

    if (request.method !== 'GET') {
        response.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        await broadcastNotification({
            title: '🎉 Test Notification',
            body: 'If you see this, push notifications are working!',
            url: '/avoriaz/#weather',
            icon: '/avoriaz/icon-192x192.png',
        });

        response.status(200).json({ message: 'Test notification sent' });
    } catch (error) {
        console.error('Error sending test notification:', error);
        response.status(500).json({ error: 'Failed to send test notification' });
    }
}