import React, { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; 
const AlojamientosHome = () => {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      try {

        const alojamientosFiltrados = await filtrarServiciosPorTipo('HOTEL_POR_NOCHE');
        setAlojamientos(alojamientosFiltrados || []); 
      } catch (error) {
        console.error('Error al obtener los alojamientos:', error);
        setAlojamientos([]); // Establece alojamientos como un array vacío en caso de error
      }
    };

    fetchAlojamientos(); 
  }, []);

  return (
    <div className="bg-cyan-100 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
          <FaReact className="inline-block mr-2" /> Alojamientos Disponibles 
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"> 
          {Array.isArray(alojamientos) && alojamientos.length > 0 ? (
            alojamientos.map((alojamiento, index) => (
              <div key={index} className="mx-auto"> 
                <ActividadesCard servicio={alojamiento} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay alojamientos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlojamientosHome;
