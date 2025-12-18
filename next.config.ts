import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tambahkan konfigurasi ini untuk menaikkan limit upload
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Bisa kamu atur misal '10mb' jika perlu lebih besar
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;