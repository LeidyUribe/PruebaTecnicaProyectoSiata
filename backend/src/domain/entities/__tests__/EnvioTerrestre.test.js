/**
 * Pruebas unitarias para la entidad EnvioTerrestre
 */
import { EnvioTerrestre } from '../EnvioTerrestre.js';

describe('EnvioTerrestre', () => {
  let envio;

  beforeEach(() => {
    envio = new EnvioTerrestre({
      clienteId: 1,
      productoId: 1,
      cantidad: 5,
      fechaRegistro: '2024-01-01',
      fechaEntrega: '2024-01-05',
      bodegaId: 1,
      precioEnvio: 1000,
      placaVehiculo: 'ABC123',
      numeroGuia: 'GUIA123456'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para un envío válido', () => {
      expect(envio.isValid()).toBe(true);
    });

    test('debe retornar false si falta clienteId', () => {
      envio.clienteId = null;
      expect(envio.isValid()).toBe(false);
    });

    test('debe retornar false si la cantidad es 0', () => {
      envio.cantidad = 0;
      expect(envio.isValid()).toBe(false);
    });

    test('debe retornar false si fechaEntrega es anterior a fechaRegistro', () => {
      envio.fechaEntrega = '2023-12-31';
      expect(envio.isValid()).toBe(false);
    });
  });

  describe('isValidPlaca', () => {
    test('debe validar placa correcta (3 letras + 3 números)', () => {
      expect(envio.isValidPlaca('ABC123')).toBe(true);
      expect(envio.isValidPlaca('XYZ999')).toBe(true);
    });

    test('debe rechazar placas inválidas', () => {
      expect(envio.isValidPlaca('AB123')).toBe(false);
      expect(envio.isValidPlaca('ABC12')).toBe(false);
      expect(envio.isValidPlaca('123ABC')).toBe(false);
      expect(envio.isValidPlaca('ABC1234')).toBe(false);
    });
  });

  describe('isValidNumeroGuia', () => {
    test('debe validar número de guía correcto (10 caracteres alfanuméricos)', () => {
      expect(envio.isValidNumeroGuia('GUIA123456')).toBe(true);
      expect(envio.isValidNumeroGuia('ABC123DEF4')).toBe(true);
    });

    test('debe rechazar números de guía inválidos', () => {
      expect(envio.isValidNumeroGuia('GUIA12345')).toBe(false); // 9 caracteres
      expect(envio.isValidNumeroGuia('GUIA1234567')).toBe(false); // 11 caracteres
      expect(envio.isValidNumeroGuia('GUIA-12345')).toBe(false); // contiene guión
    });
  });

  describe('calcularDescuento', () => {
    test('debe aplicar 5% de descuento si cantidad > 10', () => {
      envio.cantidad = 15;
      const descuento = envio.calcularDescuento();
      expect(descuento).toBe(0.05);
    });

    test('no debe aplicar descuento si cantidad <= 10', () => {
      envio.cantidad = 10;
      const descuento = envio.calcularDescuento();
      expect(descuento).toBe(0);
    });
  });

  describe('calcularPrecioFinal', () => {
    test('debe calcular precio final con descuento del 5% para cantidad > 10', () => {
      envio.cantidad = 15;
      envio.precioEnvio = 1000;
      const precioFinal = envio.calcularPrecioFinal();
      expect(precioFinal).toBe(950); // 1000 * (1 - 0.05)
    });

    test('debe calcular precio final sin descuento para cantidad <= 10', () => {
      envio.cantidad = 5;
      envio.precioEnvio = 1000;
      const precioFinal = envio.calcularPrecioFinal();
      expect(precioFinal).toBe(1000);
    });
  });
});
