# .github/workflows/deploy.yml

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
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

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          
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
  basePath: '/avoriaz',
  assetPrefix: '/avoriaz'
}

module.exports = nextConfig
```

# next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    "lucide-react": "^0.469.0",
    "next": "15.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
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

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: Arial, Helvetica, sans-serif;
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

# src/app/page.tsx

```tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plane, Hotel, Map, Luggage } from 'lucide-react';

const SkiTripPlanner = () => {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">טיול סקי באבוריאז</h1>
          <p className="text-slate-600">19-26 ינואר 2025</p>
        </header>

        <Tabs defaultValue="flights" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="flights" className="flex items-center gap-2 flex-row-reverse">
              <Plane className="h-4 w-4 ml-1" />
              טיסות
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="flex items-center gap-2 flex-row-reverse">
              <Hotel className="h-4 w-4 ml-1" />
              לינה
            </TabsTrigger>
            <TabsTrigger value="resort" className="flex items-center gap-2 flex-row-reverse">
              <Map className="h-4 w-4 ml-1" />
              אתר הסקי
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex items-center gap-2 flex-row-reverse">
              <Luggage className="h-4 w-4 ml-1" />
              ציוד
            </TabsTrigger>
          </TabsList>

          <TabsContent value="flights">
            <Card className="border-r-4 border-r-blue-500">
              <CardHeader>
                <CardTitle className="text-right">פרטי טיסות</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold mb-4 text-lg">טיסה הלוך - 19 בינואר</h3>
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">מספר טיסה:</span>
                        <span>ISRAIR 6H141</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">המראה:</span>
                        <span>תל אביב - 08:25</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">נחיתה:</span>
                        <span>ALPS-ISERE - 12:05</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4 text-lg">טיסה חזור - 26 בינואר</h3>
                    <div className="space-y-2 text-right">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">מספר טיסה:</span>
                        <span>ISRAIR 6H142</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">המראה:</span>
                        <span>ALPS-ISERE - 13:05</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">נחיתה:</span>
                        <span>תל אביב - 18:10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accommodation">
            <Card className="border-r-4 border-r-green-500">
              <CardHeader>
                <CardTitle className="text-right">מלון</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">RESIDENCE ATRIA CROZAT 3*</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תאריך כניסה:</span>
                      <span>19 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תאריך יציאה:</span>
                      <span>26 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">משך השהייה:</span>
                      <span>7 לילות</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">סוג חדר:</span>
                      <span>דירה ל-4 אנשים</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resort">
            <Card className="border-r-4 border-r-purple-500">
              <CardHeader>
                <CardTitle className="text-right">פרטי אתר הסקי</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Portes Du Soleil</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">תוקף סקיפס:</span>
                      <span>20-25 בינואר</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">העברות:</span>
                      <span>כלולות הלוך ושוב</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">ציוד נוסף:</span>
                      <span>כרטיס סקי ופיקדון</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packing">
            <Card className="border-r-4 border-r-orange-500">
              <CardHeader>
                <CardTitle className="text-right">רשימת ציוד</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ציוד סקי</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>קסדה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגלשיים / קרש</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מקלות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>נעלי סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מעיל סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מכנסי סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגן גב</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מגן תחת</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>משקף סקי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כפפות סקי</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ביגוד</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>חליפה תרמית כפול 3</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כובע גרב</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>חם צוואר</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>גרביים חמות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>סווטשירט לטיסה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מכנסי טיסה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>טרנינג ללילה</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>3 ג׳ינסים</span>
                        </li>
                      </ul>
                    </div>
                    <div className="text-right">
                      <h3 className="font-semibold mb-4 text-lg border-b pb-2">ציוד אישי</h3>
                      <ul className="space-y-2 text-right pr-4">
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>דרכונים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כסף</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כרטיסי אשראי</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>מטענים</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>אייפד</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>אוזניות</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>קינדל</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span>✓</span>
                          <span>כרית צוואר</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkiTripPlanner;
```

# tailwind.config.ts

```ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

