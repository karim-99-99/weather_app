// WeatherCard.jsx
import { useState } from "react";
import SearchBar from "./SearchBar";
import fetchWeather from "../service/fetchDataAPI";
function weatherEmoji(weather, index = 0) {
  const condition = weather.list[index].weather[0].main.toLowerCase();

  switch (condition) {
    case "clear":
      return "☀️";
    case "clouds":
      return "☁️";
    case "mist":
    case "fog":
    case "haze":
    case "smoke":
      return "🌫️";
    case "rain":
      return "🌧️";
    case "drizzle":
      return "🌦️";
    case "thunderstorm":
      return "⛈️";
    case "snow":
      return "🌨️❄️";
    case "tornado":
      return "🌪️";
    case "dust":
    case "sand":
      return "🌪️🟤";
    default:
      return "🌈"; // fallback
  }
}

function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchWeather(cityName);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <h1 className="text-3xl font-bold mb-4 text-center">Weather App</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        fetchWeather={handleFetchWeather}
      />
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {weather && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-row">
                 <div className="hidden lg:block text-[150px] pt-24 pl-10 sl:text-[120px] sl:pt-36 ">
                {weatherEmoji(weather)}
               </div>
              <div className=" flex flex-col pt-36 lg:items-start lg:justify-start lg:w-full lg:max-w-xl xs:pl-10 xss:pl-16 ss:pl-2  ">
              <h2 className="text-6xl text-align-left mb-4 sl:text-5xl">
                {" "}
                {weather.city.name}, {weather.city.country}{" "}
              </h2>
              <p className="text-3xl font-light opacity-80 mb-2 lg:text-align-left sl:text-lg sl:mr-8 ss:text-2xl">
                 Current temp: {weather.list[0].main.temp.toFixed(1)} °C
              </p>
              <p className="text-2xl font-light opacity-80 lg:text-align-left lg:items-left lg:justify-left sl:text-xl ">
              <span className="lg:hidden ">{weatherEmoji(weather)}</span>  
              {weather.list[0].weather[0].description.toUpperCase()}
              </p>
              <p className="text-3xl font-light pt-2 lg:text-align-left sl:text-2xl ">
                {" "}
                {new Date(weather.list[0].dt * 1000).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  }
                )}
              </p>
               </div>
               
            </div>
            <div className=" p-6 mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 opacity-80">
                <div className="flex flex-col gap-2 border-r border-white/20 pr-4 bg-white/5 p-4 rounded-lg">
                  <p>🔺🌡️ Max temp:{weather.list[0].main.temp_max.toFixed(1)} °C</p>
                  <p>🔻🌡️ Min temp:{weather.list[0].main.temp_min.toFixed(1)} °C</p>
                  <p>👁️ Visibility: {weather.list[0].visibility} meters</p>
                </div>
                <div className="flex flex-col gap-2 border-r border-white/20 pr-4 bg-white/5 p-4 rounded-lg">
                  <p>
                    🌅 Sunrise:{" "}
                    {new Date(weather.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p>
                    🌇 Sunset:{" "}
                    {new Date(weather.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="md:text-sm">☁️ Cloudiness: {weather.list[0].clouds.all} %</p>
                </div>
                <div className="flex flex-col gap-2 border-r border-white/20 pr-4 bg-white/5 p-4 rounded-lg ">
                  <p>💧 Humidity: {weather.list[0].main.humidity} %</p>
                  <p>🌬️ Wind Speed: {weather.list[0].wind.speed} m/s</p>
                  <p>💨 Pressure: {weather.list[0].main.pressure} hPa</p>
                </div>

                <div className="flex flex-col gap-2 border-r border-white/20 pr-4 bg-white/5 p-4 rounded-lg">
                  <p>
                    Geo Coordinates: [Lat: {weather.city.coord.lat}, Lon:{" "}
                    {weather.city.coord.lon}]
                  </p>

                  <p>
                    🕒 Timezone: UTC{" "}
                    {weather.city.timezone >= 0
                      ? `+${weather.city.timezone / 3600}`
                      : weather.city.timezone / 3600}{" "}
                    hours
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 xs:ml-8 xss:ml-14 sl:-ml-0 ">
            <div
              class="w-64 h-64 pt-20 rounded-full border-s border-white/60 backdrop-blur-lg
            shadow-[inset_10px_80px_70px_rgba(0,255,255,0.1)]
            grid grid-cols-2  sl:w-60 sl:h-60"
            >
              <p className="text-3xl mt-2 lg:text-3xl lg:mt-2 font-bold">
                {weather.list[8].main.temp} °C
              </p>
              <p className="text-7xl -mt-4 lg:text-7xl lg:-mt-4">
                {weatherEmoji(weather, 8)}{" "}
              </p>
              <div className="grid grid-rows-2 ">
                <div className="flex flex-col-2 gap-2 ml-6 lg:gap-2 text-sm lg:ml-6 ">
                  <p className="text-sm opacity-50">{weather.list[8].main.humidity}%</p>
                  <p className="text-sm opacity-50">{weather.list[8].wind.speed}m/s</p>
                </div>
                <p className="-mt-16 lg:-mt-16">
                  {new Date(weather.list[8].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                  )}
                </p>
              </div>
              <p className="-mt-3 lg:-mt-3 lg:text-md">
                {weather.city.name} {weather.city.country}
              </p>
            </div>
                 <div
              class="w-64 h-64 pt-20 rounded-full border-s border-white/30 
            shadow-[inset_50px_-40px_40px_rgba(0,255,255,0.1)]
            grid grid-cols-2 sl:w-60 sl:h-60"
            >
              <p className="text-3xl mt-2 lg:text-3xl lg:mt-2 font-bold">
                {weather.list[16].main.temp} °C
              </p>
              <p className="text-7xl -mt-4 lg:text-7xl lg:-mt-4">
                {weatherEmoji(weather, 16)}{" "}
              </p>
              <div className="grid grid-rows-2 ">
                <div className="flex flex-col-2 gap-2 ml-6 lg:gap-2 text-sm lg:ml-6 ">
                  <p className="text-sm opacity-50">{weather.list[16].main.humidity}%</p>
                  <p className="text-sm opacity-50">{weather.list[16].wind.speed}m/s</p>
                </div>
                <p className="-mt-16 lg:-mt-16">
                  {new Date(weather.list[16].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                  )}
                </p>
              </div>
              <p className="-mt-3 lg:-mt-3 lg:text-md">
                {weather.city.name} {weather.city.country}
              </p>
            </div>
                 <div
              class="w-64 h-64 pt-20 rounded-full border-s border-white/30 
            shadow-[inset_50px_-40px_40px_rgba(0,255,255,0.1)]
            grid grid-cols-2 sl:w-60 sl:h-60"
            >
              <p className="text-3xl mt-2 lg:text-3xl lg:mt-2 font-bold">
                {weather.list[24].main.temp} °C
              </p>
              <p className="text-7xl -mt-4 lg:text-7xl lg:-mt-4">
                {weatherEmoji(weather, 24)}{" "}
              </p>
              <div className="grid grid-rows-2 ">
                <div className="flex flex-col-2 gap-2 ml-6 lg:gap-2 text-sm lg:ml-6 ">
                  <p className="text-sm opacity-50">{weather.list[24].main.humidity}%</p>
                  <p className="text-sm opacity-50">{weather.list[24].wind.speed}m/s</p>
                </div>
                <p className="-mt-16 lg:-mt-16">
                  {new Date(weather.list[24].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                  )}
                </p>
              </div>
              <p className="-mt-3 lg:-mt-3 lg:text-md">
                {weather.city.name} {weather.city.country}
              </p>
            </div>
                 <div
              class="w-64 h-64 pt-20 rounded-full border-s border-white/30 
            shadow-[inset_50px_-40px_40px_rgba(0,255,255,0.1)]
            grid grid-cols-2 sl:w-60 sl:h-60 "
            >
              <p className="text-3xl mt-2 lg:text-3xl lg:mt-2 font-bold">
                {weather.list[32].main.temp} °C
              </p>
              <p className="text-7xl -mt-4 lg:text-7xl lg:-mt-4">
                {weatherEmoji(weather, 32)}{" "}
              </p>
              <div className="grid grid-rows-2 ">
                <div className="flex flex-col-2 gap-2 ml-6 lg:gap-2 text-sm lg:ml-6 ">
                  <p className="text-sm opacity-50">{weather.list[32].main.humidity}%</p>
                  <p className="text-sm opacity-50">{weather.list[32].wind.speed}m/s</p>
                </div>
                <p className="-mt-16 lg:-mt-16">
                  {new Date(weather.list[32].dt * 1000).toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                  )}
                </p>
              </div>
              <p className="-mt-3 lg:-mt-3 lg:text-md">
                {weather.city.name} {weather.city.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
