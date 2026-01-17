import {getLocation} from './cityListParser.js'

export async function cityFinder(cityName) {
    const dataBase = await getLocation();
    if (!dataBase) {
        return [];
    }

    const cityNames = dataBase
        .filter(item => {
            const cityLowerCase = item.name.toLowerCase();
            const search = cityName.toLowerCase();
            return cityLowerCase.includes(search);
        })
        .map(item => ({
            name: item.name,
            lon: item.coord.lon,
            lat: item.coord.lat,
            country: item.country,
            population: item.stat?.population || 0,


        })).sort((a, b) => b.population - a.population);

    return cityNames;
}