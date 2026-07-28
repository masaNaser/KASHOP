import { useMutation} from "@tanstack/react-query";
import { createCheckout } from "../services/checkout";

export const useCheckout = () => {

  return useMutation({
    mutationFn: (checkoutData) => createCheckout(checkoutData),
    onSuccess: (response) => {
        const redirectUrl = response?.url || response?.data?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      }
    },
  });
};