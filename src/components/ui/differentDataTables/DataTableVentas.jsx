import * as React from "react";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/Button";
import { MdOutlineRefresh } from "react-icons/md";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getAllVentas, deleteVenta } from "../../classes/Ventas/VentasFunctions";
import { DialogVenta } from "../differentDialogues/DialogVenta";
import RemoveVenta from "../differentRemoves/RemoveVenta";


export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "idVenta",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("idVenta").substring(0, 7)}</div>
        ),
    },
    {
        accessorKey: "tipoVenta",
        header: "Tipo de Venta",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("tipoVenta")}</div>
        ),
    },
    {
        accessorKey: "descripcion",
        header: "Descripción",
        cell: ({ row }) => (
            <div className="capitalize">
                {row.getValue("tipoVenta") === "PAQUETE"
                    ? row.original.paquete.descripcion
                    : row.original.servicio.descripcion}
            </div>
        ),
    },

    {
        accessorKey: "fechaVenta",
        header: "Fecha de Venta",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("fechaVenta")}</div>
        ),
    },
    {
        accessorKey: "total",
        header: "Costo",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("total")}$</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const ventaId = row.getValue("idVenta");

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "4px",
                            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
                            position: "relative", // Ajuste para posicionar correctamente los botones
                        }}
                    >
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.getValue("idVenta"))}
                        >
                            Copiar ID de Venta
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.empleado.id)}
                        >
                            Copiar ID del Empleado
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.cliente.id)}
                        >
                            Copiar ID del Cliente
                        </DropdownMenuItem>
                        {row.original.tipoVenta === "PAQUETE" || row.original.tipoVenta === "SERVICIO" && (
                            <DropdownMenuItem
                                onClick={() => {
                                    const idServicioPaquete = row.original.tipoVenta === "PAQUETE"
                                        ? row.original.paquete.idPaquete
                                        : row.original.servicio.idServicio;
                                    navigator.clipboard.writeText(idServicioPaquete);
                                }}
                            >
                                Copiar ID del Servicio o Paquete
                            </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                    </DropdownMenuContent>

                        <DialogVenta isEditing={true} idVenta={ventaId} />
                        <RemoveVenta idVenta={ventaId} onDelete={deleteVenta} />

                </DropdownMenu>

            );
        },
    },
];

export function DataTableVentas() {
    const [sorting, setSorting] = React.useState([]);
    const [columnFilters, setColumnFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [data, setData] = React.useState([]);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const reloadVentas = async () => {
        try {
            const data = await getAllVentas();
            setData(data);
        } catch (error) {
            console.error('Error al recargar la lista de ventas:', error);
        }
    };

    React.useEffect(() => {
        reloadVentas();
    }, []);

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por descripción..."
                    value={(table.getColumn("descripcion")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("descripcion")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DialogVenta isEditing={false} />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={reloadVentas}
                    className="ml-4 relative"
                    style={{ padding: "0.30rem", height: "h-2" }}
                >
                    <MdOutlineRefresh className="h-6 w-6" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columnas <ChevronDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

