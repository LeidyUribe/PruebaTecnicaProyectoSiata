import api from './api';

export const envioMaritimoService = {
  async getAll(params = {}) {
    const response = await api.get('/envios-maritimos', { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/envios-maritimos/${id}`);
    return response.data;
  },

  async create(envio) {
    const response = await api.post('/envios-maritimos', envio);
    return response.data;
  },

  async update(id, envio) {
    const response = await api.put(`/envios-maritimos/${id}`, envio);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/envios-maritimos/${id}`);
    return response.data;
  }
};
