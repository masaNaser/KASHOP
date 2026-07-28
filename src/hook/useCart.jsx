import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCart, 
  addToCart, 
   removeFromCart, 
  updateCartQuantity ,
  clearCart
} from "../services/cart";

// 1.  لجلب بيانات السلة
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

// 2.  لاضافة منتج للسلة
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => addToCart(values),
    onSuccess: () => {
      //  تحديث بيانات السلة تلقائيا عند الاضافة
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// 3.  لحذف منتج من السلة
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) => removeFromCart(productId),
    onSuccess: () => {
      //  اعادة جلب السلة فور الحذف
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// 4.  لتعديل كمية منتج (زيادة/نقصان)
export const useUpdateCartQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, count }) => updateCartQuantity(productId, count),
    onSuccess: () => {
      //  تحديث المجموع والكميات في الشاشة فورا
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// 5.  افراغ السلة
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
