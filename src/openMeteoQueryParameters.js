export const BASE_WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
export const BASE_AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

const WEATHER_PARAMS = {
    hourly: [
        "temperature_2m",         
        "relative_humidity_2m",   
        "apparent_temperature",   
        "weathercode",           
        "uv_index",               
        "windspeed_10m"           
    ].join(","),
    timezone: "auto",
    windspeed_unit: "ms"
};

const AIR_QUALITY_PARAMS = {
    hourly: [
        "pm10", 
        "pm2_5", 
        "european_aqi"
    ].join(","),
    timezone: "auto"
};

function buildUrl(baseUrl, lat, lon, extraParams){
    const params = {
        latitude: lat,
        longitude: lon,
        ...extraParams
    };
    return `${baseUrl}?${new URLSearchParams(params).toString()}`;
}
export const createWeatherUrl = (lat, lon) => buildUrl(BASE_WEATHER_URL, lat, lon, WEATHER_PARAMS);
export const createAirQualityUrl = (lat, lon) => buildUrl(BASE_AIR_QUALITY_URL, lat, lon, AIR_QUALITY_PARAMS);