import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function AddToCartDialog({ open, onClose, product, onAddToCart }) {
  const [count, setCount] = useState(1);
  const [loading, setLoading] = useState(false);
  
  if (!product) return null;

  const handleIncrease = () => setCount((prev) => prev + 1);
  const handleDecrease = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleConfirm = async () => {
    setLoading(true);
    console.log("id + count",product.id,count)
    try {
      await onAddToCart({
        ProductId: product.id,
        Count: count,
      });
      handleClose();
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCount(1); // إرجاع العدّاد إلى 1 عند الإغلاق
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          p: 1,
        },
      }}
    >
      {/* عنوان الـ Dialog مع زر إغلاق */}
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Select Quantity
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderTop: '1px solid #F0F0F0', borderBottom: '1px solid #F0F0F0', py: 3 }}>
        {/* تفاصيل المنتج المختصرة */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5, color: '#1A1A2E' }}>
          {product.title || product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: '#7C3AED', fontWeight: 600, mb: 3 }}>
          ${product.price}
        </Typography>

        {/* أزرار التحكم بالكمية */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            backgroundColor: '#F3F1FF',
            borderRadius: '50px',
            py: 1,
            px: 2,
            width: 'fit-content',
            mx: 'auto',
          }}
        >
          <IconButton
            onClick={handleDecrease}
            disabled={count <= 1 || loading}
            size="small"
            sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#E5E0FF' } }}
          >
            <RemoveIcon fontSize="small" sx={{ color: '#7C3AED' }} />
          </IconButton>

          <Typography variant="h6" sx={{ minWidth: '32px', textAlign: 'center', fontWeight: 700, color: '#1A1A2E' }}>
            {count}
          </Typography>

          <IconButton
            onClick={handleIncrease}
            disabled={loading}
            size="small"
            sx={{ backgroundColor: 'white', '&:hover': { backgroundColor: '#E5E0FF' } }}
          >
            <AddIcon fontSize="small" sx={{ color: '#7C3AED' }} />
          </IconButton>
        </Box>
      </DialogContent>

      {/* زر التأكيد والإضافة */}
      <DialogActions sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ShoppingCartIcon />}
          sx={{
            backgroundColor: '#7C3AED',
            '&:hover': { backgroundColor: '#6D28D9' },
            borderRadius: '10px',
            textTransform: 'none',
            py: 1.2,
            fontSize: '1rem',
            fontWeight: 600,
          }}
        >
          {loading ? 'Adding...' : `Add ${count} to Cart`}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddToCartDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  product: PropTypes.object,
  onAddToCart: PropTypes.func.isRequired,
};
