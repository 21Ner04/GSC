/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    domains: ['localhost'],
    unoptimized: true, // Отключаем оптимизацию для надежности
  },
};

module.exports = nextConfig;
