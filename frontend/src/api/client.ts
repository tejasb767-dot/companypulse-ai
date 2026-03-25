import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "tejas_secret_key",
  },
});

export default api;