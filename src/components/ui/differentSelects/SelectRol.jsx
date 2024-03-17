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
 
export function SelectRol() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Selecciona un Cargo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cargo</SelectLabel>
          <SelectItem value="ROLE_USER">Usuario</SelectItem>
          <SelectItem value="ROLE_ADMIN">Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}