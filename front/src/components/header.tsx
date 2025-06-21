"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CartDropdown } from "@/components/cart-dropdown";
import { SearchBar } from "@/components/search-bar";
import categories from "@/lib/categories";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Header() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     next();
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <header className="w-full">
      {/* Top bar with social links */}
      <div className="bg-[#94804e] text-white py-2">
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
                <span className="block text-sm font-medium">
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
              <span className="text-gray-700 font-medium">|</span>

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
