import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rigel-landing",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
