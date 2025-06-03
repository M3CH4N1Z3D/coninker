import { SearchResults } from "@/components/search-results";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resultados de Búsqueda | Coninker",
  description: "Encuentra los muebles y productos de decoración que buscas.",
};

export default function SearchPage() {
  return <SearchResults />;
}
