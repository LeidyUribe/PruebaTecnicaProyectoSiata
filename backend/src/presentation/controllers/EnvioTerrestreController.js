/**
 * Controlador de Envío Terrestre
 */
import { validationResult } from 'express-validator';

export class EnvioTerrestreController {
  constructor(createEnvioTerrestreUseCase, getAllEnviosTerrestresUseCase) {
    this.createEnvioTerrestreUseCase = createEnvioTerrestreUseCase;
    this.getAllEnviosTerrestresUseCase = getAllEnviosTerrestresUseCase;
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

      const envio = await this.createEnvioTerrestreUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Envío terrestre creado exitosamente',
        data: envio
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const envios = await this.getAllEnviosTerrestresUseCase.execute();

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
