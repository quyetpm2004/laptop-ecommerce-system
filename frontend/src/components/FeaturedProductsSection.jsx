// src/components/FeaturedProductsSection.jsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

const ProductCard = ({ product }) => (
  <Card className="border-2 border-yellow-300/50 hover:border-lime-500 transition duration-300 py-0 gap-4 overflow-hidden">
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-50 object-cover rounded-t-lg hover:scale-110 transition-transform duration-500 ease-out"
      />
      <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
        {product.label}
      </span>
    </div>
    <CardContent className="p-4 text-center">
      <p className="text-base font-semibold text-lime-600">{product.name}</p>
      <p className="text-xs text-gray-500 mb-2">{product.specs}</p>
      <p className="text-lg font-bold text-orange-600">{product.price}</p>
    </CardContent>
    <CardFooter className="flex justify-center mb-4">
      <Button
        variant="outline"
        className="
      text-lime-600 
      border-lime-600
      transition-all 
      duration-300 
      ease-out
      hover:bg-lime-600
      hover:text-white
      hover:shadow-md
    "
      >
        <ShoppingBag className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
        Add to cart
      </Button>
    </CardFooter>
  </Card>
);

const FeaturedProductsSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Sản phẩm nổi bật</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold">
            All Products
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

        {/* Giả định các sản phẩm khác ở trang 2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
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
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious className="hover:text-lime-600" />
              </PaginationItem>

              {/* Page 1 (active) */}
              <PaginationItem>
                <PaginationLink
                  isActive
                  className="bg-lime-500 text-white hover:bg-lime-600"
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Page 2 */}
              <PaginationItem>
                <PaginationLink className="hover:text-lime-600">
                  2
                </PaginationLink>
              </PaginationItem>

              {/* Next */}
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
