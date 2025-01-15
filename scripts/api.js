import { config } from '../config.js';

export async function fetchLocation(lat, lon) {
    const url = `${config.api.baseUrl}${config.endpoints.location}?apikey=${config.api.key}&q=${lat},${lon}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching location data');
    return response.json();
}

export async function fetchForecast(locationKey, isCelsius = true) {
    const url = `${config.api.baseUrl}${config.endpoints.forecast}/${locationKey}?apikey=${config.api.key}&metric=${isCelsius}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error fetching forecast data');
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
        icon: `${config.api.iconsUrl}${String(day.Day.Icon).padStart(2, '0')}-s.png`
    }));
}
