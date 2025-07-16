"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/cart-context";
import { Minus, Plus, Share2, Truck, RotateCcw, Check } from "lucide-react";
import { Product, ProductCheckOut } from "@/interfaces/types";

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
  const [selectedPrincipalColor, setSelectedPrincipalColor] =
    useState<string>("");
  const [selectedStructureColor, setSelectedStructureColor] =
    useState<string>("");
  const [selectedColorCombo, setSelectedColorCombo] = useState<string>("");
  const [colorInput, setColorInput] = useState("#000000");
  const [showDescription, setShowDescription] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showDimensions, setShowDimensions] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Constantes derivadas (se pueden definir después de los estados)
  const productVideo = `/instagram/${params.id}/videos/${params.id}.mp4`;
  const filteredImages = product?.images.filter((imgUrl) =>
    imgUrl.includes(`/products/${product?.id}/${selectedColorCombo}/`)
  );

  // Determinar si estamos en modo admin (basado en el path)
  const isAdmin = pathname?.startsWith("/admin/productos");

  useEffect(() => {
    // Cargar el producto al montar el componente
    if (!params.id) return;

    const fetchProductData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${params.id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");

        const data = await response.json();
        setProduct(data.product);
        setSelectedPrincipalColor(
          data.product.principalColors?.[0] || "#000000"
        );
        setSelectedStructureColor(
          data.product.structureColors?.[0] || "#000000"
        );
        setSelectedColorCombo(
          `${(data.product.principalColors?.[0] || "").replace("#", "")}${(
            data.product.structureColors?.[0] || ""
          ).replace("#", "")}`
        );

        setEditedProduct(data.product);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [params.id, apiUrl]);

  useEffect(() => {
    // Actualizar el combo de colores seleccionado
    if (!selectedPrincipalColor || !selectedStructureColor) return;
    setSelectedColorCombo(
      `${selectedPrincipalColor.replace(
        "#",
        ""
      )}${selectedStructureColor.replace("#", "")}`
    );
    console.log(selectedColorCombo);
  }, [selectedPrincipalColor, selectedStructureColor]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const handleStructureColorChange = (color: string) => {
    // Cambia el color de la estructura
    setEditedProduct((prev) => {
      const structureColors = prev?.structureColors || [];
      return {
        ...prev!,
        structureColors: structureColors.includes(color)
          ? structureColors.filter((c) => c !== color)
          : [...structureColors, color],
      };
    });
  };

  const handlePrincipalColorChange = (color: string) => {
    // Cambia el color principal
    setEditedProduct((prev) => {
      const principalColors = prev?.principalColors || [];
      return {
        ...prev!,
        principalColors: principalColors.includes(color)
          ? principalColors.filter((c) => c !== color)
          : [...principalColors, color],
      };
    });
  };

  const handleEdit = () => {
    // Activa el modo de edición
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Cancela la edición y restaura el producto original
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    // Guarda los cambios realizados al producto
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
    // Maneja los cambios en los campos de entrada del producto editado
    setEditedProduct({
      ...editedProduct!,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddToCart = () => {
    // Añade el producto al carrito
    if (!product) return;

    const productCheckOut: ProductCheckOut = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      principalColor: selectedPrincipalColor,
      structureColor: selectedStructureColor,
      image: product.images[0],
    };

    addToCart(productCheckOut, quantity);
    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido a tu carrito`,
      variant: "default",
    });
  };

  const handleBack = () => {
    // Navega hacia atrás en el historial
    router.back();
  };

  return (
    <section className="py-12 inset-0 bg-[var(--fondoPrincipal)] transition-colors duration-1000">
      {/* Contenedor principal */}
      <div className="container mx-auto px-4">
        <span // Botón para volver atrás
          className="text-yellow-600 hover:underline cursor-pointer"
          onClick={handleBack}
        >
          Volver
        </span>
        {/* Grid para imagen y detalles del producto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contenedor de imágenes del producto */}
          <div className="space-y-4 relative">
            {/* Imagen principal del producto */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              {filteredImages?.[selectedImage] ? (
                <Image
                  src={filteredImages[selectedImage]}
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
            {/* Contenedor de miniaturas de imágenes */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {filteredImages?.map((image, index) => (
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
              <h1 className="text-2xl text-gray-500">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editedProduct?.name}
                    onChange={handleChange}
                    className="bg-white text-black"
                  />
                ) : (
                  product.name.toUpperCase()
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
                `$${product.price.toLocaleString("es-CO")}`
              )}
            </p>

            {/* Botones para seleccionar color */}
            {isEditing ? (
              <div className="mt-4">
                <label className="font-semibold">
                  Colores disponibles para estructura:
                </label>
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
                    onClick={() => handleStructureColorChange(colorInput)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Agregar Color
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {editedProduct?.structureColors?.map((color) => (
                    <span
                      key={color}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        type="button"
                        onClick={() => handleStructureColorChange(color)}
                        className="text-white font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <label className="font-semibold">
                  Colores principales disponibles:
                </label>
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
                    onClick={() => handlePrincipalColorChange(colorInput)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                  >
                    Agregar Color
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {editedProduct?.principalColors?.map((color) => (
                    <span
                      key={color}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        type="button"
                        onClick={() => handlePrincipalColorChange(color)}
                        className="text-white font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                <h2>Colores Estructuras</h2>
                <div className="flex flex-row gap-2">
                  {product?.structureColors?.map((color, index) => (
                    <button
                      key={index}
                      className={`w-6 h-12 rounded-md border transition-all duration-200 ${
                        selectedStructureColor === color
                          ? "ring-2 ring-[var(--fondoSecundario)]"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedStructureColor(color);
                        setSelectedImage(0);
                      }}
                      aria-label={`Seleccionar color ${color}`}
                    />
                  ))}
                </div>
                <h2>Colores Madera Pino</h2>
                <div className="flex flex-row gap-2">
                  {product?.principalColors?.map((color, index) => (
                    <button
                      key={index}
                      className={`w-12 h-6 rounded-md border transition-all duration-200 ${
                        selectedPrincipalColor === color
                          ? "ring-2 ring-amber-500"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setSelectedPrincipalColor(color);

                        setSelectedImage(0);
                      }}
                    />
                  ))}
                </div>
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
                {/*<div className="flex items-center">
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
                </div>*/}
                <div className="flex gap-4">
                  <Button
                    className="flex-1 bg-transparent border boder-1 hover:bg-[var(--hoverColor)] text-gray-500 hover:text-white"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={product?.stock === 0}
                  >
                    Añadir al carrito
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-md">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
            <div className="prose prose-gray max-w-none mt-6 border-t pt-4">
              {(
                [
                  {
                    title: "Descripción",
                    value: product.description,
                    editKey: "description" as const,
                    state: showDescription,
                    toggle: setShowDescription,
                  },
                  {
                    title: "Materiales",
                    value: product.materials,
                    editKey: "materials" as const,
                    state: showMaterials,
                    toggle: setShowMaterials,
                  },
                  {
                    title: "Información Importante",
                    value: product.fullDescription,
                    editKey: "fullDescription" as const,
                    state: showFullDescription,
                    toggle: setShowFullDescription,
                  },
                ] as {
                  title: string;
                  value: string;
                  editKey: keyof Product;
                  state: boolean;
                  toggle: React.Dispatch<React.SetStateAction<boolean>>;
                }[]
              ).map(({ title, value, editKey, state, toggle }) => (
                <div key={title} className="border-b py-4">
                  <div
                    className="flex h-10 items-center justify-between cursor-pointer select-none"
                    onClick={() => toggle((prev) => !prev)}
                  >
                    <span className="text-lg text-gray-500">{title}</span>
                    <button className="text-3xl text-gray-700 transition-transform duration-300">
                      {state ? "–" : "+"}
                    </button>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out mt-2 ${
                      state ? "max-h-[1000px]" : "max-h-0"
                    }`}
                  >
                    <table className="w-full table-fixed text-left mt-2">
                      <tbody>
                        <tr>
                          <td className="w-32 font-medium text-gray-700">
                            {title}
                          </td>
                          <td className="text-gray-800">
                            {isEditing ? (
                              typeof editedProduct?.[editKey] === "string" ||
                              typeof editedProduct?.[editKey] === "number" ? (
                                <input
                                  type="text"
                                  name={editKey}
                                  value={editedProduct?.[editKey] ?? ""}
                                  onChange={handleChange}
                                  className="bg-white text-black w-full border p-2 rounded-md"
                                />
                              ) : (
                                <span className="text-gray-500 italic">
                                  Este campo no es editable por input.
                                </span>
                              )
                            ) : (
                              value
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {/* 🔧 Sección de Medidas como tabla */}
              <div className="border-b py-4">
                <div
                  className="flex h-10 items-center justify-between cursor-pointer select-none"
                  onClick={() => setShowDimensions((prev) => !prev)}
                >
                  <span className="text-lg text-gray-500">Medidas</span>
                  <button className="text-3xl text-gray-700 transition-transform duration-300">
                    {showDimensions ? "–" : "+"}
                  </button>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out mt-2 ${
                    showDimensions ? "max-h-[1000px]" : "max-h-0"
                  }`}
                >
                  {isEditing ? (
                    <table className="w-full table-fixed text-left mt-4">
                      <tbody className="text-gray-800">
                        {(
                          [
                            "width",
                            "height",
                            "length",
                            "weight",
                          ] as (keyof Product["dimensions"])[]
                        ).map((dim) => (
                          <tr key={dim}>
                            <td className="w-32 capitalize font-medium">
                              {dim === "width"
                                ? "Ancho"
                                : dim === "height"
                                ? "Alto"
                                : dim === "length"
                                ? "Largo"
                                : "Peso"}{" "}
                              {dim === "weight" ? "(kg)" : "(cm)"}
                            </td>
                            <td>
                              <input
                                type="number"
                                name={dim}
                                value={editedProduct?.dimensions[dim] ?? ""}
                                onChange={(e) =>
                                  setEditedProduct((prev) => ({
                                    ...prev!,
                                    dimensions: {
                                      ...prev!.dimensions,
                                      [dim]: Number(e.target.value),
                                    },
                                  }))
                                }
                                className="bg-white text-black w-full border p-2 rounded-md"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full table-fixed text-left mt-4">
                      <tbody className="text-gray-800">
                        <tr>
                          <td className="w-32 font-medium">Ancho</td>
                          <td>{product.dimensions.width} cm</td>
                        </tr>
                        <tr>
                          <td className="w-32 font-medium">Alto</td>
                          <td>{product.dimensions.height} cm</td>
                        </tr>
                        <tr>
                          <td className="w-32 font-medium">Largo</td>
                          <td>{product.dimensions.length} cm</td>
                        </tr>
                        <tr>
                          <td className="w-32 font-medium">Peso</td>
                          <td>{product.dimensions.weight} kg</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
