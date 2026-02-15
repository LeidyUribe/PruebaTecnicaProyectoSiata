/**
 * Controlador de Puerto
 */
import { validationResult } from 'express-validator';

export class PuertoController {
  constructor(createPuertoUseCase, getAllPuertosUseCase) {
    this.createPuertoUseCase = createPuertoUseCase;
    this.getAllPuertosUseCase = getAllPuertosUseCase;
  }

  async create(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const puerto = await this.createPuertoUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Puerto creado exitosamente',
        data: puerto
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const puertos = await this.getAllPuertosUseCase.execute();

      res.json({
        success: true,
        count: puertos.length,
        data: puertos
      });
    } catch (error) {
      next(error);
    }
  }
}
