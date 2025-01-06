export function registerServiceWorker() {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/avoriaz/sw.js', { scope: '/avoriaz/' })
                .then((registration) => {
                    console.log('ServiceWorker registration successful');
                })
                .catch((err) => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
}