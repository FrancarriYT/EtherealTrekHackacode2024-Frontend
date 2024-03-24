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
import { createVenta, editVenta, getVenta } from '../../classes/Ventas/VentasFunctions';
import { FaRegEdit } from 'react-icons/fa';
import { Toaster, toast } from 'sonner';

export function DialogVenta({ isEditing, idVentaToEdit }) {
    const [clienteId, setClienteId] = useState("");
    const [empleadoId, setEmpleadoId] = useState("");
    const [tipoVenta, setTipoVenta] = useState("");
    const [idServicio, setIdServicio] = useState("");
    const [idPaquete, setIdPaquete] = useState("");
    const [fechaVenta, setFechaVenta] = useState("");
    const [medioPago, setMedioPago] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditing) {
            const fetchData = async () => {
                try {
                    const ventaData = await getVenta(idVentaToEdit);
                    if (ventaData) {
                        setClienteId(ventaData.clienteId);
                        setEmpleadoId(ventaData.empleadoId);
                        setTipoVenta(ventaData.tipoVenta);
                        if (ventaData.tipoVenta === "PAQUETE") {
                            setIdPaquete(ventaData.paquete.idPaquete);
                        } else if (ventaData.tipoVenta === "SERVICIO") {
                            setIdServicio(ventaData.servicio.idServicio);
                        }
                        
                        setFechaVenta(ventaData.fechaVenta);
                        setMedioPago(ventaData.medioPago);
                    }
                } catch (error) {
                    console.error("Error fetching venta data:", error);
                }
            };
            fetchData();
        }
    }, [isEditing, idVentaToEdit]);

    const handleSubmit = async () => {
        if (!clienteId || !empleadoId || !tipoVenta || !(idServicio || idPaquete) || !fechaVenta || !medioPago) {
            setError("Por favor complete todos los campos requeridos.");
            toast.error("Por favor complete todos los campos requeridos.");
            return;
        }
    
        try {
            const formData = {

                
                tipoVenta,
                fechaVenta,
                medioPago
            };
            formData.cliente = {id:clienteId};
            formData.empleado = {id:empleadoId};
            // Agregar id de servicio o paquete según el tipo de venta
            if (tipoVenta === "PAQUETE") {
                formData.paquete = { idPaquete: idPaquete };
            } else if (tipoVenta === "SERVICIO") {
                formData.servicio = { idServicio: idServicio };
            }
    
            if (isEditing) {
                const response = await editVenta(formData, idVentaToEdit);
                if (response.success) {
                    console.log("Venta editada exitosamente!");
                    setError("");
                    resetForm();
                    toast.success("Venta editada exitosamente!");
                } else {
                    setError("Error al editar la venta. Por favor inténtelo de nuevo.");
                    toast.error("Error al editar la venta. Por favor inténtelo de nuevo.");
                }
            } else {
                const response = await createVenta(formData);
                if (response.success) {
                    console.log("Venta creada exitosamente!");
                    setError("");
                    resetForm();
                    toast.success("Venta creada exitosamente!");
                } else {
                    setError("Error al crear la venta. Por favor inténtelo de nuevo.");
                    toast.error("Error al crear la venta. Por favor inténtelo de nuevo.");
                }
            }
        } catch (error) {
            console.error(error);
            setError("Error al crear o editar la venta. Por favor inténtelo de nuevo.");
            toast.error("Error al crear o editar la venta. Por favor inténtelo de nuevo.");
        }
    };
    

    const resetForm = () => {
        setClienteId("");
        setEmpleadoId("");
        setTipoVenta("");
        setIdServicio("");
        setIdPaquete("");
        setFechaVenta("");
        setMedioPago("");
    };
    function formatDate(dateString) {
        const [month, day, year] = dateString.split('/');
        const formattedMonth = month.padStart(2, '0');
        const formattedDay = day.padStart(2, '0');
        return `${year}-${formattedMonth}-${formattedDay}`;
    }
    return (
        <Dialog id="dialogVentaContainer">
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-4 relative">
                    {isEditing ?
                        <FaRegEdit className='text-cyan-800 hover:bg-cyan-50 transition-colors duration-300' style={{ fontSize: "1.5rem" }} /> :
                        "Crear Venta"
                    }
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[475px] bg-white p-6 max-h-[500px] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edición de Venta" : "Creación de Venta"}</DialogTitle>
                    <DialogDescription>{isEditing ? "Menú de edición de ventas" : "Menú de creación de ventas"}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="clienteId" className="text-right">
                            Cliente<sup className="text-red-500">*</sup>
                        </Label>
                        <Input
                            id="clienteId"
                            value={clienteId}
                            onChange={(e) => setClienteId(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="empleadoId" className="text-right">
                            Empleado<sup className="text-red-500">*</sup>
                        </Label>
                        <Input
                            id="empleadoId"
                            value={empleadoId}
                            onChange={(e) => setEmpleadoId(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tipoVenta" className="text-right">
                            Tipo de Venta<sup className="text-red-500">*</sup>
                        </Label>
                        <select
                            id="tipoVenta"
                            value={tipoVenta}
                            onChange={(e) => {
                                setTipoVenta(e.target.value);
                                setIdServicio(""); // Reset idServicio
                                setIdPaquete(""); // Reset idPaquete
                            }}
                            className="col-span-3"
                        >
                            <option value="">Seleccione un tipo de venta</option>
                            <option value="PAQUETE">Paquete</option>
                            <option value="SERVICIO">Servicio</option>
                        </select>
                    </div>
                    {tipoVenta === "PAQUETE" && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="idPaquete" className="text-right">
                                ID del Paquete<sup className="text-red-500">*</sup>
                            </Label>
                            <Input
                                id="idPaquete"
                                value={idPaquete}
                                onChange={(e) => setIdPaquete(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    )}
                    {tipoVenta === "SERVICIO" && (
                        <div className="grid grid-cols
                        -4 items-center gap-4">
                            <Label htmlFor="idServicio" className="text-right">
                                ID del Servicio<sup className="text-red-500">*</sup>
                            </Label>
                            <Input
                                id="idServicio"
                                value={idServicio}
                                onChange={(e) => setIdServicio(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fechaVenta" className="text-right">
                            Fecha de Venta<sup className="text-red-500">*</sup>
                        </Label>
                        <Input
                            id="fechaVenta"
                            type="text"
                            placeholder="yyyy-mm-dd"
                            value={fechaVenta}
                            onChange={(e) => setFechaVenta(e.target.value)}
                            className="col-span-3"
                        />

                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="medioPago" className="text-right">
                            Medio de Pago<sup className="text-red-500">*</sup>
                        </Label>
                        <Input
                            id="medioPago"
                            value={medioPago}
                            onChange={(e) => setMedioPago(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>
                        {isEditing ? "Editar Venta" : "Crear Venta"}
                    </Button>
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
    );
}
