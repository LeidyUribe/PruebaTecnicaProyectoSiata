/**
 * Entidad de Dominio: Envío Terrestre
 * Representa un envío por vía terrestre
 * 
 * Reglas de negocio:
 * - Placa vehículo: 3 letras + 3 números
 * - Número guía: 10 caracteres alfanuméricos únicos
 * - Descuento 5% si cantidad > 10
 */
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
    precioFinal,
    fechaCreacion
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
    this.fechaCreacion = fechaCreacion || new Date();
  }

  /**
   * Valida que el envío terrestre cumpla con todas las reglas de negocio
   */
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

  /**
   * Valida formato de placa: 3 letras + 3 números
   * Ejemplo: ABC123
   */
  isValidPlaca(placa) {
    if (!placa) return false;
    const placaRegex = /^[A-Z]{3}[0-9]{3}$/i;
    return placaRegex.test(placa);
  }

  /**
   * Valida formato de número de guía: 10 caracteres alfanuméricos
   */
  isValidNumeroGuia(numeroGuia) {
    if (!numeroGuia) return false;
    const guiaRegex = /^[A-Z0-9]{10}$/i;
    return guiaRegex.test(numeroGuia);
  }

  /**
   * Calcula el descuento según las reglas de negocio
   * Descuento 5% si cantidad > 10
   */
  calcularDescuento() {
    if (this.cantidad > 10) {
      this.descuento = 0.05; // 5%
    } else {
      this.descuento = 0;
    }
    return this.descuento;
  }

  /**
   * Calcula el precio final aplicando el descuento
   */
  calcularPrecioFinal() {
    const descuento = this.calcularDescuento();
    this.precioFinal = this.precioEnvio * (1 - descuento);
    return this.precioFinal;
  }
}
