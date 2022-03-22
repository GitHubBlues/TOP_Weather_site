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

export { getIcon };
