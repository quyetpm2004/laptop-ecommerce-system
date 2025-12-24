import React from "react";
import { Link } from "react-router-dom";
import ProductDetail from "@/components/client/ProductDetail";
import { ChevronRight } from "lucide-react";

const DetailPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link
          to="/"
          className="text-lime-600 font-medium hover:underline cursor-pointer"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Chi Tiết Sản Phẩm</span>
      </nav>

      <ProductDetail />
    </div>
  );
};

export default DetailPage;
