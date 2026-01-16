import { getLocation } from "./src/cityListParser.js";
import { cityFinder } from "./src/cityFinder.js";
import { dataFetch } from "./src/dataFetch.js";

const inputField = document.getElementById("search");
inputField.onkeydown = async (e) => {
  if (e.key === "Enter") {
    const text = e.target.value;
    const foundedCities = await cityFinder(text);
    console.log("Всі міста:", foundedCities);
    const contentBox = document.getElementById("resultsContainer");
    contentBox.innerHTML = "";

    for (const city of foundedCities) {
      console.log("Поточне місто з циклу:", city);
      const cityData = await dataFetch(city);
      const cityDiv = document.createElement("div");
      const iconCode = cityData.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      cityDiv.className =
        "bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-600/50 shadow-lg shadow-purple-900/40 transform transition-all duration-300 hover:scale-105 hover:border-purple-400";
      cityDiv.innerHTML = `<div class="flex items-center justify-between mb-4">
        <div>
            <h3 class="text-xl font-bold text-purple-300">${city}</h3>
            <p class="text-gray-400 text-sm">${cityData.sys.country}</p>
            
        </div>
        <div class="bg-slate-900/50 rounded-full p-1 border border-purple-500/30">
            <img src="${iconUrl}" alt="Weather" class="w-16 h-16 object-contain">
        </div>
    </div>
    
    <div class="flex items-end justify-between">
        <p class="text-white text-4xl font-mono">${Math.round(
          cityData.main.temp
        )}°C</p>
    
        <div class="flex flex-col items-end">
        <p class="text-gray-500 text-xs italic">Wind: ${
          cityData.wind.speed
        } m.s</p>
        <p class="text-gray-500 text-xs italic">Humidity: ${
          cityData.main.humidity
        } %</p>
        </div>
    </div>
        

        
    `;
      contentBox.appendChild(cityDiv);
    }

    if (foundedCities.length === 0) {
      console.log("<h2>Нічого не знайдено</h2>");
      return;
    }
    console.log(foundedCities);
  }
};
