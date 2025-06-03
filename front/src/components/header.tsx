import Link from "next/link";
import { User, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDropdown } from "@/components/cart-dropdown";
import { SearchBar } from "@/components/search-bar";
import categories from "@/lib/categories";

export function Header() {
  return (
    <header className="w-full">
      {/* Top bar with social links */}
      <div className="bg-neutral-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-amber-400 transition-colors">
              <Facebook size={16} />
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              <Instagram size={16} />
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              <Twitter size={16} />
            </Link>
            <Link href="#" className="hover:text-amber-400 transition-colors">
              <Linkedin size={16} />
            </Link>
          </div>
          <div className="text-sm">
            <span>Muebles y decoración para tu hogar</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[var(--backgroung)] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center flex-1">
            <SearchBar />
          </div>

          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 flex-shrink-0"
          >
            cón<span className="text-[#8A2D3B]">inker</span>
          </Link>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <CartDropdown />
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 py-4">
              {categories.map((category) => (
                <Link
                  key={category.title}
                  href={`/${category.title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")}`}
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  {category.title}
                </Link>
              ))}

              {/* Mantener "Contacto" en la barra */}
              <Link
                href={`/#contacto`}
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                Contacto
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
