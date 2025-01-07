// src/lib/register-sw.ts
import { subscribeToPushNotifications } from './notifications';

export async function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
            // Register the service worker
            const registration = await navigator.serviceWorker.register('/avoriaz/sw.js', {
                scope: '/avoriaz/',
                // Enable the service worker to handle push events immediately
                updateViaCache: 'none'
            });
            console.log('ServiceWorker registration successful');

            // Subscribe to push notifications
            const subscribed = await subscribeToPushNotifications(registration);
            if (subscribed) {
                console.log('Successfully subscribed to push notifications');
            }

            // Ensure the service worker is always up to date
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated') {
                            console.log('New service worker activated');
                        }
                    });
                }
            });

        } catch (error) {
            console.error('ServiceWorker registration failed:', error);
        }
    }
}