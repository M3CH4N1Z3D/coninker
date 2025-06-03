import { CheckoutPage } from "@/components/checkout-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finalizar Compra | Coninker",
  description: "Completa tu compra proporcionando la información de envío y pago.",
}

export default function Checkout() {
  return <CheckoutPage />
}
