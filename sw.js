const assets = ['/', 'styles.css', 'app.js', 'sw-register.js', 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('assets').then(cache => {
      cache.addAll(assets);
    })
  );
});

//* State while revalidate strategy
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      /**
       * Even if the response is in the cache, we fetch it
       * and update the cache for future usage
       */
      const fetchPromise = fetch(e.request).then(networkResponse => {
        caches.open('assets').then(cache => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });
      });

      //? We use the currently cached version if it's there
      return cachedResponse || fetchPromise; // cached or a network fetch
    })
  );
});

//* Cached First Strategy
// self.addEventListener('fetch', e => {
//   e.respondWith(
//     // searching in the cache
//     caches.match(e.request).then(response => {
//       if (response) return response; // The request is in the cache | cache hit
//       else return fetch(e.request);  // We need to go to the network | cache miss
//     })
//   );
// });
