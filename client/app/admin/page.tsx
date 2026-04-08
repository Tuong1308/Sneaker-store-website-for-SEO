import { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Quản lý sản phẩm | Sneaker Store Admin",
  description: "Trang quản lý sản phẩm dành cho admin Sneaker Store.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
