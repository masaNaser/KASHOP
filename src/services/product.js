import {axiosInstance} from "./api";

export const getProducts = async ({ page = 1, limit = 10, sortBy = "price", ascending = false } = {}) => {
  const response = await axiosInstance.get("/Products", {
    params: {
      page,
      limit,
      sortBy,
      ascending,
    },
  });
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