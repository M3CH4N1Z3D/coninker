"use client";

import { Category, ProductFormData } from "@/interfaces/types";
import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";

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
  const [colorInput, setColorInput] = useState("#000000");
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

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category: Category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.some((cat) => cat.id === category.id)
        ? prev.categories.filter((cat) => cat.id !== category.id)
        : [...prev.categories, category],
    }));
  };

  const handleColorChange = (color: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

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
        placeholder="Ej. Mesa de centro"
        value={formData.name}
        onChange={handleInputChange}
        className="border p-2 w-full mb-3"
        required
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        placeholder="Descripción breve del producto..."
        value={formData.description}
        onChange={handleInputChange}
        className="border p-2 w-full mb-3"
        required
      />

      <label>Descripción Completa (Opcional):</label>
      <textarea
        name="fullDescription"
        placeholder="Detalles más amplios sobre el producto..."
        value={formData.fullDescription}
        onChange={handleInputChange}
        className="border p-2 w-full mb-3"
      />

      <label>Precio:</label>
      <input
        type="number"
        name="price"
        placeholder="Ej. 299"
        value={formData.price || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-3 appearance-none"
        required
      />

      <label>Stock:</label>
      <input
        type="number"
        name="stock"
        placeholder="Cantidad disponible"
        value={formData.stock || ""}
        onChange={handleInputChange}
        className="border p-2 w-full mb-3 appearance-none"
        required
      />

      <h3 className="text-lg font-bold mt-4">Dimensiones</h3>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <label>Longitud:</label>
        <input
          type="number"
          name="length"
          placeholder="Ej. 100cm"
          value={formData.length || ""}
          onChange={handleInputChange}
          className="border p-2 w-full appearance-none"
          required
        />
        <label>Ancho:</label>
        <input
          type="number"
          name="width"
          placeholder="Ej. 50cm"
          value={formData.width || ""}
          onChange={handleInputChange}
          className="border p-2 w-full appearance-none"
          required
        />
        <label>Altura:</label>
        <input
          type="number"
          name="height"
          placeholder="Ej. 75cm"
          value={formData.height || ""}
          onChange={handleInputChange}
          className="border p-2 w-full appearance-none"
          required
        />
        <label>Peso:</label>
        <input
          type="number"
          name="weight"
          placeholder="Ej. 20kg"
          value={formData.weight || ""}
          onChange={handleInputChange}
          className="border p-2 w-full appearance-none"
          required
        />
      </div>

      <label>Colores:</label>
      <div className="mb-3 flex items-center gap-2">
        <input
          type="color"
          value={colorInput}
          onChange={(e) => setColorInput(e.target.value)}
          className="w-10 h-10 border rounded-md cursor-pointer"
        />
        <button
          type="button"
          onClick={() => handleColorChange(colorInput)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          Agregar Color
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {formData.colors.map((color) => (
          <span
            key={color}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <button
              type="button"
              onClick={() => handleColorChange(color)}
              className="text-white font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div>
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
                    {cat.title}
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
                  <span>{category.title}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="felex flex-row gap-4">
        <label>Producto destacado</label>
        <input
          type="checkbox"
          checked={formData.isFeatured}
          onChange={() =>
            setFormData((prev) => ({ ...prev, isFeatured: !prev.isFeatured }))
          }
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-3">
        Guardar
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="ml-2 bg-red-600 text-white p-2 rounded"
      >
        Cancelar
      </button>
    </form>
  );
}
