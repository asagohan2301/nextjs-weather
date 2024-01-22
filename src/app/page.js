'use client'
import { useState } from "react";

export default function Page() {
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");

  async function onClickGetWeather() {
    try {
      const resGeocode = await fetch(`/api/geocode?city=${encodeURIComponent(inputCity)}`);
      if (!resGeocode.ok) {
        throw new Error('地理コードの取得に失敗しました');
      }
      const { geocode } = await resGeocode.json();
      setCity(geocode[0].name);
      setInputCity("");

      const resWeather = await fetch(`api/weather?lat=${geocode[0].lat}&lon=${geocode[0].lon}`);
      if (!resWeather.ok) {
        throw new Error('天気情報の取得に失敗しました');
      }
      const { weather } = await resWeather.json();
      setCurrentWeather(weather.weather[0].main);
      setTempMin(Math.round(weather.main.temp_min - 273.15));
      setTempMax(Math.round(weather.main.temp_max - 273.15));
    } catch (error) {
      console.error('エラー:', error);
    }
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
      <p>天気: {currentWeather}</p>
      <p>最低気温: {tempMin}°C</p>
      <p>最高気温: {tempMax}°C</p>
    </div>
  );
}
