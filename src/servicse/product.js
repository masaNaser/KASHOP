import {axiosInstance} from "./api";

export const getProducts = async () => {
  const response = await axiosInstance.get("/Products");
  return response;
};
export const getProductDetails = async (id) => {
  const response = await axiosInstance.get(`/Products/${id}`);
  return response;
};
export const getProductsByCategory = async (categoryId) => {
  const response = await axiosInstance.get(`/Products/category/${categoryId}`);
  return response;
}