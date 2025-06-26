"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { Product } from "@/interfaces/types";
import { motion, AnimatePresence } from "framer-motion";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products`);
        if (!response.ok) throw new Error("Error al obtener los productos");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim().length > 0) {
      const normalize = (text: string) =>
        text
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

      const filtered = products.filter(
        (product) =>
          normalize(product.name).includes(normalize(query)) ||
          normalize(product.description || "").includes(normalize(query)) ||
          product.categories.some((category) =>
            normalize(category.title).includes(normalize(query))
          )
      );

      setSuggestions(filtered.slice(0, 6));
      setIsOpen(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          window.location.href = `/producto/${suggestions[selectedIndex].id}`;
        } else if (query.trim()) {
          window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="absolute w-screen">
      <div className="w-screen relative px-4 mx-auto">
        <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.trim() && setIsOpen(true)}
          className="bg-[var(--fondoPrincipal)] pl-10 pr-10 py-2 w-full border-gray-300 focus:border-[var(--fondoSecundario)] focus:ring-amber-500"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-[var(--colorLetra)] hover:text-gray-600"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            key="suggestions"
            className="relative mx-10 max-w-6xl top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="py-2">
              {suggestions.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/producto/${product.id}`}
                  onClick={handleSuggestionClick}
                  className={`flex items-center px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? "bg-amber-50" : ""
                  }`}
                >
                  <div className="relative w-12 h-12 bg-gray-100 rounded mr-3 flex-shrink-0">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--colorLetra)] truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-[var(--colorLetra)]">
                      {product.categories
                        .map((category) => category.title)
                        .join(", ") || ""}
                    </p>
                    <p className="text-sm font-semibold text-[var(--fondoSecundario)]">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-100 px-4 py-3">
              <Link
                href={`/buscar?q=${encodeURIComponent(query)}`}
                className="text-sm text-[var(--fondoSecundario)] hover:text-amber-700 font-medium"
                onClick={() => setIsOpen(false)}
              >
                Ver todos los resultados para "{query}"
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && query.trim() && suggestions.length === 0 && (
        <div className="relative mx-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <div className="px-4 py-6 text-center text-gray-500">
            <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No se encontraron productos</p>
            <p className="text-xs text-gray-400 mt-1">
              Intenta con otros términos de búsqueda
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
