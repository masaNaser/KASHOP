import  { Typography,Box } from "@mui/material"; 
import { useEffect } from "react";
import {getCart} from "../servicse/cart";
export default function Cart() {
  const handelCart=async()=>{
    const response = await getCart();
    console.log("cart",response);
  }
  useEffect(()=>{
    handelCart();
  },[])
  return (
    <Box>
       <Typography variant="h4" component="h1" gutterBottom>
          Shopping Cart
      </Typography>
    
    </Box>
  )
}
