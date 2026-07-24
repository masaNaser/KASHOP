import {axiosInstance} from "./api";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("auth/Account/Register", userData);
  return response;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("auth/Account/Login", userData);
  return response;
};