/**
 * Rutas de Autenticación
 * Endpoint simple para generar tokens de prueba
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createAuthRoutes() {
  const router = express.Router();

  /**
   * POST /api/auth/login
   * DEPRECADO: Usar /api/usuarios/login en su lugar
   * Mantenido para compatibilidad hacia atrás
   * Genera un token JWT para pruebas (sin validación real)
   */
  router.post('/login', (req, res) => {
    try {
      // Validar que JWT_SECRET esté configurado
      if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
        return res.status(500).json({
          success: false,
          message: 'Error de configuración del servidor: JWT_SECRET no está configurado. Por favor, configura JWT_SECRET en el archivo .env'
        });
      }

      // DEPRECADO: Este endpoint genera tokens sin validación
      // Usar /api/usuarios/login para autenticación real
      const token = jwt.sign(
        { 
          userId: 1, 
          email: 'test@example.com',
          role: 'user'
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
      );

      res.json({
        success: true,
        message: 'Token generado exitosamente (DEPRECADO: usar /api/usuarios/login)',
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      });
    } catch (error) {
      console.error('Error al generar token:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Error al generar token de autenticación'
      });
    }
  });

  return router;
}
