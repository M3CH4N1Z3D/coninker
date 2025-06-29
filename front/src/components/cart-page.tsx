"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import shippingRates from "@/lib/shippingRates";

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const subtotal = getTotalPrice();
  const shipping = selectedCity ? shippingRates[selectedCity] ?? 0 : 0;
  const tax = subtotal * 0.16; // 16% tax
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">
          Parece que aún no has añadido productos a tu carrito.
        </p>
        <Link href="/">
          <Button className="bg-amber-600 hover:bg-amber-700 text-white">
            Continuar comprando
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Carrito de Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Producto</th>
                    <th className="text-center pb-4">Cantidad</th>
                    <th className="text-right pb-4">Precio</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.product.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="relative w-16 h-16 mr-4 bg-gray-100">
                            <Image
                              src={
                                item.product.images[0] ||
                                "/placeholder.svg?height=100&width=100"
                              }
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <Link
                              href={`/producto/${item.product.id}`}
                              className="font-medium hover:text-amber-600"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        ${item.product.price.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center">
            <Link href="/">
              <Button variant="outline" className="mb-4 sm:mb-0">
                Continuar comprando
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-3">
              <div className="flex flex-col space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.product.name}
                    </span>
                    <span className="flex items-center space-x-2">
                      <span className="text-gray-500">Color:</span>
                      <span
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: item.product.selectedColor }}
                      ></span>
                    </span>

                    <span className="text-gray-900 font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white">
                Proceder al pago <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
