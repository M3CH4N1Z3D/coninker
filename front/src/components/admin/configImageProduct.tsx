"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { X, Upload, Link } from "lucide-react"; // Se reemplaza Pencil por X para la eliminación
import { Product } from "@/interfaces/types";

export default function ConfigImageProduct() {
  const params = useParams();
  const pathname = usePathname();
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  // Índice de la imagen grande a mostrar (basado en el filtrado por color)
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [cloudImages, setCloudImages] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const router = useRouter();

  // Esta constante corresponde a la estructura por defecto de imágenes locales (no afecta a la galería)
  const colorImages = [...Array(4)].map(
    (_, index) =>
      `/instagram/${params.id}/${selectedColor.replace("#", "")}/${params.id}${
        index + 1
      }.webp`
  );

  const isAdmin = pathname?.startsWith("/admin/imagenes");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/products/${params.id}`);
        if (!response.ok) throw new Error("Error al obtener el producto");
        const data = await response.json();
        setProduct(data.product);
        setSelectedColor(data.product.colors?.[0] || "#000000");
        setCloudImages(data.product.images || []); // Se asume que aquí vienen las URLs de Cloudinary
        setVideoUrl(data.product.videos?.[0] || null);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchProduct();
  }, [params.id, apiUrl, toast]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  // Al cambiar de color se reinicia el índice de imagen
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    setSelectedImage(0);
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleVideoUpload = () => {
    if (videoInputRef.current) videoInputRef.current.click();
  };

  // Función para subir archivo a Cloudinary y actualizar la base de datos
  const uploadToCloudinary = async (file: File, type: "image" | "video") => {
    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    // Enviamos el id del producto para que la ruta en Cloudinary sea:
    // products/[product.id]/[colorHex]/
    formData.append("productName", product!.id);
    formData.append("colorHex", selectedColor.replace("#", ""));
    formData.append("file", file);
    try {
      const res = await fetch(`${apiUrl}/api/upload/${type}`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir archivo");
      const { secure_url } = await res.json();

      const updated = await fetch(`${apiUrl}/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [type === "image" ? "images" : "videos"]:
            type === "image" ? [...cloudImages, secure_url] : [secure_url],
        }),
      });
      if (!updated.ok) throw new Error("Error al actualizar producto");
      if (type === "image") {
        setCloudImages((prev) => [...prev, secure_url]);
        toast({
          title: "Imagen cargada",
          description: "Imagen subida y guardada exitosamente.",
        });
      } else {
        setVideoUrl(secure_url);
        toast({
          title: "Video cargado",
          description: "Video subido y guardado exitosamente.",
        });
      }
    } catch (err) {
      console.error("Error de carga:", err);
      toast({
        title: "Error",
        description: "No se pudo subir el archivo",
        variant: "destructive",
      });
    }
  };

  const onFileSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "video"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadToCloudinary(file, type);
  };

  // Filtramos las imágenes de Cloudinary según el color seleccionado
  // Se espera que la URL tenga la subcarpeta del color, ejemplo: /products/[id]/5f4444/...
  const filteredImages = cloudImages.filter((url) =>
    url.includes(`/${selectedColor.replace("#", "")}/`)
  );

  // Función para eliminar imagen: elimina en Cloudinary y actualiza la base de datos
  const handleDeleteImage = async (url: string) => {
    if (!window.confirm("¿Seguro que desea eliminar esta imagen?")) return;
    const authToken = localStorage.getItem("authToken");
    try {
      // En este ejemplo se asume que existe un endpoint DELETE para imágenes.
      // Se envía la imagen a eliminar en el cuerpo de la petición.
      const res = await fetch(`${apiUrl}/api/products/${params.id}/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ imageUrl: url }),
      });
      if (!res.ok) throw new Error("Error al eliminar imagen");
      setCloudImages((prev) => prev.filter((img) => img !== url));
      toast({
        title: "Imagen eliminada",
        description: "La imagen se eliminó correctamente.",
      });
    } catch (error) {
      console.error("Error al eliminar imagen:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la imagen.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <section className="flex flex-col gap-6 px-8 py-12">
      <span
        className="text-indigo-600 hover:underline cursor-pointer"
        onClick={handleBack}
      >
        Volver
      </span>

      <h1 className="text-2xl font-bold">
        Configuración de Imágenes: {product.name}
      </h1>

      {/* Botones para seleccionar color */}
      <div className="flex gap-4 items-center">
        {product.colors?.map((color, index) => (
          <button
            key={index}
            className={`w-8 h-8 rounded-full border ${
              selectedColor === color ? "ring-2 ring-amber-500" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            aria-label={`Seleccionar color ${color}`}
          />
        ))}
      </div>

      {/* Sección de vista de imágenes y video */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galería */}
        <div className="space-y-4 relative">
          <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
            {selectedImage < filteredImages.length ? (
              <Image
                src={filteredImages[selectedImage]}
                alt={`Imagen ${selectedImage + 1}`}
                fill
                className="object-cover"
              />
            ) : videoUrl ? (
              <video controls className="w-full h-full object-cover">
                <source src={videoUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                No hay vista previa
              </div>
            )}
          </div>
        </div>

        {/* Botones de carga */}
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleImageUpload}
            className="bg-amber-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" /> Cargar imagen (color
            seleccionado)
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => onFileSelected(e, "image")}
            hidden
          />

          <Button
            onClick={handleVideoUpload}
            className="bg-amber-600 text-white"
          >
            <Upload className="w-4 h-4 mr-2" /> Cargar video
          </Button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4"
            onChange={(e) => onFileSelected(e, "video")}
            hidden
          />
          {/* Miniaturas */}
          <div className="flex gap-2 overflow-x-auto">
            {filteredImages.map((img, i) => (
              <div key={i} className="relative">
                <button
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-md overflow-hidden border ${
                    selectedImage === i ? "ring-2 ring-amber-500" : ""
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Miniatura ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteImage(img)}
                    className="absolute top-1 right-1 bg-white bg-opacity-80 p-1 rounded-full focus:outline-none"
                    aria-label="Eliminar imagen"
                  >
                    <X className="w-4 h-4 text-red-600" />
                  </button>
                )}
              </div>
            ))}
            {videoUrl && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(filteredImages.length)}
                  className={`w-16 h-16 rounded-md overflow-hidden border ${
                    selectedImage === filteredImages.length
                      ? "ring-2 ring-amber-500"
                      : ""
                  }`}
                >
                  <video className="w-full h-full object-cover">
                    <source src={videoUrl} />
                  </video>
                </button>
                {isAdmin && (
                  <div className="absolute top-1 right-1 bg-white bg-opacity-80 p-1 rounded-full">
                    {/* Aquí podrías agregar opción de eliminación para el video si lo necesitas */}
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
