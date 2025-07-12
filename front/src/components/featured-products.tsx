"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/interfaces/types";
import { features } from "@/lib/features";

export function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/products`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        const featuredProducts = data.products
          .filter((p: Product) => p.isFeatured)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);
        setFeatured(featuredProducts);
      } catch (err) {
        console.error("Error cargando productos destacados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, [apiUrl]);

  // if (isLoading || featured.length === 0) return null;

  return (
    <section id="decoracion" className="py-20 bg-[var(--fondoPrincipal)]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-[var(--colorLetra)] mb-16 hover:cursor-pointer hover:text-[var(--fondoSecundario)]">
          CADA OBJETO SUMA,
          <br /> CADA DETALLE TRANSFORMA TU ESPACIO…
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product: Product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <Link href={`/producto/${product.id}`}>
                  <div className="relative h-64 w-full">
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name || ""}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-6 bg-[#d4d9d7]">
                  <div className="flex flex-col justify-center items-center mb-2">
                    <div>
                      <Link href={`/producto/${product.id}`}>
                        <h3 className="text-lg font-bold text-[var(--colorLetra)] hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <div>
                      <p className="text-lg font-light text-[var(--colorLetra)]">
                        ${product.price.toLocaleString("es-CO")}
                      </p>
                    </div>
                  </div>
                  <Link href={`/producto/${product.id}`}>
                    <Button className="border-1 border-[var(--colorLetra)] w-full mt-4 bg-[#d4d9d7] hover:bg-[var(--hoverColor)] text-[var(--colorLetra)] hover:text-[#d4d9d7]">
                      VER PRODUCTO
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center bg-[#d4d9d7] p-10 shadow-md">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 text-[var(--colorLetra)]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
