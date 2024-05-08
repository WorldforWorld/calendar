import React, { useState, useEffect } from "react";
const Weather = ({ weatherData }) => {
  const { location, current } = weatherData;
  function weatherConditions(condition) {
    if (condition == "Partly cloudy") {
      return "Переменная облачность";
    }
  }
  return (
    <div className="weather-container">
      <p className="weather-info">
        {location.name}
        <h4 className="weather-heading">
          <b>Cейчас </b>
        </h4>
      </p>

      <div className="weather-details">
        <p className="weather-info">
          <b>Температура:</b> {current.temp_c}°C
        </p>
        <p className="weather-info">
          <b>Ощущается как:</b> {current.feelslike_c}°C
        </p>
        <p className="weather-info">
          <b>Скорость ветра:</b> {current.wind_kph} км/ч
        </p>
        <p className="weather-info">
          <b>Направление ветра:</b> {current.wind_dir}
        </p>
        <p className="weather-info">
          <b>Влажность:</b> {current.humidity}%
        </p>
        <p className="weather-info">
          <b>Облачность:</b> {current.cloud}%
        </p>
        <p className="weather-info">
          <b>Уровень UV:</b> {current.uv}
        </p>
        <p className="weather-info">
          <b>Погодные условия:</b> <br />
          {weatherConditions(current.condition.text)}
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
