function getLocalDatestamp(time, offset) {
  const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const ts = new Date((time + offset) * 1000);
  const dd = ts.getUTCDay();
  let hh = ts.getUTCHours();
  let mm = ts.getUTCMinutes();
  if (hh < 10) {
    hh = `0, ${hh}`;
  }
  if (mm < 10) {
    mm = `0, ${mm}`;
  }
  return [dayList[dd], `hh:, ${mm}`];
}

function preprocessTemp(temp) {
  const btnC = document.querySelector(".celsius");
  const btnF = document.querySelector(".fahrenheit");
  let newTemp;
  const temperature = temp;
  if (btnC.classList.contains("selected")) {
    newTemp = Math.round(temperature * 10) / 10;
    newTemp = newTemp + `\xB0C`;
  } else if (btnF.classList.contains("selected")) {
    newTemp = (Math.round((temperature * 9) / 5 + 32) * 10) / 10;
    newTemp = newTemp + `\xB0F`;
  }
  return newTemp;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export { getLocalDatestamp, preprocessTemp, removeAllChildNodes };
