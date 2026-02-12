const CACHE_NAME = 'matrix-cache-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting(); // Forces the new version to take over immediately
});

self.addEventListener('fetch', (event) => {
  // Ignore API calls to Scryfall - always go to live internet
  if (event.request.url.includes('api.scryfall.com')) {
    return fetch(event.request);
  }

  // Network First Strategy for everything else
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
