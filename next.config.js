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