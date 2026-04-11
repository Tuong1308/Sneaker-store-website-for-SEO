import productsData from '@/data/products.json';
import brandsData from '@/data/brands.json';

export interface Products {
  id: number;
  _id?: string;          
  name: string;
  slug: string;
  brand: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  image: string;
  images: string[];
  sizes: string;
  sizesObj?: {           
    US6?: number;
    US6_5?: number;
    US7?: number;
    US7_5?: number;
    US8?: number;
    US8_5?: number;
    US9?: number;
    US9_5?: number;
    US10?: number;
    US10_5?: number;
  };
  description: string;
  specs: string;
  careGuide: string;
  storageGuide: string;
  category: string;
  quantity: number;
}


export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
}
