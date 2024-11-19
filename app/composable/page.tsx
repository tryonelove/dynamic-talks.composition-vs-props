'use client';
import { MapPinIcon } from 'lucide-react';
import React from 'react';
import {
  WeatherForecastWidget,
  WeatherForecastDistrict,
  WeatherForecastCityInfo,
  WeatherForecastTemperature,
  WeatherForecastTemperaturePreview,
  WeatherForecastTemperatureInfo,
  WeatherForecastAlert,
  WeatherForecastMessage,
  WeatherForecastMap,
  WeatherForecastWeatherType,
  WeatherForecastTypeIcon,
} from '../_components/composable-weather-forecast-widget';
import { weatherForecastMocks as weatherForecast } from '../data';
import { Card } from '../_components/card';
import { Avatar } from '../_components/avatar';

export default function Page() {
  return (
    <div className='flex justify-center items-center gap-8 flex-1'>
      <div className='flex flex-col gap-5 items-center'>
        <WeatherForecastWidget>
          <div>
            {weatherForecast.location.district && (
              <WeatherForecastDistrict
                district={weatherForecast.location.district}
              />
            )}
            <WeatherForecastCityInfo
              city={weatherForecast.location.city}
              country={weatherForecast.location.country}
            />
          </div>
          <WeatherForecastTemperature>
            <WeatherForecastTemperaturePreview
              temperature={weatherForecast.temperatureInfo.temperature}
              icon={
                <WeatherForecastTypeIcon
                  weatherType={weatherForecast.weatherType}
                />
              }
            />
            <WeatherForecastTemperatureInfo
              weatherType={weatherForecast.weatherType}
              temperatureFeelsLike={weatherForecast.temperatureInfo.feelsLike}
            />
          </WeatherForecastTemperature>
          <WeatherForecastAlert type={weatherForecast.weatherType} />
          {/* Add whatever you want here, we're flexible 😎 */}
        </WeatherForecastWidget>

        <WeatherForecastWidget className='flex gap-4'>
          <div className='flex-1 space-y-1'>
            <WeatherForecastDistrict
              icon={<MapPinIcon className='size-4' />}
              district={
                weatherForecast.location.district ??
                `${weatherForecast.location.city}`
              }
            />

            <WeatherForecastTemperature className='flex-1'>
              <WeatherForecastTemperaturePreview
                className='flex-row-reverse'
                temperature={weatherForecast.temperatureInfo.temperature}
                icon={
                  <WeatherForecastTypeIcon
                    weatherType={weatherForecast.weatherType}
                  />
                }
              />
              <WeatherForecastTemperatureInfo
                weatherType={weatherForecast.weatherType}
                temperatureFeelsLike={weatherForecast.temperatureInfo.feelsLike}
              />
            </WeatherForecastTemperature>
            {weatherForecast.infoMessage && (
              <WeatherForecastMessage className='text-blue-500'>
                {weatherForecast.infoMessage}
              </WeatherForecastMessage>
            )}
          </div>
          <WeatherForecastMap />
        </WeatherForecastWidget>

        <WeatherForecastWidget className='bg-gradient-to-br from-blue-800 to-blue-500 text-white'>
          <div>
            <WeatherForecastDistrict
              className='opacity-80'
              icon={<MapPinIcon className='size-5 mr-2' />}
              district={
                weatherForecast.location.district ??
                `${weatherForecast.location.city}`
              }
            />
          </div>
          <WeatherForecastTemperature className='flex-col gap-0 items-start'>
            <WeatherForecastTemperaturePreview
              temperature={weatherForecast.temperatureInfo.temperature}
              icon={
                <WeatherForecastTypeIcon
                  variant='dark'
                  weatherType={weatherForecast.weatherType}
                />
              }
            />
            <WeatherForecastWeatherType
              className='mt-1'
              type={weatherForecast.weatherType}
            />
            {weatherForecast.infoMessage && (
              <WeatherForecastMessage className='mt-2'>
                {weatherForecast.infoMessage}
              </WeatherForecastMessage>
            )}
          </WeatherForecastTemperature>
        </WeatherForecastWidget>
        <Profile />
      </div>
    </div>
  );
}

function Profile() {
  return (
    <Card>
      <Avatar src='https://api.dicebear.com/9.x/pixel-art/svg?seed=John' />
      <p className='mt-2 font-bold'>John doe</p>
    </Card>
  );
}
