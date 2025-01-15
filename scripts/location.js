import { fetchLocation } from './api.js';

const locationContainer = document.querySelector('.location');

export async function updateLocation(lat, lon) {
    try {
        const locationData = await fetchLocation(lat, lon);
        renderLocation(locationData);
        return locationData.Key;
    } catch (error) {
        console.error('Error updating location:', error);
    }
}

function renderLocation(locationData) {
    locationContainer.innerHTML = `
        <p> 
            ${locationData.LocalizedName} ,
            ${locationData.AdministrativeArea.LocalizedName} , 
            ${locationData.Country.LocalizedName}
        </p>
    `;
}
