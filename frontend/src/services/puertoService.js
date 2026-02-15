/**
 * Servicio de Puerto
 */
import api from './api';

export const puertoService = {
  async getAll() {
    const response = await api.get('/puertos');
    return response.data;
  },

  async create(puerto) {
    const response = await api.post('/puertos', puerto);
    return response.data;
  }
};
