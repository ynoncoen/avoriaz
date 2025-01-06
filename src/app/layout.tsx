import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { registerServiceWorker } from "@/lib/register-sw";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    themeColor: '#f8fafc',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: "Avoriaz",
    description: "Ski Trip planner for Avoriaz",
    manifest: '/avoriaz/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Avoriaz',
    },
    icons: {
        icon: [
            {
                url: '/avoriaz/favicon.ico',
                sizes: 'any',
            },
            {
                url: '/avoriaz/favicon-16x16.png',
                sizes: '16x16',
                type: 'image/png',
            },
            {
                url: '/avoriaz/favicon-32x32.png',
                sizes: '32x32',
                type: 'image/png',
            },
            {
                url: '/avoriaz/favicon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                url: '/avoriaz/favicon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        apple: '/avoriaz/icon-192x192.png',
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // Register service worker
    if (typeof window !== 'undefined') {
        registerServiceWorker();
    }

    return (
        <html lang="en">
        <head>
            <link rel="manifest" href="/avoriaz/manifest.json" />
            <link rel="apple-touch-icon" href="/avoriaz/icon-192x192.png" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        </body>
        </html>
    );
}