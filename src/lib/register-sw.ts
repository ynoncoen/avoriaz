// src/lib/register-sw.ts
import { subscribeToPushNotifications } from './notifications';

export async function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        try {
            // Register the service worker
            const registration = await navigator.serviceWorker.register('/ski/sw.js', {
                scope: '/ski/',
                // Enable the service worker to handle push events immediately
                updateViaCache: 'none'
            });
            console.log('ServiceWorker registration successful');

            // Subscribe to push notifications
            const subscribed = await subscribeToPushNotifications(registration);
            if (subscribed) {
                console.log('Successfully subscribed to push notifications');
            }

            // Handle service worker updates
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New update available
                            if (confirm('New version available! Reload to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                }
            });

            // Check for updates every 5 minutes
            setInterval(() => {
                registration.update();
            }, 5 * 60 * 1000);

        } catch (error) {
            console.error('ServiceWorker registration failed:', error);
        }
    }
}