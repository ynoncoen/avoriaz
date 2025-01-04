import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Hotel, Map, Luggage, UtensilsCrossed } from 'lucide-react';
import FlightsTab from './FlightsTab';
import AccommodationTab from './AccommodationTab';
import ResortTab from './ResortTab';
import PackingTab from './PackingTab';
import RestaurantsTab from './RestaurantsTab';

const SkiTripPlanner: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Ski Trip to Avoriaz</h1>
                    <p className="text-slate-600">January 19-26, 2025</p>
                </header>

                <Tabs defaultValue="flights" className="w-full space-y-6">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="flights" className="flex items-center gap-2">
                            <Plane className="h-4 w-4 mr-1" />
                            Flights
                        </TabsTrigger>
                        <TabsTrigger value="accommodation" className="flex items-center gap-2">
                            <Hotel className="h-4 w-4 mr-1" />
                            Accommodation
                        </TabsTrigger>
                        <TabsTrigger value="resort" className="flex items-center gap-2">
                            <Map className="h-4 w-4 mr-1" />
                            Resort
                        </TabsTrigger>
                        <TabsTrigger value="restaurants" className="flex items-center gap-2">
                            <UtensilsCrossed className="h-4 w-4 mr-1" />
                            Restaurants
                        </TabsTrigger>
                        <TabsTrigger value="packing" className="flex items-center gap-2">
                            <Luggage className="h-4 w-4 mr-1" />
                            Packing
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="flights">
                        <FlightsTab />
                    </TabsContent>
                    <TabsContent value="accommodation">
                        <AccommodationTab />
                    </TabsContent>
                    <TabsContent value="resort">
                        <ResortTab />
                    </TabsContent>
                    <TabsContent value="restaurants">
                        <RestaurantsTab />
                    </TabsContent>
                    <TabsContent value="packing">
                        <PackingTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default SkiTripPlanner;