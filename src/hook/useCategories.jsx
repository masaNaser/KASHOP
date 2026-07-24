import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/category';
export default function useCategories() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
  return query;
}
