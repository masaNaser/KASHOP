import { Box, Typography, Button} from '@mui/material';
import heroBackground from '../../src/assets/heroBackground.png';
import Categories from '../../src/pages/Categories.jsx';



export default function Home() {
  return (
    <>
      <Box className="container"
        sx={{
          // 1. إعداد الخلفية
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover', // تجعل الصورة تتمدد لتغطي الشاشة بالكامل دون تشويه
          backgroundPosition: 'center center', // توسيط الخلفية
          backgroundRepeat: 'no-repeat', // لمنع التكرار
          height: '100vh', // ملء كامل ارتفاع الشاشة
          width: '100%',
          display: 'flex', 
          alignItems: 'center', // توسيط المحتوى عمودياً
          overflow: 'hidden', // لمنع ظهور أي شريط تمرير
          
        }}
      >
        <Box
          sx={{
            maxWidth: '500px', // تحديد عرض المحتوى  
            paddingLeft: '5%', 
            display: 'flex',
            flexDirection: 'column',
            gap: 2, 
          }}
        >
          <Box
            sx={{
              // display: 'inline-flex',
              backgroundColor: 'var(--primary-color)', 
              color: 'white',
              borderRadius: '999px', 
              padding: '10px 7px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              width: 'fit-content', //  العرض حسب المحتوى 
              letterSpacing: '2px', // زيادة المسافة بين الحروف
              fontFamily: '"Times New Roman", Times, serif !important',
            }}
          >
            New Collection
          </Box>

          <Typography
            variant="h7"
            sx={{
              color: 'var(--primary-color)',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', sm: '3rem', md: '4.5rem' },
              lineHeight: 1,
              marginTop: 1,
              fontFamily: '"Times New Roman", Times, serif !important',
            }}
          >
            Elevate Your Style
          </Typography>

          <Typography
            sx={{
              color: '#474555',
              maxWidth: '400px', // لتحديد عرض النص
              lineHeight: 1.6,
            }}
          >
            Discover a curated selection of premium electronics, fashion, and lifestyle essentials designed for the modern connoisseur.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              marginTop: 2,
              borderRadius: '8px', // زوايا مستديرة للزر
              textTransform: 'none', // لمنع تحويل كل الحروف لكبيرة
              padding: '12px 24px',
              fontWeight: 'bold',
              width: 'fit-content', // العرض حسب المحتوى
              color: 'white', // لون النص
              backgroundColor: 'var(--primary-color)', // لون الخلفية
              '&:hover': {
                backgroundColor: 'var(--primary-color-dark)', 
              },
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <Box className="container">
        <Categories />
      </Box>
      </>
  );
}
