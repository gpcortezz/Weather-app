import { fetchLocation } from './api.js';

const locationContainer = document.querySelector('.location');

locationContainer.innerHTML = `<p>Getting location...</p>`;

export async function updateLocation(lat, lon) {
    locationContainer.innerHTML = `<p>...</p>`;

    try {
        const locationData = await fetchLocation(lat, lon);
        renderLocation(locationData);
        return locationData.Key;
    } catch (error) {
        console.error('Error updating location:', error);
        locationContainer.innerHTML = `<p>No data available</p>`;
    }
}

function renderLocation(locationData) {
    if (!locationData) {
        locationContainer.innerHTML = `<p>No location available</p>`;
        return;
    }
    
    locationContainer.innerHTML = `
        <p>
            ${locationData.LocalizedName},
            ${locationData.AdministrativeArea.LocalizedName},
            ${locationData.Country.LocalizedName}
        </p>
    `;
}
