import React, { useEffect, useState } from "react";
import SidebarProduct from "@/components/client/SidebarProduct";
import MainProduct from "@/components/client/MainProduct";
import { getProductByFilter } from "@/service/product.api";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const [filters, setFilters] = useState({
    page: 1,
    limit: 9,
    factory: "",
    target: "",
    price: "",
    sort: "",
  });

  const fetchProducts = async (currentFilters) => {
    setLoading(true);
    try {
      const response = await getProductByFilter(currentFilters);

      if (response.success) {
        setProducts(response.data || []);
        setPagination({
          currentPage: response.meta?.page || 1,
          totalPages: response.meta?.totalPages || 1,
          totalItems: response.meta?.total || 0,
        });
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(filters);
  }, [filters.page, filters.sort]);

  const handleApplyFilter = (newFilters) => {
    const updated = { ...filters, ...newFilters, page: 1 };
    setFilters(updated);
    fetchProducts(updated);
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
      <SidebarProduct onFilter={handleApplyFilter} currentFilters={filters} />
      <MainProduct
        products={products}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
