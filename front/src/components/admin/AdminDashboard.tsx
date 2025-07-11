"use client";

import Link from "next/link";

export default function AdminDashboard() {
  const sections = [
    { name: "Productos", route: "/admin/productos", icon: "📦" },
    { name: "Imágenes", route: "/admin/imagenes", icon: "🖼️" },
    { name: "Categorías", route: "/admin/categorias", icon: "📂" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Panel de configuración
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
