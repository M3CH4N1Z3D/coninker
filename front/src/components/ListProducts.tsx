"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Modal from "./ui/Modal";
import { Category } from "@/interfaces/types";
import { Product } from "@/interfaces/types";
import ProductForm from "./ProductForm";

export default function ListProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        setError("Acceso denegado. No se encontró el token de autenticación.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los productos.");

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

  const handleCreateProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]); // Agregar nuevo producto a la lista
    setIsModalOpen(false); // Cerrar el modal después de guardar
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Gestión de Productos
      </h1>

      {/* Barra de búsqueda y botón */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
        >
          Agregar nuevo producto
        </button>
      </div>

      {/* Mensaje si no hay productos */}
      {isLoading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">
          No tienes productos agregados aún.
        </p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Nombre</th>
              <th className="border p-3 text-left">Precio</th>
              <th className="border p-3 text-left">Categorías</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => (
                <tr key={product.name} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <Link href={`/admin/productos/${product.name}`}>
                      <span className="text-indigo-600 hover:underline cursor-pointer">
                        {product.name}
                      </span>
                    </Link>
                  </td>
                  <td className="border p-3">${product.price.toFixed(2)}</td>
                  <td className="border p-3">
                    {product.categories.map((cat) => cat.name).join(", ")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {/* Modal para crear un nuevo producto */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Crear Nuevo Producto"
      >
        <ProductForm
          onCancel={() => setIsModalOpen(false)}
          onSave={handleCreateProduct}
        />
      </Modal>
    </div>
  );
}
