/**
 * Rutas de Usuario (Registro y Login)
 */
import express from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';
import { registerUsuarioValidator, loginUsuarioValidator } from '../validators/usuarioValidators.js';

export function createUsuarioRoutes(dependencies) {
  const router = express.Router();
  const controller = new UsuarioController(
    dependencies.registerUsuarioUseCase,
    dependencies.loginUsuarioUseCase
  );

  // Rutas públicas (no requieren autenticación)
  router.post('/register', registerUsuarioValidator, controller.register.bind(controller));
  router.post('/login', loginUsuarioValidator, controller.login.bind(controller));

  return router;
}
