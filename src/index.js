import "./index.css";
import "./normalize.css";
import "./weather-icons/css/weather-icons.min.css";
import { functionsDOM } from "./makeDOM.js";
import { removeAllChildNodes } from "./helpers.js";
import { setBackgroundImage } from "./backgroundImages.js";

let city = "vienna";
onloadHeader();

function onloadHeader() {
  const btnC = document.querySelector(".celsius");
  btnC.classList.add("selected");
  const cityInput = document.querySelector(".input");
  cityInput.addEventListener("keydown", readCity);
  listenerUnits();
}

async function getCoordinates() {
  const myCity = document.querySelector(".now-city-name").innerText;
  if (myCity.length > 0) {
    city = myCity;
  }
  try {
    const data = await fetch(
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&appid=8412386423561ec0eb48a5fac1bd2487",
      { mode: "cors" }
    );
    const json = await data.json();
    return [json[0].lat, json[0].lon];

  } catch (error) {
    alert(error);
    return null;
  }    
}

async function getWeatherData() {
  const coord = await getCoordinates();
  const data = await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      coord[0] +
      "&lon=" +
      coord[1] +
      "&units=metric&exclude={part}&appid=8412386423561ec0eb48a5fac1bd2487",
    { mode: "cors" }
  );
   const json = await data.json();

  return json;
}

getWeatherData().then((value) => {
  processWeatherData(value);
});

function processWeatherData(value) {
  const w_time_shift = value.timezone_offset;
  const w_current = value.current;
  const w_hourly = value.hourly;
  const w_daily = value.daily;

  // current
  let param = functionsDOM.compileCurrentData(w_current);
  functionsDOM.makeCurrentPanel(param, city);
  setBackgroundImage(w_current.weather[0].icon);
  
  // forecast next 24 hours
  param = functionsDOM.compileHourlyData(w_hourly, w_time_shift);
  functionsDOM.makeHourlyPanel(param);

  // forecast next 7 days
  param = functionsDOM.compileDailyData(w_daily, w_time_shift);
  functionsDOM.makeDailyPanel(param);
}

function changeUnits(e) {
  const btnC = document.querySelector(".celsius");
  const btnF = document.querySelector(".fahrenheit");
  if (e.target.className == "celsius") {
    btnF.classList.remove("selected");
    e.target.classList.add("selected");
  } else if (e.target.className == "fahrenheit") {
    btnC.classList.remove("selected");
    e.target.classList.add("selected");
  }
  updatePage();
}

function updatePage() {
  const mainContainerH = document.querySelector(".data-hourly");
  const mainContainerD = document.querySelector(".data-daily");
  getWeatherData().then((value) => {
    removeAllChildNodes(mainContainerH);
    removeAllChildNodes(mainContainerD);

    processWeatherData(value);
  });
}

function readCity(e) {
  const mainContainerH = document.querySelector(".data-hourly");
  const mainContainerD = document.querySelector(".data-daily");
  if (e.key == "Enter") {
    const nowCity = document.querySelector(".now-city-name");
    const cityInput = document.querySelector(".input");
    nowCity.innerText =
      cityInput.value.charAt(0).toUpperCase() + cityInput.value.slice(1);
    getWeatherData().then((value) => {
      removeAllChildNodes(mainContainerH);
      removeAllChildNodes(mainContainerD);

      processWeatherData(value);
    });
  }
}

function listenerUnits() {
  const container = document.querySelector(".select-temp");
  container.addEventListener("click", changeUnits);
}