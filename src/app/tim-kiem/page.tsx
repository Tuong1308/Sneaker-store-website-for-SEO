import { getAllProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Tìm kiếm sản phẩm | Sneaker Store',
  description: 'Tìm kiếm giày sneaker chính hãng tại Sneaker Store.',
};

interface Props {
  searchParams: {
    q?: string;
  };
}

export default function SearchPage({ searchParams }: Props) {
  const query = searchParams.q || '';
  const allProducts = getAllProducts();
  
  const searchResults = query 
    ? allProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Kết quả tìm kiếm
          </h1>
          {query ? (
            <p className="text-lg text-gray-600">
              Tìm thấy <span className="font-bold text-gray-900">{searchResults.length}</span> kết quả cho "{query}"
            </p>
          ) : (
            <p className="text-lg text-gray-600">
              Vui lòng nhập từ khóa để tìm kiếm sản phẩm.
            </p>
          )}
        </div>

        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm nào</h2>
            <p className="text-gray-500 mb-6">
              Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa "{query}".
            </p>
            <p className="text-gray-500">
              Hãy thử sử dụng các từ khóa chung chung hơn hoặc kiểm tra lại lỗi chính tả.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}