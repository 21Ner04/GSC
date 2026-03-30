/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    unoptimized: true, // Отключаем оптимизацию для надежности
  },
};

module.exports = nextConfig;
