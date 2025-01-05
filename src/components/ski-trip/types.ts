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

export interface PackingListProps {
    title: string;
    items: string[];
    checkedItems: string[];
    onToggleItem: (item: string) => void;
}
