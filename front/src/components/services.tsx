import { Card, CardContent } from "@/components/ui/card"
import { Palette, Monitor, Camera, Megaphone, Lightbulb, Smartphone } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Diseño Gráfico",
    description: "Identidad visual y branding que conecta con tu audiencia",
  },
  {
    icon: Monitor,
    title: "Desarrollo Web",
    description: "Sitios web modernos y funcionales que impulsan tu negocio",
  },
  {
    icon: Camera,
    title: "Fotografía",
    description: "Capturamos momentos únicos con estilo y creatividad",
  },
  {
    icon: Megaphone,
    title: "Marketing Digital",
    description: "Estrategias efectivas para hacer crecer tu presencia online",
  },
  {
    icon: Lightbulb,
    title: "Consultoría Creativa",
    description: "Ideas innovadoras para destacar en tu industria",
  },
  {
    icon: Smartphone,
    title: "Apps Móviles",
    description: "Aplicaciones intuitivas que mejoran la experiencia del usuario",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Nuestros Servicios</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
