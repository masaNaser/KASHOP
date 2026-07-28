import {axiosInstanceWithToken} from "./api";

export const createCheckout = async (checkoutData) => {
  const response = await axiosInstanceWithToken.post("/Checkouts",checkoutData);
  return response.data;
};