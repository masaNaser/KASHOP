import {
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import useProducts from "../../hook/useProducts";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
export default function Product() {
  const { data, isLoading } = useProducts();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const productsList = data?.data.response.data || [];
  console.log("Products List:", productsList);
  return (
    <Box>
      {productsList && productsList.length > 0 ? (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {productsList.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link
                to={`/ProductDetails/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card sx={{
                   maxWidth: 345, 
                   padding: 2 ,
                   "&:hover":{
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                   }

                }} key={product.id}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain", // يعرض المنتج كاملاً بدون أي قص لأطرافه         
                      margin: "auto",
                      padding: "16px",
                      transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.3)", 
                        },
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div"
                     sx={{
                       fontSize: "1.2rem", 
                       fontWeight: "bold", 

                      }}>
                      {product.name}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 1,
                      }}
                    >
                      {product.rate === 0 ? (
                        <Typography
                          variant="span"
                          sx={{ color: "text.secondary" }}
                        >
                          No ratings yet
                        </Typography>
                      ) : (
                        <Typography
                          variant="span"
                          sx={{
                            color: "text.secondary",
                            display: "inline-flex",
                            alignItems: "center",
                          }}
                        >
                          {/* نقوم بإنشاء مصفوفة بطول عدد التقييم، ثم نكرر أيقونة النجمة */}
                          {Array.from({ length: product.rate }).map(
                            (index) => (
                              <StarIcon
                                key={index}
                                sx={{ color: "#FFD700", fontSize: "inherit" }}
                              />
                            ),
                          )}
                        </Typography>
                      )}
                      <Typography
                        variant="span"
                        sx={{ 
                          color: "text.secondary",
                          fontWeight: "bold",

                          
                         }}
                      >
                        {product.price?.toFixed(2)}$
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                    sx={{
                      backgroundColor: "var(--primary-color)",
                      alignItems: "center",
                      margin: "auto",
                      padding: "8px 16px",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "var(--primary-color-dark)",
                      },
                    }}
                    >
                      add to cart
                      </Button>
                  </CardActions>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No products available.</p>
      )}
    </Box>
  );
}
