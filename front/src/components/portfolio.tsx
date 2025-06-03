import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const portfolioItems = [
  {
    title: "Identidad Corporativa",
    category: "Branding",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "E-commerce Moderno",
    category: "Desarrollo Web",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Campaña Digital",
    category: "Marketing",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "App Móvil",
    category: "UX/UI Design",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Sesión Fotográfica",
    category: "Fotografía",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Packaging Design",
    category: "Diseño Gráfico",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Nuestro Portfolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm text-orange-300 font-medium">{item.category}</p>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
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
