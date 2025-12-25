import { Request, Response } from "express";
import { handleGetAllProducts } from "services/item.service";
import { ITEM_PER_PAGE } from "src/utils/constant";

const getProductHomePage = async (req: Request, res: Response) => {
  try {
    const products = await handleGetAllProducts(1, ITEM_PER_PAGE);
    res.status(200).json({
      data: products,
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

export { getProductHomePage };
