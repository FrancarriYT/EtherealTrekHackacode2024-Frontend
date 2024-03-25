import React, { useState, useEffect } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; // Import the function to filter services by type

const EntradasEventosHome = () => {
  const [entradasEventos, setEntradasEventos] = useState([]);

  useEffect(() => {
    const fetchEntradasEventos = async () => {
      try {
        // Call the function to filter services by type
        const entradasEventosFiltradas = await filtrarServiciosPorTipo('ENTRADAS_A_EVENTOS');
        setEntradasEventos(entradasEventosFiltradas || []); // Set entradasEventos or an empty array if null
      } catch (error) {
        console.error('Error fetching entradas a eventos:', error);
        setEntradasEventos([]); // Set entradasEventos as an empty array in case of error
      }
    };

    fetchEntradasEventos(); // Fetch entradasEventos on component load
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center overflow-x-auto">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-md border-4 border-purple-600">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-800 py-4 rounded-md">
          <FaTicketAlt className="inline-block mr-2" /> Entradas a Eventos Disponibles
        </h2>
        <div className="flex flex-nowrap overflow-x-auto pl-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'purple #ccc' }}>
          {Array.isArray(entradasEventos) && entradasEventos.length > 0 ? (
            entradasEventos.map((entrada, index) => (
              <div key={index} className="flex-none mr-6" style={{ scrollSnapAlign: 'start' }}>
                <ActividadesCard servicio={entrada} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay entradas a eventos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntradasEventosHome;
