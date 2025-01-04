import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, ExternalLink } from 'lucide-react';
import { RestaurantBooking } from './types';

const RestaurantsTab: React.FC = () => {
    const bookings: RestaurantBooking[] = [
        {
            date: "19.1",
            time: "19:30",
            restaurantUrl: "https://www.lacachetteavoriaz.com/en/",
            comment: "no show == 45 euro",
            id: "booking-1"
        },
        {
            date: "20.1",
            time: "19:00",
            restaurantUrl: "https://155-steakhouse.fr/",
            comment: "name: David",
            id: "booking-2"
        },
        {
            date: "21.1",
            time: "19:00",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            comment: "Les Efants Terribles",
            id: "booking-3"
        },
        {
            date: "22.1",
            time: "19:00",
            restaurantUrl: "https://maps.app.goo.gl/Z9ad7bwA4HQnT1WV6",
            comment: "no show == 45 euro",
            id: "booking-4"
        },
        {
            date: "23.1",
            time: "19:00",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            comment: "Le festival",
            id: "booking-5"
        },
        {
            date: "24.1",
            time: "19:00",
            restaurantUrl: "https://en.hoteldesdromonts.com/restaurants",
            comment: "placeholder",
            id: "booking-6"
        },
        {
            date: "25.1",
            time: "19:00",
            restaurantUrl: "https://la-brasserie-avoriaz.fr/",
            comment: "name: David",
            id: "booking-7"
        }
    ];

    const additionalRestaurants = [
        { url: "https://www.avoriaz.com/fiche/restaurant-le-traino/", name: "Le Traino" },
        { url: "https://155-steakhouse.fr/", name: "155 Steakhouse" },
        { url: "https://www.la-reserve-avoriaz.com/", name: "La Reserve" },
        { url: "https://www.lacabaneavoriaz.fr/", name: "La Cabane" }
    ];

    const getRestaurantName = (url: string): string => {
        if (url.includes("lacachetteavoriaz")) return "La Cachette";
        if (url.includes("155-steakhouse")) return "155 Steakhouse";
        if (url.includes("hoteldesdromonts")) {
            if (url.includes("Le festival")) return "Le Festival";
            if (url.includes("Les Efants")) return "Les Enfants Terribles";
            return "Hotel des Dromonts";
        }
        if (url.includes("la-brasserie")) return "La Brasserie";
        return new URL(url).hostname.split('.')[1];
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
                                <div key={booking.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="font-medium">{getRestaurantName(booking.restaurantUrl)}</h4>
                                            <a
                                                href={booking.restaurantUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary hover:text-primary/80"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        </div>
                                        <div className="space-y-1 text-sm text-muted-foreground">
                                            <div className="flex items-center space-x-2">
                                                <span>Date:</span>
                                                <span>{booking.date}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>Time:</span>
                                                <span>{booking.time}</span>
                                            </div>
                                            {booking.comment && (
                                                <div className="flex items-center space-x-2">
                                                    <span>Note:</span>
                                                    <span>{booking.comment}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Additional Restaurants</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {additionalRestaurants.map((restaurant, index) => (
                                    <a
                                        key={index}
                                        href={restaurant.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                                    >
                                        <Link className="h-4 w-4" />
                                        <span>{restaurant.name}</span>
                                    </a>
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