"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Package, Truck, Home } from "lucide-react"

export function OrderConfirmation() {
  // Generate a random order number
  const orderNumber = `CON-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="container mx-auto px-4 py-16 text-center max-w-3xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Gracias por tu compra!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Tu pedido ha sido recibido y está siendo procesado. Te hemos enviado un correo electrónico con los detalles de
          tu compra.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Número de pedido:</span>
            <span className="font-semibold">{orderNumber}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Fecha:</span>
            <span className="font-semibold">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Estado del pedido</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-1 w-full bg-gray-200"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 h-1 w-1/4 bg-amber-600"></div>
            <div className="relative flex justify-between">
              <div className="text-center">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <p className="text-sm font-medium">Confirmado</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">Procesando</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">Enviado</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Home className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-sm text-gray-500">Entregado</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">Continuar comprando</Button>
          </Link>
          <Button variant="outline">Ver detalles del pedido</Button>
        </div>
      </div>
    </div>
  )
}
