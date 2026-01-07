import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { addProductToCard } from "@/service/cart.api";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";

const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuthStore();
  const { getCart } = useCartStore();
  const handleAddProductToCard = async () => {
    if (!isAuthenticated) {
      toast.warning("Bạn phải đăng nhập để thực hiện chức năng này!");
      return;
    }
    const res = await addProductToCard(product.id, 1);
    if (res.success) {
      toast.success("Đã thêm vào giỏ hàng!");
      getCart();
    } else {
      toast.error("Có lỗi xảy ra!");
    }
  };
  return (
    <Card className="border-2 border-yellow-300/50 hover:border-lime-500 transition duration-300 py-0 gap-4 overflow-hidden">
      <div className="relative">
        <img
          src={`${import.meta.env.VITE_BASE_URL_BACKEND}/images/product/${
            product.image
          }`}
          alt={product.name}
          className="w-full h-50   object-cover rounded-t-lg hover:scale-110 transition-transform duration-500 ease-out"
        />
        <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {product.label}
        </span>
      </div>
      <CardContent className="p-4 text-center">
        <Link
          to={`/product/${product.id}`}
          className="text-base font-semibold text-lime-600"
        >
          {product.name}
        </Link>
        <p className="text-xs text-gray-500 mb-2">{product.shortDesc}</p>
        <p className="text-lg font-semibold text-black-500">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(product.price)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center mb-4">
        <Button
          onClick={handleAddProductToCard}
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
};

export default ProductCard;
