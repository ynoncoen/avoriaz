import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Plane, Building2 } from 'lucide-react';

const TravelDetailsTab: React.FC = () => {
    const outboundFlight = {
        flightNumber: 'ISRAIR 6H141',
        departure: 'Tel Aviv',
        departureTime: '08:25',
        arrival: 'ALPS-ISERE',
        arrivalTime: '12:05'
    };

    const returnFlight = {
        flightNumber: 'ISRAIR 6H142',
        departure: 'ALPS-ISERE',
        departureTime: '13:05',
        arrival: 'Tel Aviv',
        arrivalTime: '18:10'
    };

    const accommodation = {
        name: 'RESIDENCE ATRIA CROZAT 3*',
        checkIn: 'January 19',
        checkOut: 'January 26',
        duration: '7 nights',
        roomType: '4-Person Apartment'
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
                            <h3 className="font-semibold mb-4 text-lg">Outbound Flight - January 19</h3>
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
                            <h3 className="font-semibold mb-4 text-lg">Return Flight - January 26</h3>
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
        </div>
    );
};

export default TravelDetailsTab;