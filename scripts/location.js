export const locationFromIp = async function () {
    let ipInfo = await fetch('http://ipinfo.io?token=4e729d8e8a3919', {mode: 'cors'});
    let { city, country, loc } = await ipInfo.json();
    return { 
        country,
        lat: +loc.substring(0, loc.indexOf(',')),
        lon: +loc.substring(loc.indexOf(',') + 1),
        name: city,
    };
};

export const locationSearch = async function (cityName, state, country) {
    let list = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${state ? state + ',' : ''}${country}&limit=5&appid=4f54370f89e09a792c11550fa7f63031`, {mode: 'cors'});
    list = await list.json();
    list = list.map( location => {
        delete location.local_names;
        return location;
    });
    return list;
}