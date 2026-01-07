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

export { placeOrder };
