import axios from "./axios.customize.js";

const getProductHomePage = async () => {
  return await axios.get("/products");
};

const getProductByFilter = async (params) => {
  return await axios.get("/products/filter", {
    params,
  });
};

const getProductDetail = async (id) => {
  return await axios.get(`/products/${id}`);
};

export { getProductHomePage, getProductByFilter, getProductDetail };
