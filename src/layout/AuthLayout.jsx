import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
export default function AuthLayout() {
  return (
    <>
   <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid #E5E5E5",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >    
    <Container maxWidth="lg" >

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
        {/* اللوجو */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 700,
            letterSpacing: "-0.025em",
            color: "var(--primary-color)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          KASHOP
        </Typography>
      </Toolbar>
      </Container>
    </AppBar>
    
    <Outlet />
    <Footer /> 
    </>
  )
}
