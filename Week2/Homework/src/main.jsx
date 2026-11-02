import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Global, ThemeProvider } from "@emotion/react";
import App from "./App.jsx";
import { theme } from "./styles/theme";
import globalStyle from "./styles/global";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <App />
    </ThemeProvider>
  </StrictMode>
);