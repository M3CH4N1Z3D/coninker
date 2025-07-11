import ListCategories from "@/components/admin/ListCategories";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ingesa al panel de configuración | Coninker",
  description: "Desde aqui vas a configurar tu sitio",
};
export default function AdminDashboardPage() {
  return (
    <div>
      <AuthProvider>
        <ListCategories />
      </AuthProvider>
    </div>
  );
}
