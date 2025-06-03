import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { getProductById, getRelatedProducts } from "@/lib/products"
import type { Metadata } from "next"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id)

  return {
    title: `${product.name} | Coninker`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  const relatedProducts = getRelatedProducts(params.id)

  return (
    <div className="min-h-screen bg-white">
      <ProductDetail product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}
