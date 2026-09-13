const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load weather data. Check the city name or your API key.')
  }

  return response.json()
}

export async function getForecastByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Could not load the forecast. Check the city name or your API key.')
  }

  return response.json()
}