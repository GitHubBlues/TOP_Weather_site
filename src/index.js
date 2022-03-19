import './index.css'
import './normalize.css'

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
    makeCurrentPanel(arr) 

    // forecast next 24 hours
    let arr_hours = [];
    for (let i=0; i<24; i++) {
        let tmp1 = w_hourly[i].dt
        let tmp2 = w_hourly[i].temp
        let tmp3 = w_hourly[i].weather["0"].icon
        let item = [tmp1, tmp2, tmp3]
        arr_hours.push(item)
    }
    makeHourlyPanel(arr_hours)

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
     makeDailyPanel(arr_days)
});

function makeCurrentPanel(arr) {
    const nowCity = document.querySelector(".now-city-name")
    const nowDescription = document.querySelector(".now-description")
    const nowTemperature = document.querySelector(".now-temperature")
    const nowFeelsLike = document.querySelector(".now-feels-like")
    const nowHumidity = document.querySelector(".now-humidity")
    let args = arr
    console.log(args[4])

    nowCity.innerText = city
    nowDescription.innerText = args[0]
    nowTemperature.innerText = args[2]
    nowFeelsLike.innerText = args[3]
    nowHumidity.innerText = args[4]
}

function makeHourlyPanel(arr) {
    const mainContainer = document.querySelector(".data-hourly")
    const data = arr;
    console.log(data);
    data.forEach( item => {
       const container = document.createElement("div");
       container.classList.add("h-container");
       const time = document.createElement("div");
       time.classList.add("h-time");
       time.innerText = item[0]
       const icon = document.createElement("div");
       icon.classList.add("h-icon");
       const temp = document.createElement("div");
       temp.classList.add("h-temp");
       temp.innerText = item[1];

       container.append(time, icon, temp)
       mainContainer.appendChild(container);
    })
}

function makeDailyPanel(arr) {
    const mainContainer = document.querySelector(".data-daily")
    const data = arr;
    data.forEach( item => {
        const container = document.createElement("div");
        container.classList.add("d-container");
        const time = document.createElement("div");
        time.classList.add("d-time");
        time.innerText = item[0]
        const icon = document.createElement("div");
        icon.classList.add("d-icon");
        const describe = document.createElement("div");
        describe.classList.add("d-description");
        describe.innerText = item[4];
        const tmin = document.createElement("div");
        tmin.classList.add("d-tmin");
        tmin.innerText = item[1];
        const tmax = document.createElement("div");
        tmax.classList.add("d-tmax");
        tmax.innerText = item[2];

        container.append(time, icon, describe, tmin, tmax)
        mainContainer.appendChild(container);
    })
}      

