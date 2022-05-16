import { fromUnixTime, format } from "date-fns";

const getWeatherData = async function (latitude, longitude) {
    let weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4f54370f89e09a792c11550fa7f63031&units=imperial`, { mode: 'cors' });
    weatherInfo = await weatherInfo.json();
    return weatherInfo;
};

export default async function FormatweatherData (location) {
    const {
        weather: [ { description } ], 
        clouds: { all }, 
        main: { temp, temp_max, temp_min },
        rain,
        snow,
        sys: { sunrise, sunset },
        wind: { speed }, 
    } = await getWeatherData(location.lat, location.lon);
    return {
        location,
        weather: {
            description,
            cloudPercentage: all,
            temp,
            temp_max,
            temp_min,
            rain,
            snow,
            sunrise: format(fromUnixTime(sunrise), 'p'),
            sunset: format(fromUnixTime(sunset), 'p'),
            windSpeed: speed + ' mph',
        }
    };
}