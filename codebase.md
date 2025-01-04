# .github/workflows/deploy.yml

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v3

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./out

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

# .gitignore

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

# components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# eslint.config.mjs

```mjs
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

# next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/avoriaz', // This should match your repository name
  assetPrefix: '/avoriaz/', // This should match your repository name with a trailing slash
  trailingSlash: true
}

module.exports = nextConfig
```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        unoptimized: true
    },
    basePath: '/avoriaz',
    assetPrefix: '/avoriaz/',
    trailingSlash: true
};

export default nextConfig;
```

# package.json

```json
{
  "name": "avoriaz",
  "homepage": "https://ynoncoen.github.io/avoriaz",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@radix-ui/react-scroll-area": "^1.2.2",
    "@radix-ui/react-tabs": "^1.1.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.469.0",
    "next": "15.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.1.3",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}

```

# postcss.config.mjs

```mjs
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
  },
};

export default config;

```

# public/file.svg

This is a file of the type: SVG Image

# public/globe.svg

This is a file of the type: SVG Image

# public/next.svg

This is a file of the type: SVG Image

# public/vercel.svg

This is a file of the type: SVG Image

# public/window.svg

This is a file of the type: SVG Image

# README.md

```md
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

# src/app/favicon.ico

This is a binary file of the type: Binary

# src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: Arial, Helvetica, sans-serif;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Create Next App",
  description: "Generated by create next app",
};

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

```

# src/components/ski-trip/AccommodationTab.tsx

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AccommodationDetails } from './types';

const AccommodationTab: React.FC = () => {
    const accommodation: AccommodationDetails = {
        name: 'RESIDENCE ATRIA CROZAT 3*',
        checkIn: 'January 19',
        checkOut: 'January 26',
        duration: '7 nights',
        roomType: '4-Person Apartment'
    };

    return (
        <Card className="border-l-4 border-l-green-500">
            <CardHeader>
                <CardTitle>Hotel</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{accommodation.name}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span>Check-in:</span>
                            <span>{accommodation.checkIn}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Check-out:</span>
                            <span>{accommodation.checkOut}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Duration:</span>
                            <span>{accommodation.duration}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Room Type:</span>
                            <span>{accommodation.roomType}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccommodationTab;
```

# src/components/ski-trip/FlightsTab.tsx

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FlightDetails } from './types';

const FlightsTab: React.FC = () => {
    const outboundFlight: FlightDetails = {
        flightNumber: 'ISRAIR 6H141',
        departure: 'Tel Aviv',
        departureTime: '08:25',
        arrival: 'ALPS-ISERE',
        arrivalTime: '12:05'
    };

    const returnFlight: FlightDetails = {
        flightNumber: 'ISRAIR 6H142',
        departure: 'ALPS-ISERE',
        departureTime: '13:05',
        arrival: 'Tel Aviv',
        arrivalTime: '18:10'
    };

    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardHeader>
                <CardTitle>Flight Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="border-b pb-4">
                        <h3 className="font-semibold mb-4 text-lg">Outbound Flight - January 19</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Flight Number:</span>
                                <span>{outboundFlight.flightNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Departure:</span>
                                <span>{outboundFlight.departure} - {outboundFlight.departureTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Arrival:</span>
                                <span>{outboundFlight.arrival} - {outboundFlight.arrivalTime}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Return Flight - January 26</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span>Flight Number:</span>
                                <span>{returnFlight.flightNumber}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Departure:</span>
                                <span>{returnFlight.departure} - {returnFlight.departureTime}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span>Arrival:</span>
                                <span>{returnFlight.arrival} - {returnFlight.arrivalTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default FlightsTab;
```

# src/components/ski-trip/index.ts

```ts
export { default as SkiTripPlanner } from './SkiTripPlanner';
export { default as FlightsTab } from './FlightsTab';
export { default as AccommodationTab } from './AccommodationTab';
export { default as ResortTab } from './ResortTab';
export { default as PackingTab } from './PackingTab';
export { default as PackingList } from './PackingList';
export type * from './types';
```

# src/components/ski-trip/PackingList.tsx

```tsx
import React from 'react';
import { PackingListProps } from './types';

const PackingList: React.FC<PackingListProps> = ({ title, items }) => (
    <div>
        <h3 className="font-semibold mb-4 text-lg border-b pb-2">{title}</h3>
        <ul className="space-y-2 pl-4">
            {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                    <span>✓</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default PackingList;

```

# src/components/ski-trip/PackingTab.tsx

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import PackingList from './PackingList';

const PackingTab: React.FC = () => {
    const skiEquipment: string[] = [
        'Helmet',
        'Skis / Snowboard',
        'Poles',
        'Ski Boots',
        'Ski Jacket',
        'Ski Pants',
        'Back Protector',
        'Impact Shorts',
        'Ski Goggles',
        'Ski Gloves'
    ];

    const clothing: string[] = [
        'Thermal Set (x3)',
        'Beanie',
        'Neck Warmer',
        'Warm Socks',
        'Flight Sweatshirt',
        'Flight Pants',
        'Night Tracksuit',
        'Jeans (x3)'
    ];

    const personal: string[] = [
        'Passports',
        'Money',
        'Credit Cards',
        'Chargers',
        'iPad',
        'Headphones',
        'Kindle',
        'Neck Pillow'
    ];

    return (
        <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
                <CardTitle>Packing List</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <PackingList title="Ski Equipment" items={skiEquipment} />
                        <PackingList title="Clothing" items={clothing} />
                        <PackingList title="Personal Items" items={personal} />
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default PackingTab;
```

# src/components/ski-trip/ResortTab.tsx

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ResortDetails } from './types';

const ResortTab: React.FC = () => {
    const resort: ResortDetails = {
        name: 'Portes Du Soleil',
        skiPassValidity: 'January 20-25',
        transfers: 'Included Round Trip',
        additionalEquipment: 'Ski Card and Deposit'
    };

    return (
        <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
                <CardTitle>Ski Resort Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">{resort.name}</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span>Ski Pass Validity:</span>
                            <span>{resort.skiPassValidity}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Transfers:</span>
                            <span>{resort.transfers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Additional Equipment:</span>
                            <span>{resort.additionalEquipment}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ResortTab;
```

# src/components/ski-trip/SkiTripPlanner.tsx

```tsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Hotel, Map, Luggage } from 'lucide-react';
import FlightsTab from './FlightsTab';
import AccommodationTab from './AccommodationTab';
import ResortTab from './ResortTab';
import PackingTab from './PackingTab';

const SkiTripPlanner: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Ski Trip to Avoriaz</h1>
                    <p className="text-slate-600">January 19-26, 2025</p>
                </header>

                <Tabs defaultValue="flights" className="w-full space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="flights" className="flex items-center gap-2">
                            <Plane className="h-4 w-4 mr-1" />
                            Flights
                        </TabsTrigger>
                        <TabsTrigger value="accommodation" className="flex items-center gap-2">
                            <Hotel className="h-4 w-4 mr-1" />
                            Accommodation
                        </TabsTrigger>
                        <TabsTrigger value="resort" className="flex items-center gap-2">
                            <Map className="h-4 w-4 mr-1" />
                            Resort
                        </TabsTrigger>
                        <TabsTrigger value="packing" className="flex items-center gap-2">
                            <Luggage className="h-4 w-4 mr-1" />
                            Packing
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="flights">
                        <FlightsTab />
                    </TabsContent>
                    <TabsContent value="accommodation">
                        <AccommodationTab />
                    </TabsContent>
                    <TabsContent value="resort">
                        <ResortTab />
                    </TabsContent>
                    <TabsContent value="packing">
                        <PackingTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default SkiTripPlanner;

```

# src/components/ski-trip/types.ts

```ts
export interface FlightDetails {
    flightNumber: string;
    departure: string;
    departureTime: string;
    arrival: string;
    arrivalTime: string;
}

export interface AccommodationDetails {
    name: string;
    checkIn: string;
    checkOut: string;
    duration: string;
    roomType: string;
}

export interface ResortDetails {
    name: string;
    skiPassValidity: string;
    transfers: string;
    additionalEquipment: string;
}

export interface PackingListProps {
    title: string;
    items: string[];
}
```

# src/components/ui/card.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

```

# src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

```

# src/components/ui/tabs.tsx

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

# src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}

```

