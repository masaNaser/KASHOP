import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product';
import { useTranslation } from 'react-i18next';


export default function useProducts() {
  const { i18n } = useTranslation();
  const query = useQuery({
    queryKey: ["products",i18n.language],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;

}