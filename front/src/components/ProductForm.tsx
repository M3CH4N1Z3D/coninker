"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

interface Category {
  id: string;
  name: string;
}

interface ProductFormData {
  name: string;
  description: string;
  fullDescription?: string;
  price: number;
  categories: Category[];
  stock: number;
  width: number;
  height: number;
  length: number;
  weight: number;
  colors: string[];
  isFeatured: boolean;
}

export default function ProductForm({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (data: ProductFormData) => void;
}) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    fullDescription: "",
    price: 0,
    categories: [],
    stock: 0,
    width: 0,
    height: 0,
    length: 0,
    weight: 0,
    colors: [],
    isFeatured: false,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/categories`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Error al obtener categorías");
        setCategories(data.categories);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategories();
  }, []);

  // Manejar la selección/deselección de categorías
  const handleCategoryChange = (category: Category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.some((cat) => cat.id === category.id)
        ? prev.categories.filter((cat) => cat.id !== category.id)
        : [...prev.categories, category],
    }));
  };

  // Manejar el cierre del menú desplegable al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen &&
        !document
          .getElementById("category-dropdown")
          ?.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      ...formData,
      fullDescription: formData.fullDescription || formData.description,
    };

    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${apiUrl}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      const data = await response.json();
      onSave(data);
      onCancel();
    } catch (error) {
      console.error("Error en la creación del producto:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>

      <label>Nombre:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 w-full mb-3"
        required
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="border p-2 w-full mb-3"
        required
      />

      <label>Descripción Completa (Opcional):</label>
      <textarea
        name="fullDescription"
        value={formData.fullDescription}
        onChange={(e) =>
          setFormData({ ...formData, fullDescription: e.target.value })
        }
        className="border p-2 w-full mb-3"
      />

      <label>Precio:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
        className="border p-2 w-full mb-3"
        required
      />

      {/* Menú desplegable de categorías con checkboxes */}
      <label>Categorías:</label>
      <div className="relative mb-3">
        <div
          className="border px-3 py-2 rounded-md text-left cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          id="category-dropdown"
        >
          {formData.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {formData.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="bg-indigo-600 text-white px-2 py-1 rounded-md flex items-center gap-2"
                >
                  {cat.name}
                  <button
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    className="ml-1 text-white font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          ) : (
            "Seleccionar categorías"
          )}
        </div>

        {dropdownOpen && (
          <div className="absolute bg-white border rounded-md shadow-md w-full mt-1 p-2 max-h-60 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center space-x-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={formData.categories.some(
                    (cat) => cat.id === category.id
                  )}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4">
        <label>Producto Destacado</label>

        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={() =>
            setFormData((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
          }
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded mt-3"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-red-600 text-white p-2 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
