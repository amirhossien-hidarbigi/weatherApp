import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "d078fcbfd3a8bfc2a147d36ffe7a3c53";

  const getWeatherIconClass = weatherCode => {
    const iconMap = {
      "01d": "wi-day-sunny",
      "02d": "wi-day-cloudy",
      "03d": "wi-cloudy",
      "04d": "wi-cloudy",
      "09d": "wi-showers",
      "10d": "wi-rain",
      "11d": "wi-thunderstorm",
      "13d": "wi-snow",
      "50d": "wi-fog",
    };

    return iconMap[weatherCode] || "wi-day-sunny"; // Default to sunny icon
  };

  const getWeatherBackground = weatherCode => {
    const backgroundMap = {
      "01d": "url('./images/sunny.jpg')",
      "02d": "url('./images/cloudy.jpg')",
      "03d": "url('./images/cloudy.jpg')",
      "04d": "url('./images/cloudy.jpg')",
      "09d": "url('./images/rain.jpg')",
      "10d": "url('./images/rain.jpg')",
      "11d": "url('./images/thunderstorm.jpg')",
      "13d": "url('./images/snow.jpg')",
      "50d": "url('./images/fog.jpg')",
    };

    return backgroundMap[weatherCode] || "url('Rectangle 2.png')";
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeatherData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      getWeatherData();
    }
  };
  const getWeekday = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString("en-US", {
      weekday: "long",
    });
  };
  const getYear = () => {
    const creatDate = new Date();
    return creatDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTemperature = temperature => {
    return temperature.toFixed(0);
  };

  return (
    <div className="bg-[#343d4c] w-full h-[100vh] p-5 ">
      <div className=" flex justify-center">
        <input
          className="w-[60%] flex justify-center rounded-[1rem] p-5 outline-none bg-[#343d4c] border  text-white"
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div className="flex w-[80%] mx-auto justify-center items-center">
        <div className="flex justify-center mt-10 w-[40%]">
          {/* {error && <p>{error}</p>} */}

          {weatherData && weatherData.list && weatherData.list[0] && (
            <div
              className="bg-cover bg-center relative h-[42rem] w-full rounded-[25px] p-10 flex flex-col justify-between"
              style={{
                backgroundImage: getWeatherBackground(
                  weatherData.list[0].weather[0].icon
                ),
              }}
            >
              <div className="flex flex-col gap-2">
                <p className="text-[2rem] text-white font-bold">
                  {getWeekday()}
                </p>
                <p className="text-[1.5rem] text-white ">{getYear()}</p>
                <h2 className="flex text-[1.5rem] text-white items-center">
                  <img className="w-5 h-5" src="Location.png" alt="" />
                  {weatherData.city.name}, {weatherData.city.country}
                </h2>
              </div>
              <div className=" flex flex-col gap-3">
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
          )}
        </div>
        {weatherData && weatherData.list && weatherData.list[0] && (
          <div className="flex flex-col justify-between mt-10 w-[40%] bg-[#222831] h-[39rem] rounded-r-[2rem] ">
            <div className="px-10 py-10">
              <p className="text-white text-[2rem] flex justify-between">
                PRECIPITATION:
                <span>
                  {weatherData.list[0].rain
                    ? weatherData.list[0].rain["3h"]
                    : 0}
                  %
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
            <div className="  p-4 flex flex-col justify-center items-center mb-24">
              <div className="flex p-2">
                {weatherData.list.slice(1, 5).map((forecast, index) => (
                  <div
                    key={index}
                    className=" flex flex-col items-center justify-center text-white bg-[#272e37]  p-2 rounded-[0.5rem] mb-6 w-24 hover:bg-white hover:text-black "
                  >
                    <i
                      className={`wi days-icon ${getWeatherIconClass(
                        forecast.weather[0].icon
                      )}`}
                    />
                    <p className=" text-[rem]">{weekdays[index]}</p>
                    <p className=" text-[2rem]">
                      {formatTemperature(forecast.main.temp)}°C
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
