import { Request, Response } from "express";
import { handleGetProductWithFilter } from "services/filter.service";
import {
  handleGetAllProducts,
  handleGetDetailProduct,
} from "services/item.service";
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

const getProductByFilter = async (req: Request, res: Response) => {
  try {
    const { page, limit, factory, target, price, sort } = req.query;

    const data = await handleGetProductWithFilter(
      Number(page),
      Number(limit),
      factory as string | undefined,
      target as string | undefined,
      price as string | undefined,
      sort as string | undefined
    );
    res.status(200).json({
      data: data.products,
      meta: data.meta,
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

const getProductDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await handleGetDetailProduct(id);
    res.status(200).json({
      data: product,
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

export { getProductHomePage, getProductByFilter, getProductDetail };
