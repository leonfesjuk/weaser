import { prepareChartData } from "./weatherService.js";

export async function initWeatherDashboard(lat, lon) {
    const oldContainer = document.getElementById('chartContainer');
    if (oldContainer) {
        oldContainer.remove();
    }

    const container = document.createElement('div');
    container.id = 'chartContainer';
    container.className = 'w-full max-w-4xl mx-auto mb-6';

    const searchBlock = document.querySelector('input#search').closest('div.w-full');
    if (searchBlock) {
        searchBlock.after(container);
    } else {
        document.body.appendChild(container);
    }

    const resultsContainer = document.getElementById('resultsContainer');
    if (resultsContainer) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none'; 
    }
   
    container.innerHTML = `<div class="text-purple-400 animate-pulse">Loading weather data...</div>`;

    const chartData = await prepareChartData(lat, lon);

    if (!chartData) {
        container.innerHTML = `<div class="text-red-500">Failed to load data</div>`;
        return;
    }

    container.innerHTML = `
        <div class="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-slate-900/50 p-4 rounded-xl border border-purple-500/30">
            <canvas id="weatherCanvas"></canvas>
        </div>
    `;

    const ctx = document.getElementById('weatherCanvas').getContext('2d');

    if (window.Chart && window.chartjsPluginZoom) {
        Chart.register(window.chartjsPluginZoom);
    }

    return new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { position: 'left', title: { display: true, text: '°C' } },
                y1: { position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: '%' } }
            },
            plugins: {
                zoom: {
                    pan: { enabled: true, mode: 'x' },
                    zoom: { wheel: { enabled: true }, mode: 'x' }
                }
            }
        }
    });
}
