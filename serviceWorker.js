const staticCacheName = 'site-static-v1';

const assets = [
  './',
  './images/bizinsider.png',
  './images/dog-img.jpg',
  './images/iphone6.png',
  './images/lady-img.jpg',
  './images/mashable.png',
  './images/TechCrunch.png',
  './images/tnw.png',
  './index.html',
  './css/styles.css',
  './css/bootstrap.css',
  'https://fonts.googleapis.com/css?family=Montserrat:400,900|Ubuntu',
];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});