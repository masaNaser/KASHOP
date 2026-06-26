import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Badge,
  Box,
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
} from "@mui/icons-material";

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: "#F3F1FF",
  "&:hover": {
    backgroundColor: alpha("#F3F1FF", 0.85),
  },
  marginRight: theme.spacing(1),
  marginLeft: 0,
  width: "240px",
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    alignItems: "center",
  },
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
    transition: theme.transitions.create("width"),
    fontSize: "0.875rem",
    width: "100%",
    "&:focus": {
      backgroundColor: "#fff",
      borderRadius: "50px",
      boxShadow: `0 0 0 1px var(--primary-color, #7C3AED)`, 
    },
  },
}));

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const navLinks = ["Home", "Categories", "All Products"];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
      <Toolbar
        className="mx-auto w-full max-w-[1280px] px-6"
        sx={{
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: "0 !important", 
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--primary-color, #7C3AED)", 
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          KASHOP
        </Typography>

        <Box
          className="hidden md:flex"
          sx={{ alignItems: "center", gap: 4, height: "100%" }}
        >
          {navLinks.map((link) => (
            <Button
              key={link}
              component={Link}
              to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
              onClick={() => setActiveTab(link)}
              disableRipple
              sx={{
                position: "relative",
                height: "64px",
                borderRadius: 0,
                textTransform: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: activeTab === link ? "var(--primary-color, #7C3AED)" : "#737373",
                "&:hover": {
                  color: "var(--primary-color, #7C3AED)",
                  backgroundColor: "transparent",
                },
                "&::after": activeTab === link ? {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "3px",
                  width: "100%",
                  borderRadius: "9999px",
                  backgroundColor: "currentColor",
                } : {},
              }}
            >
              {link}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          
          <SearchWrapper>
            <SearchIconWrapper>
              <SearchIcon sx={{ fontSize: 20 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </SearchWrapper>

          <IconButton
            sx={{
              color: "#1A1A2E",
              "&:hover": { color: "primary.main", backgroundColor: "#F8F9FC" },
            }}
          >
            <LanguageIcon sx={{ fontSize: 22 }} />
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              color: "#1A1A2E",
              "&:hover": { color:"var(--primary-color, #7C3AED)", backgroundColor: "#F8F9FC" },
            }}
          >
            <PersonIcon  sx={{ fontSize: 24 }} />
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
                mt: 9,
                p: 0.75,
                border: "1px solid #F5F5F5",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
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
            <MenuItem component={Link} to="/auth/login" >
              <LoginIcon sx={{ fontSize: 18 }} />
              Log In
            </MenuItem>
            <MenuItem component={Link} to="/auth/register">
              <PersonAddIcon sx={{ fontSize: 18 }} />
              Register
            </MenuItem>
          </Menu>

          <IconButton
            sx={{
              color: "#1A1A2E",
              "&:hover": { color: "primary.main", backgroundColor: "#F8F9FC" },
            }}
          >
            <Badge
              badgeContent={2}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#FF5A5F",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: "bold",
                  height: 16,
                  minWidth: 16,
                },
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ fontSize: 22 }} />
            </Badge>
          </IconButton>

          <IconButton
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            sx={{
              color: "#1A1A2E",
              "&:hover": { backgroundColor: "#F8F9FC" },
            }}
          >
            {isMobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>

      {isMobileOpen && (
        <Box
          className="md:hidden"
          sx={{
            position: "absolute",
            top: 64,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            borderBottom: "1px solid #F5F5F5",
            p: 3,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {navLinks.map((link) => (
            <Box
              key={link}
              component={Link}
              to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
              onClick={() => {
                setActiveTab(link);
                setIsMobileOpen(false);
              }}
              sx={{
                textDecoration: "none",
                fontSize: "1rem",
                fontWeight: 500,
                py: 1,
                borderBottom: "1px solid #FAFAFA",
                color: activeTab === link ? "var(--primary-color, #7C3AED)" : "#737373",
              }}
            >
              {link}
            </Box>
          ))}
        </Box>
      )}
    </AppBar>
  );
}
