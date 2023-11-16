// WeatherSearchInput.js
import React from "react";

const WeatherSearchInput = ({ city, setCity, getWeatherData }) => {
  const handleKeyPress = e => {
    if (e.key === "Enter") {
      getWeatherData();
    }
  };

  return (
    <div className="flex justify-center">
      <input
        className="w-[60%] flex justify-center rounded-[1rem] p-5 outline-none bg-[#343d4c] border text-white"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={e => setCity(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default WeatherSearchInput;
