import { fromUnixTime, parseJSON } from "date-fns";

const getWeatherData = async function (lat, lon) {
    let weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4f54370f89e09a792c11550fa7f63031&units=imperial`, { mode: 'cors' });
    weatherInfo = await weatherInfo.json();
    return weatherInfo;
};

export default async function FormatweatherData ({lat, lon}) {
    const {
        weather: [ { main, description } ], 
        clouds: { all }, 
        main: { temp, temp_max, temp_min },
        rain,
        snow,
        sys: { sunrise, sunset },
        wind: { speed }, 
    } = await getWeatherData(lat, lon);
    return {
        description,
        cloudPercentage: all,
        main,
        temp: parseInt(temp),
        tempMax: parseInt(temp_max),
        tempMin: parseInt(temp_min),
        rain: rain ? rain['1h'] : 0,
        snow: snow ? snow['1h'] : 0,
        sunrise: parseJSON(fromUnixTime(sunrise)),
        sunset: parseJSON(fromUnixTime(sunset)),
        windSpeed: speed,
    };
}