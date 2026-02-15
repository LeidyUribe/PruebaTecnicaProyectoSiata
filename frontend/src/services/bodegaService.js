/**
 * Servicio de Bodega
 */
import api from './api';

export const bodegaService = {
  async getAll() {
    const response = await api.get('/bodegas');
    return response.data;
  },

  async create(bodega) {
    const response = await api.post('/bodegas', bodega);
    return response.data;
  }
};
