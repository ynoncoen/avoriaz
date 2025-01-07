import webPush from 'web-push';
import redis from '../lib/redis';
import { PushSubscription, NotificationPayload } from '../types/push';

// Configure web-push with your VAPID keys
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY || '',
    privateKey: process.env.VAPID_PRIVATE_KEY || '',
};

webPush.setVapidDetails(
    'mailto:ynoncoen@gmail.com', // Replace with your email
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export async function saveSubscription(subscription: PushSubscription): Promise<void> {
    try {
        // Use subscription.endpoint as a unique identifier
        // Set expiration to 1 year (in seconds)
        await redis.set(
            `push:${subscription.endpoint}`,
            JSON.stringify(subscription),
            { ex: 365 * 24 * 60 * 60 }
        );
    } catch (error) {
        console.error('Error saving push subscription:', error);
        throw error;
    }
}

export async function deleteSubscription(endpoint: string): Promise<void> {
    try {
        await redis.del(`push:${endpoint}`);
    } catch (error) {
        console.error('Error deleting push subscription:', error);
        throw error;
    }
}

export async function sendNotification(
    subscription: PushSubscription,
    payload: NotificationPayload
): Promise<boolean> {
    try {
        await webPush.sendNotification(
            subscription as webPush.PushSubscription,
            JSON.stringify(payload)
        );
        return true;
    } catch (error) {
        if ((error as any).statusCode === 404 || (error as any).statusCode === 410) {
            // Subscription has expired or is invalid
            await deleteSubscription(subscription.endpoint);
            return false;
        }
        throw error;
    }
}

export async function broadcastNotification(payload: NotificationPayload): Promise<void> {
    try {
        // Get all subscription keys
        const [_, keys] = await redis.scan(0, { match: 'push:*', count: 100 });

        if (keys.length > 0) {
            // Get all subscriptions
            const subscriptions = await redis.mget<string[]>(...keys);

            // Send notifications to all valid subscriptions
            await Promise.all(
                subscriptions
                    .filter((sub): sub is string => sub !== null)
                    .map((sub) => {
                        const subscription = JSON.parse(sub) as PushSubscription;
                        return sendNotification(subscription, payload).catch(console.error);
                    })
            );
        }
    } catch (error) {
        console.error('Error broadcasting notification:', error);
        throw error;
    }
}

// Function to send weather alerts
export async function sendWeatherAlert(
    snowAmount: number,
    date: string
): Promise<void> {
    if (snowAmount >= 10) {
        await broadcastNotification({
            title: '❄️ Fresh Powder Alert!',
            body: `${snowAmount}cm of fresh snow expected on ${date}! Get ready for perfect conditions!`,
            url: '/avoriaz/#weather',
            icon: '/avoriaz/icon-192x192.png',
        });
    }
}

// Function to send restaurant reminders
export async function sendRestaurantReminder(
    restaurantName: string,
    time: string,
): Promise<void> {
    await broadcastNotification({
        title: '🍽️ Restaurant Reminder',
        body: `Don't forget your reservation at ${restaurantName} at ${time} today!`,
        url: '/avoriaz/#restaurants',
        icon: '/avoriaz/icon-192x192.png',
    });
}