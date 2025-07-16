"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function FeaturedProducts() {
  const [scenes, setScenes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchScenes = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/images/object-images`);
        const { images } = await res.json();

        const filtered = images.filter((item: any) => item.product !== null);
        setScenes(filtered);
      } catch (err) {
        console.error("Error al cargar escenas de objetos:", err);
      }
    };

    fetchScenes();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % scenes.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + scenes.length) % scenes.length);
  };

  const current = scenes[currentIndex];

  if (!current) return null;

  return (
    <section id="decoracion" className="py-20 bg-[var(--fondoPrincipal)]">
      <div className="container mx-auto px-4 relative min-h-[32rem]">
        <h2 className="text-4xl font-bold text-center text-[var(--colorLetra)] mb-16 hover:cursor-pointer hover:text-[var(--fondoSecundario)]">
          CADA OBJETO SUMA,
          <br /> CADA DETALLE TRANSFORMA TU ESPACIO…
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Imagen decorativa */}
          <div className="relative w-full lg:w-2/3 h-96 rounded-xl overflow-hidden shadow-md">
            <Image
              src={current.image}
              alt="Escena decorativa"
              fill
              className="object-cover"
            />
          </div>

          {/* Producto relacionado */}
          <div className="w-full lg:w-1/3 bg-[#d4d9d7] rounded-xl p-6 text-center shadow-md">
            <h3 className="text-2xl font-bold text-[var(--colorLetra)] mb-2">
              {current.product.name}
            </h3>
            <p className="text-lg text-[var(--colorLetra)] mb-4">
              ${current.product.price.toLocaleString("es-CO")}
            </p>
            <Link href={`/producto/${current.product.id}`}>
              <Button className="bg-[var(--colorLetra)] text-white hover:bg-[var(--hoverColor)]">
                VER PRODUCTO
              </Button>
            </Link>
          </div>
        </div>

        {/* Botones navegación */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <Button variant="ghost" onClick={prev} className="text-xl px-2">
            ◀
          </Button>
        </div>
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <Button variant="ghost" onClick={next} className="text-xl px-2">
            ▶
          </Button>
        </div>
      </div>
    </section>
  );
}
