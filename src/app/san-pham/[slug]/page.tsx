import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getProductBySlug,
  getAllSlugs,
  formatPrice,
  getAllProducts,
} from '@/lib/products';
import {
  siteConfig,
  generateProductSchema,
  generateBreadcrumbSchema,
} from '@/lib/seo';
import ProductDetail from '@/components/ProductDetail';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Không tìm thấy sản phẩm' };
  }

  const title = `${product.name} | Mua Chính Hãng Giá Tốt`;
  const description = `${product.name} - ${product.brand}. ${product.description.slice(0, 150)}... Giá chỉ ${formatPrice(product.price)}. Giao hàng toàn quốc, đổi trả 30 ngày.`;

  return {
    title,
    description,
    keywords: [product.name, product.brand, `giày ${product.brand.toLowerCase()}`, 'sneaker chính hãng'],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/san-pham/${product.slug}`,
      images: [{ url: product.image, width: 540, height: 540, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `${siteConfig.url}/san-pham/${product.slug}`,
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const relatedProducts = allProducts
    .filter((p) => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbs = [
    { name: 'Trang chủ', url: siteConfig.url },
    { name: product.brand, url: `${siteConfig.url}/thuong-hieu/${product.brand.toLowerCase().replace(' ', '-')}` },
    { name: product.name, url: `${siteConfig.url}/san-pham/${product.slug}` },
  ];

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)) }}
      />

      <ProductDetail product={product} relatedProducts={relatedProducts} />
    </>
  );
}