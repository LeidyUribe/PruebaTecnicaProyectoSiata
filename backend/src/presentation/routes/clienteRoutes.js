/**
 * Rutas de Cliente
 */
import express from 'express';
import { ClienteController } from '../controllers/ClienteController.js';
import { createClienteValidator } from '../validators/clienteValidators.js';
import { authMiddleware } from '../../infrastructure/middleware/authMiddleware.js';

export function createClienteRoutes(dependencies) {
  const router = express.Router();
  const controller = new ClienteController(
    dependencies.createClienteUseCase,
    dependencies.getClienteUseCase,
    dependencies.getAllClientesUseCase
  );

  // Todas las rutas requieren autenticación
  router.use(authMiddleware);

  router.post('/', createClienteValidator, controller.create.bind(controller));
  router.get('/', controller.getAll.bind(controller));
  router.get('/:id', controller.getById.bind(controller));

  return router;
}
