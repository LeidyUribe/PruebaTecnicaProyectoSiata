/**
 * Entidad de Dominio: Puerto
 * Representa un puerto para envíos marítimos
 */
export class Puerto {
  constructor({ id, nombre, ubicacion, pais, fechaCreacion }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.pais = pais;
    this.fechaCreacion = fechaCreacion || new Date();
  }

  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.ubicacion && this.ubicacion.trim().length > 0;
  }
}
