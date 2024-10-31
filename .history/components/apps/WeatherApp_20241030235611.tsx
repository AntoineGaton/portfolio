"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react";

/**
 * Weather Data Interface
 * @interface WeatherData
 * @property {number} temperature - Current temperature
 * @property {string} condition - Weather condition
 * @property {number} humidity - Humidity percentage
 * @property {number} windSpeed - Wind speed
 * @property {string} location - Location name
 */
interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

/**
 * WeatherApp Component
 * Displays weather information for a location
 * @component
 */
export function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Gets the appropriate weather icon based on condition
   * @param {string} condition - Weather condition
   * @returns {JSX.Element} Weather icon component
   */
  const getWeatherIcon = (condition: string): JSX.Element => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="h-12 w-12" />;
      case 'cloudy':
        return <Cloud className="h-12 w-12" />;
      case 'rainy':
        return <CloudRain className="h-12 w-12" />;
      case 'snowy':
        return <CloudSnow className="h-12 w-12" />;
      case 'stormy':
        return <CloudLightning className="h-12 w-12" />;
      default:
        return <Wind className="h-12 w-12" />;
    }
  };

  /**
   * Fetches weather data
   * Currently uses mock data, can be connected to real API
   */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Mock API call - replace with actual weather API
        const mockData: WeatherData = {
          temperature: 72,
          condition: 'Sunny',
          humidity: 65,
          windSpeed: 8,
          location: 'New York, NY'
        };
        
        setWeather(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        {error}
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{weather.location}</h2>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          {getWeatherIcon(weather.condition)}
          <p className="mt-2 text-lg">{weather.condition}</p>
        </div>

        <div className="text-4xl font-bold">
          {weather.temperature}°F
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">Humidity</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div className="text-center p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">Wind Speed</p>
          <p className="text-xl font-semibold">{weather.windSpeed} mph</p>
        </div>
      </div>
    </Card>
  );
}