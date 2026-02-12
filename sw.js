self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('mtg-matrix-v1').then((cache) => cache.addAll([
      'index.html',
      'manifest.json'
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  // DO NOT cache API calls, only local app files
  if (e.request.url.includes('api.scryfall.com')) {
    return; 
  }
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
