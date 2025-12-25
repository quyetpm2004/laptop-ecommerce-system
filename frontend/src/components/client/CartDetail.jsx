import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus, X } from "lucide-react";
import { Link } from "react-router-dom";
const CardDetail = ({ cartItems }) => {
  // const updateQuantity = (id, delta) => {
  //   // setCartItems((prev) =>
  //   //   prev.map((item) =>
  //   //     item.id === id
  //   //       ? { ...item, quantity: Math.max(1, item.quantity + delta) }
  //   //       : item
  //   //   )
  //   // );
  // };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("vi-VN") + " đ";
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-8 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[100px]">Sản phẩm</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead className="text-center">Giá cả</TableHead>
            <TableHead className="text-center">Số lượng</TableHead>
            <TableHead className="text-center">Thành tiền</TableHead>
            <TableHead className="text-right">Xử lý</TableHead>
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
                <Link
                  to="/product/123"
                  className="text-lime-600 font-semibold hover:underline cursor-pointer"
                >
                  {item.name}
                </Link>
              </TableCell>
              <TableCell className="text-center font-medium">
                {formatCurrency(item.price)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-100"
                    // onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-gray-100"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center font-bold text-gray-700">
                {formatCurrency(item.price * item.quantity)}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                  onClick={() => removeItem(item.id)}
                >
                  <X className="h-5 w-5 border-2 border-red-500 rounded-full p-0.5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CardDetail;
