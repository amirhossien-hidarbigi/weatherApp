// WeatherDetails.js
import React from "react";
import { formatTemperature } from "./WeatherUtils";

const WeatherDetails = ({ weatherData }) => {
  return (
    <div className="flex flex-col justify-between mt-10 w-[40%] bg-[#222831] h-[39rem] rounded-r-[2rem]">
      <div className="px-10 py-10">
        <p className="text-white text-[2rem] flex justify-between">
          PRECIPITATION:
          <span>
            {weatherData.list[0].rain ? weatherData.list[0].rain["3h"] : 0}%
          </span>
        </p>
        <p className="text-white text-[2rem] flex justify-between">
          HUMIDITY:<span> {weatherData.list[0].main.humidity}%</span>
        </p>
        <p className="text-white text-[2rem] flex justify-between">
          WIND:
          <span>{weatherData.list[0].wind.speed}km/h</span>
        </p>
      </div>
      <div className="p-4 flex flex-col justify-center items-center mb-24">
        <div className="flex p-2">
          {weatherData.list.slice(1, 5).map((forecast, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-white bg-[#272e37] p-2 rounded-[0.5rem] mb-6 w-24 hover:bg-white hover:text-black "
            >
              <i
                className={`wi days-icon ${getWeatherIconClass(
                  forecast.weather[0].icon
                )}`}
              />
              <p className="text-[1.7rem]">{weekdays[index]}</p>
              <p className="text-[2rem]">
                {formatTemperature(forecast.main.temp)}°C
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
