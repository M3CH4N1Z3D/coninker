import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["www.instagram.com"], // ✅ Agrega Instagram como dominio permitido
  },
};

export default nextConfig;
