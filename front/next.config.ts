import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["res.cloudinary.com"], // ✅ Agrega Instagram como dominio permitido
  },
};

export default nextConfig;
