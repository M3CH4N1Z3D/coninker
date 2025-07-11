"use client";

import Link from "next/link";

export default function ImageDashboard() {
  const sections = [
    {
      name: "Imágenes de Productos",
      route: "/admin/imagenes/productos",
      icon: "📦",
    },
    { name: "Imágenes de la App", route: "/admin/imagenes/App", icon: "🖼️" },
    {
      name: "Imagenes de Categorías",
      route: "/admin/imagenes/categorias",
      icon: "📂",
    },
  ];

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <span
        className="text-indigo-600 hover:underline cursor-pointer"
        onClick={handleBack}
      >
        Volver
      </span>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Panel de configuración Imágenes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {sections.map(({ name, route, icon }) => (
          <Link key={name} href={route} className="group">
            <div className="p-6 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-center cursor-pointer hover:bg-indigo-600 hover:text-white">
              <span className="text-4xl">{icon}</span>
              <h2 className="text-xl font-semibold mt-3">{name}</h2>
              <p className="text-sm text-gray-500 group-hover:text-white mt-1">
                Configurar {name.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
