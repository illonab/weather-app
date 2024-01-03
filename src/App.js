import "./App.scss";
import React, { useState } from "react";
import axios from "axios";

const API_KEY = "03e1f63109d4e90ecfc89ac8965a9071";
const API_URL = "https://api.openweathermap.org/data/2.5/";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter") {
      try {
        const response = await axios.get(
          `${API_URL}weather?q=${query}&units=metric&appid=${API_KEY}`
        );
        setWeather(response.data);
        setQuery("");
        console.log(weather);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app app__warm"
            : "app"
          : "app"
      }
    >
      <main className="main">
        <div className="search">
          <input
            type="text"
            className="search__search-bar"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location-box__location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="location-box__date">
                {dateBuilder(new Date())}
              </div>
            </div>

            <div className="weather-box">
              <div className="weather-box__temp">
                <p>{Math.round(weather.main.temp)}°C</p>
                <p>{Math.round((weather.main.temp * 9) / 5 + 32)}°F</p>
              </div>
              <div className="weather-box__weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
