// api/types.ts
export interface WeatherPeriod {
    time: string;
    temp: number;
    weather: string;
    windSpeed: number;
    windDir: string;
    snowfall: number;
    rain: number;
    freezeLevel: number;
}

export interface DayForecast {
    date: string;
    periods: WeatherPeriod[];
}

export interface WeatherResponse {
    data: DayForecast[];
    error?: string;
}

export interface WeatherError {
    error: string;
}