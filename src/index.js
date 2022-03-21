import './index.css'
import './normalize.css'
import './weather-icons/css/weather-icons.min.css'

let city = "vienna";
onloadHeader(); 

function onloadHeader() {
  const btnC = document.querySelector(".celsius")
  btnC.classList.add("selected")
  const cityInput = document.querySelector(".input")
  cityInput.addEventListener("keydown", readCity)
  listenerUnits()
}


async function getCoordinates() {
    let myCity = document.querySelector(".now-city-name").innerText
    console.log(myCity)
    if (myCity.length > 0) {
        city = myCity
    }
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

  processWeatherData(value)
  //   let w_time_shift = value.timezone_offset
  //   let w_current = value.current;
  //   let w_hourly = value.hourly;
  //   let w_daily = value.daily;

  //   // current
  //   let date = getLocalDatestamp( w_current.dt, w_time_shift );
  //   let temp = w_current.temp;
  //   let feelsLike = w_current.feels_like;
  //   let humidity = w_current.humidity;
  //   let description = w_current.weather[0].description;
  //   let icon = getIcon( w_current.weather[0].icon )[0];
  //   let arr =  [description, icon, temp, feelsLike, humidity]
  //   makeCurrentPanel(arr) 

  //   // forecast next 24 hours
  //   let arr_hours = [];
  //   for (let i=0; i<24; i++) {
  //       let tmp1 = getLocalDatestamp(w_hourly[i].dt, w_time_shift )[1]
  //       let tmp2 = w_hourly[i].temp
  //       let tmp3 = getIcon( w_hourly[i].weather["0"].icon )[0]
  //       let item = [tmp1, tmp2, tmp3]
  //       arr_hours.push(item)
  //   }
  //   makeHourlyPanel(arr_hours)

  //  // forecast next 7 days
  //  let arr_days = [];    
  //  for (let i=0; i<8; i++) {
  //       let tmp1 = getLocalDatestamp(w_daily[i].dt, w_time_shift )[0]
  //       let tmp2 = w_daily[i].temp.min
  //       let tmp3 = w_daily[i].temp.max
  //       let tmp4 = getIcon( w_daily[i].weather["0"].icon )[0]
  //       let tmp5 = w_daily[i].weather["0"].description
  //       let item = [tmp1, tmp2, tmp3, tmp4, tmp5]
  //       arr_days.push(item)
  //   }
  //    makeDailyPanel(arr_days)
});

function compileCurrentData(w_current) {
  let temp = w_current.temp;
  let feelsLike = w_current.feels_like;
  let humidity = w_current.humidity;
  let description = w_current.weather[0].description;
  let icon = getIcon( w_current.weather[0].icon )[0];
  return [description, icon, temp, feelsLike, humidity]
}

function compileHourlyData(w_hourly, w_time_shift) {
  let arr_hours = [];
  for (let i=0; i<24; i++) {
      let tmp1 = getLocalDatestamp(w_hourly[i].dt, w_time_shift )[1]
      let tmp2 = w_hourly[i].temp
      let tmp3 = getIcon( w_hourly[i].weather["0"].icon )[0]
      let item = [tmp1, tmp2, tmp3]
      arr_hours.push(item);
  }    
  return arr_hours    
}

function compileDailyData(w_daily, w_time_shift) {
  let arr_days = [];    
  for (let i=0; i<8; i++) {
      let tmp1 = getLocalDatestamp(w_daily[i].dt, w_time_shift )[0]
      let tmp2 = w_daily[i].temp.min
      let tmp3 = w_daily[i].temp.max
      let tmp4 = getIcon( w_daily[i].weather["0"].icon )[0]
      let tmp5 = w_daily[i].weather["0"].description
      let item = [tmp1, tmp2, tmp3, tmp4, tmp5]
      arr_days.push(item);
  }
  return arr_days
}

function processWeatherData(value) {
  let w_time_shift = value.timezone_offset;
  let w_current = value.current;
  let w_hourly = value.hourly;
  let w_daily = value.daily;
  
  // current
  let param = compileCurrentData(w_current)
  makeCurrentPanel(param)
      
  // forecast next 24 hours
  param = compileHourlyData(w_hourly, w_time_shift)
  makeHourlyPanel(param)    
  
  // forecast next 7 days
  param = compileDailyData(w_daily, w_time_shift)
  makeDailyPanel(param)
}    

function makeCurrentPanel(arr) {
    const nowCity = document.querySelector(".now-city-name")
    const nowDescription = document.querySelector(".now-description")
    const nowTemperature = document.querySelector(".now-temperature")
    const nowIcon = document.querySelector("i.now")
    const nowFeelsLike = document.querySelector(".now-feels-like")
    const nowHumidity = document.querySelector(".now-humidity")
    let args = arr
    console.log(args[4])

    nowCity.innerText = city
    nowDescription.innerText = args[0]
    nowTemperature.innerText = preprocessTemp( args[2] )
    nowFeelsLike.innerText = preprocessTemp( args[3] )
    nowHumidity.innerText = args[4]
    nowIcon.classList.add(args[1])
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
       const icon = document.createElement("i");
       icon.classList.add("hour", "wi", item[2]);
       const temp = document.createElement("div");
       temp.classList.add("h-temp");
       temp.innerText = preprocessTemp( item[1] );

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
        const icon = document.createElement("i");
        icon.classList.add("day", "wi", item[3]);
        const describe = document.createElement("div");
        describe.classList.add("d-description");
        describe.innerText = item[4];
        const tmin = document.createElement("div");
        tmin.classList.add("d-tmin");
        tmin.innerText = preprocessTemp( item[1] );
        const tmax = document.createElement("div");
        tmax.classList.add("d-tmax");
        tmax.innerText = preprocessTemp( item[2] );

        container.append(time, icon, describe, tmin, tmax)
        mainContainer.appendChild(container);
    })
}      

function getIcon(codeIcon) {
    let wiCode;
    let day;
    if (codeIcon == "01d") {
      wiCode = "wi-day-sunny";
      day = true;
    } else if (codeIcon == "01n") {
      wiCode = "wi-night-clear";
      day = false;
    } else if (codeIcon == "02d") {
      wiCode = "wi-day-cloudy";
      day = true;
    } else if (codeIcon == "02n") {
      wiCode = "wi-night-alt-cloudy";
      day = false;
    } else if (codeIcon == "03d") {
      wiCode = "wi-cloud";
      day = true;
    } else if (codeIcon == "03n") {
      wiCode = "wi-cloud";
      day = false;
    } else if (codeIcon == "04d") {
      wiCode = "wi-cloudy";
      day = true;
    } else if (codeIcon == "04n") {
      wiCode = "wi-cloudy";
      day = false;
    } else if (codeIcon == "09d") {
      wiCode = "wi-rain";
      day = true;
    } else if (codeIcon == "09n") {
      wiCode = "wi-rain";
      day = false;
    } else if (codeIcon == "10d") {
      wiCode = "wi-showers";
      day = true;
    } else if (codeIcon == "10n") {
      wiCode = "wi-showers";
      day = false;
    } else if (codeIcon == "11d") {
      wiCode = "wi-thunderstorm";
      day = true;
    } else if (codeIcon == "11n") {
      wiCode = "wi-thunderstorm";
      day = false;
    } else if (codeIcon == "13d") {
      wiCode = "wi-day-snow";
      day = true;
    } else if (codeIcon == "13n") {
      wiCode = "wi-night-alt-snow";
      day = false;
    } else if (codeIcon == "50d") {
      wiCode = "wi-fog";
      day = true;
    } else if (codeIcon == "50n") {
      wiCode = "wi-fog";
      day = false;
    }
    return [wiCode, day];
  }

  function preprocessTemp(temp) {
    const btnC = document.querySelector(".celsius")
    const btnF = document.querySelector(".fahrenheit")
    let newTemp 
    let temperature = temp
    if (btnC.classList.contains("selected")) {
        newTemp = Math.round(temperature * 10) / 10
        newTemp = newTemp + `\xB0C`
    } else if (btnF.classList.contains("selected")) {
        newTemp = Math.round( (temperature * 9/5) + 32 ) * 10 / 10
        newTemp = newTemp + `\xB0F`
    }     
    return newTemp
}   

  function changeUnits(e) {
    const btnC = document.querySelector(".celsius")
    const btnF = document.querySelector(".fahrenheit")
    if (e.target.className == "celsius") {
        btnF.classList.remove("selected")
        e.target.classList.add("selected")
    } else if (e.target.className == "fahrenheit") {
        btnC.classList.remove("selected")
        e.target.classList.add("selected")
    }    
    updatePage()
}

function updatePage() {
    const mainContainerH = document.querySelector(".data-hourly")
    const mainContainerD = document.querySelector(".data-daily")
    getWeatherData().then((value) => {
        removeAllChildNodes(mainContainerH);
        removeAllChildNodes(mainContainerD);
   
        processWeatherData(value)
      //   let w_time_shift = value.timezone_offset
      //   let w_current = value.current;
      //   let w_hourly = value.hourly;
      //   let w_daily = value.daily;
    
      //   // current
      //   let date = getLocalDatestamp( w_current.dt, w_time_shift );
      //   let temp = w_current.temp;
      //   let feelsLike = w_current.feels_like;
      //   let humidity = w_current.humidity;
      //   let description = w_current.weather[0].description;
      //   let icon = getIcon( w_current.weather[0].icon )[0];
      //   let arr =  [description, icon, temp, feelsLike, humidity]
      //   makeCurrentPanel(arr) 
    
      //   // forecast next 24 hours
      //   let arr_hours = [];
      //   for (let i=0; i<24; i++) {
      //       let tmp1 = getLocalDatestamp(w_hourly[i].dt, w_time_shift )[1]
      //       let tmp2 = w_hourly[i].temp
      //       let tmp3 = getIcon( w_hourly[i].weather["0"].icon )[0]
      //       let item = [tmp1, tmp2, tmp3]
      //       arr_hours.push(item)
      //   }
      //   makeHourlyPanel(arr_hours)
    
      //  // forecast next 7 days
      //  let arr_days = [];    
      //  for (let i=0; i<8; i++) {
      //       let tmp1 = getLocalDatestamp(w_daily[i].dt, w_time_shift )[0]
      //       let tmp2 = w_daily[i].temp.min
      //       let tmp3 = w_daily[i].temp.max
      //       let tmp4 = getIcon( w_daily[i].weather["0"].icon )[0]
      //       let tmp5 = w_daily[i].weather["0"].description
      //       let item = [tmp1, tmp2, tmp3, tmp4, tmp5]
      //       arr_days.push(item)
      //   }
      //    makeDailyPanel(arr_days)
    });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function readCity(e) {
  const mainContainerH = document.querySelector(".data-hourly")
  const mainContainerD = document.querySelector(".data-daily")
  if (e.key == "Enter") {
      const nowCity = document.querySelector(".now-city-name")
      const cityInput = document.querySelector(".input")
      nowCity.innerText = cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1)
      getWeatherData().then((value) => {
          removeAllChildNodes(mainContainerH);
          removeAllChildNodes(mainContainerD);
          
          processWeatherData(value)
          
          //   let w_time_shift = value.timezone_offset
          //   let w_current = value.current;
          //   let w_hourly = value.hourly;
          //   let w_daily = value.daily;
        
          //   // current
          //   let date = getLocalDatestamp( w_current.dt, w_time_shift );
          //   let temp = w_current.temp;
          //   let feelsLike = w_current.feels_like;
          //   let humidity = w_current.humidity;
          //   let description = w_current.weather[0].description;
          //   let icon = getIcon( w_current.weather[0].icon )[0];
          //   let arr =  [description, icon, temp, feelsLike, humidity]
          //   makeCurrentPanel(arr) 
        
          //   // forecast next 24 hours
          //   let arr_hours = [];
          //   for (let i=0; i<24; i++) {
          //       let tmp1 = getLocalDatestamp(w_hourly[i].dt, w_time_shift )[1]
          //       let tmp2 = w_hourly[i].temp
          //       let tmp3 = getIcon( w_hourly[i].weather["0"].icon )[0]
          //       let item = [tmp1, tmp2, tmp3]
          //       arr_hours.push(item)
          //   }
          //   makeHourlyPanel(arr_hours)
        
          //  // forecast next 7 days
          //  let arr_days = [];    
          //  for (let i=0; i<8; i++) {
          //       let tmp1 = getLocalDatestamp(w_daily[i].dt, w_time_shift )[0]
          //       let tmp2 = w_daily[i].temp.min
          //       let tmp3 = w_daily[i].temp.max
          //       let tmp4 = getIcon( w_daily[i].weather["0"].icon )[0]
          //       let tmp5 = w_daily[i].weather["0"].description
          //       let item = [tmp1, tmp2, tmp3, tmp4, tmp5]
          //       arr_days.push(item)
          //   }
          //    makeDailyPanel(arr_days)
         });
  }
}

function listenerUnits() {
  const container = document.querySelector(".select-temp")    
  container.addEventListener("click", changeUnits) 
}