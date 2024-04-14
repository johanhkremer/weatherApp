import { fetchWeatherData } from "./src/Hooks/useWeatherData";
import lottie from 'lottie-web';

const appElement = document.querySelector('#app');
if (appElement) {
  appElement.innerHTML = `
      <div id="weather-app">
        <div id="lottie-animation"></div>
        <h1>Weather App</h1>
        <input type="text" id="city-input" placeholder="Enter a city name" />
        <button id="search-button">Get Weather</button>
        <div id="weather-data"></div>
      </div>
    `;

  // Initialize Lottie animation after setting up the HTML
  lottie.loadAnimation({
    container: document.getElementById('lottie-animation') as HTMLDivElement,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/public/weather.json' // make sure path is correct
  });

  const searchButton = document.querySelector('#search-button');
  const cityInput = document.querySelector('#city-input') as HTMLInputElement;
  const weatherContainer = document.querySelector('#weather-data');

  // Function to handle fetching weather
  async function handleWeatherFetch() {
    if (cityInput && cityInput.value) {
      const weatherData = await fetchWeatherData(cityInput.value);
      if (weatherData && weatherContainer) {
        weatherContainer.innerHTML = `<p>City: ${weatherData.name}</p>`;
        weatherContainer.innerHTML += `<p>Weather: ${weatherData.weather[0].main} - ${weatherData.weather[0].description}</p>`;
        weatherContainer.innerHTML += `<p>Temperature: ${Math.round(weatherData.main.temp)}°C</p>`;
        weatherContainer.innerHTML += `<p>Humidity: ${weatherData.main.humidity}%</p>`;
      } else if (weatherContainer) {
        weatherContainer.innerHTML = `<p>Error fetching weather data.</p>`;
      }
    }
  }

  // Event listener for button click
  searchButton?.addEventListener('click', handleWeatherFetch);

  // Event listener for 'Enter' key on the input field
  cityInput?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleWeatherFetch();
    }
  });
}
