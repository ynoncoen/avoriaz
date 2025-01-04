import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResortDetails } from './types';

const ResortTab: React.FC = () => {
    const resort: ResortDetails = {
        name: 'Portes Du Soleil',
        skiPassValidity: 'January 20-25',
        transfers: 'Included Round Trip',
        additionalEquipment: 'Ski Card and Deposit'
    };

    return (
        <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
                <CardTitle>Ski Resort Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{resort.name}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span>Ski Pass Validity:</span>
                            <span>{resort.skiPassValidity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Transfers:</span>
                            <span>{resort.transfers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Additional Equipment:</span>
                            <span>{resort.additionalEquipment}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResortTab;