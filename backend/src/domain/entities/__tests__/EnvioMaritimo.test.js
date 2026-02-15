/**
 * Pruebas unitarias para la entidad EnvioMaritimo
 */
import { EnvioMaritimo } from '../EnvioMaritimo.js';

describe('EnvioMaritimo', () => {
  let envio;

  beforeEach(() => {
    envio = new EnvioMaritimo({
      clienteId: 1,
      productoId: 1,
      cantidad: 5,
      fechaRegistro: '2024-01-01',
      fechaEntrega: '2024-01-10',
      puertoId: 1,
      precioEnvio: 2000,
      numeroFlota: 'ABC1234D',
      numeroGuia: 'GUIA123456'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para un envío válido', () => {
      expect(envio.isValid()).toBe(true);
    });

    test('debe retornar false si falta puertoId', () => {
      envio.puertoId = null;
      expect(envio.isValid()).toBe(false);
    });
  });

  describe('isValidNumeroFlota', () => {
    test('debe validar número de flota correcto (3 letras + 4 números + 1 letra)', () => {
      expect(envio.isValidNumeroFlota('ABC1234D')).toBe(true);
      expect(envio.isValidNumeroFlota('XYZ9999Z')).toBe(true);
    });

    test('debe rechazar números de flota inválidos', () => {
      expect(envio.isValidNumeroFlota('AB1234D')).toBe(false);
      expect(envio.isValidNumeroFlota('ABC123D')).toBe(false);
      expect(envio.isValidNumeroFlota('ABC12345D')).toBe(false);
      expect(envio.isValidNumeroFlota('1234ABCD')).toBe(false);
    });
  });

  describe('calcularDescuento', () => {
    test('debe aplicar 3% de descuento si cantidad > 10', () => {
      envio.cantidad = 15;
      const descuento = envio.calcularDescuento();
      expect(descuento).toBe(0.03);
    });

    test('no debe aplicar descuento si cantidad <= 10', () => {
      envio.cantidad = 10;
      const descuento = envio.calcularDescuento();
      expect(descuento).toBe(0);
    });
  });

  describe('calcularPrecioFinal', () => {
    test('debe calcular precio final con descuento del 3% para cantidad > 10', () => {
      envio.cantidad = 15;
      envio.precioEnvio = 2000;
      const precioFinal = envio.calcularPrecioFinal();
      expect(precioFinal).toBe(1940); // 2000 * (1 - 0.03)
    });

    test('debe calcular precio final sin descuento para cantidad <= 10', () => {
      envio.cantidad = 5;
      envio.precioEnvio = 2000;
      const precioFinal = envio.calcularPrecioFinal();
      expect(precioFinal).toBe(2000);
    });
  });
});
