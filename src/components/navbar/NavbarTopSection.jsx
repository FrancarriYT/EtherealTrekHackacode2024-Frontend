import React, { useState, useEffect } from "react";
import { FaQuestion, FaLanguage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import "./DarkModeButton.css";
import { ThemeProvider, useTheme } from "../Theme-provider";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-label";

const NavbarTopSection = () => {
  const { theme, setTheme } = useTheme();
  const [showUserPopup, setShowUserPopup] = useState(false);
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

  const toggleUserPopup = () => {
    setShowUserPopup(!showUserPopup);
  };

  const handleSignOut = () => {
    signOut();
    document.cookie = "_auth_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/login');
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
            <button onClick={toggleUserPopup} className="relative">
              <div className="flex items-center">
                <div className="w-8 h-8 border border-gray-500 rounded-full overflow-hidden mr-2">
                  <img
                    src="./icons/user_placeholder.webp"
                    alt="Usuario"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{isLoggedIn ? "Perfil" : "Iniciar sesión"}</span>
              </div>
            </button>

            {/* Popup del usuario */}
            {showUserPopup && (
              <div className="absolute top-12 right-0 bg-white p-4 border border-gray-500">
                {/* Contenido del popup del usuario */}
                <div className="flex items-center">
                  {/* Imagen de perfil del usuario en el popup */}
                  <div className="w-12 h-12 border border-gray-500 rounded-full overflow-hidden mr-4">
                    <img
                      src="./icons/user_placeholder.webp"
                      alt="Usuario"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p>¡Hola!</p>
                    <hr className="border-black" />
                    {isLoggedIn ? (
                      <button onClick={handleSignOut}>Cerrar sesión</button>
                    ) : (
                      <Link to="/login">Iniciar Sesión / Registrarse</Link>
                    )}
                  </div>
                </div>
              </div>
            )}
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
