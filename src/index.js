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
    
    console.log(json);
    return json;
}


getWeatherData();