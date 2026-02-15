/**
 * Pruebas unitarias para authService
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../authService';
import api from '../api';

// Mock del módulo api
vi.mock('../api', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('debe hacer login exitosamente y retornar datos', async () => {
      const mockResponse = {
        data: {
          success: true,
          token: 'mock-token-123',
          expiresIn: '24h'
        }
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await authService.login();

      expect(api.post).toHaveBeenCalledWith('/auth/login');
      expect(result).toEqual(mockResponse.data);
    });

    it('debe lanzar error si la petición falla', async () => {
      const mockError = {
        response: {
          data: {
            message: 'Error de servidor'
          }
        }
      };

      api.post.mockRejectedValue(mockError);

      await expect(authService.login()).rejects.toThrow('Error al iniciar sesión');
    });

    it('debe lanzar error genérico si no hay response', async () => {
      api.post.mockRejectedValue(new Error('Network error'));

      await expect(authService.login()).rejects.toThrow('Error al iniciar sesión');
    });
  });
});
