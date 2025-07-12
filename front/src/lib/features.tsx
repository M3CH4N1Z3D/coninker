import Image from "next/image";
export const features = [
  {
    icon: (
      <Image
        src="/icons/colaboracion-creativa.png"
        alt="Colaboracion Creativa"
        width={80}
        height={80}
      />
    ),
    title: "Colaboración Creativa",
    description:
      "Aliados en el desarrollo de ideas junto a arquitectos, diseñadores de interiores y proyectos de hospitalidad.",
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
      "Combinamos artesanía tradicional y diseño contemporáneo para ofrecer piezas únicas y auténticas.",
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
      "Nos comprometemos a brindar una experiencia que supera expectativas, con soluciones reales.",
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
      "Todo lo que hacemos está fabricado en Colombia, impulsando nuestra industria con orgullo.",
  },
];
