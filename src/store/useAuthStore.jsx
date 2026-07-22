import { create } from "zustand";
const useAuthStore = create((set) => ({
    // نخزن قيمة التوكن ع مستوى ال zustand store انه بنقدر نجيبها ب اي صفحة وهيك 
  token: localStorage.getItem("token") || null,
  //فنكشن لتحديث قيمة التوكن
  setToken:(newToken) => {
    //نخزن التوكن باللوكل ستوريج في حال تم تغير قيمتها
    localStorage.setItem("token", newToken);
    set({ token: newToken });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
}}));
export default useAuthStore;