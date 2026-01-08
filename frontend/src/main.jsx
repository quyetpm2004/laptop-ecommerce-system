import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/client/HomePage";
import Layout from "./page/client/Layout";
import ProductPage from "./page/client/ProductPage";
import LoginPage from "./page/auth/Login";
import RegisterPage from "./page/auth/Register";
import DetailPage from "./page/client/DetailPage";
import CartPage from "./page/client/CartPage";
import CheckoutPage from "./page/client/CheckoutPage";
import { Toaster } from "@/components/ui/sonner";
import ThanksPage from "./page/client/ThanksPage";
import ProtectedAuthPage from "./page/client/ProtectedAuthPage";
import AdminLayout from "./components/admin/layout/Layout";
import Dashboard from "./page/admin/Dashboard";
import User from "./page/admin/User";
import Product from "./page/admin/Product";
import Order from "./page/admin/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product", element: <ProductPage /> },
      { path: "product/:productId", element: <DetailPage /> },
    ],
  },

  {
    element: <ProtectedAuthPage />,
    children: [
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/thanks", element: <ThanksPage /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "user", element: <User /> },
      { path: "product", element: <Product /> },
      { path: "order", element: <Order /> },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" richColors />
  </React.StrictMode>
);
