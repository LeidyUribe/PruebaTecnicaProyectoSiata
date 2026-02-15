/**
 * Controlador de Envío Marítimo
 */
import { validationResult } from 'express-validator';

export class EnvioMaritimoController {
  constructor(createEnvioMaritimoUseCase, getAllEnviosMaritimosUseCase) {
    this.createEnvioMaritimoUseCase = createEnvioMaritimoUseCase;
    this.getAllEnviosMaritimosUseCase = getAllEnviosMaritimosUseCase;
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

      const envio = await this.createEnvioMaritimoUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Envío marítimo creado exitosamente',
        data: envio
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const envios = await this.getAllEnviosMaritimosUseCase.execute();

      res.json({
        success: true,
        count: envios.length,
        data: envios
      });
    } catch (error) {
      next(error);
    }
  }
}
