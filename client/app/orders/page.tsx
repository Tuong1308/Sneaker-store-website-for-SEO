import { Metadata } from "next";
import OrdersPage from "@/components/OrdersPage";

export const metadata: Metadata = {
  title: "Đơn hàng của tôi | Sneaker Store",
  description: "Xem và theo dõi đơn hàng của bạn tại Sneaker Store.",
};

export default function Orders() {
  return <OrdersPage />;
}
