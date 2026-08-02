import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => {
  return createTheme({
    palette: {
      mode, // اختصار لـ mode: mode
    },
  });
};

export default getTheme;