/**
 * Servicio de Autenticación
 */
import api from './api';

export const authService = {
  /**
   * Registra un nuevo usuario
   */
  async register(usuarioData) {
    try {
      const response = await api.post('/usuarios/register', usuarioData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al registrar usuario');
    }
  },

  /**
   * Inicia sesión con email y contraseña
   */
  async login(email, password) {
    try {
      const response = await api.post('/usuarios/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  },

  /**
   * Login sin credenciales (DEPRECADO - solo para compatibilidad)
   */
  async loginLegacy() {
    try {
      const response = await api.post('/auth/login');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
};
