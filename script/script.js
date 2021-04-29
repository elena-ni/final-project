let now = new Date();
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];
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
currentDate.innerHTML = ` ${day} <br> ${month} ${date} <br>${hours}:${minutes}`;

// humidity and co

function displayWeatherCondition(response) {
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector("h2").innerHTML = Math.round(
      response.data.main.temp);
}





// current location

function showTemperatureName(response) {
  console.log(response);
  let city = response.data.name;
  console.log(city);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature} °C`;
}

function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "04099ec4651a549421af8748bfefcc06";
  let apiUrl = 
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureName);
}



function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
  console.log()
}



let button = document.querySelector("#currentlocation");
button.addEventListener("click",getCurrentPosition);

// normal search


  
  function searchCity(event) {
    event.preventDefault();
    let apiKey = "04099ec4651a549421af8748bfefcc06";
    let city = document.querySelector("#city-input").value;
    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  
  function handleSubmit(event) {
    event.preventDefault();
    searchCity(city);
  }
  
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);