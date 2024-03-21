import React, { useState } from "react";

export function SelectServicio({ value, onChange }) {
    function handleSelect(event) {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    }

    return (
        <div className="relative">
            <select
                id="servicio"
                name="servicio"
                className="mt-1 block w-350px pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={value}
                onChange={handleSelect}
            >
                <option value="">Selecciona un Servicio</option>
                <option value="VENDEDOR">Rol de Vendedor</option>
                <option value="CONTADOR">Rol de Contador</option>
            </select>
        </div>
    );
}
