import Link from "next/link";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              con<span className="text-amber-500">inker</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Muebles y decoración de calidad para transformar tu casa en un
              hogar con personalidad y estilo.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Mobiliario</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Mesas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Sillas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Sofás
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Estanterías
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href={"#about"}
                  className="hover:text-amber-400 transition-colors"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Showroom
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-amber-400 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Instagram size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Twitter size={24} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Coninker. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
