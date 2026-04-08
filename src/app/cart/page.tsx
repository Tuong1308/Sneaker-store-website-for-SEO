'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const TrashIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-md mx-auto">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h1 className="text-3xl font-bold mb-2">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-6">
            Hãy thêm sản phẩm yêu thích vào giỏ hàng của bạn
          </p>
          <Link
            href="/"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Product Image */}
                <Link href={`/san-pham/${item.product.slug}`} className="flex-shrink-0">
                  <div className="relative w-20 h-20 bg-gray-100 rounded">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-2"
                      sizes="80px"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-grow">
                  <Link href={`/san-pham/${item.product.slug}`}>
                    <h3 className="font-semibold hover:text-red-600 transition line-clamp-2">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600">{item.product.brand}</p>
                  <p className="text-lg font-bold text-red-600 mt-1">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 text-center w-12">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="px-3 py-1 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition p-1"
                    title="Xóa sản phẩm"
                  >
                    <TrashIcon />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tổng</p>
                  <p className="text-lg font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-red-500 hover:text-red-700 transition"
          >
            Xóa tất cả
          </button>
        </div>

        {/* Order Summary */}
        <div className="h-fit">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vận chuyển:</span>
                <span className="font-semibold text-green-600">Miễn phí</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Thuế:</span>
                <span className="font-semibold">Tính sau</span>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <span className="text-lg font-bold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(total)}
              </span>
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition mb-3">
              Thanh toán
            </button>

            <Link
              href="/"
              className="block text-center text-gray-600 hover:text-gray-900 transition py-2"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
