import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductDetail from "@/components/client/ProductDetail";
import { ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import { getProductDetail } from "@/service/product.api";
const DetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProductDetail = async (productId) => {
    setLoading(true);
    try {
      const res = await getProductDetail(productId);
      if (res.data) {
        setProduct(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail(productId);
  }, [productId]);

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center text-sm text-gray-500 mb-8">
        <Link
          to="/"
          className="text-lime-600 font-medium hover:underline cursor-pointer"
        >
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span>Chi Tiết Sản Phẩm</span>
      </nav>

      <ProductDetail product={product} />
    </div>
  );
};

export default DetailPage;
