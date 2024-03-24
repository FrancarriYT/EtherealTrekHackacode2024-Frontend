import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/Button";
 
export default function RemoveVenta({ onDelete, id, reloadVentas}) {
  const handleDelete = () => {
    // Ejecutar la función onDelete con el correo electrónico como argumento
    onDelete(id);
    reloadVentas();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="ml-4 relative">
          <FaTrashAlt className='text-red-600 hover:bg-red-150 hover:text-red transition-colors duration-300' style={{ fontSize: "1.5rem" }} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-100 rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no puede ser revertida. Borrarás a la venta de la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-200 hover:bg-gray-300 rounded-md">Cancelar</AlertDialogCancel>
          <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded-md" onClick={handleDelete}>Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
