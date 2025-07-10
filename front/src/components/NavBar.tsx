"use client";
import { useCategoryStore } from "@/stores/categoryStore";
import navOptions from "@/lib/navOptions";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar() {
  const { categories, fetchCategories, isLoading } = useCategoryStore();
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
    null
  );
  const [hoveredSubId, setHoveredSubId] = useState<string | null>(null);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories]);

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center space-x-8 py-2 relative">
        {isLoading ? (
          <p className="text-sm text-gray-500">Cargando...</p>
        ) : (
          <>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="relative"
                onMouseEnter={() => setHoveredCategoryId(cat.id)}
                onMouseLeave={() => {
                  setHoveredCategoryId(null);
                  setHoveredSubId(null);
                }}
              >
                <Link
                  href={`/${normalize(cat.title)}`}
                  className="text-[var(--colorLetra)] hover:text-[var(--hoverColor)] transition-colors font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[var(--hoverColor)] after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {cat.title}
                </Link>

                <AnimatePresence>
                  {hoveredCategoryId === cat.id &&
                    Array.isArray(cat.children) &&
                    cat.children.length > 0 && (
                      <motion.div
                        key="submenu"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md z-50"
                      >
                        {cat.children.map((sub) => (
                          <div
                            key={sub.id}
                            className="relative"
                            onMouseEnter={() => setHoveredSubId(sub.id)}
                            onMouseLeave={() => setHoveredSubId(null)}
                          >
                            <Link
                              href={`/${normalize(sub.title)}`}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                            >
                              {sub.title}
                            </Link>

                            <AnimatePresence>
                              {hoveredSubId === sub.id &&
                                Array.isArray(sub.children) &&
                                sub.children.length > 0 && (
                                  <motion.div
                                    key="subsubmenu"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50"
                                  >
                                    {sub.children.map((subsub) => (
                                      <Link
                                        key={subsub.id}
                                        href={`/${normalize(subsub.title)}`}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                                      >
                                        {subsub.title}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}

            {navOptions.map((option) => (
              <Link
                key={option.title}
                href={`/${normalize(option.title)}`}
                className="relative text-[var(--colorLetra)] hover:text-[var(--hoverColor)] transition-colors font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:scale-x-0 after:bg-[var(--hoverColor)] after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {option.title}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
