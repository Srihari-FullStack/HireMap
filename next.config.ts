import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/HireMap',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
