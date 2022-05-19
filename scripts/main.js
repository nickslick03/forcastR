import weatherData from "./weatherData.js";
import { locationFromIp, locationSearch } from "./location.js";
import populateIndex from "./indexManipulator.js";

const main = async () => {
    let searchLocation = await locationSearch('london', '', 'GB');
    //let ipLocation = await locationFromIp();
    let weatherInfo = await weatherData(searchLocation[0]);
    populateIndex(searchLocation[0], weatherInfo);
};

main();