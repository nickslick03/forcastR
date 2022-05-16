import { fromUnixTime, format } from "date-fns";

const getLocation = async function () {
    let ipInfo = await fetch('http://ipinfo.io?token=4e729d8e8a3919', {mode: 'cors'});
    let { city, region, country, loc } = await ipInfo.json();
    return { 
        city,
        region,
        country,
        latitude: loc.substring(0, loc.indexOf(',')),
        longitude: loc.substring(loc.indexOf(',') + 1),
    };
};

const getWeatherData = async function (latitude, longitude) {
    let weatherInfo = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4f54370f89e09a792c11550fa7f63031&units=imperial`, { mode: 'cors' });
    weatherInfo = weatherInfo.json();
    return weatherInfo;
};

export default async function () {
    const location = await getLocation();
    const {
        weather: [ { description } ], 
        clouds: { all }, 
        main: { temp, temp_max, temp_min },
        rain,
        snow,
        sys: { sunrise, sunset },
        wind: { speed }, 
    } = await getWeatherData(location.latitude, location.longitude);
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