import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../servicse/product'; // Note: check your spelling of 'services' here too!
import { CircularProgress, Box } from '@mui/material';

export default function Product() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });

  console.log("Products fetched successfully:", data?.data); // Optional chaining to avoid errors if data is undefined

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Safely extract the array to make the JSX cleaner
  const productsList = data?.data.response.data || [];
  console.log("Products List:", productsList); // Log the products list for debugging
  return (
    <Box>
      {productsList && productsList.length > 0 ? (
        <Box>
          {productsList.map((product) => (
            <Box key={product.id} sx={{ border: '1px solid #ccc', p: 2, m: 2 }}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* Added optional chaining here just in case price is missing temporarily */}
              <p>Price: ${product.price?.toFixed(2)}</p> 
            </Box>
          ))}
        </Box>
      ) : (
        <p>No products available.</p>
      )}
    </Box>
  );
}
