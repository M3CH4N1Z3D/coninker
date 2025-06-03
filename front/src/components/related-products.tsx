import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Productos relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/producto/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images[0] || "/placeholder.svg?height=400&width=400"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link href={`/producto/${product.id}`}>
                    <div className="mb-2">
                      <p className="text-sm text-amber-600 font-medium">{product.category}</p>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
                    <Button size="sm" variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
