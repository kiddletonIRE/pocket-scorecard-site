// Caches the app so it works with no signal (web version only; the iPhone app has everything built in).
const CACHE = "pocket-scorecard-v1795642378";
const FILES = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  if (e.request.mode === "navigate") { e.respondWith(fetch(e.request).catch(() => caches.match("index.html"))); return; }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
