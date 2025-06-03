import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CONINKER - Muebles | Diseño",
  description: "🇨🇴Hecho por manos colombianas",
  generator: "SPM INTEGRAL",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
