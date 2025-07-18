"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Trash2, X } from "lucide-react";

export function CartDropdown() {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getTotalPrice();

  return (
    <>
      {/* Botón del carrito */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingBag className="h-8 w-8" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#1c1c1c] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      {/* Overlay oscuro */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar del carrito */}
      <div
        className={`fixed top-0 right-0 h-screen w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--colorLetra)]">
          <h3 className="text-lg font-medium text-[var(--colorLetra)]">
            Mi Carrito ({totalItems})
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.variantId}
                className="flex items-center mb-4 overflow-y-auto"
              >
                <div className="relative w-12 h-12 bg-gray-100 mr-3 flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-[#1c1c1c]">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-800 hover:cursor-pointer"
                  onClick={() => removeFromCart(item.product.variantId)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[var(--colorLetra)] text-[var(--colorLetra)]">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">
              ${subtotal.toLocaleString("es-CO")}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/carrito" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full hover:cursor-pointer">
                Ver carrito
              </Button>
            </Link>
            <Link href="/checkout" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-gray-600 hover:bg-gray-800 text-white hover:cursor-pointer">
                Finalizar compra
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
