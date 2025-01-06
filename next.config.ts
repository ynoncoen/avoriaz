import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: process.env.VERCEL ? undefined : 'export',
    images: {
        unoptimized: true,
    },
    basePath: '/avoriaz',
    assetPrefix: '/avoriaz/',
    trailingSlash: true,
    // Add headers for PWA
    headers: async () => {
        return [
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
            {
                source: '/manifest.json',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;