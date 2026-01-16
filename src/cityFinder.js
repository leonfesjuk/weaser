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
        .map(item => item.name);

    return cityNames;
}