export type WeatherForecast = {
  temperatureInfo: {
    temperature: number;
    feelsLike: number;
  };
  location: {
    city: string;
    country: string;
    district?: string;
  };
  weatherType: 'sunny' | 'cloudy' | 'rain';
  alertTypes: Array<'rainComing' | 'thunderstorm'>;
  infoMessage?: string;
};
