import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 500) {
      // eslint-disable-next-line no-console
      console.error("Server error", error);
    }
    return Promise.reject(error);
  },
);

