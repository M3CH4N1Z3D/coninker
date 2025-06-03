import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import categories from "@/lib/categories";

export function Categories() {
  const normalizeCategory = (category: string) => {
    return category
      .toLowerCase()
      .normalize("NFD") // Descompone caracteres especiales
      .replace(/[\u0300-\u036f]/g, "") // Elimina tildes
      .replace(/\s+/g, "-"); // Convierte espacios en guiones
  };

  return (
    <section id="mobiliario" className="py-20 bg-[#FBDB93]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Encuentra todo lo que necesitas para tu hogar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              href={`/${normalizeCategory(category.title).toLowerCase()}`}
              key={index}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-gray-200">
                        {category.description}
                      </p>
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
