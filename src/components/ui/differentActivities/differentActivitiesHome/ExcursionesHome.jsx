import React, { useState, useEffect } from 'react';
import { FaReact } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; 

const ExcursionesHome = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
       
        const serviciosFiltrados = await filtrarServiciosPorTipo('EXCURSIONES');
        setServicios(serviciosFiltrados || []); 
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
        setServicios([]); 
      }
    };

    fetchServicios(); 
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center overflow-x-auto">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-md border-4 border-purple-600">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-800 py-4 rounded-md">
          <FaReact className="inline-block mr-2" /> Excursiones Disponibles
        </h2>
        <div className="flex flex-nowrap overflow-x-auto pl-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'purple #ccc' }}>
          {Array.isArray(servicios) && servicios.length > 0 ? (
            servicios.map((servicio, index) => (
              <div key={index} className="flex-none mr-6" style={{ scrollSnapAlign: 'start' }}>
                <ActividadesCard servicio={servicio} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay actividades disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcursionesHome;
