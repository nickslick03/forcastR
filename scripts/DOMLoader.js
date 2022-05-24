import format from "date-fns/format";
import timeOfDay from "./timeOfDay";

const backgroundImageColors = {
  morning: [265, 100, 36, 34, 100, 50],
  day: [195, 100, 86, 226, 100, 50],
  evening: [265, 100, 36, 34, 100, 50],
  night: [270, 100, 20, 240, 100, 10],
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

const loadVisuals = function(weather) {
  const timeWord = timeOfDay(weather, new Date(), 30);
  index.body.style.backgroundImage = getBackgroundImage(weather, timeWord);
  index.body.style.color = timeWord === 'night' ? 'lightgray' : 'black';
  index.markerSunrise.style.left = `${timeToPercent(weather.sunrise)}%`;
  index.markerSunset.style.left = `${timeToPercent(weather.sunset)}%`;
  index.sunProgress.style.width = `${timeToPercent(new Date())}%`;
  index.weatherIcon.setAttribute('src', `./images/${getIcon(weather, timeWord)}.png`);
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

const getIcon = function ({cloudPercentage, rain, snow, wind}, timeWord) {
  if(snow) return 'snow';
  if(rain) return 'rain';
  if(wind >= 25) return 'wind';
  if(cloudPercentage >= 50) return 'cloud';
  if(cloudPercentage >= 10)
    if(timeWord === 'night') return 'moonCloud';
    else return 'sunCloud';
  if(timeWord === 'night') return 'night';
  return 'sun';
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