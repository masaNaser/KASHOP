import { RouterProvider } from "react-router-dom"
import router from "./router/Router"
import "./i18Next"
import { useTranslation } from "react-i18next"
import { useEffect } from "react";

function App() {

  const{i18n} = useTranslation();
  useEffect(()=>{
    const dir = i18n.language==="ar"?"rtl":"ltr";
    document.documentElement.dir = dir;
  },[i18n.language])
  return (
      <RouterProvider router={router}/>     
  )
}
export default App
