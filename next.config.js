/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      {
        protocol: 'https',
        hostname: 'gsc-sandy.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
