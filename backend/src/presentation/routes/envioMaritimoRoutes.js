import express from 'express';
import { EnvioMaritimoController } from '../controllers/EnvioMaritimoController.js';
import { createEnvioMaritimoValidator, updateEnvioMaritimoValidator } from '../validators/envioMaritimoValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createEnvioMaritimoRoutes(dependencies) {
  const router = express.Router();
  const controller = new EnvioMaritimoController(
    dependencies.createEnvioMaritimoUseCase,
    dependencies.getAllEnviosMaritimosUseCase,
    dependencies.getEnvioMaritimoUseCase,
    dependencies.updateEnvioMaritimoUseCase,
    dependencies.deleteEnvioMaritimoUseCase,
    dependencies.searchEnviosMaritimosUseCase
  );

  router.use(authMiddleware);

  router.post('/', createEnvioMaritimoValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.put('/:id', updateEnvioMaritimoValidator, controller.update.bind(controller));
  router.delete('/:id', controller.delete.bind(controller));

  return router;
}
