import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Contacta con nosotros
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              ¿Buscas el mueble perfecto?
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Estamos aquí para ayudarte a encontrar las piezas ideales para tu
              hogar. Contáctanos y descubre nuestra amplia gama de productos y
              servicios personalizados.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">info@coninker.co</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Showroom</p>
                  <p className="text-gray-600">Ciudad de México, México</p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">
                Envíanos un mensaje
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Nombre" />
                <Input placeholder="Email" type="email" />
              </div>
              <Input placeholder="Asunto" />
              <Textarea placeholder="¿En qué podemos ayudarte?" rows={5} />
              <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3">
                Enviar Mensaje
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
