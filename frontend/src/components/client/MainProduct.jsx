import React from "react";
import ProductCard from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MainProduct = ({ products, loading, pagination, onPageChange }) => {
  const { currentPage, totalPages } = pagination;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (loading) {
    return (
      <main className="w-full md:w-3/4 flex justify-center py-20">
        <p className="text-lime-600 animate-pulse font-medium">
          Đang tải sản phẩm...
        </p>
      </main>
    );
  }

  return (
    <main className="w-full md:w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-500">
            Không có sản phẩm nào phù hợp với bộ lọc.
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`hover:text-lime-600 cursor-pointer ${
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>

            {pageNumbers.map((num) => (
              <PaginationItem key={num} className="cursor-pointer">
                <PaginationLink
                  isActive={currentPage === num}
                  className={
                    currentPage === num
                      ? "bg-lime-500 text-white hover:bg-lime-600"
                      : "hover:text-lime-600"
                  }
                  onClick={() => onPageChange(num)}
                >
                  {num}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                className={`hover:text-lime-600 cursor-pointer ${
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default MainProduct;
