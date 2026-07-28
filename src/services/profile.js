import {axiosInstanceWithToken} from "./api";

export const getProfile = async () => {
  const response = await axiosInstanceWithToken.get("/Profile");
  return response;
};

export const changeEmail = async (NewEmail) => {
  const response = await axiosInstanceWithToken.patch("/Profile/change-email",{
      NewEmail: NewEmail 
    });
  return response;
};

export const changePassword = async (data) => {
  const response = await axiosInstanceWithToken.patch("/Profile/change-password",data);
  return response;
};