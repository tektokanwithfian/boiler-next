/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
    }, {
      protocol: 'https',
      hostname: 'tailwindui.com',
    }, {
      protocol: 'https',
      hostname: '**.tailwindui.com',
    }, {
      protocol: 'https',
      hostname: 'img.clerk.com',
    }, {
      protocol: 'https',
      hostname: '**.clerk.com',
    }, {
      protocol: 'https',
      hostname: '**.googleusercontent.com',
    }, {
      protocol: 'https',
      hostname: '**.googleapis.com',
    }, {
      protocol: 'https',
      hostname: '**.annihil.us',
    }, {
      protocol: 'https',
      hostname: '**.unsplash.com',
    }, {
      protocol: 'https',
      hostname: 'place-hold.it',
    }, {
      protocol: 'https',
      hostname: '**.place-hold.it',
    }, {
      protocol: 'https',
      hostname: 'placehold.co',
    }, {
      protocol: 'https',
      hostname: '**.placehold.co',
    }, {
      protocol: 'https',
      hostname: '**.placehold.it',
    }],
  },
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false
    config.resolve.alias.encoding = false
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts'],
      '.jsx': ['.jsx', '.tsx'],
    }
    return config
  },
}

/* eslint-disable */
// const withPWA = require('next-pwa')
import withPWA from 'next-pwa'

export default withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig)
/* eslint-enable */
