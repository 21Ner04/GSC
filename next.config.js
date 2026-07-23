/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prefer apex-less production URLs (canonicals use www from content/site.json)
  trailingSlash: false,
  poweredByHeader: false,
  compress: true,
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
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
    ],
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
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
      // Common alternate URLs → canonical marketing routes
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index",
        destination: "/",
        permanent: true,
      },
      {
        source: "/mortgage-calculator",
        destination: "/calculator",
        permanent: true,
      },
      {
        source: "/book",
        destination: "/schedule",
        permanent: true,
      },
      {
        source: "/booking",
        destination: "/schedule",
        permanent: true,
      },
      {
        source: "/meet-the-team",
        destination: "/team",
        permanent: true,
      },
      {
        source: "/loan-officers",
        destination: "/team",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, s-maxage=86400",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
