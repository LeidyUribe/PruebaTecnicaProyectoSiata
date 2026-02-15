/**
 * Pruebas para validar manejo de errores en servicios
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clienteService } from '../clienteService';
import { authService } from '../authService';
import api from '../api';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn()
      }
    }
  }
}));

describe('Manejo de Errores en Servicios', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('clienteService - Errores', () => {
    it('debe manejar error 400 (Bad Request)', async () => {
      const error = {
        response: {
          status: 400,
          data: {
            success: false,
            message: 'Errores de validación',
            errors: [{ field: 'email', message: 'Email inválido' }]
          }
        }
      };

      api.get.mockRejectedValue(error);

      await expect(clienteService.getAll()).rejects.toThrow();
    });

    it('debe manejar error 401 (Unauthorized)', async () => {
      const error = {
        response: {
          status: 401,
          data: {
            success: false,
            message: 'Token inválido'
          }
        }
      };

      api.get.mockRejectedValue(error);

      await expect(clienteService.getAll()).rejects.toThrow();
    });

    it('debe manejar error 404 (Not Found)', async () => {
      const error = {
        response: {
          status: 404,
          data: {
            success: false,
            message: 'Cliente no encontrado'
          }
        }
      };

      api.get.mockRejectedValue(error);

      await expect(clienteService.getById(999)).rejects.toThrow();
    });

    it('debe manejar error 409 (Conflict)', async () => {
      const error = {
        response: {
          status: 409,
          data: {
            success: false,
            message: 'El email ya está registrado'
          }
        }
      };

      api.post.mockRejectedValue(error);

      await expect(
        clienteService.create({ nombre: 'Test', email: 'test@test.com' })
      ).rejects.toThrow();
    });

    it('debe manejar error 500 (Internal Server Error)', async () => {
      const error = {
        response: {
          status: 500,
          data: {
            success: false,
            message: 'Error interno del servidor'
          }
        }
      };

      api.get.mockRejectedValue(error);

      await expect(clienteService.getAll()).rejects.toThrow();
    });

    it('debe manejar errores de red', async () => {
      const error = new Error('Network Error');
      error.code = 'ECONNREFUSED';

      api.get.mockRejectedValue(error);

      await expect(clienteService.getAll()).rejects.toThrow('Network Error');
    });

    it('debe manejar errores sin response', async () => {
      const error = new Error('Unknown error');

      api.get.mockRejectedValue(error);

      await expect(clienteService.getAll()).rejects.toThrow('Unknown error');
    });
  });

  describe('authService - Errores', () => {
    it('debe manejar error de autenticación', async () => {
      const error = {
        response: {
          status: 401,
          data: {
            success: false,
            message: 'Token inválido'
          }
        }
      };

      api.post.mockRejectedValue(error);

      await expect(authService.login()).rejects.toThrow('Error al iniciar sesión');
    });

    it('debe manejar error cuando JWT_SECRET no está configurado', async () => {
      const error = {
        response: {
          status: 500,
          data: {
            success: false,
            message: 'secretOrPrivateKey must have a value'
          }
        }
      };

      api.post.mockRejectedValue(error);

      await expect(authService.login()).rejects.toThrow('Error al iniciar sesión');
    });
  });
});
