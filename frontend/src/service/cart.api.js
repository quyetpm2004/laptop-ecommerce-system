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

const updateCart = async (data) => {
  return await axios.put(`/cart/before-checkout`, {
    data,
  });
};

const updateCartDetail = async (cartDetailId, delta) => {
  return await axios.put(`/cart/items/${cartDetailId}`, {
    delta,
  });
};

const deleteCartDetail = async (cartDetailId) => {
  return await axios.delete(`/cart/items/${cartDetailId}`);
};

export {
  getCart,
  getDetailCart,
  addProductToCard,
  updateCart,
  updateCartDetail,
  deleteCartDetail,
};
