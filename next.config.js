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