import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Avoriaz",
    description: "Ski Trip planner for Avoriaz",
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
        ],
        shortcut: '/avoriaz/favicon.ico',
        apple: '/avoriaz/favicon.ico',
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
