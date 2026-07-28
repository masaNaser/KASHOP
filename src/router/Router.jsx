import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import Home from "../pages/home";
import AuthLayout from "../layout/AuthLayout";
import Login  from "../pages/auth/Login";
import  Register  from "../pages/auth/Register";
import Categories from "../pages/Categories";
import Product from "../pages/product/Product";
import ProductDetails from "../pages/product/ProductDetails";
import ProductByCategory from "../pages/product/ProductByCategory";
import Cart from "../pages/Cart";
import ProtectedRoute from "./ProtectedRoute";
import SendCode from "../pages/auth/SendCode";
import ResetPassword from "../pages/auth/ResetPassword";
import Profile from "../pages/Profile";
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
        },
        {
          path: "all-products",
          element: <Product />
        },
        {
          path: "ProductDetails/:id",
          element:<ProductDetails/>
        },
        {
          path: "products/category/:categoryId",
          element: <ProductByCategory />
        } ,
        {
          path: "cart",
          element: 
          <ProtectedRoute>
             <Cart /> 
          </ProtectedRoute>
        },
        {
          path:"profile",
          element: <Profile />
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
      },
      {
        path:"sendCode",
        element: <SendCode />
      },
      {
        path:"resetPassword",
        element: <ResetPassword/>
      }
    ]
  }
    
]);

export default router;