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
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Actividades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(servicios) && servicios.length > 0 ? (
          servicios.map((servicio, index) => (
            <ActividadesCard key={index} servicio={servicio} />
          ))
        ) : (
          <p>No hay actividades disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ActividadesHome;
