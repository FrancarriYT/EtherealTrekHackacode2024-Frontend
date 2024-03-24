import {
    CalendarIcon,
    EnvelopeClosedIcon,
    FaceIcon,
    GearIcon,
    PersonIcon,
    RocketIcon,
  } from "@radix-ui/react-icons";
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/Command";
  import { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
  
  export function CommandAdmin({ onSelectOption }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCommandVisible, setIsCommandVisible] = useState(true);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option === selectedOption ? null : option);
      onSelectOption(option === selectedOption ? null : option);
      setIsCommandVisible(false);
      console.log("Selected Option:", option);
    };
  
    const handleCommandInputClick = () => {
      setIsCommandVisible(true);
      setSelectedOption(null);
      console.log("Selected Option:", null);
    };
  
    return (
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Escriba lo que desea buscar..."
          onClick={handleCommandInputClick}
        />
        <CommandList style={{ display: isCommandVisible ? "block" : "none" }}>
          <CommandEmpty>No se han encontrado resultados.</CommandEmpty>
          <div>
            {/* Wrapper div */}
            <CommandGroup heading="Personas">
              <CommandItem onSelect={() => handleOptionSelect("Empleados")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Empleados</span>
              </CommandItem>
              <CommandItem onSelect={() => handleOptionSelect("Clientes")}>
                <FaceIcon className="mr-2 h-4 w-4" />
                <span>Clientes</span>
              </CommandItem>
              <CommandItem onSelect={() => handleOptionSelect("Roles")}>
                <RocketIcon className="mr-2 h-4 w-4" />
                <span>Roles</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => handleOptionSelect("Servicios")}>
                <PersonIcon className="mr-2 h-4 w-4" />
                <span>Servicios</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => handleOptionSelect("Paquetes")}>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                <span>Paquetes</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => handleOptionSelect("Ventas")}>
                <FaMoneyBill className="mr-2 h-4 w-4" />
                <span>Ventas</span>
              </CommandItem>
              <CommandItem onSelect={() => handleOptionSelect("Settings")}>
                <GearIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </div>
        </CommandList>
        <div
          style={{
            display: selectedOption ? "block" : "none",
            background: "black",
            color: "white",
            padding: "10px",
            marginTop: "10px",
          }}
          onClick={handleCommandInputClick}
        >
          {selectedOption || "Placeholder"}
        </div>
      </Command>
    );
  }
  