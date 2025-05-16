/*
This code is for WeatherPlugin. It uses 2 different APIs.
Nominatim API for determining coordinates for the given location
Open-Meteo API for finding weather conditions according to coordinates returned by Nominatim API
*/

import { formatTime, mapWeatherCode } from "../constants/Constants";

const weatherPlugin = {
  name: "weather",
  command: "/weather",

  execute: async (input) => {
    const city = input.trim();
    if (!city) return { error: "Enter a city name." };

    try {
      //Fetching Coordinates
      const coordRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city
        )}`
      );
      const coords = await coordRes.json();

      if (!coords.length) return { error: "Couldn't find that city." };

      const { lat, lon, display_name } = coords[0];

      //Fetching Weather Conditions
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relative_humidity_2m`
      );
      const weather = await weatherRes.json();

      const current = weather.current_weather;
      if (!current) return { error: "No weather info available." };

      const index = weather.hourly.time.indexOf(current.time);
      const humidity =
        index > -1 ? `${weather.hourly.relative_humidity_2m[index]}%` : "N/A";

      return {
        location: display_name,
        temperature: `${current.temperature}°C`,
        condition: mapWeatherCode(current.weathercode),
        windspeed: `${current.windspeed} km/h`,
        humidity,
        time: formatTime(current.time),
      };
    } catch (e) {
      return {
        error: "Error fetching weather.",
        details: e.message,
      };
    }
  },
};

export default weatherPlugin;
