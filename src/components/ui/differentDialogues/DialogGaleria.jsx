import React, { useEffect, useState } from 'react';
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
import { FaImages, FaExchangeAlt } from 'react-icons/fa'; // Importamos el icono FaExchangeAlt
import { Toaster, toast } from 'sonner';
import { getServicio } from '../../classes/Servicios/ServicioFunctions'; 
import { getImages } from '../../classes/VarietyFunctions/ImagesFunctions/ImagesFunctions';
import { SelectImages } from '../differentSelects/SelectImages';

export function DialogGaleria({ idServicio }) {
    const [imagenPrincipalUrl, setImagenPrincipalUrl] = useState(null);
    const [imagenes, setImagenes] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchServicio = async () => {
            try {
                const servicioData = await getServicio(idServicio);

                if (servicioData) {
                    if (servicioData.imagenPrincipal) {
                        const imageBlob = await getImages(servicioData.imagenPrincipal);
                        const url = URL.createObjectURL(imageBlob);
                        setImagenPrincipalUrl(url);
                    }

                    if (servicioData.imagenes) {
                        setImagenes(servicioData.imagenes);
                    }
                }
            } catch (error) {
                console.error("Error al obtener el servicio:", error);
                setError("Error al obtener el servicio");
            }
        };

        fetchServicio();
    }, [idServicio]);

    const handleImageClick = async (imageId) => {
        try {
            setLoading(true);
            const imageBlob = await getImages(imageId);
            const imageUrl = URL.createObjectURL(imageBlob);
            setLoading(false);
            return imageBlob;
        } catch (error) {
            console.error("Error al obtener la imagen:", error);
            setError("Error al obtener la imagen");
            setLoading(false);
        }
    };

    return (
        <Dialog id="dialogServicioContainer" className="w-full h-full">
            <DialogTrigger asChild>
                <Button variant="outline" className="text-blue-600 hover:bg-blue-150 hover:text-blue transition-colors duration-300 ml-4" style={{ fontSize: "1.5rem" }}>
                    <FaImages style={{ marginRight: '0.5rem' }} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[475px] bg-white p-6">
                <DialogHeader>
                    <DialogTitle>Galería de Servicio</DialogTitle>
                    <DialogDescription>Imágenes del servicio</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 overflow-y-auto">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <h2 className="text-lg font-semibold col-span-3">Imagen Principal</h2>
                        <div className="col-span-1 flex justify-center items-center">
                            <FaExchangeAlt size={24} />
                        </div>
                        <div className="col-span-4 flex justify-center">
                            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center border-black border-4 overflow-hidden">
                                {loading && <p>Cargando...</p>}
                                {imagenPrincipalUrl && !loading && (
                                    <img 
                                        src={imagenPrincipalUrl}
                                        alt="Imagen Principal" 
                                        className="max-w-full max-h-full cursor-pointer"
                                        onClick={() => handleImageClick(imagenPrincipal)}
                                    />
                                )}
                                {!imagenPrincipalUrl && !loading && (
                                    <SelectImages isEditingImages={false}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <h2 className="text-lg font-semibold col-span-4">Imágenes Secundarias</h2>
                        {imagenes.length > 0 ? (
                            <ServiciosCarousel imageIds={imagenes} />
                        ) : (
                            <p>No hay imágenes secundarias disponibles</p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => {}}>Agregar Imagen</Button>
                </DialogFooter>
            </DialogContent>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '1.5rem',
                        padding: '1rem 1rem',
                    },
                }}
                richColors
                closeButton
                expand={true}
            />
        </Dialog>
    );
}

const ServiciosCarousel = ({ imageIds }) => {
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const uniqueImages = [];

                for (const imageId of imageIds) {
                    const imageBlob = await getImages(imageId);
                    if (imageBlob) {
                        const imageUrl = URL.createObjectURL(imageBlob);
                        uniqueImages.push(imageUrl);
                    }
                }

                setImages(uniqueImages);
            } catch (error) {
                console.error("Error al obtener las imágenes:", error);
                setError("Error al obtener las imágenes");
            }
        };

        fetchImages();
    }, [imageIds]);

    return (
        <div>
            {images.map((imageUrl, index) => (
                <div key={index} className="w-64 h-64 bg-gray-200 flex items-center justify-center border-black border-4 overflow-hidden">
                    <img 
                        src={imageUrl} 
                        alt={`Imagen ${index + 1}`} 
                        className="max-w-full max-h-full cursor-pointer"
                    />
                </div>
            ))}
        </div>
    );
};
