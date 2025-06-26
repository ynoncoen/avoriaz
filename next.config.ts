import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    output: process.env.NODE_ENV === 'development' ? undefined : 'export',
    images: {
        unoptimized: true
    },
    basePath: process.env.NODE_ENV === 'development' ? '' : '/ski',
    assetPrefix: process.env.NODE_ENV === 'development' ? '' : '/ski/',
    // Add headers for PWA
    async headers() {
        return [
            {
                source: '/ski/manifest.json',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store',
                    },
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: '*',
                    },
                ],
            },
            {
                source: '/ski/sw.js',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;