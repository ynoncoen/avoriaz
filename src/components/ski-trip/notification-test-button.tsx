"use client"
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import config from '@/lib/config';

export function NotificationTestButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleTestNotification = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${config.apiBaseUrl}/api/push/test`);
            if (!response.ok) {
                throw new Error('Failed to send test notification');
            }
            console.log('Test notification sent successfully');
        } catch (error) {
            console.error('Error sending test notification:', error);
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
            <Bell className="h-4 w-4" />
            {isLoading ? 'Sending...' : 'Test Notification'}
        </Button>
    );
}