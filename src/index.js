import './index.css'
import './normalize.css'


// const container = document.querySelector(".main-container");

let city = "vienna";

async function getCoordinates() {
    let data = await fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=8412386423561ec0eb48a5fac1bd2487", {mode: 'cors'});
    let json = await data.json();
    return [json[0].lat, json[0].lon];
}


async function getWeatherData() {
    let coord = await getCoordinates();
    let data = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + coord[0] + "&lon=" + coord[1] + "&units=metric&exclude={part}&appid=8412386423561ec0eb48a5fac1bd2487", {mode: 'cors'});
    let json = await data.json();
    
    return json;
}


function getLocalDatestamp( time, offset ) {
    let dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let ts = new Date( (time + offset) * 1000 );

    const dd = ts.getUTCDay();
    let hh = ts.getUTCHours();
    let mm = ts.getUTCMinutes();
    if (hh < 10) {
        hh = "0"+hh;
    }
    if (mm < 10) {
        mm = "0"+mm;
    }
    return [ dayList[dd], hh+":"+mm];
}


getWeatherData().then((value) => {
    let w_time_shift = value.timezone_offset
    let w_current = value.current;
    let w_hourly = value.hourly;
    let w_daily = value.daily;

    // current
    let date = getLocalDatestamp( w_current.dt, w_time_shift );
    let temp = w_current.temp;
    let feelsLike = w_current.feels_like;
    let humidity = w_current.humidity;
    let description = w_current.weather[0].description;
    let icon = w_current.weather[0].icon;
    let arr =  [description, icon, temp, feelsLike, humidity]
    console.log(arr)

    // forecast next 24 hours
    let arr_hours = [];
    for (let i=0; i<24; i++) {
        let tmp1 = w_hourly[i].dt
        let tmp2 = w_hourly[i].temp
        let tmp3 = w_hourly[i].weather["0"].icon
        let item = [tmp1, tmp2, tmp3]
        arr_hours.push(item)
    }
    console.log(arr_hours)

   // forecast next 7 days
   let arr_days = [];    
   for (let i=0; i<8; i++) {
        let tmp1 = w_daily[i].dt
        let tmp2 = w_daily[i].temp.min
        let tmp3 = w_daily[i].temp.max
        let tmp4 = w_daily[i].weather["0"].icon
        let tmp5 = w_daily[i].weather["0"].description
        let item = [tmp1, tmp2, tmp3, tmp4, tmp5]
        arr_days.push(item)
    }
    console.log(arr_days)
});
