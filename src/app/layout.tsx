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
                const registration = await navigator.serviceWorker.register('/ski/sw.js', {
                    scope: '/ski/'
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
            <link rel="manifest" href="/ski/manifest.json"/>
            <link rel="icon" type="image/x-icon" href="/ski/favicon.ico"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/ski/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/ski/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/ski/favicon-192x192.png"/>
            <link rel="icon" type="image/png" sizes="512x512" href="/ski/favicon-512x512.png"/>
            <link rel="apple-touch-icon" href="/ski/favicon-192x192.png"/>
            <meta name="theme-color" content="#f8fafc"/>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <NotificationPrompt/>
        <NotificationTestButton/>
        </body>
        </html>
    );
}