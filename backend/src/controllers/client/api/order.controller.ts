import { Request, Response } from "express";
import { handlePlaceOrder } from "services/item.service";
import { handleGetOrderHistory } from "services/order.service";

const placeOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { receiverName, receiverAddress, receiverPhone, totalPrice } =
      req.body;

    const response = await handlePlaceOrder(
      userId,
      receiverName,
      receiverAddress,
      receiverPhone,
      +totalPrice
    );
    res.status(200).json({
      data: response,
      success: true,
    });
  } catch (error) {
    console.error("Co loi xay ra", error.message);
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

const getOrderHistory = async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const history = await handleGetOrderHistory(id);
    res.status(200).json({
      data: history,
      success: true,
    });
  } catch (error) {
    console.error("Co loi xay ra", error.message);
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export { placeOrder, getOrderHistory };
