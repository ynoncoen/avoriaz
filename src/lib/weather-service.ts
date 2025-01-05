// src/lib/weather-service.ts
import * as constants from "./contants";

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

export interface SnowConditions {
    topDepth: number;
    bottomDepth: number;
    freshSnowfall: number;
    lastSnowfall: string;
}

export interface WeatherResponse {
    data: DayForecast[];
    snowConditions: SnowConditions;
    error?: string;
}

const API_URL = `${constants.API_URL}/api/weather`

export async function getWeatherData(): Promise<WeatherResponse> {
    try {
        console.log('Fetching from:', API_URL);

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json() as WeatherResponse;

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}