import { Request, Response } from "express";
import {
  handleCountTotalOrderPage,
  handleGetAllOrders,
  handleGetDetailOrder,
} from "services/order.service";

const getDetailOrder = async (req: Request, res: Response) => {
  // get order
  const orderId = req.params.id;

  try {
    const orderDetails = await handleGetDetailOrder(+orderId);
    res.status(200).json({ success: true, data: orderDetails });
  } catch (error) {
    console.error("Error fetching order details:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  const { page } = req.query;
  try {
    const orders = await handleGetAllOrders(+page);
    const totalPage = await handleCountTotalOrderPage();
    res.status(200).json({
      success: true,
      data: {
        orders,
        totalPage,
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { getDetailOrder, getAllOrders };
