/**
 * Entidad de Dominio: Bodega
 * Representa una bodega para envíos terrestres
 */
export class Bodega {
  constructor({ id, nombre, direccion, ciudad, fechaCreacion }) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.fechaCreacion = fechaCreacion || new Date();
  }

  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.direccion && this.direccion.trim().length > 0;
  }
}
