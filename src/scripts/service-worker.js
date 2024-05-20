const { precacheAndRoute } = require('workbox-precaching');
const { registerRoute } = require('workbox-routing');
const { StaleWhileRevalidate, CacheFirst } = require('workbox-strategies');
const { ExpirationPlugin } = require('workbox-expiration');
const { clientsClaim } = require('workbox-core');

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  clientsClaim();
});

// eslint-disable-next-line no-underscore-dangle
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
  new StaleWhileRevalidate(),
);

registerRoute(
  // Caching untuk request gambar
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
  'GET',
);

registerRoute(
  ({ url }) => url.origin === 'https://restaurant-api.dicoding.dev',
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.pathname.startsWith('/details-restaurant.html'),
  new StaleWhileRevalidate({
    cacheName: 'page-cache',
  }),
);
registerRoute(
  ({ url }) => url.pathname.startsWith('/favorite.html'),
  new StaleWhileRevalidate({
    cacheName: 'page-cache',
  }),
);
