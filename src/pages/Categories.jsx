
import { useState, useEffect } from 'react'; 
import { getCategories } from '../servicse/category';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Box, Typography } from '@mui/material';
import CustomSnackbar from '../components/CustomSnackbar';

export default function Categories() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const fetchCategories = async () => {
    const response = await getCategories();
    console.log("Categories fetched successfully:", response.data);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      {data.response.data?.length > 0 ? (
        data.response.data.map((category) => (
          <div key={category.id}>{category.name}</div>
        ))
      ) : (
        <Typography>No categories found.</Typography>
      )}

      <CustomSnackbar 
        open={openSnackbar} 
        message={error?.message || "Failed to load categories"} 
        severity="error" 
        onClose={() => setOpenSnackbar(false)} 
      />
    </div>
  );
}
