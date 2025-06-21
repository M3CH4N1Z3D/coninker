"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import { Minus, Plus, Share2, Truck, RotateCcw, Check } from "lucide-react";
import { Product } from "@/interfaces/types";

export default function ProductDetail() {
  // Llamadas a Hooks de navegación (no deben depender de condiciones)
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  // Otros Hooks
  const { toast } = useToast();
  const { addToCart } = useCart();

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  // Estados
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [colorInput, setColorInput] = useState("#000000");

  // Constantes derivadas (se pueden definir después de los estados)
  const productVideo = `/instagram/${params.id}/videos/${params.id}.mp4`;
  const colorImages = [...Array(4)].map(
    (_, index) =>
      `/instagram/${params.id}/${selectedColor.replace("#", "")}/${params.id}${
        index + 1
      }.webp`
  );

  // Determinar si estamos en modo admin (basado en el path)
  const isAdmin = pathname?.startsWith("/admin/productos");

  // Carga de datos del producto (siempre se ejecuta, independientemente del render)
  useEffect(() => {
    if (!params.id) return;

    const fetchProductData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${params.id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");

        const data = await response.json();
        setProduct(data.product);
        setSelectedColor(data.product.colors?.[0] || "#000000");
        setEditedProduct(data.product);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.id, apiUrl]);

  // Si sigue cargándose o no se encontró el producto, renderizamos un mensaje fijo.
  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  // Acciones de edición

  const handleColorChange = (color: string) => {
    setEditedProduct((prev) => {
      const colors = prev?.colors || []; // Asegúrate de que colors sea un arreglo
      return {
        ...prev!,
        colors: colors.includes(color)
          ? colors.filter((c) => c !== color)
          : [...colors, color],
      };
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${apiUrl}/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) throw new Error("Error al guardar cambios");

      const updatedProduct = await response.json();
      setProduct(updatedProduct.product);
      setIsEditing(false);

      toast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
      });
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct!,
      [e.target.name]: e.target.value,
    });
  };

  // Acciones de carrito
  const handleAddToCart = () => {
    if (!product) return;

    const productWithColor: Product = {
      ...product,
      selectedColor,
    };

    addToCart(productWithColor, quantity);
    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido a tu carrito`,
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const getContrastColor = (hexColor: string) => {
    const cleanHex = hexColor.replace("#", "");
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  const textColor = getContrastColor(selectedColor);

  const handleBack = () => {
    router.back();
  };

  return (
    <section
      className="py-12 inset-0 bg-black/20 transition-colors duration-1000"
      style={{ backgroundColor: selectedColor, color: textColor }}
    >
      <div className="container mx-auto px-4">
        <span
          className="text-yellow-600 hover:underline cursor-pointer"
          onClick={handleBack}
        >
          Volver
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4 relative">
            {/* Imagen o Video principal */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              {selectedImage < product?.images?.length ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name || ""}
                  fill
                  className="object-cover transition-opacity duration-500 ease-in-out opacity-100"
                />
              ) : (
                <video
                  className="w-full h-full rounded-lg shadow-md"
                  autoPlay
                  muted
                >
                  <source src={productVideo} type="video/mp4" />
                </video>
              )}
            </div>

            {/* Miniaturas sobre la imagen grande */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product?.images?.map((image, index) => (
                <button
                  key={index}
                  className={`relative w-16 h-16 overflow-hidden bg-gray-100 rounded-lg ${
                    selectedImage === index ? "ring-2 ring-amber-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}

              {product?.videos?.map((video, index) => (
                <button
                  key={`video-${index}`}
                  className={`relative w-16 h-16 overflow-hidden bg-gray-100 rounded-lg ${
                    selectedImage === index + product.images.length
                      ? "ring-2 ring-amber-500"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedImage(index + product.images.length)
                  }
                >
                  <video className="object-cover w-full h-full">
                    <source src={productVideo} type="video/mp4" />
                  </video>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-600 font-medium">
                {product?.categories.map((cat) => cat.title).join(", ")}
              </p>
              <h1 className="text-3xl font-bold">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct?.name}
                    onChange={handleChange}
                    className="bg-white text-black"
                  />
                ) : (
                  product.name
                )}
              </h1>
            </div>
            <p className="text-xl font-medium">
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={editedProduct?.price}
                  onChange={handleChange}
                  className="bg-white text-black"
                />
              ) : (
                `$${product.price}`
              )}
            </p>
            <div className="prose prose-gray max-w-none">
              <p>
                {isEditing ? (
                  <input
                    type="text"
                    name="description"
                    value={editedProduct?.description}
                    onChange={handleChange}
                    className="bg-white text-black"
                  />
                ) : (
                  product.description
                )}
              </p>
            </div>
            <div className="prose prose-gray max-w-none">
              <p>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullDescription"
                    value={editedProduct?.fullDescription}
                    onChange={handleChange}
                    className="bg-white text-black"
                  />
                ) : (
                  product.fullDescription
                )}
              </p>
            </div>
            {/* Dimensions */}
            <div className="border-t border-b py-4">
              <h3 className="font-semibold mb-2">Dimensiones:</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p>Ancho</p>
                  <p className="font-medium">
                    {isEditing ? (
                      <input
                        type="number"
                        name="width"
                        value={editedProduct?.width}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    ) : (
                      `${product.width} cm`
                    )}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Alto</p>
                  <p>
                    {isEditing ? (
                      <input
                        type="number"
                        name="height"
                        value={editedProduct?.height}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    ) : (
                      `${product.height} cm`
                    )}
                  </p>
                </div>
                <div>
                  <p>Profundidad</p>
                  <p className="font-medium">
                    {isEditing ? (
                      <input
                        type="number"
                        name="length"
                        value={editedProduct?.length}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    ) : (
                      `${product.length} cm`
                    )}
                  </p>
                </div>
                <div>
                  <p>Peso</p>
                  <p className="font-medium">
                    {isEditing ? (
                      <input
                        type="number"
                        name="weight"
                        value={editedProduct?.weight}
                        onChange={handleChange}
                        className="bg-white text-black"
                      />
                    ) : (
                      `${product.weight} kg`
                    )}
                  </p>
                </div>
              </div>
            </div>
            {/* Botones para seleccionar color */}
            {isEditing ? (
              <div className="mt-4">
                <label className="font-semibold">Colores disponibles:</label>
                <div className="flex items-center gap-2 mt-2">
                  {/* Selector de color */}
                  <input
                    type="color"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    className="w-10 h-10 border rounded-md cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => handleColorChange(colorInput)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Agregar Color
                  </button>
                </div>

                {/* Lista de colores seleccionados */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {editedProduct?.colors?.map((color) => (
                    <span
                      key={color}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        type="button"
                        onClick={() => handleColorChange(color)}
                        className="text-white font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex gap-2">
                {product?.colors?.map((color, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-amber-500" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImage(0);
                    }}
                  />
                ))}
              </div>
            )}
            {/* Sección de acciones */}
            {isAdmin ? (
              <div className="flex flex-col space-y-4">
                <Button
                  onClick={isEditing ? handleSaveChanges : handleEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isEditing ? "Guardar cambios" : "Editar producto"}
                </Button>
                {isEditing && (
                  <Button
                    onClick={handleCancelEdit}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Cancelar
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-none"
                      onClick={incrementQuantity}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="ml-4 text-sm">
                    {product && product.stock > 10
                      ? "En stock"
                      : product && product.stock < 5
                      ? `Solo ${product.stock} disponibles`
                      : "Agotado"}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product?.stock === 0}
                  >
                    Añadir al carrito
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md"
                    style={{ backgroundColor: selectedColor }}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
            {!isAdmin && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Envío gratis</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Devolución en 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-amber-600" />
                  <span className="text-sm">Garantía de 2 años</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-16 mx-6">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-amber-600 px-8 py-3"
            >
              Descripción
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="pt-6">
            <div className="prose prose-gray max-w-none">
              <p>{product?.fullDescription}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
