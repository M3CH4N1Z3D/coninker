import Image from "next/image";
export const features = [
  {
    icon: (
      <Image
        src="/icons/colaboracion-creativa.png"
        alt="Colaboracion Creativa"
        width={80}
        height={80}
        className="bg-transparent"
      />
    ),
    title: "Colaboración Creativa",
    description:
      "Escuchamos las necesidades de cada cliente y las conectamos con nuestras ideas y propuestas para crear piezas únicas que respondan a cada espacio. ",
  },
  {
    icon: (
      <Image
        src={"/icons/hecho-a-mano.png"}
        alt="hecho-a-mano"
        width={80}
        height={80}
      />
    ),
    title: "Hecho a Mano",
    description:
      "Combinamos formas orgánicas, colores vibrantes y materiales colombianos para dar vida a piezas artesanales llenas de carácter y autenticidad.",
  },
  {
    icon: (
      <Image
        src={"/icons/atencion-al-cliente.png"}
        alt="atencion-al-cliente"
        width={80}
        height={80}
      />
    ),
    title: "Atención al Cliente",
    description:
      "Ofrecemos atención personalizada para lograr una paleta de color y diseño que complemente de forma armónica cada ambiente.",
  },
  {
    icon: (
      <Image
        src={"/icons/marca-colombiana.png"}
        alt="marca-colombiana"
        width={80}
        height={80}
      />
    ),
    title: "Marca Colombiana",
    description:
      "Diseñamos y fabricamos en Colombia, impulsando el talento local y destacando lo mejor de nuestra identidad en cada mueble.",
  },
];
