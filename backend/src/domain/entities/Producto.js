/**
 * Entidad de Dominio: Producto
 * Representa un producto que puede ser enviado
 */
export class Producto {
  constructor({ id, tipo, descripcion, fechaCreacion }) {
    this.id = id;
    this.tipo = tipo;
    this.descripcion = descripcion;
    this.fechaCreacion = fechaCreacion || new Date();
  }

  isValid() {
    return this.tipo && this.tipo.trim().length > 0;
  }
}
