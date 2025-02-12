import { updateLocation } from './location.js';
import { updateForecast } from './forecast.js';

// register service worker
console.log('Registering service worker');
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((reg) => {
            console.log('Service worker registered', reg);
        })
        .catch((error) => {
            console.log('Could not register service provider', error);
        });
}
else {
    console.log('Service worker not supported');
}

async function initWeatherApp() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const locationKey = await updateLocation(latitude, longitude);
            if (locationKey) await updateForecast(locationKey);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

initWeatherApp();
