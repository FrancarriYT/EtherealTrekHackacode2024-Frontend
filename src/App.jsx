// src/App.jsx
import Home from "./components/Home";
import "./styles/Tailwind.css";
import "./styles/NavbarTopSection.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import TextContent from "./components/TextContent";
import ContactInfo from "./components/ContactInfo";
import SpecialRates from "./components/SpecialRates";
import AuthProcess from "./components/SignMecanism/AuthProcess";
import { AdminPage } from "./components/administrate/AdminPage";

const App = () => {
  const signOut = useSignOut();

  useEffect(() => {
    const handleUnload = () => {
      const rememberMeCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('rememberMe='));
      if (!rememberMeCookie || rememberMeCookie.split('=')[1] !== 'true') {
        signOut();
        document.cookie = "_auth_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem('empleado');
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [signOut]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthProcess />} />
        <Route path="/perfil" element={<AuthProcess />} />
        <Route path="/modo_administrativo" element={<AdminPage />} />
        <Route
          path="/"
          element={
            <div>
              <Home />
              <ContactInfo />
              <SpecialRates />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;