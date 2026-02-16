/**
 * Pruebas unitarias para la entidad Puerto
 */
import { Puerto } from '../Puerto.js';

describe('Puerto', () => {
  let puerto;

  beforeEach(() => {
    puerto = new Puerto({
      nombre: 'Puerto de Cartagena',
      ubicacion: 'Cartagena, Colombia',
      pais: 'Colombia'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para un puerto válido', () => {
      expect(puerto.isValid()).toBe(true);
    });

    test('debe retornar false si falta el nombre', () => {
      puerto.nombre = '';
      expect(puerto.isValid()).toBe(false);
    });

    test('debe retornar false si falta la ubicación', () => {
      puerto.ubicacion = '';
      expect(puerto.isValid()).toBe(false);
    });

    test('debe retornar false si el nombre solo tiene espacios', () => {
      puerto.nombre = '   ';
      expect(puerto.isValid()).toBe(false);
    });

    test('debe retornar false si la ubicación solo tiene espacios', () => {
      puerto.ubicacion = '   ';
      expect(puerto.isValid()).toBe(false);
    });

    test('debe retornar true incluso si falta el país', () => {
      puerto.pais = null;
      expect(puerto.isValid()).toBe(true);
    });
  });

  describe('constructor', () => {
    test('debe asignar todos los campos correctamente', () => {
      const nuevoPuerto = new Puerto({
        id: 1,
        nombre: 'Puerto Test',
        ubicacion: 'Ubicación Test',
        pais: 'País Test'
      });
      expect(nuevoPuerto.id).toBe(1);
      expect(nuevoPuerto.nombre).toBe('Puerto Test');
      expect(nuevoPuerto.ubicacion).toBe('Ubicación Test');
      expect(nuevoPuerto.pais).toBe('País Test');
    });
  });
});
