export class EnvioTerrestre {
  constructor({
    id,
    clienteId,
    productoId,
    cantidad,
    fechaRegistro,
    fechaEntrega,
    bodegaId,
    precioEnvio,
    placaVehiculo,
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
    this.bodegaId = bodegaId;
    this.precioEnvio = precioEnvio;
    this.placaVehiculo = placaVehiculo;
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
           this.bodegaId &&
           this.precioEnvio > 0 &&
           this.isValidPlaca(this.placaVehiculo) &&
           this.isValidNumeroGuia(this.numeroGuia) &&
           this.fechaEntrega >= this.fechaRegistro;
  }

  isValidPlaca(placa) {
    if (!placa) return false;
    const placaRegex = /^[A-Z]{3}[0-9]{3}$/i;
    return placaRegex.test(placa);
  }

  isValidNumeroGuia(numeroGuia) {
    if (!numeroGuia) return false;
    const guiaRegex = /^[A-Z0-9]{10}$/i;
    return guiaRegex.test(numeroGuia);
  }

  calcularDescuento() {
    if (this.cantidad > 10) {
      this.descuento = 0.05;
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
