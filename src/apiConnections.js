const API_KEY = "d9bc8187c9c61e1a983d3d0c11111b4c";
export const getUrl = (cityName) => {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
};