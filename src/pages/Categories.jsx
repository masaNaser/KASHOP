import { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Button,
  Card,
  Grid
} from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";
import useCategories from "../hook/useCategories";
export default function Categories() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data, isLoading, isError, error } = useCategories();
  console.log(data?.data.response.data);
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

  return (
    <>
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
            variant="h6"
            sx={{ mt: 4, mb: 2, color: "var(--primary-color)" }}
          >
            Shop by Category
          </Typography>
          <Button>View All</Button>
        </Box>
        {data?.data.response.data.length > 0 ? (
          <Grid container={true} spacing={3} sx={{ padding: 2 }}>
            {data?.data.response.data.map((category) => (
              <Grid item={true} xs={6} sm={4} md={3} key={category.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 3,
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                      backgroundColor: "#f9f9f9",
                    },
                  }}
                >
                  {/* اسم الفئة */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
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
