/**
 * Rutas de Puerto
 */
import express from 'express';
import { PuertoController } from '../controllers/PuertoController.js';
import { createPuertoValidator } from '../validators/puertoValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createPuertoRoutes(dependencies) {
  const router = express.Router();
  const controller = new PuertoController(
    dependencies.createPuertoUseCase,
    dependencies.getAllPuertosUseCase
  );

  router.use(authMiddleware);

  router.post('/', createPuertoValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));

  return router;
}
