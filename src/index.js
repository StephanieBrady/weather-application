function getDate() {
  let now = new Date();
  console.log(new Date());
  console.log(now.getDay);
  console.log(now.getMinutes);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satuday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let formattedDate = `${day} ${hour}:${minutes}`;
  return formattedDate;
}
let h4 = document.querySelector("h4");
h4.innerHTML = getDate();

//

let searchForm = document.querySelector(".form-inline");
searchForm.addEventListener("submit", search);

//

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function showWeather(response) {
  let icon = document.querySelector("#icon");
  let currentWeather = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let info = document.querySelector("#info");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind-now");
  let fahrenheitTemperature = response.data.main.temp;
  let celsiusTemperature = response.data.main.temp;
  city.innerHTML = response.data.name;
  info.innerHTML = response.data.weather[0].description;
  currentWeather.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} `;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "ea9e7b8bf2f9612b3750d0064eff684e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function search(event) {
  event.preventDefault();
  let cityDisplay = document.querySelector("#city");
  let cityInput = document.querySelector("#search-form");
  cityDisplay.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchLocation(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ea9e7b8bf2f9612b3750d0064eff684e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
//

function displayCelsius(event) {
  event.preventDefault();
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.add("active-temp");
  let fahrenheitink = document.querySelector("#fahrenheit-link");
  fahrenheitink.classList.remove("active-temp");
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("active-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  todayTemp.innerHTML = Math.round(fahrenheitTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

// week 5 //

let celsiusTemperature = null;

searchCity("Fort Payne");
