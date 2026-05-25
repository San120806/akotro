import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.29.128', 'localhost'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
