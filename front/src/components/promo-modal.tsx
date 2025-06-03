"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Package } from "lucide-react";

export function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full bg-amber-500 text-white border-0 relative overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-white hover:bg-white/20"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <Package className="w-8 h-8 text-white" />
          </div>

          <h3 className="text-2xl font-bold mb-4">¡Envío gratis!</h3>
          <p className="mb-2">Hola, bienvenido a Coninker</p>
          <p className="mb-6">Tu estilo, tus cosas, tu espacio.</p>
          <p className="mb-6 font-semibold">
            Lo que sueñas nosotros lo llevamos. ¡Envío a toda Colombia! 📦
          </p>

          <Button
            className="w-full bg-white text-amber-600 hover:bg-gray-100 font-semibold"
            onClick={() => setIsOpen(false)}
          >
            ¡Comprar ahora!
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
