import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/product';
import { useTranslation } from 'react-i18next';

export default function useProducts(params = {}) {
  const { i18n } = useTranslation();
  const { page = 1, limit = 3, sortBy = "price", ascending = false } = params;

  const query = useQuery({
    queryKey: ["products", i18n.language, page, limit, sortBy, ascending],
    queryFn: () => getProducts({ page, limit, sortBy, ascending }),
    staleTime: 5 * 60 * 1000,
  });

  return query;
}
