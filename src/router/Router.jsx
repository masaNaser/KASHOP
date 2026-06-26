import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Home from "../pages/home";
import AuthLayout from "../layout/AuthLayout";
import Login  from "../pages/auth/Login";
import  Register  from "../pages/auth/Register";
import Categories from "../pages/Categories";
const router = createBrowserRouter([
    {
        
    path: "/",
    element: <MainLayout />,
    children: [
        {
          index:true,
          element:<Home/>
        },
        {
          path: "categories",
          element: <Categories />
        }
      
    ]
        
  },
  {
    path: "/auth", 
    element: <AuthLayout />,
    children: [
      {
        path: "login",       
        element: <Login />
      },
      {
        path: "register",   
        element: <Register />
      }
    ]
  }
    
]);

export default router;