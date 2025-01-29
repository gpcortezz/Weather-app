// install event
self.addEventListener('install', event => {
    console.log('Service worker installing...', event);
});

// activate event
self.addEventListener('activate', event => {
    console.log('Service worker activating...', event);
});

// fetch event
self.addEventListener('fetch', event => {
    console.log('Service worker fetching...', event);
});