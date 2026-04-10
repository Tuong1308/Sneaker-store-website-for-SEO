import { Product } from './products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getAllProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/api/product`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter(
    (p) => p.brand.toLowerCase() === brand.toLowerCase()
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/product/search?q=${encodeURIComponent(query)}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data ?? [];
}