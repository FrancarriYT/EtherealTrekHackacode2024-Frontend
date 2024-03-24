import { useState } from 'react';
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
import { FaExchangeAlt, FaUpload, FaFolderOpen, FaTimes } from 'react-icons/fa';
import { createImage, editarImagenPrincipalDeServicio, obtenerTodasLasImagenesInfo } from '../../classes/VarietyFunctions/ImagesFunctions/ImagesFunctions';

export function SelectImages({ isEditingImage }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadType, setUploadType] = useState(null); // Estado para guardar el tipo de subida
  const [uploadedFileName, setUploadedFileName] = useState(null); // Estado para guardar el nombre del archivo subido

  // Función para manejar la subida de imágenes
  const handleImageUpload = async (type) => {
    setUploadType(type);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      const blob = new Blob([file], { type: file.type }); // Convertir el archivo a Blob
      setSelectedImage({ blob, fileName: file.name }); // Guardar el Blob y el nombre del archivo
      if (type === 'subidoDesdeDispositivo') {
        // Guardar el nombre del archivo
        setUploadedFileName(file.name);
      }
    };
    input.click();
  };
  
  // Función para manejar la eliminación de la imagen seleccionada
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setUploadType(null);
    setUploadedFileName(null);
  };

  const saveImageToDatabase = async () => {
    try {
      // Verificar si se seleccionó una imagen
      if (selectedImage) {
        // Crear la imagen en la base de datos
        const response = await createImage(selectedImage.name);
        if (response) {
          console.log('Imagen creada con éxito:', response);
  
          // Si se subió la imagen desde el dispositivo, obtener su información
          if (uploadType === 'subidoDesdeDispositivo') {
            const imagesInfo = await obtenerTodasLasImagenesInfo();
  
            // Verificar si imagesInfo es un array antes de usar find
            if (Array.isArray(imagesInfo)) {
              // Encontrar la imagen recién subida por su nombre
              const newImage = imagesInfo.find(image => image.name === selectedImage.name);
  
              if (newImage) {
                // Editar la imagen principal del servicio
                await editarImagenPrincipalDeServicio(idServicio, newImage.url.split('/').pop());
              }
            } else {
              console.error('imagesInfo no es un array:', imagesInfo);
            }
          }
  
          // Limpiar la imagen seleccionada y el tipo de subida
          setSelectedImage(null);
          setUploadType(null);
        }
      }
    } catch (error) {
      console.error('Error al guardar la imagen en la base de datos:', error);
    }
  };
  

  // Función para manejar el guardado de cambios
  const handleSaveChanges = async () => {
    // Verificar si hay una imagen seleccionada y el tipo de subida
    if (selectedImage && uploadType === 'subidoDesdeDispositivo') {
      // Ejecutar la función para guardar la imagen en la base de datos
      await saveImageToDatabase(selectedImage);
    }
    // Resto de la lógica para guardar otros cambios...
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isEditingImage ? (
          <Button variant="outline">
            <FaExchangeAlt /> Editar Imágenes
          </Button>
        ) : (
          <Button variant="outline" className="text-white bg-green-500 hover:bg-green-600" onClick={() => handleImageUpload('subidoDesdeDispositivo')}>
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
          {!selectedImage && (
            <>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="flex items-center justify-center text-cyan-500" onClick={() => handleImageUpload('subidoDesdeDispositivo')}>
                  <FaUpload size={24} />
                  <span>Subir archivo desde el dispositivo</span>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="flex items-center justify-center text-cyan-500" onClick={() => handleImageUpload('subidoDesdeGaleriaLocal')}>
                  <FaFolderOpen size={24} />
                  <span>Buscar archivo en galería local</span>
                </Button>
              </div>
            </>
          )}
            {selectedImage && selectedImage.blob && (
            <div className="relative rounded-lg overflow-hidden shadow-md border border-cyan-500">
                <img src={URL.createObjectURL(selectedImage.blob)} alt="Selected" className="w-full h-auto" />
                <button className="absolute top-0 right-0 p-2 text-red-500" onClick={handleRemoveImage}>
                <FaTimes size={24} />
                </button>
            </div>
            )}


        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
