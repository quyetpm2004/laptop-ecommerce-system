import axios from "./axios.customize.js";

const loginApi = async (email, password) => {
  return await axios.post("/auth/login", {
    email,
    password,
  });
};

const registerApi = async (payload) => {
  return await axios.post("/auth/register", payload);
};

export { loginApi, registerApi };
