import React, {useEffect, useState} from 'react';
import {Card, CardHeader, CardTitle, CardContent} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {
    Cloud,
    Sun,
    CloudSnow,
    Wind,
    Snowflake,
    ThermometerSnowflake,
    CloudRain,
    CloudDrizzle,
    PartyPopper
} from 'lucide-react';
import {DayForecast, getWeatherData, SnowConditions} from '@/lib/weather-service';

const WeatherTab = () => {
    const [weatherData, setWeatherData] = useState<DayForecast[]>([]);
    const [snowConditions, setSnowConditions] = useState<SnowConditions | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await getWeatherData();
                setWeatherData(response.data);
                setSnowConditions(response.snowConditions);
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

    const getSnowLevelStyle = (snowfall: number) => {
        if (snowfall > 15) {
            return {
                bgColor: 'bg-blue-200',
                textColor: 'text-blue-800',
                excited: true,
                superExcited: true
            };
        } else if (snowfall > 10) {
            return {
                bgColor: 'bg-blue-100',
                textColor: 'text-blue-700',
                excited: true,
                superExcited: false
            };
        } else if (snowfall >= 5) {
            return {
                bgColor: 'bg-sky-50',
                textColor: 'text-sky-700',
                excited: false,
                superExcited: false
            };
        } else if (snowfall > 0) {
            return {
                bgColor: 'bg-slate-50',
                textColor: 'text-slate-600',
                excited: false,
                superExcited: false
            };
        }
        return {
            bgColor: 'bg-transparent',
            textColor: 'text-slate-500',
            excited: false,
            superExcited: false
        };
    };

    if (isLoading) {
        return (
            <Card className="border-l-4 border-l-blue-400">
                <CardHeader>
                    <CardTitle>Snow Forecast - Top Slopes</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-96">
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
                    <div className="flex flex-col items-center justify-center h-96 text-center space-y-4">
                        <p className="text-amber-600 text-lg">🚧 Weather Service Issues</p>
                        <p className="text-sm text-muted-foreground max-w-md">
                            Having issues fetching weather data...
                        </p>
                        <p className="text-xs text-red-500 mt-4">{error}</p>
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
                {snowConditions && (
                    <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <h3 className="text-lg font-semibold text-blue-700 mb-3">Current Snow Conditions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-600">Top Snow Depth</div>
                                <div className="text-xl font-bold text-blue-600">{snowConditions.topDepth}cm</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-600">Bottom Snow Depth</div>
                                <div className="text-xl font-bold text-blue-600">{snowConditions.bottomDepth}cm</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-600">Fresh Snow</div>
                                <div className="text-xl font-bold text-blue-600">{snowConditions.freshSnowfall}cm</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                                <div className="text-sm text-gray-600">Last Snowfall</div>
                                <div className="text-xl font-bold text-blue-600">{snowConditions.lastSnowfall}</div>
                            </div>
                        </div>
                    </div>
                )}
                <ScrollArea className="h-96">
                    <div className="space-y-6">
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium text-muted-foreground border-b pb-2">
                            <div>Date</div>
                            <div className="text-center">AM</div>
                            <div className="text-center">PM</div>
                            <div className="text-center">night</div>
                        </div>

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

                                <div className="grid grid-cols-4 gap-2 items-center text-sm">
                                    <div className="flex items-center gap-1">
                                        <Snowflake className="h-4 w-4"/>
                                        Snow
                                    </div>
                                    {day.periods.map((period, idx) => {
                                        const style = getSnowLevelStyle(period.snowfall);
                                        return (
                                            <div key={idx} className={`text-center p-2 rounded-lg ${style.bgColor} ${style.textColor} flex items-center justify-center gap-1`}>
                                                <span>{period.snowfall}cm</span>
                                                {style.excited && <PartyPopper className="h-4 w-4 text-yellow-500" />}
                                                {style.superExcited && <PartyPopper className="h-4 w-4 text-yellow-500" />}
                                            </div>
                                        );
                                    })}
                                </div>

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