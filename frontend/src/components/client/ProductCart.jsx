import { ShoppingBag } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }) => (
  <Card className="border-2 border-yellow-300/50 hover:border-lime-500 transition duration-300 py-0 gap-4 overflow-hidden">
    <div className="relative">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-50   object-cover rounded-t-lg hover:scale-110 transition-transform duration-500 ease-out"
      />
      <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
        {product.label}
      </span>
    </div>
    <CardContent className="p-4 text-center">
      <p className="text-base font-semibold text-lime-600">{product.name}</p>
      <p className="text-xs text-gray-500 mb-2">{product.specs}</p>
      <p className="text-lg font-semibold text-black-500">{product.price}</p>
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

export default ProductCard;
