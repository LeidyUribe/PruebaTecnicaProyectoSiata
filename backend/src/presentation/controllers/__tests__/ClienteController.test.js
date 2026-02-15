/**
 * Pruebas unitarias para ClienteController
 * Valida manejo de errores
 */
import { ClienteController } from '../ClienteController.js';
import { validationResult } from 'express-validator';

// Mock express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn()
}));

describe('ClienteController', () => {
  let controller;
  let mockCreateClienteUseCase;
  let mockGetClienteUseCase;
  let mockGetAllClientesUseCase;
  let req, res, next;

  beforeEach(() => {
    mockCreateClienteUseCase = {
      execute: jest.fn()
    };
    mockGetClienteUseCase = {
      execute: jest.fn()
    };
    mockGetAllClientesUseCase = {
      execute: jest.fn()
    };

    controller = new ClienteController(
      mockCreateClienteUseCase,
      mockGetClienteUseCase,
      mockGetAllClientesUseCase
    );

    req = {
      body: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('create - Escenarios de error', () => {
    it('debe retornar 400 si hay errores de validación', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => false,
        array: () => [
          { field: 'email', message: 'Email inválido' }
        ]
      });

      await controller.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Errores de validación',
        errors: [{ field: 'email', message: 'Email inválido' }]
      });
      expect(mockCreateClienteUseCase.execute).not.toHaveBeenCalled();
    });

    it('debe llamar next con error si el caso de uso falla', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const error = new Error('El email ya está registrado');
      mockCreateClienteUseCase.execute.mockRejectedValue(error);

      await controller.create(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getById - Escenarios de error', () => {
    it('debe llamar next con error si el cliente no existe', async () => {
      req.params.id = '999';
      const error = new Error('Cliente no encontrado');
      mockGetClienteUseCase.execute.mockRejectedValue(error);

      await controller.getById(req, res, next);

      expect(mockGetClienteUseCase.execute).toHaveBeenCalledWith(999);
      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getAll - Escenarios de error', () => {
    it('debe llamar next con error si falla la consulta', async () => {
      const error = new Error('Error de base de datos');
      mockGetAllClientesUseCase.execute.mockRejectedValue(error);

      await controller.getAll(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('Escenarios exitosos', () => {
    it('debe crear cliente exitosamente', async () => {
      validationResult.mockReturnValue({
        isEmpty: () => true,
        array: () => []
      });

      const clienteData = { nombre: 'Juan', email: 'juan@test.com' };
      const clienteCreado = { id: 1, ...clienteData };

      req.body = clienteData;
      mockCreateClienteUseCase.execute.mockResolvedValue(clienteCreado);

      await controller.create(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Cliente creado exitosamente',
        data: clienteCreado
      });
    });

    it('debe obtener cliente por ID exitosamente', async () => {
      req.params.id = '1';
      const cliente = { id: 1, nombre: 'Juan', email: 'juan@test.com' };
      mockGetClienteUseCase.execute.mockResolvedValue(cliente);

      await controller.getById(req, res, next);

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: cliente
      });
    });
  });
});
