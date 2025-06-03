import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900/40"></div>
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Interior de hogar moderno"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
          ¡Bienvenidos!
        </h1>
        <p className="text-2xl md:text-3xl mb-8 font-light">
          Tu estilo, tu espacio, tu{" "}
          <span className="text-amber-300">hogar</span>
        </p>
        <Button
          size="lg"
          className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-8 py-4 rounded-none font-medium"
        >
          Ver Todo
        </Button>
      </div>
    </section>
  );
}
