import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category';
import { useTranslation } from 'react-i18next'; 

export default function useCategories() {
  const { i18n } = useTranslation();

  const query = useQuery({
    queryKey: ["categories", i18n.language], 
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // 5 دقائق
  });

  return query;
}