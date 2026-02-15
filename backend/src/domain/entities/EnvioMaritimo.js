/**
 * Entidad de Dominio: Envío Marítimo
 * Representa un envío por vía marítima
 * 
 * Reglas de negocio:
 * - Número flota: 3 letras + 4 números + 1 letra
 * - Número guía: 10 caracteres alfanuméricos únicos
 * - Descuento 3% si cantidad > 10
 */
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
    precioFinal,
    fechaCreacion
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
    this.fechaCreacion = fechaCreacion || new Date();
  }

  /**
   * Valida que el envío marítimo cumpla con todas las reglas de negocio
   */
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

  /**
   * Valida formato de número de flota: 3 letras + 4 números + 1 letra
   * Ejemplo: ABC1234D
   */
  isValidNumeroFlota(numeroFlota) {
    if (!numeroFlota) return false;
    const flotaRegex = /^[A-Z]{3}[0-9]{4}[A-Z]{1}$/i;
    return flotaRegex.test(numeroFlota);
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
   * Descuento 3% si cantidad > 10
   */
  calcularDescuento() {
    if (this.cantidad > 10) {
      this.descuento = 0.03; // 3%
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
