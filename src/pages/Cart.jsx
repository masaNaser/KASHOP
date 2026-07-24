import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  TextField,
  Divider,
  CircularProgress,
  Stack,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { Link } from "react-router-dom";
import { useGetCart } from "../hook/useCart";

export default function Cart() {

  const { data, isLoading } = useGetCart();
  console.log("cart",data?.data.items);
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Box>
    );
  }

  const items = data?.data.items || [];
  const cartTotal = data?.data.cartTotal || 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: "#111827" }}>
        Shopping Cart
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2.5fr 1fr" },
          gap: 3,
          alignItems: "start",
        }}
      >
        {/* القسم الأيسر: قائمة المنتجات */}
        <Box>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
              overflow: "hidden",
            }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "#F3F4F6" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "#4B5563" }}>Product</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#4B5563" }}>Price</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#4B5563" }}>Quantity</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: "#4B5563" }}>Total</TableCell>
                  <TableCell align="center" sx={{ width: "50px" }} />
                </TableRow>
              </TableHead>

              <TableBody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <TableRow key={item.productId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      {/* تفاصيل المنتج */}
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                          <Box
                            sx={{
                              width: 64,
                              height: 64,
                              borderRadius: "12px",
                              backgroundColor: "#111827",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              overflow: "hidden",
                            }}
                          >
                            {/* يمكن استبدال الصورة بعنصر img إن وُجد رابط الصورة */}
                            <Typography variant="caption" sx={{ color: "#FFF", fontSize: "10px" }}>
                              IMG
                            </Typography>
                          </Box>
                          <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                            {item.productName}
                          </Typography>
                        </Box>
                      </TableCell>

                      {/* السعر الفردي */}
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: 600, color: "var(--primary-color)" }}>
                          ${item.price?.toFixed(2)}
                        </Typography>
                      </TableCell>

                      {/* عداد الكمية */}
                      <TableCell align="center">
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                          <IconButton
                            size="small"
                            sx={{
                              border: "1px solid #E5E7EB",
                              width: 28,
                              height: 28,
                            }}
                          >
                            <RemoveIcon fontSize="small" sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Typography sx={{ fontWeight: 600, minWidth: 20 }}>
                            {item.count}
                          </Typography>
                          <IconButton
                            size="small"
                            sx={{
                              border: "1px solid #E5E7EB",
                              width: 28,
                              height: 28,
                            }}
                          >
                            <AddIcon fontSize="small" sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Stack>
                      </TableCell>

                      {/* السعر الإجمالي للمنتج */}
                      <TableCell align="center">
                        <Typography sx={{ fontWeight: 700, color: "var(--primary-color)" }}>
                          ${item.totalPrice?.toFixed(2)}
                        </Typography>
                      </TableCell>

                      {/* زر الحذف */}
                      <TableCell align="center">
                        <IconButton size="small" sx={{ color: "#9CA3AF", "&:hover": { color: "#EF4444" } }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">Your cart is empty.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* الأزرار العلوية للسلة */}
            <Box
              sx={{
                p: 2,
                backgroundColor: "#F3F4F6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                component={Link}
                to="/"
                startIcon={<ArrowBackIcon />}
                sx={{ color: "var(--primary-color)", textTransform: "none", fontWeight: 600 }}
              >
                Continue Shopping
              </Button>
              <Button
                // onClick={fetchCart}
                startIcon={<RefreshIcon />}
                sx={{ color: "#6B7280", textTransform: "none", fontWeight: 600 }}
              >
                Update Cart
              </Button>
            </Box>
          </TableContainer>
        </Box>

        {/* القسم الأيمن: ملخص الطلب Order Summary */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: "16px",
              border: "1px solid #E5E7EB",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: "#111827" }}>
              Order Summary
            </Typography>

            <Stack spacing={2} sx={{ mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Subtotal</Typography>
                <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                  ${cartTotal.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Estimated Shipping</Typography>
                <Typography sx={{ fontWeight: 600, color: "#10B981" }}>
                  Free
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary">Estimated Tax</Typography>
                <Typography sx={{ fontWeight: 600, color: "#111827" }}>
                  $0.00
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", mb: 0.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "var(--primary-color)" }}>
                ${cartTotal.toFixed(2)}
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 3 }}>
              Taxes calculated at checkout
            </Typography>

            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#312E81",
                "&:hover": { backgroundColor: "#1E1B4B" },
                py: 1.5,
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                mb: 2,
              }}
            >
              Proceed to Checkout
            </Button>

            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
              <LockOutlinedIcon sx={{ fontSize: 16, color: "#9CA3AF" }} />
              <Typography variant="caption" color="text.secondary">
                Secure encrypted checkout
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* إدخال كود الخصم (Promotional Code) */}
            <Typography variant="caption" sx={{ fontWeight: 600, color: "#6B7280", mb: 1, display: "block" }}>
              PROMOTIONAL CODE
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Enter code"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                  },
                }}
              />
              <Button
                variant="contained"
                disableElevation
                sx={{
                  backgroundColor: "#EEF2FF",
                  color: "#4F46E5",
                  fontWeight: 600,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#E0E7FF" },
                }}
              >
                Apply
              </Button>
            </Box>
          </Paper>

          {/* كرت المكافآت (Member Rewards) */}
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: "16px",
              backgroundColor: "#EEF2FF",
              display: "flex",
              justify: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ pr: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#312E81", mb: 0.5 }}>
                Member Rewards
              </Typography>
              <Typography variant="caption" sx={{ color: "#4F46E5", display: "block", mb: 1, lineHeight: 1.4 }}>
                You are earning points on this order. Use them for future discounts.
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#312E81", cursor: "pointer" }}>
                Learn more &gt;
              </Typography>
            </Box>
            <CardGiftcardIcon sx={{ color: "#C7D2FE", fontSize: 40 }} />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
