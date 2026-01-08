import axios from "./axios.customize.js";

const getDashboard = async () => {
  return await axios.get("/dashboard");
};

export { getDashboard };
