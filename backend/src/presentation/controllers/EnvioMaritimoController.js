import { validationResult } from 'express-validator';

export class EnvioMaritimoController {
  constructor(
    createEnvioMaritimoUseCase,
    getAllEnviosMaritimosUseCase,
    getEnvioMaritimoUseCase,
    updateEnvioMaritimoUseCase,
    deleteEnvioMaritimoUseCase,
    searchEnviosMaritimosUseCase
  ) {
    this.createEnvioMaritimoUseCase = createEnvioMaritimoUseCase;
    this.getAllEnviosMaritimosUseCase = getAllEnviosMaritimosUseCase;
    this.getEnvioMaritimoUseCase = getEnvioMaritimoUseCase;
    this.updateEnvioMaritimoUseCase = updateEnvioMaritimoUseCase;
    this.deleteEnvioMaritimoUseCase = deleteEnvioMaritimoUseCase;
    this.searchEnviosMaritimosUseCase = searchEnviosMaritimosUseCase;
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
      const hasFilters = Object.keys(req.query).some(
        k => ['clienteId', 'numeroGuia', 'puertoId', 'fechaRegistroDesde', 'fechaRegistroHasta', 'fechaEntregaDesde', 'fechaEntregaHasta'].includes(k)
      );

      const envios = hasFilters
        ? await this.searchEnviosMaritimosUseCase.execute(req.query)
        : await this.getAllEnviosMaritimosUseCase.execute();

      res.json({
        success: true,
        count: envios.length,
        data: envios
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const envio = await this.getEnvioMaritimoUseCase.execute(req.params.id);

      res.json({
        success: true,
        data: envio
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const envio = await this.updateEnvioMaritimoUseCase.execute(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Envío marítimo actualizado exitosamente',
        data: envio
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteEnvioMaritimoUseCase.execute(req.params.id);

      res.json({
        success: true,
        message: 'Envío marítimo eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}
