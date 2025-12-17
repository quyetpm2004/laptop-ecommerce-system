import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCart";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MainProduct = () => {
  const products = [
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
  ];

  return (
    <main className="w-full md:w-3/4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
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

            {/* Page 2 */}
            <PaginationItem>
              <PaginationLink className="hover:text-lime-600">2</PaginationLink>
            </PaginationItem>

            {/* Next */}
            <PaginationItem>
              <PaginationNext className="hover:text-lime-600" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
};

export default MainProduct;
