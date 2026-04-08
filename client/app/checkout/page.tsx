import { Metadata } from "next";
import CheckoutPage from "@/components/CheckoutPage";

export const metadata: Metadata = {
  title: "Thanh toán | Sneaker Store",
  description: "Hoàn tất đơn hàng của bạn tại Sneaker Store.",
};

export default function Checkout() {
  return <CheckoutPage />;
}
