import weatherData from "./weatherData.js";

const log = async () => {
    let city = await weatherData();
    console.log(city);
}

log();