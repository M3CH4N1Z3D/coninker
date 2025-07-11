"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Modal from "./ui/Modal";
import { Category } from "@/interfaces/types";
import ProductForm from "./ProductForm";

export default function ListCategories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathName = usePathname();

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Error al obtener los productos.");

      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err: any) {
      setError(err.message);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(); // 🔄 Obtiene los productos al montar el componente
  }, []);

  const handleCreateCategory = async (newcategory: Category) => {
    setCategories((prevCategories) => [newcategory, ...prevCategories]); // 🔥 Agrega el nuevo producto a la lista temporalmente
    await fetchCategories(); // 🔄 Recarga la lista desde el backend SOLO una vez
    setIsModalOpen(false); // ✅ Cierra el modal
  };

  const handleNavigate = (category: string) => {
    router.push(`${pathName}/${category}`);
  };
  const handleBack = () => {
    window.history.back();
  };

  const flattenCategories = (
    nodes: Category[],
    parentPath: string[] = []
  ): Category[] => {
    const result: Category[] = [];

    for (const node of nodes) {
      const fullTitle = [...parentPath, node.title].join(" / ");
      result.push({ ...node, title: fullTitle });

      if (Array.isArray(node.children) && node.children.length > 0) {
        result.push(
          ...flattenCategories(node.children, [...parentPath, node.title])
        );
      }
    }

    return result;
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <span
        className="text-indigo-600 hover:underline cursor-pointer"
        onClick={handleBack}
      >
        Volver
      </span>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Gestión de Categorias
      </h1>

      {/* Barra de búsqueda y botón */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
        >
          Agregar nueva categoría
        </button>
      </div>

      {/* Mensaje si no hay productos */}
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando categorias...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes categorias agregados aún.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Nombre</th>
              <th className="border p-3 text-left">Descripcion</th>
              <th className="border p-3 text-left">Destacada</th>
            </tr>
          </thead>
          <tbody>
            {flattenCategories(categories)
              .filter((category) =>
                category.title?.toLowerCase().includes(search.toLowerCase())
              )
              .map((category: Category) => (
                <tr key={category.title} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <span
                      onClick={() => handleNavigate(category.id)}
                      className="text-indigo-600 hover:underline cursor-pointer"
                    >
                      {category.title}
                    </span>
                  </td>
                  <td className="border p-3">{category.description}</td>
                  <td className="border p-3">
                    {category.showInLanding ? "SI" : "NO"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Modal para crear una nueva categoria */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nueva Categoria"
      >
        <ProductForm
          onCancel={() => setIsModalOpen(false)}
          onSave={handleCreateCategory}
        />
      </Modal>
    </div>
  );
}
