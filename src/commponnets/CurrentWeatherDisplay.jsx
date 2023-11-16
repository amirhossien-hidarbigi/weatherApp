// CurrentWeatherDisplay.js
import React from "react";
import {
  getWeatherBackground,
  getWeatherIconClass,
  formatTemperature,
} from "./WeatherUtils";

const CurrentWeatherDisplay = ({ weatherData }) => {
  const getWeekday = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };

  const getYear = () => {
    const createDate = new Date();
    return createDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="bg-cover bg-center relative h-[42rem] w-full rounded-[25px] p-10 flex flex-col justify-between"
      style={{
        backgroundImage: getWeatherBackground(
          weatherData.list[0].weather[0].icon
        ),
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-[2rem] text-white font-bold">{getWeekday()}</p>
        <p className="text-[1.5rem] text-white ">{getYear()}</p>
        <h2 className="flex text-[1.5rem] text-white items-center">
          <img className="w-5 h-5" src="Location.png" alt="" />
          {weatherData.city.name}, {weatherData.city.country}
        </h2>
      </div>
      <div className="flex flex-col gap-3">
        <i
          className={`wi weather-icon ${getWeatherIconClass(
            weatherData.list[0].weather[0].icon
          )}`}
        />
        <p className="text-[2.5rem] text-white font-bold pl-2 ">
          {formatTemperature(weatherData.list[0].main.temp)}°C
        </p>
        <p className="text-[1.2rem] text-white ">
          {weatherData.list[0].weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeatherDisplay;
