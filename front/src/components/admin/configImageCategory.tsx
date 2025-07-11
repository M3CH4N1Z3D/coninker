"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { Category } from "@/interfaces/types";

export default function ConfigImageCategory() {
  const params = useParams() as { id: string };
  const { toast } = useToast();
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [cloudImage, setCloudImage] = useState<string>("");
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/categories/id/${params.id}`
        );
        if (!response.ok) throw new Error("Error al obtener la categoría");
        const data = await response.json();
        setCategory(data.category);
        setCloudImage(data.category.image || "");
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchCategory();
  }, [params.id]);

  const handleBack = () => {
    window.history.back();
  };

  const handleImageUpload = () => {
    if (!category?.title || !params?.id) {
      toast({
        title: "Error",
        description: "No se ha cargado la categoría correctamente.",
        variant: "destructive",
      });
      return;
    }
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const uploadToCloudinary = async (
    file: File,
    type: "CategoryImage",
    categoryTitle: string,
    categoryId: string
  ) => {
    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("categoryTitle", categoryTitle);
    formData.append("file", file);

    try {
      const res = await fetch(`${apiUrl}/api/upload/category`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Error al subir archivo");

      const { secure_url } = await res.json();

      const updated = await fetch(`${apiUrl}/api/categories/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: secure_url }),
      });

      if (!updated.ok) throw new Error("Error al actualizar categoría");

      setCloudImage(secure_url);
      setCategory((prev) => (prev ? { ...prev, image: secure_url } : prev));
      toast({
        title: "Imagen cargada",
        description: "Imagen subida y guardada exitosamente.",
      });
    } catch (err) {
      console.error("Error de carga:", err);
      toast({
        title: "Error",
        description: "No se pudo actualizar la imagen",
        variant: "destructive",
      });
    }
  };

  const onFileSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "CategoryImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !category || !category.title || !params.id) return;
    uploadToCloudinary(file, type, category.title, params.id);
  };

  if (loading) return <p className="px-8 py-6">Cargando...</p>;
  if (!category) return <p className="px-8 py-6">Categoría no encontrada</p>;

  return (
    <section className="flex flex-row gap-6 px-8 py-12 justify-center">
      <div className="flex flex-col gap-4">
        <span
          className="text-indigo-600 hover:underline cursor-pointer"
          onClick={handleBack}
        >
          Volver
        </span>

        <h1 className="text-2xl font-bold">Categoría: {category.title}</h1>

        <p className="text-gray-700">
          <strong>Descripción:</strong> {category.description}
        </p>

        <p className="text-gray-700">
          <strong>¿Destacada?:</strong> {category.showInLanding ? "SI" : "NO"}
        </p>

        {Array.isArray(category.children) && category.children.length > 0 && (
          <div className="space-y-2">
            <p className="text-gray-700 font-semibold">Subcategorías:</p>
            <ul className="list-disc list-inside text-gray-600">
              {category.children.map((child) => (
                <li key={child.id}>{child.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex flex-col md:grid-cols-2 gap-12 mt-6">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={category.image || "/placeholder.png"}
            alt={`Imagen de ${category.title}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4 justify-start">
          <Button
            onClick={handleImageUpload}
            className="bg-amber-600 text-white w-full"
          >
            <Upload className="w-4 h-4 mr-2" /> Actualizar imagen para categoría
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => onFileSelected(e, "CategoryImage")}
            hidden
          />
        </div>
      </div>
    </section>
  );
}
