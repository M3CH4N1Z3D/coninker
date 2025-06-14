import type { Product } from "./types";

// Sample product data - Expandido con más productos para mejores resultados de búsqueda
const products: Product[] = [
  {
    id: "consola-Marsella",
    name: "Consola Marsella",
    description:
      "Atractiva como ella sola, te dará un salto de modernidad, diseño y estilo.",
    fullDescription:
      "Atractiva como ella sola, te dará un salto de modernidad, diseño y estilo.",
    price: 299.99,
    images: ["/instagram/consola-Marsella/consola-Marsella.webp"],
    videos: [],
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
    colors: ["#E0C9A6", "#355759"],
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
    featured: true,
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
    videos: ["/instagram/consola_Marsella/videos/marsella18.mp4"],

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
    featured: false,
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
    videos: ["/instagram/consola_Marsella/videos/marsella18.mp4"],

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
    featured: true,
  },
  {
    id: "estanteria-minimalista",
    name: "Estantería Minimalista",
    description:
      "Estantería de diseño minimalista con múltiples niveles para organización.",
    fullDescription:
      "Esta estantería minimalista combina funcionalidad y estética en un diseño limpio y moderno. Con cinco niveles espaciosos, ofrece amplio espacio de almacenamiento para libros, decoración y objetos personales. Su estructura de metal negro mate y estantes de madera clara la convierten en una pieza versátil que se adapta a cualquier ambiente.",
    price: 249.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    videos: ["/instagram/consola_Marsella/videos/marsella18.mp4"],

    category: "Estanterías",
    stock: 12,
    rating: 4.6,
    reviewCount: 18,
    dimensions: {
      width: 80,
      height: 180,
      depth: 35,
    },
    specifications: [
      { name: "Material", value: "Metal y madera de pino" },
      { name: "Acabado", value: "Metal negro mate, madera natural" },
      { name: "Peso", value: "18 kg" },
      { name: "Niveles", value: "5 estantes ajustables" },
    ],
    materials: [
      { part: "Estructura", material: "Metal negro mate" },
      { part: "Estantes", material: "Madera de pino tratada" },
      { part: "Herrajes", material: "Acero galvanizado" },
    ],
    colors: ["#2C2C2C", "#F5F5DC"],
    reviews: [
      {
        author: "Patricia L.",
        rating: 5,
        date: "08/05/2023",
        comment:
          "Perfecta para mi oficina en casa. Muy estable y el diseño es precioso.",
      },
      {
        author: "Miguel A.",
        rating: 4,
        date: "22/04/2023",
        comment:
          "Buena calidad y fácil de armar. Los estantes son muy resistentes.",
      },
    ],
    featured: false,
  },
  {
    id: "lampara-pie-articulada",
    name: "Lámpara de Pie Articulada",
    description: "Lámpara de pie con brazo articulado y luz LED regulable.",
    fullDescription:
      "Esta lámpara de pie articulada combina funcionalidad y estilo moderno. Con tecnología LED de última generación y brazo totalmente articulado, permite dirigir la luz exactamente donde la necesites. Su base pesada garantiza estabilidad, mientras que el regulador táctil ofrece control total sobre la intensidad lumínica.",
    price: 129.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    videos: ["/instagram/consola_Marsella/videos/marsella18.mp4"],

    category: "Iluminación",
    stock: 20,
    rating: 4.4,
    reviewCount: 31,
    dimensions: {
      width: 30,
      height: 150,
      depth: 30,
    },
    specifications: [
      { name: "Tipo de luz", value: "LED 12W" },
      { name: "Regulable", value: "Sí, control táctil" },
      { name: "Material", value: "Metal y plástico ABS" },
      { name: "Cable", value: "2 metros con interruptor" },
    ],
    materials: [
      { part: "Base", material: "Metal fundido" },
      { part: "Brazo", material: "Aluminio anodizado" },
      { part: "Pantalla", material: "Plástico ABS" },
    ],
    colors: ["#000000", "#FFFFFF", "#C0C0C0"],
    reviews: [
      {
        author: "Carmen R.",
        rating: 5,
        date: "15/05/2023",
        comment:
          "Excelente lámpara para leer. La luz es muy cálida y el brazo se mueve perfectamente.",
      },
      {
        author: "David M.",
        rating: 4,
        date: "03/05/2023",
        comment:
          "Muy práctica y moderna. El regulador táctil funciona muy bien.",
      },
    ],
    featured: true,
  },
  {
    id: "jarron-ceramica-decorativo",
    name: "Jarrón Decorativo Cerámica",
    description: "Jarrón decorativo de cerámica artesanal con acabado mate.",
    fullDescription:
      "Este hermoso jarrón decorativo está elaborado en cerámica artesanal con un elegante acabado mate. Su forma orgánica y textura única lo convierten en una pieza de arte que complementa cualquier espacio. Perfecto para flores frescas o como elemento decorativo independiente.",
    price: 59.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    videos: ["/instagram/consola_Marsella/videos/marsella18.mp4"],

    category: "Decoración",
    stock: 25,
    rating: 4.3,
    reviewCount: 14,
    dimensions: {
      width: 20,
      height: 35,
      depth: 20,
    },
    specifications: [
      { name: "Material", value: "Cerámica artesanal" },
      { name: "Acabado", value: "Mate texturizado" },
      { name: "Peso", value: "1.2 kg" },
      { name: "Uso", value: "Interior" },
    ],
    materials: [
      { part: "Cuerpo", material: "Cerámica de alta temperatura" },
      { part: "Acabado", material: "Esmalte mate" },
    ],
    colors: ["#F5F5DC", "#8B4513", "#2F4F4F"],
    reviews: [
      {
        author: "Isabel F.",
        rating: 5,
        date: "12/05/2023",
        comment:
          "Precioso jarrón, la textura es muy bonita y el tamaño perfecto para mi mesa.",
      },
      {
        author: "Antonio G.",
        rating: 4,
        date: "28/04/2023",
        comment: "Buena calidad y muy decorativo. Llegó muy bien empaquetado.",
      },
    ],
    featured: false,
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
