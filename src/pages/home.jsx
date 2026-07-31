import { Box, Typography, Button } from '@mui/material';
import heroBackground from '../../src/assets/heroBackground.png';
import Categories from '../../src/pages/Categories.jsx';
import Product from '../../src/pages/product/Product.jsx';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          // محاذاة العناصر يميناً أو يساراً بناءً على اللغة
          justifyContent: isRtl ? 'flex-start' : 'flex-start', 
        }}
      >
        <Box
          sx={{
            maxWidth: '500px',
            px: { xs: 2, md: 6 }, // مسافة أمان متوازنة من الطرفين
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            textAlign: isRtl ? 'right' : 'left', // محاذاة النص حسب اللغة
          }}
        >
          <Box
            sx={{
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              width: 'fit-content',
              letterSpacing: isRtl ? 'normal' : '2px', // المسافات الحرفية لا تناسب الخط العربي
            }}
          >
            {t("New Collection")}
          </Box>

          <Typography
            variant="h2"
            sx={{
              color: 'var(--primary-color)',
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
              lineHeight: 1.2,
            }}
          >
            {t("Elevate Your Style")}
          </Typography>

          <Typography
            sx={{
              color: '#474555',
              maxWidth: '400px',
              lineHeight: 1.6,
            }}
          >
            {t("Hero Description")}
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              borderRadius: '8px',
              textTransform: 'none',
              padding: '12px 24px',
              fontWeight: 'bold',
              width: 'fit-content',
              color: 'white',
              backgroundColor: 'var(--primary-color)',
              '&:hover': {
                backgroundColor: 'var(--primary-color-dark)',
              },
            }}
          >
            {t("Shop Now")}
          </Button>
        </Box>
      </Box>
      <Categories />
      <Product />
    </>
  );
}