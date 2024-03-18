import React from 'react';
import { Button } from '@/components/ui/Button';
import { FaTrashAlt } from 'react-icons/fa';

const RemoveEmpleado = ({ onDelete, email }) => {
  return (
    <Button onClick={() => onDelete(email)} variant="outline" className="ml-4 relative">
      <FaTrashAlt className='text-red-600 hover:bg-red-150 transition-colors duration-300' style={{ fontSize: "1.5rem" }} />
    </Button>
  );
}

export default RemoveEmpleado;
