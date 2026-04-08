import { Metadata } from "next";
import ProfilePage from "@/components/ProfilePage";

export const metadata: Metadata = {
  title: "Tài khoản của tôi | Sneaker Store",
  description: "Quản lý tài khoản và xem lịch sử đơn hàng của bạn.",
};

export default function Profile() {
  return <ProfilePage />;
}
