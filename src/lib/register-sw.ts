import {subscribeToPushNotifications} from './notifications';

export function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        console.log("Registering service worker");
        window.addEventListener('load', async () => {
            try {
                const registration = await navigator.serviceWorker.register('/avoriaz/sw.js', {
                    scope: '/avoriaz/'
                });
                console.log('ServiceWorker registration successful');

                // After successful registration, subscribe to push notifications
                const subscribed = await subscribeToPushNotifications(registration);
                if (subscribed) {
                    console.log('Successfully subscribed to push notifications');
                }
            } catch (err) {
                console.error('ServiceWorker registration failed: ', err);
            }
        });
    }
}