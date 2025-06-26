import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plane, Building2 } from 'lucide-react';

const TravelDetailsTab: React.FC = () => {
    const outboundFlight = {
        flightNumber: 'ISRAIR 6H141',
        departure: 'Tel Aviv (TLV)',
        departureTime: '05:50',
        arrival: 'Grenoble (GNB)',
        arrivalTime: 'TBA'
    };

    const returnFlight = {
        flightNumber: 'ISRAIR 6H142',
        departure: 'Grenoble (GNB)',
        departureTime: '10:30',
        arrival: 'Tel Aviv (TLV)',
        arrivalTime: 'TBA'
    };

    const accommodation = {
        name: 'Arc 1950 Village',
        checkIn: 'January 17, 2026',
        checkOut: 'January 24, 2026',
        duration: '7 nights',
        roomType: 'TBA'
    };

    return (
        <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="flex flex-row items-center space-x-2">
                    <Plane className="h-6 w-6" />
                    <CardTitle>Flight Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div className="border-b pb-4">
                            <h3 className="font-semibold mb-4 text-lg">Outbound Flight - January 17, 2026</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Flight Number:</span>
                                    <span>{outboundFlight.flightNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Departure:</span>
                                    <span>{outboundFlight.departure} - {outboundFlight.departureTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Arrival:</span>
                                    <span>{outboundFlight.arrival} - {outboundFlight.arrivalTime}</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-lg">Return Flight - January 24, 2026</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span>Flight Number:</span>
                                    <span>{returnFlight.flightNumber}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Departure:</span>
                                    <span>{returnFlight.departure} - {returnFlight.departureTime}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span>Arrival:</span>
                                    <span>{returnFlight.arrival} - {returnFlight.arrivalTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center space-x-2">
                    <Building2 className="h-6 w-6" />
                    <CardTitle>Accommodation</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">{accommodation.name}</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Check-in:</span>
                                <span>{accommodation.checkIn}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Check-out:</span>
                                <span>{accommodation.checkOut}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Duration:</span>
                                <span>{accommodation.duration}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Room Type:</span>
                                <span>{accommodation.roomType}</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
                <CardHeader className="flex flex-row items-center space-x-2">
                    <Building2 className="h-6 w-6" />
                    <CardTitle>Destination Info</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Les Arcs - Arc 1950</h3>
                        <div className="space-y-3 text-sm">
                            <p>
                                <strong>Resort:</strong> Les Arcs is a large ski area in the French Alps, part of the massive Paradiski domain 
                                (425km of slopes) connected to La Plagne via the Vanoise Express cable car.
                            </p>
                            <p>
                                <strong>Arc 1950:</strong> The newest and most modern village in Les Arcs, built in traditional Savoyard style 
                                with luxury residences, restaurants, and shops. Located at 1950m altitude.
                            </p>
                            <p>
                                <strong>Skiing:</strong> Access to 200km+ of slopes in Les Arcs plus connection to La Plagne. 
                                Suitable for all levels with excellent off-piste opportunities.
                            </p>
                            <p>
                                <strong>Village Features:</strong> Car-free pedestrian village with ski-in/ski-out access, 
                                heated outdoor pools, spas, and boutiques. Direct access to Cabriolet funicular.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TravelDetailsTab;