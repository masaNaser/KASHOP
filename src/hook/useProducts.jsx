import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product';


export default function useProducts() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;

}