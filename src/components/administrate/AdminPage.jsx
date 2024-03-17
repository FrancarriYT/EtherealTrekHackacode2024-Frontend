import { useEffect, useState } from "react";
import { NavbarTopSection } from "../navbar/NavbarTopSection";
import { CommandAdmin } from "../ui/CommandAdmin";

// Components to be rendered inside AdminBox based on selected option
const EmpleadosComponent = () => <div>Contenido de Empleados</div>;
const ClientesComponent = () => <div>Contenido de Clientes</div>;
const RolesComponent = () => <div>Contenido de Roles</div>;
const ActividadesComponent = () => <div>Contenido de Actividades</div>;
const PaquetesComponent = () => <div>Contenido de Paquetes</div>;
const SettingsComponent = () => <div>Contenido de Settings</div>;

export const AdminBox = ({ selectedOption }) => {
  // Render corresponding component based on selected option
  const renderComponent = () => {
    switch (selectedOption) {
      case "Empleados":
        return <EmpleadosComponent />;
      case "Clientes":
        return <ClientesComponent />;
      case "Roles":
        return <RolesComponent />;
      case "Actividades":
        return <ActividadesComponent />;
      case "Paquetes":
        return <PaquetesComponent />;
      case "Settings":
        return <SettingsComponent />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div
      className="bg-black text-white py-4 px-6"
      style={{
        position: "fixed",
        bottom: "10%", // Adjust the distance from the bottom
        left: "5%", // Adjust the distance from the left
        width: "90%", // Adjust the width of the box
        height: "50%", // Adjust the height of the box
        overflowY: "auto", // Enable scrolling if content exceeds the box height
        zIndex: 1, // Set a lower z-index for the box
      }}
    >
      {renderComponent()}
    </div>
  );
};

export const AdminPage = () => {
  const [cargo, setCargo] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCommandVisible, setIsCommandVisible] = useState(false);

  useEffect(() => {
    const empleadoData = localStorage.getItem("empleado");
    if (empleadoData) {
      const empleado = JSON.parse(empleadoData);
      setCargo(empleado.cargo || "");
    }
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsCommandVisible(false);
  };

  const handleCommandInputClick = () => {
    setIsCommandVisible(true);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTopSection />
      <div className="bg-black text-white py-4 px-6" style={{ zIndex: 2 }}> {/* Set a higher z-index for the input container */}
        Administrador. Cargo actual: {cargo}
      </div>
      <div className="bg-white py-4 px-6" style={{ zIndex: 2 }}> {/* Set a higher z-index for the input container */}
        <div>
          <CommandAdmin onSelectOption={handleOptionSelect} />
        </div>
      </div>
      {selectedOption && <AdminBox selectedOption={selectedOption} />}
    </div>
  );
};

export default AdminPage;