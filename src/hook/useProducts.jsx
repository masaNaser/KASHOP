import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product';
import i18n from '../i18Next';


export default function useProducts() {
  const query = useQuery({
    queryKey: ["products",i18n.language],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;

}