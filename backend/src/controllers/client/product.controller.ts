import { Request, Response } from "express";
import {
  filterFactory,
  filterTwoFactory,
  productMinPrice,
  userFilter,
} from "services/filter.service";
import {
  handleAddProductToCart,
  handleCountTotalProductClientPage,
  handleDeleteCartDetail,
  handleGetAllProducts,
  handleGetDetailProduct,
  handleGetProductInCart,
  handlePlaceOrder,
  updateCartDetailBeforeCheckout,
} from "services/item.service";

// client product controller
const getDetailProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  // Here you would typically fetch the product details from a database using the productId
  // For now, we will just render the detail page without actual data

  const product = await handleGetDetailProduct(productId);

  return res.render("client/product/detail.ejs", { product });
};

const postProductToCart = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user = req.user;
  const { quantity } = req.body;
  if (user && quantity) {
    await handleAddProductToCart(+quantity, +productId, user);
    return res.redirect("/");
  } else if (user) {
    // call service
    await handleAddProductToCart(1, +productId, user);
    res.redirect("/");
  } else {
    res.redirect("/login");
  }
};

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) res.redirect("/");

  const cartDetails = await handleGetProductInCart(+user.id);

  const totalPrice = cartDetails
    .map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);

  return res.render("client/product/cart.ejs", {
    cartDetails,
    totalPrice,
  });
};

const postDeleteCardDetail = async (req: Request, res: Response) => {
  const sumCart = req.user.sumCart;
  const userId = req.user.id;
  const cartDetailId = req.params.id;

  await handleDeleteCartDetail(+cartDetailId, +sumCart, +userId);

  res.redirect("/cart");
};

const getCheckoutPage = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) res.redirect("/");

  const cartDetails = await handleGetProductInCart(+user.id);

  const totalPrice = cartDetails
    .map((item) => +item.price * +item.quantity)
    ?.reduce((a, b) => a + b, 0);

  return res.render("client/product/checkout.ejs", {
    cartDetails,
    totalPrice,
  });
};

const postToCheckout = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) return res.redirect("/login");

  const currentCartDetail: { id: string; quantity: string }[] =
    req.body?.cartDetails ?? [];

  await updateCartDetailBeforeCheckout(currentCartDetail, user.id);

  console.log(req.body);
  return res.redirect("/checkout");
};

const postPlaceOrder = async (req: Request, res: Response) => {
  const user = req.user;
  const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

  if (!user) return res.redirect("/login");

  try {
    await handlePlaceOrder(
      user.id,
      receiverName,
      receiverAddress,
      receiverPhone,
      +totalPrice
    );
    return res.redirect("/thanks");
  } catch (error) {
    console.log(error.message);
    return res.redirect("/checkout");
  }
};

const getThanksPage = (req: Request, res: Response) => {
  return res.render("client/product/thank.ejs");
};

const getProductPageClient = async (req: Request, res: Response) => {
  const { page } = req.query;
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const totalPages = await handleCountTotalProductClientPage(6);
  const products = await handleGetAllProducts(currentPage, 6);

  return res.render("client/product/filter.ejs", {
    products,
    totalPages,
    page: +currentPage,
  });
};

export {
  getDetailProduct,
  postProductToCart,
  getCartPage,
  postDeleteCardDetail,
  getCheckoutPage,
  postToCheckout,
  postPlaceOrder,
  getThanksPage,
  getProductPageClient,
};
