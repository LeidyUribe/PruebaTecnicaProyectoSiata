/**
 * Rutas de Producto
 */
import express from 'express';
import { ProductoController } from '../controllers/ProductoController.js';
import { createProductoValidator } from '../validators/productoValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createProductoRoutes(dependencies) {
  const router = express.Router();
  const controller = new ProductoController(
    dependencies.createProductoUseCase,
    dependencies.getAllProductosUseCase
  );

  router.use(authMiddleware);

  router.post('/', createProductoValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));

  return router;
}
