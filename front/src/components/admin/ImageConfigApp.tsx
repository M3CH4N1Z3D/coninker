"use client";

import { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AppImageConfig } from "@/interfaces/types";

const CONFIGURABLE_IMAGES: AppImageConfig[] = [
  {
    name: "Imagen Hero",
    key: "hero",
    description:
      "Imagen principal del sitio que aparece en la sección de bienvenida.",
    uploadEndpoint: "/api/upload/hero",
    saveEndpoint: "/api/saveheroimage",
  },
  {
    name: "Imagenes de Objetos",
    key: "object-images",
    description:
      "Imágenes de los objetos que se muestran en los espacion complmentarios.",
    uploadEndpoint: "/api/upload/object-images",
    saveEndpoint: "/api/saveobjectimages",
  },
];

export default function ImageConfigApp() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [activeConfig, setActiveConfig] = useState<AppImageConfig | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const openModal = (config: AppImageConfig) => {
    setActiveConfig(config);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile || !activeConfig) return;

    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      const res = await fetch(`${apiUrl}${activeConfig.uploadEndpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir archivo");
      const { secure_url } = await res.json();

      const saveRes = await fetch(`${apiUrl}${activeConfig.saveEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: secure_url,
          name: activeConfig.name,
          key: activeConfig.key,
          description: activeConfig.description,
        }),
      });

      if (!saveRes.ok) throw new Error("Error al guardar la imagen");

      toast({
        title: "Imagen guardada",
        description: "La imagen se subió y se guardó exitosamente.",
      });

      closeModal();
    } catch (err) {
      console.error("Error:", err);
      toast({
        title: "Error",
        description: "No se pudo subir o guardar la imagen",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Configuración de Imágenes de la App
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CONFIGURABLE_IMAGES.map((config) => (
          <div
            key={config.key}
            onClick={() => openModal(config)}
            className="p-5 border border-gray-200 rounded-lg hover:shadow-md hover:bg-indigo-50 cursor-pointer transition"
          >
            <h2 className="text-center text-lg font-semibold text-gray-900">
              {config.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1 text-justify">
              {config.description}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold text-gray-800 mb-4">
              Subir {activeConfig?.name}
            </Dialog.Title>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                if (e.target.files?.[0]) setSelectedFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
              {selectedFile ? (
                <p className="text-sm text-gray-700">
                  Archivo seleccionado: {selectedFile.name}
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  No hay imagen seleccionada
                </p>
              )}
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
              >
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar imagen
              </Button>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
              >
                {uploading ? "Subiendo..." : "Subir"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
