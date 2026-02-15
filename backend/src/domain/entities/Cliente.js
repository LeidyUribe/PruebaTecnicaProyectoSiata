/**
 * Entidad de Dominio: Cliente
 * Representa un cliente en el sistema de logística
 */
export class Cliente {
  constructor({ id, nombre, email, telefono, direccion, fechaCreacion }) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fechaCreacion = fechaCreacion || new Date();
  }

  /**
   * Valida que el cliente tenga los datos mínimos requeridos
   */
  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.email && this.isValidEmail(this.email);
  }

  /**
   * Valida formato de email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
