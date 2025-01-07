"use client"

import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, CloudSnow, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import config from '@/lib/config';

export function NotificationTestButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const modifierKey = isMac ? event.metaKey : event.ctrlKey;

            if (modifierKey && event.altKey && event.code === 'KeyT') {
                setShowButton(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleTestNotification = async (type: 'weather' | 'restaurant') => {
        setIsLoading(true);
        try {
            const endpoint = type === 'weather' ? 'daily-weather' : 'daily-restaurant';
            const response = await fetch(`${config.apiBaseUrl}/api/scheduled/${endpoint}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.cronSecret}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error(`Failed to send ${type} notification`);
            }
        } catch (error) {
            console.error(`Error sending ${type} notification:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!showButton) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="fixed bottom-4 left-4 flex items-center gap-2"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        'Sending...'
                    ) : (
                        <>
                            Test Notifications
                            <ChevronDown className="h-4 w-4 opacity-50" />
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem
                    onClick={() => handleTestNotification('weather')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                >
                    <CloudSnow className="h-4 w-4" />
                    Test Weather Alert
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => handleTestNotification('restaurant')}
                    disabled={isLoading}
                    className="flex items-center gap-2"
                >
                    <UtensilsCrossed className="h-4 w-4" />
                    Test Restaurant Alert
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}