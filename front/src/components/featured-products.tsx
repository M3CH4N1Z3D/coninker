"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import {
  ChevronLeft,
  ChevronLeftCircle,
  ChevronLeftCircleIcon,
  ChevronRightCircle,
  ChevronRightCircleIcon,
} from "lucide-react";
import { FaChevronRight } from "react-icons/fa";
import { features } from "@/lib/features";

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
    <section id="decoracion" className="bg-[var(--fondoPrincipal)]">
      <div className="container flex flex-col items-center mx-auto px-4 relative min-h-[32rem] gap-4">
        <h2 className="text-4xl font-bold text-center text-[var(--colorLetra)] mb-4 hover:cursor-pointer hover:text-[var(--hoverColor)]">
          CADA OBJETO SUMA,
          <br /> CADA DETALLE TRANSFORMA TU ESPACIO…
        </h2>

        <div className="flex bg-[var(--fondoPrincipal)] w-[80%] h-[500px] gap-6">
          {/* Imagen decorativa */}
          <div className="relative flex-1 h-full rounded-sm overflow-hidden">
            <Image
              src={current.image}
              alt="Escena decorativa"
              width={800}
              height={800}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>

          {/* Producto relacionado */}
          <Card
            key={current.product.id}
            className="flex-1 group overflow-hidden h-full p-4 border-0 hover:shadow-xl transition-all duration-300"
          >
            <CardContent className="h-full flex flex-col justify-between p-0">
              <Link href={`/producto/${current.product.id}`}>
                <div className="relative h-64 w-full">
                  <Image
                    src={current.product.images?.[0] || "/placeholder.svg"}
                    alt={current.product.name || ""}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg w-full h-full"
                  />
                </div>
              </Link>
              <div className="p-6 bg-[var(--fondoPrincipal)] flex flex-col justify-between h-full">
                <div className="flex flex-col items-center mb-2">
                  <Link href={`/producto/${current.product.id}`}>
                    <h3 className="text-lg font-bold text-[var(--colorLetra)] hover:text-[var(--hoverColor)] transition-colors">
                      {current.product.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-light text-[var(--colorLetra)]">
                    ${current.product.price.toLocaleString("es-CO")}
                  </p>
                </div>
                <Link href={`/producto/${current.product.id}`}>
                  <Button className="border-1 border-[var(--colorLetra)] w-full mt-4 bg-[#d4d9d7] hover:bg-[var(--hoverColor)] text-[var(--colorLetra)] hover:text-[#d4d9d7]">
                    VER PRODUCTO
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botones navegación */}
        <div className="absolute left-20 transform -translate-y-[-21.7rem] z-20">
          <Button
            variant="ghost"
            onClick={prev}
            className="text-xl px-2 text-gray-400 hover:text-[var(--hoverColor)] hover:cursor-pointer"
          >
            <ChevronLeftCircleIcon size={32} />
          </Button>
        </div>
        <div className="absolute right-20 transform -translate-y-[-21.7rem] z-20">
          <Button
            variant="ghost"
            onClick={next}
            className="text-xl px-2 text-gray-400 hover:text-[var(--hoverColor)] hover:cursor-pointer"
          >
            <ChevronRightCircleIcon size={32} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 bg-[var(--colorLetraSecundaria)] p-8 md:grid-cols-4 gap-8 text-center m-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex flex-col items-center text-center p-4 w-64 gap-4"
          >
            <span className="h-16 flex items-center justify-center text-4xl mb-4 bg-transparent">
              {feature.icon}
            </span>
            <h3 className="text-lg font-semibold w-full">{feature.title}</h3>
            <p className="text-sm leading-relaxed w-full">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
