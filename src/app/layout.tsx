"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";
import { NotificationPrompt } from "@/components/ski-trip/notification-prompt";
import { NotificationTestButton } from "@/components/ski-trip/notification-test-button";
import { subscribeToPushNotifications } from "@/lib/notifications";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    useEffect(() => {
        async function registerSW() {
            if (!('serviceWorker' in navigator)) {
                console.log('Service Worker is not supported');
                return;
            }

            try {
                console.log('Attempting to register service worker...');
                const registration = await navigator.serviceWorker.register('/avoriaz/sw.js', {
                    scope: '/avoriaz/'
                });

                console.log('Service Worker registration successful:', registration);

                const subscribed = await subscribeToPushNotifications(registration);
                console.log('Push notification subscription status:', subscribed);
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }

        const timer = setTimeout(() => {
            registerSW().catch(console.error);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/avoriaz/manifest.json" />
            <link rel="apple-touch-icon" href="/avoriaz/favicon-192x192.png" />
            <meta name="theme-color" content="#f8fafc" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <NotificationPrompt />
        <NotificationTestButton />
        </body>
        </html>
    );
}