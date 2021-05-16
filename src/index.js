let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = ` ${day}, ${month} ${date} <br>${hours}:${minutes}`;

//forecast

function displayForecast(params) {
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = `
      <div id="forecast">
        <div class="six-days">
          <div class="row">
            <div class="col-2">
              <div class="card">
                <i class="fas fa-cloud-sun-rain"></i>
                <div class="card-body">
                  <h6>
                    21 C
                  </h6>
                  <hr />
                  <h5 class="card-title">MON</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
}
displayForecast();

// humidity and co

function displayWeatherCondition(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let temperatureNow = document.querySelector("#temperatureNow");
  temperatureNow.innerHTML = `${temperature} °C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
  response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");

    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

}

// current location
function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "04099ec4651a549421af8748bfefcc06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentlocation");
button.addEventListener("click", getCurrentPosition);
// normal search

function searchCity(city) {
  let apiKey = "04099ec4651a549421af8748bfefcc06";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-field").value;

  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
