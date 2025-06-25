import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { AiOutlineInstagram } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

export function Footer() {
  return (
    <footer className="bg-[#ebebe8] text-[var(--colorLetra)] py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Enlaces legales */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-400">
          <Link
            href="#"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            Términos y condiciones
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            Políticas de privacidad
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            Contáctanos
          </Link>
          <Link
            href="#"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            Cuidados de las piezas
          </Link>
        </div>

        {/* Logo + descripción */}
        <div className="mb-8">
          <div className="flex justify-center mb-3">
            <Image
              src="/logo.webp"
              alt="Logo Cóninker"
              width={150}
              height={150}
              priority
            />
          </div>

          <p className="text-sm text-[var(--colorLetra)] font-bold mt-1">
            Muebles manualmente coloridos.
          </p>
        </div>

        {/* Íconos sociales */}
        <div className="flex justify-center gap-6">
          <Link
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            <BsWhatsapp size={24} />
          </Link>
          <Link
            href="https://instagram.com/tu_usuario"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--hoverColor)] transition-colors"
          >
            <AiOutlineInstagram size={24} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-gray-400 text-sm">
          &copy; 2025 Cóninker. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
