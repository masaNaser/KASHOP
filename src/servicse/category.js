import {axiosInstance} from "./api";

export const getCategories = async (userData) => {
  const response = await axiosInstance.get("/Categories", userData);
  return response;
};