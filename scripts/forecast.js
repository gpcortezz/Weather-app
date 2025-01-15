import { fetchForecast } from './api.js';

const forecastContainer = document.querySelector('.forecast');
const fahrenheitButton = document.getElementById('fahrenheit');
const celsiusButton = document.getElementById('celsius');

let isCelsius = true;
let cachedForecastData = null;

export async function updateForecast(locationKey) {
    try {
        cachedForecastData = await fetchForecast(locationKey, isCelsius);
        renderForecast();
    } catch (error) {
        console.error('Error updating forecast:', error);
    }
}

function renderForecast() {
    forecastContainer.innerHTML = '';
    cachedForecastData.forEach(day => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('forecast-day');
        weatherCard.innerHTML = `
            <img class="forecast-icon" src="${day.icon}" alt="${day.weatherText}">
            <p class="day-name">${day.date.split(',')[0]}</p>
            <p class="date">${day.date.split(',').slice(1).join(',').trim()}</p>
            <p class="temperature">${isCelsius ? day.temperatures.celsius : day.temperatures.fahrenheit}</p>
            <p class="condition">${day.weatherText}</p>
        `;
        forecastContainer.appendChild(weatherCard);
    });
}

fahrenheitButton.addEventListener('click', () => {
    isCelsius = false;
    renderForecast();
});

celsiusButton.addEventListener('click', () => {
    isCelsius = true;
    renderForecast();
});
