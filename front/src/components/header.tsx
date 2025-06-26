"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CartDropdown } from "@/components/cart-dropdown";
import { SearchBar } from "@/components/search-bar";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import navOptions from "@/lib/categories";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
} from "framer-motion";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [showSearch, setShowSearch] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-100, 0, 100], [60, 0, -60]);

  useEffect(() => {
    if (headerRef.current) {
      const { height } = headerRef.current.getBoundingClientRect();
      setHeaderHeight(height);
    }
  }, []);

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
    <>
      <header className="sticky top-0 z-100">
        <div className="bg-[var(--fondoSecundario)] text-white py-2">
          <div className="container mx-auto px-4 flex justify-center items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={prev}
                className="text-white hover:text-amber-400 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="relative w-[20rem] h-[1.3rem] overflow-hidden text-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={index}
                    className="flex"
                    initial={{ x: direction === "right" ? "100%" : "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: direction === "right" ? "-100%" : "100%" }}
                    transition={{
                      type: "tween",
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                  >
                    <span className="block text-sm font-light w-full">
                      {messages[index]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={next}
                className="text-white hover:text-amber-400 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="bg-[var(--fondoPrincipal)] shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-8">
            <div className="flex items-center mx-auto">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.webp"
                  alt="Logo"
                  width={100}
                  height={100}
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
      {showSearch && (
        <motion.div
          key="searchbar"
          className="fixed right-0 w-screen z-50"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <SearchBar />
        </motion.div>
      )}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowSearch(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
