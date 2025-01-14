const apiKey = 'ABaBjXH1Xky0i6Nih8JxhT61DEmnQFYo';
const locationContainer = document.querySelector('.location');
const weatherTemplate = document.querySelector('#weather-template');
const forecastContainer = document.querySelector('.forecast');
const fahrenheitButton = document.getElementById('fahrenheit');
const celsiusButton = document.getElementById('celsius');

let isCelsius = true;
let cachedForecastData = null; 

async function getFiveDayForecast(locationKey) {
    const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=${isCelsius}`;
    const response = await fetch(forecastUrl);
    const data = await response.json();
    return data.DailyForecasts.map(day => ({
        date: new Date(day.Date).toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }),
        temperatures: {
            celsius: `${day.Temperature.Minimum.Value}° - ${day.Temperature.Maximum.Value}° C`,
            fahrenheit: `${(day.Temperature.Minimum.Value * 1.8 + 32).toFixed(1)}° - ${(day.Temperature.Maximum.Value * 1.8 + 32).toFixed(1)}° F`
        },
        weatherText: day.Day.IconPhrase,
        icon: `https://developer.accuweather.com/sites/default/files/${String(day.Day.Icon).padStart(2, '0')}-s.png`
    }));
}


async function getLocationByCoordinates(lat, lon) {
    const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${lon}`;
    const response = await fetch(locationUrl);
    const data = await response.json();
    return data;
}

function updateLocation(locationData) {
    locationContainer.innerHTML = `
        <p><b>City: </b>${locationData.LocalizedName}</p>
        <p><b>State: </b>${locationData.AdministrativeArea.LocalizedName}</p>
        <p><b>Country: </b>${locationData.Country.LocalizedName}</p>
    `;
}

function updateForecast() {
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

async function initWeatherApp(lat, lon) {
    try {
        const locationData = await getLocationByCoordinates(lat, lon);
        updateLocation(locationData);
        cachedForecastData = await getFiveDayForecast(locationData.Key);
        updateForecast();
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        await initWeatherApp(latitude, longitude);
    });
}

fahrenheitButton.addEventListener('click', () => {
    isCelsius = false;
    fahrenheitButton.classList.add('active');
    celsiusButton.classList.remove('active');
    updateForecast(); 
});

celsiusButton.addEventListener('click', () => {
    isCelsius = true;
    celsiusButton.classList.add('active');
    fahrenheitButton.classList.remove('active');
    updateForecast();
});
 