import { Snackbar, Alert } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function CustomSnackbar({ open, message, severity = "error", onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // يختفي بعد 3 ثوان تلقائياً
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }} 
    >
      <Alert 
        onClose={onClose} 
        severity={severity}
        variant="filled" 
        sx={{ width: "100%", borderRadius: "8px", fontWeight: 500 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
