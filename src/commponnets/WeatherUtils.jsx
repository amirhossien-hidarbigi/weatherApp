// WeatherUtils.js
export const getWeatherIconClass = weatherCode => {
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

  return iconMap[weatherCode] || "wi-day-sunny";
};

export const getWeatherBackground = weatherCode => {
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

export const formatTemperature = temperature => {
  return temperature.toFixed(0);
};

export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
