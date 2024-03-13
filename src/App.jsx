// src/App.jsx

import TextContent from "./components/TextContent";
import ContactInfo from "./components/ContactInfo";
import SpecialRates from "./components/SpecialRates";
import Home from "./components/Home";
import "./styles/Tailwind.css";
import "./styles/NavbarTopSection.css";
import AuthProcess from "./components/SignMecanism/AuthProcess";
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthProcess />} />
        <Route path="/" element={
          <div>
            <Home />
            <ContactInfo />
            <SpecialRates />
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;