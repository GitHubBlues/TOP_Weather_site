import snowN from './img/4Z_2101.w026.n002.64B.p1.64_.png'
import rainD from './img/4Z_2101.w026.n002.74B.p1.74.jpg'
import fogD from './img/9Z_2104.w026.n002.338B.p1.338_.png'
import cloudN from './img/11Z_2104.w026.n002.345B.p1.345_.png'
import snowD from './img/458.jpg'
import cloudD from './img/2111.w026.n002.1021B.p1.1021_.png'
import thunderstormD from './img/2111.w026.n002.1032B.p1.1032_.png'
import clearD from './img/2201.w015.n001.679A.p30.679_.png'
import clearN from './img/3253_.png'

function setBackgroundImage(codeIcon) {
  const elem = document.querySelector(".fixed-bg");
  if (codeIcon == "01d") {
    elem.style.backgroundColor = "rgb(" + 133 + "," + 33 + "," + 33 + ")";
    elem.style.backgroundImage = "url(" + clearD + ")";
  } else if (codeIcon == "01n") {
    elem.style.backgroundImage = "url(" + clearN + ")";
    elem.style.backgroundColor = "rgb(" + 44 + "," + 48 + "," + 100 + ")";
  } else if (codeIcon == "02d") {
    //cloudy day - same icon as cloud day
    elem.style.backgroundImage = "url(" + cloudD + ")";
    elem.style.backgroundColor = "rgb(" + 254 + "," + 179 + "," + 112 + ")";
  } else if (codeIcon == "02n") {
    //cloudy night -same icon as cloudy day
    elem.style.backgroundImage = "url(" + cloudN + ")";
    elem.style.style.backgroundColor = "rgb(" + 86 + "," + 84 + "," + 160 + ")";
  } else if (codeIcon == "03d") {
    //cloud day
    elem.style.backgroundImage = "url(" + cloudD + ")";
    elem.style.backgroundColor = "rgb(" + 254 + "," + 179 + "," + 112 + ")";
  } else if (codeIcon == "03n") {
    //cloud night
    elem.style.backgroundImage = "url(" + cloudN + ")";
    elem.style.backgroundColor = "rgb(" + 86 + "," + 84 + "," + 160 + ")";
  } else if (codeIcon == "04d") {
    // cloudy day
    elem.style.backgroundImage = "url(" + cloudD + ")";
    elem.style.backgroundColor = "rgb(" + 254 + "," + 179 + "," + 112 + ")";
  } else if (codeIcon == "04n") {
    // cloudy night
    elem.style.backgroundImage = "url(" + cloudN + ")";
    elem.style.backgroundColor = "rgb(" + 86 + "," + 84 + "," + 160 + ")";
  } else if (codeIcon == "09d") {
    // rain day
    elem.style.backgroundImage = "url(" + rainD + ")";
    elem.style.backgroundColor = "rgb(" + 82 + "," + 102 + "," + 129 + ")";
  } else if (codeIcon == "09n") {
    // rain night: same icon as rain day
    elem.style.backgroundImage = "url(" + rainD + ")";
    elem.style.backgroundColor = "rgb(" + 82 + "," + 102 + "," + 129 + ")";
  } else if (codeIcon == "10d") {
    // showers day: same icon as rain
    elem.style.backgroundImage = "url(" + rainD + ")";
    elem.style.backgroundColor = "rgb(" + 82 + "," + 102 + "," + 129 + ")";
  } else if (codeIcon == "10n") {
    // showers night: same icon as rain day
    elem.style.backgroundImage = "url(" + rainD + ")";
    elem.style.backgroundColor = "rgb(" + 82 + "," + 102 + "," + 129 + ")";
  } else if (codeIcon == "11d") {
    // Thunderstorm day
    elem.style.backgroundImage = "url(" + thunderstormD + ")";
    elem.style.backgroundColor = "rgb(" + 254 + "," + 179 + "," + 112 + ")";
  } else if (codeIcon == "11n") {
    // Thunderstorm night: same icon as thinderstorm day
    elem.style.backgroundImage = "url(" + thunderstormD + ")";
    elem.style.backgroundColor = "rgb(" + 254 + "," + 179 + "," + 112 + ")";
  } else if (codeIcon == "13d") {
    // Snow day
    elem.style.backgroundImage = "url(" + snowD + ")";
    elem.style.backgroundColor = "rgb(" + 35 + "," + 35 + "," + 84 + ")";
  } else if (codeIcon == "13n") {
    // Snow night
    elem.style.backgroundImage = "url(" + snowN + ")";
    elem.style.backgroundColor = "rgb(" + 35 + "," + 35 + "," + 84 + ")";
  } else if (codeIcon == "50d") {
    // Fog day
    elem.style.backgroundImage = "url(" + fogD + ")";
    elem.style.backgroundColor = "rgb(" + 180 + "," + 199 + "," + 231 + ")";
  } else if (codeIcon == "50n") {
    // Fog night: same icon as fog day
    elem.style.backgroundImage = "url(" + fogD + ")";
    elem.style.backgroundColor = "rgb(" + 180 + "," + 199 + "," + 231 + ")";
  } else {
    // mars
    elem.style.backgroundImage = "url(" + mars + ")";
  }
}

export { setBackgroundImage };