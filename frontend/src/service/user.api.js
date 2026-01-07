import axios from "./axios.customize.js";

const getUser = async (name, page) => {
  return await axios.get("/users", {
    params: {
      name,
      page,
    },
  });
};

const createUser = async (data) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("phone", data.phone);
  formData.append("role", data.role);
  formData.append("address", data.address);

  if (data.avatar) {
    formData.append("avatar", data.avatar);
  }

  return axios.post("users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateUser = async (data, userId) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("username", data.username);
  formData.append("phone", data.phone);
  formData.append("roleId", data.roleId);
  formData.append("address", data.address);

  if (data.password) {
    formData.append("password", data.password);
  }

  if (data.avatar instanceof File) {
    formData.append("avatar", data.avatar);
  }

  return axios.put(`users/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = async (userId) => {
  return await axios.delete(`users/${userId}`);
};

export { getUser, createUser, updateUser, deleteUser };
