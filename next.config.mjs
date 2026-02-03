/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Environment variables available in the browser
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },

  // Output configuration
  output: "standalone",

  // Turbopack configuration (empty to silence warning)
  turbopack: {},

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // Experimental features
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-icons",
      "@phosphor-icons/react",
      "lucide-react",
    ],
  },
};

export default nextConfig;
