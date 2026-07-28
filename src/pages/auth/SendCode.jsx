import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendCode } from "../../services/auth";
import CustomSnackbar from "../../components/CustomSnackbar";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, Link } from "react-router-dom";

export default function SendCode() {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setSnackbar({ open: false, message: "", severity: "error" });
      console.log("data",data)
      // إرسال البيانات للـ Service
      const response = await sendCode(data);
      console.log("Code sent successfully:", response);

      setSnackbar({
        open: true,
        message: response.data.message,
        severity: "success",
      });

      setTimeout(() => {
         navigate("/auth/resetPassword", { state: { email: data.email } });
      }, 1500);

      return response;
    } catch (error) {
      console.error("Send code failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Failed to send code. Please try again.";

      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 64px)",
        flexDirection: "column",
        alignItems: "center",
        justify: "center",
        backgroundColor: "#F8F9FC",
        p: 2,
        py: 6,
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: "16px",
          border: "1px solid #F5F5F5",
          backgroundColor: "white",
          p: 4,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.02)",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            color: "#1A1A2E",
            textAlign: "center",
            mb: 1,
            fontSize: "1.25rem",
          }}
        >
          Forgot Password?
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "#737373",
            textAlign: "center",
            mb: 3,
            fontSize: "0.85rem",
          }}
        >
          Enter your email address and we will send you a verification code to reset your password.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            type="email"
            label="Email"
            placeholder="john@example.com"
            variant="outlined"
            size="small"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#A3A3A3", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                height: 44,
                backgroundColor: "white",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disableRipple
            disabled={isSubmitting}
            sx={{
              width: "100%",
              height: 44,
              borderRadius: "12px",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.95rem",
              mt: 1,
              boxShadow: "none",
              backgroundColor: "var(--primary-color)",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "var(--primary-color)",
                boxShadow: "none",
                opacity: 0.9,
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: "#ffffff" }} /> : "Send Code"}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Link
            to="/auth/login"
            style={{
              color: "var(--primary-color)",
              fontWeight: 600,
              fontSize: "0.85rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} /> Back to Login
          </Link>
        </Box>
      </Box>

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}
