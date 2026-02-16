export class EnvioMaritimo {
  constructor({
    id,
    clienteId,
    productoId,
    cantidad,
    fechaRegistro,
    fechaEntrega,
    puertoId,
    precioEnvio,
    numeroFlota,
    numeroGuia,
    descuento,
    precioFinal
  }) {
    this.id = id;
    this.clienteId = clienteId;
    this.productoId = productoId;
    this.cantidad = cantidad;
    this.fechaRegistro = fechaRegistro;
    this.fechaEntrega = fechaEntrega;
    this.puertoId = puertoId;
    this.precioEnvio = precioEnvio;
    this.numeroFlota = numeroFlota;
    this.numeroGuia = numeroGuia;
    this.descuento = descuento || 0;
    this.precioFinal = precioFinal;
  }

  isValid() {
    return this.clienteId &&
           this.productoId &&
           this.cantidad > 0 &&
           this.fechaRegistro &&
           this.fechaEntrega &&
           this.puertoId &&
           this.precioEnvio > 0 &&
           this.isValidNumeroFlota(this.numeroFlota) &&
           this.isValidNumeroGuia(this.numeroGuia) &&
           this.fechaEntrega >= this.fechaRegistro;
  }

  isValidNumeroFlota(numeroFlota) {
    if (!numeroFlota) return false;
    const flotaRegex = /^[A-Z]{3}[0-9]{4}[A-Z]{1}$/i;
    return flotaRegex.test(numeroFlota);
  }

  isValidNumeroGuia(numeroGuia) {
    if (!numeroGuia) return false;
    const guiaRegex = /^[A-Z0-9]{10}$/i;
    return guiaRegex.test(numeroGuia);
  }

  calcularDescuento() {
    if (this.cantidad > 10) {
      this.descuento = 0.03;
    } else {
      this.descuento = 0;
    }
    return this.descuento;
  }

  calcularPrecioFinal() {
    const descuento = this.calcularDescuento();
    this.precioFinal = this.precioEnvio * (1 - descuento);
    return this.precioFinal;
  }
}
