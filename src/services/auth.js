import {axiosInstance} from "./api";

export const registerUser = async (userData) => {
  const response = await axiosInstance.post("auth/Account/Register", userData);
  return response;
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("auth/Account/Login", userData);
  return response;
};

export const sendCode = async (email) => {
  const response = await axiosInstance.post("auth/Account/SendCode", email);
  return response;
};

export const resetPassword = async (userData) => {
  const response = await axiosInstance.patch("auth/Account/ResetPassword", userData);
  return response;
};