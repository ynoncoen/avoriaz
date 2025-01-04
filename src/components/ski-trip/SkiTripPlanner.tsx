import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Hotel, Luggage, UtensilsCrossed } from 'lucide-react';
import FlightsTab from './FlightsTab';
import AccommodationTab from './AccommodationTab';
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
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
                        <TabsTrigger value="flights" className="flex items-center gap-2 text-xs md:text-sm">
                            <Plane className="h-4 w-4" />
                            <span className="hidden md:inline">Flights</span>
                            <span className="md:hidden">Flight</span>
                        </TabsTrigger>
                        <TabsTrigger value="accommodation" className="flex items-center gap-2 text-xs md:text-sm">
                            <Hotel className="h-4 w-4" />
                            <span className="hidden md:inline">Accommodation</span>
                            <span className="md:hidden">Hotel</span>
                        </TabsTrigger>
                        <TabsTrigger value="restaurants" className="flex items-center gap-2 text-xs md:text-sm">
                            <UtensilsCrossed className="h-4 w-4" />
                            <span className="hidden md:inline">Restaurants</span>
                            <span className="md:hidden">Food</span>
                        </TabsTrigger>
                        <TabsTrigger value="packing" className="flex items-center gap-2 text-xs md:text-sm">
                            <Luggage className="h-4 w-4" />
                            <span className="hidden md:inline">Packing</span>
                            <span className="md:hidden">Pack</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="flights">
                        <FlightsTab />
                    </TabsContent>
                    <TabsContent value="accommodation">
                        <AccommodationTab />
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