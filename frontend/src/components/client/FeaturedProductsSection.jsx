// src/components/FeaturedProductsSection.jsx
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "./ProductCart";
import { Link } from "react-router-dom";

const products = [
  // Dữ liệu mẫu
  {
    name: "Laptop Asus TUF Gaming",
    specs: "Intel Core i5, 11400H",
    price: "17.490.000 ₫",
    label: "Laptop",
    image: "/image/test/1711078452562-dell-01.png",
  },
  {
    name: "Laptop Dell Inspiron 15",
    specs: "i5-735U/16GB/512GB/15.6''HD",
    price: "15.490.000 ₫",
    label: "Laptop",
    image: "/image/test/1711078452562-dell-01.png",
  },
  {
    name: "Lenovo IdeaPad Gaming 3",
    specs: "i5-10300H, RAM 8G",
    price: "19.500.000 ₫",
    label: "Laptop",
    image: "/image/test/1711078452562-dell-01.png",
  },
  {
    name: "Asus K501UX",
    specs: "VGA NVIDIA GTX 950M-4G",
    price: "11.900.000 ₫",
    label: "Laptop",
    image: "/image/test/1711078452562-dell-01.png",
  },
];

const FeaturedProductsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
          <Link
            to="/product"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded px-4 py-2"
          >
            All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {/* Giả định các sản phẩm khác ở trang 2 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard
              key={index + 4}
              product={{ ...product, name: product.name + " (2)" }}
            />
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="hover:text-lime-600" />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  isActive
                  className="bg-lime-500 text-white hover:bg-lime-600"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink className="hover:text-lime-600">
                  2
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext className="hover:text-lime-600" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
