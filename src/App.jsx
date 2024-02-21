// src/App.jsx
import React from 'react';
import NavBar from './components/NavBar';
import TextContent from './components/TextContent';
import ContactInfo from './components/ContactInfo';
import SpecialRates from './components/SpecialRates';
import Home from './components/Home';
import './styles/App.css'

const App = () => {
  return (
    <div>
      <Home />
      <TextContent />
      <ContactInfo />
      <SpecialRates />
      {/* Otras secciones y componentes */}
    </div>
  );
};

export default App;