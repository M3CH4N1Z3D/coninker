"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartDropdown } from "@/components/cart-dropdown";
import { SearchBar } from "@/components/search-bar";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import navOptions from "@/lib/categories";

export function Header() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [showSearch, setShowSearch] = useState(false);

  const next = () => {
    setDirection("right");
    setIndex((prev) => (prev + 1) % messages.length);
  };
  const prev = () => {
    setDirection("left");
    setIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const messages = ["Envíos a todo Colombia", "Producto 100% Colombiano"];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <header className="w-full">
      {/* Top bar with social links */}
      <div className="bg-[var(--fondoSecundario)] text-white py-2">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="text-white hover:text-amber-400 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="relative w-[220px] h-[20px] overflow-hidden text-center">
              <div
                key={index}
                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                  direction === "right"
                    ? "translate-x-0 animate-slideInFromRight"
                    : "translate-x-0 animate-slideInFromLeft"
                }`}
              >
                <span className="block text-sm font-ligth">
                  {messages[index]}
                </span>
              </div>
            </div>

            <button
              onClick={next}
              className="text-white hover:text-amber-400 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <style jsx>{`
          @keyframes slideInFromRight {
            0% {
              transform: translateX(100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0%);
              opacity: 1;
            }
          }
          @keyframes slideInFromLeft {
            0% {
              transform: translateX(-100%);
              opacity: 0;
            }
            100% {
              transform: translateX(0%);
              opacity: 1;
            }
          }

          .animate-slideInFromRight {
            animation: slideInFromRight 0.4s forwards;
          }

          .animate-slideInFromLeft {
            animation: slideInFromLeft 0.4s forwards;
          }
        `}</style>
      </div>

      {/* Main header */}
      <div className="bg-[var(--fondoPrincipal)] shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
          <div className="flex items-center mx-auto">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={200}
                height={200}
                priority
              />
            </Link>
          </div>
          <div className="flex flex-row">
            <div className="relative">
              <Button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-[var(--colorLetra)] hover:text-[var(--hoverColor)] transition"
              >
                <Search size={22} />
              </Button>
              {showSearch && (
                <div className="absolute right-0 mt-2 w-64 z-50">
                  <SearchBar />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4 flex-shrink-0 text-[var(--colorLetra)] hover:text-[var(--hoverColor)]">
              <CartDropdown />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-8 py-4">
              {navOptions.map((option) => (
                <Link
                  key={option.title}
                  href={`/${option.title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-")}`}
                  className="text-[var(--colorLetra)] hover:text-[var(--hoverColor)] transition-colors font-medium"
                >
                  {option.title}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
