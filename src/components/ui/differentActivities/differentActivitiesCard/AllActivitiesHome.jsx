import React, { useState, useEffect } from 'react';
import PaquetesCard from './PaquetesCard';
import { getAllPaquetes } from '../../../classes/Paquete/PaqueteFunctions';


const AllActivitiesHome = () => {
  const [paquetes, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {

        const paquetes = await getAllPaquetes();

        setActivities(paquetes || []); 
      } catch (error) {
        console.error('Error fetching paquetes:', error);
        setActivities([]); 
      }
    };

    fetchActivities(); 
  }, []);

  return (
    <div className="bg-cyan-100 min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">¡Todas las actividades actuales!</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {Array.isArray(paquetes) && paquetes.length > 0 ? (
            paquetes.map((paquete, index) => (
              <div key={index} className="mx-auto">
                <PaquetesCard paquete={paquete} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">No paquetes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllActivitiesHome;
