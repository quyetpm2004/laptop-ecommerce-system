import { Request, Response } from "express";
import {
  handleAddProductToCart,
  handleGetCartByUserID,
  handleGetCartDetail,
} from "services/item.service";

const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const response = await handleAddProductToCart(
      +quantity,
      +productId,
      userId
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

const getCartByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const response = await handleGetCartByUserID(userId);
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

const getCartDetailByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const response = await handleGetCartDetail(userId);
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

export { addProductToCart, getCartByUser, getCartDetailByUser };
