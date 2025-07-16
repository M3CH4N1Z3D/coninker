"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AppImageConfig } from "@/interfaces/types";

export function Hero() {
  const [heroImage, setHeroImage] = useState<AppImageConfig[] | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/heroimages`);
        if (!response.ok)
          throw new Error("Error al obtener la imagen del hero");

        const data = await response.json();
        setHeroImage(data.images);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroImage();
  }, []);
  return (
    <section className="relative h-[25rem] w-screen flex items-center justify-center overflow-hidden mx-auto transform translate-x-[1rem] translate-y-[1rem]">
      <div className="absolute inset-0 bg-neutral-900/40"></div>
      <div className="absolute inset-0 hero-bounce">
        <Image
          src={heroImage?.[0]?.image ?? "/hero/imagenHero.png"}
          alt="Interior de hogar moderno"
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-0 z-1 text-right text-white px-8 pb-10 max-w-4xl">
        <p className="text-2xl md:text-3xl mb-8 font-bold">
          Atmosferas que inspiran, muebles
          <br /> que conectan con tu escencia.
        </p>
      </div>
    </section>
  );
}
