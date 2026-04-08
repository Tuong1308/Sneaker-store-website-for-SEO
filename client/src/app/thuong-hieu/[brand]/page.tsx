import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBrands, getProductsByBrand } from '@/lib/products';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: { brand: string };
}

const brandNameMap: Record<string, string> = {
  'on-running': 'ON RUNNING',
  'under-armour': 'UNDER ARMOUR',
  asics: 'ASICS',
  hoka: 'HOKA',
  puma: 'PUMA',
  nike: 'NIKE',
  adidas: 'ADIDAS',
};

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({
    brand: brand.toLowerCase().replace(' ', '-'),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brandName = brandNameMap[params.brand] || params.brand.toUpperCase();
  const products = getProductsByBrand(brandName);

  if (products.length === 0) {
    return { title: 'Không tìm thấy thương hiệu' };
  }

  const title = `Giày ${brandName} Chính Hãng | ${products.length} Mẫu Mới Nhất`;
  const description = `Mua giày sneaker ${brandName} chính hãng tại Sneaker Store Vietnam. ${products.length} mẫu mới nhất, giá tốt nhất, giao hàng toàn quốc, đổi trả 30 ngày.`;

  return {
    title,
    description,
    keywords: [
      `giày ${brandName.toLowerCase()}`,
      `sneaker ${brandName.toLowerCase()}`,
      `${brandName.toLowerCase()} chính hãng`,
      `mua ${brandName.toLowerCase()} online`,
    ],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/thuong-hieu/${params.brand}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/thuong-hieu/${params.brand}`,
    },
  };
}

export default function BrandPage({ params }: Props) {
  const brandName = brandNameMap[params.brand] || params.brand.toUpperCase();
  const products = getProductsByBrand(brandName);

  if (products.length === 0) {
    notFound();
  }

  const saleProducts = products.filter((p) => p.discount);
  const avgDiscount =
    saleProducts.length > 0
      ? Math.round(
          saleProducts.reduce((acc, p) => acc + (p.discount || 0), 0) /
            saleProducts.length
        )
      : 0;

  const breadcrumbs = [
    { name: 'Trang chủ', url: siteConfig.url },
    { name: brandName, url: `${siteConfig.url}/thuong-hieu/${params.brand}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Giày {brandName} Chính Hãng
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {products.length} sản phẩm
            {avgDiscount > 0 && ` • Giảm đến ${avgDiscount}%`}
          </p>
          <nav className="text-sm">
            <a href="/" className="text-gray-400 hover:text-white">
              Trang chủ
            </a>
            <span className="mx-2 text-gray-500">/</span>
            <span>{brandName}</span>
          </nav>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter bar */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <p className="text-gray-600">
              Hiển thị {products.length} sản phẩm
            </p>
            <select className="border rounded-lg px-4 py-2">
              <option>Mặc định</option>
              <option>Giá: Thấp đến Cao</option>
              <option>Giá: Cao đến Thấp</option>
              <option>Mới nhất</option>
              <option>Giảm giá nhiều nhất</option>
            </select>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            Mua Giày {brandName} Chính Hãng Tại Việt Nam
          </h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              <strong>{brandName}</strong> là một trong những thương hiệu giày
              thể thao hàng đầu thế giới, được yêu thích bởi hàng triệu người
              tiêu dùng. Tại Sneaker Store Vietnam, chúng tôi tự hào mang đến
              bộ sưu tập <strong>giày {brandName} chính hãng</strong> mới nhất
              với giá cạnh tranh nhất thị trường.
            </p>
            <h3>Tại sao chọn giày {brandName}?</h3>
            <ul>
              <li>Công nghệ đệm tiên tiến, êm ái suốt cả ngày</li>
              <li>Thiết kế thời thượng, phù hợp mọi phong cách</li>
              <li>Chất liệu cao cấp, độ bền vượt trội</li>
              <li>Đa dạng mẫu mã cho nam và nữ</li>
            </ul>
            <h3>Cam kết của chúng tôi</h3>
            <p>
              Tất cả sản phẩm {brandName} tại Sneaker Store đều là hàng chính
              hãng 100%, có đầy đủ tem nhãn và phụ kiện. Chúng tôi cam kết hoàn
              tiền 200% nếu phát hiện hàng giả.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
