import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaExchangeAlt, FaUpload, FaFolderOpen } from 'react-icons/fa';

export function SelectImages({ isEditingImage }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditingImage ? (
          <Button variant="outline">
            <FaExchangeAlt /> Editar Imágenes
          </Button>
        ) : (
          <Button variant="outline" className="text-white bg-green-500 hover:bg-green-600">
            Seleccionar Nueva Imagen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent style={{ backgroundColor: 'white' }} className="sm:max-w-[425px] flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle>{isEditingImage ? 'Editar Imágenes' : 'Seleccionar Nueva Imagen'}</DialogTitle>
          <DialogDescription>
            Realiza cambios en tus imágenes aquí. Haz clic en guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center justify-center text-cyan-500">
              <FaUpload size={24} />
              <span>Subir archivo desde el dispositivo</span>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="flex items-center justify-center text-cyan-500">
              <FaFolderOpen size={24} />
              <span>Buscar archivo en galería local</span>
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
