import express from 'express';
import { EnvioTerrestreController } from '../controllers/EnvioTerrestreController.js';
import { createEnvioTerrestreValidator, updateEnvioTerrestreValidator } from '../validators/envioTerrestreValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createEnvioTerrestreRoutes(dependencies) {
  const router = express.Router();
  const controller = new EnvioTerrestreController(
    dependencies.createEnvioTerrestreUseCase,
    dependencies.getAllEnviosTerrestresUseCase,
    dependencies.getEnvioTerrestreUseCase,
    dependencies.updateEnvioTerrestreUseCase,
    dependencies.deleteEnvioTerrestreUseCase,
    dependencies.searchEnviosTerrestresUseCase
  );

  router.use(authMiddleware);

  router.post('/', createEnvioTerrestreValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.put('/:id', updateEnvioTerrestreValidator, controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
