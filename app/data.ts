import { WeatherForecast } from './_models/weather-forecast';

export const weatherForecastMocks: WeatherForecast = {
  location: {
    city: 'Warsaw',
    country: 'Poland',
    district: 'Śródmieście',
  },
  temperatureInfo: {
    feelsLike: 23,
    temperature: 20,
  },
  weatherType: 'rain',
  infoMessage: 'Light rain is expected until 16:30',
  alertTypes: ['rainComing'],
};
