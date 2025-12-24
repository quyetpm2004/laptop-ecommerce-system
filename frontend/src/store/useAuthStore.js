import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";
import { registerApi, loginApi } from "@/service/auth";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,
      user: null,
      loading: false,

      // 🔹 Đăng nhập
      login: async (username, password) => {
        try {
          set({ loading: true });
          const res = await loginApi(username, password);

          set({
            accessToken: res.data.token,
            isAuthenticated: true,
            user: res.data.user,
          });

          toast.success("Đăng nhập thành công!", { id: "auth" });

          return true;
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.", {
            id: "auth",
          });
        } finally {
          set({ loading: false });
        }
      },

      register: async (payload) => {
        try {
          set({ loading: true });

          const res = await registerApi(payload);

          if (res.data) {
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.", {
              id: "register",
            });
          } else {
            toast.error(res.message);
            return false;
          }

          return true;
        } catch (error) {
          const message =
            error?.response?.data?.message ||
            error?.message ||
            "Đăng ký thất bại";

          toast.error(message, { id: "register" });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // 🔹 Đăng xuất
      logout: () => {
        set({
          accessToken: null,
          isAuthenticated: false,
          user: null,
        });
        localStorage.removeItem("auth_storage");
        toast.success("Đăng xuất thành công.", { id: "auth" });
      },

      setUser: (user) => set({ user }),
    }),

    {
      name: "auth_storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
