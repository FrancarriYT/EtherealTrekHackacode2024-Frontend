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
import { SelectPaises } from "../differentSelects/SelectPais"; // Importa el componente SelectPaises
import { SelectContinents } from '../differentSelects/SelectContinente';
import { createCliente, editCliente, getCliente } from '../../classes/Cliente/ClienteFunctions';
import { FaRegEdit } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';

export function DialogCliente({ isEditing, idCliente }) {
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [dni, setDni] = useState("");
    const [fechaNac, setFechaNac] = useState(null);
    const [pais, setPais] = useState(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [direccion, setDireccion] = useState("");
    const [roles, setRol] = useState([]);
    const [selectedContinent, setSelectedContinent] = useState(""); // Estado para almacenar el continente seleccionado

    useEffect(() => {
      const fetchData = async () => {
          try {
              if (isEditing) {
                  const clienteData = await getCliente(idCliente);
                  if (clienteData) {
                      setName(clienteData.nombre);
                      setApellido(clienteData.apellido);
                      setEmail(clienteData.email);
                      setCelular(clienteData.celular);
                      setDni(clienteData.dni);
                      setFechaNac(clienteData.fechaNac);
                      setDireccion(clienteData.direccion);
                      setPais(clienteData.pais);
                  }
              }
          } catch (error) {
              console.error("Error fetching cliente data:", error);
          }
      };

      fetchData();
  }, [isEditing, idCliente]);

  const handleSubmit = async () => {
    if (!name || !apellido || !celular || !dni || !email) {
        setError("Por favor completa todos los campos obligatorios.");
        toast.error("Por favor completa todos los campos obligatorios.");
        return;
    }
  
    // Verifica si se está creando un nuevo cliente o editando uno existente
    if (!isEditing) {

        // Bueno, si se crea un cliente, hay ciertos valores que no se pueden asignar en primera instancia.
        // Por ejemplo, no permitir asignar valores a ciertos campos como pais, dirección y fecha de Nacimiento.
        setPais("No disponible");
        setDireccion("No disponible");
        setFechaNac("No disponible");
    }
  
    try {
        const roleObject = {
            id: "2", // Creamos el rol de usuario para el cliente
        };
  
        const formData = {
            nombre: name,
            apellido,
            email,
            celular,
            dni,
            fechaNac,
            pais,
            direccion,
            enabled: true,
            roles: [roleObject], // Configura el array de roles con el objeto del rol de usuario
            intentos:0
        };
  
        const promise = isEditing ? editCliente(formData, idCliente) : createCliente(formData);
  
        console.log("Enviando datos del formulario...");
  
        const response = await promise;
  
        if (response.success) {
            resetForm();
            toast.success(isEditing ? '¡Cliente editado exitosamente!' : '¡Cliente creado exitosamente!');
        } else {
            setError(response.error);
            toast.error(response.error);
        }
    } catch (error) {
        setError("Error: No se pudo completar la acción.");
        console.error(error);
        toast.error("Error: No se pudo completar la acción.");
    }
  };
  
  
  const resetForm = () => {
    setName("");
    setApellido("");
    setEmail("");
    setCelular("");
    setDni("");
    setFechaNac(null);
    setPais(null);
    setPassword("");
    setShowPassword(false);
  };
    

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4 relative">
          {isEditing ? 
            <FaRegEdit className='text-cyan-800 hover:bg-cyan-50 transition-colors duration-300' style={{ fontSize: "1.5rem" }}/> : 
            "Crear Cliente"
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] bg-white p-6 max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edición de clientes" : "Creación de cliente"}</DialogTitle>
          <DialogDescription>{isEditing ? "Menú de edición de clientes" : "Menú de creación de clientes"}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="apellido" 
              value={apellido} 
              onChange={(e) => setApellido(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="col-span-3" 
              placeholder="Asegura que sea un Email o retornará error."
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="celular" className="text-right">
              Celular<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="celular" 
              value={celular} 
              onChange={(e) => setCelular(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dni" className="text-right">
              DNI<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="dni" 
              value={dni} 
              onChange={(e) => setDni(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fechaNac" className="text-right">
              Fecha de Nacimiento
            </Label>
            <Input 
                id="fechaNac" 
                value={fechaNac || ""} 
                onChange={(e) => setFechaNac(e.target.value)} 
                className="col-span-3" 
                placeholder={!isEditing ? "Solo disponible en modificación" : "Formato: yyyy/mm/dd"}
                disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="continente" className="text-right">
              Continente
            </Label>
            {isEditing ? (
              <SelectContinents 
                value={selectedContinent} 
                onChange={setSelectedContinent} // Actualiza el estado del continente seleccionado
                className="col-span-3" 
              />
            ) : (
              <Input 
                value="Solo disponible en modificación" 
                className="col-span-3" 
                disabled
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pais" className="text-right">
              País
            </Label>
            {isEditing ? (
              <SelectPaises 
                continente={selectedContinent} // Pasa el continente seleccionado al componente SelectPaises
                value={pais} 
                onChange={setPais} 
                className="col-span-3" 
              />
            ) : (
              <Input 
                value="Solo disponible en modificación" 
                className="col-span-3" 
                disabled
              />
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="direccion" className="text-right">
                Dirección<sup className="text-red-500">*</sup>
            </Label>
            <Input 
                id="direccion" 
                value={direccion} 
                onChange={(e) => setDireccion(e.target.value)} 
                className="col-span-3" 
                placeholder={!isEditing ? "Solo disponible en modificación" : ""}
                disabled={!isEditing}
            />
            </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>{isEditing ? "Editar cliente" : "Crear cliente"}</Button>
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
