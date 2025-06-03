import { CartPage } from "@/components/cart-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Carrito de Compra | Coninker",
  description: "Revisa los productos en tu carrito de compra y procede al pago.",
}

export default function Cart() {
  return <CartPage />
}
