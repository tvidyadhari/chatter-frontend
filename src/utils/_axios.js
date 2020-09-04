import axios from "axios";
import { refreshToken } from "../api/auth";

// axios default configuration
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";

// request interceptor: pass access-token in header for every request
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("at");
  if (accessToken) config.headers.authorization = `Bearer ${accessToken}`;
  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // refresh access token
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("auth")
    ) {
      originalRequest._retry = true;

      // if successful; retry original request
      if (await refreshToken()) return axios(originalRequest);
    }

    // if failed; logout user
    if (originalRequest._retry) {
      console.error("redirect to logout");
      window.location.href = "/logout";
    }
    if (error.response) return Promise.reject(error.response.data.error);
    return Promise.reject(new Error("Something went wrong"));
  }
);
