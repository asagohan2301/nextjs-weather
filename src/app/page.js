'use client'

import { useState } from "react";

export default function Page() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  const key = "xxx";

  async function onClickGetWeather() {
    const urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${key}`
    const resGeo = await fetch(urlGeo);
    if (!resGeo.ok) {
      throw new Error('Failed to fetch data')
    }
    const dataGeo = await resGeo.json();
    setCity(dataGeo[0].name);
    setInputCity("");

    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${dataGeo[0].lat}&lon=${dataGeo[0].lon}&appid=${key}`;
    const resWeather = await fetch(urlWeather);
    if (!resWeather.ok) {
      throw new Error('Failed to fetch data')
    }
    const dataWeather = await resWeather.json();
    setWeather(dataWeather.weather[0].main);
    setTempMin(Math.round(dataWeather.main.temp_min - 273.15));
    setTempMax(Math.round(dataWeather.main.temp_max - 273.15));
  }

  function onChangeSetCity(e) {
    setInputCity(e.target.value);
  }

  return (
    <div className="text-center mt-8">
      <input
        type="text"
        placeholder="都市名を入力"
        className="border p-2 mr-3 mb-5"
        onChange={onChangeSetCity}
        value={inputCity}
      />
      <button className="bg-gray-200 p-2 rounded-md" onClick={onClickGetWeather}>天気情報を取得する</button>
      <h1>都市名: {city}</h1>
      <p>天気: {weather}</p>
      <p>最低気温: {tempMin}°C</p>
      <p>最高気温: {tempMax}°C</p>
    </div>
  );
}
