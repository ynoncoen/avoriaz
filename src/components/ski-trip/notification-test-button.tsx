"use client"

import React, { useState } from 'react';
import { CloudSnow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '@/lib/config';

export function NotificationTestButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleTestNotification = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${config.apiBaseUrl}/api/scheduled/daily-weather`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.cronSecret}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });

            if (!response.ok) {
                throw new Error('Failed to send weather notification');
            }

            console.log('Weather notification sent successfully');
        } catch (error) {
            console.error('Error sending weather notification:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleTestNotification}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="fixed bottom-4 left-4 flex items-center gap-2"
        >
            <CloudSnow className="h-4 w-4" />
            {isLoading ? 'Sending...' : 'Test Weather Alert'}
        </Button>
    );
}