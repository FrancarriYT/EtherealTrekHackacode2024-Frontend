import React from 'react';
import NavBar from './NavBar';

const Home = () => {
  return (
    <div className="bg-white">
      <NavBar />
      <header className="bg-cover bg-center h-screen relative" style={{ backgroundImage: 'url(https://via.placeholder.com/1920x1080)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center z-10">Bienvenido al Sheraton Lima Historic Center</h1>
        </div>
      </header>
      {/* Secciones y contenido adicional */}
    </div>
  );
};

export default Home;