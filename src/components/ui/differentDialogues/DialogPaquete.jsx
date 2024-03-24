import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPaquete, editPaquete, getPaquete } from '../../classes/Paquete/PaqueteFunctions';
import { FaRegEdit } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
import { SelectServicioCardGallery } from '../differentSelects/SelectServicioCardGallery'; // Importa el componente SelectServicioCardGallery

export function DialogPaquete({ isEditing, idPaquete }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [idsServicio, setIdsServicio] = useState({ idServicio1: "", idServicio2: "" }); // Guarda ambas IDs en un objeto

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isEditing) {
                    const paqueteData = await getPaquete(idPaquete);
                    if (paqueteData) {
                        setNombre(paqueteData.nombre);
                        setDescripcion(paqueteData.descripcion);
                        setIdsServicio({ idServicio1: paqueteData.idServicio1, idServicio2: paqueteData.idServicio2 }); // Asigna las IDs desde paqueteData
                    }
                } else {
                    resetForm();
                }
            } catch (error) {
                console.error("Error fetching paquete data:", error);
            }
        };
    
        fetchData();
    }, [isEditing, idPaquete]);

    const resetForm = () => {
        setNombre("");
        setDescripcion("");
        setIdsServicio({ idServicio1: "", idServicio2: "" }); // Reinicia las IDs también
    };

    const handleIdsChange = (e) => {
        const ids = e.target.value.split(", "); // Separa las IDs utilizando ", " como delimitador
        setIdsServicio({ idServicio1: ids[0], idServicio2: ids[1] }); // Asigna las IDs al objeto
    };

    const handleSubmit = async () => {
        if (!nombre || !descripcion) {
            toast.error("Por favor complete todos los campos obligatorios.");
            return;
        }
        
        try {
            const formData = {
                nombre,
                descripcion,
                listaServicios: [
                    { idServicio: idsServicio.idServicio1 },
                    { idServicio: idsServicio.idServicio2 }
                ]
            };
        
            let response;
            if (!isEditing) {
                reponse = await createPaquete(formData)}; // Call createPaquete function
            if (isEditing) {
                reponse = await editPaquete(formData, idPaquete)}; // Call createPaquete function
        
            if (response.success) {
                toast.success("Paquete creado exitosamente!");
                resetForm(); // Reset form after successful creation
            } else {
                toast.error("Error al crear el paquete. Por favor, inténtelo de nuevo.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al procesar la solicitud. Por favor, inténtelo de nuevo.");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    {isEditing ? 
                        <FaRegEdit style={{ fontSize: "1.5rem" }}/> : 
                        "Crear Paquete"
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-h-96 overflow-y-auto" style={{ width: "800px" }}> {/* Aumenta el ancho aquí */}
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Editar Paquete" : "Crear Paquete"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">
                            Nombre<sup className="text-red-500">*</sup>
                        </Label>
                        <Input 
                            id="nombre" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="descripcion" className="text-right">
                            Descripción<sup className="text-red-500">*</sup>
                        </Label>
                        <Input 
                            id="descripcion" 
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)} 
                            className="col-span-3" 
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="idsServicio" className="text-right">
                            IDs de Servicio<sup className="text-red-500">*</sup>
                        </Label>
                        <Input 
                            id="idsServicio" 
                            value={`${idsServicio.idServicio1}, ${idsServicio.idServicio2}`} // Une las IDs con ", "
                            onChange={handleIdsChange} // Maneja los cambios en las IDs
                            className="col-span-3" 
                        />
                    </div>
                </div>
                <SelectServicioCardGallery setIdServicio1={setIdsServicio} setIdServicio2={setIdsServicio} /> {/* Pasa las funciones para actualizar las IDs */}
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        {isEditing ? "Editar Paquete" : "Crear Paquete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
            <Toaster />
        </Dialog>
    );
}
