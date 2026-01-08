import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { getOrderDetail } from "@/service/order.api";
// Giả sử bạn có hàm api này ở file khác, hoặc định nghĩa tại đây
// import { getOrderDetail } from "@/services/api";

const OrderTable = ({ orders }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewDetail = async (order) => {
    setSelectedOrder(order);
    setLoading(true);
    try {
      // Thay thế bằng hàm gọi API thực tế của bạn
      const res = await getOrderDetail(order.id);
      if (res && res.success) {
        setOrderDetails(res.data);
      }

      // Giả lập gọi API với dữ liệu mẫu của bạn
      console.log("Fetching detail for order:", order.id);
    } catch (error) {
      console.error("Failed to fetch order details", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  };

  return (
    <>
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment method</TableHead>
            <TableHead>Payment status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-muted/50">
              <TableCell>#{order.id}</TableCell>
              <TableCell className="font-medium">
                {formatCurrency(order.totalPrice)}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewDetail(order)}
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Sheet xem chi tiết sản phẩm trong đơn hàng */}
      <Sheet
        open={!!selectedOrder}
        onOpenChange={() => {
          setSelectedOrder(null);
          setOrderDetails([]);
        }}
      >
        <SheetContent className="sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Chi tiết đơn hàng #{selectedOrder?.id}</SheetTitle>
            <SheetDescription>
              Danh sách các sản phẩm khách hàng đã đặt.
            </SheetDescription>
          </SheetHeader>

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead className="text-center">SL</TableHead>
                    <TableHead className="text-right">Đơn giá</TableHead>
                    <TableHead className="text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={`${
                              import.meta.env.VITE_BASE_URL_BACKEND
                            }/images/product/${item.product.image}`}
                            alt={item.product.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                          <span className="font-medium text-sm line-clamp-2">
                            {item.product.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(item.price)}
                      </TableCell>
                      <TableCell className="text-right font-semibold text-sm">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span className="text-red-600">
                    {formatCurrency(selectedOrder?.totalPrice || 0)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default OrderTable;
