
import React from 'react';

const NosotrosPage = () => {
  return (
    <div className="font-['Montserrat'] text-[#444444] py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-medium text-[#7A7A7A]">
            NOSOTROS</h1>
        </header>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Placeholder para la imagen de Carpeta H */}
            <div className="w-full h-96 bg-gray-200 rounded-md"></div>

            <section className="text-justify font-light space-y-5 text-base">
                <p>
                    <span className="font-bold">CON-IN-KER </span>nació desde el color. Desde las ganas profundas de romper con lo mismo de siempre. Soy Maria Carolina Pérez, diseñadora, y esta marca es el resultado de años de búsqueda, curiosidad y muchísimo amor por lo qu e hago.
                </p>
                <p>
                    Todo empezó en 2018. En ese entonces pintaba cuadros y fabricaba muebles muy rectos, simples, porque era lo que podía crear con los recursos que tenía. Guardaba todo en el cuarto de TV de la casa de mis papás. Nada de showroom, ni bodega, ni equipo... solo muchas ganas, pinceles y, literalmente, ese placer físico que me produce el color cuando aparece en una combinación inesperada.
                </p>
                 <p>
                    Pero fue en 2022 cuando Coninker realmente tomó forma. Me propuse crear una marca distinta. Algo que saliera del blanco y negro, de lo neutro, de lo predecible. Quería que el diseño interior se sintiera más vivo, más libre, más personal, y así nació el nombre. <span className="font-bold">Con - In - Ker</span>. Crear con intención, desde el interior, con color, con carácter, con e moción.                </p>
                 <p>
                    Hoy tenemos una bodega, un equipo de más de 10 personas talentosas que hacen posible cada proyecto, y una comunidad de personas que, como yo, sienten algo especial al ver color en sus es pacios.</p>
                <p className="font-medium italic">
                    "Porque sí, lo que me mueve —lo que de verdad me da placer— es ver una combinación bien hecha, y sentir cómo transforma un mueble, una habitación, un estado de ánimo... y convierte cualquier espacio en una declaración de identidad."
                </p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default NosotrosPage;