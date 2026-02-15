/**
 * Controlador de Bodega
 */
import { validationResult } from 'express-validator';

export class BodegaController {
  constructor(createBodegaUseCase, getAllBodegasUseCase) {
    this.createBodegaUseCase = createBodegaUseCase;
    this.getAllBodegasUseCase = getAllBodegasUseCase;
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

      const bodega = await this.createBodegaUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Bodega creada exitosamente',
        data: bodega
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const bodegas = await this.getAllBodegasUseCase.execute();

      res.json({
        success: true,
        count: bodegas.length,
        data: bodegas
      });
    } catch (error) {
      next(error);
    }
  }
}
