"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  _id: string;
  userName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    userData: RegisterData,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  userName: string;
  telephone: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo từ localStorage khi component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch (error) {
        // Nếu parse lỗi, xóa dữ liệu cũ
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      }
    }
  }, []);

  // Hàm login
  const login = async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Decode token để lấy thông tin user (có thể dùng thư viện jwt-decode)
        const tokenPayload = JSON.parse(atob(data.accessToken.split(".")[1]));
        const userData: User = {
          _id: tokenPayload._id,
          userName: tokenPayload.userName,
          role: tokenPayload.role,
        };

        // Lưu vào state
        setToken(data.accessToken);
        setUser(userData);

        // Lưu vào localStorage
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("authUser", JSON.stringify(userData));

        return { success: true, message: "Đăng nhập thành công!" };
      } else {
        return {
          success: false,
          message: data || "Email hoặc mật khẩu không đúng",
        };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Lỗi kết nối. Vui lòng thử lại." };
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm register
  const register = async (
    userData: RegisterData,
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.text();

      if (response.ok) {
        return {
          success: true,
          message: "Đăng ký thành công! Vui lòng đăng nhập.",
        };
      } else {
        return { success: false, message: data || "Đăng ký thất bại" };
      }
    } catch (error) {
      console.error("Register error:", error);
      return { success: false, message: "Lỗi kết nối. Vui lòng thử lại." };
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
