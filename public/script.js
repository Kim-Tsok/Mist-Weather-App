const apiKey = "2837cebcf903ec8086e6c7ac3b2576c1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchBox = document.querySelector("#searchBar");
const searchBtn = document.querySelector("#searchBtn");
const weatherIcon = document.querySelector("#weatherImg");
const weatherBg = document.getElementById("bg");

const searchForm = document.querySelector("#searchForm");
const loadingIndicator = document.querySelector("#loading");
const bgNext = document.querySelector("#bg-next");

async function checkWeather(city) {
  if (!city) return;
  
  loadingIndicator.style.display = "flex";
  
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);

    if (response.status == 404) {
      document.querySelector("#invalid").style.display = "block";
      document.querySelector("#info").style.display = "none";
      loadingIndicator.style.display = "none";
      return;
    } else {
      document.querySelector("#invalid").style.display = "none";
      document.querySelector("#info").style.display = "block";
    }

    var data = await response.json();

    document.querySelector("#cityName").textContent = data.name;
    document.querySelector("#temperature").textContent = Math.round(data.main.temp) + "ºC";
    document.querySelector("#weather").textContent = data.weather[0].main;
    document.querySelector("#humidity").textContent = data.main.humidity + "%";
    document.querySelector("#wind").textContent = data.wind.speed + "Km/h";

    const weatherIcons = {
      "Clouds": "/Cloudy.svg",
      "Clear": "/Sunny.svg",
      "Rain": "/Thunder.svg",
      "Drizzle": "/Rain.svg",
      "Mist": "/Wind.svg"
    };

    const weatherBgs = {
      "Clouds": "url('/cloudy.jpg')",
      "Clear": "url('/clear.jpg')",
      "Rain": "url('/thunder.jpg')",
      "Drizzle": "url('/rain.jpg')",
      "Mist": "url('/wind.jpg')"
    };

    const condition = data.weather[0].main;
    weatherIcon.src = weatherIcons[condition] || "/Sunny with cloud.svg";
    
    const nextBgUrl = weatherBgs[condition] || "url('/bg.jpg')";
    if (bg.style.backgroundImage !== nextBgUrl && getComputedStyle(bg).backgroundImage !== nextBgUrl) {
      bgNext.style.backgroundImage = nextBgUrl;
      bgNext.style.opacity = "1";
      
      setTimeout(() => {
        bg.style.backgroundImage = nextBgUrl;
        bgNext.style.opacity = "0";
      }, 1000);
    }

  } catch (error) {
    console.error("Error fetching weather:", error);
  } finally {
    loadingIndicator.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather(searchBox.value);
});
