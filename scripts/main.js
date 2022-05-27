import weatherData from "./weatherData.js";
import { locationFromIp, locationSearch } from "./location.js";
import loadIndex from "./DOMLoader.js";
import makeMenu from "./searchMenu.js";

const main = async function () {
    let location = await locationFromIp();
    let weatherInfo = await weatherData(location);
    loadIndex(location, weatherInfo);
    document.querySelector('body').appendChild(makeMenu(document.querySelector('.searchButton')));
};

main();

