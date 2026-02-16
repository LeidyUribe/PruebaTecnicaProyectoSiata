import api from './api';

export const envioTerrestreService = {
  async getAll(params = {}) {
    const response = await api.get('/envios-terrestres', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/envios-terrestres/${id}`);
    return response.data;
  },

  async create(envio) {
    const response = await api.post('/envios-terrestres', envio);
    return response.data;
  },

  async update(id, envio) {
    const response = await api.put(`/envios-terrestres/${id}`, envio);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/envios-terrestres/${id}`);
    return response.data;
  }
};
