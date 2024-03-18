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
import { createEmpleado, editEmpleado, getEmpleado } from '../../classes/Empleado/EmpleadoFunctions';
import { SelectRol } from "../differentSelects/SelectRol";
import { SelectCargo } from "../differentSelects/SelectCargo";
import { FaRegEdit } from 'react-icons/fa';

export function DialogEmpleado({ isEditing, emailEmpleado }) {
    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [cargo, setCargo] = useState("");
    const [celular, setCelular] = useState("");
    const [dni, setDni] = useState("");
    const [sueldo, setSueldo] = useState("");
    const [fechaNac, setFechaNac] = useState(null);
    const [pais, setPais] = useState(null);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState([{ id: 1, role: "" }]);
    const [error, setError] = useState("");
  
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isEditing) {
                    const empleadoData = await getEmpleado(emailEmpleado);
                    if (empleadoData) {
                        setName(empleadoData.nombre);
                        setApellido(empleadoData.apellido);
                        setEmail(empleadoData.email);
                        setCargo(empleadoData.cargo);
                        setCelular(empleadoData.celular);
                        setDni(empleadoData.dni);
                        setFechaNac(empleadoData.fechaNac);
                        setPais(empleadoData.pais);
                        setSueldo(empleadoData.sueldo);
                        setFechaNac(empleadoData.fechaNac || null);
                        setPais(empleadoData.pais || null);

                        if (empleadoData.roles) {
                            setRoles(empleadoData.roles);
                        } else {
                            // Si roles está undefined, establecerlo con un valor predeterminado
                            setRoles([{ id: 1, role: "rol1" }]);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching empleado data:", error);
            }
        };
    
        fetchData();
    }, [isEditing, emailEmpleado]);
    
    
    
  
      const handleAddRole = () => {
          const newRole = { id: roles.length + 1, role: "" };
          setRoles([...roles, newRole]);
        };
  
    const handleRemoveRole = (id) => {
      setRoles(roles.filter(role => role.id !== id));
    };
  
    const handleRoleChange = (id, value) => {
      setRoles(roles.map(role => (role.id === id ? { ...role, role: value } : role)));
    };
  
    const handleSubmit = async () => {
        console.log("User Data:", { name, apellido, cargo, celular, dni, fechaNac, pais, email, password, roles, sueldo });
    
        if (!name || !apellido || !cargo || !celular || !dni || !password || !email || !sueldo) {
            setError("Please fill in all required fields.");
            console.log("Error: Please fill in all required fields.");
            return;
        }
    
        try {
            const formData = {
                nombre: name,
                apellido,
                email,
                cargo,
                password,
                celular,
                dni,
                sueldo,
                enabled: true,
                intentos: 0
            };
    
            // Si se están creando un nuevo empleado y roles está definido, inclúyelos en el objeto formData
            if (!isEditing && roles) {
                formData.roles = roles;
            }
    
            const formDataJSON = JSON.stringify(formData, null, 2);
            console.log(formDataJSON);
    
            if (isEditing) {
                const response = await editEmpleado(formData, emailEmpleado);
                if (response.success) {
                    console.log("Empleado editado exitosamente!");
                    setError("");
                    resetForm();
                } else {
                    setError("Error: Unable to edit employee. Please try again.");
                    console.log("Error: Unable to edit employee. Please try again.");
                }
            } else {
                const response = await createEmpleado(formData);
                if (response.success) {
                    console.log("Empleado creado exitosamente!");
                    setError("");
                    resetForm();
                } else {
                    setError("Error: Unable to create employee. Please try again.");
                    console.log("Error: Unable to create employee. Please try again.");
                }
            }
        } catch (error) {
            console.error(error);
            setError("Error: Unable to create or modify employee. Please try again.");
            console.log("Error: Unable to create or modify employee. Please try again.");
        }
    };
    
    
    const resetForm = () => {
      setName("");
      setApellido("");
      setEmail("");
      setCargo("");
      setCelular("");
      setDni("");
      setFechaNac(null);
      setPais(null);
      setPassword("");
      setShowPassword(false);
      setSueldo("");
      setRoles([{ id: 1, role: "" }]);
    };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-4 relative">
          {isEditing ? 
            <FaRegEdit className='text-cyan-800 hover:bg-cyan-50 transition-colors duration-300' style={{ fontSize: "1.5rem" }}/> : 
            "Crear Empleado"
          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] bg-white p-6 max-h-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ?"Edición de empleados" : "Creación de empleado"}</DialogTitle>
          <DialogDescription>{isEditing ?"Menú de edición de empleados" : "Menú de creación de empleados"}</DialogDescription>
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
            <Label htmlFor="sueldo" className="text-right">
              Sueldo<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="sueldo" 
              value={sueldo} 
              onChange={(e) => setSueldo(e.target.value)} 
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
              {isEditing ? "Nueva contraseña":"Contraseña"}<sup className="text-red-500">*</sup>
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
          {roles && roles.map((role, index) => (
                <div key={role.id} className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor={`role-${role.id}`} className="text-right">
                    Rol<sup className="text-red-500">*</sup>
                    </Label>
                    <CheckSelectRol
                    id={`role-${role.id}`}
                    value={role.role}
                    onChange={(value) => handleRoleChange(role.id, value)}
                    className="col-span-2"
                    />
                    {index > 0 && (
                    <button 
                        className="ml-2 text-red-500 focus:outline-none"
                        onClick={() => handleRemoveRole(role.id)}
                    >
                        ❌
                    </button>
                    )}
                </div>
                ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>{isEditing ? "Editar empleado" : "Crear empleado"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const CheckSelectCargo = ({ value, setCargo }) => {
    const handleChange = (newValue) => {
      console.log("Selected Cargo:", newValue);
      setCargo(newValue);
    };
  
    return (
      <SelectCargo value={value} onChange={handleChange} />
    );
  };

const CheckSelectRol = ({ value, onChange }) => {
  const handleChange = (newValue) => {
    console.log("Selected Role:", newValue);
    onChange(newValue);
  };
  return (
    <SelectRol value={value} onChange={handleChange} />
  );
}
