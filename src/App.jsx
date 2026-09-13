import { useState, useEffect } from 'react'
import { getWeatherByCity, getForecastByCity } from './services/weatherAPI'
import { groupForecastByDay } from './utils/groupForecastByDay'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import WeatherIcon from './components/ui/WeatherIcon'

function App() {
  const [query, setQuery] = useState('')
  const [formError, setFormError] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  function fetchWeather(city) {
    setLoading(true)
    setError(null)
    Promise.all([getWeatherByCity(city), getForecastByCity(city)])
      .then(([weatherData, forecastData]) => {
        setWeather(weatherData)
        setForecast(groupForecastByDay(forecastData))
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchWeather('Kuala Lumpur')
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) {
      setFormError('Enter a city name.')
      return
    }
    setFormError('')
    fetchWeather(trimmed)
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 gap-4 p-4 pt-10">
      <form onSubmit={handleSubmit} className="flex w-80 gap-2">
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            if (formError) setFormError('')
          }}
          placeholder="Search a city..."
        />
        <Button type="submit">Search</Button>
      </form>

      {formError && <p className="text-red-500 text-sm">{formError}</p>}

      {loading && (
        <Card className="w-80">
          <CardContent className="pt-6 text-center text-gray-500">Loading...</CardContent>
        </Card>
      )}

      {!loading && error && (
        <Card className="w-80">
          <CardContent className="pt-6 text-center text-red-500">{error}</CardContent>
        </Card>
      )}

      {!loading && !error && weather && (
        <Card className="w-80">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{weather.name}</CardTitle>
            <CardDescription className="capitalize">{weather.weather[0].description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-6xl font-bold text-blue-600">{Math.round(weather.main.temp)}°C</p>
            <div className="flex justify-between w-full pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-xs text-gray-400">Humidity</p>
                <p className="text-lg font-medium text-gray-700">{weather.main.humidity}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">Wind</p>
                <p className="text-lg font-medium text-gray-700">{weather.wind.speed} m/s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !error && forecast.length > 0 && (
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            {forecast.map((day) => (
              <div key={day.date} className="flex flex-col items-center gap-1">
                <p className="text-xs text-gray-500">
                  {new Date(`${day.date}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short' })}
                </p>
                <WeatherIcon code={day.icon} size={20} />
                <p className="text-xs">
                  <span className="font-medium">{day.maxTemp}°</span>{' '}
                  <span className="text-gray-400">{day.minTemp}°</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default App