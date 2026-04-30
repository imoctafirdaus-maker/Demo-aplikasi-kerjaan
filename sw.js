// Naikkan versi CACHE_NAME setiap kali kamu melakukan update pada index.html
const CACHE_NAME = 'retro-game-v2';

// Daftarkan semua file yang ingin disimpan secara offline
const assets = [
  '/',
  './index.html',
  './manifest.json',
  './1777546745740.png' // Pastikan nama file ini sama persis dengan yang ada di GitHub
];

// Tahap Instalasi: Menyimpan aset ke dalam cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Mengamankan Aset ke Cache');
      return cache.addAll(assets);
    })
  );
});

// Tahap Aktivasi: Menghapus cache lama agar kode baru bisa jalan
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Menghapus Cache Lama');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Tahap Fetch: Mengambil data dari cache jika sedang offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
