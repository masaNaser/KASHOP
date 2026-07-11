
import { useState, useEffect } from 'react'; 
import { getCategories } from '../servicse/category';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Box, Typography, Button,Grid,Card } from '@mui/material';
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
    <>
    <Box container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ mt: 4, mb: 2, color: 'var(--primary-color)' }}>Shop by Category</Typography>
      <Button>
        View All
      </Button>
      </Box>
      {data.response.data?.length > 0 ? (
<Grid container spacing={3} sx={{ padding: 2 }}>
  {data.response.data.map((category) => (
    <Grid item xs={6} sm={4} md={3} key={category.id}>
      <Card 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: 3,
          borderRadius: '50%',
          width: 50,
          height: 50,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9'
          }
        }}
      >

        {/* اسم الفئة */}
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333' }}>
          {category.name}
        </Typography>
      </Card>
    </Grid>
  ))}
</Grid>        
      ) : (
        <Typography>No categories found.</Typography>
      )}

      <CustomSnackbar 
        open={openSnackbar} 
        message={error?.message || "Failed to load categories"} 
        severity="error" 
        onClose={() => setOpenSnackbar(false)} 
      />
    </Box>
    </>
  );
}
