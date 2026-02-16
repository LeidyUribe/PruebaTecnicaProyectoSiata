/**
 * Pruebas unitarias para la entidad Cliente
 */
import { Cliente } from '../Cliente.js';

describe('Cliente', () => {
  let cliente;

  beforeEach(() => {
    cliente = new Cliente({
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      telefono: '1234567890',
      direccion: 'Calle 123'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para un cliente válido', () => {
      expect(cliente.isValid()).toBe(true);
    });

    test('debe retornar false si falta el nombre', () => {
      cliente.nombre = '';
      expect(cliente.isValid()).toBe(false);
    });

    test('debe retornar false si falta el email', () => {
      cliente.email = '';
      expect(cliente.isValid()).toBe(false);
    });

    test('debe retornar false si el email es inválido', () => {
      cliente.email = 'email-invalido';
      expect(cliente.isValid()).toBe(false);
    });

    test('debe retornar false si el nombre solo tiene espacios', () => {
      cliente.nombre = '   ';
      expect(cliente.isValid()).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    test('debe validar emails correctos', () => {
      expect(cliente.isValidEmail('test@example.com')).toBe(true);
      expect(cliente.isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(cliente.isValidEmail('user+tag@example.com')).toBe(true);
    });

    test('debe rechazar emails inválidos', () => {
      expect(cliente.isValidEmail('email-sin-arroba')).toBe(false);
      expect(cliente.isValidEmail('@example.com')).toBe(false);
      expect(cliente.isValidEmail('user@')).toBe(false);
      expect(cliente.isValidEmail('user@domain')).toBe(false);
      expect(cliente.isValidEmail('')).toBe(false);
      expect(cliente.isValidEmail(null)).toBe(false);
    });
  });

  describe('constructor', () => {
    test('debe crear cliente correctamente', () => {
      const nuevoCliente = new Cliente({
        nombre: 'Test',
        email: 'test@example.com'
      });
      expect(nuevoCliente.nombre).toBe('Test');
      expect(nuevoCliente.email).toBe('test@example.com');
    });
  });
});
