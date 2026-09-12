// Sólo cachea el armazón del visor: HTML, fuente de iconos, manifiesto,
// iconos. Los datos nunca pasan por aquí — viven en localStorage y se piden
// a GitHub con el token, que no debe quedar en ninguna caché.
const CACHE = "cerebro-v1";
const ARMAZON = [
  "./",
  "./index.html",
  "./iconos.woff2",
  "./manifest.webmanifest",
  "./icono-180.png",
  "./icono-192.png",
  "./icono-512.png",
];

self.addEventListener("install", (ev) => {
  ev.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARMAZON)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (ev) => {
  const url = new URL(ev.request.url);
  // Todo lo que sea de GitHub va directo a la red, siempre.
  if (url.origin !== self.location.origin) return;
  if (ev.request.method !== "GET") return;

  // Red primero para el armazón, con la caché como respaldo sin señal.
  ev.respondWith(
    fetch(ev.request)
      .then((r) => {
        if (r.ok) {
          const copia = r.clone();
          caches.open(CACHE).then((c) => c.put(ev.request, copia));
        }
        return r;
      })
      .catch(() => caches.match(ev.request).then((r) => r || caches.match("./index.html")))
  );
});
