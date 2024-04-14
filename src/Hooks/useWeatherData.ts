import { getWeather } from '../services/weatherService.ts';

export async function fetchWeatherData(weatherLocation: string) {
    try {
        const city = weatherLocation;
        const weatherData = await getWeather(city);
        // Process the weather data
        return weatherData;  // Returning the data for further processing or display
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;  // Optionally return null or undefined to signify failure
    }
}