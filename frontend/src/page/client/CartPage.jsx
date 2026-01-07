import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import CardDetail from "@/components/client/CartDetail";
import OrderInfo from "@/components/client/OrderInfo";
import { getDetailCart } from "@/service/cart.api";
import { useCartStore } from "@/store/useCartStore";

const CartPage = () => {
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
          to={"/"}
          className="text-lime-600 font-medium hover:underline cursor-pointer"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Chi Tiết Giỏ Hàng</span>
      </nav>

      {cartItems.length > 0 ? (
        <>
          <CardDetail cartItems={cartItems} setCartItems={setCartItems} />
          <OrderInfo cartItems={cartItems} />
        </>
      ) : (
        <>
          <main>Giỏ hàng trống</main>
        </>
      )}
    </div>
  );
};

export default CartPage;
