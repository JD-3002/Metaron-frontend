import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV !== "production"
            ? `https://metaron-lead-backend.onrender.com/api/:path*`
            : `http://localhost:8000/api/:path*`, // Proxy to Backend
      },
      {
        source: "/file/:path*",
        destination:
          process.env.NODE_ENV !== "production"
            ? `http://localhost:8000/file/:path*`
            : `http://localhost:8000/api/:path*`, // Proxy to Image
      },
    ];
  },
};

export default nextConfig;
