"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { Trash2, Plus, Minus, ArrowRight, MapPin } from "lucide-react";
import { shippingRates } from "@/lib/shippingRates";
import { useToast } from "./ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();
  const { toast } = useToast();
  // const [couponCode, setCouponCode] = useState("");
  const [selectedCity, setSelectedCity] = useState<{
    municipio: string;
    price: number;
  }>({
    municipio: "",
    price: 0,
  });
  const [selectedDepartamento, setSelectedDepartamento] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    municipio: "",
    postalCode: "",
  });
  const [formValid, setFormValid] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = selectedCity.price;
  const tax = subtotal * 0;
  const total = subtotal + tax + shipping;

  const municipiosFiltrados = shippingRates.filter(
    (rate) => rate.departamento === selectedDepartamento
  );

  useEffect(() => {
    const isValid =
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.municipio;

    setFormValid(Boolean(isValid));
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      nombre: formData.firstName,
      apellido: formData.lastName,
      telefono: formData.phone,
      email: formData.email,
      direccion: formData.address,
      municipio: formData.municipio,
      departamento: selectedDepartamento,
      total,
      productos: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        structureColor: item.product.structureColor,
        principalColor: item.product.principalColor,
        variantId: item.product.variantId,
      })),
    };

    try {
      const response = await fetch("/api/create-payu-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderData,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al generar el formulario de pago");
      }

      const html = await response.text();
      const popup = window.open("", "_blank", "width=800,height=600");

      if (!popup) {
        throw new Error("No se pudo abrir la ventana de pago");
      }

      popup.document.write(html);
      localStorage.setItem("orderData", JSON.stringify(orderData));

      toast({
        title: "¡Pedido iniciado!",
        description:
          "Completa la transacción en la ventana emergente. No la cierres ni recargues esta página.",
      });

    } catch (error) {
      console.error(error);
      localStorage.removeItem("orderData");

      toast({
        title: "Error al iniciar el pago",
        description:
          "Por favor intenta nuevamente. Si el problema persiste, revisa tu conexión.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">
          Parece que aún no has añadido productos a tu carrito.
        </p>
        <Link href="/">
          <Button className="bg-[var(--hoverColor)] hover:bg-amber-700 text-white">
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
          <div className="bg-[var(--fondoPrincipal)] rounded-lg overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Producto</th>
                    <th className="text-center pb-4">Colores</th>
                    <th className="text-center pb-4">Cantidad</th>
                    <th className="text-center pb-4">Precio</th>
                    <th className="text-center pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.product.variantId} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="relative w-16 h-16 mr-4 bg-gray-100">
                            <Image
                              src={
                                item.product.image ||
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
                              className="font-medium hover:text-[var(--hoverColor)]"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 align-top">
                        <div className="flex flex-col gap-3 text-left">
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700 w-32">
                              Color Madera:
                            </span>
                            <span
                              className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                              style={{
                                backgroundColor: item.product.principalColor,
                              }}
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700 w-32">
                              Color Estructura:
                            </span>
                            <span
                              className="w-5 h-5 rounded-full border border-gray-300 shrink-0"
                              style={{
                                backgroundColor: item.product.structureColor,
                              }}
                            />
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
                                item.product.variantId,
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
                              updateQuantity(
                                item.product.variantId,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        ${item.product.price.toLocaleString("es-CO")}
                      </td>
                      <td className="py-4 text-right font-medium">
                        $
                        {(item.product.price * item.quantity).toLocaleString(
                          "es-CO"
                        )}
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => removeFromCart(item.product.variantId)}
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
          <div className="grid grid-cols-1 gap-8 w-full">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <div className="bg-[var(fondo-Principal)] rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-amber-600" />{" "}
                    Información de envío
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        required
                        className="mt-1"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Apellidos</Label>
                      <Input
                        id="lastName"
                        required
                        className="mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        className="mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        className="mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Dirección</Label>
                      <Input
                        id="address"
                        required
                        className="mt-1"
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="departamento">Departamento</Label>
                      <select
                        id="departamento"
                        value={selectedDepartamento}
                        onChange={(e) => {
                          setSelectedDepartamento(e.target.value);
                          setSelectedCity({ municipio: "", price: 0 });
                          setFormData((prev) => ({
                            ...prev,
                            departamento: e.target.value,
                            municipio: "",
                          }));
                        }}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="">
                          -- Selecciona un departamento --
                        </option>
                        {[
                          ...new Set(
                            shippingRates.map((rate) => rate.departamento)
                          ),
                        ].map((dep) => (
                          <option key={dep} value={dep}>
                            {dep}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="mun" className="mt-1 mb-[0.62rem] block">
                        Ciudad:
                      </Label>
                      <select
                        id="mun"
                        value={selectedCity.municipio}
                        onChange={(e) => {
                          const selected = municipiosFiltrados.find(
                            (rate) => rate.municipio === e.target.value
                          );
                          if (selected) {
                            setSelectedCity({
                              municipio: selected.municipio,
                              price: selected.price,
                            });
                            setFormData((prev) => ({
                              ...prev,
                              municipio: selected.municipio,
                            }));
                          } else {
                            setSelectedCity({ municipio: "", price: 0 });
                            setFormData((prev) => ({ ...prev, municipio: "" }));
                          }
                        }}
                        disabled={!selectedDepartamento}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      >
                        <option value="">-- Selecciona una ciudad --</option>
                        {municipiosFiltrados.map((rate) => (
                          <option key={rate.municipio} value={rate.municipio}>
                            {rate.municipio}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="notes">
                        Notas adicionales (opcional)
                      </Label>
                      <Textarea id="notes" className="mt-1" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[var(--fondoPrincipal)] rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Resumen del pedido</h2>
            <div className="space-y-3">
              <div className="flex flex-col space-y-2">
                {cart.map((item) => (
                  <div
                    key={item.product.variantId}
                    className="flex justify-between border-b pb-2"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.product.name} x{item.quantity}
                    </span>

                    <span className="text-gray-900 font-semibold">
                      $
                      {(item.product.price * item.quantity).toLocaleString(
                        "es-CO"
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>{shipping.toLocaleString("es-CO")}</span>
                </div>

                <div className="flex justify-between font-semibold mt-2">
                  <span>Total</span>
                  <span>${total.toLocaleString("es-CO")}</span>
                </div>
                <div className="mt-6 text-sm text-gray-500">
                  <p>
                    Al completar tu pedido, aceptas nuestros{" "}
                    <Link
                      href="#"
                      className="text-[var(--hoverColor)] hover:underline"
                    >
                      Términos y condiciones
                    </Link>{" "}
                    y{" "}
                    <Link
                      href="#"
                      className="text-[var(--hoverColor)] hover:underline"
                    >
                      Política de privacidad
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleSubmit}
              variant="default"
              disabled={!formValid || isSubmitting}
              className="w-full mt-6 bg-gray-600 text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-gray-800"
            >
              {isSubmitting ? (
                "Procesando..."
              ) : (
                <>
                  Proceder al pago <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
            {!formValid && (
              <p className="text-sm text-red-500 mt-2">
                Debes completar el formulario de envío para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
