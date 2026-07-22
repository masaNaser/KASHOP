import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from '../servicse/product';    
export default function useProductByCategory(categoryId) {
    const query = useQuery({
        queryKey: ["productsByCategory", categoryId],
        queryFn: () => getProductsByCategory(categoryId),
        staleTime: 5 * 60 * 1000, 
        enabled: !!categoryId,

    });
  return query;
}
