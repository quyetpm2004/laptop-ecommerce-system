import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductTable from "@/components/admin/product/ProductTable";
import CreateProductModal from "@/components/admin/product/CreateProductModal";
import UpdateProductModal from "@/components/admin/product/UpdateProductModal";
import {
  getProductByFilter,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/service/product.api";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Lấy danh sách sản phẩm từ API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // API thường nhận param search và page
      const res = await getProductByFilter({ page });
      if (res?.success) {
        setProducts(res.data);
        setTotalPages(res.meta.totalPages);
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Xử lý mở Modal cập nhật
  const handleEditTrigger = (product) => {
    setEditingProduct(product);
    setIsUpdateOpen(true);
  };

  // Xử lý Xóa sản phẩm
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Deleted successfully");

      fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  // Xử lý Tạo sản phẩm
  const handleCreateProduct = async (data) => {
    try {
      await createProduct(data);
      setIsCreateOpen(false);
      toast.success("Created successfully");

      fetchProducts();
    } catch (err) {
      console.error("Create product error:", err);
    }
  };

  // Xử lý Cập nhật sản phẩm
  const handleUpdateProduct = async (updatedData) => {
    try {
      await updateProduct(updatedData, editingProduct?.id);
      setIsUpdateOpen(false);
      setEditingProduct(null);
      toast.success("Updated successfully");

      fetchProducts();
    } catch (err) {
      console.error("Update product error:", err);
    }
  };

  // Xử lý chuyển trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-3xl mb-4">Manage Products</h2>
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create a new product
        </Button>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="min-h-[400px]">
        <ProductTable
          products={products}
          onEdit={handleEditTrigger}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="py-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className="cursor-pointer"
                    onClick={() => handlePageChange(page - 1)}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, idx) => (
                  <PaginationItem key={idx}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={page === idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => handlePageChange(page + 1)}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateProductModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreateProduct}
      />

      {/* Render Update Modal có điều kiện để tránh lỗi cascading renders */}
      {isUpdateOpen && (
        <UpdateProductModal
          isOpen={isUpdateOpen}
          productData={editingProduct}
          onClose={() => {
            setIsUpdateOpen(false);
            setEditingProduct(null);
          }}
          onUpdate={handleUpdateProduct}
        />
      )}
    </div>
  );
};

export default Product;
