import Page from "@/app/page";

async function getWeather() {
  const key = process.env.WEATHER_API_KEY;
  const lat = 35;
  const lon = 140;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json();
  return data;
}

export default async function Weather() {
  const data = await getWeather();
  const weather = data.weather[0].main;
  const tempMin = Math.round(data.main.temp_min - 273.15);
  const tempMax = Math.round(data.main.temp_max - 273.15);
  return (
    <Page weather={weather} tempMin={tempMin} tempMax={tempMax} />
  );
}