import {getUrl} from "./apiConnections.js"
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

