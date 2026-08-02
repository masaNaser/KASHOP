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
import useThemeStore from "../../store/useThemeStore"; // 👈 استيراد الـ Theme Store

export default function SendCode() {
  const mode = useThemeStore((state) => state.theme); // 👈 جلب حالة الـ theme
  const isDark = mode === "dark"; // 👈 متغير فحص للـ Dark Mode

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
  } = {
    ...useForm({
      defaultValues: {
        email: "",
      },
    }),
  };

  const onSubmit = async (data) => {
    try {
      setSnackbar({ open: false, message: "", severity: "error" });
      console.log("data", data);
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

  // 👈 تنسيق حقل البريد الإلكتروني لدعم الـ Dark Mode
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      height: 44,
      backgroundColor: isDark ? "#2a2a2a" : "#ffffff",
      color: isDark ? "#ffffff" : "#000000",
      "& fieldset": {
        borderColor: isDark ? "#444444" : "#cccccc",
      },
      "&:hover fieldset": {
        borderColor: isDark ? "#666666" : "#aaaaaa",
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#aaaaaa" : "inherit",
    },
  };

  const iconStyle = { color: isDark ? "#888888" : "#A3A3A3", fontSize: 20 };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "calc(100vh - 64px)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // 👈 خلفية الصفحة
        backgroundColor: isDark ? "#121212" : "#F8F9FC",
        color: isDark ? "#ffffff" : "#000000",
        p: 2,
        py: 6,
        transition: "background-color 0.3s ease",
      }}
    >
      {/* Form Card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: "16px",
          border: isDark ? "1px solid #2e2e2e" : "1px solid #F5F5F5",
          backgroundColor: isDark ? "#1e1e1e" : "#ffffff",
          p: 4,
          boxShadow: isDark
            ? "0px 4px 20px rgba(0, 0, 0, 0.4)"
            : "0px 4px 12px rgba(0, 0, 0, 0.02)",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 700,
            color: isDark ? "#ffffff" : "#1A1A2E",
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
            color: isDark ? "#aaaaaa" : "#737373",
            textAlign: "center",
            mb: 3,
            fontSize: "0.85rem",
          }}
        >
          Enter your email address and we will send you a verification code to
          reset your password.
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
                  <EmailIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
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
              "&.Mui-disabled": {
                backgroundColor: isDark ? "#333333" : "#e0e0e0",
                color: isDark ? "#666666" : "#a1a1a1",
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Send Code"
            )}
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