export class Producto {
  constructor({ id, tipo, descripcion }) {
    this.id = id;
    this.tipo = tipo;
    this.descripcion = descripcion;
  }

  isValid() {
    return this.tipo && this.tipo.trim().length > 0;
  }
}
