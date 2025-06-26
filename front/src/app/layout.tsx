import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Montserrat } from "next/font/google";
import { WhatsAppButton } from "@/components/whatsAppButton";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // light, normal, medium, semibold, bold
  variable: "--font-montserrat",
  display: "swap",
});

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
    <html lang="es" className={montserrat.variable}>
      <body>
        <CartProvider>
          <Header />
          {children}
          <WhatsAppButton />
          <Toaster />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
