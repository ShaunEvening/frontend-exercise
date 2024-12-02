// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as StoreProvider } from "react-redux";
import { ThemeProvider } from "./components/theme-provider";
import "@radix-ui/themes/styles.css";
import "./theme/vars.css";

import App from "./App.tsx";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </ThemeProvider>
);
