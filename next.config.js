/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  },
  basePath: '/ski', // This should match your repository name
  assetPrefix: '/ski/', // This should match your repository name with a trailing slash
  trailingSlash: true
}

module.exports = nextConfig