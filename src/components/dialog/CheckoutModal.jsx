import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import {useCheckout } from "../../hook/useCheckout";

// eslint-disable-next-line react/prop-types
export default function CheckoutModal({ open, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const { mutate: performCheckout } = useCheckout();
  const handleConfirm = () => {
    console.log("paymentMethod",paymentMethod);
    if (!paymentMethod) return;
        performCheckout({ paymentMethod }, // 👈 إرسال الكائن المطلوبة قيمته
    );
  };
  return (
    <Dialog
      open={open}
      onClose={() =>onClose()}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: "16px", p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: 700, color: "#111827" }}>
        Select Payment Method
      </DialogTitle>

      <DialogContent>
        <FormControl component="fieldset" sx={{ width: "100%", mt: 1 }}>
          <RadioGroup
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {/* خيار الفيزا */}
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                mb: 1.5,
                borderRadius: "12px",
                borderColor: paymentMethod === "visa" ? "var(--primary-color)" : "#E5E7EB",
                backgroundColor: paymentMethod === "Visa" ? "#EEF2FF" : "#FFF",
                cursor: "pointer",
              }}
              onClick={() => setPaymentMethod("Visa")}
            >
              <FormControlLabel
                value="visa"
                control={
                  <Radio
                    sx={{
                      color: "var(--primary-color)",
                      "&.Mui-checked": { color: "var(--primary-color)" },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CreditCardIcon sx={{ color: "var(--primary-color)" }} />
                    <Typography sx={{ fontWeight: 600 }}>
                      Visa
                    </Typography>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </Paper>

            {/* خيار الدفع نقداً */}
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                borderRadius: "12px",
                borderColor: paymentMethod === "Cash" ? "var(--primary-color)" : "#E5E7EB",
                backgroundColor: paymentMethod === "Cash" ? "#EEF2FF" : "#FFF",
                cursor: "pointer",
              }}
              onClick={() => setPaymentMethod("Cash")}
            >
              <FormControlLabel
                value="cash"
                control={
                  <Radio
                    sx={{
                      color: "var(--primary-color)",
                      "&.Mui-checked": { color: "var(--primary-color)" },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalAtmIcon sx={{ color: "#10B981" }} />
                    <Typography sx={{ fontWeight: 600 }}>
                      Cash on Delivery
                    </Typography>
                  </Box>
                }
                sx={{ width: "100%", m: 0 }}
              />
            </Paper>
          </RadioGroup>
        </FormControl>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", color: "#6B7280" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            backgroundColor: "var(--primary-color)",
            "&:hover": { backgroundColor: "#1E1B4B" },
            borderRadius: "8px",
            textTransform: "none",
            px: 3,
          }}
        >
             Confirm & Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
