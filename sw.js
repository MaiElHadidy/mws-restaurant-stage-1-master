var filesToCache = [
  '/',
  '/css/styles.css',
  '/img',
  '/index.html',
  '/restaurant.html',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/data/restaurants.json'

];

var staticCacheName = 'restaurants-cache-v1';

self.addEventListener('install', function(event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

      

    }).catch(function(error) {

      
    })
  );
});

