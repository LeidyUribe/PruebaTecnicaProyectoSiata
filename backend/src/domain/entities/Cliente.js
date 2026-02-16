export class Cliente {
  constructor({ id, nombre, email, telefono, direccion }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
  }

  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.email && this.isValidEmail(this.email);
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
