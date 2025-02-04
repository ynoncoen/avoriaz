import type { Metadata, Viewport } from "next";

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
        apple: '/avoriaz/favicon-192x192.png',
    },
};