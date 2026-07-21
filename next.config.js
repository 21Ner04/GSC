/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "https",
        hostname: "www.greenstreetcapitalgroup.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "greenstreetcapitalgroup.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gsc-sandy.vercel.app",
        pathname: "/**",
      },
    ],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/specialties/first-time-buyers",
        destination: "/specialties/first-time-homebuyers",
        permanent: true,
      },
      {
        source: "/specialties/investment-properties",
        destination: "/specialties/investment",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
