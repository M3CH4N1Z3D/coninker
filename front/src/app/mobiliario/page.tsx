import { CartPage } from "@/components/cart-page";
import MobiliarioPage from "@/components/mobiliarioPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explora todos nuestro productos | Coninker",
  description: "Enterate de todos los productos y novedades.",
};

export default function Cart() {
  return <MobiliarioPage />;
}
