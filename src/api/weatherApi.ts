const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export interface WeatherData {
  city: string;
  temperature: number;
  feelsLike: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
  console.log('Запрос погоды:', url);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Ошибка погоды: ${response.status}`);

  const data = await response.json();
  console.log('Ответ API погоды:', data);

  const current = data.current;

  const weatherCodes: Record<number, { description: string; icon: string }> = {
    0: { description: 'Ясно', icon: '☀️' },
    1: { description: 'Преимущественно ясно', icon: '🌤️' },
    2: { description: 'Переменная облачность', icon: '⛅' },
    3: { description: 'Пасмурно', icon: '☁️' },
    45: { description: 'Туман', icon: '🌫️' },
    48: { description: 'Изморозь', icon: '🌫️' },
    51: { description: 'Легкая морось', icon: '🌦️' },
    53: { description: 'Морось', icon: '🌦️' },
    55: { description: 'Сильная морось', icon: '🌧️' },
    61: { description: 'Небольшой дождь', icon: '🌦️' },
    63: { description: 'Дождь', icon: '🌧️' },
    65: { description: 'Сильный дождь', icon: '🌧️' },
    71: { description: 'Небольшой снег', icon: '🌨️' },
    73: { description: 'Снег', icon: '🌨️' },
    75: { description: 'Сильный снегопад', icon: '❄️' },
    77: { description: 'Снежные зерна', icon: '❄️' },
    80: { description: 'Ливень', icon: '🌧️' },
    81: { description: 'Сильный ливень', icon: '🌧️' },
    82: { description: 'Очень сильный ливень', icon: '🌧️' },
    85: { description: 'Небольшой снегопад', icon: '🌨️' },
    86: { description: 'Сильный снегопад', icon: '❄️' },
    95: { description: 'Гроза', icon: '⛈️' },
    96: { description: 'Гроза с градом', icon: '⛈️' },
    99: { description: 'Сильная гроза с градом', icon: '⛈️' },
  };

  const code = current.weather_code ?? 0;
  const weatherInfo = weatherCodes[code] || { description: 'Неизвестно', icon: '🌡️' };

  let city = `${lat.toFixed(2)}°${lat >= 0 ? 'N' : 'S'}, ${lon.toFixed(2)}°${lon >= 0 ? 'E' : 'W'}`;
  try {
    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const geoData = await geoRes.json();
    city = geoData.address?.city || geoData.address?.town || geoData.address?.village || 'Неизвестно';
  } catch {
  }
  return {
    city,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    description: weatherInfo.description,
    icon: weatherInfo.icon,
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
  };
};