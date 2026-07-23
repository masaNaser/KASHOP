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