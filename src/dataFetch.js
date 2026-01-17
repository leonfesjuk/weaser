import {getUrl} from "./apiConnections.js"
import {createWeatherUrl, createAirQualityUrl} from "./openMeteoQueryParameters.js"

export async function dataFetch(cityName) {
    try{
        const response = await fetch(getUrl(cityName));
        if(!response.ok){
            throw new Error(`Fetch from API Error ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("Error fetch resource", err);
        return null;
    }
}

async function apiService(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function dataFetchOpenMeteo(lat, lon) {
    return await apiService(createWeatherUrl(lat, lon));
}

export async function dataFetchAirQuality(lat, lon) {
    return await apiService(createAirQualityUrl(lat, lon));
}