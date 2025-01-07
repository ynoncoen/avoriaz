"use client"
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { subscribeToPushNotifications } from '@/lib/notifications';

export function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isSubscribing, setIsSubscribing] = useState(false);

    useEffect(() => {
        // Check if we should show the notification prompt
        const checkNotificationStatus = async () => {
            if (!('Notification' in window)) return;
            if (Notification.permission === 'granted') return;
            if (Notification.permission === 'denied') return;

            // Check if we've already asked before
            const hasAskedBefore = localStorage.getItem('notificationPromptShown');
            setShowPrompt(!hasAskedBefore);
        };

        checkNotificationStatus().then(() => console.log("Checked"));
    }, []);

    const handleEnableNotifications = async () => {
        setIsSubscribing(true);
        try {
            // Get the service worker registration
            const registration = await navigator.serviceWorker.ready;

            // Subscribe to push notifications
            const subscribed = await subscribeToPushNotifications(registration);

            if (subscribed) {
                localStorage.setItem('notificationPromptShown', 'true');
                setShowPrompt(false);

                // Show a success message
                new Notification('Notifications Enabled!', {
                    body: "You'll receive updates about weather and restaurant bookings.",
                    icon: '/avoriaz/icon-192x192.png'
                });
            }
        } catch (error) {
            console.error('Error enabling notifications:', error);
        } finally {
            setIsSubscribing(false);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <Bell className="h-6 w-6 text-blue-500" />
                </div>
                <div className="flex-1">
                    <h3 className="font-medium">Enable Notifications</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Get updates about weather conditions and restaurant bookings.
                    </p>
                    <div className="mt-3 flex space-x-2">
                        <Button
                            onClick={handleEnableNotifications}
                            disabled={isSubscribing}
                            className="text-sm"
                        >
                            {isSubscribing ? 'Enabling...' : 'Enable'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                localStorage.setItem('notificationPromptShown', 'true');
                                setShowPrompt(false);
                            }}
                            disabled={isSubscribing}
                            className="text-sm"
                        >
                            Maybe Later
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}