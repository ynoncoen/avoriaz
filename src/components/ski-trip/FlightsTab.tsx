import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FlightDetails } from './types';

const FlightsTab: React.FC = () => {
    const outboundFlight: FlightDetails = {
        flightNumber: 'ISRAIR 6H141',
        departure: 'Tel Aviv',
        departureTime: '08:25',
        arrival: 'ALPS-ISERE',
        arrivalTime: '12:05'
    };

    const returnFlight: FlightDetails = {
        flightNumber: 'ISRAIR 6H142',
        departure: 'ALPS-ISERE',
        departureTime: '13:05',
        arrival: 'Tel Aviv',
        arrivalTime: '18:10'
    };

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
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
    );
};

export default FlightsTab;