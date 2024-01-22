'use client'

export default function Page({ weather, tempMin, tempMax }) {
  return (
    <div className="text-center mt-8">
      <input
        type="text"
        placeholder="都市名を入力"
        className="border p-2 mr-3 mb-5"
      />
      <button className="bg-gray-200 p-2 rounded-md">天気情報を取得する</button>
      <h1>千葉県千葉市</h1>
      <p>天気: {weather}</p>
      <p>最低気温: {tempMin}°C</p>
      <p>最高気温: {tempMax}°C</p>
    </div>
  );
}
