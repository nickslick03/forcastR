const index = {
  description: document.querySelector(".description"),
  main: document.querySelector(".main"),
  location: document.querySelector(".location"),
  rainVolume: document.querySelector(".rainVolume"),
  snowVolume: document.querySelector(".snowVolume"),
  temp: document.querySelector(".temp"),
  tempMax: document.querySelector(".tempMax"),
  tempMin: document.querySelector(".tempMin"),
  weatherImageContainer: document.querySelector(".weatherImageContainer"),
  windSpeed: document.querySelector(".windSpeed"),
};

export default function populateIndex({ name, country }, weather) {
    index.description.textContent = weather.description;
    index.main.textContent = weather.main; 
    index.location.textContent = `${name}, ${country}`;
    index.rainVolume.textContent = weather.rainVolume || 0;
    index.snowVolume.textContent = weather.snowVolume || 0;
    index.temp.textContent = weather.temp + '°';
    index.tempMax.textContent = weather.tempMax + '°';
    index.tempMin.textContent = weather.tempMin + '°';
    index.windSpeed.textContent = weather.windSpeed;
}
