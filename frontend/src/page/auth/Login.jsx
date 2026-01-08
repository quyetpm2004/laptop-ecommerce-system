import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng

import { useAuthStore } from "@/store/useAuthStore";

const LoginPage = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý Login
  const handleLogin = async (e) => {
    e.preventDefault(); // Ngăn trang web reload lại

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }

    try {
      setIsLoading(true);
      const result = await login(email, password);
      if (result.success) {
        if (result.data.user.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        return;
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert(
        error.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full md:w-1/2 bg-slate-900 p-12 flex flex-col items-center justify-center text-center text-white">
          <img
            src="/image/test/login.jpg"
            alt="Laptop"
            className="w-full max-w-md rounded-xl shadow-lg mb-8"
          />

          <h1 className="text-3xl font-bold">
            Premium Laptops for Professionals
          </h1>
          <p className="text-slate-300 mt-3 text-lg">
            Performance • Design • Reliability
          </p>
        </div>

        {/* Phần bên phải: Login Form */}
        <div className="w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Sign in to your account
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Manage your orders and explore latest laptops
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-600">Email</Label>
              <Input
                type="email"
                placeholder="mail@abc.com"
                className="rounded-xl border-gray-200 py-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Cập nhật state email
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600">Password</Label>
              <Input
                type="password"
                placeholder="Min. 6 characters"
                className="rounded-xl border-gray-200 py-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Cập nhật state password
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg rounded-xl transition-all"
            >
              {isLoading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not Registered Yet?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
