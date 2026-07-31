import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import i18n from "../i18Next";
// const token = useAuthStore.getState().token;
// هذا السطر تم تنفيذه في اللحظة التي تم فيها تحميل ملف 
// لأول مرة عند فتح الموقع في المتصفح. في هذه اللحظة لم تكن قد سجلت دخولك بعد 
// (أو حتى لو كنت مسجلاً، تم قراءة القيمة الأولية فقط)
const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({baseURL});
//استخدمنا هاي الطريقة عشان الهيدير يتغير مع كل ريكوست
axiosInstance.interceptors.request.use((config)=>{
  config.headers["Accept-Language"]=i18n.language
      return config;

})
// Instance للطلبات المحمية
const axiosInstanceWithToken = axios.create({ baseURL});

// استخدام Request Interceptor لجلب التوكن المحدث لحظة الخروج لكل طلب
axiosInstanceWithToken.interceptors.request.use(
  (config) => {
    // قراءة التوكن الحالية مباشرة من Store وقت إرسال الطلب
    const token = useAuthStore.getState().token;
      config.headers["Accept-Language"]=i18n.language

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceWithToken };