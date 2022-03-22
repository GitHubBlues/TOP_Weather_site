import { getIcon } from "./weatherIcons.js";
import { getLocalDatestamp, preprocessTemp } from "./helpers.js";

const functionsDOM = (() => {
  function makeCurrentPanel(arr, city) {
    const nowCity = document.querySelector(".now-city-name");
    const nowDescription = document.querySelector(".now-description");
    const nowIcon = document.querySelector("i.now");
    const nowTemperature = document.querySelector(".now-temperature");
    const nowFeelsLike = document.querySelector(".now-feels-like");
    const nowHumidity = document.querySelector(".now-humidity");
    const args = arr;
    nowCity.innerText = city;
    nowDescription.innerText = args[0];
    nowTemperature.innerText = preprocessTemp(args[2]);
    nowFeelsLike.innerText = preprocessTemp(args[3]);
    nowHumidity.innerText = args[4];
    nowIcon.className = "";
    nowIcon.classList.add("now", "wi", args[1]);
  }

  function makeHourlyPanel(arr) {
    const mainContainer = document.querySelector(".data-hourly");
    const data = arr;
    data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("h-container");
      const time = document.createElement("div");
      time.classList.add("h-time");
      time.innerText = item[0];
      const icon = document.createElement("i");
      icon.classList.add("hour", "wi", item[2]);
      const temp = document.createElement("div");
      temp.classList.add("h-temp");
      temp.innerText = preprocessTemp(item[1]);
      container.append(time, icon, temp);
      mainContainer.appendChild(container);
    });
  }

  function makeDailyPanel(arr) {
    const mainContainer = document.querySelector(".data-daily");
    const data = arr;
    data.forEach((item) => {
      const container = document.createElement("div");
      container.classList.add("d-container");
      const time = document.createElement("div");
      time.classList.add("d-time");
      time.innerText = item[0];
      const icon = document.createElement("i");
      icon.classList.add("day", "wi", item[3]);
      const describe = document.createElement("div");
      describe.classList.add("d-description");
      describe.innerText = item[4];
      const tmin = document.createElement("div");
      tmin.classList.add("d-tmin");
      tmin.innerText = preprocessTemp(item[1]);
      const to = document.createElement("div");
      to.classList.add("d-to");
      to.innerText = " to ";
      const tmax = document.createElement("div");
      tmax.classList.add("d-tmax");
      tmax.innerText = preprocessTemp(item[2]);
      container.append(time, icon, describe, tmin, to, tmax);
      mainContainer.appendChild(container);
    });
  }

  function compileCurrentData(w_current) {
    const temp = w_current.temp;
    const feelsLike = w_current.feels_like;
    const humidity = w_current.humidity;
    const description = w_current.weather[0].description;
    const icon = getIcon(w_current.weather[0].icon)[0];
    return [description, icon, temp, feelsLike, humidity];
  }

  function compileHourlyData(w_hourly, w_time_shift) {
    const arr_hours = [];
    for (let i = 0; i < 24; i++) {
      const tmp1 = getLocalDatestamp(w_hourly[i].dt, w_time_shift)[1];
      const tmp2 = w_hourly[i].temp;
      const tmp3 = getIcon(w_hourly[i].weather["0"].icon)[0];
      const item = [tmp1, tmp2, tmp3];
      arr_hours.push(item);
    }
    return arr_hours;
  }

  function compileDailyData(w_daily, w_time_shift) {
    const arr_days = [];
    for (let i = 0; i < 8; i++) {
      const tmp1 = getLocalDatestamp(w_daily[i].dt, w_time_shift)[0];
      const tmp2 = w_daily[i].temp.min;
      const tmp3 = w_daily[i].temp.max;
      const tmp4 = getIcon(w_daily[i].weather["0"].icon)[0];
      const tmp5 = w_daily[i].weather["0"].description;
      const item = [tmp1, tmp2, tmp3, tmp4, tmp5];
      arr_days.push(item);
    }
    return arr_days;
  }

  return {
    makeCurrentPanel,
    makeHourlyPanel,
    makeDailyPanel,
    compileCurrentData,
    compileHourlyData,
    compileDailyData,
  };
})();

export { functionsDOM };
