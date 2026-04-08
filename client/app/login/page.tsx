import { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Đăng nhập | Sneaker Store",
  description:
    "Đăng nhập vào tài khoản Sneaker Store để mua sắm và theo dõi đơn hàng.",
};

export default function LoginPage() {
  return <LoginForm />;
}
