
import { useParams } from 'react-router-dom';
import useProductByCategory from '../../hook/useProductByCategory';
import { CircularProgress, Box } from "@mui/material";
export default function ProductByCategory() {
    const { categoryId } = useParams();
    console.log('Category ID:', categoryId);
    const { data, isLoading } = useProductByCategory(categoryId);
    console.log('Products by Category:', data);
      if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div>
      ProductByCategory
    </div>
  );
}
