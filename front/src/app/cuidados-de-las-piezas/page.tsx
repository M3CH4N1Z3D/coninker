// frontend/src/app/cuidados-de-las-piezas/page.tsx

import React from 'react';
import Image from 'next/image';

const materiales = [
  { name: 'PINO', src: '/materiales/PINO.jpg', alt: 'Mobiliario de madera de pino' },
  { name: 'MDF', src: '/materiales/MDF.jpg', alt: 'Mobiliario fabricado con MDF' },
  { name: 'LÁMINA METÁLICA', src: '/materiales/LAMINA.jpg', alt: 'Detalle de lámina metálica en mueble' },
  { name: 'ESTRUCTURA METÁLICA', src: '/materiales/ESTRUCTURAS.jpg', alt: 'Estructura metálica de un mueble' },
  { name: 'TAPICERÍA', src: '/materiales/TAPICERIA.jpg', alt: 'Textura de tela de tapicería' },
];

const CuidadosDeLasPiezasPage = () => {
  return (
    <div className="font-['Montserrat'] text-[#444444]">
      {/* Sección Superior: Nuestros Materiales */}
      <section className="w-full bg-[#FAFAFA] py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#7A7A7A] text-center mb-12">
            NUESTROS MATERIALES
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {materiales.map((material) => (
              <div key={material.name} className="flex flex-col items-center gap-4">
                <div className="w-full h-40 relative rounded-md overflow-hidden">
                  <Image
                    src={material.src}
                    alt={material.alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                </div>
                <h3 className="font-medium text-gray-600">{material.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Principal: Guía de Limpieza */}
      <section className="max-w-6xl mx-auto py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-center mb-4 text-[#7A7A7A]">
              Guía de Limpieza y Cuidado.
            </h2>
            <p className="text-center font-light mb-8 text-base">
              Cada pieza está hecha con materiales que tienen historia: pino, MDF, metal, lámina de acero y telas seleccionadas con detalle.
            </p>
            <p className="text-center font-light mb-8 text-base">
              Lo hecho a mano deja una huella única. Ninguna pieza es igual a otra, y eso nos encanta. Las vetas, texturas y variaciones propias de cada material son parte de su esencia y lo que las hace especiales.
            </p>
            <p className="text-center font-light mb-16 text-base">
              Para conservar en óptimas condiciones tus piezas y prolongar su vida útil, es importante seguir estas recomendaciones específicas según el material de fabricación:
            </p>
        </div>

        {/* 1. Contenedor principal para las guías con video. */}
        <div className="space-y-16">

          {/* Guía 1: Estructura Metálica */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <video src="/guia-cuidado-de-las-piezas/VIDEO_1.mp4" controls muted loop playsInline className="w-full aspect-video bg-black rounded-md object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-[#7A7A7A] mb-4">
                Estructura Metálica con Acabado en Pintura Electroestática
              </h3>
              <div className="font-light text-justify space-y-4">
                <p>
                  Estas estructuras están diseñadas exclusivamente para uso en interiores. No deben exponerse a la intemperie, humedad excesiva o ambientes salinos, ya que esto puede deteriorar el acabado y provocar corrosión.
                </p>
                <p>
                  <span className="font-medium">Limpieza:</span> Usa un paño suave, seco o ligeramente humedecido con agua limpia. Para manchas más difíciles, mezcla agua con un jabón neutro. Evita: productos abrasivos, disolventes, alcohol, cloro o estropajos metálicos, ya que pueden dañar la pintura.
                </p>
              </div>
            </div>
          </div>

          {/* Guía 2: Madera y MDF */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 flex-shrink-0">
                <video src="/guia-cuidado-de-las-piezas/VIDEO_2.mp4" controls muted loop playsInline className="w-full aspect-video bg-black rounded-md object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-[#7A7A7A] mb-4">
                Madera de Pino Macizo Y MDF con Acabado en Poliuretano
              </h3>
              <div className="font-light text-justify space-y-4">
                <p>
                  Ambos materiales tienen una terminación protectora, pero es clave mantenerlos secos y bien cuidados.
                </p>
                <p>
                  <span className="font-medium">Limpieza regular:</span> Usa un paño seco o levemente húmedo para retirar el polvo.<br />
                  <span className="font-medium">Precauciones:</span> No coloques objetos calientes directamente sobre la superficie. Evita el contacto prolongado con agua u otros líquidos. No arrastres objetos pesados sobre la madera para evitar rayaduras. Mantenlos lejos de la luz solar directa para evitar cambios de color.
                </p>
              </div>
            </div>
          </div>

          {/* Guía 3: Tapicería */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 flex-shrink-0">
                <video src="/guia-cuidado-de-las-piezas/VIDEO_3.mp4" controls muted loop playsInline className="w-full aspect-video bg-black rounded-md object-cover" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold text-[#7A7A7A] mb-4">
                Tapicería
              </h3>
              <div className="font-light text-justify space-y-4">
                <p>
                  <span className="font-medium">Limpieza superficial:</span> Para el uso diario, pasa un paño húmedo o una toalla de microfibra para retirar el polvo o residuos.
                </p>
                <p>
                  <span className="font-medium">Limpieza profunda:</span> Los cojines tienen cremalleras, por lo que puedes retirar las fundas y lavarlas a mano o a máquina en ciclo suave, con agua fría y detergente suave. Evita: blanqueadores, secadora a altas temperaturas o planchas directas sobre la tela. Se recomienda aspirar regularmente para evitar acumulación de pelo o residuos.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CuidadosDeLasPiezasPage;