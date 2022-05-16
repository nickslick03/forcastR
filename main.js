import weatherData from "./weatherData.js";
import { LocationFromIp, locationSearch } from "./location.js";

const log = async () => {
    let data = await weatherData(await LocationFromIp());
    let location = await locationSearch('Hamilton,NJ,US');
    console.log(await weatherData(location[0]));
    console.log(data);
};

log();