import React, { useState } from 'react';
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
import { createEmpleado } from '../../classes/Empleado/EmpleadoFunctions'; // Import the createEmpleado function
import { SelectRol } from "../differentSelects/SelectRol";
import { SelectCargo } from "../differentSelects/SelectCargo";

export function DialogEmpleado({ isEditing }) {
  const [name, setName] = useState(isEditing ? "Pedro" : "");
  const [apellido, setApellido] = useState(isEditing ? "Mendez" : "");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState(isEditing ? "VENDEDOR" : ""); // Fixed to properly save cargo value
  const [celular, setCelular] = useState(isEditing ? "+12433378021" : "");
  const [dni, setDni] = useState(isEditing ? "89643507" : "");
  const [fechaNac, setFechaNac] = useState(isEditing ? null : "");
  const [pais, setPais] = useState(isEditing ? null : "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState(isEditing ? [{ id: 1, role: "ROLE_USER" }] : []);
  const [error, setError] = useState("");

  const handleAddRole = () => {
    setRoles([...roles, { id: roles.length + 1, role: "" }]);
  };

  const handleRemoveRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const handleRoleChange = (id, value) => {
    setRoles(roles.map(role => (role.id === id ? { ...role, role: value } : role)));
  };

  const handleSubmit = async () => {
    console.log("User Data:", { name, apellido, cargo, celular, dni, fechaNac, pais, email, password, roles });
  
    if (!name || !apellido || !cargo || !celular || !dni || !password || !email) {
      setError("Please fill in all required fields.");
      console.log("Error: Please fill in all required fields.");
      return;
    }
  
    try {
      const selectedRoles = roles.map(role => ({ id: role.id, nombre: role.role }));
      const formData = {
        nombre: name,
        apellido,
        email,
        password,
        celular,
        dni,
        roles: selectedRoles,
        enabled: true, // Set enabled to true
        intentos: 0 // Set intentos to 0
      }; // Form data object
      
      const formDataJSON = JSON.stringify(formData, null, 2); // Form data as JSON string
      console.log(formDataJSON); // Logging the form data as JSON
      
      const response = await createEmpleado(formData); // Send JSON data to createEmpleado
      
      if (response.success) {
        console.log("Empleado creado exitosamente!");
        setError("");
        resetForm();
      } else {
        setError("Error: Unable to create employee. Please try again.");
        console.log("Error: Unable to create employee. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Error: Unable to create employee. Please try again.");
      console.log("Error: Unable to create employee. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setApellido("");
    setEmail("");
    setCargo(""); // Reset cargo value
    setCelular("");
    setDni("");
    setFechaNac(null);
    setPais(null);
    setPassword("");
    setShowPassword(false);
    setRoles([{ id: 1, role: "" }]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4">{isEditing ? "Editar Empleado" : "Crear Empleado"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] bg-white p-6 max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Creación de empleado</DialogTitle>
          <DialogDescription>Menú de creación de Empleado</DialogDescription>
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cargo" className="text-right">
              Cargo<sup className="text-red-500">*</sup>
            </Label>
            <CheckSelectCargo value={cargo} setCargo={setCargo} />
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
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pais" className="text-right">
              País
            </Label>
            <Input 
              id="pais" 
              value={pais || ""} 
              onChange={(e) => setPais(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Contraseña<sup className="text-red-500">*</sup>
            </Label>
            <div className="col-span-2 relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="w-full pr-10" 
              />
              <button 
                className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "🔒"}
              </button>
            </div>
          </div>
          {roles.map((role, index) => (
            <div key={role.id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`role-${role.id}`} className="text-right">
                Rol<sup className="text-red-500">*</sup>
                </Label>
                <SelectRol
                id={`role-${role.id}`}
                value={role.role}
                onChange={(value) => handleRoleChange(role.id, value)}
                className="col-span-2"
                />
                {index > 0 && (
                <button 
                    className="ml-20 text-red-500 focus:outline-none"
                    onClick={() => handleRemoveRole(role.id)}
                >
                    ❌
                </button>
                )}
            </div>
            ))}
          {roles.length < 4 && (
            <Button variant="outline" onClick={handleAddRole}>Añadir otro rol</Button>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Crear empleado</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const CheckSelectCargo = ({ value, setCargo }) => {
    const handleChange = (newValue) => {
      console.log("Selected Cargo:", newValue); // Log selected cargo value
      setCargo(newValue); // Update the cargo state directly
    };
  
    return (
      <SelectCargo value={value} onChange={handleChange} />
    );
  };

const CheckSelectRol = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    console.log("Selected Role:", newValue); // Log selected role value
    onChange(newValue);
  };
  return (
    <SelectRol value={value} onChange={handleChange} />
  );
}
