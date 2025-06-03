"use client";
import { useParams } from "next/navigation";
import { getAllProducts } from "@/lib/products";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const params = useParams();
  const category = params.category
    ? params.category.toString()
    : "default-category";
  const categoryMap: Record<string, string> = {
    estanterias: "Estanterías",
    mesas: "Mesas",
    sillas: "Sillas",
    sofas: "Sofás",
    iluminacion: "Iluminación",
    decoracion: "Decoración",
  };

  const displayName = categoryMap[category] || category;

  const normalizeCategory = (category: string) => {
    return category
      .toLowerCase()
      .normalize("NFD") // Descompone caracteres especiales
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .replace(/\s+/g, "-"); // Convierte espacios en guiones
  };

  // 🔹 Filtrar productos por categoría
  const products = getAllProducts().filter(
    (product) => normalizeCategory(product.category) === params.category
  );

  return (
    <section className="py-20 bg-[#FBDB93]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          {displayName}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/producto/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
