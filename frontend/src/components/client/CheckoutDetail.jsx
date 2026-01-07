import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { placeOrder } from "@/service/order.api";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
const CheckoutDetail = ({ cartItems }) => {
  const { getCart } = useCartStore();
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + " đ";
  };

  const handlePlaceOrder = async () => {
    if (!receiverName || !receiverAddress || !receiverPhone) {
      toast.error("Vui lòng nhập đầy đủ thông tin người nhận");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Giỏ hàng đang trống");
      return;
    }

    try {
      const res = await placeOrder(
        receiverName,
        receiverAddress,
        receiverPhone,
        total
      );

      if (res.success) {
        getCart();
        toast.success("Đặt hàng thành công");
      } else {
        toast.error(res.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra", error);
      toast.error("Không thể đặt hàng, vui lòng thử lại");
    }
  };

  return (
    <>
      {/* 1. Bảng tóm tắt sản phẩm */}
      <div className="bg-white rounded-lg shadow-sm border mb-12 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[100px]">Sản phẩm</TableHead>
              <TableHead>Tên</TableHead>
              <TableHead className="text-center">Giá cả</TableHead>
              <TableHead className="text-center">Số lượng</TableHead>
              <TableHead className="text-center">Thành tiền</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="w-16 h-16 rounded-full overflow-hidden border">
                    <img
                      src={`${
                        import.meta.env.VITE_BASE_URL_BACKEND
                      }/images/product/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-lime-600 font-semibold">
                    {item.name}
                  </span>
                </TableCell>
                <TableCell className="text-center font-medium">
                  {formatCurrency(item.price)}
                </TableCell>
                <TableCell className="text-center">
                  <span className="bg-gray-100 px-6 py-1 rounded-md font-medium text-gray-600">
                    {item.quantity}
                  </span>
                </TableCell>
                <TableCell className="text-center font-semibold text-gray-700">
                  {formatCurrency(item.price * item.quantity)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 2. Thông tin người nhận (Bên trái) */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700 tracking-tight">
            Thông Tin Người Nhận
          </h2>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-500 font-normal">
                Tên người nhận
              </Label>
              <Input
                id="name"
                value={receiverName}
                onChange={(e) => setReceiverName(e.target.value)}
                className="rounded-full border-gray-300 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-500 font-normal">
                Địa chỉ người nhận
              </Label>
              <Input
                id="address"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className="rounded-full border-gray-300 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-500 font-normal">
                Số điện thoại
              </Label>
              <Input
                id="phone"
                value={receiverPhone}
                onChange={(e) => setReceiverPhone(e.target.value)}
                className="rounded-full border-gray-300 h-11"
              />
            </div>
          </form>

          <button className="flex items-center text-lime-600 font-medium hover:underline pt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <Link to="/cart">Quay lại giỏ hàng</Link>
          </button>
        </div>

        {/* 3. Thông tin thanh toán (Bên phải) */}
        <div className="bg-gray-50/50 rounded-2xl border p-8 space-y-8 h-fit">
          <h2 className="text-4xl font-semibold text-gray-700">
            Thông Tin Thanh Toán
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600 font-medium">Phí vận chuyển</span>
              <span className="font-semibold text-gray-500">
                {formatCurrency(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between items-center text-lg">
              <span className="text-gray-600 font-medium">Hình thức</span>
              <span className="text-gray-500">
                Thanh toán khi nhận hàng (COD)
              </span>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold text-gray-800">
                  Tổng số tiền
                </span>
                <span className="text-2xl font-semibold text-gray-400">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handlePlaceOrder}
              className="w-full sm:w-auto rounded-full bg-white border-2 border-yellow-400 text-lime-600 hover:bg-lime-500 hover:text-white px-10 py-6 font-semibold uppercase tracking-wider transition-all shadow-sm"
            >
              Xác nhận thanh toán
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutDetail;
