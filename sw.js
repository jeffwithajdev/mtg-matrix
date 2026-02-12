const CACHE_NAME = 'matrix-v4-force-update'; // Changed name to force a reset

self.addEventListener('install', (event) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    // This wipes out the old "Ghost" cache
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(names.map(name => caches.delete(name)));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('api.scryfall.com')) {
        return fetch(event.request);
    }
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
