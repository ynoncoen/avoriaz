const CACHE_NAME = 'avoriaz-v1';

// Add whichever assets you want to pre-cache here
const PRECACHE_ASSETS = [
    '/avoriaz/',
    '/avoriaz/favicon.ico',
    '/avoriaz/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            ).then(() => {
                // Take control of all pages immediately
                self.clients.claim();
            });
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request because it can only be used once
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(
                    (response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response because it can only be used once
                        const responseToCache = response.clone();

                        // Don't cache API responses
                        if (!event.request.url.includes('/api/')) {
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                        }

                        return response;
                    }
                );
            })
    );
});

// Handle push notifications
self.addEventListener('push', (event) => {
    if (!event.data) {
        console.log('Push event but no data');
        return;
    }

    const data = event.data.json();
    console.log('Push notification received:', data);

    const options = {
        body: data.body,
        icon: '/favicon-192x192.png',
        badge: '/favicon-32x32.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                const hadWindowToFocus = clientList.some((client) => {
                    if (client.url === event.notification.data.url) {
                        return client.focus();
                    }
                    return false;
                });

                if (!hadWindowToFocus) {
                    clients.openWindow(event.notification.data.url)
                        .then((windowClient) => windowClient?.focus());
                }
            })
    );
});

// Log any errors
self.addEventListener('error', (event) => {
    console.error('Service Worker error:', event.error);
});