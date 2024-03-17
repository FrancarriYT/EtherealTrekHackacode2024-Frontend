import { useEffect, useState } from "react";
import { NavbarTopSection } from "../navbar/NavbarTopSection";
import { CommandAdmin } from "../ui/CommandAdmin";

export const AdminPage = () => {
  const [cargo, setCargo] = useState("");

  useEffect(() => {
    const empleadoData = localStorage.getItem("empleado");
    if (empleadoData) {
      const empleado = JSON.parse(empleadoData);
      setCargo(empleado.cargo || "");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarTopSection />
      <div className="bg-black text-white py-4 px-6">
        Administrador. Cargo actual: {cargo}
      </div>
      <div className="bg-white  py-4 px-6">
        <CommandAdmin />
      </div>
    </div>
  );
};

export default AdminPage;

