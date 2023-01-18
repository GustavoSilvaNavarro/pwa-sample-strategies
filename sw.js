const assets = ['/', 'styles.css', 'app.js', 'sw-register.js', 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('assets').then(cache => {
      cache.addAll(assets);
    })
  );
});

//* Cached First Strategy
self.addEventListener('fetch', e => {
  e.respondWith(
    // searching in the cache
    caches.match(e.request).then(response => {
      if (response) return response; // The request is in the cache | cache hit
      else return fetch(e.request);  // We need to go to the network | cache miss
    })
  );
});

// self.addEventListener('fetch', e => {
//   if (e.request.url === 'http://localhost:3000/fake') {
//     const resp = new Response(`Service Worker response on URL ${e.request.url}`);
//     e.respondWith(resp);
//   } else {
//     e.respondWith(
//       caches.match(e.request).then(cachedResponse => {
//         if (cachedResponse) {
//           return cachedResponse
//         } else {
//           return fetch(e.request);
//         }
//       })
//     );
//   }
// });