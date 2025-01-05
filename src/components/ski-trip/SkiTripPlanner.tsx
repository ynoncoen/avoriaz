"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, UtensilsCrossed, CloudSun, Luggage } from 'lucide-react';
import TravelDetailsTab from './TravelDetailsTab';
import PackingTab from './PackingTab';
import RestaurantsTab from './RestaurantsTab';
import WeatherTab from './WeatherTab';
import FlightCountdown from "./FlightCountdown";

const SkiTripPlanner: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-4 font-sans">
            <div className="mx-auto max-w-6xl">
                <header className="mb-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                        Ski Trip to Avoriaz
                    </h1>
                    <p className="text-slate-600">January 19-26, 2025</p>
                    <FlightCountdown />
                </header>

                <Tabs defaultValue="travel" className="w-full space-y-6">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 p-1">
                        <TabsTrigger
                            value="travel"
                            className="flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1.5"
                        >
                            <Plane className="h-4 w-4"/>
                            <span className="hidden md:inline">Travel Details</span>
                            <span className="md:hidden">Travel</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="restaurants"
                            className="flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1.5"
                        >
                            <UtensilsCrossed className="h-4 w-4"/>
                            <span className="hidden md:inline">Restaurants</span>
                            <span className="md:hidden">Food</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="weather"
                            className="flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1.5"
                        >
                            <CloudSun className="h-4 w-4"/>
                            <span className="hidden md:inline">Weather</span>
                            <span className="md:hidden">Weather</span>
                        </TabsTrigger>

                        <TabsTrigger
                            value="packing"
                            className="flex items-center justify-center gap-1 text-xs md:text-sm px-2 py-1.5"
                        >
                            <Luggage className="h-4 w-4"/>
                            <span className="hidden md:inline">Packing</span>
                            <span className="md:hidden">Pack</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="travel">
                        <TravelDetailsTab />
                    </TabsContent>

                    <TabsContent value="restaurants">
                        <RestaurantsTab />
                    </TabsContent>

                    <TabsContent value="weather">
                        <WeatherTab />
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