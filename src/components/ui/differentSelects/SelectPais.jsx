import React, { useState, useEffect } from "react";
import { getPaisesPorContinente, getPaises } from "../../classes/PaisesNums/PaisesFunctions";

export function SelectPaises({ continente, value, onChange }) {
    const [paises, setPaises] = useState([]);

    useEffect(() => {
        async function fetchPaises() {
            try {
                let data;
                if (continente) {
                    data = await getPaisesPorContinente(continente);
                } else {
                    data = await getPaises();
                }
                if (data.success) {
                    setPaises(data.data);
                } else {
                    console.error("Error fetching paises:", data.message);
                }
            } catch (error) {
                console.error("Error fetching paises:", error);
            }
        }

        fetchPaises();
    }, [continente]);

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    // Función para generar un hash único basado en el nombre del país
    const hashCode = (s) => {
        if (s) {
            return s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
        } else {
            return 0;
        }
    };

    return (
        <div className="relative">
            <select
                id="paises"
                name="paises"
                className="mt-1 block w-[140px] pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={value}
                onChange={handleChange}
            >
                <option value="">Selecciona un País</option>
                {paises.map((pais, index) => (
                    <option key={index} value={pais}>{pais}</option>
                ))}
            </select>
        </div>
    );
}