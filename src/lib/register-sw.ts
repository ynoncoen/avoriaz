// src/lib/register-sw.ts
import { subscribeToPushNotifications } from './notifications';

async function registerPeriodicSync(registration: ServiceWorkerRegistration) {
    try {
        if ('periodicSync' in registration) {
            // @ts-ignore - TypeScript doesn't know about periodicSync yet
            const status = await navigator.permissions.query({
                name: 'periodic-background-sync',
            });

            if (status.state === 'granted') {
                try {
                    // @ts-ignore
                    await registration.periodicSync.register('keep-alive', {
                        minInterval: 15 * 60 * 1000, // 15 minutes
                    });
                    console.log('Periodic sync registered');
                } catch (error) {
                    console.error('Error registering periodic sync:', error);
                }
            }
        }
    } catch (error) {
        console.error('Error setting up periodic sync:', error);
    }
}

export async function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
            // Register the service worker
            const registration = await navigator.serviceWorker.register('/avoriaz/sw.js', {
                scope: '/avoriaz/',
            });
            console.log('ServiceWorker registration successful');

            // Set up periodic sync
            await registerPeriodicSync(registration);

            // Subscribe to push notifications
            const subscribed = await subscribeToPushNotifications(registration);
            if (subscribed) {
                console.log('Successfully subscribed to push notifications');
            }

            // Set up a periodic check for service worker state
            setInterval(async () => {
                try {
                    const newRegistration = await navigator.serviceWorker.ready;
                    if (newRegistration.active) {
                        // Send a message to keep the service worker alive
                        newRegistration.active.postMessage({ type: 'keepAlive' });
                    }
                } catch (error) {
                    console.error('Error in service worker check:', error);
                }
            }, 5 * 60 * 1000); // Every 5 minutes

        } catch (error) {
            console.error('ServiceWorker registration failed:', error);
        }
    }
}