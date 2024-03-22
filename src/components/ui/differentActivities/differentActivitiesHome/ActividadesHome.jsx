import React, { useState, useEffect } from 'react';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; // Importa la función para filtrar servicios por tipo

const ActividadesHome = () => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        // Llama a la función para filtrar servicios por tipo
        const serviciosFiltrados = await filtrarServiciosPorTipo('EXCURSIONES');
        setServicios(serviciosFiltrados || []); // In case serviciosFiltrados is undefined, set empty array
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
        setServicios([]); // Set servicios to empty array on error
      }
    };

    fetchServicios(); // Llama a la función para obtener los servicios al cargar el componente
  }, []);

  return (
    <div className="bg-cyan-100 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Actividades</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"> {/* Aumentar el espacio entre las tarjetas en pantallas grandes */}
          {Array.isArray(servicios) && servicios.length > 0 ? (
            servicios.map((servicio, index) => (
              <div key={index} className="mx-auto"> {/* Centrar las tarjetas en la fila */}
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

export default ActividadesHome;
