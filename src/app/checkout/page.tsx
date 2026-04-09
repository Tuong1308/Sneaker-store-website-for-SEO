'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/products';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showBankTransfer, setShowBankTransfer] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'cod' | 'transfer'>('cod');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  // Tạo orderNumber chỉ một lần khi component mount
  const [orderNumber, setOrderNumber] = useState<number>(0);

  useEffect(() => {
    // Chỉ tạo số đơn hàng một lần duy nhất
    const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
  }, []); // Mảng rỗng = chỉ chạy 1 lần khi mount

  // Xử lý khi chọn phương thức thanh toán
  const handlePaymentChange = (method: 'cod' | 'transfer') => {
    setSelectedPayment(method);
    setShowBankTransfer(method === 'transfer');
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <div className="bg-green-100 p-4 rounded-full mb-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Cảm ơn bạn đã mua sắm tại Sneaker Store. Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến bạn.
        </p>
        <Link 
          href="/" 
          className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-8 rounded-md transition-colors"
        >
          Trở về trang chủ
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
        <Link href="/" className="text-primary hover:underline">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Thanh toán</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Thông tin giao hàng</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Thông tin giao hàng */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Họ</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Tên</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng</label>
                  <input 
                    type="text" 
                    id="address" 
                    required 
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="Số nhà, tên đường, phường/xã..."
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Tỉnh/Thành phố</label>
                    <input 
                      type="text" 
                      id="city" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
                    <input 
                      type="text" 
                      id="district" 
                      required 
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-primary focus:border-primary outline-none"
                    />
                  </div>
                </div>

                {/* Phương thức thanh toán */}
                <div className="pt-6 border-t border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Phương thức thanh toán</h2>
                  
                  <div className="space-y-4">
                    {/* COD */}
                    <div className="flex items-center">
                      <input 
                        id="payment-cod" 
                        name="payment-method" 
                        type="radio" 
                        checked={selectedPayment === 'cod'}
                        onChange={() => handlePaymentChange('cod')}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="payment-cod" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                        Thanh toán khi nhận hàng (COD)
                      </label>
                    </div>

                    {/* Chuyển khoản ngân hàng */}
                    <div>
                      <div className="flex items-center">
                        <input 
                          id="payment-transfer" 
                          name="payment-method" 
                          type="radio" 
                          checked={selectedPayment === 'transfer'}
                          onChange={() => handlePaymentChange('transfer')}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <label htmlFor="payment-transfer" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                          Chuyển khoản ngân hàng
                        </label>
                      </div>

                      {/* Phần thông tin chuyển khoản hiện khi chọn */}
                      {showBankTransfer && (
                        <div className="mt-4 ml-7 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
                          <p className="text-sm text-gray-600 mb-4">
                            Hiện tại các cổng thanh toán đang gặp vấn đề. <br />
                            Xin lỗi vì sự bất tiện này. Bạn có thể chuyển khoản trực tiếp cho shop nhé!
                          </p>

                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Thông tin ngân hàng */}
                            <div className="flex-1 space-y-2 text-sm">
                              <div>
                                <span className="font-medium text-gray-900">Ngân hàng:</span> 
                                <span className="ml-2 text-gray-700">Vietcombank</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">Số tài khoản:</span> 
                                <span className="ml-2 font-mono text-gray-700">1030995840</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">Chủ tài khoản:</span> 
                                <span className="ml-2 text-gray-700">Nguyen Phuoc Thinh</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">Nội dung CK:</span> 
                                <span className="ml-2 text-gray-700">Đơn hàng #{orderNumber}</span>
                              </div>
                            </div>

                            {/* Mã QR */}
                            <div className="flex-shrink-0 text-center">
                              <p className="text-xs text-gray-500 mb-2">Quét mã QR để chuyển khoản</p>
                              <div className="">
                                <Image
                                  src="/Qr.jpg"
                                  alt="Mã QR chuyển khoản"
                                  width={160}
                                  height={160}
                                  className="mx-auto"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Nút đặt hàng */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Đang xử lý...' : 'Hoàn tất đặt hàng'}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Đơn hàng #{orderNumber}</h2>
              
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden border border-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900 flex items-center">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}