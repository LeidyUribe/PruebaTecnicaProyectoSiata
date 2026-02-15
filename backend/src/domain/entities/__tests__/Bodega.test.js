/**
 * Pruebas unitarias para la entidad Bodega
 */
import { Bodega } from '../Bodega.js';

describe('Bodega', () => {
  let bodega;

  beforeEach(() => {
    bodega = new Bodega({
      nombre: 'Bodega Central',
      direccion: 'Calle Principal 123',
      ciudad: 'Bogotá'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para una bodega válida', () => {
      expect(bodega.isValid()).toBe(true);
    });

    test('debe retornar false si falta el nombre', () => {
      bodega.nombre = '';
      expect(bodega.isValid()).toBe(false);
    });

    test('debe retornar false si falta la dirección', () => {
      bodega.direccion = '';
      expect(bodega.isValid()).toBe(false);
    });

    test('debe retornar false si el nombre solo tiene espacios', () => {
      bodega.nombre = '   ';
      expect(bodega.isValid()).toBe(false);
    });

    test('debe retornar false si la dirección solo tiene espacios', () => {
      bodega.direccion = '   ';
      expect(bodega.isValid()).toBe(false);
    });

    test('debe retornar true incluso si falta la ciudad', () => {
      bodega.ciudad = null;
      expect(bodega.isValid()).toBe(true);
    });
  });

  describe('constructor', () => {
    test('debe asignar fechaCreacion por defecto si no se proporciona', () => {
      const nuevaBodega = new Bodega({
        nombre: 'Test',
        direccion: 'Dirección Test'
      });
      expect(nuevaBodega.fechaCreacion).toBeInstanceOf(Date);
    });

    test('debe asignar todos los campos correctamente', () => {
      const fecha = new Date('2024-01-01');
      const nuevaBodega = new Bodega({
        id: 1,
        nombre: 'Bodega Test',
        direccion: 'Dirección Test',
        ciudad: 'Ciudad Test',
        fechaCreacion: fecha
      });
      expect(nuevaBodega.id).toBe(1);
      expect(nuevaBodega.nombre).toBe('Bodega Test');
      expect(nuevaBodega.direccion).toBe('Dirección Test');
      expect(nuevaBodega.ciudad).toBe('Ciudad Test');
      expect(nuevaBodega.fechaCreacion).toBe(fecha);
    });
  });
});
