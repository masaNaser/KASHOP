import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../services/auth";
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
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema } from "../../validations/LoginSchema";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate, Link } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import useAuthStore from "../../store/useAuthStore";
import useThemeStore from "../../store/useThemeStore"; // 👈 استيراد الـ Theme Store

export default function Login() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  
  const mode = useThemeStore((state) => state.theme); // 👈 جلب قيمة الـ theme
  const isDark = mode === "dark"; // 👈 متغير فحص للـ Dark Mode

  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(LoginSchema), 
  });

  const onSubmit = async (data) => {
    try {
      setSnackbar({ open: false, message: "", severity: "error" });
      const response = await loginUser(data);
      console.log("Login successful:", response);
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      setToken(response.data?.accessToken);
      navigate("/");
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Login failed. Please try again.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
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
        // 👈 خلفية الصفحة تتغير حسب الـ theme
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
          sx={{
            color: isDark ? "#aaaaaa" : "var(--secondary-color)",
            mt: 0.5,
            fontSize: "0.75rem",
          }}
        >
          Join our curated premium marketplace.
        </Typography>
      </Box>

      {/* Card Container */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: "16px",
          // 👈 ألوان الـ Form Card
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
          Sign in to your account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          {/* Email Input */}
          <TextField
            fullWidth
            type="email"
            label="Email"
            placeholder="john@example.com"
            variant="outlined"
            size="small"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: isDark ? "#888888" : "#A3A3A3", fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
            sx={{
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
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            variant="outlined"
            size="small"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOpenIcon sx={{ color: isDark ? "#888888" : "#A3A3A3", fontSize: 20 }} />
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
            sx={{
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
            }}
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
              "Login"
            )}
          </Button>
        </Box>

        {/* Register Link */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: isDark ? "#aaaaaa" : "#737373", fontSize: "0.75rem" }}
          >
            Dont have an account?{" "}
            <Link
              to="/auth/register"
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
              Register here
            </Link>
          </Typography>
        </Box>

        {/* Forgot Password Link */}
        <Box sx={{ mt: 1.5, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: isDark ? "#aaaaaa" : "#737373", fontSize: "0.75rem" }}
          >
            Forgot Password?{" "}
            <Link
              to="/auth/sendCode"
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
              Click here
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
