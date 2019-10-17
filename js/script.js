let API_KEY = "82fd885dfd1aa9272b2bf203794d14a3";
let weatherData;
let currentCityId = 2172797;
let currentCityName = "Брянск"
function loadInCache(key, value) {    
    localStorage.setItem(key, value);
}
function getCache(key) {
    return localStorage.getItem(key);
}
window.onload = function()
{    
     let townId = document.getElementById("Moscow").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("Taganrog").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("London").getAttribute("data-cityId");
    LoadData(townId);
     townId = document.getElementById("Saint-Petersburg").getAttribute("data-cityId");
    LoadData(townId);    
    townId = document.getElementById("Bryansk").getAttribute("data-cityId");
    GetWeatherData(townId);
}
function LoadData(cityId)
{
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + API_KEY + "&units=metric");
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'))
        }
        else {
            weatherData = this.responseText;
            loadInCache(cityId, weatherData);            
        }
    }
}
function fillData() {    
    let weatherDataObject = JSON.parse(weatherData);        
    document.getElementById("pressure").innerText = "Давление: " + parseInt(weatherDataObject["main"]["pressure"]) + " мм.рт.ст.";
    document.getElementById("degrees").innerHTML = parseInt(weatherDataObject["main"]["temp"]) + " C&deg;";
    document.getElementById("windSpeed").innerHTML = "Скорость ветра: " + parseInt(weatherDataObject["wind"]["speed"]) + " м/с";
    document.getElementById("humidity").innerHTML = "Влажность: " + weatherDataObject["main"]["humidity"] + "%";    
    document.getElementById("weatherImage").setAttribute("src", "http://openweathermap.org/img/wn/" + weatherDataObject["weather"][0]["icon"] + "@2x.png")
    document.getElementById("cityName").innerHTML = currentCityName;
}
function getData(object) {    
    let cityId = parseInt(object.getAttribute("data-cityId"));
    currentCityName = object.innerText;
    currentCityId = cityId;
    weatherData = getCache(cityId);
    if (weatherData == "null" || weatherData == null) {
        GetWeatherData(cityId);        

    }
    else {
        fillData();
    }
}

function GetWeatherData(cityId) {
    let xmlHttpRequest = new XMLHttpRequest();
    
    xmlHttpRequest.open("GET", "https://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&APPID=" + API_KEY + "&units=metric");
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'))
        }
        else {
            weatherData = this.responseText;
            loadInCache(cityId, weatherData);
            fillData();
        }
    }
}
function update() {
    GetWeatherData(currentCityId);
}
