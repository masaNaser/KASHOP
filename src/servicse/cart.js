import {axiosInstanceWithToken} from "./api";

export const getCart = async () => {
  const response = await axiosInstanceWithToken.get("/Carts");
  return response;
};

export const addToCart = async (productData) => {
  const response = await axiosInstanceWithToken.post("/Carts",productData);
  return response;
};

