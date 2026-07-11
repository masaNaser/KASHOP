import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../servicse/product';


export default function useProduct() {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;

}