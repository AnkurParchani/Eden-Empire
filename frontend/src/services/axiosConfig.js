import axios from "axios";

const axiosInstance = axios.create();

const cookieName = "jwt";

let cookieValue = document.cookie
  .split("; ")
  .find((cookie) => cookie.startsWith(cookieName));

if (cookieValue) cookieValue = cookieValue.split("=")[1];
else cookieValue = "";

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = cookieValue;
    config.headers["Authorization"] = `Bearer ${jwtToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
