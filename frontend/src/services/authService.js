/**
 * Servicio de Autenticación
 */
import api from './api';

export const authService = {
  async login() {
    try {
      const response = await api.post('/auth/login');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  }
};
