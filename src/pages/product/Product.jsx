import { useState } from "react";
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
  Rating,
} from "@mui/material";
import useProducts from "../../hook/useProducts";
import { Link } from "react-router-dom";
import AddToCartDialog from "../../components/dialog/AddToCartDialog";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useAddToCart } from "../../hook/useCart";

export default function Product() {
  const { data, isLoading } = useProducts();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { mutateAsync: addToCart } = useAddToCart();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // إما 'success' أو 'error'
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  const handleOpenAddToCart = (e, product) => {
    e.preventDefault(); // 👈 إيقاف الانتقال عبر الرابط
    e.stopPropagation(); // 👈 منع وصول الحدث للرابط الأب
    setSelectedProduct(product);
    setOpenDialog(true);
  };
  const handleAddToCart = async ({ ProductId, Count }) => {
    try {
      const response = await addToCart({
        ProductId,
        Count,
      });
      console.log("add to cart", ProductId, Count);
      console.log("cart response", response);
      if (response?.data?.success) {
        setSnackbar({
          open: true,
          message: "Product added to cart successfully!",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: response?.data?.message || "Failed to add product",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Something went wrong!",
        severity: "error",
      });
      throw error;
    }
  };
  console.log("openDialog", openDialog);
  const productsList = data?.data.response.data || [];
  console.log("Products List:", productsList);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 2, color: "var(--primary-color)" }}
        >
          Our Product
        </Typography>
        <Button>View All</Button>
      </Box>
      {productsList && productsList.length > 0 ? (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {productsList.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link
                to={`/ProductDetails/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    maxWidth: 345,
                    padding: 2,
                    "&:hover": {
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                  key={product.id}
                >
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
                      transition:
                        "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.3)",
                      },
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
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
                          <Rating
                            value={product.rate || 0}
                            readOnly
                            precision={0.5}
                            size="small"
                          />
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
                    <Button
                      size="small"
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
                      onClick={(e) => handleOpenAddToCart(e, product)}
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
      <AddToCartDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
}
