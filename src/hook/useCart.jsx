import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getCart, 
  addToCart, 
//   removeFromCart, 
//   updateCartQuantity 
} from "../services/cart";

// 1. Hook لجلب بيانات السلة
export const useGetCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });
};

// 2. Hook لإضافة منتج للسلة
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values) => addToCart(values),
    onSuccess: () => {
      // 🟢 تحديث بيانات السلة تلقائياً عند الإضافة
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// 3. Hook لحذف منتج من السلة
// export const useRemoveFromCart = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (productId) => removeFromCart(productId),
//     onSuccess: () => {
//       // 🟢 إعادة جلب السلة فور الحذف
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };

// 4. Hook لتعديل كمية منتج (زيادة/نقصان)
// export const useUpdateCartQuantity = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ productId, count }) => updateCartQuantity(productId, count),
//     onSuccess: () => {
//       // 🟢 تحديث المجموع والكميات في الشاشة فوراً
//       queryClient.invalidateQueries({ queryKey: ["cart"] });
//     },
//   });
// };