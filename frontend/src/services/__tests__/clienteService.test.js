/**
 * Pruebas unitarias para clienteService
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { clienteService } from '../clienteService';
import api from '../api';

vi.mock('../api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}));

describe('clienteService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('debe obtener todos los clientes exitosamente', async () => {
      const mockResponse = {
        data: {
          success: true,
          count: 2,
          data: [
            { id: 1, nombre: 'Cliente 1', email: 'cliente1@test.com' },
            { id: 2, nombre: 'Cliente 2', email: 'cliente2@test.com' }
          ]
        }
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await clienteService.getAll();

      expect(api.get).toHaveBeenCalledWith('/clientes');
      expect(result).toEqual(mockResponse.data);
    });

    it('debe manejar errores al obtener clientes', async () => {
      api.get.mockRejectedValue(new Error('Network error'));

      await expect(clienteService.getAll()).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('debe obtener un cliente por ID', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: { id: 1, nombre: 'Cliente 1', email: 'cliente1@test.com' }
        }
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await clienteService.getById(1);

      expect(api.get).toHaveBeenCalledWith('/clientes/1');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('create', () => {
    it('debe crear un cliente exitosamente', async () => {
      const clienteData = {
        nombre: 'Nuevo Cliente',
        email: 'nuevo@test.com',
        telefono: '1234567890'
      };

      const mockResponse = {
        data: {
          success: true,
          message: 'Cliente creado exitosamente',
          data: { id: 1, ...clienteData }
        }
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await clienteService.create(clienteData);

      expect(api.post).toHaveBeenCalledWith('/clientes', clienteData);
      expect(result).toEqual(mockResponse.data);
    });
  });
});
