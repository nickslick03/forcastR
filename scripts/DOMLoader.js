import format from "date-fns/format";

const index = {
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
  weatherImageContainer: document.querySelector(".weatherImageContainer"),
  windSpeed: document.querySelector(".windSpeed"),
};

export default function populateIndex({ name, state, country }, weather) {
  index.cloudPercentage.textContent = `Cloud Percentage: ${weather.cloudPercentage}%`;
  index.currentTime.textContent = format(new Date(), 'p');
  index.description.textContent = weather.description;
  index.main.textContent = weather.main;
  index.markerSunrise.style.left = `${timeToPercent(weather.sunrise)}%`;
  index.markerSunset.style.left = `${timeToPercent(weather.sunset)}%`;
  index.location.textContent = `${name}${state ? `, ${state},` : ''} ${country}`;
  if(weather.rain) {
    index.rainVolume.style.opacity = '1';
    index.rainVolume.textContent = `Rain Volume: ${weather.rain} mm`;
  } else {
    index.rainVolume.style.opacity = '0';
  }
  if(weather.snow) {
    index.snowVolume.style.opacity = '1';
    index.snowVolume.textContent = `Snow Volume: ${weather.snow} mm`;
  } else {
    index.snowVolume.style.opacity = '0';
  }
  index.sunProgress.style.width = `${timeToPercent(new Date())}%`;
  index.temp.textContent = `${weather.temp}°`;
  index.tempMax.textContent = `Max: ${weather.tempMax}°`;
  index.tempMin.textContent = `Min: ${weather.tempMin}°`;
  index.textSunrise.textContent = `Sunrise: ${format(weather.sunrise, 'p')}`;
  index.textSunset.textContent = `Sunset: ${format(weather.sunset, 'p')}`;
  index.windSpeed.textContent = `Wind Speed: ${weather.windSpeed} mph`;
};

const timeToPercent = function (date) {
  let [ hours, minutes ] = format(date, 'HH:mm').match(/\d+/g);
  return parseInt(((parseInt(hours) * 100 + parseInt(minutes / 60)) / 2359) * 100);
};