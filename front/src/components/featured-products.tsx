import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAllProducts } from "@/lib/products";

export function FeaturedProducts() {
  const products = getAllProducts();

  // 🔹 Filtrar solo productos destacados
  const featuredProducts = products.filter((product) => product.featured);

  // 🔹 Obtener 3 productos aleatorios
  const randomFeatured = featuredProducts
    .sort(() => Math.random() - 0.5) // Mezcla los productos aleatoriamente
    .slice(0, 3); // Selecciona solo los primeros 3

  return (
    <section id="decoracion" className="py-20 bg-[#FBDB93]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Productos Destacados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {randomFeatured.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/producto/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-sm text-amber-600 font-medium">
                        {product?.categories.map((cat) => cat.name).join(", ")}
                      </p>
                      <Link href={`/producto/${product.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-lg font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <Link href={`/producto/${product.id}`}>
                    <Button className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white">
                      Ver detalles
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
