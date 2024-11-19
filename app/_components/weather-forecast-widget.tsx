import {
  ChevronRight,
  CloudIcon,
  CloudRainIcon,
  SunIcon,
  UmbrellaIcon,
} from 'lucide-react';
import { WeatherForecast } from '../_models/weather-forecast';
import { Skeleton } from './skeleton';
import { cn } from '../lib/utils';
import { WeatherForecastMap } from './composable-weather-forecast-widget';

interface WeatherForecastWidgetProps {
  temperatureWithIconClassName?: string;
  weatherForecast?: WeatherForecast;
  isLoading?: boolean;
  showForecastChart?: boolean;
  getDateRangeFormatter?: (date: Date) => string;
  showMinMaxTemperature?: boolean;
  showMap?: boolean;
  infoMessage?: string;
}

export function WeatherForecastWidget(props: WeatherForecastWidgetProps) {
  return (
    <div className='shadow rounded-xl p-2 space-y-1 bg-widget-background'>
      <LocationInfo
        isLoading={!!props.isLoading}
        location={props.weatherForecast?.location}
      />
      <div className='flex gap-4'>
        <div className='space-y-1'>
          <TemperatureInfo
            temperatureWithIconClassName={props.temperatureWithIconClassName}
            isLoading={!!props.isLoading}
            weatherType={props.weatherForecast?.weatherType}
            temperature={props.weatherForecast?.temperatureInfo.temperature}
            temperatureFeelsLike={
              props.weatherForecast?.temperatureInfo.feelsLike
            }
          />
          {props.infoMessage && (
            <p className='text-sm font-bold max-w-36 text-blue-500'>
              {props.infoMessage}
            </p>
          )}
        </div>
        {props.showMap && <WeatherForecastMap className='size-24' />}
      </div>
      {!props.isLoading &&
        props.weatherForecast?.alertTypes.includes('rainComing') && (
          <RainComingAlert />
        )}
    </div>
  );
}

interface LocationInfoProps {
  className?: string;
  isLoading: boolean;
  location?: {
    city: string;
    district?: string;
    country: string;
  };
}

function LocationInfo({ className, isLoading, location }: LocationInfoProps) {
  if (isLoading) {
    return (
      <div className={cn(className, 'space-y-1')}>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-4 w-24' />
      </div>
    );
  }

  if (!location) {
    return null;
  }

  return (
    <div className={className}>
      {location.district && (
        <p className='flex items-center font-extrabold'>{location.district}</p>
      )}
      <p className='text-sm font-bold text-gray-500'>
        {location.city}, {location.country}
      </p>
    </div>
  );
}

interface TemperatureInfoProps {
  temperatureWithIconClassName?: string;
  weatherType?: WeatherForecast['weatherType'];
  temperature?: number;
  temperatureFeelsLike?: number;
  isLoading: boolean;
}

const weatherTypeToIconMap = {
  cloudy: <CloudIcon className='size-8 text-blue-400 fill-blue-400' />,
  sunny: <SunIcon className='size-8 text-orange-400' />,
  rain: <CloudRainIcon className='size-8 text-blue-400 fill-blue-400' />,
};

const weatherTypeToLocalizationMap = {
  cloudy: 'Cloudy',
  sunny: 'Sunny',
  rain: 'Rain',
};

function TemperatureInfo({
  temperatureWithIconClassName,
  isLoading,
  temperature,
  temperatureFeelsLike,
  weatherType,
}: TemperatureInfoProps) {
  const icon = !isLoading && weatherTypeToIconMap[weatherType!];
  const localization = !isLoading && weatherTypeToLocalizationMap[weatherType!];

  if (isLoading) {
    return (
      <div className='flex gap-4'>
        <Skeleton className='h-14 w-48' />
      </div>
    );
  }

  return (
    <div className='flex gap-4'>
      <div
        className={cn('flex gap-1 items-center', temperatureWithIconClassName)}
      >
        {icon}
        <h1 className='text-5xl font-bold'>{temperature}°</h1>
      </div>
      <div>
        <p className='font-extrabold text-lg'>{localization}</p>
        <p className='text-gray-500 text-base font-bold'>
          Feels like {temperatureFeelsLike}°
        </p>
      </div>
    </div>
  );
}

function RainComingAlert() {
  return (
    <button className='flex items-center gap-2 p-2 px-4 w-full bg-blue-50 hover:bg-blue-100 duration-300 rounded-lg'>
      <UmbrellaIcon className='size-5 text-blue-600 fill-blue-600' />
      <span className='text-base font-bold flex-1 text-start'>
        Rain starts soon
      </span>
      <ChevronRight className='size-4' />
    </button>
  );
}
