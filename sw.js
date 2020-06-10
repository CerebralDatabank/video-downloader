let cacheName = "gopal-vid-dlder-cache";
let contentToCache = [
  "./index.html",
  "./gogo.css",
  "./cdb-logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("[Service Worker] Caching content");
      return cache.addAll(contentToCache);
    }).catch(err => {
      console.error("[Service Worker] Install Error", err);
    })
  );
  console.log("[Service Worker] Installed");
});

self.addEventListener("fetch", event => {
  console.log(`[Service Worker] Fetching URL: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(err => {
      console.error(`[Service Worker] Fetch Error (URL: ${event.request.url})`, err);
    })
  );
});