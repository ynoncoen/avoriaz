import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Phone, MapPin } from 'lucide-react';

interface EnhancedRestaurantBooking {
    date?: string;
    time?: string;
    name: string;
    restaurantUrl: string;
    phone?: string;
    address?: string;
    cuisine?: string;
    comment?: string;
    id: string;
}

const RestaurantsTab: React.FC = () => {
    const bookings: EnhancedRestaurantBooking[] = [
        {
            date: "19.1",
            time: "19:30",
            name: "La Cachette",
            restaurantUrl: "https://www.lacachetteavoriaz.com/en/",
            phone: "+33 4 50 74 24 99",
            address: "138 Promenade du Festival, 74110 Avoriaz",
            cuisine: "French Alpine",
            comment: "no show == 45 euro",
            id: "booking-1"
        },
        {
            date: "20.1",
            time: "19:00",
            name: "155 Steakhouse",
            restaurantUrl: "https://155-steakhouse.fr/",
            phone: "+33 4 50 74 22 87",
            address: "155 Rue des Traîneaux, 74110 Avoriaz",
            cuisine: "Steakhouse",
            comment: "name: David",
            id: "booking-2"
        },
        {
            date: "21.1",
            time: "19:00",
            name: "Les Enfants Terribles",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            phone: "+33 4 50 74 12 54",
            address: "Hotel des Dromonts, Place des Dromonts, 74110 Avoriaz",
            cuisine: "Fine Dining French",
            comment: "Les Enfants Terribles",
            id: "booking-3"
        },
        {
            date: "22.1",
            time: "19:00",
            name: "La Cachette",
            restaurantUrl: "https://www.lacachetteavoriaz.com/en/",
            phone: "+33 4 50 74 24 99",
            address: "138 Promenade du Festival, 74110 Avoriaz",
            cuisine: "French Alpine",
            comment: "no show == 45 euro",
            id: "booking-4"
        },
        {
            date: "23.1",
            time: "19:00",
            name: "Le Festival",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            phone: "+33 4 50 74 12 54",
            address: "Hotel des Dromonts, Place des Dromonts, 74110 Avoriaz",
            cuisine: "Modern French",
            comment: "Le Festival",
            id: "booking-5"
        },
        {
            date: "24.1",
            time: "19:00",
            name: "Hotel Des Dromonts",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            phone: "+33 4 50 74 12 54",
            address: "Place des Dromonts, 74110 Avoriaz",
            cuisine: "French",
            comment: "placeholder",
            id: "booking-6"
        },
        {
            date: "25.1",
            time: "19:00",
            name: "La Brasserie",
            restaurantUrl: "https://la-brasserie-avoriaz.fr/",
            phone: "+33 4 50 74 15 11",
            address: "Résidence Sassanka, 74110 Avoriaz",
            cuisine: "French Brasserie",
            comment: "name: David",
            id: "booking-7"
        }
    ];

    const additionalRestaurants = [
        {
            name: "Le Traino",
            restaurantUrl: "https://www.avoriaz.com/fiche/restaurant-le-traino/",
            phone: "+33 4 50 74 17 84",
            address: "Route des Rennes, 74110 Avoriaz",
            cuisine: "Savoyard",
            id: "additional-1"
        },
        {
            name: "La Reserve",
            restaurantUrl: "https://www.la-reserve-avoriaz.com/",
            phone: "+33 4 50 74 15 75",
            address: "Route de l'Alpage, 74110 Avoriaz",
            cuisine: "French Alpine",
            id: "additional-2"
        },
        {
            name: "Le Fangle",
            restaurantUrl: "https://maps.app.goo.gl/VgxEunhKqVhWTkgy5",
            phone: "+33 4 50 74 16 18",
            address: "Plateau du Fangle, 74110 Avoriaz",
            cuisine: "Mountain Restaurant",
            id: "additional-3"
        },
        {
            name: "La Cabane",
            restaurantUrl: "https://www.lacabaneavoriaz.fr/",
            phone: "+33 4 50 74 14 22",
            address: "Place du Snow, 74110 Avoriaz",
            cuisine: "French Alpine",
            id: "additional-4"
        }
    ];

    const formatDate = (date: string) => {
        if (!date.includes('.')) return date;
        const [day, month] = date.split('.');
        return `January ${day}`;
    };

    return (
        <Card className="border-l-4 border-l-yellow-500">
            <CardHeader>
                <CardTitle>Restaurant Bookings</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Reserved Restaurants</h3>
                            {bookings.map((booking) => (
                                <div key={booking.id} className="flex flex-col space-y-4 p-4 rounded-lg bg-muted/50">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-lg">{booking.name}</h4>
                                            <p className="text-sm text-muted-foreground">{booking.cuisine}</p>
                                        </div>
                                        <a
                                            href={booking.restaurantUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:text-primary/80"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        {booking.phone && (
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />
                                                <a href={`tel:${booking.phone}`} className="hover:underline">
                                                    {booking.phone}
                                                </a>
                                            </div>
                                        )}

                                        {booking.address && (
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <a
                                                    href={`https://maps.google.com/?q=${encodeURIComponent(booking.address)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {booking.address}
                                                </a>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 mt-4 pt-2 border-t">
                                            <span className="font-medium">Reservation:</span>
                                            <span>{formatDate(booking.date || '')} at {booking.time}</span>
                                        </div>

                                        {booking.comment && (
                                            <div className="text-sm text-muted-foreground mt-2">
                                                Note: {booking.comment}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Additional Restaurants</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {additionalRestaurants.map((restaurant) => (
                                    <div key={restaurant.id} className="p-4 rounded-lg bg-muted/50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-medium">{restaurant.name}</h4>
                                                <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                                            </div>
                                            <a
                                                href={restaurant.restaurantUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            {restaurant.phone && (
                                                <div className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4" />
                                                    <a href={`tel:${restaurant.phone}`} className="hover:underline">
                                                        {restaurant.phone}
                                                    </a>
                                                </div>
                                            )}
                                            {restaurant.address && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <a
                                                        href={`https://maps.google.com/?q=${encodeURIComponent(restaurant.address)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="hover:underline"
                                                    >
                                                        {restaurant.address}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default RestaurantsTab;