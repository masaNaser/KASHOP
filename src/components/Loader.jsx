import { Box, CircularProgress } from "@mui/material";
export default function Loader() {
 
  return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress sx={{ color: "var(--primary-color)" }} />
      </Box>
    );  
}
