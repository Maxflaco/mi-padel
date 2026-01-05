// Nombre del caché (puedes cambiar el número si haces actualizaciones grandes)
const CACHE_NAME = 'padel-pro-v1';

// Lista de archivos que queremos guardar para uso offline
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Evento de Instalación: Se ejecuta la primera vez que abres la app
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caché abierto: Guardando archivos para uso offline');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Evento Fetch: Se ejecuta cada vez que la app pide un archivo
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el archivo está en el caché, lo devuelve. Si no, lo busca en internet.
      return response || fetch(event.request);
    })
  );
});

// Evento de Activación: Limpia cachés antiguos si actualizas la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Borrando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});