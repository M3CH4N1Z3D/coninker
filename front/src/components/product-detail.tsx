"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"
import { Minus, Plus, Heart, Share2, Truck, RotateCcw, Check } from "lucide-react"

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido a tu carrito`,
    })
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative aspect-square overflow-hidden bg-gray-100 ${
                    selectedImage === index ? "ring-2 ring-amber-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image src={image || "/placeholder.svg?height=150&width=150"} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-600 font-medium">{product.category}</p>
              <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm">({product.reviewCount} reseñas)</span>
              </div>
            </div>

            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

            <div className="prose prose-gray max-w-none">
              <p>{product.description}</p>
            </div>

            {/* Dimensions */}
            <div className="border-t border-b py-4">
              <h3 className="font-semibold mb-2">Dimensiones:</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Ancho</p>
                  <p className="font-medium">{product.dimensions.width} cm</p>
                </div>
                <div>
                  <p className="text-gray-500">Alto</p>
                  <p className="font-medium">{product.dimensions.height} cm</p>
                </div>
                <div>
                  <p className="text-gray-500">Profundidad</p>
                  <p className="font-medium">{product.dimensions.depth} cm</p>
                </div>
              </div>
            </div>

            {/* Color options if available */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Color:</h3>
                <div className="flex gap-2">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border"
                      style={{ backgroundColor: color }}
                      aria-label={`Color ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add to cart section */}
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
                  <Button variant="ghost" size="icon" className="rounded-none" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="ml-4 text-sm text-gray-500">
                  {product.stock > 10
                    ? "En stock"
                    : product.stock > 0
                      ? `Solo ${product.stock} disponibles`
                      : "Agotado"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  Añadir al carrito
                </Button>
                <Button variant="outline" size="icon" className="rounded-md">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-md">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product benefits */}
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
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent px-8 py-3"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent px-8 py-3"
              >
                Especificaciones
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-600 data-[state=active]:bg-transparent px-8 py-3"
              >
                Reseñas ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose prose-gray max-w-none">
                <p>{product.fullDescription}</p>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Detalles del producto</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">{spec.name}</span>
                        <span className="font-medium">{spec.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Materiales</h3>
                  <ul className="space-y-2">
                    {product.materials.map((material, index) => (
                      <li key={index} className="flex justify-between py-2 border-b">
                        <span className="text-gray-500">{material.part}</span>
                        <span className="font-medium">{material.material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
