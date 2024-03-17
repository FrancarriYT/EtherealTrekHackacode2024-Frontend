import React, { useState, useEffect } from "react";
import { FaQuestion, FaLanguage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { ThemeProvider, useTheme } from "../Theme-provider";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-label";
import { ProfileDropDownMenu } from "../ui/DropDown-MenuDemo";

export function useLoggedInState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado mediante la existencia de la cookie "_auth"
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('_auth='));
    setIsLoggedIn(!!authCookie);
  }, []);

  return isLoggedIn;
}

export const NavbarTopSection = () => { // Changed to export const NavbarTopSection
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      setTheme(storedDarkMode);
    }
    
    // Verificar si el usuario está autenticado mediante la existencia de la cookie "_auth"
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('_auth='));
    setIsLoggedIn(!!authCookie);
  }, [setTheme]);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
  }, [theme]);

  const handleSignOut = () => {
    console.log("Signing out..."); // Log to check if function is invoked
    signOut();
    console.log("Cookies after sign out:", document.cookie); // Log to check if cookies are cleared
    document.cookie = "_auth_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "RememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsLoggedIn(false); // Update isLoggedIn state
    navigate('/'); // Navigate to home after logout
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src="./icons/placeholder_logo.webp"
            alt="Logo"
            className="w-8 h-8 mr-4"
          />
        </div>
        <div className="flex items-center space-x-2  ">
          <Switch
            id="airplane-mode"
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-sky-300"
          />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        {/* Sección de ayuda, usuario, selector de idiomas y Switch */}
        <div className="flex items-center space-x-10 bg-gray-200 p-2 rounded-r-md">
          {/* Ayuda */}
          <button className="dark-mode-toggle relative">
            <FaQuestion size={20} className="toggle-icon" />
          </button>

          {/* Usuario y sesión */}
          <div className="relative">
            <ProfileDropDownMenu isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
          </div>

          {/* Selector de idiomas */}
          <div className="relative">
            <button className="relative">
              <FaLanguage size={20} />
              {/* Popup de idiomas */}
              {/* Agrega la lógica para mostrar el popup de idiomas aquí */}
            </button>
          </div>

          {/* Switch */}
          {/* <CustomSwitch /> */}
        </div>
      </div>
    </div>
  );
};

const ThemedNavbarTopSection = () => {
  return (
    <ThemeProvider>
      <NavbarTopSection />
    </ThemeProvider>
  );
};

export default ThemedNavbarTopSection;
