import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category';
import i18n from '../i18Next';
export default function useCategories() {
  const query = useQuery({
    queryKey: ["categories",i18n.language],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;
}
