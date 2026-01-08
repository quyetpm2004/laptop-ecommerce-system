import axios from "./axios.customize.js";

const placeOrder = async (
  receiverName,
  receiverAddress,
  receiverPhone,
  totalPrice
) => {
  return await axios.post(`/orders/place-order`, {
    receiverName,
    receiverAddress,
    receiverPhone,
    totalPrice,
  });
};

const getOrders = async (page) => {
  return await axios.get("/orders", {
    params: {
      page,
    },
  });
};

const getOrderDetail = async (orderId) => {
  return await axios.get(`/orders/${orderId}`);
};

export { placeOrder, getOrders, getOrderDetail };
