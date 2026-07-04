const CACHE_NAME = 'absensi-pwa-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch dari Cache jika offline
self.addEventListener('fetch', event => {
  // Hanya intercept request ke file lokal, biarkan request ke GAS URL lewat internet
  if (event.request.url.includes('script.google.com')) {
    return; 
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file dari cache
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
