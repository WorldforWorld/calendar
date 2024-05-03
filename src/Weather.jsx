import React, { useState, useEffect } from "react";
const Weather = ({ weatherData }) => {
  const { location, current } = weatherData;

  return (
    <div className="weather-container">
      <span className="weather-info">
        <h4 className="weather-heading">Cейчас</h4>
        {location.name}
      </span>

      <div className="weather-details">
        <p className="weather-info">Температура: {current.temp_c}°C</p>
        <p className="weather-info">Ощущается как: {current.feelslike_c}°C</p>
        <p className="weather-info">Скорость ветра: {current.wind_kph} км/ч</p>
        <p className="weather-info">Направление ветра: {current.wind_dir}</p>
        <p className="weather-info">Влажность: {current.humidity}%</p>
        <p className="weather-info">Облачность: {current.cloud}%</p>
        <p className="weather-info">Уровень UV: {current.uv}</p>
        <p className="weather-info">
          Погодные условия: {current.condition.text}
        </p>
      </div>
      <img
        className="weather-icon"
        src={`https:${current.condition.icon}`}
        alt={current.condition.text}
      />
    </div>
  );
};

const WeatherContainer = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "cd606f4f185944ef85165544240205";
      const city = "Chelyabinsk";
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных о погоде");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Ошибка:", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className="weather-app">
      {weatherData ? (
        <Weather weatherData={weatherData} />
      ) : (
        <p>Загрузка данных о погоде...</p>
      )}
    </div>
  );
};

export default WeatherContainer;
