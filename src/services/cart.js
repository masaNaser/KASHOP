import {axiosInstanceWithToken} from "./api";

export const getCart = async () => {
  const response = await axiosInstanceWithToken.get("/Carts");
  return response;
};

export const addToCart = async (productData) => {
  const response = await axiosInstanceWithToken.post("/Carts",productData);
  return response;
};

export const updateCartQuantity = async(productId,count)=>{
  const response = await axiosInstanceWithToken.patch(`/Carts/${productId}`,{count});
  return response;
}

export const removeFromCart = async(productId)=>{
  const response = await axiosInstanceWithToken.delete(`/Carts/${productId}`);
  return response;
}

export const clearCart = async()=>{
  const response = await axiosInstanceWithToken.delete(`/Carts/clear`);
  return response;
}

