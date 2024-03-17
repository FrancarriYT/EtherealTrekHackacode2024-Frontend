import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export function SelectCargo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona un Cargo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="VENDEDOR">Rol de Vendedor</SelectItem>
          <SelectItem value="CONTADOR">Rol de Contador</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}