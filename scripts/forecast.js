import { fetchForecast } from './api.js';

const forecastContainer = document.querySelector('.forecast');
const fahrenheitButton = document.getElementById('fahrenheit');
const celsiusButton = document.getElementById('celsius');

let isCelsius = true;
let cachedForecastData = null;

export async function updateForecast(locationKey) {
    renderForecastSkeleton();
    try {
        cachedForecastData = await fetchForecast(locationKey, isCelsius);
        renderForecast();
    } catch (error) {
        console.error('Error updating forecast:', error);
        forecastContainer.innerHTML = '<p>No forecast available</p>';
    }
}

function renderForecastSkeleton() {
    forecastContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.classList.add('forecast-day', 'animate-pulse', 'bg-card', 'rounded-lg', 'shadow-md', 'p-4');
        
        const leftColumn = document.createElement('div');
        leftColumn.classList.add('left-column');
        leftColumn.innerHTML = `
            <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div class="h-4 bg-gray-300 rounded mt-2 w-3/4"></div>
            <div class="h-4 bg-gray-300 rounded mt-1 w-1/2"></div>
        `;
        
        const rightColumn = document.createElement('div');
        rightColumn.classList.add('right-column', 'ml-4');
        rightColumn.innerHTML = `
            <div class="h-4 bg-gray-300 rounded w-1/3"></div>
            <div class="h-4 bg-gray-300 rounded mt-1 w-2/3"></div>
        `;
        
        skeletonCard.appendChild(leftColumn);
        skeletonCard.appendChild(rightColumn);
        forecastContainer.appendChild(skeletonCard);
    }
}

function renderForecast() {
    forecastContainer.innerHTML = '';

    if (!cachedForecastData || cachedForecastData.length === 0) {
        forecastContainer.innerHTML = '<p>No forecast available</p>';
        return;
    }

    cachedForecastData.forEach(day => {
        const weatherCard = document.createElement('div');
        weatherCard.classList.add('forecast-day', 'bg-card', 'rounded-lg', 'shadow-md', 'p-4');

        const leftColumn = document.createElement('div');
        leftColumn.classList.add('left-column');
        leftColumn.innerHTML = `
            <img class="forecast-icon" src="${day.icon}" alt="${day.weatherText}">
            <p class="day-name">${day.date.split(',')[0]}</p>
            <p class="date">${day.date.split(',').slice(1).join(',').trim()}</p>
        `;

        const rightColumn = document.createElement('div');
        rightColumn.classList.add('right-column');
        rightColumn.innerHTML = `
            <p class="temperature">${isCelsius ? day.temperatures.celsius : day.temperatures.fahrenheit}</p>
            <p class="condition">${day.weatherText}</p>
        `;

        weatherCard.appendChild(leftColumn);
        weatherCard.appendChild(rightColumn);
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
