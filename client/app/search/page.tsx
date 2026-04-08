import { Metadata } from "next";
import { Suspense } from "react";
import SearchPage from "@/components/SearchPage";

export const metadata: Metadata = {
  title: "Tìm kiếm sản phẩm | Sneaker Store",
  description:
    "Tìm kiếm những chiếc sneaker yêu thích của bạn tại Sneaker Store.",
};

function SearchPageContent() {
  return <SearchPage />;
}

export default function Search() {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-12">Đang tải...</div>}
    >
      <SearchPageContent />
    </Suspense>
  );
}
