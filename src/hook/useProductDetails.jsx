import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '../services/product';

export default function useProductDetails(productId) { 
    const query = useQuery({
        queryKey: ["productDetails", productId,'en'],
        queryFn: () => getProductDetails(productId),
        enabled: !!productId,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      });
      return query;
}