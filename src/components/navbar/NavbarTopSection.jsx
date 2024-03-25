import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { ThemeProvider, useTheme } from "../Theme-provider";
import { Switch } from "../ui/switch";
import { ProfileDropDownMenu } from "../ui/DropDown-MenuDemo";
import EtherealTrekLogo from "../icons/EtherealTrekLogo.jpeg"; // Import the logo image
import { Label } from "@radix-ui/react-label";

export function useLoggedInState() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado mediante la existencia de la cookie "_auth"
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('_auth='));
    setIsLoggedIn(!!authCookie);
  }, []);

  return isLoggedIn;
}

export const NavbarTopSection = () => {
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

  const handleClickLogo = () => {
    navigate('/');
  };

  return (
    <div className="bg-[rgba(0,13,32,255)]">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src={EtherealTrekLogo}
            alt="Logo"
            className="w-20 h-20 mr-4 cursor-pointer glow" // Added glow effect and cursor pointer
            onClick={handleClickLogo} // Added click event to redirect to "/"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            className="data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-sky-300"
          />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
        {/* Usuario y sesión */}
        <div className="relative bg-white">
          <ProfileDropDownMenu isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
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
