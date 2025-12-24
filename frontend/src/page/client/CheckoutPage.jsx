import React from "react";
import { ChevronRight } from "lucide-react";
import CheckoutDetail from "@/components/client/CheckoutDetail";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link
          to="/"
          className="text-lime-600 font-medium hover:underline cursor-pointer"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Thanh Toán Giỏ Hàng</span>
      </nav>

      {/* 1. Bảng tóm tắt sản phẩm */}
      <CheckoutDetail />
    </div>
  );
};

export default CheckoutPage;
