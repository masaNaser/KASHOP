
import { useParams } from 'react-router-dom';
import useProductByCategory from '../../hook/useProductByCategory';
import Loader from '../../components/Loader';
export default function ProductByCategory() {
    const { categoryId } = useParams();
    console.log('Category ID:', categoryId);
    const { data, isLoading } = useProductByCategory(categoryId);
    console.log('Products by Category:', data);
      if (isLoading) {
    return (
      <Loader />
    );
  }
  return (
    <div>
      ProductByCategory
    </div>
  );
}
