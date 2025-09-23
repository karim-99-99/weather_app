
const API_KEY = "a9dae27ed6f6a144dce181b635995f3b"; // Demo key - replace with your own


async function fetchWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }
  return await response.json();
}
export default fetchWeather;



