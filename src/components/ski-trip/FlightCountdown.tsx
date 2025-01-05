import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const FlightCountdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isExpired: false
    });

    useEffect(() => {
        const flightDate = new Date('2025-01-19T08:25:00+02:00'); // Tel Aviv time (UTC+2)

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = flightDate.getTime() - now.getTime();

            if (difference <= 0) {
                return {
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                    isExpired: true
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                isExpired: false
            };
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Cleanup
        return () => clearInterval(timer);
    }, []);

    if (timeLeft.isExpired) {
        return null;
    }

    return (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 shadow-sm">
            <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex items-center space-x-2 text-blue-600">
                    <Plane className="h-6 w-6" />
                    <h2 className="text-lg font-semibold">Time Until Take-off!</h2>
                </div>

                <div className="flex space-x-4 text-center">
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
                        <div className="text-sm text-gray-600">Days</div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
                        <div className="text-sm text-gray-600">Hours</div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
                        <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
                        <div className="text-sm text-gray-600">Seconds</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlightCountdown;