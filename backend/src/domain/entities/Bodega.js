export class Bodega {
  constructor({ id, nombre, direccion, ciudad }) {
    this.id = id;
    this.nombre = nombre;
    this.direccion = direccion;
    this.ciudad = ciudad;
  }

  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.direccion && this.direccion.trim().length > 0;
  }
}
