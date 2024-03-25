import React, { useState, useEffect } from 'react';
import { FaTicketAlt } from 'react-icons/fa';
import ActividadesCard from '../differentActivitiesCard/ActividadesCard';
import { filtrarServiciosPorTipo } from '../../../classes/Servicios/ServicioFunctions'; 
import { getAllPaquetes } from '../../../classes/Paquete/PaqueteFunctions';

const PaquetesHome = () => {
  const [paquetes, setPaquetes] = useState([]);

  useEffect(() => {
    const fetchPaquetes = async () => {
      try {

        const paquetesFiltrados = await getAllPaquetes();
        setPaquetes(paquetesFiltrados || []); 
      } catch (error) {
        console.error('Error fetching paquetes:', error);
        setPaquetes([]);
      }
    };

    fetchPaquetes();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex items-center justify-center overflow-x-auto">
      <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-md border-4 border-purple-600">
        <h2 className="text-4xl font-semibold mb-8 text-center text-purple-800 py-4 rounded-md">
          <FaTicketAlt className="inline-block mr-2" /> Paquetes Disponibles
        </h2>
        <div className="flex flex-nowrap overflow-x-auto pl-6" style={{ scrollbarWidth: 'thin', scrollbarColor: 'purple #ccc' }}>
          {Array.isArray(paquetes) && paquetes.length > 0 ? (
            paquetes.map((paquete, index) => (
              <div key={index} className="flex-none mr-6" style={{ scrollSnapAlign: 'start' }}>
                <ActividadesCard servicio={paquete} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No hay paquetes disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaquetesHome;
