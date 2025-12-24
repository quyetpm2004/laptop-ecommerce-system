import React from "react";
import SidebarProduct from "@/components/client/SidebarProduct";
import MainProduct from "@/components/client/MainProduct";

const ProductPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      <SidebarProduct />
      <MainProduct />
    </div>
  );
};

export default ProductPage;
