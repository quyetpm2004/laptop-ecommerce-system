import axios from "./axios.customize.js";

const getProductHomePage = async () => {
  return await axios.get("/products");
};

export { getProductHomePage };
