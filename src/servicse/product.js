import {axiosInstance} from "./api";

export const getProducts = async () => {
  const response = await axiosInstance.get("/Products");
  return response;
};
export const getProductDetails = async (id) => {
  const response = await axiosInstance.get(`/Products/${id}`);
  return response;
};