"use client";

import { useState, useEffect } from "react";
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react";
import { Button } from "./ui/button";

interface WeatherData {
  temperature: number;
  condition: string;
}

// Fallback API for demo purposes - in production, use environment variables
const WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || "8d2de98e089f1c28e1a22fc19a24ef04";

export function Weather() {
  const [mounted, setMounted] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const getWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Default to San Francisco coordinates if geolocation fails
        let latitude = 37.7749;
        let longitude = -122.4194;

        // Try to get user's location
        try {
          if (navigator.geolocation) {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                timeout: 5000,
                maximumAge: 300000 // 5 minutes
              });
            });
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
          }
        } catch (locationError) {
          console.log("Using default location");
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${WEATHER_API_KEY}`,
          { cache: 'no-cache' }
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data || !data.main || !data.weather || !data.weather[0]) {
          throw new Error('Invalid weather data format');
        }

        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main.toLowerCase()
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        // Set default weather as fallback
        setWeather({
          temperature: 72,
          condition: "clear"
        });
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      getWeather();
      // Refresh weather every 5 minutes
      const interval = setInterval(getWeather, 300000);
      return () => clearInterval(interval);
    }
  }, [mounted]);

  if (!mounted) return null;

  const getWeatherIcon = () => {
    if (loading) return <Sun className="h-4 w-4 animate-pulse" />;
    if (!weather) return <Sun className="h-4 w-4" />;

    switch (weather.condition) {
      case "rain":
      case "drizzle":
      case "thunderstorm":
        return <CloudRain className="h-4 w-4" />;
      case "clouds":
      case "mist":
      case "fog":
        return <Cloud className="h-4 w-4" />;
      case "partly cloudy":
        return <CloudSun className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 relative group"
      title={weather ? `${weather.temperature}°F - ${weather.condition}` : 'Weather'}
    >
      {getWeatherIcon()}
      {weather && (
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {weather.temperature}°F
        </span>
      )}
    </Button>
  );
}