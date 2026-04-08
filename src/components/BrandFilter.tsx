'use client';

import { useState } from 'react';

interface BrandFilterProps {
  brands: string[];
}

export default function BrandFilter({ brands }: BrandFilterProps) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => setSelectedBrand(null)}
        className={`px-6 py-2 rounded-full border transition ${
          selectedBrand === null
            ? 'bg-black text-white border-black'
            : 'border-gray-300 hover:border-black'
        }`}
      >
        Tất cả
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          onClick={() => setSelectedBrand(brand)}
          className={`px-6 py-2 rounded-full border transition ${
            selectedBrand === brand
              ? 'bg-black text-white border-black'
              : 'border-gray-300 hover:border-black'
          }`}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}
