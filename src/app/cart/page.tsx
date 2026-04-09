'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/products';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi nhé!
        </p>
        <Link 
          href="/san-pham" 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Giỏ hàng của bạn</h1>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="border-b border-gray-200 pb-4 mb-6 hidden sm:grid sm:grid-cols-6 gap-4 text-sm font-medium text-gray-500">
              <div className="col-span-3">Sản phẩm</div>
              <div className="col-span-1 text-center">Đơn giá</div>
              <div className="col-span-1 text-center">Số lượng</div>
              <div className="col-span-1 text-right">Tổng</div>
            </div>
            
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex flex-col sm:grid sm:grid-cols-6 gap-4 items-center border-b border-gray-100 pb-6">
                  {/* Product Info */}
                  <div className="col-span-3 flex w-full items-center gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link href={`/san-pham/${item.product.slug}`} className="font-medium text-gray-900 hover:text-primary line-clamp-2">
                        {item.product.name}
                      </Link>
                      <span className="text-sm text-gray-500 mt-1">Size: {item.size}</span>
                      <button 
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1 mt-2 w-fit"
                      >
                        <Trash2 className="w-4 h-4" /> Xóa
                      </button>
                    </div>
                  </div>
                  
                  {/* Price (Mobile: hidden, Desktop: visible) */}
                  <div className="col-span-1 text-center hidden sm:block font-medium text-gray-900">
                    {formatPrice(item.product.price)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="col-span-1 flex justify-center w-full sm:w-auto mt-4 sm:mt-0">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="col-span-1 text-right w-full sm:w-auto flex justify-between sm:block mt-4 sm:mt-0">
                    <span className="sm:hidden text-gray-500">Tổng:</span>
                    <span className="font-bold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <Link href="/san-pham" className="text-primary hover:underline font-medium">
                &larr; Tiếp tục mua sắm
              </Link>
              <button 
                onClick={clearCart}
                className="text-gray-500 hover:text-red-600 text-sm font-medium"
              >
                Xóa toàn bộ giỏ hàng
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
              
              <Link 
                href="/checkout"
                className="w-full block text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-md transition-colors"
              >
                Tiến hành thanh toán
              </Link>
              
              <div className="mt-6 text-sm text-gray-500 text-center">
                <p>Chúng tôi chấp nhận thanh toán qua thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và COD.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}