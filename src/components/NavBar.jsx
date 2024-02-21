// src/components/NavBar.jsx
import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto">
        <ul className="flex items-center justify-between">
          <li><a href="#" className="text-white font-bold text-xl">Sheraton Lima</a></li>
          <li className="space-x-4">
            <a href="#galeria" className="text-white">Galería</a>
            <a href="#habitaciones" className="text-white">Habitaciones</a>
            <a href="#restaurantes" className="text-white">Restaurantes</a>
            <a href="#experiencias" className="text-white">Experiencias</a>
            <a href="#eventos" className="text-white">Eventos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;