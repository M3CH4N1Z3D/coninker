import AdminDashboard from "@/components/AdminDashboard";
import ListProducts from "@/components/ListProducts";
import LoginForm from "@/components/LoginForm";
import ProductDetail from "@/components/product-detail";
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
        <ProductDetail />
      </AuthProvider>
    </div>
  );
}
