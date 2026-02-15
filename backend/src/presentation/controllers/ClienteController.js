/**
 * Controlador de Cliente
 * Maneja las peticiones HTTP relacionadas con clientes
 */
import { validationResult } from 'express-validator';

export class ClienteController {
  constructor(createClienteUseCase, getClienteUseCase, getAllClientesUseCase) {
    this.createClienteUseCase = createClienteUseCase;
    this.getClienteUseCase = getClienteUseCase;
    this.getAllClientesUseCase = getAllClientesUseCase;
  }

  async create(req, res, next) {
    try {
      // Validar errores de express-validator
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const cliente = await this.createClienteUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Cliente creado exitosamente',
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const cliente = await this.getClienteUseCase.execute(parseInt(id));

      res.json({
        success: true,
        data: cliente
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const clientes = await this.getAllClientesUseCase.execute();

      res.json({
        success: true,
        count: clientes.length,
        data: clientes
      });
    } catch (error) {
      next(error);
    }
  }
}
