import React, { useState } from "react";

export function SelectContinents({ value, onChange }) {
    function handleSelect(event) {
        const selectedValue = event.target.value;
        onChange(selectedValue);
    }

    return (
        <div className="relative">
            <select
                id="continent"
                name="continent"
                className="mt-1 block w-350px pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={value}
                onChange={handleSelect}
            >
                <option value="">Selecciona un Continente</option>
                <option value="Africa">África</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="America">América</option>
                <option value="Oceania">Oceanía</option>
            </select>
        </div>
    );
}
