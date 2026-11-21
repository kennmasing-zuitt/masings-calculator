/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build a small, self-contained server in .next/standalone for Docker
  output: "standalone",
};

export default nextConfig;
