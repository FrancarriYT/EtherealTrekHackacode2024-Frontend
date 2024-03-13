import React from 'react';
import { DatePickerWithRange } from './ui/DatePickerWithRange';

const DateBox = () => {
  return (
    <div className="bg-cyan-500 text-white p-2 rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-2">Actividades</h2>
      <div className="flex items-center space-x-2">
        <label htmlFor="destino" className="sr-only">Destino</label>
        <input
          type="text"
          id="destino"
          placeholder="Mendoza, Mendoza, Argentina"
          className="p-1 bg-white text-black rounded flex-shrink-0"
        />

        <DatePickerWithRange className="flex-shrink-0"/>

        <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-1.5 px-2 rounded flex-shrink-0'>
          Buscar
        </button>
      </div>
    </div>
  );
}

const DateBoxContainer = () => {
  return (
    <div className="bg-cyan-100 p-4">
      <div className="bg-blue-400 p-1 rounded-md shadow-md max-w-90 mx-auto">
        <DateBox />
      </div>
    </div>
  );
}

export default DateBoxContainer;
