import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
import "./i18Next"
import { useTranslation } from "react-i18next"
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline"; // يفضل إضافته لضبط الخلفيات والألوانimport useThemeStore from "./store/useThemeStore";
import getTheme from "./theme";
import useThemeStore from "./store/useThemeStore";
function App() {

  const{i18n} = useTranslation();
  const mode = useThemeStore((state) => state.theme);
  useEffect(()=>{
    const dir = i18n.language==="ar"?"rtl":"ltr";
    document.documentElement.dir = dir;
  },[i18n.language])
  return (
    <ThemeProvider theme={getTheme(mode)}> 
                <CssBaseline/>

      <RouterProvider router={router}/>  

       </ThemeProvider> 
  )
}
export default App
