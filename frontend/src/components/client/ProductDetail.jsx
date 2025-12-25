import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  ChevronRight,
  Apple,
} from "lucide-react";

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { name: "Apples", count: 3 },
    { name: "Oranges", count: 5 },
    { name: "Strawbery", count: 2 },
    { name: "Banana", count: 8 },
    { name: "Pumpkin", count: 5 },
  ];
  return (
    <>
      {product ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="border rounded-xl overflow-hidden shadow-sm">
                <img
                  src={`${
                    import.meta.env.VITE_BASE_URL_BACKEND
                  }/images/product/${product.image}`}
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <h1 className="text-3xl font-semibold text-gray-800">
                {product.name}
              </h1>
              <p className="text-gray-500 font-medium">{product.factory}</p>

              <div className="text-2xl font-semibold text-gray-900">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </div>

              {/* Đánh giá sao */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 fill-yellow-400 text-yellow-400`}
                  />
                ))}
              </div>

              <p className="text-gray-600 italic">{product.shortDesc}</p>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center border rounded-full px-2 py-1 bg-gray-50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button className="rounded-full bg-white border-2 border-yellow-400 text-lime-600 hover:bg-lime-500 hover:text-white px-8 h-11 font-semiboldtransition-all shadow-sm">
                  <ShoppingBag className="w-4 h-4 mr-1" />
                  Add to cart
                </Button>
              </div>
            </div>

            {/* Khối bên phải: Categories Sidebar */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 tracking-tight">
                Categories
              </h3>
              <ul className="space-y-4">
                {categories.map((cat) => (
                  <li
                    key={cat.name}
                    className="flex justify-between items-center group cursor-pointer"
                  >
                    <div className="flex items-center text-gray-600 group-hover:text-lime-600 transition-colors">
                      <Apple className="w-4 h-4 mr-2 fill-lime-500 text-lime-500" />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({cat.count})</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Phần mô tả dưới cùng */}
          <div className="mt-16">
            <div className="inline-block border-b-2 border-yellow-400 pb-2 mb-6">
              <h3 className="text-lg font-semiboldtext-gray-800 tracking-wide">
                Description
              </h3>
            </div>
            <div className="bg-white py-2 rounded-lg text-gray-600 leading-relaxed max-w-4xl">
              {product.detailDesc}
            </div>
          </div>
        </>
      ) : (
        <>
          <main className="w-full flex justify-center py-20">
            <p className="text-lime-600 animate-pulse font-medium">
              Không tìm thấy sản phẩm...
            </p>
          </main>
        </>
      )}
    </>
  );
};

export default ProductDetail;
