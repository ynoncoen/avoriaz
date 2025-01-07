// src/lib/restaurant-service.ts
import * as constants from "./contants";

export interface Restaurant {
    date?: string;
    time?: string;
    name: string;
    restaurantUrl: string;
    phone: string;
    address: string;
    cuisine: string;
    comment?: string;
    id: string;
}

export interface RestaurantData {
    bookings: Restaurant[];
    additionalRestaurants: Restaurant[];
}

const API_URL = `${constants.API_URL}/api/restaurants`;

export async function getRestaurantData(): Promise<RestaurantData> {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data as RestaurantData;
    } catch (error) {
        console.error('Error fetching restaurant data:', error);
        throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
}