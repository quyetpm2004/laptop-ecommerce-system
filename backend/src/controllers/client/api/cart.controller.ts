import { Request, Response } from "express";
import {
  handleAddProductToCart,
  handleDeleteCartDetail,
  handleGetCartByUserID,
  handleGetCartDetail,
  handleUpdateCardDetail,
  updateCartDetailBeforeCheckout,
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

const updateCartBeforeCheckout = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { data } = req.body;

    await updateCartDetailBeforeCheckout(data, userId);

    res.status(200).json({
      success: true,
      message: "Update cart success",
    });
  } catch (error) {
    console.error("Co loi xay ra", error.message);
    res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

const updateCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cartDetailId = Number(req.params.cartDetailId);
    const { delta } = req.body;

    await handleUpdateCardDetail(userId, cartDetailId, +delta);

    res.json({ message: "Updated", success: true });
  } catch (err) {
    console.log("Co loi xay ra", err);
    res.status(400).json({ message: "Server error" });
  }
};

const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const cartDetailId = Number(req.params.cartDetailId);

    await handleDeleteCartDetail(cartDetailId, userId);

    res.json({ message: "Deleted", success: true });
  } catch (err) {
    console.log("Co loi xay ra", err);
    res.status(400).json({ message: "Server error" });
  }
};

export {
  addProductToCart,
  getCartByUser,
  getCartDetailByUser,
  updateCartBeforeCheckout,
  updateCartItem,
  deleteCartItem,
};
