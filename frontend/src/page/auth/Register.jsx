import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.fullName || !form.email || !form.password) {
      return alert("Vui lòng nhập đầy đủ Full Name, Email và Password");
    }

    const success = await register({
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      address: form.address,
      phone: form.phone,
    });

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Main container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full md:w-1/2 bg-slate-900 p-12 flex flex-col items-center justify-center text-center text-white">
          <img
            src="/image/test/login.jpg"
            alt="Laptop workspace"
            className="w-full max-w-md rounded-xl shadow-lg mb-8"
          />

          <h1 className="text-3xl font-bold">Join Our Laptop Store</h1>
          <p className="text-slate-300 mt-3 text-lg">
            High Performance • Modern Design • Trusted Quality
          </p>

          {/* Decorative blur */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full"></div>
        </div>

        {/* Right panel - Register form */}
        <div className="w-full md:w-1/2 p-12 lg:p-12 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-slate-500 mb-8">
            Sign up to manage orders and explore the latest laptops
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label className="text-slate-600">Full Name</Label>
              <Input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                className="rounded-xl border-slate-200 py-6 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600">Email</Label>
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="mail@abc.com"
                className="rounded-xl border-slate-200 py-6 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600">Password</Label>
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Minimum 6 characters"
                className="rounded-xl border-slate-200 py-6 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600">Địa chỉ</Label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Nhập địa chỉ"
                className="rounded-xl border-slate-200 py-6 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-600">Số điện thoại</Label>
              <Input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className="rounded-xl border-slate-200 py-6 focus:border-blue-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 text-lg rounded-xl transition-all"
            >
              {loading ? "Đang tạo tài khoản..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
