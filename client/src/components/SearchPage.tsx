"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { Product, formatPrice } from "@/lib/products";
import Link from "next/link";

interface BackendProduct {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  category: string;
  sizes: Record<string, number>;
  description: string;
  quantity: number;
  images: string[];
}

interface PriceRange {
  min: number;
  max: number;
  label: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PRICE_RANGES: PriceRange[] = [
  { min: 0, max: 2000000, label: "Dưới 2 triệu" },
  { min: 2000000, max: 4000000, label: "2 - 4 triệu" },
  { min: 4000000, max: 6000000, label: "4 - 6 triệu" },
  { min: 6000000, max: 10000000, label: "6 - 10 triệu" },
  { min: 10000000, max: Infinity, label: "Trên 10 triệu" },
];

const AVAILABLE_SIZES = [
  "US6",
  "US6_5",
  "US7",
  "US7_5",
  "US8",
  "US8_5",
  "US9",
  "US9_5",
  "US10",
  "US10_5",
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedPrices, setSelectedPrices] = useState<Set<string>>(new Set());
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set());
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from search API
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setFilteredProducts([]);
      return;
    }

    fetchProducts();
  }, [query]);

  useEffect(() => {
    applyFilters();
  }, [products, selectedPrices, selectedSizes]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const searchUrl = new URL(`${API_BASE_URL}/api/product/search`);
      searchUrl.searchParams.append("q", query);

      console.log("Fetching from:", searchUrl.toString());

      const response = await fetch(searchUrl.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);
        throw new Error(`Lỗi API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (!data.success) {
        throw new Error(data.error || "API trả về lỗi");
      }

      const transformed = transformProducts(data.data || []);
      setProducts(transformed);
      setSelectedPrices(new Set()); // Reset filters
      setSelectedSizes(new Set());
    } catch (err) {
      console.error("Search error:", err);
      let errorMessage = "Lỗi khi tìm kiếm sản phẩm";

      if (err instanceof TypeError && err.message.includes("fetch")) {
        errorMessage =
          "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const transformProducts = (backendProducts: BackendProduct[]): Product[] => {
    return backendProducts.map((p) => ({
      id: p._id as unknown as number,
      name: p.productName,
      brand: p.brand,
      price: p.price,
      image: p.images?.[0] || "/placeholder.png",
      slug: p.productName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
      category: p.category,
      description: p.description,
      sizes: Object.keys(p.sizes || {})
        .filter((size) => p.sizes[size] > 0)
        .map((size) => size.replace("_", "."))
        .join(", "),
      originalPrice: null,
      discount: null,
      specs: "",
      careGuide: "",
      storageGuide: "",
    }));
  };

  const applyFilters = () => {
    let result = [...products];

    // Price filter
    if (selectedPrices.size > 0) {
      result = result.filter((product) => {
        return Array.from(selectedPrices).some((priceKey) => {
          const range = PRICE_RANGES[parseInt(priceKey)];
          return product.price >= range.min && product.price <= range.max;
        });
      });
    }

    // Size filter
    if (selectedSizes.size > 0) {
      result = result.filter((product) => {
        if (!product.sizes) return false;
        const productSizes = product.sizes
          .split(", ")
          .map((s) => s.replace(".", "_"));
        return Array.from(selectedSizes).some((size) =>
          productSizes.some((ps) => ps.includes(size)),
        );
      });
    }

    setFilteredProducts(result);
  };

  const togglePriceFilter = (index: number) => {
    const key = index.toString();
    const newPrices = new Set(selectedPrices);
    if (newPrices.has(key)) {
      newPrices.delete(key);
    } else {
      newPrices.add(key);
    }
    setSelectedPrices(newPrices);
  };

  const toggleSizeFilter = (size: string) => {
    const newSizes = new Set(selectedSizes);
    if (newSizes.has(size)) {
      newSizes.delete(size);
    } else {
      newSizes.add(size);
    }
    setSelectedSizes(newSizes);
  };

  // UI Components
  const FilterCheckbox = ({
    id,
    label,
    checked,
    onChange,
  }: {
    id: string;
    label: string;
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-red-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="text-gray-500 hover:text-red-500 transition"
            >
              Trang chủ
            </Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="text-gray-900 font-medium">
            Tìm kiếm: &quot;{query}&quot;
          </li>
        </ol>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-2">Kết quả tìm kiếm</h1>
      <p className="text-gray-600 mb-8">
        "{query}"
        {filteredProducts.length > 0 && (
          <span className="text-red-600 font-medium">
            {" "}
            ({filteredProducts.length} sản phẩm)
          </span>
        )}
      </p>

      {loading ? (
        // Loading state
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tìm kiếm...</p>
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Lỗi</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <Link
            href="/"
            className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>
      ) : filteredProducts.length === 0 ? (
        // Empty state
        <div className="text-center py-20">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy sản phẩm
          </h2>
          <p className="text-gray-600 mb-8">
            Không có sản phẩm nào phù hợp với &quot;{query}&quot;
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
            >
              Tiếp tục mua sắm
            </Link>
            <button
              onClick={() => {
                setSelectedPrices(new Set());
                setSelectedSizes(new Set());
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:border-red-600 transition font-medium"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      ) : (
        // Content
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 sticky top-24 h-fit shadow-sm">
              <h2 className="text-lg font-bold mb-6">Bộ lọc</h2>

              {/* Price Filter */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Khoảng giá
                </h3>
                <div className="space-y-3">
                  {PRICE_RANGES.map((range, index) => (
                    <FilterCheckbox
                      key={index}
                      id={`price-${index}`}
                      label={range.label}
                      checked={selectedPrices.has(index.toString())}
                      onChange={() => togglePriceFilter(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">
                  Size
                </h3>
                <div className="space-y-3">
                  {AVAILABLE_SIZES.map((size) => (
                    <FilterCheckbox
                      key={size}
                      id={`size-${size}`}
                      label={size.replace("_", ".")}
                      checked={selectedSizes.has(size)}
                      onChange={() => toggleSizeFilter(size)}
                    />
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedPrices.size > 0 || selectedSizes.size > 0) && (
                <button
                  onClick={() => {
                    setSelectedPrices(new Set());
                    setSelectedSizes(new Set());
                  }}
                  className="w-full py-2 border border-gray-300 rounded-lg hover:border-red-600 hover:text-red-600 transition font-medium text-sm"
                >
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
