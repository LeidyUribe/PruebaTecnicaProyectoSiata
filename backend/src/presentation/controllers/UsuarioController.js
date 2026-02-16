import { validationResult } from 'express-validator';

export class UsuarioController {
  constructor(registerUsuarioUseCase, loginUsuarioUseCase) {
    this.registerUsuarioUseCase = registerUsuarioUseCase;
    this.loginUsuarioUseCase = loginUsuarioUseCase;
  }

  async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const usuario = await this.registerUsuarioUseCase.execute(req.body);

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: usuario
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Errores de validación',
          errors: errors.array()
        });
      }

      const result = await this.loginUsuarioUseCase.execute(req.body);

      res.json({
        success: true,
        message: 'Login exitoso',
        token: result.token,
        usuario: result.usuario,
        expiresIn: result.expiresIn
      });
    } catch (error) {
      if (error.message.includes('Credenciales inválidas')) {
        return res.status(401).json({
          success: false,
          message: 'Credenciales inválidas'
        });
      }
      next(error);
    }
  }
}
