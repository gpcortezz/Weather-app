const shellCache = 'shell-cache-v1';
const dynamicCache = 'dynamic-cache-v1';
const assets = [
    '/',
    '/index.html',
    '/config.js',
    '/scripts/app.js',
    '/scripts/api.js',
    '/scripts/forecast.js',
    '/scripts/location.js',
    '/styles/styles.css',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    '/pages/fallback.html'
];

// install event
self.addEventListener('install', event => {
    console.log('Service worker installing...', event);
 //
    //pre cache shell assets
    console.log('Caching shell assets...');
    event.waitUntil(
        caches.open(shellCache)
            .then(cache => {
                cache.addAll(assets);
            })
    );
});

// activate event
self.addEventListener('activate', event => {
    console.log('Service worker activating...', event);

    //delete old cache
    event.waitUntil(
        caches.keys().then(keys => {
                return Promise.all(keys
                    .filter(key => key !== shellCache && key !== dynamicCache)
                    .map(key => caches.delete(key))
                );
            }
        )
    )
});

// fetch event
self.addEventListener('fetch', event => {
    console.log('Service worker fetching...', event);

    //return response either from cache or network
    event.respondWith(
        caches.match(event.request)
            .then(cacheResponse => {
                    return cacheResponse || fetch(event.request)
                    .then(fetchResponse => {
                        return caches.open(dynamicCache)
                            .then(cache => {
                                cache.put(event.request.url, fetchResponse.clone());
                                return fetchResponse;
                            });
                    })
                }
            )
            .catch( () => {
                return caches.match('/pages/fallback.html');
            })
    );
});