export class Puerto {
  constructor({ id, nombre, ubicacion, pais }) {
    this.id = id;
    this.nombre = nombre;
    this.ubicacion = ubicacion;
    this.pais = pais;
  }

  isValid() {
    return this.nombre && this.nombre.trim().length > 0 &&
           this.ubicacion && this.ubicacion.trim().length > 0;
  }
}
