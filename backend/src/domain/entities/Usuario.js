export class Usuario {
  constructor({ id, email, password, nombre, rol }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nombre = nombre;
    this.rol = rol || 'user';
  }

  isValid() {
    return this.email && this.isValidEmail(this.email) &&
           this.password && this.password.trim().length > 0 &&
           this.nombre && this.nombre.trim().length > 0;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isValidRol(rol) {
    return ['user', 'admin'].includes(rol);
  }
}
