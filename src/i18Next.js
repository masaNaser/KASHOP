// import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector"
i18n
.use(detector)
  .use(initReactI18next)
  .init({
   
    resources: {
      en: {
        translation: {
          "KASHOP": "KASHOP",
          "Login": "Login",
          "Register":"Register",
          "Log out":"Log out",
          "Categories":"Categories",
          "All Products":"Products",
          "Home":"Home",
          "Search...":"Search",
          "My Profile":"My Profile",
          "Cart":"Cart",
          "New Collection": "New Collection",
      "Elevate Your Style": "Elevate Your Style",
      "Hero Description": "Discover a curated selection of premium electronics, fashion, and lifestyle essentials designed for the modern connoisseur.",
      "Shop Now": "Shop Now"
        }
      },
        ar: {
        translation: {
          "KASHOP": "كاشوب",
          "Login": "تسجيل دخول",
          "Register":"انشاء حساب",
          "Log out":"تسجيل خروج",
          "Categories":"التصنيفات",
          "All Products":"المنتجات",
          "Home":"الرئيسية",
          "Search...":"البحث",
          "My Profile":"ملفي الشخصي",
          "Cart":"سلة التسوق",
          "New Collection": "تشكيلة جديدة",
      "Elevate Your Style": "ارتق بأسلوبك",
      "Hero Description": "اكتشف مجموعة مختارة من الإلكترونيات والملابس والمستلزمات العصرية المصممة خصيصاً لأصحاب الذوق الرفيع.",
      "Shop Now": "تسوق الآن"
        }
      }
    },
    // lng: "ar", // if you're using a language detector, do not define the lng option
    //هاي اذا اليوزر طلب لغة مش موجودة ف اعتبرها انجليزي
    fallbackLng: "en",
  });
  export default i18n;