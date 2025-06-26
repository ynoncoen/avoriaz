// api/src/scheduled/daily-restaurant.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { broadcastNotification } from '../services/push-service';
import restaurantData from '../data/restaurant-data.json';

interface Restaurant {
    date: string;
    time: string;
    name: string;
    address: string;
    comment?: string;
}

function getTodayBooking(): Restaurant | null {
    const today = new Date();
    const dateStr = `${today.getDate()}.${today.getMonth() + 1}`;

    return restaurantData.bookings.find(booking => booking.date === dateStr) || null;
}

function isWithinNotificationPeriod(): boolean {
    const today = new Date();
    
    // Trip dates: January 17-24, 2026
    // Notification period: 1 week before (January 10) until end of trip (January 24)
    const notificationStartDate = new Date('2026-01-10T00:00:00Z');
    const tripEndDate = new Date('2026-01-24T23:59:59Z');
    
    return today >= notificationStartDate && today <= tripEndDate;
}

export default async function handler(
    request: VercelRequest,
    response: VercelResponse
): Promise<void> {
    // Handle CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.setHeader('Access-Control-Max-Age', '86400');

    // Handle preflight request
    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    try {
        // Only allow cron job requests
        const authHeader = request.headers.authorization;
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            response.status(401).json({ error: 'Unauthorized' });
            return;
        }

        // Check if we're within the notification period (1 week before trip until end of trip)
        if (!isWithinNotificationPeriod()) {
            response.status(200).json({
                message: 'Outside notification period - no notification sent',
                type: 'outside_period',
                currentDate: new Date().toISOString(),
                notificationPeriod: {
                    start: '2026-01-10',
                    end: '2026-01-24'
                }
            });
            return;
        }

        const booking = getTodayBooking();

        // Send notification regardless of whether there's a booking or not
        if (!booking) {
            await broadcastNotification({
                title: '🍽️ No Restaurant Today',
                body: 'No restaurant for today. Are we going hungry? 😅',
                url: '/avoriaz/#restaurants',
                icon: '/avoriaz/favicon-192x192.png'
            });

            response.status(200).json({
                message: 'No restaurant notification sent',
                type: 'no_booking'
            });
            return;
        }

        // Create notification message for booked restaurant
        const message = `🍽️ Tonight's Dinner at ${booking.name}\n` +
            `Time: ${booking.time}\n` +
            `Location: ${booking.address}` +
            (booking.comment ? `\nNote: ${booking.comment}` : '');

        // Send notification
        await broadcastNotification({
            title: '🍽️ Restaurant Reminder',
            body: message,
            url: '/avoriaz/#restaurants',
            icon: '/avoriaz/favicon-192x192.png'
        });

        response.status(200).json({
            message: 'Restaurant notification sent successfully',
            booking
        });
    } catch (error) {
        console.error('Error in daily restaurant handler:', error);
        response.status(500).json({ error: 'Failed to send restaurant notification' });
    }
}