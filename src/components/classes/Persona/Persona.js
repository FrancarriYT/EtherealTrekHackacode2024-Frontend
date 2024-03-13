export default class Persona {
    constructor(id, nombre, apellido, dni, fechaNac, pais, celular, email, password) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      this.fechaNac = fechaNac;
      this.pais = pais;
      this.celular = celular;
      this.email = email;
      this.password = password;
    }
  
    getId() {
      return this.id;
    }
  
    setId(id) {
      this.id = id;
    }
  
    getNombre() {
      return this.nombre;
    }
  
    setNombre(nombre) {
      this.nombre = nombre;
    }
  
    getApellido() {
      return this.apellido;
    }
  
    setApellido(apellido) {
      this.apellido = apellido;
    }
  
    getDni() {
      return this.dni;
    }
  
    setDni(dni) {
      this.dni = dni;
    }
  
    getFechaNac() {
      return this.fechaNac;
    }
  
    setFechaNac(fechaNac) {
      this.fechaNac = fechaNac;
    }
  
    getPais() {
      return this.pais;
    }
  
    setPais(pais) {
      this.pais = pais;
    }
  
    getCelular() {
      return this.celular;
    }
  
    setCelular(celular) {
      this.celular = celular;
    }
  
    getEmail() {
      return this.email;
    }
  
    setEmail(email) {
      this.email = email;
    }
  
    getPassword() {
      return this.password;
    }
  
    setPassword(password) {
      this.password = password;
    }
  }
  