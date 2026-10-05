import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Brands page became Collections — keep old links and search results working.
  async redirects() {
    return [{ source: "/brands", destination: "/collections", permanent: true }];
  },
};

export default nextConfig;
