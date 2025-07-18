"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import { Category } from "@/interfaces/types";

export function Categories() {
  const { categories, fetchCategories, isLoading } = useCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const normalizeCategory = (category: string) => {
    return category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  // 🔁 Función recursiva para extraer todas las categorías con showInLanding === true
  const extractLandingCategories = (nodes: Category[]): Category[] => {
    const result: Category[] = [];

    const traverse = (category: Category) => {
      if (category.showInLanding) {
        result.push(category);
      }
      if (Array.isArray(category.children)) {
        category.children.forEach(traverse);
      }
    };

    nodes.forEach(traverse);
    return result;
  };

  const landingCategories = extractLandingCategories(categories);

  return (
    <section id="mobiliario" className="bg-[var(--fondoPrincipal)]">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <p className="text-sm text-gray-500">Cargando categorías...</p>
        ) : landingCategories.length === 0 ? (
          <p className="text-sm text-gray-500">No hay categorías destacadas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {landingCategories.map((category) => (
              <Link
                href={`/${normalizeCategory(category.title)}`}
                key={category.id}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-64 w-full group rounded overflow-hidden transition-transform duration-[10000ms] ease-in-out group-hover:scale-150">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black opacity-50 z-10" />

                      <div className="absolute inset-0 flex items-center justify-center z-11">
                        <h3 className="text-xl font-bold tracking-wide text-[var(--fondoPrincipal)] bg-transparent px-6 py-3 rounded-md uppercase text-center leading-snug">
                          {category.title.split(" ").length === 2 ? (
                            <>
                              {category.title.split(" ")[0]}
                              <br />
                              {category.title.split(" ")[1]}
                            </>
                          ) : (
                            category.title
                          )}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
