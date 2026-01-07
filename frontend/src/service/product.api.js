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

const createProduct = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("detailDesc", data.detailDesc);
  formData.append("shortDesc", data.shortDesc);
  formData.append("quantity", data.quantity);
  formData.append("factory", data.factory);
  formData.append("target", data.target);

  if (data.image) {
    formData.append("image", data.image);
  }

  return axios.post("products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateProduct = async (data, productId) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("detailDesc", data.detailDesc);
  formData.append("shortDesc", data.shortDesc);
  formData.append("quantity", data.quantity);
  formData.append("factory", data.factory);
  formData.append("target", data.target);

  if (data.image instanceof File) {
    formData.append("image", data.image);
  }

  return axios.put(`products/${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProduct = async (userId) => {
  return await axios.delete(`products/${userId}`);
};

export {
  getProductHomePage,
  getProductByFilter,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
