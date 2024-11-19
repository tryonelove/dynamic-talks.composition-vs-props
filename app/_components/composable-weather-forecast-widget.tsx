import { ComponentType, HTMLAttributes, ReactNode } from 'react';
import {
  ChevronRight,
  CloudIcon,
  CloudRainIcon,
  SunIcon,
  UmbrellaIcon,
} from 'lucide-react';
import { WeatherForecast } from '../_models/weather-forecast';
import { cn } from '../lib/utils';
import React from 'react';

export function WeatherForecastWidget({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'shadow rounded-xl p-2 space-y-2 bg-widget-background',
        className
      )}
    >
      {children}
    </div>
  );
}

export function WeatherForecastDistrict({
  className,
  icon,
  district,
}: {
  className?: string;
  icon?: ReactNode;
  district: string;
}) {
  return (
    <h3
      className={cn(
        'flex items-center gap-1 font-extrabold text-base',
        className
      )}
    >
      {icon}
      {district}
    </h3>
  );
}

export function WeatherForecastCityInfo({
  city,
  country,
}: {
  city: string;
  country: string;
}) {
  return (
    <h3 className='text-sm font-bold text-gray-500'>
      {city}, {country}
    </h3>
  );
}

const iconToWeatherTypeMap: Record<
  WeatherForecast['weatherType'],
  ComponentType<HTMLAttributes<SVGSVGElement>>
> = {
  sunny: SunIcon,
  rain: CloudRainIcon,
  cloudy: CloudIcon,
};

const labelToWeatherTypeMap: Record<WeatherForecast['weatherType'], string> = {
  sunny: 'Sunny',
  cloudy: 'Cloudy',
  rain: 'Rain coming',
};

export function WeatherForecastWeatherType({
  className,
  type,
}: {
  className?: string;
  type: WeatherForecast['weatherType'];
}) {
  return (
    <p className={cn('font-extrabold text-2xl leading-7', className)}>
      {labelToWeatherTypeMap[type]}
    </p>
  );
}

export function WeatherForecastTemperatureInfo({
  weatherType,
  temperatureFeelsLike,
}: {
  weatherType: WeatherForecast['weatherType'];
  temperatureFeelsLike: number;
}) {
  return (
    <div>
      <WeatherForecastWeatherType type={weatherType} />
      <p className='text-gray-500 text-base font-bold'>
        Feels like {temperatureFeelsLike}°
      </p>
    </div>
  );
}

interface WeatherForecastTypeIconProps extends HTMLAttributes<SVGSVGElement> {
  weatherType: WeatherForecast['weatherType'];
  variant?: 'light' | 'dark';
}

export function WeatherForecastTypeIcon({
  weatherType,
  variant = 'light',
  ...restProps
}: WeatherForecastTypeIconProps) {
  const Icon = iconToWeatherTypeMap[weatherType];

  return (
    <Icon
      {...restProps}
      className={cn(restProps.className, 'size-9', {
        'text-orange-400': weatherType === 'sunny' && variant === 'light',
        'text-blue-400':
          (weatherType === 'rain' || weatherType === 'cloudy') &&
          variant === 'light',
        'text-blue-200':
          (weatherType === 'rain' || weatherType === 'cloudy') &&
          variant === 'dark',
      })}
    />
  );
}

interface WeatherForecastTemperaturePreviewProps {
  className?: string;
  temperature: number;
  icon: ReactNode;
}

export function WeatherForecastTemperaturePreview({
  className,
  temperature,
  icon,
}: WeatherForecastTemperaturePreviewProps) {
  return (
    <div className={cn('flex gap-1 items-center', className)}>
      {icon}
      <h1 className='text-5xl font-bold'>{temperature}°</h1>
    </div>
  );
}

export function WeatherForecastTemperature({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn('flex gap-4 items-center', className)}>{children}</div>
  );
}

interface WeatherForecastAlertProps {
  type: WeatherForecast['weatherType'];
}

const weatherForecastAlertIconMap: Partial<
  Record<WeatherForecast['weatherType'], ReactNode>
> = {
  rain: <UmbrellaIcon className='size-5 text-blue-600 fill-blue-600' />,
};

const weatherForecastAlertLabelMap: Partial<
  Record<WeatherForecast['weatherType'], string>
> = {
  rain: 'Rain starts soon',
};

const typesWithAlert = Object.keys(weatherForecastAlertLabelMap) as Array<
  WeatherForecast['weatherType']
>;

export function WeatherForecastAlert({ type }: WeatherForecastAlertProps) {
  if (!typesWithAlert.includes(type)) {
    return null;
  }

  return (
    <button
      className={cn(
        'flex items-center text-start gap-2 py-2 px-4 w-full duration-300 rounded-lg',
        {
          'bg-blue-100 hover:bg-blue-200': type === 'rain',
          'bg-amber-300 hover:bg-amber-200': type === 'sunny',
        }
      )}
    >
      {weatherForecastAlertIconMap[type]}
      <span className='font-bold text-sm flex-1'>
        {weatherForecastAlertLabelMap[type]}
      </span>
      <ChevronRight className='size-4' />
    </button>
  );
}

interface WeatherForecastMapProps {
  className?: string;
}

export function WeatherForecastMap({ className }: WeatherForecastMapProps) {
  return (
    <div
      className={cn(
        'overflow-hidden w-24 h-32 object-contain rounded-xl',
        className
      )}
    >
      <iframe
        className='mt-[-32px] ml-[-50px]'
        width='200'
        height='200'
        src='https://www.openstreetmap.org/export/embed.html?bbox=20.986289978027347%2C52.22222629691695%2C21.02542877197266%2C52.24136126431274&amp;layer=mapnik&amp;marker=52.23179481161377%2C21.005859375'
        style={{ border: 0 }}
        loading='lazy'
      ></iframe>
    </div>
  );
}

export function WeatherForecastMessage({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn('text-sm font-bold max-w-36', className)}>{children}</p>
  );
}
