import format from "date-fns/format";
import timeOfDay from "./timeOfDay";

import sunIcon from "../icons/sun.png";
import sunCloudIcon from "../icons/sunCloud.png";
import moonIcon from "../icons/moon.png";
import moonCloudIcon from "../icons/moonCloud.png";
import cloudIcon from "../icons/cloud.png";
import rainIcon from "../icons/rain.png";
import snowIcon from"../icons/snow.png";
import windIcon from "../icons/wind.png";

const backgroundImageColors = {
  morning: [265, 100, 36, 34, 100, 50],
  day: [195, 100, 90, 230, 100, 50],
  evening: [265, 100, 30, 34, 100, 50],
  night: [270, 100, 30, 240, 100, 10],
};

const index = {
  body: document.body,
  cloudPercentage: document.querySelector(".cloudPercentage"),
  currentTime: document.querySelector(".currentTime"),
  description: document.querySelector(".description"),
  main: document.querySelector(".main"),
  location: document.querySelector(".location"),
  markerSunrise: document.querySelector(".marker.sunrise"),
  markerSunset: document.querySelector(".marker.sunset"),
  rainVolume: document.querySelector(".rainVolume"),
  snowVolume: document.querySelector(".snowVolume"),
  sunProgress: document.querySelector(".sunProgress"),
  temp: document.querySelector(".temp"),
  tempMax: document.querySelector(".tempMax"),
  tempMin: document.querySelector(".tempMin"),
  textSunrise: document.querySelector(".text.sunrise"),
  textSunset: document.querySelector(".text.sunset"),
  weatherIcon: document.querySelector(".weatherIcon"),
  windSpeed: document.querySelector(".windSpeed"),
};

const loadText = function(name, state, country, weather) {
  index.cloudPercentage.textContent = `Cloud Percentage: ${weather.cloudPercentage}%`;
  index.currentTime.textContent = format(new Date(), 'p');
  index.description.textContent = weather.description;
  index.main.textContent = weather.main;
  index.location.textContent = `${name}${state ? `, ${state}` : ''}, ${country}`;
  if(weather.rain) {
    index.rainVolume.textContent = `Rain Volume: ${weather.rain} mm`;
  }
  if(weather.snow) {
    index.snowVolume.textContent = `Snow Volume: ${weather.snow} mm`;
  }
  index.temp.textContent = `${weather.temp}°`;
  index.tempMax.textContent = `Max: ${weather.tempMax}°`;
  index.tempMin.textContent = `Min: ${weather.tempMin}°`;
  index.textSunrise.textContent = `Sunrise: ${format(weather.sunrise, 'p')}`;
  index.textSunset.textContent = `Sunset: ${format(weather.sunset, 'p')}`;
  index.windSpeed.textContent = `Wind Speed: ${weather.windSpeed} mph`;
};

const loadVisuals = async function (weather) {
  const timeWord = timeOfDay(weather, new Date(), 30);
  index.body.style.backgroundImage = getBackgroundImage(weather, timeWord);
  index.body.style.color = timeWord === 'night' ? 'lightgray' : 'black';
  index.markerSunrise.style.left = `${timeToPercent(weather.sunrise)}%`;
  index.markerSunset.style.left = `${timeToPercent(weather.sunset)}%`;
  index.sunProgress.style.width = `${timeToPercent(new Date())}%`;
  const { name, icon } = await getIcon(weather, timeWord);
  icon;
  index.weatherIcon.src = icon;
  index.weatherIcon.setAttribute('alt', name);
};

const getBackgroundImage = function ({cloudPercentage}, timeWord) {
  const colorArray = [...backgroundImageColors[timeWord]];
  [1, 4].forEach(num => {
    colorArray[num] = 100 - cloudPercentage;
  });
  return `linear-gradient(
    hsl(${colorArray[0]}, ${colorArray[1]}%, ${colorArray[2]}%), 
    hsl(${colorArray[3]}, ${colorArray[4]}%, ${colorArray[5]}%))`;
};

const getIcon = async function ({cloudPercentage, rain, snow, wind}, timeWord) {
  if(snow) return { name: 'snow', icon: snowIcon };
  if(rain) return { name: 'rain', icon: rainIcon };
  if(wind >= 25) return { name:'wind', icon: windIcon };
  if(cloudPercentage >= 50) return { name: 'cloud', icon: cloudIcon};
  if(cloudPercentage >= 10)
    if(timeWord === 'night') return { name: 'moonCloud', icon: moonCloudIcon };
    else return { name: 'sunCloud', icon: sunCloudIcon };;
  if(timeWord === 'night') return { name: 'moon', icon: moonIcon };
  return { name: 'sun', icon: sunIcon };
};

const timeToPercent = function (date) {
  let [ hours, minutes ] = format(date, 'HH:mm').match(/\d+/g);
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  return parseInt(((hours + minutes / 60) / 24) * 100);
};

export default function loadIndex({ name, state, country }, weather) {
  loadText(name, state, country, weather);
  loadVisuals(weather);
};