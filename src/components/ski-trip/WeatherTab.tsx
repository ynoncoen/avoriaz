"use client"

import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Cloud, Sun, CloudSnow, Wind, Snowflake, ThermometerSnowflake, CloudRain, CloudDrizzle} from 'lucide-react';
import {DayForecast, getWeatherData} from '@/lib/weather-service';

const WeatherTab: React.FC = () => {
    const [weatherData, setWeatherData] = useState<DayForecast[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                getWeatherData().then(data => setWeatherData(data));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load weather data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, []);

    const getWeatherIcon = (weather: string) => {
        switch (weather.toLowerCase()) {
            case 'clear':
                return <Sun className="h-5 w-5 text-yellow-500"/>;
            case 'cloudy':
                return <Cloud className="h-5 w-5 text-gray-500"/>;
            case 'snow':
                return <CloudSnow className="h-5 w-5 text-blue-400"/>;
            case 'lightsnow':
                return <Snowflake className="h-5 w-5 text-blue-300"/>;
            case 'rain':
                return <CloudRain className="h-5 w-5 text-blue-600"/>;
            case 'drizzle':
                return <CloudDrizzle className="h-5 w-5 text-blue-300"/>;
            default:
                return <Cloud className="h-5 w-5"/>;
        }
    };

    if (isLoading) {
        return (
            <Card className="border-l-4 border-l-blue-400">
                <CardHeader>
                    <CardTitle>Snow Forecast - Top Slopes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[400px]">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"/>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="border-l-4 border-l-red-400">
                <CardHeader>
                    <CardTitle>Snow Forecast - Top Slopes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center h-[400px] text-center space-y-4">
                        <p className="text-red-500">{error}</p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-l-4 border-l-blue-400">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Snow Forecast - Top Slopes</span>
                    <span className="text-sm font-normal text-muted-foreground">2000m</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px]">
                    <div className="space-y-6">
                        {/* Headers */}
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                            <div>Date</div>
                            <div className="text-center">AM</div>
                            <div className="text-center">PM</div>
                            <div className="text-center">night</div>
                        </div>

                        {/* Weather rows */}
                        {weatherData.map((day) => (
                            <div key={day.date} className="space-y-4">
                                <div className="grid grid-cols-4 gap-2 items-center">
                                    <div className="font-medium">{day.date}</div>
                                    {day.periods.map((period, idx) => (
                                        <div key={idx} className="text-center space-y-2">
                                            {getWeatherIcon(period.weather)}
                                            <div className="text-lg font-medium">{period.temp}°C</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Wind */}
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    <div className="flex items-center gap-1">
                                        <Wind className="h-4 w-4"/>
                                        Wind
                                    </div>
                                    {day.periods.map((period, idx) => (
                                        <div key={idx} className="text-center">
                                            {period.windSpeed}km/h {period.windDir}
                                        </div>
                                    ))}
                                </div>

                                {/* Snow */}
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    <div className="flex items-center gap-1">
                                        <Snowflake className="h-4 w-4"/>
                                        Snow
                                    </div>
                                    {day.periods.map((period, idx) => (
                                        <div key={idx} className="text-center">
                                            {period.snowfall}cm
                                        </div>
                                    ))}
                                </div>

                                {/* Rain */}
                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    <div className="flex items-center gap-1">
                                        <CloudRain className="h-4 w-4"/>
                                        Rain
                                    </div>
                                    {day.periods.map((period, idx) => (
                                        <div key={idx} className="text-center">
                                            {period.rain}mm
                                        </div>
                                    ))}
                                </div>

                                {/* Freeze Level */}
                                <div className="grid grid-cols-4 gap-2 items-center text-sm border-b pb-4">
                                    <div className="flex items-center gap-1">
                                        <ThermometerSnowflake className="h-4 w-4"/>
                                        Freeze Level
                                    </div>
                                    {day.periods.map((period, idx) => (
                                        <div key={idx} className="text-center">
                                            {period.freezeLevel}m
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default WeatherTab;