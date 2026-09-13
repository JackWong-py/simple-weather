// Groups OpenWeatherMap's 3-hour forecast steps into one summary per day.
export function groupForecastByDay(forecastData) {
  const days = {}

  forecastData.list.forEach((entry) => {
    const date = entry.dt_txt.split(' ')[0] // "2026-09-13 12:00:00" -> "2026-09-13"

    if (!days[date]) {
      days[date] = {
        date,
        temps: [],
        icon: entry.weather[0].icon,
        description: entry.weather[0].description,
      }
    }

    days[date].temps.push(entry.main.temp)

    // Prefer the midday reading for the icon, since it's usually more
    // representative of "the day" than whatever a 3am reading shows.
    if (entry.dt_txt.includes('12:00:00')) {
      days[date].icon = entry.weather[0].icon
      days[date].description = entry.weather[0].description
    }
  })

  return Object.values(days)
    .slice(0, 5)
    .map((day) => ({
      date: day.date,
      minTemp: Math.round(Math.min(...day.temps)),
      maxTemp: Math.round(Math.max(...day.temps)),
      icon: day.icon,
      description: day.description,
    }))
}