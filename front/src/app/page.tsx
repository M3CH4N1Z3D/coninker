import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Categories } from "@/components/categories";
import { FeaturedProducts } from "@/components/featured-products";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { PromoModal } from "@/components/promo-modal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <About />
      <Categories />
      <FeaturedProducts />
      <Contact />
      <Footer />
      <PromoModal />
    </main>
  );
}
