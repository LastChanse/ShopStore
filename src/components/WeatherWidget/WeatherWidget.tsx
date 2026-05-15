import { useState, useEffect } from 'react';
import { Card } from 'antd';
import { fetchWeather } from '../../api/weatherApi';
import type {WeatherData} from '../../api/weatherApi';

const FALLBACK_WEATHER: WeatherData = {
  city: 'Москва',
  temperature: 18,
  feelsLike: 16,
  description: 'Переменная облачность',
  icon: '⛅',
  humidity: 60,
  windSpeed: 3.5,
};

export default function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          if (!navigator.geolocation) return reject(new Error('Геолокация не поддерживается'));
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
        });

        const realWeather = await fetchWeather(position.coords.latitude, position.coords.longitude);
        if (!cancelled) setData(realWeather);
      } catch (err) {
        console.warn('Погода не загружена, использую запасные данные:', err);
        if (!cancelled) setData(FALLBACK_WEATHER);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadWeather();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <Card className="rounded-xl shadow-md border-0">
        <div className="animate-pulse flex items-center gap-3">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className="rounded-xl border-0 shadow-md bg-gradient-to-br from-blue-500 to-blue-700 text-white overflow-hidden">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{data.icon}</span>
        <div>
          <div className="text-2xl font-bold">{data.temperature}°C</div>
          <div className="text-sm opacity-90">{data.city}</div>
        </div>
      </div>
      <p className="mt-2 capitalize text-sm opacity-95">{data.description}</p>
      <div className="flex justify-between text-xs mt-2 opacity-85">
        <span>Ощущается: {data.feelsLike}°C</span>
        <span>Ветер: {data.windSpeed} м/с</span>
      </div>
    </Card>
  );
}