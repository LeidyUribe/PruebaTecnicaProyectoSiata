/**
 * Rutas de Envío Marítimo
 */
import express from 'express';
import { EnvioMaritimoController } from '../controllers/EnvioMaritimoController.js';
import { createEnvioMaritimoValidator } from '../validators/envioMaritimoValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createEnvioMaritimoRoutes(dependencies) {
  const router = express.Router();
  const controller = new EnvioMaritimoController(
    dependencies.createEnvioMaritimoUseCase,
    dependencies.getAllEnviosMaritimosUseCase
  );

  router.use(authMiddleware);

  router.post('/', createEnvioMaritimoValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));

  return router;
}
