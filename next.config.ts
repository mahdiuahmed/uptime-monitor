import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    domains: ["images.unsplash.com"],
  },
  /* config options here */
};

export default nextConfig;
