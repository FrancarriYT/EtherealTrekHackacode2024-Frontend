import React from "react";

import App from "./App";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/Theme-provider";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from 'react-auth-kit/createStore';

const root = document.getElementById("root");
const reactRoot = createRoot(root);

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: true
});
reactRoot.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <AuthProvider store={store}>
      <App />
    </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
