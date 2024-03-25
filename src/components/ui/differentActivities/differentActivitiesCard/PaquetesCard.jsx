import React from 'react';
import { FaBed, FaTicketAlt } from 'react-icons/fa';
import { ServiciosCarousel } from './differentImagesCarousels/ServiciosCarousel';

const PaquetesCard = ({ paquete }) => {
  const { nombre, descripcion, precio, listaServicios, imagenes, imagenPrincipal } = paquete;
  

  const imageIds = [];


  if (imagenPrincipal) {
    imageIds.push(imagenPrincipal);
  }


  listaServicios.forEach(servicio => {
    if (servicio.imagenPrincipal) {
      imageIds.push(servicio.imagenPrincipal);
    }
    if (servicio.imagenes && Array.isArray(servicio.imagenes)) {
      imageIds.push(...servicio.imagenes);
    }
  });

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="max-h-48 overflow-hidden rounded-t-xl ml-5">
        <ServiciosCarousel imageIds={imageIds} /> 
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-cyan-500 antialiased">
            <span className="font-bold">{nombre}</span> 
          </h5>
        </div>
        <p className="block font-sans text-base font-medium leading-relaxed text-gray-700 antialiased">
          {descripcion} 
        </p>
        <p className="block font-sans text-base font-medium leading-relaxed text-gray-700 antialiased">
          <FaTicketAlt className="h-5 w-5 text-blue-500 inline" /> 
          <span className="font-bold ml-2">{precio}$</span> 
        </p>
        <div className="group mt-2 inline-flex flex-wrap items-center gap-3">

          {listaServicios.map((servicio, index) => (
            <div key={index} className="flex items-center">
              {servicio.tipoServicio === 'HOTEL_POR_NOCHE' && (
                <FaBed className="h-5 w-5 text-cyan-500 inline" /> 
              )}
              {servicio.tipoServicio === 'ENTRADAS_A_EVENTOS' && (
                <FaTicketAlt className="h-5 w-5 text-cyan-500 inline" /> 
              )}
              <p className="ml-2">{servicio.descripcion}</p> 
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 pt-3">
        <button
          className="block w-full select-none rounded-lg bg-cyan-500 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default PaquetesCard;
