importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  workbox.core.setCacheNameDetails({prefix: 'east-ville'});

  // Precache manifest will be injected by Workbox CLI if used
  self.__WB_MANIFEST = self.__WB_MANIFEST || [];
  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  // Cache images with a cache-first strategy
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
      cacheName: 'images-cache-v1',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // Cache CSS and JS with a stale-while-revalidate strategy
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-resources-v1',
    })
  );

  // Fallback to network if not cached
  workbox.routing.setDefaultHandler(new workbox.strategies.NetworkFirst());

  // Clean up old caches
  self.addEventListener('activate', (event) => {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => !cacheName.startsWith('east-ville')).map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  });

  console.log('Workbox service worker loaded');
} else {
  console.log('Workbox could not be loaded.');
} 