import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../services/auth";
import CustomSnackbar from "../../components/CustomSnackbar";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useThemeStore from "../../store/useThemeStore"; // 👈 استيراد الـ Theme Store

export default function ResetPassword() {
  const mode = useThemeStore((state) => state.theme); 
  const isDark = mode === "dark"; 
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: email,
      code: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!email) {
      navigate("/auth/sendCode");
    } else {
      setValue("email", email);
    }
  }, [email, navigate, setValue]);

  const onSubmit = async (data) => {
    try {
      setSnackbar({ open: false, message: "", severity: "error" });

      const response = await resetPassword(data);

      setSnackbar({
        open: true,
        message: response?.data?.message || "Password reset successfully!",
        severity: "success",
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);

      return response;
    } catch (error) {
      console.error("Reset password failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Failed to reset password. Please try again.";

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
      "&.Mui-disabled": {
        backgroundColor: isDark ? "#1a1a1a" : "#F9FAFB",
        color: isDark ? "#777777" : "rgba(0, 0, 0, 0.38)",
        "& fieldset": {
          borderColor: isDark ? "#333333" : "#e0e0e0",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: isDark ? "#aaaaaa" : "inherit",
      "&.Mui-disabled": {
        color: isDark ? "#666666" : "rgba(0, 0, 0, 0.38)",
      },
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
          Reset Password
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
          Enter the verification code sent to your email and set your new password.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            fullWidth
            disabled
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            {...register("email")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          <TextField
            fullWidth
            type="text"
            label="Verification Code"
            placeholder="Enter code"
            variant="outlined"
            size="small"
            {...register("code", {
              required: "Verification code is required",
            })}
            error={!!errors.code}
            helperText={errors.code?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {/* حقل كلمة المرور الجديدة */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="New Password"
            placeholder="••••••••"
            variant="outlined"
            size="small"
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon sx={iconStyle} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: isDark ? "#aaaaaa" : "inherit" }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    )}
                  </IconButton>
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
              "Reset Password"
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