import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Box,
  Divider,
  Container
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import {
  Search as SearchIcon,
  Language as LanguageIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import useAuthStore from "../store/useAuthStore"; 
const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "#F3F1FF",
  "&:hover": {
    backgroundColor: alpha("#F3F1FF", 0.85),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "100%",
  maxWidth: "220px",
  display: "flex",
  alignItems: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#A3A3A3",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#1A1A2E",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: "0.875rem",
    width: "100%",
  },
}));

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const token = useAuthStore((state) => state.token); // جلب قيمة التوكن من الـ zustand store
  console.log("Token in Navbar:", token); 
  const logout = useAuthStore((state) => state.logout); // جلب دالة تسجيل الخروج من الـ zustand store
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All Products", path: "/all-products" },
  ];

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "white",
        borderBottom: "1px solid #E5E5E5",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg" disableGutters>
      <Toolbar
        sx={{
          height: 64,
          maxWidth: "1280px",
          width: "100%",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* اللوجو KASHOP */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: 700,
            color: "var(--primary-color, #7C3AED)",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            textDecoration: "none",
          }}
        >
          KASHOP
        </Typography>

        {/* روابط الشاشات الكبيرة */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: { md: 2, lg: 4 },
            height: "100%",
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                disableRipple
                sx={{
                  position: "relative",
                  height: "64px",
                  borderRadius: 0,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: isActive ? "var(--primary-color, #7C3AED)" : "#525252",
                  "&:hover": {
                    color: "var(--primary-color, #7C3AED)",
                    backgroundColor: "transparent",
                  },
                  "&::after": isActive
                    ? {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "3px",
                        width: "100%",
                        borderRadius: "9999px",
                        backgroundColor: "var(--primary-color, #7C3AED)",
                      }
                    : {},
                }}
              >
                {link.name}
              </Button>
            );
          })}
        </Box>

        {/* عناصر جهة اليمين في الشاشات الكبيرة */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </SearchWrapper>

          <IconButton sx={{ color: "#1A1A2E" }}>
            <LanguageIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton onClick={handleProfileMenuOpen} sx={{ color: "#1A1A2E" }}>
            <PersonIcon sx={{ fontSize: 24 }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            PaperProps={{
              elevation: 0,
              sx: {
                width: 192,
                borderRadius: "12px",
                mt: 1,
                border: "1px solid #F5F5F5",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
                "& .MuiMenuItem-root": {
                  fontSize: "0.875rem",
                  borderRadius: "8px",
                  color: "#525252",
                  gap: 1.5,
                  padding: "8px 12px",
                  "&:hover": {
                    color: "var(--primary-color, #7C3AED)",
                    backgroundColor: "#F3F1FF",
                  },
                },
              },
            }}
          >
            {token ?(
            <MenuItem component={Link} to="/auth/login" onClick={logout}>
              <LogoutIcon sx={{ fontSize: 18 }} />
              Log out
            </MenuItem>
          ):(
            <>
          <MenuItem component={Link} to="/auth/login">
              <LoginIcon sx={{ fontSize: 18 }} />
              Log In
            </MenuItem>
            <MenuItem component={Link} to="/auth/register">
              <PersonAddIcon sx={{ fontSize: 18 }} />
              Register
            </MenuItem>
            </>
          )}
          </Menu>

          {token && (
         <IconButton sx={{ color: "#1A1A2E" }} component={Link} to="/cart">
            <ShoppingCartOutlinedIcon sx={{ fontSize: 22 }} />
          </IconButton>
          )}
          
        </Box>

        {/* زر الـ 3 شحطات في الموبايل فقط */}
        <IconButton
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          sx={{
            display: { xs: "flex", md: "none" },
            color: "#1A1A2E",
          }}
        >
          {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>
      </Container>
      {/* قائمة الـ 3 شحطات للموبايل (مكتملة بكافة الأيقونات) */}
      {isMobileOpen && (
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            position: "absolute",
            top: 64,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            borderBottom: "1px solid #E5E5E5",
            p: 2.5,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.08)",
            flexDirection: "column",
            gap: 2,
            zIndex: 1000,
            maxHeight: "calc(100vh - 80px)",
            overflowY: "auto",
          }}
        >
          {/* 1. حقل البحث */}
          <SearchWrapper sx={{ maxWidth: "100%", m: 0 }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
          </SearchWrapper>

          {/* 2. روابط الصفحات */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Box
                  key={link.name}
                  component={Link}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  sx={{
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    py: 1,
                    px: 1.5,
                    borderRadius: "8px",
                    color: isActive ? "var(--primary-color, #7C3AED)" : "#525252",
                    backgroundColor: isActive ? "#F3F1FF" : "transparent",
                  }}
                >
                  {link.name}
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* 3. عناصر الخدمات والأيقونات (السلة، اللغة، البروفايل) */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            
            {/* أيقونة السلة مع الـ  */}
            {token &&(
            <Box
              component={Link}
              to="/cart" // أو مسار صفحة السلة لديك
              onClick={() => setIsMobileOpen(false)}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1.2,
                borderRadius: "8px",
                textDecoration: "none",
                color: "#525252",
                "&:hover": { backgroundColor: "#F8F9FC" },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <ShoppingCartOutlinedIcon sx={{ fontSize: 22, color: "#1A1A2E" }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Cart
                </Typography>
              </Box>
          
            </Box>
              )}
            {/* أيقونة اللغة */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.2,
                borderRadius: "8px",
                cursor: "pointer",
                color: "#525252",
                "&:hover": { backgroundColor: "#F8F9FC" },
              }}
            >
              <LanguageIcon sx={{ fontSize: 22, color: "#1A1A2E" }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Language (EN)
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 0.5 }} />

          {/* 4. أزرار تسجيل الدخول وإنشاء الحساب */}
          <Box sx={{ display: "flex", gap: 1.5 }}>
            {
            token?
            (
              <Button
              component={Link}
              to="/auth/login"
              onClick={() => {
                logout();
                setIsMobileOpen(false);
              }}
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                borderColor: "#E5E5E5",
                color: "#1A1A2E",
              }}
            >
              Log Out
            </Button>
            ):
          (
              <> 
              <Button
              component={Link}
              to="/auth/login"
              onClick={() => setIsMobileOpen(false)}
              fullWidth
              variant="outlined"
              startIcon={<LoginIcon />}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                borderColor: "#E5E5E5",
                color: "#1A1A2E",
              }}
            >
              Log In
            </Button>
            <Button
              component={Link}
              to="/auth/register"
              onClick={() => setIsMobileOpen(false)}
              fullWidth
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor: "var(--primary-color, #7C3AED)",
                boxShadow: "none",
              }}
            >
              Register
            </Button>
            </>
            )
            }
          </Box>
        </Box>
      )}
    </AppBar>
  );
}
