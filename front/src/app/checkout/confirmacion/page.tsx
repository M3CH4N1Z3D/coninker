import { OrderConfirmation } from "@/components/order-confirmation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pedido Confirmado | Coninker",
  description: "Tu pedido ha sido confirmado. Gracias por tu compra.",
}

export default function OrderConfirmationPage() {
  return <OrderConfirmation />
}
