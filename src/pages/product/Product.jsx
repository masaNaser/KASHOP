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
  Tooltip,
} from "@mui/material";
import useProducts from "../../hook/useProducts";
import { Link } from "react-router-dom";
import AddToCartDialog from "../../components/dialog/AddToCartDialog";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useAddToCart } from "../../hook/useCart";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/useAuthStore";
import useThemeStore from "../../store/useThemeStore";

export default function Product() {
  const token = useAuthStore((state) => state.token);
  const mode = useThemeStore((state) => state.theme); // 👈 الاعتماد الرئيسي على mode من الـ Store
  
  const isDark = mode === "dark"; // متغير سريع للفحص

  const { t } = useTranslation();
  const { data, isLoading } = useProducts();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { mutateAsync: addToCart } = useAddToCart();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleOpenAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleAddToCart = async ({ ProductId, Count }) => {
    try {
      const response = await addToCart({ ProductId, Count });
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

  const productsList = data?.data.response.data || [];

  return (
    <Box sx={{ color: isDark ? "#ffffff" : "#000000", py: 2 }}>
      {/* Header */}
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
          sx={{
            mt: 4,
            mb: 2,
            fontWeight: "bold",
            color: "var(--primary-color)",
          }}
        >
          {t("Our Products") || "Our Products"}
        </Typography>
        <Button sx={{ color: "var(--primary-color)" }}>
          {t("View All") || "View All"}
        </Button>
      </Box>

      {/* Products List */}
      {productsList && productsList.length > 0 ? (
        <Grid container spacing={3} sx={{ padding: 1 }}>
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
                    borderRadius: 3,
                    // 👈 تخصيص لون الخلفية والحدود والظل مباشرة حسب mode
                    backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                    color: isDark ? "#ffffff" : "#1a1a1a",
                    border: isDark ? "1px solid #333333" : "1px solid #f0f0f0",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      boxShadow: isDark
                        ? "0 4px 20px rgba(255, 255, 255, 0.08)"
                        : "0 4px 20px rgba(0, 0, 0, 0.12)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: 180,
                      objectFit: "contain",
                      margin: "auto",
                      padding: "16px",
                      // خلفية خفيفة للصورة إذا كان المنتج باللون الداكن لتبدو الصورة واضحة
                      // backgroundColor: isDark ? "#2a2a2a" : "transparent",
                      borderRadius: 2,
                      transition: "transform 0.3s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                  <CardContent sx={{ px: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: isDark ? "#ffffff" : "#222222",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justify: "space-between",
                        alignItems: "center",
                        mt: 1,
                        gap: 4,
                      }}
                    >
                      {product.rate === 0 ? (
                        <Typography
                          variant="caption"
                          sx={{ color: isDark ? "#aaaaaa" : "#666666" }}
                        >
                          No ratings yet
                        </Typography>
                      ) : (
                        <Rating
                          value={product.rate || 0}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                      )}
                      <Typography
                        variant="body1"
                        sx={{
                          color: "var(--primary-color)",
                          fontWeight: "bold",
                        }}
                      >
                        ${product.price?.toFixed(2)}
                      </Typography>
                    </Box>
                  </CardContent>

                  <Tooltip title={!token ? t("Please login first") : ""}>
                    <CardActions sx={{ justifyContent: "center", pt: 0, px: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        disabled={!token}
                        sx={{
                          py: 1.2,
                          borderRadius: 2,
                          fontSize: "0.95rem",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          boxShadow: 2,
                          width: "100%",
                          backgroundColor: "var(--primary-color)",
                          "&:hover": {
                            backgroundColor: "var(--primary-color-dark)",
                          },
                          // ألوان الزر عند إلغاء التفعيل في الـ Dark mode
                          "&.Mui-disabled": {
                            backgroundColor: isDark ? "#333333" : "#e0e0e0",
                            color: isDark ? "#666666" : "#a1a1a1",
                          },
                        }}
                        onClick={(e) => handleOpenAddToCart(e, product)}
                      >
                        {t("add to cart")}
                      </Button>
                    </CardActions>
                  </Tooltip>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: isDark ? "#aaaaaa" : "#666666", mt: 2 }}>
          No products available.
        </Typography>
      )}

      {/* Dialogs */}
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
