class Usuario {
    constructor(
      id,
      nombre,
      apellido,
      email,
      password,
      celular,
      dni,
      roles,
      enabled,
      intentos,
      registrationDate
    ) {
      this.id = id;
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.password = password;
      this.celular = celular;
      this.dni = dni;
      this.roles = roles;
      this.enabled = enabled;
      this.intentos = intentos;
      this.registrationDate = registrationDate;
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
  
    getCelular() {
      return this.celular;
    }
  
    setCelular(celular) {
      this.celular = celular;
    }
  
    getDni() {
      return this.dni;
    }
  
    setDni(dni) {
      this.dni = dni;
    }
  
    getRoles() {
      return this.roles;
    }
  
    setRoles(roles) {
      this.roles = roles;
    }
  
    getEnabled() {
      return this.enabled;
    }
  
    setEnabled(enabled) {
      this.enabled = enabled;
    }
  
    getIntentos() {
      return this.intentos;
    }
  
    setIntentos(intentos) {
      this.intentos = intentos;
    }
  
    getRegistrationDate() {
      return this.registrationDate;
    }
  
    setRegistrationDate(registrationDate) {
      this.registrationDate = registrationDate;
    }
  }
  
  module.exports = Usuario;
  