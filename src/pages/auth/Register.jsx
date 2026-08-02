import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/auth";
import CustomSnackbar from "../../components/CustomSnackbar"; 
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterSchema } from "../../validations/RegisterSchema";
import useThemeStore from "../../store/useThemeStore"; // 👈 استيراد الـ Theme Store

export default function Register() {
  const mode = useThemeStore((state) => state.theme); // 👈 جلب حالة الـ theme
  const isDark = mode === "dark"; // 👈 متغير فحص للـ Dark Mode

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(RegisterSchema), 
  });

  const onSubmit = async (data) => {
    try {
      setSnackbar({ open: false, message: "", severity: "error" });
      const response = await registerUser(data);
      console.log("Registration successful:", response);
      setSnackbar({ open: true, message: "Account created successfully!", severity: "success" });
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      const errorMessage = error.response?.data?.errors || "Registration failed. Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  // 👈 دالة مساعدة لتنسيق حقول الإدخال وتقليل التكرار
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
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="body2"
          sx={{ color: isDark ? "#aaaaaa" : "var(--secondary-color)", mt: 0.5, fontSize: "0.75rem" }}
        >
          Join our curated premium marketplace.
        </Typography>
      </Box>

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
            mb: 3,
            fontSize: "1.25rem",
          }}
        >
          Create your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          {/* Username */}
          <TextField
            fullWidth
            label="Username"
            placeholder="johndoe123"
            variant="outlined"
            size="small"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            placeholder="John Doe"
            variant="outlined"
            size="small"
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {/* Email */}
          <TextField
            fullWidth
            type="email"
            label="Email"
            placeholder="john@example.com"
            variant="outlined"
            size="small"
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
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

          {/* Phone Number */}
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="+1 (555) 000-0000"
            variant="outlined"
            size="small"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon sx={iconStyle} />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyles}
          />

          {/* Password */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            size="small"
            {...register("password", {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
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

          {/* Confirm Password */}
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            variant="outlined"
            size="small"
            {...register("confirmPassword", {
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon sx={iconStyle} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    size="small"
                    sx={{ color: isDark ? "#aaaaaa" : "inherit" }}
                  >
                    {showConfirmPassword ? (
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

          {/* Submit Button */}
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
              "Create Account"
            )}
          </Button>
        </Box>

        {/* Login Link */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: isDark ? "#aaaaaa" : "var(--secondary-color)", fontSize: "0.75rem" }}
          >
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{
                color: "var(--primary-color)",
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                (e.target.style.textDecoration = "underline")
              }
              onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
            >
              Login here
            </Link>
          </Typography>
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