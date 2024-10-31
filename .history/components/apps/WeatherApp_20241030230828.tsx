"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
}

export function WeatherApp() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data (replace with actual API call in production)
    setTimeout(() => {
      setWeather({
        temperature: 72,
        condition: "sunny",
        humidity: 65,
        windSpeed: 8,
        location: "San Francisco, CA"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "rain":
        return <CloudRain className="h-16 w-16" />;
      case "snow":
        return <CloudSnow className="h-16 w-16" />;
      case "cloudy":
        return <Cloud className="h-16 w-16" />;
      case "storm":
        return <CloudLightning className="h-16 w-16" />;
      case "windy":
        return <Wind className="h-16 w-16" />;
      default:
        return <Sun className="h-16 w-16" />;
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-secondary rounded w-1/2"></div>
          <div className="h-16 bg-secondary rounded"></div>
          <div className="h-4 bg-secondary rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="p-6 max-w-md mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-6">{weather.location}</h2>
        <div className="flex items-center justify-center mb-6">
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="text-4xl font-bold mb-4">
          {weather.temperature}°F
        </div>
        <div className="text-lg text-muted-foreground capitalize">
          {weather.condition}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-muted-foreground">Humidity</div>
            <div className="text-lg font-medium">{weather.humidity}%</div>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <div className="text-muted-foreground">Wind Speed</div>
            <div className="text-lg font-medium">{weather.windSpeed} mph</div>
          </div>
        </div>
      </div>
    </Card>
  );
}