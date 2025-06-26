import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[25rem] flex items-center justify-center overflow-hidden mx-10">
      <div className="absolute inset-0 bg-neutral-900/40"></div>
      <div className="absolute inset-0 hero-bounce">
        <Image
          src="/imagenHero.jpg"
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
