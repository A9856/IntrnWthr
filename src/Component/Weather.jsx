import React, { useEffect, useState } from 'react';
import search from "../assets/search.png";
import clear from "../assets/clear.webp";
import cloud from "../assets/cloud.webp";
import drizzle from "../assets/drizzle.png";
import rain from "../assets/rain.jpg";
import snow from "../assets/snow.jpg";
import wind from "../assets/wind.jpg";
import hum from "../assets/hum.jpg";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState('');

  const allicons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,  
    "10n": rain,  
    "13d": snow,
    "13n": snow
  };

  async function sear(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.cod === 200) {
        const icon = allicons[data.weather[0].icon] || clear;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temprature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon
        });
      } else {
        setWeatherData(false);
        alert("City not found");
      }
    } catch (error) {
      console.error("API error", error);
    }
  }

  useEffect(() => {
    sear("Jaunpur");
  }, []);

  function handleSearchClick() {
    if (city.trim() !== "") {
      sear(city);
      setCity("");
    }
  }

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img
          src={search}
          alt="Search icon"
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="Weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.temprature}°C</p>
          <p className="location">{weatherData.location}</p>

          <div className="weather-data">
            <div className="col">
              <img src={hum} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind} alt="Wind" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
