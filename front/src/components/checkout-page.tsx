"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import { CreditCard, Truck, MapPin } from "lucide-react";
import { ShippingRate } from "@/interfaces/types";
import shippingRates from "@/lib/shippingRates";

export function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCity, setSelectedCity] = useState<ShippingRate>({
    city: "",
    price: 0,
  });

  const subtotal = getTotalPrice();
  const shipping = selectedCity.price;
  const tax = subtotal * 0.0;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "¡Pedido realizado con éxito!",
      description:
        "Recibirás un correo electrónico con los detalles de tu compra.",
    });

    clearCart();
    router.push("/checkout/confirmacion");
    setIsSubmitting(false);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">
          No puedes proceder al pago sin productos en tu carrito.
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
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-amber-600" /> Información
                de envío
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input id="firstName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellidos</Label>
                  <Input id="lastName" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" required className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input id="address" required className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city" className="block mt-1 mb-[0.62rem]">
                    Ciudad:
                  </Label>
                  <select
                    id="city"
                    value={selectedCity.city}
                    onChange={(e) => {
                      const selected = shippingRates.find(
                        (rate) => rate.city === e.target.value
                      );
                      if (selected) {
                        setSelectedCity(selected);
                      } else {
                        setSelectedCity({ city: "", price: 0 });
                      }
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  >
                    <option value="">-- Selecciona una ciudad --</option>
                    {shippingRates.map((rate) => (
                      <option key={rate.city} value={rate.city}>
                        {rate.city}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="postalCode">Código Postal</Label>
                  <Input id="postalCode" required className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="notes">Notas adicionales (opcional)</Label>
                  <Textarea id="notes" className="mt-1" />
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-amber-600" /> Método de
                pago
              </h2>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    <div className="font-medium">Tarjeta de crédito/débito</div>
                    <div className="text-sm text-gray-500">
                      Pago seguro con tarjeta
                    </div>
                  </Label>
                  <div className="flex space-x-1">
                    <div className="w-8 h-5 bg-blue-600 rounded"></div>
                    <div className="w-8 h-5 bg-red-500 rounded"></div>
                    <div className="w-8 h-5 bg-gray-800 rounded"></div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="border p-4 rounded-md mt-2 space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Número de tarjeta</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Fecha de expiración</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/AA"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                      <Input id="cardName" required className="mt-1" />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                    <div className="font-medium">PayPal</div>
                    <div className="text-sm text-gray-500">
                      Pago rápido y seguro
                    </div>
                  </Label>
                  <div className="w-16 h-5 bg-blue-500 rounded"></div>
                </div>
              </RadioGroup>
            </div> */}

            <Button
              type="submit"
              className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Procesando..." : "Completar pedido"}
            </Button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Pagar</h2>

            <div className="max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div
                  key={item.product.variantId}
                  className="flex py-3 border-b"
                >
                  <div className="relative w-16 h-16 bg-gray-100 mr-4 flex-shrink-0">
                    <Image
                      src={
                        item.product.image ||
                        "/placeholder.svg?height=100&width=100"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute -top-2 -right-2 bg-gray-800 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">
                      {item.product.name}
                    </h3>
                    <div className="text-sm text-gray-500">
                      <p>Colores Sleccionados: </p>
                      <p>
                        Color Madera{" "}
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                          style={{
                            backgroundColor: item.product.principalColor,
                          }}
                        />
                      </p>
                      <p>
                        Color Estructura{" "}
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                          style={{
                            backgroundColor: item.product.structureColor,
                          }}
                        />
                      </p>
                    </div>
                    <p className="text-sm font-semibold mt-1">
                      $
                      {(item.product.price * item.quantity).toLocaleString(
                        "es-CO"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${subtotal.toLocaleString("es-CO")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span>{shipping.toLocaleString("es-CO")}</span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-CO")}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>
                Al completar tu pedido, aceptas nuestros{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Términos y condiciones
                </Link>{" "}
                y{" "}
                <Link href="#" className="text-amber-600 hover:underline">
                  Política de privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
