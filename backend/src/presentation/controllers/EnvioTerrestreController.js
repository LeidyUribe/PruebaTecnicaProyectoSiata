import { validationResult } from 'express-validator';

export class EnvioTerrestreController {
  constructor(
    createEnvioTerrestreUseCase,
    getAllEnviosTerrestresUseCase,
    getEnvioTerrestreUseCase,
    updateEnvioTerrestreUseCase,
    deleteEnvioTerrestreUseCase,
    searchEnviosTerrestresUseCase
  ) {
    this.createEnvioTerrestreUseCase = createEnvioTerrestreUseCase;
    this.getAllEnviosTerrestresUseCase = getAllEnviosTerrestresUseCase;
    this.getEnvioTerrestreUseCase = getEnvioTerrestreUseCase;
    this.updateEnvioTerrestreUseCase = updateEnvioTerrestreUseCase;
    this.deleteEnvioTerrestreUseCase = deleteEnvioTerrestreUseCase;
    this.searchEnviosTerrestresUseCase = searchEnviosTerrestresUseCase;
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
      const hasFilters = Object.keys(req.query).some(
        k => ['clienteId', 'numeroGuia', 'bodegaId', 'fechaRegistroDesde', 'fechaRegistroHasta', 'fechaEntregaDesde', 'fechaEntregaHasta'].includes(k)
      );

      const envios = hasFilters
        ? await this.searchEnviosTerrestresUseCase.execute(req.query)
        : await this.getAllEnviosTerrestresUseCase.execute();

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
      const envio = await this.getEnvioTerrestreUseCase.execute(req.params.id);

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

      const envio = await this.updateEnvioTerrestreUseCase.execute(req.params.id, req.body);

      res.json({
        success: true,
        message: 'Envío terrestre actualizado exitosamente',
        data: envio
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await this.deleteEnvioTerrestreUseCase.execute(req.params.id);

      res.json({
        success: true,
        message: 'Envío terrestre eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}
