import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AccommodationDetails } from './types';

const AccommodationTab: React.FC = () => {
    const accommodation: AccommodationDetails = {
        name: 'RESIDENCE ATRIA CROZAT 3*',
        checkIn: 'January 19',
        checkOut: 'January 26',
        duration: '7 nights',
        roomType: '4-Person Apartment'
    };

    return (
        <Card className="border-l-4 border-l-green-500">
            <CardHeader>
                <CardTitle>Hotel</CardTitle>
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
    );
};

export default AccommodationTab;