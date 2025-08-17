import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category } from "@/interfaces/types";
import { CategoryState } from "@/interfaces/types";

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [],
      isLoading: false,
      setCategories: (categories) => set({ categories }),
      fetchCategories: async () => {
        set({ isLoading: true });
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          const res = await fetch(
            `https://zgkfb4d3-3001.use2.devtunnels.ms/api/categories`
          );
          const data = await res.json();
          set({ categories: data.categories });
        } catch (error) {
          console.error("Error fetching categories:", error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "categories-storage", // clave en localStorage
    }
  )
);
