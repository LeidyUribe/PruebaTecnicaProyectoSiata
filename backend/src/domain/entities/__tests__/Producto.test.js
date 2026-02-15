/**
 * Pruebas unitarias para la entidad Producto
 */
import { Producto } from '../Producto.js';

describe('Producto', () => {
  let producto;

  beforeEach(() => {
    producto = new Producto({
      tipo: 'Electrónico',
      descripcion: 'Producto electrónico de alta calidad'
    });
  });

  describe('isValid', () => {
    test('debe retornar true para un producto válido', () => {
      expect(producto.isValid()).toBe(true);
    });

    test('debe retornar false si falta el tipo', () => {
      producto.tipo = '';
      expect(producto.isValid()).toBe(false);
    });

    test('debe retornar false si el tipo es null', () => {
      producto.tipo = null;
      expect(producto.isValid()).toBe(false);
    });

    test('debe retornar false si el tipo solo tiene espacios', () => {
      producto.tipo = '   ';
      expect(producto.isValid()).toBe(false);
    });

    test('debe retornar true si el tipo tiene contenido válido', () => {
      producto.tipo = 'Alimento';
      expect(producto.isValid()).toBe(true);
    });
  });

  describe('constructor', () => {
    test('debe asignar fechaCreacion por defecto si no se proporciona', () => {
      const nuevoProducto = new Producto({
        tipo: 'Test'
      });
      expect(nuevoProducto.fechaCreacion).toBeInstanceOf(Date);
    });

    test('debe permitir descripcion opcional', () => {
      const nuevoProducto = new Producto({
        tipo: 'Test'
      });
      expect(nuevoProducto.descripcion).toBeUndefined();
    });

    test('debe asignar todos los campos correctamente', () => {
      const fecha = new Date('2024-01-01');
      const nuevoProducto = new Producto({
        id: 1,
        tipo: 'Electrónico',
        descripcion: 'Descripción',
        fechaCreacion: fecha
      });
      expect(nuevoProducto.id).toBe(1);
      expect(nuevoProducto.tipo).toBe('Electrónico');
      expect(nuevoProducto.descripcion).toBe('Descripción');
      expect(nuevoProducto.fechaCreacion).toBe(fecha);
    });
  });
});
