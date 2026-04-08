import { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Đăng ký | Sneaker Store",
  description:
    "Tạo tài khoản mới tại Sneaker Store để nhận ưu đãi và theo dõi đơn hàng.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
