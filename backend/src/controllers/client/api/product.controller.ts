import { Request, Response } from "express";
import { handleGetProductWithFilter } from "services/filter.service";
import {
  handleGetAllProducts,
  handleGetDetailProduct,
} from "services/item.service";
import {
  handleCreateProduct,
  handleDeleteProduct,
  handleUpdateProduct,
} from "services/product.service";
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

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } =
      req.body;
    const image = req.file?.filename || "";
    const product = await handleCreateProduct(
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
      image
    );
    res.status(201).json({
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const image = req.file?.filename || "";

    const { name, price, detailDes, shortDesc, quantity, factory, target } =
      req.body;
    const product = await handleUpdateProduct(
      name,
      price,
      detailDes,
      shortDesc,
      quantity,
      factory,
      target,
      image,
      id
    );
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

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await handleDeleteProduct(id);
    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error("Co loi xay ra", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  getProductHomePage,
  getProductByFilter,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
