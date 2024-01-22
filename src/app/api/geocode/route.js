export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`;

  const res = await fetch(url);
  const geocode = await res.json();
  return Response.json({ geocode });
}