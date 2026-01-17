import { getLocation } from "./src/cityListParser.js";
import { cityFinder } from "./src/cityFinder.js";
import { dataFetch } from "./src/dataFetch.js";
import { initWeatherDashboard } from './src/chartRenderer.js';

const inputField = document.getElementById("search");
const resultsContainer = document.querySelector('.grid');

inputField.onkeydown = async (e) => {
  if (e.key === "Enter") {
    const chartContainer = document.getElementById('chartContainer');
    if (chartContainer) {
      chartContainer.remove();
    }

    resultsContainer.style.display = 'grid'; 

    const text = e.target.value;
    if (!text) {
      resultsContainer.innerHTML = ""; 
      return;
    }

    const foundedCities = await cityFinder(text);
    resultsContainer.innerHTML = "";

    if (foundedCities.length === 0) {
      resultsContainer.innerHTML = `<p class="text-center text-gray-400 col-span-full">Нічого не знайдено.</p>`;
      return;
    }

    for (const city of foundedCities) {
      const cityData = await dataFetch(city.name); 
      
      if (cityData) {
        const cityDiv = document.createElement("div");
        const iconCode = cityData.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        cityDiv.className =
          "bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-600/50 shadow-lg shadow-purple-900/40";
        
        cityDiv.innerHTML = `<div class="flex items-center justify-between mb-4">
          <div >
              <h3 class="text-xl font-bold text-purple-300">${city.name}</h3>
              <p class="text-gray-400 text-sm">${cityData.sys.country}</p>
          </div>
          <div class="bg-slate-900/50 rounded-full p-1 border border-purple-500/30">
              <img src="${iconUrl}" alt="Weather" class="w-16 h-16 object-contain">
          </div>
        </div>
        <div class="flex items-end justify-between">
            <p class="text-white text-4xl font-mono">${Math.round(cityData.main.temp)}°C</p>
            <div class="flex flex-col items-end">
              <p class="text-gray-500 text-xs italic">Wind: ${cityData.wind.speed} m/s</p>
              <p class="text-gray-500 text-xs italic">Humidity: ${cityData.main.humidity}%</p>
            </div>
        </div>`;
        cityDiv.onclick = () => {
            initWeatherDashboard(cityData.coord.lat, cityData.coord.lon);
        };
        resultsContainer.appendChild(cityDiv);
      }
    }
  }
};
