import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog } from 'lucide-react'

const ICON_MAP = {
  '01d': Sun, '01n': Moon,
  '02d': CloudSun, '02n': CloudMoon,
  '03d': Cloud, '03n': Cloud,
  '04d': Cloud, '04n': Cloud,
  '09d': CloudDrizzle, '09n': CloudDrizzle,
  '10d': CloudRain, '10n': CloudRain,
  '11d': CloudLightning, '11n': CloudLightning,
  '13d': CloudSnow, '13n': CloudSnow,
  '50d': CloudFog, '50n': CloudFog,
}

export default function WeatherIcon({ code, size = 24 }) {
  const Icon = ICON_MAP[code] ?? Cloud
  return <Icon size={size} />
}