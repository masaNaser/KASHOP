import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '../services/product';
import i18n from '../i18Next';

export default function useProductDetails(productId) { 
    const query = useQuery({
        queryKey: ["productDetails", productId,i18n.language],
        queryFn: () => getProductDetails(productId),
        enabled: !!productId,
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      });
      return query;
}