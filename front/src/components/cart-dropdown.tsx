"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Trash2 } from "lucide-react";

export function CartDropdown() {
  const { cart, removeFromCart, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = getTotalPrice();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-80 bg-white border shadow-lg"
      >
        <div className="p-4">
          <h3 className="font-medium">Mi Carrito ({totalItems})</h3>
        </div>
        <DropdownMenuSeparator />

        {cart.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Tu carrito está vacío
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <DropdownMenuItem
                  key={item.product.id}
                  className="p-0 hover:bg-gray-50"
                >
                  <div className="flex items-center p-3 w-full">
                    <div className="relative w-12 h-12 bg-gray-100 mr-3 flex-shrink-0">
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} x ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(item.product.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />
            <div className="p-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <Link href="/carrito" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Ver carrito
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    Finalizar compra
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
