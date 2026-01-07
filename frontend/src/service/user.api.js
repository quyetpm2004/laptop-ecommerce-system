import axios from "./axios.customize.js";

/**
 * Response sample:
 {
    "data": {
        "users": [
            {
                "id": 1,
                "username": "quyet@gmail.com",
                "fullName": "New",
                "address": "hanoi",
                "phone": "0123",
                "accountType": "SYSTEM",
                "avatar": "38a1f5da-5869-48d5-b3fb-7ded96c457b5.jpg",
                "roleId": 2
            }
        ],
        "totalPages": 3
    },
    "success": true
}
 */

const getUser = async (name, page) => {
  return await axios.get("/users", {
    params: {
      name,
      page,
    },
  });
};

/**
 * Response sample:
{
    "data": {
        "id": 26,
        "username": "nobody@gmail.com",
        "password": "$2b$10$Y1HU2azm4JFgN5fX7numK.5lZC2F5vIWVB5n7k4G9pGJo2CA.1vDG",
        "fullName": "Quyet",
        "address": "hanoi",
        "phone": "123",
        "accountType": "SYSTEM",
        "avatar": "f9cdea7f-74ae-48e5-ba69-ace46562c59c.jpg",
        "roleId": 2
    },
    "success": true
}
 */

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
