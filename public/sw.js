// Service Worker for image caching and performance optimization

const CACHE_NAME = 'east-ville-v1';
const IMAGE_CACHE_NAME = 'east-ville-images-v1';

// Files to cache immediately
const STATIC_CACHE_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_CACHE_FILES);
      })
  );
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME)
        .then((cache) => {
          return cache.match(request)
            .then((response) => {
              if (response) {
                // Return cached image
                return response;
              }

              // Fetch from network and cache
              return fetch(request)
                .then((networkResponse) => {
                  if (networkResponse.status === 200) {
                    cache.put(request, networkResponse.clone());
                  }
                  return networkResponse;
                })
                .catch(() => {
                  // Return a placeholder if network fails
                  return new Response(
                    `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100%" height="100%" fill="#f0f0f0"/>
                      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666">Image not available</text>
                    </svg>`,
                    {
                      headers: { 'Content-Type': 'image/svg+xml' }
                    }
                  );
                });
            });
        })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== IMAGE_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});

// Background sync for offline image preloading
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Preload critical images in background
    const criticalImages = [
      '/ajna-logo.jpg',
      '/icons/360-degrees-icon.png',
      '/map-pin-icon.png'
    ];

    const cache = await caches.open(IMAGE_CACHE_NAME);
    await Promise.all(
      criticalImages.map(async (imageUrl) => {
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            await cache.put(imageUrl, response);
          }
        } catch (error) {
          console.warn('Failed to preload image:', imageUrl, error);
        }
      })
    );
  } catch (error) {
    console.error('Background sync failed:', error);
  }
} 