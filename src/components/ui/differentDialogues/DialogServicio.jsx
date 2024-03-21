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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createServicio, editServicio, getServicio } from '../../classes/Servicios/ServicioFunctions';
import { FaRegEdit } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';
export function DialogServicio({ isEditing, idServicio }) {
    const [tipoServicio, setTipoServicio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [destiono, setDestino] = useState("");
    const [fechaServicio, setFechaServicio] = useState("");
    const [costo, setCosto] = useState("");
    const [error, setError] = useState("");
  
    useEffect(() => {

      const fetchData = async () => {
          try {
              if (isEditing) {
                  const servicioData = await getServicio(idServicio);
                  if (servicioData) {

                      setTipoServicio(servicioData.tipoServicio);
                      setDescripcion(servicioData.descripcion);
                      setDestino(servicioData.destiono);
                      setFechaServicio(servicioData.fechaServicio);
                      setCosto(servicioData.costo);
                  }
              } else {
                  resetForm();
              }
          } catch (error) {
              console.error("Error fetching servicio data:", error);
          }
      };
    
      fetchData();
    }, [isEditing, idServicio]);
  const handleSubmit = async () => {
      console.log("Servicio Data:", { tipoServicio, descripcion, destiono, fechaServicio, costo });
  
      if (!tipoServicio || !descripcion || !destiono || !fechaServicio || !costo) {
          setError("Please fill in all required fields.");
          toast.error("Please fill in all required fields.");
          console.log("Error: Please fill in all required fields.");
          return;
      }
  
      try {
          const formData = {
              tipoServicio,
              descripcion,
              destiono,
              fechaServicio,
              costo
          };
  
          const formDataJSON = JSON.stringify(formData, null, 2);
          console.log(formDataJSON);
  
          if (isEditing) {
              const response = await editServicio(formData, idServicio);
              if (response.success) {
                  console.log("Servicio editado exitosamente!");
                  setError("");
                  resetForm();
                  toast.success("Servicio editado exitosamente!");
              } else {
                  setError("Error: Unable to edit service. Please try again.");
                  console.log("Error: Unable to edit service. Please try again.");
                  toast.error("Error: Unable to edit service. Please try again.");
              }
          } else {
              const response = await createServicio(formData);
              if (response.success) {
                  console.log("Servicio creado exitosamente!");
                  setError("");
                  resetForm();
                  toast.success("Servicio creado exitosamente!");
              } else {
                  setError("Error: Unable to create service. Please try again.");
                  console.log("Error: Unable to create service. Please try again.");
                  toast.error("Error: Unable to create service. Please try again.");
              }
          }
      } catch (error) {
          console.error(error);
          setError("Error: Unable to create or modify service. Please try again.");
          console.log("Error: Unable to create or modify service. Please try again.");
          toast.error("Error: Unable to create or modify service. Please try again.");
      }
  };
  
  
  const resetForm = () => {
    setTipoServicio("");
    setDescripcion("");
    setDestino("");
    setFechaServicio("");
    setCosto("");
  };
  
  return (
    <Dialog id= "dialogServicioContainer">
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4 relative">
          {isEditing ? 
            <FaRegEdit className='text-cyan-800 hover:bg-cyan-50 transition-colors duration-300' style={{ fontSize: "1.5rem" }}/> : 
            "Crear Servicio"
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] bg-white p-6 max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ?"Edición de servicios" : "Creación de servicio"}</DialogTitle>
          <DialogDescription>{isEditing ?"Menú de edición de servicios" : "Menú de creación de servicios"}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipoServicio" className="text-right">
              Tipo de Servicio<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="tipoServicio" 
              value={tipoServicio} 
              onChange={(e) => setTipoServicio(e.target.value)} 
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
            <Label htmlFor="destiono" className="text-right">
              Destino<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="destiono" 
              value={destiono} 
              onChange={(e) => setDestino(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fechaServicio" className="text-right">
              Fecha de Servicio<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="fechaServicio" 
              value={fechaServicio || ""} 
              onChange={(e) => setFechaServicio(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="costo" className="text-right">
              Costo<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="costo" 
              value={costo} 
              onChange={(e) => setCosto(e.target.value)} 
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>{isEditing ? "Editar servicio" : "Crear servicio"}</Button>
        </DialogFooter>
      </DialogContent>
      <Toaster
          toastOptions={{
            style: {
              fontSize: '1.5rem', // Increase font size
              padding: '1rem 1rem', // Increase padding
            },
          }}
          richColors
          closeButton
          expand={true}
        />
    </Dialog>
  )
}
