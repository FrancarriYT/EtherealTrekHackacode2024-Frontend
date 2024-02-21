// src/components/Navbar.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="./components/icons/placeholder_logo.webp" alt="Logo" className="w-8 h-8 mr-4" />

        <a href="#" className="text-white mr-4">Galería</a>
        <a href="#" className="text-white mr-4">Habitaciones</a>
        <a href="#" className="text-white mr-4">Restaurantes</a>
        <a href="#" className="text-white mr-4">Experiencias</a>
        <a href="#" className="text-white">Eventos</a>
      </div>

      <div className="flex items-center">
        {/* Icono de usuario (puedes agregar funcionalidad de inicio de sesión aquí) */}
        <FaUser className="text-white mr-2" />
        <span className="text-white">Iniciar sesión</span>
      </div>
    </nav>
  );
};

export default NavBar;
