/**
 * Rutas de Bodega
 */
import express from 'express';
import { BodegaController } from '../controllers/BodegaController.js';
import { createBodegaValidator } from '../validators/bodegaValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createBodegaRoutes(dependencies) {
  const router = express.Router();
  const controller = new BodegaController(
    dependencies.createBodegaUseCase,
    dependencies.getAllBodegasUseCase
  );

  router.use(authMiddleware);

  router.post('/', createBodegaValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));

  return router;
}
