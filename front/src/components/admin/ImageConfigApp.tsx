"use client";

import { useState, useRef } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [linkingOpen, setLinkingOpen] = useState(false);
  const [objectImages, setObjectImages] = useState<any[]>([]);
  const [objectProducts, setObjectProducts] = useState<any[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

  const openModal = (config: AppImageConfig) => {
    setActiveConfig(config);
    setIsOpen(true);
  };

  const openLinkingModal = async () => {
    setLinkingOpen(true);

    // Fetch imágenes subidas con key "object-images"
    const resImages = await fetch(`${apiUrl}/api/images/object-images`);
    const { images } = await resImages.json();
    setObjectImages(images);

    // Fetch todos los productos y filtrar por categoría "OBJETOS"
    const resProducts = await fetch(`${apiUrl}/api/products`);
    const allProducts = await resProducts.json();
    const objetos = allProducts.products.filter((p: any) =>
      p.categories?.some((c: any) => c.title === "OBJETOS")
    );

    setObjectProducts(objetos);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedFiles([]);
  };

  const handleSaveAssociation = async () => {
    if (!selectedImageId || !selectedProductId) return;

    const authToken = localStorage.getItem("authToken");

    const res = await fetch(`${apiUrl}/api/associate-image-product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imageId: selectedImageId,
        productId: selectedProductId,
      }),
    });

    if (res.ok) {
      toast({
        title: "Asociación guardada",
        description: "La imagen fue asociada correctamente.",
      });
      setLinkingOpen(false);
      setSelectedImageId(null);
      setSelectedProductId(null);
    } else {
      toast({
        title: "Error",
        description: "No se pudo asociar la imagen al producto",
        variant: "destructive",
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles.length || !activeConfig) return;

    const isMultiple = activeConfig?.key === "object-images";

    const authToken = localStorage.getItem("authToken");
    const formData = new FormData();
    if (isMultiple) {
      selectedFiles.forEach((file) => formData.append("file", file));
    } else {
      formData.append("file", selectedFiles[0]);
    }
    try {
      setUploading(true);

      const res = await fetch(`${apiUrl}${activeConfig.uploadEndpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al subir archivo");
      const { secure_url, secure_urls } = await res.json();

      const payload = isMultiple
        ? {
            images: secure_urls,
            name: activeConfig.name,
            key: activeConfig.key,
            description: activeConfig.description,
          }
        : {
            image: secure_url,
            name: activeConfig.name,
            key: activeConfig.key,
            description: activeConfig.description,
          };

      const saveRes = await fetch(`${apiUrl}${activeConfig.saveEndpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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

            {config.key === "object-images" && (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  openLinkingModal();
                }}
                className="mt-3 text-center text-sm text-indigo-600 hover:underline cursor-pointer transition"
              >
                Asociar escena a objeto
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal para subir imagen (ya existente en tu componente) */}
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
              multiple={activeConfig?.key === "object-images"}
              ref={fileInputRef}
              hidden
              onChange={(e) => {
                if (e.target.files)
                  setSelectedFiles(Array.from(e.target.files));
              }}
            />

            <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4">
              {selectedFiles.length > 0 ? (
                <ul className="text-sm text-gray-700">
                  {selectedFiles.map((f, i) => (
                    <li key={i}>{f.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">
                  No hay imágenes seleccionadas
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
                disabled={!selectedFiles || uploading}
              >
                {uploading ? "Subiendo..." : "Subir"}
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal nuevo para asociar imagen con producto */}
      <Dialog
        open={linkingOpen}
        onClose={() => setLinkingOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="absolute top-[12rem] w-full max-w-lg rounded bg-white p-6 shadow-lg">
            <DialogTitle className="text-xl font-bold text-gray-800 mb-4">
              Asociar escena a producto
            </DialogTitle>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona una imagen
              </label>
              <div className="grid grid-cols-3 gap-4">
                {objectImages.map((img) => (
                  <div
                    key={img.id}
                    onClick={() => setSelectedImageId(img.id)}
                    className={`border rounded overflow-hidden cursor-pointer relative group ${
                      selectedImageId === img.id ? "ring-2 ring-indigo-500" : ""
                    }`}
                  >
                    <img src={img.image} className="w-full h-24 object-cover" />
                    <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/70">
                      <img
                        src={img.image}
                        className="max-w-xs max-h-xs rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona un producto
              </label>
              <select
                className="w-full border px-3 py-2 rounded text-sm"
                value={selectedProductId ?? ""}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">-- Selecciona --</option>
                {objectProducts.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setLinkingOpen(false)}>
                Cancelar
              </Button>
              <Button
                onClick={handleSaveAssociation}
                disabled={!selectedImageId || !selectedProductId}
              >
                Guardar
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
