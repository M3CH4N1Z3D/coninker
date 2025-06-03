import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Mesas",
    image: "/placeholder.svg?height=400&width=600",
    description: "Mesas de comedor, centro y auxiliares para cada espacio",
  },
  {
    title: "Sillas",
    image: "/placeholder.svg?height=400&width=600",
    description: "Sillas ergonómicas y de diseño para tu hogar u oficina",
  },
  {
    title: "Sofás",
    image: "/placeholder.svg?height=400&width=600",
    description: "Confort y estilo para tu sala de estar",
  },
  {
    title: "Estanterías",
    image: "/placeholder.svg?height=400&width=600",
    description: "Soluciones de almacenamiento funcionales y decorativas",
  },
  {
    title: "Iluminación",
    image: "/placeholder.svg?height=400&width=600",
    description: "Lámparas y accesorios para crear la atmósfera perfecta",
  },
  {
    title: "Decoración",
    image: "/placeholder.svg?height=400&width=600",
    description: "Complementos que dan vida y personalidad a tu hogar",
  },
];

export function Categories() {
  return (
    <section id="mobiliario" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Nuestras Categorías
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link href={`#${category.title.toLowerCase()}`} key={index}>
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
