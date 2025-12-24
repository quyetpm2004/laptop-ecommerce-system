import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CardDetail from "@/components/client/CardDetail";
import OrderInfo from "@/components/client/OrderInfo";

const CartPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link
          to={"/"}
          className="text-lime-600 font-medium hover:underline cursor-pointer"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Chi Tiết Giỏ Hàng</span>
      </nav>

      <CardDetail />
      <OrderInfo />
    </div>
  );
};

export default CartPage;
