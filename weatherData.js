const getCoordinates = async function () {
    let ipInfo = await fetch('http://ipinfo.io?token=4e729d8e8a3919', {mode: 'cors'});
    let { loc } = await ipInfo.json();
    return { 
        latitude: loc.substring(0, loc.indexOf(',')),
        longitude: loc.substring(loc.indexOf(',') + 1),
        loc
    };
};

const getWeatherData = async function (latitude, longitude) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4f54370f89e09a792c11550fa7f63031&units=imperial`, { mode: 'cors' });
    return await response.json();
};


export default async function () {
    const weatherData = await getWeatherData();
    console.log(weatherData, weatherData.weather);
}