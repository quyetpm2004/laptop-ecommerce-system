import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#c9d6b2] p-4">
      {/* Container chính */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-[40px] overflow-hidden shadow-2xl">
        {/* Bên trái: Illustration */}
        <div className="relative w-full md:w-1/2 bg-[#b1cb83] p-12 flex flex-col items-center justify-center text-center">
          <div className="relative mb-8 w-full max-w-[400px]">
            <img
              src="/image/test/login.jpg"
              alt="Illustration"
              className="w-full mix-blend-multiply opacity-80"
            />
            <div className="absolute -inset-4 bg-green-500/10 blur-3xl -z-10 rounded-full"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-[#5c1c4e]">
              Create your account.
            </h1>
            <p className="text-[#8c6a85] text-lg">
              Join us and explore powerful laptops made for performance.
            </p>
          </div>

          <div className="absolute top-10 left-10 w-20 h-20 bg-red-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Bên phải: Register Form */}
        <div className="w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-10 flex justify-center md:justify-start">
            <div className="flex flex-col items-center">
              <div className="w-10 h-1 bg-[#5c1c4e] rounded-full mb-1"></div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#5c1c4e] rounded-full"></div>
                <div className="w-6 h-1 bg-[#5c1c4e] rounded-full"></div>
                <div className="w-2 h-2 bg-[#5c1c4e] rounded-full"></div>
              </div>
              <div className="w-10 h-1 bg-[#5c1c4e] rounded-full mt-1"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Register to start your journey with us
          </p>

          {/* Form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-gray-600">Full Name</Label>
              <Input
                type="text"
                placeholder="John Doe"
                className="rounded-xl border-gray-200 py-6"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600">Email</Label>
              <Input
                type="email"
                placeholder="mail@abc.com"
                className="rounded-xl border-gray-200 py-6"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600">Password</Label>
              <Input
                type="password"
                placeholder="Min. 8 characters"
                className="rounded-xl border-gray-200 py-6"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600">Confirm Password</Label>
              <Input
                type="password"
                placeholder="Repeat your password"
                className="rounded-xl border-gray-200 py-6"
              />
            </div>

            <Button className="w-full bg-lime-600 hover:bg-lime-500 text-white py-6 text-lg rounded-xl transition-all">
              Register
            </Button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
