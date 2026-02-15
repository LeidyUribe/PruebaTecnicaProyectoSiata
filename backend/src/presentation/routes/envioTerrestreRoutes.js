/**
 * Rutas de Envío Terrestre
 */
import express from 'express';
import { EnvioTerrestreController } from '../controllers/EnvioTerrestreController.js';
import { createEnvioTerrestreValidator } from '../validators/envioTerrestreValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createEnvioTerrestreRoutes(dependencies) {
  const router = express.Router();
  const controller = new EnvioTerrestreController(
    dependencies.createEnvioTerrestreUseCase,
    dependencies.getAllEnviosTerrestresUseCase
  );

  router.use(authMiddleware);

  router.post('/', createEnvioTerrestreValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));

  return router;
}
