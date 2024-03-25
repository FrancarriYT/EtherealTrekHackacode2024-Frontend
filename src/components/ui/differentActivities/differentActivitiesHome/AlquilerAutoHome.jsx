import React, { useState, useEffect } from 'react';
import { FaCar } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; // Import the function to filter services by type

const AlquilerAutoHome = () => {
  const [alquileres, setAlquileres] = useState([]);

  useEffect(() => {
    const fetchAlquileres = async () => {
      try {
        // Call the function to filter services by type
        const alquileresFiltrados = await filtrarServiciosPorTipo('ALQUILER_DE_AUTO');
        setAlquileres(alquileresFiltrados || []); // Set alquileres or an empty array if null
      } catch (error) {
        console.error('Error fetching alquileres:', error);
        setAlquileres([]); // Set alquileres as an empty array in case of error
      }
    };

    fetchAlquileres(); // Fetch alquileres on component load
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center overflow-x-auto">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-md border-4 border-purple-600">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-800 py-4 rounded-md">
          <FaCar className="inline-block mr-2" /> Alquiler de Autos Disponibles
        </h2>
        <div className="flex flex-nowrap overflow-x-auto pl-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'purple #ccc' }}>
          {Array.isArray(alquileres) && alquileres.length > 0 ? (
            alquileres.map((alquiler, index) => (
              <div key={index} className="flex-none mr-6" style={{ scrollSnapAlign: 'start' }}>
                <ActividadesCard servicio={alquiler} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay alquileres disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlquilerAutoHome;
