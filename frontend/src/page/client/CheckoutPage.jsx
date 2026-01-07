import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import CheckoutDetail from "@/components/client/CheckoutDetail";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { getDetailCart } from "@/service/cart.api";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { totalProductInCard } = useCartStore();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailCart();
      if (res.data) {
        setCartItems(res.data);
      }
    };
    if (totalProductInCard > 0) fetchData();
  }, []);
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

      {totalProductInCard > 0 ? (
        <CheckoutDetail cartItems={cartItems} />
      ) : (
        <>
          <main>
            Vui lòng thêm sản phẩm vào giỏ hàng trước khi thực hiện thao tác này
          </main>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
