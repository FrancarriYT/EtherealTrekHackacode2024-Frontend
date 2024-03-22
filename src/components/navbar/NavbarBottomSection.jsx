import React, { useState } from "react";
import {
  FaBed,
  FaCar,
  FaBriefcase,
  FaTicketAlt,
  FaFire,
  FaHouseUser,
  FaUmbrellaBeach,
} from "react-icons/fa";
import ActividadesHome from "../ui/differentActivities/differentActivitiesHome/ActividadesHome";

const NavbarBottomSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleIconClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Define una función para renderizar el componente correspondiente según la opción activa
  const renderActiveComponent = () => {
    switch (activeIndex) {
      case 0:
        return <Accommodations />;
      case 1:
        return <Tickets />;
      case 2:
        return <Packages />;
      case 3:
        return <Offers />;
      case 4:
        return <Rentals />;
      case 5:
        return <ActividadesHome />;
      case 6:
        return <Cars />;
      default:
        return null;
    }
  };
  return (
    <div className="text-gray-800 border-b border-black border-opacity-100 shadow-md py-2">
      <div className="flex justify-center pt-4">
        <div className="flex items-center space-x-4">
          {/* Elementos de la segunda sección de la navbar */}
          {[
            "Alojamientos",
            "Pasajes",
            "Paquete",
            "Oferta",
            "Alquiler",
            "Actividades",
            "Autos",
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
                {index === 0 && (
                  <FaBed
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 1 && (
                  <FaTicketAlt
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 2 && (
                  <FaBriefcase
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 3 && (
                  <FaFire
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 4 && (
                  <FaHouseUser
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 5 && (
                  <FaUmbrellaBeach
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
                {index === 6 && (
                  <FaCar
                    size={20}
                    style={{
                      color: activeIndex === index ? "black" : "inherit",
                    }}
                  />
                )}
              </div>
              <span
                className={`mt-2 ${activeIndex === index ? "text-black" : ""}`}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
      {renderActiveComponent()}
    </div>
  );
};

export default NavbarBottomSection;
