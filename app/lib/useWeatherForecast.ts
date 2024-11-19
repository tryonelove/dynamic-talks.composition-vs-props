import { useEffect, useState } from 'react';
import { weatherForecastMocks } from '../data';
import { WeatherForecast } from '../_models/weather-forecast';

type UseWeatherForecastResult =
  | { isLoading: true; weatherForecast: undefined }
  | { isLoading: false; weatherForecast: WeatherForecast };

export function useWeatherForecast(): UseWeatherForecastResult {
  const [isLoading, setIsLoading] = useState(true);
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast>();

  useEffect(() => {
    async function getForecast() {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 1500));

      setWeatherForecast(weatherForecastMocks);

      setIsLoading(false);
    }

    getForecast();
  }, []);

  return { isLoading, weatherForecast } as UseWeatherForecastResult;
}
