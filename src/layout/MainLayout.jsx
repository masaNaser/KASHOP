import { Outlet } from "react-router-dom"
import { Footer } from "../components/footer"
import Navbar from "../components/Navbar"


export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}


