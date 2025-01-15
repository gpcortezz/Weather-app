import { updateLocation } from './location.js';
import { updateForecast } from './forecast.js';

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
