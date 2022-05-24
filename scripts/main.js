import weatherData from "./weatherData.js";
import { locationFromIp, locationSearch } from "./location.js";
import loadIndex from "./DOMLoader.js";

const main = async function () {
    //let [ location ] = await locationSearch('Los Angeles', 'CA', 'US'); //SEARCH
    let location = await locationFromIp(); //IP
    let weatherInfo = await weatherData(location);
    loadIndex(location, weatherInfo);
};

main();