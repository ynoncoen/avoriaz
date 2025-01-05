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

export interface WeatherResponse {
    data: DayForecast[];
    error?: string;
}

// Add /api/weather to the URL and ensure it's formatted correctly
const API_URL = `${constants.API_URL}/api/weather`

export async function getWeatherData(): Promise<DayForecast[]> {
    try {
        console.log('Fetching from:', API_URL); // Debug log

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any required authorization headers here if needed
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json() as WeatherResponse;

        if (jsonResponse.error) {
            throw new Error(jsonResponse.error);
        }

        return jsonResponse.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}