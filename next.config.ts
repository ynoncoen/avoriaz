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