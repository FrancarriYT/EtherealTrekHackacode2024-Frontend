import React from "react";

import App from "./App";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/Theme-provider";

const root = document.getElementById("root");
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
