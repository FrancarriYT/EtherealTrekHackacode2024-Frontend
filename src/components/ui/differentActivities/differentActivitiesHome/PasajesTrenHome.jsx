import React, { useState, useEffect } from 'react';
import { FaTrain } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; // Import the function to filter services by type

const PasajesTrenHome = () => {
  const [pasajesTren, setPasajesTren] = useState([]);

  useEffect(() => {
    const fetchPasajesTren = async () => {
      try {
        // Call the function to filter services by type
        const pasajesTrenFiltrados = await filtrarServiciosPorTipo('PASAJES_DE_TREN');
        setPasajesTren(pasajesTrenFiltrados || []); // Set pasajesTren or an empty array if null
      } catch (error) {
        console.error('Error fetching pasajes de tren:', error);
        setPasajesTren([]); // Set pasajesTren as an empty array in case of error
      }
    };

    fetchPasajesTren(); // Fetch pasajesTren on component load
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center overflow-x-auto">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-md border-4 border-purple-600">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-800 py-4 rounded-md">
          <FaTrain className="inline-block mr-2" /> Pasajes de Tren Disponibles
        </h2>
        <div className="flex flex-nowrap overflow-x-auto pl-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'purple #ccc' }}>
          {Array.isArray(pasajesTren) && pasajesTren.length > 0 ? (
            pasajesTren.map((pasaje, index) => (
              <div key={index} className="flex-none mr-6" style={{ scrollSnapAlign: 'start' }}>
                <ActividadesCard servicio={pasaje} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay pasajes de tren disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasajesTrenHome;
