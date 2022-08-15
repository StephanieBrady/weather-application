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

function celsius(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = 29;

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.add("active-temp");
  let farenheitLink = document.querySelector("#farenheit-link");
  farenheitLink.classList.remove("active-temp");
}

function farenheit(event) {
  event.preventDefault();
  let todayTemp = document.querySelector("#temperature");
  todayTemp.innerHTML = 85;

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.classList.remove("active-temp");
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);
let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", farenheit);

// week 5 //

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentPosition);

function showWeather(response) {
  let currentWeather = document.querySelector("#temperature");
  currentWeather.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let info = document.querySelector("#info");
  info.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-now");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} `;
}

function searchCity(city) {
  let units = "imperial";
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
  let units = "imperial";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ea9e7b8bf2f9612b3750d0064eff684e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}
searchCity("Fort Payne");
