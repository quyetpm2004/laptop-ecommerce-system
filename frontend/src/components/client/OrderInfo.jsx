import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const OrderInfo = ({ cartItems }) => {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = 0;
  const total = subtotal + shippingFee;
  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + " đ";
  };

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12">
      <div className="md:col-span-5 bg-gray-50/50 rounded-2xl border p-8 space-y-6">
        <h2 className="text-4xl font-semibold text-gray-700 mb-8">
          Thông Tin Đơn Hàng
        </h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600 font-medium">Tạm tính:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600 font-medium">Phí vận chuyển:</span>
            <span className="font-semibold">{formatCurrency(shippingFee)}</span>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center text-xl">
              <span className="text-gray-800 font-semibold">Tổng số tiền</span>
              <span className="text-lime-600 font-bold">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={() => navigate("/checkout")}
            className="w-full sm:w-auto rounded-full bg-white border-2 border-yellow-400 text-lime-600 hover:bg-lime-500 hover:text-white px-10 py-6 font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            Xác nhận thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
