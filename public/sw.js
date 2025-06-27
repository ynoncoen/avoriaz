const CACHE_NAME = `ski-v${Date.now()}`;

// Add whichever assets you want to pre-cache here
const PRECACHE_ASSETS = [
    '/ski/',
    '/ski/favicon.ico',
    '/ski/manifest.json'
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
    // Skip caching for HTML pages to allow updates
    if (event.request.mode === 'navigate' || 
        (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
        return;
    }

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

// Periodic background sync to keep service worker alive
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'keep-alive') {
        console.log('Periodic sync triggered');
        event.waitUntil(
            // Ping our API to keep the connection alive
            fetch('https://ynon-ski-api.vercel.app/api/ping', { mode: 'no-cors' })
        );
    }
});

// Handle push notifications
self.addEventListener('push', (event) => {
    if (!event.data) {
        console.log('Push event but no data');
        return;
    }

    try {
        const data = event.data.json();
        console.log('Push notification received:', data);

        const options = {
            body: data.body,
            icon: data.icon || '/ski/favicon-192x192.png',
            badge: '/ski/favicon-32x32.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                url: data.url || '/ski/'
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    } catch (error) {
        console.error('Error processing push notification:', error);
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event);
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Try to focus an existing window
                const hadWindowToFocus = clientList.some((client) => {
                    if (client.url === event.notification.data.url) {
                        return client.focus();
                    }
                    return false;
                });

                // If no existing window found - open a new one
                if (!hadWindowToFocus) {
                    clients.openWindow(event.notification.data.url)
                        .then((windowClient) => windowClient?.focus());
                }
            })
    );
});