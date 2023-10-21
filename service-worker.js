// Service Worker for caching and making the app work offline
const cacheName = "hello-world-pwa";
const cacheFiles = [
  "index.html",
  "service-worker.js",
  // Add other files you want to cache here
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(cacheFiles);
    }),
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    }),
  );
});
