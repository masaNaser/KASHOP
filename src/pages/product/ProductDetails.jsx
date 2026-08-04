import { useParams } from "react-router-dom";
import useProductDetails from "../../hook/useProductDetails";
import {
  Box,
  CircularProgress,
  Container,
  Grid, 
  Typography,
  Button,
  Rating,
  Divider,
  Paper,
  Avatar,
  Stack,
  Tooltip
} from "@mui/material";
import { useTranslation } from "react-i18next";
import useAuthStore from "../../store/useAuthStore";
export default function ProductDetails() {
  const token = useAuthStore((state) => state.token);
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, error } = useProductDetails(id);
  console.log("Product Details Data:", data);
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !data) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography color="error" variant="h6">
          خطأ في تحميل تفاصيل المنتج، الرجاء المحاولة لاحقاً.
        </Typography>
      </Container>
    );
  }

  // استخراج الكائن الفعلي للمنتج بناءً على هيكلية البيانات لديك
  const product = data?.data?.response || data;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* 1. قسم تفاصيل المنتج الرئيسية */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* قسم الصورة (يسار على الشاشات الكبيرة) */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: 300, sm: 400 },
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                transition: "transform 0.4s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Stack spacing={3}>
            {/* اسم المنتج */}
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              {product.name}
            </Typography>

            {/* تقييم النجوم والكمية المتاحة */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Rating value={product.rate || 0} readOnly precision={0.5} />

              <Divider orientation="vertical" flexItem />
              <Typography
                variant="body2"
                sx={{
                  color: product.quantity > 0 ? "success.main" : "error.main",
                  fontWeight: "medium",
                }}
              >
                {product.quantity > 0
                  ? t("In Stock", { count: product.quantity })
                  : t("Out of Stock")}
              </Typography>
            </Stack>

            {/* السعر */}
            <Typography
              variant="h3"
              sx={{ color: "var(--primary-color)", fontWeight: "bold" }}
            >
              {product.price} $
            </Typography>

            <Divider />

            {/* الوصف القصير والكامل للمنتج */}
            <Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                {t("Product Description")}:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  lineHeight: 1.8,
                  whiteSpace: "pre-line", // يعرض الفواصل والأسطر الجديدة كما هي بقاعدة البيانات
                }}
              >
                {product.description}
              </Typography>
            </Box>

            {/* زر إضافة للسلة */}
             <Tooltip title={!token ? t("Please login first") : ""}>
            <Button
              variant="contained"
              size="large"
              // startIcon={<ShoppingCartIcon />}
              disabled={!token}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1.1rem",
                fontWeight: "bold",
                textTransform: "capitalize",
                boxShadow: 3,
                width: { xs: "100%", sm: "fit-content" },
                px: 5,
                backgroundColor: "var(--primary-color)",
                "&:hover": {
                  backgroundColor: "var(--primary-color-dark)",
                },
              }}
            >
              {t("add to cart")}
            </Button>
            </Tooltip>
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* 2. قسم مراجعات وآراء المستخدمين */}
      <Box>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          {t("Customer Reviews", { count: product.reviews?.length || 0 })}
        </Typography>

        {product.reviews && product.reviews.length > 0 ? (
          <Grid container spacing={2}>
            {product.reviews.map((review, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    backgroundColor: "background.paper",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ bgcolor: "primary.light" }}>
                        {review.userName
                          ? review.userName[0].toUpperCase()
                          : "U"}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {review.userName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {new Date(review.createdAt).toLocaleDateString(
                            "ar-EG",
                          )}
                        </Typography>
                      </Box>
                      <Rating value={review.rating} readOnly size="small" />
                    </Stack>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {review.comment}
                    </Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
            لا توجد مراجعات لهذا المنتج بعد. كن أول من يكتب مراجعته!
          </Typography>
        )}
      </Box>
    </Container>
  );
}
