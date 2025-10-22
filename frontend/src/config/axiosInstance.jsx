import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (no need to manually add token since it's in cookies)
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;