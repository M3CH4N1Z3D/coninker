"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces/types";

export default function CategoryPage() {
  const params = useParams();
  const categoryParam = params.category?.toString() || "default-category";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/categories/${categoryParam}`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products);
          setCategoryName(data.category?.title || categoryParam);
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryParam]);

  return (
    <section className="py-20 bg-[#FBDB93]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          {categoryName}
        </h2>

        {loading ? (
          <p className="text-center">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No hay productos en esta categoría.</p>
        ) : (
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
        )}
      </div>
    </section>
  );
}
