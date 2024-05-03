import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Calendar from "./Calendar";
import jsonData from "./calendar.json";
import WeatherContainer from "./Weather";
import "./index.css";
import YearlyProgressCircle from "./YearlyProgressCircle";

const App = () => {
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);

  const toggleWeatherPopup = () => {
    setShowWeatherPopup(!showWeatherPopup);
  };

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const daysPassed = Math.floor(diff / oneDay);

  return (
    <React.StrictMode>
      <button onClick={toggleWeatherPopup} className="showWeather">
        Показать погоду
      </button>
      <YearlyProgressCircle daysPassed={daysPassed} />
      <Calendar yearData={jsonData} />
      {showWeatherPopup && (
        <div className="weather-popup">
          <WeatherContainer />
          <button onClick={toggleWeatherPopup}>Закрыть</button>
        </div>
      )}
    </React.StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
