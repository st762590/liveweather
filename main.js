// JavaScript Code
var inputval = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descrip = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

var apik = "3045dd712ffe6e702e3245525ac7fa38";

function convertion(val) {
  return (val - 273).toFixed(2);
}

btn.addEventListener('click', function() {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputval.value + '&appid=' + apik)
    .then(res => res.json())
    .then(data => {
      var nameval = data['name'];
      var descrip = data['weather']['0']['description'];
      var tempature = data['main']['temp'];
      var wndspd = data['wind']['speed'];

      city.innerHTML = `Weather of <span>${nameval}<span>`;
      temp.innerHTML = `Temperature: <span>${convertion(tempature)} C</span>`;
      description.innerHTML = `Sky Conditions: <span>${descrip}<span>`;
      wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`;
    })
    .catch(err => alert('You entered Wrong city name'));
});

// API URL and API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'YOUR_API_KEY';

// DOM elements
let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");
let weatherIcon = document.querySelector(".weather-icon");
let tempElement = document.querySelector(".temp");
let cityElement = document.querySelector(".city");
let humidityElement = document.querySelector(".humidity");
let pressureElement = document.querySelector(".pressure");

// Function to check the weather for a city
async function checkWeather(city) {
  try {
    // Make API call to fetch weather data
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);

    if (!response.ok) {
      throw new Error("Unable to fetch weather data.");
    }

    // Parse the response JSON
    const data = await response.json();

    // Update the DOM with weather information
    cityElement.innerHTML = data.name;
    const tempCelcius = Math.round(data.main.temp);
    tempElement.innerHTML = tempCelcius + "°C";
    humidityElement.innerHTML = data.main.humidity + "%";
    pressureElement.innerHTML = data.main.pressure;

    // Set the weather icon based on weather conditions
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "../images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "../images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "../images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "../images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "../images/mist.png";
    }

    // Display the weather section and hide error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".err").style.display = "none";
  } catch (error) {
    // Display error message and hide weather section
    document.querySelector(".err").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    console.error(error);
  }
}

// Add event listener to search button
searchButton.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city");
  }
});

// ...

// Timer to fetch weather data at regular intervals
setInterval(() => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  }
}, 30000); // Fetch weather data every 30 seconds

// ...

// API endpoint for Hindi news
const newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=in&language=hi&apiKey=794e9469a504400abab4c24c08396aa6';

// Function to fetch news data
async function fetchNews() {
  try {
    const response = await fetch(newsApiUrl);
    const data = await response.json();
    const newsArticles = data.articles;
    displayNews(newsArticles);
  } catch (error) {
    console.error(error);
  }
}

// Function to display news articles
function displayNews(newsArticles) {
  const newsList = document.getElementById('news-list');
  newsList.innerHTML = '';
  newsArticles.forEach((article) => {
    const newsItem = document.createElement('li');
    newsItem.innerHTML = `
      <h2>${article.title}</h2>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;
    newsList.appendChild(newsItem);
  });
}

// Call the fetchNews function
fetchNews();