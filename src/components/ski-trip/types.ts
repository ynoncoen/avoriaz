export interface FlightDetails {
    flightNumber: string;
    departure: string;
    departureTime: string;
    arrival: string;
    arrivalTime: string;
}

export interface AccommodationDetails {
    name: string;
    checkIn: string;
    checkOut: string;
    duration: string;
    roomType: string;
}

export interface ResortDetails {
    name: string;
    skiPassValidity: string;
    transfers: string;
    additionalEquipment: string;
}

export interface PackingListProps {
    title: string;
    items: string[];
    checkedItems: string[];
    onToggleItem: (item: string) => void;
}

export interface PackingCategory {
    title: string;
    items: string[];
}

export interface RestaurantBooking {
    date: string;
    time: string;
    restaurantUrl: string;
    comment: string;
    id: string;
}

export interface RestaurantDetails {
    name: string;
    url: string;
}