import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://**.cloudfront.net/**')],
  },
}

export default nextConfig
