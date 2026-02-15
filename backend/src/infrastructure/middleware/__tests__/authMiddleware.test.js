/**
 * Pruebas unitarias para authMiddleware
 * Valida todos los escenarios de error de autenticación
 */
import { authMiddleware } from '../authMiddleware.js';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('dotenv', () => ({
  default: {
    config: jest.fn()
  }
}));

describe('authMiddleware', () => {
  let req, res, next;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret';
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('Escenarios de error', () => {
    it('debe retornar 401 si no hay header Authorization', () => {
      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token de autenticación requerido'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('debe retornar 401 si el formato del token es incorrecto', () => {
      req.headers.authorization = 'InvalidFormat token123';

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Formato de token inválido. Use: Bearer <token>'
      });
    });

    it('debe retornar 401 si el token no tiene formato Bearer', () => {
      req.headers.authorization = 'token123';

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
    });

    it('debe retornar 401 si JWT_SECRET no está configurado', () => {
      delete process.env.JWT_SECRET;
      req.headers.authorization = 'Bearer token123';

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error de configuración del servidor: JWT_SECRET no está configurado'
      });
    });

    it('debe retornar 401 si el token es inválido', () => {
      req.headers.authorization = 'Bearer invalid-token';
      jwt.verify.mockImplementation(() => {
        const error = new Error('Invalid token');
        error.name = 'JsonWebTokenError';
        throw error;
      });

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token inválido'
      });
    });

    it('debe retornar 401 si el token está expirado', () => {
      req.headers.authorization = 'Bearer expired-token';
      jwt.verify.mockImplementation(() => {
        const error = new Error('Token expired');
        error.name = 'TokenExpiredError';
        throw error;
      });

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Token expirado'
      });
    });

    it('debe retornar 500 para otros errores de JWT', () => {
      req.headers.authorization = 'Bearer token';
      jwt.verify.mockImplementation(() => {
        throw new Error('Unknown JWT error');
      });

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error al validar el token'
      });
    });
  });

  describe('Escenarios exitosos', () => {
    it('debe permitir el acceso con token válido', () => {
      req.headers.authorization = 'Bearer valid-token';
      const decoded = { userId: 1, email: 'test@example.com' };
      jwt.verify.mockReturnValue(decoded);

      authMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
      expect(req.user).toEqual(decoded);
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });
});
