import type { Product } from "./types";

// Sample product data
const products: Product[] = [
  {
    id: "mesa-centro-nordica",
    name: "Mesa de Centro Nórdica",
    description:
      "Mesa de centro con diseño nórdico, perfecta para salas de estar modernas.",
    fullDescription:
      "Esta elegante mesa de centro con diseño nórdico es perfecta para complementar cualquier sala de estar moderna. Fabricada con materiales de alta calidad, combina funcionalidad y estética con su superficie espaciosa y sus patas de madera maciza. Su diseño minimalista se integra perfectamente en diversos estilos de decoración, desde el escandinavo hasta el contemporáneo.",
    price: 299.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Mesas",
    stock: 15,
    rating: 4.5,
    reviewCount: 24,
    dimensions: {
      width: 90,
      height: 45,
      depth: 60,
    },
    specifications: [
      { name: "Material", value: "Madera de roble y MDF" },
      { name: "Acabado", value: "Barniz mate" },
      { name: "Peso", value: "12 kg" },
      { name: "Montaje", value: "Requiere ensamblaje" },
    ],
    materials: [
      { part: "Tablero", material: "MDF con chapa de roble" },
      { part: "Patas", material: "Madera maciza de roble" },
      { part: "Herrajes", material: "Acero inoxidable" },
    ],
    colors: ["#E0C9A6", "#5C4033", "#000000"],
    reviews: [
      {
        author: "María G.",
        rating: 5,
        date: "15/04/2023",
        comment:
          "Preciosa mesa, muy fácil de montar y de excelente calidad. Combina perfectamente con mi sofá.",
      },
      {
        author: "Carlos R.",
        rating: 4,
        date: "02/03/2023",
        comment:
          "Buena relación calidad-precio. El color es exactamente como en las fotos.",
      },
    ],
  },
  {
    id: "silla-ergonomica-moderna",
    name: "Silla Ergonómica Moderna",
    description:
      "Silla ergonómica con diseño moderno para máximo confort en largas jornadas.",
    fullDescription:
      "Nuestra silla ergonómica moderna está diseñada pensando en tu comodidad durante largas jornadas de trabajo. Con soporte lumbar ajustable, reposabrazos regulables y mecanismo de inclinación, se adapta perfectamente a tu postura. El asiento acolchado y el respaldo transpirable proporcionan un confort excepcional, mientras que su base giratoria de 360° ofrece total libertad de movimiento.",
    price: 149.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Sillas",
    stock: 8,
    rating: 4.7,
    reviewCount: 36,
    dimensions: {
      width: 60,
      height: 120,
      depth: 65,
    },
    specifications: [
      { name: "Material", value: "Malla, espuma de alta densidad y metal" },
      { name: "Altura ajustable", value: "Sí, 10 cm" },
      { name: "Capacidad de peso", value: "150 kg" },
      { name: "Ruedas", value: "Silenciosas, aptas para todo tipo de suelos" },
    ],
    materials: [
      { part: "Respaldo", material: "Malla transpirable" },
      {
        part: "Asiento",
        material: "Espuma de alta densidad con tapizado textil",
      },
      { part: "Base", material: "Aluminio pulido" },
      { part: "Ruedas", material: "Nylon con recubrimiento de silicona" },
    ],
    colors: ["#000000", "#808080", "#0000FF"],
    reviews: [
      {
        author: "Juan P.",
        rating: 5,
        date: "20/05/2023",
        comment:
          "Increíble silla, ha mejorado mucho mi postura y ya no tengo dolores de espalda después de trabajar.",
      },
      {
        author: "Ana M.",
        rating: 4,
        date: "12/04/2023",
        comment:
          "Muy cómoda y fácil de ajustar. El único inconveniente es que el montaje fue un poco complicado.",
      },
    ],
  },
  {
    id: "sofa-modular-gris",
    name: "Sofá Modular Gris",
    description:
      "Sofá modular con tapizado en tela gris de alta resistencia y módulos configurables.",
    fullDescription:
      "Este sofá modular contemporáneo ofrece versatilidad y comodidad excepcionales para tu sala de estar. Con módulos que puedes reorganizar según tus necesidades, es perfecto para adaptarse a cualquier espacio. El tapizado en tela gris de alta resistencia no solo es elegante sino también duradero y fácil de limpiar. Los cojines de asiento contienen espuma de alta densidad que mantiene su forma incluso después de un uso prolongado.",
    price: 899.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Sofás",
    stock: 5,
    rating: 4.8,
    reviewCount: 42,
    dimensions: {
      width: 280,
      height: 85,
      depth: 95,
    },
    specifications: [
      { name: "Material estructura", value: "Madera de pino y tablero MDF" },
      {
        name: "Relleno cojines",
        value: "Espuma de alta densidad y fibra de poliéster",
      },
      { name: "Patas", value: "Madera maciza, altura 15 cm" },
      { name: "Módulos", value: "3 (configurables)" },
    ],
    materials: [
      { part: "Tapizado", material: "Tela 100% poliéster de alta resistencia" },
      { part: "Estructura", material: "Madera de pino y MDF" },
      { part: "Patas", material: "Madera de haya" },
      { part: "Cojines", material: "Espuma HR y fibra hueca siliconada" },
    ],
    colors: ["#808080", "#F5F5DC", "#000080"],
    reviews: [
      {
        author: "Laura T.",
        rating: 5,
        date: "10/06/2023",
        comment:
          "Excelente sofá, muy cómodo y la calidad es impresionante. Los módulos son perfectos para mi sala.",
      },
      {
        author: "Roberto S.",
        rating: 5,
        date: "28/05/2023",
        comment:
          "Muy satisfecho con la compra. El proceso de entrega fue rápido y el montaje sencillo.",
      },
    ],
  },
];

export function getProductById(id: string): Product {
  const product = products.find((p) => p.id === id);
  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }
  return product;
}

export function getRelatedProducts(excludeId: string): Product[] {
  return products.filter((p) => p.id !== excludeId).slice(0, 4);
}

export function getAllProducts(): Product[] {
  return products;
}
