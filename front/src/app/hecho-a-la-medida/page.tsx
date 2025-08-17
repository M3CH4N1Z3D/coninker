// frontend/src/app/hecho-a-la-medida/page.tsx

import React from 'react';
import Link from 'next/link';
// 1. Importamos el componente Image de Next.js para la optimización de imágenes.
import Image from 'next/image';

// 2. Definimos los datos de las imágenes en un array para un código más limpio y escalable.
const galleryImages = [
    {
        src: "/hecho-a-la-medida/GATOS.jpg",
        title: "MUEBLE PARA GATOS",
        subtitle: "LULO & TOULOUSE",
        alt: "Mueble para gatos Lulo & Toulouse diseñado a medida por Coninker"
    },
    {
        src: "/hecho-a-la-medida/CAMA.jpg",
        title: "BASE CAMA",
        subtitle: "YUYA",
        alt: "Base de cama Yuya con diseño personalizado de Coninker"
    },
    {
        src: "/hecho-a-la-medida/SALOMIX.jpg",
        title: "ZAPATERO",
        subtitle: "SALOMIX",
        alt: "Zapatero Salo Mix hecho a medida por Coninker"
    }
];

const HechoALaMedidaPage = () => {
    // El número de WhatsApp especificado en el PDF
    const whatsappLink = "https://wa.me/573161900539?text=Hola,%20quisiera%20cotizar%20un%20proyecto%20hecho%20a%20la%20medida.";

    return (
        <div className="font-['Montserrat'] text-[#444444] py-16 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-medium text-[#7A7A7A] mb-2">
                        HECHO A LA MEDIDA
                    </h1>
                    <p className="text-xl italic text-[#7A7A7A]">
                        Diseñamos contigo, no solo para ti.
                    </p>
                </header>

                {/* 3. Reemplazamos los placeholders por un mapeo de las imágenes reales. */}
                <section className="grid md:grid-cols-3 gap-8 mb-16">
                    {galleryImages.map((image) => (
                        <div key={image.title} className="flex flex-col items-center">
                            <div className="w-full h-80 relative mb-4 rounded-md overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill // 'fill' hace que la imagen ocupe el contenedor padre
                                    style={{ objectFit: 'cover' }} // 'cover' asegura que la imagen cubra el espacio sin distorsionarse
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <h4 className="text-lg font-semibold text-[#C0C1C1]">{image.title}</h4>
                            <p className="italic text-[#7A7A7A]">{image.subtitle}</p>
                        </div>
                    ))}
                </section>

                <section className="text-justify font-light space-y-6 text-base">
                    <p>
                        Sabemos que hay ideas que no entran en un molde. A veces tienes una imagen en la cabeza, un espacio con necesidades específicas o simplemente ganas de crear algo que sea verdaderamente tuyo. Para eso existe nuestro servicio Hecho a la Medida: una experiencia de diseño colaborativa donde convertimos tu visión en una pieza funcional, personal y única.
                    </p>
                    <h3 className="text-xl font-medium text-center !mt-12 text-[#7A7A7A]">¿Cómo funciona?</h3>
                    <p>
                        Todo empieza con una conversación. En una consulta inicial, nos cuentas qué te inspira: puede ser una referencia, un color que amás, una necesidad puntual o un problema que quieres resolver. Escuchamos, preguntamos y te guiamos.
                    </p>
                     <p>
                        Como diseñadores, no solo proponemos formas o materiales: también trabajamos con el color, entendiendo cómo se comporta en tu espacio y cómo usarlo a tu favor. Sabemos que muchas veces cuesta atreverse a salir del neutro, pero acá estás acompañado: te ayudamos a combinar, equilibrar y elegir con confianza, para que el resultado sea armonioso y con identidad propia.
                    </p>
                    <h3 className="text-xl font-medium text-center !mt-12 text-[#7A7A7A]">¿Qué incluye el proceso?</h3>
                    <ul className="list-disc list-inside space-y-2 !mb-12">
                        <li>Consulta personalizada para conocer tu espacio, tus gustos y tus necesidades.</li>
                        <li>Asesoría en selección de materiales, acabados y paleta de color.</li>
                        <li>Propuesta de diseño con modelo 3D y planos generales para visualizar el resultado.</li>
                        <li>Revisión y ajustes en conjunto.</li>
                    </ul>
                     <p>
                        Este servicio no es solo sobre crear muebles, sino sobre diseñar una experiencia: tu traés la idea, nosotros el conocimiento para hacerla realidad. Cada proyecto hecho a medida es una oportunidad para conectar con tu estilo, aprovechar mejor tus espacios y crear algo que no existe en ningún otro lado.
                    </p>
                </section>
                
                <footer className="text-center mt-16">
                    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" 
                        className="inline-block py-3 px-8 border border-[#7A7A7A] text-[#7A7A7A] font-medium hover:bg-[#7A7A7A] hover:text-white transition-colors duration-300">
                        COTIZA TU SERVICIO CON NOSOTROS
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default HechoALaMedidaPage;