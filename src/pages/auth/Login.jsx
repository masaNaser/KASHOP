import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../servicse/auth";
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
import { useNavigate } from "react-router-dom";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // const[serverError,setServerError]=useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "error" });
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    getValues,
    formState: { errors ,isSubmitting},
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver:yupResolver(LoginSchema), 
  });

  const onSubmit = async (data) => {
    try {
      // setServerError(null);
      setSnackbar({ open: false, message: "", severity: "error" });
      const response = await loginUser(data);
      console.log("Login successful:", response);
      setSnackbar({ open: true, message: "Login successful!", severity: "success" });
      localStorage.setItem("token", response.data?.accessToken);
        navigate("/");
      
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.errors || "Login failed. Please try again.";      setSnackbar({ open: true, message: errorMessage, severity: "error" });
      // setServerError(errorMessage);
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
        justifyContent: "center",
        backgroundColor: "#F8F9FC",
        p: 2,
        py: 6,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="body2"
          sx={{ color: "#737373", mt: 0.5, fontSize: "0.75rem" }}
        >
          Join our curated premium marketplace.
        </Typography>
      </Box>

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
          {/* {serverError?.length>0? (
            <Typography variant="body2" sx={{ color: "error.main", mt: 1 }}>
              {serverError}
            </Typography>
          ):''} */}
        

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
          <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="......."
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
                  <LockOpenIcon sx={{ color: "#A3A3A3", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
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
                backgroundColor: "white",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            disableRipple
            disabled= {isSubmitting} 
            sx={{
              width: "100%",
              height: 44,
              borderRadius: "12px",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.95rem",
              mt: 1,
              boxShadow: "none",
              backgroundColor: "var(--primary-color, #7C3AED)",
              color: "#ffffff", 
              "&:hover": {
                backgroundColor: "var(--primary-color, #7C3AED)", 
                boxShadow: "none",
                opacity: 0.9, 
              },
            }}
          >
            {isSubmitting ? <CircularProgress/> : "Login"}
          </Button>
        </Box>

        {/* <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{ color: "#737373", fontSize: "0.75rem" }}
          >
            Already have an account?{" "}
            <Link
              to="/auth/login"
              style={{
                color: "var(--primary-color, #7C3AED)",
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
        </Box> */}
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
