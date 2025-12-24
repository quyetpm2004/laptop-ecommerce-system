import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND + "/api",
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const persistedData = localStorage.getItem("auth_storage");

    let token = null;
    if (persistedData) {
      try {
        const parsed = JSON.parse(persistedData);
        token = parsed?.state?.accessToken || null; // 👈 lấy đúng token
      } catch (e) {
        console.error("❌ Lỗi parse auth_storage:", e);
      }
    }

    // Thêm header Authorization nếu có token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "Có lỗi xảy ra";

    return Promise.reject({
      status: error?.response?.status,
      message,
      data: error?.response?.data,
    });
  }
);

export default instance;
