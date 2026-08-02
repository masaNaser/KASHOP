import { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Card,
  Grid,
} from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";
import useCategories from "../hook/useCategories";
import { Link } from "react-router-dom";
import useThemeStore from "../store/useThemeStore"; 

export default function Categories() {
  const mode = useThemeStore((state) => state.theme); 
  const isDark = mode === "dark"; 

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data, isLoading, isError, error } = useCategories();

  useEffect(() => {
    if (isError) {
      setOpenSnackbar(true);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const categoriesList = data?.data?.response?.data || [];

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
          Shop by Category
        </Typography>
        <Button sx={{ color: "var(--primary-color)" }}>View All</Button>
      </Box>

      {categoriesList.length > 0 ? (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {categoriesList.map((category) => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <Link
                to={`/products/category/${category.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    borderRadius: "50%",
                    width: 120, 
                    height: 120,
                    margin: "auto",
                    backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
                    border: isDark ? "1px solid #333333" : "1px solid #f0f0f0",
                    boxShadow: isDark
                      ? "0 4px 12px rgba(255,255,255,0.05)"
                      : "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      backgroundColor: isDark ? "#2a2a2a" : "#f9f9f9",
                      boxShadow: isDark
                        ? "0 8px 24px rgba(255,255,255,0.1)"
                        : "0 8px 24px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {/* اسم الفئة */}
                  <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      color: isDark ? "#ffffff" : "#333333", 
                      wordBreak: "break-word",
                    }}
                  >
                    {category.name}
                  </Typography>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography sx={{ color: isDark ? "#aaaaaa" : "#666666", mt: 2 }}>
          No categories found.
        </Typography>
      )}

      {/* Snackbar alerts */}
      <CustomSnackbar
        open={openSnackbar}
        message={error?.message || "Failed to load categories"}
        severity="error"
        onClose={() => setOpenSnackbar(false)}
      />
    </Box>
  );
}