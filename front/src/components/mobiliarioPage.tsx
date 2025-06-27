"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Grid3x3, Image as ImageIcon, List } from "lucide-react";
import { Product } from "@/interfaces/types";
import { Category } from "@/interfaces/types";
import PriceRangeSlider from "./ui/priceRangeSlider";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export default function MobiliarioPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("name-asc");
  const [viewMode, setViewMode] = useState<"grid" | "image" | "list">("grid");
  const [minPrecio, setMinPrecio] = useState(100);
  const [maxPrecio, setMaxPrecio] = useState(1000000);

  useEffect(() => {
    const fetchData = async () => {
      const resProducts = await fetch(`${apiUrl}/api/products`);
      const resCategories = await fetch(`${apiUrl}/api/categories`);

      const productData = await resProducts.json();
      const categoryData = await resCategories.json();

      setProducts(productData.products || []);
      setCategories(categoryData.categories || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filtrado por precio
    filtered = filtered.filter(
      (p) => p.price >= minPrecio && p.price <= maxPrecio
    );

    // Filtrado por categoría
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) =>
        p.categories?.some((c) => selectedCategories.includes(c.title))
      );
    }

    // Ordenamiento
    switch (sortOption) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "date-asc":
        filtered.sort(
          (a, b) =>
            new Date(a.updatedAt ?? "").getTime() -
            new Date(b.updatedAt ?? "").getTime()
        );
        break;

      case "date-desc":
        filtered.sort(
          (a, b) =>
            new Date(b.updatedAt ?? "").getTime() -
            new Date(a.updatedAt ?? "").getTime()
        );
        break;
    }

    setFilteredProducts(filtered);
    console.log(minPrecio);
    console.log(maxPrecio);
  }, [products, selectedCategories, sortOption, minPrecio, maxPrecio]);

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Encabezado de controles */}
      <section className="flex flex-wrap justify-between items-center gap-4">
        {/* Selector de vista */}
        <div className="flex space-x-2">
          <button onClick={() => setViewMode("grid")} title="Vista de cards">
            <Grid3x3 size={20} />
          </button>
          <button
            onClick={() => setViewMode("image")}
            title="Vista de imágenes"
          >
            <ImageIcon size={20} />
          </button>
          <button onClick={() => setViewMode("list")} title="Vista de listado">
            <List size={20} />
          </button>
        </div>

        {/* Contador */}
        <div className="text-sm text-gray-600">
          {filteredProducts.length} productos disponibles
        </div>

        {/* Menú de ordenamiento */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="text-sm border rounded px-3 py-1"
        >
          <option value="name-asc">Alfabéticamente A-Z</option>
          <option value="name-desc">Alfabéticamente Z-A</option>
          <option value="price-asc">Precio (menor-mayor)</option>
          <option value="price-desc">Precio (mayor-menor)</option>
          <option value="date-asc">Fecha antiguo a reciente</option>
          <option value="date-desc">Fecha reciente a antiguo</option>
        </select>
      </section>

      {/* Cuerpo principal */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtro lateral izquierdo */}
        <aside className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2">Filtrar por precio</h4>
            <PriceRangeSlider
              leftIcon={<>-</>}
              rightIcon={<>+</>}
              startingValue={100}
              defaultValue={500000}
              maxValue={1000000}
              isStepped
              stepSize={10000}
              onChange={(value) => setMinPrecio(Math.round(value))}
            />

            <PriceRangeSlider
              leftIcon={<>-</>}
              rightIcon={<>+</>}
              startingValue={100}
              defaultValue={500000}
              maxValue={1000000}
              isStepped
              stepSize={10000}
              onChange={(value) => setMinPrecio(Math.round(value))}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Categorías</h4>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <label className="inline-flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.title)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(cat.title)
                            ? prev.filter((c) => c !== cat.title)
                            : [...prev, cat.title]
                        )
                      }
                    />
                    <span>{cat.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Productos */}
        <main className="lg:col-span-2 space-y-4">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500">
              No hay productos que coincidan con tus filtros.
            </p>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3"
                  : viewMode === "image"
                  ? "grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`border rounded p-4 ${
                    viewMode === "list" ? "flex items-center space-x-4" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-24 h-24" : "aspect-square"
                    } w-full rounded overflow-hidden bg-gray-100 max-w-[160px]`}
                  >
                    {product.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                    <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </section>
    </div>
  );
}
