import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  headers: {
    "Accept-Language": "ar",
  },
});

const axiosInstanceWithToken = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, 
  headers: {
    "Accept-Language": "ar",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export { axiosInstance, axiosInstanceWithToken };