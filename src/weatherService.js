import {dataFetchOpenMeteo, dataFetchAirQuality} from "./dataFetch.js"

export async function prepareChartData(lat, lon) {
    const weatherData = await dataFetchOpenMeteo(lat, lon);
    const airData = await dataFetchAirQuality(lat, lon);

    if (!weatherData) return null;

    const labels = weatherData.hourly.time.map(t => {
        const date = new Date(t);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        return `${day}.${month} ${hours}:00`;
    });

    return {
        labels: labels,
        datasets: [
            {
                label: 'Temperature (°C)',
                data: weatherData.hourly.temperature_2m,
                borderColor: '#e879f9',
                backgroundColor: 'transparent',
                yAxisID: 'y',
                tension: 0.4,
                fill: false
            },
            {
                label: 'Humidity (%)',
                data: weatherData.hourly.relative_humidity_2m,
                borderColor: '#22d3ee',
                backgroundColor: 'transparent',
                yAxisID: 'y1',
                tension: 0.4
            }
        ]
    };
}