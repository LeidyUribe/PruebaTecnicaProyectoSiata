/**
 * Pruebas unitarias para el middleware de manejo de errores
 */
import { errorHandler } from '../errorHandler.js';

describe('errorHandler', () => {
  let req, res, next;
  let originalConsoleError;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    originalConsoleError = console.error;
    console.error = jest.fn(); // Mock console.error
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  describe('Errores de validación (400)', () => {
    it('debe retornar 400 para errores de validación con nombre ValidationError', () => {
      const error = {
        name: 'ValidationError',
        message: 'Error de validación',
        errors: [{ field: 'email', message: 'Email inválido' }]
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error de validación',
        errors: [{ field: 'email', message: 'Email inválido' }]
      });
    });

    it('debe retornar 400 para mensajes que contienen "inválid"', () => {
      const error = {
        message: 'Datos inválidos'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Datos inválidos',
        errors: []
      });
    });
  });

  describe('Errores de recurso no encontrado (404)', () => {
    it('debe retornar 404 para mensajes que contienen "no encontrado"', () => {
      const error = {
        message: 'Cliente no encontrado'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Cliente no encontrado'
      });
    });

    it('debe retornar 404 para mensajes que contienen "not found"', () => {
      const error = {
        message: 'Resource not found'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Resource not found'
      });
    });
  });

  describe('Errores de duplicado (409)', () => {
    it('debe retornar 409 para mensajes que contienen "ya existe"', () => {
      const error = {
        message: 'El número de guía ya existe'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'El número de guía ya existe'
      });
    });

    it('debe retornar 409 para mensajes que contienen "ya está"', () => {
      const error = {
        message: 'El email ya está registrado'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'El email ya está registrado'
      });
    });
  });

  describe('Errores internos del servidor (500)', () => {
    it('debe retornar 500 para errores desconocidos', () => {
      const error = {
        message: 'Error desconocido'
      };

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error desconocido'
      });
    });

    it('debe retornar 500 con mensaje por defecto si no hay mensaje', () => {
      const error = {};

      errorHandler(error, req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error interno del servidor'
      });
    });
  });

  it('debe registrar el error en consola', () => {
    const error = { message: 'Test error' };
    errorHandler(error, req, res, next);
    expect(console.error).toHaveBeenCalledWith('Error:', error);
  });
});
