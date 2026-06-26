import { Snackbar, Alert } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function CustomSnackbar({ open, message, severity = "error", onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000} // يختفي بعد 5 ثوان تلقائياً
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} // يظهر أعلى المنتصف
    >
      <Alert 
        onClose={onClose} 
        severity={severity} // يمكن أن يكون: error, success, warning, info
        variant="filled" 
        sx={{ width: "100%", borderRadius: "8px", fontWeight: 500 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
