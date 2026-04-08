import { Metadata } from 'next';
import { getAllProducts } from '@/lib/products';
import { siteConfig } from '@/lib/seo';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Khuyến Mãi Giày Sneaker | Giảm Đến 40%',
  description:
    'Săn deal giày sneaker chính hãng giảm giá đến 40%. Nike, Adidas, Puma, HOKA, On Running, Under Armour, Asics sale hot nhất tháng này.',
  keywords: [
    'sneaker giảm giá',
    'khuyến mãi giày sneaker',
    'sale giày thể thao',
    'nike sale',
    'adidas sale',
  ],
  openGraph: {
    title: 'Khuyến Mãi Giày Sneaker | Giảm Đến 40%',
    description: 'Săn deal giày sneaker chính hãng giảm giá đến 40%',
    url: `${siteConfig.url}/khuyen-mai`,
    type: 'website',
  },
  alternates: {
    canonical: `${siteConfig.url}/khuyen-mai`,
  },
};

export default function SalePage() {
  const allProducts = getAllProducts();
  const saleProducts = allProducts
    .filter((p) => p.discount && p.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0));

  const maxDiscount = Math.max(...saleProducts.map((p) => p.discount || 0));

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <span className="text-6xl mb-4 block">🔥</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KHUYẾN MÃI HOT
          </h1>
          <p className="text-xl mb-2">
            Giảm đến <span className="font-bold text-yellow-300">{maxDiscount}%</span> cho các sản phẩm chính hãng
          </p>
          <p className="text-white/80">
            {saleProducts.length} sản phẩm đang giảm giá
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter by discount */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button className="bg-red-500 text-white px-6 py-2 rounded-full">
              Tất cả
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full hover:border-red-500">
              Giảm 20%+
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full hover:border-red-500">
              Giảm 30%+
            </button>
            <button className="border border-gray-300 px-6 py-2 rounded-full hover:border-red-500">
              Giảm 40%+
            </button>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {saleProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                Hiện tại chưa có sản phẩm khuyến mãi. Quay lại sau nhé!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">
            Săn Deal Giày Sneaker Giảm Giá
          </h2>
          <div className="prose prose-lg text-gray-700">
            <p>
              Đừng bỏ lỡ cơ hội sở hữu <strong>giày sneaker chính hãng</strong>{' '}
              với mức giá ưu đãi nhất! Sneaker Store Vietnam thường xuyên cập
              nhật các chương trình khuyến mãi hấp dẫn từ các thương hiệu hàng
              đầu như Nike, Adidas, Puma, HOKA, On Running, và nhiều hơn nữa.
            </p>
            <h3>Lưu ý khi mua hàng khuyến mãi</h3>
            <ul>
              <li>Số lượng có hạn, nhanh tay kẻo hết</li>
              <li>Kiểm tra size kỹ trước khi đặt hàng</li>
              <li>Không áp dụng cùng các khuyến mãi khác</li>
              <li>Sản phẩm sale vẫn được đổi trả theo chính sách</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
