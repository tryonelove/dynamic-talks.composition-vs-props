'use client';
import { WeatherForecastWidget } from '../_components/weather-forecast-widget';
import { useWeatherForecast } from '../lib/useWeatherForecast';

export default function NotComposablePage() {
  const { isLoading, weatherForecast } = useWeatherForecast();

  return (
    <div className='flex justify-center items-center gap-8 flex-1'>
      <WeatherForecastWidget
        temperatureWithIconClassName='flex-row-reverse'
        weatherForecast={weatherForecast}
        isLoading={isLoading}
        getDateRangeFormatter={(d) => d.toLocaleTimeString()}
        showForecastChart
        showMinMaxTemperature
        showMap
        infoMessage={weatherForecast?.infoMessage}
      />
    </div>
  );
}
