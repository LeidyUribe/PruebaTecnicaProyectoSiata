/**
 * Servicio de Envío Marítimo
 */
import api from './api';

export const envioMaritimoService = {
  async getAll() {
    const response = await api.get('/envios-maritimos');
    return response.data;
  },

  async create(envio) {
    const response = await api.post('/envios-maritimos', envio);
    return response.data;
  }
};
