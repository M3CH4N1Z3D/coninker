"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import categories from "@/lib/navOptions";
import { useEffect, useState } from "react";
import { Category } from "@/interfaces/types";

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al obtener las categorias.");

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err: any) {
      setError(err.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // 🔄 Obtiene los productos al montar el componente
  }, []);

  const normalizeCategory = (category: string) => {
    return category
      .toLowerCase()
      .normalize("NFD") // Descompone caracteres especiales
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .replace(/\s+/g, "-"); // Convierte espacios en guiones
  };

  return (
    <section id="mobiliario" className="py-20 bg-[var(--fondoPrincipal)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              href={`/${normalizeCategory(category.title).toLowerCase()}`}
              key={index}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full group rounded overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-2xl font-semibold tracking-wide text-[#828d20] bg-[#d8d9c7] px-6 py-3 rounded-md backdrop-blur-sm border border-white/30 shadow-md uppercase">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
