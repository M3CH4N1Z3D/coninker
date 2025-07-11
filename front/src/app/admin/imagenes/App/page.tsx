import ImageConfigApp from "@/components/admin/ImageConfigApp";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configura las imagenes | Coninker",
  description:
    "Desde aqui vas a configurar las imagenes que se muestran en el sitio",
};

export default function ImageDashboardPage() {
  return (
    <div>
      <AuthProvider>
        <ImageConfigApp />
      </AuthProvider>
    </div>
  );
}
