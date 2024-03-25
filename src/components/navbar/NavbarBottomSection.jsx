import React, { useState } from "react";
import {
  FaBed,
  FaCar,
  FaBriefcase,
  FaTicketAlt,
  FaFire,
  FaHouseUser,
  FaUmbrellaBeach,
  FaPlane, // Added FaPlane icon
  FaTrain,
} from "react-icons/fa";
import AlojamientosHome from "../ui/differentActivities/differentActivitiesHome/AlojamientosHome";
import ExcursionesHome from "../ui/differentActivities/differentActivitiesHome/ExcursionesHome";
import AllActivitiesHome from "../ui/differentActivities/differentActivitiesCard/AllActivitiesHome";
import AlquilerAutoHome from "../ui/differentActivities/differentActivitiesHome/AlquilerAutoHome";
import PasajesAvionHome from "../ui/differentActivities/differentActivitiesHome/PasajesAvionHome";
import PasajesTrenHome from "../ui/differentActivities/differentActivitiesHome/PasajesTrenHome";
import EntradasEventosHome from "../ui/differentActivities/differentActivitiesHome/EntradasAEventosHome";
import PaquetesHome from "../ui/differentActivities/differentActivitiesHome/PaquetesHome";

const NavbarBottomSection = () => {
  const [activeIndex, setActiveIndex] = useState(8);

  const handleIconClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  const renderActiveComponent = () => {
    switch (activeIndex) {
      case 0:
        return <AlojamientosHome />;
      case 1:
        return <AlquilerAutoHome />;
      case 2:
        return <PasajesAvionHome/>; 
      case 3:
        return <PasajesTrenHome/>; 
      case 4:
        return <ExcursionesHome />;
      case 5:
        return <EntradasEventosHome/>;
      case 6:
        return <PaquetesHome/>;
      default:
        return <AllActivitiesHome />; // Render the default component
    }
  };

  return (
    <div className="text-gray-800 border-b border-black border-opacity-100 shadow-md py-2">
      <div className="flex justify-center pt-4">
        <div className="flex items-center space-x-4">
          {/* Elements of the second section of the navbar */}
          {[
            "Alojamientos",
            "Auto",
            "Avión",
            "Tren",
            "Excursiones",
            "Eventos",
            "Paquetes",
          ].map((item, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer relative min-w-20 ${
                activeIndex === index
                  ? "text-white bg-cyan-500 font-semibold"
                  : "hover:text-cyan-700"
              } p-2 rounded-full transition duration-300`}
              onClick={() => handleIconClick(index)}
            >
              <div
                className={`bg-white text-cyan-500 rounded-full inline-block p-1 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
                  activeIndex === index ? "bg-cyan-100" : ""
                }`}
              >
                {index === 0 && <FaBed size={20} />}
                {index === 1 && <FaCar size={20} />}
                {index === 2 && <FaPlane size={20} />} {/* Added icon for "Avión" */}
                {index === 3 && <FaTrain size={20} />}
                {index === 4 && <FaUmbrellaBeach size={20} />} {/* Added icon for "Eventos" */}
                {index === 5 && <FaFire size={20} />}
                {index === 6 && <FaBriefcase size={20} />}
              </div>
              <span className={`mt-2 ${activeIndex === index ? "text-black" : ""}`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      {renderActiveComponent()}
    </div>
  );
};

export default NavbarBottomSection;
