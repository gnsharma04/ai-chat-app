/*
This is Weather Plugin, it uses OpenMeteo to fetch weather info
OpenMeteo requires Coordinates of the location, therefore the coordinates are fetched using Nominatim API
*/
import { formatTime, mapWeatherCode } from "../functions/WeatherFunctions";

const weatherPlugin = {
  name: "weather",
  command: "/weather",

  execute: async (input) => {
    const city = input.trim();

    if (!city) {
      return {
        error: "Please Add A City Name.",
      };
    }

    try {
      //Finding coordinates using Nominatim
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city
        )}`
      );
      const data = await response.json();

      if (!data.length) {
        return {
          error: "City Not Found.",
        };
      }

      const { lat, lon, display_name } = data[0];

      //Calling Open-Meteo API with coordinates returned by Nominatim
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`
      );
      const weatherData = await weatherResponse.json();

      const current = weatherData.current_weather;

      if (!current) {
        return {
          error: "Weather data not available for given location.",
        };
      }

      const humidityIndex = weatherData.hourly.time.findIndex(
        (t) => t === current.time
      );
      const humidity =
        humidityIndex !== -1
          ? weatherData.hourly.relative_humidity_2m[humidityIndex] + "%"
          : "N/A";

      return {
        location: display_name,
        temperature: `${current.temperature}°C`,
        condition: mapWeatherCode(current.weathercode),
        windspeed: `${current.windspeed} km/h`,
        humidity,
        time: formatTime(current.time),
      };
    } catch (err) {
      return {
        error: "Failed to fetch weather data.",
        details: err.message,
      };
    }
  },
};

export default weatherPlugin;
