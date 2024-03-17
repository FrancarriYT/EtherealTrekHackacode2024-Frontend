import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export function ProfileDropDownMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const signOut = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el usuario está autenticado mediante la existencia de la cookie "_auth"
    const authCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('_auth='));
    setIsLoggedIn(!!authCookie);
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
    signOut();
    
    // Clear cookies
    document.cookie = "_auth_refresh=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem('empleado');
    console.log("Cookies after sign out:", document.cookie);
    
    setIsLoggedIn(false);
    navigate('/');
  };
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isLoggedIn ? (
          <Button variant="outline">Perfil</Button>
        ) : (
          <Link to="/login">
            <Button variant="outline">Acceder</Button>
          </Link>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:bg-gray-300">
        {isLoggedIn ? (
          <>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/perfil">
                <DropdownMenuItem
                  style={{ color: "black", border: "1px solid black" }}
                >
                  Perfil
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              {/* Add link for admin mode */}
              <Link to="/modo_administrativo">
                <DropdownMenuItem
                  style={{ color: "black", border: "1px solid black" }}
                >
                  Modo Administrativo
                  <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              {/* Otros elementos del menú para usuarios autenticados */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                style={{
                  color: "black",
                  border: "1px solid black",
                  transition: "box-shadow 0.3s ease",
                }}
                onClick={handleSignOut} // Corrected to pass the function without invoking it
              >
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <>
            {/* Elementos del menú para usuarios no autenticados */}
            <Link to="/login">
              <DropdownMenuItem
                style={{
                  color: "black",
                  border: "1px solid black",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                Iniciar sesión / Registrarse
              </DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}