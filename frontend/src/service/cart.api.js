import axios from "./axios.customize.js";

const getCart = async () => {
  return await axios.get("/cart");
};

const getDetailCart = async () => {
  return await axios.get("/cart/detail");
};

const addProductToCard = async (productId, quantity) => {
  return await axios.post(`/cart`, {
    productId,
    quantity,
  });
};

export { getCart, getDetailCart, addProductToCard };
