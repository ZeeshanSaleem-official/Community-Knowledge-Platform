import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
  // Empty turbopack config to satisfy Next.js 16
  turbopack: {},
};

export default nextConfig;
