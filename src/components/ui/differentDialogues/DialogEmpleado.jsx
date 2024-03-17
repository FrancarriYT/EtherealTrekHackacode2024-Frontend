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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogEmpleado({ isEditing }) {
  const [name, setName] = useState(isEditing ? "Pedro" : "");
  const [apellido, setApellido] = useState(isEditing ? "Mendez" : "");
  const [cargo, setCargo] = useState(isEditing ? "VENDEDOR" : "");
  const [celular, setCelular] = useState(isEditing ? "+12433378021" : "");
  const [dni, setDni] = useState(isEditing ? "89643507" : "");
  const [fechaNac, setFechaNac] = useState(isEditing ? null : "");
  const [pais, setPais] = useState(isEditing ? null : "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !apellido || !cargo || !celular || !dni || !password) {
      setError("Please fill in all required fields.");
      console.log("Error: Please fill in all required fields.");
      return;
    }

    // Add submission logic here (for now just console.log)
    console.log("Form submitted successfully!");
    setError("");
    // Reset form after successful submission
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setApellido("");
    setCargo("");
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
        <Button variant="outline" className="ml-4">{isEditing ? "Editar Empleado" : "Crear Empleado"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6">
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
            <Label htmlFor="cargo" className="text-right">
              Cargo<sup className="text-red-500">*</sup>
            </Label>
            <Input 
              id="cargo" 
              value={cargo} 
              onChange={(e) => setCargo(e.target.value)} 
              className="col-span-3" 
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Crear empleado</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
