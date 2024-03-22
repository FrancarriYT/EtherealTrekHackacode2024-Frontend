import React from 'react';
import { FaCar, FaMoneyBill, FaCalendarAlt, FaFlag } from 'react-icons/fa'; // Importar los iconos de Font Awesome
import { ServiciosCarousel } from './differentImagesCarousels/ServiciosCarousel'; // Ruta correcta al componente

const ActividadesCard = ({ servicio }) => {
  const { descripcion, tipoServicio, destiono, pais, costo, fechaServicio, imagenPrincipal, imagenes } = servicio;
  
  // Crear un array para almacenar las IDs de las imágenes
  const [imageIds, setImageIds] = React.useState([]);

  // Función para cargar las imágenes al array
  React.useEffect(() => {
    if (imagenPrincipal) {
      setImageIds(prevImageIds => [...prevImageIds, imagenPrincipal]);
    }
    if (imagenes && Array.isArray(imagenes)) {
      setImageIds(prevImageIds => [...prevImageIds, ...imagenes]);
    }
  }, [imagenPrincipal, imagenes]);

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="max-h-48 overflow-hidden rounded-t-xl">
        <ServiciosCarousel imageIds={imageIds} /> {/* Pasar los ids de las imágenes */}
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <h5 className="block font-sans text-xl font-medium leading-snug tracking-normal text-cyan-500 antialiased">
            <span className="font-bold">{descripcion}</span> {/* Descripción resaltada */}
          </h5>
        </div>
        <p className="block font-sans text-base font-bold leading-relaxed text-gray-700 antialiased">
          {tipoServicio} {/* Tipo de servicio */}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
          <FaFlag className="h-5 w-5 text-cyan-500 inline" /> {/* Icono de bandera */}
          <span className="font-bold">{pais}</span> {/* País */}
          <span className="font-bold ml-2">{destiono}</span> {/* Destino */}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
          <FaCalendarAlt className="h-5 w-5 text-gray-500 inline" /> {/* Icono de calendario */}
          {fechaServicio} {/* Fecha del servicio */}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
          <FaMoneyBill className="h-5 w-5 text-green-500 inline" /> {/* Icono de dinero */}
          <span className="text-green-500 ml-1">{costo}$</span> {/* Precio */}
        </p>
        <div className="flex items-center"> {/* Contenedor flex */}
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            <span className="font-bold">Contiene: </span>
          </p>
          <p className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
            <span
              data-tooltip-target="car"
              className="cursor-pointer rounded-full border border-cyan-500/5 bg-cyan-500/5 p-3 flex items-center justify-center text-cyan-500 transition-colors hover:border-cyan-500/10 hover:bg-cyan-500/10 hover:!opacity-100 group-hover:opacity-70"
              style={{ width: 'fit-content', height: 'fit-content' }}
            >
              <FaCar className="h-4 w-4" /> {/* Icono de tipo de servicio */}
            </span>
          </p>
        </div>
        <div className="group mt-2 inline-flex flex-wrap items-center gap-3">
          {/* Resto de los elementos */}
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

export default ActividadesCard;
