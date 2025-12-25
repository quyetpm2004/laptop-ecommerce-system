import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductHomePage } from "@/service/product.api";

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductHomePage();

        if (res?.data) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Fetch products error:", error);
      }
    };

    fetchData();
  }, []);

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
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
