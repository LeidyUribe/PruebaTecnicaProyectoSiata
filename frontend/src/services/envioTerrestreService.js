/**
 * Servicio de Envío Terrestre
 */
import api from './api';

export const envioTerrestreService = {
  async getAll() {
    const response = await api.get('/envios-terrestres');
    return response.data;
  },

  async create(envio) {
    const response = await api.post('/envios-terrestres', envio);
    return response.data;
  }
};
