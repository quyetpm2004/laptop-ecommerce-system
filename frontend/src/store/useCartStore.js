import { getCart } from "@/service/cart.api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cartId: 0,
      totalProductInCard: 0,

      getCart: async () => {
        try {
          const res = await getCart();
          if (res.data) {
            set({
              cartId: res.data.id,
              totalProductInCard: res.data.sum,
            });
          } else {
            set({
              cartId: 0,
              totalProductInCard: 0,
            });
          }
        } catch (error) {
          console.error("Login error:", error);
        }
      },

      clearCart: () => {
        set({
          cartId: 0,
          totalProductInCard: 0,
        });
        localStorage.removeItem("cart");
      },
    }),
    {
      name: "cart",
      partialize: (state) => ({
        cartId: state.cartId,
        totalProductInCard: state.totalProductInCard,
      }),
    }
  )
);
