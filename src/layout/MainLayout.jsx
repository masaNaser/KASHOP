import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";

export const MainLayout = () => {
  return (
    <>
      
        <Navbar />
        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
