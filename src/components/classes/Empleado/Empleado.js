import Persona from '../Persona/Persona'


export default class Empleado extends Persona {
  constructor(id, nombre, apellido, dni, fechaNac, pais, celular, email, password, cargo, sueldo) {
    super(id, nombre, apellido, dni, fechaNac, pais, celular, email, password);
    this.cargo = cargo;
    this.sueldo = sueldo;
  }

  getCargo() {
    return this.cargo;
  }

  setCargo(cargo) {
    this.cargo = cargo;
  }

  getSueldo() {
    return this.sueldo;
  }

  setSueldo(sueldo) {
    this.sueldo = sueldo;
  }
}
