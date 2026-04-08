'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getAllBrands } from '@/lib/products';
import { useCart } from '@/context/CartContext';

// SVG Icons
const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const brands = getAllBrands();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top bar */}
      <div className="bg-black text-white text-sm py-2">
        <div className="container mx-auto px-4 text-center">
          Miễn phí vận chuyển đơn hàng từ 2.000.000đ | Đổi trả trong 30 ngày
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            SNEAKER<span className="text-red-500">STORE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-red-500 transition">
              Trang chủ
            </Link>
            <div className="relative group">
              <button className="hover:text-red-500 transition flex items-center gap-1">
                Thương hiệu
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {brands.map((brand) => (
                  <Link
                    key={brand}
                    href={`/thuong-hieu/${brand.toLowerCase().replace(' ', '-')}`}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/khuyen-mai" className="text-red-500 font-semibold">
              Khuyến mãi
            </Link>
            <Link href="/lien-he" className="hover:text-red-500 transition">
              Liên hệ
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block hover:text-red-500 transition p-2">
              <SearchIcon />
            </button>
            <Link href="/cart" className="relative hover:text-red-500 transition p-2 group">
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden text-gray-600 hover:text-red-500 transition p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <Link href="/" className="hover:text-red-500 transition">
                Trang chủ
              </Link>
              <div>
                <button className="font-semibold mb-2 flex items-center gap-1">
                  Thương hiệu
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="pl-4 flex flex-col gap-2">
                  {brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/thuong-hieu/${brand.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-600 hover:text-red-500"
                    >
                      {brand}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/khuyen-mai" className="text-red-500 font-semibold">
                Khuyến mãi
              </Link>
              <Link href="/lien-he" className="hover:text-red-500 transition">
                Liên hệ
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
