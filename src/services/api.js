import axios from "axios";
import useAuthStore from "../store/useAuthStore"
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, 
  headers: {
    "Accept-Language": "ar",
  },
});
const token = useAuthStore.getState().token;

const axiosInstanceWithToken = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`, 
  headers: {
    "Accept-Language": "ar",
    Authorization: `Bearer ${token}`,
  },
});

export { axiosInstance, axiosInstanceWithToken };