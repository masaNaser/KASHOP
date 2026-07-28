import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import { 
  getProfile, 
  changeEmail,
  changePassword
} from "../services/profile";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
};

export const useUpdateEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email) => changeEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => changePassword(data),
  });
};