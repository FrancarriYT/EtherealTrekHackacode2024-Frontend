import React, { useState, useEffect } from "react";
import { getAllRoles } from "../../classes/Roles/RoleFunctions";

export function SelectRol({ value, onChange }) {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        async function fetchRoles() {
            try {
                const roles = await getAllRoles();
                setRoles(roles);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        }

        fetchRoles();
    }, []);

    const handleChange = (event) => {
      onChange(event.target.value);
    };
  
    return (
        <div className="relative">
            <select
                id="rol"
                name="rol"
                className="mt-1 block w-[140px] pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={value}
                onChange={handleChange}
            >
                <option value="">Selecciona un Rol</option>
                {roles.map(role => (
                    <option key={role.id} value={role.nombre}>{role.nombre}</option>
                ))}
            </select>
        </div>
    );
}
